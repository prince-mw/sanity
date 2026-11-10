// Maps the unit square (the flat ad creative) onto a 4-corner quad (the
// billboard face in the photo). Pure maths, no DOM, checked by homography.check.ts.
//
// The 3×3 matrix H sends (u, v, 1) to (x·w, y·w, w); dividing by w gives the
// photo point. The WebGL warp passes (u·w, v·w, w) per corner and divides in
// the fragment shader, so texture lookup stays perspective-correct across the
// two triangles (plain affine mapping shows a crease along the diagonal).

export type Quad = [number, number][] // TL, TR, BR, BL

/** Homography from the unit square to `quad`, row-major 3×3. */
export function squareToQuad(quad: Quad): number[] {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = quad
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3
  let a, b, c, d, e, f, g, h
  if (dx3 === 0 && dy3 === 0) { // affine
    a = x1 - x0; b = x2 - x1; c = x0; d = y1 - y0; e = y2 - y1; f = y0; g = 0; h = 0
  } else {
    const det = dx1 * dy2 - dx2 * dy1
    g = (dx3 * dy2 - dx2 * dy3) / det
    h = (dx1 * dy3 - dx3 * dy1) / det
    a = x1 - x0 + g * x1; b = x3 - x0 + h * x3; c = x0
    d = y1 - y0 + g * y1; e = y3 - y0 + h * y3; f = y0
  }
  return [a, b, c, d, e, f, g, h, 1]
}

/** Applies H to (u, v): returns [x, y, w] before the divide. */
export function apply(H: number[], u: number, v: number): [number, number, number] {
  return [H[0] * u + H[1] * v + H[2], H[3] * u + H[4] * v + H[5], H[6] * u + H[7] * v + H[8]]
}

/** The photo point for (u, v). */
export function project(H: number[], u: number, v: number): [number, number] {
  const [x, y, w] = apply(H, u, v)
  return [x / w, y / w]
}

/**
 * Clip-space vertex data for a WebGL warp: xy in clip space, texcoord (u·q, v·q, q).
 * q is the homogeneous weight of the INVERSE map (screen → texture): at corner i,
 * H(u_i, v_i, 1) = w_i · (x_i, y_i, 1), so H⁻¹(x_i, y_i, 1) = (u_i, v_i, 1) / w_i and
 * q_i = 1 / w_i. Using w_i itself (an earlier bug) skews the image towards the far edge.
 */
export function warpVertices(quad: Quad, width: number, height: number): Float32Array {
  const H = squareToQuad(quad)
  const uv: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1]]
  const out: number[] = []
  for (let i = 0; i < 4; i++) {
    const [u, v] = uv[i]
    const [, , w] = apply(H, u, v)
    const q = 1 / w
    const [px, py] = quad[i]
    out.push((px / width) * 2 - 1, 1 - (py / height) * 2, u * q, v * q, q)
  }
  return new Float32Array(out)
}

/** Inverse of a 3×3 (row-major). */
export function invert(H: number[]): number[] {
  const [a, b, c, d, e, f, g, h, i] = H
  const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g
  const det = a * A + b * B + c * C
  return [A, -(b * i - c * h), b * f - c * e, B, a * i - c * g, -(a * f - c * d), C, -(a * h - b * g), a * e - b * d].map(v => v / det)
}

/** Texture point (u, v) for a photo point (x, y): the inverse map, with the divide. */
export function unproject(H: number[], x: number, y: number): [number, number] {
  const [u, v, q] = apply(invert(H), x, y)
  return [u / q, v / q]
}
