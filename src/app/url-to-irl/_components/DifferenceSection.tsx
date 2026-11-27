'use client';

import React, { useState } from 'react';
import { ArrowRight, Eye, TrendingUp } from 'lucide-react';
import { Reveal, SectionHeader } from './shared';

const PAIRS = [
  { old: 'Impressions', now: 'Favourability, against twins' },
  { old: 'Viewability', now: 'Purchase intent, against a norm' },
  { old: 'Reach and frequency', now: 'Branded search and site visits' },
  { old: 'Attention seconds', now: 'Wallet and card spend, where connected' },
  { old: 'Audience match', now: 'Product off the shelf, where connected' },
];

const STUDY_ROWS = [
  { label: 'What it asks', typical: 'Did people notice the ad?', ours: 'Did moving the money pay?' },
  { label: 'Compared with', typical: 'The campaign’s own starting point', ours: 'Matched twins, same weeks' },
  { label: 'The pass mark', typical: 'Rarely fixed in advance', ours: 'Set before the answer' },
  { label: 'The answer', typical: 'Rarely no', ours: 'Sometimes no — and we print it' },
];

export const DifferenceSection: React.FC = () => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-[#1b1b20]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Difference"
          title={
            <>
              They sell proof of delivery. <span className="text-[#1e68e5]">We sell outcomes.</span>
            </>
          }
          intro="Hover any row to see what each delivery metric becomes when you ask a different question."
        />

        <Reveal>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-x-3 sm:gap-x-6 items-center">
            <div className="flex items-center gap-2 pb-4 text-gray-400">
              <Eye className="w-5 h-5" />
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold">Most media is sold on</div>
                <div className="text-lg sm:text-2xl font-extrabold text-gray-500">Who saw it?</div>
              </div>
            </div>
            <div />
            <div className="flex items-center gap-2 pb-4 text-[#1e68e5]">
              <TrendingUp className="w-5 h-5" />
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold">URL &rarr; IRL is sold on</div>
                <div className="text-lg sm:text-2xl font-extrabold text-[#14235d]">What changed?</div>
              </div>
            </div>

            {PAIRS.map((p, i) => {
              const on = hover === i;
              return (
                <React.Fragment key={p.old}>
                  <div
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    className={`my-1.5 rounded-xl px-3 sm:px-5 py-3.5 text-sm sm:text-base border transition-all duration-300 cursor-default ${
                      on ? 'bg-gray-100 border-gray-200 text-gray-400 line-through' : 'bg-gray-50 border-gray-100 text-gray-600'
                    }`}
                  >
                    {p.old}
                  </div>
                  <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${on ? 'text-[#1e68e5] translate-x-1' : 'text-gray-300'}`} />
                  <div
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    className={`my-1.5 rounded-xl px-3 sm:px-5 py-3.5 text-sm sm:text-base font-semibold border transition-all duration-300 cursor-default ${
                      on ? 'bg-[#0f1d4a] border-[#0f1d4a] text-white shadow-lg scale-[1.02]' : 'bg-blue-50/60 border-blue-100 text-[#14235d]'
                    }`}
                  >
                    {p.now}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d]">
              Most studies grade the billboard. We grade the decision to buy it.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">A typical out-of-home study</div>
              <dl className="mt-5 space-y-4">
                {STUDY_ROWS.map((r) => (
                  <div key={r.label}>
                    <dt className="text-[11px] uppercase tracking-wider text-gray-400">{r.label}</dt>
                    <dd className="text-base text-gray-500">{r.typical}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#0f1d4a] to-[#1e3a8a] text-white p-6 sm:p-8 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">URL &rarr; IRL</div>
              <dl className="mt-5 space-y-4">
                {STUDY_ROWS.map((r) => (
                  <div key={r.label}>
                    <dt className="text-[11px] uppercase tracking-wider text-blue-200/60">{r.label}</dt>
                    <dd className="text-base font-semibold">{r.ours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="mt-6 text-center text-base font-semibold text-[#14235d]">
            A billboard can win while the budget loses. We tell you which.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
