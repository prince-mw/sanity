'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 1 12.8-5.3L20 9M20 9V4.5M20 9h-4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 0 1-12.8 5.3L4 14.5M4 14.5V19M4 14.5h4.5" />
  </svg>
)

const LightbulbIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 21h4M8 14.5A5.5 5.5 0 1 1 16 14.5c0 1.4-.6 2.4-1.5 3.2-.3.3-.5.7-.5 1.1v.2H10v-.2c0-.4-.2-.8-.5-1.1-.9-.8-1.5-1.8-1.5-3.2Z" />
    <path strokeLinecap="round" d="M12 3v2" />
  </svg>
)

const ChatIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5A4.5 4.5 0 0 1 8 4h8a4.5 4.5 0 0 1 4.5 4.5v4A4.5 4.5 0 0 1 16 17H9l-4.5 3.5V17A4.5 4.5 0 0 1 3.5 12.5v-4Z" />
    <path strokeLinecap="round" d="M8.5 9.5h7M8.5 12.5h4" />
  </svg>
)

const BeakerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M10 3v6.5L4.8 18a1.5 1.5 0 0 0 1.3 2.2h11.8a1.5 1.5 0 0 0 1.3-2.2L14 9.5V3" />
    <path strokeLinecap="round" d="M7 15h10" />
  </svg>
)

const GearIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
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
    powers: ['MW Inventory', 'MW Market', 'MW Planner'],
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
    powers: ['MW Planner', 'MW Influence', 'MW Activate'],
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
    powers: ['MW Measure'],
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
    powers: ['MW Measure'],
    icon: OutcomeIcon,
    accent: 'bg-green-600', text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700',
  },
]

// All 11 research methodologies, grouped under the manager's 4 categories.
// Descriptions carried over where a solution already had one (Brand Lift
// Studies, Marketing Mix Modelling, Mall Experience Index); the rest are new,
// short descriptions written to match that same tone.
const SOLUTION_CATEGORY_GROUPS = [
  {
    title: 'Understand People',
    icon: AudienceIcon,
    items: [
      { icon: SearchIcon, title: 'Audience Research', description: 'Understand who your audiences are, what motivates them and how their preferences evolve over time.' },
      { icon: ChatIcon, title: 'Qualitative Research', description: 'Uncover the human stories and motivations behind the numbers through in-depth interviews and discussions.' },
    ],
  },
  {
    title: 'Understand Brand',
    icon: BrandIcon,
    items: [
      { icon: PulseIcon, title: 'Brand Health Tracking', description: 'Monitor brand performance and benchmark competitive position over time.' },
      { icon: TrendingUpIcon, title: 'Brand Lift Studies', description: 'Measure how campaigns influence awareness, consideration, preference and purchase intent.' },
    ],
  },
  {
    title: 'Understand Media & Investment',
    icon: MediaIcon,
    items: [
      { icon: MediaIcon, title: 'Media Effectiveness', description: 'Measure how media exposure translates into reach, engagement and real-world impact.' },
      { icon: SlidersIcon, title: 'Marketing Mix Modelling', description: 'Understand the contribution of every channel and optimise future investment.' },
    ],
  },
  {
    title: 'Design & Improve',
    icon: LightbulbIcon,
    items: [
      { icon: LightbulbIcon, title: 'Product Innovation', description: 'Test and refine new product or service ideas before they go to market.' },
      { icon: BeakerIcon, title: 'Concept Testing', description: 'Validate creative and campaign concepts with real audiences before launch.' },
      { icon: EyeIcon, title: 'Customer Experience', description: 'Measure satisfaction, loyalty and friction points across the customer journey.' },
      { icon: BuildingIcon, title: 'Mall Experience Index', description: 'Measure engagement, loyalty, shopper quality and commercial effectiveness.' },
      { icon: GearIcon, title: 'Custom Research Programmes', description: "Bespoke research designed around a client's specific business question." },
    ],
  },
]

// Per-category accent, reused across the 3 tab-view variants below — same
// color language as the Signals section (blue/orange/violet, plus teal as a
// 4th tone for Design & Improve, which doesn't map onto an existing Signal).
const CATEGORY_ACCENTS: Record<string, { bg: string; text: string; accent: string; border: string }> = {
  'Understand People': { bg: 'bg-mw-blue-50', text: 'text-mw-blue-600', accent: 'bg-mw-blue-600', border: 'border-mw-blue-200' },
  'Understand Brand': { bg: 'bg-orange-50', text: 'text-orange-600', accent: 'bg-orange-600', border: 'border-orange-200' },
  'Understand Media & Investment': { bg: 'bg-violet-50', text: 'text-violet-600', accent: 'bg-violet-600', border: 'border-violet-200' },
  'Design & Improve': { bg: 'bg-teal-50', text: 'text-teal-600', accent: 'bg-teal-600', border: 'border-teal-200' },
}

// The full narrative loop — from research methodologies,
// through signals, to the Cognitive Compass, to better decisions, and back again
// as continuous learning compounds.
const LAB_CIRCLE_STAGES = [
  {
    icon: SearchIcon,
    label: 'Research Methodologies',
    body: 'MW Science Lab’s research capability — brand, audience, media and experience studies.',
  },
  {
    icon: PulseIcon,
    label: 'Signals',
    body: 'Human, spatial, media and behavioural signals extracted from that research.',
  },
  {
    icon: CompassIcon,
    label: 'Cognitive Compass',
    body: 'Powers the MW ecosystem, and serves as a research partner to clients directly.',
  },
  {
    icon: OutcomeIcon,
    label: 'Better Decisions',
    body: 'Sharper planning, measurement and action — before any spend.',
  },
  {
    icon: RefreshIcon,
    label: 'Continuous Learning',
    body: 'Every campaign measured feeds back in, so the Lab’s research gets sharper over time.',
  },
]

const WHY_COLUMNS = [
  { icon: EyeIcon, title: 'Read The Real World', body: 'Transform everyday human journeys into measurable signals.' },
  { icon: FilterIcon, title: 'Extract Meaningful Signals', body: 'Separate what matters from what merely exists.' },
  { icon: CompassIcon, title: 'Guide Better Decisions', body: 'Ground every decision, before, during and after investment in evidence, not assumption.' },
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

// ─── THREAD WEAVE (hero visual) ────────────────────────────────────────────────
// Four labelled threads weave down and converge into a single signal.
// Comet-head trails + a pulsing/rotating convergence hub, in the same spirit as
// the /platform page's flowing-connection diagram (feGaussianBlur glow filters,
// radial "comet" gradients, staggered lead + trailing particles).

function ThreadWeave() {
  const threads = [
    { label: 'Commute', x: 55, delay: 0 },
    { label: 'Store Visit', x: 148, delay: 1 },
    { label: 'Media Exposure', x: 252, delay: 2 },
    { label: 'Attention', x: 345, delay: 3 },
  ]
  const outputs = [
    { label: 'Move', x: 55, delay: 0 },
    { label: 'Engage', x: 148, delay: 1 },
    { label: 'Decide', x: 252, delay: 2 },
    { label: 'Respond', x: 345, delay: 3 },
  ]
  const TOP_Y = 40
  const CONVERGE_X = 200
  const CONVERGE_Y = 210
  const DIVERGE_Y = 290
  const BOTTOM_Y = 460

  // Ambient floating particles — deterministic positions (no Math.random, avoids SSR hydration mismatch)
  const AMBIENT = [
    { x: 90, y: 130, dx: 10, dy: -8, dur: 9 },
    { x: 310, y: 150, dx: -9, dy: 9, dur: 11 },
    { x: 180, y: 100, dx: 7, dy: 12, dur: 8 },
    { x: 260, y: 90, dx: -8, dy: -6, dur: 10 },
    { x: 130, y: 170, dx: 9, dy: -10, dur: 12 },
    { x: 340, y: 130, dx: -6, dy: 8, dur: 9.5 },
    { x: 100, y: 380, dx: -8, dy: 9, dur: 10.5 },
    { x: 300, y: 400, dx: 9, dy: -7, dur: 9 },
    { x: 200, y: 420, dx: -6, dy: -10, dur: 11.5 },
  ]

  return (
    <svg viewBox="0 0 400 500" className="w-full max-w-[380px] mx-auto" aria-hidden="true">
      <defs>
        <radialGradient id="weaveGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
        {/* Comet head — bright white-hot core fading through blue to transparent */}
        <radialGradient id="threadComet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="35%" stopColor="#dbeafe" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
        {/* Glow filters */}
        <filter id="threadGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hubGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient floating particles */}
      {AMBIENT.map((p, i) => (
        <circle key={`ambient-${i}`} r={1 + (i % 3) * 0.5} fill="#93c5fd" opacity="0">
          <animate attributeName="cx" values={`${p.x};${p.x + p.dx};${p.x}`} dur={`${p.dur}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
          <animate attributeName="cy" values={`${p.y};${p.y + p.dy};${p.y}`} dur={`${p.dur * 0.8}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
          <animate attributeName="opacity" values="0;0.5;0.3;0.5;0" dur={`${p.dur}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
        </circle>
      ))}

      {threads.map((t, i) => {
        const bow = i % 2 === 0 ? -30 : 30
        const path = `M ${t.x} ${TOP_Y} Q ${(t.x + CONVERGE_X) / 2} ${(TOP_Y + CONVERGE_Y) / 2 + bow} ${CONVERGE_X} ${CONVERGE_Y}`
        // animateMotion adds the path's own coordinates on top of the circle's static cx/cy,
        // so the motion path must be relative (starting at 0,0), not the absolute `path` above.
        const motionPath = `M 0 0 Q ${(t.x + CONVERGE_X) / 2 - t.x} ${(TOP_Y + CONVERGE_Y) / 2 + bow - TOP_Y} ${CONVERGE_X - t.x} ${CONVERGE_Y - TOP_Y}`
        const dur = 3 + i * 0.4
        const begin = t.delay * 0.6
        return (
          <g key={t.label}>
            <motion.path
              d={path} fill="none" stroke="#93c5fd" strokeWidth="1.6" strokeOpacity="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: 'easeInOut' }}
            />
            {/* Trailing particles (rendered first, so the comet head layers on top) */}
            <circle cx={t.x} cy={TOP_Y} r="3" fill="#60a5fa" opacity="0.35">
              <animateMotion dur={`${dur}s`} begin={`${begin + 0.18}s`} repeatCount="indefinite" path={motionPath} />
              <animate attributeName="opacity" values="0;0.35;0.35;0" keyTimes="0;0.06;0.9;1" dur={`${dur}s`} begin={`${begin + 0.18}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={t.x} cy={TOP_Y} r="2" fill="#93c5fd" opacity="0.2">
              <animateMotion dur={`${dur}s`} begin={`${begin + 0.36}s`} repeatCount="indefinite" path={motionPath} />
              <animate attributeName="opacity" values="0;0.2;0.2;0" keyTimes="0;0.06;0.9;1" dur={`${dur}s`} begin={`${begin + 0.36}s`} repeatCount="indefinite" />
            </circle>
            {/* Comet head with strong glow */}
            <circle cx={t.x} cy={TOP_Y} r="7" fill="url(#threadComet)" filter="url(#threadGlow)">
              <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={motionPath} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.9;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={t.x} cy={TOP_Y} r="4.5" fill="#1e3a8a" stroke="#dbeafe" strokeWidth="1.4" />
            <text x={t.x} y={TOP_Y - 13} textAnchor="middle" fontSize="10" fontWeight="600" fill="#dbeafe" fontFamily="inherit" letterSpacing="0.3">{t.label}</text>
          </g>
        )
      })}

      {/* Convergence hub — layered glow + counter-rotating rings + staggered expanding pulses + orbiting dots */}
      <ellipse cx={CONVERGE_X} cy={CONVERGE_Y} rx="100" ry="30" fill="url(#weaveGlow)" />
      <circle cx={CONVERGE_X} cy={CONVERGE_Y} r="36" fill="#60a5fa" opacity="0.22" filter="url(#hubGlow)">
        <animate attributeName="r" values="32;44;32" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.22;0.35;0.22" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Rotating dashed ring (clockwise) */}
      <circle cx={CONVERGE_X} cy={CONVERGE_Y} r="48" fill="none" stroke="#93c5fd" strokeWidth="1.3" strokeDasharray="7 5" opacity="0.4">
        <animateTransform attributeName="transform" type="rotate" values={`0 ${CONVERGE_X} ${CONVERGE_Y};360 ${CONVERGE_X} ${CONVERGE_Y}`} dur="18s" repeatCount="indefinite" />
      </circle>
      {/* Counter-rotating dotted ring */}
      <circle cx={CONVERGE_X} cy={CONVERGE_Y} r="58" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 7" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate" values={`360 ${CONVERGE_X} ${CONVERGE_Y};0 ${CONVERGE_X} ${CONVERGE_Y}`} dur="26s" repeatCount="indefinite" />
      </circle>

      {/* Staggered expanding pulse rings */}
      <circle cx={CONVERGE_X} cy={CONVERGE_Y} r="20" fill="none" stroke="#dbeafe" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="r" values="20;42;20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx={CONVERGE_X} cy={CONVERGE_Y} r="20" fill="none" stroke="#93c5fd" strokeWidth="1.2" opacity="0.4">
        <animate attributeName="r" values="20;50;20" dur="3s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin="1s" repeatCount="indefinite" />
      </circle>
      <circle cx={CONVERGE_X} cy={CONVERGE_Y} r="20" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="20;58;20" dur="3s" begin="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin="2s" repeatCount="indefinite" />
      </circle>

      {/* Orbiting dots around the hub */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values={`0 ${CONVERGE_X} ${CONVERGE_Y};360 ${CONVERGE_X} ${CONVERGE_Y}`} dur="7s" repeatCount="indefinite" />
        <circle cx={CONVERGE_X + 64} cy={CONVERGE_Y} r="2.6" fill="#dbeafe" filter="url(#threadGlow)" />
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values={`360 ${CONVERGE_X} ${CONVERGE_Y};0 ${CONVERGE_X} ${CONVERGE_Y}`} dur="11s" repeatCount="indefinite" />
        <circle cx={CONVERGE_X} cy={CONVERGE_Y - 54} r="2" fill="#93c5fd" filter="url(#threadGlow)" />
      </g>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}>
        <line x1={CONVERGE_X - 80} y1={CONVERGE_Y} x2={CONVERGE_X + 80} y2={CONVERGE_Y} stroke="#93c5fd" strokeWidth="2.5" />
        <text x={CONVERGE_X} y={CONVERGE_Y + 25} textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff" fontFamily="inherit" letterSpacing="3">ONE SIGNAL</text>
      </motion.g>

      {/* Connector flowing down from the hub to the diverge point, with the decision text overlaid */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }}>
        <line x1={CONVERGE_X} y1={CONVERGE_Y + 15} x2={CONVERGE_X} y2={DIVERGE_Y} stroke="#60a5fa" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx={CONVERGE_X} cy={CONVERGE_Y + 15} r="2" fill="#dbeafe" opacity="0.8">
          <animateMotion dur="2.5s" repeatCount="indefinite" path={`M 0 0 L 0 ${DIVERGE_Y - (CONVERGE_Y + 15)}`} />
        </circle>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
        <text x={CONVERGE_X} y={CONVERGE_Y + 60} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#dbeafe" fontFamily="inherit" letterSpacing="0.4">A Confident Decision</text>
      </motion.g>

      {/* Diverging outputs — the confident decision flows into how people respond */}
      {outputs.map((o, i) => {
        const bow = i % 2 === 0 ? 30 : -30
        const path = `M ${CONVERGE_X} ${DIVERGE_Y} Q ${(CONVERGE_X + o.x) / 2} ${(DIVERGE_Y + BOTTOM_Y) / 2 + bow} ${o.x} ${BOTTOM_Y}`
        const motionPath = `M 0 0 Q ${(CONVERGE_X + o.x) / 2 - CONVERGE_X} ${(DIVERGE_Y + BOTTOM_Y) / 2 + bow - DIVERGE_Y} ${o.x - CONVERGE_X} ${BOTTOM_Y - DIVERGE_Y}`
        const dur = 3 + i * 0.4
        const begin = 2.4 + o.delay * 0.6
        return (
          <g key={o.label}>
            <motion.path
              d={path} fill="none" stroke="#93c5fd" strokeWidth="1.6" strokeOpacity="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 2.3 + i * 0.15, ease: 'easeInOut' }}
            />
            {/* Trailing particles */}
            <circle cx={CONVERGE_X} cy={DIVERGE_Y} r="3" fill="#60a5fa" opacity="0.35">
              <animateMotion dur={`${dur}s`} begin={`${begin + 0.18}s`} repeatCount="indefinite" path={motionPath} />
              <animate attributeName="opacity" values="0;0.35;0.35;0" keyTimes="0;0.06;0.9;1" dur={`${dur}s`} begin={`${begin + 0.18}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={CONVERGE_X} cy={DIVERGE_Y} r="2" fill="#93c5fd" opacity="0.2">
              <animateMotion dur={`${dur}s`} begin={`${begin + 0.36}s`} repeatCount="indefinite" path={motionPath} />
              <animate attributeName="opacity" values="0;0.2;0.2;0" keyTimes="0;0.06;0.9;1" dur={`${dur}s`} begin={`${begin + 0.36}s`} repeatCount="indefinite" />
            </circle>
            {/* Comet head with strong glow */}
            <circle cx={CONVERGE_X} cy={DIVERGE_Y} r="7" fill="url(#threadComet)" filter="url(#threadGlow)">
              <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={motionPath} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.9;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={o.x} cy={BOTTOM_Y} r="4.5" fill="#1e3a8a" stroke="#dbeafe" strokeWidth="1.4" />
            <text x={o.x} y={BOTTOM_Y + 18} textAnchor="middle" fontSize="10" fontWeight="600" fill="#dbeafe" fontFamily="inherit" letterSpacing="0.3">{o.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── COMPASS NEEDLE (used on the Final CTA, beside "True North for OOH.") ─────
// Ambient Drift: ticks slowly orbit, the needle breathes gently, a soft glow pulses behind it.
// NOTE: this file's Framer Motion + SVG `rotate` combo silently fails to apply
// any transform (confirmed via getComputedStyle), so rotation here uses plain
// CSS transforms (Tailwind keyframes) instead.

function compassTicks() {
  const round = (n: number) => Math.round(n * 1000) / 1000
  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180
    return {
      id: i,
      x1: round(50 + 46 * Math.sin(angle)), y1: round(50 - 46 * Math.cos(angle)),
      x2: round(50 + 40 * Math.sin(angle)), y2: round(50 - 40 * Math.cos(angle)),
    }
  })
}

const NEEDLE_PATH = <>
  <path d="M50 14 L58 50 L50 86 L42 50 Z" fill="#60a5fa" opacity="0.9" />
  <path d="M50 14 L58 50 L50 50 Z" fill="#ffffff" />
</>

function CompassNeedleAmbientDrift({ className }: { className?: string }) {
  const ticks = compassTicks()
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <filter id="compassGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#60a5fa" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#93c5fd" strokeOpacity="0.2" strokeWidth="1" />
      <g className="animate-spin-slow" style={{ transformOrigin: '50px 50px', animationDuration: '26s' }}>
        {ticks.map(t => (
          <line key={t.id} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#93c5fd" strokeOpacity="0.3" strokeWidth="1" />
        ))}
      </g>
      <circle cx="50" cy="50" r="10" fill="#60a5fa" opacity="0.35" filter="url(#compassGlow)" className="animate-pulse" />
      <g className="animate-compass-drift" style={{ transformOrigin: '50px 50px' }}>
        {NEEDLE_PATH}
      </g>
      <circle cx="50" cy="50" r="4" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="1.5" />
    </svg>
  )
}

// ─── FLOW VISUAL (Section 2: "From Threads to Decisions") ─────────────────────
// Scattered particles (raw, disconnected threads) travel inward and gather
// into one glowing point, like a starfield collapsing into a single star.

function FlowParticleConverge() {
  const HUB_X = 70
  const HUB_Y = 506
  // Scattered starting points, compressed near the top (Stage 1 zone) — the
  // convergence point sits far below, down near Stage 3.
  const particles = [
    { x: 20, y: 30, delay: 0 },
    { x: 115, y: 45, delay: 0.4 },
    { x: 45, y: 75, delay: 0.8 },
    { x: 95, y: 85, delay: 1.2 },
    { x: 15, y: 120, delay: 1.6 },
    { x: 120, y: 130, delay: 2.0 },
    { x: 60, y: 50, delay: 2.4 },
    { x: 30, y: 155, delay: 2.8 },
    { x: 105, y: 165, delay: 3.2 },
    { x: 70, y: 20, delay: 3.6 },
    { x: 50, y: 180, delay: 4.0 },
    { x: 90, y: 190, delay: 4.4 },
  ]

  return (
    <div className="flex gap-6 sm:gap-8 items-stretch">
      <div className="w-24 sm:w-28 shrink-0 relative">
        <svg viewBox="0 0 140 620" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <radialGradient id="particleHubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </radialGradient>
            <filter id="particleGlow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {particles.map((p, i) => (
            <motion.line
              key={`line-${i}`}
              x1={p.x} y1={p.y} x2={HUB_X} y2={HUB_Y}
              stroke="#93c5fd" strokeWidth="1" strokeOpacity="0"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1, strokeOpacity: 0.2 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.08 }}
            />
          ))}

          {/* Continuously travelling particles — same comet-head + trail
              technique as the hero's ThreadWeave/SignalCompass animations */}
          {particles.map((p, i) => {
            // animateMotion adds the path's own coordinates on top of the circle's static
            // cx/cy, so this must be a relative path (starting at 0,0), not an absolute one.
            const path = `M 0 0 L ${HUB_X - p.x} ${HUB_Y - p.y}`
            const dur = 4.5 + (i % 4) * 0.6
            return (
              <g key={`p-${i}`}>
                <circle cx={p.x} cy={p.y} r="2" fill="#93c5fd" opacity="0.3">
                  <animateMotion dur={`${dur}s`} begin={`${p.delay + 0.25}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;0.3;0.3;0" keyTimes="0;0.06;0.9;1" dur={`${dur}s`} begin={`${p.delay + 0.25}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={p.x} cy={p.y} r="3.5" fill="#60a5fa" filter="url(#particleGlow)">
                  <animateMotion dur={`${dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.9;1" dur={`${dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
                </circle>
              </g>
            )
          })}

          <ellipse cx={HUB_X} cy={HUB_Y} rx="30" ry="30" fill="url(#particleHubGlow)" />
          <motion.circle
            cx={HUB_X} cy={HUB_Y} r="8" fill="#1e3a8a" filter="url(#particleGlow)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4, duration: 0.6, type: 'spring' }}
          />
          <motion.circle
            cx={HUB_X} cy={HUB_Y} r="8" fill="none" stroke="#93c5fd" strokeWidth="1.2"
            initial={{ opacity: 0 }}
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1.8 }}
          />
        </svg>
      </div>

      <div className="flex-1 space-y-8 sm:space-y-12 pt-2">
        {FRAMEWORK_STAGES.map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.25 }}
          >
            <span className="text-xs font-bold tracking-widest text-mw-gray-400">STAGE {stage.kicker}</span>
            <h3 className="text-xl font-black text-mw-gray-900 tracking-tight mt-1 mb-1">{stage.label}</h3>
            <p className="text-sm font-semibold text-mw-blue-600 mb-1">{stage.tag}</p>
            <p className="text-mw-gray-600 text-sm leading-relaxed">{stage.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── FIVE SIGNALS — Compass Dial (radial nodes around a hub) ──────────────────
// Five signal nodes sit at fixed pentagon positions around a dial, echoing the
// page's own "compass" metaphor. Selecting one swings the needle, draws a spoke
// from hub to node, and sends a traveling ping dot outward. Auto-cycles every 8s,
// pausable on hover.

function SignalsCompassDial({ activeIndex, onSelect }: { activeIndex: number; onSelect: (i: number) => void }) {
  const active = SIGNALS[activeIndex]
  const CENTER = 150
  const RADIUS = 108
  const round = (n: number) => Math.round(n * 100) / 100
  const angles = [-90, -18, 54, 126, 198]
  const toXY = (angle: number) => {
    const rad = (angle * Math.PI) / 180
    return { x: round(CENTER + RADIUS * Math.cos(rad)), y: round(CENTER + RADIUS * Math.sin(rad)) }
  }
  const nodePositions = angles.map(toXY)
  const activePos = nodePositions[activeIndex]
  const needleRotate = angles[activeIndex] + 90

  const ticks = Array.from({ length: 28 }, (_, i) => {
    const angle = (i * (360 / 28) * Math.PI) / 180
    return {
      id: i,
      x1: round(CENTER + 138 * Math.sin(angle)), y1: round(CENTER - 138 * Math.cos(angle)),
      x2: round(CENTER + 130 * Math.sin(angle)), y2: round(CENTER - 130 * Math.cos(angle)),
    }
  })

  // Auto-cycle every 8s, pausable on hover without losing progress. remainingRef/startRef
  // track a real countdown in ms so pausing and resuming resumes from exactly where it left
  // off (rather than restarting a fresh 8s) — the CSS progress ring below uses the browser's
  // native animation-play-state, which already pauses/resumes at the same visual position.
  const [isPaused, setIsPaused] = useState(false)
  const remainingRef = useRef(8000)
  const startRef = useRef(0)

  useEffect(() => {
    remainingRef.current = 8000
  }, [activeIndex])

  useEffect(() => {
    if (isPaused) return
    startRef.current = Date.now()
    const id = setTimeout(() => {
      onSelect((activeIndex + 1) % SIGNALS.length)
    }, remainingRef.current)
    return () => {
      clearTimeout(id)
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startRef.current))
    }
  }, [activeIndex, isPaused, onSelect])

  return (
    <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-12 lg:gap-24 items-center max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative mx-auto w-full max-w-[320px] aspect-square"
      >
        <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {/* Ambient slow-rotating dashed ring — keeps the dial feeling "live" even at rest.
              Plain CSS animation (not Framer Motion) — rotating an SVG <g>/<circle> via
              Framer Motion's `animate={{ rotate }}` was silently producing no transform at
              all in this file, so continuous/looping rotation is driven by CSS here instead. */}
          <circle
            cx={CENTER} cy={CENTER} r="122" fill="none" stroke="#dbeafe" strokeWidth="1" strokeDasharray="2 7"
            className="animate-spin-slow" style={{ transformOrigin: `${CENTER}px ${CENTER}px`, animationDuration: '50s' }}
          />
          <circle cx={CENTER} cy={CENTER} r="140" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          {ticks.map(t => (
            <line key={t.id} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
          ))}
          <polygon points={nodePositions.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#e5e7eb" strokeWidth="1" />

          {/* Small ambient dot orbiting the bezel continuously */}
          <g className="animate-spin-slow" style={{ transformOrigin: `${CENTER}px ${CENTER}px`, animationDuration: '22s' }}>
            <circle cx={CENTER + 138} cy={CENTER} r="2" fill="#93c5fd" opacity="0.6" />
          </g>

          {/* Pulsing glow behind whichever node is active */}
          <motion.circle
            key={`glow-${active.id}`}
            cx={activePos.x} cy={activePos.y} r="22" className={active.text} fill="currentColor"
            initial={{ opacity: 0.15, scale: 0.9 }}
            animate={{ opacity: [0.15, 0.32, 0.15], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: `${activePos.x}px ${activePos.y}px` }}
          />

          <motion.line
            key={`spoke-${active.id}`}
            x1={CENTER} y1={CENTER} x2={activePos.x} y2={activePos.y}
            className={active.text} stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.7 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <motion.circle
            key={`ping-${active.id}`}
            r="4" className={active.text} fill="currentColor"
            initial={{ cx: CENTER, cy: CENTER, opacity: 1 }}
            animate={{ cx: activePos.x, cy: activePos.y, opacity: [1, 1, 0] }}
            transition={{ duration: 0.55, ease: 'easeOut', times: [0, 0.8, 1] }}
          />
          <circle cx={CENTER} cy={CENTER} r="10" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
          <g
            style={{
              transformOrigin: `${CENTER}px ${CENTER}px`,
              transform: `rotate(${needleRotate}deg)`,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <path
              d={`M ${CENTER} ${CENTER - 34} L ${CENTER + 4} ${CENTER} L ${CENTER} ${CENTER + 34} L ${CENTER - 4} ${CENTER} Z`}
              className={active.text} fill="currentColor" opacity="0.85"
            />
          </g>
          <circle cx={CENTER} cy={CENTER} r="4" fill="#374151" />
        </svg>

        {nodePositions.map((pos, i) => {
          const s = SIGNALS[i]
          const leftPct = (pos.x / 300) * 100
          const topPct = (pos.y / 300) * 100
          const isActive = activeIndex === i
          return (
            <div
              key={s.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            >
              {/* Progress ring — fills over the 8s auto-cycle window, pauses/resumes with hover */}
              {isActive && (
                <svg
                  key={`ring-${active.id}`}
                  width="56" height="56" viewBox="0 0 56 56"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -rotate-90"
                >
                  <circle
                    cx="28" cy="28" r="24" fill="none" className="animate-ring-fill"
                    stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="151"
                    style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                  />
                </svg>
              )}
              <motion.button
                onClick={() => onSelect(i)}
                aria-label={s.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 260, damping: 18 }}
                className={`relative flex items-center justify-center rounded-full border-2 transition-[width,height,background-color,border-color] duration-300 ${
                  isActive ? `w-12 h-12 ${s.accent} border-transparent shadow-lg` : `w-11 h-11 ${s.bg} ${s.border}`
                }`}
              >
                <s.icon className={`w-5 h-5 ${isActive ? 'text-white' : s.text}`} />
              </motion.button>
            </div>
          )
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-2xl font-bold text-mw-gray-900 mb-2">{active.title}</h3>
          <p className="text-mw-gray-600 leading-relaxed mb-6">{active.desc}</p>
          <h4 className="text-xs font-bold text-mw-gray-400 uppercase tracking-widest mb-3">Answers</h4>
          <ul className="space-y-3 mb-6">
            {active.answers.map((ans, i) => (
              <motion.li
                key={ans}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3"
              >
                <div className={`w-1.5 h-1.5 rounded-full ${active.accent} mt-2 flex-shrink-0`} />
                <span className="text-mw-gray-700 text-sm leading-relaxed">{ans}</span>
              </motion.li>
            ))}
          </ul>
          <h4 className="text-xs font-bold text-mw-gray-400 uppercase tracking-widest mb-3">Powers</h4>
          <div className="flex flex-wrap gap-2">
            {active.powers.map(p => (
              <span key={p} className={`px-3 py-1 rounded-full text-xs font-semibold ${active.badge}`}>{p}</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── MW SCIENCE LAB LOOP — "Living Core" ────────────────────────────────────────
// The manager's "full narrative circle" option: the whole loop — methodologies
// → signals → compass (powers the ecosystem + research partner to clients) →
// better decisions before spend → continuous learning, feeding back into
// methodologies. The MW Science badge sits inside a small living machine:
// breathing glow, two staggered sonar rings, two counter-rotating dashed rings
// and two motes orbiting in opposite directions — nothing ever settles. The
// outer 5-stage ring stays quieter: two comets chase each other endlessly
// around it, and each stage icon gets a slow, staggered breathing halo. Reads
// as "the compass is always running" rather than a scripted step-by-step walkthrough.
function ScienceLabDiagramLivingCore() {
  const stages = LAB_CIRCLE_STAGES
  const R = 37
  const positions = stages.map((_, i) => {
    const angle = ((-90 + i * (360 / stages.length)) * Math.PI) / 180
    return { left: 50 + R * Math.cos(angle), top: 50 + R * Math.sin(angle) }
  })

  // Hub geometry — every ring/mote below is centred on (50, 50), where the MW
  // Science badge sits, and stays comfortably inside the outer stage ring (R).
  const RING1 = 13 // inner dashed ring
  const RING2 = 18 // outer dashed ring
  const ORBIT = 22 // radius the two hub motes travel at

  // Mobile: the 5-across description grid below shrinks to unreadably small
  // text at phone widths, so below sm it's replaced with one stage at a time,
  // auto-advancing every 5s (same remainingRef/startRef pause-on-interaction
  // pattern as Testimonials Spotlight). Tablet/desktop keep the full grid.
  const MOBILE_STAGE_INTERVAL = 5000
  const [mobileActive, setMobileActive] = useState(0)
  const [mobilePaused, setMobilePaused] = useState(false)
  const mobileRemainingRef = useRef(MOBILE_STAGE_INTERVAL)
  const mobileStartRef = useRef(0)

  useEffect(() => { mobileRemainingRef.current = MOBILE_STAGE_INTERVAL }, [mobileActive])
  useEffect(() => {
    if (mobilePaused) return
    mobileStartRef.current = Date.now()
    const id = setTimeout(() => setMobileActive(i => (i + 1) % stages.length), mobileRemainingRef.current)
    return () => {
      clearTimeout(id)
      mobileRemainingRef.current = Math.max(0, mobileRemainingRef.current - (Date.now() - mobileStartRef.current))
    }
  }, [mobileActive, mobilePaused, stages.length])

  return (
    <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-mw-gray-200 shadow-sm p-4 md:p-8 overflow-hidden">
      <div className="relative mx-auto aspect-square max-w-xs sm:max-w-sm md:max-w-md">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <marker id="labLivingArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10Z" fill="#93c5fd" />
            </marker>
            <radialGradient id="labLivingHubWash" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="labLivingComet" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="55%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </radialGradient>
            <filter id="labLivingMoteGlow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="labLivingHubGlow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer stage ring — dashes drift slowly so the loop never looks frozen */}
          <circle cx="50" cy="50" r={R} fill="none" stroke="#dbeafe" strokeWidth="1" strokeDasharray="2 4">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="90s" repeatCount="indefinite" />
          </circle>

          {/* Connecting arcs between consecutive stages — plain scroll reveal */}
          {positions.map((p, i) => {
            const next = positions[(i + 1) % positions.length]
            const dx = next.left - p.left
            const dy = next.top - p.top
            const dist = Math.sqrt(dx * dx + dy * dy)
            const pad = 11
            const x1 = p.left + (dx / dist) * pad
            const y1 = p.top + (dy / dist) * pad
            const x2 = next.left - (dx / dist) * pad
            const y2 = next.top - (dy / dist) * pad
            return (
              <motion.path
                key={i}
                d={`M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke="#93c5fd"
                strokeWidth="1"
                markerEnd="url(#labLivingArrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              />
            )
          })}

          {/* Two comets chase each other around the full loop, forever — the
              ring's own ambient "energy flow", independent of story order */}
          <circle cx={50 + R} cy="50" r="1.7" fill="url(#labLivingComet)" filter="url(#labLivingMoteGlow)">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="11s" repeatCount="indefinite" />
          </circle>
          <circle cx={50 - R} cy="50" r="1.4" fill="url(#labLivingComet)" filter="url(#labLivingMoteGlow)" opacity="0.75">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="11s" repeatCount="indefinite" />
          </circle>

          {/* ── Living core — the hub carries the richest, densest motion ── */}
          <circle cx="50" cy="50" r={RING2 + 3} fill="url(#labLivingHubWash)" />

          <circle cx="50" cy="50" r={RING1 - 4} fill="#60a5fa" opacity="0.3" filter="url(#labLivingHubGlow)">
            <animate attributeName="r" values={`${RING1 - 4};${RING2 + 4};${RING1 - 4}`} dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.22;0.4;0.22" dur="4s" repeatCount="indefinite" />
          </circle>

          <circle cx="50" cy="50" r={RING1 - 4} fill="none" stroke="#dbeafe" strokeWidth="1">
            <animate attributeName="r" values={`${RING1 - 4};${RING2 + 5};${RING1 - 4}`} dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r={RING1 - 4} fill="none" stroke="#93c5fd" strokeWidth="0.8">
            <animate attributeName="r" values={`${RING1 - 4};${RING2 + 5};${RING1 - 4}`} dur="4s" begin="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" begin="2s" repeatCount="indefinite" />
          </circle>

          <circle cx="50" cy="50" r={RING1} fill="none" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4 3" opacity="0.55">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="20s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r={RING2} fill="none" stroke="#818cf8" strokeWidth="0.8" strokeDasharray="1 5" opacity="0.45">
            <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="30s" repeatCount="indefinite" />
          </circle>

          <g>
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="9s" repeatCount="indefinite" />
            <circle cx={50 + ORBIT} cy="50" r="1.4" fill="#60a5fa" filter="url(#labLivingMoteGlow)" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="13s" repeatCount="indefinite" />
            <circle cx="50" cy={50 - ORBIT} r="1.1" fill="#818cf8" filter="url(#labLivingMoteGlow)" />
          </g>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-lg ring-4 ring-mw-blue-50"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src="/assets/logo/mw-science-badge.png" alt="MW Science" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {stages.map((stage, i) => {
          // Nodes in the upper half of the ring sit with the connecting arcs
          // curving in close underneath them, so a label below the icon (the
          // default) can visually merge into the arc — flip those nodes to
          // put the label above the icon instead, always growing away from
          // the ring's interior rather than into it.
          const isUpperHalf = positions[i].top < 50
          return (
            <div
              key={stage.label}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-24 sm:w-28 md:w-32 text-center flex flex-col items-center gap-1.5 ${isUpperHalf ? 'flex-col-reverse' : ''}`}
              style={{ left: `${positions[i].left}%`, top: `${positions[i].top}%` }}
            >
              <div className="relative w-9 h-9">
                <motion.span
                  className="absolute inset-0 rounded-xl bg-mw-blue-300"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
                />
                <div className="relative w-9 h-9 rounded-xl bg-white border-2 border-mw-blue-200 flex items-center justify-center text-mw-blue-600 shadow-sm">
                  <stage.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-[11px] font-bold text-mw-gray-900 leading-tight">{stage.label}</div>
            </div>
          )
        })}
      </div>

      <div className="mt-8">
        {/* Mobile: one stage at a time, bigger text, auto-advancing every 5s */}
        <div
          className="sm:hidden text-center px-4"
          onTouchStart={() => setMobilePaused(true)}
          onTouchEnd={() => setMobilePaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={stages[mobileActive].label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-lg font-bold text-mw-blue-600 mb-2">{stages[mobileActive].label}</div>
              <p className="text-base text-mw-gray-600 leading-relaxed">{stages[mobileActive].body}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-1.5 mt-5">
            {stages.map((stage, i) => (
              <button
                key={stage.label}
                type="button"
                onClick={() => setMobileActive(i)}
                aria-label={`Show ${stage.label}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === mobileActive ? 'w-6 bg-mw-blue-600' : 'w-1.5 bg-mw-blue-100'}`}
              />
            ))}
          </div>
        </div>

        {/* Tablet/desktop: all 5 shown at once */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stages.map(stage => (
            <div key={stage.label} className="text-center px-2">
              <div className="text-xs font-bold text-mw-blue-600 mb-1">{stage.label}</div>
              <p className="text-xs text-mw-gray-500 leading-snug">{stage.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


// ─── RESEARCH SOLUTIONS: CATEGORY TABS ─────────────────────────────────────────
// 4 category tabs at top, kept on one scrollable row at every width (mobile
// scrolls horizontally instead of wrapping top-to-bottom, matching desktop's
// single-row look). Clicking a tab shows that category's items: on tablet/
// desktop as a box grid, on mobile as one box at a time auto-advancing every
// 5s (same pattern as Testimonials Spotlight / the Lab stage spotlight) since
// a swipeable multi-card carousel was harder to scan than a single card.
const CATEGORY_ITEM_INTERVAL = 5000

function ResearchSolutionsGrid() {
  const [catIndex, setCatIndex] = useState(0)
  const category = SOLUTION_CATEGORY_GROUPS[catIndex]
  const accent = CATEGORY_ACCENTS[category.title]

  const [itemIndex, setItemIndex] = useState(0)
  const [itemPaused, setItemPaused] = useState(false)
  const itemRemainingRef = useRef(CATEGORY_ITEM_INTERVAL)
  const itemStartRef = useRef(0)

  // The auto-advance (item-by-item, then tab-to-tab) only makes sense for the
  // mobile one-at-a-time view — on tablet/desktop all items in a category are
  // already visible at once in the grid, so tabs there stay click-only.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Changing category and resetting the item index must happen in the same
  // update, not two separate setState calls reconciled by a later effect —
  // otherwise React can render once with the NEW category but the OLD
  // itemIndex still in place, and if that index doesn't exist in the smaller
  // category (e.g. wrapping from 5-item "Design & Improve" back to 2-item
  // "Understand People") activeItem is undefined and the render crashes.
  const goToCategory = (i: number) => {
    setCatIndex(i)
    setItemIndex(0)
  }

  useEffect(() => { itemRemainingRef.current = CATEGORY_ITEM_INTERVAL }, [itemIndex, catIndex])
  useEffect(() => {
    if (itemPaused || !isMobile) return
    itemStartRef.current = Date.now()
    const isLastItem = itemIndex === category.items.length - 1
    const id = setTimeout(() => {
      // Once the active category's items have all had their turn, advance to
      // the next tab (looping back to the first) instead of re-cycling the
      // same category's items forever.
      if (isLastItem) {
        goToCategory((catIndex + 1) % SOLUTION_CATEGORY_GROUPS.length)
      } else {
        setItemIndex(i => i + 1)
      }
    }, itemRemainingRef.current)
    return () => {
      clearTimeout(id)
      itemRemainingRef.current = Math.max(0, itemRemainingRef.current - (Date.now() - itemStartRef.current))
    }
  }, [itemIndex, itemPaused, isMobile, catIndex, category.items.length])

  // Defensive fallback in addition to goToCategory keeping these in sync —
  // never let a transient mismatch render a missing item.
  const activeItem = category.items[itemIndex] ?? category.items[0]

  // Keep the active tab scrolled into view on its own row (mobile scrolls the
  // tab strip horizontally, so an auto-advance can otherwise move focus to a
  // tab currently scrolled off-screen with no visible indication).
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => {
    tabRefs.current[catIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [catIndex])

  return (
    <div>
      <div className="flex sm:flex-wrap sm:justify-center gap-2 mb-10 overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {SOLUTION_CATEGORY_GROUPS.map((cat, i) => {
          const isActive = i === catIndex
          const a = CATEGORY_ACCENTS[cat.title]
          return (
            <button
              key={cat.title}
              ref={el => { tabRefs.current[i] = el }}
              type="button"
              onClick={() => goToCategory(i)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                isActive ? `${a.accent} text-white` : "bg-white text-mw-gray-500 border border-mw-gray-200 hover:text-mw-gray-700"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.title}
            </button>
          )
        })}
      </div>

      {/* Mobile: one item at a time, auto-advancing every 5s */}
      <div
        className="sm:hidden"
        onTouchStart={() => setItemPaused(true)}
        onTouchEnd={() => setItemPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category.title}-${activeItem.title}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-mw-gray-200 p-6 text-center"
          >
            <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 ${accent.bg} ${accent.text}`}>
              <activeItem.icon className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-mw-gray-900 mb-2 leading-snug">{activeItem.title}</h4>
            <p className="text-sm text-mw-gray-500 leading-relaxed">{activeItem.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-1.5 mt-5">
          {category.items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setItemIndex(i)}
              aria-label={`Show ${item.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === itemIndex ? `w-6 ${accent.accent}` : 'w-1.5 bg-mw-gray-200'}`}
            />
          ))}
        </div>
      </div>

      {/* Tablet/desktop: full box grid */}
      <div className="hidden sm:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {category.items.map(item => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-mw-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${accent.bg} ${accent.text}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-mw-gray-900 mb-2 leading-snug">{item.title}</h4>
                <p className="text-sm text-mw-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── TESTIMONIALS SPOTLIGHT ────────────────────────────────────────────────────
// One large testimonial at a time, auto-advancing every 7.5s, pause on hover.

const TESTIMONIAL_INTERVAL = 7500

function TestimonialsSpotlight() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const remainingRef = useRef(TESTIMONIAL_INTERVAL)
  const startRef = useRef(0)

  useEffect(() => { remainingRef.current = TESTIMONIAL_INTERVAL }, [active])
  useEffect(() => {
    if (isPaused) return
    startRef.current = Date.now()
    const id = setTimeout(() => setActive(a => (a + 1) % TESTIMONIALS.length), remainingRef.current)
    return () => {
      clearTimeout(id)
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startRef.current))
    }
  }, [active, isPaused])

  const t = TESTIMONIALS[active]
  const go = (dir: number) => setActive(a => (a + dir + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-center px-4 sm:px-16">
        <span className="block text-6xl font-serif text-mw-blue-100 leading-none mb-2 select-none" aria-hidden="true">&ldquo;</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4 }}
          >
            <blockquote className="text-lg md:text-2xl font-medium text-mw-gray-800 leading-relaxed mb-8">
              {t.quote}
            </blockquote>
            <div className="font-bold text-mw-gray-900">{t.author}</div>
            <div className="text-mw-gray-400 text-sm">{t.company}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => go(-1)}
        aria-label="Previous testimonial"
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-mw-gray-200 items-center justify-center text-mw-gray-400 hover:text-mw-blue-600 hover:border-mw-blue-200 transition-colors"
      >
        <ArrowRightIcon className="w-4 h-4 rotate-180" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next testimonial"
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-mw-gray-200 items-center justify-center text-mw-gray-400 hover:text-mw-blue-600 hover:border-mw-blue-200 transition-colors"
      >
        <ArrowRightIcon className="w-4 h-4" />
      </button>

      <div className="flex justify-center gap-2 mt-10">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-mw-blue-600' : 'w-1.5 bg-mw-gray-200 hover:bg-mw-gray-300'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── WHY MW SCIENCE: COMET FLOW ────────────────────────────────────────────────
// A comet-trail relay connects the 3 columns, icons pulse as it arrives.

function WhyMWScienceCometFlow() {
  return (
    <div className="relative">
      <div className="hidden md:block absolute left-0 right-0 top-[46px] h-3 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 300 12" className="w-full h-full overflow-visible">
          <line x1="50" y1="6" x2="250" y2="6" stroke="#dbeafe" strokeWidth="1.5" strokeDasharray="1 5" />
          <circle cx="50" cy="6" r="3" fill="#3b82f6">
            <animateMotion path="M 0 0 L 100 0" dur="2.5s" begin="0s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="6" r="3" fill="#3b82f6">
            <animateMotion path="M 0 0 L 100 0" dur="2.5s" begin="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-10 relative">
        {WHY_COLUMNS.map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="text-center p-6"
          >
            <div className="relative inline-flex items-center justify-center w-14 h-14 mb-5">
              <span
                className="absolute inset-0 rounded-2xl bg-mw-blue-300 animate-ping"
                style={{ animationDuration: '2.5s', animationDelay: `${i * 1.25}s` }}
                aria-hidden="true"
              />
              <div className="relative w-14 h-14 flex items-center justify-center bg-mw-blue-100 rounded-2xl text-mw-blue-600">
                <col.icon className="w-7 h-7" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-mw-gray-900 mb-3">{col.title}</h3>
            <p className="text-mw-gray-600 leading-relaxed text-sm">{col.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function MWScienceClient() {
  const [activeSignal, setActiveSignal] = useState(0)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-24 pb-16 md:pt-28 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(96,165,250,0.15),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-16 items-center">

            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black tracking-tight leading-[1.3] sm:leading-[1.25] lg:leading-[1.2] 2xl:leading-[1.15]">
                MW Science<br />
                <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl">
                  The{' '}
                  <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-mw-blue-400 to-mw-blue-500">
                    Cognitive Compass
                  </span>{' '}
                  Behind
                </span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl">
                  Better <span className="whitespace-nowrap">Out-of-Home</span> Decisions
                </span>
              </h1>

              <div className="space-y-4 sm:space-y-5">
                <p className="text-lg sm:text-xl md:text-2xl text-white font-light leading-snug">
                  Transforming fragmented journeys into actionable signals, MW Science gives you the confidence to plan, measure, and act with precision.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-mw-blue-600 hover:bg-mw-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all"
                >
                  Talk to a MW Science Lab Expert
                </CTAButton>
                <a
                  href="#signals"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-xl font-medium transition-all"
                >
                  Explore Signals
                </a>
              </div>
            </motion.div>

            {/* Right: thread weave visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <ThreadWeave />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. FROM THREADS TO DECISIONS ─────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Headline — full width, centered, above both columns */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-mw-gray-900 tracking-tight text-center mb-10"
          >
            Every Decision Starts With A Signal
          </motion.h2>

          {/* Top: Intro copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mb-12"
          >
            <p className="text-2xl md:text-3xl text-mw-gray-900 font-light leading-snug">
              Every journey leaves a thread.
            </p>
            <p className="text-lg text-mw-blue-600 leading-relaxed">
              A commute. A store visit. A smarter media exposure. A moment of attention.
            </p>
            <p className="text-mw-gray-600 leading-relaxed pt-2">
              These are not events that happen in isolation. MW Science connects them into meaningful signals that reveal how people move, engage, decide and respond.
            </p>
            <p className="text-mw-gray-600 leading-relaxed">
              As the Cognitive Compass powering the Moving Walls (MW) ecosystem, MW Science turns human, spatial, media and behavioural signals into the confidence to plan smarter, measure with rigour and act with precision.
            </p>
            <p className="text-mw-gray-600 leading-relaxed">
              For some organisations, MW Science Lab serves as a standalone research partner.
            </p>
            <p className="text-mw-gray-600 leading-relaxed">
              For others, it powers the intelligence behind the broader Moving Walls ecosystem. Built to get sharper with every campaign it measures.
            </p>
          </motion.div>

          {/* Bottom: visual, with a lead-in label above it instead of a trailing caption */}
          <div>
            <p className="text-2xl md:text-3xl text-mw-blue-600 font-light leading-snug text-center mb-6">How the Cognitive Compass works</p>
            <div className="max-w-2xl mx-auto">
              <FlowParticleConverge />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FIVE SIGNALS ─────────────────────────────────────────────────── */}
      <section id="signals" className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4 tracking-tight">
              5 Signals. 1 Cognitive Compass. Across the entire OOH Journey
            </h2>
            <p className="text-lg text-mw-gray-500">
              MW Science is built around five core signals that help agencies and brands understand people, places, media performance and business outcomes.
            </p>
          </motion.div>

          <SignalsCompassDial activeIndex={activeSignal} onSelect={setActiveSignal} />

          {/* Closing statement — folded into the same section per the combined copy;
              no separate heading/visual here since the constellation diagram was
              dropped as repetitive alongside the signal dial above. */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-mw-gray-600 leading-relaxed text-lg text-center mt-10"
          >
            MW Science integrates five signals; Audience, Location, Media, Brand, and Outcome to provide a holistic view of the Out-of-Home journey from awareness to action. By connecting these insights, the platform empowers organizations to move beyond simple measurement, revealing the &ldquo;why&rdquo; behind consumer behavior to drive smarter, evidence-based investment decisions.
          </motion.p>

        </div>
      </section>

      {/* ── 5. MW SCIENCE LAB ────────────────────────────────────────────────── */}
      {/* bg-white (not gray-50): sections 3+4 merged into one gray-50 section right
          above this one, so this needs the lighter band back to keep them visually separate. */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 tracking-tight mb-3">MW Science Lab</h2>
            <p className="text-lg text-mw-blue-600 font-medium mb-6">Research that reveals the signals behind growth.</p>
            <p className="text-mw-gray-600 leading-relaxed">
              MW Science Lab is the research capability within MW Science. It combines human understanding and rigorous measurement to ground decisions about audiences, brands and outcomes with greater confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <ScienceLabDiagramLivingCore />
          </motion.div>

        </div>
      </section>

      {/* ── 6. RESEARCH SOLUTIONS ────────────────────────────────────────────── */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 tracking-tight">
              Solutions Built Around Signals
            </h2>
          </motion.div>

          <ResearchSolutionsGrid />

        </div>
      </section>

      {/* ── 7. SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
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

          <TestimonialsSpotlight />

        </div>
      </section>

      {/* ── 8. WHY MW SCIENCE ────────────────────────────────────────────────── */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 tracking-tight">
              Beyond Measurement. Towards Understanding.
            </h2>
          </motion.div>

          <WhyMWScienceCometFlow />

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
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 overflow-hidden">
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
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 flex flex-col items-center"
          >
            <CompassNeedleAmbientDrift className="w-28 h-28 md:w-32 md:h-32" />
            <p className="text-3xl md:text-4xl font-black tracking-tight text-white mt-4">True North for OOH.</p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
