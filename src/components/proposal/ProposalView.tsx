'use client'

// The proposal page a client receives. Summary, the sites with why each was
// picked, totals, a map, next steps with Approve / Request changes, and the
// version list. Printable (actions and the map are hidden in print; the map
// has an address list behind it). No prices anywhere. Rif, 11 Nov 2026.

import { useState } from 'react'
import Link from 'next/link'
import { Check, Link2, Pencil, Printer, TrainFront, ShoppingBag, Camera, Briefcase, Users, GraduationCap, Moon, Plane, Car, Home, type LucideIcon } from 'lucide-react'
import { SG_NAVY, SgSectionHeading, SgFormButton } from '../SingaporeShared'
import { SiteCard } from '../inventory/InventoryShared'
import { BrandMap, type MapPin } from '../inventory/BrandMap'
import { OBJECTIVES, BUDGET_BANDS, citiesLabel } from '@/lib/proposal/markets'
import { ADDONS } from '@/lib/proposal/addons'
import { IdentitySheet, loadIdentity, type Identity } from './IdentitySheet'
import type { ProposalView as View, ProposalStatus, TierId } from '@/lib/proposal/types'
import type { SiteSpecs } from '@/lib/inventory/types'

const PERSONA_ICONS: Record<string, LucideIcon> = { commuter: TrainFront, shopper: ShoppingBag, tourist: Camera, office: Briefcase, family: Users, student: GraduationCap, nightlife: Moon, traveller: Plane, driver: Car, resident: Home }

/** Rif's wording (26 Oct 2026), shown with every estimate. */
const PRICE_NOTE = 'This is an estimate only, not an exact price. The exact price depends on many factors, such as campaign duration, spots per loop, spots per day and your campaign requirements.'

const STATUS: Record<ProposalStatus, { label: string; cls: string }> = {
  draft: { label: 'Draft', cls: 'bg-white/15 text-white' },
  sent: { label: 'For your review', cls: 'bg-cyan-300 text-[#2563eb]' },
  approved: { label: 'Approved', cls: 'bg-emerald-300 text-emerald-950' },
  'changes-requested': { label: 'Changes requested', cls: 'bg-amber-300 text-amber-950' },
}

const fmtDate = (iso: string | null | undefined) => iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null
const num = (n: number | null) => n == null ? null : n.toLocaleString('en-US')

export function ProposalView({ view, canEdit, pagedIds, demo = false }: { view: View; canEdit: boolean; pagedIds: string[]; demo?: boolean }) {
  const { doc, version, sites: planSites, totals: planTotals, audience, cities, tiers, suggestions: allSuggestions, pool } = view
  const suggestions = allSuggestions.filter(s => !doc.hidden?.suggestions?.includes(s.id))
  const shownAddons = ADDONS.filter(a => !doc.hidden?.addons?.includes(a.id))
  // The client can switch tiers; the demo switches on the page, a real proposal publishes a version and reloads.
  const [tierId, setTierId] = useState<TierId>(tiers.find(t => t.current)?.id ?? 'recommended')
  const [taken, setTaken] = useState<Record<string, boolean>>({})
  const [planBusy, setPlanBusy] = useState<string | null>(null)
  const tier = tiers.find(t => t.id === tierId) ?? tiers[1]
  const [addons, setAddons] = useState<string[]>(version.addons ?? [])
  // Someone who is not the creator gives a name and email once before their first action (the second lead).
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [pending, setPending] = useState<{ label: string; run: (by: Identity | null) => void } | null>(null)
  const needIdentity = !canEdit && !demo
  const withIdentity = (label: string, run: (by: Identity | null) => void) => {
    if (!needIdentity) { run(null); return }
    const known = identity ?? loadIdentity()
    if (known) { setIdentity(known); run(known); return }
    setPending({ label, run })
  }
  const poolById = new Map(pool.map(s => [s.id, s]))
  const extraIds = Object.entries(taken).filter(([, on]) => on).flatMap(([id]) => suggestions.find(x => x.id === id)?.siteIds ?? [])
  const sites = tier.current && !extraIds.length ? planSites : [...tier.siteIds, ...extraIds].filter((id, i, a) => a.indexOf(id) === i).map(id => poolById.get(id) ?? planSites.find(x => x.id === id)).filter((x): x is View['pool'][number] => !!x)
  const totals = tier.current && !extraIds.length ? planTotals : tier.totals
  const inPlan = cities.filter(c => c.sites > 0)
  const offered = cities.filter(c => c.sites === 0)
  const [cityBusy, setCityBusy] = useState<string | null>(null)
  const [cityDone, setCityDone] = useState<Record<string, 'added' | 'requested'>>({})
  const [status, setStatus] = useState<ProposalStatus>(doc.status)
  const [ask, setAsk] = useState(false)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const paged = new Set(pagedIds)
  const brief = doc.brief
  const whereLabel = citiesLabel(brief.countrySlug, inPlan.map(c => c.slug))
  const objective = OBJECTIVES.find(o => o.id === brief.objective)?.label
  const pins = sites.map(s => s.lat != null && s.lng != null ? { id: s.id, lat: s.lat, lng: s.lng, title: s.name, subtitle: [s.displayFormat ?? s.format, s.areaName].filter(Boolean).join(' · ') } : null).filter(Boolean) as MapPin[]

  const act = (action: 'approve' | 'request-changes') => withIdentity(action === 'approve' ? 'approve the plan' : 'send your request', by => actNow(action, by))
  const actNow = async (action: 'approve' | 'request-changes', by: Identity | null) => {
    if (demo) { setStatus(action === 'approve' ? 'approved' : 'changes-requested'); setAsk(false); setMessage(''); return }
    setBusy(true); setError(null)
    const r = await fetch(`/api/proposals/${doc.shareId}/status`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action, message, by }) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    setBusy(false)
    if (!r || !r.ok) { setError(j?.error ?? 'Something went wrong. Please try again.'); return }
    setStatus(j.status); setAsk(false); setMessage('')
  }
  const askCity = (slug: string, available: boolean) => withIdentity(available ? 'add the city' : 'send your request', by => askCityNow(slug, available, by))
  const askCityNow = async (slug: string, available: boolean, by: Identity | null) => {
    if (demo) { setCityDone(d => ({ ...d, [slug]: available ? 'added' : 'requested' })); return }
    setCityBusy(slug); setError(null)
    const r = available
      ? await fetch(`/api/proposals/${doc.shareId}/versions`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ addCity: slug, by }) }).catch(() => null)
      : await fetch(`/api/proposals/${doc.shareId}/request-city`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ citySlug: slug, email: by?.email }) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    setCityBusy(null)
    if (!r || !r.ok) { setError(j?.error ?? 'Something went wrong. Please try again.'); return }
    setCityDone(d => ({ ...d, [slug]: available ? 'added' : 'requested' }))
    if (available) window.location.reload()
  }
  const publish = (body: Record<string, unknown>, key: string, local: () => void, label = 'update the plan') => withIdentity(label, by => publishNow({ ...body, by }, key, local))
  const publishNow = async (body: Record<string, unknown>, key: string, local: () => void) => {
    if (demo) { local(); return }
    setPlanBusy(key); setError(null)
    const r = await fetch(`/api/proposals/${doc.shareId}/versions`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    setPlanBusy(null)
    if (!r || !r.ok) { setError(j?.error ?? 'Something went wrong. Please try again.'); return }
    window.location.reload()
  }
  const chooseTier = (id: TierId) => { if (id === tierId) return; publish({ tier: id }, `tier-${id}`, () => setTierId(id)) }
  const takeSuggestion = (sg: View['suggestions'][number]) => publish(
    { addSites: sg.siteIds.map(id => ({ siteId: id, reason: sg.reasons[id] })), weeks: sg.weeks }, sg.id, () => setTaken(t => ({ ...t, [sg.id]: true })))
  const takeAddon = (id: string) => publish({ addon: id }, `addon-${id}`, () => setAddons(a => { const w = ADDONS.find(x => x.id === id)?.weeks; return [...a.filter(x => !(w && /^weeks-/.test(x))), id] }), 'add it to the plan')
  const copy = async () => { try { await navigator.clipboard.writeText(location.origin + `/proposals/${doc.shareId}`); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* no clipboard: the address bar has it */ } }

  const facts: [string, string | null][] = [
    ['Objective', objective ?? null],
    ['Market', whereLabel],
    ['Dates', brief.startDate ? `From ${fmtDate(brief.startDate)}${brief.durationWeeks ? `, ${brief.durationWeeks} weeks` : ''}` : brief.durationWeeks ? `${brief.durationWeeks} weeks` : null],
    ['Audience', brief.audience || null],
    ['Industry', brief.industry || null],
    ['Formats', brief.formats.length ? brief.formats.join(', ') : 'Any'],
  ]
  // Belt and braces: the budget band must never render, whatever the data holds.
  if (facts.some(([, v]) => v && BUDGET_BANDS.some(b => v.includes(b.label)))) throw new Error('budget on proposal page')

  return (
    <div className="bg-white text-gray-900 proposal-page">
      <section className={`relative overflow-hidden ${SG_NAVY} text-white pb-10 lg:pb-14 mw-hero-top print-hero`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none no-print" />
        <div className="relative mw-container">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Instant proposal · v{version.n}</span>
            <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${STATUS[status].cls}`}>{STATUS[status].label}</span>
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">{doc.titleLine}</h1>
          <p className="mt-3 text-lg text-blue-100/90">Prepared for {doc.creator.company} by Moving Walls · {fmtDate(version.createdAt)}</p>
          <div className="no-print mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => window.print()} className="mw-tap inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-semibold text-[#2563eb] hover:bg-cyan-50"><Printer className="h-4 w-4" aria-hidden="true" /> Print</button>
            <button type="button" onClick={copy} className="mw-tap inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10"><Link2 className="h-4 w-4" aria-hidden="true" /> {copied ? 'Link copied' : 'Copy link'}</button>
            {canEdit && <Link href={`/proposals/${doc.shareId}/edit`} className="mw-tap inline-flex items-center gap-2 rounded-lg border-2 border-cyan-300 px-5 py-2.5 font-semibold text-cyan-300 hover:bg-cyan-300/10"><Pencil className="h-4 w-4" aria-hidden="true" /> Edit proposal</Link>}
          </div>
        </div>
      </section>

      <section className="bg-white mw-section">
        <div className="mw-container">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#2563eb] sm:text-3xl lg:text-4xl">Campaign summary</h2>
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
        </div>
      </section>

      {audience.length > 0 && (
        <section className="bg-gray-50 mw-section">
          <div className="mw-container">
            <SgSectionHeading title="Who this plan reaches" intro={`The audiences that pass the proposed sites, and which sites reach each of them.${brief.audience ? ` Your brief: ${brief.audience.trim()}.` : ''}`} />
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
            <p className="mt-5 text-xs text-gray-500">Audience groups come from the planner notes on each site. Measured age, gender and frequency figures are added as media owners publish them.</p>
          </div>
        </section>
      )}

      <section className="bg-white mw-section">
        <div className="mw-container">
          <SgSectionHeading title="Your plan" intro="Three sizes of the same plan. Switch to compare; the sites, audiences and investment below follow your choice." />
          <div className="mb-10 grid gap-4 sm:grid-cols-3" role="group" aria-label="Plan size">
            {tiers.map(t => { const on = t.id === tierId; return (
              <button key={t.id} type="button" aria-pressed={on} disabled={planBusy !== null} onClick={() => chooseTier(t.id)}
                className={`mw-tap flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-colors ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-200 bg-white text-gray-900 hover:border-[#2563eb]'}`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${on ? 'text-blue-100' : 'text-mw-blue-600'}`}>{t.label}{t.id === 'recommended' ? ' · for your brief' : ''}</span>
                <span className="mt-2 text-3xl font-bold">{t.totals.sites} {t.totals.sites === 1 ? 'site' : 'sites'}</span>
                <span className={`mt-1 text-sm ${on ? 'text-blue-100/90' : 'text-gray-600'}`}>{t.totals.reach != null ? `${num(t.totals.reach)} monthly reach` : 'Reach as published'}{t.totals.investment ? ` · ${t.totals.investment.currency} ${num(t.totals.investment.low)} – ${num(t.totals.investment.high)}` : ''}</span>
                <span className={`mt-3 text-sm ${on ? 'text-white' : 'text-gray-700'}`}>{t.blurb}</span>
                <span className={`mt-4 inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold ${on ? 'bg-white/15 text-white' : 'bg-mw-blue-50 text-[#2563eb]'}`}>{planBusy === `tier-${t.id}` ? 'Switching…' : on ? 'Selected' : `Switch to ${t.label}`}</span>
              </button>
            ) })}
          </div>
          <h3 className="mb-6 text-xl font-bold text-gray-900">{sites.length} {sites.length === 1 ? 'site' : 'sites'} in {whereLabel}, strongest fit first{inPlan.length > 1 ? ', grouped by city' : ''}</h3>
          {inPlan.map(c => (
          <div key={c.slug} className="mb-10 last:mb-0">
            {inPlan.length > 1 && (
              <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-gray-200 pb-3">
                <h3 className="text-xl font-bold text-[#2563eb]">{c.name}</h3>
                <p className="text-sm text-gray-600">{c.sites} {c.sites === 1 ? 'site' : 'sites'}{c.reach != null ? ` · ${num(c.reach)} monthly reach` : ''}{c.impressions != null ? ` · ${num(c.impressions)} impressions` : ''}</p>
              </div>
            )}
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((s, i) => s.citySlug === c.slug && (
              <li key={s.id} className="flex flex-col break-inside-avoid">
                <div className="relative">
                  <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-sm font-bold text-white">{i + 1}</span>
                  <SiteCard site={s} linked={paged.has(s.id)} addable={false} />
                </div>
                <div className="-mt-2 rounded-b-2xl border border-t-0 border-mw-blue-100 bg-mw-blue-50/50 px-5 pb-4 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-mw-blue-600">Why this site</p>
                  <p className="mt-1 text-sm text-gray-800">{s.reason}</p>
                  {s.audience?.reach && <p className="mt-2 text-xs text-gray-500">Monthly reach {s.audience.reach}{s.audience.impressions ? ` · impressions ${s.audience.impressions}` : ''}</p>}
                  {!s.audience?.reach && !s.audience?.impressions && <p className="mt-2 text-xs text-gray-500">Audience figures not yet published for this site.</p>}
                  <SpecList site={s} />
                </div>
              </li>
            ))}
          </ol>
          </div>
          ))}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Sites" value={String(totals.sites)} />
            {totals.reach != null && <Stat label="Combined monthly reach" value={num(totals.reach)!} note={`across ${totals.withFigures} of ${totals.sites} sites with published figures`} />}
            {totals.impressions != null && <Stat label="Combined monthly impressions" value={num(totals.impressions)!} note={`across ${totals.withFigures} of ${totals.sites} sites with published figures`} />}
            {totals.investment && <Stat label="Indicative media investment" value={`${totals.investment.currency} ${num(totals.investment.low)} – ${num(totals.investment.high)}`} note={`${brief.durationWeeks ? `${brief.durationWeeks} weeks, ` : ''}${totals.investment.priced} of ${totals.sites} sites priced`} />}
          </div>
          {totals.investment && <p className="mt-3 max-w-3xl text-xs text-gray-500">{PRICE_NOTE}</p>}
        </div>
      </section>

      {suggestions.length > 0 && (
        <section className="bg-gray-50 mw-section no-print">
          <div className="mw-container">
            <SgSectionHeading title="Make it stronger" intro="What this plan does not cover yet, and what each addition brings. Add any of them and the proposal updates on the spot." />
            <ul className="grid gap-4 sm:grid-cols-2">
              {suggestions.map(sg => { const on = !!taken[sg.id]; const d = sg.delta; return (
                <li key={sg.id} className={`flex flex-col rounded-2xl border p-5 ${on ? 'border-[#2563eb] bg-mw-blue-50/40' : 'border-gray-200 bg-white'}`}>
                  <h3 className="font-bold text-gray-900">{sg.title}</h3>
                  <p className="mt-1 text-sm text-gray-700">{sg.body}</p>
                  {sg.siteIds.length > 0 && <p className="mt-2 text-xs text-gray-500">Adds {sg.siteIds.map(id => poolById.get(id)?.name ?? id).join(', ')}</p>}
                  {d && (
                    <p className="mt-3 text-sm font-semibold text-[#2563eb]">
                      {d.sites > 0 ? `+${d.sites} ${d.sites === 1 ? 'site' : 'sites'}` : sg.weeks ? `${sg.weeks} weeks` : ''}
                      {d.reach != null ? ` · +${num(d.reach)} monthly reach` : ''}
                      {d.investment && (d.investment.low || d.investment.high) ? ` · +${d.investment.currency} ${num(d.investment.low)} – ${num(d.investment.high)}` : ''}
                    </p>
                  )}
                  <button type="button" disabled={on || planBusy !== null} onClick={() => takeSuggestion(sg)}
                    className={`mw-tap mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold ${on ? 'border border-gray-200 bg-white text-gray-500' : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'} disabled:opacity-80`}>
                    {planBusy === sg.id ? 'Adding…' : on ? 'Added to your plan' : 'Add to my plan'}
                  </button>
                </li>
              ) })}
            </ul>
            {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
          </div>
        </section>
      )}

      {offered.length > 0 && (
        <section className="bg-white mw-section no-print">
          <div className="mw-container">
            <SgSectionHeading title="Run it in more cities" intro={`The same brief and the same audience, planned for another city in ${brief.countrySlug === 'malaysia' ? 'Malaysia' : 'the country'}. Add a city and it joins this proposal as its own group; you can take it out again later.`} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {offered.map(c => { const state = cityDone[c.slug] ?? (c.requested ? 'requested' : null); return (
                <li key={c.slug} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5">
                  <h3 className="font-bold text-gray-900">{c.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-gray-600">{c.available ? 'Sites picked for this brief, with their audiences and figures, added as a city group.' : 'Inventory is being connected. Ask for it and a planner builds this city by hand within one working day.'}</p>
                  <button type="button" disabled={!!state || cityBusy === c.slug} onClick={() => askCity(c.slug, c.available)}
                    className={`mw-tap mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold ${state ? 'border border-gray-200 bg-gray-50 text-gray-500' : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'} disabled:opacity-80`}>
                    {cityBusy === c.slug ? 'Working…' : state === 'added' ? `${c.name} added` : state === 'requested' ? `${c.name} requested` : c.available ? `Add ${c.name} to my plan` : `Request a plan for ${c.name}`}
                  </button>
                </li>
              ) })}
            </ul>
            {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
          </div>
        </section>
      )}

      {shownAddons.length > 0 && (
      <section className="bg-gray-50 mw-section no-print">
        <div className="mw-container">
          <SgSectionHeading title="Add-ons" intro="Services that make the campaign land better. Pick any; the planner confirms the details with you." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shownAddons.map(a => { const on = addons.includes(a.id); const busyNow = planBusy === `addon-${a.id}`; return (
              <li key={a.id} className={`flex flex-col rounded-2xl border p-5 ${on ? 'border-[#2563eb] bg-mw-blue-50/40' : 'border-gray-200 bg-white'}`}>
                {a.product && <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{a.product}</p>}
                <h3 className="mt-1 font-bold text-gray-900">{a.title}</h3>
                <p className="mt-1 text-sm font-semibold text-[#2563eb]">{a.benefit}</p>
                <p className="mt-2 flex-1 text-sm text-gray-700">{a.detail}</p>
                <p className="mt-3 text-xs text-gray-500">{a.price === 'rates' ? 'Priced from the site rates; the investment range updates.' : 'Price on request, confirmed by the planner.'}</p>
                <button type="button" disabled={on || planBusy !== null} onClick={() => takeAddon(a.id)}
                  className={`mw-tap mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold ${on ? 'border border-gray-200 bg-white text-gray-500' : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'} disabled:opacity-80`}>
                  {busyNow ? 'Adding…' : on ? 'In your plan' : 'Add'}
                </button>
              </li>
            ) })}
          </ul>
          {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
        </div>
      </section>
      )}

      {pins.length > 0 && (
        <section className="bg-gray-50 mw-section">
          <div className="mw-container">
            <SgSectionHeading title="Where the sites are" />
            <div className="no-print"><BrandMap pins={pins} title={`Map of the proposed sites in ${brief.cityName}`} className="h-72 sm:h-96 lg:h-[480px]" /></div>
            <ol className="print-only mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-700">
              {sites.map(s => <li key={s.id}><span className="font-semibold">{s.name}</span>{s.address ? ` — ${s.address}` : ''}</li>)}
            </ol>
          </div>
        </section>
      )}

      <section className="bg-white mw-section">
        <div className="mw-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SgSectionHeading title="Next steps" />
            <ol className="space-y-4">
              {[
                ['Confirm the sites', 'Approve this plan, or tell us what to change. The link stays the same; the plan updates.'],
                ['Availability check', 'A Moving Walls planner confirms each site for your dates within one working day.'],
                ['Artwork and specs', 'We send the specs for every screen and board, and can mock up your creative on each.'],
                ['Go live', 'Campaign starts on your date, with play reports for digital sites.'],
              ].map(([h, b], i) => (
                <li key={h} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-bold text-white">{i + 1}</span>
                  <div><p className="font-bold text-gray-900">{h}</p><p className="text-sm text-gray-600">{b}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5 no-print">
            <div className={`rounded-2xl ${SG_NAVY} p-6 text-white`}>
              {status === 'approved' ? (
                <>
                  <p className="flex items-center gap-2 text-lg font-bold"><Check className="h-5 w-5 text-emerald-300" aria-hidden="true" /> Approved</p>
                  <p className="mt-2 text-blue-100/90">Thank you. Our team is checking availability and will be in touch.</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold">Happy with this plan?</p>
                  <p className="mt-1 text-blue-100/90">Approve it and we start the availability check. Or ask for changes.</p>
                  <div className="mt-5 flex flex-col gap-3">
                    <SgFormButton onOpen={() => act('approve')} showArrow={false}>{busy && !ask ? 'Sending…' : 'Approve this proposal'}</SgFormButton>
                    <button type="button" onClick={() => setAsk(a => !a)} className="mw-tap inline-flex items-center justify-center rounded-lg border-2 border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">Request changes</button>
                  </div>
                  {status === 'changes-requested' && !ask && <p className="mt-3 text-sm text-amber-200">Your change request is with our team.</p>}
                  {ask && (
                    <form className="mt-4" onSubmit={e => { e.preventDefault(); act('request-changes') }}>
                      <label className="block text-sm font-semibold">What should change?
                        <textarea value={message} onChange={e => setMessage(e.target.value)} required maxLength={1000} rows={4} placeholder="e.g. Swap the mall sites for roadside, and start two weeks later" className="mt-1 w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-blue-100/60 focus:border-cyan-300 focus:outline-none" />
                      </label>
                      <button type="submit" disabled={busy} className="mw-tap mt-3 w-full rounded-lg bg-cyan-300 px-4 py-2.5 font-semibold text-[#2563eb] hover:bg-cyan-200 disabled:opacity-60">{busy ? 'Sending…' : 'Send request'}</button>
                    </form>
                  )}
                </>
              )}
              {error && <p className="mt-3 text-sm text-red-200" role="alert">{error}</p>}
            </div>
          </div>
        </div>
      </section>

      {doc.versions.length > 0 && (
        <section className="bg-white mw-section-sm">
          <div className="mw-container">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Versions</h2>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
              {[...doc.versions].sort((a, b) => b.n - a.n).map(v => (
                <li key={v.n} className={v.n === version.n ? 'font-semibold text-gray-900' : ''}>v{v.n} · {fmtDate(v.createdAt)} · {v.sites.length} sites{v.n === version.n ? ' · current' : ''}</li>
              ))}
            </ul>
            <p className="mt-4 max-w-3xl text-xs text-gray-500">Site photos, formats and audience figures are shown as published by the media owner; availability and final placements are confirmed by Moving Walls before booking.</p>
          </div>
        </section>
      )}
      <IdentitySheet open={!!pending} action={pending?.label ?? 'continue'} onClose={() => setPending(null)} onDone={i => { setIdentity(i); const run = pending?.run; setPending(null); run?.(i) }} />
    </div>
  )
}

function SpecList({ site }: { site: { size: string | null; illuminated: boolean | null; digital: { spotSeconds: number | null; spotsPerLoop: number | null; loopSeconds: number | null } | null; specs: SiteSpecs | null } }) {
  const sp = site.specs
  const d = site.digital
  const rows: [string, string | null][] = [
    ['Size', site.size],
    ['Resolution', sp?.resolution ?? null],
    ['Panels / screens', sp?.panels != null || sp?.screens != null ? [sp?.panels != null ? `${sp.panels} panel${sp.panels === 1 ? '' : 's'}` : null, sp?.screens != null ? `${sp.screens} screen${sp.screens === 1 ? '' : 's'}` : null].filter(Boolean).join(' · ') : null],
    ['Loop', d?.spotSeconds ? `${d.spotSeconds}s spot${d.spotsPerLoop ? ` · ${d.spotsPerLoop} per loop` : ''}${d.loopSeconds ? ` · ${d.loopSeconds}s loop` : ''}` : null],
    ['Illuminated', site.illuminated == null ? null : site.illuminated ? 'Yes' : 'No'],
    ['Lead time', sp?.leadTimeDays != null ? `${sp.leadTimeDays} days` : null],
    ['Player', sp?.playerSoftware ?? null],
    ['Content approval', sp?.contentApproval == null ? null : sp.contentApproval ? 'Required' : 'Not required'],
    ['Board type', sp?.boardType ?? null],
    ['Files', [sp?.videoFormats?.length ? `video ${sp.videoFormats.join('/')}` : null, sp?.imageFormats?.length ? `image ${sp.imageFormats.join('/')}` : null, sp?.audioFormats?.length ? `audio ${sp.audioFormats.join('/')}` : null].filter(Boolean).join(' · ') || null],
  ]
  const shown = rows.filter(([, v]) => v)
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

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-[#2563eb]">{value}</p>
      {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
    </div>
  )
}
