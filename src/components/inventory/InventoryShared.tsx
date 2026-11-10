'use client'

// Inventory pages: shared pieces. Same look as the Singapore venue pages
// (navy hero, rounded cards, mw-blue accents), so the new pages sit in the site.

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { PublicSite } from '@/lib/inventory/types'
import { BrandMap, type MapPin } from './BrandMap'
import { AddToProposalButton } from '../proposal/AddToProposalButton'

export const MY_CONTACT_FORM =
  'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MalaysiaContact/formperma/9-GOVijT9HZ4uHR9214Y08-UQX1HA8mAzZSjfcDMMeY'

export const sitePath = (s: PublicSite) => `/locations/${s.countrySlug}/${s.citySlug}/${s.areaSlug}/${s.slug}`
export const areaPath = (country: string, city: string, area: string) => `/locations/${country}/${city}/${area}`

/** Marks stand-in data on every page that shows it, so nobody mistakes it for stock. */
export function SampleBanner({ className = 'mb-5' }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-amber-400 text-amber-950 text-sm font-semibold px-4 py-2 ${className}`}>
      Preview with sample data — sites marked SAMPLE are not real inventory. Real sites load from the Inventory API once it is connected.
    </div>
  )
}

export function SampleTag({ className = '' }: { className?: string }) {
  return <span className={`inline-block rounded-lg bg-amber-400 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-950 ${className}`}>Sample</span>
}

function Photo({ site, className = '', sizes = '100vw', priority = false }: { site: PublicSite; className?: string; sizes?: string; priority?: boolean }) {
  const src = site.photos[0]
  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {src ? (
        <Image src={src} alt={`${site.name} — ${site.displayFormat ?? site.format ?? 'outdoor advertising'} in ${site.areaName}, ${site.cityName}`} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">Photo coming soon</div>
      )}
    </div>
  )
}

export function SiteCard({ site, linked, addable = true }: { site: PublicSite; linked: boolean; addable?: boolean }) {
  const body = (
    <>
      <Photo site={site} className="aspect-[16/10]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">{site.displayFormat ?? site.format}</span>
          {site.sample && <SampleTag />}
        </div>
        <h3 className="font-bold text-gray-900 leading-snug">{site.name}</h3>
        {site.address && <p className="mt-1 text-sm text-gray-500">{site.address}</p>}
        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {site.size && <div><dt className="sr-only">Size</dt><dd>{site.size}</dd></div>}
          {site.venueType && <div><dt className="sr-only">Venue</dt><dd>{site.venueType}</dd></div>}
          {site.audience?.impressions && <div><dt className="sr-only">Monthly impressions</dt><dd>{site.audience.impressions} impressions / mo</dd></div>}
        </dl>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          {linked ? <span className="text-sm font-semibold text-mw-blue-600 group-hover:text-[#062068]">View site details →</span> : <span />}
          {addable && <AddToProposalButton site={site} variant="card" />}
        </div>
      </div>
    </>
  )
  const cls = 'group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all'
  return linked
    ? <Link href={sitePath(site)} className={`${cls} hover:-translate-y-1 hover:border-mw-blue-200 hover:shadow-precision-lg`}>{body}</Link>
    : <div className={cls}>{body}</div>
}

const pinOf = (s: PublicSite, linked: boolean): MapPin | null =>
  s.lat == null || s.lng == null ? null : {
    id: s.id, lat: s.lat, lng: s.lng, title: s.name,
    subtitle: [s.displayFormat ?? s.format, s.areaName].filter(Boolean).join(' · '),
    href: linked ? sitePath(s) : undefined,
  }

/**
 * The inventory finder: Format / Venue filters, the site cards and the branded
 * map, all driven by one filter state, so the pins always match the cards.
 * Map on top, cards below at every size. Phone/tablet: List / Map switch.
 */
export function SiteGrid({ sites, hasPage, mapTitle }: { sites: PublicSite[]; hasPage: (s: PublicSite) => boolean; mapTitle: string }) {
  const formats = useMemo(() => Array.from(new Set(sites.map(s => s.displayFormat ?? s.format ?? 'Other'))).sort(), [sites])
  const venues = useMemo(() => Array.from(new Set(sites.map(s => s.venueType).filter(Boolean) as string[])).sort(), [sites])
  const [format, setFormat] = useState('All')
  const [venue, setVenue] = useState('All')
  const [active, setActive] = useState<string | null>(null)
  const [view, setView] = useState<'list' | 'map'>('list')
  const shown = useMemo(() => sites.filter(s =>
    (format === 'All' || (s.displayFormat ?? s.format ?? 'Other') === format) && (venue === 'All' || s.venueType === venue)), [sites, format, venue])
  const pins = useMemo(() => shown.map(s => pinOf(s, hasPage(s))).filter(Boolean) as MapPin[], [shown, hasPage])
  const pick = (id: string) => {
    // Highlight the pin and its card; the map's label card links to the site, so the page doesn't jump away from the map.
    setActive(id)
  }
  const chip = (on: boolean) =>
    `mw-tap rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${on ? 'border-[#062068] bg-[#062068] text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-mw-blue-200'}`
  const tab = (on: boolean) => `mw-tap flex-1 rounded-full px-4 py-1.5 text-sm font-semibold ${on ? 'bg-[#062068] text-white' : 'text-gray-700'}`
  return (
    <div>
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-gray-500 mr-1">Format</span>
          {['All', ...formats].map(f => <button key={f} type="button" aria-pressed={format === f} onClick={() => { setFormat(f); setActive(null) }} className={chip(format === f)}>{f}</button>)}
        </div>
        {venues.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-500 mr-1">Venue</span>
            {['All', ...venues].map(v => <button key={v} type="button" aria-pressed={venue === v} onClick={() => { setVenue(v); setActive(null) }} className={chip(venue === v)}>{v}</button>)}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="text-sm text-gray-500" aria-live="polite">{shown.length} of {sites.length} sites{pins.length < shown.length ? ` · ${pins.length} on the map` : ''}</p>
        <div className="lg:hidden flex w-48 rounded-full border border-gray-200 bg-white p-1" role="group" aria-label="Show sites as">
          <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={tab(view === 'list')}>List</button>
          <button type="button" aria-pressed={view === 'map'} onClick={() => setView('map')} className={tab(view === 'map')}>Map</button>
        </div>
      </div>
      {/* Map on top at every size (Rif, 4 Nov: no empty column beside a long list), site cards below. */}
      <div className="flex flex-col gap-6">
        <BrandMap pins={pins} activeId={active} onPinClick={pick} title={mapTitle}
          className={`${view === 'map' ? 'h-[70vh]' : 'h-64 sm:h-80'} lg:h-[480px]`} />
        <div className={`${view === 'map' ? 'hidden lg:grid' : 'grid'} sm:grid-cols-2 lg:grid-cols-3 gap-5`}>
          {shown.map(s => (
            <div key={s.id} id={`site-${s.id}`} onMouseEnter={() => setActive(s.id)}
              className={`scroll-mt-28 rounded-2xl transition-shadow ${active === s.id ? 'ring-2 ring-mw-blue-500 ring-offset-2' : ''}`}>
              <SiteCard site={s} linked={hasPage(s)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** One site's location on the branded map. */
export function SitesMap({ sites, title }: { sites: PublicSite[]; title: string }) {
  const pins = sites.map(s => pinOf(s, false)).filter(Boolean) as MapPin[]
  if (!pins.length) return null
  return <BrandMap pins={pins} activeId={pins.length === 1 ? pins[0].id : null} title={title} className="h-72 sm:h-96" />
}

/** Rif's wording (26 Oct 2026), shown with every price. */
export const PRICE_NOTE =
  'This is an estimate only, not an exact price. The exact price depends on many factors, such as campaign duration, spots per loop, spots per day and your campaign requirements.'

type Quote = { siteId: string; currency: string; daily: number | null; monthly: number | null }

/**
 * Estimated prices, behind a newsletter sign-up. Prices are never in the page:
 * they load from /api/inventory/prices only after /api/inventory/unlock has set
 * the signed cookie, so search engines never see them.
 */
export function PriceGate({ country, ids, names, compact = false }: { country: string; ids: string[]; names?: Record<string, string>; compact?: boolean }) {
  const [quotes, setQuotes] = useState<Quote[] | null>(null)
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    const r = await fetch(`/api/inventory/prices?country=${encodeURIComponent(country)}&ids=${ids.map(encodeURIComponent).join(',')}`)
    if (!r.ok) return
    const j = await r.json()
    if (!j.locked) setQuotes(j.quotes ?? [])
  }
  useEffect(() => { load() }, []) // already signed up on an earlier page? show prices straight away

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true); setError(null)
    const f = new FormData(e.currentTarget)
    const r = await fetch('/api/inventory/unlock', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(Object.fromEntries(f)) })
    setBusy(false)
    if (!r.ok) { setError((await r.json().catch(() => ({})))?.error ?? 'Something went wrong. Please try again.'); return }
    setOpen(false)
    await load()
  }

  const money = (q: Quote, n: number | null) => (n == null ? '—' : `${q.currency} ${n.toLocaleString('en-US')}`)

  if (quotes) {
    return (
      <div className="rounded-2xl border border-mw-blue-100 bg-mw-blue-50/40 p-5">
        <p className="text-sm font-bold text-[#062068] mb-3">Estimated price</p>
        {quotes.length ? (
          <ul className="space-y-1 text-gray-800">
            {quotes.map(q => (
              <li key={q.siteId} className="flex flex-wrap gap-x-6">
                {names?.[q.siteId] && <span className="font-semibold min-w-[16rem]">{names[q.siteId]}</span>}
                <span>From {money(q, q.daily)} / day</span>
                <span>From {money(q, q.monthly)} / month</span>
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-600">No estimate available for this site yet — ask our team.</p>}
        <p className="mt-3 text-xs text-gray-500 leading-relaxed">{PRICE_NOTE}</p>
      </div>
    )
  }

  return (
    <div>
      <button type="button" onClick={() => setOpen(true)} className={`inline-flex items-center justify-center rounded-lg font-semibold transition-all ${compact ? 'px-4 py-2 text-sm' : 'px-6 py-3'} bg-white text-[#062068] border-2 border-[#062068] hover:bg-mw-blue-50`}>
        See estimated price
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Sign up to see estimated prices">
          <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-[#062068]">See estimated prices</h2>
            <p className="mt-1 text-sm text-gray-600">Sign up for Moving Walls news and you will see estimated prices on every site.</p>
            <div className="mt-4 space-y-3">
              {[['name', 'Name', 'text'], ['email', 'Work email', 'email'], ['company', 'Company', 'text'], ['country', 'Country', 'text']].map(([n, l, t]) => (
                <label key={n} className="block">
                  <span className="text-sm font-semibold text-gray-700">{l}</span>
                  <input name={n} type={t} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-mw-blue-500 focus:outline-none" />
                </label>
              ))}
              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 flex-shrink-0 appearance-auto accent-[#062068]" style={{ appearance: 'auto' }} />
                <span>Yes, send me Moving Walls news. I can unsubscribe at any time.</span>
              </label>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <p className="mt-3 text-xs text-gray-500">{PRICE_NOTE}</p>
            <div className="mt-5 flex gap-3">
              <button type="submit" disabled={busy} className="flex-1 rounded-lg bg-[#062068] px-4 py-2.5 font-semibold text-white hover:bg-[#0a2a8a] disabled:opacity-60">{busy ? 'Signing up…' : 'Show prices'}</button>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
