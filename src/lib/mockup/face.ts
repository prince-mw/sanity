import 'server-only'

// Finds the advertising face (the lit screen or poster area) in a site photo.
// Runs ONCE per photo, automatically, the first time a site page needs it:
//   1. Claude Sonnet reads the whole photo and proposes four corners
//   2. it looks again at a zoomed-in crop around that answer, for precision
//   3. snap.ts moves the corners onto the real edges in the pixels (no AI)
// The result is stored in the site's siteContent document, so nobody has to
// mark photos by hand; a visitor can still nudge the points on the page.
// Rif, 10 Nov 2026: "draw with your best effort on Sonnet, the user corrects
// it in the image itself if needed".

export type Corners = [number, number][] // TL, TR, BR, BL, fractions of width/height

const MODEL = 'claude-sonnet-5-5'
const cache = new Map<string, Promise<Corners | null>>()

const PROMPT = (w: number, h: number, zoomed: boolean) => `This ${zoomed ? 'is a zoomed-in crop of a photo showing' : 'photo'} (${w}×${h} pixels) ${zoomed ? '' : 'shows '}an outdoor advertising site: a billboard, LED screen, unipole, lightbox or digital panel.
Find the ADVERTISING FACE — the flat rectangle where the ad is displayed (the lit screen or poster area only, not its frame, bezel, pole or building).
Return its four corners in pixel coordinates as JSON only, in this order: top-left, top-right, bottom-right, bottom-left, as they appear in the image (follow the perspective: the near edge is longer than the far edge). Be precise to the pixel: the corners are where the lit area meets the frame.
Format: {"corners":[[x,y],[x,y],[x,y],[x,y]],"confidence":0-1,"note":"<=12 words"}
If there are several faces, choose the largest, most central one. If no face is visible, return {"corners":null,"confidence":0,"note":"..."}.`

export function faceDetectionAvailable() { return !!process.env.ANTHROPIC_API_KEY }

export async function detectFace(photoUrl: string): Promise<Corners | null> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null
  if (!cache.has(photoUrl)) cache.set(photoUrl, run(photoUrl, key).catch(e => { console.error('[face]', e); cache.delete(photoUrl); return null }))
  return cache.get(photoUrl)!
}

type ImageSource = { type: 'url'; url: string } | { type: 'base64'; media_type: string; data: string }

async function ask(key: string, image: ImageSource, w: number, h: number, zoomed: boolean): Promise<number[][] | null> {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 300, messages: [{ role: 'user', content: [{ type: 'image', source: image }, { type: 'text', text: PROMPT(w, h, zoomed) }] }] }),
  })
  if (!r.ok) throw new Error(`Claude ${r.status}: ${(await r.text()).slice(0, 200)}`)
  const text: string = (await r.json())?.content?.[0]?.text ?? ''
  const m = text.match(/\{[\s\S]*\}/)
  if (!m) return null
  const parsed = JSON.parse(m[0])
  return Array.isArray(parsed.corners) && parsed.corners.length === 4 && (parsed.confidence ?? 0) >= 0.4 ? parsed.corners : null
}

async function run(photoUrl: string, key: string): Promise<Corners | null> {
  const sharp = (await import('sharp')).default
  const buf = Buffer.from(await (await fetch(photoUrl)).arrayBuffer())
  const meta = await sharp(buf).metadata()
  const W = meta.width ?? 0, H = meta.height ?? 0
  if (!W || !H) return null

  // 1. the whole photo
  const first = await ask(key, { type: 'url', url: photoUrl }, W, H, false)
  if (!first) return null
  let corners = first.map(([x, y]) => [Math.min(W, Math.max(0, x)), Math.min(H, Math.max(0, y))])

  // 2. a zoomed crop around that answer
  const xs = corners.map(c => c[0]), ys = corners.map(c => c[1])
  const pad = 0.25, bw = Math.max(...xs) - Math.min(...xs), bh = Math.max(...ys) - Math.min(...ys)
  const left = Math.max(0, Math.floor(Math.min(...xs) - bw * pad)), top = Math.max(0, Math.floor(Math.min(...ys) - bh * pad))
  const cw = Math.min(W - left, Math.ceil(bw * (1 + 2 * pad))), ch = Math.min(H - top, Math.ceil(bh * (1 + 2 * pad)))
  if (cw > 40 && ch > 40) {
    const zoom = Math.min(4, 1600 / cw)
    const crop = await sharp(buf).extract({ left, top, width: cw, height: ch }).resize(Math.round(cw * zoom)).png().toBuffer()
    const second = await ask(key, { type: 'base64', media_type: 'image/png', data: crop.toString('base64') }, Math.round(cw * zoom), Math.round(ch * zoom), true)
    if (second) corners = second.map(([x, y]) => [left + x / zoom, top + y / zoom])
  }

  // 3. onto the real edges
  const { snapQuad } = await import('./snap')
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const snapped = snapQuad({ data, width: info.width, height: info.height, channels: 4 }, corners as [number, number][], 12).quad

  const c = snapped.map(([x, y]) => [Math.min(1, Math.max(0, x / W)), Math.min(1, Math.max(0, y / H))]) as Corners
  const area = Math.abs((c[1][0] - c[0][0]) * (c[2][1] - c[0][1]) - (c[2][0] - c[0][0]) * (c[1][1] - c[0][1]))
  return area > 0.002 ? c : null
}
