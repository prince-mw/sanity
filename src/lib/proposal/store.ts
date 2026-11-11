import 'server-only'
import { createHash, randomBytes } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { writeClient } from '@/sanity/lib/client'
import { sitesFor, indicativeInvestment } from '@/lib/inventory/source'
import { getSiteContent } from '@/lib/inventory/siteContent'
import type { PublicSite } from '@/lib/inventory/types'
import { OBJECTIVES, marketOf, cityOf, citiesLabel } from './markets'
import type { AudienceGroup, Brief, CityGroup, ProposalDoc, ProposalStatus, ProposalTotals, ProposalVersion, ProposalView, VersionSite } from './types'

// Proposals live in Sanity as `proposal` documents (studio/schemas/proposal.ts),
// written only from the API routes with the write token, read without the CDN
// so a fresh version shows the moment it is published.
//
// Zoho CRM Lead fields the routes set (Rif creates them in the CRM; updateLead
// drops any the CRM does not have, so the site works before they exist):
//   Proposal_URL     URL        the public link — a CRM workflow emails the owner when it changes
//   Proposal_Status  picklist   Registered | Sent | Updated | Approved | Changes requested
//   Proposal_Note    text       the latest change request
export const CRM_FIELDS = { url: 'Proposal_URL', status: 'Proposal_Status', note: 'Proposal_Note' } as const

// Local only: PROPOSAL_STORE=file keeps proposals as JSON files under
// .proposals-dev/ (git-ignored) so the flow can be tried on a machine whose
// Sanity token cannot create documents, including a private audit build.
// The variable is never set on Amplify, so staging and production use Sanity.
const fileStore = () => process.env.PROPOSAL_STORE === 'file'
const FILE_DIR = path.join(process.cwd(), '.proposals-dev')
const fileOf = (id: string) => path.join(FILE_DIR, `${id.replace(/[^A-Za-z0-9_-]/g, '')}.json`)
async function fileRead(docId: string): Promise<ProposalDoc | null> { try { return JSON.parse(await fs.readFile(fileOf(docId), 'utf8')) } catch { return null } }
async function fileWrite(doc: ProposalDoc) { await fs.mkdir(FILE_DIR, { recursive: true }); await fs.writeFile(fileOf(doc._id), JSON.stringify(doc, null, 2)) }

export const newShareId = () => randomBytes(9).toString('base64url')      // 12 chars, 72 bits
export const newEditToken = () => randomBytes(24).toString('base64url')   // 32 chars
export const hashToken = (t: string) => createHash('sha256').update(t).digest('hex')

export const parseFigure = (s: string | null | undefined): number | null => {
  if (!s) return null
  const n = Number(String(s).replace(/\D/g, ''))
  return Number.isFinite(n) && n > 0 ? n : null
}

const fmtDate = (iso: string | null) => {
  if (!iso) return null
  const d = new Date(`${iso}T00:00:00Z`)
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

/** "Launch campaign · Kuala Lumpur and Penang · from 12 Jan 2027" */
export function titleLineFor(brief: Brief): string {
  const obj = OBJECTIVES.find(o => o.id === brief.objective)?.label
  const start = fmtDate(brief.startDate)
  const where = brief.cities?.length ? citiesLabel(brief.countrySlug, brief.cities, brief.countryWide) : brief.cityName
  return [obj ? `${obj} campaign` : 'OOH campaign', where, start ? `from ${start}` : null].filter(Boolean).join(' · ')
}

export function totalsFor(sites: PublicSite[], investment: ProposalTotals['investment'] = null): ProposalTotals {
  const reach = sites.map(s => parseFigure(s.audience?.reach)).filter((n): n is number => n != null)
  const imp = sites.map(s => parseFigure(s.audience?.impressions)).filter((n): n is number => n != null)
  const withFigures = sites.filter(s => parseFigure(s.audience?.reach) != null || parseFigure(s.audience?.impressions) != null).length
  return { sites: sites.length, withFigures, reach: reach.length ? reach.reduce((a, b) => a + b, 0) : null, impressions: imp.length ? imp.reduce((a, b) => a + b, 0) : null, investment }
}

/**
 * The audiences a plan reaches: each site's personas (who / when / why, written
 * per site) merged by audience type, keeping the fullest description and the
 * sites that reach it. Sorted by how many sites reach the group.
 */
export async function audienceFor(sites: PublicSite[]): Promise<AudienceGroup[]> {
  const groups = new Map<string, AudienceGroup>()
  const contents = await Promise.all(sites.map(s => getSiteContent(s).catch(() => null)))
  sites.forEach((s, i) => {
    for (const p of contents[i]?.personas ?? []) {
      const key = p.icon || 'other'
      const g = groups.get(key) ?? { key, label: AUDIENCE_LABELS[key] ?? 'Other audiences', icon: p.icon, members: [] }
      if (!g.members.some(m => m.siteId === s.id)) g.members.push({ siteId: s.id, siteName: s.name, name: p.name, who: p.who, when: p.when, why: p.why })
      groups.set(key, g)
    }
  })
  return Array.from(groups.values()).sort((a, b) => b.members.length - a.members.length || a.label.localeCompare(b.label))
}

const AUDIENCE_LABELS: Record<string, string> = {
  commuter: 'Commuters', office: 'Office workers and decision-makers', shopper: 'Shoppers', tourist: 'Tourists and visitors',
  traveller: 'Business and hotel travellers', resident: 'Nearby residents', driver: 'Drivers', student: 'Students',
  family: 'Families', nightlife: 'Evening and nightlife crowd',
}

const DOC_FIELDS = `_id, shareId, editTokenHash, status, titleLine, creator, leadId, crmError, brief, currentVersion, versions, changeRequests, approvedAt, createdAt, updatedAt`

const norm = (d: ProposalDoc | null): ProposalDoc | null => d ? {
  ...d, versions: d.versions ?? [], changeRequests: d.changeRequests ?? [], cityRequests: d.cityRequests ?? [], leadId: d.leadId ?? null, approvedAt: d.approvedAt ?? null,
  brief: { ...d.brief, formats: d.brief?.formats ?? [], audience: d.brief?.audience ?? '', industry: d.brief?.industry ?? '',
    cities: d.brief?.cities?.length ? d.brief.cities : [d.brief?.citySlug].filter(Boolean) as string[], countryWide: !!d.brief?.countryWide },
} : null

export async function getProposalByShareId(shareId: string): Promise<ProposalDoc | null> {
  if (!/^[A-Za-z0-9_-]{8,32}$/.test(shareId)) return null
  if (fileStore()) return norm(await fileRead(`proposal-${shareId}`))
  const d = await writeClient.fetch<ProposalDoc | null>(`*[_type == "proposal" && shareId == $shareId][0]{ ${DOC_FIELDS} }`, { shareId })
  return norm(d)
}

export async function createProposal(input: {
  creator: ProposalDoc['creator']; leadId: string | null; brief: Brief; version: Omit<ProposalVersion, 'n' | 'createdAt'>
}): Promise<{ doc: ProposalDoc; editToken: string }> {
  const now = new Date().toISOString()
  const editToken = newEditToken()
  const v1: ProposalVersion = { n: 1, createdAt: now, ...input.version }
  const doc = {
    _type: 'proposal', shareId: newShareId(), editTokenHash: hashToken(editToken), status: 'sent' as ProposalStatus,
    titleLine: titleLineFor(input.brief), creator: input.creator, leadId: input.leadId, brief: input.brief,
    currentVersion: 1, versions: [withKeys(v1)], changeRequests: [], cityRequests: [], approvedAt: null, createdAt: now, updatedAt: now,
  }
  if (fileStore()) { const d = { ...doc, _id: `proposal-${doc.shareId}` } as ProposalDoc; await fileWrite(d); return { doc: norm(d) as ProposalDoc, editToken } }
  const created = await writeClient.create(doc)
  return { doc: norm({ ...doc, _id: created._id } as ProposalDoc) as ProposalDoc, editToken }
}

// Sanity array items need a _key for the Studio to render them.
const withKeys = (v: ProposalVersion) => ({ _key: `v${v.n}`, ...v, sites: v.sites.map((s, i) => ({ _key: `${v.n}-${i}-${s.siteId}`, ...s })) })

/** Appends a version, makes it current, and sets the status back to sent (the list changed). */
export async function appendVersion(docId: string, version: Omit<ProposalVersion, 'n' | 'createdAt'>, nextN: number): Promise<ProposalVersion> {
  const v: ProposalVersion = { n: nextN, createdAt: new Date().toISOString(), ...version }
  if (fileStore()) { const d = await fileRead(docId); if (d) await fileWrite({ ...d, versions: [...(d.versions ?? []), v], currentVersion: nextN, status: 'sent', updatedAt: v.createdAt, approvedAt: null }); return v }
  await writeClient.patch(docId).setIfMissing({ versions: [] }).append('versions', [withKeys(v)])
    .set({ currentVersion: nextN, status: 'sent', updatedAt: v.createdAt, approvedAt: null }).commit()
  return v
}

export async function setStatus(docId: string, status: ProposalStatus, extra?: { message?: string }): Promise<void> {
  const now = new Date().toISOString()
  if (fileStore()) {
    const d = await fileRead(docId)
    if (d) await fileWrite({ ...d, status, updatedAt: now, approvedAt: status === 'approved' ? now : d.approvedAt, changeRequests: status === 'changes-requested' ? [...(d.changeRequests ?? []), { at: now, message: extra?.message ?? '' }] : d.changeRequests })
    return
  }
  let p = writeClient.patch(docId).set({ status, updatedAt: now })
  if (status === 'approved') p = p.set({ approvedAt: now })
  if (status === 'changes-requested') p = p.setIfMissing({ changeRequests: [] }).append('changeRequests', [{ _key: `cr-${Date.now()}`, at: now, message: extra?.message ?? '' }])
  await p.commit()
}

/** A client or the creator asked for a city that has no inventory yet; the team follows up. */
export async function addCityRequest(docId: string, citySlug: string, by?: string): Promise<void> {
  const now = new Date().toISOString()
  const item = { _key: `city-${citySlug}-${Date.now()}`, at: now, citySlug, by }
  if (fileStore()) { const d = await fileRead(docId); if (d) await fileWrite({ ...d, cityRequests: [...(d.cityRequests ?? []), item], updatedAt: now }); return }
  await writeClient.patch(docId).setIfMissing({ cityRequests: [] }).append('cityRequests', [item]).set({ updatedAt: now }).commit()
}

export async function setCrm(docId: string, fields: { leadId?: string | null; crmError?: string | null }): Promise<void> {
  if (fileStore()) { const d = await fileRead(docId); if (d) await fileWrite({ ...d, ...fields }); return }
  await writeClient.patch(docId).set(fields).commit()
}

/** The current version's sites, resolved from the inventory in order, with each one's reason. */
export async function resolveSites(doc: ProposalDoc, version = doc.versions.find(v => v.n === doc.currentVersion) ?? doc.versions[doc.versions.length - 1]): Promise<ProposalView> {
  // Every city of the market is loaded (the plan's cities and the ones on offer); a site's city comes from the inventory, not the stored tag.
  const market = marketOf(doc.brief.countrySlug)
  const citySlugs = Array.from(new Set([...(doc.brief.cities ?? []), ...(market?.cities.filter(c => c.available).map(c => c.slug) ?? [])]))
  const perCity = await Promise.all(citySlugs.map(async c => [c, cityOf(doc.brief.countrySlug, c)?.available ? await sitesFor(doc.brief.countrySlug, c) : []] as const))
  const byId = new Map<string, PublicSite>()
  for (const [, list] of perCity) for (const s of list) byId.set(s.id, s)
  const ordered = [...(version?.sites ?? [])].sort((a, b) => a.order - b.order)
  const sites: (PublicSite & { reason: string })[] = [], missing: VersionSite[] = []
  for (const vs of ordered) {
    const s = byId.get(vs.siteId)
    if (s) sites.push({ ...s, reason: vs.reason }); else missing.push(vs)
  }
  const [investment, audience] = await Promise.all([
    indicativeInvestment(doc.brief.countrySlug, sites.map(s => s.id), doc.brief.durationWeeks),
    audienceFor(sites),
  ])
  const requested = new Set((doc.cityRequests ?? []).map(r => r.citySlug))
  const cities: CityGroup[] = (market?.cities ?? []).map(c => {
    const here = sites.filter(s => s.citySlug === c.slug)
    const t = totalsFor(here)
    return { slug: c.slug, name: c.name, available: c.available, requested: requested.has(c.slug), sites: here.length, reach: t.reach, impressions: t.impressions }
  })
  return { doc, version, sites, missing, totals: totalsFor(sites, investment), audience, cities }
}
