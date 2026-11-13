import 'server-only'

// The inventory decides which places exist (Rif, 11 Nov 2026): a city with
// sites gets a card on its country page and a page of its own, whether or not
// Sanity has a page for it. Sanity content attaches when the slugs meet; it is
// never a condition for showing inventory.

import { sitesFor } from '@/lib/inventory/source'
import type { PublicSite } from '@/lib/inventory/types'

export type CityCard = { country: string; city: string; href: string; description: string; billboards: string; image: string }

/**
 * The country page's place cards: the CMS cards plus a card for every place
 * the inventory has that the CMS does not list yet. Every card shows the
 * inventory's site count, cards run biggest first, and no two inventory cards
 * share a photo (test data reuses one photo across hundreds of sites).
 */
export async function inventoryCityCards(countrySlug: string, have: CityCard[]): Promise<CityCard[]> {
  const by = new Map<string, PublicSite[]>()
  for (const s of await sitesFor(countrySlug)) by.set(s.citySlug, [...(by.get(s.citySlug) ?? []), s])
  if (!by.size) return have
  const count = (href: string) => by.get(href.split('/').pop() ?? '')?.length ?? 0
  const used = new Set(have.map(c => c.image).filter(Boolean))
  const added = Array.from(by.entries())
    .filter(([slug]) => !have.some(c => c.href === `/locations/${countrySlug}/${slug}`))
    .sort((a, b) => b[1].length - a[1].length)
    .map(([slug, list]) => {
      const areaCounts = new Map<string, number>()
      for (const s of list) if (s.areaName !== s.cityName) areaCounts.set(s.areaName, (areaCounts.get(s.areaName) ?? 0) + 1)
      const areas = [...areaCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([a]) => a)
      const image = list.flatMap(s => s.photos).find(u => !used.has(u)) ?? ''
      if (image) used.add(image)
      return {
        country: list[0].countryName, city: list[0].cityName, href: `/locations/${countrySlug}/${slug}`,
        description: `${list.length} advertising ${list.length === 1 ? 'site' : 'sites'}${areas.length ? ` across ${areas.join(', ')}` : ''}.`,
        billboards: String(list.length), image,
      }
    })
  return [...have.map(c => (count(c.href) ? { ...c, billboards: String(count(c.href)) } : c)), ...added]
    .sort((a, b) => count(b.href) - count(a.href))
}

/** The fields a city page needs, built from the inventory when Sanity has no page for the city. */
export async function inventoryCity(countrySlug: string, citySlug: string) {
  const sites = await sitesFor(countrySlug, citySlug)
  if (!sites.length) return null
  const name = sites[0].cityName, country = sites[0].countryName
  const description = `Billboard and digital out-of-home advertising in ${name}, ${country}: ${sites.length} ${sites.length === 1 ? 'site' : 'sites'} to plan, with their audiences and screen specifications.`
  return {
    _id: `inventory-${countrySlug}-${citySlug}`,
    city: name, slug: { current: citySlug }, country: { country, slug: { current: countrySlug } },
    heroTitle: `Billboard advertising in ${name}`, description, fullDescription: description,
    highVisibilityBillboards: [], mediaTypes: [], faqs: [], sections: [], isActive: true,
  }
}
