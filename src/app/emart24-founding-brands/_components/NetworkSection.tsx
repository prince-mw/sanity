'use client';

import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { CITIES, GROUPS, GroupId, PHOTOS, ROADS, STORES } from '../_data';

const LON0 = 101.44,
  LON1 = 101.92,
  LAT0 = 3.35,
  LAT1 = 2.72,
  W = 640,
  H = 760;
const X = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const Y = (lat: number) => ((LAT0 - lat) / (LAT0 - LAT1)) * H;
const groupOf = (g: GroupId) => GROUPS.find((x) => x.id === g)!;

const FACTS = [
  { t: 'A growing network.', d: 'eMart24 has 100+ stores in Malaysia. As screens go into more of them, founding brands get first pick.' },
  { t: 'Every kind of shopper.', d: 'Offices, campuses, family neighbourhoods and malls.' },
  { t: 'People stop, and stay.', d: 'Hot food, drinks and seating bring them in.' },
];

export const NetworkSection: React.FC = () => {
  const [filter, setFilter] = useState<GroupId | 'all'>('all');
  const [active, setActive] = useState(1);
  const [photoOpen, setPhotoOpen] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const stores = useMemo(() => STORES.map((s, i) => ({ ...s, i: i + 1 })), []);
  const activeStore = stores[active - 1];
  const count = filter === 'all' ? stores.length : stores.filter((s) => s.g === filter).length;

  const cx = X(101.697),
    cy = Y(3.148),
    r10 = (10 / 111 / (LON1 - LON0)) * W;

  const showOnMap = (storeIdx: number, photoIdx: number) => {
    const opening = photoOpen !== photoIdx;
    setPhotoOpen(opening ? photoIdx : null);
    if (opening) {
      setFilter('all');
      setActive(storeIdx);
    }
  };

  const px = (X(activeStore.lon) / W) * 100;
  const py = (Y(activeStore.lat) / H) * 100;
  const below = py < 22;

  return (
    <section id="network" className="py-16 sm:py-20 bg-[#f4f6f3]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs tracking-[0.1em] uppercase text-[#596166]">The network</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#15181a] tracking-tight">15 stores across the Klang Valley.</h2>

        <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {FACTS.map((f, i) => (
            <motion.li
              key={f.t}
              className="border-t-2 border-[#15181a] pt-4"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1 }}
            >
              <strong className="block text-lg font-bold text-[#15181a]">{f.t}</strong>
              <span className="block mt-1 text-[#596166]">{f.d}</span>
            </motion.li>
          ))}
        </ul>

        {/* Photos: click one to see where that store is on the map */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] auto-rows-[150px] md:auto-rows-[190px] gap-2.5">
          {PHOTOS.map((p, i) => {
            const s = stores[p.store - 1];
            const open = photoOpen === i;
            const cls =
              i === 0 ? 'col-span-2 row-span-2 md:col-span-1' : i === PHOTOS.length - 1 ? 'col-span-2' : '';
            return (
              <button
                key={p.src}
                type="button"
                onClick={() => showOnMap(p.store, i)}
                aria-expanded={open}
                aria-label={`Photo of an eMart24 store. ${open ? 'Location shown' : 'Show location'}`}
                className={`group relative overflow-hidden rounded-md bg-[#e8ebe7] cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#127a4a] ${cls}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <span
                  className={`absolute right-3 top-3 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.35)] transition-opacity ${
                    open ? 'opacity-0' : 'animate-pulse'
                  }`}
                />
                <span
                  className={`absolute left-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded bg-white px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-[#15181a] shadow-lg transition-all duration-200 ${
                    open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#127a4a]" />
                  {s.n} · {s.a}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-[#596166]">
          Source:{' '}
          <a
            className="underline hover:text-[#127a4a]"
            href="https://www.koreatimes.co.kr/business/companies/20250625/emart24-opens-100th-premium-convenience-store-in-malaysia"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Korea Times, 25 Jun 2025
          </a>
          .
        </p>

        {/* Map + store list */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-7 items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-3.5" role="group" aria-label="Filter stores by shopper type">
              <button
                type="button"
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
                className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer transition-colors ${
                  filter === 'all' ? 'bg-[#15181a] text-white border-[#15181a]' : 'bg-white border-[#c8cec9] text-[#15181a] hover:border-[#15181a]'
                }`}
              >
                All 15
              </button>
              {GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setFilter(g.id)}
                  aria-pressed={filter === g.id}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border cursor-pointer transition-colors ${
                    filter === g.id ? 'bg-[#15181a] text-white border-[#15181a]' : 'bg-white border-[#c8cec9] text-[#15181a] hover:border-[#15181a]'
                  }`}
                >
                  <i className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
                  {g.name}
                </button>
              ))}
            </div>

            <div ref={mapRef} className="relative rounded-md overflow-hidden bg-[#0d1311] text-[#e9efe9]">
              <div className="flex justify-between items-end gap-3 px-4 sm:px-5 pt-4 pb-3.5 border-b border-[#24302b]" aria-hidden="true">
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase">
                  <i className="w-2 h-2 rounded-full bg-[#4cc98a] shadow-[0_0_0_4px_rgba(76,201,138,0.2)]" />
                  Klang Valley · ePaper network
                </span>
                <span className="flex items-baseline gap-2 text-3xl font-bold leading-none">
                  <motion.span key={count} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                    {count}
                  </motion.span>
                  <small className="font-mono text-[10px] tracking-[0.1em] text-[#7f8c86]">
                    {filter === 'all' ? 'STORES' : groupOf(filter).name.toUpperCase()}
                  </small>
                </span>
              </div>
              <div className="relative">
                <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" role="img" aria-label="Map of the 15 eMart24 stores in the Klang Valley">
                  <defs>
                    <pattern id="em-dots" width="12" height="12" patternUnits="userSpaceOnUse">
                      <circle cx="1.5" cy="1.5" r="1" fill="#1c2622" />
                    </pattern>
                    {GROUPS.map((g) => (
                      <radialGradient key={g.id} id={`em-glow-${g.id}`}>
                        <stop offset="0" stopColor={g.color} stopOpacity=".9" />
                        <stop offset="1" stopColor={g.color} stopOpacity="0" />
                      </radialGradient>
                    ))}
                  </defs>
                  <rect width={W} height={H} fill="url(#em-dots)" />
                  {[1, 2, 3].map((k) => (
                    <g key={k}>
                      <circle cx={cx} cy={cy} r={r10 * k} fill="none" stroke="#34433c" strokeDasharray="2 5" />
                      <text x={cx + 4} y={cy - r10 * k - 5} className="font-mono" fontSize="9.5" fill="#7f8c86" letterSpacing="1">
                        {k * 10} KM
                      </text>
                    </g>
                  ))}
                  {ROADS.map((rd, i) => (
                    <motion.polyline
                      key={i}
                      points={rd.map(([la, lo]) => `${X(lo).toFixed(1)},${Y(la).toFixed(1)}`).join(' ')}
                      fill="none"
                      stroke="#2f3d37"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: i * 0.15, ease: 'easeInOut' }}
                    />
                  ))}
                  {CITIES.map((c) => (
                    <text key={c.n} x={X(c.lon) + c.dx} y={Y(c.lat) + c.dy} className="font-mono" fontSize="10.5" fill="#7f8c86" letterSpacing="1.3">
                      {c.n}
                    </text>
                  ))}
                  <g transform={`translate(${W - 34},${H - 40})`}>
                    <path d="M0 -16 L6 6 L0 1 L-6 6 Z" fill="#7f8c86" />
                    <text x="-4" y="20" className="font-mono" fontSize="10.5" fill="#7f8c86">
                      N
                    </text>
                  </g>
                  {/* Draw the active pin last so it sits on top */}
                  {[...stores.filter((s) => s.i !== active), activeStore].map((s, k) => {
                    const x = X(s.lon),
                      y = Y(s.lat),
                      g = groupOf(s.g),
                      dim = filter !== 'all' && s.g !== filter,
                      on = s.i === active;
                    return (
                      <motion.g
                        key={s.i}
                        role="button"
                        tabIndex={0}
                        aria-label={`${s.i}. ${s.n}, ${s.a}. ${g.who}`}
                        className="cursor-pointer focus:outline-none"
                        style={{ opacity: dim ? 0.18 : 1, transition: 'opacity .25s' }}
                        onMouseEnter={() => setActive(s.i)}
                        onFocus={() => setActive(s.i)}
                        onClick={() => setActive(s.i)}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (s.i % 15) * 0.05, type: 'spring', stiffness: 260, damping: 18 }}
                      >
                        <circle cx={x} cy={y} r="30" fill={`url(#em-glow-${s.g})`} opacity=".22" />
                        <circle
                          cx={x}
                          cy={y}
                          r="11"
                          fill="none"
                          stroke={g.color}
                          strokeWidth="1.5"
                          className="em-pulse"
                          style={{ animationDelay: `${(k * 0.37) % 3.2}s` }}
                        />
                        <circle cx={x} cy={y} r={on ? 13 : 11} fill={g.color} stroke={on ? '#fff' : '#0d1311'} strokeWidth="2.5" />
                        <text x={x} y={y + 3.4} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" pointerEvents="none">
                          {s.i}
                        </text>
                      </motion.g>
                    );
                  })}
                </svg>
                {/* Callout for the active store */}
                <div
                  className="absolute pointer-events-none bg-white text-[#15181a] px-3 py-2.5 rounded shadow-[0_8px_24px_rgba(0,0,0,0.35)] min-w-[160px] max-w-[220px] transition-[left,top] duration-200"
                  style={{
                    left: `${Math.min(Math.max(px, 18), 82)}%`,
                    top: `${py}%`,
                    transform: below ? 'translate(-50%, 18px)' : 'translate(-50%, calc(-100% - 18px))',
                  }}
                >
                  <b className="block text-[15px] font-bold">
                    {activeStore.i}. {activeStore.n}
                  </b>
                  <span className="text-xs text-[#596166]">{activeStore.a}</span>
                  <span className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold">
                    <i className="w-2 h-2 rounded-full" style={{ background: groupOf(activeStore.g).color }} />
                    {groupOf(activeStore.g).who}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 min-w-0">
            {GROUPS.map((g) => {
              const list = stores.filter((s) => s.g === g.id);
              const dim = filter !== 'all' && filter !== g.id;
              return (
                <div key={g.id} className={`transition-opacity ${dim ? 'opacity-40' : ''}`}>
                  <h3 className="flex items-center gap-2 font-bold text-[#15181a]">
                    <i className="w-3 h-3 rounded-full" style={{ background: g.color }} />
                    {g.name} <span className="text-sm font-normal text-[#596166]">({list.length})</span>
                  </h3>
                  <ol className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-0.5">
                    {list.map((s) => (
                      <li key={s.i}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(s.i)}
                          onFocus={() => setActive(s.i)}
                          onClick={() => {
                            setActive(s.i);
                            if (window.innerWidth < 1024) mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className={`w-full flex items-center gap-2.5 px-1.5 py-1 rounded text-left text-[15px] cursor-pointer transition-colors ${
                            active === s.i ? 'bg-white shadow-sm' : 'hover:bg-white/70'
                          }`}
                        >
                          <span
                            className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white flex-none"
                            style={{ background: g.color }}
                          >
                            {s.i}
                          </span>
                          <span className="text-[#15181a]">{s.n}</span>
                          <span className="ml-auto text-xs text-[#596166]">{s.a}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-4 text-xs text-[#596166]">
          Map is a simplified sketch. Pins show each store&apos;s neighbourhood and roads are indicative only.
        </p>
      </div>
    </section>
  );
};
