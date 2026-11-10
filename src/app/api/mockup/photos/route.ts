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

export async function POST(req: NextRequest) {
  const { tagline = '', industry = '' } = await req.json().catch(() => ({})) as { tagline?: string; industry?: string }
  const text = String(tagline).slice(0, 120), ind = String(industry).slice(0, 60)
  if (!text && !ind) return NextResponse.json({ photos: [] })

  const terms = (await ask(
    `An advertiser wants a background photo for an outdoor ad. Tagline: "${text}". Industry: "${ind || 'unknown'}".
Reply with exactly 3 short stock-photo search phrases (2-4 words each, concrete subjects, no brand names), one per line, nothing else.`,
  )).split('\n').map(s => s.replace(/^[\d.\-\s]+/, '').trim()).filter(Boolean).slice(0, 3)
  const queries = terms.length ? terms : [ind || text]

  const found = (await Promise.all(queries.map(q => pexels(q, 5)))).flat()
  const unique = Array.from(new Map(found.map(p => [p.id, p])).values()).slice(0, 12)
  if (!unique.length) return NextResponse.json({ photos: [] })

  // Screen: keep only photos whose own description fits the ad.
  const verdict = await ask(
    `Tagline: "${text}". Industry: "${ind || 'unknown'}".
Here are candidate background photos, described by their alt text:
${unique.map((p, i) => `${i + 1}. ${p.alt || '(no description)'}`).join('\n')}
Which would work as the background of this ad? Reply with the numbers of up to 4 good ones, comma-separated, best first. Reply "none" if none fit.`,
    60,
  )
  const picks = verdict.toLowerCase().includes('none') ? [] : (verdict.match(/\d+/g) ?? []).map(n => unique[Number(n) - 1]).filter(Boolean)
  const photos = (picks.length ? picks : unique.slice(0, 4)).slice(0, 4)
  return NextResponse.json({ photos, screened: picks.length > 0 })
}
