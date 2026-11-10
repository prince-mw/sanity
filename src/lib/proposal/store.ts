import 'server-only'
import { createHash, randomBytes } from 'node:crypto'
import { writeClient } from '@/sanity/lib/client'
import { sitesFor } from '@/lib/inventory/source'
import type { PublicSite } from '@/lib/inventory/types'
import { OBJECTIVES } from './markets'
import type { Brief, ProposalDoc, ProposalStatus, ProposalTotals, ProposalVersion, ProposalView, VersionSite } from './types'

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

/** "Launch campaign · Kuala Lumpur · from 12 Jan 2027" */
export function titleLineFor(brief: Brief): string {
  const obj = OBJECTIVES.find(o => o.id === brief.objective)?.label
  const start = fmtDate(brief.startDate)
  return [obj ? `${obj} campaign` : 'OOH campaign', brief.cityName, start ? `from ${start}` : null].filter(Boolean).join(' · ')
}

export function totalsFor(sites: PublicSite[]): ProposalTotals {
  const reach = sites.map(s => parseFigure(s.audience?.reach)).filter((n): n is number => n != null)
  const imp = sites.map(s => parseFigure(s.audience?.impressions)).filter((n): n is number => n != null)
  const withFigures = sites.filter(s => parseFigure(s.audience?.reach) != null || parseFigure(s.audience?.impressions) != null).length
  return { sites: sites.length, withFigures, reach: reach.length ? reach.reduce((a, b) => a + b, 0) : null, impressions: imp.length ? imp.reduce((a, b) => a + b, 0) : null }
}

const DOC_FIELDS = `_id, shareId, editTokenHash, status, titleLine, creator, leadId, crmError, brief, currentVersion, versions, changeRequests, approvedAt, createdAt, updatedAt`

const norm = (d: ProposalDoc | null): ProposalDoc | null => d ? {
  ...d, versions: d.versions ?? [], changeRequests: d.changeRequests ?? [], leadId: d.leadId ?? null, approvedAt: d.approvedAt ?? null,
  brief: { ...d.brief, formats: d.brief?.formats ?? [], audience: d.brief?.audience ?? '', industry: d.brief?.industry ?? '' },
} : null

export async function getProposalByShareId(shareId: string): Promise<ProposalDoc | null> {
  if (!/^[A-Za-z0-9_-]{8,32}$/.test(shareId)) return null
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
    currentVersion: 1, versions: [withKeys(v1)], changeRequests: [], approvedAt: null, createdAt: now, updatedAt: now,
  }
  const created = await writeClient.create(doc)
  return { doc: norm({ ...doc, _id: created._id } as ProposalDoc) as ProposalDoc, editToken }
}

// Sanity array items need a _key for the Studio to render them.
const withKeys = (v: ProposalVersion) => ({ _key: `v${v.n}`, ...v, sites: v.sites.map((s, i) => ({ _key: `${v.n}-${i}-${s.siteId}`, ...s })) })

/** Appends a version, makes it current, and sets the status back to sent (the list changed). */
export async function appendVersion(docId: string, version: Omit<ProposalVersion, 'n' | 'createdAt'>, nextN: number): Promise<ProposalVersion> {
  const v: ProposalVersion = { n: nextN, createdAt: new Date().toISOString(), ...version }
  await writeClient.patch(docId).setIfMissing({ versions: [] }).append('versions', [withKeys(v)])
    .set({ currentVersion: nextN, status: 'sent', updatedAt: v.createdAt, approvedAt: null }).commit()
  return v
}

export async function setStatus(docId: string, status: ProposalStatus, extra?: { message?: string }): Promise<void> {
  const now = new Date().toISOString()
  let p = writeClient.patch(docId).set({ status, updatedAt: now })
  if (status === 'approved') p = p.set({ approvedAt: now })
  if (status === 'changes-requested') p = p.setIfMissing({ changeRequests: [] }).append('changeRequests', [{ _key: `cr-${Date.now()}`, at: now, message: extra?.message ?? '' }])
  await p.commit()
}

export async function setCrm(docId: string, fields: { leadId?: string | null; crmError?: string | null }): Promise<void> {
  await writeClient.patch(docId).set(fields).commit()
}

/** The current version's sites, resolved from the inventory in order, with each one's reason. */
export async function resolveSites(doc: ProposalDoc, version = doc.versions.find(v => v.n === doc.currentVersion) ?? doc.versions[doc.versions.length - 1]): Promise<ProposalView> {
  const all = await sitesFor(doc.brief.countrySlug, doc.brief.citySlug)
  const byId = new Map(all.map(s => [s.id, s]))
  const ordered = [...(version?.sites ?? [])].sort((a, b) => a.order - b.order)
  const sites: (PublicSite & { reason: string })[] = [], missing: VersionSite[] = []
  for (const vs of ordered) {
    const s = byId.get(vs.siteId)
    if (s) sites.push({ ...s, reason: vs.reason }); else missing.push(vs)
  }
  return { doc, version, sites, missing, totals: totalsFor(sites) }
}
