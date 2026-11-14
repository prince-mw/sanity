'use client'

// Inventory pages: shared pieces. Same look as the Singapore venue pages
// (navy hero, rounded cards, mw-blue accents), so the new pages sit in the site.

import { useMemo, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { PublicSite } from '@/lib/inventory/types'
import { BrandMap, type MapPin } from './BrandMap'
import { StreetViewImage, StreetViewNote, streetViewEnabled } from './StreetView'
import { AddToProposalButton } from '../proposal/AddToProposalButton'

export const MY_CONTACT_FORM =
  'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MalaysiaContact/formperma/9-GOVijT9HZ4uHR9214Y08-UQX1HA8mAzZSjfcDMMeY'

export const sitePath = (s: PublicSite) => `/locations/${s.countrySlug}/${s.citySlug}/${s.areaSlug}/${s.slug}`
export const areaPath = (country: string, city: string, area: string) => `/locations/${country}/${city}/${area}`

/** The sample-data banner is retired (Rif, 11 Nov 2026: the team knows which data is sample; the SAMPLE tag on cards stays). */
export function SampleBanner(_props: { className?: string }) { // eslint-disable-line @typescript-eslint/no-unused-vars
  return null
}

/**
 * Credit for addresses looked up from a site's map point (scripts/inventory-addresses.mjs).
 * OpenStreetMap's licence (ODbL) asks for this wherever the data shows.
 */
export function OsmCredit({ className = '', lead = 'Address from the map point.' }: { className?: string; lead?: string }) {
  return <p className={`text-xs text-gray-500 ${className}`}>{lead} © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener nofollow" className="underline hover:text-gray-700">OpenStreetMap contributors</a></p>
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
      ) : site.streetView ? (
        <StreetViewImage sv={site.streetView} hint alt={`Street View near ${site.name}, ${site.areaName}`} fallback={<div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">Photo coming soon</div>} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">Photo coming soon</div>
      )}
    </div>
  )
}

export function SiteCard({ site, linked, addable = true, action }: { site: PublicSite; linked: boolean; addable?: boolean; action?: ReactNode }) {
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
          {action ? action : <>
            {linked ? <span className="text-sm font-semibold text-mw-blue-600 group-hover:text-[#2563eb]">Details · see your ad on it →</span> : <span />}
            {addable && <AddToProposalButton site={site} variant="card" />}
          </>}
        </div>
      </div>
    </>
  )
  const cls = 'group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all'
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
/** The page numbers to show: always the first and last, the current one and its neighbours, gaps as "…". */
function pageWindow(page: number, pages: number): (number | '…')[] {
  const want = new Set([0, pages - 1, page - 1, page, page + 1].filter(n => n >= 0 && n < pages))
  const out: (number | '…')[] = []
  ;[...want].sort((a, b) => a - b).forEach((n, i, a) => { if (i && n - a[i - 1] > 1) out.push('…'); out.push(n) })
  return out
}

/**
 * Numbered pages under a site list: first, previous, page numbers, next, last,
 * and "Showing 25–48 of 1,974 sites". Phones show "Page 2 of 83" between the
 * arrows instead of the numbers. Every control is a 44px tap target.
 */
function Pager({ page, pages, onPage, from, to, total }: { page: number; pages: number; onPage: (n: number) => void; from: number; to: number; total: number }) {
  const btn = 'mw-tap inline-flex h-11 min-w-11 items-center justify-center rounded-full border text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40'
  const idle = `${btn} border-gray-200 bg-white px-3 text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]`
  const fmt = (n: number) => n.toLocaleString('en-US')
  return (
    <nav aria-label="Site list pages" className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button type="button" onClick={() => onPage(0)} disabled={page === 0} aria-label="First page" className={idle}><ChevronsLeft className="h-4 w-4" aria-hidden="true" /></button>
        <button type="button" onClick={() => onPage(page - 1)} disabled={page === 0} aria-label="Previous page" className={idle}><ChevronLeft className="h-4 w-4" aria-hidden="true" /></button>
        <span className="px-2 text-sm font-semibold text-gray-700 sm:hidden">Page {page + 1} of {fmt(pages)}</span>
        {pageWindow(page, pages).map((n, i) => n === '…'
          ? <span key={`gap-${i}`} className="hidden px-1 text-gray-400 sm:inline" aria-hidden="true">…</span>
          : <button key={n} type="button" onClick={() => onPage(n)} aria-label={`Page ${n + 1}`} aria-current={n === page ? 'page' : undefined}
              className={`${btn} hidden px-3 sm:inline-flex ${n === page ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]'}`}>{fmt(n + 1)}</button>)}
        <button type="button" onClick={() => onPage(page + 1)} disabled={page === pages - 1} aria-label="Next page" className={idle}><ChevronRight className="h-4 w-4" aria-hidden="true" /></button>
        <button type="button" onClick={() => onPage(pages - 1)} disabled={page === pages - 1} aria-label="Last page" className={idle}><ChevronsRight className="h-4 w-4" aria-hidden="true" /></button>
      </div>
      <p className="text-xs text-gray-500" aria-live="polite">Showing {fmt(from)}–{fmt(to)} of {fmt(total)} sites</p>
    </nav>
  )
}

/** Site cards shown per page in a list (divides by 2 and 3, so the last row is always full). */
const CARD_PAGE = 24

export function SiteGrid({ sites, hasPage, mapTitle, renderAction, filters = true, total, map = true, mapHeight = 'lg:h-[480px]' }: { sites: PublicSite[]; hasPage: (s: PublicSite) => boolean; mapTitle: string; renderAction?: (s: PublicSite) => ReactNode; filters?: boolean; total?: number; map?: boolean; /** Desktop map height; the site finder uses a shorter one beside its filter column. */ mapHeight?: string }) {
  const formats = useMemo(() => Array.from(new Set(sites.map(s => s.displayFormat ?? s.format ?? 'Other'))).sort(), [sites])
  const venues = useMemo(() => Array.from(new Set(sites.map(s => s.venueType).filter(Boolean) as string[])).sort(), [sites])
  const [format, setFormat] = useState('All')
  const [venue, setVenue] = useState('All')
  const [active, setActive] = useState<string | null>(null)
  const [view, setView] = useState<'list' | 'map'>('list')
  const shown = useMemo(() => sites.filter(s =>
    (format === 'All' || (s.displayFormat ?? s.format ?? 'Other') === format) && (venue === 'All' || s.venueType === venue)), [sites, format, venue])
  const pins = useMemo(() => shown.map(s => pinOf(s, hasPage(s))).filter(Boolean) as MapPin[], [shown, hasPage])
  // A city can hold thousands of sites (Kuala Lumpur, API data: ~2,000), so the
  // cards come in numbered pages of 24 (Rif, 14 Nov 2026: pages, not an ever-longer
  // list); the map always shows every pin. A new filter starts again at page 1.
  const [page, setPage] = useState(0)
  // Back to page 1 only when the list itself changes (a filter or search), not on
  // every re-render: opening and closing Details keeps you on page 70 (Rif, 14 Nov 2026).
  const listKey = useMemo(() => shown.map(s => s.id).join(','), [shown])
  const [seen, setSeen] = useState(listKey)
  if (seen !== listKey) { setSeen(listKey); setPage(0) }
  const pages = Math.max(1, Math.ceil(shown.length / CARD_PAGE))
  const cards = shown.slice(page * CARD_PAGE, page * CARD_PAGE + CARD_PAGE)
  const gridRef = useRef<HTMLDivElement>(null)
  const goTo = (n: number) => {
    setPage(Math.min(pages - 1, Math.max(0, n)))
    // Back to the top of the cards, not the top of the page.
    requestAnimationFrame(() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const pick = (id: string) => {
    // Highlight the pin and its card; the map's label card links to the site, so the page doesn't jump away from the map.
    // A pin whose card is on another page turns the list to that page.
    const at = shown.findIndex(s => s.id === id)
    if (at >= 0 && Math.floor(at / CARD_PAGE) !== page) setPage(Math.floor(at / CARD_PAGE))
    setActive(id)
  }
  const chip = (on: boolean) =>
    `mw-tap rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-mw-blue-200'}`
  const tab = (on: boolean) => `mw-tap flex-1 rounded-full px-4 py-1.5 text-sm font-semibold ${on ? 'bg-[#2563eb] text-white' : 'text-gray-700'}`
  return (
    <div>
      {filters && <div className="flex flex-col gap-3 mb-5">
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
      </div>}
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="text-sm text-gray-500" aria-live="polite">{shown.length} of {total ?? sites.length} {(total ?? sites.length) === 1 ? 'site' : 'sites'}{map && pins.length < shown.length ? ` · ${pins.length} on the map` : ''}</p>
        {map && <div className="lg:hidden flex w-48 rounded-full border border-gray-200 bg-white p-1" role="group" aria-label="Show sites as">
          <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={tab(view === 'list')}>List</button>
          <button type="button" aria-pressed={view === 'map'} onClick={() => setView('map')} className={tab(view === 'map')}>Map</button>
        </div>}
      </div>
      {/* Map on top at every size (Rif, 4 Nov: no empty column beside a long list), site cards below. */}
      <div className="flex flex-col gap-6">
        {map && <BrandMap pins={pins} activeId={active} onPinClick={pick} title={mapTitle}
          className={`${view === 'map' ? 'h-[70vh]' : 'h-64 sm:h-80'} ${mapHeight}`} />}
        {/* Explained once, only on a page of cards that has Street View in it. */}
        {streetViewEnabled && cards.some(s => !s.photos.length && s.streetView) && <StreetViewNote className={view === 'map' ? 'hidden lg:flex' : ''} />}
        {cards.some(s => s.addressFromMap) && <OsmCredit className={view === 'map' ? 'hidden lg:block -mb-3' : '-mb-3'} lead="Some addresses are looked up from the site's map point." />}
        <div ref={gridRef} className={`${view === 'map' ? 'hidden lg:grid' : 'grid'} scroll-mt-28 sm:grid-cols-2 lg:grid-cols-3 gap-5`}>
          {cards.map(s => (
            <div key={s.id} id={`site-${s.id}`} onMouseEnter={() => setActive(s.id)}
              className={`scroll-mt-28 rounded-2xl transition-shadow ${active === s.id ? 'ring-2 ring-mw-blue-500 ring-offset-2' : ''}`}>
              <SiteCard site={s} linked={hasPage(s)} action={renderAction?.(s)} />
            </div>
          ))}
        </div>
        {pages > 1 && (
          <div className={view === 'map' ? 'hidden lg:block' : ''}>
            <Pager page={page} pages={pages} onPage={goTo} from={page * CARD_PAGE + 1} to={page * CARD_PAGE + cards.length} total={shown.length} />
          </div>
        )}
      </div>
    </div>
  )
}

/** One site's location on the branded map. */
export function SitesMap({ sites, title, className = 'h-72 sm:h-96' }: { sites: PublicSite[]; title: string; className?: string }) {
  const pins = sites.map(s => pinOf(s, false)).filter(Boolean) as MapPin[]
  if (!pins.length) return null
  return <BrandMap pins={pins} activeId={pins.length === 1 ? pins[0].id : null} title={title} className={className} />
}
