// Browser-side image work for the ad mock-up. No server rendering: the
// creative is drawn on a 2D canvas, warped onto the billboard face with a
// small WebGL program (perspective-correct, see homography.ts), then
// watermarked for the preview. The clean version is produced the same way
// without the watermark, only after the lead form succeeds.

import { warpVertices, type Quad } from './homography'

export type Template = 'band' | 'split' | 'poster'

export type CreativeInput = {
  width: number; height: number
  photo: HTMLImageElement | null
  logo: HTMLImageElement | null
  tagline: string
  accent: string           // hex, sampled from the logo
  template: Template
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
  if (!n) return '#1B1E2B'
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

function contain(g: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number, align: 'left' | 'right' | 'center' = 'center') {
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
    if (logo) contain(g, logo, bx, by, bw, Math.round(bh * 0.28), 'left')
    g.fillStyle = text; g.textBaseline = 'top'
    const size = Math.round(Math.min(bw / 9, bh * 0.16)); g.font = font(size)
    const lines = wrap(g, tagline, bw).slice(0, 4)
    const top = by + Math.round(bh * 0.4)
    lines.forEach((l, i) => g.fillText(l, bx, top + i * size * 1.2))
    return
  }

  if (template === 'poster' || !photo) {
    // big words on the photo (darkened) or on the accent colour
    if (photo) { cover(g, photo, 0, 0, W, H); g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(0, 0, W, H) } else bg()
    const tc = photo ? '#ffffff' : text
    g.fillStyle = tc; g.textAlign = 'center'; g.textBaseline = 'middle'
    const size = Math.round(Math.min(W / 10, H * 0.18)); g.font = font(size)
    const lines = wrap(g, tagline, W - pad * 2).slice(0, 4)
    const total = lines.length * size * 1.2
    const logoH = logo ? Math.round(H * 0.18) : 0
    const start = (H - total - logoH - (logo ? pad / 2 : 0)) / 2
    lines.forEach((l, i) => g.fillText(l, W / 2, start + i * size * 1.2 + size * 0.6))
    if (logo) contain(g, logo, pad, start + total + pad / 2, W - pad * 2, logoH, 'center')
    g.textAlign = 'start'
    return
  }

  // 'band': full photo, accent band along the bottom with words left, logo right
  cover(g, photo, 0, 0, W, H)
  const bandH = Math.round(H * (landscape ? 0.3 : 0.24))
  g.fillStyle = accent; g.fillRect(0, H - bandH, W, bandH)
  const logoW = logo ? Math.round(W * 0.22) : 0
  g.fillStyle = text; g.textBaseline = 'middle'
  const size = Math.round(Math.min(bandH * 0.34, (W - logoW - pad * 3) / 14)); g.font = font(size)
  const lines = wrap(g, tagline, W - logoW - pad * 3).slice(0, 2)
  const cy = H - bandH / 2
  lines.forEach((l, i) => g.fillText(l, pad, cy + (i - (lines.length - 1) / 2) * size * 1.2))
  if (logo) contain(g, logo, W - pad - logoW, H - bandH + pad / 2, logoW, bandH - pad, 'right')
}

let glCache: { canvas: HTMLCanvasElement; gl: WebGLRenderingContext; prog: WebGLProgram; buf: WebGLBuffer; tex: WebGLTexture } | null = null

function glSetup() {
  if (glCache) return glCache
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, preserveDrawingBuffer: true })
  if (!gl) throw new Error('WebGL unavailable')
  const vs = `attribute vec2 p; attribute vec3 t; varying vec3 v; void main(){ v = t; gl_Position = vec4(p, 0.0, 1.0); }`
  const fs = `precision mediump float; uniform sampler2D s; varying vec3 v; void main(){ gl_FragColor = texture2D(s, v.xy / v.z); }`
  const sh = (type: number, src: string) => { const h = gl.createShader(type)!; gl.shaderSource(h, src); gl.compileShader(h); return h }
  const prog = gl.createProgram()!
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog)
  const buf = gl.createBuffer()!, tex = gl.createTexture()!
  glCache = { canvas, gl, prog, buf, tex }
  return glCache
}

/**
 * The site photo with the creative warped onto `face` (fractions of the photo).
 * Returns a 2D canvas you can watermark and export.
 */
export function composeOnSite(photo: HTMLImageElement, creative: HTMLCanvasElement, face: Quad, maxWidth = 1600): HTMLCanvasElement {
  const scale = Math.min(1, maxWidth / photo.width)
  const W = Math.round(photo.width * scale), H = Math.round(photo.height * scale)
  const out = document.createElement('canvas'); out.width = W; out.height = H
  const g = out.getContext('2d')!
  g.drawImage(photo, 0, 0, W, H)

  const { canvas, gl, prog, buf, tex } = glSetup()
  canvas.width = W; canvas.height = H
  gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(prog)
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, warpVertices(face.map(([x, y]) => [x * W, y * H]) as Quad, W, H), gl.STATIC_DRAW)
  const p = gl.getAttribLocation(prog, 'p'), t = gl.getAttribLocation(prog, 't')
  gl.enableVertexAttribArray(p); gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 20, 0)
  gl.enableVertexAttribArray(t); gl.vertexAttribPointer(t, 3, gl.FLOAT, false, 20, 8)
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, creative)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)

  // a touch of the photo's light so the ad sits "in" the scene
  g.drawImage(canvas, 0, 0)
  g.save(); g.globalCompositeOperation = 'multiply'; g.globalAlpha = 0.08; g.drawImage(photo, 0, 0, W, H); g.restore()
  return out
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

/** "12m × 6m" → 2 ; falls back to the format's usual shape. */
export function aspectFromSize(size: string | null, fallback = 2): number {
  const m = size?.match(/([\d.]+)\s*m?\s*[x×]\s*([\d.]+)/i)
  if (!m) return fallback
  const w = parseFloat(m[1]), h = parseFloat(m[2])
  return w > 0 && h > 0 ? w / h : fallback
}
