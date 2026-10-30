'use client'

// Building blocks shared by the /internal-insights tabs
import { useState } from 'react'

export type Priority = 'High' | 'Medium' | 'Low'
export interface Finding { title: string; detail: string; page?: string }
/** Any tab's action item. `id` must be stable across refreshes: it keys the shared status. */
/** `highlight`: a sub-item that needs attention (shown in an amber box) */
export interface ActionSubItem { label: string; href?: string; note?: string; highlight?: string }
/** `owner`: who it's assigned to; `flag`: a short warning shown under the title */
export interface Action { id: string; priority: Priority; category: string; title: string; detail: string; page?: string; owner?: string; flag?: string; items?: ActionSubItem[] }

export const nf = (n: number) => Math.round(n).toLocaleString('en-US')
export const pct = (n: number, d = 1) => `${(n * 100).toFixed(d)}%`
export const fmtDate = (s: string) => new Date(s + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

export const PRIORITY_STYLE: Record<Priority, string> = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-amber-100 text-amber-800',
  Low: 'bg-gray-100 text-gray-700',
}

/** Change vs previous period. `lowerIsBetter` flips the colour; `points` shows percentage-point change for rates. */
export function Delta({ cur, prev, lowerIsBetter = false, points = false }: { cur: number; prev: number; lowerIsBetter?: boolean; points?: boolean }) {
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

/** Small ⓘ that explains a metric on hover or keyboard focus */
function InfoTip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex align-middle">
      <span tabIndex={0} aria-label={text} className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-gray-300 text-[10px] font-bold normal-case text-gray-400 hover:border-gray-500 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#062068]">i</span>
      <span role="tooltip" className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 hidden w-60 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-normal normal-case leading-relaxed tracking-normal text-white shadow-lg group-hover:block group-focus-within:block">
        {text}
      </span>
    </span>
  )
}

export function Kpi({ label, value, cur, prev, share, note, info, lowerIsBetter, points, hideDelta }: { label: string; value: string; cur: number; prev: number; share?: string; note?: string; info?: string; lowerIsBetter?: boolean; points?: boolean; hideDelta?: boolean }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">{label}{info && <InfoTip text={info} />}</p>
      <p className="mt-2 text-3xl font-bold text-[#062068]">{value}</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-2">
        {!hideDelta && <Delta cur={cur} prev={prev} lowerIsBetter={lowerIsBetter} points={points} />}
        {share && <span className="text-xs text-gray-400">· {share} of whole site</span>}
        {note && <span className="text-xs text-gray-400">· {note}</span>}
      </div>
    </div>
  )
}

export function FindingList({ title, items, tone }: { title: string; items: Finding[]; tone: 'good' | 'bad' }) {
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

export function Details({ title, summary, children }: { title: string; summary: string; children: React.ReactNode }) {
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

export type ActionStatus = 'not-started' | 'wip' | 'done'
export type StatusMap = Record<string, { status: ActionStatus; updatedAt: string }>
const STATUS_BUTTONS: { key: ActionStatus; label: string; on: string }[] = [
  { key: 'not-started', label: 'Not started', on: 'bg-gray-700 text-white' },
  { key: 'wip', label: 'WIP', on: 'bg-amber-500 text-white' },
  { key: 'done', label: 'Done', on: 'bg-emerald-600 text-white' },
]

/** Action items with a shared status (saved server-side, visible to everyone). Done items sink to the bottom. */
export function ActionList({ actions, initial, onSaved }: { actions: Action[]; initial: StatusMap; onSaved?: (id: string, status: ActionStatus) => void }) {
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
    } else onSaved?.(id, status)
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
                      {a.owner && <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-800">Assigned to: {a.owner}</span>}
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
                {a.flag && <p className="mt-1.5 inline-flex rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">⚑ {a.flag}</p>}
                {a.items && a.items.length > 0 && (
                  <details className="mt-2 text-sm">
                    <summary className="cursor-pointer text-xs font-semibold text-mw-blue-600">Show {a.items.length} page{a.items.length > 1 ? 's' : ''}{a.items.some((x) => x.highlight) ? ' (incl. flagged)' : ''}</summary>
                    <ul className="mt-2 space-y-1.5 border-l-2 border-gray-100 pl-3">
                      {a.items.map((x, n) => (
                        <li key={`${x.label}-${n}`} className="leading-snug">
                          {x.href ? <a href={x.href} target="_blank" rel="noreferrer" className="text-gray-800 hover:text-mw-blue-600">{x.label}</a> : <span className="font-mono text-xs text-gray-700 break-all">{x.label}</span>}
                          {x.note && <span className="block text-xs text-gray-400">{x.note}</span>}
                          {x.highlight && <span className="mt-1 block rounded-md border border-amber-200 bg-amber-50 px-2 py-1.5 text-xs text-amber-900">⚑ {x.highlight}</span>}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
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

export const TH = 'px-3 py-2.5 font-semibold text-left'
export const THR = 'px-3 py-2.5 font-semibold text-right'
