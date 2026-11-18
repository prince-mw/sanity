import 'server-only'
import { unstable_cache } from 'next/cache'
import { ga4Report, sheetTabs } from './google'
import { getInsightsConfig } from './config'
import { periods, type RangeKey } from './ranges'

// Ads tab: Google Ads campaigns.
// - Spend, clicks, impressions, conversions, impression share, countries, devices and search terms come from
//   Google Ads itself, via a Google Sheet that a Google Ads Script refreshes daily (read-only; the script is
//   kept outside this repo). Sheet ID: `googleAdsSheetId` in the private settings (config.ts).
// - Website visits and leads per campaign come from Google Analytics (linked to the Ads account), matched by
//   campaign name.
// - If the sheet isn't set up or can't be read, the tab falls back to Google Analytics for spend too. GA4's
//   cost runs lower than Google Ads (it leaves out part of the spend, e.g. Performance Max).
// GA4 notes:
// - Ad cost/clicks/impressions only combine with Google Ads dimensions (sessionGoogleAdsCampaignName etc.);
//   adding a date dimension multiplies rows, so periods are compared with two date ranges instead.
// - Visits and leads per campaign are separate requests (session and event scope).

const ADS_CURRENCY = 'SGD'

export interface AdsTotals {
  cost: number
  clicks: number
  impressions: number
  /** Conversions as Google Ads counts them (Google Ads data only) */
  conversions: number
  /** Website visits and form fills from the campaign (Google Analytics) */
  sessions: number
  engaged: number
  leads: number
}

export interface AdsCampaign extends AdsTotals {
  name: string
  prev: AdsTotals
  status?: string
  type?: string
  /** Latest daily budget */
  dailyBudget?: number
  /** Share of possible search impressions the ads got, and the share lost to a too-small budget (0–1) */
  impressionShare?: number
  budgetLost?: number
}

export interface AdsBreakdown { name: string; cost: number; clicks: number; conversions: number; prevCost: number; prevConversions: number }
export interface AdsSearchTerm { term: string; campaign: string; cost: number; clicks: number; conversions: number }
export interface AdsAlert { title: string; detail: string }

export interface AdsDashboard {
  generatedAt: string
  range: RangeKey
  currency: string
  /** 'google-ads': numbers from Google Ads (via the sheet); 'ga4': Google Analytics only */
  source: 'google-ads' | 'ga4'
  /** Why the Google Ads data couldn't be used (shown on the tab) */
  sourceNote?: string
  /** When the Google Ads Script last refreshed the sheet */
  adsUpdatedAt?: string
  accounts: string[]
  current: AdsTotals
  previous: AdsTotals
  campaigns: AdsCampaign[]
  countries: AdsBreakdown[]
  devices: AdsBreakdown[]
  conversionTypes: { name: string; conversions: number; prev: number }[]
  searchTerms: AdsSearchTerm[]
  /** Months the search terms cover (Google Ads reports search terms by calendar month here) */
  searchTermMonths: string[]
  alerts: AdsAlert[]
  /** What Google Analytics reported as spend, for comparison */
  ga4Cost: number
}

const empty = (): AdsTotals => ({ cost: 0, clicks: 0, impressions: 0, conversions: 0, sessions: 0, engaged: 0, leads: 0 })
const NOT_SET = /^\(not set\)$|^$/
const num = (s: string | undefined) => Number(String(s ?? '').replace(/,/g, '')) || 0

// Google Ads country codes are 2000 + the ISO 3166 numeric country code
const COUNTRIES: Record<string, string> = {
  '2356': 'India', '2458': 'Malaysia', '2360': 'Indonesia', '2702': 'Singapore', '2608': 'Philippines', '2392': 'Japan',
  '2156': 'China', '2344': 'Hong Kong', '2764': 'Thailand', '2840': 'United States', '2404': 'Kenya', '2704': 'Vietnam',
  '2036': 'Australia', '2050': 'Bangladesh', '2826': 'United Kingdom', '2784': 'United Arab Emirates', '2682': 'Saudi Arabia',
  '2634': 'Qatar', '2512': 'Oman', '2144': 'Sri Lanka', '2410': 'South Korea', '2158': 'Taiwan', '2276': 'Germany',
  '2250': 'France', '2528': 'Netherlands', '2566': 'Nigeria', '2288': 'Ghana', '2710': 'South Africa', '2124': 'Canada',
  '2076': 'Brazil', '2484': 'Mexico', '2170': 'Colombia', '2380': 'Italy', '2724': 'Spain', '2616': 'Poland', '2586': 'Pakistan',
  '2524': 'Nepal', '2116': 'Cambodia', '2104': 'Myanmar', '2096': 'Brunei', '2414': 'Kuwait', '2048': 'Bahrain', '2400': 'Jordan',
  '2818': 'Egypt', '2504': 'Morocco', '2554': 'New Zealand', '2031': 'Azerbaijan', '2446': 'Macao', '2418': 'Laos',
}
const DEVICES: Record<string, string> = { MOBILE: 'Mobile', DESKTOP: 'Desktop', TABLET: 'Tablet', CONNECTED_TV: 'TV', OTHER: 'Other' }

/** Google Analytics per campaign: cost/clicks/impressions (fallback), visits and leads, for both periods */
async function fromGa4(range: RangeKey) {
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
  return { campaigns, accounts: [...new Set(accountRows.map((r) => r.dims[0]).filter((a) => !NOT_SET.test(a)))] }
}

const SHEET_TABS = ['about', 'campaigns_daily', 'countries_daily', 'devices_daily', 'conversions_daily', 'search_terms_monthly']

/** Rows of a sheet tab as objects keyed by the header row */
const records = (rows: string[][] | undefined) => {
  if (!rows || rows.length < 2) return []
  const [header, ...body] = rows
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])) as Record<string, string>)
}

async function build(range: RangeKey): Promise<AdsDashboard> {
  const p = periods(range)
  const inCur = (d: string) => d >= p.start && d <= p.end
  const inPrev = (d: string) => d >= p.prevStart && d <= p.prevEnd

  const sheetId = (await getInsightsConfig()).googleAdsSheetId
  const [ga, sheet] = await Promise.all([
    fromGa4(range),
    sheetId ? sheetTabs(sheetId, SHEET_TABS).catch((err: Error) => err) : Promise.resolve(null),
  ])
  const gaTotal = [...ga.campaigns.values()].reduce((n, c) => n + c.cost, 0)

  const base = { generatedAt: new Date().toISOString(), range, currency: ADS_CURRENCY, ga4Cost: gaTotal }
  const finish = (campaigns: AdsCampaign[]) => {
    // Campaigns active in this period (a paused campaign that only spent last period still counts in the totals' comparison)
    const all = campaigns.filter((c) => c.cost || c.clicks || c.sessions || c.prev.cost || c.prev.sessions)
    const total = (pick: (c: AdsCampaign) => AdsTotals) => all.reduce((t, c) => {
      const x = pick(c)
      for (const k of Object.keys(t) as (keyof AdsTotals)[]) t[k] += x[k]
      return t
    }, empty())
    const shown = all.filter((c) => c.cost || c.clicks || c.sessions || c.leads)
    return { all: shown.sort((a, b) => b.cost - a.cost || b.sessions - a.sessions), current: total((c) => c), previous: total((c) => c.prev) }
  }

  // Google Analytics only (sheet not set up or unreadable)
  if (!sheet || sheet instanceof Error || !records(sheet.campaigns_daily).length) {
    const { all, current, previous } = finish([...ga.campaigns.values()])
    return {
      ...base, source: 'ga4',
      sourceNote: !sheetId ? undefined : sheet instanceof Error ? `The Google Ads sheet couldn't be read (${sheet.message}), so these numbers come from Google Analytics.` : 'The Google Ads sheet is empty, so these numbers come from Google Analytics.',
      accounts: ga.accounts, current, previous, campaigns: all,
      countries: [], devices: [], conversionTypes: [], searchTerms: [], searchTermMonths: [], alerts: [],
    }
  }

  // Campaigns: Google Ads numbers, plus visits and leads from Google Analytics by campaign name
  const campaigns = new Map<string, AdsCampaign & { eligible: number; lost: number; lastDate: string }>()
  const get = (name: string) => campaigns.get(name) || campaigns.set(name, { name, ...empty(), prev: empty(), eligible: 0, lost: 0, lastDate: '' }).get(name)!
  for (const r of records(sheet.campaigns_daily)) {
    const cur = inCur(r.date)
    if (!cur && !inPrev(r.date)) continue
    const c = get(r.campaign)
    const t = cur ? c : c.prev
    t.cost += num(r.cost)
    t.clicks += num(r.clicks)
    t.impressions += num(r.impressions)
    t.conversions += num(r.conversions)
    if (r.date >= c.lastDate) Object.assign(c, { lastDate: r.date, status: r.status, type: r.type, dailyBudget: num(r.daily_budget) })
    // Impression share: impressions ÷ the impressions the ads could have had
    const is = num(r.search_impression_share)
    if (cur && is > 0) {
      const eligible = num(r.impressions) / is
      c.eligible += eligible
      c.lost += eligible * num(r.budget_lost_impression_share)
    }
  }
  for (const g of ga.campaigns.values()) {
    const c = get(g.name)
    c.sessions = g.sessions; c.engaged = g.engaged; c.leads = g.leads
    c.prev.sessions = g.prev.sessions; c.prev.engaged = g.prev.engaged; c.prev.leads = g.prev.leads
  }
  for (const c of campaigns.values()) {
    if (c.eligible) { c.impressionShare = c.impressions / c.eligible; c.budgetLost = c.lost / c.eligible }
  }
  const { all, current, previous } = finish([...campaigns.values()].map(({ eligible: _e, lost: _l, lastDate: _d, ...c }) => c))

  // Countries and devices
  const breakdown = (rows: Record<string, string>[], key: (r: Record<string, string>) => string) => {
    const m = new Map<string, AdsBreakdown>()
    for (const r of rows) {
      const cur = inCur(r.date)
      if (!cur && !inPrev(r.date)) continue
      const name = key(r)
      const b = m.get(name) || m.set(name, { name, cost: 0, clicks: 0, conversions: 0, prevCost: 0, prevConversions: 0 }).get(name)!
      if (cur) { b.cost += num(r.cost); b.clicks += num(r.clicks); b.conversions += num(r.conversions) }
      else { b.prevCost += num(r.cost); b.prevConversions += num(r.conversions) }
    }
    return [...m.values()].filter((b) => b.cost >= 0.5 || b.clicks || b.prevCost >= 0.5).sort((a, b) => b.cost - a.cost)
  }
  // Countries under SGD 5 in both periods are grouped as "Other countries"
  const byCountry = breakdown(records(sheet.countries_daily), (r) => COUNTRIES[r.country_code] || 'Other countries')
  const countries = byCountry.map((b) => (b.cost < 5 && b.prevCost < 5 && !b.conversions ? { ...b, name: 'Other countries' } : b))
  // Several small countries can share "Other countries": merge them
  const mergedCountries = [...countries.reduce((m, b) => {
    const x = m.get(b.name)
    if (x) { x.cost += b.cost; x.clicks += b.clicks; x.conversions += b.conversions; x.prevCost += b.prevCost; x.prevConversions += b.prevConversions }
    else m.set(b.name, { ...b })
    return m
  }, new Map<string, AdsBreakdown>()).values()].sort((a, b) => (a.name === 'Other countries' ? 1 : b.name === 'Other countries' ? -1 : b.cost - a.cost))
  const devices = breakdown(records(sheet.devices_daily), (r) => DEVICES[r.device] || r.device)

  // Conversions by type (e.g. India Contact Form)
  const conv = new Map<string, { name: string; conversions: number; prev: number }>()
  for (const r of records(sheet.conversions_daily)) {
    const cur = inCur(r.date)
    if (!cur && !inPrev(r.date)) continue
    const name = r.conversion.replace(/^Moving Walls - GA4 \(web\) /, 'Website: ')
    const c = conv.get(name) || conv.set(name, { name, conversions: 0, prev: 0 }).get(name)!
    if (cur) c.conversions += num(r.conversions); else c.prev += num(r.conversions)
  }
  const conversionTypes = [...conv.values()].filter((c) => c.conversions || c.prev).sort((a, b) => b.conversions - a.conversions || b.prev - a.prev)

  // Search terms: the calendar months that overlap the selected dates
  const firstMonth = `${p.start.slice(0, 7)}-01`
  const months = new Set<string>()
  const terms = new Map<string, AdsSearchTerm>()
  for (const r of records(sheet.search_terms_monthly)) {
    if (r.month < firstMonth || r.month > p.end) continue
    months.add(r.month.slice(0, 7))
    const key = `${r.campaign}|${r.search_term}`
    const t = terms.get(key) || terms.set(key, { term: r.search_term, campaign: r.campaign, cost: 0, clicks: 0, conversions: 0 }).get(key)!
    t.cost += num(r.cost); t.clicks += num(r.clicks); t.conversions += num(r.conversions)
  }
  const searchTerms = [...terms.values()].sort((a, b) => b.clicks - a.clicks || b.cost - a.cost).slice(0, 20)

  // Things to look at
  const money = (n: number) => `${ADS_CURRENCY} ${Math.round(n).toLocaleString('en-US')}`
  const alerts: AdsAlert[] = []
  for (const b of mergedCountries) {
    if (b.name !== 'Other countries' && b.cost >= 100 && b.conversions === 0) {
      alerts.push({ title: `${b.name}: ${money(b.cost)} spent, no conversions`, detail: `${b.clicks.toLocaleString('en-US')} clicks and no Google Ads conversions in this period. Check that the ${b.name} form is tracked as a conversion, or review the keywords and landing page.` })
    }
  }
  for (const c of all) {
    if (c.status === 'ENABLED' && (c.budgetLost || 0) >= 0.2) {
      alerts.push({ title: `${c.name} is held back by its budget`, detail: `It missed about ${Math.round((c.budgetLost || 0) * 100)}% of the searches it could have shown on because its daily budget (${money(c.dailyBudget || 0)}) ran out.` })
    }
  }

  const about = records(sheet.about)[0]
  return {
    ...base, source: 'google-ads',
    adsUpdatedAt: about?.updated_at || undefined,
    accounts: about?.account ? [about.account] : ga.accounts,
    currency: about?.currency || ADS_CURRENCY,
    current, previous, campaigns: all,
    countries: mergedCountries, devices, conversionTypes, searchTerms,
    searchTermMonths: [...months].sort(),
    alerts,
  }
}

// Bump when the calculation changes so cached results are rebuilt
const CACHE_VERSION = 'a3'

export const getAdsDashboard = (range: RangeKey) =>
  unstable_cache(() => build(range), ['internal-insights-ads', CACHE_VERSION, range], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })()
