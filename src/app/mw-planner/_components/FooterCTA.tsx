'use client';

import React from 'react';
import { Database, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';
import { useLocale } from '@/i18n/LocaleContext';

export const FooterCTA: React.FC = () => {
  const { t } = useLocale();
  return (
    <section
      id="footer-cta"
      className="text-white relative overflow-hidden text-center mw-section-lg"
      style={{
        background: 'radial-gradient(circle at 50% 100%, rgba(56, 189, 248, 0.12), transparent 60%), #09183d',
      }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M0,100 C300,250 600,0 900,180 C1100,300 1200,120 1200,120 L1200,400 L0,400 Z" fill="#38bdf8" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#102456] border border-[#223d88] text-xs font-bold tracking-wider uppercase mb-8">
          <span className="flex items-center gap-1 text-[#93c5fd]"><Database className="w-3 h-3" />Data</span>
          <span className="text-[#455c99]">›</span>
          <span className="text-[#fbbf24] font-semibold">Plan</span>
          <span className="text-[#455c99]">›</span>
          <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3 h-3" />Recommendation</span>
        </div>

        <h2 className="font-extrabold tracking-tight leading-tight mb-6 text-3xl lg:text-4xl">
          From OOH Planning to Confident Recommendations
        </h2>

        <p className="text-base sm:text-lg text-[#b7c4ff] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          MW Planner transforms the way OOH campaigns are planned—bringing live inventory, audience and location signals, and forecasting together so planners can make smarter decisions and build plans they can stand behind.
        </p>

        <CTAButton
          href="/contact"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg bg-white hover:bg-[#f1f4f9] text-[#2563eb] font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
          id="footer-cta-see-planner-btn"
        >
          <span>{t('ui.products.seeMwPlannerInAction')}</span>
          <ArrowRight className="w-4 h-4" />
        </CTAButton>

      </div>
    </section>
  );
};
