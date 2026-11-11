'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { LeadForm } from '../forms/LeadForm'
import { AudienceSection, RelatedContent } from './ContentBlocks'
import type { PlaceContent } from '@/lib/inventory/placeContent'
import { SG_NAVY, SgSectionHeading, SgClosingCta, SgFormButton } from '../SingaporeShared'
import type { PublicSite } from '@/lib/inventory/types'
import { SiteCard, areaPath } from './InventoryShared'
import { SiteFinder } from './SiteFinder'
import type { SiteInsights } from '../proposal/SiteDetailsDialog'

export type AreaLink = { name: string; slug: string; kind: 'buyer' | 'supply'; count: number }

export function InventoryAreaClient({
  kind, areaName, cityName, citySlug, countryName, countrySlug, sites, pagedIds, nearby, otherAreas, sample, content, insights = {}, promo = null, guide = null, faq = null, heroImage = null,
}: {
  /** A photo of the area for the hero: the first site photo there, else a nearby one. */
  heroImage?: string | null
  insights?: Record<string, SiteInsights>
  /** The area template (Rif, 11 Nov 2026): the instant-proposal band, the written guide and its FAQ, rendered by the page. */
  promo?: ReactNode
  guide?: ReactNode
  faq?: ReactNode
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
  content: PlaceContent
}) {
  // The site's own form (not Zoho Forms): one modal, the title says what it's for
  const [form, setForm] = useState<string | null>(null)
  const contact = (title: string) => () => setForm(title)
  const paged = new Set(pagedIds)
  const formats = new Set(sites.map(s => s.displayFormat ?? s.format).filter(Boolean)).size
  const digital = sites.filter(s => s.digital).length
  const cityHref = `/locations/${countrySlug}/${citySlug}`
  // A hero reads in one breath: the description's opening sentences, up to about 200 characters.
  const heroLine = (t: string | null) => { if (!t) return null; const parts = t.match(/[^.!?]+[.!?]+/g) ?? [t]; let out = ''; for (const p of parts) { if (out && (out + p).length > 200) break; out += p } return out.trim() }

  return (
    <div className="bg-white text-gray-900">

      {/* Hero: the city page's hero (Rif, 11 Nov 2026) — dark blue, text left, a photo of the area right. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 text-white mw-hero-top pb-12 md:pb-16 lg:pb-20">
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="relative z-10 mw-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-x-1.5 text-sm text-blue-100/80">
                <Link href="/locations" className="mw-tap !justify-start hover:text-white">Locations</Link> <span aria-hidden="true">›</span>
                <Link href={`/locations/${countrySlug}`} className="mw-tap !justify-start hover:text-white">{countryName}</Link> <span aria-hidden="true">›</span>
                <Link href={cityHref} className="mw-tap !justify-start hover:text-white">{cityName}</Link> <span aria-hidden="true">›</span> <span className="text-white">{areaName}</span>
              </nav>
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                {kind === 'buyer' ? 'Billboard Advertising in' : 'Outdoor Advertising in'}{' '}
                <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">{areaName}</span>
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-mw-blue-100 md:text-xl">
                {kind === 'buyer'
                  ? (heroLine(content.description) ?? `${sites.length} billboards and digital screens you can book in ${areaName}, ${cityName}, programmatically or direct.`)
                  : sites.length ? `We list ${sites.length} site${sites.length === 1 ? '' : 's'} in ${areaName} today, and we are adding more.` : `We don't list sites in ${areaName} yet, and we want to.`}
              </p>
              {kind === 'buyer' && (
                <dl className="mb-8 grid max-w-md grid-cols-3 gap-3">
                  {[[String(sites.length), sites.length === 1 ? 'Site' : 'Sites'], [String(formats), formats === 1 ? 'Format' : 'Formats'], [String(digital), 'Digital screens']].map(([v, l]) => (
                    <div key={l} className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm">
                      <dt className="sr-only">{l}</dt>
                      <dd><span className="block text-2xl font-bold">{v}</span><span className="block text-xs text-mw-blue-200">{l}</span></dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="flex flex-wrap gap-4">
                {kind === 'buyer' ? (
                  <button type="button" onClick={contact(`Advertise in ${areaName}`)} className="mw-tap inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-mw-blue-900 transition-all hover:scale-105 hover:bg-mw-blue-50">
                    Launch your campaign
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                ) : (
                  <>
                    <SgFormButton onOpen={contact(`List your screens in ${areaName}`)} showArrow={false}>I own screens in {areaName}</SgFormButton>
                    <a href="#nearby" className="mw-tap inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10">I want to advertise here</a>
                  </>
                )}
                {kind === 'buyer' && <Link href={cityHref} className="mw-tap inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10">All of {cityName}</Link>}
              </div>
            </div>
            {heroImage && (
              <div className="hidden lg:block">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image src={heroImage} alt={`Outdoor advertising in ${areaName}, ${cityName}`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {kind === 'buyer' && promo}

      {kind === 'supply' && (
        <section className="bg-white mw-section">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">For media owners</span>
              <h2 className="mt-2 text-2xl font-bold text-[#2563eb]">Own billboards or screens in {areaName}?</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">Brands search for advertising in {areaName} every month, and Moving Walls doesn&apos;t have enough sites here to offer them. List your inventory with us and reach those buyers — programmatic and direct, with reporting included.</p>
              <div className="mt-5"><SgFormButton onOpen={contact(`List your screens in ${areaName}`)} variant="dark" showArrow={false}>List your inventory</SgFormButton></div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50" id="nearby">
              <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">For advertisers</span>
              <h2 className="mt-2 text-2xl font-bold text-[#2563eb]">Reach {areaName} from nearby sites</h2>
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
            <SgSectionHeading title={`Advertising sites in ${areaName}`} intro="Filter on the left; open Details for a site's audience and screen specifications, and add sites to your proposal." />
            <SiteFinder sites={sites} hasPage={s => paged.has(s.id)} mapTitle={`Map of advertising sites in ${areaName}`} insights={insights} showAreas={false} />
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

      {guide ?? <AudienceSection placeName={areaName} personas={content.personas} bg="bg-white" />}
      {faq}

      <RelatedContent cityName={cityName} countryName={countryName} caseStudies={content.caseStudies} posts={content.posts} firstBg="bg-white" />

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
      <LeadForm open={!!form} onClose={() => setForm(null)} purpose="enquiry" siteName={`${areaName}, ${cityName}`} title={form ?? undefined}
        intro={<>Tell us what you have in mind for <strong>{areaName}</strong>. Our {countryName} team replies within one working day.</>} />
    </div>
  )
}
