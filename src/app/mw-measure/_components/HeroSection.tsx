import React from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/CTAButton';
import { MeasureGeometry } from './brand/MeasureGeometry';

const HERO_IMAGE_URL = 'https://cdn.sanity.io/images/u10im6di/production/43c8ac7b042ac78e12326b6fdec3fed5126061a4-1200x1200.png?w=1200&q=90&auto=format';

interface HeroSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = 'MW Measure',
  title = "Don't Just Deliver OOH Campaign. Prove It.",
  subtitle = 'Convert campaign delivery data into actionable proof. MW Measure is the command center for Out-of-Home advertising, providing real-time reach, frequency, saturation analysis, and verified attribution analytics.',
}) => {
  // Splits the title into the mockup's original 3-line layout, with the closing
  // "Prove It." phrase rendered in its own cyan-to-blue gradient — matching the AI
  // Studio design. Falls back to the plain title if it doesn't match that shape
  // (e.g. a CMS editor has replaced it with different copy).
  const renderTitle = () => {
    const marker = 'Prove It.';
    const idx = title.lastIndexOf(marker);
    if (idx === -1) return title;

    const before = title.slice(0, idx).trim();
    const campaignMarker = 'OOH Campaign.';
    const campaignIdx = before.indexOf(campaignMarker);

    const firstLine = campaignIdx !== -1 ? before.slice(0, campaignIdx).trim() : before;
    const secondLine = campaignIdx !== -1 ? before.slice(campaignIdx).trim() : null;

    return (
      <>
        {firstLine} <br />
        {secondLine && (
          <>
            {secondLine} <br />
          </>
        )}
        <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-200 bg-clip-text text-transparent drop-shadow-sm">
          {marker}
        </span>
      </>
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1d4a] via-[#13245d] to-[#182b6e] text-white pt-20 sm:pt-16 lg:pt-20 pb-12 lg:pb-16">

      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">

          <div className="md:col-span-6 space-y-6 sm:space-y-8 text-left">

            {/* Pill Badge with MW Measure Geometry */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/30 text-blue-200 text-xs font-semibold tracking-wide shadow-sm">
              <div className="w-5 h-5 rounded-full bg-[#0b162c] flex items-center justify-center">
                <MeasureGeometry size="xs" />
              </div>
              <span className="font-sans uppercase tracking-wider text-[11px] text-blue-100">
                {badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2] font-sans">
              {renderTitle()}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-blue-100/80 font-normal leading-relaxed max-w-xl">
              {subtitle}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <CTAButton
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 sm:py-4 rounded-xl bg-white text-[#121f56] text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xl shadow-blue-950/40 hover:bg-slate-100 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                id="hero-prove-campaign-btn"
              >
                <span>Prove Your Campaign</span>
              </CTAButton>
            </div>

          </div>

          <div className="md:col-span-6 w-full flex items-center justify-center">
            {/* Height is capped independently of width so a bigger visual doesn't grow the
                section — object-cover crops the circle evenly top/bottom rather than
                stretching the box (and the row height it drives) taller. */}
            <div className="relative w-full max-w-[560px] h-[300px] sm:h-[360px] md:h-[400px] lg:h-[440px]">
              <Image
                src={HERO_IMAGE_URL}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, 560px"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
