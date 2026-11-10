import { NextRequest, NextResponse } from 'next/server'

// Stock photos for the ad mock-up. Claude turns the tagline into search
// terms, Pexels searches, Claude screens the results ("is it the thing?")
// because Pexels never says "no match" — the same two lessons as the Studio
// photo picker. Without keys the route returns [] and the tool falls back to
// a plain-colour creative, so the page never breaks.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Photo = { id: number; src: string; thumb: string; alt: string; credit: string; creditUrl: string }

const PEXELS = 'https://api.pexels.com/v1/search'
const CLAUDE = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-haiku-5-5' // cheap and quick: a few words in, a few words out

async function ask(prompt: string, maxTokens = 200): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return ''
  const r = await fetch(CLAUDE, {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }] }),
  })
  if (!r.ok) return ''
  const j = await r.json().catch(() => null)
  return j?.content?.[0]?.text ?? ''
}

async function pexels(q: string, per = 6): Promise<Photo[]> {
  const key = process.env.PEXELS_API_KEY?.trim()
  if (!key) return []
  const r = await fetch(`${PEXELS}?query=${encodeURIComponent(q)}&per_page=${per}&orientation=landscape`, {
    headers: { Authorization: key, 'User-Agent': 'movingwalls.com ad mock-up' }, // Pexels returns 403 without a User-Agent
    cache: 'no-store',
  })
  if (!r.ok) return []
  const j = await r.json().catch(() => null)
  return (j?.photos ?? []).map((p: any) => ({
    id: p.id, src: `/api/mockup/photo?u=${encodeURIComponent(p.src.large2x ?? p.src.large)}`, thumb: `/api/mockup/photo?u=${encodeURIComponent(p.src.medium)}`,
    alt: p.alt ?? '', credit: p.photographer ?? 'Pexels', creditUrl: p.url ?? 'https://www.pexels.com',
  }))
}

// Without a Pexels key (or when the search finds nothing): a small built-in
// set of free Pexels photos (Pexels licence: free for commercial use), so the
// tool always has a background to offer. Keyed by industry words.
const px = (id: number, alt: string, credit: string) => ({
  id, alt, credit, creditUrl: `https://www.pexels.com/photo/${id}/`,
  src: `/api/mockup/photo?u=${encodeURIComponent(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`)}`,
  thumb: `/api/mockup/photo?u=${encodeURIComponent(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`)}`,
})
const BUILT_IN: { words: RegExp; photos: Photo[] }[] = [
  { words: /food|beverage|restaurant|seafood|thai|dining|eat|coffee|cafe|drink/i, photos: [
    px(1234535, 'Thai seafood salad on a plate', 'icon0 com'), px(2827263, 'Shrimp pad thai with lime', 'Vish V'),
    px(19062750, 'Tagliatelle with prawns and salad', 'Pexels'), px(17719534, 'Coffee cups on a cafe counter', 'Pexels'), px(3632826, 'Coffee cup on a table', 'Pexels'),
  ] },
  { words: /retail|fashion|shop|mall|beauty|clothes|sale/i, photos: [
    px(972887, 'Woman holding shopping bags in the city', 'Andrea Piacquadio'), px(4173102, 'Stylish young woman with paper shopping bags', 'Pexels'),
  ] },
  { words: /auto|car|drive|motor|vehicle/i, photos: [
    px(3758114, 'Man driving a white luxury car', 'Pexels'), px(17177648, 'Silver car on a coastal road', 'Dextar Studio'),
  ] },
  { words: /property|home|apartment|condo|real estate|developer/i, photos: [px(16583796, 'A modern apartment building', 'Pexels')] },
  { words: /tech|telco|phone|app|digital|finance|bank|insurance|education|health|travel|entertain/i, photos: [
    px(7054503, 'A person using a smartphone', 'Kindel Media'), px(20419410, 'Hand holding a smartphone on red', 'Lisett Kruusimäe'),
  ] },
]
function builtIn(text: string, industry: string): Photo[] {
  const hay = `${industry} ${text}`
  const hit = BUILT_IN.filter(b => b.words.test(hay)).flatMap(b => b.photos)
  const rest = BUILT_IN.flatMap(b => b.photos).filter(p => !hit.includes(p))
  return [...hit, ...rest].slice(0, 3) // three photos + 'No photo' = one row of four
}

export async function POST(req: NextRequest) {
  const { tagline = '', industry = '' } = await req.json().catch(() => ({})) as { tagline?: string; industry?: string }
  const text = String(tagline).slice(0, 120), ind = String(industry).slice(0, 60)
  if (!text && !ind) return NextResponse.json({ photos: builtIn('', '') })
  if (!process.env.PEXELS_API_KEY) return NextResponse.json({ photos: builtIn(text, ind), builtIn: true })

  const terms = (await ask(
    `An advertiser wants a background photo for an outdoor ad. Tagline: "${text}". Industry: "${ind || 'unknown'}".
Reply with exactly 3 short stock-photo search phrases (2-4 words each, concrete subjects, no brand names), one per line, nothing else.`,
  )).split('\n').map(s => s.replace(/^[\d.\-\s]+/, '').trim()).filter(Boolean).slice(0, 3)
  const queries = terms.length ? terms : [ind || text]

  const found = (await Promise.all(queries.map(q => pexels(q, 5)))).flat()
  const unique = Array.from(new Map(found.map(p => [p.id, p])).values()).slice(0, 12)
  if (!unique.length) return NextResponse.json({ photos: builtIn(text, ind), builtIn: true })

  // Screen: keep only photos whose own description fits the ad.
  const verdict = await ask(
    `Tagline: "${text}". Industry: "${ind || 'unknown'}".
Here are candidate background photos, described by their alt text:
${unique.map((p, i) => `${i + 1}. ${p.alt || '(no description)'}`).join('\n')}
Which would work as the background of this ad? Reply with the numbers of up to 4 good ones, comma-separated, best first. Reply "none" if none fit.`,
    60,
  )
  const picks = verdict.toLowerCase().includes('none') ? [] : (verdict.match(/\d+/g) ?? []).map(n => unique[Number(n) - 1]).filter(Boolean)
  const photos = (picks.length ? picks : unique.slice(0, 3)).slice(0, 3)
  return NextResponse.json({ photos, screened: picks.length > 0 })
}
