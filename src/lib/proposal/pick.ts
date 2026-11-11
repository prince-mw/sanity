import 'server-only'
import type { PublicSite } from '@/lib/inventory/types'
import { sitesFor } from '@/lib/inventory/source'
import { OBJECTIVES, cityOf, targetByCity } from './markets'
import type { Brief, VersionSite, VersionSource } from './types'

// Turns a brief into a site list. Claude (Sonnet) reads the brief and a compact
// list of candidate sites and picks N with a one-line reason each plus a short
// summary; the visitor's own shortlist is always kept. If the key is missing,
// the call fails or the answer does not parse, a rules pick stands in so the
// page always renders. Prices never reach the prompt or the page.

export type Pick = { sites: VersionSite[]; summary: string; source: VersionSource }

const CLAUDE = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-5-5'
const TIMEOUT_MS = 12_000
const MAX_CANDIDATES = 60

type Candidate = { id: string; name: string; format: string; area: string; venue: string | null; size: string | null; digital: boolean; reach: string | null; impressions: string | null; about: string | null }

const candidate = (s: PublicSite): Candidate => ({
  id: s.id, name: s.name, format: s.displayFormat ?? s.format ?? 'Outdoor', area: s.areaName, venue: s.venueType ?? null, size: s.size ?? null,
  digital: !!s.digital, reach: s.audience?.reach ?? null, impressions: s.audience?.impressions ?? null, about: s.description?.slice(0, 160) ?? null,
})

const fmt = (s: PublicSite) => (s.displayFormat ?? s.format ?? '').toLowerCase()
const wants = (brief: Brief, s: PublicSite) => brief.formats.length === 0 || brief.formats.some(f => fmt(s) === f.toLowerCase())
const hasFigures = (s: PublicSite) => !!(s.audience?.reach || s.audience?.impressions)

/** Deterministic score: what a planner would weigh when there is no AI to ask. */
export function ruleScore(brief: Brief, s: PublicSite): number {
  let n = 0
  if (brief.formats.length && wants(brief, s)) n += 3
  if (hasFigures(s)) n += 2
  if (s.digital && (brief.objective === 'launch' || brief.objective === 'event')) n += 1
  if (brief.objective === 'footfall' && /mall|retail|shop/i.test(`${s.venueType} ${s.format}`)) n += 1
  if (brief.objective === 'awareness' && /highway|roadside|landmark|tower|bridge/i.test(`${s.venueType} ${s.format} ${s.name}`)) n += 1
  if (!s.sample) n += 1
  return n
}

function templateReason(brief: Brief, s: PublicSite): string {
  const f = s.displayFormat ?? s.format ?? 'Outdoor site'
  const where = s.areaName ? ` in ${s.areaName}` : ''
  const why = brief.objective === 'footfall' ? 'close to where people shop'
    : brief.objective === 'launch' ? (s.digital ? 'a digital screen that can change creative through the launch' : 'a landmark position for launch impact')
    : brief.objective === 'event' ? (s.digital ? 'digital, so the message can count down to the day' : 'high-traffic position for the build-up')
    : 'high traffic, seen daily by commuters'
  const fig = s.audience?.impressions ? `; ${s.audience.impressions} impressions a month` : ''
  return `${f}${where}: ${why}${fig}.`
}

function templateSummary(brief: Brief, picked: PublicSite[]): string {
  const obj = OBJECTIVES.find(o => o.id === brief.objective)?.label.toLowerCase() ?? 'out-of-home'
  const formats = Array.from(new Set(picked.map(s => s.displayFormat ?? s.format).filter(Boolean))).slice(0, 3).join(', ')
  const areas = Array.from(new Set(picked.map(s => s.areaName).filter(Boolean))).slice(0, 4).join(', ')
  const when = brief.durationWeeks ? ` over ${brief.durationWeeks} weeks` : ''
  return `A ${obj} plan across ${picked.length} sites in ${brief.cityName}${when}. ${formats ? `Formats: ${formats}. ` : ''}${areas ? `Areas covered: ${areas}. ` : ''}Sites were chosen for ${brief.audience ? `reaching ${brief.audience.trim()}` : 'audience fit'} and daily traffic; the Moving Walls team confirms availability before anything is booked.`
}

export function rulesPick(brief: Brief, candidates: PublicSite[], pinnedIds: string[], n: number): Pick {
  const pinned = pinnedIds.map(id => candidates.find(s => s.id === id)).filter(Boolean) as PublicSite[]
  const rest = candidates.filter(s => !pinnedIds.includes(s.id)).sort((a, b) => ruleScore(brief, b) - ruleScore(brief, a) || a.name.localeCompare(b.name))
  const picked = [...pinned, ...rest].slice(0, Math.max(n, pinned.length))
  return { source: 'rules', summary: templateSummary(brief, picked), sites: picked.map((s, i) => ({ siteId: s.id, siteName: s.name, reason: templateReason(brief, s), order: i })) }
}

/** A version straight from the visitor's shortlist, with no brief to reason from. */
export function shortlistPick(brief: Brief, candidates: PublicSite[], ids: string[]): Pick {
  const picked = ids.map(id => candidates.find(s => s.id === id)).filter(Boolean) as PublicSite[]
  return { source: 'shortlist', summary: templateSummary(brief, picked), sites: picked.map((s, i) => ({ siteId: s.id, siteName: s.name, reason: templateReason(brief, s), order: i })) }
}

/**
 * The whole plan: one pick per city in the brief that has inventory, sized by
 * city weight, with every site tagged by city. Cities without inventory are
 * left to the request path. `mode` 'shortlist' skips Claude and keeps only the
 * visitor's own sites.
 */
export async function pickPlan(brief: Brief, pinnedIds: string[], mode: 'brief' | 'shortlist' = 'brief'): Promise<Pick & { candidates: PublicSite[] }> {
  const cities = brief.cities.filter(c => cityOf(brief.countrySlug, c)?.available)
  const targets = targetByCity(brief.countrySlug, cities, brief.targetSites)
  const all: PublicSite[] = []
  const sites: VersionSite[] = []
  const summaries: string[] = []
  let source: VersionSource = mode === 'shortlist' ? 'shortlist' : 'rules'
  for (const city of cities) {
    const candidates = await sitesFor(brief.countrySlug, city)
    all.push(...candidates)
    if (!candidates.length) continue
    const cityBrief: Brief = { ...brief, citySlug: city, cityName: cityOf(brief.countrySlug, city)?.name ?? city, targetSites: targets[city] ?? brief.targetSites }
    const pinnedHere = pinnedIds.filter(id => candidates.some(s => s.id === id))
    const pick = mode === 'shortlist' ? shortlistPick(cityBrief, candidates, pinnedHere) : await pickSites(cityBrief, candidates, pinnedHere)
    if (mode === 'shortlist' && !pick.sites.length) continue
    for (const s of pick.sites) sites.push({ ...s, citySlug: city, order: sites.length })
    summaries.push(pick.summary)
    if (pick.source === 'claude') source = 'claude'
  }
  return { source, sites, summary: summaries.join(' '), candidates: all }
}

const memo = new Map<string, { at: number; pick: Pick }>()
const MEMO_MS = 10 * 60_000

export async function pickSites(brief: Brief, candidates: PublicSite[], pinnedIds: string[]): Promise<Pick> {
  const pinned = pinnedIds.filter(id => candidates.some(s => s.id === id))
  const n = Math.min(Math.max(brief.targetSites || 5, pinned.length, 2), candidates.length)
  const fallback = () => rulesPick(brief, candidates, pinned, n)
  const key = process.env.ANTHROPIC_API_KEY
  if (!key || candidates.length === 0) { console.warn(`[proposal/pick] rules: ${key ? 'no candidates' : 'no ANTHROPIC_API_KEY'}`); return fallback() }

  const memoKey = JSON.stringify([brief, pinned, candidates.map(s => s.id)])
  const hit = memo.get(memoKey)
  if (hit && Date.now() - hit.at < MEMO_MS) return hit.pick

  // Prefer the brief's formats, then the rules order, and cap what Claude reads.
  const shortlist = [...candidates].sort((a, b) => ruleScore(brief, b) - ruleScore(brief, a)).slice(0, MAX_CANDIDATES)
  for (const id of pinned) if (!shortlist.some(s => s.id === id)) shortlist.push(candidates.find(s => s.id === id)!)
  const byId = new Map(shortlist.map(s => [s.id, s]))

  const objective = OBJECTIVES.find(o => o.id === brief.objective)
  const system = `You are a senior out-of-home media planner at Moving Walls, planning in ${brief.cityName}. You pick sites from the candidate list only, never invent sites or facts, and never mention prices, rates, budgets or costs. Reply with JSON only.`
  const user = [
    `Brief:`,
    `- Objective: ${objective ? `${objective.label} (${objective.hint})` : 'not stated'}`,
    `- Audience, in the client's words: ${brief.audience.trim() || 'not stated'}`,
    `- Industry: ${brief.industry.trim() || 'not stated'}`,
    `- Start: ${brief.startDate ?? 'not stated'}; duration: ${brief.durationWeeks ? `${brief.durationWeeks} weeks` : 'not stated'}`,
    `- Preferred formats: ${brief.formats.length ? brief.formats.join(', ') : 'any'}`,
    `- Number of sites to pick: exactly ${n}`,
    pinned.length ? `- Must include (the client shortlisted these; give each a reason too): ${pinned.join(', ')}` : null,
    ``,
    `Candidate sites (JSON): ${JSON.stringify(shortlist.map(candidate))}`,
    ``,
    `Return exactly this JSON shape and nothing else:`,
    `{"summary":"three sentences for the client: what the plan does, where, and why these sites fit the audience","sites":[{"id":"<candidate id>","reason":"<one line, at most 140 characters, specific to this site and this brief>"}]}`,
    `Order the sites from strongest to weakest fit. Use only figures that appear in the candidate list.`,
  ].filter(l => l != null).join('\n')

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const r = await fetch(CLAUDE, {
      method: 'POST', signal: ctrl.signal,
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: MODEL, max_tokens: 900, system, messages: [{ role: 'user', content: user }] }),
    })
    if (!r.ok) { console.error('[proposal/pick] claude', r.status); return fallback() }
    const j = await r.json().catch(() => null)
    const text: string = j?.content?.[0]?.text ?? ''
    const m = /\{[\s\S]*\}/.exec(text)
    if (!m) { console.warn('[proposal/pick] rules: no JSON in answer', text.slice(0, 200)); return fallback() }
    const out = JSON.parse(m[0]) as { summary?: unknown; sites?: { id?: unknown; reason?: unknown }[] }
    const seen = new Set<string>()
    const sites: VersionSite[] = []
    for (const id of pinned) { const s = byId.get(id); if (s && !seen.has(id)) { seen.add(id); sites.push({ siteId: id, siteName: s.name, reason: '', order: sites.length }) } }
    for (const it of out.sites ?? []) {
      const id = String(it.id ?? ''), s = byId.get(id)
      if (!s) continue
      const reason = String(it.reason ?? '').trim().slice(0, 160)
      const existing = sites.find(x => x.siteId === id)
      if (existing) { if (!existing.reason) existing.reason = reason; continue }
      if (sites.length >= n) continue
      seen.add(id); sites.push({ siteId: id, siteName: s.name, reason, order: sites.length })
    }
    for (const x of sites) if (!x.reason) x.reason = templateReason(brief, byId.get(x.siteId)!)
    if (sites.length < Math.min(2, n)) { console.warn('[proposal/pick] rules: too few valid ids', out.sites?.length); return fallback() }
    const summary = String(out.summary ?? '').trim().slice(0, 700) || templateSummary(brief, sites.map(x => byId.get(x.siteId)!))
    const pick: Pick = { source: 'claude', summary, sites }
    memo.set(memoKey, { at: Date.now(), pick })
    return pick
  } catch (e) {
    console.error('[proposal/pick] rules: call failed', (e as Error).name, (e as Error).message)
    return fallback()
  } finally { clearTimeout(timer) }
}
