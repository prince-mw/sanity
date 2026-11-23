'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from '@/i18n/LocaleContext'
import { T, CARD_HOVER, SCIENCE_CSS, ArrowIcon, ScienceHeroBackdrop, NoBoundariesSection } from '@/components/mw-science/shared'
import {
  ResearchSolutionsGrid, MarketCoverageMap, AnimatedStat, SingleItemCarousel, TestimonialsSpotlight,
  APP_PANEL, MARKET_METRICS, MARKET_METRICS_INTERVAL, LOGOS,
} from '@/components/mw-science/LabSections'

// MW Science Lab — child page of MW Science (/mw-science/lab), Nov 2026 redesign.
// The research sections are the ones that used to sit on the MW Science page.

const PeopleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.13a9.38 9.38 0 0 0 2.63.37 9.34 9.34 0 0 0 4.12-.95 4.13 4.13 0 0 0-7.53-2.49M15 19.13v-.01c0-1.11-.29-2.16-.79-3.07M15 19.13v.1A12.32 12.32 0 0 1 8.62 21a12.32 12.32 0 0 1-6.37-1.77v-.11a6.38 6.38 0 0 1 11.96-3.07M12 6.38a3.38 3.38 0 1 1-6.75 0 3.38 3.38 0 0 1 6.75 0Zm8.25 2.25a2.63 2.63 0 1 1-5.25 0 2.63 2.63 0 0 1 5.25 0Z" />
  </svg>
)

const RuleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h9M3 12h9M3 17h6M14.5 7.5l2 2 4-4M15 15l5 5M20 15l-5 5" />
  </svg>
)

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <path strokeLinecap="round" d="M8.5 16.5v-3M12 16.5v-6M15.5 16.5v-8" />
  </svg>
)

const PRINCIPLES = [
  { Icon: PeopleIcon, color: 'text-[#FEDA24]', title: 'Measure real people.', body: 'Panels of real consumers, surveyed and seen in the real world.' },
  { Icon: RuleIcon, color: 'text-[#38BDF8]', title: 'Set the bar first.', body: 'Pass marks are fixed before fieldwork, never after the result.' },
  { Icon: ChartIcon, color: 'text-[#4BEF6E]', title: 'Show the margin of error.', body: 'Every result ships with it.' },
]

export default function MWScienceLabClient() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-white text-[#0F172A] overflow-x-hidden">
      <style>{SCIENCE_CSS}</style>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section id="science-lab" className="relative pt-24 pb-20 md:pt-28 md:pb-24 bg-[#0B132B] text-[#F8FAFC] border-b border-[#38BDF8]/20 overflow-hidden">
        <ScienceHeroBackdrop src="/assets/images/mw-science/mw-science-lab-hero.jpg" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col gap-10">
          <div className="mws-enter-1">
            <Link href="/mw-science" className={`group inline-flex items-center gap-1 ${T.labelMd} text-[#38BDF8] hover:underline`}>
              <ArrowIcon className="w-4 h-4 rotate-180 transition-transform duration-150 group-hover:-translate-x-0.5" />
              <span>Back to MW Science</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className={`mws-enter-2 ${T.labelSm} uppercase text-[#FEDA24]`}>Independent Rigour</span>
              <h1 className={`mws-enter-3 ${T.display}`}>MW Science Lab</h1>
              <p className={`mws-enter-4 ${T.bodyLg} text-[#CBD5E1] max-w-md text-pretty`}>
                The research arm of MW Science. The panels and studies behind every number, built around real human understanding.
              </p>
            </div>
            <div className="hidden lg:block lg:col-span-6 min-h-[200px]" aria-hidden="true" />
          </div>

          <div className="mws-enter-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map(({ Icon, color, title, body }) => (
              <article key={title} className={`${CARD_HOVER} p-6 md:p-8 rounded-3xl bg-[#1A2B5F]/80 backdrop-blur-sm border border-[#38BDF8]/25 flex flex-col gap-2`}>
                <Icon className={`w-6 h-6 mb-2 ${color}`} />
                <h2 className={`${T.titleMd} md:text-[20px] md:leading-[28px] font-semibold`}>{title}</h2>
                <p className={`${T.bodyMd} text-[#CBD5E1]`}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. RESEARCH SOLUTIONS ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${T.headlineLg} text-[#1A2B5F] text-center mb-10`}>Research solutions</h2>
          <ResearchSolutionsGrid />
        </div>
      </section>

      {/* ── 3. PANEL COVERAGE ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-14 max-w-3xl mx-auto flex flex-col gap-4">
            <h2 className={`${T.headlineLg} text-[#1A2B5F] text-balance`}>Powered by Real People. Driven by Human Truth</h2>
            <p className={`${T.bodyLg} text-[#475569] text-pretty`}>
              MW Science Lab operates an independent, mobile app-based consumer panel, combining first-party survey feedback with real-world location tracking to give you direct access to consumer truth.
            </p>
          </div>

          <div className="text-center mb-12 flex flex-col gap-2">
            <span className={`${T.labelSm} uppercase text-[#0369A1]`}>Market Coverage</span>
            <h3 className={`${T.headlineMd} text-[#1A2B5F]`}>A global network spanning 40+ countries.</h3>
          </div>

          <MarketCoverageMap />

          <div className="max-w-4xl mx-auto mt-16 bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8">
            <div className="text-center mb-8">
              <h4 className={`${T.labelSm} uppercase text-[#0369A1] mb-4`}>App Based Panel</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {APP_PANEL.map(p => (
                  <span key={p.code} className="inline-flex items-center gap-1.5 bg-white border border-[#E2E8F0] text-[#475569] text-sm font-medium px-3 py-1.5 rounded-full">
                    {p.code} <span className="font-bold text-[#1A2B5F]">{p.size}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden sm:grid sm:grid-cols-3 gap-8 border-t border-[#E2E8F0] pt-6">
              {MARKET_METRICS.map(m => (
                <AnimatedStat key={m.label} value={m.value} label={m.label} />
              ))}
            </div>
            <div className="sm:hidden border-t border-[#E2E8F0] pt-6">
              <SingleItemCarousel
                items={MARKET_METRICS}
                interval={MARKET_METRICS_INTERVAL}
                ariaLabel={t('ui.products.aria.metric')}
                renderItem={(m) => <AnimatedStat value={m.value} label={m.label} />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. TRUSTED BY INDUSTRY LEADERS ──────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 flex flex-col gap-2">
            <h2 className={`${T.headlineLg} text-[#1A2B5F]`}>Trusted by Industry Leaders</h2>
            <p className={`${T.bodyLg} text-[#475569]`}>Fortune 500 and blue-chip brands across FMCG, telco, retail, aviation, and finance.</p>
          </div>

          <div className="relative overflow-hidden mb-16 [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...LOGOS, ...LOGOS].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center h-16 w-32 bg-white rounded-xl border border-[#E2E8F0] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:shadow-sm transition-all duration-300"
                >
                  <Image src={`/assets/images/ic-customers/${name}.webp`} alt={name} width={100} height={40} className="object-contain max-h-8 max-w-[80px]" unoptimized />
                </div>
              ))}
            </div>
          </div>

          <TestimonialsSpotlight />
        </div>
      </section>

      {/* ── 5. CLOSING ──────────────────────────────────────────────────────── */}
      <NoBoundariesSection
        title="No Boundaries."
        body="Moving Walls is the OOH intelligence company. Powered by MW Science, our products help you plan, buy, run and prove out-of-home, and see what it adds to your whole media mix. The world moves. We connect it."
        ctaText={t('ui.products.talkToScienceExpert')}
      />
    </div>
  )
}
