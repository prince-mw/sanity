'use client'

import Link from 'next/link'
import type { PartnerPageContent } from '@/data/partners'
import { PartnerLogoTile } from '@/components/PartnerDetailClient'

interface PartnersListClientProps {
  intro: { eyebrow: string; title: string; intro: string }
  partners: PartnerPageContent[]
}

export default function PartnersListClient({ intro, partners }: PartnersListClientProps) {
  return (
    <div className="bg-white text-gray-900">
      <section className="relative overflow-hidden bg-[#062068] text-white pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24387f]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-bold tracking-tight mb-5">
              <span className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-3">{intro.eyebrow}</span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl leading-tight">{intro.title}</span>
            </h1>
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed">{intro.intro}</p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {partners.map((partner) => (
              <li key={partner.slug}>
                <Link
                  href={`/partners/${partner.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-gray-200 p-6 hover:border-mw-blue-300 hover:shadow-precision-lg transition-all"
                >
                  <PartnerLogoTile partner={partner} className="w-full h-28 mb-5" />
                  {partner.category && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-mw-blue-600 mb-1">{partner.category}</p>
                  )}
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h2>
                  {partner.summary && <p className="text-gray-600 leading-relaxed flex-1">{partner.summary}</p>}
                  <span className="mt-5 inline-flex items-center gap-2 text-mw-blue-600 font-semibold group-hover:gap-3 transition-all">
                    Explore the partnership
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
