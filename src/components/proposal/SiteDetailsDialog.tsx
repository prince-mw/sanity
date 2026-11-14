'use client'

// The site details popup on the editor's Add sites tab (Rif, 11 Nov 2026):
// one place for audience insights and screen specifications, so a card stays
// short. Native <dialog>, closed by Escape, the Close button or the backdrop.

import Image from 'next/image'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { X, MapPin, ExternalLink, TrainFront, ShoppingBag, Camera, Briefcase, Users, GraduationCap, Moon, Plane, Car, Home, type LucideIcon } from 'lucide-react'
import type { PublicSite, SiteSpecs } from '@/lib/inventory/types'
import type { Persona } from '@/lib/inventory/siteContent'
import { SampleTag, SitesMap } from '../inventory/InventoryShared'

export const PERSONA_ICONS: Record<string, LucideIcon> = { commuter: TrainFront, shopper: ShoppingBag, tourist: Camera, office: Briefcase, family: Users, student: GraduationCap, nightlife: Moon, traveller: Plane, driver: Car, resident: Home }

/** What a planner needs to brief artwork and timing, as label/value rows; empty values are dropped. */
export function specRows(site: { size: string | null; illuminated: boolean | null; digital: { spotSeconds: number | null; spotsPerLoop: number | null; loopSeconds: number | null } | null; specs: SiteSpecs | null }): [string, string][] {
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
  return rows.filter((r): r is [string, string] => !!r[1])
}

/** `typical`: no written personas yet, so these are the usual audiences for this kind of site. */
export type SiteInsights = { description: string | null; personas: Persona[]; typical?: boolean }

export function SiteDetailsDialog({ site, insights, onClose, action }: { site: PublicSite | null; insights?: SiteInsights; onClose: () => void; action?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (site && !el.open) el.showModal()
    if (!site && el.open) el.close()
  }, [site])
  const rows: [string, string][] = site ? [
    ...([['Format', site.displayFormat ?? site.format], ['Venue', site.venueType]] as [string, string | null][]).filter((r): r is [string, string] => !!r[1]),
    ...specRows(site),
  ] : []
  const personas = insights?.personas ?? []
  const [shown, setShown] = useState(0)
  useEffect(() => setShown(0), [site?.id])
  const photo = site?.photos[shown] ?? site?.photos[0]
  const hasFigures = !!(site?.audience?.reach || site?.audience?.impressions)
  const mapsHref = site?.lat != null && site?.lng != null ? `https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}` : null
  const heading = 'text-xs font-bold uppercase tracking-wider text-mw-blue-600'
  return (
    <dialog ref={ref} onClose={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }} aria-label={site ? `${site.name} details` : 'Site details'}
      className="m-auto w-[min(94vw,60rem)] max-h-[92vh] overflow-hidden rounded-2xl bg-white p-0 text-gray-900 shadow-xl backdrop:bg-gray-900/60 open:flex open:flex-col">
      {site && (
        <>
          <div className="flex items-start gap-4 border-b border-gray-200 p-5 sm:p-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">{site.displayFormat ?? site.format}</span>
                {site.sample && <SampleTag />}
              </div>
              <h2 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">{site.name}</h2>
              <p className="mt-1 text-sm text-gray-500">{site.areaSlug === site.citySlug ? site.cityName : `${site.areaName}, ${site.cityName}`}</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close" className="mw-tap -mr-2 -mt-2 rounded-lg p-2 text-gray-500 hover:bg-gray-100"><X className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
            <div className="grid gap-8 md:grid-cols-5">
              <div className="space-y-8 md:col-span-3">
                {/* Photos: every one the site has; the row picks the big one */}
                {photo && (
                  <section aria-label="Photos">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-100"><Image src={photo} alt={`${site.name}, ${site.areaName}`} fill sizes="(min-width: 768px) 560px, 94vw" className="object-cover" /></div>
                    {site.photos.length > 1 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {site.photos.slice(0, 8).map((p, i) => (
                          <button key={p} type="button" onClick={() => setShown(i)} aria-label={`Photo ${i + 1}`} className={`mw-tap relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg ring-2 ${i === shown ? 'ring-[#2563eb]' : 'ring-transparent'}`}>
                            <Image src={p} alt="" fill sizes="64px" className="object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </section>
                )}
                {insights?.description && (
                  <section>
                    <h3 className={heading}>About this site</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">{insights.description}</p>
                  </section>
                )}
                <section>
                  <h3 className={heading}>Audience insights</h3>
                  {hasFigures ? (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {site.audience?.reach && <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-gray-500">Monthly reach</p><p className="mt-1 text-lg font-bold">{site.audience.reach}</p></div>}
                      {site.audience?.impressions && <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-gray-500">Monthly impressions</p><p className="mt-1 text-lg font-bold">{site.audience.impressions}</p></div>}
                    </div>
                  ) : <p className="mt-3 text-sm text-gray-500">Reach and impression figures are shared in your proposal.</p>}
                  {personas.length > 0 && (
                    <>
                      <p className="mt-5 text-sm font-semibold text-gray-900">Who you reach</p>
                      {insights?.typical && <p className="mt-1 text-xs text-gray-500">Typical audiences for sites like this one. Your proposal adds measured figures.</p>}
                      <ul className="mt-3 space-y-3">
                        {personas.map(p => { const Icon = PERSONA_ICONS[p.icon] ?? Users; return (
                          <li key={p.name} className="flex gap-3 rounded-xl border border-gray-200 p-4">
                            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-mw-blue-50 text-mw-blue-600"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                            <div className="min-w-0">
                              <p className="font-bold">{p.name}</p>
                              <p className="mt-0.5 text-sm text-gray-700">{p.who}</p>
                              <p className="mt-1 text-xs text-gray-500"><span className="font-semibold text-gray-600">When</span> {p.when} · <span className="font-semibold text-gray-600">Why</span> {p.why}</p>
                            </div>
                          </li>
                        ) })}
                      </ul>
                    </>
                  )}
                </section>
              </div>
              <div className="space-y-8 md:col-span-2">
                <section>
                  <h3 className={heading}>Location</h3>
                  <p className="mt-3 flex gap-2 text-sm text-gray-700"><MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-mw-blue-600" aria-hidden="true" /><span>{[site.address, site.areaName, site.cityName, site.countryName].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(', ')}</span></p>
                  {site.lat != null && site.lng != null && <div className="mt-3 overflow-hidden rounded-xl"><SitesMap sites={[site]} title={`Map of ${site.name}`} className="h-48" /></div>}
                  {mapsHref && <a href={mapsHref} target="_blank" rel="noopener nofollow" className="mw-tap mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] hover:underline">Open in Google Maps <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>}
                </section>
                <section>
                  <h3 className={heading}>Screen specifications</h3>
                  {rows.length > 0 ? (
                    <dl className="mt-3 divide-y divide-gray-200 rounded-xl border border-gray-200">
                      {rows.map(([k, v]) => <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-2.5 text-sm"><dt className="text-gray-500">{k}</dt><dd className="text-right font-semibold text-gray-800">{v}</dd></div>)}
                    </dl>
                  ) : <p className="mt-3 text-sm text-gray-500">Specifications come with the live inventory record.</p>}
                </section>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-4 sm:px-6">
            <button type="button" onClick={onClose} className="mw-tap rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#2563eb]">Close</button>
            {action}
          </div>
        </>
      )}
    </dialog>
  )
}
