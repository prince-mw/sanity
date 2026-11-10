// The choices the brief form offers. Markets list only where the inventory
// has sites (Kuala Lumpur until the Inventory API key arrives); the budget
// band never reaches the proposal page, it only sizes the site list.
import type { Objective } from './types'

export type Market = { countrySlug: string; countryName: string; cities: { slug: string; name: string }[] }

export const MARKETS: Market[] = [
  { countrySlug: 'malaysia', countryName: 'Malaysia', cities: [{ slug: 'kuala-lumpur', name: 'Kuala Lumpur' }] },
]

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

export const marketFor = (countrySlug: string, citySlug: string) => {
  const m = MARKETS.find(x => x.countrySlug === countrySlug)
  const c = m?.cities.find(x => x.slug === citySlug)
  return m && c ? { ...m, city: c } : null
}

export const targetSitesFor = (budgetBand: string | null | undefined, fallback = 5) =>
  BUDGET_BANDS.find(b => b.id === budgetBand)?.targetSites ?? fallback
