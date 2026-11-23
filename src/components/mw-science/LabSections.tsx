'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import { GLOBE_FRAMES, GLOBE_SIZE } from '@/data/globe-frames'
import { useLocale } from '@/i18n/LocaleContext'

// MW Science Lab sections (research solutions, panel coverage, testimonials), moved
// out of the MW Science page into the MW Science Lab child page (/mw-science/lab).

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
// color language as the five intelligences (blue/orange/violet, plus teal as a
// 4th tone for Design & Improve, which doesn't map onto an existing intelligence).
const CATEGORY_ACCENTS: Record<string, { bg: string; text: string; accent: string; border: string }> = {
  'Understand People': { bg: 'bg-mw-blue-50', text: 'text-mw-blue-600', accent: 'bg-mw-blue-600', border: 'border-mw-blue-200' },
  'Understand Brand': { bg: 'bg-orange-50', text: 'text-orange-600', accent: 'bg-orange-600', border: 'border-orange-200' },
  'Understand Media & Investment': { bg: 'bg-violet-50', text: 'text-violet-600', accent: 'bg-violet-600', border: 'border-violet-200' },
  'Design & Improve': { bg: 'bg-teal-50', text: 'text-teal-600', accent: 'bg-teal-600', border: 'border-teal-200' },
}

// ─── MARKET COVERAGE ───────────────────────────────────────────────────────────
// MW Science Lab's own survey panel, grouped by region. Sourced from the
// manager's coverage deck — the deck's second "Middle East" table is actually
// Austria/Cyprus/Czech Republic/Finland/Greece/Hungary/Norway/Sweden/Turkey,
// so it's relabelled "Europe" here rather than duplicating the region name.
// Country marker x/y are pre-projected pixel positions on the WORLD_LAND_PATH's
// 980x500 equirectangular viewBox (see src/data/world-map-path.ts).
const MARKET_REGIONS = [
  {
    id: 'sea',
    label: 'SEA',
    icon: LocationIcon,
    accent: 'bg-mw-blue-600', text: 'text-mw-blue-600', bg: 'bg-mw-blue-50', border: 'border-mw-blue-200',
    countries: [
      { name: 'Malaysia', size: '500K+', x: 784, y: 239 },
      { name: 'Singapore', size: '120K+', x: 773, y: 246 },
      { name: 'Indonesia', size: '800K+', x: 781, y: 267 },
      { name: 'Thailand', size: '500K+', x: 765, y: 208 },
      { name: 'Philippines', size: '500K+', x: 822, y: 215 },
      { name: 'Vietnam', size: '350K+', x: 784, y: 206 },
    ],
  },
  {
    id: 'north-pacific',
    label: 'North + Pacific',
    icon: LocationIcon,
    accent: 'bg-teal-600', text: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200',
    countries: [
      { name: 'Japan', size: '180K+', x: 866, y: 150 },
      { name: 'S Korea', size: '120K+', x: 838, y: 149 },
      { name: 'Australia', size: '150K+', x: 852, y: 319 },
    ],
  },
  {
    id: 'south-asia',
    label: 'South Asia',
    icon: LocationIcon,
    accent: 'bg-orange-600', text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200',
    countries: [
      { name: 'India', size: '1 mil+', x: 705, y: 189 },
      { name: 'Pakistan', size: '60K+', x: 681, y: 167 },
      { name: 'Bangladesh', size: '40K+', x: 735, y: 183 },
    ],
  },
  {
    id: 'china',
    label: 'China Region',
    icon: LocationIcon,
    accent: 'bg-violet-600', text: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200',
    countries: [
      { name: 'China', size: '1.2 mil+', x: 770, y: 153 },
      { name: 'Hong Kong', size: '55K+', x: 801, y: 188 },
      { name: 'Taiwan', size: '70K+', x: 819, y: 184 },
    ],
  },
  {
    id: 'middle-east',
    label: 'Middle East',
    icon: LocationIcon,
    accent: 'bg-green-600', text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200',
    countries: [
      { name: 'UAE', size: '30K+', x: 637, y: 183 },
      { name: 'Egypt', size: '60K+', x: 572, y: 175 },
      { name: 'KSA', size: '71K+', x: 613, y: 183 },
      { name: 'Qatar', size: '60K+', x: 629, y: 180 },
      { name: 'Bahrain', size: '35K+', x: 628, y: 178 },
      { name: 'Iraq', size: '40K+', x: 610, y: 158 },
      { name: 'Jordan', size: '33K+', x: 588, y: 164 },
      { name: 'Kuwait', size: '35K+', x: 619, y: 169 },
      { name: 'Oman', size: '41K+', x: 645, y: 192 },
    ],
  },
  {
    id: 'europe',
    label: 'Europe',
    icon: LocationIcon,
    accent: 'bg-rose-600', text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200',
    countries: [
      { name: 'Austria', size: '30K+', x: 530, y: 118 },
      { name: 'Cyprus', size: '75K+', x: 581, y: 153 },
      { name: 'Czech Republic', size: '90K+', x: 532, y: 112 },
      { name: 'Finland', size: '80K+', x: 561, y: 72 },
      { name: 'Greece', size: '71K+', x: 550, y: 142 },
      { name: 'Hungary', size: '60K+', x: 543, y: 119 },
      { name: 'Norway', size: '71K+', x: 513, y: 81 },
      { name: 'Sweden', size: '60K+', x: 531, y: 78 },
      { name: 'Turkey', size: '65K+', x: 585, y: 142 },
    ],
  },
]

const MARKET_REGION_INTERVAL = 4500

// A separate, smaller app-install panel (distinct from the survey panel above).
export const APP_PANEL = [
  { code: 'MY', size: '16K' },
  { code: 'SGP', size: '1.6K' },
  { code: 'ID', size: '3.5K' },
  { code: 'TH', size: '2.5K' },
  { code: 'PH', size: '1.2K' },
  { code: 'VN', size: '800' },
  { code: 'MAR', size: '4K' },
  { code: 'IN', size: '500' },
]

export const MARKET_METRICS = [
  { value: '40M+', label: 'Global Panel Members' },
  { value: '40+', label: 'Countries Covered' },
  { value: '100%', label: 'First-Party Data' },
]

export const MARKET_METRICS_INTERVAL = 4000

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

export const LOGOS = [
  'abs','amway','ariasia','astro','axiata','bake',
  'bat','beir','booking','bulak','cimb','clorox',
  'clubmed','colgaye','cpf','digitalist','electrolux','etika',
  'grab','invictus','kimberly','liberty','loreal','maxis',
  'mediacorp','mpa','mudah','net','ocbc','paypal',
  'robi','sephora','taylors','uob','whisper','x',
]


// ─── RESEARCH SOLUTIONS: CATEGORY TABS ─────────────────────────────────────────
// 4 category tabs at top, kept on one scrollable row at every width (mobile
// scrolls horizontally instead of wrapping top-to-bottom, matching desktop's
// single-row look). Clicking a tab shows that category's items: on tablet/
// desktop as a box grid, on mobile as one box at a time auto-advancing every
// 5s (same pattern as Testimonials Spotlight / the Lab stage spotlight) since
// a swipeable multi-card carousel was harder to scan than a single card.
const CATEGORY_ITEM_INTERVAL = 5000

export function ResearchSolutionsGrid() {
  const { t } = useLocale()
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

  // Keep the active tab scrolled into view within its own row (mobile scrolls
  // the tab strip horizontally, so an auto-advance can otherwise move focus
  // to a tab currently scrolled off-screen with no visible indication).
  // Deliberately scrolls the row's own scrollLeft directly rather than using
  // element.scrollIntoView() — scrollIntoView scrolls EVERY scrollable
  // ancestor needed to reveal the element, including the whole page, which on
  // mount (before the user has scrolled down to this section at all) yanked
  // the entire page down to this row on every load.
  const tabRowRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => {
    const row = tabRowRef.current
    const el = tabRefs.current[catIndex]
    if (!row || !el) return
    const target = el.offsetLeft - (row.clientWidth - el.clientWidth) / 2
    row.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [catIndex])

  return (
    <div>
      <div
        ref={tabRowRef}
        className="flex sm:flex-wrap sm:justify-center gap-2 mb-10 overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
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
              aria-label={t('ui.products.aria.show').replace('{item}', item.title)}
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
            className="flex flex-wrap justify-center gap-5"
          >
            {category.items.map(item => (
              <div
                key={item.title}
                className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.333px)] bg-white rounded-2xl border border-mw-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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

// ─── ANIMATED STAT ─────────────────────────────────────────────────────────────
// Counts up from 0 to the numeric part of `value` once scrolled into view, then
// re-appends whatever non-numeric prefix/suffix the value had (e.g. "40M+", "100%").

export function AnimatedStat({ value, label }: { value: string; label: string }) {
  const match = value.match(/^([\d.]+)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''
  const isDecimal = match ? match[1].includes('.') : false

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, target, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [isInView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-mw-blue-600 tracking-tight">
        {isDecimal ? display.toFixed(1) : Math.round(display)}{suffix}
      </div>
      <div className="text-mw-gray-600 mt-2">{label}</div>
    </div>
  )
}

// Fans a cluster of markers out into non-overlapping label positions around
// their shared centroid — labels keep the markers' original angular ORDER
// (so leader lines never cross) but get evenly redistributed in angle, since
// tightly-packed clusters (e.g. the Gulf states) would otherwise stack their
// true-position labels on top of each other.
function layoutRadialLabels(markers: { name: string; x: number; y: number }[]) {
  if (markers.length === 0) return []
  const cx = markers.reduce((s, m) => s + m.x, 0) / markers.length
  const cy = markers.reduce((s, m) => s + m.y, 0) / markers.length
  const sorted = markers
    .map(m => ({ ...m, angle: Math.atan2(m.y - cy, m.x - cx) }))
    .sort((a, b) => a.angle - b.angle)
  const n = sorted.length
  const baseRadius = Math.min(150, 60 + n * 11)
  const startAngle = sorted[0].angle
  // Rounded to 1dp: Math.cos/sin can differ in their last bit between the
  // server's and browser's JS engines for the same input, which otherwise
  // serializes as a different string server- vs client-side and trips a
  // hydration mismatch even though the layout is logically deterministic.
  const round = (v: number) => Math.round(v * 10) / 10
  // Keep labels off the very edge of the globe's bounding box: on narrow
  // screens the box itself renders small, so a fixed-size HTML label near
  // the raw fan-out position can spill past the card's padding and get
  // clipped. Pulling an out-of-bounds point back toward the fan-out centre
  // along its own angle (rather than clamping x/y independently) preserves
  // the spacing between labels instead of collapsing several onto the same
  // edge when they happen to fan out toward the same side.
  const margin = GLOBE_SIZE * 0.16
  const pullInsideBounds = (x: number, y: number) => {
    const dx = x - cx
    const dy = y - cy
    let scale = 1
    if (dx > 0) scale = Math.min(scale, Math.max(0, (GLOBE_SIZE - margin - cx)) / dx)
    if (dx < 0) scale = Math.min(scale, Math.max(0, (cx - margin)) / -dx)
    if (dy > 0) scale = Math.min(scale, Math.max(0, (GLOBE_SIZE - margin - cy)) / dy)
    if (dy < 0) scale = Math.min(scale, Math.max(0, (cy - margin)) / -dy)
    return { x: cx + dx * scale, y: cy + dy * scale }
  }
  // Labels are real HTML pills sized in fixed CSS pixels, not SVG units that
  // shrink with the globe — so a purely angular fan (spacing by degrees
  // only) can put two wide pills at nearly the same spot once the globe
  // renders small (evenly redistributing n items around a circle ignores
  // how much of that circle a label actually occupies). Placing each label
  // greedily against a few candidate radii, and rejecting one that lands
  // too close to an already-placed label, keeps every pair legible however
  // tightly the underlying countries cluster.
  const MOBILE_PX_PER_UNIT = 0.59
  const halfWidthUnits = (name: string) => (name.length * 6.3 + 16) / MOBILE_PX_PER_UNIT / 2
  const radiusFactors = [1, 0.8, 0.6, 1.18, 0.42]
  // Two countries that sit at nearly the same angle from the centroid (e.g.
  // neighbouring Norway/Sweden) stay nearly collinear no matter which radius
  // is tried, so radius alone can't separate them — a small angular nudge is
  // also needed as an escape hatch.
  const angleOffsets = [0, 0.26, -0.26, 0.52, -0.52, 0.79, -0.79]
  const placed: { x: number; y: number; hw: number }[] = []
  return sorted.map((m, i) => {
    const angle = startAngle + (i / n) * Math.PI * 2
    const hw = halfWidthUnits(m.name)
    let chosen: { x: number; y: number } | null = null
    search: for (const offset of angleOffsets) {
      for (const factor of radiusFactors) {
        const candidate = pullInsideBounds(cx + baseRadius * factor * Math.cos(angle + offset), cy + baseRadius * factor * Math.sin(angle + offset))
        const collides = placed.some(p => Math.hypot(candidate.x - p.x, candidate.y - p.y) < (hw + p.hw) * 0.85)
        if (!chosen) chosen = candidate
        if (!collides) { chosen = candidate; break search }
      }
    }
    placed.push({ x: chosen!.x, y: chosen!.y, hw })
    return { ...m, labelX: round(chosen!.x), labelY: round(chosen!.y) }
  })
}

// ─── MARKET COVERAGE GLOBE ─────────────────────────────────────────────────────
// A real 3D-look globe (orthographic projection, see src/data/globe-frames.ts)
// that turns to face whichever region is active: that region's countries
// light up in its accent colour (highlightD) and get labelled directly on
// the globe with their panel size, fanned out with leader lines so labels
// don't overlap even for tightly-clustered regions (Gulf states, Europe).
// Auto-advances every 4.5s, pausable on hover — same pattern as the
// intelligence dial above — and clicking a region in the list spins straight to it. The
// turn itself is a genuine 3D rotateY flip (not a plain crossfade), so
// selecting a new region reads as "the globe turned to show you that part
// of the world."

export function MarketCoverageMap() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = MARKET_REGIONS[activeIndex]
  const frame = GLOBE_FRAMES[active.id]
  const labels = layoutRadialLabels(frame.markers)

  const [isPaused, setIsPaused] = useState(false)
  const remainingRef = useRef(MARKET_REGION_INTERVAL)
  const startRef = useRef(0)

  useEffect(() => { remainingRef.current = MARKET_REGION_INTERVAL }, [activeIndex])
  useEffect(() => {
    if (isPaused) return
    startRef.current = Date.now()
    const id = setTimeout(() => {
      setActiveIndex(i => (i + 1) % MARKET_REGIONS.length)
    }, remainingRef.current)
    return () => {
      clearTimeout(id)
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startRef.current))
    }
  }, [activeIndex, isPaused])

  const half = GLOBE_SIZE / 2

  return (
    <div
      className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl bg-gradient-to-b from-mw-blue-950 to-mw-blue-900 px-9 py-6 sm:p-10 shadow-[0_25px_60px_-20px_rgba(15,40,90,0.55)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.18),transparent_60%)]" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[460px] aspect-square" style={{ perspective: 1400 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="absolute inset-0"
              aria-hidden="true"
              initial={{ opacity: 0, rotateY: -85 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 85 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <svg viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`} className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="globeSheen" cx="34%" cy="28%" r="75%">
                    <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0" />
                  </radialGradient>
                  <filter id="globeMarkerGlow" x="-150%" y="-150%" width="400%" height="400%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <circle cx={half} cy={half} r={half - 6} fill="#0e2a56" />
                <path d={frame.landD} fill="#3f6db3" />
                <path d={frame.bordersD} fill="none" stroke="#9dc3f5" strokeWidth="0.6" strokeOpacity="0.45" />
                <motion.path
                  key={`highlight-${active.id}`}
                  d={frame.highlightD}
                  className={active.text}
                  fill="currentColor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                <circle cx={half} cy={half} r={half - 6} fill="none" stroke="#5b8fd9" strokeWidth="1.5" />
                <circle cx={half} cy={half} r={half - 6} fill="url(#globeSheen)" />

                {labels.map(m => (
                  <g key={m.name}>
                    <line x1={m.x} y1={m.y} x2={m.labelX} y2={m.labelY} stroke="#dbeafe" strokeOpacity="0.55" strokeWidth="1" />
                    <motion.circle
                      cx={m.x} cy={m.y} r="9" fill="#facc15"
                      initial={{ opacity: 0.35, scale: 0.8 }}
                      animate={{ opacity: [0.35, 0, 0.35], scale: [0.8, 1.6, 0.8] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ transformOrigin: `${m.x}px ${m.y}px` }}
                    />
                    <circle cx={m.x} cy={m.y} r="3.5" fill="#facc15" stroke="#fff8e1" strokeWidth="0.8" filter="url(#globeMarkerGlow)" />
                  </g>
                ))}
              </svg>

              {/* HTML overlay for labels: keeps country/panel-size text at a
                  legible, fixed screen size regardless of how small the globe
                  itself renders on narrow viewports (SVG text shrinks with
                  the viewBox scale, which made it unreadable on mobile). */}
              <div className="absolute inset-0">
                {labels.map(m => {
                  const anchor = m.labelX < half - 4 ? 'end' : m.labelX > half + 4 ? 'start' : 'middle'
                  const country = active.countries.find(c => c.name === m.name)
                  const translateX = anchor === 'start' ? '8px' : anchor === 'end' ? 'calc(-100% - 8px)' : '-50%'
                  return (
                    <div
                      key={m.name}
                      className="absolute max-w-[92px] whitespace-normal text-center sm:max-w-none sm:whitespace-nowrap sm:text-left rounded-md bg-mw-blue-950/90 px-1.5 py-0.5 text-[11px] sm:text-xs font-bold leading-tight text-white shadow-sm"
                      style={{
                        left: `${(m.labelX / GLOBE_SIZE) * 100}%`,
                        top: `${(m.labelY / GLOBE_SIZE) * 100}%`,
                        transform: `translate(${translateX}, -50%)`,
                      }}
                    >
                      {m.name}{country ? ` · ${country.size}` : ''}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3">
        {MARKET_REGIONS.map((region, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={region.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`w-full flex flex-col items-start gap-1.5 lg:flex-row lg:items-center lg:justify-between lg:gap-4 px-3 py-2.5 lg:px-5 lg:py-4 rounded-lg lg:rounded-xl border-2 text-left transition-all ${
                isActive ? `${region.accent} border-transparent text-white shadow-lg` : 'bg-white text-mw-gray-700 border-mw-gray-200 hover:border-mw-gray-300'
              }`}
            >
              <span className="flex items-center gap-2 lg:gap-3 font-semibold text-sm lg:text-base">
                <region.icon className={`w-4 h-4 lg:w-5 lg:h-5 shrink-0 ${isActive ? 'text-white' : region.text}`} />
                {region.label}
              </span>
              <span className={`text-[11px] lg:text-xs font-medium ${isActive ? 'text-white/80' : 'text-mw-gray-400'}`}>
                {region.countries.length} {region.countries.length === 1 ? 'country' : 'countries'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── TESTIMONIALS SPOTLIGHT ────────────────────────────────────────────────────
// One large testimonial at a time, auto-advancing every 7.5s, pause on hover.

const TESTIMONIAL_INTERVAL = 7500

export function TestimonialsSpotlight() {
  const { t: tr } = useLocale()
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
        aria-label={tr('ui.products.aria.previousTestimonial')}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-mw-gray-200 items-center justify-center text-mw-gray-400 hover:text-mw-blue-600 hover:border-mw-blue-200 transition-colors"
      >
        <ArrowRightIcon className="w-4 h-4 rotate-180" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label={tr('ui.products.aria.nextTestimonial')}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-mw-gray-200 items-center justify-center text-mw-gray-400 hover:text-mw-blue-600 hover:border-mw-blue-200 transition-colors"
      >
        <ArrowRightIcon className="w-4 h-4" />
      </button>

      <div className="flex justify-center gap-2 mt-10">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={tr('ui.products.aria.goToTestimonial').replace('{n}', String(i + 1))}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-mw-blue-600' : 'w-1.5 bg-mw-gray-200 hover:bg-mw-gray-300'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── SINGLE ITEM CAROUSEL ──────────────────────────────────────────────────────
// Generic "one item at a time" carousel — same interaction pattern as
// TestimonialsSpotlight (arrows on tablet+, dots always, auto-advance,
// pause on hover/touch) — reused wherever a row of 3 columns would otherwise
// just stack one-by-one on narrow screens (Beyond Measurement, Market
// Coverage's metrics).

export function SingleItemCarousel<T>({
  items,
  interval,
  renderItem,
  ariaLabel,
}: {
  items: T[]
  interval: number
  renderItem: (item: T) => React.ReactNode
  ariaLabel: string
}) {
  const { t } = useLocale()
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const remainingRef = useRef(interval)
  const startRef = useRef(0)

  useEffect(() => { remainingRef.current = interval }, [active])
  useEffect(() => {
    if (isPaused) return
    startRef.current = Date.now()
    const id = setTimeout(() => setActive(a => (a + 1) % items.length), remainingRef.current)
    return () => {
      clearTimeout(id)
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startRef.current))
    }
  }, [active, isPaused, items.length])

  const go = (dir: number) => setActive(a => (a + dir + items.length) % items.length)

  return (
    <div
      className="relative max-w-xs mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.4 }}
        >
          {renderItem(items[active])}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => go(-1)}
        aria-label={t('ui.products.aria.previous').replace('{item}', ariaLabel)}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-9 h-9 rounded-full bg-white border border-mw-gray-200 items-center justify-center text-mw-gray-400 hover:text-mw-blue-600 hover:border-mw-blue-200 transition-colors"
      >
        <ArrowRightIcon className="w-4 h-4 rotate-180" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label={t('ui.products.aria.next').replace('{item}', ariaLabel)}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-9 h-9 rounded-full bg-white border border-mw-gray-200 items-center justify-center text-mw-gray-400 hover:text-mw-blue-600 hover:border-mw-blue-200 transition-colors"
      >
        <ArrowRightIcon className="w-4 h-4" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={t('ui.products.aria.goTo').replace('{item}', ariaLabel).replace('{n}', String(i + 1))}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-mw-blue-600' : 'w-1.5 bg-mw-gray-200 hover:bg-mw-gray-300'}`}
          />
        ))}
      </div>
    </div>
  )
}