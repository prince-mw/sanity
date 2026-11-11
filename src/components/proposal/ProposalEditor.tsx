'use client'

// The creator's editor (Rif, 11 Nov 2026):
//   1. Sites in this proposal — grouped by city, reorder / remove, the reason
//      as text with an Edit link, publish a version.
//   2. Add sites — the full location-page browser: country and city chips
//      (on-request cities ask the team), format and venue filters, map, cards.
//   3. What the client can add — tiers preview, suggestions and add-ons with
//      "show to client" switches.
//   4. Change the brief — update this proposal (new version) or start a new
//      proposal from the brief (new link, this one untouched).
// The demo editor renders all of it; nothing is saved there.

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowDown, ArrowUp, Check, Plus, X } from 'lucide-react'
import { SG_NAVY, SgSectionHeading } from '../SingaporeShared'
import { SampleTag, SiteGrid } from '../inventory/InventoryShared'
import { useShortlist } from '@/lib/proposal/shortlist'
import { OBJECTIVES, DURATIONS, BUDGET_BANDS, cityNameOf, marketOf } from '@/lib/proposal/markets'
import { ADDONS } from '@/lib/proposal/addons'
import type { PublicSite } from '@/lib/inventory/types'
import type { ProposalView as View, Objective } from '@/lib/proposal/types'

type Row = { siteId: string; reason: string }
const input = 'mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-mw-blue-500 focus:outline-none'
const chip = (on: boolean) => `mw-tap rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#2563eb]'}`
const num = (n: number | null) => n == null ? null : n.toLocaleString('en-US')

export function ProposalEditor({ view, candidates, demo = false }: { view: View; candidates: PublicSite[]; demo?: boolean }) {
  const router = useRouter()
  const { doc, version, tiers, suggestions, cities } = view
  const market = marketOf(doc.brief.countrySlug)
  const byId = useMemo(() => new Map(candidates.map(s => [s.id, s])), [candidates])
  const [rows, setRows] = useState<Row[]>(view.sites.map(s => ({ siteId: s.id, reason: s.reason })))
  const [editing, setEditing] = useState<string | null>(null)
  const [summary, setSummary] = useState(version.summary)
  const [city, setCity] = useState<string>('all')
  const [hidden, setHidden] = useState(doc.hidden ?? { suggestions: [], addons: [] })
  const [hiddenSaved, setHiddenSaved] = useState(true)
  const [objective, setObjective] = useState<Objective | null>(doc.brief.objective)
  const [audience, setAudience] = useState(doc.brief.audience)
  const [industry, setIndustry] = useState(doc.brief.industry)
  const [duration, setDuration] = useState<number | null>(doc.brief.durationWeeks)
  const [budget, setBudget] = useState<string | null>(doc.brief.budgetBand)
  const [count, setCount] = useState(doc.brief.targetSites)
  const [briefCities, setBriefCities] = useState<string[]>(doc.brief.cities)
  const [countryWide, setCountryWide] = useState(doc.brief.countryWide)
  const [keepSites, setKeepSites] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [requested, setRequested] = useState<string[]>(doc.cityRequests.map(r => r.citySlug))
  const { items: shortlist } = useShortlist()

  const inPlan = new Set(rows.map(r => r.siteId))
  const cityGroups = Array.from(new Set(rows.map(r => byId.get(r.siteId)?.citySlug).filter(Boolean) as string[])).map(slug => ({ slug, name: cityNameOf(doc.brief.countrySlug, slug), count: rows.filter(r => byId.get(r.siteId)?.citySlug === slug).length }))
  const browse = candidates.filter(s => city === 'all' || s.citySlug === city)
  const quick = shortlist.filter(i => byId.has(i.id) && !inPlan.has(i.id))
  const dirty = JSON.stringify(rows) !== JSON.stringify(view.sites.map(s => ({ siteId: s.id, reason: s.reason }))) || summary !== version.summary
  const demoNote = 'This is the sample proposal: nothing is saved here. On a real proposal this works as described.'

  const move = (i: number, d: -1 | 1) => setRows(r => { const n = [...r]; const j = i + d; if (j < 0 || j >= n.length) return r; [n[i], n[j]] = [n[j], n[i]]; return n })
  const add = (s: PublicSite) => setRows(r => r.some(x => x.siteId === s.id) ? r : [...r, { siteId: s.id, reason: '' }])
  const toggle = (s: PublicSite) => inPlan.has(s.id) ? setRows(r => r.filter(x => x.siteId !== s.id)) : add(s)

  const call = async (path: string, body: unknown, key: string): Promise<Record<string, unknown> | null> => {
    if (demo) { setError(demoNote); return null }
    setBusy(key); setError(null); setNote(null)
    const r = await fetch(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    setBusy(null)
    if (!r || !r.ok) { setError(j?.error ?? 'Something went wrong. Please try again.'); return null }
    return j ?? {}
  }
  const toClient = () => { router.refresh(); router.push(`/proposals/${doc.shareId}`) }
  const publish = async () => { if (await call(`/api/proposals/${doc.shareId}/versions`, { sites: rows, summary }, 'publish')) toClient() }
  const briefPatch = () => ({ objective, audience, industry, durationWeeks: duration, budgetBand: budget, targetSites: count, cities: briefCities, countryWide })
  const rerun = async () => { if (await call(`/api/proposals/${doc.shareId}/versions`, { rerun: true, pinnedIds: keepSites ? rows.map(r => r.siteId) : [], brief: briefPatch() }, 'rerun')) toClient() }
  const fork = async () => { const j = await call(`/api/proposals/${doc.shareId}/fork`, { brief: briefPatch(), keepSites }, 'fork'); if (j?.shareId) router.push(`/proposals/${j.shareId}/edit`) }
  const saveHidden = async () => { if (await call(`/api/proposals/${doc.shareId}/settings`, { hidden }, 'hidden')) { setHiddenSaved(true); setNote('Saved. The client page shows only what is switched on.') } }
  const requestCity = async (slug: string) => { if (demo) { setRequested(r => [...r, slug]); return } if (await call(`/api/proposals/${doc.shareId}/request-city`, { citySlug: slug }, `city-${slug}`)) setRequested(r => [...r, slug]) }
  const copy = async () => { try { await navigator.clipboard.writeText(`${location.origin}/proposals/${doc.shareId}`); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* no clipboard */ } }
  const flip = (kind: 'suggestions' | 'addons', id: string) => { setHidden(h => ({ ...h, [kind]: h[kind].includes(id) ? h[kind].filter(x => x !== id) : [...h[kind], id] })); setHiddenSaved(false) }

  return (
    <div className="bg-white text-gray-900">
      <section className={`${SG_NAVY} text-white mw-hero-top pb-8`}>
        <div className="mw-container">
          <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Editing · currently v{version.n}</span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{doc.titleLine}</h1>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/proposals/${doc.shareId}`} className="mw-tap inline-flex items-center rounded-lg bg-white px-5 py-2.5 font-semibold text-[#2563eb] hover:bg-cyan-50">View as the client sees it</Link>
            <button type="button" onClick={copy} className="mw-tap inline-flex items-center rounded-lg border-2 border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10">{copied ? 'Link copied' : 'Copy client link'}</button>
            <Link href="/proposals/mine" className="mw-tap inline-flex items-center rounded-lg border-2 border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10">Your proposals</Link>
          </div>
        </div>
      </section>

      {/* 1. The plan */}
      <section className="bg-gray-50 mw-section">
        <div className="mw-container">
          <SgSectionHeading title="Sites in this proposal" intro="Reorder or remove sites; the line under each is what the client reads. Publishing makes a new version at the same link; older versions stay listed." />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {cityGroups.map(g => (
                <div key={g.slug} className="mb-6 last:mb-0">
                  {cityGroups.length > 1 && (
                    <div className="mb-2 flex items-center justify-between gap-3 border-b border-gray-200 pb-2">
                      <h3 className="font-bold text-[#2563eb]">{g.name} <span className="font-normal text-gray-500">· {g.count} {g.count === 1 ? 'site' : 'sites'}</span></h3>
                      <button type="button" onClick={() => setRows(x => x.filter(y => byId.get(y.siteId)?.citySlug !== g.slug))} className="mw-tap rounded-lg px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50">Remove {g.name}</button>
                    </div>
                  )}
                  <ol className="space-y-3">
                    {rows.map((r, i) => { const s = byId.get(r.siteId); if (!s || s.citySlug !== g.slug) return null; return (
                      <li key={r.siteId} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4">
                        <span className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">{s.photos[0] && <Image src={s.photos[0]} alt="" fill sizes="112px" className="object-cover" />}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate font-bold">{i + 1}. {s.name} {s.sample && <SampleTag className="ml-1 align-middle" />}</p>
                              <p className="text-xs text-gray-500">{[s.displayFormat ?? s.format, s.areaName].filter(Boolean).join(' · ')}{s.audience?.impressions ? ` · ${s.audience.impressions} impressions / mo` : ''}</p>
                            </div>
                            <div className="flex flex-shrink-0 gap-1">
                              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="mw-tap rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"><ArrowUp className="h-4 w-4" aria-hidden="true" /></button>
                              <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1} aria-label="Move down" className="mw-tap rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"><ArrowDown className="h-4 w-4" aria-hidden="true" /></button>
                              <button type="button" onClick={() => setRows(x => x.filter(y => y.siteId !== r.siteId))} aria-label={`Remove ${s.name}`} className="mw-tap rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"><X className="h-4 w-4" aria-hidden="true" /></button>
                            </div>
                          </div>
                          {editing === r.siteId ? (
                            <label className="mt-2 block"><span className="text-xs font-semibold text-gray-500">Why this site, as the client reads it</span>
                              <input autoFocus value={r.reason} maxLength={200} placeholder="One line" onBlur={() => setEditing(null)} onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') setEditing(null) }} onChange={e => setRows(x => x.map(y => y.siteId === r.siteId ? { ...y, reason: e.target.value } : y))} className={input} />
                            </label>
                          ) : (
                            <p className="mt-2 text-sm text-gray-700">
                              {r.reason || <span className="italic text-gray-400">No reason yet.</span>}{' '}
                              <button type="button" onClick={() => setEditing(r.siteId)} className="mw-tap !inline !min-h-0 !min-w-0 align-baseline text-xs font-semibold text-[#2563eb] hover:underline">Edit</button>
                            </p>
                          )}
                        </div>
                      </li>
                    ) })}
                  </ol>
                </div>
              ))}
              {rows.length === 0 && <p className="text-sm text-red-600">Keep at least one site.</p>}
            </div>
            <div className="lg:col-span-4">
              <label className="block"><span className="text-sm font-semibold text-gray-700">Campaign summary</span>
                <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={7} maxLength={700} className={input} />
              </label>
              <div className="mt-5 flex flex-col gap-3">
                <button type="button" onClick={publish} disabled={busy !== null || rows.length === 0 || !dirty} className="mw-tap inline-flex items-center justify-center rounded-lg bg-[#2563eb] px-6 py-3 font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50">{busy === 'publish' ? 'Publishing…' : `Publish as v${version.n + 1}`}</button>
                <span className="text-sm text-gray-500">{dirty ? 'Unpublished changes.' : 'No changes yet.'}</span>
              </div>
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
                <h3 className="font-bold text-[#2563eb]">Versions</h3>
                <ul className="mt-2 space-y-1">
                  {[...doc.versions].sort((a, b) => b.n - a.n).map(v => <li key={v.n} className={v.n === version.n ? 'font-semibold text-gray-900' : ''}>v{v.n} · {new Date(v.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · {v.sites.length} sites · {v.source}</li>)}
                </ul>
                {doc.derivedFrom && <p className="mt-3 text-xs">Started from <Link href={`/proposals/${doc.derivedFrom}/edit`} className="font-semibold text-[#2563eb] hover:underline">an earlier proposal</Link>.</p>}
              </div>
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
        </div>
      </section>

      {/* 2. Add sites: the location-page browser */}
      <section className="bg-white mw-section">
        <div className="mw-container">
          <SgSectionHeading title="Add sites" intro="Browse the market the way the location pages do. Add a site and it joins the plan above; publish when you are done." />
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-semibold text-gray-500">{market?.countryName ?? 'Country'}</span>
            <button type="button" aria-pressed={city === 'all'} onClick={() => setCity('all')} className={chip(city === 'all')}>All cities</button>
            {(market?.cities ?? []).map(c => c.available
              ? <button key={c.slug} type="button" aria-pressed={city === c.slug} onClick={() => setCity(c.slug)} className={chip(city === c.slug)}>{c.name}</button>
              : <button key={c.slug} type="button" disabled={requested.includes(c.slug) || busy === `city-${c.slug}`} onClick={() => requestCity(c.slug)} className={`${chip(false)} disabled:opacity-60`}>{requested.includes(c.slug) ? `${c.name} · requested` : `${c.name} · request`}</button>)}
          </div>
          {quick.length > 0 && (
            <div className="mb-5 rounded-2xl border border-mw-blue-100 bg-mw-blue-50/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-mw-blue-600">From your shortlist</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {quick.map(i => { const s = byId.get(i.id)!; return (
                  <li key={i.id}><button type="button" onClick={() => add(s)} className="mw-tap inline-flex items-center gap-1 rounded-full border border-[#2563eb] bg-white px-3 py-1.5 text-xs font-semibold text-[#2563eb] hover:bg-mw-blue-50"><Plus className="h-3.5 w-3.5" aria-hidden="true" /> {s.name}</button></li>
                ) })}
              </ul>
            </div>
          )}
          <SiteGrid sites={browse} hasPage={() => false} mapTitle={`Map of sites in ${city === 'all' ? (market?.countryName ?? 'the market') : cityNameOf(doc.brief.countrySlug, city)}`}
            renderAction={s => { const on = inPlan.has(s.id); return (
              <button type="button" onClick={() => toggle(s)} aria-pressed={on} className={`mw-tap inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]'}`}>
                {on ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" aria-hidden="true" />}{on ? 'In the plan' : 'Add to plan'}
              </button>
            ) }} />
          {cities.some(c => c.requested) && <p className="mt-4 text-xs text-gray-500">Requested: {cities.filter(c => c.requested).map(c => c.name).join(', ')} — the team builds these by hand.</p>}
        </div>
      </section>

      {/* 3. What the client can add */}
      <section className="bg-gray-50 mw-section">
        <div className="mw-container">
          <SgSectionHeading title="What the client can add" intro="The client page offers three sizes of the plan, suggestions built from what it lacks, more cities, and add-ons. Switch off anything you do not want this client to see." />
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">Plan sizes (always shown)</h3>
          <ul className="mb-8 grid gap-4 sm:grid-cols-3">
            {tiers.map(t => (
              <li key={t.id} className={`rounded-2xl border p-4 ${t.current ? 'border-[#2563eb] bg-white' : 'border-gray-200 bg-white'}`}>
                <p className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">{t.label}{t.current ? ' · current' : ''}</p>
                <p className="mt-1 text-2xl font-bold">{t.totals.sites} {t.totals.sites === 1 ? 'site' : 'sites'}</p>
                <p className="text-sm text-gray-600">{t.totals.reach != null ? `${num(t.totals.reach)} reach` : 'Reach as published'}{t.totals.investment ? ` · ${t.totals.investment.currency} ${num(t.totals.investment.low)} – ${num(t.totals.investment.high)}` : ''}</p>
              </li>
            ))}
          </ul>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">Suggestions</h3>
              {suggestions.length === 0 && <p className="text-sm text-gray-600">Nothing to suggest: the plan already covers the brief.</p>}
              <ul className="space-y-3">
                {suggestions.map(sg => { const on = !hidden.suggestions.includes(sg.id); return (
                  <li key={sg.id} className="flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4">
                    <div className="min-w-0"><p className="font-bold">{sg.title}</p><p className="mt-1 text-sm text-gray-600">{sg.body}</p></div>
                    <Switch on={on} label={`Show "${sg.title}" to the client`} onChange={() => flip('suggestions', sg.id)} />
                  </li>
                ) })}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">Add-ons</h3>
              <ul className="space-y-3">
                {ADDONS.map(a => { const on = !hidden.addons.includes(a.id); return (
                  <li key={a.id} className="flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4">
                    <div className="min-w-0"><p className="font-bold">{a.title}{a.product ? <span className="font-normal text-gray-500"> · {a.product}</span> : ''}</p><p className="mt-1 text-sm text-gray-600">{a.benefit}</p></div>
                    <Switch on={on} label={`Show "${a.title}" to the client`} onChange={() => flip('addons', a.id)} />
                  </li>
                ) })}
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" onClick={saveHidden} disabled={busy !== null || hiddenSaved} className="mw-tap inline-flex items-center rounded-lg bg-[#2563eb] px-6 py-3 font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50">{busy === 'hidden' ? 'Saving…' : 'Save what the client sees'}</button>
            <span className="text-sm text-gray-500">{note ?? (hiddenSaved ? 'Saved.' : 'Unsaved switches.')}</span>
          </div>
        </div>
      </section>

      {/* 4. Change the brief */}
      <section className="bg-white mw-section">
        <div className="mw-container">
          <SgSectionHeading title="Change the brief" intro="Two ways to use a new brief. Update this proposal: the plan is picked again and published as the next version at the same link, with every earlier version still listed. Start a new proposal: a separate link built for the new brief, and this one stays exactly as it is." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <label className="block"><span className="text-sm font-semibold text-gray-700">Budget band <span className="font-normal text-gray-400">(never shown)</span></span>
              <select value={budget ?? ''} onChange={e => setBudget(e.target.value || null)} className={input}>
                <option value="">Not stated</option>{BUDGET_BANDS.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
              </select>
            </label>
            <label className="block sm:col-span-2"><span className="text-sm font-semibold text-gray-700">Audience</span>
              <textarea value={audience} onChange={e => setAudience(e.target.value)} rows={2} maxLength={600} className={input} />
            </label>
            <label className="block"><span className="text-sm font-semibold text-gray-700">Industry</span>
              <input value={industry} onChange={e => setIndustry(e.target.value)} maxLength={80} className={input} />
            </label>
            <label className="block"><span className="text-sm font-semibold text-gray-700">Number of sites</span>
              <input type="number" min={2} max={12} value={count} onChange={e => setCount(Number(e.target.value))} className={input} />
            </label>
            <div className="sm:col-span-2 lg:col-span-3">
              <span className="text-sm font-semibold text-gray-700">Cities</span>
              <div className="mt-2 flex flex-wrap gap-2">
                <button type="button" aria-pressed={countryWide} onClick={() => setCountryWide(w => !w)} className={chip(countryWide)}>Whole of {market?.countryName ?? 'the country'}</button>
                {(market?.cities ?? []).map(c => (
                  <button key={c.slug} type="button" disabled={countryWide} aria-pressed={briefCities.includes(c.slug)} onClick={() => setBriefCities(cs => cs.includes(c.slug) ? (cs.length > 1 ? cs.filter(x => x !== c.slug) : cs) : [...cs, c.slug])} className={`${chip(briefCities.includes(c.slug) || countryWide)} disabled:opacity-60`}>
                    {c.name}{!c.available && <span className="ml-1 font-normal text-gray-400">· on request</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <label className="mt-5 flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={keepSites} onChange={e => setKeepSites(e.target.checked)} className="h-4 w-4 appearance-auto accent-[#2563eb]" style={{ appearance: 'auto' }} />
            Keep the sites currently in the plan; only fill the rest for the new brief
          </label>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={rerun} disabled={busy !== null} className="mw-tap inline-flex items-center justify-center rounded-lg bg-[#2563eb] px-6 py-3 font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50">{busy === 'rerun' ? 'Picking sites…' : `Update this proposal (publish as v${version.n + 1})`}</button>
            <button type="button" onClick={fork} disabled={busy !== null} className="mw-tap inline-flex items-center justify-center rounded-lg border-2 border-[#2563eb] bg-white px-6 py-3 font-semibold text-[#2563eb] hover:bg-mw-blue-50 disabled:opacity-50">{busy === 'fork' ? 'Building…' : 'Start a new proposal from this brief'}</button>
          </div>
          {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
        </div>
      </section>
    </div>
  )
}

function Switch({ on, label, onChange }: { on: boolean; label: string; onChange: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onChange}
      className={`mw-tap relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${on ? 'bg-[#2563eb]' : 'bg-gray-300'}`}>
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}
