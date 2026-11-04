'use client'

import Link from 'next/link'
import { useZohoPopup } from '../ZohoPopupProvider'
import { SG_NAVY, SgSectionHeading, SgClosingCta, SgFormButton } from '../SingaporeShared'
import type { PublicSite } from '@/lib/inventory/types'
import { SiteGrid, PriceGate, SampleBanner, SiteCard, areaPath, MY_CONTACT_FORM } from './InventoryShared'

export type AreaLink = { name: string; slug: string; kind: 'buyer' | 'supply'; count: number }

export function InventoryAreaClient({
  kind, areaName, cityName, citySlug, countryName, countrySlug, sites, pagedIds, nearby, otherAreas, sample,
}: {
  kind: 'buyer' | 'supply'
  areaName: string
  cityName: string
  citySlug: string
  countryName: string
  countrySlug: string
  sites: PublicSite[]
  /** Sites with a page of their own (have a photo). */
  pagedIds: string[]
  /** For supply pages: what we do have nearby in the city. */
  nearby: PublicSite[]
  otherAreas: AreaLink[]
  sample: boolean
}) {
  const { openZohoPopup } = useZohoPopup()
  const contact = (title: string) => () => openZohoPopup(MY_CONTACT_FORM, title)
  const paged = new Set(pagedIds)
  const formats = new Set(sites.map(s => s.displayFormat ?? s.format).filter(Boolean)).size
  const digital = sites.filter(s => s.digital).length
  const cityHref = `/locations/${countrySlug}/${citySlug}`

  return (
    <div className="bg-white text-gray-900">

      {/* Hero */}
      <section className={`relative overflow-hidden ${SG_NAVY} text-white pb-12 lg:pb-16 mw-hero-top`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24387f]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mw-container">
          {sample && <SampleBanner />}
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-blue-100/80">
            <Link href="/locations" className="hover:text-white">Locations</Link> ›{' '}
            <Link href={`/locations/${countrySlug}`} className="hover:text-white">{countryName}</Link> ›{' '}
            <Link href={cityHref} className="hover:text-white">{cityName}</Link> › <span className="text-white">{areaName}</span>
          </nav>
          {kind === 'buyer' ? (
            <>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-3">Billboard &amp; Digital Screen Advertising in {areaName}, {cityName}</h1>
              <p className="text-lg sm:text-xl font-semibold text-cyan-300 mb-5">{sites.length} sites you can book in {areaName}, programmatically or direct.</p>
              <p className="max-w-3xl text-base sm:text-lg text-blue-100/90 leading-relaxed mb-7">
                {areaName} is one of {cityName}&apos;s busiest commercial districts — shoppers, office workers and visitors pass through it every day and night. Every site below shows its format, size and location; sign up to see estimated prices.
              </p>
              <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/20 max-w-xl">
                {[[String(sites.length), 'Sites'], [String(formats), 'Formats'], [String(digital), 'Digital screens']].map(([v, l]) => (
                  <div key={l} className="bg-[#0a2a7a] p-4 text-center">
                    <dt className="sr-only">{l}</dt>
                    <dd><span className="block text-2xl font-bold">{v}</span><span className="block text-xs text-blue-100/80">{l}</span></dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-3">Outdoor Advertising in {areaName}, {cityName}</h1>
              <p className="text-lg sm:text-xl font-semibold text-cyan-300 mb-5">
                {sites.length ? `We list ${sites.length} site${sites.length === 1 ? '' : 's'} in ${areaName} today — and we're adding more.` : `We don't list sites in ${areaName} yet — and we want to.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <SgFormButton onOpen={contact(`List your screens in ${areaName}`)} showArrow={false}>I own screens in {areaName}</SgFormButton>
                <a href="#nearby" className="inline-flex items-center justify-center border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">I want to advertise here</a>
              </div>
            </>
          )}
        </div>
      </section>

      {kind === 'supply' && (
        <section className="bg-white mw-section">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">For media owners</span>
              <h2 className="mt-2 text-2xl font-bold text-[#062068]">Own billboards or screens in {areaName}?</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">Brands search for advertising in {areaName} every month, and Moving Walls doesn&apos;t have enough sites here to offer them. List your inventory with us and reach those buyers — programmatic and direct, with reporting included.</p>
              <div className="mt-5"><SgFormButton onOpen={contact(`List your screens in ${areaName}`)} variant="dark" showArrow={false}>List your inventory</SgFormButton></div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50" id="nearby">
              <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">For advertisers</span>
              <h2 className="mt-2 text-2xl font-bold text-[#062068]">Reach {areaName} from nearby sites</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">Until we list more sites in {areaName}, these are the closest places you can book in {cityName}. Our team can also plan around {areaName} for you.</p>
              <div className="mt-5"><SgFormButton onOpen={contact(`Advertise near ${areaName}`)} variant="dark" showArrow={false}>Talk to our team</SgFormButton></div>
            </div>
          </div>
        </section>
      )}

      {/* Sites */}
      {sites.length > 0 && (
        <section className="bg-gray-50 mw-section">
          <div className="mw-container">
            <SgSectionHeading title={`Advertising sites in ${areaName}`} intro="Filter by format and venue. Tap a pin or open a site for its details and estimated price." />
            <SiteGrid sites={sites} hasPage={s => paged.has(s.id)} mapTitle={`Map of advertising sites in ${areaName}`} />
            <div className="mt-8"><PriceGate country={countrySlug} ids={sites.map(s => s.id)} names={Object.fromEntries(sites.map(s => [s.id, s.name]))} /></div>
          </div>
        </section>
      )}

      {kind === 'supply' && nearby.length > 0 && (
        <section className="bg-gray-50 mw-section">
          <div className="mw-container">
            <SgSectionHeading title={`Sites near ${areaName}`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {nearby.map(s => <SiteCard key={s.id} site={s} linked={paged.has(s.id)} />)}
            </div>
          </div>
        </section>
      )}

      {/* Other areas */}
      {otherAreas.length > 0 && (
        <section className="bg-gray-50 mw-section">
          <div className="mw-container">
            <SgSectionHeading title={`More areas in ${cityName}`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href={cityHref} className={`group flex flex-col rounded-2xl ${SG_NAVY} text-white p-5 hover:-translate-y-1 transition-all`}>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Overview</span>
                <span className="mt-2 font-bold flex-1">All of {cityName}</span>
              </Link>
              {otherAreas.map(a => (
                <Link key={a.slug} href={areaPath(countrySlug, citySlug, a.slug)} className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 hover:-translate-y-1 hover:border-mw-blue-200 hover:shadow-precision-lg transition-all">
                  <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">{a.kind === 'buyer' ? `${a.count} sites` : 'Growing'}</span>
                  <span className="mt-2 font-bold text-gray-900 flex-1">{a.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SgClosingCta
        heading={kind === 'buyer' ? `Ready to advertise in ${areaName}?` : `Put ${areaName} on the map with us`}
        body={kind === 'buyer' ? 'Tell us your dates and audience — we will come back with live availability and a plan.' : 'Media owner or advertiser, our Malaysia team will get back to you.'}
        button="Contact our Malaysia team"
        onOpen={contact(`Contact our Malaysia team`)}
        showArrow={false}
      />
    </div>
  )
}
