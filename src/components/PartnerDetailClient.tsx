'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CTAButton } from '@/components/CTAButton'
import type { PartnerIconName, PartnerPageContent, PartnerSection } from '@/data/partners'

const NAVY = 'bg-[#062068]'
// Moving Walls logo gradient (#61CBF5 → #1E76BB → #2A3B8F)
const BRAND_GRADIENT = 'bg-gradient-to-br from-[#61CBF5] via-[#1E76BB] to-[#2A3B8F]'

const ICON_PATHS: Record<PartnerIconName, string> = {
  store: 'M3 9l1.5-5h15L21 9M3 9h18M3 9v1a3 3 0 006 0V9m0 1a3 3 0 006 0V9m0 1a3 3 0 006 0V9M5 13v7h14v-7M10 20v-4h4v4',
  screen: 'M4 5h16a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm4 15h8m-4-4v4',
  megaphone: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
  epaper: 'M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm2 4h6M9 11h6m-6 4h3',
  chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  network: 'M12 5a2 2 0 100-4 2 2 0 000 4zm0 0v4m0 0a3 3 0 100 6 3 3 0 000-6zm-7 9a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4zM6.5 18.5l3-2.5m8 2.5l-3-2.5',
  users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
  target: 'M12 21a9 9 0 100-18 9 9 0 000 18zm0-4a5 5 0 100-10 5 5 0 000 10zm0-4a1 1 0 100-2 1 1 0 000 2z',
  layers: 'M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5M3 16l9 5 9-5',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  bolt: 'M13 10V3L4 14h7v7l9-11h-7z',
}

function Icon({ name, className = 'w-6 h-6' }: { name?: PartnerIconName; className?: string }) {
  const d = ICON_PATHS[name || 'target'] || ICON_PATHS.target
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} />
    </svg>
  )
}

function IconBadge({ name, size = 'md' }: { name?: PartnerIconName; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'w-14 h-14 rounded-2xl' : 'w-12 h-12 rounded-xl'
  return (
    <div className={`${box} ${BRAND_GRADIENT} text-white flex items-center justify-center shadow-lg shadow-blue-900/20 flex-shrink-0`}>
      <Icon name={name} className={size === 'lg' ? 'w-7 h-7' : 'w-6 h-6'} />
    </div>
  )
}

const ArrowIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

export function PartnerLogoTile({
  partner,
  className = '',
}: {
  partner: Pick<PartnerPageContent, 'name' | 'logo' | 'logoBackground'>
  className?: string
}) {
  const bg = partner.logoBackground || '#ffffff'
  const isWhite = /^#?(fff|ffffff)$/i.test(bg.trim())
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl overflow-hidden ${isWhite ? 'ring-1 ring-gray-200' : ''} ${className}`}
      style={{ backgroundColor: bg }}
    >
      {partner.logo ? (
        <Image src={partner.logo.url} alt={partner.logo.alt} fill sizes="240px" className="object-contain p-3" />
      ) : (
        <span className="text-xl font-bold text-gray-900">{partner.name}</span>
      )}
    </div>
  )
}

function LogoLockup({ partner, compact = false }: { partner: PartnerPageContent; compact?: boolean }) {
  const logoBox = compact ? 'w-24 h-12' : 'w-28 sm:w-32 h-14 sm:h-16'
  return (
    <div className={`inline-flex items-center gap-3 sm:gap-4 rounded-2xl bg-white ${compact ? 'px-4 py-3' : 'px-5 py-4'} shadow-2xl shadow-blue-950/40`}>
      <div className={`relative ${logoBox}`}>
        <Image src="/assets/logo/MW-logo-web.svg" alt="Moving Walls logo" fill sizes="128px" className="object-contain" />
      </div>
      <span className="text-xl font-light text-gray-400" aria-hidden="true">×</span>
      <PartnerLogoTile partner={partner} className={logoBox} />
    </div>
  )
}

// Built-in hero illustration for display partners: an LCD screen and an e-paper label
// on a store shelf. Used whenever no hero image is uploaded in Studio.
function DisplayIllustration() {
  return (
    <div className="relative aspect-[5/4] w-full" aria-hidden="true">
      <style>{`@keyframes partner-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }`}</style>
      <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm" />
      <div className="absolute -inset-6 bg-[#1E76BB]/25 blur-3xl rounded-full pointer-events-none" />

      {/* LCD screen */}
      <div className="absolute left-[8%] top-[17%] w-[62%] motion-safe:animate-[partner-float_6s_ease-in-out_infinite]">
        <div className="rounded-2xl bg-gray-950 p-2 shadow-2xl ring-1 ring-white/10">
          <div className={`relative aspect-video rounded-lg overflow-hidden ${BRAND_GRADIENT}`}>
            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/20" />
            <div className="absolute right-6 bottom-5 w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
              <span className="text-[#062068] text-sm font-extrabold">-30%</span>
            </div>
            <div className="absolute left-4 top-4 space-y-2">
              <div className="h-2.5 w-24 rounded-full bg-white/90" />
              <div className="h-2.5 w-16 rounded-full bg-white/60" />
              <div className="mt-3 inline-flex rounded-md bg-white px-2 py-1 text-[10px] font-bold text-[#062068]">SHOP NOW</div>
            </div>
            <div className="absolute left-3 bottom-3 flex items-center gap-1 rounded-full bg-black/30 px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-[9px] font-semibold text-white">LIVE</span>
            </div>
          </div>
        </div>
        <div className="mx-auto h-6 w-3 bg-gray-800" />
        <div className="mx-auto h-1.5 w-20 rounded-full bg-gray-800" />
        <span className="mt-2 block text-center text-[11px] font-semibold uppercase tracking-wider text-cyan-200">LCD signage</span>
      </div>

      {/* E-paper label */}
      <div className="absolute right-[7%] bottom-[12%] w-[34%] motion-safe:animate-[partner-float_6s_ease-in-out_1.5s_infinite]">
        <div className="rounded-xl bg-[#e9e9e4] p-3 shadow-2xl ring-4 ring-gray-300/60">
          <p className="text-[10px] font-bold tracking-wider text-gray-800">PROMO</p>
          <p className="text-2xl font-extrabold leading-none text-gray-900 mt-1">2 for 1</p>
          <div className="mt-2 flex gap-[2px] h-5" >
            {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1].map((w, i) => (
              <span key={i} className="bg-gray-900" style={{ width: `${w}px` }} />
            ))}
          </div>
        </div>
        <span className="mt-2 block text-center text-[11px] font-semibold uppercase tracking-wider text-cyan-200">E-paper</span>
      </div>

      {/* Shelf line */}
      <div className="absolute left-[6%] right-[6%] bottom-[6%] h-1.5 rounded-full bg-white/15" />
    </div>
  )
}

// Built-in hero illustration for screen-network partners: a landscape screen with the
// operator's own content beside a portrait screen running a paid brand campaign.
function ScreenNetworkIllustration() {
  return (
    <div className="relative aspect-[5/4] w-full" aria-hidden="true">
      <style>{`@keyframes partner-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }`}</style>
      <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm" />
      <div className="absolute -inset-6 bg-[#1E76BB]/25 blur-3xl rounded-full pointer-events-none" />

      {/* Landscape screen: own content */}
      <div className="absolute left-[6%] top-[20%] w-[58%] motion-safe:animate-[partner-float_6s_ease-in-out_infinite]">
        <div className="rounded-2xl bg-gray-950 p-2 shadow-2xl ring-1 ring-white/10">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-white">
            <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-br from-amber-300 to-orange-500" />
            <div className="absolute left-[46%] top-4 right-4 space-y-2">
              <div className="h-2.5 w-3/4 rounded-full bg-gray-800" />
              <div className="h-2 w-full rounded-full bg-gray-300" />
              <div className="h-2 w-5/6 rounded-full bg-gray-300" />
              <div className="mt-3 inline-flex rounded-md bg-[#062068] px-2 py-1 text-[10px] font-bold text-white">THIS WEEK</div>
            </div>
            <div className="absolute left-3 bottom-3 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-semibold text-white">10:00 – 14:00</div>
          </div>
        </div>
        <div className="mx-auto h-5 w-3 bg-gray-800" />
        <div className="mx-auto h-1.5 w-20 rounded-full bg-gray-800" />
        <span className="mt-2 block text-center text-[11px] font-semibold uppercase tracking-wider text-cyan-200">Your content</span>
      </div>

      {/* Portrait screen: paid advertising */}
      <div className="absolute right-[7%] top-[19%] w-[27%] motion-safe:animate-[partner-float_6s_ease-in-out_1.5s_infinite]">
        <div className="rounded-2xl bg-gray-950 p-1.5 shadow-2xl ring-1 ring-white/10">
          <div className={`relative aspect-[9/16] rounded-lg overflow-hidden ${BRAND_GRADIENT}`}>
            <div className="absolute -right-8 top-6 w-24 h-24 rounded-full bg-white/20" />
            <div className="absolute inset-x-3 top-4 space-y-1.5">
              <div className="h-2 w-3/4 rounded-full bg-white/90" />
              <div className="h-2 w-1/2 rounded-full bg-white/60" />
            </div>
            <div className="absolute inset-x-0 bottom-10 flex justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                <span className="text-[#062068] text-xs font-extrabold">NEW</span>
              </div>
            </div>
            <div className="absolute left-2 bottom-2 rounded bg-white/90 px-1.5 py-0.5 text-[8px] font-bold text-[#062068]">AD</div>
          </div>
        </div>
        <div className="mx-auto h-4 w-6 rounded-b bg-gray-800" />
        <span className="mt-2 block text-center text-[11px] font-semibold uppercase tracking-wider text-cyan-200">Paid advertising</span>
      </div>

      {/* Programmatic chip */}
      <div className="absolute left-[30%] bottom-[9%] inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
        <span className="text-[11px] font-bold text-[#062068]">Direct + programmatic</span>
      </div>
    </div>
  )
}

// Built-in hero illustration for media-player partners: a screen fed by a media player
// running the Moving Walls app, with content being scheduled to it.
function MediaPlayerIllustration() {
  return (
    <div className="relative aspect-[5/4] w-full" aria-hidden="true">
      <style>{`@keyframes partner-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } } @keyframes partner-flow { 0% { stroke-dashoffset: 24 } 100% { stroke-dashoffset: 0 } }`}</style>
      <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm" />
      <div className="absolute -inset-6 bg-[#1E76BB]/25 blur-3xl rounded-full pointer-events-none" />

      {/* Screen */}
      <div className="absolute left-[6%] top-[18%] w-[56%] motion-safe:animate-[partner-float_6s_ease-in-out_infinite]">
        <div className="rounded-2xl bg-gray-950 p-2 shadow-2xl ring-1 ring-white/10">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-[#0b1a4a]">
            {/* Schedule timeline: own content and ads sharing screen time */}
            <div className="absolute inset-x-3 top-3 flex gap-1">
              <div className="h-2 flex-[3] rounded-full bg-amber-400" />
              <div className="h-2 flex-[2] rounded-full bg-[#61CBF5]" />
              <div className="h-2 flex-[3] rounded-full bg-amber-400" />
              <div className="h-2 flex-[2] rounded-full bg-[#61CBF5]" />
            </div>
            <div className={`absolute left-3 right-3 top-8 bottom-3 rounded-md ${BRAND_GRADIENT}`}>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/20" />
              <div className="absolute left-3 top-3 space-y-1.5">
                <div className="h-2 w-20 rounded-full bg-white/90" />
                <div className="h-2 w-12 rounded-full bg-white/60" />
              </div>
              <div className="absolute left-2 bottom-2 rounded bg-white/90 px-1.5 py-0.5 text-[8px] font-bold text-[#062068]">AD</div>
            </div>
          </div>
        </div>
        <div className="mx-auto h-5 w-3 bg-gray-800" />
        <div className="mx-auto h-1.5 w-20 rounded-full bg-gray-800" />
      </div>

      {/* Cable from player to screen */}
      <svg className="absolute left-[38%] top-[62%] w-[40%] h-[22%]" viewBox="0 0 100 50" fill="none" preserveAspectRatio="none">
        <path d="M0 0 C 0 40, 60 40, 100 40" stroke="#61CBF5" strokeWidth="2" strokeDasharray="4 4" className="motion-safe:animate-[partner-flow_1.2s_linear_infinite]" />
      </svg>

      {/* Media player box */}
      <div className="absolute right-[5%] bottom-[7%] w-[31%] motion-safe:animate-[partner-float_6s_ease-in-out_1.5s_infinite]">
        <div className="relative rounded-xl bg-gradient-to-b from-gray-700 to-gray-900 px-3 py-4 shadow-2xl ring-1 ring-white/15">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3].map((i) => <span key={i} className="w-0.5 h-3 rounded-full bg-white/20" />)}
            </div>
          </div>
          <div className="mt-3 rounded-md bg-white px-1.5 py-1 text-center text-[9px] sm:text-[10px] leading-tight font-bold text-[#062068]">Moving Walls app</div>
        </div>
        <span className="mt-2 block text-center text-[11px] font-semibold uppercase tracking-wider text-cyan-200">Media player</span>
      </div>
    </div>
  )
}

// Literal class names so Tailwind's scanner picks them up
const CARD_COLS: Record<number, string> = {
  1: 'md:grid-cols-1 max-w-xl mx-auto',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}

function SectionBlock({ section, index, partner }: { section: PartnerSection; index: number; partner: PartnerPageContent }) {
  const bg = index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-b from-slate-50 to-white'

  if (section._type === 'partnerCtaSection') {
    return (
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-3xl ${NAVY} text-white px-6 py-12 sm:px-12 lg:py-16 text-center`}>
            <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#61CBF5]/25 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#1E76BB]/40 blur-3xl pointer-events-none" />
            <div className="relative max-w-2xl mx-auto">
              <div className="mb-6 flex justify-center">
                <LogoLockup partner={partner} compact />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">{section.heading}</h2>
              <div className="space-y-1 text-base sm:text-lg text-blue-100/90 leading-relaxed">
                {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              </div>
              {section.buttonText && (
                <CTAButton
                  href="/contact"
                  className="mt-7 inline-flex items-center justify-center gap-2 bg-white text-[#062068] px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-gray-100 transition-all shadow-precision-lg active:scale-[0.98]"
                >
                  {section.buttonText}
                  <ArrowIcon />
                </CTAButton>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (section._type === 'partnerCardsSection') {
    return (
      <section className={`${bg} py-12 lg:py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-4">{section.heading}</h2>
            {section.intro && <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{section.intro}</p>}
          </div>
          <div className={`grid gap-4 lg:gap-6 ${CARD_COLS[Math.min(section.cards?.length || 3, 4)] || CARD_COLS[3]}`}>
            {section.cards?.map((card) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 lg:p-8 shadow-precision hover:-translate-y-1 hover:shadow-precision-lg hover:border-mw-blue-200 transition-all duration-300"
              >
                <div className={`absolute inset-x-0 top-0 h-1 ${BRAND_GRADIENT} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="mb-5"><IconBadge name={card.icon} /></div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`${bg} py-12 lg:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="mb-5"><IconBadge name={section.icon} size="lg" /></div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068]">{section.heading}</h2>
        </div>
        <div className="lg:col-span-7 space-y-4 text-base sm:text-lg leading-relaxed">
          {section.intro && <p className="text-xl text-gray-900 font-medium leading-snug">{section.intro}</p>}
          {section.paragraphs?.map((p) => <p key={p} className="text-gray-600">{p}</p>)}
          {section.callout && (
            <div className="relative mt-2 overflow-hidden rounded-2xl bg-[#062068] p-5 sm:p-6 text-white shadow-lg">
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#61CBF5]/25 blur-2xl" />
              <div className="relative flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/15 text-cyan-300 flex items-center justify-center flex-shrink-0">
                  <Icon name="bolt" className="w-5 h-5" />
                </div>
                <p className="font-semibold leading-relaxed">{section.callout}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Literal class names so Tailwind's scanner picks them up
const HIGHLIGHT_COLS: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export default function PartnerDetailClient({ partner }: { partner: PartnerPageContent }) {
  const highlights = partner.highlights || []

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className={`relative overflow-hidden ${NAVY} text-white pt-24 lg:pt-28 ${highlights.length ? 'pb-20 lg:pb-24' : 'pb-12 lg:pb-16'}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24387f]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#4859a7]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-blue-100/80">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/partners" className="hover:text-white">Partners</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">{partner.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              {/* Eyebrow sits inside the H1 so the partner name stays in the page heading */}
              <h1 className="font-bold tracking-tight mb-5">
                {partner.heroEyebrow && (
                  <span className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-3">
                    {partner.heroEyebrow}
                  </span>
                )}
                <span className="block text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight">{partner.heroTitle}</span>
              </h1>
              <div className="space-y-4 text-base sm:text-lg text-blue-100/90 leading-relaxed mb-7">
                {partner.heroParagraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
              {partner.heroCtaText && (
                <CTAButton
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#062068] px-7 py-3.5 rounded-lg font-semibold text-base hover:bg-gray-100 transition-all shadow-precision-lg active:scale-[0.98]"
                >
                  {partner.heroCtaText}
                  <ArrowIcon />
                </CTAButton>
              )}
            </div>

            <div className="lg:col-span-6">
              <div className="relative">
                {/* Above the visual on phones, floating over its top-right corner from sm up */}
                <div className="relative z-10 mb-4 flex justify-center sm:mb-0 sm:absolute sm:-top-4 sm:right-4">
                  <LogoLockup partner={partner} compact />
                </div>
                {partner.heroImage ? (
                  <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <Image src={partner.heroImage.url} alt={partner.heroImage.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" priority />
                  </div>
                ) : partner.heroIllustration === 'retail-displays' ? (
                  <DisplayIllustration />
                ) : partner.heroIllustration === 'media-player' ? (
                  <MediaPlayerIllustration />
                ) : (
                  <ScreenNetworkIllustration />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights strip, overlapping the hero */}
      {highlights.length > 0 && (
        <div className="relative z-10 -mt-10 lg:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className={`grid gap-px overflow-hidden rounded-2xl bg-gray-200 shadow-precision-lg ${HIGHLIGHT_COLS[Math.min(highlights.length, 4)]}`}>
            {highlights.map((h) => (
              <li key={h.text} className="flex items-center gap-4 bg-white p-5 lg:p-6">
                <IconBadge name={h.icon} />
                <span className="font-semibold text-gray-900 leading-snug">{h.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {partner.sections.map((section, i) => (
        <SectionBlock key={`${section._type}-${section.heading}`} section={section} index={i} partner={partner} />
      ))}
    </div>
  )
}
