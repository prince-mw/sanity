'use client'

import Link from 'next/link'
import { sgVenues, SG_BASE_PATH, type SgVenue } from '@/data/singapore'
import {
  SG_NAVY,
  CheckIcon,
  SgClosingCta,
  SgFaqList,
  SgFormButton,
  SgImageBox,
  SgLandmarkCards,
  SgLogoStrip,
  SgMwScience,
  SgSectionHeading,
  SgSiteGrid,
  useSgForm,
  type SgLogoSection,
} from './SingaporeShared'

// Section backgrounds alternate white / grey down the page:
// why (white) → premium (grey) → locations (white) → formats (grey) → why Moving Walls (white)
// → logo strip (grey, from Sanity) → FAQ (white) → explore more (grey) → closing CTA (white)

export default function SingaporeVenueClient({
  venue,
  formUrl,
  logoSection,
}: {
  venue: SgVenue
  formUrl: string
  logoSection: SgLogoSection | null
}) {
  const openForm = useSgForm(formUrl)
  const otherVenues = sgVenues.filter((v) => v.slug !== venue.slug)

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className={`relative overflow-hidden ${SG_NAVY} text-white pt-24 pb-12 lg:pt-28 lg:pb-16`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24387f]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#4859a7]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-3">{venue.h1}</h1>
              <p className="text-lg sm:text-xl font-semibold text-cyan-300 mb-5">{venue.tagline}</p>
              <p className="text-base sm:text-lg font-semibold text-white mb-3">{venue.leadQuestion}</p>
              <div className="space-y-3 text-base text-blue-100/90 leading-relaxed mb-7">
                {venue.intro.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <SgFormButton onOpen={openForm} showArrow={false} className="w-full sm:w-auto">{venue.heroCta}</SgFormButton>
                <Link
                  href={SG_BASE_PATH}
                  className="inline-flex w-full sm:w-auto items-center justify-center border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all"
                >
                  Back to Singapore
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <SgImageBox image={venue.image} className="aspect-[4/3] rounded-3xl ring-1 ring-white/15 shadow-2xl" sizes="(min-width: 1024px) 40vw, 100vw" priority />
              <dl className="-mt-8 mx-4 relative grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-gray-200 shadow-precision-lg">
                {venue.heroStats.map((s) => (
                  <div key={s.label} className="bg-white p-3 sm:p-4 text-center">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block text-lg sm:text-2xl font-bold text-[#062068]">{s.value}</span>
                      <span className="block text-[11px] sm:text-xs text-gray-500 leading-tight">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Why advertise */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title={venue.whyHeading} center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {venue.why.map((w, i) => (
              <div key={w.title} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 hover:border-mw-blue-200 hover:shadow-precision transition-all">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#61CBF5] via-[#1E76BB] to-[#2A3B8F] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm font-bold text-mw-blue-600">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 mb-2">{w.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium locations */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title={venue.premiumHeading} intro={venue.premiumIntro} center />
          <SgLandmarkCards landmarks={venue.landmarks} imageOnly={venue.landmarksImageOnly} />
          {venue.landmarksNote && <p className="mt-4 text-sm text-gray-500 text-center">{venue.landmarksNote}</p>}
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title={venue.locationsHeading} center />
          {venue.sites.length > 0 ? (
            <SgSiteGrid sites={venue.sites} />
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {venue.locationGroups?.map((g) => (
                <div key={g.title} className="rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{g.title}</h3>
                  <p className="text-gray-600">{g.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Formats */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title={venue.formatsHeading} center />
          <ul className="flex flex-wrap justify-center gap-3">
            {venue.formats.map((f) => (
              <li key={f} className="inline-flex items-center gap-2 rounded-full border border-mw-blue-100 bg-white px-5 py-2.5 text-sm sm:text-base font-semibold text-mw-blue-700 shadow-precision">
                <CheckIcon className="w-4 h-4" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Moving Walls + MW Science (two-column, left-aligned) */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-4">Why Choose Moving Walls?</h2>
              <div className="space-y-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                {venue.whyChooseLead.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="font-semibold text-gray-900 mb-4">With Moving Walls, you can:</p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {venue.whyChooseList.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-200 p-4">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-mw-blue-100 text-mw-blue-600 flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-4 h-4" />
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <SgMwScience />
        </div>
      </section>

      <SgLogoStrip section={logoSection} />

      <SgFaqList faqs={venue.faqs} bg="bg-white" />

      {/* Internal links: back to Singapore and across to the other venue pages */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title="Explore More Advertising in Singapore" intro="Combine venues in one plan, with reporting in one place." center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link
              href={SG_BASE_PATH}
              className={`group flex flex-col rounded-2xl ${SG_NAVY} text-white p-5 hover:-translate-y-1 hover:shadow-precision-lg transition-all`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Overview</span>
              <span className="mt-2 font-bold flex-1">Outdoor Advertising in Singapore</span>
              <span className="mt-4 text-sm font-semibold text-blue-100 group-hover:text-white transition-colors">All venues</span>
            </Link>
            {otherVenues.map((v) => (
              <Link
                key={v.slug}
                href={`${SG_BASE_PATH}/${v.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 hover:-translate-y-1 hover:border-mw-blue-200 hover:shadow-precision-lg transition-all"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">{v.tabLabel}</span>
                <span className="mt-2 font-bold text-gray-900 flex-1">{v.breadcrumbLabel} in Singapore</span>
                <span className="mt-4 text-sm font-semibold text-mw-blue-600 group-hover:text-[#062068] transition-colors">Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SgClosingCta heading={venue.ctaHeading} body={venue.ctaBody} button={venue.ctaButton} onOpen={openForm} showArrow={false} />
    </div>
  )
}
