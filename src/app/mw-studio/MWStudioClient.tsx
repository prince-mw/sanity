'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import { CTAButton } from '@/components/CTAButton'
import { getSanityImageUrl } from '@/sanity/lib/fetch'
import type { SanityProduct } from '@/sanity/lib/fetch'

// ─── Icons ────────────────────────────────────────────────────────────────────
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)
const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
)
const DatabaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
)
const UploadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
)
const NetworkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
)
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const CurrencyDollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const TagIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
)
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)
const MonitorIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
  </svg>
)
const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)
const LayoutIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
)
const WifiOffIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M8.111 8.111A5.97 5.97 0 006 12l1.5 1.5A4.5 4.5 0 018.111 8.111zM12 12a3 3 0 00-3 3m3-3a3 3 0 013 3m-6 0l1.5 1.5M15.889 8.111A5.97 5.97 0 0118 12l-1.5 1.5" />
  </svg>
)
const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
)
const ServerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25v-.75m19.5 0A2.25 2.25 0 0021.75 15v-1.5a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25V15a2.25 2.25 0 002.25 2.25h15zM12 11.25h.008v.008H12v-.008z" />
  </svg>
)
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
)
const DocumentTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)
const StoreIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
  </svg>
)
const PaletteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
  </svg>
)
const LockClosedIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
)
const BarChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)
const RefreshIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
)
const LinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
)
const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
)
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

// ─── Types ────────────────────────────────────────────────────────────────────
type TabId = 'ims' | 'cms' | 'sitebuilder'
interface ComparisonRow { before: string; after: string; impact: string }
interface FeatureItem { icon: React.FC<{ className?: string }>; title: string; description: string }

// ─── Icon map ─────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  database: DatabaseIcon, upload: UploadIcon, network: NetworkIcon,
  clock: ClockIcon, dollar: CurrencyDollarIcon, currency: CurrencyDollarIcon,
  tag: TagIcon, calendar: CalendarIcon, monitor: MonitorIcon,
  eye: EyeIcon, layout: LayoutIcon, wifi: WifiOffIcon, bell: BellIcon,
  server: ServerIcon, sparkles: SparklesIcon, document: DocumentTextIcon,
  store: StoreIcon, palette: PaletteIcon, lock: LockClosedIcon,
  chart: BarChartIcon, refresh: RefreshIcon, link: LinkIcon,
  moon: MoonIcon, settings: SettingsIcon, bolt: BoltIcon, globe: GlobeIcon,
}




interface MWStudioClientProps {
  caseStudies?: any[]
  product?: SanityProduct | null
  partnerLogos?: any[] | null
}

export default function MWStudioClient({ caseStudies = [], product }: MWStudioClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>('ims')

  // ── Hero ───────────────────────────────────────────────────────────────────
  const heroTitle = product?.heroTitle || 'The Complete OOH Operating System for Media Owners'
  const heroSubtitle = product?.heroSubtitle || 'Organise your inventory. Deliver content across every screen. Launch a self-serve OOH storefront for your advertisers — all in one platform.'
  const heroDescription = product?.description || 'Moving Walls Studio gives you the tools to structure, deliver, and sell at scale.'
  const tagline = product?.tagline || product?.heroBadge || 'OOH Operating System'
  const heroStats = product?.heroStats || []
  const heroImageUrl = product?.heroImage ? getSanityImageUrl(product.heroImage, { width: 800 }) : null
  const gradientMap: Record<string, string> = {
    'blue-indigo': 'from-blue-900 via-blue-800 to-indigo-900',
    'teal-blue': 'from-teal-900 via-teal-800 to-blue-900',
    'purple-pink': 'from-purple-900 via-purple-800 to-pink-900',
    'indigo-purple': 'from-indigo-900 via-indigo-800 to-purple-900',
  }
  const heroGradient = gradientMap[product?.heroGradient || ''] || 'from-blue-900 via-blue-800 to-indigo-900'
  const heroStatColors = ['text-yellow-300', 'text-green-300', 'text-purple-300', 'text-pink-300']

  // ── IMS data ───────────────────────────────────────────────────────────────
  const imsSection = product?.detailPageSections?.find(s => s.sectionKey === 'ims')
  const imsTitle = imsSection?.sectionTitle || 'Stop Managing Inventory in Fragments. Start Structuring It for Scale.'
  const imsSubtitle = imsSection?.sectionSubtitle || "Managing OOH inventory across formats and markets often leads to fragmented data, limited visibility, and unstructured details. MW Studio's Inventory Management System brings structure, consistency, and control—so your inventory is always ready for planning and sales."
  const imsBullets: string[] = (product?.benefits && product.benefits.length > 0)
    ? product.benefits
    : [
        'Centralised system for all inventory types with complete asset data',
        'Standardised onboarding with guided, structured workflows',
        'Real-time visibility into availability and booking status',
        'Organised inventory with networks and tagging for efficient planning',
      ]
  const defaultImsRows: ComparisonRow[] = [
    { before: 'Disconnected inventory systems', after: 'Unified asset repository', impact: '100% Data Integrity' },
    { before: 'No real-time sync', after: 'Live booking status visibility', impact: 'Zero Overselling' },
    { before: 'Non-standardized inventory data', after: 'Structured, validated inventory', impact: 'Instant Channel Activation' },
    { before: 'Fragmented inventory discovery', after: 'Tag-based segmentation', impact: '3× Faster Sales Response' },
  ]
  const imsRows: ComparisonRow[] = product?.painPoints?.some(p => p.beforeState)
    ? product.painPoints.map(p => ({ before: p.beforeState || p.title, after: p.afterState || p.description, impact: p.title }))
    : defaultImsRows
  const defaultImsFeatures: FeatureItem[] = [
    { icon: DatabaseIcon, title: 'Simplified Inventory Onboarding', description: 'Capture complete asset details with a guided workflow that ensures accuracy and consistency.' },
    { icon: UploadIcon, title: 'Bulk Inventory Upload', description: 'Onboard large volumes of inventory quickly using validated Excel/CSV templates.' },
    { icon: NetworkIcon, title: 'Network-Based Organisation', description: 'Group inventory by region, format, or business logic to simplify planning and selling.' },
    { icon: ClockIcon, title: 'Real-Time Availability Tracking', description: 'Monitor booking status across hourly, daily, and monthly views for better utilisation.' },
    { icon: CurrencyDollarIcon, title: 'Pricing & Selling Controls', description: 'Define flexible pricing models and enforce rules to optimise revenue per asset.' },
    { icon: TagIcon, title: 'Tag-Based Discovery', description: 'Quickly search, filter, and match inventory to campaign requirements using custom tags.' },
  ]
  const imsFeatures: FeatureItem[] = product?.features?.length
    ? product.features.map((f, i) => ({
        icon: iconMap[f.icon || ''] || defaultImsFeatures[i]?.icon || DatabaseIcon,
        title: f.title,
        description: f.description || '',
      }))
    : defaultImsFeatures
  const imsBenefits = [
    'Works across all screen types and formats',
    'Supports CMS, sales, and inventory workflows in one system',
    'Enables both direct and self-serve sales models',
    'Scales operations without increasing overhead',
  ]

  // ── CMS data ────────────────────────────────────────────────────────────────
  const cmsSection = product?.detailPageSections?.find(s => s.sectionKey === 'cms')
  const cmsTitle = cmsSection?.sectionTitle || 'Every Screen. Every Campaign. Delivered with Precision.'
  const cmsSubtitle = cmsSection?.sectionSubtitle || 'Scheduling content across a network of digital screens is complex — missed plays, offline devices, and no reliable proof of delivery cost you revenue and advertiser trust. CMS automates ad distribution, monitors every screen in real time, and generates verified proof of play — so every campaign runs exactly as planned, every time.'
  const cmsBullets = [
    'Automated, bulk campaign scheduling eliminates manual errors',
    'Real-time monitoring ensures every screen stays active and performing',
    'Proof-of-play reports give advertisers full delivery confidence',
    'Flexible layout support maximises screen utilisation and revenue per asset',
  ]
  const defaultCmsRows: ComparisonRow[] = [
    { before: 'Manual scheduling effort', after: 'Automated bulk scheduling', impact: '75% Time Saved' },
    { before: 'Reactive monitoring only', after: 'Real-time device alerts', impact: '0 Missed Downtime' },
    { before: 'Basic playlog reports', after: 'Faster and cleaner playlog reports', impact: '100% Accountability' },
    { before: 'Siloed content formats', after: 'Unified format support', impact: 'Seamless Delivery' },
    { before: 'Outdated UI and user flow', after: 'Modern UI and user flows', impact: 'Better User Experience' },
  ]
  const defaultCmsFeatures: FeatureItem[] = [
    { icon: CalendarIcon, title: 'Intelligent Content Scheduling', description: 'Create campaigns with flexible scheduling, time-based delivery, ad skip, and dynamic ad rotations across shared screens.' },
    { icon: MonitorIcon, title: 'Device Manager v2', description: 'Securely onboard devices via ID mapping with a centralized screen management dashboard with multi-control.' },
    { icon: EyeIcon, title: 'Real-Time Device Monitoring', description: 'Track screen status and ad playback live to ensure performance and uptime.' },
    { icon: LayoutIcon, title: 'Flexible Layout Customisation', description: 'Configure screen layouts precisely to run multiple ads and maximise inventory yield.' },
    { icon: WifiOffIcon, title: 'Offline Playback Support', description: 'Preloaded content ensures uninterrupted campaign delivery during temporary connectivity disruptions.' },
    { icon: BellIcon, title: 'Instant Disconnect Alerts', description: 'Receive immediate notifications when devices go offline to enable quick response.' },
    { icon: ServerIcon, title: 'AdServer Integration', description: 'Transfer creatives directly from the Ad server to screens without duplication or delays.' },
    { icon: SparklesIcon, title: 'Dynamic Widgets', description: 'Enhance content with live data feeds like weather, news, and sports updates.' },
    { icon: DocumentTextIcon, title: 'Playlog and Performance Reports', description: 'Generate automated reports validating delivery and playback for advertiser transparency.' },
  ]
  const cmsFeatures: FeatureItem[] = cmsSection?.items?.length
    ? cmsSection.items.map((item, i) => ({
        icon: iconMap[item.iconName || ''] || defaultCmsFeatures[i]?.icon || CalendarIcon,
        title: item.title,
        description: item.description || '',
      }))
    : defaultCmsFeatures
  const cmsBenefits = [
    'Supports all digital screen types, multi OS and content formats',
    'Manages both connected and offline playback environments',
    'Connects directly with SSP for seamless campaign execution',
    'Scales from single-screen operators to multi-market networks',
  ]

  // ── Sitebuilder data ────────────────────────────────────────────────────────
  const sbSection = product?.detailPageSections?.find(s => s.sectionKey === 'sitebuilder')
  const sbTitle = sbSection?.sectionTitle || 'Your Inventory Deserves a Storefront—Build It Without Code.'
  const sbSubtitle = sbSection?.sectionSubtitle || 'Advertisers today expect to discover, evaluate, and transact digitally. But most OOH operators still rely on emails and calls to close campaigns — a gap that slows deals and limits reach. Sitebuilder offers a professional, always-on storefront where advertisers can browse inventory, request campaigns, and complete bookings within a streamlined workflow.'
  const sbBullets = [
    'No-code storefront configuration — launch in days, not months',
    'SSP-synced inventory — what advertisers see is always accurate and current',
    'Controlled approval workflows that protect pricing and governance',
    'Automated delivery reports that build advertiser trust without added workload',
  ]
  const defaultSbRows: ComparisonRow[] = [
    { before: 'No advertiser discovery', after: 'Always-on storefront', impact: 'Always-On Visibility' },
    { before: 'Manual campaign negotiation', after: 'Structured approval workflows', impact: '60% Faster Deal Closure' },
    { before: 'No delivery transparency', after: 'Automated delivery reports', impact: '100% Advertiser Trust' },
    { before: 'Fragmented advertiser touchpoints', after: 'Unified commercial interface', impact: 'Seamless Buyer Experience' },
  ]
  const defaultSbFeatures: FeatureItem[] = [
    { icon: StoreIcon, title: 'No-Code Storefront Builder', description: 'Build a fully branded OOH marketplace without developer support — complete with your own logo, layout, and content.' },
    { icon: PaletteIcon, title: 'Theme-Based Site Configuration', description: 'Choose customizable themes and use real-time configure mode with toggles to preview, edit, and publish instantly.' },
    { icon: SettingsIcon, title: 'Custom Business Setup', description: "Personalise your site's identity, policies, and communication touchpoints to reflect your brand and build client trust." },
    { icon: LockClosedIcon, title: 'Secure Access Control', description: 'Supports email, phone, OTP, or 2FA login with admin approval for verified buyer registration and campaign access.' },
    { icon: BarChartIcon, title: 'Customizable Campaign Insights', description: 'Tailor campaign report views for transparent, data-driven tracking and smarter performance optimisation.' },
    { icon: RefreshIcon, title: 'Seamless Publisher-to-Buyer Workflow', description: 'Simplifies billboard selling through an end-to-end process from campaign creation to report exhibit with transparent performance metrics.' },
    { icon: LinkIcon, title: 'Seamless SSP Integration', description: 'Unified SSP integration powers a storefront where inventory, pricing, campaign workflows, and reporting stay synchronised automatically.' },
    { icon: MoonIcon, title: '24/7 Commercial Availability', description: 'Advertisers discover inventory, raise requests, and initiate campaigns anytime without manual team intervention.' },
  ]
  const sbFeatures: FeatureItem[] = sbSection?.items?.length
    ? sbSection.items.map((item, i) => ({
        icon: iconMap[item.iconName || ''] || defaultSbFeatures[i]?.icon || StoreIcon,
        title: item.title,
        description: item.description || '',
      }))
    : defaultSbFeatures
  const sbBenefits = [
    'Keeps backend systems protected while elevating advertiser experience',
    'Supports both direct sales and self-serve campaign discovery',
    'Scales across markets and formats — one storefront, full control',
    'Positions your business as a modern, digital-first OOH operator',
  ]
  const sbSteps = [
    { step: '01', title: 'Register & Login', desc: 'Sign up and access your dashboard' },
    { step: '02', title: 'Launch Site Builder', desc: 'Open Site Builder from your menu' },
    { step: '03', title: 'Choose Your Theme', desc: 'Select a theme for your business' },
    { step: '04', title: 'Build Your Site', desc: 'Configure branded storefront and content layout' },
    { step: '05', title: 'Set Up Your Marketplace', desc: 'Set up workflows, visibility, and approval controls' },
    { step: '06', title: 'Publish', desc: 'Go live and manage updates anytime' },
  ]
  const sbAdvertiserSteps = [
    'Log in to your branded marketplace',
    'Browse your live inventory and available formats',
    'Create and submit campaign requests independently',
    'Track delivery and access proof-of-play reports',
  ]

  // ── Section 4 ──────────────────────────────────────────────────────────────
  const section4Title = product?.howItWorksTitle || "You're Operational in Days — Not Months"
  const finalCtaTitle = product?.finalCtaTitle || 'Launch Your OOH Operations Platform'
  const finalCtaSubtitle = product?.finalCtaSubtitle || 'Structure, deliver, and monetise your inventory — all from one unified platform built for media owners.'

  const tabs: { id: TabId; label: string }[] = [
    { id: 'ims', label: 'Inventory Management System' },
    { id: 'cms', label: 'Content Management System' },
    { id: 'sitebuilder', label: 'Sitebuilder' },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className={`relative bg-gradient-to-br ${heroGradient} text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 ${heroImageUrl ? 'lg:grid-cols-2' : ''} gap-8 lg:gap-12 items-center`}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {tagline && (
                <div className="inline-flex items-center bg-white/10 px-4 py-2 rounded-md mb-5 w-fit">
                  <BoltIcon className="w-4 h-4 text-yellow-300 mr-2" />
                  <span className="text-white/90 font-medium text-sm">{tagline}</span>
                </div>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{heroTitle}</h1>
              <p className="text-lg sm:text-xl text-blue-200 mb-3 leading-relaxed max-w-2xl">{heroSubtitle}</p>
              {heroDescription && heroDescription !== heroSubtitle && (
                <p className="text-base text-white/70 mb-8 leading-relaxed max-w-xl">{heroDescription}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <CTAButton
                  href={product?.ctaLink || '/contact'}
                  className="bg-white text-blue-900 px-6 py-3.5 rounded-md font-semibold text-sm sm:text-base hover:bg-blue-50 transition-all shadow-xl inline-flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRightIcon className="w-4 h-4" />
                </CTAButton>
                {product?.secondaryCta?.text && (
                  <CTAButton
                    href={product.secondaryCta.link || ''}
                    className="bg-white/10 text-white border border-white/30 px-6 py-3.5 rounded-md font-semibold text-sm sm:text-base hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
                  >
                    {product.secondaryCta.text}
                  </CTAButton>
                )}
              </div>
            </motion.div>
            {heroImageUrl && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                <Image src={heroImageUrl} alt={heroTitle} width={800} height={500} className="w-full h-auto" />
              </motion.div>
            )}
          </div>
          {heroStats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 sm:mt-12 pt-8 border-t border-white/20">
              {heroStats.map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }} className="text-center">
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${heroStatColors[index % heroStatColors.length]} mb-1`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-blue-200 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── SECTION 2: THREE MODULES ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Three Modules. One Complete OOH Business Platform.</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">Studio is purpose-built for media owners — integrating three core modules that manage, deliver, and monetise your inventory end to end.</p>
          </motion.div>

          {/* Tab Nav */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-md font-semibold text-sm sm:text-base transition-all border ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── TAB CONTENT ───────────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {activeTab === 'ims' && (
              <motion.div key="ims" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>

                {/* 1A: Intro + Bullets + Comparison */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{imsTitle}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">{imsSubtitle}</p>
                  <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                    {imsBullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-6">
                    <div className="grid grid-cols-3">
                      <div className="bg-gray-100 px-4 py-3 text-center font-bold text-gray-500 text-xs sm:text-sm uppercase tracking-wide border-r border-gray-200">Before</div>
                      <div className="bg-blue-600 px-4 py-3 text-center font-bold text-white text-xs sm:text-sm uppercase tracking-wide border-r border-blue-500">After</div>
                      <div className="bg-blue-900 px-4 py-3 text-center font-bold text-white text-xs sm:text-sm uppercase tracking-wide">Impact</div>
                    </div>
                    {imsRows.map((row, i) => (
                      <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="px-4 py-4 flex items-start gap-2 border-r border-gray-200">
                          <XCircleIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-xs sm:text-sm leading-relaxed">{row.before}</span>
                        </div>
                        <div className="px-4 py-4 flex items-start gap-2 border-r border-gray-200">
                          <CheckCircleIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800 text-xs sm:text-sm font-medium leading-relaxed">{row.after}</span>
                        </div>
                        <div className="px-4 py-4 flex items-center justify-center">
                          <span className="text-blue-900 text-xs sm:text-sm font-bold text-center">{row.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-3 text-sm text-blue-800 font-medium mb-6">
                    Average operational efficiency improvement: <strong>140% within 60 days</strong>
                  </div>
                  <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors">
                    See How It Works <ArrowRightIcon className="w-4 h-4" />
                  </CTAButton>
                </div>

                {/* 1B: Features icon grid */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Everything You Need to Manage and Monetise Inventory</h3>
                  <p className="text-gray-600 mb-8">Powerful tools designed to help you control operations and unlock revenue at scale.</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {imsFeatures.map((feat, i) => (
                      <motion.div key={feat.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
                        className="flex gap-4 p-5 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all">
                        <div className="flex-shrink-0 w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center">
                          <feat.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm mb-1">{feat.title}</h4>
                          <p className="text-gray-600 text-xs leading-relaxed">{feat.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 1C: Ecosystem section */}
                <div className="bg-blue-900 text-white rounded-xl p-8 sm:p-10 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">{"Don't Just List Inventory. Build an Ecosystem Built for Growth."}</h3>
                  <p className="text-blue-200 mb-6 max-w-2xl">IMS integrates into your operations while transforming how inventory is managed, organised, and activated.</p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {imsBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm sm:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 1D: Final CTA */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Put Your Inventory to Work 24/7</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Move from fragmented inventory management to a structured system built for visibility, control, and growth.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors">
                      Get Started <ArrowRightIcon className="w-4 h-4" />
                    </CTAButton>
                    <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold text-sm hover:bg-blue-50 transition-colors">
                      Request an IMS Demo <ArrowRightIcon className="w-4 h-4" />
                    </CTAButton>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'cms' && (
              <motion.div key="cms" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>

                {/* 2A: Intro + Bullets + Comparison */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{cmsTitle}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">{cmsSubtitle}</p>
                  <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                    {cmsBullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-6">
                    <div className="grid grid-cols-3">
                      <div className="bg-gray-100 px-4 py-3 text-center font-bold text-gray-500 text-xs sm:text-sm uppercase tracking-wide border-r border-gray-200">Before</div>
                      <div className="bg-blue-600 px-4 py-3 text-center font-bold text-white text-xs sm:text-sm uppercase tracking-wide border-r border-blue-500">After</div>
                      <div className="bg-blue-900 px-4 py-3 text-center font-bold text-white text-xs sm:text-sm uppercase tracking-wide">Impact</div>
                    </div>
                    {defaultCmsRows.map((row, i) => (
                      <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="px-4 py-4 flex items-start gap-2 border-r border-gray-200">
                          <XCircleIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-xs sm:text-sm leading-relaxed">{row.before}</span>
                        </div>
                        <div className="px-4 py-4 flex items-start gap-2 border-r border-gray-200">
                          <CheckCircleIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800 text-xs sm:text-sm font-medium leading-relaxed">{row.after}</span>
                        </div>
                        <div className="px-4 py-4 flex items-center justify-center">
                          <span className="text-blue-900 text-xs sm:text-sm font-bold text-center">{row.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-3 text-sm text-blue-800 font-medium mb-6">
                    Average campaign delivery accuracy improvement: <strong>94% within 30 days of activation</strong>
                  </div>
                  <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors">
                    See How CMS Works <ArrowRightIcon className="w-4 h-4" />
                  </CTAButton>
                </div>

                {/* 2B: CMS Feature icon grid */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Complete Control Over What Plays, Where, and When</h3>
                  <p className="text-gray-600 mb-8">Nine powerful capabilities that automate delivery, monitoring, and reporting at any scale.</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cmsFeatures.map((feat, i) => (
                      <motion.div key={feat.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }} viewport={{ once: true }}
                        className="flex gap-4 p-5 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all">
                        <div className="flex-shrink-0 w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center">
                          <feat.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm mb-1">{feat.title}</h4>
                          <p className="text-gray-600 text-xs leading-relaxed">{feat.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 2C: Revenue section */}
                <div className="bg-blue-900 text-white rounded-xl p-8 sm:p-10 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">Your Screens Are Your Revenue. Keep Every One of Them Working.</h3>
                  <p className="text-blue-200 mb-6 max-w-2xl">CMS is built to ensure your entire screen network stays active, compliant, and performing — at any scale.</p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {cmsBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm sm:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2D: Final CTA */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Run Smarter, Smoother Campaign Delivery</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Bring all screen operations into one system designed for control, continuity, and real-time execution.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors">
                      Get Started <ArrowRightIcon className="w-4 h-4" />
                    </CTAButton>
                    <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold text-sm hover:bg-blue-50 transition-colors">
                      Request a CMS Demo <ArrowRightIcon className="w-4 h-4" />
                    </CTAButton>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'sitebuilder' && (
              <motion.div key="sitebuilder" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>

                {/* 3A: Intro + Bullets + Comparison */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{sbTitle}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">{sbSubtitle}</p>
                  <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                    {sbBullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-6">
                    <div className="grid grid-cols-3">
                      <div className="bg-gray-100 px-4 py-3 text-center font-bold text-gray-500 text-xs sm:text-sm uppercase tracking-wide border-r border-gray-200">Before</div>
                      <div className="bg-blue-600 px-4 py-3 text-center font-bold text-white text-xs sm:text-sm uppercase tracking-wide border-r border-blue-500">After</div>
                      <div className="bg-blue-900 px-4 py-3 text-center font-bold text-white text-xs sm:text-sm uppercase tracking-wide">Impact</div>
                    </div>
                    {defaultSbRows.map((row, i) => (
                      <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="px-4 py-4 flex items-start gap-2 border-r border-gray-200">
                          <XCircleIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-xs sm:text-sm leading-relaxed">{row.before}</span>
                        </div>
                        <div className="px-4 py-4 flex items-start gap-2 border-r border-gray-200">
                          <CheckCircleIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800 text-xs sm:text-sm font-medium leading-relaxed">{row.after}</span>
                        </div>
                        <div className="px-4 py-4 flex items-center justify-center">
                          <span className="text-blue-900 text-xs sm:text-sm font-bold text-center">{row.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-3 text-sm text-blue-800 font-medium">
                    Average direct sales conversion improvement: <strong>45% within the first quarter post-launch</strong>
                  </div>
                </div>

                {/* 3B: Sitebuilder Feature icon grid */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">A Connected Business Platform — Not Just a Website</h3>
                  <p className="text-gray-600 mb-8">Eight capabilities that power a professional, always-on OOH commercial platform.</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {sbFeatures.map((feat, i) => (
                      <motion.div key={feat.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }} viewport={{ once: true }}
                        className="p-5 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                          <feat.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm mb-2">{feat.title}</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{feat.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 3C: Flow section */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">You Build the Platform. Your Advertisers Run Their Campaigns on It.</h3>
                  <p className="text-gray-600 mb-8 max-w-3xl">Sitebuilder has two layers — what you do as the media owner, and what your advertisers experience on the published platform.</p>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                        <SettingsIcon className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700 font-semibold text-sm">What You Do in Sitebuilder</span>
                      </div>
                      <div className="space-y-4">
                        {sbSteps.map((s, i) => (
                          <motion.div key={s.step} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: i * 0.08 }} viewport={{ once: true }}
                            className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{s.step}</span>
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{s.title}</p>
                              <p className="text-gray-500 text-xs">{s.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full mb-6">
                        <StoreIcon className="w-4 h-4 text-white" />
                        <span className="text-white font-semibold text-sm">What Your Advertisers Get</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-5 leading-relaxed">Once published, your Sitebuilder platform becomes your advertisers&apos; dedicated self-serve environment:</p>
                      <ul className="space-y-4">
                        {sbAdvertiserSteps.map((step, i) => (
                          <motion.li key={i} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: i * 0.08 }} viewport={{ once: true }}
                            className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-white text-xs font-bold">{i + 1}</span>
                            </div>
                            <span className="text-gray-700 text-sm">{step}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 3D: Front door */}
                <div className="bg-blue-900 text-white rounded-xl p-8 sm:p-10 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">Your Backend Is Built. Now Give It a Front Door.</h3>
                  <p className="text-blue-200 mb-6 max-w-2xl">Sitebuilder adds a structured, advertiser-facing commercial layer on top of your existing infrastructure — without requiring any replacements.</p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {sbBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm sm:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3E: Final CTA */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Launch Your Own OOH Storefront Interface</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Create a branded, always-on buying experience that drives discovery, demand, and direct advertiser engagement.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors">
                      Get Started <ArrowRightIcon className="w-4 h-4" />
                    </CTAButton>
                    <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold text-sm hover:bg-blue-50 transition-colors">
                      Request a Sitebuilder Demo <ArrowRightIcon className="w-4 h-4" />
                    </CTAButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── SECTION 4: OPERATIONAL IN DAYS ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">{section4Title}</h2>
            <div className="space-y-3 mb-10 text-left max-w-lg mx-auto">
              {[
                'Every Studio module is designed for rapid activation.',
                'No long implementation cycles.',
                'No heavy technical lift.',
              ].map((line, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-base">{line}</span>
                </div>
              ))}
            </div>
            <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-md font-bold text-base hover:bg-blue-700 transition-colors shadow-lg">
              Get Started <ArrowRightIcon className="w-5 h-5" />
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className={`relative bg-gradient-to-br ${heroGradient} text-white py-16 sm:py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{finalCtaTitle}</h2>
            <p className="text-lg sm:text-xl text-blue-200 mb-8 max-w-2xl mx-auto">{finalCtaSubtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-md font-bold text-base hover:bg-blue-50 transition-colors shadow-xl">
                Get Started <ArrowRightIcon className="w-5 h-5" />
              </CTAButton>
              <CTAButton href={product?.ctaLink || '/contact'} className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-md font-semibold text-base hover:bg-white/20 transition-colors">
                Request a Demo
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <CaseStudiesSection initialCaseStudies={caseStudies} />
    </div>
  )
}
