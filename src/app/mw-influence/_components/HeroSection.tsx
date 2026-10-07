import React from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/CTAButton';
import { InfluenceGeometry } from './brand/InfluenceGeometry';

const HERO_IMAGE_URL = '/assets/images/mw-influence-hero-banner-image.webp';

interface HeroSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

// Highlights the closing word "Valuable" in the same cyan-to-blue gradient used for
// "Prove It." on the MW Measure hero — falls back to plain text if the CMS copy changes.
function renderTitle(title: string) {
  const marker = 'Valuable';
  const idx = title.lastIndexOf(marker);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-200 bg-clip-text text-transparent">
        {marker}
      </span>
      {title.slice(idx + marker.length)}
    </>
  );
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = 'MW Influence',
  title = 'Make Every OOH Slot More Valuable.',
  subtitle = 'Automatically allocate every available slot to the highest-value demand while protecting guaranteed campaigns and maximizing network revenue.',
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1d4a] via-[#13245d] to-[#182b6e] text-white pt-20 sm:pt-16 lg:pt-20 pb-12 lg:pb-16" id="hero-section">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#182b6e]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#22d3ee]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

          <div className="lg:col-span-5 space-y-6 sm:space-y-8 z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/30 text-blue-200 text-xs font-semibold tracking-wide shadow-sm" id="hero-badge">
              <div className="w-5 h-5 rounded-full bg-[#0b162c] flex items-center justify-center shrink-0">
                <InfluenceGeometry className="w-3 h-3 text-white" />
              </div>
              <span className="font-sans uppercase tracking-wider text-[11px] text-blue-100">
                {badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2] font-sans">
              {renderTitle(title)}
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl font-normal">
              {subtitle}
            </p>

            <div className="pt-2 text-center lg:text-left">
              <CTAButton
                href="/contact"
                className="bg-white hover:bg-gray-100 text-[#14235d] font-semibold text-[15px] px-8 py-3.5 rounded-lg shadow-precision-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98]"
                id="hero-see-action-btn"
              >
                <span>See MW Influence in Action</span>
              </CTAButton>
            </div>
          </div>

          {/* Mobile/tablet — a normal contained image below the text (below lg the bleed
              treatment below doesn't apply, since the columns are stacked). */}
          <div className="lg:hidden w-full flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-[848/1227]">
              <Image
                src={HERO_IMAGE_URL}
                alt="A fountain pen's ink fans out into out-of-home billboard, city and lifestyle imagery"
                fill
                className="object-contain"
                sizes="80vw"
              />
            </div>
          </div>

          {/* Desktop — same bleed technique as the MW Planner hero: the box is sized by
              height only (h-full), bleeding into the section's own pt-20/pb-16 padding so
              there's no letterboxing. Top offset only cancels the part of the top padding
              beyond the fixed header's height (80-64=16px at lg); the bottom offset cancels
              its padding in full. The section's own overflow-hidden clips the bleed at the
              true edges. Centered (justify-center) rather than bled to one side, so it sits
              in the middle of the column instead of crowding the right edge. The box uses a
              1:1 ratio (narrower than the source's native 848x1227) with object-cover +
              object-top: this crops only the plain, content-free pen barrel off the bottom of
              the source image — the full fanned composition and the complete pen nib are both
              still shown in full — which both enlarges the image (same height, wider box) and
              avoids the empty side-margins a full-height native-ratio box left. */}
          <div className="hidden lg:flex lg:col-span-7 w-full relative self-stretch">
            <div className="absolute lg:-top-4 lg:-bottom-16 left-0 right-0 flex items-center justify-center">
              <div className="relative h-full aspect-square">
                <Image
                  src={HERO_IMAGE_URL}
                  alt="A fountain pen's ink fans out into out-of-home billboard, city and lifestyle imagery"
                  fill
                  className="object-cover object-top"
                  sizes="700px"
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
