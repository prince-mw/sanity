'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpDown, ArrowUp, ArrowDown, Check, Minus } from 'lucide-react';
import { CountUp, Reveal, SectionHeader, SourceNote } from './shared';

// Source: URL2IRL Insights Report (Moving Walls, Sept 2026), Exhibit 6 — nine controlled flights,
// Feb–Sep 2026. Lift in points, exposed minus matched control; favourability and intent are top box.
// Norms (the contractual pass marks): Thailand/Vietnam flights use published personal-care and beauty
// norms (+20 favourability, +18 intent); the Philippine flight uses SEA general-category norms (+23, +13).

type Market = 'TH' | 'VN' | 'PH';

type Flight = {
  name: string;
  category: string;
  market: Market;
  city: string;
  reach: number;
  linkage: number | null;
  aware: number;
  assoc: number;
  fav: number;
  intent: number;
  note?: string;
};

const NORMS: Record<Market, { fav: number; intent: number }> = {
  TH: { fav: 20, intent: 18 },
  VN: { fav: 20, intent: 18 },
  PH: { fav: 23, intent: 13 },
};

const FLIGHTS: Flight[] = [
  { name: 'Body scrub launch', category: 'Personal care', market: 'TH', city: 'Bangkok', reach: 34, linkage: 87, aware: 14, assoc: 16, fav: 16, intent: 41, note: 'Largest intent lift: a new product with no prior sentiment to move' },
  { name: 'Hair care icon', category: 'Hair care', market: 'TH', city: 'Bangkok', reach: 38, linkage: null, aware: 3, assoc: 28, fav: 34, intent: 34 },
  { name: 'Beauty soap heritage', category: 'Personal care', market: 'TH', city: 'Bangkok', reach: 35, linkage: 82, aware: 6, assoc: 10, fav: 30, intent: 24 },
  { name: 'Cosmetics leader', category: 'Beauty', market: 'TH', city: 'Bangkok', reach: 38, linkage: 79, aware: 3, assoc: 14, fav: 17, intent: 19 },
  { name: 'Body care leader', category: 'Personal care', market: 'TH', city: 'Bangkok', reach: 40, linkage: 80, aware: 1, assoc: 7, fav: 9, intent: 11, note: 'Started at 88% awareness: little headroom left' },
  { name: 'Skincare challenger', category: 'Skincare', market: 'TH', city: 'Bangkok', reach: 40, linkage: 89, aware: 12, assoc: 6, fav: 19, intent: 22 },
  { name: 'Derma skincare leader', category: 'Skincare', market: 'TH', city: 'Bangkok', reach: 40, linkage: 87, aware: 10, assoc: 18, fav: 31, intent: 20 },
  { name: 'TikTok LIVE event', category: 'Social platform', market: 'VN', city: 'Vietnam', reach: 42, linkage: null, aware: 14, assoc: 20, fav: 36, intent: 33, note: 'TikTok graded its own brand' },
  { name: 'Fibre broadband', category: 'Telco', market: 'PH', city: 'Nine cities', reach: 34, linkage: 86, aware: 14, assoc: 13, fav: 28, intent: 26, note: 'Lead association 3 points under its norm, reported as a miss' },
];

const MEAN = { reach: 37.9, linkage: 84.3, aware: 8.6, assoc: 14.7, fav: 24.4, intent: 25.6 };

const MARKET_NAMES: Record<Market, string> = { TH: 'Thailand', VN: 'Vietnam', PH: 'Philippines' };

const clearsFav = (f: Flight) => f.fav >= NORMS[f.market].fav;
const clearsIntent = (f: Flight) => f.intent >= NORMS[f.market].intent;

type SortKey = 'name' | 'reach' | 'linkage' | 'aware' | 'assoc' | 'fav' | 'intent';

function matches(q: string, ...fields: string[]) {
  if (!q) return true;
  const needle = q.toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
}

const Pass: React.FC<{ ok: boolean; norm: number }> = ({ ok, norm }) => (
  <span
    title={ok ? `Cleared the +${norm} norm` : `Missed the +${norm} norm`}
    className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
  >
    {ok ? <Check className="w-3 h-3" strokeWidth={3} /> : <Minus className="w-3 h-3" strokeWidth={3} />}
  </span>
);

export const KnowledgeBaseSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [market, setMarket] = useState<'All' | Market>('All');
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'fav', dir: 'desc' });
  const [hoverDot, setHoverDot] = useState<string | null>(null);

  const rows = useMemo(() => {
    const filtered = FLIGHTS.filter(
      (f) =>
        (market === 'All' || f.market === market) &&
        matches(query, f.name, f.category, f.city, f.market, MARKET_NAMES[f.market], f.note || '', 'favourability', 'purchase intent', 'reach', 'linkage', 'awareness', 'association')
    );
    return [...filtered].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      let cmp: number;
      if (typeof av === 'string' || typeof bv === 'string') cmp = String(av).localeCompare(String(bv));
      else cmp = (av ?? -1) - (bv ?? -1);
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [query, market, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'name' ? 'asc' : 'desc' }));

  const SortIcon = ({ k }: { k: SortKey }) =>
    sort.key !== k ? <ArrowUpDown className="w-3 h-3 opacity-40" /> : sort.dir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;

  const columns: [SortKey, string][] = [
    ['name', 'Flight'],
    ['reach', 'Reach'],
    ['linkage', 'Linkage'],
    ['aware', 'Awareness'],
    ['assoc', 'Association'],
    ['fav', 'Favourability'],
    ['intent', 'Purchase intent'],
  ];

  const scorecard = [
    { label: 'Purchase-intent norm', test: clearsIntent, key: 'intent' as const },
    { label: 'Favourability norm', test: clearsFav, key: 'fav' as const },
  ];

  return (
    <section id="knowledge-base" className="scroll-mt-32 py-16 sm:py-20 lg:py-24 bg-gray-50 text-[#1b1b20]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Evidence"
          title={
            <>
              Nine controlled flights. <span className="text-[#1e68e5]">Wins and misses in one table.</span>
            </>
          }
          intro="Every flight carries its own brand lift study: 150 people who saw it against 150 matched twins who didn't. Search by brand, category, market or metric."
        />

        {/* Headline stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { to: 9, suffix: ' of 9', l: 'flights returned positive lift on every measured metric' },
            { to: 24, prefix: '+', l: 'mean favourability lift, top box' },
            { to: 26, prefix: '+', l: 'mean purchase-intent lift, top box' },
            { to: 84, suffix: '%', l: 'of exposed audiences named the right advertiser' },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-white border border-gray-200 p-5">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} className="text-3xl sm:text-4xl font-extrabold text-[#14235d]" />
                <div className="mt-1 text-xs sm:text-sm text-gray-500">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-4 sm:p-6">
            {/* Search + market filter */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={'Try “skincare”, “Vietnam”, “TikTok”, “telco”…'}
                  className="w-full rounded-full border border-gray-200 bg-gray-50 pl-11 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e68e5]/40 focus:bg-white"
                  aria-label="Search the flights"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {(['All', 'TH', 'VN', 'PH'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMarket(m)}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold border cursor-pointer transition-colors ${
                      market === m ? 'bg-[#0f1d4a] text-white border-[#0f1d4a]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {m === 'All' ? 'All markets' : MARKET_NAMES[m]}
                  </button>
                ))}
              </div>
            </div>

            {/* Flights table */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#14235d] uppercase tracking-wider">Every flight, every metric</h3>
                <span className="text-xs text-gray-400">
                  {rows.length} of {FLIGHTS.length} shown &middot; click a column to sort
                </span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full min-w-[820px] text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-[11px] uppercase tracking-wider text-gray-500">
                      {columns.map(([k, l]) => (
                        <th key={k} className="px-3 py-3 font-bold whitespace-nowrap">
                          <button type="button" onClick={() => toggleSort(k)} className="inline-flex items-center gap-1 hover:text-[#14235d] cursor-pointer">
                            {l} <SortIcon k={k} />
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {rows.map((f) => (
                        <motion.tr
                          key={f.name}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`border-t border-gray-100 transition-colors ${hoverDot === f.name ? 'bg-blue-50' : 'hover:bg-blue-50/40'}`}
                        >
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[#14235d]">{f.name}</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{f.market}</span>
                            </div>
                            <div className="text-[11px] text-gray-400 mt-0.5">
                              {f.category} &middot; {f.city}
                            </div>
                            {f.note && <div className="text-[11px] text-violet-700 mt-0.5">{f.note}</div>}
                          </td>
                          <td className="px-3 py-3 tabular-nums text-gray-700">{f.reach}%</td>
                          <td className="px-3 py-3 tabular-nums text-gray-700">{f.linkage === null ? <span className="text-gray-300">&ndash;</span> : `${f.linkage}%`}</td>
                          <td className="px-3 py-3 tabular-nums text-gray-700">+{f.aware}</td>
                          <td className="px-3 py-3 tabular-nums text-gray-700">+{f.assoc}</td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2">
                              <span className="tabular-nums font-bold text-[#14235d] w-8">+{f.fav}</span>
                              <Pass ok={clearsFav(f)} norm={NORMS[f.market].fav} />
                              <div className="hidden sm:block flex-1 h-1.5 rounded-full bg-gray-100 max-w-[70px]">
                                <div className="h-full rounded-full bg-[#8b5cf6]" style={{ width: `${(f.fav / 45) * 100}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2">
                              <span className="tabular-nums font-bold text-[#14235d] w-8">+{f.intent}</span>
                              <Pass ok={clearsIntent(f)} norm={NORMS[f.market].intent} />
                              <div className="hidden sm:block flex-1 h-1.5 rounded-full bg-gray-100 max-w-[70px]">
                                <div className="h-full rounded-full bg-[#1e68e5]" style={{ width: `${(f.intent / 45) * 100}%` }} />
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                          No flight matches &ldquo;{query}&rdquo;. Try a category or a market.
                        </td>
                      </tr>
                    )}
                    {rows.length === FLIGHTS.length && (
                      <tr className="border-t-2 border-gray-200 bg-gray-50 font-bold text-[#14235d]">
                        <td className="px-3 py-3">Mean of all nine</td>
                        <td className="px-3 py-3 tabular-nums">{MEAN.reach}%</td>
                        <td className="px-3 py-3 tabular-nums">{MEAN.linkage}%</td>
                        <td className="px-3 py-3 tabular-nums">+{MEAN.aware}</td>
                        <td className="px-3 py-3 tabular-nums">+{MEAN.assoc}</td>
                        <td className="px-3 py-3 tabular-nums">+{MEAN.fav}</td>
                        <td className="px-3 py-3 tabular-nums">+{MEAN.intent}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Pass ok norm={20} /> cleared the norm agreed before the flight
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Pass ok={false} norm={20} /> missed it, and published anyway
                </span>
                <span>Linkage &ndash; = not asked in the same form on that flight.</span>
              </p>
            </div>

            {/* Pass-mark scorecard */}
            <div className="mt-10">
              <h3 className="text-sm font-bold text-[#14235d] uppercase tracking-wider">The pass marks, flight by flight</h3>
              <p className="mt-1 text-sm text-gray-500">
                Physical media is sold as a brand builder. Here, the lower-funnel metric cleared more often. Hover a dot to find its flight.
              </p>
              <div className="mt-5 space-y-4">
                {scorecard.map((row, ri) => {
                  const passed = FLIGHTS.filter(row.test).length;
                  return (
                    <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[180px_1fr_70px] items-center gap-2 sm:gap-4">
                      <span className="text-sm font-semibold text-gray-700">{row.label}</span>
                      <div className="flex flex-wrap gap-2">
                        {FLIGHTS.map((f, i) => {
                          const ok = row.test(f);
                          return (
                            <motion.button
                              key={f.name}
                              type="button"
                              title={`${f.name} (${MARKET_NAMES[f.market]}): +${f[row.key]} against a +${NORMS[f.market][row.key]} norm`}
                              aria-label={`${f.name}: ${ok ? 'cleared' : 'missed'} the ${row.label.toLowerCase()}`}
                              onMouseEnter={() => setHoverDot(f.name)}
                              onMouseLeave={() => setHoverDot(null)}
                              onFocus={() => setHoverDot(f.name)}
                              onBlur={() => setHoverDot(null)}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: ri * 0.3 + i * 0.06, type: 'spring', stiffness: 300, damping: 18 }}
                              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-shadow ${
                                ok ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-amber-400 text-amber-500'
                              } ${hoverDot === f.name ? 'ring-4 ring-[#1e68e5]/30' : ''}`}
                            >
                              {ok ? <Check className="w-4 h-4" strokeWidth={3} /> : <Minus className="w-4 h-4" strokeWidth={3} />}
                            </motion.button>
                          );
                        })}
                      </div>
                      <span className="text-lg font-extrabold text-[#14235d] tabular-nums sm:text-right">
                        {passed} of {FLIGHTS.length}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 min-h-[20px] text-sm text-[#14235d]">
                {hoverDot &&
                  (() => {
                    const f = FLIGHTS.find((x) => x.name === hoverDot)!;
                    return (
                      <span>
                        <strong>{f.name}</strong> &middot; {MARKET_NAMES[f.market]} &middot; favourability +{f.fav} (norm +{NORMS[f.market].fav}) &middot; purchase
                        intent +{f.intent} (norm +{NORMS[f.market].intent})
                      </span>
                    );
                  })()}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Three of the four favourability misses share one diagnosis: brands that started with very high awareness had little headroom left.
                That is a statement about the baseline, not the medium.
              </p>
            </div>
          </div>
        </Reveal>

        <SourceNote>
          URL2IRL Insights Report, Exhibit 6 (Moving Walls, 2026) &middot; nine Campaign Insights Reports and Brand Lift Studies: eight TikTok
          Out-of-Phone flights in Thailand and Vietnam, Feb&ndash;Jun 2026, and one Philippine fibre-broadband flight, Sep 2026 &middot; 150 exposed vs
          150 matched control per study &middot; lift in points, exposed minus control &middot; norms: +20 favourability / +18 intent (personal care and
          beauty), +23 / +13 for the Philippine flight (SEA general category) &middot; brands reported by category.
        </SourceNote>
      </div>
    </section>
  );
};
