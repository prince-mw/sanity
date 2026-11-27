'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';

// Follow / Prove / Return colour cue from the URL2IRL deck: cyan, purple, green.
export const COLORS = {
  navy: '#0b1437',
  navyMid: '#0f1d4a',
  ink: '#14235d',
  cyan: '#22d3ee',
  violet: '#a78bfa',
  green: '#34d399',
};

export const RANGE_CLASS =
  'w-full h-1.5 appearance-none rounded-full bg-white/15 cursor-pointer outline-none ' +
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-[0_0_0_5px_rgba(34,211,238,0.25)] [&::-webkit-slider-thumb]:cursor-grab ' +
  '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyan-400 [&::-moz-range-thumb]:border-0';

// The Insights Report is gated behind Rukshana's Zoho quiz (QuizSection, #get-the-report); the
// PDF is emailed at the end. The hero button scrolls to the quiz. Set false to hide it again.
export const REPORT_CTA_LIVE = true;

export function CountUp({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.4,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, { duration, ease: 'easeOut', onUpdate: (v) => setVal(v) });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  const finalText = `${prefix}${to.toFixed(decimals)}${suffix}`;
  return (
    <span ref={ref} className={className} aria-label={finalText}>
      <span aria-hidden="true">
        {prefix}
        {val.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  dark = false,
  accent,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
  accent?: string;
}) {
  return (
    <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
      <span
        className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase ${dark ? 'text-blue-200/80' : 'text-[#1e68e5]'}`}
      >
        <span className="w-6 h-px" style={{ backgroundColor: accent || (dark ? COLORS.cyan : '#1e68e5') }} />
        {eyebrow}
        <span className="w-6 h-px" style={{ backgroundColor: accent || (dark ? COLORS.cyan : '#1e68e5') }} />
      </span>
      <h2
        className={`mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] ${dark ? 'text-white' : 'text-[#14235d]'}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base sm:text-lg leading-relaxed ${dark ? 'text-blue-100/80' : 'text-gray-600'}`}>{intro}</p>
      )}
    </Reveal>
  );
}

export function SourceNote({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`mt-6 text-[11px] leading-relaxed text-center max-w-3xl mx-auto ${dark ? 'text-blue-200/50' : 'text-gray-400'}`}>
      {children}
    </p>
  );
}
