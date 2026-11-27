'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Smartphone, MapPin, Quote } from 'lucide-react';
import { Reveal, SectionHeader, SourceNote } from './shared';

const ERAS = [
  { year: '1994', text: 'The click made a screen countable.', icon: MousePointerClick },
  { year: '2010s', text: 'The digital feed made every tap countable.', icon: Smartphone },
  { year: '2026', text: 'In-Real-World becomes provable.', icon: MapPin, now: true },
];

const EXPERIMENT = [
  'Ads on some rail lines. Not on others.',
  'Residents say which lines they ride.',
  'Neighbourhoods with many ads against few.',
  'Sales rose where the ads ran.',
];

const ROWS = [
  { label: 'How often', amazon: 'One four-week campaign', mw: 'Every flight since Feb 2026: 50+ and counting' },
  { label: 'Where it works', amazon: 'Rail cities only', mw: 'Any road with screens and a movement signal' },
  { label: 'What it takes', amazon: 'A team of research economists', mw: 'A seven-question brief' },
  { label: 'What it reads', amazon: 'Sales by neighbourhood', mw: 'What people think, do and buy' },
  { label: 'How fast', amazon: 'Academic analysis, afterwards', mw: 'Delivery daily · minds in weeks · the till in months' },
];

export const TurnSection: React.FC = () => {
  const [view, setView] = useState<'amazon' | 'mw'>('mw');

  return (
    <section id="the-turn" className="scroll-mt-32 py-16 sm:py-20 lg:py-24 bg-gray-50 text-[#1b1b20]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Turn"
          title={
            <>
              The real world was never unfundable. <span className="text-[#1e68e5]">It was unprovable.</span>
            </>
          }
          intro="Every time advertising learned to count something new, the money followed."
        />

        {/* Eras */}
        <div className="relative max-w-4xl mx-auto mb-20">
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-1 rounded-full bg-gray-200 overflow-hidden">
            <motion.div
              className="h-full"
              style={{ background: 'linear-gradient(90deg, #94a3b8, #1e68e5, #22d3ee)' }}
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ERAS.map((era, i) => (
              <Reveal key={era.year} delay={0.3 + i * 0.45} className="relative flex flex-col items-center text-center">
                <div
                  className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                    era.now ? 'bg-gradient-to-br from-cyan-400 to-[#1e68e5] text-white' : 'bg-white border border-gray-200 text-gray-400'
                  }`}
                >
                  {era.now && <span className="absolute inset-0 rounded-2xl animate-ping bg-cyan-400/30" />}
                  <era.icon className="w-7 h-7 relative" />
                </div>
                <div className={`mt-4 text-3xl font-extrabold ${era.now ? 'text-[#1e68e5]' : 'text-gray-400'}`}>{era.year}</div>
                <p className={`mt-1 text-sm sm:text-base max-w-[220px] ${era.now ? 'text-[#14235d] font-semibold' : 'text-gray-500'}`}>{era.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Amazon experiment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <Reveal className="lg:col-span-5">
            <div className="h-full bg-[#0b1437] text-white rounded-3xl p-7 sm:p-9 relative overflow-hidden shadow-xl">
              <Quote className="absolute -top-3 -left-3 w-24 h-24 text-white/5" />
              <div className="relative">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">The breakthrough &middot; May 2025</div>
                <p className="mt-5 text-xl sm:text-2xl font-bold leading-snug">
                  &ldquo;&hellip;we believe we&rsquo;ve opened the door for causal measurement of OOH ad effectiveness.&rdquo;
                </p>
                <p className="mt-5 text-sm text-blue-100/70">Egor Abramov, Amazon Science, 21 May 2025</p>
                <p className="mt-6 text-sm text-blue-100/80 leading-relaxed">
                  Amazon, which can follow almost every click, went outside the phone and ran a randomised experiment on
                  out-of-home ads.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXPERIMENT.map((step, i) => (
              <Reveal key={step} delay={i * 0.12}>
                <div className="h-full bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#1e68e5]/40 hover:shadow-lg transition-all">
                  <div className="text-4xl font-extrabold text-gray-200">{String(i + 1).padStart(2, '0')}</div>
                  <p className={`mt-3 text-base sm:text-lg font-semibold ${i === 3 ? 'text-[#1e68e5]' : 'text-[#14235d]'}`}>{step}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Ran it once vs every flight */}
        <Reveal className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d]">Amazon ran it once. We run it on every campaign flight.</h3>
          </div>

          {/* Mobile: toggle between the two columns */}
          <div className="sm:hidden flex justify-center mb-4">
            <div className="inline-flex bg-white border border-gray-200 rounded-full p-1">
              {(['amazon', 'mw'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setView(k)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${view === k ? 'bg-[#0f1d4a] text-white' : 'text-gray-500'}`}
                >
                  {k === 'amazon' ? 'Amazon Science, 2025' : 'Moving Walls'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="hidden sm:grid grid-cols-[1fr_1.2fr_1.4fr] bg-gray-50 text-xs font-bold uppercase tracking-wider">
              <div className="px-6 py-4 text-gray-400" />
              <div className="px-6 py-4 text-gray-400">Amazon Science, 2025</div>
              <div className="px-6 py-4 text-[#1e68e5]">Moving Walls</div>
            </div>
            {ROWS.map((row) => (
              <div key={row.label} className="group grid grid-cols-[1fr_1.6fr] sm:grid-cols-[1fr_1.2fr_1.4fr] border-t border-gray-100 hover:bg-blue-50/50 transition-colors">
                <div className="px-5 sm:px-6 py-4 text-sm font-semibold text-gray-500">{row.label}</div>
                <div className={`px-5 sm:px-6 py-4 text-sm text-gray-400 decoration-gray-300 sm:group-hover:line-through ${view === 'amazon' ? 'block' : 'hidden'} sm:block`}>
                  {row.amazon}
                </div>
                <div className={`px-5 sm:px-6 py-4 text-sm font-bold text-[#14235d] ${view === 'mw' ? 'block' : 'hidden'} sm:block`}>{row.mw}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-gray-500 italic">
            The science is borrowed, and we say so. The invention is making it run as a line item.
          </p>
        </Reveal>

        <SourceNote>
          Amazon Science, &ldquo;A first-of-its-kind experiment to measure the impact of out-of-home advertising&rdquo; (21 May 2025). Four-week
          campaign; synthetic control and difference-in-differences; no effect size published; limited to metro and commuter-rail cities.
        </SourceNote>
      </div>
    </section>
  );
};
