// npx -y tsx src/lib/mockup/homography.check.ts
import { squareToQuad, project, warpVertices, unproject } from './homography'

let fails = 0
const ok = (c: boolean, m: string) => { if (!c) { fails++; console.log('FAIL', m) } else console.log('ok  ', m) }
const near = (a: number, b: number) => Math.abs(a - b) < 1e-6

const quad: [number, number][] = [[120, 80], [700, 60], [720, 300], [100, 330]]
const H = squareToQuad(quad)
const corners: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1]]
corners.forEach(([u, v], i) => {
  const [x, y] = project(H, u, v)
  ok(near(x, quad[i][0]) && near(y, quad[i][1]), `corner ${i} lands on the quad corner`)
})
const [cx, cy] = project(H, 0.5, 0.5)
ok(cx > 100 && cx < 720 && cy > 60 && cy < 330, 'the centre lands inside the quad')

const rect: [number, number][] = [[10, 10], [110, 10], [110, 60], [10, 60]]
const Hr = squareToQuad(rect)
const [mx, my] = project(Hr, 0.5, 0.5)
ok(near(mx, 60) && near(my, 35), 'a rectangle maps linearly (affine case)')

const verts = warpVertices(quad, 800, 400)
ok(verts.length === 20, 'four vertices × 5 floats')
ok(near(verts[0], 120 / 800 * 2 - 1) && near(verts[1], 1 - 80 / 400 * 2), 'clip-space xy of the first corner')
ok(verts[4] > 0 && verts[9] > 0 && verts[14] > 0 && verts[19] > 0, 'w is positive at every corner (quad is convex, in order)')

// The GPU interpolates (u·q, v·q, q) linearly across each triangle and divides.
// Reproduce that for a point inside the quad and compare with the true inverse map.
{
  const W = 800, Hh = 400
  const verts = warpVertices(quad, W, Hh)
  const V = (i: number) => ({ x: (verts[i * 5] + 1) / 2 * W, y: (1 - verts[i * 5 + 1]) / 2 * Hh, uq: verts[i * 5 + 2], vq: verts[i * 5 + 3], q: verts[i * 5 + 4] })
  const bary = (p: [number, number], a: ReturnType<typeof V>, b: ReturnType<typeof V>, c: ReturnType<typeof V>) => {
    const det = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y)
    const l1 = ((b.y - c.y) * (p[0] - c.x) + (c.x - b.x) * (p[1] - c.y)) / det
    const l2 = ((c.y - a.y) * (p[0] - c.x) + (a.x - c.x) * (p[1] - c.y)) / det
    return [l1, l2, 1 - l1 - l2]
  }
  let worst = 0
  for (const [u, v] of [[0.25, 0.3], [0.7, 0.6], [0.5, 0.9], [0.9, 0.1]] as [number, number][]) {
    const p = project(H, u, v)
    // triangle fan: (0,1,2) and (0,2,3); pick the one containing p
    const tris = [[V(0), V(1), V(2)], [V(0), V(2), V(3)]]
    for (const [a, b, c] of tris) {
      const [l1, l2, l3] = bary(p, a, b, c)
      if (l1 < -1e-9 || l2 < -1e-9 || l3 < -1e-9) continue
      const uq = l1 * a.uq + l2 * b.uq + l3 * c.uq, vq = l1 * a.vq + l2 * b.vq + l3 * c.vq, q = l1 * a.q + l2 * b.q + l3 * c.q
      worst = Math.max(worst, Math.abs(uq / q - u), Math.abs(vq / q - v))
    }
  }
  ok(worst < 1e-6, `GPU-style interpolation reproduces the inverse map (worst error ${worst.toExponential(2)})`)
  const [u2, v2] = unproject(H, ...project(H, 0.3, 0.8))
  ok(near(u2, 0.3) && near(v2, 0.8), 'unproject inverts project')
}

if (fails) { console.log(`${fails} failed`); process.exit(1) }
console.log('all passed')
