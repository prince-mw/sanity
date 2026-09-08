import React from 'react';
import { CTAButton } from '@/components/CTAButton';
import { MeasureGeometry } from './brand/MeasureGeometry';

export const FooterCTA: React.FC = () => {
  return (
    <section id="footer-cta" className="bg-[#121f56] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden border-t border-blue-900/40">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">

        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/30 text-blue-200 text-xs font-semibold shadow-xs mb-2">
          <div className="w-5 h-5 rounded-full bg-[#0b162c] flex items-center justify-center">
            <MeasureGeometry size="xs" />
          </div>
          <span className="text-blue-100 font-sans uppercase tracking-wider text-[11px]">Ready for Verifiable Proof?</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          <span className="block">From Reporting to</span>
          <span className="block mt-3 sm:mt-4 bg-gradient-to-r from-blue-200 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
            Actionable Insights.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
          Measure transforms campaign data into actionable insights that helps marketers prove OOH impact, optimize investment, and make every campaign smarter than the last. By connecting Audience, Location, Media, Brand and Outcome Signals, Measure turns campaign evidence into better decisions.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[#121f56] text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-2xl hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            id="footer-cta-see-action-btn"
          >
            <span>See MW Measure In Action</span>
          </CTAButton>
        </div>

      </div>
    </section>
  );
};
