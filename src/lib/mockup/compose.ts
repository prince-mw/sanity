// Browser-side image work for the ad mock-up. No server rendering: the
// creative is drawn on a 2D canvas, warped onto the billboard face with a
// small WebGL program (perspective-correct, see homography.ts), then
// watermarked for the preview. The clean version is produced the same way
// without the watermark, only after the lead form succeeds.

import { squareToQuad, project, type Quad } from './homography'

export type Template = 'band' | 'split' | 'poster'

export type CreativeInput = {
  width: number; height: number
  photo: HTMLImageElement | null
  logo: HTMLImageElement | HTMLCanvasElement | null   // an uploaded logo, or a wordmark drawn from the brand name
  tagline: string
  accent: string           // hex, sampled from the logo
  template: Template
}

/**
 * A wordmark for a brand with no logo file: the name set bold and spaced, in
 * the colour the ad's text uses, on a transparent canvas. It then takes the
 * logo's place in every layout.
 */
export function wordmark(name: string, color: string): HTMLCanvasElement {
  const text = name.trim().toUpperCase()
  const c = document.createElement('canvas')
  const g = c.getContext('2d')!
  const size = 120
  g.font = `800 ${size}px Poppins, "Segoe UI", Arial, sans-serif`
  const spacing = Math.round(size * 0.08)
  const w = Math.ceil([...text].reduce((acc, ch) => acc + g.measureText(ch).width + spacing, 0)) + spacing
  c.width = Math.max(10, w); c.height = Math.round(size * 1.3)
  g.font = `800 ${size}px Poppins, "Segoe UI", Arial, sans-serif`; g.textBaseline = 'middle'; g.fillStyle = color
  let x = spacing / 2
  for (const ch of text) { g.fillText(ch, x, c.height / 2); x += g.measureText(ch).width + spacing }
  return c
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous' // Sanity CDN and our photo proxy send CORS headers, so the canvas stays exportable
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Could not load ${src.slice(0, 80)}`))
    img.src = src
  })
}

/** The logo's dominant non-white, non-transparent colour, for the accent. */
export function sampleAccent(logo: HTMLImageElement): string {
  const c = document.createElement('canvas'); c.width = 48; c.height = 48
  const g = c.getContext('2d')!; g.drawImage(logo, 0, 0, 48, 48)
  const d = g.getImageData(0, 0, 48, 48).data
  let r = 0, gg = 0, b = 0, n = 0
  for (let i = 0; i < d.length; i += 4) {
    const [R, G, B, A] = [d[i], d[i + 1], d[i + 2], d[i + 3]]
    const max = Math.max(R, G, B), min = Math.min(R, G, B)
    if (A < 128 || max > 235 && min > 215 || max - min < 25) continue // skip transparent, white, grey
    r += R; gg += G; b += B; n++
  }
  if (n < 20) return '#0F766E' // white or line-art logo: a neutral deep teal, the visitor can change it
  const hex = (v: number) => Math.round(v / n).toString(16).padStart(2, '0')
  return `#${hex(r)}${hex(gg)}${hex(b)}`
}

const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16); const r = n >> 16, g = (n >> 8) & 255, b = n & 255
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

function cover(g: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const s = Math.max(w / img.width, h / img.height)
  const dw = img.width * s, dh = img.height * s
  g.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh)
}

function contain(g: CanvasRenderingContext2D, img: HTMLImageElement | HTMLCanvasElement, x: number, y: number, w: number, h: number, align: 'left' | 'right' | 'center' = 'center') {
  const s = Math.min(w / img.width, h / img.height)
  const dw = img.width * s, dh = img.height * s
  const dx = align === 'left' ? x : align === 'right' ? x + w - dw : x + (w - dw) / 2
  g.drawImage(img, dx, y + (h - dh) / 2, dw, dh)
}

function wrap(g: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean), lines: string[] = []
  let line = ''
  for (const w of words) {
    const t = line ? `${line} ${w}` : w
    if (g.measureText(t).width > maxWidth && line) { lines.push(line); line = w } else line = t
  }
  if (line) lines.push(line)
  return lines
}

/** Draws the ad creative (generic layout rules, not the Moving Walls guideline). */
export function drawCreative(c: HTMLCanvasElement, input: CreativeInput) {
  const { width: W, height: H, photo, logo, tagline, accent, template } = input
  c.width = W; c.height = H
  const g = c.getContext('2d')!
  const dark = luminance(accent) < 0.5
  const text = dark ? '#ffffff' : '#111111'
  const font = (px: number, weight = 700) => `${weight} ${px}px Poppins, "Segoe UI", Arial, sans-serif`
  const pad = Math.round(Math.min(W, H) * 0.08)
  const landscape = W >= H

  const bg = () => { g.fillStyle = accent; g.fillRect(0, 0, W, H) }

  if (template === 'split' && photo) {
    // photo on one side, solid accent panel with the words on the other
    const pw = landscape ? Math.round(W * 0.58) : W, ph = landscape ? H : Math.round(H * 0.55)
    cover(g, photo, 0, 0, pw, ph)
    g.fillStyle = accent
    if (landscape) g.fillRect(pw, 0, W - pw, H); else g.fillRect(0, ph, W, H - ph)
    const bx = landscape ? pw + pad : pad, by = landscape ? pad : ph + pad
    const bw = landscape ? W - pw - pad * 2 : W - pad * 2, bh = landscape ? H - pad * 2 : H - ph - pad * 2
    if (logo) contain(g, logo, bx, by, bw, Math.round(bh * 0.32), 'left')
    g.fillStyle = text; g.textBaseline = 'top'
    const size = Math.round(Math.min(bw / 7.5, bh * 0.2)); g.font = font(size)
    const lines = wrap(g, tagline, bw).slice(0, 4)
    const top = by + Math.round(bh * 0.4)
    lines.forEach((l, i) => g.fillText(l, bx, top + i * size * 1.2))
    return
  }

  if (template === 'poster' || !photo) {
    // big words on the photo (darkened) or on the accent colour
    if (photo) { cover(g, photo, 0, 0, W, H); g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(0, 0, W, H) }
    else { bg(); const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, 'rgba(255,255,255,0.16)'); gr.addColorStop(1, 'rgba(0,0,0,0.22)'); g.fillStyle = gr; g.fillRect(0, 0, W, H) }
    const tc = photo ? '#ffffff' : text
    g.fillStyle = tc; g.textAlign = 'center'; g.textBaseline = 'middle'
    const size = Math.round(Math.min(W / 8.5, H * 0.2)); g.font = font(size)
    const lines = wrap(g, tagline, W - pad * 2).slice(0, 4)
    const total = lines.length * size * 1.2
    const logoH = logo ? Math.round(H * 0.26) : 0
    const start = (H - total - logoH - (logo ? pad / 2 : 0)) / 2
    lines.forEach((l, i) => g.fillText(l, W / 2, start + i * size * 1.2 + size * 0.6))
    if (logo) contain(g, logo, pad, start + total + pad / 2, W - pad * 2, logoH, 'center')
    g.textAlign = 'start'
    return
  }

  // 'band': photo on top, accent band below with big words and the logo.
  // Billboard type is read at distance, so the band and the words are large.
  cover(g, photo, 0, 0, W, H)
  const bandH = Math.round(H * (landscape ? 0.4 : 0.42))
  g.fillStyle = accent; g.fillRect(0, H - bandH, W, bandH)
  g.fillStyle = text; g.textBaseline = 'middle'
  if (landscape) {
    const logoW = logo ? Math.round(W * 0.36) : 0
    const textW = W - logoW - pad * (logo ? 3 : 2)
    const size = Math.round(Math.min(bandH * 0.42, textW / 11)); g.font = font(size)
    const lines = wrap(g, tagline, textW).slice(0, 2)
    const cy = H - bandH / 2
    lines.forEach((l, i) => g.fillText(l, pad, cy + (i - (lines.length - 1) / 2) * size * 1.15))
    if (logo) contain(g, logo, W - pad - logoW, H - bandH + pad * 0.8, logoW, bandH - pad * 1.6, 'right')
  } else {
    const logoH = logo ? Math.round(bandH * 0.3) : 0
    const textH = bandH - logoH - pad * (logo ? 2.2 : 1.6)
    const size = Math.round(Math.min(textH / 2.4, (W - pad * 2) / 9)); g.font = font(size)
    g.textAlign = 'center'
    const lines = wrap(g, tagline, W - pad * 2).slice(0, 3)
    const top = H - bandH + pad * 0.8
    lines.forEach((l, i) => g.fillText(l, W / 2, top + size * 0.6 + i * size * 1.15))
    if (logo) contain(g, logo, pad, H - pad * 0.8 - logoH, W - pad * 2, logoH, 'center')
    g.textAlign = 'start'
  }
}

export type Face = {
  corners: Quad                       // TL, TR, BR, BL as fractions of the photo
  edges?: [number, number][] | null   // optional midpoints of the top, right, bottom, left edges (fractions) for curved screens
  kind?: 'led' | 'print'              // emissive screen or printed surface; decides glow vs. shading
}

const MESH = 24 // cells per side: fine enough that each cell's affine mapping is invisible

let glCache: { canvas: HTMLCanvasElement; gl: WebGLRenderingContext; prog: WebGLProgram; vbuf: WebGLBuffer; ibuf: WebGLBuffer; tex: WebGLTexture; light: WebGLTexture } | null = null

function glSetup() {
  if (glCache) return glCache
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, preserveDrawingBuffer: true, antialias: true })
  if (!gl) throw new Error('WebGL unavailable')
  const vs = `attribute vec2 p; attribute vec2 t; varying vec2 v; void main(){ v = t; gl_Position = vec4(p, 0.0, 1.0); }`
  // creative × lighting map, with the edge feathered over ~1 photo pixel (uPx = uv units per pixel)
  const fs = `precision mediump float; uniform sampler2D s; uniform sampler2D l; uniform vec2 uPx; uniform float uLight; varying vec2 v;
    void main(){
      vec4 c = texture2D(s, v);
      float lm = texture2D(l, v).r * 2.0;
      c.rgb *= mix(1.0, lm, uLight);
      float e = min(min(v.x, 1.0 - v.x) / uPx.x, min(v.y, 1.0 - v.y) / uPx.y);
      c *= clamp(e + 0.5, 0.0, 1.0);
      gl_FragColor = c;
    }`
  const sh = (type: number, src: string) => { const h = gl.createShader(type)!; gl.shaderSource(h, src); gl.compileShader(h); if (!gl.getShaderParameter(h, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(h) || 'shader'); return h }
  const prog = gl.createProgram()!
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog)
  glCache = { canvas, gl, prog, vbuf: gl.createBuffer()!, ibuf: gl.createBuffer()!, tex: gl.createTexture()!, light: gl.createTexture()! }
  return glCache
}

/**
 * Photo-space point for (u, v) on the face: the homography (perspective) plus a
 * quadratic bulge on any edge whose midpoint was dragged off the straight line,
 * so curved LED screens are followed. Pure maths, used by the renderer and the
 * marking tool's overlay alike.
 */
export function facePoint(face: Face, u: number, v: number, W: number, H: number): [number, number] {
  const quad = face.corners.map(([x, y]) => [x * W, y * H]) as Quad
  const Hm = squareToQuad(quad)
  const [bx, by] = project(Hm, u, v)
  if (!face.edges || face.edges.length !== 4) return [bx, by]
  // bulge of each edge = given midpoint − straight (perspective) midpoint
  const mids: [number, number][] = [[0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5]]
  let ox = 0, oy = 0
  face.edges.forEach((m, k) => {
    if (!m) return
    const [sx, sy] = project(Hm, mids[k][0], mids[k][1])
    const dx = m[0] * W - sx, dy = m[1] * H - sy
    const along = k % 2 === 0 ? 4 * u * (1 - u) : 4 * v * (1 - v)       // 0 at the ends, 1 at the middle of the edge
    const across = k === 0 ? 1 - v : k === 1 ? u : k === 2 ? v : 1 - u  // fades towards the opposite edge
    ox += dx * along * across; oy += dy * along * across
  })
  return [bx + ox, by + oy]
}

/** Mesh vertices (clip xy + uv) and triangle indices for the face. */
function faceMesh(face: Face, W: number, H: number) {
  const verts: number[] = [], idx: number[] = []
  for (let j = 0; j <= MESH; j++) for (let i = 0; i <= MESH; i++) {
    const u = i / MESH, v = j / MESH
    const [x, y] = facePoint(face, u, v, W, H)
    verts.push((x / W) * 2 - 1, 1 - (y / H) * 2, u, v)
  }
  for (let j = 0; j < MESH; j++) for (let i = 0; i < MESH; i++) {
    const a = j * (MESH + 1) + i, b = a + 1, c = a + MESH + 1, d = c + 1
    idx.push(a, b, c, b, d, c)
  }
  return { verts: new Float32Array(verts), idx: new Uint16Array(idx) }
}

/**
 * Lighting map of the face, read from the photo itself: the luminance of the
 * existing screen, warped flat and blurred until its old content is gone and
 * only the light stays (glare, hotspot, vignette, dirt). Stored 0..255 for 0..2.
 */
function lightingMap(photo: HTMLImageElement, face: Face, W: number, H: number, n = 32): { data: Uint8Array; size: number } {
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const g = c.getContext('2d', { willReadFrequently: true })!; g.drawImage(photo, 0, 0, W, H)
  const px = g.getImageData(0, 0, W, H).data
  const lum = new Float32Array(n * n)
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const [x, y] = facePoint(face, (i + 0.5) / n, (j + 0.5) / n, W, H)
    const xi = Math.min(W - 1, Math.max(0, Math.round(x))), yi = Math.min(H - 1, Math.max(0, Math.round(y)))
    const o = (yi * W + xi) * 4
    lum[j * n + i] = 0.299 * px[o] + 0.587 * px[o + 1] + 0.114 * px[o + 2]
  }
  // blur hard (box, several passes) so text and pictures of the old ad vanish and only the light field remains
  let a = lum, b = new Float32Array(n * n)
  for (let pass = 0; pass < 6; pass++) {
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      let sum = 0, cnt = 0
      for (let dj = -2; dj <= 2; dj++) for (let di = -2; di <= 2; di++) {
        const ii = i + di, jj = j + dj
        if (ii < 0 || jj < 0 || ii >= n || jj >= n) continue
        sum += a[jj * n + ii]; cnt++
      }
      b[j * n + i] = sum / cnt
    }
    ;[a, b] = [b, a]
  }
  let mean = 0; for (let k = 0; k < a.length; k++) mean += a[k]; mean /= a.length || 1
  const data = new Uint8Array(n * n)
  for (let k = 0; k < a.length; k++) {
    const ratio = mean > 0 ? a[k] / mean : 1                 // 1 = average light of the screen
    data[k] = Math.round(Math.min(2, Math.max(0, ratio)) * 127.5) // 0..2 → 0..255 (shader doubles it back)
  }
  return { data, size: n }
}

const isLed = (face: Face) => (face.kind ?? 'led') === 'led'

/**
 * The site photo with the creative on its face: perspective (+ curved edges),
 * the photo's own lighting, feathered edges, softness and grain matched to the
 * photo, and the glow an LED throws on its surroundings. All deterministic —
 * nothing here can change the creative's content.
 */
export function composeOnSite(photo: HTMLImageElement, creative: HTMLCanvasElement, faceIn: Face | Quad, maxWidth = 1600): HTMLCanvasElement {
  const face: Face = Array.isArray(faceIn) ? { corners: faceIn as Quad } : faceIn
  const scale = Math.min(1, maxWidth / photo.width)
  const W = Math.round(photo.width * scale), H = Math.round(photo.height * scale)
  const out = document.createElement('canvas'); out.width = W; out.height = H
  const g = out.getContext('2d')!
  g.drawImage(photo, 0, 0, W, H)

  // 1. warp with lighting and feathered edges (WebGL)
  const { canvas, gl, prog, vbuf, ibuf, tex, light } = glSetup()
  canvas.width = W; canvas.height = H
  gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(prog)
  const mesh = faceMesh(face, W, H)
  gl.bindBuffer(gl.ARRAY_BUFFER, vbuf); gl.bufferData(gl.ARRAY_BUFFER, mesh.verts, gl.STATIC_DRAW)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibuf); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.idx, gl.STATIC_DRAW)
  const p = gl.getAttribLocation(prog, 'p'), t = gl.getAttribLocation(prog, 't')
  gl.enableVertexAttribArray(p); gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 16, 0)
  gl.enableVertexAttribArray(t); gl.vertexAttribPointer(t, 2, gl.FLOAT, false, 16, 8)
  const setTex = (unit: number, handle: WebGLTexture, name: string) => {
    gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, handle)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.uniform1i(gl.getUniformLocation(prog, name), unit)
  }
  setTex(0, tex, 's'); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, creative)
  const lm = lightingMap(photo, face, W, H)
  setTex(1, light, 'l'); gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, lm.size, lm.size, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, lm.data)
  // uv units per photo pixel, from the face's size on the photo
  const [tl, tr, , bl] = face.corners
  const faceW = Math.hypot((tr[0] - tl[0]) * W, (tr[1] - tl[1]) * H), faceH = Math.hypot((bl[0] - tl[0]) * W, (bl[1] - tl[1]) * H)
  gl.uniform2f(gl.getUniformLocation(prog, 'uPx'), 1 / Math.max(1, faceW), 1 / Math.max(1, faceH))
  gl.uniform1f(gl.getUniformLocation(prog, 'uLight'), isLed(face) ? 0.45 : 0.8) // screens emit their own light, print catches it
  gl.drawElements(gl.TRIANGLES, mesh.idx.length, gl.UNSIGNED_SHORT, 0)

  // 2. the warped ad, softened to the photo's sharpness
  const softness = Math.max(0.3, Math.min(1.2, faceW / 600)) // bigger faces in the photo are sharper
  g.save(); g.filter = `blur(${softness.toFixed(2)}px)`; g.drawImage(canvas, 0, 0); g.restore()

  // 3. an LED throws light around itself: a wide, faint, screen-blended copy
  if (isLed(face)) {
    g.save(); g.globalCompositeOperation = 'screen'; g.globalAlpha = 0.22
    g.filter = `blur(${Math.round(Math.max(6, faceW / 40))}px)`; g.drawImage(canvas, 0, 0); g.restore()
  }

  // 4. grain, matched to the photo, only on the face
  const grain = grainTile()
  g.save(); g.beginPath()
  const outline = faceOutline(face, W, H); outline.forEach(([x, y], k) => (k ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.clip()
  g.globalCompositeOperation = 'overlay'; g.globalAlpha = 0.18
  for (let y = 0; y < H; y += grain.height) for (let x = 0; x < W; x += grain.width) g.drawImage(grain, x, y)
  g.restore()
  return out
}

/** Points around the face (follows curved edges), for clipping and overlays. */
export function faceOutline(face: Face, W: number, H: number, n = 24): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i < n; i++) pts.push(facePoint(face, i / n, 0, W, H))
  for (let i = 0; i < n; i++) pts.push(facePoint(face, 1, i / n, W, H))
  for (let i = 0; i < n; i++) pts.push(facePoint(face, 1 - i / n, 1, W, H))
  for (let i = 0; i < n; i++) pts.push(facePoint(face, 0, 1 - i / n, W, H))
  return pts
}

let grainCache: HTMLCanvasElement | null = null
function grainTile(size = 128): HTMLCanvasElement {
  if (grainCache) return grainCache
  const c = document.createElement('canvas'); c.width = size; c.height = size
  const g = c.getContext('2d')!; const img = g.createImageData(size, size)
  for (let i = 0; i < img.data.length; i += 4) { const v = 96 + Math.random() * 64; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255 }
  g.putImageData(img, 0, 0); grainCache = c; return c
}

export function watermark(c: HTMLCanvasElement, label = 'PREVIEW · movingwalls.com') {
  const g = c.getContext('2d')!
  g.save()
  g.globalAlpha = 0.16; g.fillStyle = '#ffffff'; g.strokeStyle = '#000000'; g.lineWidth = 2
  const size = Math.round(c.width / 14)
  g.font = `800 ${size}px Poppins, Arial, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'
  g.translate(c.width / 2, c.height / 2); g.rotate(-Math.PI / 9)
  for (const dy of [-1.6, 0, 1.6]) { g.strokeText(label, 0, dy * size * 1.6); g.fillText(label, 0, dy * size * 1.6) }
  g.restore()
}

/** Width/height of the face as it appears in the photo (average of the opposite edges), so the creative fits it. */
export function faceAspect(faceIn: Face | Quad, photoW: number, photoH: number): number {
  const face = Array.isArray(faceIn) ? faceIn as Quad : faceIn.corners
  const d = (a: [number, number], b: [number, number]) => Math.hypot((a[0] - b[0]) * photoW, (a[1] - b[1]) * photoH)
  const [tl, tr, br, bl] = face as [[number, number], [number, number], [number, number], [number, number]]
  const w = (d(tl, tr) + d(bl, br)) / 2, h = (d(tl, bl) + d(tr, br)) / 2
  return h > 0 ? Math.max(0.3, Math.min(5, w / h)) : 2
}

/** "12m × 6m" → 2 ; falls back to the format's usual shape. */
export function aspectFromSize(size: string | null, fallback = 2): number {
  const m = size?.match(/([\d.]+)\s*m?\s*[x×]\s*([\d.]+)/i)
  if (!m) return fallback
  const w = parseFloat(m[1]), h = parseFloat(m[2])
  return w > 0 && h > 0 ? w / h : fallback
}
