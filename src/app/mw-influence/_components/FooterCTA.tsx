import React from 'react';
import { CTAButton } from '@/components/CTAButton';

export const FooterCTA: React.FC = () => {
  return (
    <section id="footer-cta" className="bg-[#121f56] text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden text-center border-t border-blue-900/40">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#22d3ee]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2]">
          Put Your OOH Inventory to Work Smarter.
        </h2>

        <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
          With MW Influence, every allocation decision works toward better utilization, stronger delivery, and higher network revenue.
        </p>

        <div className="pt-4">
          <CTAButton
            href="/contact"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-[#14235d] text-sm sm:text-base font-semibold px-8 py-3.5 rounded-lg shadow-precision-lg hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
            id="footer-cta-get-in-touch-btn"
          >
            <span>Get in Touch</span>
          </CTAButton>
        </div>

      </div>
    </section>
  );
};
