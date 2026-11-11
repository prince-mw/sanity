'use client'

// The creator's editor: reorder, remove, reword each site's reason, add sites
// from the market (or from the browser shortlist), tweak the brief and have
// Claude pick again, then publish a version. The client's link shows the
// latest version. Rif, 11 Nov 2026.

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowDown, ArrowUp, Plus, X } from 'lucide-react'
import { SG_NAVY, SgSectionHeading } from '../SingaporeShared'
import { SampleTag } from '../inventory/InventoryShared'
import { useShortlist } from '@/lib/proposal/shortlist'
import { OBJECTIVES, DURATIONS } from '@/lib/proposal/markets'
import type { PublicSite } from '@/lib/inventory/types'
import type { ProposalView as View, Objective } from '@/lib/proposal/types'

type Row = { siteId: string; reason: string }
const input = 'mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-mw-blue-500 focus:outline-none'
const chip = (on: boolean) => `mw-tap rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#2563eb]'}`

export function ProposalEditor({ view, candidates, demo = false }: { view: View; candidates: PublicSite[]; demo?: boolean }) {
  const router = useRouter()
  const { doc, version } = view
  const byId = useMemo(() => new Map(candidates.map(s => [s.id, s])), [candidates])
  const [rows, setRows] = useState<Row[]>(view.sites.map(s => ({ siteId: s.id, reason: s.reason })))
  const [summary, setSummary] = useState(version.summary)
  const [format, setFormat] = useState('All')
  const [briefOpen, setBriefOpen] = useState(false)
  const [objective, setObjective] = useState<Objective | null>(doc.brief.objective)
  const [audience, setAudience] = useState(doc.brief.audience)
  const [duration, setDuration] = useState<number | null>(doc.brief.durationWeeks)
  const [count, setCount] = useState(doc.brief.targetSites)
  const [busy, setBusy] = useState<'publish' | 'rerun' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const { items: shortlist } = useShortlist()

  const inPlan = new Set(rows.map(r => r.siteId))
  const formats = useMemo(() => Array.from(new Set(candidates.map(s => s.displayFormat ?? s.format ?? 'Other'))).sort(), [candidates])
  const available = candidates.filter(s => !inPlan.has(s.id) && (format === 'All' || (s.displayFormat ?? s.format ?? 'Other') === format))
  const quick = shortlist.filter(i => byId.has(i.id) && !inPlan.has(i.id))
  const dirty = JSON.stringify(rows) !== JSON.stringify(view.sites.map(s => ({ siteId: s.id, reason: s.reason }))) || summary !== version.summary

  const move = (i: number, d: -1 | 1) => setRows(r => { const n = [...r]; const j = i + d; if (j < 0 || j >= n.length) return r; [n[i], n[j]] = [n[j], n[i]]; return n })
  const add = (s: PublicSite) => setRows(r => r.some(x => x.siteId === s.id) ? r : [...r, { siteId: s.id, reason: '' }])

  const post = async (body: unknown, mode: 'publish' | 'rerun') => {
    if (demo) { setError('This is the sample proposal: changes are not saved. On a real proposal this publishes a new version at the same link.'); return }
    setBusy(mode); setError(null)
    const r = await fetch(`/api/proposals/${doc.shareId}/versions`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    setBusy(null)
    if (!r || !r.ok) { setError(j?.error ?? 'Something went wrong. Please try again.'); return }
    router.refresh()
    router.push(`/proposals/${doc.shareId}`)
  }
  const publish = () => post({ sites: rows, summary }, 'publish')
  const rerun = () => post({ rerun: true, pinnedIds: rows.map(r => r.siteId), brief: { objective, audience, durationWeeks: duration, targetSites: count } }, 'rerun')
  const copy = async () => { try { await navigator.clipboard.writeText(`${location.origin}/proposals/${doc.shareId}`); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* no clipboard */ } }

  return (
    <div className="bg-white text-gray-900">
      <section className={`${SG_NAVY} text-white mw-hero-top pb-8`}>
        <div className="mw-container">
          <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Editing · currently v{version.n}</span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">{doc.titleLine}</h1>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/proposals/${doc.shareId}`} className="mw-tap inline-flex items-center rounded-lg bg-white px-5 py-2.5 font-semibold text-[#2563eb] hover:bg-cyan-50">View as the client sees it</Link>
            <button type="button" onClick={copy} className="mw-tap inline-flex items-center rounded-lg border-2 border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10">{copied ? 'Link copied' : 'Copy client link'}</button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 mw-section">
        <div className="mw-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SgSectionHeading title="Sites in this proposal" intro="Reorder, remove, or reword why each site is there. Publishing makes a new version at the same link." />
            <ol className="space-y-3">
              {rows.map((r, i) => { const s = byId.get(r.siteId); if (!s) return null; return (
                <li key={r.siteId} className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-3">
                  <span className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">{s.photos[0] && <Image src={s.photos[0]} alt="" fill sizes="112px" className="object-cover" />}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-bold">{i + 1}. {s.name} {s.sample && <SampleTag className="ml-1 align-middle" />}</p>
                        <p className="text-xs text-gray-500">{[s.displayFormat ?? s.format, s.areaName].filter(Boolean).join(' · ')}</p>
                      </div>
                      <div className="flex flex-shrink-0 gap-1">
                        <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="mw-tap rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"><ArrowUp className="h-4 w-4" aria-hidden="true" /></button>
                        <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1} aria-label="Move down" className="mw-tap rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"><ArrowDown className="h-4 w-4" aria-hidden="true" /></button>
                        <button type="button" onClick={() => setRows(x => x.filter(y => y.siteId !== r.siteId))} aria-label={`Remove ${s.name}`} className="mw-tap rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"><X className="h-4 w-4" aria-hidden="true" /></button>
                      </div>
                    </div>
                    <label className="mt-2 block"><span className="sr-only">Why this site</span>
                      <input value={r.reason} maxLength={200} placeholder="Why this site (one line)" onChange={e => setRows(x => x.map(y => y.siteId === r.siteId ? { ...y, reason: e.target.value } : y))} className={input} />
                    </label>
                  </div>
                </li>
              ) })}
            </ol>
            {rows.length === 0 && <p className="text-sm text-red-600">Keep at least one site.</p>}

            <label className="mt-6 block"><span className="text-sm font-semibold text-gray-700">Campaign summary</span>
              <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={4} maxLength={700} className={input} />
            </label>

            {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="button" onClick={publish} disabled={busy !== null || rows.length === 0 || !dirty} className="mw-tap inline-flex items-center rounded-lg bg-[#2563eb] px-6 py-3 font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50">{busy === 'publish' ? 'Publishing…' : `Publish as v${version.n + 1}`}</button>
              <span className="text-sm text-gray-500">{dirty ? 'Unpublished changes.' : 'No changes yet.'}</span>
            </div>

            <details className="mt-8 rounded-2xl border border-gray-200 bg-white p-5" open={briefOpen} onToggle={e => setBriefOpen((e.target as HTMLDetailsElement).open)}>
              <summary className="cursor-pointer font-bold text-[#2563eb]">Change the brief and pick again</summary>
              <p className="mt-1 text-sm text-gray-600">The sites above are kept; the rest of the plan is re-picked for the new brief.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-semibold text-gray-700">Objective</span>
                  <select value={objective ?? ''} onChange={e => setObjective((e.target.value || null) as Objective | null)} className={input}>
                    <option value="">Not stated</option>{OBJECTIVES.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
                <label className="block"><span className="text-sm font-semibold text-gray-700">Duration</span>
                  <select value={duration ?? ''} onChange={e => setDuration(e.target.value ? Number(e.target.value) : null)} className={input}>
                    <option value="">Not stated</option>{DURATIONS.map(d => <option key={d} value={d}>{d} weeks</option>)}
                  </select>
                </label>
                <label className="block sm:col-span-2"><span className="text-sm font-semibold text-gray-700">Audience</span>
                  <textarea value={audience} onChange={e => setAudience(e.target.value)} rows={2} maxLength={600} className={input} />
                </label>
                <label className="block"><span className="text-sm font-semibold text-gray-700">Number of sites</span>
                  <input type="number" min={2} max={12} value={count} onChange={e => setCount(Number(e.target.value))} className={input} />
                </label>
              </div>
              <button type="button" onClick={rerun} disabled={busy !== null} className="mw-tap mt-4 inline-flex items-center rounded-lg border-2 border-[#2563eb] bg-white px-5 py-2.5 font-semibold text-[#2563eb] hover:bg-mw-blue-50 disabled:opacity-50">{busy === 'rerun' ? 'Picking sites…' : `Pick again and publish as v${version.n + 1}`}</button>
            </details>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-bold text-[#2563eb]">Add sites</h2>
              {quick.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">From your shortlist</p>
                  <ul className="mt-2 space-y-2">
                    {quick.map(i => { const s = byId.get(i.id)!; return (
                      <li key={i.id} className="flex items-center gap-3">
                        <span className="min-w-0 flex-1 truncate text-sm font-semibold">{s.name}</span>
                        <button type="button" onClick={() => add(s)} className="mw-tap inline-flex items-center gap-1 rounded-full border border-[#2563eb] px-3 py-1 text-xs font-semibold text-[#2563eb] hover:bg-mw-blue-50"><Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add</button>
                      </li>
                    ) })}
                  </ul>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {['All', ...formats].map(f => <button key={f} type="button" aria-pressed={format === f} onClick={() => setFormat(f)} className={chip(format === f)}>{f}</button>)}
              </div>
              <ul className="mt-3 max-h-[32rem] space-y-2 overflow-y-auto pr-1">
                {available.map(s => (
                  <li key={s.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-2">
                    <span className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">{s.photos[0] && <Image src={s.photos[0]} alt="" fill sizes="64px" className="object-cover" />}</span>
                    <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{s.name}</span><span className="block text-xs text-gray-500">{[s.displayFormat ?? s.format, s.areaName].filter(Boolean).join(' · ')}{s.audience?.impressions ? ` · ${s.audience.impressions}/mo` : ''}</span></span>
                    <button type="button" onClick={() => add(s)} aria-label={`Add ${s.name}`} className="mw-tap inline-flex items-center gap-1 rounded-full border border-[#2563eb] px-3 py-1 text-xs font-semibold text-[#2563eb] hover:bg-mw-blue-50"><Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add</button>
                  </li>
                ))}
                {available.length === 0 && <li className="text-sm text-gray-500">Every site in this format is already in the plan.</li>}
              </ul>
            </div>
            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
              <h3 className="font-bold text-[#2563eb]">Versions</h3>
              <ul className="mt-2 space-y-1">
                {[...doc.versions].sort((a, b) => b.n - a.n).map(v => <li key={v.n} className={v.n === version.n ? 'font-semibold text-gray-900' : ''}>v{v.n} · {new Date(v.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · {v.sites.length} sites · {v.source}</li>)}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
