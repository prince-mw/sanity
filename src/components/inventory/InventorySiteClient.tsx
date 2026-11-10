'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LeadForm } from '../forms/LeadForm'
import { AdMockup } from './AdMockup'
import { SG_NAVY, SgSectionHeading, SgClosingCta, SgFormButton } from '../SingaporeShared'
import type { PublicSite } from '@/lib/inventory/types'
import type { SiteContent } from '@/lib/inventory/siteContent'
import { AudienceSection, RelatedContent } from './ContentBlocks'
import { MARKET_VIDEOS } from '@/data/market-videos'
import { SitesMap, SampleBanner, SampleTag, SiteCard, areaPath } from './InventoryShared'
import { AddToProposalButton } from '../proposal/AddToProposalButton'

export function InventorySiteClient({ site, content, similar, pagedIds }: { site: PublicSite; content: SiteContent; similar: PublicSite[]; pagedIds: string[] }) {
  // The site's own lead form (not Zoho Forms): GA4 sees the conversion, the lead still reaches Zoho CRM.
  const [formOpen, setFormOpen] = useState(false)
  const enquire = () => setFormOpen(true)
  const [photo, setPhoto] = useState(0)
  const paged = new Set(pagedIds)
  const areaHref = areaPath(site.countrySlug, site.citySlug, site.areaSlug)
  const format = site.displayFormat ?? site.format ?? 'Outdoor advertising'
  const description = content.description ?? site.description

  // Shown in the hero as a spec strip. Format is the eyebrow and the address
  // heads the Location section, so neither repeats here (Rif, 10 Nov 2026).
  const specs: [string, string | null][] = [
    ['Type', site.format && site.format !== format ? site.format : null],
    ['Size', site.size],
    ['Illuminated', site.illuminated == null ? null : site.illuminated ? 'Yes' : 'No'],
    ['Venue', site.venueType],
    ['Spot length', site.digital?.spotSeconds ? `${site.digital.spotSeconds} seconds` : null],
    ['Spots per loop', site.digital?.spotsPerLoop ? String(site.digital.spotsPerLoop) : null],
    ['Loop length', site.digital?.loopSeconds ? `${site.digital.loopSeconds} seconds` : null],
  ].filter(([, v]) => v) as [string, string][]
  const hasAudienceFigures = !!(site.audience?.impressions || site.audience?.reach)

  return (
    <div className="bg-white text-gray-900">

      {/* Hero: photo, name, format, the description, the specs, add-to-proposal */}
      <section className={`relative overflow-hidden ${SG_NAVY} text-white pb-12 lg:pb-16 mw-hero-top`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="relative mw-container">
          {site.sample && <SampleBanner />}
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-x-1.5 text-sm text-blue-100/80">
            <Link href="/locations" className="mw-tap !justify-start hover:text-white">Locations</Link> <span aria-hidden="true">›</span>
            <Link href={`/locations/${site.countrySlug}`} className="mw-tap !justify-start hover:text-white">{site.countryName}</Link> <span aria-hidden="true">›</span>
            <Link href={`/locations/${site.countrySlug}/${site.citySlug}`} className="mw-tap !justify-start hover:text-white">{site.cityName}</Link> <span aria-hidden="true">›</span>
            <Link href={areaHref} className="mw-tap !justify-start hover:text-white">{site.areaName}</Link> <span aria-hidden="true">›</span> <span className="text-white">{site.name}</span>
          </nav>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">{format}</span>
                {site.sample && <SampleTag />}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-3">{site.name}</h1>
              <p className="text-lg text-blue-100/90 mb-4">{site.areaName}, {site.cityName}</p>
              {description && <p className="text-base lg:text-lg text-blue-50/90 leading-relaxed mb-6 max-w-[60ch]">{description}</p>}
              {specs.length > 0 && (
                <dl className="mb-7 grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-[60ch]">
                  {specs.map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-white/10 ring-1 ring-white/15 px-3 py-2">
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-blue-100/70">{k}</dt>
                      <dd className="text-sm font-semibold text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <SgFormButton onOpen={enquire} showArrow={false}>Enquire about this site</SgFormButton>
                <AddToProposalButton site={site} variant="hero" />
                <Link href={areaHref} className="mw-tap inline-flex items-center justify-center border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">More sites in {site.areaName}</Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-2xl bg-white/10">
                {site.photos[photo] && <Image src={site.photos[photo]} alt={`${site.name} — ${format} in ${site.areaName}, ${site.cityName}`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />}
              </div>
              {site.photos.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {site.photos.map((p, i) => (
                    <button key={p} type="button" onClick={() => setPhoto(i)} aria-label={`Photo ${i + 1}`} className={`mw-tap relative h-14 w-20 overflow-hidden rounded-lg ring-2 ${i === photo ? 'ring-cyan-300' : 'ring-transparent'}`}>
                      <Image src={p} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <AudienceSection placeName={site.name} personas={content.personas}
        figures={hasAudienceFigures ? [site.audience?.reach && { label: 'Monthly reach', value: site.audience.reach }, site.audience?.impressions && { label: 'Monthly impressions', value: site.audience.impressions }].filter(Boolean) as { label: string; value: string }[] : undefined} />

      {/* See your ad here: the mock-up tool */}
      {site.photos[0] && (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <SgSectionHeading title="See your ad here" intro={`Add your logo and a line, and see how your campaign would look on ${site.name}. Register once to see it on the screen; we'll email it to you and put you in touch with the person who books this site.`} />
            <AdMockup site={site} content={content} />
          </div>
        </section>
      )}

      {site.lat != null && (
        <section className="bg-gray-50 mw-section">
          <div className="mw-container">
            <SgSectionHeading title="Location" intro={site.address ?? undefined} />
            <SitesMap sites={[site]} title={`Map showing ${site.name}`} />
          </div>
        </section>
      )}

      <RelatedContent cityName={site.cityName} countryName={site.countryName} caseStudies={content.caseStudies} posts={content.posts} firstBg="bg-white" video={MARKET_VIDEOS[site.countrySlug]} />

      {similar.length > 0 && (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <SgSectionHeading title={`Similar sites in ${site.cityName}`} intro={`Other ${format.toLowerCase()} sites and nearby inventory.`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map(s => <SiteCard key={s.id} site={s} linked={paged.has(s.id)} />)}
            </div>
          </div>
        </section>
      )}

      <SgClosingCta heading={`Book ${site.name}`} body="Tell us your dates and audience — our Malaysia team will confirm availability and send a plan." button="Enquire about this site" onOpen={enquire} showArrow={false} />
      <LeadForm open={formOpen} onClose={() => setFormOpen(false)} purpose="enquiry" siteId={site.id} siteName={site.name}
        intro={<>Tell us your dates and audience for <strong>{site.name}</strong>. Our Malaysia team replies within one working day.</>} />
    </div>
  )
}
