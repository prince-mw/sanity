import 'server-only'
import { unstable_cache } from 'next/cache'
import { ga4Report } from './google'
import { zohoTableRows } from './zoho'
import { actionId } from './actions'
import { periods, type RangeKey } from './ranges'

// Email campaign performance for /internal-insights (Campaigns tab).
// Source: the marketing team's Zoho Analytics workspace "Marketing Team Workspace", table
// "Campaigns (Zoho Campaigns)-2" (the synced campaign list behind the "Marketing Command Center - MW"
// report). The report's query tables (Newsletter Performance Base / Feedback View / CRM Cleanup
// Signals) only allow slow, queued exports, so their rules are re-applied here; checked to match the
// report row-for-row on 2026-10-29. Website visits and leads per campaign come from GA4.

const CAMPAIGNS_TABLE = '2553974000081676583'

/** One Zoho call per refresh, shared by every date range (Zoho rate-limits API calls per minute) */
const getCampaignRows = unstable_cache(() => zohoTableRows(CAMPAIGNS_TABLE), ['internal-insights-zoho-campaigns'], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })

/** Market from the campaign name, as in "Newsletter Performance Base" */
function marketOf(name: string): string {
  const s = name.toLowerCase()
  if (/americas/.test(s)) return 'Americas'
  if (/europe/.test(s)) return 'Europe'
  if (/japan/.test(s)) return 'Japan'
  if (/\bmena\b/.test(s)) return 'MENA'
  if (/china|north\s*asia/.test(s)) return 'North Asia'
  if (/india/.test(s)) return 'South Asia'
  if (/africa/.test(s)) return 'Sub Saharan Africa'
  return 'Unmapped'
}

const OWNERS: Record<string, string> = {
  Americas: 'Sherlee', Europe: 'Sumaiya', Japan: 'Sherlee', MENA: 'Rukshana', 'North Asia': 'Sai', 'South Asia': 'Sukriti', 'Sub Saharan Africa': 'Savita',
}

// Thresholds from "Newsletter Performance Feedback View" / "CRM Cleanup Signals"
const HIGH_BOUNCE = 0.05
const HIGH_PRIORITY_BOUNCE = 0.1
const LOW_OPEN = 0.1

function feedbackFor(market: string, openRate: number, bounceRate: number) {
  if (market === 'Unmapped') return { issue: 'Market not mapped', reason: 'Campaign name does not include market keyword', suggestion: 'Apply new campaign naming format from next month', cleanupPriority: 'Mapping Cleanup' }
  if (bounceRate > HIGH_BOUNCE) return { issue: 'High bounce rate', reason: 'CRM contact data may need cleanup', suggestion: 'Clean CRM contacts for this market', cleanupPriority: bounceRate > HIGH_PRIORITY_BOUNCE ? 'High Priority' : 'Medium Priority' }
  if (openRate < LOW_OPEN) return { issue: 'Low open rate', reason: 'Subject line or audience targeting may need review', suggestion: 'Review subject line, sender, and audience segment', cleanupPriority: '' }
  return { issue: 'Performing normally', reason: 'No major issue identified', suggestion: 'Continue monitoring', cleanupPriority: '' }
}

type Priority = 'High' | 'Medium' | 'Low'

export interface CampaignTotals {
  campaigns: number
  sent: number
  delivered: number
  opens: number
  clicks: number
  bounces: number
  openRate: number
  clickRate: number
  ctor: number
  bounceRate: number
  visits: number
  leads: number
}

export interface CampaignRow extends CampaignTotals {
  id: string
  name: string
  sentAt: string // yyyy-mm-dd
  market: string
  owner: string
  issue: string
  reason: string
  suggestion: string
  cleanupPriority: string
}

export interface MarketRow extends CampaignTotals {
  market: string
  owner: string
  flagged: number
}

export interface EmailTrafficRow {
  campaign: string
  source: string
  medium: string
  /** GA4 users, counted per day and added up */
  visitors: number
  leads: number
  matched: string | null
  /** utm_campaign names a month before the Zoho report starts (an older newsletter) */
  beforeReport: boolean
}

export interface CampaignFinding { title: string; detail: string }

export interface CampaignAction {
  id: string
  priority: Priority
  category: string
  title: string
  detail: string
}

export interface CampaignDashboard {
  generatedAt: string
  range: RangeKey
  current: CampaignTotals
  previous: CampaignTotals
  markets: MarketRow[]
  campaigns: CampaignRow[]
  working: CampaignFinding[]
  notWorking: CampaignFinding[]
  actions: CampaignAction[]
  emailTraffic: EmailTrafficRow[]
  /** Email visitors/leads not matched to any campaign */
  unmatched: { visits: number; leads: number }
  coverage: { first: string; last: string; total: number }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const num = (s: string | undefined) => Number(s) || 0
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
const pct1 = (n: number) => `${(n * 100).toFixed(1)}%`
const nf = (n: number) => Math.round(n).toLocaleString('en-US')
/** Zoho dates are "dd-mm-yyyy hh:mm:ss" */
const isoDate = (s: string) => `${s.slice(6, 10)}-${s.slice(3, 5)}-${s.slice(0, 2)}`

function totals(rows: Omit<CampaignTotals, 'openRate' | 'clickRate' | 'ctor' | 'bounceRate' | 'campaigns'>[]): CampaignTotals {
  const t = { campaigns: rows.length, sent: 0, delivered: 0, opens: 0, clicks: 0, bounces: 0, visits: 0, leads: 0 }
  for (const r of rows) {
    t.sent += r.sent; t.delivered += r.delivered; t.opens += r.opens; t.clicks += r.clicks
    t.bounces += r.bounces; t.visits += r.visits; t.leads += r.leads
  }
  return {
    ...t,
    openRate: t.delivered ? t.opens / t.delivered : 0,
    clickRate: t.delivered ? t.clicks / t.delivered : 0,
    ctor: t.opens ? t.clicks / t.opens : 0,
    bounceRate: t.sent ? t.bounces / t.sent : 0,
  }
}

/**
 * GA4 visitors and leads from the "Email" default channel group, by utm_campaign. Visitors are
 * counted per day and added up, the same way the Zoho "04 Channel Performance" report does
 * (checked equal for 1–28 Oct 2026: 2,213 visitors, 1 lead).
 */
async function emailTraffic(start: string, end: string): Promise<EmailTrafficRow[]> {
  const emailChannel = { filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { value: 'Email' } } }
  const leadFilter = { filter: { fieldName: 'eventName', stringFilter: { matchType: 'BEGINS_WITH', value: 'generate_lead' } } }
  const dimensions = [{ name: 'sessionCampaignName' }, { name: 'sessionSource' }, { name: 'sessionMedium' }]
  const dateRanges = [{ startDate: start, endDate: end }]
  const [users, leads] = await Promise.all([
    ga4Report({ dateRanges, dimensions: [...dimensions, { name: 'date' }], metrics: [{ name: 'totalUsers' }], dimensionFilter: emailChannel }),
    ga4Report({ dateRanges, dimensions, metrics: [{ name: 'eventCount' }], dimensionFilter: { andGroup: { expressions: [emailChannel, leadFilter] } } }),
  ])
  const byKey = new Map<string, EmailTrafficRow>()
  for (const r of users) {
    const key = r.dims.slice(0, 3).join('|')
    const row = byKey.get(key) || { campaign: r.dims[0], source: r.dims[1], medium: r.dims[2], visitors: 0, leads: 0, matched: null, beforeReport: false }
    row.visitors += r.mets[0]
    byKey.set(key, row)
  }
  for (const r of leads) {
    const key = r.dims.join('|')
    const row = byKey.get(key) || { campaign: r.dims[0], source: r.dims[1], medium: r.dims[2], visitors: 0, leads: 0, matched: null, beforeReport: false }
    row.leads += r.mets[0]
    byKey.set(key, row)
  }
  return [...byKey.values()].sort((a, b) => b.visitors - a.visitors)
}

// The team tags email links by hand ("europe_newsletter_august_2026", "ME Newsletter October 2026"),
// so utm_campaign rarely equals the Zoho name. Match on topic (market/newsletter) + month + year instead.
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const TOPICS: Record<string, string> = {
  europe: 'europe', eu: 'europe', me: 'mena', mena: 'mena', middleeast: 'mena', americas: 'americas', america: 'americas', latam: 'americas',
  japan: 'japan', japanese: 'japanese', china: 'china', chinese: 'china', northasia: 'northasia', india: 'india', southasia: 'india',
  africa: 'africa', subsaharan: 'africa', ssa: 'africa', adtech: 'adtech', mediatech: 'mediatech',
}

interface Signature { name: string; key: string; topics: Set<string>; month: string | null; year: string | null }

function signature(text: string): Omit<Signature, 'name'> {
  const words = decodeURIComponent(text.replace(/\+/g, ' ')).toLowerCase()
    .replace(/north\s+asia/g, 'northasia').replace(/sub[\s-]*saharan/g, 'subsaharan').replace(/middle\s+east/g, 'middleeast')
    .split(/[^a-z0-9]+/).filter(Boolean)
  const topics = new Set(words.map((w) => TOPICS[w]).filter(Boolean))
  const month = words.map((w) => MONTHS.find((m) => w.startsWith(m) && (w.length === 3 || /^(january|february|march|april|june|july|august|sept|september|october|november|december)$/.test(w)))).find(Boolean) || null
  const year = words.find((w) => /^20\d\d$/.test(w)) || null
  return { key: norm(text), topics, month, year }
}

/** Match a GA4 utm_campaign to a Zoho campaign: exact name, else same topic + month (+ year when both have one) */
function matchCampaign(utm: string, campaigns: Signature[]): string | null {
  const s = signature(utm)
  if (s.key.length < 4 || s.key === 'notset' || s.key === 'referral') return null
  const exact = campaigns.find((c) => c.key === s.key)
  if (exact) return exact.name
  if (!s.month || !s.topics.size) return null
  const hits = campaigns.filter((c) => c.month === s.month && (!s.year || !c.year || s.year === c.year) && [...s.topics].every((t) => c.topics.has(t)))
  return hits.length === 1 ? hits[0].name : null
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

async function build(range: RangeKey): Promise<CampaignDashboard> {
  const p = periods(range)
  const [raw, traffic, prevTraffic] = await Promise.all([
    getCampaignRows(),
    emailTraffic(p.start, p.end),
    emailTraffic(p.prevStart, p.prevEnd),
  ])

  const all: CampaignRow[] = raw
    .filter((r) => r.Status === 'Sent' && num(r['Emails Sent']) > 0)
    .map((r) => {
      const sent = num(r['Emails Sent'])
      const bounces = num(r.Bounces)
      const delivered = sent - bounces
      const opens = num(r['Unique Opens'])
      const clicks = num(r['Unique Clicks'])
      const name = r.Name.trim()
      const market = marketOf(name)
      const openRate = delivered ? opens / delivered : 0
      const bounceRate = sent ? bounces / sent : 0
      return {
        id: r.CAMPAIGN_ID,
        name,
        sentAt: isoDate(r['Sent Time']),
        market,
        owner: OWNERS[market] || 'Unmapped',
        ...feedbackFor(market, openRate, bounceRate),
        campaigns: 1, sent, delivered, opens, clicks, bounces,
        openRate,
        clickRate: delivered ? clicks / delivered : 0,
        ctor: opens ? clicks / opens : 0,
        bounceRate,
        visits: 0,
        leads: 0,
      }
    })

  // Match GA4 email traffic to campaigns by utm_campaign. A campaign keeps bringing visitors after
  // its send date, so traffic in the period is credited to its campaign whenever it was sent.
  const names: Signature[] = all.map((c) => ({ name: c.name, ...signature(c.name) }))
  const firstSent = all.map((c) => c.sentAt).sort()[0] || ''
  const marketOfCampaign = new Map(all.map((c) => [c.name, c.market]))
  const credit = (rows: EmailTrafficRow[]) => {
    const byCampaign = new Map<string, { visits: number; leads: number }>()
    for (const t of rows) {
      t.matched = matchCampaign(t.campaign, names)
      // Newsletters dated before the Zoho report starts can't match; don't count them as a naming problem
      const s = signature(t.campaign)
      t.beforeReport = !t.matched && !!s.month && !!s.year && `${s.year}-${String(MONTHS.indexOf(s.month) + 1).padStart(2, '0')}` < firstSent.slice(0, 7)
      if (!t.matched) continue
      const c = byCampaign.get(t.matched) || { visits: 0, leads: 0 }
      c.visits += t.visitors
      c.leads += t.leads
      byCampaign.set(t.matched, c)
    }
    return byCampaign
  }
  const inPeriod = (c: CampaignRow, s: string, e: string) => c.sentAt >= s && c.sentAt <= e
  const credited = credit(traffic)
  const campaigns = all
    .filter((c) => inPeriod(c, p.start, p.end))
    .map((c) => ({ ...c, ...(credited.get(c.name) || {}) }))
    .sort((a, b) => b.sentAt.localeCompare(a.sentAt))
  const prevCampaigns = all.filter((c) => inPeriod(c, p.prevStart, p.prevEnd))
  credit(prevTraffic)

  // Visitors and leads are all email traffic in the period (as in the Zoho Channel Performance report)
  const emailTotals = (rows: EmailTrafficRow[]) => ({ visits: rows.reduce((n, t) => n + t.visitors, 0), leads: rows.reduce((n, t) => n + t.leads, 0) })
  const current = { ...totals(campaigns), ...emailTotals(traffic) }
  const previous = { ...totals(prevCampaigns), ...emailTotals(prevTraffic) }

  // By market: campaigns sent in the period, plus email visitors/leads credited to each market's campaigns
  const groups = new Map<string, CampaignRow[]>()
  campaigns.forEach((c) => groups.set(c.market, [...(groups.get(c.market) || []), c]))
  const marketTraffic = new Map<string, { visits: number; leads: number }>()
  for (const [name, t] of credited) {
    const m = marketOfCampaign.get(name) || 'Unmapped'
    const acc = marketTraffic.get(m) || { visits: 0, leads: 0 }
    marketTraffic.set(m, { visits: acc.visits + t.visits, leads: acc.leads + t.leads })
    if (!groups.has(m)) groups.set(m, [])
  }
  const markets: MarketRow[] = [...groups.entries()]
    .map(([market, rows]) => ({
      market,
      owner: OWNERS[market] || [...new Set(rows.map((r) => r.owner))].join(', '),
      flagged: rows.filter((r) => r.issue && r.issue !== 'Performing normally').length,
      ...totals(rows),
      ...(marketTraffic.get(market) || { visits: 0, leads: 0 }),
    }))
    .sort((a, b) => Number(a.market === 'Unmapped') - Number(b.market === 'Unmapped') || b.sent - a.sent || b.visits - a.visits)
  const unmatchedTraffic = emailTotals(traffic.filter((t) => !t.matched))

  // ---- Findings ----
  const working: CampaignFinding[] = []
  const notWorking: CampaignFinding[] = []
  const mapped = markets.filter((m) => m.market !== 'Unmapped' && m.delivered >= 100)

  if (previous.campaigns && current.campaigns) {
    if (current.openRate > previous.openRate) working.push({ title: `Open rate up: ${pct1(current.openRate)} vs ${pct1(previous.openRate)}`, detail: `${current.campaigns} campaigns this period vs ${previous.campaigns} before.` })
    else if (current.openRate < previous.openRate) notWorking.push({ title: `Open rate down: ${pct1(current.openRate)} vs ${pct1(previous.openRate)}`, detail: `${current.campaigns} campaigns this period vs ${previous.campaigns} before.` })
    if (current.ctor > previous.ctor) working.push({ title: `Click-to-open up: ${pct1(current.ctor)} vs ${pct1(previous.ctor)}`, detail: 'People who open are clicking more: the email content is working.' })
  }
  const bestCtor = [...mapped].sort((a, b) => b.ctor - a.ctor)[0]
  if (bestCtor && bestCtor.ctor > 0) working.push({ title: `${bestCtor.market}: best click-to-open (${pct1(bestCtor.ctor)})`, detail: `${bestCtor.campaigns} campaign${bestCtor.campaigns > 1 ? 's' : ''} by ${bestCtor.owner}; open rate ${pct1(bestCtor.openRate)}.` })
  const bestOpen = [...mapped].sort((a, b) => b.openRate - a.openRate)[0]
  if (bestOpen && bestOpen !== bestCtor && bestOpen.openRate > 0) working.push({ title: `${bestOpen.market}: best open rate (${pct1(bestOpen.openRate)})`, detail: `${bestOpen.campaigns} campaign${bestOpen.campaigns > 1 ? 's' : ''} by ${bestOpen.owner}.` })
  const leadCampaigns = [...credited.entries()].filter(([, t]) => t.leads > 0)
  if (current.leads > 0) working.push({ title: `${current.leads} website lead${current.leads > 1 ? 's' : ''} from email`, detail: (leadCampaigns.map(([name, t]) => `${name} (${t.leads})`).join('; ') || 'Not matched to a campaign') + '.' })
  const topClicks = [...campaigns].sort((a, b) => b.clicks - a.clicks)[0]
  if (topClicks && topClicks.clicks >= 10) working.push({ title: `Most clicks: ${topClicks.name}`, detail: `${nf(topClicks.clicks)} people clicked (${pct1(topClicks.clickRate)} of delivered).` })

  const bounceByMarket = markets.map((m) => ({ m, rows: groups.get(m.market)!.filter((c) => c.issue === 'High bounce rate') })).filter((x) => x.rows.length)
  for (const { m, rows } of bounceByMarket.sort((a, b) => b.rows.length - a.rows.length).slice(0, 3)) {
    notWorking.push({ title: `${m.market}: ${rows.length} campaign${rows.length > 1 ? 's' : ''} with high bounce`, detail: `Bounce rate ${pct1(totals(rows).bounceRate)}; ${nf(totals(rows).bounces)} bounced emails. CRM contact data needs cleanup.` })
  }
  const unmapped = campaigns.filter((c) => c.market === 'Unmapped')
  if (unmapped.length) notWorking.push({ title: `${unmapped.length} of ${campaigns.length} campaigns not mapped to a market`, detail: 'Their names have no market keyword, so they are missing from the market numbers above.' })
  const lowOpen = campaigns.filter((c) => c.issue === 'Low open rate')
  if (lowOpen.length) notWorking.push({ title: `Low open rate: ${lowOpen.map((c) => c.name).join('; ')}`, detail: lowOpen[0].reason ? `${lowOpen[0].reason}.` : 'Review the subject line and audience.' })
  // Email sessions that could not be tied to a campaign (inconsistent utm_campaign naming)
  const emailSessions = traffic.reduce((n, t) => n + t.visitors, 0)
  const unmatchedSessions = traffic.filter((t) => !t.matched && !t.beforeReport).reduce((n, t) => n + t.visitors, 0)
  const untracked = current.clicks >= 20 && emailSessions === 0
  const poorlyNamed = !untracked && emailSessions >= 20 && unmatchedSessions / emailSessions > 0.3
  if (untracked) notWorking.push({ title: 'Email clicks are not showing in Google Analytics', detail: `${nf(current.clicks)} clicks in Zoho but no email visits recorded: the links may be missing UTM tags.` })
  else if (poorlyNamed) notWorking.push({ title: `${pct1(unmatchedSessions / emailSessions)} of email visits can't be tied to a campaign`, detail: `${nf(unmatchedSessions)} of ${nf(emailSessions)} email visitors have a utm_campaign that doesn't match any Zoho campaign.` })
  if (current.visits >= 20 && current.leads === 0) notWorking.push({ title: `Email brought ${nf(current.visits)} visits but no leads`, detail: 'Point the main call-to-action at a page with a contact form.' })

  // ---- Actions (ids are stable per market/issue so a status survives refreshes) ----
  const actions: (CampaignAction & { rank: number })[] = []
  for (const { m, rows } of bounceByMarket) {
    const t = totals(rows)
    const high = rows.some((r) => r.cleanupPriority === 'High Priority') || t.bounceRate >= 0.1
    actions.push({
      id: actionId(['email', 'bounce', m.market]), rank: high ? 0 : 1, priority: high ? 'High' : 'Medium', category: 'List cleanup',
      title: `Clean the ${m.market} contact list`,
      detail: `${rows.length} campaign${rows.length > 1 ? 's' : ''} flagged for high bounce (${pct1(t.bounceRate)}, ${nf(t.bounces)} bounced). Owner: ${m.owner}. Remove hard bounces and inactive contacts in Zoho CRM before the next send.`,
    })
  }
  if (unmapped.length) {
    actions.push({
      id: actionId(['email', 'naming']), rank: 1, priority: 'Medium', category: 'Naming',
      title: `Use the naming format for new campaigns (${unmapped.length} unmapped)`,
      detail: `Name campaigns "Market | Month Year Newsletter | Owner" (e.g. "Europe | Nov 2026 Newsletter | Sumaiya") so they count towards a market. Unmapped: ${unmapped.slice(0, 4).map((c) => c.name).join('; ')}${unmapped.length > 4 ? '…' : ''}.`,
    })
  }
  for (const c of lowOpen) {
    actions.push({
      id: actionId(['email', 'low-open', c.market]), rank: 1, priority: 'Medium', category: 'Subject lines',
      title: `Test new subject lines for ${c.market}`,
      detail: `"${c.name}" opened at ${pct1(c.openRate)}. ${c.suggestion || 'Review subject line, sender and audience segment'}; try an A/B subject-line test on the next send.`,
    })
  }
  if (untracked || poorlyNamed) {
    actions.push({
      id: actionId(['email', 'utm']), rank: untracked ? 0 : 1, priority: untracked ? 'High' : 'Medium', category: 'Tracking',
      title: untracked ? 'Add UTM tags to email links' : 'Use the Zoho campaign name as utm_campaign',
      detail: untracked
        ? 'Turn on Google Analytics tracking in Zoho Campaigns (utm_medium=email, utm_campaign = campaign name) so website visits and leads show per campaign.'
        : `Email links are tagged by hand with different names (e.g. "${traffic.find((t) => !t.matched && !t.beforeReport)?.campaign}"). Set utm_campaign to the Zoho campaign name, or at least include market, month and year, so every visit and lead is credited to its campaign.`,
    })
  }
  actions.sort((a, b) => a.rank - b.rank)

  const sentDates = all.map((c) => c.sentAt).sort()
  return {
    generatedAt: new Date().toISOString(),
    range,
    current,
    previous,
    markets,
    campaigns,
    working: working.slice(0, 6),
    notWorking: notWorking.slice(0, 6),
    actions: actions.map(({ rank: _rank, ...a }) => a),
    emailTraffic: traffic.slice(0, 40),
    unmatched: unmatchedTraffic,
    coverage: { first: sentDates[0] || '', last: sentDates[sentDates.length - 1] || '', total: all.length },
  }
}

// Bump when the calculation changes so cached results are rebuilt
const CACHE_VERSION = 'c8'

export const getCampaignDashboard = (range: RangeKey) =>
  unstable_cache(() => build(range), ['internal-insights-campaigns', CACHE_VERSION, range], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })()
