'use client'

// Pipeline & Targets tab: Zoho CRM deals closing this year against each region's yearly revenue target.
import type { PipelineDashboard, RegionRow } from '@/lib/insights/pipeline'
import { Details, Kpi, TH, THR, fmtDate, nf, pct, usd } from './ui'

const STATUS_STYLE: Record<RegionRow['status'], string> = {
  'On track': 'bg-emerald-100 text-emerald-800',
  'At risk': 'bg-amber-100 text-amber-800',
  Behind: 'bg-red-100 text-red-700',
  'No target': 'bg-gray-100 text-gray-600',
}
const share = (n: number, of: number) => (of ? pct(n / of, 0) : '–')
const statusPill = (s: RegionRow['status']) => <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${STATUS_STYLE[s]}`}>{s}</span>

/** Won (solid) and expected (light) against the full-width target; amber tick = revenue budget, grey tick = an even pace today */
function ProgressBar({ r, pace }: { r: RegionRow; pace: number }) {
  if (!r.target) return <span className="text-xs text-gray-400">No target</span>
  const w = (n: number) => `${Math.min(100, (n / r.target) * 100)}%`
  return (
    <div className="relative h-2.5 w-32 rounded-full bg-gray-100" title={`Won ${usd(r.won)} · expected ${usd(r.forecast)} · revenue budget ${usd(r.budget)} · target ${usd(r.target)}`}>
      <div className="absolute inset-y-0 left-0 rounded-full bg-sky-300" style={{ width: w(r.forecast) }} />
      <div className="absolute inset-y-0 left-0 rounded-full bg-[#062068]" style={{ width: w(r.won) }} />
      {r.budget > 0 && <div className="absolute -top-1 -bottom-1 w-0.5 bg-amber-500" style={{ left: w(r.budget) }} aria-hidden="true" />}
      <div className="absolute -top-1 -bottom-1 w-0.5 bg-gray-500" style={{ left: `${pace * 100}%` }} aria-hidden="true" />
    </div>
  )
}

export default function PipelineTab({ data }: { data: PipelineDashboard }) {
  const t = data.total
  const remaining = Math.max(0, t.target - t.won)
  const behind = data.regions.filter((r) => r.status === 'Behind' || r.status === 'At risk').sort((a, b) => b.target - b.forecast - (a.target - a.forecast))
  const hasWebsite = data.regions.some((r) => r.websiteLeads !== undefined)

  return (
    <>
      {/* Company totals */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-4" aria-label={`${data.year} totals`}>
        <Kpi label={`${data.year} target`} value={usd(t.target)} cur={0} prev={0} hideDelta note={`revenue budget ${usd(t.budget)}`} info="Yearly revenue target and revenue budget, from the Zoho Analytics table “Budget Region Summary 2026”. The target looks like the stretch goal and the budget the planned revenue (to be confirmed)." />
        <Kpi label="Won so far" value={usd(t.won)} cur={0} prev={0} hideDelta note={`${share(t.won, t.target)} of target · ${share(t.won, t.budget)} of budget · ${nf(t.wonDeals)} deals`} info="Deals closing this year that are Closed Won or in Billing." />
        <Kpi label="Expected by year end" value={usd(t.forecast)} cur={0} prev={0} hideDelta note={`${share(t.forecast, t.target)} of target · ${share(t.forecast, t.budget)} of budget`} info="Won so far plus every open deal’s amount × its win probability in the CRM." />
        <Kpi label="Open pipeline" value={usd(t.open)} cur={0} prev={0} hideDelta note={`${nf(t.openDeals)} deals · ${nf(t.openNoAmount)} with no amount`} info="Open deals closing this year (not won, lost or stalled), at full value." />
        <Kpi label="Pipeline coverage" value={remaining ? `${(t.open / remaining).toFixed(1)}×` : '–'} cur={0} prev={0} hideDelta note="open ÷ target still to win" info="How many times the open pipeline covers the target still to win. Around 3× is a common healthy level, as not every deal closes." />
      </section>
      <p className="mb-8 text-sm text-gray-500">
        <b className="text-gray-700">{pct(data.yearElapsed, 0)}</b> of {data.year} has passed. Stalled deals ({nf(t.stalledDeals)}, {usd(t.stalled)}) are not counted in the pipeline.
      </p>

      {/* By region */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#062068] mb-1">By region</h2>
        <p className="text-sm text-gray-500 mb-3">
          <span className="inline-flex items-center gap-1.5 mr-3"><span className="h-2 w-3 rounded-full bg-[#062068]" />Won</span>
          <span className="inline-flex items-center gap-1.5 mr-3"><span className="h-2 w-3 rounded-full bg-sky-300" />Expected</span>
          <span className="inline-flex items-center gap-1.5 mr-3"><span className="h-3 w-0.5 bg-amber-500" />Revenue budget</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-0.5 bg-gray-500" />Where an even pace would be today</span>
          <span className="block text-xs mt-0.5">The full bar is the target.</span>
        </p>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className={TH}>Region</th>
                <th scope="col" className={THR}>Target</th>
                <th scope="col" className={THR}>Revenue budget</th>
                <th scope="col" className={THR}>Won</th>
                <th scope="col" className={THR}>Expected</th>
                <th scope="col" className={TH}>Progress</th>
                <th scope="col" className={TH}>Status</th>
                <th scope="col" className={THR}>Open pipeline</th>
                <th scope="col" className={THR}>From marketing</th>
                {hasWebsite && <th scope="col" className={THR}>Location-page leads</th>}
                {hasWebsite && <th scope="col" className={THR}>Location visits</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.regions.map((r) => (
                <tr key={r.key} className="hover:bg-gray-50">
                  <td className="px-3 py-2.5 font-semibold text-gray-900 min-w-[180px]">{r.label}</td>
                  <td className="px-3 py-2.5 text-right">{r.target ? usd(r.target) : '–'}</td>
                  <td className="px-3 py-2.5 text-right text-gray-600">{r.budget ? usd(r.budget) : '–'}</td>
                  <td className="px-3 py-2.5 text-right font-semibold">{usd(r.won)}<div className="text-xs font-normal text-gray-400">{r.target ? pct(r.won / r.target, 0) : ''}</div></td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap">{usd(r.forecast)}<div className="text-xs text-gray-400">{r.target ? `${share(r.forecast, r.target)} target · ${share(r.forecast, r.budget)} budget` : ''}</div></td>
                  <td className="px-3 py-2.5"><ProgressBar r={r} pace={data.yearElapsed} /></td>
                  <td className="px-3 py-2.5">{statusPill(r.status)}</td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap">{usd(r.open)}<div className="text-xs text-gray-400">{nf(r.openDeals)} deals{r.openNoAmount ? ` · ${r.openNoAmount} no amount` : ''}</div></td>
                  <td className="px-3 py-2.5 text-right">{r.marketingPipeline ? usd(r.marketingPipeline) : '–'}<div className="text-xs text-gray-400">{r.won + r.open ? pct(r.marketingPipeline / (r.won + r.open), 0) : ''}</div></td>
                  {hasWebsite && <td className="px-3 py-2.5 text-right">{nf(r.websiteLeads || 0)}</td>}
                  {hasWebsite && <td className="px-3 py-2.5 text-right">{nf(r.locationVisits || 0)}</td>}
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-3 py-2.5">All regions</td>
                <td className="px-3 py-2.5 text-right">{usd(t.target)}</td>
                <td className="px-3 py-2.5 text-right">{usd(t.budget)}</td>
                <td className="px-3 py-2.5 text-right">{usd(t.won)}</td>
                <td className="px-3 py-2.5 text-right">{usd(t.forecast)}</td>
                <td className="px-3 py-2.5"><ProgressBar r={t} pace={data.yearElapsed} /></td>
                <td className="px-3 py-2.5">{statusPill(t.status)}</td>
                <td className="px-3 py-2.5 text-right">{usd(t.open)}</td>
                <td className="px-3 py-2.5 text-right">{usd(t.marketingPipeline)}</td>
                {hasWebsite && <td className="px-3 py-2.5 text-right">{nf(data.regions.reduce((n, r) => n + (r.websiteLeads || 0), 0))}</td>}
                {hasWebsite && <td className="px-3 py-2.5 text-right">{nf(data.regions.reduce((n, r) => n + (r.locationVisits || 0), 0))}</td>}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-500">On track = expected at least 90% of target · At risk = 60–90% · Behind = under 60%. &ldquo;From marketing&rdquo; = won and open deals that came from an inbound lead (website, social or a download), as on the Leads &amp; Deals tab. Location-page leads and visits are for {data.year} so far, from that region&apos;s country and city pages (homepage and contact-page leads aren&apos;t tied to a region).</p>
      </section>

      {/* Where marketing can help */}
      {behind.length > 0 && (
        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-bold text-[#062068] mb-1">Where marketing can help</h2>
          <p className="text-sm text-gray-500 mb-4">Regions expected to miss their target, biggest gap first, with their website activity this year.</p>
          <ul className="space-y-3">
            {behind.map((r) => {
              const leads = r.websiteLeads
              const tip = leads === undefined ? '' : leads < 10 ? 'Few leads from its pages: push its location pages, ads and email campaigns.' : 'Leads are coming in from its pages: check sales follows them up and turns them into deals.'
              return (
                <li key={r.key} className="flex gap-3 text-sm">
                  <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${r.status === 'Behind' ? 'bg-red-500' : 'bg-amber-500'}`} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-gray-900">{r.label}: expected {pct(r.forecast / r.target, 0)} of target, a gap of {usd(r.target - r.forecast)}</p>
                    <p className="text-gray-600">
                      {leads !== undefined && <>{nf(leads)} location-page leads and {nf(r.locationVisits || 0)} location-page visits this year. </>}
                      {nf(r.openDeals)} open deals worth {usd(r.open)}{r.openNoAmount ? `, ${r.openNoAmount} of them with no amount yet` : ''}. {tip}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <h2 className="text-lg font-bold text-[#062068] mb-3">Details</h2>
      <Details title="Biggest open deals" summary={`The ${data.topOpen.length} largest open deals closing in ${data.year}`}>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr><th scope="col" className={TH}>Deal</th><th scope="col" className={TH}>Region</th><th scope="col" className={TH}>Stage</th><th scope="col" className={THR}>Amount</th><th scope="col" className={THR}>Win chance</th><th scope="col" className={TH}>Closing</th><th scope="col" className={TH}>Owner</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.topOpen.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-semibold text-gray-900 min-w-[220px]">{d.name}{d.marketing && <span className="ml-1.5 rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800">Marketing</span>}</td>
                  <td className="px-3 py-2 text-gray-600">{d.regionLabel}<div className="text-xs text-gray-400">{d.country}</div></td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{d.stage}</td>
                  <td className="px-3 py-2 text-right font-semibold whitespace-nowrap">{d.amount ? usd(d.amount) : '–'}</td>
                  <td className="px-3 py-2 text-right">{d.probability}%</td>
                  <td className={`px-3 py-2 whitespace-nowrap ${d.closing < new Date().toISOString().slice(0, 10) ? 'text-red-600' : 'text-gray-600'}`}>{fmtDate(d.closing)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-600">{d.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-500">A closing date in red has passed while the deal is still open.</p>
      </Details>

      <Details title="Please check in the CRM" summary={`${data.toCheck.length} deals left out of the totals · ${nf(t.openNoAmount)} open deals with no amount · ${nf(t.overdue)} open deals past their closing date`}>
        {data.toCheck.length > 0 && (
          <>
            <p className="text-sm text-gray-600 mb-2">Left out of the totals until they are corrected:</p>
            <ul className="mb-4 space-y-1.5 text-sm">
              {data.toCheck.map(({ deal, reason }) => (
                <li key={deal.id}><b className="text-gray-900">{deal.name}</b> <span className="text-gray-500">· {usd(deal.amount)} · {deal.stage} · {deal.country || 'no country'} · {deal.owner}</span> <span className="text-red-600">· {reason}</span></li>
              ))}
            </ul>
          </>
        )}
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
          <li><b>{nf(t.openNoAmount)}</b> open deals have no amount, so the pipeline looks smaller than it is.</li>
          <li><b>{nf(t.overdue)}</b> open deals have a closing date that has passed; they need a new date or closing as won/lost.</li>
          {data.unmapped.length > 0 && <li>Deals whose region can&apos;t be told (shown as &ldquo;Other&rdquo;; add a Country of Execution in the CRM): {data.unmapped.slice(0, 10).map((u) => `${u.country === 'INSEA' ? 'territory INSEA with no country (India or South East Asia?)' : u.country} (${u.deals})`).join(', ')}.</li>}
        </ul>
      </Details>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-2">How the numbers work (to confirm with sales and marketing ops)</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
          <li><strong>Target and revenue budget:</strong> per region for the year, from the Zoho Analytics table &ldquo;Budget Region Summary 2026&rdquo; (copied from the Google Sheet &ldquo;Marketing Promotional Budget 2026&rdquo;, tab Region_Summary). The target looks like the stretch goal and the revenue budget the planned revenue; this is still to be confirmed. Status is measured against the target. (The marketing spend budget is separate, in the same sheet&apos;s Country_Forecast tab.){data.targetsNote && <> Its note: &ldquo;{data.targetsNote.replace(/^note:\s*/i, '')}&rdquo;</>}</li>
          <li><strong>Deals:</strong> every Zoho CRM deal closing in {data.year}, whether or not it started as a marketing lead. Amounts are in US dollars as converted in the CRM.</li>
          <li><strong>Won</strong> = Closed Won or Billing. <strong>Open</strong> = Prospect, Discovery, Qualification, Proposal, Negotiation, Commit or Onboarding. <strong>Stalled</strong> and <strong>Closed Lost</strong> are left out.</li>
          <li><strong>Expected</strong> = won + each open deal&apos;s amount × its win probability in the CRM.</li>
          <li><strong>Region</strong> comes from the deal&apos;s Country of Execution, else its Country of Origin, else its sales territory. South Asia (Sri Lanka, Maldives, Bangladesh, Pakistan) counts as India; South Africa, Kenya and Nigeria count as Africa; Hong Kong, China, Taiwan and South Korea count as Rest of East Asia.</li>
          <li>Test deals and single deals worth more than half their region&apos;s yearly target are left out and listed under &ldquo;Please check in the CRM&rdquo;.</li>
          <li>Zoho data refreshes every 6 hours · last refreshed {new Date(data.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.</li>
        </ul>
      </section>
    </>
  )
}
