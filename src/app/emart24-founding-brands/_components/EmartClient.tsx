'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronDown, Loader2, Mail, MessageCircle, X } from 'lucide-react';
import {
  CATEGORIES,
  CLOSE_AT,
  CLOSE_LABEL,
  CONTACT,
  RESPONSE_TIME,
  SLOTS,
  SLOT_STATUS,
  SlotId,
} from '../_data';
import { NetworkSection } from './NetworkSection';
import { BookCallModal } from './BookCallModal';
import { firstName, isValidEmail, isValidPhone, submitLead } from './submitLead';

type Audience = 'brand' | 'agency';

const catById = (id: string) => CATEGORIES.find((c) => c.id === id);
const slotById = (id: string) => SLOTS.find((s) => s.id === id)!;

const eyebrow = 'font-mono text-xs tracking-[0.1em] uppercase';
const inputCls =
  'w-full rounded-md border border-[#c8cec9] bg-white px-3 py-2.5 text-[#15181a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#127a4a] focus:border-transparent';

/* ------------------------------------------------------------------ */
/* Countdown                                                           */
/* ------------------------------------------------------------------ */
function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null) return null;
  const ms = Math.max(0, CLOSE_AT.getTime() - now);
  return {
    closed: ms === 0,
    d: Math.floor(ms / 864e5),
    h: Math.floor((ms % 864e5) / 36e5),
    m: Math.floor((ms % 36e5) / 6e4),
    s: Math.floor((ms % 6e4) / 1e3),
  };
}

const Countdown: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const c = useCountdown();
  const units = c ? [
    { v: c.d, l: 'days' },
    { v: c.h, l: 'hrs' },
    { v: c.m, l: 'min' },
    { v: c.s, l: 'sec' },
  ] : [];
  if (c?.closed) return <span className="font-mono text-2xl">Closed</span>;
  return (
    <div className="flex items-end gap-2 sm:gap-3" aria-label={c ? `${c.d} days ${c.h} hours ${c.m} minutes left` : 'Countdown'}>
      {(c ? units : [{ v: 0, l: 'days' }, { v: 0, l: 'hrs' }, { v: 0, l: 'min' }, { v: 0, l: 'sec' }]).map((u, i) => (
        <React.Fragment key={u.l}>
          {i > 0 && <span className={`font-mono text-2xl sm:text-3xl pb-4 ${dark ? 'text-white/40' : 'text-[#c8cec9]'}`}>:</span>}
          <div className="flex flex-col items-center">
            <span
              className={`font-mono tabular-nums text-3xl sm:text-4xl font-medium rounded-md px-2.5 py-1.5 min-w-[3.2rem] text-center ${
                dark ? 'bg-white/10 text-white' : 'bg-[#15181a] text-white'
              }`}
            >
              {c ? String(u.v).padStart(2, '0') : '--'}
            </span>
            <span className={`mt-1 text-[10px] font-mono uppercase tracking-[0.12em] ${dark ? 'text-white/60' : 'text-[#596166]'}`}>{u.l}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* ePaper panel preview: shows the visitor's brand in their slot        */
/* ------------------------------------------------------------------ */
const EpaperPanel: React.FC<{ brand: string; catId: string; otherTxt: string; slotId: SlotId | null }> = ({
  brand,
  catId,
  otherTxt,
  slotId,
}) => {
  // With nothing chosen yet, the panel cycles through example categories and hours.
  const [demo, setDemo] = useState(0);
  const idle = !catId;
  useEffect(() => {
    if (!idle) return;
    const t = setInterval(() => setDemo((d) => (d + 1) % (CATEGORIES.length - 1)), 2600);
    return () => clearInterval(t);
  }, [idle]);

  const cat = idle ? CATEGORIES[demo] : catById(catId)!;
  const slot = slotById(slotId || (idle ? cat.best[0] : cat.best[0] || '0810') || '0810');
  const catName = cat.id === 'other' ? otherTxt.trim() || 'Your category' : cat.name;
  const key = `${cat.id}-${slot.id}-${brand}`;

  return (
    <div className="rounded-xl bg-[#2a2e31] p-3.5 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.5)]">
      <div className="relative aspect-[9/12] rounded-sm bg-[#dfe1dc] text-[#141618] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <div className="flex justify-between font-mono text-xs sm:text-sm">
              <span>{slot.label}</span>
              <span>{slot.name}</span>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] opacity-70">{catName}</p>
              <p className="mt-2 text-3xl sm:text-4xl font-extrabold leading-[1.05] break-words">{brand || 'Your brand'}</p>
              <p className="mt-3 text-base">{cat.tag}</p>
            </div>
            <div className="flex justify-between font-mono text-[10px] opacity-70">
              <span>eMart24 · ePaper</span>
              <span>All 15 stores</span>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* ePaper refresh flash: a quick black frame each time the content changes */}
        <motion.div
          key={`flash-${key}`}
          className="absolute inset-0 bg-[#141618] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'linear' }}
        />
      </div>
      <p className="mt-2 font-mono text-[11px] text-white/60 text-center">{idle ? 'Example: choose your category to preview yours' : 'Preview: your panel in this slot'}</p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */
export const EmartClient: React.FC<{ slotStatus?: Record<string, 'talks' | 'taken'> }> = ({ slotStatus = {} }) => {
  // Google Sheet statuses win over any fallback kept in _data.ts
  const STATUS = useMemo(() => ({ ...SLOT_STATUS, ...slotStatus }), [slotStatus]);
  const [aud, setAud] = useState<Audience>('brand');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [otherTxt, setOtherTxt] = useState('');
  const [picks, setPicks] = useState<string[]>([]); // "category:slot"
  const [lastSlot, setLastSlot] = useState<SlotId | null>(null);
  const [bookOpen, setBookOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // Claim form
  const [name, setName] = useState('');
  const [clientBrand, setClientBrand] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [formErr, setFormErr] = useState('');
  const [sending, setSending] = useState(false);
  const [claimed, setClaimed] = useState<{ first: string; client: string } | null>(null);

  const claimRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLElement>(null);
  const claimInView = useInView(claimRef, { margin: '-20% 0px -20% 0px' });
  const boardInView = useInView(boardRef, { margin: '0px 0px -40% 0px' });

  // Personalised links for sales outreach: ?co=Brand&cat=snacks&aud=agency
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const co = q.get('co');
      const cat = q.get('cat');
      if (co) setCompany(co.slice(0, 60));
      if (cat && catById(cat)) setCategory(cat);
      if (q.get('aud') === 'agency') setAud('agency');
    } catch {
      /* ignore */
    }
  }, []);

  const agency = aud === 'agency';
  const catName = (id: string) => (id === 'other' ? otherTxt.trim() || 'Other' : catById(id)?.name || '');

  const togglePick = useCallback(
    (slotId: SlotId) => {
      if (!category) return;
      const k = `${category}:${slotId}`;
      setPicks((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
      setLastSlot(slotId);
    },
    [category]
  );

  const removePick = (k: string) => setPicks((p) => p.filter((x) => x !== k));

  const picksLabel = useMemo(
    () => picks.map((k) => `${catName(k.split(':')[0])} · ${slotById(k.split(':')[1]).label}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [picks, otherTxt]
  );

  const previewBrand = agency ? clientBrand || company : company;
  const cat = catById(category);

  const openBook = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setBookOpen(true);
  };

  const submitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!picks.length) {
      setFormErr('Pick at least one slot above first.');
      return;
    }
    if (picks.some((k) => k.startsWith('other:')) && !otherTxt.trim()) {
      setFormErr('Please tell us your category above.');
      return;
    }
    if (!name.trim() || !company.trim() || !email.trim() || (agency && !clientBrand.trim())) {
      setFormErr(agency ? 'Please add your name, agency, client brand and email.' : 'Please add your name, company and email.');
      return;
    }
    if (!isValidEmail(email)) {
      setFormErr('Please enter a valid email address.');
      return;
    }
    if (whatsapp.trim() && !isValidPhone(whatsapp)) {
      setFormErr('Please enter a valid WhatsApp number, or leave it empty.');
      return;
    }
    setFormErr('');
    setSending(true);
    // For the Zoho alert: slots in time order with their daypart names, e.g. "08–10 Morning, 16–18 Late afternoon".
    // Grouped by category only when more than one category was picked.
    const catIds = Array.from(new Set(picks.map((k) => k.split(':')[0])));
    const slotsFor = (cid: string) =>
      SLOTS.filter((s) => picks.includes(`${cid}:${s.id}`))
        .map((s) => `${s.label} ${s.name}`)
        .join(', ');
    const slotsText = catIds.length === 1 ? slotsFor(catIds[0]) : catIds.map((cid) => `${catName(cid)}: ${slotsFor(cid)}`).join('; ');
    const res = await submitLead('claim', {
      audience: agency ? 'Agency' : 'Brand',
      name: name.trim(),
      company: company.trim(),
      clientBrand: agency ? clientBrand.trim() : '',
      category: catIds.map(catName).join(', '),
      slots: slotsText,
      email: email.trim(),
      whatsapp: whatsapp.trim(),
    });
    setSending(false);
    if (!res.ok) {
      setFormErr(res.error || 'Something went wrong. Please try again.');
      return;
    }
    setClaimed({ first: firstName(name), client: clientBrand.trim() });
  };

  return (
    <div className="bg-[#f4f6f3] text-[#15181a]">
      <style>{`
        @keyframes em-pulse { 0% { transform: scale(.6); opacity: .7 } 80%,100% { transform: scale(2.4); opacity: 0 } }
        .em-pulse { opacity: 0; transform-box: fill-box; transform-origin: center; }
        @media (prefers-reduced-motion: no-preference) { .em-pulse { animation: em-pulse 3.2s ease-out infinite; } }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-[#e8ebe7] pt-24 sm:pt-28 pb-14 sm:pb-20">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
          <div className="flex flex-col gap-5 min-w-0">
            <motion.span
              className="w-max max-w-full bg-[#15181a] text-[#e8ebe7] px-2.5 py-1.5 text-xs sm:text-sm font-black tracking-[0.12em] uppercase"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Founding brands · 15 eMart24 stores
            </motion.span>
            <AnimatePresence mode="wait">
              <motion.div key={aud} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <h1 className="text-[2.3rem] sm:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.05] tracking-tight">
                  {agency ? 'Your client could be the first to lead their industry.' : 'Be the first to lead your industry.'}
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-[#596166]">
                  {agency ? 'Beat their competitors to it.' : 'Beat your competitors to it.'}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="relative inline-flex w-max max-w-full rounded-full bg-white p-1 shadow-sm border border-[#c8cec9]" role="group" aria-label="I am">
              {(['brand', 'agency'] as Audience[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAud(a)}
                  aria-pressed={aud === a}
                  className={`relative z-10 px-4 sm:px-5 py-2 text-sm font-semibold rounded-full cursor-pointer transition-colors ${
                    aud === a ? 'text-white' : 'text-[#15181a] hover:text-[#127a4a]'
                  }`}
                >
                  {aud === a && <motion.span layoutId="em-aud" className="absolute inset-0 -z-10 rounded-full bg-[#15181a]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  {a === 'brand' ? "I'm a brand" : "I'm an agency"}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#board"
                id="emart24-hero-pick-slot"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#127a4a] text-white font-bold hover:bg-[#0e6a3f] transition-colors"
              >
                Pick your slot <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={openBook}
                id="emart24-hero-book-call"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border-2 border-[#15181a] text-[#15181a] font-bold hover:bg-[#15181a] hover:text-white transition-colors cursor-pointer"
              >
                Book a 15-minute call
              </button>
            </div>
          </div>

          <div className="relative min-w-0 pb-10 sm:pb-0">
            <motion.figure
              className="relative rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/emart24/cover-storefront.jpg" alt="eMart24 store front at Bangsar South among trees" className="w-full aspect-[4/3] object-cover" />
              <figcaption className="absolute left-3 top-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded font-mono text-[11px]">eMart24 · Bangsar South</figcaption>
            </motion.figure>
            <motion.figure
              className="absolute -bottom-2 sm:-bottom-8 right-3 sm:-right-4 w-[38%] max-w-[190px] rounded-md overflow-hidden border-4 border-white shadow-2xl bg-white"
              initial={{ opacity: 0, y: 30, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 120, damping: 14 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/emart24/epaper-panel-real.jpg" alt="An ePaper panel mounted in an eMart24 window" className="w-full aspect-[3/4] object-cover" />
              <figcaption className="px-2 py-1 font-mono text-[10px] text-[#596166] leading-tight">ePaper panel in the window</figcaption>
            </motion.figure>
          </div>
        </div>

        {/* Countdown strip */}
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 mt-14 sm:mt-16">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 border-t-2 border-[#15181a] border-b border-b-[#c8cec9] py-5">
            <span className={`${eyebrow} text-[#596166] md:w-40`}>Founding window closes</span>
            <Countdown />
            <p className="text-sm text-[#596166] md:max-w-xs">
              on <strong className="text-[#15181a]">{CLOSE_LABEL}</strong>. First to confirm in each category takes it.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- FOUNDING BRANDS ---------------- */}
      <section className="bg-[#0f2747] text-white py-16 sm:py-20">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <p className={`${eyebrow} text-[#9fb6d6]`}>What founding brands get</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight max-w-3xl">
            {agency ? 'What your client gets for being first.' : 'Everything that comes with being first.'}
          </h2>
          <ul className="mt-10 pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: 'Your category, your hours', d: 'No competitor in your category in your hours. All 15 stores.' },
              { t: 'First on the network', d: 'The first brands shoppers see, with first pick as new stores open.' },
              { t: 'Measured results', d: "Reports in week 2 and on day 45, before you decide what's next." },
            ].map((b, i) => (
              <motion.li
                key={b.t}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12 }}
              >
                <b className="font-mono text-sm font-medium text-[#9fb6d6] tracking-[0.08em]">0{i + 1}</b>
                <strong className="text-xl font-bold">{b.t}</strong>
                <span className="text-[#d3dded]">{b.d}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 sm:gap-8 items-center rounded-lg border-2 border-[#4cc98a] bg-[#4cc98a]/10 p-6 sm:p-8"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="w-max border-2 border-[#4cc98a] text-[#4cc98a] px-4 py-3 text-sm font-black tracking-[0.1em] uppercase text-center leading-tight"
              initial={{ rotate: -8, scale: 1.3, opacity: 0 }}
              whileInView={{ rotate: -3, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 12 }}
            >
              Founding
              <br />
              rate
            </motion.span>
            <p className="text-lg text-[#d3dded]">
              <strong className="text-white">Our lowest rate on the network, for 2 months.</strong> Then{' '}
              <strong className="text-white">20% off the rate card for the next 12 months</strong>, if you choose to continue once you&apos;ve seen your
              results. Founding brands only, until the window closes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------- NETWORK ---------------- */}
      <NetworkSection />

      {/* ---------------- SLOT BOARD ---------------- */}
      <section id="board" ref={boardRef} className="scroll-mt-20 py-16 sm:py-20 bg-[#e8ebe7]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <p className={`${eyebrow} text-[#596166]`}>Availability</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Pick your category. Choose your hours.</h2>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">
            <div className="min-w-0">
              <div className="flex flex-wrap items-end gap-4 sm:gap-8">
                <label className="block w-full sm:w-auto sm:min-w-[300px]">
                  <span className="block text-sm font-semibold mb-1.5">Your category</span>
                  <select
                    className={`${inputCls} cursor-pointer`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    id="emart24-category"
                  >
                    <option value="">Choose a category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
                {category === 'other' && (
                  <label className="block w-full sm:w-auto sm:min-w-[260px]">
                    <span className="block text-sm font-semibold mb-1.5">Tell us your category</span>
                    <input className={inputCls} value={otherTxt} onChange={(e) => setOtherTxt(e.target.value)} placeholder="e.g. pet food, insurance, gaming" autoFocus />
                  </label>
                )}
                <p className="text-sm text-[#596166] flex-1 min-w-[220px]">
                  <strong className="text-[#15181a]">10 time slots a day. One brand per category.</strong>
                  <br />
                  {!category
                    ? 'Choose your category first.'
                    : category === 'other'
                    ? 'Pick as many open slots as you like.'
                    : "Green dotted slots are our suggestion. You're free to pick any open slots, as many as you like."}
                </p>
              </div>

              {/* 24-hour strip */}
              <div className="mt-8 hidden sm:block" aria-hidden="true">
                <div className="flex h-2 rounded-full overflow-hidden bg-[#c8cec9]">
                  {SLOTS.map((s) => {
                    const w = s.id === '0006' ? 6 : 2;
                    const picked = picks.includes(`${category}:${s.id}`);
                    const best = cat?.best.includes(s.id);
                    return (
                      <motion.div
                        key={s.id}
                        style={{ flexGrow: w }}
                        className="border-r border-[#e8ebe7] last:border-r-0"
                        animate={{ backgroundColor: picked ? '#127a4a' : best ? '#8fd1ae' : '#c8cec9' }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1 font-mono text-[10px] text-[#596166]">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </div>
              </div>

              <div className={`mt-5 grid grid-cols-2 sm:grid-cols-5 gap-x-2.5 gap-y-4 transition-opacity ${category ? '' : 'opacity-60'}`} role="group" aria-label="Time slots">
                {SLOTS.map((s, i) => {
                  const k = `${category}:${s.id}`;
                  const st = category ? STATUS[k] || 'open' : 'open';
                  const on = picks.includes(k);
                  const best = cat?.best.includes(s.id);
                  const txt = on ? 'Selected' : st === 'open' ? 'Open' : st === 'talks' ? 'In talks' : 'Taken';
                  return (
                    <motion.button
                      key={s.id}
                      type="button"
                      disabled={st === 'taken'}
                      onClick={() => (category ? togglePick(s.id) : document.getElementById('emart24-category')?.focus())}
                      aria-pressed={on}
                      aria-label={`${s.label}, ${s.name}, ${txt}${best ? ', suggested' : ''}`}
                      whileTap={{ scale: 0.96 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className={`relative flex flex-col items-start text-left gap-0.5 rounded-md border-[1.5px] p-3 cursor-pointer transition-colors ${
                        on
                          ? 'bg-[#127a4a] border-[#127a4a] text-white shadow-lg'
                          : st === 'taken'
                          ? 'bg-[#7a7f83] border-[#7a7f83] text-white cursor-not-allowed'
                          : best
                          ? 'bg-white border-dotted border-2 border-[#127a4a] hover:bg-[#d8ebdf]'
                          : 'bg-white border-[#c8cec9] hover:border-[#15181a]'
                      }`}
                    >
                      {best && !on && (
                        <span className="absolute -top-2.5 right-2 rounded-full bg-[#127a4a] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          Suggested
                        </span>
                      )}
                      <span className="font-mono text-base font-semibold tabular-nums">{s.label}</span>
                      <span className={`text-[13px] ${on || st === 'taken' ? 'text-white/85' : 'text-[#596166]'}`}>{s.name}</span>
                      <span
                        className={`mt-1 text-[13px] font-semibold ${
                          on ? 'text-white' : st === 'open' ? 'text-[#127a4a]' : st === 'talks' ? 'text-[#a86b00]' : 'text-white'
                        }`}
                      >
                        {on ? '✓ Selected' : txt}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2 min-h-[40px]" aria-live="polite">
                {picks.length === 0 ? (
                  <span className="text-sm text-[#596166]">No hours selected yet.</span>
                ) : (
                  <>
                    <span className="text-sm text-[#596166]">Selected:</span>
                    <AnimatePresence initial={false}>
                      {picks.map((k, i) => (
                        <motion.button
                          key={k}
                          type="button"
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => removePick(k)}
                          className="inline-flex items-center gap-1.5 font-mono text-xs border-[1.5px] border-[#127a4a] bg-[#d8ebdf] px-2.5 py-1.5 rounded cursor-pointer hover:bg-[#c3e2cf]"
                          aria-label={`Remove ${picksLabel[i]}`}
                        >
                          {picksLabel[i]} <X className="w-3 h-3" />
                        </motion.button>
                      ))}
                    </AnimatePresence>
                    <a href="#claim" className="ml-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#127a4a] text-white text-sm font-bold hover:bg-[#0e6a3f]">
                      Claim {picks.length} {picks.length > 1 ? 'slots' : 'slot'} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </>
                )}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 max-w-[300px] w-full mx-auto">
              <EpaperPanel brand={previewBrand} catId={category} otherTxt={otherTxt} slotId={lastSlot && picks.includes(`${category}:${lastSlot}`) ? lastSlot : null} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CLAIM ---------------- */}
      <section id="claim" ref={claimRef} className="scroll-mt-20 py-16 sm:py-20 bg-[#f4f6f3]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div>
            <p className={`${eyebrow} text-[#596166]`}>Claim</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              {agency ? 'Your client could be the first. Pick their slot.' : 'Be the first. Pick your slot.'}
            </h2>
            <ul className="mt-6 space-y-3 text-[#596166]">
              {['Your category, your hours, across all 15 stores.', 'Founding rate: our lowest on the network.', `We confirm everything ${RESPONSE_TIME}.`].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#127a4a] flex-none mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-white border border-[#c8cec9] p-6 sm:p-8 shadow-sm min-w-0">
            <AnimatePresence mode="wait">
              {claimed ? (
                <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6" role="status">
                  <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
                    <CheckCircle2 className="w-16 h-16 mx-auto text-[#127a4a]" />
                  </motion.div>
                  {agency ? (
                    <>
                      <h3 className="mt-4 text-2xl font-bold">
                        Thank you{claimed.first ? `, ${claimed.first}` : ''}. We&apos;ve received your request for {claimed.client}.
                      </h3>
                      <p className="mt-3 text-[#596166]">
                        Our team will contact you {RESPONSE_TIME} to confirm your client&apos;s slot and founding rate.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="mt-4 text-2xl font-bold">
                        Thank you{claimed.first ? `, ${claimed.first}` : ''}. We&apos;ve noted your category and slots.
                      </h3>
                      <p className="mt-3 text-[#596166]">
                        Our team will contact you {RESPONSE_TIME} to confirm your slot and your founding rate.
                      </p>
                      <p className="mt-2 text-[#596166]">Founding places close on {CLOSE_LABEL}.</p>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submitClaim} noValidate className="grid gap-4" exit={{ opacity: 0 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="block text-sm font-semibold mb-1.5">Your name</span>
                      <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-semibold mb-1.5">{agency ? 'Agency' : 'Company'}</span>
                      <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" required />
                    </label>
                  </div>
                  {agency && (
                    <label className="block">
                      <span className="block text-sm font-semibold mb-1.5">Client brand</span>
                      <input className={inputCls} value={clientBrand} onChange={(e) => setClientBrand(e.target.value)} required />
                    </label>
                  )}
                  <div>
                    <span className="block text-sm font-semibold mb-1.5">{agency ? 'Their slots' : 'Your slots'}</span>
                    <div className="rounded-md border border-dashed border-[#c8cec9] bg-[#f4f6f3] px-3 py-2.5 text-sm">
                      {picks.length ? (
                        <>
                          {picksLabel.join(', ')} ·{' '}
                          <a href="#board" className="text-[#127a4a] underline">
                            change
                          </a>
                        </>
                      ) : (
                        <>
                          None yet.{' '}
                          <a href="#board" className="text-[#127a4a] underline">
                            Pick your slots
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="block text-sm font-semibold mb-1.5">Email</span>
                      <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-semibold mb-1.5">
                        WhatsApp number <span className="font-normal text-[#596166]">(optional)</span>
                      </span>
                      <input type="tel" className={inputCls} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} autoComplete="tel" placeholder="+60" />
                    </label>
                  </div>
                  {formErr && (
                    <p className="text-sm text-red-600" role="alert">
                      {formErr}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    id={agency ? 'emart24-claim-now' : 'emart24-claim-slot'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#127a4a] text-white font-bold text-base cursor-pointer hover:bg-[#0e6a3f] disabled:opacity-70"
                  >
                    {sending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {agency ? 'Claim now' : 'Claim my slot'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="py-16 sm:py-20 bg-[#e8ebe7]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <p className={`${eyebrow} text-[#596166]`}>How it works</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Only 3 steps to your storefront.</h2>
          <ol className="relative mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.span
              className="hidden md:block absolute top-6 left-[8%] right-[8%] h-0.5 bg-[#127a4a] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            {[
              { t: 'Pick your slot', d: 'Your category, your hours.' },
              { t: '15-minute call', d: 'Confirm slots and rate.' },
              { t: 'Go live', d: "eMart24 approves. You're on all 15 screens." },
            ].map((s, i) => (
              <motion.li
                key={s.t}
                className="relative"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.3 }}
              >
                <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#127a4a] text-white text-xl font-bold ring-8 ring-[#e8ebe7]">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
                <p className="mt-1 text-[#596166]">{s.d}</p>
              </motion.li>
            ))}
          </ol>

          <div className="mt-14 rounded-lg bg-[#15181a] text-white p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#127a4a]/30 blur-3xl pointer-events-none" />
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold">Talk to us before your category goes.</h3>
              <p className="mt-2 text-white/70">15 minutes. No obligation.</p>
            </div>
            <button
              type="button"
              onClick={openBook}
              id="emart24-steps-book-call"
              className="relative inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md bg-[#4cc98a] text-[#0b130e] font-bold text-lg hover:bg-[#62d69a] transition-colors cursor-pointer w-full md:w-auto"
            >
              Book a 15-minute call <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="py-16 sm:py-20 bg-[#f4f6f3]">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6">
          <p className={`${eyebrow} text-[#596166]`}>Questions</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Before you claim.</h2>
          <div className="mt-8 divide-y divide-[#c8cec9] border-y border-[#c8cec9]">
            {FAQS.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setFaqOpen(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left text-lg font-semibold cursor-pointer hover:text-[#127a4a]"
                  >
                    {f.q}
                    <ChevronDown className={`w-5 h-5 flex-none transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 text-[#596166]">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT STRIP ---------------- */}
      <section className="bg-[#e8ebe7] py-8 border-t border-[#c8cec9]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between gap-3 text-sm text-[#596166]">
          <span>Moving Walls · eMart24 ePaper network</span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            Questions: <strong className="text-[#15181a]">{CONTACT.name}, {CONTACT.role}</strong>
            {CONTACT.email ? (
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1 hover:text-[#127a4a]">
                <Mail className="w-4 h-4" /> {CONTACT.email}
              </a>
            ) : null}
            {CONTACT.whatsapp ? (
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#127a4a]">
                <MessageCircle className="w-4 h-4" /> WhatsApp {CONTACT.whatsappLabel}
              </a>
            ) : null}
          </span>
        </div>
      </section>

      {/* Floating bar: appears once slots are picked, until the claim form is on screen */}
      <AnimatePresence>
        {picks.length > 0 && !claimInView && !boardInView && !claimed && (
          <motion.div
            className="fixed bottom-4 inset-x-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 flex items-center justify-between gap-4 rounded-full bg-[#15181a] text-white pl-5 pr-2 py-2 shadow-2xl"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
          >
            <span className="text-sm">
              <strong>{picks.length}</strong> {picks.length > 1 ? 'slots' : 'slot'} selected
            </span>
            <a href="#claim" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4cc98a] text-[#0b130e] text-sm font-bold">
              Claim <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <BookCallModal open={bookOpen} onClose={() => setBookOpen(false)} audience={aud} defaultCompany={company} />
    </div>
  );
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Why ePaper?',
    a: (
      <>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['Street-facing.', 'In the window, seen by everyone walking past.'],
            ['Readable in sunlight.', 'Reflects daylight like paper, with no backlight.'],
            ['Low power.', 'Uses power only when the image changes.'],
            ['No reprints.', 'New artwork goes out remotely.'],
          ].map(([t, d]) => (
            <li key={t}>
              <strong className="text-[#15181a]">{t}</strong> {d}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs">
          Sources: SOLUM,{' '}
          <a
            className="underline"
            href="https://www.solum-group.com/resources/business-cases/insight-detail.retail.electronic-paper-what-is-e-paper-and-how-does-it-work"
            target="_blank"
            rel="noopener noreferrer"
          >
            Electronic paper: what is e-paper and how does it work?
          </a>
          ; E Ink,{' '}
          <a className="underline" href="https://blog.eink.com/cut-energy-costs-and-carbon-footprints" target="_blank" rel="noopener noreferrer">
            Cut energy costs and carbon footprints
          </a>
          .
        </p>
      </>
    ),
  },
  {
    q: 'What does it cost?',
    a: 'An exclusive founding rate for 2 months, our lowest on the network. If you continue, 20% off the rate card for the next 12 months. Exact rates shared on the call.',
  },
  { q: 'Can I take more than one slot?', a: 'Yes. Each slot is yours across all 15 stores.' },
  { q: 'Can I choose stores?', a: 'No. Founding brands run on all 15. You choose the hours.' },
  { q: 'When does it go live?', a: 'Once eMart24 approves your artwork. Founding brands go first.' },
  {
    q: 'How are results measured?',
    a: "You get a measurement report in week 2 and on day 45. You decide whether to continue, at 20% off the rate card for 12 months, after you've seen the results.",
  },
];
