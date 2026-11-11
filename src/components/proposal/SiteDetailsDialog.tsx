'use client'

// The site details popup on the editor's Add sites tab (Rif, 11 Nov 2026):
// one place for audience insights and screen specifications, so a card stays
// short. Native <dialog>, closed by Escape, the Close button or the backdrop.

import Image from 'next/image'
import { useEffect, useRef, type ReactNode } from 'react'
import { X, TrainFront, ShoppingBag, Camera, Briefcase, Users, GraduationCap, Moon, Plane, Car, Home, type LucideIcon } from 'lucide-react'
import type { PublicSite, SiteSpecs } from '@/lib/inventory/types'
import type { Persona } from '@/lib/inventory/siteContent'
import { SampleTag } from '../inventory/InventoryShared'

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

export type SiteInsights = { description: string | null; personas: Persona[] }

export function SiteDetailsDialog({ site, insights, onClose, action }: { site: PublicSite | null; insights?: SiteInsights; onClose: () => void; action?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (site && !el.open) el.showModal()
    if (!site && el.open) el.close()
  }, [site])
  const rows = site ? specRows(site) : []
  const personas = insights?.personas ?? []
  return (
    <dialog ref={ref} onClose={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }} aria-label={site ? `${site.name} details` : 'Site details'}
      className="m-auto w-[min(94vw,60rem)] max-h-[92vh] overflow-hidden rounded-2xl bg-white p-0 text-gray-900 shadow-xl backdrop:bg-gray-900/60 open:flex open:flex-col">
      {site && (
        <>
          <div className="flex items-start gap-4 border-b border-gray-200 p-5 sm:p-6">
            <span className="relative hidden h-24 w-36 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:block">{site.photos[0] && <Image src={site.photos[0]} alt="" fill sizes="144px" className="object-cover" />}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">{site.displayFormat ?? site.format}</span>
                {site.sample && <SampleTag />}
              </div>
              <h2 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">{site.name}</h2>
              <p className="mt-1 text-sm text-gray-500">{[site.address, `${site.areaName}, ${site.cityName}`].filter(Boolean).join(' · ')}</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close" className="mw-tap -mr-2 -mt-2 rounded-lg p-2 text-gray-500 hover:bg-gray-100"><X className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
            <div className="grid gap-8 md:grid-cols-5">
              <section className="md:col-span-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">Audience insights</h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-gray-500">Monthly reach</p><p className="mt-1 text-lg font-bold">{site.audience?.reach ?? 'As published'}</p></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs text-gray-500">Monthly impressions</p><p className="mt-1 text-lg font-bold">{site.audience?.impressions ?? 'As published'}</p></div>
                </div>
                {insights?.description && <p className="mt-4 text-sm leading-relaxed text-gray-700">{insights.description}</p>}
                {personas.length > 0 ? (
                  <ul className="mt-4 space-y-3">
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
                ) : <p className="mt-4 text-sm text-gray-500">Audience personas for this site are written once the site goes live.</p>}
              </section>
              <section className="md:col-span-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">Screen specifications</h3>
                {rows.length > 0 ? (
                  <dl className="mt-3 divide-y divide-gray-200 rounded-xl border border-gray-200">
                    {rows.map(([k, v]) => <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-2.5 text-sm"><dt className="text-gray-500">{k}</dt><dd className="text-right font-semibold text-gray-800">{v}</dd></div>)}
                  </dl>
                ) : <p className="mt-3 text-sm text-gray-500">Specifications come with the live inventory record.</p>}
              </section>
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
