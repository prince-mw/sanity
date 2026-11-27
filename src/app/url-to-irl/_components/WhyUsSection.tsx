'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Reveal, SectionHeader } from './shared';

const COLUMNS = ['Reaches people off the phone', 'Proves who was there', 'Grades against twins, bar set first', 'Brings them back to your ads'];

const ROWS: { name: string; cells: (string | null)[] }[] = [
  { name: 'Walled gardens', cells: [null, null, 'Grades its own', 'Inside its walls'] },
  { name: 'Screen networks', cells: ['Proof of play', null, null, 'Some, via a DSP'] },
  { name: 'Research firms', cells: [null, null, 'After the fact', null] },
];

const LOCKS = [
  { t: 'Pass mark, first', d: 'Signed before the flight, against a published norm. Never your own baseline.' },
  { t: 'A blind panel', d: 'People never learn who paid. Your brand hides among rivals.' },
  { t: 'Same-week twins', d: 'Same markets, same weeks — so the season cancels out.' },
  { t: 'Misses in print', d: 'The Philippine miss shipped beside the wins.' },
  { t: 'Open books', d: 'Raw tables and fieldwork records open to your analysts, under NDA.' },
];

const MOAT = [
  { t: 'Screens on the right roads', time: 'Weeks', w: 12 },
  { t: 'Knowing who was really there', time: 'Months', w: 28 },
  { t: 'Handing the audience back', time: 'A year or more', w: 48 },
  { t: 'A panel deep enough for twins', time: '18–24 months', w: 70, moat: true },
  { t: 'A norms base of finished flights', time: 'Flight by flight', w: 86, moat: true },
  { t: 'A platform’s own brand, graded', time: 'Not for sale', w: 100, moat: true },
];

export const WhyUsSection: React.FC = () => {
  return (
    <section id="why-only-us" className="scroll-mt-32 py-16 sm:py-20 lg:py-24 bg-white text-[#1b1b20]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Only Us"
          title={
            <>
              Every piece exists somewhere. <span className="text-[#1e68e5]">Nowhere else as one system.</span>
            </>
          }
        />

        <Reveal>
          <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-4" />
                  {COLUMNS.map((c) => (
                    <th key={c} className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.name} className="border-t border-gray-100 hover:bg-gray-50/70 transition-colors">
                    <td className="px-5 py-4 font-semibold text-gray-700">{r.name}</td>
                    {r.cells.map((c, i) => (
                      <td key={i} className="px-4 py-4 text-center">
                        {c ? <span className="text-xs text-gray-500">{c}</span> : <span className="text-gray-300">&mdash;</span>}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-[#0f1d4a]">
                  <td className="px-5 py-5 font-extrabold text-white">URL &rarr; IRL</td>
                  {COLUMNS.map((c, i) => (
                    <td key={c} className="px-4 py-5 text-center">
                      <motion.span
                        className="inline-flex w-8 h-8 rounded-full items-center justify-center"
                        style={{ backgroundColor: ['#22d3ee', '#22d3ee', '#a78bfa', '#34d399'][i] }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', delay: 0.2 + i * 0.12 }}
                      >
                        <Check className="w-4 h-4 text-[#0b1437]" strokeWidth={3} />
                      </motion.span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-base font-semibold text-[#14235d]">
            Stitch the pieces together, and nobody owns the answer. We built it as one &mdash; so we do.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d]">We place the media. So we built five locks into the grade.</h3>
            <div className="mt-6 space-y-3">
              {LOCKS.map((l, i) => (
                <motion.div
                  key={l.t}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex gap-4 rounded-2xl border border-gray-200 p-4 hover:border-[#1e68e5]/40 hover:bg-blue-50/40 transition-colors"
                >
                  <span className="flex-none w-9 h-9 rounded-xl bg-[#0f1d4a] text-white text-sm font-bold flex items-center justify-center group-hover:bg-[#1e68e5] transition-colors">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="font-bold text-[#14235d]">{l.t}</div>
                    <div className="text-sm text-gray-600">{l.d}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d]">What took years to build can&apos;t be bought in a quarter.</h3>
            <div className="mt-6 space-y-4">
              {MOAT.map((m, i) => (
                <div key={m.t}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className={m.moat ? 'font-semibold text-[#14235d]' : 'text-gray-600'}>{m.t}</span>
                    <span className={`font-bold ${m.moat ? 'text-[#1e68e5]' : 'text-gray-500'}`}>{m.time}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: m.moat ? 'linear-gradient(90deg, #1e68e5, #8b5cf6)' : '#cbd5e1' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.w}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-600">
              The first three are a budget and a calendar. <strong className="text-[#14235d]">The last three are the moat.</strong>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
