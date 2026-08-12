'use client'

import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CTAButton } from '@/components/CTAButton'
import Image from 'next/image'

// ─── ICONS ─────────────────────────────────────────────────────────────────────
// Hand-drawn, Heroicons-outline-style inline SVGs (this codebase never installs an
// icon library — every product page hand-writes these). 24x24 viewBox, strokeWidth 2.

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)

const AudienceIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.09 9.09 0 0 0 3.74-.48 3 3 0 0 0-4.68-2.72M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.94 15.52A3 3 0 0 0 2.26 18.24a8.99 8.99 0 0 0 3.74.48M6 18.72c0 .23.01.45.04.67A11.94 11.94 0 0 0 12 21c2.17 0 4.2-.58 5.96-1.58.03-.22.04-.44.04-.67m-12-3.2a5.97 5.97 0 0 1 5.06-2.78c2.1 0 3.96 1.08 5.06 2.78" />
  </svg>
)

const LocationIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.14-7.5 11.25-7.5 11.25S4.5 17.64 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
)

const MediaIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.35 14.65a3.75 3.75 0 0 1 0-5.3m5.3 0a3.75 3.75 0 0 1 0 5.3M6.23 17.77a6.75 6.75 0 0 1 0-9.55m11.54 0a6.75 6.75 0 0 1 0 9.55M3.1 20.9c-3.8-3.81-3.8-9.98 0-13.79m17.8 0c3.8 3.81 3.8 9.98 0 13.79M12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
  </svg>
)

const BrandIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11c.06.15.2.25.36.27l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 0 0-.18.56l1.28 5.39a.56.56 0 0 1-.84.6l-4.73-2.88a.56.56 0 0 0-.58 0l-4.73 2.88a.56.56 0 0 1-.84-.6l1.28-5.39a.56.56 0 0 0-.18-.56l-4.2-3.6a.56.56 0 0 1 .32-.99l5.52-.44a.56.56 0 0 0 .36-.27L11.48 3.5Z" />
  </svg>
)

const OutcomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <circle cx="12" cy="12" r="8.25" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const CompassIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <circle cx="12" cy="12" r="8.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.3 8.7l-1.8 4.6a1 1 0 0 1-.6.58l-4.2 1.42 1.8-4.6a1 1 0 0 1 .6-.58l4.2-1.42Z" />
  </svg>
)

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 6h6v6" />
  </svg>
)

const PulseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)

const SlidersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 14h6M9 8h6M17 16h6" />
  </svg>
)

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
)

const MapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 6v15l7-4 8 4 7-4V2l-7 4-8-4-7 4Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v15M16 6v15" />
  </svg>
)

const BuildingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <rect x="4" y="2" width="16" height="20" rx="1" strokeLinejoin="round" />
    <path strokeLinecap="round" d="M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 22v-4h4v4" />
  </svg>
)

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" />
  </svg>
)

// ─── DATA ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_STAGES = [
  {
    id: 'thread',
    kicker: '01',
    label: 'THREAD',
    tag: 'The lived experience.',
    body: 'A journey, interaction, visit, exposure or behaviour before meaning is assigned.',
  },
  {
    id: 'signal',
    kicker: '02',
    label: 'SIGNAL',
    tag: 'The meaningful pattern.',
    body: 'Evidence extracted from real-world behaviour, audiences, media exposure and outcomes.',
  },
  {
    id: 'compass',
    kicker: '03',
    label: 'COMPASS',
    tag: 'The confident decision.',
    body: 'The confidence needed to plan, optimise, measure and grow.',
  },
]

const SIGNALS = [
  {
    id: 'audience',
    label: 'Audience',
    title: 'Audience Signal',
    desc: 'Understand who people are, what motivates them and how behaviours evolve.',
    answers: [
      'Who are my audiences?',
      'What influences their decisions?',
      'How do their preferences change over time?',
    ],
    powers: ['Every product in the Moving Walls ecosystem'],
    icon: AudienceIcon,
    accent: 'bg-mw-blue-600', text: 'text-mw-blue-600', bg: 'bg-mw-blue-50', border: 'border-mw-blue-200', badge: 'bg-mw-blue-100 text-mw-blue-700',
  },
  {
    id: 'location',
    label: 'Location',
    title: 'Location Signal',
    desc: 'Understand how movement, proximity and place shape behaviour.',
    answers: [
      'Where do audiences come from?',
      'Which locations matter most?',
      'How does place influence outcomes?',
    ],
    powers: ['Moving Walls Inventory', 'Moving Walls Market', 'Moving Walls Planner'],
    icon: LocationIcon,
    accent: 'bg-teal-600', text: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', badge: 'bg-teal-100 text-teal-700',
  },
  {
    id: 'media',
    label: 'Media',
    title: 'Media Signal',
    desc: 'Measure exposure, engagement and contribution across channels.',
    answers: [
      'Which channels are working?',
      'Where is media investment creating value?',
      'How do channels work together?',
    ],
    powers: ['Moving Walls Planner', 'Moving Walls Influence', 'Moving Walls Activate'],
    icon: MediaIcon,
    accent: 'bg-violet-600', text: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', badge: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'brand',
    label: 'Brand',
    title: 'Brand Signal',
    desc: 'Track awareness, preference and perception over time.',
    answers: [
      'How is my brand performing?',
      'What drives consideration and loyalty?',
      'How do I compare against competitors?',
    ],
    powers: ['Moving Walls Measure'],
    icon: BrandIcon,
    accent: 'bg-orange-600', text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'outcome',
    label: 'Outcome',
    title: 'Outcome Signal',
    desc: 'Connect activity to measurable business impact.',
    answers: [
      'What changed?',
      'What drove the result?',
      'Where should investment go next?',
    ],
    powers: ['Moving Walls Measure'],
    icon: OutcomeIcon,
    accent: 'bg-green-600', text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700',
  },
]

const SIGNAL_TAG_COLORS: Record<string, string> = {
  'Audience Signal': 'text-mw-blue-600 bg-mw-blue-50',
  'Location Signal': 'text-teal-600 bg-teal-50',
  'Media Signal': 'text-violet-600 bg-violet-50',
  'Brand Signal': 'text-orange-600 bg-orange-50',
  'Outcome Signal': 'text-green-600 bg-green-50',
}

const RESEARCH_SOLUTIONS = [
  {
    title: 'Brand Lift Studies',
    description: 'Measure how campaigns influence awareness, consideration, preference and purchase intent.',
    tags: ['Brand Signal'],
    icon: TrendingUpIcon,
  },
  {
    title: 'Brand Health Tracking and Media Effectiveness',
    description: 'Monitor brand performance and benchmark competitive position over time.',
    tags: ['Brand Signal', 'Audience Signal'],
    icon: PulseIcon,
  },
  {
    title: 'Marketing Mix Modelling',
    description: 'Understand the contribution of every channel and optimise future investment.',
    tags: ['Media Signal', 'Outcome Signal'],
    icon: SlidersIcon,
  },
  {
    title: 'Audience Intelligence and Qualitative Research',
    description: 'Reveal motivations, preferences and behavioural patterns.',
    tags: ['Audience Signal'],
    icon: SearchIcon,
  },
  {
    title: 'Location & Place Intelligence',
    description: 'Understand movement, catchments, visitation patterns and real-world behaviour.',
    tags: ['Location Signal'],
    icon: MapIcon,
  },
  {
    title: 'Mall Experience Index',
    description: 'Measure engagement, loyalty, shopper quality and commercial effectiveness.',
    tags: ['Location Signal', 'Outcome Signal'],
    icon: BuildingIcon,
  },
]

const RESEARCH_AREAS = [
  'Brand Lift Studies',
  'Brand Health Tracking',
  'Audience Research',
  'Media Effectiveness and Concept Testing',
  'Marketing Mix Modelling',
  'Qualitative Research',
  'Innovation and Product Development',
  'Customer Experience',
  'Custom Research Programmes',
]

const WHY_COLUMNS = [
  { icon: EyeIcon, title: 'Read The Real World', body: 'Transform everyday human journeys into measurable signals.' },
  { icon: FilterIcon, title: 'Extract Meaningful Signals', body: 'Separate what matters from what merely exists.' },
  { icon: CompassIcon, title: 'Guide Better Decisions', body: 'Ground every decision, before, during and after investment in evidence, not assumption.' },
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
    quote: 'Thanks to their insightful market research, we were able to identify untapped opportunities in our industry and refine our product offerings accordingly. Their expertise truly helped us stay ahead of the competition.',
    author: 'CEO',
    company: 'Tech Startup',
  },
  {
    quote: 'Their market research provided invaluable insights into consumer behavior, enabling us to tailor our marketing campaigns for maximum impact. The results were impressive, driving significant growth in sales and brand awareness.',
    author: 'Marketing Director',
    company: 'FMCG Company',
  },
  {
    quote: 'We were amazed by the depth of analysis provided in their market research report. It gave us a clear understanding of our target audience and helped us develop products that truly resonate with their needs and preferences.',
    author: 'Product Development Director',
    company: 'Consumer Goods Company',
  },
  {
    quote: 'Their thorough market research not only helped us understand market trends but also identified potential risks and challenges that we were able to proactively address. Their strategic recommendations were instrumental in guiding our business decisions.',
    author: 'CFO',
    company: 'F&B Chain',
  },
  {
    quote: 'Their market research played a pivotal role in shaping our brand strategy. By understanding consumer perceptions and competitor landscapes, we were able to refine our messaging and establish a stronger brand presence in the market.',
    author: 'Brand Manager',
    company: 'Cosmetic Retailer',
  },
  {
    quote: 'The market research conducted by their team provided us with actionable insights that led to significant improvements in our customer experience. We saw a notable increase in customer satisfaction and loyalty as a result of implementing their recommendations.',
    author: 'Customer Experience Manager',
    company: 'Hospitality Industry',
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

// ─── SIGNAL CONSTELLATION (hero preview option 2) ─────────────────────────────
// The five signals as orbiting nodes, each pulsing a connection into the core.

function SignalConstellation() {
  const nodes = [
    { label: 'Audience', angle: -90 },
    { label: 'Location', angle: -18 },
    { label: 'Media', angle: 54 },
    { label: 'Brand', angle: 126 },
    { label: 'Outcome', angle: 198 },
  ]
  const CENTER = 150
  const RADIUS = 118
  const round = (n: number) => Math.round(n * 1000) / 1000
  const toXY = (angle: number) => {
    const rad = (angle * Math.PI) / 180
    return { x: round(CENTER + RADIUS * Math.cos(rad)), y: round(CENTER + RADIUS * Math.sin(rad)) }
  }
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[400px] mx-auto" aria-hidden="true">
      <defs>
        <radialGradient id="coreGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={CENTER} cy={CENTER} rx="70" ry="70" fill="url(#coreGlow2)" />
      {nodes.map((n, i) => {
        const { x, y } = toXY(n.angle)
        const path = `M ${x} ${y} L ${CENTER} ${CENTER}`
        return (
          <g key={n.label}>
            <line x1={x} y1={y} x2={CENTER} y2={CENTER} stroke="#60a5fa" strokeOpacity="0.15" strokeWidth="1" />
            <circle r="2" fill="#93c5fd">
              <animateMotion dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={path} />
            </circle>
            <motion.circle
              cx={x} cy={y} r="14"
              fill="#1e3a8a" stroke="#93c5fd" strokeWidth="1.4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15, type: 'spring', stiffness: 140 }}
            />
            <motion.text
              x={x} y={y - 22}
              textAnchor="middle" fontSize="10.5" fontWeight="500" fill="#bfdbfe" fontFamily="inherit" letterSpacing="0.4"
              initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ duration: 0.8, delay: 0.6 + i * 0.15 }}
            >
              {n.label}
            </motion.text>
          </g>
        )
      })}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2, type: 'spring' }}
      >
        <circle cx={CENTER} cy={CENTER} r="34" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
        <text x={CENTER} y={CENTER - 3} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff" fontFamily="inherit" letterSpacing="1">MW</text>
        <text x={CENTER} y={CENTER + 11} textAnchor="middle" fontSize="9" fontWeight="700" fill="#93c5fd" fontFamily="inherit" letterSpacing="1">SCIENCE</text>
      </motion.g>
    </svg>
  )
}

// ─── THREAD WEAVE (hero preview option 3) ─────────────────────────────────────
// Four labelled threads weave down and converge into a single signal.

function ThreadWeave() {
  const threads = [
    { label: 'Commute', x: 55, delay: 0 },
    { label: 'Store Visit', x: 148, delay: 1 },
    { label: 'Media Exposure', x: 252, delay: 2 },
    { label: 'Attention', x: 345, delay: 3 },
  ]
  const TOP_Y = 40
  const CONVERGE_X = 200
  const CONVERGE_Y = 210
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-[440px] mx-auto" aria-hidden="true">
      <defs>
        <radialGradient id="weaveGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
      </defs>
      {threads.map((t, i) => {
        const bow = i % 2 === 0 ? -30 : 30
        const path = `M ${t.x} ${TOP_Y} Q ${(t.x + CONVERGE_X) / 2} ${(TOP_Y + CONVERGE_Y) / 2 + bow} ${CONVERGE_X} ${CONVERGE_Y}`
        return (
          <g key={t.label}>
            <motion.path
              d={path} fill="none" stroke="#93c5fd" strokeWidth="1.2" strokeOpacity="0.35"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: 'easeInOut' }}
            />
            <circle r="3" fill="#dbeafe">
              <animateMotion dur="3.5s" begin={`${t.delay * 0.7}s`} repeatCount="indefinite" path={path} />
            </circle>
            <circle cx={t.x} cy={TOP_Y} r="4" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="1.2" />
            <text x={t.x} y={TOP_Y - 12} textAnchor="middle" fontSize="9.5" fill="#bfdbfe" fontFamily="inherit" letterSpacing="0.3">{t.label}</text>
          </g>
        )
      })}
      <ellipse cx={CONVERGE_X} cy={CONVERGE_Y} rx="90" ry="26" fill="url(#weaveGlow)" />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}>
        <line x1={CONVERGE_X - 80} y1={CONVERGE_Y} x2={CONVERGE_X + 80} y2={CONVERGE_Y} stroke="#60a5fa" strokeWidth="2" />
        <text x={CONVERGE_X} y={CONVERGE_Y + 24} textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff" fontFamily="inherit" letterSpacing="3">ONE SIGNAL</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
        <line x1={CONVERGE_X} y1={CONVERGE_Y + 14} x2={CONVERGE_X} y2={CONVERGE_Y + 40} stroke="#60a5fa" strokeOpacity="0.4" strokeWidth="1" />
        <text x={CONVERGE_X} y={CONVERGE_Y + 58} textAnchor="middle" fontSize="11" fontWeight="500" fill="#bfdbfe" fontFamily="inherit" letterSpacing="0.4">A Confident Decision</text>
      </motion.g>
    </svg>
  )
}

// ─── COMPASS NEEDLE (used on the Final CTA, beside "True North for OOH.") ─────
// Minimal compass that spins loosely and settles pointing north.

function CompassNeedle({ className }: { className?: string }) {
  const round = (n: number) => Math.round(n * 1000) / 1000
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180
    return {
      id: i,
      x1: round(50 + 46 * Math.sin(angle)), y1: round(50 - 46 * Math.cos(angle)),
      x2: round(50 + 40 * Math.sin(angle)), y2: round(50 - 40 * Math.cos(angle)),
    }
  })
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#60a5fa" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#93c5fd" strokeOpacity="0.2" strokeWidth="1" />
      {ticks.map(t => (
        <line key={t.id} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#93c5fd" strokeOpacity="0.3" strokeWidth="1" />
      ))}
      <motion.g
        initial={{ rotate: 135, opacity: 0 }}
        whileInView={{ rotate: [135, -20, 10, 0], opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, delay: 0.3, ease: 'easeOut' }}
        style={{ transformOrigin: '50px 50px' }}
      >
        <path d="M50 14 L58 50 L50 86 L42 50 Z" fill="#60a5fa" opacity="0.9" />
        <path d="M50 14 L58 50 L50 50 Z" fill="#ffffff" />
      </motion.g>
      <circle cx="50" cy="50" r="4" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="1.5" />
    </svg>
  )
}

// ─── FLOW CONNECTOR (Thread → Signal → Compass) ───────────────────────────────

function FlowConnector({ index }: { index: number }) {
  return (
    <div className="flex items-center justify-center py-1 md:py-0 md:px-1 shrink-0" aria-hidden="true">
      {/* Desktop: horizontal connector, dot travels left → right */}
      <svg className="hidden md:block w-14 h-8 text-mw-blue-300" viewBox="0 0 56 32" fill="none">
        <line x1="4" y1="16" x2="44" y2="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M38 9l10 7-10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="2.5" fill="#3b82f6">
          <animateMotion dur="2.2s" begin={`${index * 0.4}s`} repeatCount="indefinite" path="M4 16 L44 16" />
        </circle>
      </svg>
      {/* Mobile: vertical connector, dot travels top → bottom */}
      <svg className="block md:hidden w-8 h-10 text-mw-blue-300" viewBox="0 0 32 40" fill="none">
        <line x1="16" y1="4" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M9 22l7 10 7-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="2.5" fill="#3b82f6">
          <animateMotion dur="2.2s" begin={`${index * 0.4}s`} repeatCount="indefinite" path="M16 4 L16 28" />
        </circle>
      </svg>
    </div>
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

type HeroVariant = 'map' | 'constellation' | 'weave'

const HERO_VARIANT_LABELS: { key: HeroVariant; label: string }[] = [
  { key: 'map', label: 'Journey Map' },
  { key: 'constellation', label: 'Signal Constellation' },
  { key: 'weave', label: 'Thread Weave' },
]

export default function MWScienceClient() {
  const [activeSignal, setActiveSignal] = useState(0)
  const active = SIGNALS[activeSignal]
  const [heroVariant, setHeroVariant] = useState<HeroVariant>('map')

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* TEMPORARY — hero animation preview switcher, remove once a variant is picked */}
      <div className="fixed bottom-6 right-4 z-[60] bg-white/95 backdrop-blur rounded-xl shadow-xl border border-mw-gray-200 p-2 flex flex-col gap-1 text-xs">
        <span className="text-mw-gray-400 font-semibold px-2 pt-1">Hero preview</span>
        {HERO_VARIANT_LABELS.map(opt => (
          <button
            key={opt.key}
            onClick={() => setHeroVariant(opt.key)}
            className={`text-left px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              heroVariant === opt.key ? 'bg-mw-blue-600 text-white' : 'text-mw-gray-700 hover:bg-mw-gray-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                MW Science — The{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-blue-400 to-mw-blue-500">
                  Cognitive Compass
                </span>{' '}
                Behind Better OOH Decisions
              </h1>

              <div className="space-y-5 max-w-xl">
                <p className="text-xl md:text-2xl text-white font-light leading-snug">
                  Every journey leaves a thread.
                </p>
                <p className="text-lg text-mw-blue-200 font-light leading-relaxed">
                  A commute. A store visit. A smarter media exposure. A moment of attention.
                </p>
                <p className="text-mw-gray-300 leading-relaxed">
                  These are not events that happen in isolation. MW Science connects them into meaningful signals that reveal how people move, engage, decide and respond.
                </p>
                <p className="text-mw-gray-400 text-sm leading-relaxed">
                  As the Cognitive Compass powering the Moving Walls (MW) ecosystem, MW Science turns human, spatial, media and behavioural signals into the confidence to plan smarter, measure with rigour and act with precision.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-mw-blue-600 hover:bg-mw-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all"
                >
                  Talk to a MW Science Lab Expert
                  <ArrowRightIcon className="w-4 h-4" />
                </CTAButton>
                <a
                  href="#signals"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-xl font-medium transition-all"
                >
                  Explore Signals
                </a>
              </div>
            </motion.div>

            {/* Right: variant-specific diagram */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {heroVariant === 'map' && <LivingJourneyMap />}
              {heroVariant === 'constellation' && <SignalConstellation />}
              {heroVariant === 'weave' && <ThreadWeave />}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. FROM THREADS TO DECISIONS ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 tracking-tight mb-8">
              Every Decision Starts With A Signal
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-2xl md:text-3xl text-mw-gray-900 font-light leading-snug">
                People do not live in channels.
              </p>
              <p className="text-lg text-mw-gray-500 leading-relaxed">
                They move through places, experiences, screens, brands and moments.
              </p>
              <p className="text-mw-gray-600 leading-relaxed pt-2">
                Every journey creates thousands of threads. Most disappear into noise. MW Science identifies the signals hidden within them and turns those signals into data to help make informed decisions.
              </p>
              <p className="text-mw-gray-600 leading-relaxed">
                For some organisations, MW Science Lab serves as a standalone research partner. For others, it powers the intelligence behind the broader Moving Walls ecosystem. Built to get sharper with every campaign it measures.
              </p>
              <p className="text-mw-gray-600 leading-relaxed">
                Either way, the objective remains the same: uncover meaningful signals that drive better decisions across the OOH journey, from uncovering opportunity to proving business outcomes. Turning real world complexities into decision confidence.
              </p>
            </div>
          </motion.div>

          {/* Thread → Signal → Compass */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center">
            {FRAMEWORK_STAGES.map((stage, i) => (
              <Fragment key={stage.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`flex-1 relative flex flex-col p-8 bg-white border-2 rounded-2xl ${
                    i === 1
                      ? 'border-mw-blue-300 shadow-lg shadow-mw-blue-100/60 md:scale-105 z-10'
                      : 'border-mw-gray-200'
                  }`}
                >
                  <span className="text-xs font-bold tracking-widest text-mw-gray-400 mb-4">STAGE {stage.kicker}</span>
                  <h3 className="text-2xl font-black text-mw-gray-900 tracking-tight mb-2">{stage.label}</h3>
                  <p className="text-sm font-semibold text-mw-blue-600 mb-3">{stage.tag}</p>
                  <p className="text-mw-gray-600 text-sm leading-relaxed">{stage.body}</p>
                </motion.div>
                {i < FRAMEWORK_STAGES.length - 1 && <FlowConnector index={i} />}
              </Fragment>
            ))}
          </div>
          <p className="text-center text-mw-gray-400 italic text-sm mt-10">This is how the Cognitive Compass works.</p>

        </div>
      </section>

      {/* ── 3. FIVE SIGNALS ─────────────────────────────────────────────────── */}
      <section id="signals" className="py-24 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4 tracking-tight">
              Five Signals. One Cognitive Compass.
            </h2>
            <p className="text-lg text-mw-gray-500 max-w-2xl">
              MW Science is built around five core signals that help agencies and brands understand people, places, media performance and business outcomes.
            </p>
          </motion.div>

          {/* Pill tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {SIGNALS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveSignal(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeSignal === i
                    ? `${s.accent} text-white shadow-md scale-[1.02]`
                    : 'bg-white border border-mw-gray-200 text-mw-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Active signal expanded content */}
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

                {/* Left: icon + title + desc + powers */}
                <div>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${active.accent} mb-5`}>
                    <active.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-mw-gray-900 mb-3">{active.title}</h3>
                  <p className="text-mw-gray-600 leading-relaxed mb-6">{active.desc}</p>
                  <h4 className="text-xs font-bold text-mw-gray-400 uppercase tracking-widest mb-3">Powers</h4>
                  <div className="flex flex-wrap gap-2">
                    {active.powers.map(p => (
                      <span key={p} className={`px-3 py-1 rounded-full text-xs font-semibold ${active.badge}`}>{p}</span>
                    ))}
                  </div>
                </div>

                {/* Right: answers */}
                <div>
                  <h4 className="text-xs font-bold text-mw-gray-400 uppercase tracking-widest mb-5">Answers</h4>
                  <ul className="space-y-3.5">
                    {active.answers.map((ans, i) => (
                      <motion.li
                        key={ans}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${active.accent} mt-2 flex-shrink-0`} />
                        <span className="text-mw-gray-700 text-sm leading-relaxed">{ans}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── 4. SIGNALS IN ACTION ────────────────────────────────────────────── */}
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
                Signals at work across the entire OOH journey
              </h2>
              <p className="text-mw-gray-600 leading-relaxed text-lg">
                The five signals do not operate independently. Together, they create a complete view of how audiences move from awareness to action.
              </p>
              <p className="text-mw-gray-600 leading-relaxed text-lg">
                Whether planning a campaign, evaluating a location, measuring brand growth or optimising investment, MW Science helps organisations understand not just what happened, but the why behind it.
              </p>
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
                  <div className="text-[10px] uppercase tracking-widest text-mw-blue-200 mb-1">Five Signals</div>
                  <div className="text-lg font-black tracking-tight leading-snug">Audience · Location · Media<br />Brand · Outcome</div>
                  <div className="text-xs text-mw-blue-200 mt-1">Powering every decision</div>
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

      {/* ── 5. MW SCIENCE LAB ────────────────────────────────────────────────── */}
      <section className="py-24 bg-mw-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 tracking-tight mb-3">MW Science Lab</h2>
            <p className="text-lg text-mw-blue-600 font-medium mb-6">Research that reveals the signals behind growth.</p>
            <p className="text-mw-gray-600 leading-relaxed max-w-2xl mx-auto mb-12">
              MW Science Lab is the research capability within MW Science. It combines market research, human understanding and rigorous measurement to ground decisions about audiences, brands and outcomes with greater confidence.
            </p>
          </motion.div>

          {/* Core Research Areas — pill cloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-gradient-to-br from-mw-blue-50 via-white to-mw-blue-50 border border-mw-blue-100 rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-xs font-bold text-mw-gray-400 uppercase tracking-widest mb-6">Core Research Areas</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {RESEARCH_AREAS.map((area, i) => (
                <motion.span
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`inline-flex items-center gap-2 rounded-full border border-mw-blue-200 bg-white/70 backdrop-blur-sm text-mw-gray-800 font-medium shadow-sm
                    hover:border-mw-blue-400 hover:bg-mw-blue-50 hover:text-mw-blue-700 hover:-translate-y-0.5 transition-all duration-200 cursor-default
                    ${i % 3 === 0 ? 'text-base px-5 py-2.5' : 'text-sm px-4 py-2'}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-mw-blue-400" />
                  {area}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 6. RESEARCH SOLUTIONS ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 tracking-tight">
              Solutions Built Around Signals
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESEARCH_SOLUTIONS.map((sol, i) => (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-md border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-mw-blue-600 rounded-md flex items-center justify-center group-hover:bg-mw-blue-700 transition-colors duration-200 flex-shrink-0">
                    <sol.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-black text-gray-100 tabular-nums select-none leading-none">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base leading-snug mb-2">{sol.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{sol.description}</p>
                <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                  {sol.tags.map(tag => (
                    <span key={tag} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${SIGNAL_TAG_COLORS[tag] || 'text-mw-gray-600 bg-mw-gray-100'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-mw-gray-50">
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
                  className="flex-shrink-0 flex items-center justify-center h-16 w-32 bg-white rounded-xl border border-mw-gray-100 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:shadow-sm transition-all duration-300"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-mw-gray-100 p-8 flex flex-col justify-between"
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

      {/* ── 8. WHY MW SCIENCE ────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 tracking-tight">
              Beyond Measurement. Towards Understanding.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {WHY_COLUMNS.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-mw-blue-100 rounded-2xl text-mw-blue-600 mb-5">
                  <col.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-mw-gray-900 mb-3">{col.title}</h3>
                <p className="text-mw-gray-600 leading-relaxed text-sm">{col.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center border-t border-mw-gray-200 pt-10"
          >
            <p className="text-mw-gray-600 leading-relaxed mb-2">
              The challenge facing organisations today is not access to data. It is knowing which signals matter.
            </p>
            <p className="text-mw-gray-900 font-semibold">
              MW Science exists to make those signals visible.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(96,165,250,0.15),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">The Decision Compass for Out-of-Home</h2>
            <p className="text-mw-gray-300 leading-relaxed max-w-2xl mx-auto mb-10">
              Moving Walls is the Decision Compass for Out-of-Home. MW Science is the Cognitive Compass that powers it. Together, they help organisations understand where Out-of-Home will work before investment, measure what happened after activation, and continuously improve performance through evidence, not assumption.
            </p>
            <CTAButton
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-mw-blue-700 hover:bg-mw-blue-50 px-8 py-4 rounded-xl font-semibold transition-all"
            >
              Speak to MW Science Lab Expert
              <ArrowRightIcon className="w-4 h-4" />
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 flex flex-col items-center"
          >
            <CompassNeedle className="w-28 h-28 md:w-32 md:h-32" />
            <p className="text-3xl md:text-4xl font-black tracking-tight text-white mt-4">True North for OOH.</p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
