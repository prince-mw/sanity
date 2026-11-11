'use client'

// The proposal page a client receives. Summary, the sites with why each was
// picked, totals, a map, next steps with Approve / Request changes, and the
// version list. Printable (actions and the map are hidden in print; the map
// has an address list behind it). No prices anywhere. Rif, 11 Nov 2026.

import { useState } from 'react'
import Link from 'next/link'
import { Check, Link2, Pencil, Printer, TrainFront, ShoppingBag, Camera, Briefcase, Users, GraduationCap, Moon, Plane, Car, Home, type LucideIcon } from 'lucide-react'
import { SG_NAVY, SgSectionHeading, SgFormButton } from '../SingaporeShared'
import { SiteCard, SampleBanner } from '../inventory/InventoryShared'
import { BrandMap, type MapPin } from '../inventory/BrandMap'
import { OBJECTIVES, BUDGET_BANDS } from '@/lib/proposal/markets'
import type { ProposalView as View, ProposalStatus } from '@/lib/proposal/types'
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
  const { doc, version, sites, totals, audience } = view
  const anySampleSpecs = sites.some(s => s.specs?.sample)
  const [status, setStatus] = useState<ProposalStatus>(doc.status)
  const [ask, setAsk] = useState(false)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const paged = new Set(pagedIds)
  const brief = doc.brief
  const objective = OBJECTIVES.find(o => o.id === brief.objective)?.label
  const pins = sites.map(s => s.lat != null && s.lng != null ? { id: s.id, lat: s.lat, lng: s.lng, title: s.name, subtitle: [s.displayFormat ?? s.format, s.areaName].filter(Boolean).join(' · ') } : null).filter(Boolean) as MapPin[]
  const anySample = sites.some(s => s.sample)

  const act = async (action: 'approve' | 'request-changes') => {
    if (demo) { setStatus(action === 'approve' ? 'approved' : 'changes-requested'); setAsk(false); setMessage(''); return }
    setBusy(true); setError(null)
    const r = await fetch(`/api/proposals/${doc.shareId}/status`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action, message }) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    setBusy(false)
    if (!r || !r.ok) { setError(j?.error ?? 'Something went wrong. Please try again.'); return }
    setStatus(j.status); setAsk(false); setMessage('')
  }
  const copy = async () => { try { await navigator.clipboard.writeText(location.origin + `/proposals/${doc.shareId}`); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* no clipboard: the address bar has it */ } }

  const facts: [string, string | null][] = [
    ['Objective', objective ?? null],
    ['Market', `${brief.cityName}`],
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
          {demo && <div className="no-print mb-5 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-amber-950">Sample proposal for design review — built from the Kuala Lumpur inventory, nothing here is saved or sent.</div>}
          {anySample && <SampleBanner />}
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
          <SgSectionHeading title="Campaign summary" />
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="lg:col-span-7 text-lg leading-relaxed text-gray-700">{version.summary}</p>
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
          <SgSectionHeading title="Recommended sites" intro={`${sites.length} ${sites.length === 1 ? 'site' : 'sites'} in ${brief.cityName}, strongest fit first.`} />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((s, i) => (
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
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Sites" value={String(totals.sites)} />
            {totals.reach != null && <Stat label="Combined monthly reach" value={num(totals.reach)!} note={`across ${totals.withFigures} of ${totals.sites} sites with published figures`} />}
            {totals.impressions != null && <Stat label="Combined monthly impressions" value={num(totals.impressions)!} note={`across ${totals.withFigures} of ${totals.sites} sites with published figures`} />}
            {totals.investment && <Stat label="Indicative media investment" value={`${totals.investment.currency} ${num(totals.investment.low)} – ${num(totals.investment.high)}`} note={`${brief.durationWeeks ? `${brief.durationWeeks} weeks, ` : ''}${totals.investment.priced} of ${totals.sites} sites priced`} />}
          </div>
          {totals.investment && <p className="mt-3 max-w-3xl text-xs text-gray-500">{PRICE_NOTE}</p>}
          {anySampleSpecs && <p className="mt-2 max-w-3xl text-xs text-amber-700">Specifications shown are stand-ins until the Inventory API is connected.</p>}
        </div>
      </section>

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
