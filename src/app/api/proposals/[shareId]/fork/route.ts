import { ensureMarkets } from '@/lib/proposal/marketsData'
import { NextRequest, NextResponse } from 'next/server'
import { readProposalGrant, canEdit, proposalCookie, withProposal } from '@/lib/proposal/access'
import { getProposalByShareId, createProposal, CRM_FIELDS } from '@/lib/proposal/store'
import { pickPlan } from '@/lib/proposal/pick'
import { cityOf, marketOf } from '@/lib/proposal/markets'
import { crmConfigured, updateLead } from '@/lib/zoho-crm'
import type { Brief, Objective } from '@/lib/proposal/types'

// "Start a new proposal from this brief": a new proposal (new link) built for
// the changed brief, linked to the one it came from, which stays as it is.
//   POST /api/proposals/<shareId>/fork { brief?: Partial<Brief>, keepSites?: boolean } → { shareId, editToken, url }

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  await ensureMarkets()
  const { shareId } = await params
  const grant = await readProposalGrant()
  if (!grant || !canEdit(grant, shareId)) return NextResponse.json({ error: 'Only the person who created this proposal can start a new one from it.' }, { status: 403 })
  const doc = await getProposalByShareId(shareId)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  let b: { brief?: Partial<Brief> & { cities?: unknown; countryWide?: unknown }; keepSites?: unknown }
  try { b = await req.json() } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }
  const p = b.brief ?? {}
  const market = marketOf(doc.brief.countrySlug)
  const cities = Array.isArray(p.cities) ? p.cities.map(c => str(c, 60)).filter(c => cityOf(doc.brief.countrySlug, c)) : doc.brief.cities
  const countryWide = p.countryWide === true
  const allCities = countryWide ? (market?.cities.map(c => c.slug) ?? cities) : cities.length ? cities : doc.brief.cities
  const lead = allCities.map(c => cityOf(doc.brief.countrySlug, c)).find(c => c?.available) ?? cityOf(doc.brief.countrySlug, doc.brief.citySlug)
  if (!lead) return NextResponse.json({ error: 'Pick at least one city with inventory.' }, { status: 422 })
  const brief: Brief = {
    ...doc.brief, cities: allCities, countryWide, citySlug: lead.slug, cityName: lead.name,
    audience: p.audience != null ? str(p.audience, 600) : doc.brief.audience,
    industry: p.industry != null ? str(p.industry, 80) : doc.brief.industry,
    objective: p.objective != null && ['launch', 'awareness', 'footfall', 'event'].includes(String(p.objective)) ? (p.objective as Objective) : doc.brief.objective,
    formats: Array.isArray(p.formats) ? p.formats.map(f => str(f, 60)).filter(Boolean).slice(0, 8) : doc.brief.formats,
    targetSites: Number.isInteger(p.targetSites) && (p.targetSites as number) >= 2 && (p.targetSites as number) <= 12 ? (p.targetSites as number) : doc.brief.targetSites,
    durationWeeks: [2, 4, 8, 12].includes(Number(p.durationWeeks)) ? Number(p.durationWeeks) : doc.brief.durationWeeks,
    startDate: p.startDate != null && /^\d{4}-\d{2}-\d{2}$/.test(String(p.startDate)) ? String(p.startDate) : doc.brief.startDate,
    budgetBand: p.budgetBand != null && ['low', 'mid', 'high'].includes(String(p.budgetBand)) ? String(p.budgetBand) : doc.brief.budgetBand,
  }
  const current = doc.versions.find(v => v.n === doc.currentVersion)
  const pinned = b.keepSites === true ? (current?.sites ?? []).map(s => s.siteId) : []
  const plan = await pickPlan(brief, pinned)
  if (!plan.sites.length) return NextResponse.json({ error: 'We could not match any sites for that brief.' }, { status: 422 })
  const { doc: fresh, editToken } = await createProposal({ creator: doc.creator, leadId: doc.leadId, brief, version: { source: plan.source, summary: plan.summary, sites: plan.sites, addons: current?.addons ?? [] }, derivedFrom: doc.shareId })
  const url = `${(process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin).replace(/\/$/, '')}/proposals/${fresh.shareId}`
  if (doc.leadId && crmConfigured()) updateLead(doc.leadId, { [CRM_FIELDS.url]: url, [CRM_FIELDS.status]: 'Sent', [CRM_FIELDS.note]: `New proposal started from ${doc.shareId}` }).catch(e => console.error('[proposals/fork] CRM update failed', e))
  const res = NextResponse.json({ shareId: fresh.shareId, editToken, url })
  res.cookies.set(proposalCookie(withProposal(grant, fresh.shareId)))
  return res
}
