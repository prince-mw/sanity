import 'server-only'

// Finds the advertising face (the screen or poster area) in a site photo:
// Claude looks at the picture and returns the four corners. Every photo is
// different, so this runs once per photo and the result is stored
// (siteContent.faceCorners by the daily job; an in-process cache here).
// Rif, 10 Nov 2026: worth the API credits for the leads the mock-up brings.

export type Corners = [number, number][] // TL, TR, BR, BL, fractions of width/height

const MODEL = 'claude-sonnet-5-5'
const cache = new Map<string, Promise<Corners | null>>()

const PROMPT = (w: number, h: number) => `This photo (${w}×${h} pixels) shows an outdoor advertising site: a billboard, LED screen, unipole, lightbox or digital panel.
Find the ADVERTISING FACE — the flat rectangle where the ad is displayed (the screen or poster area only, not its frame, pole or building).
Return its four corners in pixel coordinates as JSON only, in this order: top-left, top-right, bottom-right, bottom-left, as they appear in the photo (follow the perspective: the near edge is longer than the far edge).
Format: {"corners":[[x,y],[x,y],[x,y],[x,y]],"confidence":0-1,"note":"<=12 words"}
If there are several faces, choose the largest, most central one. If no face is visible, return {"corners":null,"confidence":0,"note":"..."}.`

export async function detectFace(photoUrl: string, width: number, height: number): Promise<Corners | null> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null
  if (!cache.has(photoUrl)) cache.set(photoUrl, run(photoUrl, width, height, key).catch(e => { console.error('[face]', e); cache.delete(photoUrl); return null }))
  return cache.get(photoUrl)!
}

async function run(photoUrl: string, width: number, height: number, key: string): Promise<Corners | null> {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: MODEL, max_tokens: 300,
      messages: [{ role: 'user', content: [
        { type: 'image', source: { type: 'url', url: photoUrl } },
        { type: 'text', text: PROMPT(width, height) },
      ] }],
    }),
  })
  if (!r.ok) throw new Error(`Claude ${r.status}: ${(await r.text()).slice(0, 200)}`)
  const j = await r.json()
  const text: string = j?.content?.[0]?.text ?? ''
  const m = text.match(/\{[\s\S]*\}/)
  if (!m) return null
  const parsed = JSON.parse(m[0])
  if (!Array.isArray(parsed.corners) || parsed.corners.length !== 4 || (parsed.confidence ?? 0) < 0.4) return null
  const c = parsed.corners.map(([x, y]: number[]) => [Math.min(1, Math.max(0, x / width)), Math.min(1, Math.max(0, y / height))]) as Corners
  // sanity: must be a convex-ish quad with real area
  const area = Math.abs((c[1][0] - c[0][0]) * (c[2][1] - c[0][1]) - (c[2][0] - c[0][0]) * (c[1][1] - c[0][1]))
  return area > 0.002 ? c : null
}
