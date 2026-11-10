// Snap a roughly placed quad onto the real edges of the screen in the photo.
// Pure maths on raw pixels, so it runs in the browser (marker page, after a
// drag or an AI proposal) and on the server (after Claude's proposal) alike.
//
// For each of the four edges: sample points along the proposed edge, look a
// few pixels either side for the strongest brightness change across the edge,
// fit a straight line through those hits (throwing out the odd ones), then
// intersect neighbouring lines to get the corners. A corner that would jump
// further than the search band is left where it was.

export type Px = { data: Uint8ClampedArray | Uint8Array; width: number; height: number; channels?: number }
export type QuadPx = [number, number][] // TL, TR, BR, BL in pixels

function gray(px: Px): Float32Array {
  const ch = px.channels ?? 4, n = px.width * px.height, out = new Float32Array(n)
  for (let i = 0; i < n; i++) { const o = i * ch; out[i] = 0.299 * px.data[o] + 0.587 * px.data[o + 1] + 0.114 * px.data[o + 2] }
  return out
}

/** Brightness sampled with bilinear interpolation. */
function at(g: Float32Array, w: number, h: number, x: number, y: number): number {
  x = Math.min(w - 1.001, Math.max(0, x)); y = Math.min(h - 1.001, Math.max(0, y))
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0
  const i = y0 * w + x0
  return g[i] * (1 - fx) * (1 - fy) + g[i + 1] * fx * (1 - fy) + g[i + w] * (1 - fx) * fy + g[i + w + 1] * fx * fy
}

type Line = { x: number; y: number; dx: number; dy: number } // point + unit direction

/** Least-squares line through points, with outliers dropped (two rounds). */
function fitLine(pts: [number, number][], fallback: Line): Line {
  let use = pts
  let line = fallback
  for (let round = 0; round < 3 && use.length >= 4; round++) {
    const n = use.length
    const mx = use.reduce((s, p) => s + p[0], 0) / n, my = use.reduce((s, p) => s + p[1], 0) / n
    let sxx = 0, sxy = 0, syy = 0
    for (const [x, y] of use) { sxx += (x - mx) ** 2; sxy += (x - mx) * (y - my); syy += (y - my) ** 2 }
    // principal direction of the scatter
    const theta = 0.5 * Math.atan2(2 * sxy, sxx - syy)
    const dx = Math.cos(theta), dy = Math.sin(theta)
    line = { x: mx, y: my, dx, dy }
    const res = use.map(([x, y]) => Math.abs((x - mx) * -dy + (y - my) * dx))
    const med = [...res].sort((a, b) => a - b)[Math.floor(res.length / 2)]
    const keep = use.filter((_, i) => res[i] <= Math.max(0.75, 2.5 * med))
    if (keep.length === use.length) break
    use = keep
  }
  return line
}

function intersect(a: Line, b: Line, fallback: [number, number]): [number, number] {
  const det = a.dx * b.dy - a.dy * b.dx
  if (Math.abs(det) < 1e-6) return fallback
  const t = ((b.x - a.x) * b.dy - (b.y - a.y) * b.dx) / det
  return [a.x + a.dx * t, a.y + a.dy * t]
}

/**
 * @param band  how far (px) either side of the proposed edge to look
 * @param samples points per edge
 */
export function snapQuad(px: Px, quad: QuadPx, band = 8, samples = 48): { quad: QuadPx; moved: number[] } {
  const w = px.width, h = px.height, g = gray(px)
  const lines: Line[] = []
  for (let k = 0; k < 4; k++) {
    const a = quad[k], b = quad[(k + 1) % 4]
    const ex = b[0] - a[0], ey = b[1] - a[1], len = Math.hypot(ex, ey) || 1
    const ux = ex / len, uy = ey / len, nx = -uy, ny = ux // unit along, unit across
    // 1. every candidate edge crossing per sample: offset, strength, sign (bright→dark or dark→bright across)
    type Cand = { d: number; m: number; sign: number }
    const perSample: { cx: number; cy: number; cands: Cand[] }[] = []
    for (let s = 0; s < samples; s++) {
      const t = 0.08 + 0.84 * (s / (samples - 1))
      const cx = a[0] + ex * t, cy = a[1] + ey * t
      const prof: number[] = []
      for (let d = -band; d <= band; d += 0.5) {
        let diff = 0
        for (const r of [-1.5, 0, 1.5]) {
          const x = cx + nx * d + ux * r, y = cy + ny * d + uy * r
          diff += at(g, w, h, x + nx, y + ny) - at(g, w, h, x - nx, y - ny)
        }
        prof.push(diff)
      }
      const cands: Cand[] = []
      for (let i = 1; i < prof.length - 1; i++) {
        const m = Math.abs(prof[i])
        if (m > 18 && m >= Math.abs(prof[i - 1]) && m >= Math.abs(prof[i + 1])) cands.push({ d: -band + i * 0.5, m, sign: Math.sign(prof[i]) })
      }
      perSample.push({ cx, cy, cands })
    }
    // 2. the edge's character: the sign most of the strongest candidates share
    let plus = 0, minus = 0
    for (const sm of perSample) { const top = sm.cands.slice().sort((p, q) => q.m - p.m)[0]; if (top) (top.sign > 0 ? plus++ : minus++) }
    const sign = plus >= minus ? 1 : -1
    // 3. per sample: among candidates of that sign and at least half the strongest's strength, the one nearest the proposal
    const hits: [number, number][] = []
    for (const sm of perSample) {
      const strongest = Math.max(0, ...sm.cands.map(c => c.m))
      const ok = sm.cands.filter(c => c.sign === sign && c.m >= 0.5 * strongest).sort((p, q) => Math.abs(p.d) - Math.abs(q.d))[0]
      if (ok) hits.push([sm.cx + nx * ok.d, sm.cy + ny * ok.d])
    }
    const fallback = { x: a[0], y: a[1], dx: ux, dy: uy }
    if (hits.length < samples * 0.5) { lines.push(fallback); continue } // no clear edge here: leave it
    const line = fitLine(hits, fallback)
    // the fitted line must stay within the band at both ends of the proposed edge
    const off = (x: number, y: number) => Math.abs((x - line.x) * -line.dy + (y - line.y) * line.dx)
    lines.push(off(a[0], a[1]) <= band && off(b[0], b[1]) <= band ? line : fallback)
  }
  const out: QuadPx = [], moved: number[] = []
  for (let k = 0; k < 4; k++) {
    const prev = lines[(k + 3) % 4], next = lines[k]
    const p = intersect(prev, next, quad[k])
    const dist = Math.hypot(p[0] - quad[k][0], p[1] - quad[k][1])
    // accept only a modest correction; a big jump means the lines found something else
    if (dist <= band * 1.6) { out.push(p); moved.push(dist) } else { out.push(quad[k]); moved.push(0) }
  }
  return { quad: out, moved }
}
