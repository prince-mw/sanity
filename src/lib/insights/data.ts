import 'server-only'
import { unstable_cache } from 'next/cache'
import { ga4Report, gscQuery } from './google'
import { getSemrushSnapshot } from './config'

// Builds the /internal-insights dashboard: whole site vs /locations/ pages, from live GA4 +
// Search Console data. Results are cached for 6 hours per period.
//
// Two GA4 quirks this handles (same rules as the Oct 2026 hyperlocal scorecard):
// - Leads fire inside the Zoho form iframe, so GA4 can't tie them to our page. Each page's
//   leads come from its own form event (generate_lead_<market/city>); generate_lead_contact,
//   _demo and _f1 are site-wide forms.
// - Data-centre bot bursts (e.g. Ashburn, Virginia → /locations/europe at ~100% bounce) are
//   estimated and removed: zero-engagement sessions in Direct/Unassigned/Email from known
//   data-centre cities, or any large zero-engagement block.

import type { RangeKey } from './ranges'
export type { RangeKey } from './ranges'

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
const LEAD_ALIASES: Record<string, string> = {
  bangalore: 'bengaluru',
  uk: 'united-kingdom',
  sri_lanka: 'sri-lanka',
}

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

export interface PageRow {
  page: string
  market: string
  level: 'Country' | 'City'
  sessions: number
  botSessions: number
  realSessions: number
  organic: number
  paid: number
  ai: number
  other: number
  bounceRate: number
  leads: number
  leadEvent: string | null
  convRate: number
  gscClicks: number
  gscImpressions: number
  gscPosition: number | null
  topQuery: string | null
  topQueryPosition: number | null
  semrush: { keyword: string; volume: number; position: number; database: string } | null
  status: Status
  action: string
}

export type Status = 'Winning' | 'Converting' | 'Paid-driven' | 'Leaking' | 'Too early' | 'Bot-inflated' | 'Steady'

export interface Learning {
  tag: 'Working' | 'Fix' | 'Context' | 'Not yet' | 'Data quality'
  headline: string
  detail: string
}

export interface Dashboard {
  generatedAt: string
  period: { start: string; end: string; prevStart: string; prevEnd: string; days: number }
  site: { current: Totals; previous: Totals }
  locations: { current: Totals; previous: Totals }
  countries: Totals
  cities: Totals
  pages: PageRow[]
  leadSources: { event: string; leads: number; creditedTo: string; isLocation: boolean }[]
  weekly: { week: string; siteSessions: number; locationSessions: number; siteLeads: number; locationLeads: number }[]
  learnings: Learning[]
  opportunities: Opportunity[]
  semrushDate: string | null
}

export interface Opportunity {
  type: 'Striking distance' | 'Click gap'
  page: string
  query: string
  impressions: number
  clicks: number
  ctr: number
  position: number
  advice: string
}

// ---------------------------------------------------------------------------

const iso = (d: Date) => d.toISOString().slice(0, 10)
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d))
const dayCount = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86_400_000) + 1

/** Current and comparison periods. Data runs to yesterday (today is still incomplete). */
function periods(range: RangeKey) {
  const today = new Date()
  const yesterday = utc(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1)

  if (range === 'this-month') {
    // Month to date vs the same days of last month
    const start = utc(today.getUTCFullYear(), today.getUTCMonth(), 1)
    const end = yesterday < start ? start : yesterday
    const days = dayCount(start, end)
    const prevStart = utc(start.getUTCFullYear(), start.getUTCMonth() - 1, 1)
    const lastOfPrev = utc(start.getUTCFullYear(), start.getUTCMonth(), 0)
    const prevEndCandidate = utc(prevStart.getUTCFullYear(), prevStart.getUTCMonth(), days)
    const prevEnd = prevEndCandidate > lastOfPrev ? lastOfPrev : prevEndCandidate
    return { start: iso(start), end: iso(end), prevStart: iso(prevStart), prevEnd: iso(prevEnd), days }
  }

  if (range === 'last-month') {
    // Full last month vs the full month before
    const start = utc(today.getUTCFullYear(), today.getUTCMonth() - 1, 1)
    const end = utc(today.getUTCFullYear(), today.getUTCMonth(), 0)
    const prevStart = utc(today.getUTCFullYear(), today.getUTCMonth() - 2, 1)
    const prevEnd = utc(today.getUTCFullYear(), today.getUTCMonth() - 1, 0)
    return { start: iso(start), end: iso(end), prevStart: iso(prevStart), prevEnd: iso(prevEnd), days: dayCount(start, end) }
  }

  const days = range === '28' ? 28 : 90
  const start = utc(yesterday.getUTCFullYear(), yesterday.getUTCMonth(), yesterday.getUTCDate() - (days - 1))
  const prevEnd = utc(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() - 1)
  const prevStart = utc(prevEnd.getUTCFullYear(), prevEnd.getUTCMonth(), prevEnd.getUTCDate() - (days - 1))
  return { start: iso(start), end: iso(yesterday), prevStart: iso(prevStart), prevEnd: iso(prevEnd), days }
}


const isLocationPage = (p: string) => /^\/locations\/[^?#]+/.test(p)
const cleanPath = (p: string) => (p.split('?')[0].replace(/\/$/, '') || '/').toLowerCase()
// A city × channel block on one landing page with (almost) no engagement
const isBotRow = (city: string, channel: string, sessions: number, engaged: number) =>
  engaged / sessions <= 0.02 && BOT_CHANNELS.has(channel) && (DATA_CENTRE_CITIES.has(city) ? sessions >= 10 : sessions >= 200)

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

// ---------------------------------------------------------------------------

async function build(range: RangeKey): Promise<Dashboard> {
  const p = periods(range)
  const ranges = [
    { startDate: p.start, endDate: p.end, name: 'cur' },
    { startDate: p.prevStart, endDate: p.prevEnd, name: 'prev' },
  ]
  const leadFilter = { filter: { fieldName: 'eventName', stringFilter: { matchType: 'BEGINS_WITH', value: 'generate_lead' } } }

  const [byPageChannel, botRows, aiRows, leadRows, weeklyAll, weeklyLoc, weeklyLeads, gscSite, gscPages, gscPageQueries] =
    await Promise.all([
      // Sessions by landing page × channel (both periods)
      ga4Report({
        dateRanges: ranges,
        dimensions: [{ name: 'landingPage' }, { name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }],
      }),
      // Bot candidates: landing page × city × channel
      ga4Report({
        dateRanges: ranges,
        dimensions: [{ name: 'landingPage' }, { name: 'city' }, { name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }],
        metricFilter: { filter: { fieldName: 'sessions', numericFilter: { operation: 'GREATER_THAN_OR_EQUAL', value: { int64Value: '10' } } } },
      }),
      // AI assistant referrals
      ga4Report({
        dateRanges: ranges,
        dimensions: [{ name: 'landingPage' }, { name: 'sessionSource' }],
        metrics: [{ name: 'sessions' }],
        dimensionFilter: {
          filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'FULL_REGEXP', value: '.*(chatgpt|openai|perplexity|gemini|copilot|claude|anthropic|bard).*', caseSensitive: false } },
        },
      }),
      // Lead form events
      ga4Report({ dateRanges: ranges, dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: leadFilter }),
      // Weekly trend
      ga4Report({ dateRanges: [ranges[0]], dimensions: [{ name: 'isoYearIsoWeek' }], metrics: [{ name: 'sessions' }] }),
      ga4Report({
        dateRanges: [ranges[0]],
        dimensions: [{ name: 'isoYearIsoWeek' }],
        metrics: [{ name: 'sessions' }],
        dimensionFilter: { filter: { fieldName: 'landingPage', stringFilter: { matchType: 'BEGINS_WITH', value: '/locations/' } } },
      }),
      ga4Report({ dateRanges: [ranges[0]], dimensions: [{ name: 'isoYearIsoWeek' }, { name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: leadFilter }),
      // Search Console
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
    ])

  const site = { cur: emptyTotals(), prev: emptyTotals() }
  const loc = { cur: emptyTotals(), prev: emptyTotals() }
  const pages = new Map<string, PageRow>()
  const pageRow = (page: string): PageRow => {
    let r = pages.get(page)
    if (!r) {
      const m = marketFromPath(page)
      r = {
        page, market: m.market, level: m.level, sessions: 0, botSessions: 0, realSessions: 0, organic: 0, paid: 0, ai: 0, other: 0,
        bounceRate: 0, leads: 0, leadEvent: null, convRate: 0, gscClicks: 0, gscImpressions: 0, gscPosition: null,
        topQuery: null, topQueryPosition: null, semrush: null, status: 'Steady', action: '',
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
    if (period === 'cur' && isLocationPage(page)) {
      const r = pageRow(page)
      r.sessions += sessions
      r[bucket] += sessions
      engagedByPage.set(page, (engagedByPage.get(page) || 0) + engaged)
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
    if (isLocationPage(page)) {
      loc[period].botSessions += sessions
      if (period === 'cur') pageRow(page).botSessions += sessions
    }
  }

  // AI referrals (a subset of "other"/referral traffic, shown separately)
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
  const locationPages = [...pages.keys()]
  const leadTarget = (event: string): string | null => {
    if (SITE_WIDE_FORMS[event]) return null
    const suffix = event.replace(/^generate_lead_/, '')
    const slug = LEAD_ALIASES[suffix] || suffix.replace(/_/g, '-')
    return (
      locationPages.find((pg) => pg.split('/').pop() === slug) ||
      locationPages.find((pg) => pg.split('/').pop()?.startsWith(slug)) ||
      null
    )
  }
  const leadSources = new Map<string, { event: string; leads: number; creditedTo: string; isLocation: boolean }>()
  for (const { dims, mets } of leadRows) {
    const [event] = dims
    const period = which(dims)
    const target = leadTarget(event)
    site[period].leads += mets[0]
    if (target) loc[period].leads += mets[0]
    if (period === 'cur') {
      if (target) {
        const r = pageRow(target)
        r.leads += mets[0]
        r.leadEvent = event
      }
      leadSources.set(event, {
        event,
        leads: mets[0],
        creditedTo: target || SITE_WIDE_FORMS[event] || '(no matching page)',
        isLocation: !!target,
      })
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
      if (period === 'cur') {
        const row = pageRow(page)
        row.gscClicks += r.clicks
        row.gscImpressions += r.impressions
        row.gscPosition = r.position
      }
    }
  }
  const bestQuery = new Map<string, { q: string; clicks: number; impressions: number; position: number }>()
  for (const r of gscPageQueries) {
    if (/site:|"/.test(r.keys[1]) || r.keys[1].length > 80) continue // scraper / search-operator queries
    const page = cleanPath(new URL(r.keys[0]).pathname)
    const prev = bestQuery.get(page)
    if (!prev || r.clicks > prev.clicks || (r.clicks === prev.clicks && r.impressions > prev.impressions)) {
      bestQuery.set(page, { q: r.keys[1], clicks: r.clicks, impressions: r.impressions, position: r.position })
    }
  }

  // Keyword opportunities (non-brand searches only)
  const minImpr = Math.max(10, Math.round(p.days / 3))
  const opportunities: Opportunity[] = []
  for (const r of gscPageQueries) {
    const query = r.keys[1]
    if (/site:|"/.test(query) || query.length > 80 || /moving ?walls|movingwalls/i.test(query)) continue
    if (r.impressions < minImpr) continue
    const page = cleanPath(new URL(r.keys[0]).pathname)
    const base = { page, query, impressions: r.impressions, clicks: r.clicks, ctr: r.ctr, position: r.position }
    if (r.position <= 5 && r.ctr < 0.02) {
      opportunities.push({ ...base, type: 'Click gap', advice: `Already #${r.position.toFixed(0)} but few clicks: put "${query}" at the start of the title and give the description a concrete reason to click (screens, locations, numbers).` })
    } else if (r.position > 3 && r.position <= 20) {
      opportunities.push({ ...base, type: 'Striking distance', advice: `#${r.position.toFixed(0)}: use "${query}" in the title/H1 or an H2, add a section or FAQ answering it, and link to this page with that wording.` })
    }
  }
  opportunities.sort((a, b) => b.impressions - a.impressions)

  // Semrush snapshot (monthly, stored privately in Sanity)
  const semrush = await getSemrushSnapshot()
  for (const s of semrush?.rows || []) {
    const row = pages.get(cleanPath(s.page))
    if (row) row.semrush = { keyword: s.keyword, volume: s.volume, position: s.position, database: s.database }
  }

  // Finish totals
  for (const t of [site.prev, site.cur]) finish(t, t.gscPosition * t.gscImpressions)
  finish(loc.cur, locPos.cur)
  finish(loc.prev, locPos.prev)

  // Finish page rows + status/action
  const siteConv = site.cur.convRate
  const countries = emptyTotals()
  const cities = emptyTotals()
  const rows = [...pages.values()].filter((r) => r.sessions > 0 || r.gscImpressions > 0)
  for (const r of rows) {
    const engaged = engagedByPage.get(r.page) || 0
    r.realSessions = Math.max(0, r.sessions - r.botSessions)
    r.bounceRate = r.sessions ? 1 - engaged / r.sessions : 0
    r.convRate = r.realSessions ? r.leads / r.realSessions : 0
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

  // Weekly trend (leads split by whether the form maps to a location page)
  const weeks = new Map<string, Dashboard['weekly'][number]>()
  const wk = (w: string) => {
    let x = weeks.get(w)
    if (!x) weeks.set(w, (x = { week: w, siteSessions: 0, locationSessions: 0, siteLeads: 0, locationLeads: 0 }))
    return x
  }
  for (const { dims, mets } of weeklyAll) wk(dims[0]).siteSessions += mets[0]
  for (const { dims, mets } of weeklyLoc) wk(dims[0]).locationSessions += mets[0]
  for (const { dims, mets } of weeklyLeads) {
    const w = wk(dims[0])
    w.siteLeads += mets[0]
    if (leadTarget(dims[1])) w.locationLeads += mets[0]
  }

  const dashboard: Dashboard = {
    generatedAt: new Date().toISOString(),
    period: p,
    site: { current: site.cur, previous: site.prev },
    locations: { current: loc.cur, previous: loc.prev },
    countries,
    cities,
    pages: rows,
    leadSources: [...leadSources.values()].sort((a, b) => b.leads - a.leads),
    weekly: [...weeks.values()].sort((a, b) => a.week.localeCompare(b.week)),
    learnings: [],
    opportunities: opportunities.slice(0, 40),
    semrushDate: semrush?.snapshotDate || null,
  }
  dashboard.learnings = learnings(dashboard)
  return dashboard
}

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

const pct = (n: number, d = 0) => `${(n * 100).toFixed(d)}%`

function classify(r: PageRow, siteConv: number) {
  const real = r.realSessions
  const botShare = r.sessions ? r.botSessions / r.sessions : 0
  const paidShare = real ? r.paid / real : 0
  const organicShare = real ? r.organic / real : 0
  const pos = r.topQueryPosition

  if (botShare >= 0.5) {
    r.status = 'Bot-inflated'
    r.action = `${pct(botShare)} of visits look like data-centre bots. Real traffic is ~${real} sessions. Judge this page on real visits only.`
  } else if (real < 20) {
    r.status = 'Too early'
    r.action = r.gscImpressions > 0
      ? `Only ${real} real visits, but ${r.gscImpressions.toLocaleString()} search impressions${r.gscPosition ? ` at average position ${r.gscPosition.toFixed(1)}` : ''}. Strengthen local copy and internal links to move up.`
      : `Only ${real} real visits and no search impressions yet. Check it is indexed and linked from its country page.`
  } else if (paidShare >= 0.7) {
    r.status = 'Paid-driven'
    r.action = `${pct(paidShare)} of visits are from ads, converting at ${pct(r.convRate, 1)}. Judge it with the ad campaigns; for SEO, push local keywords on its city pages.`
  } else if (r.leads > 0 && organicShare >= 0.4) {
    r.status = 'Winning'
    r.action = pos && pos > 3
      ? `Organic lead driver. Push "${r.topQuery}" from #${pos.toFixed(0)} into the top 3 with a rates/pricing section and FAQs.`
      : `Organic lead driver${r.topQuery ? ` ranking for "${r.topQuery}"` : ''}. Protect it: keep content fresh and add case studies from this market.`
  } else if (r.leads > 0) {
    r.status = 'Converting'
    r.action = r.convRate < siteConv
      ? `Converts at ${pct(r.convRate, 1)}, below the site average (${pct(siteConv, 1)}). Test a stronger, market-specific CTA higher on the page.`
      : `Converts at ${pct(r.convRate, 1)}, above the site average. Grow traffic: target more local keywords and link to it from related pages.`
  } else if (real >= 50) {
    r.status = 'Leaking'
    r.action = `${real} real visits, ${pct(r.bounceRate)} bounce, 0 leads. Check the form fires its own generate_lead event, then match the hero and CTA to how visitors arrive (${organicShare >= 0.5 ? 'mostly search' : paidShare >= 0.4 ? 'mostly ads' : 'mixed sources'}).`
  } else {
    r.status = 'Steady'
    r.action = r.leadEvent
      ? `Some traffic, no leads yet. Keep building local content.`
      : `${real} real visits, no leads. Confirm this page has its own lead form event so enquiries are credited to it.`
  }
}

function learnings(d: Dashboard): Learning[] {
  const out: Learning[] = []
  const s = d.site.current
  const l = d.locations.current
  const c = d.cities
  const k = d.countries

  // Locations vs whole site
  if (l.realSessions && s.realSessions) {
    const shareTraffic = l.realSessions / s.realSessions
    const shareLeads = s.leads ? l.leads / s.leads : 0
    out.push({
      tag: shareLeads >= shareTraffic ? 'Working' : 'Context',
      headline: `Location pages bring ${pct(shareTraffic)} of real traffic and ${pct(shareLeads)} of leads`,
      detail: `Location pages converted ${pct(l.convRate, 1)} of real visits vs ${pct(s.convRate, 1)} for the whole site, with ${pct(l.bounceRate)} bounce vs ${pct(s.bounceRate)}.`,
    })
  }

  // City vs country
  if (c.realSessions >= 50 && k.realSessions >= 50) {
    const ratio = k.convRate ? c.convRate / k.convRate : 0
    out.push({
      tag: c.convRate > k.convRate ? 'Working' : 'Context',
      headline: c.convRate > k.convRate
        ? `City pages convert ${ratio >= 1.5 ? `about ${ratio.toFixed(0)}x` : 'better than'} country pages`
        : 'Country pages convert better than city pages',
      detail: `City pages: ${pct(c.convRate, 1)} conversion, ${pct(c.bounceRate)} bounce. Country pages: ${pct(k.convRate, 1)} conversion, ${pct(k.bounceRate)} bounce.`,
    })
  }

  // Bots
  if (l.sessions && l.botSessions / l.sessions >= 0.1) {
    const worst = [...d.pages].sort((a, b) => b.botSessions - a.botSessions)[0]
    out.push({
      tag: 'Data quality',
      headline: `${pct(l.botSessions / l.sessions)} of /locations/ visits look like bots`,
      detail: `About ${l.botSessions.toLocaleString()} near-zero-engagement sessions from data-centre cities were removed, mostly on ${worst.page} (${worst.botSessions.toLocaleString()}). Raw GA4 numbers for these pages are inflated.`,
    })
  }

  // Paid dependence of country pages
  if (k.realSessions && k.paid / k.realSessions >= 0.5) {
    out.push({
      tag: 'Context',
      headline: `${pct(k.paid / k.realSessions)} of country-page visits come from ads`,
      detail: `Country-page conversion mostly reflects ad targeting, not SEO. Judge them alongside the paid campaigns.`,
    })
  }

  // Too early
  const tooEarly = d.pages.filter((p) => p.status === 'Too early')
  const cityCount = d.pages.filter((p) => p.level === 'City').length
  if (tooEarly.length) {
    out.push({
      tag: 'Not yet',
      headline: `${tooEarly.length} location pages are too new or too small to judge`,
      detail: `${tooEarly.filter((p) => p.level === 'City').length} of ${cityCount} city pages had fewer than 20 real visits in ${d.period.days} days. Give them a full quarter before deciding.`,
    })
  }

  // Leaking pages with organic rankings
  const leaking = d.pages.filter((p) => p.status === 'Leaking').sort((a, b) => b.realSessions - a.realSessions)
  if (leaking.length) {
    const top = leaking[0]
    out.push({
      tag: 'Fix',
      headline: `${leaking.length} page${leaking.length > 1 ? 's get' : ' gets'} real traffic but no leads`,
      detail: `Biggest: ${top.page} (${top.realSessions} real visits, ${pct(top.bounceRate)} bounce). First check its form sends its own generate_lead event; then tighten the hero and CTA.`,
    })
  }

  // Top organic winners
  const winners = d.pages.filter((p) => p.status === 'Winning')
  if (winners.length) {
    out.push({
      tag: 'Working',
      headline: `${winners.length} page${winners.length > 1 ? 's turn' : ' turns'} organic traffic into leads`,
      detail: winners.slice(0, 4).map((w) => `${w.market} (${w.leads} leads${w.topQuery ? `, "${w.topQuery}"` : ''})`).join(', ') + '.',
    })
  }

  out.push({
    tag: 'Context',
    headline: 'Leads are credited by form, not by page',
    detail: 'GA4 records enquiries inside the Zoho form, so each page gets the leads from its own form event (e.g. generate_lead_bangalore). Site-wide contact and demo form leads are not credited to any location page.',
  })
  return out
}

// Bump when the calculations change so cached results from older code are not reused
const CACHE_VERSION = 'v5'

export const getDashboard = (range: RangeKey) =>
  unstable_cache(() => build(range), ['internal-insights', CACHE_VERSION, range], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })()
