'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Dashboard, PageRow, Status, Totals, Learning } from '@/lib/insights/data'
import { RANGE_KEYS, RANGE_LABELS, type RangeKey } from '@/lib/insights/ranges'

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
const STATUS_HELP: Record<Status, string> = {
  Winning: 'Organic traffic that turns into leads',
  Converting: 'Produces leads',
  'Paid-driven': '70%+ of visits from ads',
  Leaking: '50+ real visits, no leads',
  'Too early': 'Under 20 real visits',
  'Bot-inflated': 'Half or more of visits are bots',
  Steady: 'Some traffic, no leads yet',
}
const LEARNING_STYLE: Record<Learning['tag'], string> = {
  Working: 'bg-emerald-100 text-emerald-800',
  Fix: 'bg-red-100 text-red-800',
  Context: 'bg-sky-100 text-sky-800',
  'Not yet': 'bg-gray-100 text-gray-700',
  'Data quality': 'bg-amber-100 text-amber-800',
}

/** Change vs previous period. `lowerIsBetter` flips the colour (e.g. bounce rate). */
function Delta({ cur, prev, lowerIsBetter = false, isRate = false }: { cur: number; prev: number; lowerIsBetter?: boolean; isRate?: boolean }) {
  if (!prev) return <span className="text-xs text-gray-400">no prior data</span>
  const change = isRate ? (cur - prev) * 100 : ((cur - prev) / prev) * 100
  if (!isFinite(change) || Math.abs(change) < 0.05) return <span className="text-xs text-gray-400">no change</span>
  const good = lowerIsBetter ? change < 0 : change > 0
  return (
    <span className={`text-xs font-semibold ${good ? 'text-emerald-600' : 'text-red-600'}`}>
      {change > 0 ? '▲' : '▼'} {Math.abs(change).toFixed(1)}{isRate ? ' pts' : '%'}
    </span>
  )
}

function Section({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-[#062068]">{title}</h2>
      {intro && <p className="text-sm text-gray-500 mt-1 mb-4 max-w-3xl">{intro}</p>}
      {!intro && <div className="mb-4" />}
      {children}
    </section>
  )
}

const METRICS: { key: keyof Totals; label: string; fmt: (n: number) => string; lowerIsBetter?: boolean; isRate?: boolean }[] = [
  { key: 'realSessions', label: 'Real sessions', fmt: nf },
  { key: 'leads', label: 'Leads', fmt: nf },
  { key: 'convRate', label: 'Conversion rate', fmt: (n) => pct(n, 2), isRate: true },
  { key: 'bounceRate', label: 'Bounce rate', fmt: (n) => pct(n, 0), lowerIsBetter: true, isRate: true },
  { key: 'gscClicks', label: 'Google clicks', fmt: nf },
  { key: 'gscImpressions', label: 'Google impressions', fmt: nf },
  { key: 'gscCtr', label: 'Google CTR', fmt: (n) => pct(n, 2), isRate: true },
  { key: 'gscPosition', label: 'Avg Google position', fmt: (n) => (n ? n.toFixed(1) : '–'), lowerIsBetter: true },
]

function ChannelBar({ t }: { t: Totals }) {
  const real = Math.max(1, t.organic + t.paid + t.other)
  const parts = [
    { label: 'Organic', value: t.organic, color: 'bg-emerald-500' },
    { label: 'Paid', value: t.paid, color: 'bg-violet-500' },
    { label: 'Other', value: t.other, color: 'bg-slate-400' },
  ]
  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
        {parts.map((p) => <div key={p.label} className={p.color} style={{ width: `${(p.value / real) * 100}%` }} title={`${p.label}: ${nf(p.value)}`} />)}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        {parts.map((p) => (
          <span key={p.label} className="inline-flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-sm ${p.color}`} />{p.label} {pct(p.value / real, 0)}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">AI assistants {nf(t.ai)}</span>
      </div>
    </div>
  )
}

function WeeklyChart({ weekly }: { weekly: Dashboard['weekly'] }) {
  const max = Math.max(1, ...weekly.map((w) => w.siteSessions))
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-end gap-1 h-40" role="img" aria-label="Weekly sessions: whole site vs location pages">
        {weekly.map((w) => (
          <div key={w.week} className="flex-1 flex flex-col items-center justify-end h-full group relative">
            <div className="w-full flex flex-col justify-end h-full">
              <div className="w-full bg-slate-200 rounded-t" style={{ height: `${((w.siteSessions - w.locationSessions) / max) * 100}%` }} />
              <div className="w-full bg-[#1E76BB]" style={{ height: `${(w.locationSessions / max) * 100}%` }} />
            </div>
            <div className="absolute bottom-full mb-1 hidden group-hover:block whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-[11px] text-white z-10">
              Week {w.week.slice(4)}: {nf(w.siteSessions)} site / {nf(w.locationSessions)} locations · leads {w.siteLeads} / {w.locationLeads}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-gray-600">
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#1E76BB]" />Location pages</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-200" />Rest of site</span>
        <span className="text-gray-400">Raw sessions incl. bots · hover a bar for leads</span>
      </div>
    </div>
  )
}

type SortKey = 'realSessions' | 'leads' | 'convRate' | 'bounceRate' | 'gscClicks' | 'gscImpressions' | 'gscPosition' | 'page'

export default function InsightsDashboard({ data, range }: { data: Dashboard; range: RangeKey }) {
  const router = useRouter()
  const [status, setStatus] = useState<Status | 'All'>('All')
  const [level, setLevel] = useState<'All' | 'Country' | 'City'>('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({ key: 'realSessions', desc: true })

  const statusCounts = useMemo(() => {
    const c = new Map<Status, number>()
    data.pages.forEach((p) => c.set(p.status, (c.get(p.status) || 0) + 1))
    return c
  }, [data.pages])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = data.pages.filter(
      (p) => (status === 'All' || p.status === status) && (level === 'All' || p.level === level) && (!q || p.page.includes(q) || p.market.toLowerCase().includes(q))
    )
    const val = (p: PageRow) => (sort.key === 'page' ? p.page : sort.key === 'gscPosition' ? p.gscPosition ?? 999 : (p[sort.key] as number))
    return [...list].sort((a, b) => {
      const x = val(a), y = val(b)
      const cmp = typeof x === 'string' ? x.localeCompare(y as string) : (x as number) - (y as number)
      return sort.desc ? -cmp : cmp
    })
  }, [data.pages, status, level, query, sort])

  const th = (key: SortKey, label: string, align = 'text-right') => (
    <th scope="col" className={`px-3 py-3 font-semibold ${align}`}>
      <button type="button" onClick={() => setSort((s) => ({ key, desc: s.key === key ? !s.desc : key !== 'page' && key !== 'gscPosition' }))} className="hover:text-[#062068]">
        {label}{sort.key === key ? (sort.desc ? ' ↓' : ' ↑') : ''}
      </button>
    </th>
  )

  // Pin the date bar once its original position scrolls under the site header
  const barSentinel = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)
  const [barHeight, setBarHeight] = useState(0)
  useEffect(() => {
    const sentinel = barSentinel.current
    if (!sentinel) return
    const headerOffset = () => (window.innerWidth >= 1024 ? 65 : 57)
    const update = () => {
      if (barRef.current && !pinned) setBarHeight(barRef.current.offsetHeight)
      setPinned(sentinel.getBoundingClientRect().top < headerOffset())
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pinned])

  async function signOut() {
    await fetch('/api/internal-insights', { method: 'DELETE' })
    router.refresh()
  }

  const s = data.site
  const l = data.locations

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-mw-blue-600">Internal · Confidential</p>
          <h1 className="text-3xl font-bold text-gray-900">Website Insights: Location Pages</h1>
        </div>

        {/* Date bar. CSS sticky doesn't work site-wide (body has overflow set), so it switches to
            position: fixed under the site header (56px, 64px from lg) once scrolled past. */}
        <div ref={barSentinel} aria-hidden="true" />
        <div style={{ height: pinned ? barHeight : undefined }} className="mb-8">
        <div
          ref={barRef}
          className={`z-40 py-2 sm:py-3 bg-gray-50 border-b border-gray-200 ${pinned ? 'fixed left-0 right-0 top-[57px] lg:top-[65px] shadow-sm' : '-mx-4 sm:-mx-6 lg:-mx-8'}`}
        >
          <div className={`${pinned ? 'max-w-7xl mx-auto' : ''} px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3`}>
            <p className="text-xs sm:text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{fmtDate(data.period.start)} – {fmtDate(data.period.end)}</span>
              <span className="hidden sm:inline text-gray-400"> vs {fmtDate(data.period.prevStart)} – {fmtDate(data.period.prevEnd)}</span>
              <span className="hidden md:inline text-gray-400"> · refreshed {new Date(data.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </p>
            <div className="flex items-center gap-2">
              <div className="inline-flex flex-wrap rounded-lg border border-gray-200 bg-white p-1" role="group" aria-label="Date range">
                {RANGE_KEYS.map((r) => (
                  <Link
                    key={r}
                    href={`/internal-insights?range=${r}`}
                    scroll={false}
                    aria-current={range === r ? 'true' : undefined}
                    className={`px-3 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap ${range === r ? 'bg-[#062068] text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {RANGE_LABELS[r]}
                  </Link>
                ))}
              </div>
              <button type="button" onClick={signOut} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
                Sign out
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Site vs locations */}
        <Section title="Whole Site vs Location Pages" intro="Real sessions exclude estimated data-centre bot traffic. Arrows compare with the comparison period shown in the date bar.">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Metric</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Whole site</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Location pages</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Locations share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {METRICS.map((m) => {
                  const shareable = ['realSessions', 'leads', 'gscClicks', 'gscImpressions'].includes(m.key)
                  return (
                    <tr key={m.key}>
                      <th scope="row" className="px-4 py-3 text-left font-medium text-gray-700">{m.label}</th>
                      <td className="px-4 py-3 text-right">
                        <span className="font-semibold text-gray-900">{m.fmt(s.current[m.key])}</span>{' '}
                        <Delta cur={s.current[m.key]} prev={s.previous[m.key]} lowerIsBetter={m.lowerIsBetter} isRate={m.isRate} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-semibold text-gray-900">{m.fmt(l.current[m.key])}</span>{' '}
                        <Delta cur={l.current[m.key]} prev={l.previous[m.key]} lowerIsBetter={m.lowerIsBetter} isRate={m.isRate} />
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        {shareable && s.current[m.key] ? pct(l.current[m.key] / s.current[m.key], 0) : '–'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-gray-900 mb-3">Whole site traffic mix</p>
              <ChannelBar t={s.current} />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-gray-900 mb-3">Location pages traffic mix</p>
              <ChannelBar t={l.current} />
            </div>
          </div>
        </Section>

        {/* Country vs city */}
        <Section title="Country Pages vs City Pages">
          <div className="grid md:grid-cols-2 gap-4">
            {([['Country pages', data.countries], ['City pages', data.cities]] as const).map(([label, t]) => (
              <div key={label} className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-sm font-semibold text-gray-900 mb-4">{label}</p>
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    ['Real sessions', nf(t.realSessions)],
                    ['Leads', nf(t.leads)],
                    ['Conversion', pct(t.convRate, 2)],
                    ['Bounce', pct(t.bounceRate, 0)],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs text-gray-500">{k}</dt>
                      <dd className="text-xl font-bold text-[#062068]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4"><ChannelBar t={t} /></div>
              </div>
            ))}
          </div>
        </Section>

        {/* Learnings */}
        <Section title="Learnings & Recommendations" intro="Calculated from the numbers on this page each time the data refreshes.">
          <div className="grid md:grid-cols-2 gap-4">
            {data.learnings.map((x) => (
              <div key={x.headline} className="rounded-2xl border border-gray-200 bg-white p-5">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${LEARNING_STYLE[x.tag]}`}>{x.tag}</span>
                <p className="mt-2 font-semibold text-gray-900">{x.headline}</p>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{x.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Weekly trend */}
        <Section title="Weekly Traffic">
          <WeeklyChart weekly={data.weekly} />
        </Section>

        {/* Scorecard */}
        <Section title="Location Page Scorecard" intro={`Every /locations/ page with traffic or Google impressions in this period. Click a column to sort; click a status to filter.${data.semrushDate ? ` Semrush keyword data: snapshot of ${fmtDate(data.semrushDate)}.` : ''}`}>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button type="button" onClick={() => setStatus('All')} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${status === 'All' ? 'bg-[#062068] text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
              All {data.pages.length}
            </button>
            {(Object.keys(STATUS_STYLE) as Status[]).filter((k) => statusCounts.get(k)).map((k) => (
              <button
                key={k}
                type="button"
                title={STATUS_HELP[k]}
                onClick={() => setStatus(k)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${status === k ? 'ring-2 ring-[#062068]' : ''} ${STATUS_STYLE[k]}`}
              >
                {k} {statusCounts.get(k)}
              </button>
            ))}
            <select value={level} onChange={(e) => setLevel(e.target.value as typeof level)} className="ml-auto rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm">
              <option value="All">Countries & cities</option>
              <option value="Country">Countries only</option>
              <option value="City">Cities only</option>
            </select>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search page or market"
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm w-48"
            />
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  {th('page', 'Page', 'text-left')}
                  {th('realSessions', 'Real visits')}
                  <th scope="col" className="px-3 py-3 font-semibold text-right">Org / Paid</th>
                  {th('bounceRate', 'Bounce')}
                  {th('leads', 'Leads')}
                  {th('convRate', 'Conv.')}
                  {th('gscClicks', 'G clicks')}
                  {th('gscImpressions', 'G impr.')}
                  {th('gscPosition', 'G pos.')}
                  <th scope="col" className="px-3 py-3 font-semibold text-left">Status & recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 align-top">
                {rows.map((p) => (
                  <tr key={p.page} className="hover:bg-gray-50">
                    <td className="px-3 py-3 min-w-[200px]">
                      <a href={p.page} target="_blank" rel="noreferrer" className="font-semibold text-gray-900 hover:text-mw-blue-600">{p.market}</a>
                      <div className="text-xs text-gray-400">{p.page} · {p.level}</div>
                      {p.semrush && (
                        <div className="text-xs text-violet-700 mt-1">
                          Semrush: “{p.semrush.keyword}” · {nf(p.semrush.volume)}/mo · #{p.semrush.position} ({p.semrush.database})
                        </div>
                      )}
                      {p.topQuery && (
                        <div className="text-xs text-gray-500 mt-1">
                          Top query: “{p.topQuery}”{p.topQueryPosition ? ` (#${p.topQueryPosition.toFixed(0)})` : ''}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right font-semibold">
                      {nf(p.realSessions)}
                      {p.botSessions > 0 && <div className="text-xs font-normal text-amber-600">+{nf(p.botSessions)} bots</div>}
                    </td>
                    <td className="px-3 py-3 text-right text-gray-600 whitespace-nowrap">{nf(p.organic)} / {nf(p.paid)}</td>
                    <td className="px-3 py-3 text-right">{pct(p.bounceRate, 0)}</td>
                    <td className="px-3 py-3 text-right font-semibold">{p.leads || '–'}</td>
                    <td className="px-3 py-3 text-right">{p.leads ? pct(p.convRate, 1) : '–'}</td>
                    <td className="px-3 py-3 text-right">{p.gscClicks ? nf(p.gscClicks) : '–'}</td>
                    <td className="px-3 py-3 text-right">{p.gscImpressions ? nf(p.gscImpressions) : '–'}</td>
                    <td className="px-3 py-3 text-right">{p.gscPosition ? p.gscPosition.toFixed(1) : '–'}</td>
                    <td className="px-3 py-3 min-w-[280px]">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                      <p className="mt-1 text-xs text-gray-600 leading-relaxed">{p.action}</p>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={10} className="px-3 py-8 text-center text-gray-500">No pages match these filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Keyword opportunities */}
        <Section
          title="Keyword Opportunities"
          intro="Non-brand Google searches from Search Console. Striking distance: a location page ranks #4–20, close to the top 3. Click gap: it already ranks top 5 but few people click, usually a title/description problem."
        >
          {data.opportunities.length === 0 ? (
            <p className="text-sm text-gray-500">No opportunities above the minimum impressions for this period.</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left font-semibold">Search query</th>
                    <th scope="col" className="px-3 py-3 text-left font-semibold">Page</th>
                    <th scope="col" className="px-3 py-3 text-right font-semibold">Impr.</th>
                    <th scope="col" className="px-3 py-3 text-right font-semibold">Clicks</th>
                    <th scope="col" className="px-3 py-3 text-right font-semibold">Pos.</th>
                    <th scope="col" className="px-3 py-3 text-left font-semibold">What to do</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 align-top">
                  {data.opportunities.map((o) => (
                    <tr key={`${o.page}|${o.query}`} className="hover:bg-gray-50">
                      <td className="px-3 py-3 font-semibold text-gray-900 min-w-[180px]">
                        {o.query}
                        <div>
                          <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${o.type === 'Click gap' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'}`}>{o.type}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-600"><a href={o.page} target="_blank" rel="noreferrer" className="hover:text-mw-blue-600">{o.page}</a></td>
                      <td className="px-3 py-3 text-right">{nf(o.impressions)}</td>
                      <td className="px-3 py-3 text-right">{nf(o.clicks)}</td>
                      <td className="px-3 py-3 text-right font-semibold">{o.position.toFixed(1)}</td>
                      <td className="px-3 py-3 text-xs text-gray-600 leading-relaxed min-w-[260px]">{o.advice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {/* Lead sources */}
        <Section title="Where Leads Come From" intro="Each Zoho form fires its own GA4 event. Location forms are credited to their page; site-wide forms are not.">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Form event</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Credited to</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Leads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.leadSources.map((x) => (
                  <tr key={x.event}>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-700">{x.event}</td>
                    <td className={`px-4 py-2.5 ${x.isLocation ? 'text-gray-900' : 'text-gray-500 italic'}`}>{x.creditedTo}</td>
                    <td className="px-4 py-2.5 text-right font-semibold">{x.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <p className="text-xs text-gray-400">
          Bots: blocks of near-zero-engagement sessions (2% or less engaged) from data-centre cities (e.g. Ashburn) in Direct/Unassigned/Email are removed as an estimate. Search Console data lags 2–3 days. Data is cached for 6 hours.
        </p>
      </div>
    </div>
  )
}
