// Where the instant-proposal entry points may appear (Rif, 11 Nov 2026):
// only on pages that match a market we can plan. Articles qualify when they
// name the market (or one of its cities).
import { MARKETS } from './markets'
import { ensureMarkets } from './marketsData'
import { inventoryEnabled } from '@/lib/inventory/source'

const PLANNING = ['campaign planning', 'media plan', 'media planning', 'ooh planning', 'programmatic dooh', 'how to plan', 'plan a campaign', 'out-of-home campaign']

/** The market an article is about, by name or city, else null. */
export function marketMentioned(...texts: (string | null | undefined)[]): { countrySlug: string; countryName: string } | null {
  const hay = texts.filter(Boolean).join(' ').toLowerCase()
  if (!hay) return null
  for (const m of MARKETS) {
    const names = [m.countryName, ...m.cities.map(c => c.name)].map(n => n.toLowerCase())
    if (names.some(n => hay.includes(n))) return { countrySlug: m.countrySlug, countryName: m.countryName }
  }
  return null
}

export const aboutPlanning = (...texts: (string | null | undefined)[]) => { const hay = texts.filter(Boolean).join(' ').toLowerCase(); return PLANNING.some(p => hay.includes(p)) }

/** Which market the promo should name on an article page, or null to show nothing. */
export async function promoMarketFor(...texts: (string | null | undefined)[]): Promise<string | null> {
  if (!inventoryEnabled()) return null
  await ensureMarkets()
  // Naming the market is the only trigger: a planning article about another region
  // would send readers into a planner that does not cover it (Rif, 11 Nov 2026).
  const m = marketMentioned(...texts)
  return m ? m.countryName : null
}

/** Whether the site-wide entry points (header button, home section, Brands/Agencies band) show at all. */
export const promoEnabled = () => inventoryEnabled()
