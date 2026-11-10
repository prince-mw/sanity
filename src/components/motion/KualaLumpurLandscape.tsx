"use client";

// The Kuala Lumpur "Market Landscape" paragraph as a picture: four highways
// (Federal, LDP, NPE, MRR2) run in from the townships and meet the urban core
// (KLCC, Bukit Bintang, Bangsar, TRX, KL Sentral), with indoor retail media
// (AEON malls) as the third layer. Everything shown is named in that text.
// No background, so it sits on any section colour.

import { motion, useReducedMotion } from "framer-motion";
import { Building2, Car, ShoppingCart } from "lucide-react";
import { MW } from "./brand";
import { Kicker, WaveBand } from "./BrandBits";
import { useReveal } from "./kit/reveal";

const W = 760, H = 400;
const CORE: [number, number] = [455, 210];
const HIGHWAYS: { name: string; from: string; path: string; label: [number, number] }[] = [
  { name: "Federal Highway", from: "Petaling Jaya", path: `M20 300 C 160 300, 300 240, ${CORE[0]} ${CORE[1]}`, label: [40, 322] },
  { name: "LDP", from: "Sri Hartamas · Kepong", path: `M60 60 C 180 70, 320 150, ${CORE[0]} ${CORE[1]}`, label: [40, 28] },
  { name: "NPE", from: "Bangsar South · Pantai", path: `M150 380 C 260 350, 360 290, ${CORE[0]} ${CORE[1]}`, label: [120, 395] },
  { name: "MRR2", from: "Batu Caves · Ampang", path: `M740 60 C 650 90, 560 150, ${CORE[0]} ${CORE[1]}`, label: [540, 36] },
];
const CORE_PLACES = ["KLCC", "Bukit Bintang", "Bangsar", "TRX", "KL Sentral"];
const MALLS = ["AEON Taman Maluri", "AEON Metro Prima", "AEON AU2 Setiawangsa"];

const rise = (i: number) => ({ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.1, duration: 0.45 } } });

export function KualaLumpurLandscape() {
  const reduce = useReducedMotion();
  const { ref, state } = useReveal(0.2);
  return (
    <figure ref={ref as React.RefObject<HTMLElement>} className="w-full"
      aria-label={`Kuala Lumpur's two advertising environments: the highway corridor (${HIGHWAYS.map(h => h.name).join(", ")}) carrying commuters from the townships, and the urban core (${CORE_PLACES.join(", ")}) with premium placements, plus indoor retail media at ${MALLS.join(", ")}.`}>
      <Kicker>Two environments, one city</Kicker>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr] items-center">
        {/* Highways into the core */}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden="true">
          <defs>
            <radialGradient id="kl-core" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor={MW.sky} stopOpacity="0.55" />
              <stop offset="1" stopColor={MW.sky} stopOpacity="0" />
            </radialGradient>
          </defs>
          {HIGHWAYS.map((h, i) => (
            <g key={h.name}>
              <motion.path initial="hidden" animate={state} d={h.path} fill="none" stroke={MW.ice} strokeWidth="14" strokeLinecap="round"
                variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { delay: 0.2 + i * 0.15, duration: 1.1, ease: "easeInOut" } } }} />
              <motion.path initial="hidden" animate={state} d={h.path} fill="none" stroke={MW.blue} strokeWidth="2.5" strokeDasharray="10 8" strokeLinecap="round"
                variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 0.9, transition: { delay: 0.3 + i * 0.15, duration: 1.1, ease: "easeInOut" } } }} />
              {!reduce && (
                <motion.circle initial="hidden" animate={state} r="5" fill={MW.sun} stroke={MW.navy} strokeWidth="1.5"
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.4 + i * 0.15 } } }}>
                  <animateMotion dur={`${5 + i}s`} repeatCount="indefinite" path={h.path} />
                </motion.circle>
              )}
              <motion.text initial="hidden" animate={state} x={h.label[0]} y={h.label[1]} fontSize="15" fontWeight="700" fill={MW.navy}
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.5 + i * 0.15 } } }}>{h.name}</motion.text>
              <motion.text initial="hidden" animate={state} x={h.label[0]} y={h.label[1] + 16} fontSize="12" fill={MW.body}
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.6 + i * 0.15 } } }}>from {h.from}</motion.text>
            </g>
          ))}
          {/* the urban core */}
          <motion.g initial="hidden" animate={state} variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { delay: 1.2, duration: 0.6 } } }} style={{ transformOrigin: `${CORE[0]}px ${CORE[1]}px` }}>
            <circle cx={CORE[0]} cy={CORE[1]} r="118" fill="url(#kl-core)" />
            <circle cx={CORE[0]} cy={CORE[1]} r="62" fill={MW.navy} />
            <text x={CORE[0]} y={CORE[1] - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">URBAN CORE</text>
            <text x={CORE[0]} y={CORE[1] + 14} textAnchor="middle" fontSize="11" fill={MW.ice}>premium · brand-safe</text>
          </motion.g>
          {CORE_PLACES.map((p, i) => {
            const a = -Math.PI / 2 + (i / CORE_PLACES.length) * Math.PI * 2;
            const x = CORE[0] + Math.cos(a) * 96, y = CORE[1] + Math.sin(a) * 96;
            return (
              <motion.g key={p} initial="hidden" animate={state} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.6 + i * 0.12 } } }}>
                <circle cx={x} cy={y} r="4.5" fill={MW.sun} stroke={MW.navy} strokeWidth="1.5" />
                <text x={x + (Math.cos(a) > 0.2 ? 9 : Math.cos(a) < -0.2 ? -9 : 0)} y={y + (Math.sin(a) > 0.5 ? 18 : Math.sin(a) < -0.5 ? -9 : 4)}
                  textAnchor={Math.cos(a) > 0.2 ? "start" : Math.cos(a) < -0.2 ? "end" : "middle"} fontSize="13" fontWeight="700" fill={MW.navy}
                  style={{ paintOrder: "stroke", stroke: "rgba(255,255,255,0.9)", strokeWidth: 4 }}>{p}</text>
              </motion.g>
            );
          })}
        </svg>

        {/* The three layers, as cards */}
        <ul className="space-y-4">
          {[
            { Icon: Car, title: "Highway corridor", text: "Roadside unipoles and large-format billboards on the Federal Highway, LDP, NPE and MRR2 — the highest-reach inventory in the city, some sites past a million monthly impressions.", color: MW.blue },
            { Icon: Building2, title: "Urban core", text: "KLCC, Bukit Bintang, Bangsar, TRX and KL Sentral: premium, brand-safe placements beside malls, corporate towers and transit interchanges — for affluent footfall and dwell time.", color: MW.navy },
            { Icon: ShoppingCart, title: "Indoor retail media", text: "AEON Mall placements in Taman Maluri, Metro Prima and AU2 Setiawangsa: a controlled, in-venue environment for last-mile, point-of-decision messaging.", color: MW.sky },
          ].map((c, i) => (
            <motion.li key={c.title} initial="hidden" animate={state} variants={rise(i)} className="flex gap-4 rounded-2xl border p-5" style={{ borderColor: MW.ice, background: "#fff" }}>
              <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(191,231,251,0.35)", color: c.color }}><c.Icon className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <h3 className="font-bold" style={{ color: MW.navy }}>{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: MW.body }}>{c.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="mt-6"><WaveBand units={24} /></div>
    </figure>
  );
}
