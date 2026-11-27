'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { COLORS, RANGE_CLASS, Reveal, SectionHeader, SourceNote } from './shared';

const PARITY = 1.55;
const PARITY_HONEST = 1.93;

function ParityLaw() {
  const [feed, setFeed] = useState(4);
  const [street, setStreet] = useState(5.1);
  const breakEven = feed * PARITY;
  const ratio = street / feed;
  const move = street <= breakEven;
  const gauge = (r: number) => Math.min(100, Math.max(0, ((r - 0.5) / 2) * 100));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold">The feed and the street finally share an exchange rate.</h3>
        <p className="mt-3 text-sm text-blue-100/75 leading-relaxed">
          A verified street impression carries more real, brand-linked exposure than a feed impression. So it can cost up to{' '}
          <strong className="text-white">1.55&times;</strong> your feed CPM and still deliver as much per dollar. Try your own numbers.
        </p>

        <div className="mt-7 space-y-6">
          <label className="block">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-blue-100/80">Your feed CPM</span>
              <span className="font-bold tabular-nums">${feed.toFixed(2)}</span>
            </div>
            <input type="range" min={1} max={10} step={0.1} value={feed} onChange={(e) => setFeed(parseFloat(e.target.value))} className={RANGE_CLASS} />
          </label>
          <label className="block">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-blue-100/80">Verified street CPM</span>
              <span className="font-bold tabular-nums">${street.toFixed(2)}</span>
            </div>
            <input type="range" min={1} max={20} step={0.1} value={street} onChange={(e) => setStreet(parseFloat(e.target.value))} className={RANGE_CLASS} />
          </label>
        </div>
        <p className="mt-4 text-[11px] text-blue-100/50">CPMs are illustrative. In a workshop we compute your rate from your own plan.</p>
      </div>

      <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-7">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-blue-100/50">Feed CPM</div>
            <div className="text-xl sm:text-2xl font-extrabold tabular-nums">${feed.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-blue-100/50">&times; 1.55 parity</div>
            <div className="text-xl sm:text-2xl font-extrabold tabular-nums" style={{ color: COLORS.cyan }}>
              ${breakEven.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-blue-100/50">Street costs</div>
            <div className="text-xl sm:text-2xl font-extrabold tabular-nums">${street.toFixed(2)}</div>
          </div>
        </div>

        {/* Gauge: 0.5x to 2.5x of feed CPM */}
        <div className="mt-8">
          <div className="relative h-5 text-[10px] text-blue-100/50">
            <span className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${gauge(PARITY_HONEST)}%` }}>
              1.93&times; &middot; feed scored honestly
            </span>
          </div>
          <div className="relative h-3">
            <div className="absolute inset-0 rounded-full overflow-hidden flex">
              <div style={{ width: `${gauge(PARITY)}%`, backgroundColor: `${COLORS.green}88` }} />
              <div className="flex-1 bg-white/10" />
            </div>
            <div className="absolute -top-1.5 -bottom-1.5 w-0.5 bg-white" style={{ left: `${gauge(PARITY)}%` }} />
            <div className="absolute -top-1.5 -bottom-1.5 w-0.5 bg-white/40" style={{ left: `${gauge(PARITY_HONEST)}%` }} />
            <motion.div
              className="absolute top-1/2 w-5 h-5 -translate-y-1/2 -translate-x-1/2 rounded-full border-[3px] border-[#0b1437] shadow-lg"
              animate={{ left: `${gauge(ratio)}%`, backgroundColor: move ? COLORS.green : '#fbbf24' }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            />
          </div>
          <div className="relative h-5 mt-2 text-[10px] text-blue-100/70">
            <span className="absolute left-0">0.5&times;</span>
            <span className="absolute -translate-x-1/2 whitespace-nowrap font-semibold text-white" style={{ left: `${gauge(PARITY)}%` }}>
              1.55&times; break-even
            </span>
            <span className="absolute right-0">2.5&times;</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={move ? 'move' : 'hold'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 rounded-2xl p-5 text-center"
            style={{ backgroundColor: move ? `${COLORS.green}1f` : 'rgba(251,191,36,0.12)' }}
          >
            <div className="text-3xl font-extrabold" style={{ color: move ? COLORS.green : '#fbbf24' }}>
              {move ? 'Move it.' : 'Hold, or test first.'}
            </div>
            <div className="mt-1 text-xs text-blue-100/70">
              Street at {ratio.toFixed(2)}&times; your feed CPM &mdash; {move ? 'below' : 'above'} the 1.55&times; break-even.
            </div>
          </motion.div>
        </AnimatePresence>
        <p className="mt-4 text-xs text-center text-blue-100/60">Your split stops being a habit. It becomes arithmetic.</p>
      </div>
    </div>
  );
}

const PLATFORMS = [
  { name: 'Instagram', phi: 0.62, label: 'Sells reach' },
  { name: 'YouTube', phi: 0.85, label: 'Sells a second meeting' },
];
const UNIQUES = 957;

function ReachSplit() {
  const [phi, setPhi] = useState(0.62);
  const preset = PLATFORMS.find((p) => Math.abs(p.phi - phi) < 0.005);
  const fresh = Math.round(UNIQUES * (1 - phi));
  const twice = UNIQUES - fresh;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold">One set of screens. Two different products.</h3>
        <p className="mt-3 text-sm text-blue-100/75 leading-relaxed">
          In one two-week flight, <strong className="text-white">957K unique people</strong> passed the screens. How many of them are already on
          the platform you&apos;re moving money from decides what the street sells you.
        </p>
        <div className="mt-6 flex gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setPhi(p.phi)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer transition-colors ${
                preset?.name === p.name ? 'bg-white text-[#0b1437] border-white' : 'border-white/20 text-blue-100/80 hover:bg-white/10'
              }`}
            >
              {p.name} &middot; {Math.round(p.phi * 100)}%
            </button>
          ))}
        </div>
        <label className="block mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-100/80">Share already on the platform (&Phi;)</span>
            <span className="font-bold tabular-nums">{Math.round(phi * 100)}%</span>
          </div>
          <input type="range" min={0.1} max={0.95} step={0.01} value={phi} onChange={(e) => setPhi(parseFloat(e.target.value))} className={RANGE_CLASS} />
        </label>
      </div>

      <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-7 flex flex-col justify-center">
        <div className="text-[11px] uppercase tracking-wider text-blue-100/50">{preset ? `${preset.name} · ${preset.label}` : 'Custom overlap'}</div>
        <div className="mt-4 h-14 rounded-2xl overflow-hidden flex text-xs font-bold">
          <motion.div className="h-full flex items-center justify-center text-[#0b1437]" style={{ backgroundColor: COLORS.cyan }} animate={{ width: `${(1 - phi) * 100}%` }} transition={{ type: 'spring', stiffness: 200, damping: 26 }}>
            {1 - phi > 0.14 && `${fresh}K`}
          </motion.div>
          <motion.div className="h-full flex items-center justify-center text-white" style={{ backgroundColor: '#8b5cf6' }} animate={{ width: `${phi * 100}%` }} transition={{ type: 'spring', stiffness: 200, damping: 26 }}>
            {phi > 0.14 && `${twice}K`}
          </motion.div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <div className="text-3xl font-extrabold tabular-nums" style={{ color: COLORS.cyan }}>
              {fresh}K
            </div>
            <div className="text-xs text-blue-100/70">new reach &mdash; people the feed cannot touch</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold tabular-nums text-violet-300">{twice}K</div>
            <div className="text-xs text-blue-100/70">to meet twice &mdash; feed and street together</div>
          </div>
        </div>
        <p className="mt-5 text-xs text-blue-100/60">Low overlap buys new people. High overlap buys a second meeting.</p>
      </div>
    </div>
  );
}

const FORECASTS = [
  { name: 'YouTube', value: 26.3, verdict: 'Clears every bar · earns a test', pass: true },
  { name: 'Instagram', value: 19.9, verdict: '0.1 under the +20 bar · sent back', pass: false },
];

function TransferForecast() {
  const [sel, setSel] = useState(0);
  const f = FORECASTS[sel];
  const s = (v: number) => (v / 32) * 100;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold">It can say no. That&apos;s why its yes counts.</h3>
        <p className="mt-3 text-sm text-blue-100/75 leading-relaxed">
          One measured lift goes in, from 50+ controlled flights. Then three filters, and every one of them can only cut it down.
        </p>
        <div className="mt-6 space-y-2">
          {[
            { t: 'Measured lift', d: 'A measured number, not an estimate' },
            { t: '× Platform advantage', d: 'Damped by half: a 41% edge banks as 19%' },
            { t: '× Creative fit', d: 'Capped at 1.0 — it can cut, never add' },
            { t: '× Audience match', d: 'Capped at 1.0 — it can cut, never add' },
          ].map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5"
            >
              <span className="text-sm font-bold">{r.t}</span>
              <span className="text-[11px] text-blue-100/60 text-right">{r.d}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-7 flex flex-col justify-center">
        <div className="flex gap-2">
          {FORECASTS.map((x, i) => (
            <button
              key={x.name}
              type="button"
              onClick={() => setSel(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer transition-colors ${
                sel === i ? 'bg-white text-[#0b1437] border-white' : 'border-white/20 text-blue-100/80 hover:bg-white/10'
              }`}
            >
              {x.name}
            </button>
          ))}
        </div>
        <div className="mt-8 relative h-12 rounded-xl bg-white/5">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-xl"
            animate={{ width: `${s(f.value)}%`, backgroundColor: f.pass ? COLORS.green : 'rgba(255,255,255,0.3)' }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          />
          <div className="absolute -top-2 -bottom-2 w-0.5 bg-white" style={{ left: `${s(20)}%` }} />
          <span className="absolute -top-6 text-[11px] text-blue-100/70 -translate-x-1/2" style={{ left: `${s(20)}%` }}>
            +20 bar
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={f.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6">
            <div className="text-5xl font-extrabold tabular-nums" style={{ color: f.pass ? COLORS.green : 'rgba(255,255,255,0.7)' }}>
              +{f.value}
            </div>
            <div className="mt-1 text-sm text-blue-100/80">{f.verdict}</div>
          </motion.div>
        </AnimatePresence>
        <p className="mt-5 text-xs text-blue-100/60">A passing forecast earns a test, never spend.</p>
      </div>
    </div>
  );
}

function TheStudy() {
  return (
    <div className="text-center max-w-2xl mx-auto py-6">
      <ShieldCheck className="w-14 h-14 mx-auto" style={{ color: COLORS.green }} />
      <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold">The controlled study decides.</h3>
      <p className="mt-3 text-blue-100/80 leading-relaxed">
        Blind, matched, against a published norm. The only link in the chain with authority. Three bars cleared in six months is what turns a
        test into a standing line in the plan.
      </p>
    </div>
  );
}

const STEPS = [
  { q: 'Should it move?', model: 'The Parity Law', C: ParityLaw },
  { q: 'What does it buy?', model: 'The Reach Split', C: ReachSplit },
  { q: 'Where next?', model: 'The Transfer Forecast', C: TransferForecast },
  { q: 'Did it work?', model: 'The controlled study', C: TheStudy },
];

export const ModelsSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const Current = STEPS[step].C;

  return (
    <section
      id="the-models"
      className="scroll-mt-32 py-16 sm:py-20 lg:py-24 text-white relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${COLORS.navyMid} 0%, ${COLORS.navy} 100%)` }}
    >
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${COLORS.cyan}12` }} />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          eyebrow="What Changes"
          title={
            <>
              Three models recommend. <span style={{ color: COLORS.green }}>One experiment decides.</span>
            </>
          }
          intro="Every planning season has the same argument: how much should leave the feed, what will it buy, and where next? Here it's settled by a chain."
        />

        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mb-8">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.q}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className={`rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    step === i ? 'bg-white text-[#0b1437] border-white shadow-lg' : 'border-white/15 text-blue-100/70 hover:bg-white/10'
                  }`}
                >
                  <span className="hidden sm:inline text-[10px] font-mono opacity-60 mr-1.5">{i < 3 ? `Model ${i + 1}` : 'Verdict'}</span>
                  {s.q}
                </button>
                {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-blue-100/30" />}
              </React.Fragment>
            ))}
          </div>

          <div className="rounded-3xl bg-[#0b1437]/60 border border-white/10 p-6 sm:p-10 min-h-[420px] backdrop-blur-sm">
            <div className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: COLORS.cyan }}>
              {STEPS[step].model}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <Current />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <SourceNote dark>
          Moving Walls Science models. 1.55&times; is the rate across Moving Walls studies (1.93&times; with feed linkage scored like-for-like); &Phi; is
          measured per corridor; 957K is an example two-week flight. Alone, each model is a calculator &mdash; the value is in the order, and only the
          last one decides.
        </SourceNote>
      </div>
    </section>
  );
};
