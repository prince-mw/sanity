// The instant-proposal entry points (Rif, 11 Nov 2026): not in every hero, but
// loud where intent is high — home section, header button, country and city
// pages, Brands and Agencies, and the end of articles that mention a market.
// Scoped by market while only Malaysia inventory exists.
//
//   home  — a full section with the flow drawing, proof line, two buttons
//   band  — a blue block for country/city pages and Brands/Agencies
//   card  — the end-of-article card for blog posts and case studies
// Server-safe: no hooks, so pages can render it directly or pass it as a node.

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const NEW = '/proposals/new'
const SAMPLE = '/proposals/demo'

/** The flow in one drawing: a brief → picked sites → a link to share. Loops. */
function FlowArt() {
  return (
    <svg viewBox="0 0 520 220" className="pp-art w-full h-auto" aria-hidden="true" focusable="false">
      <g className="pp-step pp-step-1">
        <rect x="20" y="40" width="130" height="140" rx="12" fill="#fff" stroke="#c9d1de" />
        <rect x="36" y="60" width="70" height="10" rx="5" fill="#2563eb" /><rect x="36" y="80" width="98" height="8" rx="4" fill="#dbe4f3" /><rect x="36" y="96" width="84" height="8" rx="4" fill="#dbe4f3" /><rect x="36" y="112" width="92" height="8" rx="4" fill="#dbe4f3" />
        <rect x="36" y="140" width="98" height="24" rx="6" fill="#2563eb" /><text x="85" y="156" fontSize="11" textAnchor="middle" fill="#fff" fontWeight="700">Build it</text>
        <text x="85" y="205" fontSize="12" textAnchor="middle" fill="#1B1E2B" fontWeight="700">1 · Your brief</text>
      </g>
      <path className="pp-arrow pp-arrow-1" d="M160 110 H190" stroke="#FEDA24" strokeWidth="4" strokeLinecap="round" />
      <g className="pp-step pp-step-2">
        <rect x="200" y="40" width="130" height="140" rx="12" fill="#fff" stroke="#c9d1de" />
        <rect className="pp-site" x="214" y="56" width="46" height="34" rx="5" fill="#2563eb" /><rect className="pp-site" x="270" y="56" width="46" height="34" rx="5" fill="#66C9F3" /><rect className="pp-site" x="214" y="100" width="46" height="34" rx="5" fill="#66C9F3" /><rect className="pp-site" x="270" y="100" width="46" height="34" rx="5" fill="#2563eb" />
        <rect x="214" y="146" width="102" height="8" rx="4" fill="#dbe4f3" /><rect x="214" y="160" width="70" height="8" rx="4" fill="#dbe4f3" />
        <text x="265" y="205" fontSize="12" textAnchor="middle" fill="#1B1E2B" fontWeight="700">2 · Sites picked for it</text>
      </g>
      <path className="pp-arrow pp-arrow-2" d="M340 110 H370" stroke="#FEDA24" strokeWidth="4" strokeLinecap="round" />
      <g className="pp-step pp-step-3">
        <rect x="380" y="40" width="130" height="140" rx="12" fill="#2563eb" />
        <rect x="396" y="62" width="98" height="10" rx="5" fill="#fff" opacity=".9" /><rect x="396" y="80" width="70" height="8" rx="4" fill="#fff" opacity=".5" />
        <rect x="396" y="104" width="98" height="26" rx="13" fill="#fff" /><text x="445" y="121" fontSize="11" textAnchor="middle" fill="#2563eb" fontWeight="700">Your proposal link</text>
        <rect x="396" y="142" width="98" height="24" rx="6" fill="#FEDA24" /><text x="445" y="158" fontSize="11" textAnchor="middle" fill="#1B1E2B" fontWeight="700">Approve</text>
        <text x="445" y="205" fontSize="12" textAnchor="middle" fill="#1B1E2B" fontWeight="700">3 · A link to share</text>
      </g>
    </svg>
  )
}

const PROOF = ['Real sites with photos and specs', 'Who each site reaches', 'An indicative investment range', 'No sales call to get it']

export function ProposalPromo({ variant, market = 'Malaysia', place }: { variant: 'home' | 'band' | 'card'; market?: string; place?: string }) {
  const where = place ?? market
  const primary = 'mw-tap inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3 font-semibold text-white hover:bg-[#1d4ed8]'
  const ghost = 'mw-tap inline-flex items-center rounded-lg border-2 border-[#2563eb]/30 px-6 py-3 font-semibold text-[#2563eb] hover:bg-mw-blue-50'

  if (variant === 'home') return (
    <section className="bg-white mw-section" aria-labelledby="pp-home-title">
      <div className="mw-container">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-sm font-bold uppercase tracking-wider text-[#2563eb]">Instant proposal · {market}</p>
            <h2 id="pp-home-title" className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Plan your campaign in two minutes.</h2>
            <p className="mt-4 max-w-xl text-lg text-gray-600">Tell us the objective, the dates and the cities. You get a proposal with real sites picked for the brief, the audience each one reaches and an indicative range, as a link you can share and approve.</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {PROOF.map(p => <li key={p} className="flex items-center gap-2 text-sm font-semibold text-gray-800"><span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#2563eb]" aria-hidden="true" />{p}</li>)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={NEW} className={primary}>Start a proposal <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href={SAMPLE} className={ghost}>See a sample</Link>
            </div>
          </div>
          <div className="lg:col-span-6"><div className="rounded-2xl bg-[#eef3ff] p-4 sm:p-6"><FlowArt /></div></div>
        </div>
      </div>
    </section>
  )

  if (variant === 'band') return (
    <section className="bg-[#2563eb] text-white mw-section-sm" aria-labelledby="pp-band-title">
      <div className="mw-container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">Instant proposal</p>
          <h2 id="pp-band-title" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Get a plan for {where} in two minutes.</h2>
          <p className="mt-2 text-blue-100">Real sites picked for your brief, the audience each one reaches and an indicative range, as a link you can share and approve. No sales call to get it.</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
          <Link href={NEW} className="mw-tap inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#2563eb] hover:bg-cyan-50">Start a proposal <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href={SAMPLE} className="mw-tap inline-flex items-center rounded-lg border-2 border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">See a sample</Link>
        </div>
      </div>
    </section>
  )

  return (
    <section className="bg-white mw-section-sm" aria-labelledby="pp-card-title">
      <div className="mw-container">
        <div className="flex flex-col gap-6 rounded-2xl border border-[#2563eb] bg-mw-blue-50/40 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">Try it on your own brief</p>
            <h2 id="pp-card-title" className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">Plan a campaign in {where} in two minutes.</h2>
            <p className="mt-2 text-gray-700">Real sites picked for the brief, who each one reaches, an indicative range, and a link to share. No sales call to get it.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
            <Link href={NEW} className={primary}>Start a proposal <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href={SAMPLE} className={ghost}>See a sample</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
