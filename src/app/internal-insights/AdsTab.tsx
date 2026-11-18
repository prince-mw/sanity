'use client'

// Ads tab: Google Ads campaigns (Google Ads data via the daily sheet, or Google Analytics as a fallback),
// with the website visits and leads they brought.
import type { AdsBreakdown, AdsDashboard } from '@/lib/insights/ads'
import type { LeadSource } from '@/lib/insights/data'
import { Delta, Kpi, TH, THR, nf, pct } from './ui'
import LeadCards from './LeadCards'

const fmtMoney = (currency: string, n: number, decimals = 0) => `${currency} ${n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
const ratio = (a: number, b: number) => (b ? a / b : 0)
const fmtConv = (n: number) => (Number.isInteger(n) ? nf(n) : n.toFixed(1))
const STATUS_STYLE: Record<string, string> = { ENABLED: 'bg-emerald-50 text-emerald-700', PAUSED: 'bg-gray-100 text-gray-500', REMOVED: 'bg-gray-100 text-gray-400' }
const STATUS_LABEL: Record<string, string> = { ENABLED: 'Running', PAUSED: 'Paused', REMOVED: 'Removed' }

export default function AdsTab({ data, websiteLeads }: { data: AdsDashboard; websiteLeads: LeadSource[] | null }) {
  const c = data.current
  const p = data.previous
  const money = (n: number, decimals = 0) => fmtMoney(data.currency, n, decimals)
  const ads = data.source === 'google-ads'
  // Leads from paid-ad visits only, as on the Location pages tab
  const paidLeads = (websiteLeads || []).filter((s) => s.paid > 0).map((s) => ({ ...s, leads: s.paid }))
  const updated = data.adsUpdatedAt ? new Date(data.adsUpdatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : null

  return (
    <>
      <p className="mb-4 text-sm text-gray-500">
        {data.accounts.length > 0 && <>Google Ads account: <b className="text-gray-700">{data.accounts.join(', ')}</b> · </>}
        amounts in {data.currency} · {ads ? <>numbers from <b className="text-gray-700">Google Ads</b>{updated && <> (updated {updated})</>}</> : <>numbers from <b className="text-gray-700">Google Analytics</b></>}
      </p>
      {data.sourceNote && <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">⚠ {data.sourceNote}</p>}

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8" aria-label="Google Ads headline numbers">
        <Kpi label="Ad spend" value={money(c.cost)} cur={c.cost} prev={p.cost} lowerIsBetter
          note={ads ? (data.ga4Cost ? `Google Analytics showed ${money(data.ga4Cost)}` : undefined) : 'as seen by Google Analytics'}
          info={ads ? 'Spend as reported by Google Ads, before tax. Google Analytics shows less because it misses part of the spend.' : 'Google Ads cost as reported by Google Analytics. It runs lower than the Google Ads bill.'} />
        <Kpi label="Clicks" value={nf(c.clicks)} cur={c.clicks} prev={p.clicks} note={`${pct(ratio(c.clicks, c.impressions), 2)} click rate`} info="Ad clicks, and clicks ÷ impressions." />
        <Kpi label="Impressions" value={nf(c.impressions)} cur={c.impressions} prev={p.impressions} info="How many times the ads were shown." />
        <Kpi label="Cost per click" value={money(ratio(c.cost, c.clicks), 2)} cur={ratio(c.cost, c.clicks)} prev={ratio(p.cost, p.clicks)} lowerIsBetter info="Ad spend ÷ clicks." />
        {ads ? (
          <>
            <Kpi label="Conversions" value={fmtConv(c.conversions)} cur={c.conversions} prev={p.conversions} note={`${pct(ratio(c.conversions, c.clicks), 2)} of clicks`} info="Form submissions counted by Google Ads (its conversion tracking), by the day of the click." />
            <Kpi label="Cost per conversion" value={c.conversions ? money(c.cost / c.conversions) : '–'} cur={ratio(c.cost, c.conversions)} prev={ratio(p.cost, p.conversions)} lowerIsBetter info="Ad spend ÷ Google Ads conversions." />
          </>
        ) : null}
        <Kpi label="Website visits from ads" value={nf(c.sessions)} cur={c.sessions} prev={p.sessions} note={`${pct(ratio(c.engaged, c.sessions), 0)} engaged`} info="Visits to movingwalls.com from Google Ads (Google Analytics), and the share that were engaged." />
        <Kpi label="Leads from ads" value={nf(c.leads)} cur={c.leads} prev={p.leads} note={ads ? 'per Google Analytics' : `${pct(ratio(c.leads, c.sessions), 2)} of visits`} info="Website form fills in visits that came from Google Ads (Google Analytics). Counts differently from Google Ads conversions, so the two numbers can differ." />
        {!ads && <Kpi label="Cost per lead" value={c.leads ? money(c.cost / c.leads) : '–'} cur={ratio(c.cost, c.leads)} prev={ratio(p.cost, p.leads)} lowerIsBetter info="Ad spend ÷ leads from ads." />}
        {!ads && <Kpi label="Campaigns running" value={nf(data.campaigns.filter((x) => x.cost > 0).length)} cur={0} prev={0} hideDelta note={`${data.campaigns.length} with activity`} info="Campaigns with ad spend in this period." />}
      </section>

      {data.alerts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-[#062068] mb-3">Worth a look</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {data.alerts.map((a) => (
              <li key={a.title} className="flex gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                <span><b className="text-gray-900">{a.title}</b> <span className="text-gray-600">{a.detail}</span></span>
              </li>
            ))}
          </ul>
        </section>
      )}

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
                  <th scope="col" className={THR}>Click rate</th>
                  <th scope="col" className={THR}>Cost / click</th>
                  {ads && <th scope="col" className={THR}>Conversions</th>}
                  {ads && <th scope="col" className={THR}>Cost / conv.</th>}
                  {ads && <th scope="col" className={THR} title="Share of searches the ads showed on, and the share missed because the budget ran out">Shown on · lost to budget</th>}
                  <th scope="col" className={THR}>Visits</th>
                  <th scope="col" className={THR}>Leads (GA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.campaigns.map((x) => (
                  <tr key={x.name} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5 min-w-[220px]">
                      <span className="font-semibold text-gray-900">{x.name}</span>
                      {x.status && <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[x.status] || STATUS_STYLE.PAUSED}`}>{STATUS_LABEL[x.status] || x.status}</span>}
                      {x.status === 'ENABLED' && x.dailyBudget ? <div className="text-xs text-gray-400">Budget {money(x.dailyBudget)} a day</div> : null}
                    </td>
                    <td className="px-3 py-2.5 text-right whitespace-nowrap">{x.cost ? money(x.cost) : '–'}<div><Delta cur={x.cost} prev={x.prev.cost} lowerIsBetter /></div></td>
                    <td className="px-3 py-2.5 text-right">{nf(x.clicks)}</td>
                    <td className="px-3 py-2.5 text-right">{x.impressions ? pct(x.clicks / x.impressions, 2) : '–'}</td>
                    <td className="px-3 py-2.5 text-right whitespace-nowrap">{x.clicks ? money(x.cost / x.clicks, 2) : '–'}</td>
                    {ads && <td className="px-3 py-2.5 text-right font-semibold">{x.conversions ? fmtConv(x.conversions) : '–'}<div><Delta cur={x.conversions} prev={x.prev.conversions} /></div></td>}
                    {ads && <td className="px-3 py-2.5 text-right whitespace-nowrap">{x.conversions && x.cost ? money(x.cost / x.conversions) : '–'}</td>}
                    {ads && (
                      <td className="px-3 py-2.5 text-right whitespace-nowrap">
                        {x.impressionShare ? pct(x.impressionShare, 0) : '–'}
                        {x.budgetLost ? <span className={x.budgetLost >= 0.2 ? 'text-amber-700 font-semibold' : 'text-gray-400'}> · {pct(x.budgetLost, 0)}</span> : null}
                      </td>
                    )}
                    <td className="px-3 py-2.5 text-right">{nf(x.sessions)}</td>
                    <td className="px-3 py-2.5 text-right">{x.leads || '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {ads && (data.countries.length > 0 || data.devices.length > 0) && (
        <section className="grid lg:grid-cols-2 gap-4 mb-8 items-start">
          <Breakdown title="By country" note="Where the people who saw and clicked the ads were." rows={data.countries} money={money} />
          <Breakdown title="By device" note="Phone, computer or tablet." rows={data.devices} money={money} />
        </section>
      )}

      {ads && (data.conversionTypes.length > 0 || data.searchTerms.length > 0) && (
        <section className="grid lg:grid-cols-3 gap-4 mb-8 items-start">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-bold text-[#062068] mb-1">Conversions by type</h2>
            <p className="text-sm text-gray-500 mb-3">Which form or goal Google Ads counted.</p>
            {data.conversionTypes.length === 0 ? <p className="text-sm text-gray-500">No conversions in this period.</p> : (
              <ul className="divide-y divide-gray-100">
                {data.conversionTypes.map((t) => (
                  <li key={t.name} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                    <span className="text-gray-700">{t.name}</span>
                    <span className="whitespace-nowrap"><b className="text-gray-900">{fmtConv(t.conversions)}</b> <Delta cur={t.conversions} prev={t.prev} /></span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-bold text-[#062068] mb-1">Top search terms</h2>
            <p className="text-sm text-gray-500 mb-3">What people typed into Google before clicking an ad{data.searchTermMonths.length ? `, for ${data.searchTermMonths.map((m) => new Date(`${m}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })).join(', ')} (whole months)` : ''}.</p>
            {data.searchTerms.length === 0 ? <p className="text-sm text-gray-500">No search terms with 2+ clicks in these months.</p> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase tracking-wider text-gray-500">
                    <tr><th scope="col" className={TH}>Search term</th><th scope="col" className={TH}>Campaign</th><th scope="col" className={THR}>Clicks</th><th scope="col" className={THR}>Spend</th><th scope="col" className={THR}>Conv.</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.searchTerms.map((t) => (
                      <tr key={`${t.campaign}|${t.term}`}>
                        <td className="px-3 py-2 font-medium text-gray-900">{t.term}</td>
                        <td className="px-3 py-2 text-xs text-gray-500">{t.campaign}</td>
                        <td className="px-3 py-2 text-right">{nf(t.clicks)}</td>
                        <td className="px-3 py-2 text-right whitespace-nowrap">{money(t.cost)}</td>
                        <td className="px-3 py-2 text-right">{t.conversions ? fmtConv(t.conversions) : '–'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

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
          {ads ? (
            <>
              <li><strong>Spend, clicks, impressions, conversions, countries, devices and search terms</strong> come from Google Ads itself, copied once a day into a private Google Sheet by a read-only Google Ads script. Amounts are in {data.currency}, before tax.</li>
              <li><strong>Conversions</strong> are counted by Google Ads; <strong>leads (GA)</strong> are website form fills counted by Google Analytics. They track differently, so the two numbers rarely match exactly.</li>
              <li><strong>Shown on · lost to budget</strong>: the share of matching searches the ads appeared on, and the share they missed because the daily budget ran out (search campaigns only).</li>
              <li><strong>Search terms</strong> are reported by whole calendar month, so they can cover a little more than the selected dates.</li>
            </>
          ) : (
            <>
              <li><strong>Source:</strong> Google Analytics, which is linked to the Google Ads account. Amounts are in {data.currency}.</li>
              <li><strong>Ad spend is lower than the Google Ads bill.</strong> Google Analytics misses part of the spend (e.g. Performance Max).</li>
            </>
          )}
          <li>The market and city lead cards also count other paid channels (e.g. paid social), as on the Location pages tab.</li>
          <li>Deals from ad leads aren&apos;t shown yet: the CRM doesn&apos;t record which campaign a lead came from.</li>
          <li>Refreshes every 6 hours · last refreshed {new Date(data.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.</li>
        </ul>
      </section>
    </>
  )
}

function Breakdown({ title, note, rows, money }: { title: string; note: string; rows: AdsBreakdown[]; money: (n: number) => string }) {
  const total = rows.reduce((n, r) => n + r.cost, 0)
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-bold text-[#062068] mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">{note}</p>
      {rows.length === 0 ? <p className="text-sm text-gray-500">No data in this period.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-gray-500">
              <tr><th scope="col" className={TH}>{title.replace('By ', '')}</th><th scope="col" className={THR}>Spend</th><th scope="col" className={THR}>Clicks</th><th scope="col" className={THR}>Conv.</th><th scope="col" className={THR}>Cost / conv.</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r) => (
                <tr key={r.name}>
                  <td className="px-3 py-2">
                    <span className="font-medium text-gray-900">{r.name}</span>
                    <div className="mt-1 h-1.5 rounded-full bg-gray-100" aria-hidden="true"><div className="h-1.5 rounded-full bg-sky-400" style={{ width: `${total ? (r.cost / total) * 100 : 0}%` }} /></div>
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{money(r.cost)}<div><Delta cur={r.cost} prev={r.prevCost} lowerIsBetter /></div></td>
                  <td className="px-3 py-2 text-right">{nf(r.clicks)}</td>
                  <td className={`px-3 py-2 text-right ${r.cost >= 100 && !r.conversions ? 'font-semibold text-amber-700' : ''}`}>{r.conversions ? fmtConv(r.conversions) : '0'}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{r.conversions ? money(r.cost / r.conversions) : '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
