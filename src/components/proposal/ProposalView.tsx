'use client'

// The proposal page a client receives. Summary, the sites with why each was
// picked, totals, a map, next steps with Approve / Request changes, and the
// version list. Printable (actions and the map are hidden in print; the map
// has an address list behind it). No prices anywhere. Rif, 11 Nov 2026.

import { useState } from 'react'
import Link from 'next/link'
import { Check, Link2, Pencil, Printer } from 'lucide-react'
import { SG_NAVY, SgSectionHeading, SgFormButton } from '../SingaporeShared'
import { SiteCard, SampleBanner } from '../inventory/InventoryShared'
import { BrandMap, type MapPin } from '../inventory/BrandMap'
import { OBJECTIVES, BUDGET_BANDS } from '@/lib/proposal/markets'
import type { ProposalView as View, ProposalStatus } from '@/lib/proposal/types'

const STATUS: Record<ProposalStatus, { label: string; cls: string }> = {
  draft: { label: 'Draft', cls: 'bg-white/15 text-white' },
  sent: { label: 'For your review', cls: 'bg-cyan-300 text-[#062068]' },
  approved: { label: 'Approved', cls: 'bg-emerald-300 text-emerald-950' },
  'changes-requested': { label: 'Changes requested', cls: 'bg-amber-300 text-amber-950' },
}

const fmtDate = (iso: string | null | undefined) => iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null
const num = (n: number | null) => n == null ? null : n.toLocaleString('en-US')

export function ProposalView({ view, canEdit, pagedIds }: { view: View; canEdit: boolean; pagedIds: string[] }) {
  const { doc, version, sites, totals } = view
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
          {anySample && <SampleBanner />}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Instant proposal · v{version.n}</span>
            <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${STATUS[status].cls}`}>{STATUS[status].label}</span>
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">{doc.titleLine}</h1>
          <p className="mt-3 text-lg text-blue-100/90">Prepared for {doc.creator.company} by Moving Walls · {fmtDate(version.createdAt)}</p>
          <div className="no-print mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => window.print()} className="mw-tap inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-semibold text-[#062068] hover:bg-cyan-50"><Printer className="h-4 w-4" aria-hidden="true" /> Print</button>
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
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">{k}</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-gray-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 mw-section">
        <div className="mw-container">
          <SgSectionHeading title="Recommended sites" intro={`${sites.length} ${sites.length === 1 ? 'site' : 'sites'} in ${brief.cityName}, strongest fit first.`} />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((s, i) => (
              <li key={s.id} className="flex flex-col break-inside-avoid">
                <div className="relative">
                  <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#062068] text-sm font-bold text-white">{i + 1}</span>
                  <SiteCard site={s} linked={paged.has(s.id)} addable={false} />
                </div>
                <div className="-mt-2 rounded-b-2xl border border-t-0 border-mw-blue-100 bg-mw-blue-50/50 px-5 pb-4 pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-mw-blue-600">Why this site</p>
                  <p className="mt-1 text-sm text-gray-800">{s.reason}</p>
                  {s.audience?.reach && <p className="mt-2 text-xs text-gray-500">Monthly reach {s.audience.reach}{s.audience.impressions ? ` · impressions ${s.audience.impressions}` : ''}</p>}
                  {!s.audience?.reach && !s.audience?.impressions && <p className="mt-2 text-xs text-gray-500">Audience figures not yet published for this site.</p>}
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Sites" value={String(totals.sites)} />
            {totals.reach != null && <Stat label="Combined monthly reach" value={num(totals.reach)!} note={`across ${totals.withFigures} of ${totals.sites} sites with published figures`} />}
            {totals.impressions != null && <Stat label="Combined monthly impressions" value={num(totals.impressions)!} note={`across ${totals.withFigures} of ${totals.sites} sites with published figures`} />}
          </div>
        </div>
      </section>

      {pins.length > 0 && (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <SgSectionHeading title="Where the sites are" />
            <div className="no-print"><BrandMap pins={pins} title={`Map of the proposed sites in ${brief.cityName}`} className="h-72 sm:h-96 lg:h-[480px]" /></div>
            <ol className="print-only mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-700">
              {sites.map(s => <li key={s.id}><span className="font-semibold">{s.name}</span>{s.address ? ` — ${s.address}` : ''}</li>)}
            </ol>
          </div>
        </section>
      )}

      <section className="bg-gray-50 mw-section">
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
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#062068] text-sm font-bold text-white">{i + 1}</span>
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
                      <button type="submit" disabled={busy} className="mw-tap mt-3 w-full rounded-lg bg-cyan-300 px-4 py-2.5 font-semibold text-[#062068] hover:bg-cyan-200 disabled:opacity-60">{busy ? 'Sending…' : 'Send request'}</button>
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
            <p className="mt-4 text-xs text-gray-500">Site photos, formats and audience figures are shown as published by the media owner; availability and final placements are confirmed by Moving Walls before booking.</p>
          </div>
        </section>
      )}
    </div>
  )
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-[#062068]">{value}</p>
      {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
    </div>
  )
}
