'use client'

// The proposal page a client receives (round 3, Rif, 11 Nov 2026: calm, short,
// the decision first). First screen: the plan in three numbers, the sites as a
// strip, Approve / Request changes. Below: tabs (Sites, Audience, Map,
// Summary). A sticky bar keeps the numbers and the actions in reach. At most
// two options the planner switched on sit under the tabs; add-ons and more
// cities are offered only after approval. No prices per site anywhere.

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Link2, Pencil, Printer, Users } from 'lucide-react'
import { PERSONA_ICONS, specRows } from './SiteDetailsDialog'
import { SG_NAVY } from '../SingaporeShared'
import { SiteCard } from '../inventory/InventoryShared'
import { BrandMap, type MapPin } from '../inventory/BrandMap'
import { OBJECTIVES, BUDGET_BANDS, citiesLabel } from '@/lib/proposal/markets'
import { ADDONS } from '@/lib/proposal/addons'
import { effectiveShown, recommendedBecause } from '@/lib/proposal/shown'
import { offerCopy } from '@/lib/proposal/offerCopy'
import { OfferArt, artFor } from './OfferArt'
import { IdentitySheet, loadIdentity, type Identity } from './IdentitySheet'
import { SiteMockup } from './SiteMockup'
import { CreativePanel, type CreativePayload } from './CreativePanel'
import { ScreenAdjuster, type ScreenSave } from './ScreenAdjuster'
import { faceToJson } from '@/lib/mockup/screens'
import { isDigitalSite } from '@/lib/mockup/spec'
import type { ProposalView as View, ProposalStatus, TierId, Creative } from '@/lib/proposal/types'
import type { SiteSpecs } from '@/lib/inventory/types'


/** Rif's wording (26 Oct 2026), shown with every estimate. */
const PRICE_NOTE = 'This is an estimate only, not an exact price. The exact price depends on many factors, such as campaign duration, spots per loop, spots per day and your campaign requirements.'

const STATUS: Record<ProposalStatus, { label: string; cls: string }> = {
  draft: { label: 'Draft', cls: 'bg-white/15 text-white' },
  sent: { label: 'For your review', cls: 'bg-cyan-300 text-[#2563eb]' },
  approved: { label: 'Approved', cls: 'bg-emerald-300 text-emerald-950' },
  'changes-requested': { label: 'Changes requested', cls: 'bg-amber-300 text-amber-950' },
}

type TabId = 'sites' | 'audience' | 'map' | 'summary'
const TABS: { id: TabId; label: string }[] = [{ id: 'sites', label: 'Sites' }, { id: 'audience', label: 'Audience' }, { id: 'map', label: 'Map' }, { id: 'summary', label: 'Summary' }]

const fmtDate = (iso: string | null | undefined) => iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null
const num = (n: number | null) => n == null ? null : n.toLocaleString('en-US')
const money = (inv: { currency: string; low: number; high: number } | null | undefined) => inv ? `${inv.currency} ${num(inv.low)} – ${num(inv.high)}` : null

/** One thing the client can act on: a suggestion, an add-on, a plan size or a city. */
type Option = { id: string; kind: 'suggestion' | 'addon' | 'tier'; title: string; body: string; meta: string | null; cta: string; done: boolean; busy: boolean; run: () => void; headline: string; proof: string }

export function ProposalView({ view, canEdit, pagedIds, demo = false }: { view: View; canEdit: boolean; pagedIds: string[]; demo?: boolean }) {
  const { doc, version, sites, totals, audience, cities, tiers, suggestions, pool, faces } = view
  const [status, setStatus] = useState<ProposalStatus>(doc.status)
  // The client's creative on the sites (Rif, 11 Nov 2026): one site before approval, every site after; the client may change it once approved.
  const [creative, setCreative] = useState<Creative | null>(doc.creative ?? null)
  const [creativeOpen, setCreativeOpen] = useState(false)
  const [savingCreative, setSavingCreative] = useState(false)
  const [creativeNote, setCreativeNote] = useState<string | null>(null)
  const [adjustAt, setAdjustAt] = useState<number | null>(null)   // the screen open in the adjuster, after approval
  const lead = sites[0] ?? null
  const [tab, setTab] = useState<TabId>('sites')
  const [ask, setAsk] = useState(false)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [done, setDone] = useState<Record<string, boolean>>({})
  const [sheet, setSheet] = useState<'options' | 'offers' | null>(null)
  const [barOn, setBarOn] = useState(false)
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [pending, setPending] = useState<{ label: string; run: (by: Identity | null) => void } | null>(null)
  const heroActions = useRef<HTMLDivElement>(null)
  const paged = new Set(pagedIds)
  const brief = doc.brief
  const inPlan = cities.filter(c => c.sites > 0)
  // City names come with the view (the client cannot load the market registry).
  const nameOf = (slug: string) => cities.find(c => c.slug === slug)?.name
  const joinNames = (names: string[]) => names.length <= 1 ? names[0] ?? '' : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
  const whereLabel = inPlan.length ? joinNames(inPlan.map(c => nameOf(c.slug) ?? c.name)) : citiesLabel(brief.countrySlug, [])
  const objective = OBJECTIVES.find(o => o.id === brief.objective)?.label
  const poolById = new Map(pool.map(s => [s.id, s]))
  const pins = sites.map(s => s.lat != null && s.lng != null ? { id: s.id, lat: s.lat, lng: s.lng, title: s.name, subtitle: [s.displayFormat ?? s.format, s.areaName].filter(Boolean).join(' · ') } : null).filter(Boolean) as MapPin[]
  const approved = status === 'approved'

  // Tab in the URL hash so a link can open a tab; the sticky bar shows once the hero's actions scroll away.
  useEffect(() => {
    const fromHash = () => { const h = location.hash.replace('#', '') as TabId; if (TABS.some(t => t.id === h)) setTab(h) }
    fromHash(); window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])
  useEffect(() => {
    const el = heroActions.current; if (!el) return
    const io = new IntersectionObserver(([e]) => setBarOn(!e.isIntersecting), { threshold: 0 })
    io.observe(el); return () => io.disconnect()
  }, [])
  const pickTab = (id: TabId) => { setTab(id); history.replaceState(null, '', `#${id}`) }

  // Someone who is not the creator gives a name and email once before their first action (the second lead).
  const needIdentity = !canEdit && !demo
  const withIdentity = (label: string, run: (by: Identity | null) => void) => {
    if (!needIdentity) { run(null); return }
    const known = identity ?? loadIdentity()
    if (known) { setIdentity(known); run(known); return }
    setPending({ label, run })
  }
  const saveCreative = (payload: CreativePayload) => new Promise<boolean>(resolve => withIdentity('save your creative', async by => {
    if (demo) {
      const pc = payload.creative
      setCreative({ mode: pc.mode ?? 'make', brand: pc.brand ?? '', tagline: pc.tagline ?? '', accent: pc.accent ?? '#1B1E2B', template: pc.template ?? 'band', fit: pc.fit ?? 'letterbox', by: 'client', byName: '', at: new Date().toISOString(),
        logoUrl: pc.logo ?? pc.logoUrl ?? null, own: pc.ownFile && pc.own ? { ...pc.own, url: pc.ownFile } : pc.own ?? null })
      setCreativeOpen(false); setCreativeNote('Saved (sample proposal: this page only).'); resolve(true); return
    }
    setSavingCreative(true); setError(null)
    const r = await fetch(`/api/proposals/${doc.shareId}/creative`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...payload, by }) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    setSavingCreative(false)
    if (!r || !r.ok || !j?.creative) { setCreativeNote(j?.error ?? 'Something went wrong. Please try again.'); resolve(false); return }
    setCreative(j.creative); setCreativeOpen(false); setCreativeNote('Saved. Every site below shows it.'); resolve(true)
  }))
  // One screen's own fit / file (after approval). Sales and the client can both do it; the client says who they are once.
  const saveScreen = (s: ScreenSave) => new Promise<boolean>(resolve => withIdentity('save this screen', async by => {
    if (!creative) { resolve(false); return }
    if (demo) {
      const rest = (creative.screens ?? []).filter(x => x.siteId !== s.siteId)
      const next = s.reset ? rest : [...rest, { _key: s.siteId, siteId: s.siteId, faceJson: s.face ? faceToJson(s.face) : (creative.screens ?? []).find(x => x.siteId === s.siteId)?.faceJson ?? null, own: s.own, fit: s.fit, by: 'client' as const, byName: '', at: new Date().toISOString() }]
      setCreative({ ...creative, screens: next }); resolve(true); return
    }
    const r = await fetch(`/api/proposals/${doc.shareId}/creative`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ screen: { ...s, face: s.face ? faceToJson(s.face) : null }, by }) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    if (r?.ok && j?.creative) { setCreative(j.creative); resolve(true) } else resolve(false)
  }))
  const post = async (path: string, body: Record<string, unknown>, key: string, local: () => void, reload = true) => {
    if (demo) { local(); return }
    setBusy(key); setError(null)
    const r = await fetch(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    setBusy(null)
    if (!r || !r.ok) { setError(j?.error ?? 'Something went wrong. Please try again.'); return }
    local(); if (reload) window.location.reload()
  }
  const versions = `/api/proposals/${doc.shareId}/versions`
  const act = (action: 'approve' | 'request-changes') => withIdentity(action === 'approve' ? 'approve the plan' : 'send your request', by =>
    post(`/api/proposals/${doc.shareId}/status`, { action, message, by }, action, () => { setStatus(action === 'approve' ? 'approved' : 'changes-requested'); setAsk(false); setMessage('') }, false))
  const mark = (id: string) => () => setDone(d => ({ ...d, [id]: true }))
  const run = {
    suggestion: (id: string) => { const sg = suggestions.find(x => x.id === id); if (!sg) return; withIdentity('update the plan', by => post(versions, { addSites: sg.siteIds.map(s => ({ siteId: s, reason: sg.reasons[s] })), weeks: sg.weeks, by }, id, mark(id))) },
    addon: (id: string) => withIdentity('add it to the plan', by => post(versions, { addon: id, by }, id, mark(id))),
    tier: (id: TierId) => withIdentity('change the plan size', by => post(versions, { tier: id, by }, id, mark(id))),
  }
  const copy = async () => { try { await navigator.clipboard.writeText(location.origin + `/proposals/${doc.shareId}`); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* the address bar has it */ } }

  /** An option id from the creator's list → what to show and what the click does. */
  const copyCtx = { sites: sites.length, weeks: brief.durationWeeks, cityLabel: whereLabel, digitalSites: sites.filter(s => s.digital).length }
  const option = (id: string): Option | null => { const o = rawOption(id); if (!o) return null; const c = offerCopy(id, copyCtx, suggestions, tiers); return c ? { ...o, headline: c.headline, proof: c.proof, cta: c.cta } : { ...o, headline: o.title, proof: o.body } }
  const rawOption = (id: string): Omit<Option, 'headline' | 'proof'> | null => {
    const sg = suggestions.find(x => x.id === id)
    if (sg) { const d = sg.delta; return { id, kind: 'suggestion', title: sg.title, body: sg.body, meta: [d?.sites ? `+${d.sites} ${d.sites === 1 ? 'site' : 'sites'}` : null, d?.reach != null ? `+${num(d.reach)} reach` : null, d?.investment && (d.investment.low || d.investment.high) ? `+${money(d.investment)}` : null].filter(Boolean).join(' · ') || null, cta: 'Add to my plan', done: !!done[id], busy: busy === id, run: () => run.suggestion(id) } }
    const a = ADDONS.find(x => x.id === id)
    if (a) return { id, kind: 'addon', title: a.title, body: a.detail, meta: [a.product, a.price === 'rates' ? 'priced from the site rates' : 'price on request'].filter(Boolean).join(' · '), cta: 'Add', done: !!done[id] || (version.addons ?? []).includes(id), busy: busy === id, run: () => run.addon(id) }
    if (id === 'smaller' || id === 'larger') {
      const t = tiers.find(x => x.id === (id === 'smaller' ? 'essentials' : 'full')); if (!t || t.current) return null
      return { id, kind: 'tier', title: id === 'smaller' ? 'A smaller plan' : 'A larger plan', body: t.blurb, meta: [`${t.totals.sites} sites`, t.totals.reach != null ? `${num(t.totals.reach)} reach` : null, money(t.totals.investment)].filter(Boolean).join(' · '), cta: `Switch to ${t.totals.sites} sites`, done: !!done[id], busy: busy === t.id, run: () => run.tier(t.id) }
    }
    return null
  }
  /** Smallest ask first (Rif): a service on request, then a longer run, then sites by what they add, then the bigger plan. The smaller plan leads. */
  const askOf = (o: Option) => o.kind === 'tier' ? (o.id === 'smaller' ? 0 : 50) : o.kind === 'addon' ? (ADDONS.find(a => a.id === o.id)?.price === 'rates' ? 10 : 5) : o.kind === 'suggestion' ? 20 + ((suggestions.find(x => x.id === o.id)?.delta?.investment?.high ?? 0) / 10000) : 40
  const byAsk = (a: Option, b: Option) => askOf(a) - askOf(b)
  const shown = effectiveShown(doc, suggestions, tiers)
  const before = shown.options.map(option).filter((o): o is Option => !!o).sort(byAsk).slice(0, 2)
  const after = shown.postApproval.map(option).filter((o): o is Option => !!o).sort(byAsk).slice(0, 2)
  const allShown = Array.from(new Set([...shown.options, ...shown.postApproval])).map(option).filter((o): o is Option => !!o).sort(byAsk)
  void poolById

  const facts: [string, string | null][] = [
    ['Objective', objective ?? null], ['Market', whereLabel],
    ['Dates', brief.startDate ? `From ${fmtDate(brief.startDate)}${brief.durationWeeks ? `, ${brief.durationWeeks} weeks` : ''}` : brief.durationWeeks ? `${brief.durationWeeks} weeks` : null],
    ['Audience', brief.audience || null], ['Industry', brief.industry || null], ['Formats', brief.formats.length ? brief.formats.join(', ') : 'Any'],
  ]
  if (facts.some(([, v]) => v && BUDGET_BANDS.some(b => v.includes(b.label)))) throw new Error('budget on proposal page')

  const actions = (compact: boolean) => approved ? (
    <p className={`flex items-center gap-2 font-semibold ${compact ? 'text-sm text-emerald-700' : 'text-white'}`}><Check className="h-5 w-5 text-emerald-300" aria-hidden="true" /> Approved</p>
  ) : (
    <div className={`flex ${compact ? 'gap-2' : 'flex-col gap-3 sm:flex-row'}`}>
      <button type="button" disabled={busy !== null} onClick={() => act('approve')} className={`mw-tap inline-flex items-center justify-center rounded-lg font-semibold ${compact ? 'bg-[#2563eb] px-4 py-2 text-sm text-white hover:bg-[#1d4ed8]' : 'bg-white px-6 py-3 text-[#2563eb] hover:bg-cyan-50'} disabled:opacity-60`}>{busy === 'approve' ? 'Sending…' : 'Approve this proposal'}</button>
      <button type="button" onClick={() => { setAsk(true); setTimeout(() => document.getElementById('request-changes')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50) }} className={`mw-tap inline-flex items-center justify-center rounded-lg font-semibold ${compact ? 'border border-gray-300 px-4 py-2 text-sm text-gray-700' : 'border-2 border-white/40 px-6 py-3 text-white hover:bg-white/10'}`}>Request changes</button>
    </div>
  )

  const numbers = (compact: boolean) => (
    <dl className={compact ? 'flex flex-wrap gap-x-5 gap-y-1 text-sm' : 'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4'}>
      {([['Sites', String(totals.sites), null], ['Monthly reach', totals.reach != null ? num(totals.reach)! : 'As published', totals.reach != null ? `${totals.withFigures} of ${totals.sites} sites with figures` : null], ['Indicative investment', money(totals.investment) ?? 'On request', brief.durationWeeks ? `${brief.durationWeeks} weeks · estimate` : 'estimate']] as [string, string, string | null][]).map(([k, v, n]) => (
        <div key={k} className={compact ? '' : `rounded-xl bg-white/10 px-3 py-3 ring-1 ring-white/15 sm:px-4 ${k === 'Indicative investment' ? 'col-span-2 sm:col-span-1' : ''}`}>
          <dt className={compact ? 'inline text-gray-500' : 'text-xs font-semibold uppercase tracking-wider text-blue-100/80'}>{k}{compact ? ': ' : ''}</dt>
          <dd className={compact ? 'inline font-semibold text-gray-900' : 'mt-1 text-xl font-bold leading-tight sm:text-2xl'}>{v}</dd>
          {!compact && n && <dd className="mt-0.5 text-xs text-blue-100/70">{n}</dd>}
        </div>
      ))}
    </dl>
  )

  // Offers that sell (Rif, 11 Nov 2026): the drawing, a benefit headline, one proof line about this plan, the ask. The first one leads as Recommended.
  const optionCard = (o: Option, tone: 'light' | 'dark' = 'light', lead = false) => (
    <li key={o.id} className={`flex flex-col gap-5 rounded-2xl border p-5 sm:flex-row sm:p-6 ${tone === 'dark' ? 'border-white/20 bg-white/10 text-white' : o.done ? 'border-[#2563eb] bg-mw-blue-50/40' : lead ? 'border-[#2563eb] bg-white' : 'border-gray-200 bg-white'}`}>
      <div className="sm:w-2/5 sm:flex-shrink-0"><OfferArt art={artFor(o.id, o.kind)} /></div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className={`text-xs font-bold uppercase tracking-wider ${tone === 'dark' ? 'text-cyan-300' : 'text-[#2563eb]'}`}>{lead ? recommendedBecause(brief.objective) : o.title}</p>
        <h3 className={`mt-1 text-lg font-bold leading-snug ${tone === 'dark' ? 'text-white' : 'text-gray-900'}`}>{o.headline}</h3>
        <p className={`mt-2 flex-1 text-sm leading-relaxed ${tone === 'dark' ? 'text-blue-100/90' : 'text-gray-700'}`}>{o.proof}</p>
        {o.meta && <p className={`mt-2 text-xs font-semibold ${tone === 'dark' ? 'text-cyan-200' : 'text-gray-500'}`}>{o.meta}</p>}
        <button type="button" disabled={o.done || busy !== null} onClick={o.run}
          className={`mw-tap mt-4 inline-flex items-center justify-center self-start rounded-lg px-5 py-2.5 text-sm font-semibold disabled:opacity-80 ${o.done ? (tone === 'dark' ? 'bg-white/15 text-white' : 'border border-gray-200 bg-white text-gray-500') : tone === 'dark' ? 'bg-white text-[#2563eb] hover:bg-cyan-50' : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'}`}>
          {o.busy ? 'Working…' : o.done ? 'Added' : o.cta}
        </button>
      </div>
    </li>
  )

  return (
    <div className="bg-white text-gray-900 proposal-page">
      {/* Hero: the plan in three numbers, the sites, the decision */}
      <section className={`relative overflow-hidden ${SG_NAVY} text-white pb-8 lg:pb-10 mw-hero-top print-hero`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none no-print" />
        <div className="relative mw-container">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Instant proposal · v{version.n}</span>
            <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${STATUS[status].cls}`}>{STATUS[status].label}</span>
            <span className="ml-auto flex gap-2 no-print">
              <button type="button" onClick={() => window.print()} aria-label="Print" title="Print" className="mw-tap rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"><Printer className="h-4 w-4" aria-hidden="true" /></button>
              <button type="button" onClick={copy} aria-label="Copy link" title={copied ? 'Link copied' : 'Copy link'} className="mw-tap rounded-lg bg-white/10 p-2 text-white hover:bg-white/20">{copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}</button>
              {canEdit && <Link href={`/proposals/${doc.shareId}/edit`} aria-label="Edit proposal" title="Edit proposal" className="mw-tap rounded-lg bg-white/10 p-2 text-cyan-300 hover:bg-white/20"><Pencil className="h-4 w-4" aria-hidden="true" /></Link>}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight leading-tight sm:text-3xl lg:text-4xl">{doc.titleLine}</h1>
          <p className="mt-2 text-blue-100/90">Prepared for {doc.creator.company} by Moving Walls · {fmtDate(version.createdAt)}</p>
          <div className="mt-6">{numbers(false)}</div>
          <ul className="mt-5 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]" aria-label="Sites in the plan">
            {sites.map((s, i) => (
              <li key={s.id} className="w-40 flex-shrink-0">
                <button type="button" onClick={() => { pickTab('sites'); setTimeout(() => document.getElementById(`site-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50) }} className="mw-tap block w-full !justify-start text-left">
                  <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/15">{s.photos[0] && <Image src={s.photos[0]} alt="" fill sizes="160px" className="object-cover" />}<span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#2563eb]">{i + 1}</span></span>
                  <span className="mt-1.5 block truncate text-sm font-semibold">{s.name}</span>
                  <span className="block truncate text-xs text-blue-100/80">{[s.displayFormat ?? s.format, s.areaName].filter(Boolean).join(' · ')}</span>
                </button>
              </li>
            ))}
          </ul>
          <div ref={heroActions} className="mt-6 no-print">{actions(false)}</div>
          {ask && !approved && (
            <form id="request-changes" className="mt-5 max-w-xl rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 no-print" onSubmit={e => { e.preventDefault(); act('request-changes') }}>
              <label className="block text-sm font-semibold">What should change?
                <textarea value={message} onChange={e => setMessage(e.target.value)} required maxLength={1000} rows={3} placeholder="e.g. Swap the mall sites for roadside, and start two weeks later" className="mt-1 w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-blue-100/60 focus:border-cyan-300 focus:outline-none" />
              </label>
              <div className="mt-3 flex gap-2">
                <button type="submit" disabled={busy !== null} className="mw-tap rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-cyan-200 disabled:opacity-60">{busy === 'request-changes' ? 'Sending…' : 'Send request'}</button>
                <button type="button" onClick={() => setAsk(false)} className="mw-tap rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white">Cancel</button>
              </div>
            </form>
          )}
          {status === 'changes-requested' && <p className="mt-3 text-sm text-amber-200 no-print">Your change request is with our team.</p>}
          {error && <p className="mt-3 text-sm text-red-200" role="alert">{error}</p>}
        </div>
      </section>

      {/* The creative on the lead site before approval: the strongest reason to say yes (Rif, 11 Nov 2026). The rest unlock on approval. */}
      {!approved && lead && creative && (
        <section className="bg-gray-50 mw-section-sm">
          <div className="mw-container">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="text-sm font-bold uppercase tracking-wider text-[#2563eb]">Your ad on the lead site</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{creative.mode === 'own' ? 'Your creative' : creative.brand || 'Your brand'} on {lead.name}</h2>
                <p className="mt-3 text-gray-600">A real photo of the site with your creative on its screen. Approve the plan and every site in it is mocked up the same way, ready to download{sites.length > 1 ? ` — ${sites.length} sites in all` : ''}.</p>
                {canEdit && <Link href={`/proposals/${doc.shareId}/edit#creative`} className="mw-tap mt-4 inline-flex text-sm font-semibold text-[#2563eb] hover:underline">Change the creative in the editor →</Link>}
              </div>
              <div className="lg:col-span-8"><SiteMockup site={lead} face={faces[lead.id]} creative={creative} play caption={false} /></div>
            </div>
          </div>
        </section>
      )}
      {!approved && lead && !creative && canEdit && (
        <section className="bg-gray-50 mw-section-sm no-print">
          <div className="mw-container">
            <Link href={`/proposals/${doc.shareId}/edit#creative`} className="mw-tap flex flex-col gap-1 rounded-2xl border-2 border-dashed border-mw-blue-200 bg-white p-5 hover:border-[#2563eb]">
              <span className="font-bold text-gray-900">Add the client's creative →</span>
              <span className="text-sm text-gray-600">Only you see this. With a logo and a tagline, this page opens with their brand on {lead.name}; every site is mocked up once they approve.</span>
            </Link>
          </div>
        </section>
      )}

      {/* After approval: thank you, then at most two offers */}
      {approved && (
        <section className={`${SG_NAVY} border-t border-white/10 text-white mw-section-sm no-print`}>
          <div className="mw-container">
            <h2 className="text-xl font-bold sm:text-2xl">Thank you. A planner checks availability for your dates and comes back to you with the next step.</h2>
            <p className="mt-2 max-w-2xl text-blue-100">Nothing is booked until you have confirmed availability and the final placements with us.</p>
            {after.length > 0 && (
              <>
                <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-cyan-300">While we check availability</p>
                <ul className="mt-3 grid gap-4 lg:grid-cols-2">{after.map((o, i) => optionCard(o, 'dark', i === 0))}</ul>
              </>
            )}
            {allShown.length > after.length && <button type="button" onClick={() => setSheet('offers')} className="mw-tap mt-4 text-sm font-semibold text-cyan-200 hover:underline">Ask about more →</button>}
            <p className="mt-10 text-sm font-semibold uppercase tracking-wider text-cyan-300">Keep exploring</p>
            <ul className="mt-3 grid gap-4 sm:grid-cols-3">
              {[['Case studies', 'What brands like yours did with out-of-home.', '/case-studies'], [`Sites in ${citiesLabel(brief.countrySlug, [])}`, 'Every city, area and site we can plan.', `/locations/${brief.countrySlug}`], ['Ideas and news', 'Planning guides and what is new in the market.', '/blog']].map(([h, b, href]) => (
                <li key={href}><Link href={href} className="mw-tap flex h-full flex-col rounded-2xl border border-white/20 bg-white/5 p-5 hover:bg-white/10"><span className="font-bold">{h}</span><span className="mt-1 text-sm text-blue-100/90">{b}</span></Link></li>
              ))}
            </ul>
            <Link href="/" className="mw-tap mt-6 inline-flex items-center rounded-lg bg-white px-5 py-2.5 font-semibold text-[#2563eb] hover:bg-cyan-50">Back to movingwalls.com</Link>
          </div>
        </section>
      )}

      {/* After approval: the creative on every site, and the client may change it (the second lead) */}
      {approved && lead && (
        <section className="bg-gray-50 mw-section">
          <div className="mw-container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#2563eb]">Your ad on every site</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{creative ? `${creative.mode === 'own' ? 'Your creative' : creative.brand || 'Your brand'} across the plan` : 'See your ad across the plan'}</h2>
                <p className="mt-2 max-w-2xl text-gray-600">{creative ? 'Each site with your creative on its real photo. Download any of them, or swap in a finished image or video to see it everywhere.' : 'Add a logo and a tagline, or upload a finished image or video, and every site below shows it on its real photo.'}</p>
              </div>
              {creative && !creativeOpen && <button type="button" onClick={() => setCreativeOpen(true)} className="mw-tap no-print inline-flex items-center rounded-lg border-2 border-[#2563eb] bg-white px-5 py-2.5 font-semibold text-[#2563eb] hover:bg-mw-blue-50">Change the creative</button>}
            </div>
            {(creativeOpen || !creative) && (
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 no-print sm:p-6">
                <CreativePanel site={lead} face={faces[lead.id]} initial={creative} who="client" onSave={saveCreative} saving={savingCreative} note={creativeNote} videoOk={sites.some(isDigitalSite)} />
                {creative && <button type="button" onClick={() => setCreativeOpen(false)} className="mw-tap mt-4 text-sm font-semibold text-gray-600 hover:underline">Keep the current creative</button>}
              </div>
            )}
            {creative && (
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sites.map((s, i) => <li key={s.id}><SiteMockup site={s} face={faces[s.id]} creative={creative} play={i === 0} download cover onAdjust={() => setAdjustAt(i)} /></li>)}
              </ul>
            )}
            {creative && adjustAt !== null && sites[adjustAt] && (
              <ScreenAdjuster sites={sites} faces={faces} creative={creative} index={adjustAt} onIndex={setAdjustAt} onClose={() => setAdjustAt(null)} onSave={saveScreen} />
            )}
            {creative && creativeNote && !creativeOpen && <p className="mt-4 text-sm text-gray-500 no-print">{creativeNote}</p>}
          </div>
        </section>
      )}

      {/* The detail, one tab at a time (every panel prints) */}
      <section className="bg-white mw-section">
        <div className="mw-container">
          <div role="tablist" aria-label="Proposal detail" className="mw-tabrow no-print mb-8 flex gap-2 border-b border-gray-200">
            {TABS.map(t => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} id={`tab-${t.id}`} onClick={() => pickTab(t.id)}
                className={`mw-tap -mb-px whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold ${tab === t.id ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>{t.label}</button>
            ))}
          </div>

          <div id="panel-sites" role="tabpanel" aria-labelledby="tab-sites" className={`${tab === 'sites' ? '' : 'hidden'} print:block`}>
            <h2 className="print-only mb-4 text-2xl font-bold text-[#2563eb]">Sites</h2>
            {inPlan.map(c => (
              <div key={c.slug} className="mb-10 last:mb-0">
                {inPlan.length > 1 && (
                  <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-gray-200 pb-3">
                    <h3 className="text-xl font-bold text-[#2563eb]">{c.name}</h3>
                    <p className="text-sm text-gray-600">{c.sites} {c.sites === 1 ? 'site' : 'sites'}{c.reach != null ? ` · ${num(c.reach)} monthly reach` : ''}</p>
                  </div>
                )}
                <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {sites.map((s, i) => s.citySlug === c.slug && (
                    <li key={s.id} id={`site-${s.id}`} className="flex scroll-mt-24 flex-col break-inside-avoid">
                      <div className="relative">
                        <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-sm font-bold text-white">{i + 1}</span>
                        <SiteCard site={s} linked={paged.has(s.id)} addable={false} />
                      </div>
                      <div className="-mt-2 rounded-b-2xl border border-t-0 border-mw-blue-100 bg-mw-blue-50/50 px-5 pb-4 pt-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-mw-blue-600">Why this site</p>
                        <p className="mt-1 text-sm text-gray-800">{s.reason}</p>
                        {s.audience?.reach ? <p className="mt-2 text-xs text-gray-500">Monthly reach {s.audience.reach}{s.audience.impressions ? ` · impressions ${s.audience.impressions}` : ''}</p> : <p className="mt-2 text-xs text-gray-500">Audience figures not yet published for this site.</p>}
                        <SpecList site={s} />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
            {totals.investment && <p className="mt-6 max-w-3xl text-xs text-gray-500">{PRICE_NOTE}</p>}
          </div>

          <div id="panel-audience" role="tabpanel" aria-labelledby="tab-audience" className={`${tab === 'audience' ? '' : 'hidden'} print:block print:mt-10`}>
            <h2 className="print-only mb-4 text-2xl font-bold text-[#2563eb]">Audience</h2>
            <p className="mb-6 max-w-3xl text-gray-600">The audiences that pass the proposed sites, and which sites reach each of them.{brief.audience ? ` Your brief: ${brief.audience.trim()}.` : ''}</p>
            {audience.length === 0 ? <p className="text-gray-600">Audience notes are added as the planner writes them.</p> : (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {audience.map(g => { const Icon = PERSONA_ICONS[g.icon] ?? Users; return (
                  <li key={g.key} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 break-inside-avoid">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-mw-blue-50 text-[#2563eb]"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                      <span className="rounded-full bg-mw-blue-50 px-3 py-1 text-xs font-bold text-[#2563eb]">{g.members.length} of {sites.length} sites</span>
                    </div>
                    <h3 className="mt-4 font-bold text-gray-900">{g.label}</h3>
                    <ul className="mt-3 space-y-3">
                      {g.members.map(m => (
                        <li key={m.siteId} className="border-l-2 border-mw-blue-100 pl-3 text-sm">
                          <p className="font-semibold text-gray-900">{m.name} <span className="font-normal text-gray-500">· {m.siteName}</span></p>
                          <p className="text-gray-700">{m.who}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{m.when} · {m.why}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) })}
              </ul>
            )}
            <p className="mt-5 text-xs text-gray-500">Audience groups come from the planner notes on each site. Measured age, gender and frequency figures are added as media owners publish them.</p>
          </div>

          <div id="panel-map" role="tabpanel" aria-labelledby="tab-map" className={`${tab === 'map' ? '' : 'hidden'} print:block print:mt-10`}>
            <h2 className="print-only mb-4 text-2xl font-bold text-[#2563eb]">Where the sites are</h2>
            {pins.length > 0 && tab === 'map' && <div className="no-print"><BrandMap pins={pins} title={`Map of the proposed sites in ${whereLabel}`} className="h-72 sm:h-96 lg:h-[520px]" /></div>}
            <ol className="print-only mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-700">
              {sites.map(s => <li key={s.id}><span className="font-semibold">{s.name}</span>{s.address ? ` — ${s.address}` : ''}</li>)}
            </ol>
          </div>

          <div id="panel-summary" role="tabpanel" aria-labelledby="tab-summary" className={`${tab === 'summary' ? '' : 'hidden'} print:block print:mt-10`}>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#2563eb]">Campaign summary</h2>
                <p className="text-lg leading-relaxed text-gray-700">{version.summary}</p>
              </div>
              <dl className="lg:col-span-5 grid grid-cols-2 gap-3">
                {facts.filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className={`rounded-xl border border-gray-200 p-3 ${k === 'Audience' ? 'col-span-2' : ''}`}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">{k}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-gray-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[['Confirm the sites', 'Approve this plan, or tell us what to change. The link stays the same; the plan updates.'], ['Availability check', 'A Moving Walls planner confirms each site for your dates before anything is booked.'], ['Artwork and specs', 'We send the specs for every screen and board, and can mock up your creative on each.'], ['Go live', 'Campaign starts on your date, with play reports for digital sites.']].map(([h, b], i) => (
                <li key={h} className="flex gap-3"><span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-xs font-bold text-white">{i + 1}</span><div><p className="font-bold text-gray-900">{h}</p><p className="text-sm text-gray-600">{b}</p></div></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* At most two options the planner switched on */}
      {!approved && before.length > 0 && (
        <section className="bg-gray-50 mw-section-sm no-print">
          <div className="mw-container">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Two ways to make it work harder</h2>
            <ul className="mt-4 grid gap-4 lg:grid-cols-2">{before.map((o, i) => optionCard(o, 'light', i === 0))}</ul>
            {allShown.length > before.length && <button type="button" onClick={() => setSheet('options')} className="mw-tap mt-4 text-sm font-semibold text-[#2563eb] hover:underline">More options →</button>}
          </div>
        </section>
      )}

      <p className="mw-container py-6 text-xs text-gray-500">Site photos, formats and audience figures are shown as published by the media owner; availability and final placements are confirmed by Moving Walls before booking.</p>

      {/* Sticky bar: the numbers and the decision, once the hero's actions scroll away */}
      {barOn && !approved && (
        <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur">
          <div className="mw-container flex flex-wrap items-center justify-between gap-3 py-3">
            {numbers(true)}
            {actions(true)}
          </div>
        </div>
      )}

      {/* The rest of the options, in a sheet */}
      {sheet && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="More options" onClick={e => { if (e.target === e.currentTarget) setSheet(null) }}>
          <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:max-w-2xl sm:rounded-2xl">
            <div className="flex items-center justify-between"><h2 className="text-xl font-bold text-[#2563eb]">More from your planner</h2><button type="button" onClick={() => setSheet(null)} className="mw-tap rounded-lg px-3 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-100">Close</button></div>
            <ul className="mt-4 grid gap-4">{allShown.map(o => optionCard(o))}</ul>
          </div>
        </div>
      )}

      <IdentitySheet open={!!pending} action={pending?.label ?? 'continue'} onClose={() => setPending(null)} onDone={i => { setIdentity(i); const r = pending?.run; setPending(null); r?.(i) }} />
    </div>
  )
}

function SpecList({ site }: { site: Parameters<typeof specRows>[0] }) {
  const shown = specRows(site)
  if (!shown.length) return null
  return (
    <div className="mt-3 border-t border-mw-blue-100 pt-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-mw-blue-600">Specifications</p>
      <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
        {shown.map(([k, v]) => <div key={k}><dt className="text-gray-500">{k}</dt><dd className="font-semibold text-gray-800">{v}</dd></div>)}
      </dl>
    </div>
  )
}
