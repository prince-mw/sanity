'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CTAButton } from '@/components/CTAButton'
import { ProductLogo } from '@/components/ProductLogo'
import type { SanityProduct } from '@/sanity/lib/fetch'
import { useLocale } from '@/i18n/LocaleContext'
import {
  T, BTN_PRIMARY, CARD_HOVER, SCIENCE_CSS, ArrowIcon, ScienceHeroBackdrop, NoBoundariesSection,
} from '@/components/mw-science/shared'

// MW Science page — Nov 2026 redesign (Product Marketing's Stitch design, approved by
// Mehul). The research content moved to the MW Science Lab child page (/mw-science/lab).
// Hero and closing copy come from the Sanity product document, with the design's copy
// as the fallback.

// ─── ICONS ─────────────────────────────────────────────────────────────────────

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

const HubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="5" cy="5" r="1.8" /><circle cx="19" cy="5" r="1.8" /><circle cx="5" cy="19" r="1.8" /><circle cx="19" cy="19" r="1.8" />
    <path strokeLinecap="round" d="M6.4 6.4 10.2 10.2M17.6 6.4 13.8 10.2M6.4 17.6 10.2 13.8M17.6 17.6 13.8 13.8" />
  </svg>
)

const FlaskIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3h4.5M10.5 3v6.2L4.6 18.6A1.6 1.6 0 0 0 6 21h12a1.6 1.6 0 0 0 1.4-2.4L13.5 9.2V3M7.5 15h9" />
  </svg>
)

const HexIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="currentColor" />
  </svg>
)

// ─── CONTENT ───────────────────────────────────────────────────────────────────

const CHANNELS = [
  { key: 'feed', label: 'Feed', y: 36 },
  { key: 'search', label: 'Search', y: 98 },
  { key: 'commerce', label: 'Commerce', y: 162 },
  { key: 'irl', label: 'Street (IRL)', y: 224 },
] as const

const MIX_INTELLIGENCES = ['Audience', 'Location', 'Media', 'Brand', 'Outcome']

const INCREMENTALITY_STEPS = [
  { step: 'STEP 01', title: 'WHAT HAPPENED.', body: 'The result among people who saw your campaign.' },
  { step: 'STEP 02', title: 'WHAT WOULD HAVE HAPPENED ANYWAY.', body: 'The same result among matched people who did not see it.' },
  { step: 'STEP 03', title: 'WHAT YOUR MEDIA ADDED.', body: 'The difference between the two. That is incrementality, and it is what guides the next budget.' },
]

const INTELLIGENCES = [
  {
    key: 'audience', name: 'Audience Intelligence', question: 'Who are they?',
    body: 'Who your audiences are, what motivates them and how their behaviour changes.',
    answers: [
      'Which audience groups actually noticed and engaged with the campaign?',
      'What underlying motivations and attitudes shape their purchase decisions?',
      'How does behaviour shift across online and real-world touchpoints?',
    ],
  },
  {
    key: 'location', name: 'Location Intelligence', question: 'Where are they?',
    body: 'Where audiences go in the real world, and when.',
    answers: [
      'Which physical corridors and venues align with active demand?',
      'When do target audiences pass through high-attention environments?',
      'How does real-world movement connect to store and venue visits?',
    ],
  },
  {
    key: 'media', name: 'Media Intelligence', question: 'What works best together?',
    body: 'How channels in the media mix work together, and what each one adds.',
    answers: [
      'What incremental contribution does each channel add to the media mix?',
      'Where do online and out-of-home exposures amplify one another?',
      'How should budgets be rebalanced for the next flight?',
    ],
  },
  {
    key: 'brand', name: 'Brand Intelligence', question: 'How did it change minds?',
    body: 'Lift in awareness, favourability and intent, measured against a control.',
    answers: [
      'Did the campaign move unaided recall, brand favourability, and consideration?',
      'How do exposed audiences compare against a matched unexposed control?',
      'Which creative messages drove the strongest shift in intent?',
    ],
  },
  {
    key: 'outcome', name: 'Outcome Intelligence', question: 'What did it do to sales?',
    body: 'Search, site visits and sales that moved because of the campaign.',
    answers: [
      'How much incremental search, web traffic, and conversion followed exposure?',
      'What real-world and online sales outcomes can be attributed cleanly?',
      'What is the verified return on connected media spend?',
    ],
  },
]

const SHARPER_STEPS = [
  { n: '01', title: 'Research.', body: 'Panels and controlled studies with real people.' },
  { n: '02', title: 'Intelligence.', body: 'Five intelligences read the whole media mix.' },
  { n: '03', title: 'Incrementality.', body: 'What each channel added, beyond what would have happened anyway.' },
  { n: '04', title: 'Better plans.', body: 'Proof guides the budget before it is spent.' },
  { n: '05', title: 'The norms learn.', body: 'Every result sharpens the benchmarks for the next campaign.' },
]

const REINDEX_STEPS = [
  { label: 'Follow', body: 'plan from the dashboards you already use, so screens go where demand already is.' },
  { label: 'Prove', body: 'the pass mark is set before booking, and every result ships with its margin of error.' },
  { label: 'Return', body: 'the people reached on the street come back to your digital audiences.' },
]

const POWERED_PRODUCTS = [
  { name: 'MW Studio', href: '/mw-studio' },
  { name: 'MW Planner', href: '/mw-planner' },
  { name: 'MW Influence', href: '/mw-influence' },
  { name: 'MW Activate', href: '/mw-activate' },
  { name: 'MW Measure', href: '/mw-measure' },
  { name: 'MW Market', href: '/mw-market' },
]

// ─── SECTION 2: CHANNELS → MW SCIENCE → INCREMENTAL LIFT ───────────────────────
// Hovering (or focusing/tapping) a channel highlights its line into the hexagon.

function MediaMixDiagram() {
  const [active, setActive] = useState<string | null>(null)

  const pathStyle = (key: string) => {
    if (!active) return key === 'irl' ? { stroke: '#0284C7', width: 1.75 } : { stroke: '#CBD5E1', width: 1.5 }
    return key === active ? { stroke: '#0284C7', width: 3 } : { stroke: '#E2E8F0', width: 1.25 }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
      <div className="lg:col-span-3 flex flex-col gap-2">
        <span className={`${T.labelSm} uppercase text-[#475569] mb-1`}>Connected Channels</span>
        {CHANNELS.map(c => (
          <button
            key={c.key}
            type="button"
            onMouseEnter={() => setActive(c.key)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(c.key)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(c.key)}
            className={`text-left flex items-center justify-between px-4 py-3 rounded-2xl bg-[#F8FAFC] border ${c.key === 'irl' ? 'border-[#0369A1]/40' : 'border-[#E2E8F0]'} hover:border-[#0369A1] hover:bg-white transition-all duration-150`}
          >
            <span className={`${T.labelLg} text-[#1A2B5F]`}>{c.label}</span>
            <span className={`w-2 h-2 rounded-full ${c.key === 'irl' ? 'bg-[#0369A1]' : 'bg-[#1A2B5F]'}`} />
          </button>
        ))}
      </div>

      <div className="lg:col-span-6 flex flex-col items-center justify-center">
        <svg className="w-full h-64" viewBox="0 0 520 260" fill="none" role="img" aria-label="Connected media channels converging into the MW Science intelligence layer">
          {CHANNELS.map(c => {
            const s = pathStyle(c.key)
            const d = `M0,${c.y} C115,${c.y} 145,130 260,130`
            return (
              <g key={c.key}>
                <path d={d} stroke={s.stroke} strokeWidth={s.width} className="transition-all duration-300" />
                <path d={d} stroke="#38BDF8" strokeWidth={c.key === 'irl' ? 2 : 1.5} opacity={c.key === 'irl' ? 0.85 : 0.55} className="mws-signal-flow" />
              </g>
            )
          })}
          <path d="M260,130 C350,130 410,130 520,130" stroke="#1A2B5F" strokeWidth="2" />
          <path d="M260,130 C350,130 410,130 520,130" stroke="#38BDF8" strokeWidth="2" opacity="0.8" className="mws-signal-flow" />
          <circle cx="516" cy="130" r="3.5" fill="#0284C7" />
          <g className="mws-hex-pulse">
            <polygon points="260,56 324,93 324,167 260,204 196,167 196,93" fill="#1A2B5F" stroke="#0284C7" strokeWidth="2" />
            <text x="260" y="114" textAnchor="middle" fill="#38BDF8" fontFamily="Poppins, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="1">ONE MEDIA MIX VIEW</text>
            <text x="260" y="135" textAnchor="middle" fill="#FFFFFF" fontFamily="Poppins, sans-serif" fontSize="14" fontWeight="700">MW Science</text>
            <text x="260" y="153" textAnchor="middle" fill="#CBD5E1" fontFamily="Poppins, sans-serif" fontSize="10" fontWeight="500">Intelligence Layer</text>
          </g>
        </svg>
        <div className="flex flex-wrap justify-center gap-1 mt-2">
          {MIX_INTELLIGENCES.map(name => (
            <span key={name} className={`px-3 py-1 rounded-full bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] ${T.labelSm} transition-colors duration-150 hover:border-[#0369A1] hover:text-[#1A2B5F]`}>
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className={`${CARD_HOVER} p-6 rounded-3xl bg-[#1A2B5F] text-[#F8FAFC] flex flex-col gap-2 shadow-sm`}>
          <span className={`${T.labelSm} uppercase text-[#38BDF8]`}>Incremental Lift</span>
          <h3 className={T.titleMd}>Plan · Prove · Improve.</h3>
          <p className={`${T.bodySm} text-[#CBD5E1]`}>What each channel adds</p>
        </div>
      </div>
    </div>
  )
}

// ─── SECTION 3: THE FIVE INTELLIGENCES (TABS) ─────────────────────────────────

function IntelligenceTabs() {
  const [active, setActive] = useState(0)
  const item = INTELLIGENCES[active]

  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="The five intelligences" className="flex flex-wrap gap-2">
        {INTELLIGENCES.map((intel, i) => {
          const selected = i === active
          return (
            <button
              key={intel.key}
              role="tab"
              id={`tab-intel-${intel.key}`}
              aria-selected={selected}
              aria-controls={`panel-intel-${intel.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`inline-flex items-center px-4 py-2.5 rounded-full ${T.labelMd} transition-all duration-150 hover:-translate-y-0.5 active:scale-95 ${
                selected
                  ? 'bg-[#1A2B5F] text-white'
                  : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]'
              }`}
            >
              {intel.name}
            </button>
          )
        })}
      </div>

      <div
        key={item.key}
        role="tabpanel"
        id={`panel-intel-${item.key}`}
        aria-labelledby={`tab-intel-${item.key}`}
        tabIndex={0}
        className="mws-panel-enter bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className={`${T.labelSm} text-[#0369A1] uppercase`}>{item.question}</span>
          <h3 className={`${T.headlineMd} text-[#1A2B5F]`}>{item.name}</h3>
          <p className={`${T.bodyLg} text-[#475569]`}>{item.body}</p>
          <div className="pt-2 border-t border-[#E2E8F0]">
            <span className={`${T.labelSm} text-[#475569] uppercase`}>Powers</span>
            <p className={`${T.titleMd} text-[#1A2B5F] mt-1`}>Every Moving Walls product</p>
          </div>
        </div>
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#E2E8F0] flex flex-col gap-4">
          <span className={`${T.labelSm} uppercase text-[#0369A1]`}>Answers</span>
          <ul className={`flex flex-col gap-2 ${T.bodyMd} text-[#0F172A]`}>
            {item.answers.map(a => (
              <li key={a} className="flex items-start gap-2">
                <CheckCircleIcon className="w-[18px] h-[18px] mt-[3px] shrink-0 text-[#0369A1]" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function MWScienceClient({ product }: { product?: SanityProduct | null } = {}) {
  const { t } = useLocale()
  const heroLine1 = product?.heroSubtitle || 'MW Science is the intelligence layer behind every Moving Walls product. It measures what each channel in your media mix adds, online and in real life (IRL), so you can plan connected media with proof.'
  const heroLine2 = product?.description || 'Most measurement counts who saw the ad. MW Science measures what changed.'
  const heroCtaText = product?.ctaText || t('ui.products.talkToScienceExpert')
  const heroCtaLink = product?.ctaLink || '/contact'
  const finalCtaTitle = product?.finalCtaTitle || 'No Boundaries.'
  const finalCtaSubtitle = product?.finalCtaSubtitle || 'Moving Walls is the OOH intelligence company. Powered by MW Science, our products help you plan, buy, run and prove out-of-home, and see what it adds to your whole media mix. The world moves. We connect it.'

  return (
    <div className="min-h-screen bg-white text-[#0F172A] overflow-x-hidden">
      <style>{SCIENCE_CSS}</style>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-24 md:pt-28 md:pb-28 bg-[#0B132B] text-[#F8FAFC] border-b border-[#38BDF8]/20 overflow-hidden">
        <ScienceHeroBackdrop src="/assets/images/mw-science/mw-science-hero.jpg" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="mws-enter-1" id="hero-badge">
              <ProductLogo product="science" priority className="h-9 sm:h-10 w-auto" />
            </div>

            <h1 className={`mws-enter-2 ${T.display} text-balance`}>
              The intelligence behind connected media.
            </h1>

            <p className={`mws-enter-3 ${T.bodyLg} text-[#CBD5E1] max-w-prose text-pretty`}>{heroLine1}</p>

            <p className={`mws-enter-4 ${T.titleMd} border-l-2 border-[#FEDA24] pl-4`}>{heroLine2}</p>

            <div className="mws-enter-5 flex flex-wrap items-center gap-4 pt-2">
              <CTAButton href={heroCtaLink} className={`${BTN_PRIMARY} ${T.labelLg}`}>
                <span>{heroCtaText}</span>
              </CTAButton>
              <a
                href="#incrementality"
                className={`inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#1A2B5F] border border-[#38BDF8]/50 text-[#F8FAFC] ${T.labelLg} transition-all duration-150 hover:bg-[#0B132B] hover:border-[#38BDF8] hover:-translate-y-0.5 active:scale-95`}
              >
                {t('ui.products.seeHowIncrementalityWorks')}
              </a>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-6 min-h-[420px]" aria-hidden="true" />
        </div>
      </section>

      {/* ── 2. EVERY CHANNEL. ONE VIEW. + INCREMENTALITY ────────────────────── */}
      <section id="media-mix" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div id="incrementality" className="scroll-mt-24 max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <h2 className={`${T.headlineLg} text-[#1A2B5F] text-balance`}>Every channel. One view.</h2>
            <p className={`${T.bodyLg} text-[#475569] text-pretty`}>Online and in real life, read as one connected picture.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm flex flex-col gap-8">
            <MediaMixDiagram />

            <div className="pt-8 border-t border-[#E2E8F0] flex flex-col gap-6">
              <div className="max-w-2xl flex flex-col gap-1">
                <h3 className={`${T.headlineMd} text-[#1A2B5F]`}>Incrementality, explained simply</h3>
                <p className={`${T.bodyMd} text-[#475569] text-pretty`}>
                  Incrementality is the extra result your media caused, beyond what would have happened anyway. MW Science measures it in three steps.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {INCREMENTALITY_STEPS.map((s, i) => {
                  const last = i === INCREMENTALITY_STEPS.length - 1
                  return (
                    <article
                      key={s.step}
                      className={`${CARD_HOVER} h-full rounded-3xl p-6 flex flex-col gap-2 border ${
                        last ? 'bg-[#1A2B5F] text-[#F8FAFC] border-[#1A2B5F] shadow-sm' : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#0369A1]/60'
                      }`}
                    >
                      <span className={`${T.labelSm} tabular-nums ${last ? 'text-[#38BDF8]' : 'text-[#475569]'}`}>{s.step}</span>
                      <h4 className={`${T.labelMd} tracking-wide ${last ? '' : 'text-[#1A2B5F]'}`}>{s.title}</h4>
                      <p className={`${T.bodySm} text-pretty ${last ? 'text-[#CBD5E1]' : 'text-[#475569]'}`}>{s.body}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE FIVE INTELLIGENCES ───────────────────────────────────────── */}
      <section id="intelligence" className="scroll-mt-16 py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col gap-8">
          <div className="max-w-2xl flex flex-col gap-4">
            <h2 className={`${T.headlineLg} text-[#1A2B5F] text-balance`}>Five intelligences. One connected view of your media mix.</h2>
            <p className={`${T.bodyLg} text-[#475569] text-pretty`}>
              MW Science reads five kinds of intelligence. Together they show what your media mix is doing, online and in real life, and what each channel adds.
            </p>
          </div>
          <IntelligenceTabs />
        </div>
      </section>

      {/* ── 4. GETS SHARPER WITH EVERY CAMPAIGN ─────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <h2 className={`${T.headlineLg} text-[#1A2B5F] text-balance`}>Gets sharper with every campaign</h2>
            <p className={`${T.bodyLg} text-[#475569] text-pretty`}>Every campaign MW Science measures makes the next plan more accurate.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
            {SHARPER_STEPS.map((s, i) => {
              const last = i === SHARPER_STEPS.length - 1
              return (
                <div
                  key={s.n}
                  className={`${CARD_HOVER} h-full p-6 rounded-3xl flex flex-col gap-1 border ${
                    last ? 'bg-[#1A2B5F] text-[#F8FAFC] border-[#1A2B5F] shadow-sm' : 'bg-white border-[#E2E8F0] hover:border-[#0369A1]/60'
                  }`}
                >
                  <span className={`${T.labelSm} tabular-nums ${last ? 'text-[#38BDF8]' : 'text-[#0369A1]'}`}>{s.n}</span>
                  <h3 className={`${T.titleMd} ${last ? '' : 'text-[#1A2B5F]'}`}>{s.title}</h3>
                  <p className={`${T.bodySm} ${last ? 'text-[#CBD5E1]' : 'text-[#475569]'}`}>{s.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. MW REINDEX TEASER ────────────────────────────────────────────── */}
      <section id="mw-reindex" className="relative border-b border-[#E2E8F0] bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 py-16 md:py-24 px-4 md:px-8 lg:pl-16 lg:pr-12 flex flex-col justify-center gap-6 max-w-[640px] lg:ml-auto">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#E6ECFA] text-[#101C42]">
              <HexIcon className="w-3.5 h-3.5 text-[#1A2B5F]" />
              <span className={T.labelSm}>MW Reindex · Built on MW Science</span>
            </div>
            <h2 className={`${T.headlineLg} text-[#1A2B5F] text-balance`}>Out of the phone. Into the world. Back with proof.</h2>
            <p className={`${T.bodyLg} text-[#475569] text-pretty`}>
              MW Reindex is the incrementality operating system. It follows the audience you already bought online into the real world, proves what changed against matched people who were not exposed, and brings those people back to your digital campaigns.
            </p>
            <div className="flex flex-col gap-2">
              {REINDEX_STEPS.map(s => (
                <div key={s.label} className={`${CARD_HOVER} p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0369A1]/60`}>
                  <span className={`${T.titleMd} text-[#1A2B5F]`}>{s.label}: </span>
                  <span className={`${T.bodyMd} text-[#475569]`}>{s.body}</span>
                </div>
              ))}
            </div>
            <p className={`${T.titleMd} text-[#871A1C]`}>The fair test for advertising in the real world.</p>
            <div>
              <CTAButton
                href="/contact"
                className={`inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#1A2B5F] text-white ${T.labelLg} transition-all duration-150 hover:opacity-95 hover:-translate-y-0.5 hover:shadow-md active:scale-95`}
              >
                Talk to us about MW Reindex
              </CTAButton>
            </div>
          </div>
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full">
            <Image
              src="/assets/images/mw-science/mw-reindex-url-to-irl.jpg"
              alt="From URL to IRL: a person walks out of a phone screen onto a real-world road, with a city skyline behind"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 6. TWO ROLES OF MW SCIENCE ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col gap-8">
          <div className="max-w-2xl flex flex-col gap-2">
            <span className={`${T.labelSm} uppercase text-[#0369A1]`}>Two Roles of MW Science</span>
            <h2 className={`${T.headlineLg} text-[#1A2B5F] text-balance`}>One intelligence layer. Two ways to work with it.</h2>
            <p className={`${T.bodyLg} text-[#475569] text-pretty`}>
              MW Science powers every product across the Moving Walls platform, and partners directly with organisations as an independent research arm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <article className={`${CARD_HOVER} h-full bg-white border border-[#E2E8F0] rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-sm`}>
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-1 text-[#0369A1]">
                  <HubIcon className="w-[18px] h-[18px]" />
                  <span className={`${T.labelSm} uppercase`}>Platform Foundation</span>
                </div>
                <h3 className={`${T.headlineMd} text-[#1A2B5F]`}>MW Science powers every Moving Walls product</h3>
                <p className={`${T.bodyMd} text-[#475569] text-pretty`}>
                  One intelligence layer under every product, getting sharper with every campaign it measures.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {POWERED_PRODUCTS.map(p => (
                  <Link
                    key={p.name}
                    href={p.href}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] ${T.labelMd} text-[#1A2B5F] transition-all duration-150 hover:border-[#0369A1] hover:-translate-y-0.5`}
                  >
                    {p.name}
                  </Link>
                ))}
                <a
                  href="#mw-reindex"
                  className={`inline-flex items-center px-3 py-1.5 rounded-full bg-[#1A2B5F] text-white ${T.labelMd} transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm`}
                >
                  MW Reindex
                </a>
              </div>
            </article>

            <article className={`${CARD_HOVER} h-full bg-white border border-[#E2E8F0] rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-sm`}>
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-1 text-[#871A1C]">
                  <FlaskIcon className="w-[18px] h-[18px]" />
                  <span className={`${T.labelSm} uppercase`}>Standalone Advisory</span>
                </div>
                <h3 className={`${T.headlineMd} text-[#1A2B5F]`}>Research Partner</h3>
                <p className={`${T.bodyMd} text-[#475569] text-pretty`}>
                  For organisations that need answers on their own, MW Science Lab works as a standalone research partner.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/mw-science/lab" className={`group inline-flex items-center gap-1 ${T.labelLg} text-[#0369A1] hover:underline`}>
                  <span>Explore MW Science Lab</span>
                  <ArrowIcon className="w-[18px] h-[18px] transition-transform duration-150 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── 7. CLOSING ──────────────────────────────────────────────────────── */}
      <NoBoundariesSection title={finalCtaTitle} body={finalCtaSubtitle} ctaText={t('ui.products.talkToScienceExpert')} />
    </div>
  )
}
