"use client";

import { motion } from "framer-motion";
import { MW } from "./brand";
import { CountUp, Kicker, WaveBand } from "./BrandBits";

// Summary of the "Digital Billboard Advertising Malaysia" copy: population,
// urbanisation, Kuala Lumpur, and the Klang Valley. Figures are the ones the
// section's own text states. No background, so it sits on any section colour.

const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: 0.15 + i * 0.15, duration: 0.6 },
});

export function MalaysiaAtAGlance() {
  const R = 46;
  const C = 2 * Math.PI * R;
  return (
    <figure
      className="w-full max-w-[520px] mx-auto md:pt-2"
      aria-label="Malaysia at a glance: over 33.4 million people, about 76% living in cities, over 1.8 million in Kuala Lumpur, and the Klang Valley as the prime area for advertising."
    >
      <Kicker>Malaysia at a glance</Kicker>

      <motion.div {...rise(0)} className="mt-5">
        <div className="text-6xl font-bold leading-none" style={{ color: MW.navy }}>
          <CountUp to={33.4} decimals={1} suffix="M" />
          <span style={{ color: MW.sky }}>+</span>
        </div>
        <div className="mt-2 text-base" style={{ color: MW.body }}>people across the country</div>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div {...rise(1)} className="flex items-center gap-4">
          <svg width="104" height="104" viewBox="0 0 104 104" aria-hidden="true" className="shrink-0">
            <defs>
              <linearGradient id="mw-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={MW.sky} />
                <stop offset="1" stopColor={MW.blue} />
              </linearGradient>
            </defs>
            <circle cx="52" cy="52" r={R} fill="none" stroke={MW.ice} strokeWidth="10" opacity="0.6" />
            <motion.circle
              cx="52" cy="52" r={R} fill="none" stroke="url(#mw-ring)" strokeWidth="10" strokeLinecap="round"
              transform="rotate(-90 52 52)"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              whileInView={{ strokeDashoffset: C * (1 - 0.76) }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.4, ease: "easeOut" }}
            />
            <text x="52" y="59" textAnchor="middle" fontSize="20" fontWeight="700" fill={MW.navy}>76%</text>
          </svg>
          <div className="text-sm leading-snug" style={{ color: MW.body }}>
            live in <strong style={{ color: MW.navy }}>cities</strong>
          </div>
        </motion.div>

        <motion.div {...rise(2)} className="flex flex-col justify-center">
          <div className="text-4xl font-bold leading-none" style={{ color: MW.blue }}>
            <CountUp to={1.8} decimals={1} suffix="M" />
          </div>
          <div className="mt-2 text-sm leading-snug" style={{ color: MW.body }}>
            residents in <strong style={{ color: MW.navy }}>Kuala Lumpur</strong>
          </div>
        </motion.div>
      </div>

      <motion.div {...rise(3)} className="mt-8 rounded-2xl border p-5" style={{ borderColor: MW.ice }}>
        <div className="text-base font-semibold" style={{ color: MW.navy }}>Klang Valley</div>
        <div className="mt-1 text-sm" style={{ color: MW.body }}>
          A large share of the nation&apos;s GDP, a growing middle class and rising spending power: the prime area for advertising.
        </div>
      </motion.div>

      <motion.div {...rise(4)} className="mt-6">
        <WaveBand />
      </motion.div>
    </figure>
  );
}
