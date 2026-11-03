// Inventory pages: where the sites come from. Server code only — never import
// this from a client component.
// Until INVENTORY_API_KEY is set this serves the Kuala Lumpur sample (src/data/inventory-sample.ts); with the
// key it will page through POST /inventories/search on the Inventory API.
// Pages only ever receive PublicSite — owners and prices stay on the server.

import { SAMPLE_RECORDS, SAMPLE_LEVELS, FAMOUS_AREAS } from '@/data/inventory-sample'
import { isPublishable, toPublicSite, toPriceQuote, areaPages, type AreaPage } from './normalize'
import type { InventoryRecord, PublicSite, PriceQuote } from './types'

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

async function records(countrySlug: string): Promise<InventoryRecord[]> {
  if (!inventoryEnabled()) return []
  // The live API call goes here once the key and the public/active values are
  // confirmed with the product manager. Until then: the sample, pilot only.
  return countrySlug === 'malaysia' ? SAMPLE_RECORDS : []
}

export async function sitesFor(countrySlug: string, citySlug?: string): Promise<PublicSite[]> {
  const levels = SAMPLE_LEVELS[countrySlug]
  if (!levels) return []
  return (await records(countrySlug))
    .filter(isPublishable)
    .map(r => toPublicSite(r, levels))
    .filter((s): s is PublicSite => !!s && (!citySlug || s.citySlug === citySlug))
}

export async function areasFor(countrySlug: string, citySlug: string): Promise<AreaPage[]> {
  return areaPages(await sitesFor(countrySlug, citySlug), FAMOUS_AREAS[`${countrySlug}/${citySlug}`] ?? [])
}

/** Prices, server-side only — called by /api/inventory/prices after the sign-up check. */
export async function pricesFor(countrySlug: string, ids: string[]): Promise<PriceQuote[]> {
  const want = new Set(ids)
  return (await records(countrySlug))
    .filter(r => want.has(r.id) && isPublishable(r))
    .map(toPriceQuote)
    .filter((p): p is PriceQuote => !!p)
}
