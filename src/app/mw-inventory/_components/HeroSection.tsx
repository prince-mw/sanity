import React from 'react';
import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';
import { HeroVisual } from './HeroVisual';

interface HeroSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

// MW Studio's brand geometry: three overlapping, fading squares — matches the icon
// already used for MW Studio on the MW Science page. MW Inventory is part of MW Studio,
// so this icon replaces the old plain 4-square mark next to the product name.
const StudioGeoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <rect x="2" y="11" width="11" height="11" rx="1.5" opacity="0.45" />
    <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" opacity="0.7" />
    <rect x="11" y="2" width="11" height="11" rx="1.5" />
  </svg>
);

// Highlights the closing word "Revenue" in the same cyan-to-blue gradient used for
// "Prove It." on the MW Measure hero — falls back to plain text if the CMS copy changes.
function renderTitle(title: string) {
  const marker = 'Revenue';
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

// Links only the words "MW Studio" (not the surrounding sentence) to the MW Studio
// product page, wherever they appear in the subtitle.
function renderSubtitle(subtitle: string) {
  const marker = 'MW Studio';
  const idx = subtitle.indexOf(marker);
  if (idx === -1) return subtitle;
  return (
    <>
      {subtitle.slice(0, idx)}
      <Link
        href="/mw-studio"
        className="hover:text-white transition-colors whitespace-nowrap"
      >
        MW Studio
      </Link>
      {subtitle.slice(idx + marker.length)}
    </>
  );
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = 'MW Studio',
  title = 'Turn Every Screen Into Revenue',
  subtitle = "Capture more revenue from your OOH & DOOH inventories through MW Studio's streamlined inventory management, with real-time availability and faster selling opportunities.",
}) => {
  return (
    <section className="relative overflow-hidden bg-[#062068] text-white pt-20 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 lg:pb-12" id="hero-section">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24387f]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#4859a7]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-300/30 text-blue-100 text-xs font-semibold tracking-wide shadow-sm" id="hero-badge">
              <div className="w-5 h-5 rounded-full bg-[#0b162c] flex items-center justify-center shrink-0">
                <StudioGeoIcon className="w-3 h-3 text-white" />
              </div>
              <span className="font-sans uppercase tracking-wider text-[11px]">
                {badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2] font-sans">
              {renderTitle(title)}
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl font-normal">
              {renderSubtitle(subtitle)}
            </p>

            <div className="pt-6 text-center lg:text-left">
              <CTAButton
                href="/contact"
                className="bg-white hover:bg-gray-100 text-[#062068] font-semibold text-[15px] px-8 py-3.5 rounded-lg shadow-precision-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98]"
                id="hero-see-action-btn"
              >
                <span>See MW Studio In Action</span>
              </CTAButton>
            </div>
          </div>

          <div className="lg:col-span-6">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};
