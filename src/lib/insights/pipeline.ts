import 'server-only'
import { unstable_cache } from 'next/cache'
import { zohoTableRows } from './zoho'
import { getMarketingDealIds } from './leads'
import type { Dashboard } from './data'

// Pipeline & Targets tab: every Zoho CRM deal closing in the target year (not only deals from marketing
// leads, unlike the Leads & Deals tab) against the yearly revenue target per region from the Zoho Analytics
// table "Budget Region Summary 2026" (Marketing Team Workspace, created by the marketing ops team).
// Rules to confirm with sales / marketing ops, also listed on the tab:
// - Won = Closed Won or Billing; Lost = Closed Lost; Stalled is shown apart; every other stage is open.
// - Expected = won + open amount × the deal's win probability.
// - A deal's region comes from Country of Execution, else Country of Origin, else its sales territory.
// - Test deals and single deals worth more than half their region's yearly target are left out of the
//   totals and listed for checking.
// - "From marketing" = deals converted from an inbound lead (the deals' own Lead Source field is empty).

const TARGETS_TABLE = '2553974000072206020'
const DEALS_TABLE = '2553974000069802853'
export const TARGET_YEAR = 2026
// Deal names that are tests ("Concept test" is a real research product, so only a leading "test")
const TEST_DEAL = /^(test|dummy)\b/i

interface RegionDef { key: string; label: string; target: RegExp; countries: string[] }
// `target` matches the region's row in the targets table
const REGIONS: RegionDef[] = [
  { key: 'sea', label: 'South East Asia (excl. Philippines)', target: /south east asia/i, countries: ['singapore', 'malaysia', 'indonesia', 'republic of indonesia', 'thailand', 'vietnam', 'cambodia', 'myanmar', 'brunei', 'laos'] },
  { key: 'japan', label: 'Japan', target: /^japan/i, countries: ['japan'] },
  { key: 'usa', label: 'USA', target: /^usa/i, countries: ['united states', 'usa', 'canada'] },
  { key: 'philippines', label: 'Philippines', target: /^philippines/i, countries: ['philippines'] },
  { key: 'mena', label: 'MENA', target: /^mena/i, countries: ['united arab emirates', 'uae', 'saudi arabia', 'kuwait', 'oman', 'qatar', 'bahrain', 'jordan', 'egypt', 'morocco', 'algeria', 'lebanon', 'iraq', 'tunisia', 'turkey', 'kazakhstan'] },
  { key: 'africa', label: 'Africa', target: /^africa/i, countries: ['south africa', 'kenya', 'nigeria', 'ethiopia', 'zambia', 'ghana', 'tanzania', 'uganda', 'rwanda', 'mauritius', 'angola'] },
  { key: 'india', label: 'India', target: /^india/i, countries: ['india', 'sri lanka', 'maldives', 'bangladesh', 'nepal', 'pakistan'] },
  { key: 'europe', label: 'UK + Europe', target: /europe/i, countries: ['united kingdom', 'uk', 'germany', 'france', 'netherlands', 'spain', 'poland', 'sweden', 'italy', 'ireland', 'belgium', 'switzerland', 'denmark', 'norway', 'finland', 'portugal', 'austria', 'czech republic', 'greece', 'scotland', 'wales', 'northern ireland', 'cyprus', 'faroe islands', 'europe'] },
  { key: 'eastasia', label: 'Rest of East Asia', target: /rest of east asia/i, countries: ['hong kong', 'china', 'macao', 'macau', 'taiwan', 'south korea', 'korea', 'mongolia'] },
  { key: 'latam', label: 'LATAM', target: /^latam/i, countries: ['mexico', 'colombia', 'brazil', 'argentina', 'chile', 'peru', 'ecuador', 'panama', 'costa rica', 'guatemala', 'uruguay', 'americas'] },
  { key: 'australia', label: 'Australia', target: /^australia/i, countries: ['australia', 'new zealand'] },
]
const TERRITORY_REGION: Record<string, string> = { MENA: 'mena', Europe: 'europe', Americas: 'usa', 'North Asia': 'eastasia', ANZ: 'australia', Japan: 'japan' }
const regionByCountry = new Map(REGIONS.flatMap((r) => r.countries.map((c) => [c, r.key] as const)))
export const regionOfCountry = (country: string) => regionByCountry.get(country.toLowerCase().trim()) || null

const money = (s: string) => Number(String(s || '').replace(/[^0-9.-]/g, '')) || 0
const isoDate = (s: string) => {
  const m = (s || '').match(/(\d{2})\/(\d{2})\/(\d{4})/)
  return m ? `${m[3]}-${m[2]}-${m[1]}` : ''
}

type DealState = 'won' | 'open' | 'stalled' | 'lost'
const stateOf = (stage: string): DealState => (/won|billing/i.test(stage) ? 'won' : /lost/i.test(stage) ? 'lost' : /stalled/i.test(stage) ? 'stalled' : 'open')

export interface PipelineDeal {
  id: string
  name: string
  stage: string
  state: DealState
  amount: number
  probability: number
  closing: string
  owner: string
  region: string
  country: string
  marketing: boolean
}

export interface RegionRow {
  key: string
  label: string
  target: number
  budget: number
  won: number
  wonDeals: number
  open: number
  openDeals: number
  weighted: number
  openNoAmount: number
  overdue: number
  stalled: number
  stalledDeals: number
  forecast: number
  marketingPipeline: number
  status: 'On track' | 'At risk' | 'Behind' | 'No target'
  /** Website activity this year (Google Analytics), filled in by withWebsite() */
  websiteLeads?: number
  locationVisits?: number
}

export interface PipelineDashboard {
  generatedAt: string
  year: number
  /** Share of the year gone, 0–1 */
  yearElapsed: number
  regions: RegionRow[]
  total: RegionRow
  topOpen: (PipelineDeal & { regionLabel: string })[]
  toCheck: { deal: PipelineDeal; reason: string }[]
  unmapped: { country: string; deals: number }[]
  targetsNote: string
}

const statusOf = (forecast: number, target: number): RegionRow['status'] =>
  !target ? 'No target' : forecast >= target * 0.9 ? 'On track' : forecast >= target * 0.6 ? 'At risk' : 'Behind'

const build = unstable_cache(
  async (): Promise<PipelineDashboard> => {
    const targets = await zohoTableRows(TARGETS_TABLE)
    // All deals (about 9k rows); only the totals below are cached
    const rows = await zohoTableRows(DEALS_TABLE, {
      columns: ['Id', 'Deal Name', 'Stage', 'Amount', 'Probability (%)', 'Closing Date', 'Deal Owner Name', 'Country of Execution', 'Country(s) of Execution', 'Country of Origin', 'Territory'],
    })
    const marketingIds = await getMarketingDealIds()

    const targetOf = (r: RegionDef) => targets.find((t) => r.target.test((t['Region / Country'] || '').trim()))
    const today = new Date().toISOString().slice(0, 10)
    const start = Date.UTC(TARGET_YEAR, 0, 1)
    const yearElapsed = Math.min(1, Math.max(0, (Date.now() - start) / (Date.UTC(TARGET_YEAR + 1, 0, 1) - start)))

    const unmapped = new Map<string, number>()
    const deals: PipelineDeal[] = []
    for (const r of rows) {
      const closing = isoDate(r['Closing Date'])
      if (!closing.startsWith(String(TARGET_YEAR))) continue
      const candidates = [r['Country of Execution'], (r['Country(s) of Execution'] || '').split(/[;,]/)[0], r['Country of Origin']].map((c) => (c || '').trim()).filter(Boolean)
      const country = candidates.find((c) => regionOfCountry(c)) || candidates[0] || ''
      const region = (country && regionOfCountry(country)) || TERRITORY_REGION[r.Territory] || 'other'
      if (region === 'other') unmapped.set(country || r.Territory || '(none)', (unmapped.get(country || r.Territory || '(none)') || 0) + 1)
      deals.push({
        id: r.Id, name: r['Deal Name'] || '', stage: r.Stage || '', state: stateOf(r.Stage || ''), amount: money(r.Amount),
        probability: Number(r['Probability (%)']) || 0, closing, owner: r['Deal Owner Name'] || '', region, country: country || r.Territory || '',
        marketing: marketingIds.has(r.Id),
      })
    }

    const empty = (key: string, label: string, target = 0, budget = 0): RegionRow => ({
      key, label, target, budget, won: 0, wonDeals: 0, open: 0, openDeals: 0, weighted: 0, openNoAmount: 0, overdue: 0, stalled: 0, stalledDeals: 0, forecast: 0, marketingPipeline: 0, status: 'No target',
    })
    const regions = new Map<string, RegionRow>()
    for (const def of REGIONS) {
      const t = targetOf(def)
      regions.set(def.key, empty(def.key, def.label, money(t?.['Target (USD)'] || ''), money(t?.['Budget (USD)'] || '')))
    }
    regions.set('other', empty('other', 'Other / not mapped'))

    // Leave out test deals and implausibly large ones; list them for checking
    const toCheck: PipelineDashboard['toCheck'] = []
    for (const d of deals) {
      if (d.state === 'lost') continue
      const row = regions.get(d.region)!
      const limit = row.target ? row.target / 2 : 2_000_000
      const reason = TEST_DEAL.test(d.name.trim()) ? 'Looks like a test deal' : d.amount > limit ? `Amount is more than half the region’s yearly target` : ''
      if (reason) {
        toCheck.push({ deal: d, reason })
        continue
      }
      if (d.state === 'won') {
        row.won += d.amount
        row.wonDeals++
      } else if (d.state === 'stalled') {
        row.stalled += d.amount
        row.stalledDeals++
      } else {
        row.open += d.amount
        row.openDeals++
        row.weighted += (d.amount * d.probability) / 100
        if (!d.amount) row.openNoAmount++
        if (d.closing < today) row.overdue++
      }
      if (d.marketing && d.state !== 'stalled') row.marketingPipeline += d.amount
    }

    const all = [...regions.values()]
    for (const r of all) {
      r.forecast = r.won + r.weighted
      r.status = statusOf(r.forecast, r.target)
    }
    const total = empty('total', 'All regions', all.reduce((n, r) => n + r.target, 0), all.reduce((n, r) => n + r.budget, 0))
    for (const r of all) {
      for (const k of ['won', 'wonDeals', 'open', 'openDeals', 'weighted', 'openNoAmount', 'overdue', 'stalled', 'stalledDeals', 'forecast', 'marketingPipeline'] as const) total[k] += r[k]
    }
    total.status = statusOf(total.forecast, total.target)

    const labelOf = (key: string) => regions.get(key)?.label || key
    const skipped = new Set(toCheck.map((x) => x.deal.id))
    const topOpen = deals
      .filter((d) => d.state === 'open' && !skipped.has(d.id))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 15)
      .map((d) => ({ ...d, regionLabel: labelOf(d.region) }))

    return {
      generatedAt: new Date().toISOString(),
      year: TARGET_YEAR,
      yearElapsed,
      // Regions with a target first, biggest target first; "Other" last and only when it has deals
      regions: all.filter((r) => r.key !== 'other' || r.won || r.open || r.stalled).sort((a, b) => Number(b.key !== 'other') - Number(a.key !== 'other') || b.target - a.target),
      total,
      topOpen,
      toCheck: toCheck.sort((a, b) => b.deal.amount - a.deal.amount),
      unmapped: [...unmapped.entries()].map(([country, n]) => ({ country, deals: n })).sort((a, b) => b.deals - a.deals),
      targetsNote: targets.find((t) => /^note/i.test(t['Region / Country'] || ''))?.['Region / Country'] || '',
    }
  },
  ['internal-insights-pipeline', 'p2'],
  { revalidate: 6 * 60 * 60, tags: ['internal-insights'] },
)

export const getPipelineDashboard = () => build()

/** Adds this year's website leads and location-page visits (Location pages data) to each region */
export function withWebsite(data: PipelineDashboard, site: Dashboard | null): PipelineDashboard {
  if (!site) return data
  const regionOfPath = (path: string) => {
    const slug = (path.split('/')[2] || '').replace(/-(es|zh|pt)$/, '').replace(/-/g, ' ')
    return regionOfCountry(slug)
  }
  const leads = new Map<string, number>()
  for (const s of site.leadSources) {
    if (!s.isLocation) continue
    const key = regionOfPath(s.creditedTo)
    if (key) leads.set(key, (leads.get(key) || 0) + s.leads)
  }
  const visits = new Map<string, number>()
  for (const p of site.pages) {
    const key = regionOfPath(p.page)
    if (key) visits.set(key, (visits.get(key) || 0) + p.realSessions)
  }
  return { ...data, regions: data.regions.map((r) => ({ ...r, websiteLeads: leads.get(r.key) || 0, locationVisits: visits.get(r.key) || 0 })) }
}
