// npx -y tsx src/lib/mockup/homography.check.ts
import { squareToQuad, project, warpVertices } from './homography'

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

if (fails) { console.log(`${fails} failed`); process.exit(1) }
console.log('all passed')
