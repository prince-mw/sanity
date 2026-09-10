'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CTAButton } from '@/components/CTAButton';
import { PlannerGeometry } from './brand/PlannerGeometry';

const HERO_IMAGE_URL = 'https://cdn.sanity.io/images/u10im6di/production/938c3bdc77e60f2bd6d124a79638befae15a4356-1376x768.jpg?w=1400&q=85&auto=format';

interface HeroSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

// Highlights the closing word "Defend" in the same cyan-to-blue gradient used for
// "Prove It." on the MW Measure hero — falls back to plain text if the CMS copy changes.
function renderTitle(title: string) {
  const marker = 'Defend';
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
  badge = 'MW Planner',
  title = 'Build OOH Plans You Can Defend.',
  subtitle = 'Transform campaign briefs into data-backed OOH plans with live inventory, audience signals, and forecasting—all in one platform.',
}) => {
  return (
    <section
      className="relative overflow-hidden text-white pt-20 sm:pt-16 lg:pt-20 pb-12 lg:pb-16"
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
              {subtitle}
            </p>

            <div className="pt-2 text-center lg:text-left">
              <CTAButton
                href="/contact"
                className="bg-white hover:bg-gray-100 text-[#071948] font-semibold text-[15px] px-8 py-3.5 rounded-lg shadow-precision-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98]"
                id="hero-plan-campaign-btn"
              >
                <span>Plan Your Campaign</span>
              </CTAButton>
            </div>
          </div>

          {/* Chevron visual with ambient HUD overlay */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#2b4494]/80 bg-[#0b1b46]">
              <div className="relative w-full aspect-video overflow-hidden bg-[#071948]">
                <motion.img
                  src={HERO_IMAGE_URL}
                  alt="Real-world signals and OOH vision intelligence"
                  className="w-full h-full object-cover object-center select-none"
                  initial={{ scale: 1.03 }}
                  animate={{ scale: [1.03, 1.06, 1.03] }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071948]/35 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
              </div>

              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 bg-[#071948]/85 backdrop-blur-md border border-[#38bdf8]/50 px-3 py-1 rounded-full flex items-center gap-2 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] sm:text-[11px] font-sans font-semibold text-[#93c5fd] tracking-wider uppercase">
                  Real-World Signals
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 4.5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 bg-[#071948]/85 backdrop-blur-md border border-[#ffdf42]/50 px-3 py-1 rounded-full flex items-center gap-2 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-[#ffdf42]" />
                <span className="text-[10px] sm:text-[11px] font-sans font-semibold text-[#fef08a] tracking-wider uppercase">
                  Cognitive Vision &amp; Mobility
                </span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
