import 'server-only'

// Builds the market registry (Rif, 11 Nov 2026): every country on the site is
// a market, plus any country the inventory has that the site does not list
// yet. A market's cities are the cities the INVENTORY returns, ranked by how
// many sites each has; city pages in Sanity with no sites yet are added as
// "on request". Nothing here is a hand-made list of places, so new inventory
// shows up without a code change.

import { getAllLocations, getCitiesByCountry } from '@/sanity/lib/fetch'
import { inventoryCountries, sitesFor } from '@/lib/inventory/source'
import { MARKETS, nameFromSlug, setMarkets, type City, type Market } from './markets'

/** Location pages that are not one country: language editions and regions. */
const NOT_A_COUNTRY = (slug: string) => /-(es|pt|zh)$/.test(slug) || ['americas', 'europe', 'africa'].includes(slug)
const TTL = 10 * 60_000
let loadedAt = 0
let loading: Promise<Market[]> | null = null

async function build(): Promise<Market[]> {
  const [locations, fromInventory] = await Promise.all([getAllLocations().catch(() => []), inventoryCountries().catch(() => [])])
  const countries = new Map<string, string>()
  for (const l of locations) { const slug = l.slug?.current; if (slug && !NOT_A_COUNTRY(slug)) countries.set(slug, l.country || nameFromSlug(slug)) }
  for (const c of fromInventory) if (!countries.has(c.slug)) countries.set(c.slug, c.name)

  const markets = await Promise.all(Array.from(countries.entries()).map(async ([countrySlug, countryName]): Promise<Market> => {
    const [sites, pages] = await Promise.all([sitesFor(countrySlug), getCitiesByCountry(countrySlug).catch(() => [])])
    const counts = new Map<string, { name: string; n: number }>()
    for (const s of sites) counts.set(s.citySlug, { name: s.cityName, n: (counts.get(s.citySlug)?.n ?? 0) + 1 })
    const most = Math.max(1, ...Array.from(counts.values()).map(c => c.n))
    const cities: City[] = Array.from(counts.entries()).map(([slug, c]) => ({ slug, name: c.name, available: true, weight: Math.max(0.3, Math.round((c.n / most) * 100) / 100) }))
    for (const p of pages) {
      const slug = p.slug?.current
      if (slug && !counts.has(slug)) cities.push({ slug, name: p.city || nameFromSlug(slug), available: false, weight: 0.3 })
    }
    cities.sort((a, b) => Number(b.available) - Number(a.available) || b.weight - a.weight || a.name.localeCompare(b.name))
    return { countrySlug, countryName, cities }
  }))
  // Markets with sites first, then the rest alphabetically.
  return markets.sort((a, b) => Number(b.cities.some(c => c.available)) - Number(a.cities.some(c => c.available)) || a.countryName.localeCompare(b.countryName))
}

/** Fill the registry (cached for ten minutes) and return it. Call before reading MARKETS on the server. */
export async function ensureMarkets(): Promise<Market[]> {
  if (MARKETS.length && Date.now() - loadedAt < TTL) return MARKETS
  loading ??= build().then(list => { setMarkets(list); loadedAt = Date.now(); return list }).finally(() => { loading = null })
  return loading
}
