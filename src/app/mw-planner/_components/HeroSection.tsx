'use client';

import React from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/CTAButton';
import { PlannerGeometry } from './brand/PlannerGeometry';

const HERO_IMAGE_URL = 'https://cdn.sanity.io/images/u10im6di/production/c08c5ef5a4b177066e024763e88d29c0f1bd1e3a-960x640.png?w=1200&q=90&auto=format';

interface HeroSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

// Highlights the closing word "Defend" in the same cyan-to-blue gradient used for
// "Prove It." on the MW Measure hero — falls back to plain text if the CMS copy changes.
// Also keeps "OOH Plans" from splitting across a line-wrap with a non-breaking space.
function renderTitle(title: string) {
  const joined = title.replaceAll('OOH Plans', 'OOH Plans');
  const marker = 'Defend';
  const idx = joined.lastIndexOf(marker);
  if (idx === -1) return joined;
  return (
    <>
      {joined.slice(0, idx)}
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-200 bg-clip-text text-transparent">
        {marker}
      </span>
      {joined.slice(idx + marker.length)}
    </>
  );
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = 'MW Planner',
  title = 'Build OOH Plans You Can Defend.',
  subtitle = 'Transform campaign briefs into data-backed OOH plans with live inventory, audience signals, and forecasting—all in one platform.',
}) => {
  // Keeps "OOH plans" from splitting across a line-wrap in the body copy too, same as the
  // heading — applies to both the default copy and any CMS-sourced subtitle.
  const renderedSubtitle = subtitle.replaceAll('OOH plans', 'OOH plans');

  return (
    <section
      className="relative overflow-hidden text-white pt-24 sm:pt-20 lg:pt-24 pb-20 lg:pb-28"
      style={{
        background:
          'radial-gradient(circle at 75% 30%, rgba(56, 189, 248, 0.15), transparent 45%), radial-gradient(circle at 25% 60%, rgba(36, 56, 127, 0.4), transparent 50%), #071948',
      }}
      id="hero-section"
    >
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#475aa2]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

          <div className="lg:col-span-5 space-y-6 sm:space-y-8 z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-300/30 text-blue-100 text-xs font-semibold tracking-wide shadow-sm" id="hero-badge">
              <div className="w-5 h-5 rounded-full bg-[#0b162c] flex items-center justify-center shrink-0">
                <PlannerGeometry className="w-3 h-3 text-white" />
              </div>
              <span className="font-sans uppercase tracking-wider text-[11px]">
                {badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2] font-sans">
              {renderTitle(title)}
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl font-normal">
              {renderedSubtitle}
            </p>

            <div className="pt-2 text-center lg:text-left">
              <CTAButton
                href="/contact"
                className="bg-white hover:bg-gray-100 text-[#071948] font-semibold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-precision-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98]"
                id="hero-plan-campaign-btn"
              >
                <span>Plan Your Campaign</span>
              </CTAButton>
            </div>
          </div>

          {/* Mobile/tablet — a normal contained image below the text (below lg the bleed
              treatment below doesn't apply, since the columns are stacked). */}
          <div className="lg:hidden w-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[3/2]">
              <Image
                src={HERO_IMAGE_URL}
                alt="Real-world signals and OOH vision intelligence"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </div>

          {/* Chevron visual — a normal grid column, so its left edge sits exactly where the
              grid puts it. The section's own padding is taller on purpose (pt-24/pb-28 above)
              to make the whole banner match MW Measure's scale — bleeding the graphic into
              that padding doesn't add anything beyond what the section already reserves. The
              header is `position: fixed` (h-16/64px at lg, where this column first appears),
              so the top bleed only cancels the part of the section's own top padding beyond
              the header's height (96-64=32px) — canceling all of it would push the graphic up
              underneath the fixed header. The bottom bleed has no such constraint and cancels
              its padding in full. The section's own overflow-hidden clips this bleed at the
              true edges. The box is sized by height only (h-full) with aspect-[3/2] deriving
              its own width from that — no forced w-full/max-w-full and no object-cover, so
              there's neither a crop nor empty letterbox padding on the sides. The bleed div's
              right edge is pushed past the column with a negative `right` offset (not a
              margin on the column — the column has an explicit w-full, so a margin never
              actually changed its box, which is why increasing it did nothing visible). */}
          <div className="hidden lg:block lg:col-span-7 w-full relative self-stretch">
            <div className="absolute lg:-top-8 lg:-bottom-28 left-0 lg:right-[-2rem] flex items-center justify-end">
              <div className="relative h-full aspect-[3/2]">
                <Image
                  src={HERO_IMAGE_URL}
                  alt="Real-world signals and OOH vision intelligence"
                  fill
                  className="object-contain"
                  sizes="1100px"
                  quality={90}
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
