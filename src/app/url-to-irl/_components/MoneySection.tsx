'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS, CountUp, Reveal, SectionHeader, SourceNote } from './shared';

const COHORTS = [
  { key: 'low', label: 'Lower performers', value: 32.1 },
  { key: 'avg', label: 'Market average', value: 43.3 },
  { key: 'high', label: 'Higher performers', value: 54.0 },
] as const;

const TRUST = [
  { value: 6, suffix: '%', text: 'of advertisers fully trust a retail network’s own reported numbers.', source: 'Bain & Company, 2023' },
  { value: 15, suffix: '', text: 'giant Facebook experiments. Standard attribution mostly overstated what the ads did.', source: 'Gordon et al., Marketing Science, 2019' },
  { value: 52, suffix: '%', text: 'of US brand and agency marketers now run incrementality tests to check what really worked.', source: 'EMARKETER & TransUnion, 2025' },
];

export const MoneySection: React.FC = () => {
  const [cohort, setCohort] = useState<(typeof COHORTS)[number]['key']>('avg');
  const current = COHORTS.find((c) => c.key === cohort)!;
  const lit = Math.round(current.value);

  return (
    <section className="py-16 sm:py-20 lg:py-24 text-white relative overflow-hidden" style={{ backgroundColor: COLORS.navy }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: '#1e68e51f' }} />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          eyebrow="Where the money goes"
          title={
            <>
              <CountUp to={56.7} decimals={1} suffix="¢" className="text-[#f87171]" /> of every programmatic dollar never meets a human being.
            </>
          }
          intro="The industry audited itself. Only a fraction reached an ad that was real, viewable, measurable and on a genuine site. Pick a buyer and watch the dollar."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Coin grid */}
          <Reveal className="lg:col-span-6">
            <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1 mb-6 flex-wrap">
              {COHORTS.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCohort(c.key)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    cohort === c.key ? 'bg-white text-[#0b1437]' : 'text-blue-100/70 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-10 gap-1.5 sm:gap-2 max-w-[420px]">
              {Array.from({ length: 100 }).map((_, i) => {
                const on = i < lit;
                return (
                  <motion.div
                    key={i}
                    className="aspect-square rounded-full"
                    animate={{
                      backgroundColor: on ? COLORS.cyan : 'rgba(248,113,113,0.18)',
                      scale: on ? 1 : 0.78,
                    }}
                    transition={{ duration: 0.35, delay: (on ? i : 100 - i) * 0.006 }}
                  />
                );
              })}
            </div>

            <div className="mt-6 flex items-end gap-8">
              <div>
                <motion.div key={current.value} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold" style={{ color: COLORS.cyan }}>
                  {current.value.toFixed(1)}¢
                </motion.div>
                <div className="text-xs text-blue-100/70 mt-1">reaches a real, viewable ad</div>
              </div>
              <div>
                <motion.div key={`l-${current.value}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold text-[#f87171]">
                  {(100 - current.value).toFixed(1)}¢
                </motion.div>
                <div className="text-xs text-blue-100/70 mt-1">lost to fees, fraud, unviewable and made-for-ad sites</div>
              </div>
            </div>
          </Reveal>

          {/* CPM spread */}
          <Reveal className="lg:col-span-6" delay={0.1}>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8">
              <div className="text-sm font-bold text-blue-100/80 uppercase tracking-wider">The price tag doesn&apos;t warn you</div>
              <p className="mt-2 text-sm text-blue-100/60">Cost per thousand impressions that actually qualified</p>

              <div className="mt-6 space-y-5">
                {[
                  { label: 'Best buyers', value: 7.46, color: COLORS.green },
                  { label: 'Worst buyers', value: 19.04, color: '#f87171' },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-blue-100/80">{row.label}</span>
                      <CountUp to={row.value} decimals={2} prefix="$" className="font-bold text-white" />
                    </div>
                    <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: row.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(row.value / 20) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div>
                  <CountUp to={11.58} decimals={2} prefix="$" className="text-3xl font-extrabold text-white" />
                  <div className="text-xs text-blue-100/60 mt-1">apart per thousand real impressions</div>
                </div>
                <div>
                  <CountUp to={21.9} decimals={1} suffix=" pts" className="text-3xl font-extrabold text-white" />
                  <div className="text-xs text-blue-100/60 mt-1">best-to-worst gap, the largest the Benchmark has recorded</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Who grades it */}
        <div className="mt-16 sm:mt-20">
          <Reveal className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              The 43&cent; that lands is graded by the company that sold it.
            </h3>
            <p className="mt-2 text-blue-100/70">The seller counts. The buyer has started checking.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TRUST.map((t, i) => (
              <Reveal key={t.source} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-colors p-6">
                  <CountUp to={t.value} suffix={t.suffix} className="text-5xl font-extrabold" />
                  <p className="mt-3 text-sm text-blue-100/80 leading-relaxed">{t.text}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-wider text-blue-200/50">{t.source}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <SourceNote dark>
          ANA Programmatic Transparency Benchmark, Q1 2026 (27 May 2026). TrueAdSpend = share of programmatic spend reaching fraud-free,
          measurable, viewable, non-MFA impressions. The Q2 2026 average rose to 45.1&cent;, with the gap still above 21 points.
        </SourceNote>
      </div>
    </section>
  );
};
