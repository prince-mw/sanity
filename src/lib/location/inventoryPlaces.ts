import 'server-only'

// The inventory decides which places exist (Rif, 11 Nov 2026): a city with
// sites gets a card on its country page and a page of its own, whether or not
// Sanity has a page for it. Sanity content attaches when the slugs meet; it is
// never a condition for showing inventory.

import { sitesFor } from '@/lib/inventory/source'
import type { PublicSite } from '@/lib/inventory/types'

export type CityCard = { country: string; city: string; href: string; description: string; billboards: string; image: string }

/** City cards for the inventory's cities that the CMS list does not have yet. */
export async function inventoryCityCards(countrySlug: string, have: CityCard[]): Promise<CityCard[]> {
  const known = new Set(have.map(c => c.href))
  const by = new Map<string, PublicSite[]>()
  for (const s of await sitesFor(countrySlug)) by.set(s.citySlug, [...(by.get(s.citySlug) ?? []), s])
  return Array.from(by.entries())
    .filter(([slug]) => !known.has(`/locations/${countrySlug}/${slug}`))
    .sort((a, b) => b[1].length - a[1].length)
    .map(([slug, list]) => {
      const areas = Array.from(new Set(list.map(s => s.areaName))).filter(a => a !== list[0].cityName).slice(0, 3)
      return {
        country: list[0].countryName, city: list[0].cityName, href: `/locations/${countrySlug}/${slug}`,
        description: `${list.length} advertising ${list.length === 1 ? 'site' : 'sites'}${areas.length ? ` across ${areas.join(', ')}` : ''}.`,
        billboards: String(list.length), image: list.find(s => s.photos[0])?.photos[0] ?? '',
      }
    })
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
