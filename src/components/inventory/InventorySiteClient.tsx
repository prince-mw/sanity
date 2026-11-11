'use client'

// The site page template (Rif, 11 Nov 2026: same standard as the country and
// city pages — good for SEO, a good read, good design). Thousands of these
// pages will come from the Inventory API, so every section builds itself from
// the site's data and hides when its data is missing; nothing is written per
// site. Order:
//   Hero (name, place, key figures, actions, photo) → About this site + full
//   specifications → Who you reach → See your ad here → Location →
//   Pairs well with (similar sites, with Details) → FAQ → related content → CTA
// Colour follows the site's own language: gradient icon tiles on white cards,
// one soft panel, blue for data. Cards in a row are equal height.

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CalendarDays, Eye, Info, MapPin, Maximize2, Monitor, Plus, Users, Zap, type LucideIcon } from 'lucide-react'
import { LeadForm } from '../forms/LeadForm'
import { AdMockup } from './AdMockup'
import { SG_NAVY, SgSectionHeading, SgClosingCta, SgFormButton } from '../SingaporeShared'
import type { PublicSite } from '@/lib/inventory/types'
import type { SiteContent } from '@/lib/inventory/siteContent'
import type { Faq } from '@/lib/inventory/siteFaq'
import { RelatedContent } from './ContentBlocks'
import { SitesMap, SampleTag, SiteCard, areaPath, sitePath } from './InventoryShared'
import { AddToProposalButton } from '../proposal/AddToProposalButton'
import { PERSONA_ICONS, SiteDetailsDialog, specRows, type SiteInsights } from '../proposal/SiteDetailsDialog'

// The gradients the site's product cards use (Brands / Solutions pages).
const TILES = ['from-cyan-500 to-blue-600', 'from-emerald-500 to-teal-600', 'from-orange-500 to-rose-600', 'from-amber-500 to-yellow-600', 'from-indigo-500 to-violet-600', 'from-mw-blue-500 to-purple-600']
const tile = (i: number) => `flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${TILES[i % TILES.length]} text-white transition-transform group-hover:scale-110`
/** Lower-case a format name inside a sentence, keeping acronyms (LED, DOOH). */
const lc = (f: string) => f.toLowerCase().replace(/\bled\b/g, 'LED').replace(/\bdooh\b/g, 'DOOH')
const card = 'group h-full rounded-2xl border border-mw-blue-100 bg-white shadow-mw-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-mw-xl'

export function InventorySiteClient({ site, content, similar, pagedIds, faqs = [], insights = {}, overview = null }: { site: PublicSite; content: SiteContent; similar: PublicSite[]; pagedIds: string[]; faqs?: Faq[]; insights?: Record<string, SiteInsights>; overview?: string | null }) {
  // The site's own lead form (not Zoho Forms): GA4 sees the conversion, the lead still reaches Zoho CRM.
  const [formOpen, setFormOpen] = useState(false)
  const enquire = () => setFormOpen(true)
  const [photo, setPhoto] = useState(0)
  const [detail, setDetail] = useState<PublicSite | null>(null)
  const paged = new Set(pagedIds)
  const areaHref = areaPath(site.countrySlug, site.citySlug, site.areaSlug)
  const format = site.displayFormat ?? site.format ?? 'Outdoor advertising'
  const description = content.description ?? site.description
  const specs = specRows(site)

  // The four facts a buyer looks for first, in the hero. Each one only if the data has it.
  const keyFacts: { icon: LucideIcon; label: string; value: string }[] = [
    site.audience?.reach ? { icon: Users, label: 'Monthly reach', value: site.audience.reach } : null,
    site.audience?.impressions ? { icon: Eye, label: 'Monthly impressions', value: site.audience.impressions } : null,
    site.size ? { icon: Maximize2, label: 'Size', value: site.size } : null,
    site.digital?.spotSeconds ? { icon: Zap, label: 'Spot length', value: `${site.digital.spotSeconds} seconds` } : site.illuminated != null ? { icon: Monitor, label: 'Illuminated', value: site.illuminated ? 'Yes' : 'No' } : null,
    // Fallbacks, so a site without audience figures or a size still gets a full row (Rif preferred Komtar's fuller hero).
    site.illuminated != null && site.digital?.spotSeconds ? { icon: Monitor, label: 'Illuminated', value: site.illuminated ? 'Yes' : 'No' } : null,
    site.venueType ? { icon: MapPin, label: 'Venue', value: site.venueType } : null,
    site.specs?.leadTimeDays != null ? { icon: CalendarDays, label: 'Lead time', value: `${site.specs.leadTimeDays} days` } : null,
    site.specs?.resolution ? { icon: Maximize2, label: 'Resolution', value: site.specs.resolution } : null,
  ].filter((x): x is { icon: LucideIcon; label: string; value: string } => !!x).filter((f, i, a) => a.findIndex(g => g.label === f.label) === i).slice(0, 4)

  return (
    <div className="bg-white text-gray-900">

      {/* Hero: place, name, key figures, the two actions, the photo */}
      <section className={`relative overflow-hidden ${SG_NAVY} text-white pb-12 lg:pb-16 mw-hero-top`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="relative mw-container">
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">{site.name}</h1>
              <p className="mt-3 text-lg text-blue-100/90">{format} in {site.areaName}, {site.cityName}</p>
              {keyFacts.length > 0 && (
                <dl className="mt-7 grid grid-cols-2 gap-3 max-w-xl">
                  {keyFacts.map(f => (
                    <div key={f.label} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                      <f.icon className="h-5 w-5 flex-shrink-0 text-cyan-300" aria-hidden="true" />
                      <div className="min-w-0"><dt className="text-xs font-semibold uppercase tracking-wider text-blue-100/70">{f.label}</dt><dd className="truncate text-lg font-bold text-white">{f.value}</dd></div>
                    </div>
                  ))}
                </dl>
              )}
              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <SgFormButton onOpen={enquire} showArrow={false}>Enquire about this site</SgFormButton>
                <AddToProposalButton site={site} variant="hero" />
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

      {/* About this site: the description at reading width, then the full specification sheet across the page
          (never a short text beside a tall panel — Rif, 11 Nov 2026) */}
      {(description || overview || specs.length > 0) && (
        <section className="bg-white mw-section" aria-labelledby="site-about">
          <div className="mw-container">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">About this site</p>
            <h2 id="site-about" className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{format} advertising on {site.name}</h2>
            {(description || overview) && <div className="prose mt-4 max-w-3xl text-gray-700">{[...(description ? description.split(/\n{2,}/) : []), ...(overview ? [overview] : [])].map((p, i) => <p key={i}>{p}</p>)}</div>}
            {specs.length > 0 && (
              <div className="mt-10 rounded-2xl border-2 border-mw-blue-200 bg-gradient-to-br from-mw-blue-50 to-cyan-100 p-6 shadow-lg sm:p-8">
                <div className="flex items-center gap-3">
                  <span className={tile(0)}><Monitor className="h-6 w-6" aria-hidden="true" /></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">Screen specifications</h3>
                </div>
                <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {specs.map(([k, v]) => <div key={k} className="h-full rounded-xl bg-white px-4 py-3"><dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">{k}</dt><dd className="mt-1 font-semibold text-gray-900">{v}</dd></div>)}
                </dl>
                {site.specs?.sample && <p className="mt-4 text-xs text-gray-600">Specifications are confirmed by the media owner when you book.</p>}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Who you reach: one card per audience, from the site's personas */}
      {content.personas.length > 0 && (
        <section className="bg-gray-50 mw-section" aria-labelledby="site-audience">
          <div className="mw-container">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">Audience</p>
            <h2 id="site-audience" className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Who you reach at {site.name}</h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-600">The people who pass this {lc(format)} in {site.areaName}, when they are there, and why it matters for your campaign.</p>
            <ul className={`mt-8 grid gap-5 ${({ 1: 'max-w-md', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' } as Record<number, string>)[content.personas.length] ?? 'sm:grid-cols-2 lg:grid-cols-4'}`}>
              {content.personas.map((p, i) => { const Icon = PERSONA_ICONS[p.icon] ?? Users; return (
                <li key={p.name} className={`${card} flex flex-col p-6`}>
                  <span className={`mb-4 ${tile(i + 1)}`}><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  <h3 className="font-bold text-gray-900">{p.name}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-700">{p.who}</p>
                  <p className="mt-4 text-xs font-semibold text-[#2563eb]">{p.when}</p>
                  {p.why && <p className="mt-1 text-xs text-gray-500">{p.why}</p>}
                </li>
              ) })}
            </ul>
          </div>
        </section>
      )}

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
            <SgSectionHeading title={`Where ${site.name} is`} intro={site.address ?? `${site.areaName}, ${site.cityName}`} />
            <SitesMap sites={[site]} title={`Map showing ${site.name}`} />
            <p className="mt-4 text-sm text-gray-600">More sites nearby: <Link href={areaHref} className="font-semibold text-[#2563eb] hover:underline">advertising in {site.areaName}</Link> · <Link href={`/locations/${site.countrySlug}/${site.citySlug}`} className="font-semibold text-[#2563eb] hover:underline">all of {site.cityName}</Link></p>
          </div>
        </section>
      )}

      {/* Pairs well with: similar and nearby sites, with the same Details popup as the city page */}
      {similar.length > 0 && (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <SgSectionHeading title="Pairs well with" intro={`Other ${lc(format)} sites and nearby inventory in ${site.cityName}. Add two or three to one proposal to cover more of the city.`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map(s => <SiteCard key={s.id} site={s} linked={paged.has(s.id)} action={
                // Same pair as the city finder: one row, equal height, Details outlined, Add to proposal the lead CTA.
                <span className="grid w-full grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-2">
                  <button type="button" onClick={e => { e.preventDefault(); e.stopPropagation(); setDetail(s) }} className="mw-tap inline-flex h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-2 border-gray-300 bg-white px-3 text-xs font-semibold text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]"><Info className="h-3.5 w-3.5" aria-hidden="true" />Details</button>
                  <AddToProposalButton site={s} variant="card" className="h-11 w-full" />
                </span>
              } />)}
            </div>
          </div>
        </section>
      )}

      {/* FAQ, built from the site's data; the page's FAQPage JSON-LD uses the same list. Same look as the
          area page's FAQ (Rif, 11 Nov 2026), on <details> so every answer is in the page HTML. */}
      {faqs.length > 0 && (
        <section className="bg-gray-50 mw-section" aria-labelledby="site-faq">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="site-faq" className="mb-8 text-center text-3xl font-bold text-gray-900 lg:text-4xl">Advertising on {site.name}: questions</h2>
            <div className="space-y-4">
              {faqs.map(f => (
                <details key={f.q} className="group overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-gray-900 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus className="h-5 w-5 flex-shrink-0 text-mw-blue-600 transition-transform group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-gray-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedContent cityName={site.cityName} countryName={site.countryName} caseStudies={content.caseStudies} posts={content.posts} firstBg="bg-white" />

      <SgClosingCta heading={`Book ${site.name}`} body={`Tell us your dates and audience. Our ${site.countryName} team checks availability and comes back to you with a plan.`} button="Enquire about this site" onOpen={enquire} showArrow={false} />
      <LeadForm open={formOpen} onClose={() => setFormOpen(false)} purpose="enquiry" siteId={site.id} siteName={site.name}
        intro={<>Tell us your dates and audience for <strong>{site.name}</strong>. Our {site.countryName} team checks availability and comes back to you.</>} />
      <SiteDetailsDialog site={detail} insights={detail ? insights[detail.id] : undefined} onClose={() => setDetail(null)}
        action={detail ? <span className="flex flex-wrap items-center justify-end gap-3">{paged.has(detail.id) && <Link href={sitePath(detail)} className="mw-tap text-sm font-semibold text-[#2563eb] hover:underline">View site page →</Link>}<AddToProposalButton site={detail} variant="card" /></span> : null} />
    </div>
  )
}
