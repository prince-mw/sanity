'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CTAButton } from '@/components/CTAButton'
import type { RetailMediaContent } from '@/data/retail-media-page'

const NAVY = 'bg-[#062068]'

const ArrowIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

// Icons for the three dynamic-creative triggers, matched by position (weather, promotions, time of day)
const creativeIcons = [
  <svg key="weather" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>,
  <svg key="promo" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>,
  <svg key="time" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
]

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 ${light ? 'text-cyan-300' : 'text-mw-blue-600'}`}>
    {children}
  </p>
)

export default function RetailMediaPageClient({ content }: { content: RetailMediaContent }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className={`relative overflow-hidden ${NAVY} text-white pt-24 pb-12 lg:pt-28 lg:pb-16`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24387f]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#4859a7]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Eyebrow sits inside the H1 so the "Retail Media in Southeast Asia" keyword stays in the page heading */}
            <h1 className="font-bold tracking-tight mb-5">
              {content.heroEyebrow && (
                <span className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-3">
                  {content.heroEyebrow}
                </span>
              )}
              <span className="block text-3xl sm:text-4xl lg:text-5xl leading-tight">{content.heroTitle}</span>
            </h1>
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed mb-7">
              {content.heroSubtitle}
            </p>
            <CTAButton
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#062068] px-7 py-3.5 rounded-lg font-semibold text-base hover:bg-gray-100 transition-all shadow-precision-lg active:scale-[0.98]"
            >
              {content.heroCtaText}
              <ArrowIcon />
            </CTAButton>
          </div>

          {content.heroStats.length > 0 && (
            <dl className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              {content.heroStats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm p-4 sm:p-6">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="block mt-1 text-sm sm:text-base text-blue-100/80">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* Why in-store */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-4">
              {content.contextHeading}
            </h2>
            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              {content.contextParagraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-8 lg:p-10">
            <p className="text-xl sm:text-2xl font-bold text-[#062068] mb-6">{content.contextCallout}</p>
            <dl className="grid sm:grid-cols-2 gap-4 mb-6">
              {content.contextStats.map((stat) => (
                <div key={stat.value} className="rounded-xl bg-white border border-gray-200 p-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl sm:text-4xl font-bold text-mw-blue-600">{stat.value}</span>
                    <span className="block mt-2 text-sm text-gray-600 leading-snug">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-gray-600 leading-relaxed">{content.contextClosing}</p>
          </div>
        </div>
      </section>

      {/* Last mile + shopper moments */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-4">
              {content.lastMileHeading}
            </h2>
            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              {content.lastMileParagraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{content.momentsHeading}</h3>
          <ol className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {content.moments.map((moment, i) => (
              <li key={moment.stage} className="relative rounded-2xl bg-white border border-gray-200 p-6 lg:p-8 shadow-precision">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`flex items-center justify-center w-9 h-9 rounded-full ${NAVY} text-white text-sm font-bold`}>
                    {i + 1}
                  </span>
                  <span className="text-lg font-bold text-[#062068]">{moment.stage}</span>
                </div>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs mb-1">Where</dt>
                    <dd className="text-gray-900">{moment.where}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs mb-1">What it does</dt>
                    <dd className="text-gray-900">{moment.whatItDoes}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs mb-1">What we measure</dt>
                    <dd className="text-mw-blue-600 font-semibold">{moment.whatWeMeasure}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Approach */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 lg:mb-10">
            <Eyebrow>{content.approachEyebrow}</Eyebrow>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-4">
              {content.approachHeading}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{content.approachIntro}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {content.approachPillars.map((pillar, i) => (
              <div key={pillar.title} className="rounded-2xl border border-gray-200 p-6 lg:p-8 hover:border-mw-blue-300 hover:shadow-precision transition-all">
                <span className="text-sm font-bold text-mw-blue-600">0{i + 1}</span>
                <h3 className="mt-2 text-lg sm:text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
          {content.categories.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-900 mb-3">{content.categoriesLabel}</p>
              <ul className="flex flex-wrap gap-2">
                {content.categories.map((cat) => (
                  <li key={cat} className="px-4 py-2 rounded-full bg-mw-blue-50 text-mw-blue-700 text-sm font-medium border border-mw-blue-100">
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className={`relative overflow-hidden ${NAVY} text-white py-12 lg:py-16`}>
        <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 lg:mb-10">
            <Eyebrow light>{content.howItWorksEyebrow}</Eyebrow>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{content.howItWorksHeading}</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ol className="space-y-4">
              {content.howItWorksSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4 rounded-xl border border-white/15 bg-white/5 p-5">
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#062068] font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">
                      {step.title}
                      {step.subtitle && <span className="font-normal text-cyan-300">: {step.subtitle}</span>}
                    </h3>
                    <p className="mt-1 text-blue-100/85 leading-relaxed">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            {content.howItWorksImage && (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/10 shadow-2xl">
                <Image
                  src={content.howItWorksImage.url}
                  alt={content.howItWorksImage.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic creative */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-4">
              {content.creativeHeading}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{content.creativeIntro}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {content.creativeItems.map((item, i) => (
              <div key={item.title} className="rounded-2xl bg-gray-50 border border-gray-200 p-6 lg:p-8">
                <div className="w-12 h-12 rounded-xl bg-mw-blue-100 text-mw-blue-600 flex items-center justify-center mb-5">
                  {creativeIcons[i % creativeIcons.length]}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Measurement */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-4">
              {content.measurementHeading}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{content.measurementIntro}</p>
          </div>

          {/* Table on desktop */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-precision">
            <table className="w-full text-left">
              <thead className={`${NAVY} text-white`}>
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/5">Layer</th>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/4">What it answers</th>
                  <th scope="col" className="px-6 py-4 font-semibold">How it is measured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {content.measurementLayers.map((row) => (
                  <tr key={row.layer}>
                    <th scope="row" className="px-6 py-5 font-bold text-[#062068] align-top">{row.layer}</th>
                    <td className="px-6 py-5 font-semibold text-gray-900 align-top">{row.question}</td>
                    <td className="px-6 py-5 text-gray-600 leading-relaxed align-top">{row.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards on mobile */}
          <div className="md:hidden space-y-4">
            {content.measurementLayers.map((row) => (
              <div key={row.layer} className="rounded-2xl bg-white border border-gray-200 p-5">
                <p className="font-bold text-[#062068]">{row.layer}</p>
                <p className="mt-2 font-semibold text-gray-900">{row.question}</p>
                <p className="mt-2 text-gray-600 leading-relaxed text-sm">{row.method}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-8 lg:mb-10">
            {content.caseEyebrow}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {content.caseImage && (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-precision-lg">
                <Image
                  src={content.caseImage.url}
                  alt={content.caseImage.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{content.caseHeading}</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">{content.caseBody}</p>
              <dl className="grid grid-cols-2 gap-4">
                {content.caseStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-gray-200 p-5">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-3xl sm:text-4xl font-bold text-mw-blue-600">{stat.value}</span>
                      <span className="block mt-1 text-sm text-gray-600">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              {content.caseLinkText && content.caseLinkUrl && (
                <Link
                  href={content.caseLinkUrl}
                  className="mt-8 inline-flex items-center gap-2 text-mw-blue-600 font-semibold hover:gap-3 transition-all"
                >
                  {content.caseLinkText}
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`relative overflow-hidden ${NAVY} text-white py-12 lg:py-16 text-center`}>
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full h-[300px] bg-[#24387f]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">{content.ctaHeading}</h2>
          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed mb-8">{content.ctaBody}</p>
          <CTAButton
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#062068] px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-gray-100 transition-all shadow-precision-lg active:scale-[0.98]"
          >
            {content.ctaButtonText}
            <ArrowIcon />
          </CTAButton>
        </div>
      </section>

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-8 text-center">
              {content.faqHeading}
            </h2>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {content.faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <div key={faq.question}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`retail-faq-${index}`}
                        className="w-full flex items-center justify-between gap-4 py-5 text-left font-semibold text-gray-900 hover:text-mw-blue-600 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <svg
                          className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </h3>
                    {/* Kept in the DOM when collapsed so the answers stay crawlable */}
                    <div id={`retail-faq-${index}`} hidden={!isOpen} className="pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
