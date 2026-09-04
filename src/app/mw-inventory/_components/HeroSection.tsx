import React from 'react';
import { CTAButton } from '@/components/CTAButton';
import { HeroVisual } from './HeroVisual';

interface HeroSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = 'MW Inventory',
  title = 'Turn Every Screen Into Revenue',
  subtitle = 'Capture more revenue from your OOH inventory through streamlined management, real-time availability, and faster selling opportunities.',
}) => {
  return (
    <section className="relative overflow-hidden bg-[#062068] text-white pt-20 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 lg:pb-12" id="hero-section">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24387f]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#4859a7]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            <h1 className="font-black tracking-tight leading-[1.15] text-white font-sans">
              <span className="flex items-center gap-3 sm:gap-4 text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl" id="hero-badge">
                <span className="grid grid-cols-2 gap-1 w-9 h-9 sm:w-10 sm:h-10 shrink-0">
                  <span className="bg-white rounded-[2px]" />
                  <span className="bg-[#80f1b9] rounded-[2px]" />
                  <span className="bg-white rounded-[2px]" />
                  <span className="bg-white rounded-[2px]" />
                </span>
                {badge}
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold mt-3 sm:mt-4 lg:mt-5">
                {title}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl font-normal">
              {subtitle}
            </p>

            <div className="pt-6 text-center lg:text-left">
              <CTAButton
                href="/contact"
                className="bg-white hover:bg-gray-100 text-[#062068] font-semibold text-[15px] px-8 py-3.5 rounded-lg shadow-precision-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98]"
                id="hero-see-action-btn"
              >
                <span>See MW Inventory In Action</span>
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
