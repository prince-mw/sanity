"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2, BusFront, CarTaxiFront, Flag, Landmark, Mountain, Palette, RadioTower,
  Route, Shirt, ShoppingBag, Sparkles, TrainFront, TramFront, type LucideIcon,
} from "lucide-react";
import { MW } from "./brand";
import { Kicker } from "./BrandBits";
import { KL_MAP } from "./kl-map";
import { fitBox, spreadPins } from "./kit/geometry";
import { useNarrow, useSvgScale } from "./kit/useSvgScale";

// Summary of the Market Landscape paragraph on Kuala Lumpur: the attractions
// it names (pinned on a map of KL), its festivals, and how people get around.
// Everything shown is named in that paragraph. No background, so it sits on
// any section colour.

const ICONS: Record<string, LucideIcon> = {
  "batu-caves": Mountain,
  petronas: Building2,
  "kl-tower": RadioTower,
  "bukit-bintang": ShoppingBag,
  merdeka: Flag,
  iamm: Palette,
  museum: Landmark,
};

// Pins are a fixed size on screen (PIN_PX) and are pushed apart automatically
// (kit/geometry spreadPins), joined to their true spot by a short line.
const PIN_PX = 12;      // pin radius in screen pixels
const PIN_GAP_PX = 6;   // space between two pins
const NUM_PX = 13;      // pin number size

const EVENTS: { name: string; Icon: LucideIcon }[] = [
  { name: "Thaipusam Festival", Icon: Sparkles },
  { name: "KL International Arts Festival", Icon: Palette },
  { name: "Kuala Lumpur Fashion Week", Icon: Shirt },
];

const MODES: { name: string; Icon: LucideIcon }[] = [
  { name: "LRT", Icon: TrainFront },
  { name: "MRT", Icon: TrainFront },
  { name: "Monorail", Icon: TramFront },
  { name: "Buses", Icon: BusFront },
  { name: "Taxis", Icon: CarTaxiFront },
];

const ROUTES = ["Federal Highway", "Jalan Tun Razak", "Jalan Ampang"];

const rise = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: 0.1 + i * 0.08, duration: 0.5 },
});

export function KualaLumpurHighlights() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const { W, H, kl, around, places } = KL_MAP;

  // Step through the places so each gets its moment on the map.
  useEffect(() => {
    if (!inView || held || reduce) return;
    const t = setInterval(() => setActive(a => (a + 1) % places.length), 2400);
    return () => clearInterval(t);
  }, [inView, held, reduce, places.length]);

  // The map frames itself around the pins: no hand-picked crop, so no pin is
  // cut off and no corner is left empty. Squarer on phones.
  const narrow = useNarrow();
  const svgRef = useRef<SVGSVGElement>(null);
  const anchors = useMemo(() => places.map(p => ({ x: p.x, y: p.y })), [places]);
  const box = useMemo(
    () => fitBox(anchors, { pad: 55, aspect: narrow ? 0.95 : 0.85, bounds: { x: 0, y: 0, w: W, h: H } }),
    [anchors, narrow, W, H],
  );
  const u = 1 / useSvgScale(svgRef, box.w); // drawing units per screen pixel
  const pins = useMemo(() => spreadPins(anchors, (2 * PIN_PX + PIN_GAP_PX) * u), [anchors, u]);
  const view = `${box.x} ${box.y} ${box.w} ${box.h}`;

  const cur = places[active];
  const hold = (i: number) => ({
    onMouseEnter: () => { setActive(i); setHeld(true); },
    onMouseLeave: () => setHeld(false),
    onFocus: () => { setActive(i); setHeld(true); },
    onBlur: () => setHeld(false),
  });

  return (
    <figure
      ref={ref}
      className="w-full"
      aria-label={`What draws the crowds in Kuala Lumpur. Places: ${places.map(p => p.name).join(", ")}. Festivals: ${EVENTS.map(e => e.name).join(", ")}. Getting around: ${MODES.map(m => m.name).join(", ")}, along ${ROUTES.join(", ")}.`}
    >
      <Kicker>What draws the crowds in Kuala Lumpur</Kicker>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-10 items-start">
        {/* Map of KL with the places pinned */}
        <div className="mx-auto w-full max-w-[460px]">
        <motion.svg ref={svgRef} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} viewBox={view} className="w-full h-auto" aria-hidden="true">
          <defs>
            <clipPath id="kl-frame"><rect x={box.x} y={box.y} width={box.w} height={box.h} rx={16 * u} /></clipPath>
            <linearGradient id="kl-land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={MW.ice} />
              <stop offset="1" stopColor={MW.sky} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <g clipPath="url(#kl-frame)">
            {around.map((d, i) => (
              <path key={i} d={d} fill={MW.ice} fillOpacity="0.18" stroke={MW.sky} strokeOpacity="0.5" strokeDasharray="3 5" />
            ))}
            <motion.path
              d={kl}
              fill="url(#kl-land)"
              stroke={MW.sky}
              strokeWidth="2"
              strokeLinejoin="round"
              variants={{ hidden: { pathLength: 0, fillOpacity: 0 }, show: { pathLength: 1, fillOpacity: 1, transition: { pathLength: { duration: 1.4 }, fillOpacity: { delay: 0.8, duration: 0.8 } } } }}
            />
          </g>

          {places.map((p, i) => {
            const on = i === active;
            const { x, y } = pins[i];
            const moved = Math.hypot(x - p.x, y - p.y) > 0.5;
            return (
              <motion.g
                key={p.id}
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.5 + i * 0.08, duration: 0.4 } } }}
                style={{ cursor: "pointer" }}
                {...hold(i)}
              >
                {moved ? <line x1={p.x} y1={p.y} x2={x} y2={y} stroke={MW.navy} strokeWidth={1.2 * u} opacity="0.6" /> : null}
                <circle cx={p.x} cy={p.y} r={2.5 * u} fill={MW.navy} />
                {on && !reduce && (
                  <motion.circle
                    cx={x} cy={y} fill={MW.sun}
                    initial={{ r: PIN_PX * 0.8 * u, opacity: 0.6 }}
                    animate={{ r: PIN_PX * 2.2 * u, opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <circle cx={x} cy={y} r={(on ? PIN_PX + 1 : PIN_PX) * u} fill={on ? MW.blue : MW.navy} stroke="#fff" strokeWidth={2.5 * u} />
                <text x={x} y={y + NUM_PX * 0.35 * u} textAnchor="middle" fontSize={NUM_PX * u} fontWeight="700" fill="#fff">{i + 1}</text>
              </motion.g>
            );
          })}
        </motion.svg>
        {/* Name of the place in focus: under the map, normal text size, never on top of a pin */}
        <div className="mt-3 flex min-h-[44px] items-center justify-center gap-2 text-center" aria-hidden="true">
          <motion.div key={cur.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: MW.blue }}>{active + 1}</span>
            <strong className="text-base" style={{ color: MW.navy }}>{cur.name}</strong>
            <span className="text-sm" style={{ color: MW.body }}>· Kuala Lumpur</span>
          </motion.div>
        </div>
        </div>

        <div className="space-y-6">
          {/* Places, numbered as on the map */}
          <motion.div {...rise(0)}>
            <div className="text-base font-semibold" style={{ color: MW.navy }}>Places that draw the crowds</div>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {places.map((p, i) => {
                const Icon = ICONS[p.id];
                const on = i === active;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      {...hold(i)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors"
                      style={{ background: on ? "rgba(191,231,251,0.45)" : "transparent" }}
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ background: on ? MW.blue : MW.navy }}
                      >
                        {i + 1}
                      </span>
                      <Icon className="h-4 w-4 shrink-0" style={{ color: MW.blue }} aria-hidden="true" />
                      <span className="text-sm font-medium" style={{ color: MW.navy }}>{p.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Festivals */}
          <motion.div {...rise(1)} className="rounded-2xl border p-5" style={{ borderColor: MW.ice }}>
            <div className="text-base font-semibold" style={{ color: MW.navy }}>Festivals all year round</div>
            <p className="mt-1 text-sm" style={{ color: MW.body }}>Drawing people from all over the country and the world.</p>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EVENTS.map(({ name, Icon }, i) => (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3 rounded-lg p-3 sm:flex-col sm:items-start"
                  style={{ background: "rgba(191,231,251,0.3)" }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: "#fff" }}>
                    <Icon className="h-5 w-5" style={{ color: i === 0 ? "#F59222" : MW.blue }} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium leading-snug" style={{ color: MW.navy }}>{name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Getting around */}
          <motion.div {...rise(2)} className="rounded-2xl border p-5" style={{ borderColor: MW.ice }}>
            <div className="text-base font-semibold" style={{ color: MW.navy }}>Getting around: audiences on the move</div>

            {/* A line with a train running along it */}
            <div className="relative mt-5 h-3" aria-hidden="true">
              <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full" style={{ background: MW.ice }} />
              {[0, 25, 50, 75, 100].map(x => (
                <span key={x} className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white" style={{ left: `${x}%`, borderColor: MW.sky }} />
              ))}
              {!reduce && (
                <motion.span
                  className="absolute top-1/2 h-3.5 w-9 -translate-y-1/2 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${MW.sky}, ${MW.blue})` }}
                  animate={{ left: ["0%", "calc(100% - 2.25rem)", "0%"] }}
                  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                />
              )}
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {MODES.map(({ name, Icon }) => (
                <li key={name} className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium" style={{ borderColor: MW.ice, color: MW.navy }}>
                  <Icon className="h-4 w-4" style={{ color: MW.blue }} aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-start gap-2 text-sm" style={{ color: MW.body }}>
              <Route className="mt-0.5 h-4 w-4 shrink-0" style={{ color: MW.blue }} aria-hidden="true" />
              <span>Major routes for outdoor signage: <strong style={{ color: MW.navy }}>{ROUTES.join(" · ")}</strong></span>
            </div>
          </motion.div>
        </div>
      </div>
    </figure>
  );
}
