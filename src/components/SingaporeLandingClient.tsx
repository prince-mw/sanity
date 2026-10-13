'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SG_BASE_PATH, type SgMain, type SgVenue } from '@/data/singapore'
import {
  SG_NAVY,
  ArrowIcon,
  SgClosingCta,
  SgFaqList,
  SgFormButton,
  SgImageBox,
  SgLandmarkCards,
  SgLogoStrip,
  SgSectionHeading,
  useSgForm,
  type SgLogoSection,
} from './SingaporeShared'

const MEDIA_ICONS: Record<string, string> = {
  train: 'M8 17l-2 4m10-4l2 4M7 3h10a2 2 0 012 2v9a3 3 0 01-3 3H8a3 3 0 01-3-3V5a2 2 0 012-2zm-2 7h14M9 14h.01M15 14h.01',
  bus: 'M6 17v2m12-2v2M5 4h14a1 1 0 011 1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5a1 1 0 011-1zm-1 7h16M8 14h.01M16 14h.01',
  billboard: 'M3 4h18v10H3V4zm6 10v6m6-6v6M7 8h10',
  store: 'M3 9l1.5-5h15L21 9M3 9h18M3 9v1a3 3 0 006 0V9m0 1a3 3 0 006 0V9m0 1a3 3 0 006 0V9M5 13v7h14v-7',
  plane: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
}

function MediaIcon({ name }: { name: string }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#61CBF5] via-[#1E76BB] to-[#2A3B8F] text-white flex items-center justify-center shadow-lg shadow-blue-900/20">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={MEDIA_ICONS[name] || MEDIA_ICONS.billboard} />
      </svg>
    </div>
  )
}

export default function SingaporeLandingClient({
  main,
  venues,
  formUrl,
  logoSection,
}: {
  main: SgMain
  venues: SgVenue[]
  formUrl: string
  logoSection: SgLogoSection | null
}) {
  const openForm = useSgForm(formUrl)
  const [activeVenue, setActiveVenue] = useState(venues[0]?.slug)

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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5">{main.h1}</h1>
              <div className="space-y-4 text-base sm:text-lg text-blue-100/90 leading-relaxed mb-7">
                {main.heroParagraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div className="flex flex-wrap gap-3">
                <SgFormButton onOpen={openForm}>{main.heroPrimaryCta}</SgFormButton>
                <a
                  href="#venues"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-all"
                >
                  {main.heroSecondaryCta}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <Link
                  href="/locations"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-all"
                >
                  All Locations
                </Link>
              </div>
            </div>
            <dl className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              {main.heroStats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm p-4 sm:p-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">{s.value}</span>
                    <span className="block mt-1 text-sm sm:text-base text-blue-100/80">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Landscape */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title={main.landscape.heading} intro={main.landscape.intro} center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {main.landscape.cards.map((c, i) => (
              <div key={c.title} className="rounded-2xl border border-gray-200 p-6 hover:border-mw-blue-300 hover:shadow-precision transition-all">
                <span className="text-sm font-bold text-mw-blue-600">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue tabs */}
      <section id="venues" className="py-12 lg:py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title={main.venuesHeading} intro={main.venuesIntro} center />
          <div role="tablist" aria-label="Venue types" className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
            {venues.map((v) => {
              const selected = activeVenue === v.slug
              return (
                <button
                  key={v.slug}
                  type="button"
                  role="tab"
                  id={`tab-${v.slug}`}
                  aria-selected={selected}
                  aria-controls={`panel-${v.slug}`}
                  onClick={() => setActiveVenue(v.slug)}
                  className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm sm:text-base font-semibold transition-all ${selected ? 'bg-[#062068] text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-200 hover:border-mw-blue-300'}`}
                >
                  {v.tabLabel}
                </button>
              )
            })}
          </div>

          {/* All panels stay in the DOM (hidden when inactive) so every venue's content and links are crawlable */}
          {venues.map((v) => (
            <div
              key={v.slug}
              role="tabpanel"
              id={`panel-${v.slug}`}
              aria-labelledby={`tab-${v.slug}`}
              hidden={activeVenue !== v.slug}
              className="mt-6 rounded-3xl bg-white border border-gray-200 p-5 sm:p-8 shadow-precision"
            >
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                <SgImageBox image={v.image} className="lg:col-span-5 aspect-[16/10] rounded-2xl" sizes="(min-width: 1024px) 40vw, 100vw" />
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      <Link href={`${SG_BASE_PATH}/${v.slug}`} className="hover:text-mw-blue-600 transition-colors">{v.breadcrumbLabel}</Link>
                    </h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${v.badge === 'Programmatic' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>
                      {v.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3"><span className="font-semibold text-gray-900">Best for:</span> {v.tabBestFor}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{v.tabDescription}</p>
                  {v.tabNote && <p className="mb-6 inline-flex rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">{v.tabNote}</p>}
                  {v.tabStats.length > 0 && (
                  <dl className="grid grid-cols-3 gap-3 mb-6">
                    {v.tabStats.map((s) => (
                      <div key={s.label} className="rounded-xl bg-gray-50 border border-gray-100 p-3 sm:p-4">
                        <dt className="sr-only">{s.label}</dt>
                        <dd>
                          <span className="block text-xl sm:text-2xl font-bold text-mw-blue-600">{s.value}</span>
                          <span className="block text-xs sm:text-sm text-gray-500">{s.label}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  )}
                  {/* Side by side from sm up; stacked full-width on phones */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                    <SgFormButton onOpen={openForm} variant="dark" compact className="w-full sm:w-auto">
                      Plan your {v.tabLabel} campaign
                    </SgFormButton>
                    <Link
                      href={`${SG_BASE_PATH}/${v.slug}`}
                      className="inline-flex w-full sm:w-auto items-center justify-center whitespace-nowrap rounded-lg border-2 border-[#062068] px-4 py-2 text-sm font-semibold text-[#062068] hover:bg-[#062068] hover:text-white transition-all"
                    >
                      Explore {v.breadcrumbLabel}
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Landmark billboards */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title={main.landmarksHeading} intro={main.landmarksIntro} center />
          <SgLandmarkCards landmarks={main.landmarks} />
        </div>
      </section>

      {/* Media types */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title={main.mediaTypesHeading} center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {main.mediaTypes.map((m) => (
              <div
                key={m.title}
                className="flex flex-col rounded-2xl bg-white border border-gray-200 p-6 shadow-precision"
              >
                <MediaIcon name={m.icon} />
                <h3 className="mt-5 text-lg font-bold text-gray-900">{m.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Billboard advertising in Singapore */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-5">{main.billboard.heading}</h2>
            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              {main.billboard.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            <SgImageBox image={main.billboard.image} className="w-full aspect-[16/9] rounded-3xl shadow-precision-lg" sizes="(min-width: 1024px) 40vw, 100vw" />
            <SgFormButton onOpen={openForm} variant="dark">{main.billboard.cta}</SgFormButton>
          </div>
        </div>
      </section>

      {/* Measurement */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-5">{main.measurement.heading}</h2>
            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed mb-7">
              {main.measurement.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            <SgFormButton onOpen={openForm} variant="dark">{main.measurement.cta}</SgFormButton>
          </div>
          <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-precision">
            <table className="w-full text-left">
              <thead className={`${SG_NAVY} text-white`}>
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold w-2/5">What you get</th>
                  <th scope="col" className="px-5 py-4 font-semibold">What it tells you</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {main.measurement.rows.map((r) => (
                  <tr key={r.what}>
                    <th scope="row" className="px-5 py-4 font-semibold text-gray-900 align-top">{r.what}</th>
                    <td className="px-5 py-4 text-gray-600 align-top">{r.tells}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Market potential */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-6 text-center">{main.potential.heading}</h2>
          <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            {main.potential.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title={main.stories.heading} intro={main.stories.intro} center />
          <div className="grid md:grid-cols-2 gap-6">
            {main.stories.items.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-precision hover:shadow-precision-lg transition-all"
              >
                <div className="relative aspect-[16/9] bg-gray-100">
                  <Image src={s.image} alt={s.headline} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="self-start rounded-full bg-mw-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mw-blue-700">{s.tag}</span>
                  <h3 className="mt-3 text-lg font-bold text-gray-900 flex-1">{s.headline}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-mw-blue-600 group-hover:gap-3 transition-all">
                    {s.button} <ArrowIcon className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SgLogoStrip section={logoSection} />

      <SgClosingCta heading={main.cta.heading} body={main.cta.body} button={main.cta.button} onOpen={openForm} />

      <SgFaqList faqs={main.faqs} />
    </div>
  )
}
