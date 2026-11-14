import 'server-only'

// Everything /staff/inventory shows, built from the latest daily pull plus the
// staff corrections: per site, what the API says, what the website shows, how
// its place was decided, its hygiene issues and its corrections with status.

import { PLACE_PLANS } from '@/data/place-names'
import { countrySnapshot, snapshotIndex } from './snapshot'
import { isPublishable, isTestRecord, trustedLevels, type PlaceSource } from './normalize'
import { listCorrections } from './corrections'
import { applyCorrections, statusOf, type Correction, type CorrectionStatus } from './correctionsCore'
import { issuesOf, type Issue } from './hygiene'
import { sitesFor } from './source'
import type { InventoryRecord, PublicSite } from './types'

export type StaffSite = {
  raw: InventoryRecord
  shown: InventoryRecord
  source: PlaceSource | 'staff'
  page: Pick<PublicSite, 'cityName' | 'citySlug' | 'areaName' | 'areaSlug' | 'slug'> | null
  issues: Issue[]
  corrections: (Correction & { status: CorrectionStatus })[]
  hidden: boolean
}

export async function staffCountries() {
  const index = snapshotIndex()
  return index ? Object.entries(index.countries).map(([slug, c]) => ({ slug, name: c.name, sites: c.sites, pulledAt: c.pulledAt ?? null, staging: !!c.staging })) : []
}

export async function staffSites(country: string): Promise<{ sites: StaffSite[]; pulledAt: string | null; staging: boolean; corrections: (Correction & { status: CorrectionStatus; siteName: string })[] }> {
  const snap = countrySnapshot(country)
  if (!snap) return { sites: [], pulledAt: null, staging: false, corrections: [] }
  const address = PLACE_PLANS[country]?.address ?? null
  const corrections = await listCorrections(country, true)
  const bySite = new Map<string, Correction[]>()
  for (const c of corrections) bySite.set(c.siteId, [...(bySite.get(c.siteId) ?? []), c])
  const pages = new Map((await sitesFor(country)).map(s => [s.id, s]))
  const sites: StaffSite[] = snap.records.filter(r => isPublishable(r) || (!isTestRecord(r) && bySite.has(r.id))).map(raw => {
    const list = bySite.get(raw.id) ?? []
    const applied = list.length ? applyCorrections(raw, list) : raw
    const locked = (applied as { placeLocked?: boolean }).placeLocked
    const placed = locked ? { record: applied, source: 'staff' as const } : trustedLevels(applied, address)
    const statuses = list.map(c => statusOf(c, raw))
    const p = pages.get(raw.id)
    return {
      raw, shown: placed.record, source: placed.source,
      page: p ? { cityName: p.cityName, citySlug: p.citySlug, areaName: p.areaName, areaSlug: p.areaSlug, slug: p.slug } : null,
      issues: issuesOf(raw, placed.record, placed.source, address, statuses),
      corrections: list.map((c, i) => ({ ...c, status: statuses[i] })),
      hidden: !!(applied as { hiddenByStaff?: boolean }).hiddenByStaff,
    }
  })
  const byId = new Map(snap.records.map(r => [r.id, r]))
  return {
    sites, pulledAt: snap.pulledAt, staging: snap.staging,
    corrections: corrections.map(c => ({ ...c, status: statusOf(c, byId.get(c.siteId)), siteName: byId.get(c.siteId)?.name ?? c.siteId })),
  }
}
