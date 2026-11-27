'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Share2, ShoppingBag, Monitor, Lock, EyeOff, Timer, ArrowDown } from 'lucide-react';
import { COLORS } from './shared';

const grow = { initial: { scaleX: 0 }, animate: { scaleX: 1 } };

/* ---------------- FOLLOW ---------------- */

export function ReindexVisual() {
  const sources = [
    { icon: Search, name: 'Reindex Search', text: 'When people want it, hour by hour' },
    { icon: Share2, name: 'Reindex Social', text: 'Where they gather, place by place' },
    { icon: ShoppingBag, name: 'Reindex Commerce', text: 'What sells, store by store' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 md:gap-6 items-center">
      <div className="space-y-3">
        {sources.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${COLORS.cyan}22` }}>
              <s.icon className="w-4 h-4" style={{ color: COLORS.cyan }} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{s.name}</div>
              <div className="text-xs text-blue-100/60">{s.text}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="hidden md:flex flex-col items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-10 h-0.5 rounded"
            style={{ backgroundColor: COLORS.cyan }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl p-5 text-center border"
        style={{ borderColor: `${COLORS.cyan}66`, backgroundColor: `${COLORS.cyan}12` }}
      >
        <div className="text-xs uppercase tracking-wider text-cyan-200/80 font-bold">One engine</div>
        <div className="text-lg font-extrabold text-white mt-1">Your plan</div>
        <div className="text-xs text-blue-100/60 mt-2 max-w-[160px] mx-auto">Bring your own dashboards. Nobody learns a new one.</div>
      </motion.div>
    </div>
  );
}

function demand(h: number) {
  return 0.12 + 0.82 * Math.exp(-((h - 21) ** 2) / (2 * 1.9 ** 2)) + 0.22 * Math.exp(-((h - 12.5) ** 2) / (2 * 1.4 ** 2));
}

export function DemandClockVisual() {
  const W = 600;
  const H = 220;
  const x = (h: number) => 30 + (h / 24) * (W - 60);
  const y = (d: number) => H - 30 - d * (H - 60);
  const pts: string[] = [];
  for (let h = 0; h <= 24; h += 0.25) pts.push(`${x(h).toFixed(1)},${y(demand(h)).toFixed(1)}`);
  const line = `M ${pts.join(' L ')}`;
  const area = `${line} L ${x(24)},${H - 30} L ${x(0)},${H - 30} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <linearGradient id="dc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.35" />
            <stop offset="100%" stopColor={COLORS.cyan} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.rect
          x={x(17.5)}
          y={20}
          width={x(19.5) - x(17.5)}
          height={H - 50}
          rx="6"
          fill={COLORS.green}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          transition={{ delay: 1.2 }}
        />
        <motion.path d={area} fill="url(#dc-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} />
        <motion.path
          d={line}
          fill="none"
          stroke={COLORS.cyan}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
        <line x1={x(21)} x2={x(21)} y1={18} y2={H - 30} stroke="white" strokeDasharray="4 4" strokeOpacity="0.8" />
        <line x1={x(0)} x2={x(24)} y1={H - 30} y2={H - 30} stroke="white" strokeOpacity="0.15" />
        {[0, 6, 12, 18, 23].map((h) => (
          <text key={h} x={x(h)} y={H - 10} textAnchor="middle" fontSize="12" fill="rgba(199,210,254,0.6)" fontFamily="monospace">
            {String(h).padStart(2, '0')}
          </text>
        ))}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <text x={x(18.5)} y={14} textAnchor="middle" fontSize="12" fontWeight="700" fill={COLORS.green}>
            We buy here
          </text>
          <text x={x(21) + 6} y={14} fontSize="12" fontWeight="700" fill="white">
            They decide
          </text>
        </motion.g>
      </svg>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-blue-100/70">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: `${COLORS.green}66` }} /> The drive home &middot; the hours we buy
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-0.5" style={{ backgroundColor: COLORS.cyan }} /> Searches, site visits and sign-ups (illustrative)
        </span>
      </div>
      <p className="mt-4 text-sm text-blue-100/80">
        Roadside media is usually sold in fortnights, all day. Demand Clock buys the drive-time hours just before the evening
        peak. Nadia&apos;s searches peak at 9pm; we meet her on the 6:40pm drive home.
      </p>
    </div>
  );
}

const PHONES = [
  { x: 62, y: 38, counted: true },
  { x: 140, y: 60, counted: true },
  { x: 40, y: 120, counted: false },
  { x: 160, y: 140, counted: true },
  { x: 100, y: 170, counted: false },
  { x: 58, y: 70, counted: false },
  { x: 128, y: 30, counted: false },
  { x: 175, y: 95, counted: true },
  { x: 30, y: 160, counted: true },
];

export function ProofOfPresenceVisual() {
  const stats = [
    { v: 'Timestamped', l: 'Every play logged. Photo proof on schedule.' },
    { v: '~200 m', l: 'A viewshed fence drawn around every screen.' },
    { v: '3+ passes', l: 'In 30 days before a phone joins your audience.' },
    { v: 'Patented', l: 'Multi-sensor verification: vision, Wi-Fi/BLE and edge compute.' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="relative aspect-square max-w-[260px] mx-auto w-full">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {[30, 60, 90].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={COLORS.cyan} strokeOpacity="0.25" strokeDasharray="3 4" />
          ))}
          <path d="M100 100 L100 10 A90 90 0 0 1 163.6 36.4 Z" fill={COLORS.cyan} opacity="0.12">
            <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="4s" repeatCount="indefinite" />
          </path>
          {PHONES.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.counted ? 5 : 4}
              fill={p.counted ? COLORS.green : 'transparent'}
              stroke={p.counted ? COLORS.green : 'rgba(255,255,255,0.45)'}
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-[0_0_24px_rgba(34,211,238,0.6)]">
            <Monitor className="w-6 h-6 text-[#0b1437]" />
          </div>
        </div>
        <div className="mt-2 flex justify-center gap-4 text-[11px] text-blue-100/70">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.green }} /> Counted (3+ passes)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-white/50" /> One-off passer-by
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.v}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-xl bg-white/5 border border-white/10 p-3.5"
          >
            <div className="text-base sm:text-lg font-extrabold" style={{ color: COLORS.cyan }}>
              {s.v}
            </div>
            <div className="text-[11px] text-blue-100/70 mt-1 leading-snug">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- PROVE ---------------- */

export function TwinControlVisual() {
  const bars = [
    { label: 'Saw it', value: 55, color: COLORS.violet },
    { label: 'Their twins · didn’t see it', value: 33, color: 'rgba(255,255,255,0.35)' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex items-end justify-center gap-6 sm:gap-10 h-56">
        {bars.map((b, i) => (
          <div key={b.label} className="flex flex-col items-center justify-end h-full w-20 sm:w-24">
            <motion.div
              className="text-2xl font-extrabold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.2 }}
            >
              {b.value}%
            </motion.div>
            <motion.div
              className="w-full rounded-t-xl"
              style={{ backgroundColor: b.color }}
              initial={{ height: 0 }}
              animate={{ height: `${(b.value / 60) * 100}%` }}
              transition={{ duration: 0.9, delay: i * 0.2, ease: 'easeOut' }}
            />
            <div className="mt-2 text-[11px] text-center text-blue-100/70 h-8 leading-tight">{b.label}</div>
          </div>
        ))}
        <motion.div
          className="self-center text-center"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: 'spring' }}
        >
          <div className="text-5xl font-extrabold" style={{ color: COLORS.violet }}>
            +22
          </div>
          <div className="text-xs text-blue-100/70">points of lift
            <br />over their twins</div>
        </motion.div>
      </div>
      <ul className="space-y-3">
        {[
          { t: 'Same market, same weeks', d: 'The season cancels out.' },
          { t: 'Brand hidden among rivals', d: 'Linkage is a real test, not a prompt.' },
          { t: 'Nobody knows who paid', d: 'No one answers to please.' },
        ].map((item, i) => (
          <motion.li
            key={item.t}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12 }}
            className="rounded-xl bg-white/5 border border-white/10 p-4"
          >
            <div className="text-sm font-bold text-white">{item.t}</div>
            <div className="text-xs text-blue-100/60 mt-0.5">{item.d}</div>
          </motion.li>
        ))}
        <li className="text-xs text-blue-100/60 pt-1">
          Nadia&apos;s twin: same city, same age, same shopping habits. Only the campaign is different.
        </li>
      </ul>
    </div>
  );
}

const PASS_ROWS = [
  { label: 'Awareness', lift: 14, bar: 7 },
  { label: '“Smart choice”', lift: 13, bar: 16 },
  { label: 'Favourability', lift: 28, bar: 23 },
  { label: 'Purchase intent', lift: 26, bar: 13 },
];

export function PassMarkVisual() {
  const scale = (v: number) => (v / 32) * 100;
  return (
    <div>
      <div className="space-y-4">
        {PASS_ROWS.map((r, i) => {
          const pass = r.lift >= r.bar;
          return (
            <div key={r.label} className="grid grid-cols-[110px_1fr_auto] sm:grid-cols-[140px_1fr_auto] items-center gap-3">
              <div className="text-sm font-semibold text-white">{r.label}</div>
              <div className="relative h-7 rounded-lg bg-white/5">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-lg origin-left"
                  style={{ width: `${scale(r.lift)}%`, backgroundColor: pass ? COLORS.violet : 'rgba(255,255,255,0.3)' }}
                  {...grow}
                  transition={{ duration: 0.8, delay: i * 0.12 }}
                />
                <div className="absolute -top-1 -bottom-1 w-0.5 bg-white" style={{ left: `${scale(r.bar)}%` }} title={`Pass mark +${r.bar}`} />
                <span className="absolute inset-y-0 left-2 flex items-center text-xs font-bold text-white">+{r.lift}</span>
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${pass ? 'bg-violet-400/20 text-violet-200' : 'bg-white/10 text-white/70'}`}
              >
                {pass ? `Cleared +${r.bar}` : `Under by ${r.bar - r.lift}`}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center gap-2 text-[11px] text-blue-100/60">
        <span className="w-0.5 h-3 bg-white" /> Pass mark, fixed before fieldwork
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { v: '3 of 4', l: 'metrics cleared a norm fixed before fieldwork' },
          { v: '−3', l: 'under the bar — printed with the wins' },
          { v: '86%', l: 'brand linkage, against an 80% gate' },
        ].map((s) => (
          <div key={s.v} className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="text-xl font-extrabold" style={{ color: COLORS.violet }}>
              {s.v}
            </div>
            <div className="text-[11px] text-blue-100/60 mt-0.5 leading-snug">{s.l}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-blue-100/50">
        Philippines, September 2026 &middot; national fibre broadband brand (masked) &middot; nine cities &middot; 150 vs 150 &middot; SEA
        general-category norms fixed before fieldwork.
      </p>
    </div>
  );
}

const RULER = [
  { label: 'Favourability (top box)', v: 28, e: 10.6 },
  { label: 'Purchase intent (top box)', v: 26, e: 10.7 },
  { label: 'Favourability (top two)', v: 22, e: 9.2 },
  { label: 'Purchase intent (top two)', v: 20, e: 9.9 },
  { label: 'Aided awareness', v: 14, e: 10.4 },
  { label: '“Smart choice”', v: 13, e: 11.2 },
  { label: '“Value for money”', v: 12, e: 11.1 },
];

export function OpenRulerVisual() {
  const [hover, setHover] = useState<number | null>(null);
  const s = (v: number) => (v / 40) * 100;
  return (
    <div>
      <div className="relative">
        <div className="grid grid-cols-[150px_1fr] sm:grid-cols-[190px_1fr] gap-3">
          <div />
          <div className="relative h-5 text-[10px] font-mono text-blue-100/50">
            {[0, 10, 20, 30, 40].map((t) => (
              <span key={t} className="absolute -translate-x-1/2" style={{ left: `${s(t)}%` }}>
                {t === 0 ? '0' : `+${t}`}
              </span>
            ))}
          </div>
        </div>
        {RULER.map((r, i) => {
          const clears = i < 4;
          const color = clears ? COLORS.violet : 'rgba(255,255,255,0.5)';
          return (
            <div
              key={r.label}
              className="grid grid-cols-[150px_1fr] sm:grid-cols-[190px_1fr] gap-3 items-center py-1.5 cursor-default"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div className={`text-xs sm:text-sm transition-colors ${hover === i ? 'text-white font-semibold' : 'text-blue-100/80'}`}>{r.label}</div>
              <div className="relative h-6">
                <div className="absolute inset-y-0 rounded" style={{ left: `${s(13)}%`, width: `${s(16) - s(13)}%`, backgroundColor: 'rgba(255,255,255,0.08)' }} />
                <motion.div
                  className="absolute top-1/2 h-0.5 -translate-y-1/2 origin-center"
                  style={{ left: `${s(r.v - r.e)}%`, width: `${s(2 * r.e)}%`, backgroundColor: color }}
                  {...grow}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                />
                <motion.div
                  className="absolute top-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-[#0b1437]"
                  style={{ left: `${s(r.v)}%`, backgroundColor: color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: hover === i ? 1.5 : 1 }}
                  transition={{ delay: hover === null ? 0.3 + i * 0.08 : 0 }}
                />
                {hover === i && (
                  <span className="absolute -top-5 text-[11px] font-bold text-white whitespace-nowrap -translate-x-1/2" style={{ left: `${s(r.v)}%` }}>
                    +{r.v} &plusmn;{r.e}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-blue-100/70">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.violet }} /> Clears the floor
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/50" /> Real, but under its own floor
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-2.5 rounded-sm bg-white/10" /> Detection floor &middot; 13&ndash;16 pts at 150 per cell
        </span>
      </div>
      <p className="mt-4 text-sm text-blue-100/80">
        A brand-lift number with no margin of error is a number, not a result. Every figure ships with its 95% confidence interval and
        the smallest effect the study was powered to find.
      </p>
    </div>
  );
}

/* ---------------- RETURN ---------------- */

const RETURN_STEPS = [
  { t: 'Expose', when: 'Same day', d: 'The screen plays in the hours that matter.' },
  { t: 'Pool', when: '1–5 days later', d: 'Phones that passed 3+ times become one audience.' },
  { t: 'Return', when: 'Within a week', d: 'It lands in your own Meta, TikTok and Google seats.' },
  { t: 'Convert', when: 'From week two', d: 'Your team retargets it. Existing customers are left out.' },
];

export function AudienceReturnVisual() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % RETURN_STEPS.length), 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-white/10">
          <motion.div
            className="h-full"
            style={{ backgroundColor: COLORS.green }}
            animate={{ width: `${(step / (RETURN_STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        {RETURN_STEPS.map((s, i) => {
          const on = i <= step;
          return (
            <button
              key={s.t}
              type="button"
              onClick={() => setStep(i)}
              className="relative text-center flex flex-col items-center cursor-pointer"
            >
              <span
                className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors"
                style={{
                  backgroundColor: on ? COLORS.green : COLORS.navy,
                  borderColor: on ? COLORS.green : 'rgba(255,255,255,0.2)',
                  color: on ? COLORS.navy : 'white',
                }}
              >
                {i + 1}
              </span>
              <span className="mt-2 text-sm font-bold text-white">{s.t}</span>
              <span className="text-[11px] font-semibold" style={{ color: on ? COLORS.green : 'rgba(199,210,254,0.5)' }}>
                {s.when}
              </span>
              <span className={`mt-1 text-[11px] leading-snug transition-colors ${i === step ? 'text-blue-100/90' : 'text-blue-100/40'}`}>{s.d}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Lock, t: 'Your seats', d: 'We never sit between you and your customers.' },
          { icon: EyeOff, t: 'No names', d: 'Consented device IDs, only in large audiences.' },
          { icon: Timer, t: 'Expiring IDs', d: 'Tokens end with the campaign.' },
        ].map((g) => (
          <div key={g.t} className="flex gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5">
            <g.icon className="w-4 h-4 mt-0.5 flex-none" style={{ color: COLORS.green }} />
            <div>
              <div className="text-sm font-bold text-white">{g.t}</div>
              <div className="text-[11px] text-blue-100/60">{g.d}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-blue-100/80">By Thursday, Nadia sees the offer again &mdash; in her own feed, bought by your team.</p>
    </div>
  );
}

export function OneVerdictVisual() {
  const cols = [
    {
      head: 'Read by the controlled study',
      q: 'Did it change what people think?',
      rows: [
        ['Instrument', 'Blind matched panel, 300 people'],
        ['Clock', 'Two weeks after the flight'],
        ['Verdict', 'Pass or fail against a published norm'],
      ],
      foot: 'Paid for by the brand budget',
    },
    {
      head: 'Read in your own accounts',
      q: 'Did it bring new customers?',
      rows: [
        ['Instrument', 'The returned audience, in your seats'],
        ['Clock', 'Search in days; conversions from week two'],
        ['Verdict', 'Cost per genuinely new customer'],
      ],
      foot: 'Inherited by the performance budget',
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cols.map((c, i) => (
          <motion.div
            key={c.head}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="rounded-2xl bg-white/5 border border-white/10 p-5"
          >
            <div className="text-[11px] uppercase tracking-wider font-bold" style={{ color: COLORS.green }}>
              {c.head}
            </div>
            <div className="mt-1 text-lg font-extrabold text-white">{c.q}</div>
            <dl className="mt-4 space-y-2">
              {c.rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[80px_1fr] gap-2 text-xs">
                  <dt className="text-blue-100/50">{k}</dt>
                  <dd className="text-blue-100/90">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-blue-100/60">{c.foot}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 rounded-xl overflow-hidden border border-white/10">
        {[
          ['Days', 'Search and site visits move.'],
          ['Weeks', 'Minds move, against twins.'],
          ['Months', 'The till moves, where data is connected.'],
        ].map(([t, d], i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className="p-3 sm:p-4 border-r border-white/10 last:border-r-0"
            style={{ backgroundColor: `rgba(52,211,153,${0.06 + i * 0.06})` }}
          >
            <div className="text-sm font-extrabold text-white">{t}</div>
            <div className="text-[11px] text-blue-100/70 leading-snug">{d}</div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-sm text-blue-100/80">
        Brand or performance? Both, on one clock &mdash; so the move between them finally has a price.
      </p>
    </div>
  );
}

export function CategoryNormsVisual() {
  const stats = [
    { v: '9', l: 'controlled flights reported in full' },
    { v: '+24', l: 'mean favourability lift, top box' },
    { v: '8 of 9', l: 'cleared the purchase-intent norm' },
    { v: '5 of 9', l: 'cleared the favourability norm' },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl bg-white/5 border border-white/10 p-4"
          >
            <div className="text-2xl font-extrabold" style={{ color: COLORS.green }}>
              {s.v}
            </div>
            <div className="text-[11px] text-blue-100/60 mt-1 leading-snug">{s.l}</div>
          </motion.div>
        ))}
      </div>
      <p className="mt-5 text-sm text-blue-100/80">
        Every flight becomes the benchmark for the next one &mdash; wins and misses in one table. Before a screen is booked, you know what to
        expect.
      </p>
      <a
        href="#knowledge-base"
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold rounded-full px-5 py-2.5 transition-colors"
        style={{ backgroundColor: COLORS.green, color: COLORS.navy }}
      >
        Explore the benchmarks <ArrowDown className="w-4 h-4" />
      </a>
    </div>
  );
}
