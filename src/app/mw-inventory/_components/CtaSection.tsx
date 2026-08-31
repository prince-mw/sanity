import React from 'react';
import { CTAButton } from '@/components/CTAButton';

export const CtaSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#062068] text-white py-16 sm:py-20 lg:py-24 text-center" id="cta-section">
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#24387f]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans leading-tight">
            Turn What You Own Into What You Can Sell.
          </h2>

          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
            Your network is already full of opportunities. MW Inventory gives you the structure, control, and visibility to put more of them to work.
          </p>

          <div className="pt-4">
            <CTAButton
              href="/contact"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-[#062068] text-sm sm:text-base font-semibold px-8 py-3.5 rounded-lg shadow-precision-lg hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
              id="cta-get-in-touch-btn"
            >
              <span>Get in Touch</span>
            </CTAButton>
          </div>

        </div>
      </div>
    </section>
  );
};
