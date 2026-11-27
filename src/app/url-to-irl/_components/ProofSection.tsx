'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS, CountUp, Reveal, SectionHeader, SourceNote } from './shared';

const LAYERS = [
  { label: 'Matched twins', value: 33, lift: null as number | null, color: '#cbd5e1' },
  { label: 'Saw it in the real world', value: 55, lift: 22, color: '#8b5cf6' },
  { label: 'Also saw it in the digital feed', value: 62, lift: 29, color: '#1e68e5' },
];

const TIERS = [
  { label: 'Like it a lot', twins: 32, saw: 63 },
  { label: 'Quite like it', twins: 33, saw: 22 },
  { label: 'Neutral', twins: 33, saw: 13 },
  { label: 'Slightly dislike', twins: 1, saw: 2 },
  { label: 'Dislike a lot', twins: 1, saw: 0 },
];

const BRANDS = [
  { name: 'Body scrub launch', v: 41, metric: 'purchase intent' },
  { name: 'Hair care icon', v: 34, metric: 'favourability' },
  { name: 'Derma skincare leader', v: 31, metric: 'favourability' },
  { name: 'Beauty soap heritage', v: 30, metric: 'favourability' },
  { name: 'Skincare challenger', v: 22, metric: 'purchase intent' },
  { name: 'Cosmetics leader', v: 19, metric: 'purchase intent' },
  { name: 'Body care leader', v: 11, metric: 'purchase intent, missed the +18 norm', directional: true },
];

export const ProofSection: React.FC = () => {
  const [showSaw, setShowSaw] = useState(true);

  return (
    <section id="the-proof" className="scroll-mt-32 py-16 sm:py-20 lg:py-24 bg-white text-[#1b1b20]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Proof"
          title={
            <>
              Even TikTok <span className="text-[#1e68e5]">put its own brand on the line.</span>
            </>
          }
          intro="Platforms rarely let an outside instrument grade their own brand. TikTok did the opposite, commissioning a controlled study on its own brand for a LIVE event in Vietnam."
        />

        {/* Platform result */}
        <Reveal>
          <div className="rounded-3xl bg-[#0b1437] text-white p-6 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: `${COLORS.violet}26` }} />
            {[
              { to: 36, prefix: '+', note: 'favourability, against a category norm of +20' },
              { to: 33, prefix: '+', note: 'purchase intent, against a norm of +18' },
              { to: 14, prefix: '+', note: 'named first, unprompted: 18% → 32%' },
              { to: 75, suffix: '%', note: 'of people who saw it (vs 41% of twins) said feed + street made the message more believable' },
            ].map((s, i) => (
              <div key={i} className="relative">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} className="text-4xl sm:text-5xl font-extrabold" />
                <p className="mt-2 text-xs sm:text-sm text-blue-100/75 leading-snug">{s.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feed + street */}
          <Reveal>
            <div className="h-full rounded-3xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#14235d]">In-Real-World lifts the brand. With the feed, it reads higher.</h3>
              <p className="mt-2 text-sm text-gray-500">Favourability (top box), points against matched twins</p>
              <div className="mt-8 flex items-end justify-around gap-4 h-64">
                {LAYERS.map((l, i) => (
                  <div key={l.label} className="flex flex-col items-center justify-end h-full w-24">
                    {l.lift !== null && (
                      <motion.span
                        className="mb-1 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: l.color }}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.2 }}
                      >
                        +{l.lift}
                      </motion.span>
                    )}
                    <div className="text-2xl font-extrabold text-[#14235d] mb-1">{l.value}%</div>
                    <motion.div
                      className="w-full rounded-t-xl"
                      style={{ backgroundColor: l.color }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(l.value / 70) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.2, ease: 'easeOut' }}
                    />
                    <div className="mt-2 text-[11px] text-center text-gray-500 leading-tight h-8">{l.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-400">
                On the street, +22 is the robust number. The feed + street cell is 52 people (&plusmn;15 points), so read the extra seven as
                directional.
              </p>
            </div>
          </Reveal>

          {/* Fingerprint */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-gray-200 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#14235d]">A real result has a fingerprint. The undecided move.</h3>
                  <p className="mt-2 text-sm text-gray-500">Toggle to see where the gain came from.</p>
                </div>
              </div>
              <div className="mt-5 inline-flex bg-gray-100 rounded-full p-1">
                {[
                  { k: false, l: 'Twins' },
                  { k: true, l: 'Saw it' },
                ].map((o) => (
                  <button
                    key={o.l}
                    type="button"
                    onClick={() => setShowSaw(o.k)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                      showSaw === o.k ? 'bg-[#0f1d4a] text-white' : 'text-gray-500'
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {TIERS.map((t) => {
                  const v = showSaw ? t.saw : t.twins;
                  const d = t.saw - t.twins;
                  return (
                    <div key={t.label} className="grid grid-cols-[110px_1fr_48px] items-center gap-3">
                      <span className="text-sm text-gray-600">{t.label}</span>
                      <div className="h-6 rounded-md bg-gray-100 overflow-hidden">
                        <motion.div
                          className="h-full rounded-md"
                          animate={{ width: `${v}%`, backgroundColor: showSaw ? '#8b5cf6' : '#94a3b8' }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[#14235d] text-right tabular-nums">
                        {showSaw && d !== 0 ? (
                          <span className={d > 0 ? 'text-violet-600' : 'text-gray-400'}>
                            {d > 0 ? '+' : '−'}
                            {Math.abs(d)}
                          </span>
                        ) : (
                          `${v}%`
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-sm text-gray-600">
                &ldquo;Like it a lot&rdquo; nearly doubled, 32% &rarr; 63%, while &ldquo;neutral&rdquo; fell 20 points. Flattery would grow
                the warm tiers and leave the undecided alone. Here, the undecided moved.
              </p>
              <p className="mt-2 text-[11px] text-gray-400">Derma skincare leader (anonymised) &middot; Bangkok &middot; May 2026 &middot; 150 vs 150</p>
            </div>
          </Reveal>
        </div>

        {/* Toughest buyers */}
        <Reveal className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d]">The toughest buyers keep coming back.</h3>
            <p className="mt-2 text-gray-500">
              Global personal-care and beauty portfolios, flight after flight in Bangkok. Points against matched twins.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {BRANDS.map((b, i) => (
              <div key={b.name} className="group grid grid-cols-[150px_1fr_auto] sm:grid-cols-[200px_1fr_auto] items-center gap-3">
                <span className="text-sm font-semibold text-[#14235d]">{b.name}</span>
                <div className="h-8 rounded-lg bg-gray-100 overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-lg group-hover:brightness-110"
                    style={{ background: b.directional ? '#cbd5e1' : 'linear-gradient(90deg, #1e68e5, #8b5cf6)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(b.v / 45) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: 'easeOut' }}
                  />
                  <span className={`absolute inset-y-0 left-3 flex items-center text-xs font-bold ${b.directional ? 'text-[#14235d]' : 'text-white'}`}>+{b.v}</span>
                </div>
                <span className="text-[11px] text-gray-500 w-[90px] sm:w-[150px] leading-tight">{b.metric}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-base font-semibold text-[#14235d]">
            They didn&apos;t come back because the numbers flattered them. They came back because the numbers were usable.
          </p>
        </Reveal>

        <SourceNote>
          Moving Walls Measure, TikTok Out-of-Phone flights in Thailand and Vietnam, Feb&ndash;Jun 2026 &middot; 150 vs 150 per study &middot;
          brands reported by category. The body care leader (+11) missed the +18 purchase-intent norm from an 88% awareness baseline.
        </SourceNote>
      </div>
    </section>
  );
};
