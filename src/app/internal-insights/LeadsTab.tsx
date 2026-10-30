'use client'

// Leads & Deals tab: CRM leads and the deals they became, from the marketing team's Zoho Analytics report.
import type { BreakdownRow, Channel, LeadsDashboard } from '@/lib/insights/leads'
import type { LeadSource } from '@/lib/insights/data'
import { Delta, Details, Kpi, TH, THR, fmtDate, nf, pct } from './ui'
import LeadCards from './LeadCards'

/** $1.89M, $442k, $9,515 */
const usd = (n: number) => (n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : n >= 1e5 ? `$${Math.round(n / 1000)}k` : `$${nf(n)}`)

const STAGE_STYLE: Record<string, string> = {
  'Closed Won': 'bg-emerald-100 text-emerald-800',
  'Closed Lost': 'bg-gray-100 text-gray-600',
  Stalled: 'bg-amber-100 text-amber-800',
}
const stagePill = (s: string) => <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${STAGE_STYLE[s] || 'bg-sky-100 text-sky-800'}`}>{s}</span>

const CHANNEL_INFO: Record<Exclude<Channel, 'Other'>, { title: string; sub: string }> = {
  Inbound: { title: 'Inbound (marketing)', sub: 'CRM leads with source Website / Webform, Social Media or downloads. Only some are website form fills; the rest are event and list uploads, info@movingwalls.com enquiries and other leads filed under Website.' },
  Outbound: { title: 'Outbound (sales prospecting)', sub: 'Leads from prospecting tools and cold calls' },
}

function ChannelCards({ data, channel }: { data: LeadsDashboard; channel: Exclude<Channel, 'Other'> }) {
  const c = data.current[channel]
  const p = data.previous[channel]
  const open = data.openPipeline[channel]
  return (
    <section className="mb-8" aria-label={CHANNEL_INFO[channel].title}>
      <h2 className="text-lg font-bold text-[#062068]">{CHANNEL_INFO[channel].title}</h2>
      <p className="text-sm text-gray-500 mb-3">{CHANNEL_INFO[channel].sub}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <Kpi label="Leads" value={nf(c.leads)} cur={c.leads} prev={p.leads} note={channel === 'Inbound' ? `${nf(c.fromForms)} from website forms` : undefined} info="New leads created in the CRM in this period. All the other numbers here are about these leads." />
        <Kpi label="Deals created" value={nf(c.deals)} cur={c.deals} prev={p.deals} info="Deals created from this period's leads (whenever the deal was created), as in the Zoho Lead to Pipeline report." />
        <Kpi label="Lead → deal rate" value={pct(c.convRate)} cur={c.convRate} prev={p.convRate} points info="Share of this period's leads that became a deal (deals ÷ leads)." />
        <Kpi label="Deal value" value={usd(c.dealValue)} cur={c.dealValue} prev={p.dealValue} info="Total amount of the deals from this period's leads: the pipeline these leads created." />
        <Kpi label="Closed won" value={usd(c.wonValue)} cur={c.wonValue} prev={p.wonValue} note={`${nf(c.won)} deal${c.won === 1 ? '' : 's'}`} info="Amount of the deals from this period's leads that are now Closed Won." />
        <Kpi label="Open pipeline now" value={usd(open.value)} cur={0} prev={0} hideDelta note={`${nf(open.deals)} open deals`} info="All deals from these leads that are not yet closed (won or lost), whatever the date. Doesn't change with the date buttons." />
      </div>
    </section>
  )
}

/** Top rows, with the rest added up in one "N more" row */
function BreakdownTable({ rows: all, label, top = 12 }: { rows: BreakdownRow[]; label: string; top?: number }) {
  if (!all.length) return <p className="text-sm text-gray-500">No inbound leads or deals in this period.</p>
  const rest = all.slice(top)
  const rows = rest.length < 2 ? all : [
    ...all.slice(0, top),
    rest.reduce((t, r) => ({ ...t, leads: t.leads + r.leads, deals: t.deals + r.deals, dealValue: t.dealValue + r.dealValue, won: t.won + r.won, wonValue: t.wonValue + r.wonValue }), { name: `${rest.length} more`, leads: 0, deals: 0, dealValue: 0, won: 0, wonValue: 0 }),
  ]
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
          <tr><th scope="col" className={TH}>{label}</th><th scope="col" className={THR}>Leads</th><th scope="col" className={THR}>Deals</th><th scope="col" className={THR}>Lead → deal</th><th scope="col" className={THR}>Deal value</th><th scope="col" className={THR}>Closed won</th></tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r) => (
            <tr key={r.name} className="hover:bg-gray-50">
              <td className="px-3 py-2 font-semibold text-gray-900">{r.name}</td>
              <td className="px-3 py-2 text-right">{nf(r.leads)}</td>
              <td className="px-3 py-2 text-right">{r.deals || '–'}</td>
              <td className="px-3 py-2 text-right">{r.leads && r.deals ? pct(r.deals / r.leads) : '–'}</td>
              <td className="px-3 py-2 text-right font-semibold">{r.dealValue ? usd(r.dealValue) : '–'}</td>
              <td className="px-3 py-2 text-right">{r.wonValue ? `${usd(r.wonValue)} (${r.won})` : '–'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function LeadsTab({ data, websiteLeads }: { data: LeadsDashboard; websiteLeads: LeadSource[] | null }) {
  const { current: c, previous: p } = data
  const other = c.Other
  const monthLabel = (m: string) => new Date(`${m}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })

  return (
    <>
      <ChannelCards data={data} channel="Inbound" />
      <ChannelCards data={data} channel="Outbound" />
      {(other.leads > 0 || other.deals > 0) && (
        <p className="-mt-4 mb-8 text-sm text-gray-500">
          Plus <b className="text-gray-700">{nf(other.leads)}</b> leads from other sources (events, referrals, NRF, no source set) <Delta cur={other.leads} prev={p.Other.leads} />
          {other.deals > 0 && <> · {nf(other.deals)} deals worth {usd(other.dealValue)}</>}. These are in neither group, as in the Zoho report.
        </p>
      )}

      {/* Deals by stage */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#062068] mb-1">Where this period&apos;s deals are now</h2>
        <p className="text-sm text-gray-500 mb-3">Deals from this period&apos;s leads, by their current stage.</p>
        {data.stages.length === 0 ? (
          <p className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-500">No deals created in this period.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr><th scope="col" className={TH}>Stage</th><th scope="col" className={THR}>Inbound deals</th><th scope="col" className={THR}>Inbound value</th><th scope="col" className={THR}>Outbound deals</th><th scope="col" className={THR}>Outbound value</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.stages.map((s) => (
                  <tr key={s.stage}>
                    <td className="px-3 py-2">{stagePill(s.stage)}</td>
                    <td className="px-3 py-2 text-right">{s.inbound || '–'}</td>
                    <td className="px-3 py-2 text-right font-semibold">{s.inboundValue ? usd(s.inboundValue) : '–'}</td>
                    <td className="px-3 py-2 text-right">{s.outbound || '–'}</td>
                    <td className="px-3 py-2 text-right font-semibold">{s.outboundValue ? usd(s.outboundValue) : '–'}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-3 py-2">Total</td>
                  <td className="px-3 py-2 text-right">{nf(c.Inbound.deals)}</td>
                  <td className="px-3 py-2 text-right">{usd(c.Inbound.dealValue)}</td>
                  <td className="px-3 py-2 text-right">{nf(c.Outbound.deals)}</td>
                  <td className="px-3 py-2 text-right">{usd(c.Outbound.dealValue)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Website leads by page, from GA4 (the CRM doesn't have the page) */}
      {websiteLeads && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-[#062068] mb-1">Website leads by market and city</h2>
          <p className="text-sm text-gray-500 mb-3">Every website form fill in this period, credited to the page it was sent from (the page name on the form, &ldquo;referrername&rdquo;), from Google Analytics. &ldquo;Paid&rdquo; = the visit came from Google Ads. Leads only: deals can&apos;t be split by city page until the page name is saved on the CRM lead.</p>
          <LeadCards sources={websiteLeads} />
        </section>
      )}

      {/* Inbound breakdowns */}
      <section className="grid lg:grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-lg font-bold text-[#062068] mb-1">Inbound by website form</h2>
          <p className="text-sm text-gray-500 mb-3">CRM leads that came through a website form, by form, with their deals. City pages use their country&apos;s form, so cities are in the cards above.</p>
          <div className="rounded-2xl border border-gray-200 bg-white p-3"><BreakdownTable rows={data.byForm} label="Form" top={Infinity} /></div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#062068] mb-1">Inbound by market</h2>
          <p className="text-sm text-gray-500 mb-3">The lead&apos;s operating country in the CRM.</p>
          <div className="rounded-2xl border border-gray-200 bg-white p-3"><BreakdownTable rows={data.byMarket} label="Market" /></div>
        </div>
      </section>

      <h2 className="text-lg font-bold text-[#062068] mb-3">Details</h2>
      <Details title="Deals in this period" summary={`${data.deals.length} deals from this period's leads, largest first`}>
        {data.deals.length === 0 ? (
          <p className="text-sm text-gray-500">No deals in this period.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 max-h-[70vh]">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 sticky top-0">
                <tr><th scope="col" className={TH}>Deal</th><th scope="col" className={TH}>Type</th><th scope="col" className={TH}>Stage</th><th scope="col" className={THR}>Amount</th><th scope="col" className={TH}>Lead date</th><th scope="col" className={TH}>Owner</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 align-top">
                {data.deals.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 min-w-[220px]">
                      <span className="font-semibold text-gray-900">{d.name}</span>
                      {d.account && d.account !== d.name && <div className="text-xs text-gray-400">{d.account}</div>}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {d.channel}
                      {d.form && <div className="text-xs text-gray-400">{d.form}{d.market ? ` · ${d.market}` : ''}</div>}
                    </td>
                    <td className="px-3 py-2">{stagePill(d.stage)}</td>
                    <td className="px-3 py-2 text-right font-semibold whitespace-nowrap">{d.amount ? usd(d.amount) : '–'}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-600">{d.leadDate ? fmtDate(d.leadDate) : '–'}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-600">{d.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Details>
      <Details title="Last 12 months" summary="Leads per month and the deals and deal value from them, inbound vs outbound">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className={TH}>Month</th>
                <th scope="col" className={THR}>Inbound leads</th><th scope="col" className={THR}>Inbound deals</th><th scope="col" className={THR}>Inbound value</th>
                <th scope="col" className={THR}>Outbound leads</th><th scope="col" className={THR}>Outbound deals</th><th scope="col" className={THR}>Outbound value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.months.map((m) => (
                <tr key={m.month}>
                  <td className="px-3 py-2 whitespace-nowrap font-semibold text-gray-900">{monthLabel(m.month)}</td>
                  <td className="px-3 py-2 text-right">{nf(m.inLeads)}</td>
                  <td className="px-3 py-2 text-right">{m.inDeals || '–'}</td>
                  <td className="px-3 py-2 text-right font-semibold">{m.inValue ? usd(m.inValue) : '–'}</td>
                  <td className="px-3 py-2 text-right">{nf(m.outLeads)}</td>
                  <td className="px-3 py-2 text-right">{m.outDeals || '–'}</td>
                  <td className="px-3 py-2 text-right font-semibold">{m.outValue ? usd(m.outValue) : '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Details>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-2">How the numbers work</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
          <li><strong>Source:</strong> the Zoho CRM leads and deals synced into the marketing team&apos;s Zoho Analytics workspace, the same data as the &ldquo;06. Lead to Pipeline&rdquo; tab of &ldquo;Marketing Command Center - MW&rdquo;.</li>
          <li><strong>Inbound</strong> = lead source Website / Webform, Social Media, Content Download or Web Download. <strong>Outbound</strong> = Prospecting Tools or Cold Call. Other sources (events, referrals, no source) are shown separately, as in the Zoho report.</li>
          <li><strong>Everything is dated by the lead&apos;s created date</strong>, as in the Zoho &ldquo;06. Lead to Pipeline&rdquo; tab: a period&apos;s deals, deal value and closed won are the deals that came from that period&apos;s leads, whenever the deal was created or closed. So recent periods grow as their leads turn into deals.</li>
          <li><strong>Deals</strong> are all deals converted from a lead, each with its lead&apos;s type; amounts are in US dollars. A deal with no amount still counts as a deal (the Zoho report&apos;s inbound card skips these, so it can show one or two fewer).</li>
          <li><strong>Inbound leads</strong> include more than website forms: the team also files event and list uploads, info@movingwalls.com enquiries and other leads under &ldquo;Website / Webform&rdquo;. &ldquo;From website forms&rdquo; counts only the leads whose CRM tag names a website form.</li>
          <li><strong>Leads by city page</strong> come from Google Analytics: each form carries the name of the page it was sent from. The CRM has the form but not the page, so deals and deal value can&apos;t be split by city yet. GA4 and the CRM can differ by a few leads (spam, tests, blocked tracking).</li>
          <li>Zoho Analytics syncs from Zoho CRM on its own schedule; this tab refreshes every 6 hours · last refreshed {new Date(data.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.</li>
        </ul>
      </section>
    </>
  )
}
