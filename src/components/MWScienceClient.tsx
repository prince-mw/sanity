'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { SanityProduct } from '@/sanity/lib/fetch'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: 'experience',
    label: 'Experience',
    title: 'Experience Intelligence',
    desc: 'Understanding how people experience brands across every interaction and every moment that shapes decision-making.',
    themes: ['Customer journeys', 'Experience design', 'Behavioural signals', 'Moments that matter'],
    capabilities: [
      'CX measurement and monitoring',
      'CSAT and NPS tracking',
      'Real-time feedback collection',
      'Experience journey analysis',
      'Operational improvement insights',
    ],
    accent: 'bg-mw-blue-600', text: 'text-mw-blue-600', bg: 'bg-mw-blue-50', border: 'border-mw-blue-200', badge: 'bg-mw-blue-100 text-mw-blue-700',
  },
  {
    id: 'media',
    label: 'Media',
    title: 'Media Intelligence',
    desc: 'Helping brands understand what media works, why it works, and how to continuously improve performance across channels.',
    themes: ['Media effectiveness', 'Planning', 'Optimisation', 'Campaign performance'],
    capabilities: [
      'OOH measurement and attribution',
      'Cross-channel effectiveness analysis',
      'Incrementality science',
      'Campaign performance forecasting',
      'Media mix optimisation',
    ],
    accent: 'bg-mw-blue-700', text: 'text-mw-blue-700', bg: 'bg-mw-blue-50', border: 'border-mw-blue-200', badge: 'bg-mw-blue-100 text-mw-blue-700',
  },
  {
    id: 'location',
    label: 'Location',
    title: 'Location Intelligence',
    desc: 'Connecting physical environments with consumer behaviour to understand how place influences decisions.',
    themes: ['Spatial intelligence', 'Mobility', 'Context', 'Footfall'],
    capabilities: [
      'Footfall and mobility analysis',
      'Place-based audience segmentation',
      'Context-aware targeting',
      'Physical journey mapping',
      'Retail environment intelligence',
    ],
    accent: 'bg-mw-blue-500', text: 'text-mw-blue-500', bg: 'bg-mw-blue-50', border: 'border-mw-blue-200', badge: 'bg-mw-blue-100 text-mw-blue-700',
  },
  {
    id: 'audience',
    label: 'Audience',
    title: 'Audience Intelligence',
    desc: 'Moving beyond demographics to understand intent, motivations, behaviours, and evolving audience needs.',
    themes: ['Behaviour', 'Segmentation', 'Intent', 'Audience evolution'],
    capabilities: [
      'Audience personas and segmentation',
      'Usage and attitude studies',
      'Consumer journey mapping',
      'Behavioral and preference analysis',
      'Market and category intelligence',
    ],
    accent: 'bg-mw-blue-400', text: 'text-mw-blue-500', bg: 'bg-mw-blue-50', border: 'border-mw-blue-200', badge: 'bg-mw-blue-100 text-mw-blue-700',
  },
  {
    id: 'innovation',
    label: 'Innovation',
    title: 'Innovation Intelligence',
    desc: 'Exploring AI and new methodologies that continuously shape the future of marketing intelligence and decision-making.',
    themes: ['AI & Machine learning', 'New methodologies', 'Future capabilities', 'Experimentation'],
    capabilities: [
      'Concept and creative testing',
      'Message and product validation',
      'A/B experimentation frameworks',
      'Predictive analytics',
      'AI-powered research synthesis',
    ],
    accent: 'bg-mw-blue-800', text: 'text-mw-blue-800', bg: 'bg-mw-blue-50', border: 'border-mw-blue-200', badge: 'bg-mw-blue-100 text-mw-blue-700',
  },
]

const OUTCOMES = [
  { title: 'Better Customer Understanding', metric: '94%', sub: 'audience prediction accuracy', desc: "Know who your audience is, what they want, and when they're ready to act." },
  { title: 'Smarter Media Investments', metric: '+287%', sub: 'average audience lift', desc: 'Allocate budgets to the moments and channels that drive measurable impact.' },
  { title: 'More Effective Planning', metric: '3.2×', sub: 'ROI improvement on planned campaigns', desc: 'Build plans grounded in evidence, not assumption, before spend begins.' },
  { title: 'Higher Marketing Performance', metric: '40%', sub: 'reduction in wasted spend', desc: 'Continuous optimisation that gets smarter with every campaign cycle.' },
  { title: 'Continuous Optimisation', metric: '60+', sub: 'signals processed per second', desc: 'Real-time intelligence that adapts as markets and audiences evolve.' },
  { title: 'Confident Business Decisions', metric: '4B+', sub: 'physical signals analysed', desc: 'Turn physical-world complexity into clear, actionable recommendations.' },
]

const MW_PRODUCTS = [
  { name: 'MW Planner', href: '/mw-planner', sub: 'Plan smarter' },
  { name: 'MW Market', href: '/mw-market', sub: 'Access inventory' },
  { name: 'MW Activate', href: '/mw-activate', sub: 'Run campaigns' },
  { name: 'MW Measure', href: '/mw-measure', sub: 'Prove impact' },
  { name: 'MW Studio', href: '/mw-studio', sub: 'Create content' },
  { name: 'MW Influence', href: '/mw-influence', sub: 'Reach audiences' },
]

const TESTIMONIALS = [
  {
    quote: 'We moved from gut-feel OOH planning to audience-led decisions. MW Science gave us the evidence we needed to justify spend and optimise in real time.',
    author: 'Head of Media',
    company: 'Regional FMCG Brand',
    outcome: '34% reduction in wasted media spend',
  },
  {
    quote: 'The ability to connect consumer sentiment with physical media performance changed how we brief campaigns. We now plan with confidence, not estimates.',
    author: 'Chief Marketing Officer',
    company: 'Telco Group, Southeast Asia',
    outcome: '2.8× improvement in campaign efficiency',
  },
]

const LOGOS = [
  'abs','amway','ariasia','astro','axiata','bake',
  'bat','beir','booking','bulak','cimb','clorox',
  'clubmed','colgaye','cpf','digitalist','electrolux','etika',
  'grab','invictus','kimberly','liberty','loreal','maxis',
  'mediacorp','mpa','mudah','net','ocbc','paypal',
  'robi','sephora','taylors','uob','whisper','x',
]

// ─── LIVING JOURNEY MAP SVG ────────────────────────────────────────────────────
// Clean 3-band flow: physical touchpoints → intelligence layer → decisions.
// Spacious layout, slow subtle motion, minimal line-work.

function LivingJourneyMap() {
  // Four evenly-spaced touchpoints — generous horizontal breathing room
  const touchpoints = [
    { x: 80,  label: 'Billboard', delay: 0 },
    { x: 173, label: 'Transit',   delay: 1.5 },
    { x: 267, label: 'Store',     delay: 3 },
    { x: 360, label: 'Mobile',    delay: 4.5 },
  ]
  const TP_Y = 96          // touchpoint row
  const LAYER_Y = 240      // intelligence layer bar
  const CENTER = 220

  // Gentle arc connecting the four touchpoints
  const journeyPath = `M 80 ${TP_Y} Q 126 ${TP_Y - 26} 173 ${TP_Y} Q 220 ${TP_Y + 26} 267 ${TP_Y} Q 313 ${TP_Y - 26} 360 ${TP_Y}`

  return (
    <svg viewBox="0 0 440 350" className="w-full max-w-[440px] mx-auto" aria-hidden="true">
      <defs>
        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0" />
          <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="layerBar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="15%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.9" />
          <stop offset="85%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="layerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Band 1: Journey arc + touchpoints ── */}
      <motion.path
        d={journeyPath}
        fill="none" stroke="#93c5fd" strokeWidth="1" strokeOpacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, delay: 0.5, ease: 'easeInOut' }}
      />

      {/* One slow travelling pulse — the person's journey */}
      <circle r="3.5" fill="#dbeafe">
        <animateMotion dur="9s" repeatCount="indefinite" path={journeyPath} />
      </circle>
      <circle r="9" fill="#93c5fd" opacity="0.15">
        <animateMotion dur="9s" repeatCount="indefinite" path={journeyPath} />
      </circle>

      {touchpoints.map((t, i) => (
        <g key={t.label}>
          {/* soft slow ripple */}
          <motion.circle
            cx={t.x} cy={TP_Y} r="12"
            fill="none" stroke="#93c5fd" strokeWidth="0.8"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.7], opacity: [0.35, 0] }}
            transition={{ duration: 3.5, delay: t.delay, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: `${t.x}px ${TP_Y}px` }}
          />
          {/* node */}
          <motion.circle
            cx={t.x} cy={TP_Y} r="4.5"
            fill="#1e3a8a" stroke="#93c5fd" strokeWidth="1.4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.18, type: 'spring', stiffness: 140 }}
          />
          {/* label — generous space above */}
          <motion.text
            x={t.x} y={TP_Y - 26}
            textAnchor="middle" fontSize="11" fontWeight="500" fill="#bfdbfe" fontFamily="inherit" letterSpacing="0.4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.8, delay: 0.7 + i * 0.18 }}
          >
            {t.label}
          </motion.text>
        </g>
      ))}

      {/* ── Band 2: Soft signal beams flowing down ── */}
      {touchpoints.map(t => (
        <g key={`beam-${t.label}`}>
          {/* static faint guide */}
          <line
            x1={t.x} y1={TP_Y + 16} x2={t.x} y2={LAYER_Y - 18}
            stroke="#60a5fa" strokeOpacity="0.10" strokeWidth="1"
          />
          {/* one slow drifting particle per beam */}
          <circle r="2" fill="#93c5fd" opacity="0.8">
            <animateMotion
              dur="4.5s"
              begin={`${t.delay * 0.6}s`}
              repeatCount="indefinite"
              path={`M ${t.x} ${TP_Y + 18} L ${t.x} ${LAYER_Y - 20}`}
            />
          </circle>
        </g>
      ))}

      {/* ── Band 3: The Intelligence Layer — one clean bar ── */}
      <ellipse cx={CENTER} cy={LAYER_Y} rx="185" ry="34" fill="url(#layerGlow)" />

      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        {/* main bar */}
        <line x1="35" y1={LAYER_Y} x2="405" y2={LAYER_Y} stroke="url(#layerBar)" strokeWidth="2" />
        {/* echo lines above & below for depth */}
        <line x1="75" y1={LAYER_Y - 7} x2="365" y2={LAYER_Y - 7} stroke="#60a5fa" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="75" y1={LAYER_Y + 7} x2="365" y2={LAYER_Y + 7} stroke="#60a5fa" strokeOpacity="0.15" strokeWidth="1" />

        {/* slow shimmer travelling across the bar */}
        <motion.line
          x1="35" y1={LAYER_Y} x2="405" y2={LAYER_Y}
          stroke="#ffffff" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="30 340"
          initial={{ strokeDashoffset: 370 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', delay: 1.4 }}
          opacity="0.5"
        />
      </motion.g>

      {/* Layer wordmark — clean, spaced typography */}
      <motion.text
        x={CENTER} y={LAYER_Y + 34}
        textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff" fontFamily="inherit" letterSpacing="4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.6 }}
      >
        MW SCIENCE
      </motion.text>
      <motion.text
        x={CENTER} y={LAYER_Y + 50}
        textAnchor="middle" fontSize="8.5" fill="#93c5fd" fontFamily="inherit" letterSpacing="2.5"
        initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 1, delay: 1.9 }}
      >
        THE INTELLIGENCE LAYER
      </motion.text>

      {/* ── Output: single subtle line to decisions ── */}
      <motion.g
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.3 }}
      >
        <line
          x1={CENTER} y1={LAYER_Y + 62} x2={CENTER} y2={LAYER_Y + 82}
          stroke="#60a5fa" strokeOpacity="0.3" strokeWidth="1"
        />
        <circle r="1.8" fill="#93c5fd" opacity="0.9">
          <animateMotion dur="2.8s" repeatCount="indefinite" path={`M ${CENTER} ${LAYER_Y + 62} L ${CENTER} ${LAYER_Y + 82}`} />
        </circle>
        <text
          x={CENTER} y={LAYER_Y + 100}
          textAnchor="middle" fontSize="11" fontWeight="500" fill="#bfdbfe" fontFamily="inherit" letterSpacing="0.4"
        >
          Better Decisions
        </text>
      </motion.g>
    </svg>
  )
}

// ─── PRODUCT CARD ──────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: typeof MW_PRODUCTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
    >
      <Link
        href={product.href}
        className="group flex flex-col items-center gap-1 bg-white border border-mw-gray-200 hover:border-blue-300 hover:shadow-md rounded-xl px-5 py-3.5 transition-all text-center min-w-[110px]"
      >
        <span className="text-sm font-bold text-mw-gray-800 group-hover:text-mw-blue-700 transition-colors">{product.name}</span>
        <span className="text-xs text-mw-gray-400">{product.sub}</span>
      </Link>
    </motion.div>
  )
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

interface MWScienceClientProps {
  product?: SanityProduct | null
}

export default function MWScienceClient({ product }: MWScienceClientProps) {
  const [activePillar, setActivePillar] = useState(0)

  // ── CMS-driven content with static fallbacks ──
  const heroTitle = product?.heroTitle || 'The Intelligence Layer Behind Better Decisions'
  // Split title into 3 lines with a gradient middle line (preserves the designed treatment)
  const titleWords = heroTitle.split(' ')
  const third = Math.ceil(titleWords.length / 3)
  const titleLine1 = titleWords.slice(0, third).join(' ')
  const titleLine2 = titleWords.slice(third, third * 2).join(' ')
  const titleLine3 = titleWords.slice(third * 2).join(' ')
  const heroSubtitle = product?.heroSubtitle ||
    'MW Science transforms human, spatial and behavioural signals into intelligence that helps businesses make better decisions across every moment of the customer journey.'
  const heroStats = product?.heroStats && product.heroStats.length > 0
    ? product.heroStats.map(s => ({ v: s.value, l: s.label }))
    : [
        { v: '4B+', l: 'signals analysed' },
        { v: '30+', l: 'markets covered' },
        { v: '5', l: 'intelligence domains' },
      ]
  const ctaText = product?.ctaText || 'Get Started'
  const ctaLink = product?.ctaLink || '/contact'

  // Pillars: CMS override via detailPageSections (sectionKey: 'intelligence-pillars')
  const pillarSection = product?.detailPageSections?.find(s => s.sectionKey === 'intelligence-pillars')
  const pillars = PILLARS.map((p, i) => {
    const cms = pillarSection?.items?.[i]
    return cms
      ? {
          ...p,
          title: cms.title || p.title,
          desc: cms.description || p.desc,
          capabilities: cms.detail ? cms.detail.split('\n').filter(Boolean) : p.capabilities,
        }
      : p
  })
  const active = pillars[activePillar]

  // Outcomes: CMS override via detailPageSections (sectionKey: 'outcomes')
  const outcomeSection = product?.detailPageSections?.find(s => s.sectionKey === 'outcomes')
  const outcomes = outcomeSection?.items && outcomeSection.items.length > 0
    ? outcomeSection.items.map(item => ({
        title: item.title,
        metric: item.metric || '',
        sub: item.metricLabel || '',
        desc: item.description || '',
      }))
    : OUTCOMES

  // Testimonials: CMS override
  const testimonials = product?.testimonials && product.testimonials.length > 0
    ? product.testimonials.slice(0, 2).map(t => ({
        quote: t.quote,
        author: t.author,
        company: [t.role, t.company].filter(Boolean).join(', '),
        outcome: t.metric || '',
      }))
    : TESTIMONIALS

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(96,165,250,0.15),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
                {titleLine1}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-blue-400 to-mw-blue-500">
                  {titleLine2}
                </span>
                {titleLine3 && <><br />{titleLine3}</>}
              </h1>

              <p className="text-lg text-mw-gray-300 max-w-xl leading-relaxed font-light">
                {heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center gap-2 bg-mw-blue-600 hover:bg-mw-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all"
                >
                  {ctaText}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-xl font-medium transition-all"
                >
                  Explore Capabilities
                </a>
              </div>
            </motion.div>

            {/* Right: living journey map — open, no card frame */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
              className="relative h-[420px] hidden lg:flex items-center justify-center"
            >
              <LivingJourneyMap />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. GAP NARRATIVE ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 tracking-tight">
              Understanding journeys.<br />
              <span className="text-mw-blue-600">Powering better decisions.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 items-stretch">
            {[
              {
                icon: '⊘',
                tag: 'The Problem',
                head: "Brands don't struggle with a lack of data.",
                body: "They struggle with making sense of it. Data lives in silos—media, retail, consumer research—disconnected from the moments that matter.",
                cls: 'border-red-200 bg-red-50',
                tagCls: 'text-red-600',
              },
              {
                icon: '→',
                tag: 'The Reality',
                head: 'People move through journeys, not data points.',
                body: 'Every location, exposure and experience creates a signal. The challenge is connecting these signals into something actionable and continuous.',
                cls: 'border-mw-blue-100 bg-mw-blue-50',
                tagCls: 'text-mw-blue-600',
              },
              {
                icon: '◉',
                tag: 'MW Science',
                head: 'Intelligence that connects every signal.',
                body: 'MW Science ingests human, spatial, and behavioural signals and connects them into a continuous intelligence layer powering smarter decisions across the Moving Walls ecosystem.',
                cls: 'border-mw-blue-200 bg-mw-blue-50',
                tagCls: 'text-mw-blue-600',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`flex flex-col p-8 border ${card.cls}`}
              >
                <div className={`text-3xl font-bold mb-3 ${card.tagCls}`}>{card.icon}</div>
                <div className={`text-xs font-bold tracking-widest uppercase mb-3 ${card.tagCls}`}>{card.tag}</div>
                <h3 className="text-lg font-bold text-mw-gray-900 mb-3 leading-snug">{card.head}</h3>
                <p className="text-mw-gray-600 leading-relaxed text-sm flex-1">{card.body}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. FIVE INTELLIGENCE PILLARS ────────────────────────────────────── */}
      <section id="capabilities" className="py-24 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4 tracking-tight">
              Five Pillars of Intelligence
            </h2>
            <p className="text-lg text-mw-gray-500 max-w-2xl">
              Each pillar represents a domain where MW Science develops proprietary intelligence—not a methodology, but a living capability that continuously improves.
            </p>
          </motion.div>

          {/* Pill tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {pillars.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActivePillar(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activePillar === i
                    ? `${p.accent} text-white shadow-md scale-[1.02]`
                    : 'bg-white border border-mw-gray-200 text-mw-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Active pillar expanded content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`rounded-2xl border p-8 lg:p-10 ${active.bg} ${active.border}`}
            >
              <div className="grid lg:grid-cols-2 gap-10 items-start">

                {/* Left: title + desc + themes */}
                <div>
                  <div className={`inline-block w-3 h-3 rounded-full ${active.accent} mb-5`} />
                  <h3 className="text-2xl font-bold text-mw-gray-900 mb-3">{active.title}</h3>
                  <p className="text-mw-gray-600 leading-relaxed mb-6">{active.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {active.themes.map(t => (
                      <span key={t} className={`px-3 py-1 rounded-full text-xs font-semibold ${active.badge}`}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right: capabilities */}
                <div>
                  <h4 className="text-xs font-bold text-mw-gray-400 uppercase tracking-widest mb-5">Key Capabilities</h4>
                  <ul className="space-y-3.5">
                    {active.capabilities.map((cap, i) => (
                      <motion.li
                        key={cap}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${active.accent} mt-2 flex-shrink-0`} />
                        <span className="text-mw-gray-700 text-sm leading-relaxed">{cap}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── 4. ONE INTELLIGENCE LAYER ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 tracking-tight">
                One Intelligence Layer.<br />Every Product Smarter.
              </h2>
              <p className="text-mw-gray-600 leading-relaxed text-lg">
                Every Moving Walls product is powered by the same intelligence engine. Rather than operating independently, each product learns from the same connected intelligence—creating smarter recommendations, stronger optimisation, and better decisions over time.
              </p>
              <p className="text-mw-gray-400 italic text-sm border-l-4 border-blue-200 pl-4 py-1">
                "Every campaign teaches the system. Every insight sharpens the next decision."
              </p>
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 text-mw-blue-600 font-semibold hover:gap-3 transition-all text-sm"
              >
                Explore the Platform
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Right: constellation diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4"
            >
              {/* Top row */}
              <div className="flex gap-3 justify-center flex-wrap">
                {MW_PRODUCTS.slice(0, 3).map((p, i) => (
                  <ProductCard key={p.name} product={p} index={i} />
                ))}
              </div>

              {/* Center core */}
              <div className="relative flex items-center justify-center my-2">
                <div className="absolute inset-0 bg-mw-blue-100 rounded-full blur-2xl opacity-50 scale-[2.5]" />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="relative z-10 bg-gradient-to-br from-mw-blue-700 to-mw-blue-800 text-white rounded-2xl px-10 py-5 text-center shadow-2xl shadow-mw-blue-900/30"
                >
                  <div className="text-[10px] uppercase tracking-widest text-mw-blue-200 mb-1">Intelligence Core</div>
                  <div className="text-xl font-black tracking-tight">MW Science</div>
                  <div className="text-xs text-mw-blue-200 mt-1">Self-Learning · Always On</div>
                </motion.div>
              </div>

              {/* Bottom row */}
              <div className="flex gap-3 justify-center flex-wrap">
                {MW_PRODUCTS.slice(3).map((p, i) => (
                  <ProductCard key={p.name} product={p} index={i + 3} />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 5. OUTCOMES ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-mw-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">
              Intelligence That Creates Outcomes
            </h2>
            <p className="text-mw-gray-400 mt-3 max-w-2xl mx-auto">
              Instead of talking about features, here's what businesses actually achieve when intelligence replaces guesswork.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {outcomes.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-mw-gray-950 hover:bg-mw-gray-900 p-8 transition-colors"
              >
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-mw-blue-400 to-mw-blue-500 mb-1">
                  {o.metric}
                </div>
                <div className="text-xs text-mw-gray-500 mb-5">{o.sub}</div>
                <h3 className="text-white font-bold mb-2 text-sm">{o.title}</h3>
                <p className="text-mw-gray-400 text-sm leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-mw-gray-900 tracking-tight">Trusted by Industry Leaders</h2>
            <p className="text-mw-gray-500 mt-2">Fortune 500 and blue-chip brands across FMCG, telco, retail, aviation, and finance.</p>
          </motion.div>

          {/* Logo marquee — single infinite-scroll row */}
          <div className="relative overflow-hidden mb-16 [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {/* Duplicate the array twice for a seamless loop */}
              {[...LOGOS, ...LOGOS].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center h-16 w-32 bg-mw-gray-50 rounded-xl border border-mw-gray-100 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:shadow-sm transition-all duration-300"
                >
                  <Image
                    src={`/assets/images/ic-customers/${name}.webp`}
                    alt={name}
                    width={100}
                    height={40}
                    className="object-contain max-h-8 max-w-[80px]"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-gray-50 rounded-2xl border border-mw-gray-100 p-8 flex flex-col justify-between"
              >
                <blockquote className="text-mw-gray-700 italic leading-relaxed text-base mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="border-t border-mw-gray-200 pt-4">
                  <div className="font-bold text-mw-gray-900 text-sm">{t.author}</div>
                  <div className="text-mw-gray-400 text-xs">{t.company}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. NEWSROOM STRIP ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-mw-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-mw-gray-900 tracking-tight">Insights from MW Science</h2>
            </div>
            <Link href="/blog" className="text-sm text-mw-blue-600 font-semibold hover:underline hidden sm:block">
              View all insights →
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { type: 'Perspective', title: 'Why physical-world measurement is the next frontier for marketers', read: '5 min read' },
              { type: 'Data Report', title: 'The state of audience intelligence in Southeast Asian OOH markets', read: '8 min read' },
              { type: 'Thought Leadership', title: 'From gut feel to evidence: how brands are rewriting their media strategies', read: '6 min read' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href="/blog"
                  className="group flex flex-col bg-white rounded-2xl border border-mw-gray-200 p-6 h-full hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-mw-blue-600 mb-3">{item.type}</span>
                  <h3 className="font-semibold text-mw-gray-900 leading-snug mb-auto group-hover:text-mw-blue-700 transition-colors">{item.title}</h3>
                  <div className="text-xs text-mw-gray-400 mt-5 flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {item.read}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
