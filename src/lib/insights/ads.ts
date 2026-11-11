import 'server-only'
import { unstable_cache } from 'next/cache'
import { ga4Report } from './google'
import { periods, type RangeKey } from './ranges'

// Ads tab: Google Ads campaigns as reported by Google Analytics, which is linked to the company's Google
// Ads account. GA4 shows the account's cost in the property currency (SGD, checked against Google Ads
// billing). Its cost runs lower than the Google Ads bill: it leaves out tax and can miss part of
// Performance Max spend. Clicks, impressions, visits and leads are fine for comparing campaigns.
// GA4 notes:
// - Ad cost/clicks/impressions only combine with Google Ads dimensions (sessionGoogleAdsCampaignName etc.);
//   adding a date dimension multiplies rows, so periods are compared with two date ranges instead.
// - Visits and leads per campaign are separate requests (session and event scope).

const ADS_CURRENCY = 'SGD'

export interface AdsTotals {
  cost: number
  clicks: number
  impressions: number
  sessions: number
  engaged: number
  leads: number
}

export interface AdsCampaign extends AdsTotals {
  name: string
  prev: AdsTotals
}

export interface AdsDashboard {
  generatedAt: string
  range: RangeKey
  currency: string
  accounts: string[]
  current: AdsTotals
  previous: AdsTotals
  campaigns: AdsCampaign[]
}

const empty = (): AdsTotals => ({ cost: 0, clicks: 0, impressions: 0, sessions: 0, engaged: 0, leads: 0 })
const NOT_SET = /^\(not set\)$|^$/

async function build(range: RangeKey): Promise<AdsDashboard> {
  const p = periods(range)
  const dateRanges = [
    { startDate: p.start, endDate: p.end, name: 'cur' },
    { startDate: p.prevStart, endDate: p.prevEnd, name: 'prev' },
  ]
  const campaignDims = [{ name: 'sessionGoogleAdsCampaignName' }]
  const [costRows, accountRows, visitRows, leadRows] = await Promise.all([
    ga4Report({ dateRanges, dimensions: campaignDims, metrics: [{ name: 'advertiserAdCost' }, { name: 'advertiserAdClicks' }, { name: 'advertiserAdImpressions' }], limit: 1000 }),
    ga4Report({ dateRanges: [dateRanges[0]], dimensions: [{ name: 'sessionGoogleAdsAccountName' }, ...campaignDims], metrics: [{ name: 'advertiserAdCost' }], limit: 1000 }),
    ga4Report({ dateRanges, dimensions: campaignDims, metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }], limit: 1000 }),
    ga4Report({
      dateRanges, dimensions: campaignDims, metrics: [{ name: 'eventCount' }], limit: 1000,
      dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { matchType: 'BEGINS_WITH', value: 'generate_lead' } } },
    }),
  ])

  const campaigns = new Map<string, AdsCampaign>()
  const row = (name: string) => campaigns.get(name) || campaigns.set(name, { name, ...empty(), prev: empty() }).get(name)!
  // GA4 appends the date range name as the last dimension
  const slot = (dims: string[]) => {
    const name = dims[0]
    if (NOT_SET.test(name)) return null
    const r = row(name)
    return dims[dims.length - 1] === 'prev' ? r.prev : r
  }
  for (const { dims, mets } of costRows) {
    const t = slot(dims)
    if (!t) continue
    t.cost += mets[0]
    t.clicks += mets[1]
    t.impressions += mets[2]
  }
  for (const { dims, mets } of visitRows) {
    const t = slot(dims)
    if (!t) continue
    t.sessions += mets[0]
    t.engaged += mets[1]
  }
  for (const { dims, mets } of leadRows) {
    const t = slot(dims)
    if (t) t.leads += mets[0]
  }

  const all = [...campaigns.values()].filter((c) => c.cost || c.clicks || c.sessions || c.prev.cost || c.prev.sessions)
  const total = (pick: (c: AdsCampaign) => AdsTotals) => all.reduce((t, c) => {
    const x = pick(c)
    for (const k of Object.keys(t) as (keyof AdsTotals)[]) t[k] += x[k]
    return t
  }, empty())

  return {
    generatedAt: new Date().toISOString(),
    range,
    currency: ADS_CURRENCY,
    accounts: [...new Set(accountRows.map((r) => r.dims[0]).filter((a) => !NOT_SET.test(a)))],
    current: total((c) => c),
    previous: total((c) => c.prev),
    campaigns: all.sort((a, b) => b.cost - a.cost || b.sessions - a.sessions),
  }
}

// Bump when the calculation changes so cached results are rebuilt
const CACHE_VERSION = 'a1'

export const getAdsDashboard = (range: RangeKey) =>
  unstable_cache(() => build(range), ['internal-insights-ads', CACHE_VERSION, range], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })()
