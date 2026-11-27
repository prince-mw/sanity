'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Download, Smartphone, MapPin, CheckCircle2 } from 'lucide-react';
import { COLORS, REPORT_CTA_LIVE } from './shared';

const LOOP_MS = 7200;
const CX = 200;
const CY = 200;
const R = 150;

const STAGES = [
  { move: 'Follow', label: 'Out of the phone', detail: 'Meet the audience you already bought, where they are.', color: COLORS.cyan, angle: -90, icon: Smartphone },
  { move: 'Prove', label: 'Into the world', detail: 'Grade every move against matched twins, bar set first.', color: COLORS.violet, angle: 30, icon: MapPin },
  { move: 'Return', label: 'Back with proof', detail: 'Bring those people back to your own ad accounts.', color: COLORS.green, angle: 150, icon: CheckCircle2 },
];

function polar(deg: number, r = R) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function arcPath(fromDeg: number, toDeg: number) {
  const a = polar(fromDeg);
  const b = polar(toDeg);
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`;
}

function LoopVisual() {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      setT(((now - start) % LOOP_MS) / LOOP_MS);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const active = Math.min(2, Math.max(0, Math.floor(t * 3)));
  const dot = polar(-90 + t * 360);
  const stage = STAGES[active];

  return (
    <div className="relative w-full max-w-[440px] mx-auto aspect-square">
      <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <filter id="u2i-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={CX} cy={CY} r={R + 34} fill="none" stroke="white" strokeOpacity="0.06" strokeDasharray="2 8" />
        <circle cx={CX} cy={CY} r={R - 46} fill="none" stroke="white" strokeOpacity="0.05" />

        {STAGES.map((s, i) => (
          <path
            key={s.move}
            d={arcPath(s.angle + 9, s.angle + 111)}
            fill="none"
            stroke={s.color}
            strokeWidth={i === active ? 5 : 3}
            strokeLinecap="round"
            strokeOpacity={i === active ? 1 : 0.28}
            style={{ transition: 'stroke-opacity 400ms, stroke-width 400ms' }}
          />
        ))}

        {STAGES.map((s, i) => {
          const p = polar(s.angle);
          const on = i === active;
          return (
            <g key={s.move}>
              {on && (
                <circle cx={p.x} cy={p.y} r="22" fill={s.color} opacity="0.25">
                  <animate attributeName="r" from="16" to="34" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.45" to="0" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={p.x} cy={p.y} r="16" fill={COLORS.navy} stroke={s.color} strokeWidth={on ? 3 : 2} strokeOpacity={on ? 1 : 0.5} />
              <circle cx={p.x} cy={p.y} r="5" fill={s.color} opacity={on ? 1 : 0.5} />
            </g>
          );
        })}

        <circle cx={dot.x} cy={dot.y} r="7" fill="white" filter="url(#u2i-glow)" />
      </svg>

      {/* Node labels */}
      {STAGES.map((s, i) => {
        const p = polar(s.angle, R + 58);
        return (
          <div
            key={s.move}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
            style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%` }}
          >
            <div
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] transition-opacity duration-300"
              style={{ color: s.color, opacity: i === active ? 1 : 0.55 }}
            >
              {s.move}
            </div>
          </div>
        );
      })}

      {/* Centre readout */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[52%] text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.move}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <stage.icon className="w-7 h-7 mx-auto mb-2" style={{ color: stage.color }} />
              <div className="text-lg sm:text-xl font-extrabold text-white leading-tight">{stage.label}</div>
              <p className="mt-2 text-[11px] sm:text-xs text-blue-100/70 leading-snug">{stage.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden text-white pt-24 sm:pt-28 lg:pt-28 pb-16 sm:pb-20 lg:pb-24"
      style={{ background: `radial-gradient(ellipse at 70% 40%, #1a2d78 0%, ${COLORS.navyMid} 45%, ${COLORS.navy} 100%)` }}
    >
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${COLORS.cyan}1a` }} />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${COLORS.violet}14` }} />

      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-7 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: COLORS.cyan }} />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-100">URL &rarr; IRL &middot; Insights Report</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold tracking-tight leading-[1.08]">
              {[
                { text: 'Out of the phone.', color: COLORS.cyan },
                { text: 'Into the world.', color: COLORS.violet },
                { text: 'Back with proof.', color: COLORS.green },
              ].map((line, i) => (
                <motion.span
                  key={line.text}
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-white">{line.text.split(' ').slice(0, -1).join(' ')} </span>
                  <span style={{ color: line.color }}>{line.text.split(' ').slice(-1)}</span>
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-7 text-base sm:text-lg text-blue-100/85 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              The fair test for advertising in the real world. Follow the audience you already bought out of the phone,
              prove what changed against matched twins, and bring those people back to your own ad accounts &mdash; on every
              campaign flight.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              {/* Scrolls to the Zoho quiz that gates the report (REPORT_CTA_LIVE in shared.tsx). */}
              {REPORT_CTA_LIVE && (
                <a
                  href="#get-the-report"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#14235d] font-semibold text-[15px] px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-[0.98] w-full sm:w-auto"
                  id="hero-download-report-btn"
                >
                  <Download className="w-4 h-4" />
                  <span>Get the Insights Report</span>
                </a>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left"
            >
              {[
                { v: '50+', l: 'controlled flights and counting' },
                { v: '9 of 9', l: 'reported flights with positive lift' },
                { v: '+24', l: 'mean favourability lift, top box' },
              ].map((s) => (
                <div key={s.l} className="border-l border-white/15 pl-3">
                  <div className="text-2xl font-extrabold text-white">{s.v}</div>
                  <div className="text-[11px] text-blue-100/60 leading-tight mt-0.5">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <LoopVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
