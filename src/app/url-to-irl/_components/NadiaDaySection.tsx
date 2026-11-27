'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Play, Pause, Smartphone, MapPin, Car, ShoppingBag, Home } from 'lucide-react';
import { COLORS, RANGE_CLASS, SectionHeader, SourceNote } from './shared';

const DAY_START = 6;
const DAY_END = 24;

// Illustrative scrolling windows (breakfast, lunch, a break, night) totalling 3½ hrs,
// per the Insights Report: "A feed reaches her for roughly three and a half hours a day."
const FEED = [
  [6.5, 7.25],
  [12.5, 13.25],
  [15.5, 16.25],
  [21.25, 22.5],
] as const;

const MOMENTS = [
  { at: 7.75, time: '07:45', title: 'Drives the Federal Highway', note: 'Passes six screens on the way in', icon: Car },
  { at: 12.25, time: '12:15', title: 'Lunch at the mall', note: 'Walks past three more', icon: ShoppingBag },
  { at: 18.67, time: '18:40', title: 'Stuck in traffic', note: 'Fifty minutes. Eyes up, phone down.', icon: Car, highlight: true },
  { at: 21.08, time: '21:05', title: 'Searches, compares, signs up', note: 'The decision happens at home', icon: Home },
];

const pct = (h: number) => ((h - DAY_START) / (DAY_END - DAY_START)) * 100;

function feedHoursUntil(h: number) {
  return FEED.reduce((sum, [s, e]) => sum + Math.max(0, Math.min(e, h) - s), 0);
}

function fmt(h: number) {
  const hh = Math.floor(h) % 24;
  const mm = Math.round((h - Math.floor(h)) * 60);
  const m = mm === 60 ? 0 : mm;
  const H = mm === 60 ? (hh + 1) % 24 : hh;
  return `${String(H).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export const NadiaDaySection: React.FC = () => {
  const [hour, setHour] = useState(DAY_START);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const reduce = useReducedMotion();
  const autoplayed = useRef(false);

  useEffect(() => {
    if (inView && !autoplayed.current) {
      autoplayed.current = true;
      if (reduce) setHour(DAY_END);
      else setPlaying(true);
    }
  }, [inView, reduce]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.max(0, (now - last) / 1000);
      last = now;
      setHour((h) => Math.min(DAY_END, h + dt * 2.2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  useEffect(() => {
    if (playing && hour >= DAY_END) setPlaying(false);
  }, [playing, hour]);

  const feedH = feedHoursUntil(hour);
  const worldH = Math.max(0, hour - DAY_START - feedH);
  const inFeed = FEED.some(([s, e]) => hour >= s && hour < e);
  const moment = [...MOMENTS].reverse().find((m) => hour >= m.at && hour - m.at < 1.6);
  const done = hour >= DAY_END - 0.01;

  return (
    <section id="the-need" className="scroll-mt-32 py-16 sm:py-20 lg:py-24 bg-white text-[#1b1b20]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Need"
          title={
            <>
              Your customers don&apos;t live in the digital feed.{' '}
              <span className="text-[#1e68e5]">They pass through it.</span>
            </>
          }
          intro="Meet Nadia, 31, Kuala Lumpur. Press play, or drag through her day."
        />

        <div ref={ref} className="bg-[#0b1437] rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${COLORS.cyan}14` }} />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            {/* Clock + status */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (done) setHour(DAY_START);
                    setPlaying((p) => !p);
                  }}
                  className="w-11 h-11 rounded-full bg-white text-[#0b1437] flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  aria-label={playing ? 'Pause' : 'Play Nadia’s day'}
                >
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="font-mono text-4xl sm:text-5xl font-bold tabular-nums tracking-tight">{fmt(Math.min(hour, 23.99))}</div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-colors"
                  style={
                    inFeed
                      ? { backgroundColor: `${COLORS.cyan}26`, color: COLORS.cyan }
                      : { backgroundColor: 'rgba(255,255,255,0.08)', color: '#c7d2fe' }
                  }
                >
                  {inFeed ? <Smartphone className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                  {inFeed ? 'In her feed' : 'In the world'}
                </span>
              </div>

              <div className="mt-5 flex-1 min-h-[112px]">
                <AnimatePresence mode="wait">
                  {moment ? (
                    <motion.div
                      key={moment.time}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`rounded-2xl p-4 border ${moment.highlight ? 'border-emerald-400/50 bg-emerald-400/10' : 'border-white/10 bg-white/5'}`}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-200/80">
                        <moment.icon className="w-4 h-4" />
                        {moment.time}
                      </div>
                      <div className="mt-1.5 text-lg font-bold">{moment.title}</div>
                      <div className="text-sm text-blue-100/70">{moment.note}</div>
                      {moment.highlight && (
                        <div className="mt-2 text-xs font-semibold" style={{ color: COLORS.green }}>
                          This is the hour we buy &mdash; the drive home, before she decides.
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.p
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-blue-100/50 pt-2"
                    >
                      {done
                        ? 'One decision, made at home, after the day has primed it.'
                        : 'Her day goes on, mostly where no media plan can see it.'}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Timeline + counters */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="relative h-14 sm:h-16 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                  {/* elapsed world time */}
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1e3a8a] to-[#1e68e5] opacity-70" style={{ width: `${pct(hour)}%` }} />
                  {/* feed windows */}
                  {FEED.map(([s, e]) => (
                    <div
                      key={s}
                      className="absolute inset-y-0 transition-opacity"
                      style={{
                        left: `${pct(s)}%`,
                        width: `${pct(e) - pct(s)}%`,
                        backgroundColor: COLORS.cyan,
                        opacity: hour >= s ? 0.95 : 0.25,
                      }}
                    />
                  ))}
                  {/* moments */}
                  {MOMENTS.map((m) => (
                    <div
                      key={m.time}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white transition-colors"
                      style={{ left: `${pct(m.at)}%`, backgroundColor: hour >= m.at ? (m.highlight ? COLORS.green : 'white') : 'transparent' }}
                    />
                  ))}
                  {/* playhead */}
                  <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_white]" style={{ left: `${pct(hour)}%` }} />
                </div>

                <input
                  type="range"
                  min={DAY_START}
                  max={DAY_END}
                  step={0.05}
                  value={hour}
                  onChange={(e) => {
                    setPlaying(false);
                    setHour(parseFloat(e.target.value));
                  }}
                  className={`${RANGE_CLASS} mt-4 mb-2`}
                  aria-label="Time of day"
                />
                <div className="flex justify-between text-[10px] sm:text-xs text-blue-200/50 font-mono">
                  {['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'].map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-2xl sm:text-4xl font-extrabold tabular-nums" style={{ color: COLORS.cyan }}>
                    {feedH.toFixed(1)}h
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs text-blue-100/70 leading-snug">in her feeds &mdash; the part your plan can see</div>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-2xl sm:text-4xl font-extrabold tabular-nums text-white">{worldH.toFixed(1)}h</div>
                  <div className="mt-1 text-[11px] sm:text-xs text-blue-100/70 leading-snug">in the world &mdash; the part nobody proves</div>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-2xl sm:text-4xl font-extrabold tabular-nums" style={{ color: hour >= 21.08 ? COLORS.green : 'rgba(255,255,255,0.3)' }}>
                    {hour >= 21.08 ? 1 : 0}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs text-blue-100/70 leading-snug">decision, made at home after the day primed it</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SourceNote>
          Nadia is illustrative. A feed reaches her for roughly three and a half hours a day; the other twenty hours were never
          measurable, so they were never fundable (URL2IRL Insights Report, Moving Walls, 2026).
        </SourceNote>
      </div>
    </section>
  );
};
