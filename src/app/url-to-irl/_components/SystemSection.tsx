'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, Reveal, SectionHeader } from './shared';
import {
  ReindexVisual,
  DemandClockVisual,
  ProofOfPresenceVisual,
  TwinControlVisual,
  PassMarkVisual,
  OpenRulerVisual,
  AudienceReturnVisual,
  OneVerdictVisual,
  CategoryNormsVisual,
} from './SystemVisuals';

type MoveKey = 'follow' | 'prove' | 'return';

const MOVES: Record<
  MoveKey,
  { label: string; tagline: string; color: string; features: { name: string; line: string; Visual: React.FC }[] }
> = {
  follow: {
    label: 'Follow',
    tagline: 'Meet your audience where they are.',
    color: COLORS.cyan,
    features: [
      { name: 'Reindex', line: 'Plans from your search, social and sales.', Visual: ReindexVisual },
      { name: 'Demand Clock', line: 'Buys the hour before people decide.', Visual: DemandClockVisual },
      { name: 'Proof of Presence', line: 'Proves it played, and who passed.', Visual: ProofOfPresenceVisual },
    ],
  },
  prove: {
    label: 'Prove',
    tagline: 'Grade every move against a twin.',
    color: COLORS.violet,
    features: [
      { name: 'Twin Control', line: 'Compares people who saw it with twins.', Visual: TwinControlVisual },
      { name: 'Pass Mark', line: 'Sets the bar in advance.', Visual: PassMarkVisual },
      { name: 'Open Ruler', line: 'Prints the error bar on every result.', Visual: OpenRulerVisual },
    ],
  },
  return: {
    label: 'Return',
    tagline: 'Bring them back. Keep the lessons.',
    color: COLORS.green,
    features: [
      { name: 'Audience Return', line: 'Returns the people you met to your ads.', Visual: AudienceReturnVisual },
      { name: 'One Verdict', line: 'Brand and performance, on one clock.', Visual: OneVerdictVisual },
      { name: 'Category Norms', line: 'Turns every flight into your benchmark.', Visual: CategoryNormsVisual },
    ],
  },
};

const ORDER: MoveKey[] = ['follow', 'prove', 'return'];

export const SystemSection: React.FC = () => {
  const [move, setMove] = useState<MoveKey>('follow');
  const [featureIdx, setFeatureIdx] = useState(0);
  const m = MOVES[move];
  const feature = m.features[featureIdx];

  return (
    <section
      id="the-system"
      className="scroll-mt-32 py-16 sm:py-20 lg:py-24 text-white relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.navyMid} 100%)` }}
    >
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: `${m.color}1a` }}
      />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          eyebrow="The System"
          accent={m.color}
          title="One system. Three moves. Nine features."
          intro="Pick a move, then a feature. Online to offline and back, with a number at every step."
        />

        {/* Move selector */}
        <Reveal className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
          {ORDER.map((key, i) => {
            const mv = MOVES[key];
            const on = key === move;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setMove(key);
                  setFeatureIdx(0);
                }}
                className={`relative text-left rounded-2xl p-3 sm:p-5 border transition-all duration-300 cursor-pointer ${
                  on ? 'bg-white/10 shadow-xl' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
                style={on ? { borderColor: mv.color } : undefined}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-mono text-blue-100/50">0{i + 1}</span>
                  <span className="text-lg sm:text-2xl font-extrabold" style={{ color: on ? mv.color : 'white' }}>
                    {mv.label}
                  </span>
                </div>
                <div className="hidden sm:block mt-1 text-sm text-blue-100/70">{mv.tagline}</div>
                {on && <motion.span layoutId="move-underline" className="absolute left-4 right-4 -bottom-px h-0.5 rounded" style={{ backgroundColor: mv.color }} />}
              </button>
            );
          })}
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Feature list */}
          <div className="lg:col-span-4 flex lg:flex-col gap-2 sm:gap-3 overflow-x-auto lg:overflow-visible pb-1">
            {m.features.map((f, i) => {
              const on = i === featureIdx;
              return (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setFeatureIdx(i)}
                  className={`flex-none w-[220px] lg:w-auto text-left rounded-xl p-4 border transition-all duration-200 cursor-pointer ${
                    on ? 'bg-white text-[#0b1437] shadow-lg' : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] text-white'
                  }`}
                  style={on ? { borderColor: m.color } : undefined}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                    <span className="font-bold text-sm sm:text-base">{f.name}</span>
                  </div>
                  <div className={`mt-1 text-xs sm:text-sm ${on ? 'text-gray-600' : 'text-blue-100/60'}`}>{f.line}</div>
                </button>
              );
            })}
          </div>

          {/* Visual panel */}
          <div className="lg:col-span-8 rounded-3xl bg-[#0b1437]/70 border border-white/10 p-5 sm:p-7 min-h-[420px] backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${move}-${featureIdx}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-baseline justify-between gap-4 mb-5">
                  <h3 className="text-xl sm:text-2xl font-extrabold">{feature.name}</h3>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: m.color }}>
                    {m.label}
                  </span>
                </div>
                <feature.Visual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-blue-100/50 max-w-2xl mx-auto">
          One pseudonymous key per device, per campaign. Joined in a clean room. Expires with the campaign. Consented supply only; no names,
          emails or numbers in the chain.
        </p>
      </div>
    </section>
  );
};
