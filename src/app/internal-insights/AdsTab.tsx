'use client'

// Ads tab: Google Ads campaigns from Google Analytics (linked account), with the website leads they brought.
import type { AdsDashboard } from '@/lib/insights/ads'
import type { LeadSource } from '@/lib/insights/data'
import { Delta, Kpi, TH, THR, nf, pct } from './ui'
import LeadCards from './LeadCards'

const fmtMoney = (currency: string, n: number, decimals = 0) => `${currency} ${n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
const ratio = (a: number, b: number) => (b ? a / b : 0)

export default function AdsTab({ data, websiteLeads }: { data: AdsDashboard; websiteLeads: LeadSource[] | null }) {
  const c = data.current
  const money = (n: number, decimals = 0) => fmtMoney(data.currency, n, decimals)
  const p = data.previous
  // Leads from paid-ad visits only, as on the Location pages tab
  const paidLeads = (websiteLeads || []).filter((s) => s.paid > 0).map((s) => ({ ...s, leads: s.paid }))

  return (
    <>
      {data.accounts.length > 0 && <p className="mb-4 text-sm text-gray-500">Google Ads account: <b className="text-gray-700">{data.accounts.join(', ')}</b> · amounts in {data.currency}</p>}

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8" aria-label="Google Ads headline numbers">
        <Kpi label="Ad spend" value={money(c.cost)} cur={c.cost} prev={p.cost} lowerIsBetter note="as seen by Google Analytics"
          info="Google Ads cost as reported by Google Analytics. It runs lower than the Google Ads bill: it leaves out tax and can miss part of Performance Max spend. Use Google Ads billing for exact spend." />
        <Kpi label="Clicks" value={nf(c.clicks)} cur={c.clicks} prev={p.clicks} note={`${pct(ratio(c.clicks, c.impressions), 2)} click rate`} info="Ad clicks, and clicks ÷ impressions." />
        <Kpi label="Impressions" value={nf(c.impressions)} cur={c.impressions} prev={p.impressions} info="How many times the ads were shown." />
        <Kpi label="Cost per click" value={money(ratio(c.cost, c.clicks), 2)} cur={ratio(c.cost, c.clicks)} prev={ratio(p.cost, p.clicks)} lowerIsBetter info="Ad spend ÷ clicks." />
        <Kpi label="Website visits from ads" value={nf(c.sessions)} cur={c.sessions} prev={p.sessions} note={`${pct(ratio(c.engaged, c.sessions), 0)} engaged`} info="Visits to movingwalls.com from Google Ads, and the share that were engaged (stayed 10+ seconds, viewed 2+ pages or converted)." />
        <Kpi label="Leads from ads" value={nf(c.leads)} cur={c.leads} prev={p.leads} note={`${pct(ratio(c.leads, c.sessions), 2)} of visits`} info="Website form fills in visits that came from Google Ads." />
        <Kpi label="Cost per lead" value={c.leads ? money(c.cost / c.leads) : '–'} cur={ratio(c.cost, c.leads)} prev={ratio(p.cost, p.leads)} lowerIsBetter info="Ad spend ÷ leads from ads." />
        <Kpi label="Campaigns running" value={nf(data.campaigns.filter((x) => x.cost > 0).length)} cur={0} prev={0} hideDelta note={`${data.campaigns.length} with activity`} info="Campaigns with ad spend in this period." />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#062068] mb-1">Campaigns</h2>
        <p className="text-sm text-gray-500 mb-3">Each campaign this period, biggest spend first, with the change from the previous period.</p>
        {data.campaigns.length === 0 ? (
          <p className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-500">No Google Ads activity in this period.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th scope="col" className={TH}>Campaign</th>
                  <th scope="col" className={THR}>Spend</th>
                  <th scope="col" className={THR}>Clicks</th>
                  <th scope="col" className={THR}>Impressions</th>
                  <th scope="col" className={THR}>Click rate</th>
                  <th scope="col" className={THR}>Cost / click</th>
                  <th scope="col" className={THR}>Visits</th>
                  <th scope="col" className={THR}>Leads</th>
                  <th scope="col" className={THR}>Cost / lead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.campaigns.map((x) => (
                  <tr key={x.name} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5 font-semibold text-gray-900 min-w-[200px]">{x.name}</td>
                    <td className="px-3 py-2.5 text-right whitespace-nowrap">{x.cost ? money(x.cost) : '–'}<div><Delta cur={x.cost} prev={x.prev.cost} lowerIsBetter /></div></td>
                    <td className="px-3 py-2.5 text-right">{nf(x.clicks)}</td>
                    <td className="px-3 py-2.5 text-right">{nf(x.impressions)}</td>
                    <td className="px-3 py-2.5 text-right">{x.impressions ? pct(x.clicks / x.impressions, 2) : '–'}</td>
                    <td className="px-3 py-2.5 text-right whitespace-nowrap">{x.clicks ? money(x.cost / x.clicks, 2) : '–'}</td>
                    <td className="px-3 py-2.5 text-right">{nf(x.sessions)}</td>
                    <td className="px-3 py-2.5 text-right font-semibold">{x.leads || '–'}<div><Delta cur={x.leads} prev={x.prev.leads} /></div></td>
                    <td className="px-3 py-2.5 text-right whitespace-nowrap">{x.leads && x.cost ? money(x.cost / x.leads) : '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {websiteLeads && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-[#062068] mb-1">Leads from paid ads by market and city</h2>
          <p className="text-sm text-gray-500 mb-3">Website form fills from paid-ad visits, credited to the page they were sent from, as on the Location pages tab.</p>
          <LeadCards sources={paidLeads} />
        </section>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-2">How the numbers work</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
          <li><strong>Source:</strong> Google Analytics, which is linked to the Google Ads account. Amounts are in {data.currency}.</li>
          <li><strong>Ad spend is lower than the Google Ads bill.</strong> Google Analytics leaves out tax and can miss part of Performance Max spend (e.g. F1-PMAX). For exact spend use Google Ads billing; clicks, visits and leads are fine for comparing campaigns and periods.</li>
          <li><strong>Leads from ads</strong> = website form fills in visits that came from a Google Ads campaign. The market and city cards also count other paid channels (e.g. paid social), as on the Location pages tab.</li>
          <li>Deals from ad leads aren&apos;t shown yet: the CRM doesn&apos;t record which campaign a lead came from.</li>
          <li>Refreshes every 6 hours · last refreshed {new Date(data.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.</li>
        </ul>
      </section>
    </>
  )
}
