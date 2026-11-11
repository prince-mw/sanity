// The ad mock-up's entry points (Rif, 11 Nov 2026): the same places as the
// instant proposal, one step earlier in the journey — "want to see how your
// ad looks on a billboard? use the mock-up." Home section under the proposal
// section, a second button on the country/city/Brands/Agencies band, a line
// on the end-of-article card, and a hint on every site card. All lead to
// /mockup (pick a billboard) or straight to a site's "See your ad here".
// Server-safe: no hooks.

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export const MOCKUP_HREF = '/mockup'

/** A billboard by the road; a logo and a line slide onto its screen and glow. Loops. */
function BillboardArt() {
  return (
    <svg viewBox="0 0 520 220" className="mp-art w-full h-auto" aria-hidden="true" focusable="false">
      <rect x="0" y="178" width="520" height="42" fill="#dbe4f3" />
      <path d="M0 196 H520" stroke="#fff" strokeWidth="3" strokeDasharray="22 16" />
      <rect x="252" y="110" width="16" height="70" fill="#9aa7bd" />
      <rect x="236" y="176" width="48" height="8" rx="2" fill="#7f8ca3" />
      <rect x="110" y="28" width="300" height="100" rx="8" fill="#1B1E2B" />
      <rect className="mp-glow" x="104" y="22" width="312" height="112" rx="10" fill="none" stroke="#66C9F3" strokeWidth="3" opacity=".5" />
      <rect x="120" y="38" width="280" height="80" rx="4" fill="#0b1220" />
      <g className="mp-ad">
        <rect x="136" y="52" width="150" height="14" rx="7" fill="#fff" />
        <rect x="136" y="74" width="110" height="10" rx="5" fill="#66C9F3" />
        <rect x="136" y="92" width="80" height="10" rx="5" fill="#66C9F3" opacity=".7" />
        <rect x="318" y="50" width="62" height="56" rx="8" fill="#FEDA24" />
        <text x="349" y="85" fontSize="22" fontWeight="800" textAnchor="middle" fill="#1B1E2B">A</text>
      </g>
      <g className="mp-car">
        <rect x="20" y="186" width="54" height="16" rx="5" fill="#2563eb" />
        <rect x="30" y="178" width="30" height="12" rx="4" fill="#2563eb" />
        <circle cx="32" cy="204" r="4" fill="#1B1E2B" /><circle cx="62" cy="204" r="4" fill="#1B1E2B" />
      </g>
      <text x="260" y="156" fontSize="12" textAnchor="middle" fill="#1B1E2B" fontWeight="700">Your logo and a line, on a real site</text>
    </svg>
  )
}

export function MockupPromo({ variant, place }: { variant: 'home' | 'inline'; place?: string }) {
  const primary = 'mw-tap inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3 font-semibold text-white hover:bg-[#1d4ed8]'
  if (variant === 'home') return (
    <section className="bg-[#f6f9ff] mw-section" aria-labelledby="mp-home-title">
      <div className="mw-container">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-6"><div className="rounded-2xl bg-white p-4 ring-1 ring-mw-blue-100 sm:p-6"><BillboardArt /></div></div>
          <div className="order-1 lg:order-2 lg:col-span-6">
            <p className="text-sm font-bold uppercase tracking-wider text-[#2563eb]">Ad mock-up</p>
            <h2 id="mp-home-title" className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">See your ad on a real billboard before you book one.</h2>
            <p className="mt-4 max-w-xl text-lg text-gray-600">Pick a site, add your logo and a line, or upload your finished creative, and see it on that screen&apos;s real photo in seconds. Video too. Register once and we email you the version you choose.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={MOCKUP_HREF} className={primary}>Pick a billboard <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
  // inline: one line for the proposal band and card
  return (
    <Link href={MOCKUP_HREF} className="mw-tap inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">
      <Sparkles className="h-4 w-4" aria-hidden="true" /> Or see your ad on a billboard{place ? ` in ${place}` : ''} first →
    </Link>
  )
}
