import 'server-only'
import type { Dashboard } from './data'
import type { CampaignDashboard } from './campaigns'
import type { LeadsDashboard } from './leads'
import type { ContentDashboard } from './content'
import type { BlogAudit } from './blogAudit'
import type { StatusMap } from './actions'
import { TABS, type TabKey } from './tabs'
import { TARGETS_WARNING, type PipelineDashboard } from './pipeline'
import type { AdsDashboard } from './ads'

// Overview tab: the headline numbers, wins, concerns and open action items of the other tabs (not Roadmap),
// for the same date range. Built from those tabs' cached data; a source that fails to load is left out.

/** 'sgd': Google Ads amounts, in the ad account's currency */
export type MetricFormat = 'number' | 'usd' | 'sgd' | 'percent'

export interface Metric {
  label: string
  value: number
  prev: number
  format: MetricFormat
  /** Rates: show the change in percentage points */
  points?: boolean
  lowerIsBetter?: boolean
  /** No comparison (e.g. a count with no previous period) */
  hideDelta?: boolean
  note?: string
  info?: string
}

export interface TabSummary {
  key: TabKey
  title: string
  metrics: Metric[]
  win?: { title: string; detail: string }
  concern?: { title: string; detail: string }
  /** Shown instead of metrics when the source couldn't load */
  unavailable?: string
  /** Caveat shown on the card, e.g. targets still being confirmed */
  warning?: string
}

export interface OverviewAction { id: string; tab: TabKey; tabLabel: string; priority: 'High' | 'Medium' | 'Low'; title: string; detail: string }

export interface OverviewData {
  headline: Metric[]
  funnel: { label: string; value: number; format: MetricFormat; note: string }[] | null
  tabs: TabSummary[]
  progress: { tab: TabKey; label: string; total: number; wip: number; done: number }[]
  topActions: OverviewAction[]
  /** Yearly target progress (Pipeline & Targets tab); not tied to the selected dates */
  target: { year: number; target: number; budget: number; won: number; forecast: number; yearElapsed: number; warning: string } | null
}

interface Sources {
  site: Dashboard | null
  campaigns: CampaignDashboard | null
  leads: LeadsDashboard | null
  content: ContentDashboard | null
  blog: BlogAudit | null
  ads: AdsDashboard | null
  pipeline: PipelineDashboard | null
  statuses: StatusMap
}

const sum = <T,>(xs: T[], f: (x: T) => number) => xs.reduce((n, x) => n + f(x), 0)

export function buildOverview({ site, campaigns, leads, content, blog, ads, pipeline, statuses }: Sources): OverviewData {
  const headline: Metric[] = []
  if (site) {
    const s = site.site
    headline.push(
      { label: 'Website visits', value: s.current.realSessions, prev: s.previous.realSessions, format: 'number', note: 'bots removed', info: 'Real visits to the whole website (Google Analytics), with estimated bot traffic removed.' },
      { label: 'Website leads', value: s.current.leads, prev: s.previous.leads, format: 'number', note: `${s.current.paidLeads} from paid ads`, info: 'Website form fills (Google Analytics lead events), on any page.' },
    )
  }
  if (leads) {
    const { Inbound: i, Outbound: o } = leads.current
    const { Inbound: pi, Outbound: po } = leads.previous
    headline.push(
      { label: 'Inbound CRM leads', value: i.leads, prev: pi.leads, format: 'number', note: `${i.fromForms} from website forms`, info: 'New marketing leads in Zoho CRM (website, social, downloads, plus event and list uploads filed as Website).' },
      { label: 'Pipeline created', value: i.dealValue + o.dealValue, prev: pi.dealValue + po.dealValue, format: 'usd', note: `${i.deals + o.deals} deals`, info: 'Value of the deals that came from this period’s inbound and outbound leads (Leads & Deals tab).' },
      { label: 'Closed won', value: i.wonValue + o.wonValue, prev: pi.wonValue + po.wonValue, format: 'usd', note: `${i.won + o.won} deals`, info: 'Deals from this period’s leads that are now Closed Won.' },
    )
  }
  if (content) {
    const social = sum(content.social, (x) => x.engagements)
    const prevSocial = sum(content.social, (x) => x.prevEngagements)
    headline.push(
      { label: 'Content readers', value: content.current.readers, prev: content.previous.readers, format: 'number', note: `${content.current.published} published`, info: 'People who read a blog or case study.' },
      { label: 'Social engagements', value: social, prev: prevSocial, format: 'number', note: 'LinkedIn, Facebook, Instagram', info: 'Reactions, comments, shares, clicks and saves on posts published in this period.' },
    )
  }
  if (campaigns) {
    headline.push({ label: 'Visits from email', value: campaigns.current.visits, prev: campaigns.previous.visits, format: 'number', note: `${campaigns.current.campaigns} campaign${campaigns.current.campaigns === 1 ? '' : 's'} sent`, info: 'Website visits from email campaigns (Google Analytics).' })
  }

  // Website enquiries from visit to deal
  const funnel: OverviewData['funnel'] =
    site && leads
      ? [
          { label: 'Website visits', value: site.site.current.realSessions, format: 'number', note: 'Google Analytics' },
          { label: 'Form fills', value: site.site.current.leads, format: 'number', note: 'Google Analytics' },
          { label: 'CRM leads from forms', value: leads.current.Inbound.fromForms, format: 'number', note: 'Zoho CRM' },
          { label: 'Deals', value: sum(leads.byForm, (r) => r.deals), format: 'number', note: 'from those leads' },
          { label: 'Deal value', value: sum(leads.byForm, (r) => r.dealValue), format: 'usd', note: 'from those leads' },
        ]
      : null

  const tabs: TabSummary[] = []
  const first = <T,>(xs: T[] | undefined) => (xs && xs.length ? xs[0] : undefined)

  if (site) {
    const l = site.locations
    tabs.push({
      key: 'locations', title: 'Location pages',
      metrics: [
        { label: 'Real visits', value: l.current.realSessions, prev: l.previous.realSessions, format: 'number' },
        { label: 'Leads', value: l.current.leads, prev: l.previous.leads, format: 'number', note: `${l.current.paidLeads} paid` },
        { label: 'Google clicks', value: l.current.gscClicks, prev: l.previous.gscClicks, format: 'number' },
      ],
      win: first(site.working), concern: first(site.notWorking),
    })
  } else tabs.push({ key: 'locations', title: 'Location pages', metrics: [], unavailable: 'Google Analytics data couldn’t load.' })

  if (campaigns) {
    const c = campaigns
    tabs.push({
      key: 'campaigns', title: 'Email campaigns',
      metrics: [
        { label: 'Campaigns sent', value: c.current.campaigns, prev: c.previous.campaigns, format: 'number' },
        { label: 'Open rate', value: c.current.openRate, prev: c.previous.openRate, format: 'percent', points: true },
        { label: 'Click rate', value: c.current.clickRate, prev: c.previous.clickRate, format: 'percent', points: true },
      ],
      win: first(c.working), concern: first(c.notWorking),
    })
  } else tabs.push({ key: 'campaigns', title: 'Email campaigns', metrics: [], unavailable: 'Zoho Analytics data couldn’t load.' })

  if (leads) {
    const { Inbound: i, Outbound: o } = leads.current
    const { Inbound: pi, Outbound: po } = leads.previous
    const topDeal = leads.deals[0]
    tabs.push({
      key: 'leads', title: 'Leads & Deals',
      metrics: [
        { label: 'Inbound deal value', value: i.dealValue, prev: pi.dealValue, format: 'usd', note: `${i.deals} deals` },
        { label: 'Outbound deal value', value: o.dealValue, prev: po.dealValue, format: 'usd', note: `${o.deals} deals` },
        { label: 'Inbound lead → deal', value: i.convRate, prev: pi.convRate, format: 'percent', points: true },
      ],
      win: topDeal && topDeal.amount ? { title: `Largest new deal: ${topDeal.name}`, detail: `${topDeal.channel}, ${topDeal.stage}, owner ${topDeal.owner || 'not set'}.` } : undefined,
    })
  } else tabs.push({ key: 'leads', title: 'Leads & Deals', metrics: [], unavailable: 'Zoho CRM data couldn’t load.' })

  if (content) {
    const li = content.social.find((x) => x.name === 'LinkedIn')
    tabs.push({
      key: 'content', title: 'Content',
      metrics: [
        { label: 'Readers', value: content.current.readers, prev: content.previous.readers, format: 'number' },
        { label: 'Enquiries from content', value: content.current.leads, prev: content.previous.leads, format: 'number' },
        ...(li ? [{ label: 'LinkedIn impressions', value: li.impressions, prev: li.prevImpressions, format: 'number' as const }] : []),
      ],
      win: first(content.working), concern: first(content.notWorking),
    })
  } else tabs.push({ key: 'content', title: 'Content', metrics: [], unavailable: 'Content data couldn’t load.' })

  if (ads) {
    const a = ads.current
    const b = ads.previous
    const top = [...ads.campaigns].sort((x, y) => y.leads - x.leads)[0]
    tabs.push({
      key: 'ads', title: 'Ads',
      metrics: [
        { label: 'Ad spend', value: a.cost, prev: b.cost, format: 'sgd', lowerIsBetter: true, note: 'per Google Analytics' },
        { label: 'Leads from ads', value: a.leads, prev: b.leads, format: 'number' },
        { label: 'Cost per lead', value: a.leads ? a.cost / a.leads : 0, prev: b.leads ? b.cost / b.leads : 0, format: 'sgd', lowerIsBetter: true },
      ],
      win: top && top.leads ? { title: `Most leads: ${top.name}`, detail: `${top.leads} leads from ${top.sessions.toLocaleString('en-US')} visits.` } : undefined,
    })
  }

  if (pipeline) {
    const t = pipeline.total
    const share = (n: number, of: number) => (of ? `${Math.round((n / of) * 100)}%` : '–')
    const onTrack = pipeline.regions.filter((r) => r.status === 'On track')
    const gap = pipeline.regions.filter((r) => r.target).sort((a, b) => b.target - b.forecast - (a.target - a.forecast))[0]
    tabs.push({
      key: 'pipeline', title: `Pipeline & Targets (${pipeline.year})`, warning: TARGETS_WARNING,
      metrics: [
        { label: 'Won so far', value: t.won, prev: 0, format: 'usd', hideDelta: true, note: `${share(t.won, t.target)} of target` },
        { label: 'Expected by year end', value: t.forecast, prev: 0, format: 'usd', hideDelta: true, note: `${share(t.forecast, t.target)} target · ${share(t.forecast, t.budget)} budget` },
        { label: 'Open pipeline', value: t.open, prev: 0, format: 'usd', hideDelta: true, note: `${t.openDeals} deals` },
      ],
      win: onTrack.length ? { title: `On track: ${onTrack.map((r) => r.label).join(', ')}`, detail: 'Expected to reach at least 90% of target.' } : undefined,
      concern: gap && gap.forecast < gap.target ? { title: `Biggest gap: ${gap.label}`, detail: `Expected ${share(gap.forecast, gap.target)} of its target, $${Math.round((gap.target - gap.forecast) / 1000).toLocaleString('en-US')}k short.` } : undefined,
    })
  }
  // Area cards in the same order as the tabs
  const order = (k: TabKey) => TABS.findIndex((t) => t.key === k)
  tabs.sort((a, b) => order(a.key) - order(b.key))

  // Action items and their shared status, per tab
  const statusOf = (id: string) => statuses[id]?.status || 'not-started'
  const groups: { tab: TabKey; label: string; items: Omit<OverviewAction, 'tab' | 'tabLabel'>[] }[] = [
    { tab: 'locations', label: 'Location pages', items: site?.actions || [] },
    { tab: 'campaigns', label: 'Email campaigns', items: campaigns?.actions || [] },
    { tab: 'content', label: 'Content', items: content?.actions || [] },
    { tab: 'blog', label: 'Blog findings', items: (blog?.sections || []).flatMap((s) => s.items) },
  ]
  const progress = groups.filter((g) => g.items.length).map((g) => ({
    tab: g.tab, label: g.label, total: g.items.length,
    wip: g.items.filter((x) => statusOf(x.id) === 'wip').length,
    done: g.items.filter((x) => statusOf(x.id) === 'done').length,
  }))
  const topActions = groups
    .flatMap((g) => g.items.filter((x) => x.priority === 'High' && statusOf(x.id) !== 'done').map((x) => ({ id: x.id, tab: g.tab, tabLabel: g.label, priority: x.priority, title: x.title, detail: x.detail })))
    .slice(0, 8)

  if (blog) {
    const items = blog.sections.flatMap((s) => s.items)
    const done = items.filter((x) => statusOf(x.id) === 'done').length
    // The audit is a fixed 12-month snapshot: its clicks and zero-click posts vs the 12 months before
    const stats = ['google clicks', 'zero clicks']
      .map((k) => blog.stats.find((s) => s.label.toLowerCase().includes(k)))
      .filter((s): s is BlogAudit['stats'][number] => !!s)
    tabs.push({
      key: 'blog', title: 'Blog findings',
      metrics: [
        { label: 'Audit actions done', value: done, prev: 0, format: 'number', note: `of ${items.length}`, hideDelta: true },
        ...stats.map((s) => ({ label: s.label, value: s.cur, prev: s.prev, format: 'number' as const, lowerIsBetter: s.lowerIsBetter, note: s.prevLabel })),
      ],
      win: first(blog.findings),
    })
  }

  const target = pipeline
    ? { year: pipeline.year, target: pipeline.total.target, budget: pipeline.total.budget, won: pipeline.total.won, forecast: pipeline.total.forecast, yearElapsed: pipeline.yearElapsed, warning: TARGETS_WARNING }
    : null

  return { headline, funnel, tabs, progress, topActions, target }
}
