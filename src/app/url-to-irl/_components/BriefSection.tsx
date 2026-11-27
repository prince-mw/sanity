'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Reveal, SectionHeader } from './shared';

const QUESTIONS = [
  'Which campaign are we extending?',
  'What does winning mean right now?',
  'What one thing should people do?',
  'Where do they go next?',
  'What makes them act in the moment?',
  'Where should it happen?',
  'How will we grade it?',
];

const R = 54;
const CIRC = 2 * Math.PI * R;

export const BriefSection: React.FC = () => {
  const [checked, setChecked] = useState<boolean[]>(() => QUESTIONS.map(() => false));
  const count = checked.filter(Boolean).length;
  const complete = count === QUESTIONS.length;

  return (
    <section id="the-brief" className="scroll-mt-32 py-16 sm:py-20 lg:py-24 bg-gray-50 text-[#1b1b20]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Week Zero"
          title={
            <>
              Week zero is the brief. <span className="text-[#1e68e5]">Seven questions, no inventory list.</span>
            </>
          }
          intro="Tick off each question you can already answer for your next campaign."
        />

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r={R} fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r={R}
                    fill="none"
                    stroke="url(#brief-grad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    animate={{ strokeDashoffset: CIRC * (1 - count / QUESTIONS.length) }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                  <defs>
                    <linearGradient id="brief-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-extrabold text-[#14235d] tabular-nums">
                    {count}/{QUESTIONS.length}
                  </div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-wider">answered</div>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={complete ? 'done' : checked[6] ? 'seventh' : 'open'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-5 text-sm max-w-[260px] ${complete ? 'text-emerald-700 font-semibold' : 'text-gray-600'}`}
                >
                  {complete
                    ? 'That’s a brief we can grade. Let’s build the flight.'
                    : 'The quality of the seventh decides whether the campaign can be graded at all.'}
                </motion.p>
              </AnimatePresence>
            </div>

            <ol className="lg:col-span-8 space-y-2.5">
              {QUESTIONS.map((q, i) => {
                const on = checked[i];
                const seventh = i === QUESTIONS.length - 1;
                return (
                  <li key={q}>
                    <button
                      type="button"
                      onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                      className={`w-full flex items-center gap-4 rounded-2xl border px-4 sm:px-5 py-3.5 text-left transition-all duration-200 cursor-pointer ${
                        on
                          ? 'bg-[#0f1d4a] border-[#0f1d4a] text-white shadow-md'
                          : seventh
                            ? 'bg-white border-[#1e68e5]/40 hover:border-[#1e68e5]'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                      aria-pressed={on}
                    >
                      <span
                        className={`flex-none w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          on ? 'bg-emerald-400 text-[#0b1437]' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {on ? <Check className="w-4 h-4" strokeWidth={3} /> : i + 1}
                      </span>
                      <span className={`font-semibold text-sm sm:text-base ${on ? 'text-white' : 'text-[#14235d]'}`}>{q}</span>
                      {seventh && !on && <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#1e68e5]">The one that matters</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
