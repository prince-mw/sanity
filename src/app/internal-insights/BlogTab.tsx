'use client'

// Blog findings tab: the blog content audit as action items with shared Not started / WIP / Done status.
import { useMemo, useState } from 'react'
import type { BlogAudit } from '@/lib/insights/blogAudit'
import { ActionList, Delta, Details, TH, THR, nf, type ActionStatus, type StatusMap } from './ui'

const DIAGNOSIS: Record<string, { label: string; cls: string }> = {
  missing: { label: 'Missing page', cls: 'bg-red-100 text-red-800' },
  weak: { label: 'Weak page', cls: 'bg-amber-100 text-amber-800' },
  cannibal: { label: 'Cannibalised', cls: 'bg-sky-100 text-sky-800' },
  ok: { label: 'Covered', cls: 'bg-emerald-100 text-emerald-800' },
}

const groupOf = (a: string) => (/Merge into/.test(a) ? 'Merge' : /hub/.test(a) ? 'Hub' : /Update/.test(a) ? 'Update' : /Remove/.test(a) ? 'Remove' : /too early/.test(a) ? 'Too early' : 'Keep')
const GROUP_STYLE: Record<string, string> = {
  Merge: 'bg-sky-100 text-sky-800', Hub: 'bg-sky-100 text-sky-800', Update: 'bg-amber-100 text-amber-800',
  Remove: 'bg-red-100 text-red-800', 'Too early': 'bg-gray-100 text-gray-700', Keep: 'bg-emerald-100 text-emerald-800',
}

function Progress({ done, wip, total }: { done: number; wip: number; total: number }) {
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100" role="img" aria-label={`${done} done, ${wip} in progress, ${total - done - wip} not started`}>
      <div className="bg-emerald-500" style={{ width: `${(done / total) * 100}%` }} />
      <div className="bg-amber-400" style={{ width: `${(wip / total) * 100}%` }} />
    </div>
  )
}

/** A collapsible section card (closed by default; the progress links open it) */
function Section({ id, title, note, meta, intro, tone = 'text-[#062068]', children }: { id: string; title: string; note?: string; meta?: string; intro?: string; tone?: string; children: React.ReactNode }) {
  return (
    <details id={id} className="group rounded-2xl border border-gray-200 bg-white mb-4 scroll-mt-24 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 sm:px-6">
        <span className="min-w-0">
          <span className={`text-lg font-bold ${tone}`}>{title}</span>
          {note && <em className="ml-2 text-sm font-normal text-gray-500">{note}</em>}
          {intro && <span className="block text-sm text-gray-500 mt-1">{intro}</span>}
        </span>
        <span className="flex items-center gap-3 flex-shrink-0">
          {meta && <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-gray-400 whitespace-nowrap">{meta}</span>}
          <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">{children}</div>
    </details>
  )
}

const openSection = (id: string) => {
  const el = document.getElementById(id)
  if (el instanceof HTMLDetailsElement) el.open = true
}

function PostTable({ posts }: { posts: BlogAudit['posts'] }) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const groups = useMemo(() => {
    const m = new Map<string, number>()
    posts.forEach((p) => m.set(groupOf(p.a), (m.get(groupOf(p.a)) || 0) + 1))
    return m
  }, [posts])
  const rows = posts
    .filter((p) => (filter === 'All' || groupOf(p.a) === filter) && (!query || `${p.t} ${p.s} ${p.q}`.toLowerCase().includes(query.toLowerCase())))
    .sort((a, b) => b.im - a.im)
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {['All', ...groups.keys()].map((g) => (
          <button key={g} type="button" onClick={() => setFilter(g)} className={`rounded-full px-3 py-1 text-xs font-semibold ${filter === g ? 'bg-[#062068] text-white' : g === 'All' ? 'bg-white border border-gray-200 text-gray-700' : GROUP_STYLE[g]}`}>
            {g} {g === 'All' ? posts.length : groups.get(g)}
          </button>
        ))}
        <input id="blog-audit-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or search term" aria-label="Search posts" className="ml-auto rounded-lg border border-gray-200 px-3 py-1.5 text-sm w-56 max-w-full" />
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 max-h-[70vh]">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 sticky top-0">
            <tr>
              <th scope="col" className={TH}>Post</th>
              <th scope="col" className={TH}>Action</th>
              <th scope="col" className={THR}>Clicks</th>
              <th scope="col" className={THR}>Impr.</th>
              <th scope="col" className={THR}>Pos.</th>
              <th scope="col" className={THR}>AI</th>
              <th scope="col" className={THR}>Words</th>
              <th scope="col" className={TH}>Top search</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 align-top">
            {rows.map((p) => (
              <tr key={p.s} className="hover:bg-gray-50">
                <td className="px-3 py-2 min-w-[240px]">
                  <a href={`/blog/${p.s}`} target="_blank" rel="noreferrer" className="font-semibold text-gray-900 hover:text-mw-blue-600">{p.t}</a>
                  <div className="text-xs text-gray-400">{p.c} · {p.d}</div>
                </td>
                <td className="px-3 py-2 min-w-[170px]">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${GROUP_STYLE[groupOf(p.a)]}`}>{p.a}</span>
                  {p.g && <div className="text-xs text-gray-400 mt-1 break-all">→ {p.g}</div>}
                </td>
                <td className="px-3 py-2 text-right">{nf(p.cl)}</td>
                <td className="px-3 py-2 text-right">{nf(p.im)}</td>
                <td className="px-3 py-2 text-right">{p.pos ?? '–'}</td>
                <td className="px-3 py-2 text-right">{p.ai || '–'}</td>
                <td className="px-3 py-2 text-right">{nf(p.w)}</td>
                <td className="px-3 py-2 text-xs text-gray-600 min-w-[150px]">{p.q}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default function BlogTab({ data, statuses }: { data: BlogAudit; statuses: StatusMap }) {
  const [live, setLive] = useState<StatusMap>(statuses)
  const onSaved = (id: string, status: ActionStatus) => setLive((s) => ({ ...s, [id]: { status, updatedAt: new Date().toISOString() } }))
  const stateOf = (id: string) => live[id]?.status || 'not-started'
  const all = data.sections.flatMap((s) => s.items)
  const count = (items: typeof all, st: ActionStatus) => items.filter((i) => stateOf(i.id) === st).length

  return (
    <>
      {/* Progress */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 mb-6" aria-label="Progress">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <h2 className="text-lg font-bold text-[#062068]">Progress</h2>
          <p className="text-sm text-gray-600"><b className="text-gray-900">{count(all, 'done')}</b> done · <b className="text-gray-900">{count(all, 'wip')}</b> in progress · {all.length - count(all, 'done') - count(all, 'wip')} not started</p>
        </div>
        <Progress done={count(all, 'done')} wip={count(all, 'wip')} total={all.length} />
        <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {data.sections.map((s) => (
            <li key={s.key}>
              <a href={`#blog-${s.key}`} onClick={() => openSection(`blog-${s.key}`)} className="flex justify-between gap-2 text-sm font-semibold text-gray-900 hover:text-mw-blue-600">
                <span>{s.title}</span><span className="text-gray-500 font-normal whitespace-nowrap">{count(s.items, 'done')}/{s.items.length}</span>
              </a>
              <div className="mt-1"><Progress done={count(s.items, 'done')} wip={count(s.items, 'wip')} total={s.items.length} /></div>
            </li>
          ))}
        </ul>
      </section>

      {/* Headline numbers */}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8" aria-label="Audit headline numbers">
        {data.stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-3xl font-bold text-[#062068]">{s.value}</p>
            <p className="mt-1 text-xs text-gray-500">{s.label}</p>
            {s.prevLabel && (
              <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-xs text-gray-400">
                {s.neutral ? <span className="font-semibold text-gray-500">{s.cur >= s.prev ? '▲' : '▼'} {nf(Math.abs(s.cur - s.prev))}</span> : <Delta cur={s.cur} prev={s.prev} lowerIsBetter={s.lowerIsBetter} />}
                <span>vs {s.prevLabel}</span>
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Findings */}
      <Section id="blog-findings" title="⚠ What we found" tone="text-red-700" meta={`${data.findings.length} findings`}>
        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {data.findings.map((f) => (
            <li key={f.title} className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-red-500" />
              <div><p className="font-semibold text-gray-900 leading-snug">{f.title}</p><p className="text-sm text-gray-600 mt-0.5">{f.detail}</p></div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Buyer questions */}
      <Section id="blog-questions" title="Buyer questions: missing page or weak page?" intro="The questions buyers ask before choosing a DOOH partner, who wins each today, and where we stand." meta={`${data.questions.length} questions`}>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr><th scope="col" className={TH}>Buyer question</th><th scope="col" className={TH}>Monthly searches</th><th scope="col" className={TH}>Wins today</th><th scope="col" className={TH}>Our best page</th><th scope="col" className={TH}>Diagnosis</th><th scope="col" className={TH}>Fix</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100 align-top">
              {data.questions.map((q) => (
                <tr key={q.question}>
                  <td className="px-3 py-2.5 font-semibold text-gray-900 min-w-[200px]">{q.question}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600 min-w-[120px]">{q.demand}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600 min-w-[130px]">{q.winner}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600 min-w-[140px]">
                    {q.oursLinks?.length ? q.oursLinks.map((l, n) => (
                      <span key={l.href}>{n > 0 && ', '}<a href={l.href} target="_blank" rel="noreferrer" className="font-semibold text-mw-blue-600 hover:underline">{l.label}</a></span>
                    )) : q.ours}
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap"><span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${DIAGNOSIS[q.diagnosis]?.cls}`}>{DIAGNOSIS[q.diagnosis]?.label}</span></td>
                  <td className="px-3 py-2.5 text-xs text-gray-700 min-w-[180px]">{q.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Action sections */}
      {data.sections.map((s) => (
        <Section key={s.key} id={`blog-${s.key}`} title={`→ ${s.title}`} note={s.note} intro={s.intro} meta={`${s.when} · ${count(s.items, 'done')}/${s.items.length} done`}>
          <ActionList actions={s.items} initial={statuses} onSaved={onSaved} />
        </Section>
      ))}

      <h2 className="text-lg font-bold text-[#062068] mb-3 mt-8">Details</h2>
      <Details title="All blog posts with their recommended action" summary={`${data.posts.length} posts · last 12 months of Google clicks, impressions, position and AI-assistant visits`}>
        <PostTable posts={data.posts} />
      </Details>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-2">How this audit was done</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
          {data.method.map((m) => <li key={m}>{m}</li>)}
        </ul>
      </section>
    </>
  )
}
