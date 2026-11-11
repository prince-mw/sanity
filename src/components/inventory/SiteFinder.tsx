'use client'

// The public site finder (Rif, 11 Nov 2026: "same way as the edit proposal"):
// a filter sidebar on the left — search, area, format, venue type, Clear all —
// and the map and site cards on the right. Every card has Details, which opens
// the same popup as the proposal editor (audience insights + screen specs),
// next to Add to proposal. On phones the filters fold behind one button.

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Info, Search, SlidersHorizontal } from 'lucide-react'
import type { PublicSite } from '@/lib/inventory/types'
import { SiteGrid, sitePath } from './InventoryShared'
import { AddToProposalButton } from '../proposal/AddToProposalButton'
import { SiteDetailsDialog, type SiteInsights } from '../proposal/SiteDetailsDialog'

type Option = { value: string; label: string; count: number }

function RadioGroup({ name, legend, options, value, onChange, allLabel }: { name: string; legend: string; options: Option[]; value: string; onChange: (v: string) => void; allLabel: string }) {
  return (
    <fieldset className="mt-5 border-t border-gray-200 pt-4">
      <legend className="text-xs font-semibold text-gray-500">{legend}</legend>
      <div className="mt-2 flex flex-col gap-1.5">
        {[{ value: 'all', label: allLabel, count: -1 }, ...options].map(o => (
          <label key={o.value} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer sr-only" />
            <span aria-hidden="true" className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-gray-300 bg-white peer-checked:border-[5px] peer-checked:border-[#2563eb] peer-focus-visible:ring-2 peer-focus-visible:ring-mw-blue-200" />
            <span className="flex-1">{o.label}</span>
            {o.count >= 0 && <span className="text-xs text-gray-400">{o.count}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const optionsOf = (sites: PublicSite[], get: (s: PublicSite) => [string, string] | null): Option[] => {
  const m = new Map<string, Option>()
  for (const s of sites) { const kv = get(s); if (!kv) continue; const o = m.get(kv[0]) ?? { value: kv[0], label: kv[1], count: 0 }; o.count++; m.set(kv[0], o) }
  return Array.from(m.values()).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

export function SiteFinder({ sites, hasPage, mapTitle, insights = {}, showAreas = true }: { sites: PublicSite[]; hasPage: (s: PublicSite) => boolean; mapTitle: string; insights?: Record<string, SiteInsights>; showAreas?: boolean }) {
  const [q, setQ] = useState('')
  const [area, setArea] = useState('all')
  const [format, setFormat] = useState('all')
  const [venue, setVenue] = useState('all')
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState<PublicSite | null>(null)

  const areas = useMemo(() => optionsOf(sites, s => [s.areaSlug, s.areaName]), [sites])
  const formats = useMemo(() => optionsOf(sites, s => { const f = s.displayFormat ?? s.format ?? 'Other'; return [f, f] }), [sites])
  const venues = useMemo(() => optionsOf(sites, s => s.venueType ? [s.venueType, s.venueType] : null), [sites])
  const needle = q.trim().toLowerCase()
  const shown = sites.filter(s => (area === 'all' || s.areaSlug === area)
    && (format === 'all' || (s.displayFormat ?? s.format ?? 'Other') === format)
    && (venue === 'all' || s.venueType === venue)
    && (!needle || [s.name, s.areaName, s.address, s.displayFormat, s.format].some(v => v?.toLowerCase().includes(needle))))
  const active = [area, format, venue].filter(v => v !== 'all').length + (needle ? 1 : 0)
  const clear = () => { setQ(''); setArea('all'); setFormat('all'); setVenue('all') }

  const action = (s: PublicSite) => (
    <span className="flex items-center gap-2">
      <button type="button" onClick={e => { e.preventDefault(); e.stopPropagation(); setDetail(s) }} className="mw-tap inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]"><Info className="h-3.5 w-3.5" aria-hidden="true" />Details</button>
      <AddToProposalButton site={s} variant="card" />
    </span>
  )

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="site-filters" className="mw-tap flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 lg:hidden">
          <span className="inline-flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" aria-hidden="true" />Filters{active > 0 ? ` · ${active}` : ''}</span>
          <span className="text-gray-500">{open ? 'Hide' : 'Show'}</span>
        </button>
        <div id="site-filters" className={`${open ? 'mt-3 block' : 'hidden'} rounded-2xl border border-gray-200 bg-white p-5 lg:sticky lg:top-24 lg:mt-0 lg:block`}>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Filter by</h3>
            {active > 0 && <button type="button" onClick={clear} className="mw-tap !min-h-0 text-xs font-semibold text-[#2563eb] hover:underline">Clear all</button>}
          </div>
          <label className="mt-4 block"><span className="text-xs font-semibold text-gray-500">Search</span>
            <span className="relative mt-1 block"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Site, area or address" className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 focus:border-mw-blue-500 focus:outline-none" /></span>
          </label>
          {showAreas && areas.length > 1 && <RadioGroup name="finder-area" legend="Area" options={areas} value={area} onChange={setArea} allLabel="All areas" />}
          {formats.length > 1 && <RadioGroup name="finder-format" legend="Format" options={formats} value={format} onChange={setFormat} allLabel="All formats" />}
          {venues.length > 1 && <RadioGroup name="finder-venue" legend="Venue type" options={venues} value={venue} onChange={setVenue} allLabel="All venues" />}
        </div>
      </aside>
      <div className="min-w-0 lg:col-span-9">
        <SiteGrid sites={shown} total={sites.length} filters={false} hasPage={hasPage} mapTitle={mapTitle} renderAction={action} />
        {shown.length === 0 && <p className="mt-6 rounded-2xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-600">No sites match these filters. <button type="button" onClick={clear} className="font-semibold text-[#2563eb] hover:underline">Clear all</button></p>}
      </div>
      <SiteDetailsDialog site={detail} insights={detail ? insights[detail.id] : undefined} onClose={() => setDetail(null)}
        action={detail ? (
          <span className="flex flex-wrap items-center justify-end gap-3">
            {hasPage(detail) && <Link href={sitePath(detail)} className="mw-tap inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] hover:underline">View site page <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
            <AddToProposalButton site={detail} variant="card" />
          </span>
        ) : null} />
    </div>
  )
}
