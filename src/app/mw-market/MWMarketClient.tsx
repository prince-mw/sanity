'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CTAButton } from "@/components/CTAButton"
import CaseStudiesSection from "@/components/CaseStudiesSection"
import type { DisplayIntegration } from '@/data/default-integrations'
import type { SanityProduct } from "@/sanity/lib/fetch"
import { getSanityImageUrl } from "@/sanity/lib/fetch"

interface MWMarketClientProps {
  readonly caseStudies?: any[]
  readonly product?: SanityProduct | null
  readonly partnerLogos?: DisplayIntegration[] | null
}

// Icons
const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
)

const BookmarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>
)

const PackageIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
)

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
)

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)

const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

const CurrencyDollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
)

const ArticleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
  </svg>
)

export default function MWMarketPage({ caseStudies = [], product, partnerLogos }: MWMarketClientProps) {
  const heroTitle = product?.heroTitle || 'Turn OOH Buying Into a Self-Serve Experience'
  const heroSubtitle = product?.heroSubtitle || 'Discover, plan, and launch billboard campaigns globally \u2014 faster, simpler, and with full transparency.'
  const heroDescription = product?.description || 'MW Market is a self-serve OOH marketplace that lets advertisers access inventory, book campaigns, and track performance \u2014 all in one place.'
  const tagline = product?.tagline || product?.heroBadge || 'Global OOH Marketplace'
  const heroImageUrl = product?.heroImage ? getSanityImageUrl(product.heroImage, { width: 800 }) : null
  const heroStats = product?.heroStats || []
  const ctaLabel = 'Get Started'
  const heroStatColors = ['text-yellow-300', 'text-green-300', 'text-purple-300', 'text-pink-300']

  const gradientMap: Record<string, string> = {
    'blue-indigo': 'from-blue-900 via-blue-800 to-indigo-900',
    'teal-blue': 'from-teal-900 via-teal-800 to-blue-900',
    'purple-pink': 'from-purple-900 via-purple-800 to-pink-900',
    'indigo-purple': 'from-indigo-900 via-indigo-800 to-purple-900',
  }
  const heroGradient = gradientMap[product?.heroGradient || ''] || 'from-blue-900 via-blue-800 to-indigo-900'

  // Icon map for CMS-driven feature icons
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    globe: GlobeIcon,
    bookmark: BookmarkIcon,
    package: PackageIcon,
    'map-pin': MapPinIcon,
    map: MapPinIcon,
    chart: ChartBarIcon,
    'chart-bar': ChartBarIcon,
    bolt: BoltIcon,
    lightning: BoltIcon,
    eye: EyeIcon,
    dollar: CurrencyDollarIcon,
    currency: CurrencyDollarIcon,
    star: StarIcon,
    'check-circle': CheckCircleIcon,
    arrow: ArrowRightIcon,
  }

  // COMPARISON — from painPoints CMS field
  const comparisonTitle = product?.painPointsTitle || 'Stop Manual Buying. Start Campaigns in Minutes.'
  const comparisonSubtitle = product?.painPointsSubtitle || 'Traditional OOH buying is slow, fragmented, and hard to scale. MW Market simplifies the process so you can launch campaigns with speed and confidence.'
  const defaultComparisonRows = [
    { oldWay: 'Long contracts cause unnecessary advertising costs.', newWay: 'Remove the cost barrier with short-term contracts of a minimum of 7 days. Only advertise when you need to.' },
    { oldWay: 'Advertise big with deep impression, but no store visits.', newWay: 'Hyperlocal targeting allows you to buy billboards close to your outlet.' },
    { oldWay: 'Slow back-and-forth communication with publishers.', newWay: 'Launch campaigns in days, not weeks, with a self-serve dashboard.' },
    { oldWay: 'Unclear results.', newWay: 'Track performance with real-time insights.' },
  ]
  const comparisonRows = product?.painPoints?.some(p => p.beforeState)
    ? product.painPoints.map(p => ({ oldWay: p.beforeState || p.title, newWay: p.afterState || p.description }))
    : defaultComparisonRows

  // FEATURES — from features CMS field
  const featuresTitle = product?.featuresTitle || 'Everything You Need to Launch OOH Campaigns'
  const featuresSubtitle = product?.featuresSubtitle || 'Powerful tools designed to help you discover, book, and scale campaigns effortlessly.'
  const defaultFeatures = [
    { icon: GlobeIcon, title: 'Global Inventory Access', description: 'Explore billboard inventory across cities, highways, and locations worldwide.' },
    { icon: BookmarkIcon, title: 'Self-Serve Booking', description: 'Plan and book campaigns fast with flexible durations and transparent pricing.' },
    { icon: PackageIcon, title: 'Packaged Deals', description: 'Launch faster with ready-to-go campaign packages built for hyperlocal targeting that will generate actual footfalls.' },
    { icon: EyeIcon, title: 'High-Impact Locations', description: 'Access screens in high-visibility zones designed to capture attention.' },
    { icon: ChartBarIcon, title: 'Real-Time Campaign Tracking', description: 'Monitor campaign performance, impressions, and delivery through unified dashboards.' },
    { icon: BoltIcon, title: 'ROI Optimisation', description: 'Use performance insights to optimise campaigns and maximise return on investment.' },
  ]
  const features = product?.features?.length
    ? product.features.map(f => ({ icon: iconMap[f.icon || ''] || GlobeIcon, title: f.title, description: f.description || '' }))
    : defaultFeatures

  // ACCESS THE MARKET — benefits & stats from CMS
  const accessTitle = product?.howItWorksTitle || "Don't Replace. Access the Market."
  const accessSubtitle = product?.howItWorksSubtitle || 'MW Market connects you to a global OOH ecosystem, without the complexity of traditional buying.'
  const defaultAccessBullets = [
    'Works across multiple markets and formats',
    'Supports digital, static, and transit inventory',
    'Enables fast campaign activation with minimal effort',
    'Brings planning, buying, and measurement into one flow',
  ]
  const accessBullets = (product?.benefits && product.benefits.length > 0) ? product.benefits : defaultAccessBullets
  const defaultAccessStats = [
    { value: '100K+', label: 'Verified Media Sites' },
    { value: '10B+', label: 'Audience Data Points' },
    { value: '147+', label: 'Countries Covered' },
    { value: '30+', label: 'Currencies Supported' },
  ]
  const accessStats = product?.stats?.length
    ? product.stats.map(s => ({ value: s.value, label: s.label }))
    : defaultAccessStats

  // TESTIMONIALS — from CMS
  const defaultTestimonials = [
    { quote: 'MW Market transformed how we buy OOH. What used to take weeks of negotiation now takes minutes. The transparency and real-time tracking are game-changers.', author: 'Sarah Chen', title: 'Head of Media, Retail Brand', company: 'Asia Pacific', rating: 5 },
    { quote: 'We launched a hyperlocal campaign across 12 cities in one afternoon. The self-serve platform is intuitive and the results were immediately measurable.', author: 'James Okafor', title: 'Digital Marketing Director', company: 'FMCG Company', rating: 5 },
    { quote: 'The packaged deals saved us hours of planning. We got premium inventory at transparent pricing and saw a 40% uplift in store footfall within the first week.', author: 'Priya Sharma', title: 'Campaign Manager', company: 'QSR Chain', rating: 5 },
  ]
  const testimonials = product?.testimonials?.length
    ? product.testimonials.map(t => ({ quote: t.quote, author: t.author, title: t.role, company: t.company, rating: 5 }))
    : defaultTestimonials

  // PACKAGE DEALS — from detailPageSections where sectionKey === 'packages'
  const packageSection = product?.detailPageSections?.find(s => s.sectionKey === 'packages')
  const packageDealsTitle = packageSection?.sectionTitle || 'Ready-to-Launch Campaign Packages'
  const packageDealsSubtitle = packageSection?.sectionSubtitle || 'Pre-built packages for faster activation with proven inventory combinations.'
  const defaultPackageDeals = [
    { name: 'Hyperlocal Starter', tagline: 'Perfect for store launches', screens: '10\u201320 screens', duration: '7\u201314 days', highlight: 'Near your outlet' },
    { name: 'City Domination', tagline: 'Own the conversation citywide', screens: '50\u2013100 screens', duration: '14\u201330 days', highlight: 'High-traffic zones' },
    { name: 'Regional Blitz', tagline: 'Multi-market reach at scale', screens: '100\u2013250 screens', duration: '30 days', highlight: 'Across 3\u20135 cities' },
    { name: 'Brand Awareness Bundle', tagline: 'Maximum visibility, minimum effort', screens: '250+ screens', duration: 'Flexible', highlight: 'Prime locations' },
  ]
  const packageDeals = packageSection?.items?.length
    ? packageSection.items.map(item => ({ name: item.title, tagline: item.description || '', screens: item.detail || '', duration: item.metric || '', highlight: item.metricLabel || '' }))
    : defaultPackageDeals

  // FEATURED INVENTORY — from sampleLocations CMS field
  const inventoryTitle = product?.detailPageSections?.find(s => s.sectionKey === 'inventory')?.sectionTitle || 'High-Impact Locations, Ready to Book'
  const inventorySubtitle = product?.detailPageSections?.find(s => s.sectionKey === 'inventory')?.sectionSubtitle || 'Curated premium billboard locations across key markets.'
  const defaultFeaturedInventory = [
    { city: 'New York', location: 'Times Square', format: 'Digital LED', size: '48x14 ft', impressions: '1.2M/week', country: 'USA' },
    { city: 'London', location: 'Piccadilly Circus', format: 'Digital Screen', size: '60x20 ft', impressions: '900K/week', country: 'UK' },
    { city: 'Singapore', location: 'Orchard Road', format: 'Digital Billboard', size: '40x12 ft', impressions: '650K/week', country: 'Singapore' },
    { city: 'Dubai', location: 'Sheikh Zayed Road', format: 'LED Billboard', size: '50x16 ft', impressions: '800K/week', country: 'UAE' },
    { city: 'Mumbai', location: 'Bandra-Kurla Complex', format: 'Digital Screen', size: '36x12 ft', impressions: '700K/week', country: 'India' },
    { city: 'Sydney', location: 'Harbour Bridge Precinct', format: 'Static Billboard', size: '48x16 ft', impressions: '500K/week', country: 'Australia' },
    { city: 'Los Angeles', location: 'Sunset Boulevard', format: 'Digital LED', size: '42x14 ft', impressions: '750K/week', country: 'USA' },
    { city: 'Tokyo', location: 'Shibuya Crossing', format: 'Large Format Digital', size: '80x30 ft', impressions: '2.1M/week', country: 'Japan' },
  ]
  const featuredInventory = product?.sampleLocations?.length
    ? product.sampleLocations.map(loc => ({
        city: loc.traffic || loc.name,
        location: loc.name,
        format: loc.type,
        size: loc.reach || '',
        impressions: loc.impressions,
        country: loc.demographics || 'Global',
      }))
    : defaultFeaturedInventory

  // FINAL CTA FEATURES — static (no direct CMS field mapping)
  const finalCtaFeatures = [
    { icon: GlobeIcon, title: 'Global Coverage', description: 'Access 100,000+ verified media sites across global markets, powered by 10B+ audience data points.' },
    { icon: CurrencyDollarIcon, title: 'Multi-Currency', description: 'Pay in multiple currencies with secure transactions.' },
    { icon: BoltIcon, title: 'Instant Booking', description: 'Book billboards in seconds with real-time availability across global inventory.' },
    { icon: ChartBarIcon, title: 'Live Analytics', description: 'Track impressions, movement, and ROI with real-time audience measurement.' },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className={`relative bg-gradient-to-br ${heroGradient} text-white py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-6 sm:mb-8">

            {/* Left Content */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
              {tagline && (
                <div className="inline-flex items-center bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md mb-4 sm:mb-6 w-fit">
                  <span className="text-white/90 font-medium text-xs sm:text-sm">{tagline}</span>
                </div>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">{heroTitle}</h1>
              {heroSubtitle && <p className="text-lg sm:text-xl md:text-2xl font-light text-blue-200 mb-4 sm:mb-6">{heroSubtitle}</p>}
              {heroDescription && <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 leading-relaxed max-w-xl">{heroDescription}</p>}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <CTAButton href={product?.ctaLink || '/contact'} className="bg-white text-blue-900 px-5 sm:px-6 py-3 sm:py-3.5 rounded-md font-semibold text-sm sm:text-base hover:bg-blue-50 transition-all shadow-xl inline-flex items-center justify-center gap-2">
                  {ctaLabel}
                  <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </CTAButton>
                {product?.secondaryCta?.text && (
                  <CTAButton href={product.secondaryCta.link || ''} className="bg-white/10 text-white border border-white/30 px-5 sm:px-6 py-3 sm:py-3.5 rounded-md font-semibold text-sm sm:text-base hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2">
                    {product.secondaryCta.text}
                  </CTAButton>
                )}
              </div>
            </motion.div>

            {/* Right Image */}
            {heroImageUrl && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white/5 backdrop-blur-md border border-white/20 rounded-md overflow-hidden order-1 lg:order-2">
                <Image src={heroImageUrl} alt={heroTitle} width={800} height={500} className="w-full h-auto object-cover" priority />
              </motion.div>
            )}
          </div>

          {/* KPI Cards */}
          {heroStats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {heroStats.map((stat, index) => (
                <motion.div key={`stat-${stat.label}-${index}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-4 sm:p-5 text-center">
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${heroStatColors[index % heroStatColors.length]} mb-1`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-blue-200 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">{comparisonTitle}</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{comparisonSubtitle}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <div className="grid grid-cols-2">
              <div className="bg-gray-100 px-6 py-4 text-center font-bold text-gray-500 text-sm sm:text-base uppercase tracking-wide border-r border-gray-200">The Old Way</div>
              <div className="bg-blue-600 px-6 py-4 text-center font-bold text-white text-sm sm:text-base uppercase tracking-wide">The Moving Walls Way</div>
            </div>
            {comparisonRows.map((row, index) => (
              <div key={row.oldWay} className={`grid grid-cols-2 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="px-6 py-5 flex items-start gap-3 border-r border-gray-200">
                  <XCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{row.oldWay}</p>
                </div>
                <div className="px-6 py-5 flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">{row.newWay}</p>
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }} className="text-center mt-10">
            <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-md font-semibold hover:bg-blue-700 transition-colors">
              See How It Works <ArrowRightIcon className="w-5 h-5" />
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">{featuresTitle}</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{featuresSubtitle}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="flex gap-4 p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all bg-white">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESS THE MARKET */}
      <section className="py-16 sm:py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{accessTitle}</h2>
              <p className="text-lg text-blue-200 mb-8 leading-relaxed">{accessSubtitle}</p>
              <ul className="space-y-4">
                {accessBullets.map((bullet: string, index: number) => (
                  <motion.li key={bullet} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 text-base sm:text-lg">{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {accessStats.map((stat, index) => (
                <div key={stat.value} className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-200 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PACKAGE DEALS */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <PackageIcon className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">Package Deals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">{packageDealsTitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{packageDealsSubtitle}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packageDeals.map((pkg, index) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <PackageIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-4">{pkg.tagline}</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2"><EyeIcon className="w-4 h-4 text-gray-400" />{pkg.screens}</li>
                  <li className="flex items-center gap-2"><BoltIcon className="w-4 h-4 text-gray-400" />{pkg.duration}</li>
                  <li className="flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-gray-400" />{pkg.highlight}</li>
                </ul>
                <CTAButton href={product?.ctaLink || '/contact'} className="w-full text-center block bg-blue-50 text-blue-700 font-semibold py-2.5 rounded-md text-sm hover:bg-blue-600 hover:text-white transition-colors">Get This Package</CTAButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED INVENTORY */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <MapPinIcon className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">Featured Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">{inventoryTitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{inventorySubtitle}</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['All Markets', 'USA', 'UK', 'Singapore', 'UAE', 'India', 'Australia'].map((country, i) => (
              <button key={country} className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${i === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600'}`}>{country}</button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredInventory.map((item, index) => (
              <motion.div key={`${item.city}-${item.location}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.07 }} viewport={{ once: true }} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all">
                <div className="h-40 bg-blue-50 flex items-center justify-center relative">
                  <MapPinIcon className="w-10 h-10 text-blue-300" />
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">{item.country}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-0.5">{item.location}</h3>
                  <p className="text-sm text-gray-500 mb-3">{item.city}</p>
                  <div className="space-y-1 text-xs text-gray-600 mb-4">
                    <div className="flex items-center justify-between"><span>Format</span><span className="font-medium text-gray-800">{item.format}</span></div>
                    <div className="flex items-center justify-between"><span>Size</span><span className="font-medium text-gray-800">{item.size}</span></div>
                    <div className="flex items-center justify-between"><span>Impressions</span><span className="font-medium text-blue-600">{item.impressions}</span></div>
                  </div>
                  <CTAButton href={product?.ctaLink || '/contact'} className="w-full text-center block border border-blue-600 text-blue-600 font-semibold py-2 rounded-md text-sm hover:bg-blue-600 hover:text-white transition-colors">Book Now</CTAButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Trusted by Advertisers Worldwide</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">See what marketers say about launching OOH campaigns on MW Market.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.author} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 flex flex-col">
                <QuoteIcon className="w-8 h-8 text-blue-200 mb-4" />
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1 mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }, (_, i) => (<StarIcon key={`star-${testimonial.author}-${i}`} className="w-4 h-4 text-yellow-400" />))}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{testimonial.author}</p>
                  <p className="text-gray-500 text-xs">{testimonial.title}</p>
                  <p className="text-blue-600 text-xs font-medium mt-0.5">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <CaseStudiesSection initialCaseStudies={caseStudies} />

      {/* MW MARKET ARTICLE */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <ArticleIcon className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">Resource</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">The Moving Walls Market</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Learn how MW Market is redefining how brands discover, buy, and measure out-of-home advertising.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div className="rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-56 sm:h-72 bg-blue-50 flex items-center justify-center">
                <ArticleIcon className="w-16 h-16 text-blue-300" />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Market Intelligence</span>
                  <span className="text-gray-400 text-xs">&bull;</span>
                  <span className="text-gray-500 text-xs">Moving Walls Team</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">How MW Market Is Making OOH Advertising as Easy as Digital</h3>
                <p className="text-gray-600 leading-relaxed mb-6">The out-of-home advertising space has traditionally been opaque, slow, and fragmented. MW Market changes that with a self-serve platform that gives advertisers direct access to global billboard inventory, transparent pricing, and real-time performance data.</p>
                <CTAButton href="/blog" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Read the Article <ArrowRightIcon className="w-4 h-4" />
                </CTAButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`relative bg-gradient-to-br ${heroGradient} text-white py-16 sm:py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{product?.finalCtaTitle || 'Launch Your Campaign in Minutes'}</h2>
            <p className="text-lg sm:text-xl text-blue-200 mb-8 max-w-2xl mx-auto">{product?.finalCtaSubtitle || 'From discovery to live campaign \u2014 everything you need in one platform.'}</p>
            <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-md font-bold text-base sm:text-lg hover:bg-blue-50 transition-colors shadow-xl">
              {ctaLabel} <ArrowRightIcon className="w-5 h-5" />
            </CTAButton>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {finalCtaFeatures.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white/10 border border-white/20 rounded-xl p-5 sm:p-6">
                <feature.icon className="w-8 h-8 text-blue-200 mb-3" />
                <h3 className="font-bold text-white mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-blue-200 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
