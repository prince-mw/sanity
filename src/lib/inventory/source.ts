// Inventory pages: where the sites come from. Server code only — never import
// this from a client component.
// Until INVENTORY_API_KEY is set this serves the Kuala Lumpur sample (src/data/inventory-sample.ts); with the
// key it will page through POST /inventories/search on the Inventory API.
// Pages only ever receive PublicSite — owners and prices stay on the server.

import { SAMPLE_RECORDS, SAMPLE_LEVELS, FAMOUS_AREAS } from '@/data/inventory-sample'
import { isPublishable, toPublicSite, areaPages, slugify, type AreaPage } from './normalize'
import type { InventoryRecord, LevelMap, PublicSite } from './types'

export const usingSample = () => !process.env.INVENTORY_API_KEY

/**
 * Sample data must never reach the live site. It shows only on a developer's
 * machine and on stg.movingwalls.com (or with INVENTORY_PREVIEW=1); on
 * production the inventory pages stay off until the real API key is set.
 */
export function inventoryEnabled(): boolean {
  if (process.env.INVENTORY_API_KEY) return true
  if (process.env.INVENTORY_PREVIEW === '1' || process.env.NODE_ENV === 'development') return true
  return /(^|\/\/)stg\./.test(process.env.NEXT_PUBLIC_SITE_URL ?? '')
}

/** The countries the inventory has sites in. With the API this becomes one call; today it is the sample. */
export async function inventoryCountries(): Promise<{ slug: string; name: string }[]> {
  if (!inventoryEnabled()) return []
  const names = new Set(SAMPLE_RECORDS.map(r => r.adminLevel0Name?.trim()).filter((n): n is string => !!n))
  return Array.from(names).map(name => ({ slug: slugify(name), name }))
}

/** Which address level is the city and which the area. A country without a setting uses the common shape; toPublicSite falls back per record, so no site is dropped. */
const DEFAULT_LEVELS: LevelMap = { city: 2, area: 3 }

async function records(countrySlug: string): Promise<InventoryRecord[]> {
  if (!inventoryEnabled()) return []
  // The live API call goes here once the key and the public/active values are
  // confirmed with the product manager. Until then: the sample, pilot only.
  return countrySlug === 'malaysia' ? SAMPLE_RECORDS : []
}

export async function sitesFor(countrySlug: string, citySlug?: string): Promise<PublicSite[]> {
  const levels = SAMPLE_LEVELS[countrySlug] ?? DEFAULT_LEVELS
  return (await records(countrySlug))
    .filter(isPublishable)
    .map(r => toPublicSite(r, levels))
    .filter((s): s is PublicSite => !!s && (!citySlug || s.citySlug === citySlug))
}

export async function areasFor(countrySlug: string, citySlug: string): Promise<AreaPage[]> {
  return areaPages(await sitesFor(countrySlug, citySlug), FAMOUS_AREAS[`${countrySlug}/${citySlug}`] ?? [])
}

/**
 * Indicative media investment for a set of sites over a campaign length, as a
 * range (±10% of the summed monthly rates), server-side only. The per-site
 * rates never leave this function: a proposal shows one total, marked an
 * estimate (Rif, 11 Nov 2026).
 */
export async function indicativeInvestment(countrySlug: string, ids: string[], weeks: number | null): Promise<{ currency: string; low: number; high: number; priced: number } | null> {
  const want = new Set(ids)
  const rows = (await records(countrySlug)).filter(r => want.has(r.id) && isPublishable(r))
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
