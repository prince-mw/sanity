import { NextRequest, NextResponse } from 'next/server'
import { sitesFor } from '@/lib/inventory/source'
import { readProposalGrant, canEdit } from '@/lib/proposal/access'
import { getProposalByShareId, appendVersion, setBriefWeeks, addParticipant, CRM_FIELDS } from '@/lib/proposal/store'
import { addonOf } from '@/lib/proposal/addons'
import { buildTiers } from '@/lib/proposal/tiers'
import { pickPlan } from '@/lib/proposal/pick'
import { marketOf, cityOf } from '@/lib/proposal/markets'
import { crmConfigured, updateLead } from '@/lib/zoho-crm'
import type { Brief, VersionSite } from '@/lib/proposal/types'

// The creator publishes a new version (the public link shows it at once):
//   POST /api/proposals/<shareId>/versions
//     { sites: [{ siteId, reason }], summary }          → a manual version
//     { rerun: true, brief?: Partial<Brief>, pinnedIds } → Claude picks again
//     { addCity: '<slug>' }                               → the same brief picks sites in one more city (client or creator)
//     { removeCity: '<slug>' }                            → drops that city's sites (creator)
//     { tier: 'essentials' | 'full' }                     → the client switches to that size of the plan
//     { addSites: [{ siteId, reason }], weeks? }          → the client takes a suggestion (sites and/or a longer run)
//     { addon: '<id>' }                                   → the client adds a service (or a longer run) to the plan
// A client action may carry { by: { name, email } }: recorded as a participant and on the CRM lead.
// Needs the creator cookie (set by /edit?t=<token> or by creating it).

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  const grant = await readProposalGrant()
  const doc = await getProposalByShareId(shareId)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  let b: { sites?: unknown; summary?: unknown; rerun?: unknown; brief?: Partial<Brief>; pinnedIds?: unknown; addCity?: unknown; removeCity?: unknown; tier?: unknown; addSites?: unknown; weeks?: unknown; addon?: unknown; by?: { name?: unknown; email?: unknown } }
  try { b = await req.json() } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }
  // Anyone with the link may add a city (the funnel); everything else is the creator's.
  const clientAction = (typeof b.addCity === 'string' && b.addCity) || (typeof b.tier === 'string' && b.tier) || Array.isArray(b.addSites) || b.weeks != null || (typeof b.addon === 'string' && b.addon)
  if (!clientAction && !canEdit(grant, shareId)) return NextResponse.json({ error: 'Only the person who created this proposal can change it.' }, { status: 403 })

  const market = marketOf(doc.brief.countrySlug)
  const availableCities = (market?.cities ?? []).filter(c => c.available).map(c => c.slug)
  const candidates = (await Promise.all(availableCities.map(c => sitesFor(doc.brief.countrySlug, c)))).flat()
  const byId = new Map(candidates.map(s => [s.id, s]))
  const current = doc.versions.find(v => v.n === doc.currentVersion)
  const nextN = (doc.versions.reduce((m, v) => Math.max(m, v.n), 0) || doc.currentVersion || 0) + 1

  let version
  const addCity = str(b.addCity, 60), removeCity = str(b.removeCity, 60), tier = str(b.tier, 20)
  const weeks = [2, 4, 8, 12].includes(Number(b.weeks)) ? Number(b.weeks) : null
  const addon = addonOf(str(b.addon, 20))
  if (addon) {
    const have = new Set(current?.addons ?? [])
    if (addon.weeks) { for (const w of ['weeks-8', 'weeks-12']) have.delete(w); await setBriefWeeks(doc._id, addon.weeks) }
    have.add(addon.id)
    version = { source: 'client' as const, summary: current?.summary ?? '', sites: (current?.sites ?? []).map((s, i) => ({ ...s, order: i })), addons: Array.from(have) }
  } else if (tier === 'essentials' || tier === 'full') {
    const t = buildTiers(doc.brief, current?.sites ?? [], candidates).find(x => x.id === tier)!
    version = { source: 'client' as const, summary: current?.summary ?? '', sites: t.sites }
  } else if (Array.isArray(b.addSites) || weeks) {
    const raw = Array.isArray(b.addSites) ? b.addSites as { siteId?: unknown; reason?: unknown }[] : []
    const kept = (current?.sites ?? []).map(s => ({ ...s }))
    for (const it of raw) {
      const id = str(it.siteId, 80), s = byId.get(id)
      if (!s || kept.some(k => k.siteId === id)) continue
      kept.push({ siteId: id, siteName: s.name, reason: str(it.reason, 200) || 'Added from a suggestion.', order: kept.length, citySlug: s.citySlug })
    }
    if (weeks && weeks !== doc.brief.durationWeeks) await setBriefWeeks(doc._id, weeks)
    version = { source: 'client' as const, summary: current?.summary ?? '', sites: kept.map((s, i) => ({ ...s, order: i })) }
  } else if (addCity) {
    const city = cityOf(doc.brief.countrySlug, addCity)
    if (!city) return NextResponse.json({ error: 'Unknown city' }, { status: 400 })
    if (!city.available) return NextResponse.json({ error: 'No inventory in that city yet. Request it instead.' }, { status: 422 })
    const brief: Brief = { ...doc.brief, cities: Array.from(new Set([...doc.brief.cities, addCity])) }
    const plan = await pickPlan({ ...brief, cities: [addCity] }, [])
    const kept = (current?.sites ?? []).map(s => ({ ...s }))
    const sites: VersionSite[] = [...kept, ...plan.sites.filter(s => !kept.some(k => k.siteId === s.siteId))].map((s, i) => ({ ...s, order: i }))
    version = { source: 'client' as const, summary: [current?.summary ?? '', plan.summary].filter(Boolean).join(' '), sites }
  } else if (removeCity) {
    const sites = (current?.sites ?? []).filter(s => (s.citySlug ?? byId.get(s.siteId)?.citySlug) !== removeCity).map((s, i) => ({ ...s, order: i }))
    if (!sites.length) return NextResponse.json({ error: 'Keep at least one city in the proposal.' }, { status: 400 })
    version = { source: 'manual' as const, summary: current?.summary ?? '', sites }
  } else if (b.rerun === true) {
    const patch = b.brief ?? {}
    const brief: Brief = {
      ...doc.brief,
      audience: patch.audience != null ? str(patch.audience, 600) : doc.brief.audience,
      industry: patch.industry != null ? str(patch.industry, 80) : doc.brief.industry,
      objective: patch.objective != null && ['launch', 'awareness', 'footfall', 'event'].includes(String(patch.objective)) ? patch.objective : doc.brief.objective,
      formats: Array.isArray(patch.formats) ? patch.formats.map(f => str(f, 60)).filter(Boolean).slice(0, 8) : doc.brief.formats,
      targetSites: Number.isInteger(patch.targetSites) && (patch.targetSites as number) >= 2 && (patch.targetSites as number) <= 12 ? (patch.targetSites as number) : doc.brief.targetSites,
      durationWeeks: [2, 4, 8, 12].includes(Number(patch.durationWeeks)) ? Number(patch.durationWeeks) : doc.brief.durationWeeks,
      startDate: patch.startDate != null && /^\d{4}-\d{2}-\d{2}$/.test(String(patch.startDate)) ? String(patch.startDate) : doc.brief.startDate,
    }
    const pinned = Array.isArray(b.pinnedIds) ? b.pinnedIds.map(x => str(x, 80)).filter(id => byId.has(id)).slice(0, 30) : []
    const plan = await pickPlan(brief, pinned)
    version = { source: plan.source, summary: plan.summary, sites: plan.sites }
  } else {
    const raw = Array.isArray(b.sites) ? b.sites as { siteId?: unknown; reason?: unknown }[] : []
    const seen = new Set<string>()
    const sites: VersionSite[] = []
    for (const it of raw) {
      const id = str(it.siteId, 80), s = byId.get(id)
      if (!s || seen.has(id)) continue
      seen.add(id); sites.push({ siteId: id, siteName: s.name, reason: str(it.reason, 200) || 'Chosen by the planner.', order: sites.length, citySlug: s.citySlug })
      if (sites.length >= 30) break
    }
    if (!sites.length) return NextResponse.json({ error: 'Keep at least one site in the proposal.' }, { status: 400 })
    version = { source: 'manual' as const, summary: str(b.summary, 700) || current?.summary || '', sites }
  }

  if (!('addons' in version)) version = { ...version, addons: current?.addons ?? [] }
  const by = clientAction && !canEdit(grant, shareId) && b.by && typeof b.by.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.by.email)
    ? { name: str(b.by.name, 120), email: String(b.by.email).trim().toLowerCase().slice(0, 200), action: addon ? `Added ${addon.title}` : tier ? `Chose ${tier}` : addCity ? `Added ${addCity}` : weeks ? `Chose ${weeks} weeks` : 'Added sites from a suggestion' }
    : null
  if (by) await addParticipant(doc._id, by).catch(() => {})
  const v = await appendVersion(doc._id, version, nextN)
  if (doc.leadId && crmConfigured()) {
    const url = `${(process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin).replace(/\/$/, '')}/proposals/${shareId}`
    updateLead(doc.leadId, { [CRM_FIELDS.url]: url, [CRM_FIELDS.status]: by ? 'Updated (client)' : `Updated (v${v.n})`, [CRM_FIELDS.note]: by ? `${by.action} — by ${by.name || by.email} (${by.email})` : undefined }).catch(e => console.error('[proposals/versions] CRM update failed', e))
  }
  console.log(`[proposals] ${shareId} v${v.n} ${v.source} ${v.sites.length} sites`)
  return NextResponse.json({ ok: true, n: v.n, source: v.source })
}
