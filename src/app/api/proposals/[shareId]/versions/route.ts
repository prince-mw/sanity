import { NextRequest, NextResponse } from 'next/server'
import { sitesFor } from '@/lib/inventory/source'
import { readProposalGrant, canEdit } from '@/lib/proposal/access'
import { getProposalByShareId, appendVersion, CRM_FIELDS } from '@/lib/proposal/store'
import { pickSites } from '@/lib/proposal/pick'
import { crmConfigured, updateLead } from '@/lib/zoho-crm'
import type { Brief, VersionSite } from '@/lib/proposal/types'

// The creator publishes a new version (the public link shows it at once):
//   POST /api/proposals/<shareId>/versions
//     { sites: [{ siteId, reason }], summary }          → a manual version
//     { rerun: true, brief?: Partial<Brief>, pinnedIds } → Claude picks again
// Needs the creator cookie (set by /edit?t=<token> or by creating it).

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  const grant = await readProposalGrant()
  if (!canEdit(grant, shareId)) return NextResponse.json({ error: 'Only the person who created this proposal can change it.' }, { status: 403 })
  const doc = await getProposalByShareId(shareId)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  let b: { sites?: unknown; summary?: unknown; rerun?: unknown; brief?: Partial<Brief>; pinnedIds?: unknown }
  try { b = await req.json() } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }

  const candidates = await sitesFor(doc.brief.countrySlug, doc.brief.citySlug)
  const byId = new Map(candidates.map(s => [s.id, s]))
  const nextN = (doc.versions.reduce((m, v) => Math.max(m, v.n), 0) || doc.currentVersion || 0) + 1

  let version
  if (b.rerun === true) {
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
    version = await pickSites(brief, candidates, pinned)
  } else {
    const raw = Array.isArray(b.sites) ? b.sites as { siteId?: unknown; reason?: unknown }[] : []
    const seen = new Set<string>()
    const sites: VersionSite[] = []
    for (const it of raw) {
      const id = str(it.siteId, 80), s = byId.get(id)
      if (!s || seen.has(id)) continue
      seen.add(id); sites.push({ siteId: id, siteName: s.name, reason: str(it.reason, 200) || 'Chosen by the planner.', order: sites.length })
      if (sites.length >= 30) break
    }
    if (!sites.length) return NextResponse.json({ error: 'Keep at least one site in the proposal.' }, { status: 400 })
    const current = doc.versions.find(v => v.n === doc.currentVersion)
    version = { source: 'manual' as const, summary: str(b.summary, 700) || current?.summary || '', sites }
  }

  const v = await appendVersion(doc._id, version, nextN)
  if (doc.leadId && crmConfigured()) {
    const url = `${(process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin).replace(/\/$/, '')}/proposals/${shareId}`
    updateLead(doc.leadId, { [CRM_FIELDS.url]: url, [CRM_FIELDS.status]: `Updated (v${v.n})` }).catch(e => console.error('[proposals/versions] CRM update failed', e))
  }
  console.log(`[proposals] ${shareId} v${v.n} ${v.source} ${v.sites.length} sites`)
  return NextResponse.json({ ok: true, n: v.n, source: v.source })
}
