"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MW } from "./brand";
import { Kicker, WaveBand } from "./BrandBits";
import { MY_MAP } from "./malaysia-map";

// Summary of the "Market Landscape" copy: the four key cities on a map of
// Malaysia, linked from Kuala Lumpur, plus the three places the text calls
// out. No background, so it sits on any section colour.

const CITIES = [
  { id: "kl", name: "Kuala Lumpur", dx: 12, anchor: "start" },
  { id: "penang", name: "Penang", dx: 12, anchor: "start" },
  { id: "jb", name: "Johor Bahru", dx: 12, anchor: "start" },
  { id: "kk", name: "Kota Kinabalu", dx: -12, anchor: "end" },
] as const

const FACTS = [
  { place: "Bukit Bintang", fact: "Heavy foot traffic every day" },
  { place: "George Town", fact: "UNESCO World Heritage Site" },
  { place: "Klang Valley", fact: "KL, Petaling Jaya, Shah Alam, Subang Jaya" },
]

export function MalaysiaMarketMap() {
  const reduce = useReducedMotion();
  const { W, H, d, cities } = MY_MAP;
  const [kx, ky] = cities.kl;
  return (
    <figure
      className="w-full"
      aria-label="Map of Malaysia's key advertising cities: Kuala Lumpur, Penang, Johor Bahru and Kota Kinabalu. Bukit Bintang has heavy daily foot traffic, George Town is a UNESCO World Heritage Site, and the Klang Valley includes Petaling Jaya, Shah Alam and Subang Jaya."
    >
      <Kicker>Where the audiences are</Kicker>

      <svg viewBox={`0 0 ${W} ${H + 20}`} className="mt-5 w-full h-auto overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="mw-land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={MW.ice} />
            <stop offset="1" stopColor={MW.sky} stopOpacity="0.55" />
          </linearGradient>
        </defs>

        <motion.path
          d={d}
          stroke={MW.sky}
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          whileInView={{ pathLength: 1, fillOpacity: 1 }}
          viewport={{ once: true }}
          transition={{ pathLength: { duration: 1, ease: "easeInOut" }, fillOpacity: { delay: 0.4, duration: 0.6 } }}
          fill="url(#mw-land)"
        />

        {/* Links from the capital to the other key cities */}
        {CITIES.filter(c => c.id !== "kl").map((c, i) => {
          const [x, y] = cities[c.id];
          // Control point pushed off the midpoint, perpendicular to the line,
          // so every link bows the same way (upward) by a share of its length.
          const len = Math.hypot(x - kx, y - ky);
          let nx = (ky - y) / len, ny = (x - kx) / len;
          if (ny > 0) { nx = -nx; ny = -ny; }
          const mx = (kx + x) / 2 + nx * len * 0.22;
          const my = (ky + y) / 2 + ny * len * 0.22;
          return (
            <motion.path
              key={c.id}
              d={`M${kx} ${ky} Q${mx} ${my} ${x} ${y}`}
              fill="none"
              stroke={MW.blue}
              strokeWidth="1.4"
              strokeDasharray="4 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.7 }}
            />
          );
        })}

        {CITIES.map((c, i) => {
          const [x, y] = cities[c.id];
          const capital = c.id === "kl";
          return (
            <motion.g
              key={c.id}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
            >
              {!reduce && (
                <motion.circle
                  cx={x} cy={y} r="6" fill={capital ? MW.sun : MW.sky}
                  animate={{ r: [6, 20], opacity: [0.55, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                />
              )}
              <circle cx={x} cy={y} r={capital ? 7 : 5.5} fill={capital ? MW.blue : MW.navy} stroke="#fff" strokeWidth="2" />
              <text
                x={x + c.dx} y={y + 5} textAnchor={c.anchor}
                className="text-[23px] md:text-[13px]" fontWeight={capital ? 700 : 600} fill={MW.navy}
                style={{ paintOrder: "stroke", stroke: "rgba(255,255,255,0.85)", strokeWidth: 4 }}
              >
                {c.name}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {FACTS.map((f, i) => (
          <motion.div
            key={f.place}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            className="rounded-2xl border p-4"
            style={{ borderColor: MW.ice }}
          >
            <div className="text-sm font-semibold" style={{ color: MW.navy }}>{f.place}</div>
            <div className="mt-1 text-xs leading-snug" style={{ color: MW.body }}>{f.fact}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <WaveBand units={24} />
      </div>
    </figure>
  );
}
