"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MW } from "./brand";
import { CountUp, Kicker } from "./BrandBits";
import { KV_MAP } from "./klang-valley-map";

// Summary of the "Digital Billboard Advertising Malaysia" copy: Malaysia's
// population and urbanisation, Kuala Lumpur, and the Klang Valley's mix of
// ethnicities, cultures and languages. Each district is filled with its own
// census mix as a dot map (dots are shuffled, not placed where groups
// live), so it shows how one campaign reaches varied audiences.
// No background, so it sits on any section colour.

const GROUPS = [
  { key: "bumi", label: "Bumiputera", color: MW.blue },
  { key: "chinese", label: "Chinese", color: MW.sky },
  { key: "indian", label: "Indian", color: "#F59222" },
  { key: "others", label: "Others", color: MW.ice },
] as const

const fmtPop = (k: number) => (k >= 1000 ? `${(k / 1000).toFixed(2)}M` : `${Math.round(k)}K`)

export function KlangValleyAtAGlance() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const { W, H, districts, all } = KV_MAP;

  // Walk through the districts so each one's mix gets its moment.
  useEffect(() => {
    if (!inView || held || reduce) return;
    const t = setInterval(() => setActive(a => (a + 1) % districts.length), 2600);
    return () => clearInterval(t);
  }, [inView, held, reduce, districts.length]);

  const cur = districts[active];

  return (
    <figure
      ref={ref}
      className="w-full md:pt-2"
      aria-label={`Klang Valley at a glance. ${districts.map(d => `${d.name}: ${fmtPop(d.total)} people, ${d.mix.bumi}% Bumiputera, ${d.mix.chinese}% Chinese, ${d.mix.indian}% Indian, ${d.mix.others}% others`).join('. ')}. Malaysia has over 33.4 million people, about 76% living in cities, and over 1.9 million in Kuala Lumpur.`}
    >
      <Kicker>Klang Valley at a glance</Kicker>

      {/* Stat strip */}
      <div className="mt-5 grid grid-cols-3 divide-x rounded-2xl border" style={{ borderColor: MW.ice }}>
        {[
          { v: <><CountUp to={33.4} decimals={1} suffix="M" /><span style={{ color: MW.sky }}>+</span></>, l: "people in Malaysia" },
          { v: <CountUp to={76} suffix="%" />, l: "live in cities" },
          { v: <><CountUp to={1.9} decimals={1} suffix="M" /><span style={{ color: MW.sky }}>+</span></>, l: "in Kuala Lumpur" },
        ].map((s, i) => (
          <div key={i} className="px-3 py-4 text-center" style={{ borderColor: MW.ice }}>
            <div className="text-2xl lg:text-3xl font-bold leading-none" style={{ color: i === 1 ? MW.blue : MW.navy }}>{s.v}</div>
            <div className="mt-1.5 text-xs" style={{ color: MW.body }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-6 items-center">
        {/* Map: each district filled with dots in its own mix */}
        <div className="relative">
          <svg viewBox={`-6 -6 ${W + 12} ${H + 12}`} className="w-full h-auto max-w-[520px] mx-auto overflow-visible" aria-hidden="true">
            {districts.map((d, i) => {
              const on = i === active;
              return (
                <motion.g
                  key={d.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  onMouseEnter={() => { setActive(i); setHeld(true); }}
                  onMouseLeave={() => setHeld(false)}
                  style={{ cursor: "pointer" }}
                >
                  <path d={d.d} fill={MW.ice} fillOpacity={on ? 0.45 : 0.25} />
                  <g opacity={on ? 1 : 0.5} style={{ transition: "opacity .4s" }}>
                    {d.dots.map(([x, y, g], k) => (
                      <circle key={k} cx={x} cy={y} r={on ? 4.3 : 3.8} fill={GROUPS[g].color} />
                    ))}
                  </g>
                  <motion.path
                    d={d.d}
                    fill="none"
                    stroke={on ? MW.navy : MW.sky}
                    strokeWidth={on ? 3 : 1.2}
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 1.2 }}
                  />
                </motion.g>
              );
            })}
          </svg>
          {/* The district in focus, named under the map so it never covers the dots */}
          <motion.div key={cur.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="mt-2 text-center text-sm" style={{ color: MW.body }} aria-hidden="true">
            <strong style={{ color: MW.navy }}>{cur.name}</strong> · {fmtPop(cur.total)} people
          </motion.div>
        </div>

        {/* District mixes */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 xl:grid-cols-1 xl:gap-y-3">
          {districts.map((d, i) => (
            <li key={d.id}>
              <button
                type="button"
                onMouseEnter={() => { setActive(i); setHeld(true); }}
                onMouseLeave={() => setHeld(false)}
                onFocus={() => { setActive(i); setHeld(true); }}
                onBlur={() => setHeld(false)}
                onClick={() => setActive(i)}
                className="w-full text-left rounded-lg px-2 py-1.5 transition-colors"
                style={{ background: i === active ? "rgba(191,231,251,0.35)" : "transparent" }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold" style={{ color: MW.navy }}>{d.name}</span>
                  <span className="text-xs" style={{ color: MW.body }}>{fmtPop(d.total)}</span>
                </div>
                <div className="mt-1.5 flex h-2.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(191,231,251,0.4)" }}>
                  {GROUPS.map((g, gi) => (
                    <motion.span
                      key={g.key}
                      className="h-full"
                      style={{ background: g.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${d.mix[g.key]}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + gi * 0.05, duration: 0.6, ease: "easeOut" }}
                    />
                  ))}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Legend with the valley-wide mix */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {GROUPS.map(g => (
          <div key={g.key} className="flex items-center gap-2 text-sm" style={{ color: MW.body }}>
            <span className="inline-block h-3 w-3 rounded-full" style={{ background: g.color }} />
            {g.label} <strong style={{ color: MW.navy }}>{all[g.key]}%</strong>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-[60ch] text-sm" style={{ color: MW.body }}>
        One campaign across the Klang Valley reaches every one of these communities, in the area that drives a large share of the nation&apos;s GDP.
      </p>
      <p className="mt-2 text-xs" style={{ color: MW.faint }}>
        Source: DOSM Population and Housing Census 2020. Others include non-citizen residents.
      </p>
    </figure>
  );
}
