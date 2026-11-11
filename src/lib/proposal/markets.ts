// The choices the brief form offers. A proposal covers one country and one
// or more of its cities. Rif, 11 Nov 2026: EVERY country is eligible, and the
// inventory decides which cities exist — no hand-made list. `MARKETS` is a
// registry that ensureMarkets() (lib/proposal/marketsData.ts) fills on the
// server from the Sanity countries plus the countries and cities the inventory
// returns. `available` marks a city with sites; `weight` is its share of them.
// Client components get markets through props. The budget band never reaches
// the proposal page, it only sizes the site list.
import type { Objective } from './types'

export type City = { slug: string; name: string; available: boolean; weight: number }
export type Market = { countrySlug: string; countryName: string; cities: City[] }

export const MARKETS: Market[] = []
export function setMarkets(list: Market[]) { MARKETS.splice(0, MARKETS.length, ...list) }

/** "kuala-lumpur" -> "Kuala Lumpur": only a fallback until the registry is loaded. */
export const nameFromSlug = (slug: string) => slug.split('-').filter(Boolean).map(w => w[0].toUpperCase() + w.slice(1)).join(' ')

export const BUDGET_BANDS: { id: string; label: string; targetSites: number }[] = [
  { id: 'low', label: 'Under RM50k', targetSites: 3 },
  { id: 'mid', label: 'RM50k – RM150k', targetSites: 5 },
  { id: 'high', label: 'Over RM150k', targetSites: 8 },
]

export const OBJECTIVES: { id: Objective; label: string; hint: string }[] = [
  { id: 'launch', label: 'Launch', hint: 'A new product, store or campaign needs a moment' },
  { id: 'awareness', label: 'Awareness', hint: 'Be seen by as many of the right people as possible' },
  { id: 'footfall', label: 'Footfall', hint: 'Bring people into a store, mall or venue' },
  { id: 'event', label: 'Event', hint: 'Build up to a date, then be everywhere on the day' },
]

export const DURATIONS = [2, 4, 8, 12] as const

/** Every country is a market: before the registry knows it, a country still resolves, with no cities yet. */
export const marketOf = (countrySlug: string): Market | null => !countrySlug ? null
  : MARKETS.find(x => x.countrySlug === countrySlug) ?? { countrySlug, countryName: nameFromSlug(countrySlug), cities: [] }
export const cityOf = (countrySlug: string, citySlug: string): City | null => marketOf(countrySlug)?.cities.find(c => c.slug === citySlug) ?? null
export const cityNameOf = (countrySlug: string, citySlug: string) => cityOf(countrySlug, citySlug)?.name ?? nameFromSlug(citySlug)

/** Kept for callers that still think in one city: the market with that city attached. */
export const marketFor = (countrySlug: string, citySlug: string) => {
  const m = marketOf(countrySlug)
  const c = m?.cities.find(x => x.slug === citySlug)
  return m && c ? { ...m, city: c } : null
}

/** "Kuala Lumpur", "Kuala Lumpur and Penang", "Kuala Lumpur, Penang and Johor Bahru", or "Malaysia, nationwide". */
export function citiesLabel(countrySlug: string, cities: string[], countryWide = false): string {
  const m = marketOf(countrySlug)
  if (countryWide) return `${m?.countryName ?? countrySlug}, nationwide`
  const names = cities.map(c => cityNameOf(countrySlug, c))
  if (names.length <= 1) return names[0] ?? m?.countryName ?? countrySlug
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

export const targetSitesFor = (budgetBand: string | null | undefined, fallback = 5) =>
  BUDGET_BANDS.find(b => b.id === budgetBand)?.targetSites ?? fallback

/** How many sites each city should get out of the brief's target, by city weight (at least 2 where there is inventory). */
export function targetByCity(countrySlug: string, cities: string[], total: number): Record<string, number> {
  const avail = cities.map(c => cityOf(countrySlug, c)).filter((c): c is City => !!c && c.available)
  const sum = avail.reduce((a, c) => a + c.weight, 0) || 1
  const out: Record<string, number> = {}
  for (const c of avail) out[c.slug] = Math.max(2, Math.round(total * (c.weight / sum)))
  return out
}
