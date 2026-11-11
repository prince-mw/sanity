'use client'

// The creator's editor (round 3, Rif, 11 Nov 2026): four tabs, one task each,
// and a sticky publish bar.
//   Plan                 — grouped by city, reorder / remove, the reason as text with Edit, the plan's map beside it; summary and versions read in the hero
//   Add sites            — a filter sidebar like the Moving Walls Market (another city first, then search, city, format, venue), map, cards
// Round 5 (Rif, 11 Nov 2026): no free-text summary box — the brief changes only on the Brief tab, so the scope stays small.
// Round 6 (Rif, 11 Nov 2026): versions in the hero line, the map on the Plan tab, a Details popup per card (audience + specs).
//   Brief                — update this proposal (new version) or start a new proposal from the brief (new link)
//   What the client sees — everything off by default; at most 2 options before approval, 2 offers after
// The demo editor renders all of it; nothing is saved there.

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowDown, ArrowUp, Check, Info, Plus, Search, X } from 'lucide-react'
import { SG_NAVY, SgSectionHeading } from '../SingaporeShared'
import { SampleTag, SiteGrid } from '../inventory/InventoryShared'
import { BrandMap, type MapPin } from '../inventory/BrandMap'
import { SiteDetailsDialog, type SiteInsights } from './SiteDetailsDialog'
import { CreativePanel, type CreativePayload } from './CreativePanel'
import { useShortlist } from '@/lib/proposal/shortlist'
import { OBJECTIVES, DURATIONS, BUDGET_BANDS, cityNameOf as nameOfSlug, marketOf, type Market } from '@/lib/proposal/markets'
import { ADDONS } from '@/lib/proposal/addons'
import { autoShown } from '@/lib/proposal/shown'
import type { PublicSite } from '@/lib/inventory/types'
import type { ProposalView as View, Objective, Creative } from '@/lib/proposal/types'

type Row = { siteId: string; reason: string }
type TabId = 'plan' | 'sites' | 'brief' | 'creative' | 'client'
// Round 7 (Rif, 11 Nov 2026): tabs named by what the user does; the client-options tab is staff-only (visitors get the automatic rule in lib/proposal/shown.ts).
const TABS: { id: TabId; label: string; staff?: boolean }[] = [{ id: 'plan', label: 'Plan' }, { id: 'sites', label: 'Browse sites' }, { id: 'brief', label: 'Plan with AI' }, { id: 'creative', label: 'Client creative' }, { id: 'client', label: 'What the client sees', staff: true }]
const input = 'mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-mw-blue-500 focus:outline-none'
const chip = (on: boolean) => `mw-tap rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#2563eb]'}`
const num = (n: number | null) => n == null ? null : n.toLocaleString('en-US')
const MAX_SHOWN = 2

export function ProposalEditor({ view, candidates, insights = {}, demo = false, staff = false, market: marketProp }: { view: View; candidates: PublicSite[]; insights?: Record<string, SiteInsights>; demo?: boolean; staff?: boolean; market?: Market | null }) {
  const router = useRouter()
  const { doc, version, tiers, suggestions, cities } = view
  const market = marketProp ?? marketOf(doc.brief.countrySlug)
  const cityNameOf = (_country: string, slug: string) => market?.cities.find(c => c.slug === slug)?.name ?? nameOfSlug(_country, slug)
  const byId = useMemo(() => new Map(candidates.map(s => [s.id, s])), [candidates])
  const [tab, setTab] = useState<TabId>('plan')
  const [rows, setRows] = useState<Row[]>(view.sites.map(s => ({ siteId: s.id, reason: s.reason })))
  const [editing, setEditing] = useState<string | null>(null)
  const [detail, setDetail] = useState<PublicSite | null>(null)
  const [city, setCity] = useState<string>('all')
  const [q, setQ] = useState('')
  const [format, setFormat] = useState('all')
  const [venue, setVenue] = useState('all')
  const [shown, setShown] = useState(doc.shown ?? { options: [], postApproval: [] })
  const [shownSaved, setShownSaved] = useState(true)
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
  const [creative, setCreative] = useState<Creative | null>(doc.creative ?? null)
  const [creativeNote, setCreativeNote] = useState<string | null>(null)
  const leadSite = view.sites[0] ?? null
  const { items: shortlist } = useShortlist()

  useEffect(() => {
    const fromHash = () => { const h = location.hash.replace('#', '') as TabId; if (TABS.some(t => t.id === h && (!t.staff || staff))) setTab(h) }
    fromHash(); window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])
  const pickTab = (id: TabId) => { setTab(id); history.replaceState(null, '', `#${id}`); setError(null); setNote(null) }

  const inPlan = new Set(rows.map(r => r.siteId))
  const cityGroups = Array.from(new Set(rows.map(r => byId.get(r.siteId)?.citySlug).filter(Boolean) as string[])).map(slug => ({ slug, name: cityNameOf(doc.brief.countrySlug, slug), count: rows.filter(r => byId.get(r.siteId)?.citySlug === slug).length }))
  const formats = useMemo(() => Array.from(new Set(candidates.map(s => s.displayFormat ?? s.format ?? 'Other'))).sort(), [candidates])
  const venues = useMemo(() => Array.from(new Set(candidates.map(s => s.venueType).filter(Boolean) as string[])).sort(), [candidates])
  const needle = q.trim().toLowerCase()
  const browse = candidates.filter(s => (city === 'all' || s.citySlug === city)
    && (format === 'all' || (s.displayFormat ?? s.format ?? 'Other') === format)
    && (venue === 'all' || s.venueType === venue)
    && (!needle || [s.name, s.areaName, s.address, s.displayFormat, s.format].some(v => v?.toLowerCase().includes(needle))))
  const planPins: MapPin[] = rows.map(r => byId.get(r.siteId)).filter((s): s is PublicSite => !!s && s.lat != null && s.lng != null).map(s => ({ id: s.id, lat: s.lat!, lng: s.lng!, title: s.name, subtitle: [s.displayFormat ?? s.format, s.areaName].filter(Boolean).join(' · ') }))
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  const older = [...doc.versions].filter(v => v.n !== version.n).sort((a, b) => b.n - a.n)
  const filtered = city !== 'all' || format !== 'all' || venue !== 'all' || needle !== ''
  const clearFilters = () => { setCity('all'); setFormat('all'); setVenue('all'); setQ('') }
  const quick = shortlist.filter(i => byId.has(i.id) && !inPlan.has(i.id))
  const dirty = JSON.stringify(rows) !== JSON.stringify(view.sites.map(s => ({ siteId: s.id, reason: s.reason })))
  const demoNote = 'This is the sample proposal: nothing is saved here. On a real proposal this works as described.'

  const move = (i: number, d: -1 | 1) => setRows(r => { const n = [...r]; const j = i + d; if (j < 0 || j >= n.length) return r; [n[i], n[j]] = [n[j], n[i]]; return n })
  const add = (s: PublicSite) => setRows(r => r.some(x => x.siteId === s.id) ? r : [...r, { siteId: s.id, reason: '' }])
  const toggle = (s: PublicSite) => inPlan.has(s.id) ? setRows(r => r.filter(x => x.siteId !== s.id)) : add(s)
  const planButton = (s: PublicSite, size = 'px-3 py-1.5 text-xs') => { const on = inPlan.has(s.id); return (
    <button type="button" onClick={() => toggle(s)} aria-pressed={on} className={`mw-tap inline-flex items-center gap-1.5 rounded-full border font-semibold transition-colors ${size} ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]'}`}>
      {on ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" aria-hidden="true" />}{on ? 'In the plan' : 'Add to plan'}
    </button>
  ) }

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
  const publish = async () => { if (await call(`/api/proposals/${doc.shareId}/versions`, { sites: rows }, 'publish')) toClient() }
  const briefPatch = () => ({ objective, audience, industry, durationWeeks: duration, budgetBand: budget, targetSites: count, cities: briefCities, countryWide })
  const rerun = async () => { if (await call(`/api/proposals/${doc.shareId}/versions`, { rerun: true, pinnedIds: keepSites ? rows.map(r => r.siteId) : [], brief: briefPatch() }, 'rerun')) toClient() }
  const fork = async () => { const j = await call(`/api/proposals/${doc.shareId}/fork`, { brief: briefPatch(), keepSites }, 'fork'); if (j?.shareId) router.push(`/proposals/${j.shareId}/edit`) }
  const saveCreative = async (payload: CreativePayload): Promise<boolean> => {
    if (demo) { setCreativeNote('Saved (demo: this page only).'); return true }
    const j = await call(`/api/proposals/${doc.shareId}/creative`, { creative: payload.creative }, 'creative')
    if (!j?.creative) { setCreativeNote(error ?? 'Could not save.'); return false }
    setCreative(j.creative as Creative); setCreativeNote('Saved. The client page opens with it on the lead site.'); return true
  }
  const saveShown = async () => { if (demo) { setShownSaved(true); setNote('Saved (demo: this page only).'); return } if (await call(`/api/proposals/${doc.shareId}/settings`, { shown }, 'shown')) { setShownSaved(true); setNote('Saved. The client page shows only what is switched on.') } }
  const planCity = async (slug: string) => {
    if (demo) { window.location.assign(`/proposals/demo/edit?cities=${[...cityGroups.map(g => g.slug), slug].join(',')}#plan`); return }
    if (await call(`/api/proposals/${doc.shareId}/versions`, { addCity: slug }, `plan-${slug}`)) window.location.assign(`/proposals/${doc.shareId}/edit#plan`)
  }
  const requestCity = async (slug: string) => { if (demo) { setRequested(r => [...r, slug]); return } if (await call(`/api/proposals/${doc.shareId}/request-city`, { citySlug: slug }, `city-${slug}`)) setRequested(r => [...r, slug]) }
  const copy = async () => { try { await navigator.clipboard.writeText(`${location.origin}/proposals/${doc.shareId}`); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* no clipboard */ } }

  // What the client sees: an allow-list with a cap of 2 per list.
  const flip = (list: 'options' | 'postApproval', id: string) => {
    const has = shown[list].includes(id)
    if (!has && shown[list].length >= MAX_SHOWN) { setNote(`At most ${MAX_SHOWN} ${list === 'options' ? 'options before approval' : 'offers after approval'}. Switch one off first.`); return }
    setNote(null); setShownSaved(false)
    setShown({ ...shown, [list]: has ? shown[list].filter(x => x !== id) : [...shown[list], id] })
  }
  type Candidate = { id: string; group: string; title: string; detail: string }
  // Smallest ask first (Rif, 11 Nov 2026): a service on request, a longer run, then sites, then the bigger plan.
  const askRank = (id: string) => id === 'smaller' ? 0 : ADDONS.some(a => a.id === id && a.price === 'on-request') ? 5 : ADDONS.some(a => a.id === id) ? 10 : id === 'larger' ? 50 : 20 + ((suggestions.find(x => x.id === id)?.delta?.investment?.high ?? 0) / 10000)
  const candidatesForClient: Candidate[] = [
    ...(['smaller', 'larger'] as const).map((id): Candidate | null => { const t = tiers.find(x => x.id === (id === 'smaller' ? 'essentials' : 'full')); return t && !t.current ? { id: id as string, group: 'Plan size', title: id === 'smaller' ? `A smaller plan · ${t.totals.sites} sites` : `A larger plan · ${t.totals.sites} sites`, detail: `${t.totals.reach != null ? `${num(t.totals.reach)} reach` : 'reach as published'}${t.totals.investment ? ` · ${t.totals.investment.currency} ${num(t.totals.investment.low)} – ${num(t.totals.investment.high)}` : ''}` } : null }).filter((x): x is Candidate => !!x),
    ...suggestions.map(s => ({ id: s.id, group: 'Suggestion', title: s.title, detail: s.body })),
    ...ADDONS.map(a => ({ id: a.id, group: 'Add-on', title: `${a.title}${a.product ? ` · ${a.product}` : ''}`, detail: a.benefit })),
  ].sort((a, b) => askRank(a.id) - askRank(b.id))
  const titleOf = (id: string) => candidatesForClient.find(c => c.id === id)?.title ?? id
  const auto = autoShown(doc.brief, suggestions, tiers)
  const overridden = shown.options.length > 0 || shown.postApproval.length > 0

  return (
    <div className="bg-white text-gray-900 pb-24">
      <section className={`${SG_NAVY} text-white mw-hero-top pb-6`}>
        <div className="mw-container">
          <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">Editing · v{version.n} · {fmtDate(version.createdAt)} · {version.sites.length} {version.sites.length === 1 ? 'site' : 'sites'} · {version.source}</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{doc.titleLine}</h1>
          {version.summary && <p className="mt-3 max-w-3xl text-blue-100">{version.summary}</p>}
          {(older.length > 0 || doc.derivedFrom) && (
            <p className="mt-3 text-sm text-blue-100/80">
              {older.length > 0 && <>Earlier: {older.map(v => `v${v.n} · ${fmtDate(v.createdAt)} · ${v.sites.length} ${v.sites.length === 1 ? 'site' : 'sites'}`).join(' — ')}</>}
              {doc.derivedFrom && <>{older.length > 0 ? ' · ' : ''}Started from <Link href={`/proposals/${doc.derivedFrom}/edit`} className="font-semibold text-white underline">an earlier proposal</Link></>}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/proposals/${doc.shareId}`} className="mw-tap inline-flex items-center rounded-lg bg-white px-5 py-2.5 font-semibold text-[#2563eb] hover:bg-cyan-50">View as the client sees it</Link>
            <button type="button" onClick={copy} className="mw-tap inline-flex items-center rounded-lg border-2 border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10">{copied ? 'Link copied' : 'Copy client link'}</button>
            <Link href="/proposals/mine" className="mw-tap inline-flex items-center rounded-lg border-2 border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10">Your proposals</Link>
          </div>
          <div role="tablist" aria-label="Editor" className="mt-6 flex gap-1 overflow-x-auto border-b border-white/15">
            {TABS.filter(t => !t.staff || staff).map(t => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} aria-controls={`edit-${t.id}`} id={`edittab-${t.id}`} onClick={() => pickTab(t.id)}
                className={`mw-tap -mb-px whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold ${tab === t.id ? 'border-cyan-300 text-white' : 'border-transparent text-blue-100/80 hover:text-white'}`}>{t.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Plan */}
      <section id="edit-plan" role="tabpanel" aria-labelledby="edittab-plan" className={`bg-gray-50 mw-section ${tab === 'plan' ? '' : 'hidden'}`}>
        <div className="mw-container">
          <SgSectionHeading title="Sites in this proposal" intro="Reorder or remove sites; the line under each is what the client reads. The summary above is written from the brief; change the brief on its tab. Publish when you are done." />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
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
            <div className="order-first lg:order-none lg:col-span-5">
              <div className="lg:sticky lg:top-6">
                {tab === 'plan' && planPins.length > 0
                  ? <BrandMap pins={planPins} title={`Map of the sites in this proposal`} className="h-64 sm:h-80 lg:h-[520px]" />
                  : <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-300 text-sm text-gray-500">The map shows the sites in the plan.</div>}
                <p className="mt-2 text-xs text-gray-500">{planPins.length} of {rows.length} on the map</p>
              </div>
            </div>
          </div>
          {error && tab === 'plan' && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
        </div>
      </section>

      {/* Add sites */}
      <section id="edit-sites" role="tabpanel" aria-labelledby="edittab-sites" className={`bg-white mw-section ${tab === 'sites' ? '' : 'hidden'}`}>
        <div className="mw-container">
          <SgSectionHeading title="Add sites" intro="Filter the market on the left; add a site and it joins the plan. Publish from the bar below when you are done." />
          <div className="grid gap-8 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-200 bg-white lg:sticky lg:top-6">
                {(() => { const planned = new Set(cityGroups.map(g => g.slug)); const more = (market?.cities ?? []).filter(c => c.available && !planned.has(c.slug)); const onRequest = (market?.cities ?? []).filter(c => !c.available); return (more.length > 0 || onRequest.length > 0) && (
                  <div className="border-b border-gray-200 bg-mw-blue-50/40 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">Run this brief in another city</p>
                    <p className="mt-1 text-xs text-gray-600">Picked with the same brief and added as its own group with its own sites and figures.</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {more.map(c => <button key={c.slug} type="button" disabled={busy !== null} onClick={() => planCity(c.slug)} className="mw-tap inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60"><Plus className="h-4 w-4" aria-hidden="true" />{busy === `plan-${c.slug}` ? 'Planning…' : `Plan ${c.name}`}</button>)}
                      {onRequest.map(c => <button key={c.slug} type="button" disabled={requested.includes(c.slug) || busy === `city-${c.slug}`} onClick={() => requestCity(c.slug)} className="mw-tap inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-[#2563eb] disabled:opacity-60">{requested.includes(c.slug) ? `${c.name} · requested` : `Request ${c.name}`}</button>)}
                    </div>
                    {requested.length > 0 && <p className="mt-3 text-xs text-gray-600">A planner builds requested cities by hand; they appear as their own group and the client sees them as “requested”.</p>}
                  </div>
                ) })()}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Filter by</h3>
                    {filtered && <button type="button" onClick={clearFilters} className="mw-tap !min-h-0 text-xs font-semibold text-[#2563eb] hover:underline">Clear all</button>}
                  </div>
                  <label className="mt-4 block"><span className="text-xs font-semibold text-gray-500">Search</span>
                    <span className="relative mt-1 block"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                      <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Site, area or address" className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 focus:border-mw-blue-500 focus:outline-none" /></span>
                  </label>
                  <fieldset className="mt-5 border-t border-gray-200 pt-4"><legend className="sr-only">City</legend>
                    <p className="text-xs font-semibold text-gray-500">{market?.countryName ?? 'Country'}</p>
                    <div className="mt-2 flex flex-col gap-1.5">
                      {[{ slug: 'all', name: 'All cities' }, ...(market?.cities ?? []).filter(c => c.available)].map(c => (
                        <label key={c.slug} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"><input type="radio" name="edit-city" value={c.slug} checked={city === c.slug} onChange={() => setCity(c.slug)} className="peer sr-only" /><span aria-hidden="true" className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-gray-300 bg-white peer-checked:border-[5px] peer-checked:border-[#2563eb] peer-focus-visible:ring-2 peer-focus-visible:ring-mw-blue-200" />{c.name}</label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset className="mt-5 border-t border-gray-200 pt-4"><legend className="text-xs font-semibold text-gray-500">Format</legend>
                    <div className="mt-2 flex flex-col gap-1.5">
                      {['all', ...formats].map(f => (
                        <label key={f} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"><input type="radio" name="edit-format" value={f} checked={format === f} onChange={() => setFormat(f)} className="peer sr-only" /><span aria-hidden="true" className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-gray-300 bg-white peer-checked:border-[5px] peer-checked:border-[#2563eb] peer-focus-visible:ring-2 peer-focus-visible:ring-mw-blue-200" />{f === 'all' ? 'All formats' : f}</label>
                      ))}
                    </div>
                  </fieldset>
                  {venues.length > 1 && (
                    <fieldset className="mt-5 border-t border-gray-200 pt-4"><legend className="text-xs font-semibold text-gray-500">Venue type</legend>
                      <div className="mt-2 flex flex-col gap-1.5">
                        {['all', ...venues].map(v => (
                          <label key={v} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"><input type="radio" name="edit-venue" value={v} checked={venue === v} onChange={() => setVenue(v)} className="peer sr-only" /><span aria-hidden="true" className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-gray-300 bg-white peer-checked:border-[5px] peer-checked:border-[#2563eb] peer-focus-visible:ring-2 peer-focus-visible:ring-mw-blue-200" />{v === 'all' ? 'All venues' : v}</label>
                        ))}
                      </div>
                    </fieldset>
                  )}
                </div>
              </div>
            </aside>
            <div className="lg:col-span-9">
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
              {tab === 'sites' && <SiteGrid sites={browse} total={candidates.length} filters={false} map={false} hasPage={() => false} mapTitle={`Map of sites in ${city === 'all' ? (market?.countryName ?? 'the market') : cityNameOf(doc.brief.countrySlug, city)}`}
                renderAction={s => (
                  <span className="flex items-center gap-2">
                    <button type="button" onClick={() => setDetail(s)} className="mw-tap inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]"><Info className="h-3.5 w-3.5" aria-hidden="true" />Details</button>
                    {planButton(s)}
                  </span>
                )} />}
              <SiteDetailsDialog site={detail} insights={detail ? insights[detail.id] : undefined} onClose={() => setDetail(null)} action={detail ? planButton(detail, 'px-4 py-2 text-sm') : null} />
            </div>
          </div>
          {error && tab === 'sites' && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
        </div>
      </section>

      {/* Brief */}
      <section id="edit-brief" role="tabpanel" aria-labelledby="edittab-brief" className={`bg-white mw-section ${tab === 'brief' ? '' : 'hidden'}`}>
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
          {error && tab === 'brief' && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
        </div>
      </section>

      {/* What the client sees */}
      <section id="edit-client" role="tabpanel" aria-labelledby="edittab-client" className={`bg-gray-50 mw-section ${tab === 'client' ? '' : 'hidden'}`}>
        <div className="mw-container">
          <SgSectionHeading title="What the client sees" intro={`Everything is off until you switch it on. The client page shows at most ${MAX_SHOWN} options before they approve (under the plan, as 'Options from your planner') and at most ${MAX_SHOWN} offers after they approve ('While we confirm availability'). Anything else switched on sits behind a 'More options' link.`} />
          <div className="mb-6 rounded-2xl border border-mw-blue-100 bg-mw-blue-50/40 p-4 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">{overridden ? 'This proposal is overridden by hand.' : 'Automatic: smallest ask first, picked from the brief.'}</p>
            <p className="mt-1">Before approval: {auto.options.map(titleOf).join(' · ') || 'nothing'}. After approval: {auto.postApproval.map(titleOf).join(' · ') || 'nothing'}.{overridden ? ' Switch everything off to go back to the automatic pick.' : ' Switch options on below to override it for this client only.'}</p>
          </div>
          <div className="mb-6 rounded-2xl border border-mw-blue-100 bg-white p-4 text-sm">
            <p><span className="font-semibold text-gray-700">Before approval the client sees:</span> {shown.options.length ? shown.options.map(titleOf).join(' · ') : <span className="text-gray-500">nothing extra</span>}</p>
            <p className="mt-1"><span className="font-semibold text-gray-700">After approval:</span> {shown.postApproval.length ? shown.postApproval.map(titleOf).join(' · ') : <span className="text-gray-500">nothing extra</span>}</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"><th className="px-4 py-3">Option</th><th className="px-2 py-3 text-center">Before approval</th><th className="px-2 py-3 text-center">After approval</th></tr></thead>
              <tbody>
                {candidatesForClient.map(c => (
                  <tr key={c.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3"><span className="mr-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">{c.group}</span><span className="font-semibold text-gray-900">{c.title}</span><p className="mt-0.5 text-xs text-gray-500">{c.detail}</p></td>
                    <td className="px-2 py-2 text-center"><Switch on={shown.options.includes(c.id)} label={`Show "${c.title}" before approval`} onChange={() => flip('options', c.id)} /></td>
                    <td className="px-2 py-2 text-center"><Switch on={shown.postApproval.includes(c.id)} label={`Offer "${c.title}" after approval`} onChange={() => flip('postApproval', c.id)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" onClick={saveShown} disabled={busy !== null || shownSaved} className="mw-tap inline-flex items-center rounded-lg bg-[#2563eb] px-6 py-3 font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50">{busy === 'shown' ? 'Saving…' : 'Save what the client sees'}</button>
            <span className="text-sm text-gray-500">{note ?? (shownSaved ? 'Saved.' : 'Unsaved switches.')}</span>
          </div>
          {error && tab === 'client' && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
        </div>
      </section>

      {/* The client's creative for the mock-ups: sales pre-fills it; the client sees it on the lead site before approval and on every site after */}
      <section id="edit-creative" role="tabpanel" aria-labelledby="edittab-creative" className={`bg-gray-50 mw-section ${tab === 'creative' ? '' : 'hidden'}`}>
        <div className="mw-container">
          <SgSectionHeading title="Client creative" intro="Their logo and a line, or their finished image or video. The client page then opens with it on the lead site; once they approve, every site in the plan is mocked up with it and they can swap in their own file. Saved on its own, separate from the plan versions." />
          {leadSite ? (
            <CreativePanel key={creative?.at ?? 'none'} site={leadSite} face={view.faces[leadSite.id]} initial={creative} who="staff" onSave={saveCreative} saving={busy === 'creative'} note={creativeNote} />
          ) : <p className="text-gray-600">Add at least one site to the plan first.</p>}
          {creative && !demo && (
            <button type="button" onClick={async () => { const r = await fetch(`/api/proposals/${doc.shareId}/creative`, { method: 'DELETE' }).catch(() => null); if (r?.ok) { setCreative(null); setCreativeNote('Removed. The client page shows no mock-ups until a creative is added.') } else setCreativeNote('Could not remove it. Please try again.') }} className="mw-tap mt-6 text-sm font-semibold text-gray-600 hover:underline">Remove the creative</button>
          )}
          {error && tab === 'creative' && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
        </div>
      </section>

      {/* Sticky publish bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur">
        <div className="mw-container flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">v{version.n}</span> · {dirty ? 'unpublished changes' : 'no changes yet'}{rows.length === 0 ? ' · keep at least one site' : ''}</p>
          <div className="flex gap-2">
            <Link href={`/proposals/${doc.shareId}`} className="mw-tap inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#2563eb]">Client view</Link>
            <button type="button" onClick={publish} disabled={busy !== null || rows.length === 0 || !dirty} className="mw-tap inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50">{busy === 'publish' ? 'Publishing…' : `Publish as v${version.n + 1}`}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/** A switch with a 44px tap area around a 48×28 track; the knob moves, the track changes colour. */
function Switch({ on, label, onChange }: { on: boolean; label: string; onChange: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onChange} className="inline-flex h-11 w-14 flex-shrink-0 items-center justify-center">
      <span className={`relative block h-7 w-12 rounded-full transition-colors duration-200 ${on ? 'bg-[#2563eb]' : 'bg-gray-300'}`}>
        <span className="absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left] duration-200" style={{ left: on ? 24 : 4 }} />
      </span>
    </button>
  )
}
