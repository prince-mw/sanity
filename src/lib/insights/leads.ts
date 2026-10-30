import 'server-only'
import { unstable_cache } from 'next/cache'
import { zohoTableRows } from './zoho'
import { periods, type RangeKey } from './ranges'

// Leads & Deals tab: CRM leads and the deals they turned into, from the marketing team's Zoho Analytics
// workspace (tables CRM_Direct_Leads and CRM_Direct_Deals, the sources of the "06. Lead to Pipeline" tab
// in "Marketing Command Center - MW"). Same rules as that report, checked against it on 2026-10-30 (its
// inbound deal card can show one or two fewer deals, as it skips deals with no amount; its outbound card counts them):
// - Inbound / Outbound by lead source; deals take the type of the lead they were converted from.
// - Everything is dated by the LEAD's created date: a period's deals are the deals from that period's leads.
// - Every deal converted from a lead counts, with or without an amount.
// "Website / Webform" also holds event and list uploads and other leads the team files there, so only some
// inbound leads are website form fills. A lead counts as a website form lead when its first CRM tag names a
// website form (set by the Zoho Forms → CRM integration).

const LEADS_TABLE = '2553974000069802824'
const DEALS_TABLE = '2553974000069802853'

const INBOUND_SOURCES = ['Website / Webform', 'Social Media', 'Content Download', 'Web Download']
const OUTBOUND_SOURCES = ['Prospecting Tools', 'Cold Call']

export type Channel = 'Inbound' | 'Outbound' | 'Other'
const channelOf = (source: string): Channel => (INBOUND_SOURCES.includes(source) ? 'Inbound' : OUTBOUND_SOURCES.includes(source) ? 'Outbound' : 'Other')

export interface Deal {
  id: string
  name: string
  stage: string
  created: string
  closing: string
  amount: number
  owner: string
  account: string
  channel: Channel
  /** Inbound only: the website form (first CRM tag) and market of the lead */
  form: string
  market: string
  leadDate: string
}

interface Base {
  /** Leads created per day: [inbound, outbound, other] */
  daily: Record<string, [number, number, number]>
  inbound: { date: string; form: string; market: string }[]
  deals: Deal[]
}

/** Zoho dates come as "dd/MM/yyyy[ hh:mm AM]" */
const isoDate = (s: string) => {
  const m = (s || '').match(/(\d{2})\/(\d{2})\/(\d{4})/)
  return m ? `${m[3]}-${m[2]}-${m[1]}` : ''
}
const money = (s: string) => Number(String(s || '').replace(/[^0-9.-]/g, '')) || 0
/** The website form from the lead's first CRM tag, or '' when it didn't come through one (uploads, MW Science, events) */
const formOf = (tag: string) => {
  const first = (tag || '').split(',')[0].trim()
  return /contact|demo|form|download|ebook|formula 1/i.test(first) && !/^test$/i.test(first) ? first : ''
}

/** One set of Zoho calls per refresh, shared by every date range (Zoho rate-limits bursts); calls run one after another */
const getBase = unstable_cache(
  async (): Promise<Base> => {
    const leads = await zohoTableRows(LEADS_TABLE, { columns: ['Id', 'Lead Source', 'Created Time'] })
    const inboundRows = await zohoTableRows(LEADS_TABLE, {
      criteria: `"Lead Source" in (${INBOUND_SOURCES.map((s) => `'${s}'`).join(',')})`,
      columns: ['Id', 'Created Time', 'Tag', 'Operating Country', 'Country'],
    })
    const dealRows = await zohoTableRows(DEALS_TABLE, {
      columns: ['Id', 'Deal Name', 'Stage', 'Created Time', 'Closing Date', 'Amount', 'Deal Owner Name', 'Account Name', 'Converted from Lead'],
    })

    const daily: Base['daily'] = {}
    const leadChannel = new Map<string, { channel: Channel; date: string }>()
    for (const r of leads) {
      const date = isoDate(r['Created Time'])
      const channel = channelOf(r['Lead Source'])
      leadChannel.set(r.Id, { channel, date })
      if (!date) continue
      const d = (daily[date] ??= [0, 0, 0])
      d[channel === 'Inbound' ? 0 : channel === 'Outbound' ? 1 : 2]++
    }
    const inboundById = new Map(inboundRows.map((r) => [r.Id, { date: isoDate(r['Created Time']), form: formOf(r.Tag), market: r['Operating Country'] || r.Country || 'Unknown' }]))

    // Only deals converted from a lead, as in the Zoho report
    const deals: Deal[] = []
    for (const r of dealRows) {
      const lead = leadChannel.get(r['Converted from Lead'])
      if (!lead) continue
      const inbound = inboundById.get(r['Converted from Lead'])
      deals.push({
        id: r.Id, name: r['Deal Name'], stage: r.Stage, created: isoDate(r['Created Time']), closing: isoDate(r['Closing Date']),
        amount: money(r.Amount), owner: r['Deal Owner Name'] || '', account: r['Account Name'] || '', channel: lead.channel,
        form: inbound?.form || '', market: inbound?.market || '', leadDate: lead.date,
      })
    }
    return { daily, inbound: [...inboundById.values()], deals }
  },
  ['internal-insights-zoho-crm', 'b2'],
  { revalidate: 6 * 60 * 60, tags: ['internal-insights'] },
)

export interface ChannelTotals { leads: number; /** Inbound only: leads that came through a website form */ fromForms: number; deals: number; dealValue: number; won: number; wonValue: number; convRate: number }
export interface BreakdownRow { name: string; leads: number; deals: number; dealValue: number; won: number; wonValue: number }
export interface StageRow { stage: string; inbound: number; inboundValue: number; outbound: number; outboundValue: number }
export interface MonthRow { month: string; inLeads: number; inDeals: number; inValue: number; outLeads: number; outDeals: number; outValue: number }

export interface LeadsDashboard {
  generatedAt: string
  current: Record<Channel, ChannelTotals>
  previous: Record<Channel, ChannelTotals>
  /** Open deals right now (not date-filtered) */
  openPipeline: Record<Channel, { deals: number; value: number }>
  stages: StageRow[]
  byForm: BreakdownRow[]
  byMarket: BreakdownRow[]
  months: MonthRow[]
  deals: Deal[]
  coverage: { firstLead: string; lastLead: string }
}

const CLOSED = /closed/i
/** Every deal in base.deals came from a lead; kept as one place to change the rule */
const counts = (_d: Deal) => true
const isWon = (d: Deal) => /closed won/i.test(d.stage)
const STAGE_ORDER = ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Stalled', 'Closed Won', 'Closed Lost']

function totals(base: Base, start: string, end: string): Record<Channel, ChannelTotals> {
  const out = {} as Record<Channel, ChannelTotals>
  const inRange = (d: string) => d >= start && d <= end
  const leadCounts = [0, 0, 0]
  for (const [date, c] of Object.entries(base.daily)) if (inRange(date)) c.forEach((n, i) => (leadCounts[i] += n))
  ;(['Inbound', 'Outbound', 'Other'] as Channel[]).forEach((ch, i) => {
    const created = base.deals.filter((d) => d.channel === ch && counts(d) && inRange(d.leadDate))
    const won = created.filter(isWon)
    const leads = leadCounts[i]
    const fromForms = ch === 'Inbound' ? base.inbound.filter((l) => l.form && inRange(l.date)).length : 0
    out[ch] = {
      leads, fromForms, deals: created.length, dealValue: created.reduce((n, d) => n + d.amount, 0),
      won: won.length, wonValue: won.reduce((n, d) => n + d.amount, 0), convRate: leads ? created.length / leads : 0,
    }
  })
  return out
}

/** Inbound leads and their deals grouped by market, or by website form (leads from a form only) */
function breakdown(base: Base, start: string, end: string, key: 'form' | 'market'): BreakdownRow[] {
  const rows = new Map<string, BreakdownRow>()
  const row = (name: string) => rows.get(name) || rows.set(name, { name, leads: 0, deals: 0, dealValue: 0, won: 0, wonValue: 0 }).get(name)!
  for (const l of base.inbound) if (l.date >= start && l.date <= end && (key === 'market' || l.form)) row(l[key]).leads++
  for (const d of base.deals) {
    if (d.channel !== 'Inbound' || !counts(d) || d.leadDate < start || d.leadDate > end) continue
    if (key === 'form' && !d.form) continue
    const r = row(d[key] || 'Unknown')
    r.deals++
    r.dealValue += d.amount
    if (isWon(d)) {
      r.won++
      r.wonValue += d.amount
    }
  }
  return [...rows.values()].sort((a, b) => b.dealValue - a.dealValue || b.leads - a.leads)
}

async function build(range: RangeKey): Promise<LeadsDashboard> {
  const p = periods(range)
  const base = await getBase()
  const inRange = (d: string) => d >= p.start && d <= p.end

  const open = { Inbound: { deals: 0, value: 0 }, Outbound: { deals: 0, value: 0 }, Other: { deals: 0, value: 0 } }
  for (const d of base.deals) if (counts(d) && !CLOSED.test(d.stage)) { open[d.channel].deals++; open[d.channel].value += d.amount }

  const stageMap = new Map<string, StageRow>()
  for (const d of base.deals) {
    if (!counts(d) || !inRange(d.leadDate) || d.channel === 'Other') continue
    const s = stageMap.get(d.stage) || stageMap.set(d.stage, { stage: d.stage, inbound: 0, inboundValue: 0, outbound: 0, outboundValue: 0 }).get(d.stage)!
    if (d.channel === 'Inbound') { s.inbound++; s.inboundValue += d.amount } else { s.outbound++; s.outboundValue += d.amount }
  }
  const stageRank = (s: string) => (STAGE_ORDER.indexOf(s) + 1 || 99)
  const stages = [...stageMap.values()].sort((a, b) => stageRank(a.stage) - stageRank(b.stage))

  // Last 12 calendar months, newest first
  const months: MonthRow[] = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const m = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1)).toISOString().slice(0, 7)
    const row: MonthRow = { month: m, inLeads: 0, inDeals: 0, inValue: 0, outLeads: 0, outDeals: 0, outValue: 0 }
    for (const [date, c] of Object.entries(base.daily)) if (date.startsWith(m)) { row.inLeads += c[0]; row.outLeads += c[1] }
    for (const d of base.deals) {
      if (!counts(d) || !d.leadDate.startsWith(m)) continue
      if (d.channel === 'Inbound') { row.inDeals++; row.inValue += d.amount } else if (d.channel === 'Outbound') { row.outDeals++; row.outValue += d.amount }
    }
    months.push(row)
  }

  const leadDates = Object.keys(base.daily).sort()
  return {
    generatedAt: new Date().toISOString(),
    current: totals(base, p.start, p.end),
    previous: totals(base, p.prevStart, p.prevEnd),
    openPipeline: open,
    stages,
    byForm: breakdown(base, p.start, p.end, 'form'),
    byMarket: breakdown(base, p.start, p.end, 'market'),
    months,
    deals: base.deals.filter((d) => d.channel !== 'Other' && counts(d) && inRange(d.leadDate)).sort((a, b) => b.amount - a.amount),
    coverage: { firstLead: leadDates[0] || '', lastLead: leadDates[leadDates.length - 1] || '' },
  }
}

// Bump when the calculation changes so cached results are rebuilt
const CACHE_VERSION = 'l4'

export const getLeadsDashboard = (range: RangeKey) =>
  unstable_cache(() => build(range), ['internal-insights-leads', CACHE_VERSION, range], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })()
