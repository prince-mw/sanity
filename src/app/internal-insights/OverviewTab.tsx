'use client'

// Overview tab: the main numbers from every other tab (except Roadmap) for the selected dates.
import Link from 'next/link'
import type { Metric, MetricFormat, OverviewData } from '@/lib/insights/overview'
import type { RangeKey } from '@/lib/insights/ranges'
import { Delta, Kpi, nf, pct, usd } from './ui'
import { TargetsWarning } from './PipelineTab'

const fmt = (n: number, f: MetricFormat) => (f === 'usd' ? usd(n) : f === 'sgd' ? `SGD ${nf(n)}` : f === 'percent' ? pct(n) : nf(n))
const PRIORITY_STYLE = { High: 'bg-red-100 text-red-700', Medium: 'bg-amber-100 text-amber-800', Low: 'bg-gray-100 text-gray-600' }

function MetricRow({ m }: { m: Metric }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <span className="text-sm text-gray-600">{m.label}</span>
      <span className="text-right whitespace-nowrap">
        <b className="text-gray-900">{fmt(m.value, m.format)}</b>
        {m.note && <span className="text-xs text-gray-400"> {m.note}</span>}{' '}
        {!m.hideDelta && <Delta cur={m.value} prev={m.prev} points={m.points} lowerIsBetter={m.lowerIsBetter} />}
      </span>
    </div>
  )
}

export default function OverviewTab({ data, range }: { data: OverviewData; range: RangeKey }) {
  const tabHref = (tab: string) => `/internal-insights?tab=${tab}&range=${range}`

  const t = data.target
  const ofTarget = (n: number) => (t && t.target ? `${Math.min(100, (n / t.target) * 100)}%` : '0%')

  return (
    <>
      {/* Yearly target progress (not tied to the date buttons) */}
      {t && t.target > 0 && (
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5" aria-label={`${t.year} revenue target progress`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <h2 className="text-base font-bold text-[#062068]">{t.year} revenue target <span className="text-xs font-normal text-gray-400">whole year, all regions · doesn&apos;t change with the dates</span></h2>
            <Link href={tabHref('pipeline')} className="text-xs font-semibold text-mw-blue-600 hover:text-[#062068] whitespace-nowrap">Open Pipeline &amp; Targets →</Link>
          </div>
          {t.warning && <div className="mb-3"><TargetsWarning text={t.warning} /></div>}
          <div className="relative h-3.5 rounded-full bg-gray-100" role="img" aria-label={`Won ${usd(t.won)} and expected ${usd(t.forecast)} of the ${usd(t.target)} target`}>
            <div className="absolute inset-y-0 left-0 rounded-full bg-sky-300" style={{ width: ofTarget(t.forecast) }} />
            <div className="absolute inset-y-0 left-0 rounded-full bg-[#062068]" style={{ width: ofTarget(t.won) }} />
            {t.budget > 0 && <div className="absolute -top-1 -bottom-1 w-0.5 bg-amber-500" style={{ left: ofTarget(t.budget) }} aria-hidden="true" />}
            <div className="absolute -top-1 -bottom-1 w-0.5 bg-gray-500" style={{ left: `${t.yearElapsed * 100}%` }} aria-hidden="true" />
          </div>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-full bg-[#062068]" />Won <b className="text-gray-900">{usd(t.won)}</b> ({pct(t.won / t.target, 0)})</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-full bg-sky-300" />Expected <b className="text-gray-900">{usd(t.forecast)}</b> ({pct(t.forecast / t.target, 0)} of target{t.budget ? `, ${pct(t.forecast / t.budget, 0)} of budget` : ''})</span>
            {t.budget > 0 && <span className="inline-flex items-center gap-1.5"><span className="h-3 w-0.5 bg-amber-500" />Revenue budget <b className="text-gray-900">{usd(t.budget)}</b></span>}
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-0.5 bg-gray-500" />{pct(t.yearElapsed, 0)} of the year gone</span>
            <span>Target <b className="text-gray-900">{usd(t.target)}</b></span>
          </p>
        </section>
      )}

      {/* Headline numbers */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8" aria-label="Headline numbers">
        {data.headline.map((m) => (
          <Kpi key={m.label} label={m.label} value={fmt(m.value, m.format)} cur={m.value} prev={m.prev} points={m.points} note={m.note} info={m.info} />
        ))}
      </section>

      {/* Website enquiries, visit to deal */}
      {data.funnel && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-[#062068] mb-1">From website visit to deal</h2>
          <p className="text-sm text-gray-500 mb-3">Website enquiries in this period and the deals they have turned into so far.</p>
          <ol className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-0 rounded-2xl border border-gray-200 bg-white p-2">
            {data.funnel.map((s, i) => {
              const prev = data.funnel![i - 1]
              // No rate above 100%: form fills (Google Analytics) and CRM leads (Zoho) count slightly differently
              const rate = prev && s.format !== 'usd' && prev.value && s.value <= prev.value ? s.value / prev.value : null
              return (
                <li key={s.label} className={`relative px-4 py-3 ${i ? 'sm:border-l border-gray-100' : ''}`}>
                  {rate !== null && <span className="mb-1 inline-block rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-800">→ {rate ? pct(rate, rate < 0.01 ? 2 : 1) : '0%'}</span>}
                  <p className="text-2xl font-bold text-[#062068]">{fmt(s.value, s.format)}</p>
                  <p className="text-sm font-semibold text-gray-800">{s.label}</p>
                  <p className="text-xs text-gray-400">{s.note}</p>
                </li>
              )
            })}
          </ol>
        </section>
      )}

      {/* One card per tab */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#062068] mb-3">By area</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.tabs.map((t) => (
            <div key={t.key} className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-[#062068]">{t.title}</h3>
                <Link href={tabHref(t.key)} className="text-xs font-semibold text-mw-blue-600 hover:text-[#062068] whitespace-nowrap">Open tab →</Link>
              </div>
              {t.warning && <p className="mb-2 text-xs font-medium text-amber-800">⚠ {t.warning}</p>}
              {t.unavailable ? (
                <p className="text-sm text-gray-500">{t.unavailable}</p>
              ) : (
                <>
                  <div className="divide-y divide-gray-100 mb-3">{t.metrics.map((m) => <MetricRow key={m.label} m={m} />)}</div>
                  <div className="mt-auto space-y-2">
                    {t.win && (
                      <p className="flex gap-2 text-sm"><span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden="true" /><span><b className="text-gray-900">{t.win.title}</b> <span className="text-gray-500">{t.win.detail}</span></span></p>
                    )}
                    {t.concern && (
                      <p className="flex gap-2 text-sm"><span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" aria-hidden="true" /><span><b className="text-gray-900">{t.concern.title}</b> <span className="text-gray-500">{t.concern.detail}</span></span></p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Action items across tabs */}
      {data.progress.length > 0 && (
        <section className="grid lg:grid-cols-2 gap-4 mb-8 items-start">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-bold text-[#062068] mb-1">Action items</h2>
            <p className="text-sm text-gray-500 mb-4">Progress on each tab&apos;s action items, as marked by the team.</p>
            <ul className="space-y-4">
              {data.progress.map((g) => {
                const open = g.total - g.done - g.wip
                return (
                  <li key={g.tab}>
                    <div className="flex justify-between gap-2 text-sm mb-1">
                      <Link href={tabHref(g.tab)} className="font-semibold text-gray-900 hover:text-mw-blue-600">{g.label}</Link>
                      <span className="text-gray-500"><b className="text-gray-900">{g.done}</b> done · {g.wip} in progress · {open} not started</span>
                    </div>
                    <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-gray-100" role="img" aria-label={`${g.label}: ${g.done} done, ${g.wip} in progress, ${open} not started`}>
                      {g.done > 0 && <div className="bg-emerald-500" style={{ width: `${(g.done / g.total) * 100}%` }} />}
                      {g.wip > 0 && <div className="bg-amber-400" style={{ width: `${(g.wip / g.total) * 100}%` }} />}
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" />Done</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400" />In progress</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gray-200" />Not started</span>
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-bold text-[#062068] mb-1">High-priority items still open</h2>
            <p className="text-sm text-gray-500 mb-4">Mark them done in their own tab.</p>
            {data.topActions.length === 0 ? (
              <p className="text-sm text-gray-500">None. Every high-priority item is done. 🎉</p>
            ) : (
              <ul className="space-y-3">
                {data.topActions.map((a) => (
                  <li key={a.id} className="text-sm">
                    <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${PRIORITY_STYLE[a.priority]}`}>{a.priority}</span>
                      <Link href={tabHref(a.tab)} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600 hover:text-gray-900">{a.tabLabel}</Link>
                    </div>
                    <p className="font-semibold text-gray-900 leading-snug">{a.title}</p>
                    <p className="text-gray-500 line-clamp-2">{a.detail}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-2">How the numbers work</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
          <li>Every number here comes from the other tabs for the same dates; open a tab for the detail and its own notes. Roadmap &amp; execution isn&apos;t included.</li>
          <li><strong>Website leads</strong> are form fills recorded by Google Analytics; <strong>CRM leads</strong> are what reached Zoho CRM, so the two can differ.</li>
          <li><strong>Deals and deal value</strong> belong to the period their lead came in, so recent periods grow as leads turn into deals.</li>
          <li><strong>Blog findings</strong> is a fixed 12-month audit, and the <strong>revenue target</strong> bar and <strong>Pipeline &amp; Targets</strong> card cover the whole year, so their numbers don&apos;t change with the dates.</li>
          <li><strong>Ad spend</strong> is as reported by Google Analytics (in SGD), which runs lower than the Google Ads bill.</li>
        </ul>
      </section>
    </>
  )
}
