import { ensureMarkets } from '@/lib/proposal/marketsData'
import { NextRequest, NextResponse } from 'next/server'
import { inventoryEnabled } from '@/lib/inventory/source'
import { readProposalGrant, proposalCookie, withProposal } from '@/lib/proposal/access'
import { createProposal, getProposalByShareId, resolveSites, setCrm, addCityRequest, CRM_FIELDS } from '@/lib/proposal/store'
import { pickPlan } from '@/lib/proposal/pick'
import { marketOf, cityOf, targetSitesFor, DURATIONS } from '@/lib/proposal/markets'
import { crmConfigured, updateLead } from '@/lib/zoho-crm'
import type { Brief, Objective } from '@/lib/proposal/types'

// Instant proposals.
//   POST /api/proposals { brief, shortlistIds, mode: 'brief' | 'shortlist' }
//     → { shareId, editToken, url }   (needs the registration cookie; 401 { error: 'register' } otherwise)
//   GET  /api/proposals?shareId=…     → the resolved view (public: anyone with the link)

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OBJECTIVES = new Set<Objective>(['launch', 'awareness', 'footfall', 'event'])
const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const DAILY_LIMIT = 20
const made = new Map<string, number[]>() // email → timestamps (per server instance; good enough to stop a loop)

function siteUrl(req: NextRequest) {
  return (process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin).replace(/\/$/, '')
}

export async function GET(req: NextRequest) {
  const shareId = req.nextUrl.searchParams.get('shareId') ?? ''
  const doc = await getProposalByShareId(shareId)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const view = await resolveSites(doc)
  const { editTokenHash: _h, creator, ...pub } = view.doc // eslint-disable-line @typescript-eslint/no-unused-vars
  return NextResponse.json({ ...view, doc: { ...pub, creator: { company: creator.company } } }, { headers: { 'cache-control': 'no-store' } })
}

export async function POST(req: NextRequest) {
  await ensureMarkets()
  const grant = await readProposalGrant()
  if (!grant) return NextResponse.json({ error: 'register' }, { status: 401 })
  if (!inventoryEnabled()) return NextResponse.json({ error: 'Proposals are not available yet.' }, { status: 503 })

  let b: { brief?: Record<string, unknown>; shortlistIds?: unknown; mode?: unknown }
  try { b = await req.json() } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }
  const raw = b.brief ?? {}
  const market = marketOf(str(raw.countrySlug, 40))
  if (!market) return NextResponse.json({ error: 'Pick a country.' }, { status: 400 })
  const countryWide = raw.countryWide === true
  const askedCities = Array.isArray(raw.cities) ? raw.cities.map(c => str(c, 60)).filter(c => cityOf(market.countrySlug, c)) : []
  const cities = countryWide ? market.cities.map(c => c.slug) : askedCities.length ? askedCities : [str(raw.citySlug, 60)].filter(c => cityOf(market.countrySlug, c))
  const availableCities = cities.filter(c => cityOf(market.countrySlug, c)?.available)
  // Every country is eligible (Rif, 11 Nov 2026). Where the site has no sites for the
  // brief yet, the brief still counts: it goes to the team as a request (CRM status
  // "Requested") and the visitor is told a planner builds it by hand.
  if (!availableCities.length) {
    const where = cities.length ? cities.map(c => cityOf(market.countrySlug, c)?.name ?? c).join(', ') : `${market.countryName}, nationwide`
    if (grant.leadId && crmConfigured()) {
      updateLead(grant.leadId, { [CRM_FIELDS.status]: 'Requested', [CRM_FIELDS.note]: `Instant proposal requested for ${where} (${market.countryName}): ${str(raw.objective, 20) || 'no objective'}, ${Number(raw.durationWeeks) || '?'} weeks, budget ${str(raw.budgetBand, 10) || 'not stated'}. ${str(raw.audience, 300)}`.trim() })
        .catch(e => console.error('[proposals] CRM request update failed', e))
    }
    console.log(`[proposals] request (no inventory yet) ${market.countrySlug} ${where} for ${grant.email}`)
    return NextResponse.json({ requested: true, where })
  }
  const lead = cityOf(market.countrySlug, availableCities[0])!

  const objective = OBJECTIVES.has(raw.objective as Objective) ? (raw.objective as Objective) : null
  const startDate = /^\d{4}-\d{2}-\d{2}$/.test(str(raw.startDate, 10)) ? str(raw.startDate, 10) : null
  const durationWeeks = (DURATIONS as readonly number[]).includes(Number(raw.durationWeeks)) ? Number(raw.durationWeeks) : null
  const budgetBand = ['low', 'mid', 'high'].includes(str(raw.budgetBand, 10)) ? str(raw.budgetBand, 10) : null
  const formats = Array.isArray(raw.formats) ? raw.formats.map(f => str(f, 60)).filter(Boolean).slice(0, 8) : []
  const wanted = Number(raw.targetSites)
  const brief: Brief = {
    countrySlug: market.countrySlug, cities, countryWide, citySlug: lead.slug, cityName: lead.name,
    startDate, durationWeeks, objective, audience: str(raw.audience, 600), industry: str(raw.industry, 80), budgetBand, formats,
    targetSites: Number.isInteger(wanted) && wanted >= 2 && wanted <= 12 ? wanted : targetSitesFor(budgetBand),
  }
  const shortlistIds = Array.isArray(b.shortlistIds) ? b.shortlistIds.map(x => str(x, 80)).filter(Boolean).slice(0, 30) : []
  const mode = b.mode === 'shortlist' ? 'shortlist' : 'brief'
  if (mode === 'shortlist' && shortlistIds.length === 0) return NextResponse.json({ error: 'Add at least one site, or describe your campaign.' }, { status: 400 })

  // Rate limit: a person makes at most 20 proposals a day.
  const now = Date.now(), hist = (made.get(grant.email) ?? []).filter(t => now - t < 86400_000)
  if (!grant.tester && hist.length >= DAILY_LIMIT) return NextResponse.json({ error: 'That is a lot of proposals for one day — our team will take it from here.' }, { status: 429 })

  const plan = await pickPlan(brief, shortlistIds, mode)
  if (!plan.candidates.length) return NextResponse.json({ error: 'No sites are listed for this market yet.' }, { status: 422 })
  if (!plan.sites.length) return NextResponse.json({ error: 'We could not match any sites. Try fewer filters.' }, { status: 422 })
  const pick = { source: plan.source, summary: plan.summary, sites: plan.sites }

  const creator = { name: grant.name, email: grant.email, company: grant.company, country: grant.country }
  const { doc, editToken } = await createProposal({ creator, leadId: grant.leadId, brief, version: pick })
  made.set(grant.email, [...hist, now])
  const url = `${siteUrl(req)}/proposals/${doc.shareId}`
  // Cities asked for without inventory yet are recorded as requests for the team.
  for (const c of cities.filter(c => !cityOf(market.countrySlug, c)?.available)) await addCityRequest(doc._id, c, grant.email).catch(() => {})

  // Tell the team: the CRM workflow emails the owner when Proposal_URL changes.
  if (grant.leadId && crmConfigured()) {
    updateLead(grant.leadId, { [CRM_FIELDS.url]: url, [CRM_FIELDS.status]: 'Sent' })
      .catch(e => { console.error('[proposals] CRM update failed', e); setCrm(doc._id, { crmError: String((e as Error).message ?? e).slice(0, 300) }).catch(() => {}) })
  }
  console.log(`[proposals] ${doc.shareId} v1 ${pick.source} ${pick.sites.length} sites for ${grant.email}`)

  const res = NextResponse.json({ shareId: doc.shareId, editToken, url, source: pick.source })
  res.cookies.set(proposalCookie(withProposal(grant, doc.shareId)))
  return res
}
