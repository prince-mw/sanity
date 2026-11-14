// Inventory pages: where the sites come from. Server code only — never import
// this from a client component.
// With a snapshot from `npm run inventory:pull` (scripts/inventory-pull.mjs,
// reading the Inventory API) the pages show that; without one they show the
// Kuala Lumpur sample (src/data/inventory-sample.ts) on dev and staging only.
// Pages only ever receive PublicSite — owners and prices stay on the server.

import { SAMPLE_RECORDS, SAMPLE_LEVELS, FAMOUS_AREAS } from '@/data/inventory-sample'
import { CITY_GUIDE_DRAFTS } from '@/data/city-guide-drafts'
import { COUNTRY_GUIDE_DRAFTS } from '@/data/country-guide-drafts'
import { PLACE_PLANS } from '@/data/place-names'
import { isPublishable, placementOf, defaultPins, isOutdoorRecord, needsPhoto, toPublicSite, areaPages, assignAreas, uniqueSlugs, placeOf, buildPlaceRules, slugify, type AreaPage, type AreaAnchor, type PlaceRules } from './normalize'
import { countrySnapshot, snapshotIndex, snapshotVersion, englishNames } from './snapshot'
import { listCorrections, correctionsStamp } from './corrections'
import { applyCorrections, type Correction } from './correctionsCore'
import type { InventoryRecord, LevelMap, PublicSite } from './types'

/** A snapshot of the live (production) API is in place. */
const liveSnapshot = () => { const i = snapshotIndex(); return !!i && !i.staging && Object.keys(i.countries).length > 0 }

/**
 * True while the pages show anything other than live inventory: the built-in
 * sample, or the staging API (Sandeep, 13 Nov 2026: staging holds test
 * inventory only). Such pages carry noindex and SAMPLE tags.
 */
export const usingSample = () => !liveSnapshot()

/**
 * Sample and test data must never reach the live site. They show only on a
 * developer's machine and on stg.movingwalls.com (or with INVENTORY_PREVIEW=1);
 * on production the inventory pages stay off until a live snapshot exists.
 */
export function inventoryEnabled(): boolean {
  if (liveSnapshot()) return true
  if (process.env.INVENTORY_PREVIEW === '1' || process.env.NODE_ENV === 'development') return true
  return /(^|\/\/)stg\./.test(process.env.NEXT_PUBLIC_SITE_URL ?? '')
}

/** The countries the inventory has sites in: the snapshot's list, else the sample's. */
export async function inventoryCountries(): Promise<{ slug: string; name: string }[]> {
  if (!inventoryEnabled()) return []
  const index = snapshotIndex()
  if (index) return Object.entries(index.countries).map(([slug, c]) => ({ slug, name: c.name }))
  const names = new Set(SAMPLE_RECORDS.map(r => r.adminLevel0Name?.trim()).filter((n): n is string => !!n))
  return Array.from(names).map(name => ({ slug: slugify(name), name }))
}

/** Which address level is the city and which the area. A country without a setting uses the common shape; toPublicSite falls back per record, so no site is dropped. */
const DEFAULT_LEVELS: LevelMap = { city: 2, area: 3 }

function records(countrySlug: string): { rows: InventoryRecord[]; test: boolean } {
  if (!inventoryEnabled()) return { rows: [], test: false }
  if (snapshotIndex()) {
    const snap = countrySnapshot(countrySlug)
    return { rows: snap?.records ?? [], test: !!snap?.staging }
  }
  return { rows: countrySlug === 'malaysia' ? SAMPLE_RECORDS : [], test: false }
}

/**
 * Named areas with a map point, from the city's written guide (its area cards).
 * Content attaches where it meets the inventory; it never decides which sites show.
 */
function areaAnchors(countrySlug: string, citySlug: string): AreaAnchor[] {
  const cities = CITY_GUIDE_DRAFTS[`${countrySlug}/${citySlug}`]?.audiences?.cities ?? []
  return cities.flatMap(c => (typeof c.lat === 'number' && typeof c.lng === 'number' && c.name ? [{ name: c.name, lat: c.lat, lng: c.lng }] : []))
}

/** A country's place rules, with its big cities from the approved country guide (null = address levels only). */
const placeRules = (countrySlug: string, kept: { r: InventoryRecord; s: PublicSite }[]): PlaceRules | null =>
  PLACE_PLANS[countrySlug] ? buildPlaceRules(PLACE_PLANS[countrySlug], COUNTRY_GUIDE_DRAFTS[countrySlug]?.audiences?.cities ?? [], kept) : null

// Normalising ~10,000 records is cheap once, not on every call: keep the
// result per country until its snapshot file changes.
const normalised = new Map<string, { version: string; sites: PublicSite[] }>()

function countrySites(countrySlug: string, corrections: Correction[] = []): PublicSite[] {
  const version = `${snapshotVersion(countrySlug)}|${correctionsStamp(corrections)}|${Object.keys(englishNames(countrySlug)).length}`
  const key = `${countrySlug}:${inventoryEnabled()}`
  const hit = normalised.get(key)
  if (hit && hit.version === version) return hit.sites
  const { rows, test } = records(countrySlug)
  const levels = SAMPLE_LEVELS[countrySlug] ?? DEFAULT_LEVELS
  // The display bar (placementOf; Rif, 14 Nov 2026): show only when two of stored state, map
  // point and address agree; a wrong or default pin shows without a pin; the rest is held.
  // `r` from here on carries the agreed levels.
  const address = PLACE_PLANS[countrySlug]?.address ?? null
  const pins = defaultPins(rows.filter(isPublishable))
  const english = englishNames(countrySlug)
  // Staff corrections first (correctionsCore.ts): a corrected place is locked against the
  // map-point rule, and a site staff hid never reaches a page.
  const bySite = new Map<string, Correction[]>()
  for (const c of corrections) bySite.set(c.siteId, [...(bySite.get(c.siteId) ?? []), c])
  const kept = rows.filter(isPublishable)
    .map(raw => (bySite.has(raw.id) ? applyCorrections(raw, bySite.get(raw.id)!) : raw))
    // English names (Rif, 14 Nov 2026: English only), unless staff corrected the name.
    .map(r => (r.name && english[r.name] && !(bySite.get(r.id) ?? []).some(c => c.field === 'name') ? { ...r, name: english[r.name] } : r))
    .filter(r => !(r as { hiddenByStaff?: boolean }).hiddenByStaff)
    .filter(r => !needsPhoto(r))
    .flatMap(r => {
      if ((r as { placeLocked?: boolean }).placeLocked) return [r]
      const p = placementOf(r, address, pins.has(r.geoms?.[0] ?? '') && isOutdoorRecord(r))
      return p.display === 'hold' ? [] : [p.record]
    })
    .flatMap(r => { const s = toPublicSite(r, levels); return s ? [{ r, s }] : [] })
  const rules = placeRules(countrySlug, kept)
  const base = rules ? kept.map(({ r, s }) => placeOf(r, s, rules)) : kept.map(({ s }) => s)
  const byCity = new Map<string, PublicSite[]>()
  for (const s of base) byCity.set(s.citySlug, [...(byCity.get(s.citySlug) ?? []), s])
  const sites = uniqueSlugs(Array.from(byCity.entries()).flatMap(([city, list]) => assignAreas(list, areaAnchors(countrySlug, city))))
    .map(s => (test ? { ...s, sample: true } : s))
    // Sites with a photo lead every list; the API's own order is kept within each group.
    .sort((a, b) => Number(b.photos.length > 0) - Number(a.photos.length > 0))
  normalised.set(key, { version, sites })
  return sites
}

export async function sitesFor(countrySlug: string, citySlug?: string): Promise<PublicSite[]> {
  const all = countrySites(countrySlug, snapshotIndex() ? await listCorrections(countrySlug) : [])
  return citySlug ? all.filter(s => s.citySlug === citySlug) : all
}

export async function areasFor(countrySlug: string, citySlug: string): Promise<AreaPage[]> {
  const famous = [
    ...areaAnchors(countrySlug, citySlug).map(a => a.name),
    ...(snapshotIndex() ? [] : FAMOUS_AREAS[`${countrySlug}/${citySlug}`] ?? []),
  ].filter((n, i, a) => a.indexOf(n) === i)
  return areaPages(await sitesFor(countrySlug, citySlug), famous)
}

/**
 * Indicative media investment for a set of sites over a campaign length, as a
 * range (±10% of the summed monthly rates), server-side only. The per-site
 * rates never leave this function: a proposal shows one total, marked an
 * estimate (Rif, 11 Nov 2026).
 */
export async function indicativeInvestment(countrySlug: string, ids: string[], weeks: number | null): Promise<{ currency: string; low: number; high: number; priced: number } | null> {
  const want = new Set(ids)
  const rows = records(countrySlug).rows.filter(r => want.has(r.id) && isPublishable(r))
  const months = Math.max(0.25, (weeks ?? 4) / 4.33)
  let sum = 0, priced = 0, currency = 'MYR'
  for (const r of rows) {
    const p = (r.prices ?? []).find(x => x.monthly || x.daily)
    if (!p) continue
    const monthly = p.monthly ?? (p.daily ? p.daily * 30 : 0)
    if (!monthly) continue
    sum += monthly * months; priced++; currency = p.currency ?? currency
  }
  if (!priced) return null
  const round = (n: number) => Math.round(n / 1000) * 1000
  return { currency, low: round(sum * 0.9), high: round(sum * 1.1), priced }
}
