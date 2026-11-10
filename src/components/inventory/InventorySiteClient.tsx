'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  Briefcase, Car, GraduationCap, Home, Moon, Plane, ShoppingBag, TrainFront, Users, Camera, type LucideIcon,
} from 'lucide-react'
import { LeadForm } from '../forms/LeadForm'
import { AdMockup } from './AdMockup'
import { SG_NAVY, SgSectionHeading, SgClosingCta, SgFormButton } from '../SingaporeShared'
import type { PublicSite } from '@/lib/inventory/types'
import type { SiteContent, Persona, RelatedItem } from '@/lib/inventory/siteContent'
import { SitesMap, PriceGate, SampleBanner, SampleTag, SiteCard, areaPath } from './InventoryShared'

const PERSONA_ICONS: Record<Persona['icon'], LucideIcon> = {
  commuter: TrainFront, shopper: ShoppingBag, tourist: Camera, office: Briefcase, family: Users,
  student: GraduationCap, nightlife: Moon, traveller: Plane, driver: Car, resident: Home,
}

export function InventorySiteClient({ site, content, similar, pagedIds }: { site: PublicSite; content: SiteContent; similar: PublicSite[]; pagedIds: string[] }) {
  // The site's own lead form (not Zoho Forms): GA4 sees the conversion, the lead still reaches Zoho CRM.
  const [formOpen, setFormOpen] = useState(false)
  const enquire = () => setFormOpen(true)
  const [photo, setPhoto] = useState(0)
  const paged = new Set(pagedIds)
  const areaHref = areaPath(site.countrySlug, site.citySlug, site.areaSlug)
  const format = site.displayFormat ?? site.format ?? 'Outdoor advertising'
  const description = content.description ?? site.description

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
  const hasAudienceFigures = !!(site.audience?.impressions || site.audience?.reach)

  return (
    <div className="bg-white text-gray-900">

      {/* Hero: photo, name, format, the description */}
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
              {description && <p className="text-base lg:text-lg text-blue-50/90 leading-relaxed mb-7 max-w-[60ch]">{description}</p>}
              <div className="flex flex-col sm:flex-row gap-3">
                <SgFormButton onOpen={enquire} showArrow={false}>Enquire about this site</SgFormButton>
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

      {/* Who you reach here: personas + the published figures */}
      {(content.personas.length > 0 || hasAudienceFigures) && (
        <section className="bg-gray-50 mw-section">
          <div className="mw-container">
            <SgSectionHeading title="Who you reach here" intro={`The people who pass ${site.name} and when — so you can match your creative to the moment.`} />
            {hasAudienceFigures && (
              <dl className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-gray-200 sm:max-w-md">
                {site.audience?.reach && <div className="bg-white p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">Monthly reach</dt><dd className="mt-1 text-3xl font-bold text-[#062068]">{site.audience.reach}</dd></div>}
                {site.audience?.impressions && <div className="bg-white p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">Monthly impressions</dt><dd className="mt-1 text-3xl font-bold text-[#062068]">{site.audience.impressions}</dd></div>}
              </dl>
            )}
            {content.personas.length > 0 && (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {content.personas.map(p => {
                  const Icon = PERSONA_ICONS[p.icon] ?? Users
                  return (
                    <li key={p.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6">
                      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mw-blue-50 text-[#062068]"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                      <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">{p.who}</p>
                      <dl className="mt-4 space-y-2 text-sm">
                        <div><dt className="font-semibold text-gray-500">When</dt><dd className="text-gray-800">{p.when}</dd></div>
                        <div><dt className="font-semibold text-gray-500">Why it works</dt><dd className="text-gray-800">{p.why}</dd></div>
                      </dl>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* See your ad here: the mock-up tool */}
      {site.photos[0] && (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <SgSectionHeading title="See your ad here" intro={`Add your logo and a line, and see how your campaign would look on ${site.name}. Free preview; download the clean file and our team will quote it for you.`} />
            <AdMockup site={site} faceCorners={content.faceCorners} />
          </div>
        </section>
      )}

      {/* Site details + price */}
      <section className="bg-gray-50 mw-section">
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
          <div className="lg:col-span-5">
            <SgSectionHeading title="Price" as="h3" />
            <PriceGate country={site.countrySlug} ids={[site.id]} />
          </div>
        </div>
      </section>

      {site.lat != null && (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <SgSectionHeading title="Location" intro={site.address ?? undefined} />
            <SitesMap sites={[site]} title={`Map showing ${site.name}`} />
          </div>
        </section>
      )}

      {content.caseStudies.length > 0 && (
        <RelatedSection title="Case studies from this market" intro={`Campaigns that ran in ${site.cityName} and ${site.countryName}.`} items={content.caseStudies} bg="bg-gray-50" />
      )}
      {content.posts.length > 0 && (
        <RelatedSection title={`Reading on OOH in ${site.countryName}`} intro="Articles about advertising in this market." items={content.posts} bg="bg-white" />
      )}

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

function RelatedSection({ title, intro, items, bg }: { title: string; intro: string; items: RelatedItem[]; bg: string }) {
  return (
    <section className={`${bg} mw-section`}>
      <div className="mw-container">
        <SgSectionHeading title={title} intro={intro} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(it => (
            <li key={it.id}>
              <Link href={it.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:border-mw-blue-200 hover:shadow-precision-lg">
                <div className="relative aspect-[16/10] bg-gray-100">
                  {it.image && <Image src={it.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-1 text-xs font-bold uppercase tracking-wider text-mw-blue-600">{it.kind === 'post' ? 'Article' : 'Case study'}</span>
                  <h3 className="font-bold leading-snug text-gray-900">{it.title}</h3>
                  {it.excerpt && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{it.excerpt}</p>}
                  <span className="mt-auto pt-4 text-sm font-semibold text-mw-blue-600 group-hover:text-[#062068]">Read more →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
