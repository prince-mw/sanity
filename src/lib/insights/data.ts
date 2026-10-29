import 'server-only'
import { unstable_cache } from 'next/cache'
import { ga4Report, gscQuery } from './google'
import { getSemrushSnapshot } from './config'
import { actionId } from './actions'
import { periods, type RangeKey } from './ranges'
export type { RangeKey } from './ranges'

// Builds the /internal-insights dashboard: location pages vs the whole site, from live GA4 +
// Search Console data plus the monthly Semrush snapshot. Cached for 6 hours per range.
//
// GA4 quirks handled here (same rules as the Oct 2026 hyperlocal scorecard):
// - Leads fire inside the Zoho form iframe, so GA4 can't tie them to our page. Each page's
//   leads come from its own form event (generate_lead_<market/city>); generate_lead_contact,
//   _demo and _f1 are site-wide forms.
// - Data-centre bot bursts (e.g. Ashburn → /locations/europe at ~100% bounce) are estimated and
//   removed: city × channel blocks with ≤2% engagement in Direct/Unassigned/Email.

const DATA_CENTRE_CITIES = new Set([
  'Ashburn', 'Manassas', 'Boardman', 'Council Bluffs', 'The Dalles', 'Columbus', 'Hillsboro',
  'Moncks Corner', 'Lenoir', 'San Jose', 'Santa Clara', 'Dublin', 'Frankfurt', 'Hialeah Gardens',
])
const BOT_CHANNELS = new Set(['Direct', 'Unassigned', 'Email'])
const AI_SOURCE = /chatgpt|openai|perplexity|gemini|copilot|claude|anthropic|bard|you\.com|phind/i
const SITE_WIDE_FORMS: Record<string, string> = {
  generate_lead_contact: 'Site-wide contact form',
  generate_lead_demo: 'Site-wide demo form',
  generate_lead_f1: 'F1 campaign page',
}
// Form event suffix → page slug, where they differ
const LEAD_ALIASES: Record<string, string> = { bangalore: 'bengaluru', uk: 'united-kingdom', sri_lanka: 'sri-lanka' }
// Big cities whose name appearing in a country page's keywords suggests a missing city page
const MAJOR_CITIES: Record<string, string[]> = {
  australia: ['sydney', 'melbourne', 'perth', 'adelaide', 'brisbane'],
  philippines: ['manila', 'cebu', 'davao'],
  indonesia: ['jakarta', 'surabaya', 'bandung', 'bali', 'medan'],
  malaysia: ['kuala lumpur', 'penang', 'johor', 'ipoh'],
  thailand: ['bangkok', 'phuket', 'chiang mai'],
  india: ['mumbai', 'delhi', 'bangalore', 'bengaluru', 'chennai', 'hyderabad', 'pune', 'kolkata'],
  uae: ['dubai', 'abu dhabi', 'sharjah'],
}

export type Status = 'Winning' | 'Converting' | 'Paid-driven' | 'Leaking' | 'Too early' | 'Bot-inflated' | 'Steady'

export interface Totals {
  sessions: number
  botSessions: number
  realSessions: number
  engaged: number
  bounceRate: number
  leads: number
  convRate: number
  organic: number
  paid: number
  ai: number
  other: number
  gscClicks: number
  gscImpressions: number
  gscCtr: number
  gscPosition: number
}

export interface SemrushKeyword {
  keyword: string
  position: number
  volume: number
  difficulty: number
  database: string
}

export interface PageRow {
  page: string
  market: string
  level: 'Country' | 'City'
  sessions: number
  botSessions: number
  realSessions: number
  prevRealSessions: number
  organic: number
  paid: number
  ai: number
  other: number
  bounceRate: number
  leads: number
  prevLeads: number
  leadEvent: string | null
  convRate: number
  gscClicks: number
  prevGscClicks: number
  gscImpressions: number
  gscPosition: number | null
  topQuery: string | null
  topQueryPosition: number | null
  semrush: SemrushKeyword[]
  status: Status
  action: string
}

export interface Finding {
  title: string
  detail: string
  page?: string
}

export interface ActionItem {
  /** Stable across refreshes (category + page + title), used for the shared status */
  id: string
  priority: 'High' | 'Medium' | 'Low'
  category: 'Tracking' | 'Titles & CTR' | 'Rankings' | 'New page' | 'Content' | 'Indexing'
  title: string
  detail: string
  page?: string
  score: number
}

export interface Opportunity {
  type: 'Striking distance' | 'Click gap'
  page: string
  query: string
  impressions: number
  clicks: number
  ctr: number
  position: number
}

export interface TrendPoint {
  label: string
  siteSessions: number
  locationSessions: number
  locationLeads: number
}

export interface Dashboard {
  generatedAt: string
  range: RangeKey
  period: { start: string; end: string; prevStart: string; prevEnd: string; days: number }
  site: { current: Totals; previous: Totals }
  locations: { current: Totals; previous: Totals }
  countries: Totals
  cities: Totals
  pages: PageRow[]
  leadSources: { event: string; leads: number; creditedTo: string; isLocation: boolean }[]
  trend: TrendPoint[]
  working: Finding[]
  notWorking: Finding[]
  actions: ActionItem[]
  opportunities: Opportunity[]
  semrushDate: string | null
  semrushTop: (SemrushKeyword & { page: string })[]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const isLocationPage = (p: string) => /^\/locations\/[^?#]+/.test(p)
const cleanPath = (p: string) => (p.split('?')[0].replace(/\/$/, '') || '/').toLowerCase()
/** Shared with the Content tab (content.ts) */
export const isBotRow = (city: string, channel: string, sessions: number, engaged: number) =>
  engaged / sessions <= 0.02 && BOT_CHANNELS.has(channel) && (DATA_CENTRE_CITIES.has(city) ? sessions >= 10 : sessions >= 200)
const isNoiseQuery = (q: string) => /site:|"/.test(q) || q.length > 80
const isBrand = (q: string) => /moving ?walls|movingwalls/i.test(q)
// Not worth targeting: 'near me' searches and other companies' brand names
const isPoorTarget = (q: string) => /near me|funny|walls and trends|gohoardings|shubham|floyd|moove|gleamedia|ewins|wilayah|out of home media sdn bhd/i.test(q)
// Short page name for lists: the city for city pages, the country otherwise
const shortName = (p: PageRow) => p.market.split(',')[0]

function channelBucket(channel: string): 'organic' | 'paid' | 'other' {
  if (channel === 'Organic Search') return 'organic'
  if (/^Paid|Display|Cross-network/i.test(channel)) return 'paid'
  return 'other'
}

function marketFromPath(page: string): { market: string; level: 'Country' | 'City' } {
  const parts = page.split('/').filter(Boolean).slice(1)
  const title = (s: string) => s.replace(/-(es|zh)$/, '').split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  return parts.length >= 2 ? { market: `${title(parts[1])}, ${title(parts[0])}`, level: 'City' } : { market: title(parts[0] || ''), level: 'Country' }
}

const emptyTotals = (): Totals => ({
  sessions: 0, botSessions: 0, realSessions: 0, engaged: 0, bounceRate: 0, leads: 0, convRate: 0,
  organic: 0, paid: 0, ai: 0, other: 0, gscClicks: 0, gscImpressions: 0, gscCtr: 0, gscPosition: 0,
})

function finish(t: Totals, gscWeightedPos = 0): Totals {
  t.realSessions = Math.max(0, t.sessions - t.botSessions)
  t.bounceRate = t.sessions ? 1 - t.engaged / t.sessions : 0
  t.convRate = t.realSessions ? t.leads / t.realSessions : 0
  t.gscCtr = t.gscImpressions ? t.gscClicks / t.gscImpressions : 0
  t.gscPosition = t.gscImpressions ? gscWeightedPos / t.gscImpressions : 0
  return t
}

const pct = (n: number, d = 0) => `${(n * 100).toFixed(d)}%`
const change = (cur: number, prev: number) => (prev ? (cur - prev) / prev : cur ? 1 : 0)
const fmtN = (n: number) => Math.round(n).toLocaleString('en-US')

/** Existing city pages per country slug (public Sanity data), for "create a city page" actions */
async function existingCitySlugs(): Promise<Set<string>> {
  try {
    const q = encodeURIComponent('*[_type == "locationCity" && isActive == true]{"c": country->slug.current, "s": slug.current}')
    const res = await fetch(`https://u10im6di.apicdn.sanity.io/v2024-01-01/data/query/production?query=${q}`, { cache: 'no-store' })
    const rows: { c: string; s: string }[] = (await res.json())?.result || []
    return new Set(rows.map((r) => `${r.c}/${r.s}`))
  } catch {
    return new Set()
  }
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

async function build(range: RangeKey): Promise<Dashboard> {
  const p = periods(range)
  const ranges = [
    { startDate: p.start, endDate: p.end, name: 'cur' },
    { startDate: p.prevStart, endDate: p.prevEnd, name: 'prev' },
  ]
  const leadFilter = { filter: { fieldName: 'eventName', stringFilter: { matchType: 'BEGINS_WITH', value: 'generate_lead' } } }
  const trendDim = range === 'this-year' || range === 'last-year' ? 'yearMonth' : 'date'
  const locFilter = { filter: { fieldName: 'landingPage', stringFilter: { matchType: 'BEGINS_WITH', value: '/locations/' } } }

  const [byPageChannel, botRows, aiRows, leadRows, trendAll, trendLoc, trendLeads, gscSite, gscPages, gscPageQueries, semrush, citySlugs] =
    await Promise.all([
      ga4Report({ dateRanges: ranges, dimensions: [{ name: 'landingPage' }, { name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }] }),
      ga4Report({
        dateRanges: ranges,
        dimensions: [{ name: 'landingPage' }, { name: 'city' }, { name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }],
        metricFilter: { filter: { fieldName: 'sessions', numericFilter: { operation: 'GREATER_THAN_OR_EQUAL', value: { int64Value: '10' } } } },
      }),
      ga4Report({
        dateRanges: ranges,
        dimensions: [{ name: 'landingPage' }, { name: 'sessionSource' }],
        metrics: [{ name: 'sessions' }],
        dimensionFilter: { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'FULL_REGEXP', value: '.*(chatgpt|openai|perplexity|gemini|copilot|claude|anthropic|bard).*', caseSensitive: false } } },
      }),
      ga4Report({ dateRanges: ranges, dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: leadFilter }),
      ga4Report({ dateRanges: [ranges[0]], dimensions: [{ name: trendDim }], metrics: [{ name: 'sessions' }] }),
      ga4Report({ dateRanges: [ranges[0]], dimensions: [{ name: trendDim }], metrics: [{ name: 'sessions' }], dimensionFilter: locFilter }),
      ga4Report({ dateRanges: [ranges[0]], dimensions: [{ name: trendDim }, { name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: leadFilter }),
      Promise.all([
        gscQuery({ startDate: p.start, endDate: p.end, dimensions: [] }),
        gscQuery({ startDate: p.prevStart, endDate: p.prevEnd, dimensions: [] }),
      ]),
      Promise.all([
        gscQuery({ startDate: p.start, endDate: p.end, dimensions: ['page'], rowLimit: 25000 }),
        gscQuery({ startDate: p.prevStart, endDate: p.prevEnd, dimensions: ['page'], rowLimit: 25000 }),
      ]),
      gscQuery({
        startDate: p.start,
        endDate: p.end,
        dimensions: ['page', 'query'],
        dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'contains', expression: '/locations/' }] }],
        rowLimit: 25000,
      }),
      getSemrushSnapshot(),
      existingCitySlugs(),
    ])

  const site = { cur: emptyTotals(), prev: emptyTotals() }
  const loc = { cur: emptyTotals(), prev: emptyTotals() }
  const pages = new Map<string, PageRow>()
  const prevBots = new Map<string, number>()
  const prevSessions = new Map<string, number>()
  const pageRow = (page: string): PageRow => {
    let r = pages.get(page)
    if (!r) {
      const m = marketFromPath(page)
      r = {
        page, market: m.market, level: m.level, sessions: 0, botSessions: 0, realSessions: 0, prevRealSessions: 0,
        organic: 0, paid: 0, ai: 0, other: 0, bounceRate: 0, leads: 0, prevLeads: 0, leadEvent: null, convRate: 0,
        gscClicks: 0, prevGscClicks: 0, gscImpressions: 0, gscPosition: null, topQuery: null, topQueryPosition: null,
        semrush: [], status: 'Steady', action: '',
      }
      pages.set(page, r)
    }
    return r
  }
  const engagedByPage = new Map<string, number>()
  const which = (dims: string[]) => (dims[dims.length - 1] === 'prev' ? 'prev' : 'cur')

  // Sessions and channels (GA4 appends the dateRange name as the last dimension)
  for (const { dims, mets } of byPageChannel) {
    const [rawPage, channel] = dims
    const period = which(dims)
    const page = cleanPath(rawPage)
    const [sessions, engaged] = mets
    const bucket = channelBucket(channel)
    for (const t of isLocationPage(page) ? [site[period], loc[period]] : [site[period]]) {
      t.sessions += sessions
      t.engaged += engaged
      t[bucket] += sessions
    }
    if (!isLocationPage(page)) continue
    if (period === 'cur') {
      const r = pageRow(page)
      r.sessions += sessions
      r[bucket] += sessions
      engagedByPage.set(page, (engagedByPage.get(page) || 0) + engaged)
    } else {
      prevSessions.set(page, (prevSessions.get(page) || 0) + sessions)
    }
  }

  // Bots
  for (const { dims, mets } of botRows) {
    const [rawPage, city, channel] = dims
    const period = which(dims)
    const page = cleanPath(rawPage)
    const [sessions, engaged] = mets
    if (!isBotRow(city, channel, sessions, engaged)) continue
    site[period].botSessions += sessions
    if (!isLocationPage(page)) continue
    loc[period].botSessions += sessions
    if (period === 'cur') pageRow(page).botSessions += sessions
    else prevBots.set(page, (prevBots.get(page) || 0) + sessions)
  }

  // AI assistant referrals (counted inside "other"; shown separately)
  for (const { dims, mets } of aiRows) {
    const period = which(dims)
    const page = cleanPath(dims[0])
    if (!AI_SOURCE.test(dims[1])) continue
    site[period].ai += mets[0]
    if (isLocationPage(page)) {
      loc[period].ai += mets[0]
      if (period === 'cur') pageRow(page).ai += mets[0]
    }
  }

  // Leads: map each form event to a location page
  const knownPages = () => [...new Set([...pages.keys(), ...prevSessions.keys()])]
  const leadTarget = (event: string): string | null => {
    if (SITE_WIDE_FORMS[event]) return null
    const suffix = event.replace(/^generate_lead_/, '')
    const slug = LEAD_ALIASES[suffix] || suffix.replace(/_/g, '-')
    const list = knownPages()
    return list.find((pg) => pg.split('/').pop() === slug) || list.find((pg) => pg.split('/').pop()?.startsWith(slug)) || null
  }
  const leadSources = new Map<string, { event: string; leads: number; creditedTo: string; isLocation: boolean }>()
  for (const { dims, mets } of leadRows) {
    const [event] = dims
    const period = which(dims)
    const target = leadTarget(event)
    site[period].leads += mets[0]
    if (target) loc[period].leads += mets[0]
    if (target) {
      const r = pageRow(target)
      if (period === 'cur') {
        r.leads += mets[0]
        r.leadEvent = event
      } else {
        r.prevLeads += mets[0]
      }
    }
    if (period === 'cur') {
      leadSources.set(event, { event, leads: mets[0], creditedTo: target || SITE_WIDE_FORMS[event] || '(no matching page)', isLocation: !!target })
    }
  }

  // Search Console
  const [gscCur, gscPrev] = gscSite
  for (const [t, rows] of [[site.cur, gscCur], [site.prev, gscPrev]] as const) {
    const r = rows[0]
    if (r) {
      t.gscClicks = r.clicks
      t.gscImpressions = r.impressions
      t.gscCtr = r.ctr
      t.gscPosition = r.position
    }
  }
  const locPos = { cur: 0, prev: 0 }
  for (const [period, rows] of [['cur', gscPages[0]], ['prev', gscPages[1]]] as const) {
    for (const r of rows) {
      const page = cleanPath(new URL(r.keys[0]).pathname)
      if (!isLocationPage(page)) continue
      loc[period].gscClicks += r.clicks
      loc[period].gscImpressions += r.impressions
      locPos[period] += r.position * r.impressions
      const row = pageRow(page)
      if (period === 'cur') {
        row.gscClicks += r.clicks
        row.gscImpressions += r.impressions
        row.gscPosition = r.position
      } else {
        row.prevGscClicks += r.clicks
      }
    }
  }

  const bestQuery = new Map<string, { q: string; clicks: number; impressions: number; position: number }>()
  const opportunities: Opportunity[] = []
  const minImpr = Math.max(10, Math.round(p.days / 3))
  for (const r of gscPageQueries) {
    const query = r.keys[1]
    if (isNoiseQuery(query)) continue
    const page = cleanPath(new URL(r.keys[0]).pathname)
    const best = bestQuery.get(page)
    if (!best || r.clicks > best.clicks || (r.clicks === best.clicks && r.impressions > best.impressions)) {
      bestQuery.set(page, { q: query, clicks: r.clicks, impressions: r.impressions, position: r.position })
    }
    if (isBrand(query) || r.impressions < minImpr) continue
    const base = { page, query, impressions: r.impressions, clicks: r.clicks, ctr: r.ctr, position: r.position }
    if (r.position <= 5 && r.ctr < 0.02) opportunities.push({ ...base, type: 'Click gap' })
    else if (r.position > 3 && r.position <= 20) opportunities.push({ ...base, type: 'Striking distance' })
  }
  opportunities.sort((a, b) => b.impressions - a.impressions)

  // Semrush snapshot (stored privately in Sanity)
  const semrushRows = (semrush?.rows || []).map((s) => ({ ...s, page: cleanPath(s.page), difficulty: (s as { difficulty?: number }).difficulty ?? 0 }))
  for (const s of semrushRows) {
    if (!isLocationPage(s.page)) continue
    pageRow(s.page).semrush.push({ keyword: s.keyword, position: s.position, volume: s.volume, difficulty: s.difficulty, database: s.database })
  }

  // Totals
  for (const t of [site.prev, site.cur]) finish(t, t.gscPosition * t.gscImpressions)
  finish(loc.cur, locPos.cur)
  finish(loc.prev, locPos.prev)

  // Page rows
  const siteConv = site.cur.convRate
  const countries = emptyTotals()
  const cities = emptyTotals()
  const rows = [...pages.values()].filter((r) => r.sessions > 0 || r.gscImpressions > 0 || (prevSessions.get(r.page) || 0) > 0)
  for (const r of rows) {
    const engaged = engagedByPage.get(r.page) || 0
    r.realSessions = Math.max(0, r.sessions - r.botSessions)
    r.prevRealSessions = Math.max(0, (prevSessions.get(r.page) || 0) - (prevBots.get(r.page) || 0))
    r.bounceRate = r.sessions ? 1 - engaged / r.sessions : 0
    r.convRate = r.realSessions ? r.leads / r.realSessions : 0
    r.semrush.sort((a, b) => b.volume - a.volume)
    const q = bestQuery.get(r.page)
    if (q) {
      r.topQuery = q.q
      r.topQueryPosition = q.position
    }
    classify(r, siteConv)
    const agg = r.level === 'Country' ? countries : cities
    agg.sessions += r.sessions
    agg.botSessions += r.botSessions
    agg.engaged += engaged
    agg.leads += r.leads
    agg.organic += r.organic
    agg.paid += r.paid
    agg.ai += r.ai
    agg.other += r.other
    agg.gscClicks += r.gscClicks
    agg.gscImpressions += r.gscImpressions
  }
  finish(countries)
  finish(cities)
  rows.sort((a, b) => b.realSessions - a.realSessions)

  // Trend
  const points = new Map<string, TrendPoint>()
  const pt = (key: string) => {
    let x = points.get(key)
    if (!x) points.set(key, (x = { label: key, siteSessions: 0, locationSessions: 0, locationLeads: 0 }))
    return x
  }
  for (const { dims, mets } of trendAll) pt(dims[0]).siteSessions += mets[0]
  for (const { dims, mets } of trendLoc) pt(dims[0]).locationSessions += mets[0]
  for (const { dims, mets } of trendLeads) if (leadTarget(dims[1])) pt(dims[0]).locationLeads += mets[0]
  const trend = [...points.values()].sort((a, b) => a.label.localeCompare(b.label))

  const semrushTop = semrushRows
    .filter((s) => isLocationPage(s.page))
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 40)
    .map((s) => ({ keyword: s.keyword, position: s.position, volume: s.volume, difficulty: s.difficulty, database: s.database, page: s.page }))

  const d: Dashboard = {
    generatedAt: new Date().toISOString(),
    range,
    period: p,
    site: { current: site.cur, previous: site.prev },
    locations: { current: loc.cur, previous: loc.prev },
    countries,
    cities,
    pages: rows,
    leadSources: [...leadSources.values()].sort((a, b) => b.leads - a.leads),
    trend,
    working: [],
    notWorking: [],
    actions: [],
    opportunities: opportunities.slice(0, 40),
    semrushDate: semrush?.snapshotDate || null,
    semrushTop,
  }
  const insights = buildInsights(d, citySlugs)
  d.working = insights.working
  d.notWorking = insights.notWorking
  d.actions = insights.actions
  return d
}

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

function classify(r: PageRow, siteConv: number) {
  const real = r.realSessions
  const botShare = r.sessions ? r.botSessions / r.sessions : 0
  const paidShare = real ? r.paid / real : 0
  const organicShare = real ? r.organic / real : 0

  if (botShare >= 0.5) {
    r.status = 'Bot-inflated'
    r.action = `${pct(botShare)} of visits look like bots. Judge it on its ~${real} real visits.`
  } else if (real < 20 && r.leads === 0) {
    r.status = 'Too early'
    r.action = r.gscImpressions > 0
      ? `Only ${real} real visits, but ${fmtN(r.gscImpressions)} Google impressions. Strengthen local copy and internal links.`
      : `Only ${real} real visits and no Google impressions yet. Check it is indexed and linked from its country page.`
  } else if (paidShare >= 0.7) {
    r.status = 'Paid-driven'
    r.action = `${pct(paidShare)} of visits come from ads. Judge it with the ad campaigns.`
  } else if (r.leads > 0 && organicShare >= 0.4) {
    r.status = 'Winning'
    r.action = 'Organic visits turn into leads. Protect and grow it.'
  } else if (r.leads > 0) {
    r.status = 'Converting'
    r.action = r.convRate < siteConv ? `Converts at ${pct(r.convRate, 1)}, below the site average.` : `Converts at ${pct(r.convRate, 1)}, above the site average.`
  } else if (real >= 50) {
    r.status = 'Leaking'
    r.action = `${real} real visits and ${pct(r.bounceRate)} bounce, but no leads.`
  } else {
    r.status = 'Steady'
    r.action = 'Some traffic, no leads yet.'
  }
}

function buildInsights(d: Dashboard, citySlugs: Set<string>) {
  const working: Finding[] = []
  const notWorking: Finding[] = []
  const actions: ActionItem[] = []
  const l = d.locations
  const s = d.site.current

  // --- Headline movement
  const leadChange = change(l.current.leads, l.previous.leads)
  const visitChange = change(l.current.realSessions, l.previous.realSessions)
  if (l.previous.leads || l.current.leads) {
    const f = {
      title: `Location-page leads ${leadChange >= 0 ? 'up' : 'down'} ${pct(Math.abs(leadChange))} (${l.current.leads} vs ${l.previous.leads})`,
      detail: `Real visits ${visitChange >= 0 ? 'up' : 'down'} ${pct(Math.abs(visitChange))}; conversion ${pct(l.current.convRate, 2)} vs ${pct(l.previous.convRate, 2)} before.`,
    }
    if (leadChange >= 0) working.push(f)
    else notWorking.push(f)
  }
  if (s.leads) {
    working.push({
      title: `Location pages bring ${pct(l.current.realSessions / Math.max(1, s.realSessions))} of traffic but ${pct(l.current.leads / s.leads)} of all leads`,
      detail: `They convert at ${pct(l.current.convRate, 2)} vs ${pct(s.convRate, 2)} for the whole site.`,
    })
  }

  // --- City vs country
  if (d.cities.realSessions >= 30 && d.countries.realSessions >= 30 && d.cities.convRate > d.countries.convRate && d.countries.convRate > 0) {
    working.push({
      title: `City pages convert ${(d.cities.convRate / d.countries.convRate).toFixed(0)}x better than country pages`,
      detail: `${pct(d.cities.convRate, 1)} vs ${pct(d.countries.convRate, 1)}. More city pages are the strongest lever.`,
    })
  }

  // --- Winners
  const winners = d.pages.filter((p) => p.status === 'Winning').sort((a, b) => b.leads - a.leads)
  for (const w of winners.slice(0, 3)) {
    working.push({ title: `${w.market}: ${w.leads} leads from mostly organic visits`, detail: `${pct(w.convRate, 1)} conversion${w.topQuery ? `; top search "${w.topQuery}"` : ''}.`, page: w.page })
  }

  // --- Top-3 Google rankings (Semrush)
  const topRanks = d.semrushTop.filter((k) => !isPoorTarget(k.keyword) && k.position <= 3 && k.volume >= 50).slice(0, 3)
  if (topRanks.length) {
    working.push({
      title: `Top-3 on Google for ${topRanks.length === 1 ? 'a valuable search' : `${topRanks.length} valuable searches`}`,
      detail: topRanks.map((k) => `"${k.keyword}" #${k.position} (${fmtN(k.volume)}/mo, ${k.database})`).join('; ') + '.',
    })
  }

  // --- Growing / declining pages
  const movers = d.pages.filter((p) => p.prevRealSessions >= 15 || p.realSessions >= 15)
  const growing = movers.filter((p) => p.realSessions - p.prevRealSessions >= 15 && change(p.realSessions, p.prevRealSessions) >= 0.3).sort((a, b) => (b.realSessions - b.prevRealSessions) - (a.realSessions - a.prevRealSessions))
  const falling = movers.filter((p) => p.prevRealSessions - p.realSessions >= 15 && change(p.realSessions, p.prevRealSessions) <= -0.3).sort((a, b) => (b.prevRealSessions - b.realSessions) - (a.prevRealSessions - a.realSessions))
  if (growing.length) {
    working.push({ title: `Growing: ${growing.slice(0, 3).map(shortName).join(', ')}`, detail: growing.slice(0, 3).map((g) => `${shortName(g)} ${g.prevRealSessions} → ${g.realSessions} real visits`).join('; ') + '.' })
  }
  if (falling.length) {
    notWorking.push({ title: `Losing traffic: ${falling.slice(0, 3).map(shortName).join(', ')}`, detail: falling.slice(0, 3).map((g) => `${shortName(g)} ${g.prevRealSessions} → ${g.realSessions} real visits`).join('; ') + '.' })
  }

  // --- Leaking pages
  const leaking = d.pages.filter((p) => p.status === 'Leaking').sort((a, b) => b.realSessions - a.realSessions)
  for (const p of leaking.slice(0, 3)) {
    notWorking.push({ title: `${p.market}: ${p.realSessions} real visits, 0 leads`, detail: `${pct(p.bounceRate)} bounce${p.leadEvent ? '' : '; no lead event found for this page'}.`, page: p.page })
    actions.push({
      id: '',
      priority: 'High',
      category: 'Tracking',
      title: `Check the ${p.market} form is tracked`,
      detail: p.leadEvent
        ? `It has a form event but no leads from ${p.realSessions} visits. Review the CTA placement and the form itself.`
        : `No generate_lead event exists for this page, so enquiries (if any) are invisible. Give its Zoho form its own GA4 lead event.`,
      page: p.page,
      score: 900 + p.realSessions,
    })
  }

  // --- Bots
  if (l.current.sessions && l.current.botSessions / l.current.sessions >= 0.1) {
    const worst = [...d.pages].sort((a, b) => b.botSessions - a.botSessions)[0]
    notWorking.push({
      title: `${pct(l.current.botSessions / l.current.sessions)} of location-page visits are bots`,
      detail: `${fmtN(l.current.botSessions)} sessions removed from the numbers above, mostly on ${worst.page}.`,
    })
  }

  // --- Click gaps → titles
  const clickGaps = d.opportunities.filter((o) => o.type === 'Click gap')
  if (clickGaps.length) {
    notWorking.push({
      title: `${clickGaps.length} searches rank top 5 but get almost no clicks`,
      detail: clickGaps.slice(0, 3).map((o) => `"${o.query}" #${o.position.toFixed(0)}, ${fmtN(o.impressions)} impressions`).join('; ') + '.',
    })
  }
  for (const o of clickGaps.slice(0, 4)) {
    actions.push({
      id: '',
      priority: o.impressions >= 150 ? 'High' : 'Medium',
      category: 'Titles & CTR',
      title: `Rewrite the title/description for "${o.query}"`,
      detail: `Ranks #${o.position.toFixed(0)} with ${fmtN(o.impressions)} impressions but ${o.clicks} clicks. Start the title with the search phrase and give a concrete reason to click.`,
      page: o.page,
      score: 600 + o.impressions,
    })
  }

  // --- Striking distance, ranked by Semrush volume (fallback: GSC impressions)
  const sdSemrush = d.semrushTop.filter((k) => !isPoorTarget(k.keyword) && k.position >= 4 && k.position <= 15 && k.volume >= 90 && (k.difficulty || 0) <= 35)
  for (const k of sdSemrush.slice(0, 6)) {
    actions.push({
      id: '',
      priority: k.volume >= 200 ? 'High' : 'Medium',
      category: 'Rankings',
      title: `Push "${k.keyword}" into the top 3`,
      detail: `#${k.position} today, ${fmtN(k.volume)} searches/month (${k.database}), difficulty ${k.difficulty}. Use the phrase in an H2, answer it in a short section or FAQ, and link to the page with that wording.`,
      page: k.page,
      score: 400 + k.volume,
    })
  }
  if (!sdSemrush.length) {
    for (const o of d.opportunities.filter((x) => x.type === 'Striking distance').slice(0, 4)) {
      actions.push({ id: '', priority: 'Medium', category: 'Rankings', title: `Push "${o.query}" into the top 3`, detail: `#${o.position.toFixed(0)} with ${fmtN(o.impressions)} impressions.`, page: o.page, score: 300 + o.impressions })
    }
  }

  // --- Missing city pages (country page ranking for city searches)
  const cityDemand = new Map<string, { volume: number; keywords: string[]; country: string }>()
  for (const k of d.semrushTop) {
    const parts = k.page.split('/').filter(Boolean)
    if (parts.length !== 2) continue
    const country = parts[1]
    for (const city of MAJOR_CITIES[country] || []) {
      if (!k.keyword.includes(city)) continue
      const slug = city.replace(/ /g, '-')
      if (citySlugs.has(`${country}/${slug}`) || (city === 'bangalore' && citySlugs.has(`${country}/bengaluru`))) continue
      const key = `${country}/${slug}`
      const x = cityDemand.get(key) || { volume: 0, keywords: [], country }
      x.volume += k.volume
      x.keywords.push(k.keyword)
      cityDemand.set(key, x)
    }
  }
  for (const [key, x] of [...cityDemand.entries()].sort((a, b) => b[1].volume - a[1].volume).slice(0, 3)) {
    const city = key.split('/')[1].replace(/-/g, ' ')
    actions.push({
      id: '',
      priority: x.volume >= 200 ? 'High' : 'Medium',
      category: 'New page',
      title: `Create a ${city.replace(/\b\w/g, (c) => c.toUpperCase())} city page`,
      detail: `The ${x.country} country page ranks for ${x.keywords.slice(0, 3).map((k) => `"${k}"`).join(', ')} (${fmtN(x.volume)} searches/month combined). A dedicated city page converts far better.`,
      page: `/locations/${x.country}`,
      score: 500 + x.volume,
    })
  }

  // --- Pricing intent
  const pricing = d.semrushTop.filter((k) => /price|rate|cost/.test(k.keyword) && k.position > 3)
  const pricingByPage = new Map<string, typeof pricing>()
  for (const k of pricing) pricingByPage.set(k.page, [...(pricingByPage.get(k.page) || []), k])
  for (const [page, ks] of [...pricingByPage.entries()].sort((a, b) => b[1].reduce((n, k) => n + k.volume, 0) - a[1].reduce((n, k) => n + k.volume, 0)).slice(0, 2)) {
    const vol = ks.reduce((n, k) => n + k.volume, 0)
    actions.push({
      id: '',
      priority: 'Medium',
      category: 'Content',
      title: `Add a "what affects billboard rates" section + FAQ`,
      detail: `People search ${ks.slice(0, 3).map((k) => `"${k.keyword}" (#${k.position})`).join(', ')}: ${fmtN(vol)} searches/month. Explain the cost factors; no price list needed.`,
      page,
      score: 350 + vol,
    })
  }

  // --- Indexing
  const noImpressions = d.pages.filter((p) => p.level === 'City' && p.gscImpressions === 0 && p.realSessions < 20)
  if (noImpressions.length >= 3) {
    actions.push({
      id: '',
      priority: 'Low',
      category: 'Indexing',
      title: `${noImpressions.length} city pages have no Google impressions yet`,
      detail: `Request indexing in Search Console and link them from their country page. E.g. ${noImpressions.slice(0, 3).map((p) => p.page).join(', ')}.`,
      score: 100,
    })
  }

  const rank = { High: 0, Medium: 1, Low: 2 } as const
  actions.sort((a, b) => rank[a.priority] - rank[b.priority] || b.score - a.score)
  return {
    working: working.slice(0, 6),
    notWorking: notWorking.slice(0, 6),
    actions: actions.slice(0, 12).map((a) => ({ ...a, id: actionId([a.category, a.page || '', a.title]) })),
  }
}

// Bump when the calculations change so cached results from older code are not reused
const CACHE_VERSION = 'v9'

export const getDashboard = (range: RangeKey) =>
  unstable_cache(() => build(range), ['internal-insights', CACHE_VERSION, range], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })()
