'use client'

import Image from 'next/image'
import { CTAButton } from '@/components/CTAButton'

// Shared look for the MW Science page and its MW Science Lab child page (Nov 2026
// redesign by Product Marketing, built in Google Stitch). Colours, type scale and
// motion follow that design; everything else uses the site's own components.

export const C = {
  navy: '#0B132B',
  primary: '#1A2B5F',
  secondary: '#0369A1',
  cyan: '#38BDF8',
  sunburst: '#FEDA24',
  crimsonDark: '#871A1C',
}

// Type scale from the design (mobile → desktop).
export const T = {
  display: 'font-bold text-[32px] leading-[38px] tracking-[-0.5px] md:text-[56px] md:leading-[62px] md:tracking-[-1.2px]',
  headlineLg: 'font-bold text-[28px] leading-[34px] tracking-[-0.4px] md:text-[40px] md:leading-[48px] md:tracking-[-0.8px]',
  headlineMd: 'font-semibold text-[28px] leading-[36px] tracking-[-0.3px]',
  titleMd: 'font-semibold text-[18px] leading-[26px]',
  bodyLg: 'text-[18px] leading-[28px]',
  bodyMd: 'text-[16px] leading-[24px]',
  bodySm: 'text-[14px] leading-[20px]',
  labelLg: 'font-semibold text-[15px] leading-[20px]',
  labelMd: 'font-semibold text-[13px] leading-[18px] tracking-[0.2px]',
  labelSm: 'font-semibold text-[12px] leading-[16px] tracking-[0.6px]',
}

// Pill buttons from the design.
export const BTN_PRIMARY =
  'group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0369A1] text-white transition-all duration-150 ease-out hover:opacity-95 hover:-translate-y-0.5 hover:shadow-lg active:scale-95'

// Hover lift for cards.
export const CARD_HOVER =
  'transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_12px_28px_-8px_rgba(15,40,90,0.12)] motion-reduce:hover:translate-y-0'

// Keyframes the design relies on (hero entrance, light pass, glow, flowing lines).
export const SCIENCE_CSS = `
@keyframes mwsSignalDash { 0% { stroke-dashoffset: 120; } 100% { stroke-dashoffset: 0; } }
@keyframes mwsPulseGlow { 0%, 100% { opacity: 0.72; } 50% { opacity: 1; } }
@keyframes mwsLightPass {
  0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
  20% { opacity: 0.85; } 80% { opacity: 0.85; }
  100% { transform: translateX(160%) skewX(-18deg); opacity: 0; }
}
@keyframes mwsSlideUp { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes mwsPanelEnter { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes mwsHexBreathing { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.025); } }
.mws-signal-flow { stroke-dasharray: 10 14; animation: mwsSignalDash 3.2s linear infinite; }
.mws-glow { animation: mwsPulseGlow 3.2s ease-in-out infinite; }
.mws-light-pass { animation: mwsLightPass 5.2s ease-in-out infinite; }
.mws-enter-1 { animation: mwsSlideUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both; }
.mws-enter-2 { animation: mwsSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.14s both; }
.mws-enter-3 { animation: mwsSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.22s both; }
.mws-enter-4 { animation: mwsSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both; }
.mws-enter-5 { animation: mwsSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.38s both; }
.mws-panel-enter { animation: mwsPanelEnter 0.32s cubic-bezier(0.22, 1, 0.36, 1) both; }
.mws-hex-pulse { transform-origin: 260px 130px; animation: mwsHexBreathing 4s ease-in-out infinite; }
.mws-portrait-mask {
  -webkit-mask-image: radial-gradient(ellipse 85% 88% at 62% 50%, #000 38%, rgba(0,0,0,0.65) 62%, transparent 92%);
  mask-image: radial-gradient(ellipse 85% 88% at 62% 50%, #000 38%, rgba(0,0,0,0.65) 62%, transparent 92%);
}
@media (prefers-reduced-motion: reduce) {
  .mws-signal-flow, .mws-glow, .mws-light-pass, .mws-enter-1, .mws-enter-2, .mws-enter-3,
  .mws-enter-4, .mws-enter-5, .mws-panel-enter, .mws-hex-pulse { animation: none; }
}
`

export const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)

// Dark hero for both pages: the image sits on the right and fades into the navy,
// with a soft band of light passing across it.
export function ScienceHeroBackdrop({ src }: { src: string }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[75%] overflow-hidden select-none" aria-hidden="true">
      <div className="relative w-full h-full mws-portrait-mask">
        <Image src={src} alt="" fill priority sizes="(min-width: 1024px) 75vw, 100vw" className="object-cover object-right opacity-95 mws-glow" />
        <div className="mws-light-pass absolute inset-y-0 -left-1/3 w-2/3 bg-gradient-to-r from-transparent via-[#FEDA24]/25 to-transparent mix-blend-screen" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B]/70 lg:via-[#0B132B]/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-[#0B132B]/35 to-[#0B132B]/40 lg:hidden" />
    </div>
  )
}

// Closing section shared by both pages.
export function NoBoundariesSection({ title, body, ctaText }: { title: string; body: string; ctaText: string }) {
  return (
    <section id="contact" className="relative py-20 md:py-28 bg-[#0B132B] text-[#F8FAFC] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        <Image src="/assets/images/mw-science/no-boundaries-bg.jpg" alt="" fill sizes="100vw" className="object-cover object-center opacity-85 mws-glow" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-[#0B132B]/60 to-[#0B132B]/45" />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 text-center flex flex-col items-center gap-6">
        <h2 className={T.display}>{title}</h2>
        <p className={`${T.bodyLg} text-[#CBD5E1] max-w-2xl text-pretty`}>{body}</p>
        <CTAButton href="/contact" className={`${BTN_PRIMARY} px-7 ${T.labelLg}`}>
          <span>{ctaText}</span>
          <ArrowIcon className="w-[18px] h-[18px] transition-transform duration-150 group-hover:translate-x-1" />
        </CTAButton>
      </div>
    </section>
  )
}
