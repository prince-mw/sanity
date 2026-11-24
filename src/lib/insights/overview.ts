import 'server-only'
import type { Dashboard } from './data'
import type { CampaignDashboard } from './campaigns'
import type { LeadsDashboard } from './leads'
import type { ContentDashboard } from './content'
import type { BlogAudit } from './blogAudit'
import type { StatusMap } from './actions'
import type { TabKey } from './tabs'
import { TARGETS_WARNING, type PipelineDashboard } from './pipeline'
import type { AdsDashboard } from './ads'

// Overview tab: the headline numbers, wins, concerns and open action items of the other tabs (not Roadmap),
// for the same date range. Built from those tabs' cached data.
// Each source is built as its own "piece", fetched separately by the browser (/api/internal-insights/overview),
// so no single request has to load every source: that took longer than the hosting time limit (~28 s) when
// the caches were cold and showed a 504. OverviewTab puts the pieces together as they arrive.

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

export type FunnelStep = { label: string; value: number; format: MetricFormat; note: string }
export type ProgressGroup = { tab: TabKey; label: string; total: number; wip: number; done: number }
/** Yearly target progress (Pipeline & Targets tab); not tied to the selected dates */
export type TargetProgress = { year: number; target: number; budget: number; won: number; forecast: number; yearElapsed: number; warning: string }

/** The data sources behind the Overview, each loaded by its own request */
export const OVERVIEW_PARTS = ['site', 'ads', 'blog', 'leads', 'campaigns', 'content', 'pipeline'] as const
export type OverviewPart = (typeof OVERVIEW_PARTS)[number]

/** One source's share of the Overview */
export interface OverviewPiece {
  headline: Metric[]
  /** Website visit → deal steps: the Google Analytics steps (site) or the Zoho CRM steps (leads) */
  funnel?: FunnelStep[]
  /** Its card under "By area" */
  tab?: TabSummary
  progress?: ProgressGroup
  /** Its open high-priority action items */
  actions?: OverviewAction[]
  target?: TargetProgress
}

export interface OverviewSources {
  site: Dashboard
  campaigns: CampaignDashboard
  leads: LeadsDashboard
  content: ContentDashboard
  blog: BlogAudit
  ads: AdsDashboard
  pipeline: PipelineDashboard
}

const sum = <T,>(xs: T[], f: (x: T) => number) => xs.reduce((n, x) => n + f(x), 0)
const first = <T,>(xs: T[] | undefined) => (xs && xs.length ? xs[0] : undefined)

/** Progress and open high-priority items for one tab's action items, with their shared status */
function actionsOf(tab: TabKey, label: string, items: Omit<OverviewAction, 'tab' | 'tabLabel'>[], statuses: StatusMap): Pick<OverviewPiece, 'progress' | 'actions'> {
  if (!items.length) return {}
  const statusOf = (id: string) => statuses[id]?.status || 'not-started'
  return {
    progress: {
      tab, label, total: items.length,
      wip: items.filter((x) => statusOf(x.id) === 'wip').length,
      done: items.filter((x) => statusOf(x.id) === 'done').length,
    },
    actions: items
      .filter((x) => x.priority === 'High' && statusOf(x.id) !== 'done')
      .map((x) => ({ id: x.id, tab, tabLabel: label, priority: x.priority, title: x.title, detail: x.detail })),
  }
}

/** Shown on the card when a source fails to load. Ads, Pipeline and Blog just leave their card out. */
const UNAVAILABLE: Partial<Record<OverviewPart, TabSummary>> = {
  site: { key: 'locations', title: 'Location pages', metrics: [], unavailable: 'Google Analytics data couldn’t load.' },
  campaigns: { key: 'campaigns', title: 'Email campaigns', metrics: [], unavailable: 'Zoho Analytics data couldn’t load.' },
  leads: { key: 'leads', title: 'Leads & Deals', metrics: [], unavailable: 'Zoho CRM data couldn’t load.' },
  content: { key: 'content', title: 'Content', metrics: [], unavailable: 'Content data couldn’t load.' },
}

export const unavailablePiece = (part: OverviewPart): OverviewPiece => ({ headline: [], tab: UNAVAILABLE[part] })

export function buildOverviewPiece<P extends OverviewPart>(part: P, data: OverviewSources[P], statuses: StatusMap): OverviewPiece {
  switch (part) {
    case 'site': {
      const site = data as Dashboard
      const s = site.site
      const l = site.locations
      return {
        headline: [
          { label: 'Website visits', value: s.current.realSessions, prev: s.previous.realSessions, format: 'number', note: 'bots removed', info: 'Real visits to the whole website (Google Analytics), with estimated bot traffic removed.' },
          { label: 'Website leads', value: s.current.leads, prev: s.previous.leads, format: 'number', note: `${s.current.paidLeads} from paid ads`, info: 'Website form fills (Google Analytics lead events), on any page.' },
        ],
        funnel: [
          { label: 'Website visits', value: s.current.realSessions, format: 'number', note: 'Google Analytics' },
          { label: 'Form fills', value: s.current.leads, format: 'number', note: 'Google Analytics' },
        ],
        tab: {
          key: 'locations', title: 'Location pages',
          metrics: [
            { label: 'Real visits', value: l.current.realSessions, prev: l.previous.realSessions, format: 'number' },
            { label: 'Leads', value: l.current.leads, prev: l.previous.leads, format: 'number', note: `${l.current.paidLeads} paid` },
            { label: 'Google clicks', value: l.current.gscClicks, prev: l.previous.gscClicks, format: 'number' },
          ],
          win: first(site.working), concern: first(site.notWorking),
        },
        ...actionsOf('locations', 'Location pages', site.actions || [], statuses),
      }
    }
    case 'leads': {
      const leads = data as LeadsDashboard
      const { Inbound: i, Outbound: o } = leads.current
      const { Inbound: pi, Outbound: po } = leads.previous
      const topDeal = leads.deals[0]
      return {
        headline: [
          { label: 'Inbound CRM leads', value: i.leads, prev: pi.leads, format: 'number', note: `${i.fromForms} from website forms${leads.infoSheet.status === 'ok' ? ` · ${i.fromInfo} info@ emails` : ''} · spam, junk & job applications excluded`, info: 'New marketing leads in Zoho CRM (website forms, info@movingwalls.com emails, social, downloads, plus event and list uploads filed as Website). Spam, junk and job applications never become CRM leads, which is why Website leads (every form sent) is a little higher.' },
          { label: 'Pipeline created', value: i.dealValue + o.dealValue, prev: pi.dealValue + po.dealValue, format: 'usd', note: `${i.deals + o.deals} deals`, info: 'Value of the deals that came from this period’s inbound and outbound leads (Leads & Deals tab).' },
          { label: 'Closed won', value: i.wonValue + o.wonValue, prev: pi.wonValue + po.wonValue, format: 'usd', note: `${i.won + o.won} deals`, info: 'Deals from this period’s leads that are now Closed Won.' },
        ],
        funnel: [
          { label: 'CRM leads from forms', value: i.fromForms, format: 'number', note: 'Zoho CRM' },
          { label: 'Deals', value: sum(leads.byForm, (r) => r.deals), format: 'number', note: 'from those leads' },
          { label: 'Deal value', value: sum(leads.byForm, (r) => r.dealValue), format: 'usd', note: 'from those leads' },
        ],
        tab: {
          key: 'leads', title: 'Leads & Deals',
          metrics: [
            { label: 'Inbound deal value', value: i.dealValue, prev: pi.dealValue, format: 'usd', note: `${i.deals} deals` },
            { label: 'Outbound deal value', value: o.dealValue, prev: po.dealValue, format: 'usd', note: `${o.deals} deals` },
            { label: 'Inbound lead → deal', value: i.convRate, prev: pi.convRate, format: 'percent', points: true },
          ],
          win: topDeal && topDeal.amount ? { title: `Largest new deal: ${topDeal.name}`, detail: `${topDeal.channel}, ${topDeal.stage}, owner ${topDeal.owner || 'not set'}.` } : undefined,
        },
      }
    }
    case 'content': {
      const content = data as ContentDashboard
      const li = content.social.find((x) => x.name === 'LinkedIn')
      return {
        headline: [
          { label: 'Content readers', value: content.current.readers, prev: content.previous.readers, format: 'number', note: `${content.current.published} published`, info: 'People who read a blog or case study.' },
          { label: 'Social engagements', value: sum(content.social, (x) => x.engagements), prev: sum(content.social, (x) => x.prevEngagements), format: 'number', note: 'LinkedIn, Facebook, Instagram', info: 'Reactions, comments, shares, clicks and saves on posts published in this period.' },
        ],
        tab: {
          key: 'content', title: 'Content',
          metrics: [
            { label: 'Readers', value: content.current.readers, prev: content.previous.readers, format: 'number' },
            { label: 'Enquiries from content', value: content.current.leads, prev: content.previous.leads, format: 'number' },
            ...(li ? [{ label: 'LinkedIn impressions', value: li.impressions, prev: li.prevImpressions, format: 'number' as const }] : []),
          ],
          win: first(content.working), concern: first(content.notWorking),
        },
        ...actionsOf('content', 'Content', content.actions || [], statuses),
      }
    }
    case 'campaigns': {
      const c = data as CampaignDashboard
      return {
        headline: [
          { label: 'Visits from email', value: c.current.visits, prev: c.previous.visits, format: 'number', note: `${c.current.campaigns} campaign${c.current.campaigns === 1 ? '' : 's'} sent`, info: 'Website visits from email campaigns (Google Analytics).' },
        ],
        tab: {
          key: 'campaigns', title: 'Email campaigns',
          metrics: [
            { label: 'Campaigns sent', value: c.current.campaigns, prev: c.previous.campaigns, format: 'number' },
            { label: 'Open rate', value: c.current.openRate, prev: c.previous.openRate, format: 'percent', points: true },
            { label: 'Click rate', value: c.current.clickRate, prev: c.previous.clickRate, format: 'percent', points: true },
          ],
          win: first(c.working), concern: first(c.notWorking),
        },
        ...actionsOf('campaigns', 'Email campaigns', c.actions || [], statuses),
      }
    }
    case 'ads': {
      const ads = data as AdsDashboard
      const a = ads.current
      const b = ads.previous
      if (ads.source === 'google-ads') {
        // Google Ads numbers (via the daily sheet): spend and conversions as Google Ads counts them
        const top = [...ads.campaigns].filter((x) => x.conversions).sort((x, y) => x.cost / x.conversions - y.cost / y.conversions)[0]
        const alert = ads.alerts[0]
        return {
          headline: [],
          tab: {
            key: 'ads', title: 'Ads',
            metrics: [
              { label: 'Ad spend', value: a.cost, prev: b.cost, format: 'sgd', lowerIsBetter: true, note: 'Google Ads' },
              { label: 'Conversions', value: a.conversions, prev: b.conversions, format: 'number' },
              { label: 'Cost per conversion', value: a.conversions ? a.cost / a.conversions : 0, prev: b.conversions ? b.cost / b.conversions : 0, format: 'sgd', lowerIsBetter: true },
            ],
            win: top ? { title: `Cheapest conversions: ${top.name}`, detail: `${Math.round(top.conversions)} conversions at SGD ${Math.round(top.cost / top.conversions)} each.` } : undefined,
            concern: alert ? { title: alert.title, detail: alert.detail } : undefined,
          },
        }
      }
      const top = [...ads.campaigns].sort((x, y) => y.leads - x.leads)[0]
      return {
        headline: [],
        tab: {
          key: 'ads', title: 'Ads',
          metrics: [
            { label: 'Ad spend', value: a.cost, prev: b.cost, format: 'sgd', lowerIsBetter: true, note: 'per Google Analytics' },
            { label: 'Leads from ads', value: a.leads, prev: b.leads, format: 'number' },
            { label: 'Cost per lead', value: a.leads ? a.cost / a.leads : 0, prev: b.leads ? b.cost / b.leads : 0, format: 'sgd', lowerIsBetter: true },
          ],
          win: top && top.leads ? { title: `Most leads: ${top.name}`, detail: `${top.leads} leads from ${top.sessions.toLocaleString('en-US')} visits.` } : undefined,
        },
      }
    }
    case 'pipeline': {
      const pipeline = data as PipelineDashboard
      const t = pipeline.total
      const share = (n: number, of: number) => (of ? `${Math.round((n / of) * 100)}%` : '–')
      const onTrack = pipeline.regions.filter((r) => r.status === 'On track')
      const gap = pipeline.regions.filter((r) => r.target).sort((a, b) => b.target - b.forecast - (a.target - a.forecast))[0]
      return {
        headline: [],
        tab: {
          key: 'pipeline', title: `Pipeline & Targets (${pipeline.year})`, warning: TARGETS_WARNING,
          metrics: [
            { label: 'Won so far', value: t.won, prev: 0, format: 'usd', hideDelta: true, note: `${share(t.won, t.target)} of target` },
            { label: 'Expected by year end', value: t.forecast, prev: 0, format: 'usd', hideDelta: true, note: `${share(t.forecast, t.target)} target · ${share(t.forecast, t.budget)} budget` },
            { label: 'Open pipeline', value: t.open, prev: 0, format: 'usd', hideDelta: true, note: `${t.openDeals} deals` },
          ],
          win: onTrack.length ? { title: `On track: ${onTrack.map((r) => r.label).join(', ')}`, detail: 'Expected to reach at least 90% of target.' } : undefined,
          concern: gap && gap.forecast < gap.target ? { title: `Biggest gap: ${gap.label}`, detail: `Expected ${share(gap.forecast, gap.target)} of its target, $${Math.round((gap.target - gap.forecast) / 1000).toLocaleString('en-US')}k short.` } : undefined,
        },
        target: { year: pipeline.year, target: t.target, budget: t.budget, won: t.won, forecast: t.forecast, yearElapsed: pipeline.yearElapsed, warning: TARGETS_WARNING },
      }
    }
    case 'blog': {
      const blog = data as BlogAudit
      const items = blog.sections.flatMap((s) => s.items)
      const done = items.filter((x) => statuses[x.id]?.status === 'done').length
      // The audit is a fixed 12-month snapshot: its clicks and zero-click posts vs the 12 months before
      const stats = ['google clicks', 'zero clicks']
        .map((k) => blog.stats.find((s) => s.label.toLowerCase().includes(k)))
        .filter((s): s is BlogAudit['stats'][number] => !!s)
      return {
        headline: [],
        tab: {
          key: 'blog', title: 'Blog findings',
          metrics: [
            { label: 'Audit actions done', value: done, prev: 0, format: 'number', note: `of ${items.length}`, hideDelta: true },
            ...stats.map((s) => ({ label: s.label, value: s.cur, prev: s.prev, format: 'number' as const, lowerIsBetter: s.lowerIsBetter, note: s.prevLabel })),
          ],
          win: first(blog.findings),
        },
        ...actionsOf('blog', 'Blog findings', items, statuses),
      }
    }
  }
  return { headline: [] }
}
