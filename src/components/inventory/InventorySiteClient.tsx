'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useZohoPopup } from '../ZohoPopupProvider'
import { SG_NAVY, SgSectionHeading, SgClosingCta, SgFormButton } from '../SingaporeShared'
import type { PublicSite } from '@/lib/inventory/types'
import { SitesMap, PriceGate, SampleBanner, SampleTag, SiteCard, areaPath, MY_CONTACT_FORM } from './InventoryShared'

export function InventorySiteClient({ site, nearby, pagedIds }: { site: PublicSite; nearby: PublicSite[]; pagedIds: string[] }) {
  const { openZohoPopup } = useZohoPopup()
  const enquire = () => openZohoPopup(MY_CONTACT_FORM, `Enquire about ${site.name}`)
  const [photo, setPhoto] = useState(0)
  const paged = new Set(pagedIds)
  const areaHref = areaPath(site.countrySlug, site.citySlug, site.areaSlug)
  const format = site.displayFormat ?? site.format ?? 'Outdoor advertising'

  const specs: [string, string | null][] = [
    ['Format', format],
    ['Type', site.format],
    ['Size', site.size],
    ['Illuminated', site.illuminated == null ? null : site.illuminated ? 'Yes' : 'No'],
    ['Venue', site.venueType],
    ['Spot length', site.digital?.spotSeconds ? `${site.digital.spotSeconds} seconds` : null],
    ['Spots per loop', site.digital?.spotsPerLoop ? String(site.digital.spotsPerLoop) : null],
    ['Loop length', site.digital?.loopSeconds ? `${site.digital.loopSeconds} seconds` : null],
    ['Address', site.address],
  ]

  return (
    <div className="bg-white text-gray-900">

      <section className={`relative overflow-hidden ${SG_NAVY} text-white pb-12 lg:pb-16 mw-hero-top`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="relative mw-container">
          {site.sample && <SampleBanner />}
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-blue-100/80">
            <Link href="/locations" className="hover:text-white">Locations</Link> ›{' '}
            <Link href={`/locations/${site.countrySlug}`} className="hover:text-white">{site.countryName}</Link> ›{' '}
            <Link href={`/locations/${site.countrySlug}/${site.citySlug}`} className="hover:text-white">{site.cityName}</Link> ›{' '}
            <Link href={areaHref} className="hover:text-white">{site.areaName}</Link> › <span className="text-white">{site.name}</span>
          </nav>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">{format}</span>
                {site.sample && <SampleTag />}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">{site.name}</h1>
              <p className="text-lg text-blue-100/90 mb-2">{site.areaName}, {site.cityName}</p>
              {site.description && <p className="text-base text-blue-100/90 leading-relaxed mb-6">{site.description}</p>}
              <div className="flex flex-col sm:flex-row gap-3">
                <SgFormButton onOpen={enquire} showArrow={false}>Enquire about this site</SgFormButton>
                <Link href={areaHref} className="inline-flex items-center justify-center border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">More sites in {site.areaName}</Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-2xl bg-white/10">
                {site.photos[photo] && <Image src={site.photos[photo]} alt={`${site.name} — ${format} in ${site.areaName}, ${site.cityName}`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />}
              </div>
              {site.photos.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {site.photos.map((p, i) => (
                    <button key={p} type="button" onClick={() => setPhoto(i)} aria-label={`Photo ${i + 1}`} className={`relative h-14 w-20 overflow-hidden rounded-lg ring-2 ${i === photo ? 'ring-cyan-300' : 'ring-transparent'}`}>
                      <Image src={p} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mw-section">
        <div className="grid lg:grid-cols-12 gap-8 mw-container">
          <div className="lg:col-span-7">
            <SgSectionHeading title="Site details" />
            <dl className="divide-y divide-gray-200 rounded-2xl border border-gray-200">
              {specs.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-4 px-5 py-3">
                  <dt className="text-sm font-semibold text-gray-500">{k}</dt>
                  <dd className="col-span-2 text-gray-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div>
              <SgSectionHeading title="Audience" as="h3" />
              {site.audience?.impressions || site.audience?.reach ? (
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-gray-200">
                  {site.audience.reach && <div className="bg-white p-4"><dt className="text-xs text-gray-500">Monthly reach</dt><dd className="text-2xl font-bold text-[#062068]">{site.audience.reach}</dd></div>}
                  {site.audience.impressions && <div className="bg-white p-4"><dt className="text-xs text-gray-500">Monthly impressions</dt><dd className="text-2xl font-bold text-[#062068]">{site.audience.impressions}</dd></div>}
                </dl>
              ) : (
                <p className="rounded-2xl border border-dashed border-gray-300 p-4 text-sm text-gray-500">Audience figures for this site are coming soon. Ask our team for reach and impressions.</p>
              )}
            </div>
            <div>
              <SgSectionHeading title="Price" as="h3" />
              <PriceGate country={site.countrySlug} ids={[site.id]} />
            </div>
          </div>
        </div>
      </section>

      {site.lat != null && (
        <section className="bg-gray-50 mw-section">
          <div className="mw-container">
            <SgSectionHeading title="Location" intro={site.address ?? undefined} />
            <SitesMap sites={[site]} title={`Map showing ${site.name}`} />
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <SgSectionHeading title={`More sites in ${site.areaName}`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {nearby.map(s => <SiteCard key={s.id} site={s} linked={paged.has(s.id)} />)}
            </div>
          </div>
        </section>
      )}

      <SgClosingCta heading={`Book ${site.name}`} body="Tell us your dates and audience — our Malaysia team will confirm availability and send a plan." button="Enquire about this site" onOpen={enquire} showArrow={false} />
    </div>
  )
}
