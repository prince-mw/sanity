'use client'

import { useMemo, useState } from 'react'
import type { ActionItem, Dashboard, Finding, PageRow, Status, Totals } from '@/lib/insights/data'

const nf = (n: number) => Math.round(n).toLocaleString('en-US')
const pct = (n: number, d = 1) => `${(n * 100).toFixed(d)}%`
const fmtDate = (s: string) => new Date(s + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

const STATUS_STYLE: Record<Status, string> = {
  Winning: 'bg-emerald-100 text-emerald-800',
  Converting: 'bg-sky-100 text-sky-800',
  'Paid-driven': 'bg-violet-100 text-violet-800',
  Leaking: 'bg-red-100 text-red-800',
  'Too early': 'bg-gray-100 text-gray-700',
  'Bot-inflated': 'bg-amber-100 text-amber-800',
  Steady: 'bg-slate-100 text-slate-700',
}
const PRIORITY_STYLE: Record<ActionItem['priority'], string> = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-amber-100 text-amber-800',
  Low: 'bg-gray-100 text-gray-700',
}

/** Change vs previous period. `lowerIsBetter` flips the colour; `points` shows percentage-point change for rates. */
function Delta({ cur, prev, lowerIsBetter = false, points = false }: { cur: number; prev: number; lowerIsBetter?: boolean; points?: boolean }) {
  if (!prev && !cur) return <span className="text-xs text-gray-400">–</span>
  if (!prev) return <span className="text-xs text-gray-400">new</span>
  const c = points ? (cur - prev) * 100 : ((cur - prev) / prev) * 100
  if (!isFinite(c) || Math.abs(c) < 0.05) return <span className="text-xs text-gray-400">no change</span>
  const good = lowerIsBetter ? c < 0 : c > 0
  return (
    <span className={`text-xs font-semibold ${good ? 'text-emerald-600' : 'text-red-600'}`}>
      {c > 0 ? '▲' : '▼'} {Math.abs(c).toFixed(points ? 2 : 0)}{points ? ' pts' : '%'}
    </span>
  )
}

function Kpi({ label, value, cur, prev, share, lowerIsBetter, points }: { label: string; value: string; cur: number; prev: number; share?: string; lowerIsBetter?: boolean; points?: boolean }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-[#062068]">{value}</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-2">
        <Delta cur={cur} prev={prev} lowerIsBetter={lowerIsBetter} points={points} />
        {share && <span className="text-xs text-gray-400">· {share} of whole site</span>}
      </div>
    </div>
  )
}

function FindingList({ title, items, tone }: { title: string; items: Finding[]; tone: 'good' | 'bad' }) {
  const dot = tone === 'good' ? 'bg-emerald-500' : 'bg-red-500'
  const head = tone === 'good' ? 'text-emerald-700' : 'text-red-700'
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className={`text-lg font-bold ${head} mb-4`}>{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Nothing notable in this period.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((f) => (
            <li key={f.title} className="flex gap-3">
              <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
              <div>
                <p className="font-semibold text-gray-900 leading-snug">
                  {f.page ? <a href={f.page} target="_blank" rel="noreferrer" className="hover:text-mw-blue-600">{f.title}</a> : f.title}
                </p>
                <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{f.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Trend({ data }: { data: Dashboard }) {
  const yearly = data.range === 'this-year' || data.range === 'last-year'
  const label = (k: string) =>
    yearly
      ? new Date(Date.UTC(+k.slice(0, 4), +k.slice(4, 6) - 1, 1)).toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' })
      : new Date(Date.UTC(+k.slice(0, 4), +k.slice(4, 6) - 1, +k.slice(6, 8))).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })
  const max = Math.max(1, ...data.trend.map((t) => t.siteSessions))
  const showEvery = Math.ceil(data.trend.length / 12)
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-end gap-1 h-40" role="img" aria-label="Sessions over time: whole site vs location pages">
        {data.trend.map((t) => (
          <div key={t.label} className="flex-1 flex flex-col justify-end h-full group relative">
            <div className="w-full bg-slate-200 rounded-t" style={{ height: `${((t.siteSessions - t.locationSessions) / max) * 100}%` }} />
            <div className="w-full bg-[#1E76BB]" style={{ height: `${(t.locationSessions / max) * 100}%` }} />
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-[11px] text-white z-10">
              {label(t.label)}: {nf(t.siteSessions)} site · {nf(t.locationSessions)} locations · {t.locationLeads} leads
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-1 mt-1">
        {data.trend.map((t, i) => (
          <div key={t.label} className="flex-1 text-center text-[10px] text-gray-400 truncate">{i % showEvery === 0 ? label(t.label) : ''}</div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-600">
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#1E76BB]" />Location pages</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-200" />Rest of site</span>
        <span className="text-gray-400">Raw sessions incl. bots · hover a bar for leads</span>
      </div>
    </div>
  )
}

function Details({ title, summary, children }: { title: string; summary: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-2xl border border-gray-200 bg-white mb-3 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
        <span>
          <span className="font-semibold text-gray-900">{title}</span>
          <span className="block text-xs text-gray-500 mt-0.5">{summary}</span>
        </span>
        <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-5 pb-5">{children}</div>
    </details>
  )
}

type ActionStatus = 'not-started' | 'wip' | 'done'
type StatusMap = Record<string, { status: ActionStatus; updatedAt: string }>
const STATUS_BUTTONS: { key: ActionStatus; label: string; on: string }[] = [
  { key: 'not-started', label: 'Not started', on: 'bg-gray-700 text-white' },
  { key: 'wip', label: 'WIP', on: 'bg-amber-500 text-white' },
  { key: 'done', label: 'Done', on: 'bg-emerald-600 text-white' },
]

/** Action items with a shared status (saved server-side, visible to everyone). Done items sink to the bottom. */
function ActionList({ actions, initial }: { actions: ActionItem[]; initial: StatusMap }) {
  const [statuses, setStatuses] = useState<StatusMap>(initial)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState('')
  const statusOf = (id: string): ActionStatus => statuses[id]?.status || 'not-started'
  const ordered = [...actions].sort((a, b) => Number(statusOf(a.id) === 'done') - Number(statusOf(b.id) === 'done'))
  const doneCount = actions.filter((a) => statusOf(a.id) === 'done').length

  async function update(id: string, status: ActionStatus) {
    const previous = statuses
    setStatuses({ ...statuses, [id]: { status, updatedAt: new Date().toISOString() } })
    setSaving(id)
    setError('')
    const res = await fetch('/api/internal-insights/actions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, status }),
    }).catch(() => null)
    setSaving(null)
    if (!res || !res.ok) {
      setStatuses(previous)
      const json = res ? await res.json().catch(() => ({})) : {}
      setError(`Couldn't save the status: ${json.error || 'network error'}`)
    }
  }

  if (actions.length === 0) return <p className="text-sm text-gray-500">No actions for this period.</p>
  return (
    <>
      <p className="text-xs text-gray-500 mb-3">{doneCount} of {actions.length} done · statuses are shared with everyone who uses this dashboard.</p>
      {error && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
      <ol className="divide-y divide-gray-100">
        {ordered.map((a, i) => {
          const st = statusOf(a.id)
          const done = st === 'done'
          return (
            <li key={a.id} className={`flex gap-4 py-4 first:pt-0 last:pb-0 ${done ? 'opacity-60' : ''}`}>
              <span className={`w-7 h-7 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0 ${done ? 'bg-emerald-600' : 'bg-[#062068]'}`}>
                {done ? '✓' : i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${PRIORITY_STYLE[a.priority]}`}>{a.priority}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{a.category}</span>
                    </div>
                    <p className={`mt-1 font-semibold text-gray-900 ${done ? 'line-through' : ''}`}>{a.title}</p>
                  </div>
                  <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5 flex-shrink-0" role="group" aria-label={`Status of: ${a.title}`}>
                    {STATUS_BUTTONS.map((b) => (
                      <button
                        key={b.key}
                        type="button"
                        disabled={saving === a.id}
                        aria-pressed={st === b.key}
                        onClick={() => st !== b.key && update(a.id, b.key)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${st === b.key ? b.on : 'text-gray-500 hover:text-gray-900'}`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mt-1">{a.detail}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs">
                  {a.page && <a href={a.page} target="_blank" rel="noreferrer" className="font-semibold text-mw-blue-600 hover:underline">{a.page}</a>}
                  {statuses[a.id] && st !== 'not-started' && (
                    <span className="text-gray-400">{st === 'done' ? 'Done' : 'WIP'} since {new Date(statuses[a.id].updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </>
  )
}

const TH = 'px-3 py-2.5 font-semibold text-left'
const THR = 'px-3 py-2.5 font-semibold text-right'

function Scorecard({ pages }: { pages: PageRow[] }) {
  const [status, setStatus] = useState<Status | 'All'>('All')
  const [query, setQuery] = useState('')
  const counts = useMemo(() => {
    const c = new Map<Status, number>()
    pages.forEach((p) => c.set(p.status, (c.get(p.status) || 0) + 1))
    return c
  }, [pages])
  const rows = pages.filter((p) => (status === 'All' || p.status === status) && (!query || `${p.page} ${p.market}`.toLowerCase().includes(query.toLowerCase())))
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button type="button" onClick={() => setStatus('All')} className={`rounded-full px-3 py-1 text-xs font-semibold ${status === 'All' ? 'bg-[#062068] text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>All {pages.length}</button>
        {(Object.keys(STATUS_STYLE) as Status[]).filter((k) => counts.get(k)).map((k) => (
          <button key={k} type="button" onClick={() => setStatus(k)} className={`rounded-full px-3 py-1 text-xs font-semibold ${status === k ? 'ring-2 ring-[#062068]' : ''} ${STATUS_STYLE[k]}`}>{k} {counts.get(k)}</button>
        ))}
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search page" className="ml-auto rounded-lg border border-gray-200 px-3 py-1.5 text-sm w-44" />
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th scope="col" className={TH}>Page</th>
              <th scope="col" className={THR}>Real visits</th>
              <th scope="col" className={THR}>Leads</th>
              <th scope="col" className={THR}>Conv.</th>
              <th scope="col" className={THR}>Google clicks</th>
              <th scope="col" className={TH}>Top Semrush keyword</th>
              <th scope="col" className={TH}>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 align-top">
            {rows.map((p) => {
              const k = p.semrush[0]
              return (
                <tr key={p.page} className="hover:bg-gray-50">
                  <td className="px-3 py-2.5 min-w-[180px]">
                    <a href={p.page} target="_blank" rel="noreferrer" className="font-semibold text-gray-900 hover:text-mw-blue-600">{p.market}</a>
                    <div className="text-xs text-gray-400">{p.level}</div>
                  </td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap">
                    <span className="font-semibold">{nf(p.realSessions)}</span> <Delta cur={p.realSessions} prev={p.prevRealSessions} />
                    {p.botSessions > 0 && <div className="text-xs text-amber-600">+{nf(p.botSessions)} bots</div>}
                  </td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap"><span className="font-semibold">{p.leads || '–'}</span> {(p.leads || p.prevLeads) ? <Delta cur={p.leads} prev={p.prevLeads} /> : null}</td>
                  <td className="px-3 py-2.5 text-right">{p.leads ? pct(p.convRate) : '–'}</td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap">{p.gscClicks ? nf(p.gscClicks) : '–'} {p.gscClicks || p.prevGscClicks ? <Delta cur={p.gscClicks} prev={p.prevGscClicks} /> : null}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-700 min-w-[180px]">{k ? <>“{k.keyword}” <span className="text-gray-400">#{k.position} · {nf(k.volume)}/mo</span></> : <span className="text-gray-400">–</span>}</td>
                  <td className="px-3 py-2.5 min-w-[220px]">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                    <p className="text-xs text-gray-500 mt-1">{p.action}</p>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

const METRICS: { key: keyof Totals; label: string; fmt: (n: number) => string; lowerIsBetter?: boolean; points?: boolean }[] = [
  { key: 'realSessions', label: 'Real sessions', fmt: nf },
  { key: 'leads', label: 'Leads', fmt: nf },
  { key: 'convRate', label: 'Conversion rate', fmt: (n) => pct(n, 2), points: true },
  { key: 'bounceRate', label: 'Bounce rate', fmt: (n) => pct(n, 0), lowerIsBetter: true, points: true },
  { key: 'organic', label: 'Organic sessions', fmt: nf },
  { key: 'paid', label: 'Paid sessions', fmt: nf },
  { key: 'ai', label: 'AI assistant visits', fmt: nf },
  { key: 'gscClicks', label: 'Google clicks', fmt: nf },
  { key: 'gscImpressions', label: 'Google impressions', fmt: nf },
  { key: 'gscPosition', label: 'Avg Google position', fmt: (n) => (n ? n.toFixed(1) : '–'), lowerIsBetter: true },
]

export default function InsightsDashboard({ data, statuses }: { data: Dashboard; statuses: StatusMap }) {
  const s = data.site
  const l = data.locations
  const share = (k: keyof Totals) => (s.current[k] ? pct(l.current[k] / s.current[k], 0) : undefined)

  return (
    <>
        {/* Headline numbers */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6" aria-label="Headline numbers for location pages">
          <Kpi label="Real visits" value={nf(l.current.realSessions)} cur={l.current.realSessions} prev={l.previous.realSessions} share={share('realSessions')} />
          <Kpi label="Leads" value={nf(l.current.leads)} cur={l.current.leads} prev={l.previous.leads} share={share('leads')} />
          <Kpi label="Conversion rate" value={pct(l.current.convRate, 2)} cur={l.current.convRate} prev={l.previous.convRate} points />
          <Kpi label="Google clicks" value={nf(l.current.gscClicks)} cur={l.current.gscClicks} prev={l.previous.gscClicks} share={share('gscClicks')} />
          <Kpi label="Avg Google position" value={l.current.gscPosition ? l.current.gscPosition.toFixed(1) : '–'} cur={l.current.gscPosition} prev={l.previous.gscPosition} lowerIsBetter />
        </section>

        {/* Whole site vs location pages */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-[#062068] mb-3">Whole site vs location pages</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr><th scope="col" className={TH}>Metric</th><th scope="col" className={THR}>Whole site</th><th scope="col" className={THR}>Location pages</th><th scope="col" className={THR}>Country pages</th><th scope="col" className={THR}>City pages</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {METRICS.map((m) => (
                  <tr key={m.key}>
                    <th scope="row" className="px-3 py-2.5 text-left font-medium text-gray-700">{m.label}</th>
                    <td className="px-3 py-2.5 text-right whitespace-nowrap"><span className="font-semibold">{m.fmt(s.current[m.key])}</span> <Delta cur={s.current[m.key]} prev={s.previous[m.key]} lowerIsBetter={m.lowerIsBetter} points={m.points} /></td>
                    <td className="px-3 py-2.5 text-right whitespace-nowrap"><span className="font-semibold">{m.fmt(l.current[m.key])}</span> <Delta cur={l.current[m.key]} prev={l.previous[m.key]} lowerIsBetter={m.lowerIsBetter} points={m.points} /></td>
                    <td className="px-3 py-2.5 text-right">{m.key === 'gscPosition' ? '–' : m.fmt(data.countries[m.key])}</td>
                    <td className="px-3 py-2.5 text-right">{m.key === 'gscPosition' ? '–' : m.fmt(data.cities[m.key])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Going well / needs attention */}
        <section className="grid lg:grid-cols-2 gap-4 mb-6">
          <FindingList title="✓ What's going well" items={data.working} tone="good" />
          <FindingList title="⚠ What needs attention" items={data.notWorking} tone="bad" />
        </section>

        {/* Actions */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 mb-6">
          <h2 className="text-lg font-bold text-[#062068] mb-1">→ Action items</h2>
          <p className="text-sm text-gray-500 mb-1">Most valuable first, based on leads, search demand (Semrush) and Google data.</p>
          <ActionList actions={data.actions} initial={statuses} />
        </section>

        {/* Trend */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-[#062068] mb-3">Traffic over time</h2>
          <Trend data={data} />
        </section>

        {/* Details */}
        <h2 className="text-lg font-bold text-[#062068] mb-3">Details</h2>

        <Details title="Page scorecard" summary={`${data.pages.length} location pages: visits, leads, Google clicks and Semrush keyword, each vs the previous period`}>
          <Scorecard pages={data.pages} />
        </Details>

        <Details title="Search opportunities (Google Search Console)" summary="Searches where a page ranks #4–20 (striking distance) or top 5 with few clicks (click gap)">
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr><th scope="col" className={TH}>Search</th><th scope="col" className={TH}>Page</th><th scope="col" className={THR}>Impr.</th><th scope="col" className={THR}>Clicks</th><th scope="col" className={THR}>Pos.</th><th scope="col" className={TH}>Type</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.opportunities.map((o) => (
                  <tr key={`${o.page}|${o.query}`}>
                    <td className="px-3 py-2 font-medium text-gray-900">{o.query}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{o.page}</td>
                    <td className="px-3 py-2 text-right">{nf(o.impressions)}</td>
                    <td className="px-3 py-2 text-right">{nf(o.clicks)}</td>
                    <td className="px-3 py-2 text-right font-semibold">{o.position.toFixed(1)}</td>
                    <td className="px-3 py-2"><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${o.type === 'Click gap' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'}`}>{o.type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Details>

        <Details title="Semrush keywords" summary={data.semrushDate ? `Top keywords our location pages rank for · snapshot ${fmtDate(data.semrushDate)}` : 'No Semrush snapshot yet'}>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr><th scope="col" className={TH}>Keyword</th><th scope="col" className={TH}>Market</th><th scope="col" className={THR}>Position</th><th scope="col" className={THR}>Searches/mo</th><th scope="col" className={THR}>Difficulty</th><th scope="col" className={TH}>Page</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.semrushTop.map((k) => (
                  <tr key={`${k.database}|${k.keyword}|${k.page}`}>
                    <td className="px-3 py-2 font-medium text-gray-900">{k.keyword}</td>
                    <td className="px-3 py-2 text-gray-600">{k.database}</td>
                    <td className={`px-3 py-2 text-right font-semibold ${k.position <= 3 ? 'text-emerald-600' : k.position <= 10 ? 'text-sky-700' : 'text-gray-700'}`}>#{k.position}</td>
                    <td className="px-3 py-2 text-right">{nf(k.volume)}</td>
                    <td className="px-3 py-2 text-right">{k.difficulty}</td>
                    <td className="px-3 py-2 text-xs text-gray-500">{k.page}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Details>

        <Details title="Where leads come from" summary="Each Zoho form's GA4 lead event and the page it is credited to">
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr><th scope="col" className={TH}>Form event</th><th scope="col" className={TH}>Credited to</th><th scope="col" className={THR}>Leads</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.leadSources.map((x) => (
                  <tr key={x.event}>
                    <td className="px-3 py-2 font-mono text-xs text-gray-700">{x.event}</td>
                    <td className={`px-3 py-2 ${x.isLocation ? 'text-gray-900' : 'text-gray-500 italic'}`}>{x.creditedTo}</td>
                    <td className="px-3 py-2 text-right font-semibold">{x.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Details>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="font-semibold text-gray-900 mb-2">How the numbers work</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
            <li><strong>Real visits</strong> exclude estimated bots: blocks of sessions with 2% or less engagement from data-centre cities (e.g. Ashburn) in Direct/Unassigned/Email traffic.</li>
            <li><strong>Leads</strong> are credited by form: GA4 records enquiries inside the Zoho form, so each page gets its own form's generate_lead event. Site-wide contact and demo forms are not credited to any location page.</li>
            <li><strong>Google clicks, impressions and position</strong> come from Search Console, which lags 2–3 days.</li>
            <li><strong>Semrush</strong> keywords are a monthly snapshot{data.semrushDate ? ` (last: ${fmtDate(data.semrushDate)})` : ''}; positions are for each market&apos;s Google.</li>
            <li>Data refreshes every 6 hours · last refreshed {new Date(data.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.</li>
          </ul>
        </section>
    </>
  )
}
