"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { CHEVRON, MW, WAVE, WAVE_OUTLINE } from "./brand";

/** The triple chevron that precedes a kicker, drawing in left to right. */
export function Chevron({ size = 22, color = MW.blue }: { size?: number; color?: string }) {
  const h = (size / CHEVRON.w) * CHEVRON.h;
  return (
    <motion.svg initial="hidden" whileInView="show" viewport={{ once: true }} width={size} height={h} viewBox={`0 0 ${CHEVRON.w} ${CHEVRON.h}`} aria-hidden="true">
      {CHEVRON.ds.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill={color}
          variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0, transition: { delay: i * 0.12, duration: 0.4 } } }}
        />
      ))}
    </motion.svg>
  );
}

/** Small uppercase line with its chevron, as on the brand's slides. */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: MW.blue }}>
      <Chevron />
      <span>{children}</span>
    </div>
  );
}

/**
 * The wave band: filled and outline units alternate, which is the brand's
 * pattern (a row of identical units is just a zigzag). It drifts slowly.
 */
export function WaveBand({ height = 18, units = 10 }: { height?: number; units?: number }) {
  const reduce = useReducedMotion();
  const s = height / WAVE.h;
  const step = WAVE.w * s;
  const width = step * units;
  return (
    <div className="overflow-hidden" style={{ height }} aria-hidden="true">
      <motion.svg
        width={width * 2}
        height={height}
        animate={reduce ? undefined : { x: [0, -step * 2] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <linearGradient id="mw-wave" x1="0" x2="1">
            <stop offset="0" stopColor={MW.blue} />
            <stop offset="1" stopColor={MW.sky} />
          </linearGradient>
        </defs>
        {Array.from({ length: units * 2 }, (_, i) => (
          <path
            key={i}
            d={i % 2 ? WAVE_OUTLINE.d : WAVE.d}
            transform={`translate(${i * step} 0) scale(${s})`}
            fill={i % 2 ? "none" : "url(#mw-wave)"}
            stroke={i % 2 ? MW.sky : "none"}
            strokeWidth={i % 2 ? 1.6 / s : 0}
          />
        ))}
      </motion.svg>
    </div>
  );
}

/** Counts up to a number once it scrolls into view. */
export function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1400);
      setV(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}
