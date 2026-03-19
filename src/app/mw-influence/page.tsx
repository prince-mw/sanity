'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// Icons
const ClipboardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
  </svg>
)

const PuzzleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
  </svg>
)

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const TagIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
)

const MergeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
)

const BuildingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
)

const ImageIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
)

const CalculatorIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
  </svg>
)

const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
)

const UserShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
)

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
)

const GearIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)

const ServerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
  </svg>
)

const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
)

const HeadsetIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
)

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const TrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
)

// FAQ Accordion Component
function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left hover:text-blue-600 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-900 pr-8">{question}</span>
        <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-gray-600 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  )
}

// Integration partners for Don't Replace. Integrate. section
const integrations = [
  { name: 'VIOOH', category: 'SSP', logo: '/assets/images/integrations/viooh.svg' },
  { name: 'DV360', category: 'SSP', logo: '/assets/images/integrations/dv360.svg' },
  { name: 'Magnite', category: 'SSP', logo: '/assets/images/integrations/magnite.svg' },
  { name: 'Google Ad Manager 360', category: 'SSP', logo: '/assets/images/integrations/google-ad-manager-360.svg' },
  { name: 'The Trade Desk', category: 'DSP', logo: '/assets/images/integrations/the-trade-desk.svg' },
  { name: 'Cassie', category: 'DSP', logo: '/assets/images/integrations/cassie.svg' },
  { name: 'MAX', category: 'DSP', logo: '/assets/images/integrations/max.svg' },
  { name: 'StackAdapt', category: 'DSP', logo: '/assets/images/integrations/stackadapt.svg' },
  { name: 'Amobee', category: 'DSP', logo: '/assets/images/integrations/amobee.svg' },
  { name: 'AppNexus', category: 'DSP', logo: '/assets/images/integrations/appnexus.svg' },
  { name: 'MediaMath', category: 'DSP', logo: '/assets/images/integrations/mediamath.svg' },
  { name: 'Verizon Media', category: 'DSP', logo: '/assets/images/integrations/verizon.svg' },
  { name: 'Mediasmart', category: 'DSP', logo: '/assets/images/integrations/mediasmart.svg' },
]

export default function MWInfluencePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const problems = [
    {
      icon: <ClipboardIcon className="w-8 h-8" />,
      title: "Manual Inefficiency",
      problem: "Still creating playlists in spreadsheets? Manual scheduling wastes hours and leaves money on the table.",
      solution: "MW Influence automates spot-based scheduling with precision, eliminating manual playlist creation entirely."
    },
    {
      icon: <PuzzleIcon className="w-8 h-8" />,
      title: "Fragmented Demand",
      problem: "Running separate systems for direct IO and programmatic deals creates revenue cannibalization and missed opportunities.",
      solution: "Our unified decision engine evaluates all demand sources fairly in real-time, maximizing yield from every spot."
    },
    {
      icon: <EyeIcon className="w-8 h-8" />,
      title: "Lack of Trust",
      problem: "Advertisers question estimated screenshots. You need auditable proof that ads actually ran.",
      solution: "Event-level proof-of-play provides immutable, timestamped logs for every ad impression."
    },
    {
      icon: <TagIcon className="w-8 h-8" />,
      title: "Pricing Rigidity",
      problem: "Fixed rate cards can't adapt to demand shifts, leaving revenue on the table during peak periods.",
      solution: "Dynamic rule-based pricing adjusts rates based on daypart, channel, and demand signals automatically."
    }
  ]

  const features = [
    {
      icon: <MergeIcon className="w-8 h-8" />,
      title: "Unified Ad Serving",
      description: "Real-time decision engine evaluates Direct IO and Programmatic demand together. No more waterfalls or cannibalization—just fair competition for every spot based on your rules."
    },
    {
      icon: <BuildingIcon className="w-8 h-8" />,
      title: "Advanced Inventory Module",
      description: "Manage complex screen setups including multi-panel displays, dynamic networks, and custom packages. Support for Digital, Static, and Transit inventory in one system."
    },
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Creative Hub",
      description: "Multi-tier approval workflows keep landlords and compliance teams happy. Auto-transcoding ensures creatives meet technical specs for every screen format."
    },
    {
      icon: <CalculatorIcon className="w-8 h-8" />,
      title: "Dynamic Pricing Engine",
      description: "Rule-based pricing adapts to daypart, channel, and demand signals. Set margins, fees, and custom pricing logic without touching code."
    },
    {
      icon: <BoltIcon className="w-8 h-8" />,
      title: "Sub-100ms Decision Engine",
      description: "Real-time ad selection evaluates eligibility, constraints, and yield in under 100 milliseconds. Guaranteed delivery meets pacing goals automatically."
    },
    {
      icon: <PuzzleIcon className="w-8 h-8" />,
      title: "Composable Architecture",
      description: "API-first design means you can use our ad server without replacing your existing CMS, billing system, or planning tools. Integrate what you need, when you need it."
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Immutable Proof of Play",
      description: "Event-level logs create an auditable trail for every impression. Timestamps, screen location, and play confirmation stored permanently for reconciliation and compliance."
    },
    {
      icon: <UserShieldIcon className="w-8 h-8" />,
      title: "Enterprise User Management",
      description: "Role-based access control (RBAC) and single sign-on (SSO) give teams secure, appropriate access. API keys for external integrations keep systems connected safely."
    }
  ]

  const workflow = [
    {
      step: 1,
      icon: <SearchIcon className="w-6 h-6" />,
      title: "Planning & Discovery",
      description: "Sales planners use MW Planner to search inventory, check availability via the Booking Engine API, and generate proposals with accurate pricing from the Pricing Module."
    },
    {
      step: 2,
      icon: <CalendarIcon className="w-6 h-6" />,
      title: "Booking & Configuration",
      description: "When deals close, the Booking Engine creates hard reservations. AdOps specialists configure campaigns in MW Influence with delivery goals, pacing rules, and targeting parameters."
    },
    {
      step: 3,
      icon: <ImageIcon className="w-6 h-6" />,
      title: "Creative Management",
      description: "Upload creatives to the Creative Hub for auto-validation and transcoding. Multi-tier approval workflows ensure brand safety and landlord compliance before assets go live."
    },
    {
      step: 4,
      icon: <GearIcon className="w-6 h-6" />,
      title: "Real-Time Execution",
      description: "When screens request ads, the Decision Engine evaluates all eligible campaigns in under 100ms, selecting the best ad based on priority, pacing, and yield optimization rules."
    },
    {
      step: 5,
      icon: <ChartIcon className="w-6 h-6" />,
      title: "Measurement & Proof",
      description: "Every impression generates an immutable proof-of-play log sent to MW Measure. Compare planned vs actual delivery, reconcile invoices, and demonstrate ROI to advertisers."
    }
  ]

  const personas = [
    {
      icon: <HeadsetIcon className="w-10 h-10" />,
      title: "AdOps Specialists",
      role: "Traffic & Delivery Management",
      description: "Configure campaigns, manage creative workflows, monitor delivery pacing, and troubleshoot ad serving issues through the intuitive dashboard."
    },
    {
      icon: <ChartIcon className="w-10 h-10" />,
      title: "Sales Planners",
      role: "Availability & Proposals",
      description: "Check real-time inventory availability, generate accurate pricing quotes, and hand off confirmed deals seamlessly to AdOps for execution."
    },
    {
      icon: <CalculatorIcon className="w-10 h-10" />,
      title: "Revenue Managers",
      role: "Yield & Pricing Optimization",
      description: "Configure dynamic pricing rules, monitor yield performance across direct and programmatic channels, and optimize inventory packaging strategies."
    }
  ]

  const faqs = [
    {
      question: "What is a DOOH ad server?",
      answer: "A DOOH (Digital Out-of-Home) ad server is a technology platform that manages, delivers, and optimizes advertising campaigns across digital out-of-home screens such as billboards, transit displays, and retail networks. MW Influence goes beyond basic ad serving to provide unified yield optimization, composable architecture, and enterprise-grade inventory management."
    },
    {
      question: "How does MW Influence integrate with my existing CMS?",
      answer: "MW Influence is built API-first with composable architecture. Our Decision Engine integrates with third-party CMS players via RESTful APIs, allowing you to keep your existing content management system while adding intelligent ad serving and yield optimization capabilities."
    },
    {
      question: "Can MW Influence handle both direct and programmatic campaigns?",
      answer: "Yes. Unlike legacy systems that separate direct IO and programmatic into different waterfalls, MW Influence uses a unified decision engine that evaluates all demand sources fairly in real-time, maximizing revenue from every available spot."
    },
    {
      question: "What makes MW Influence different from Broadsign or Vistar?",
      answer: "MW Influence is built for media owners, not advertisers. Unlike Broadsign's monolithic loop-based system or Vistar's demand-side black box, we provide transparent, composable technology that optimizes for your yield. You maintain full control over pricing, decisioning logic, and inventory management."
    },
    {
      question: "How long does implementation take?",
      answer: "Implementation timelines vary based on network complexity, but our API-first architecture and bulk CSV/JSON import capabilities enable faster onboarding than legacy systems. Many enterprise deployments are live within weeks, not months."
    },
    {
      question: "What size networks does MW Influence support?",
      answer: "MW Influence is built for enterprise scale, supporting networks from hundreds to thousands of screens across global markets. Our horizontal scaling architecture grows with your network size."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                The DOOH Ad Server Built for Revenue, Not Just Reliability
              </h1>
              <h2 className="text-xl md:text-2xl text-blue-200 mb-6 font-light">
                Future-Proof Your Network with Composable, API-First Ad Technology
              </h2>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Stop settling for loop-based scheduling and estimated delivery. MW Influence is the intelligent control plane that unifies your inventory management, campaign execution, and yield optimization into one revenue-maximizing engine.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Built for large enterprise DOOH media owners, MW Influence gives you spot-level precision, transparent decisioning, and the flexibility to integrate with your existing tech stack—without ripping everything out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Request a Demo
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Architecture Diagram Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                <div className="text-center text-white/60 mb-6 text-sm font-medium">MW Influence Architecture</div>
                <div className="space-y-4">
                  <div className="flex justify-center gap-4">
                    <div className="px-4 py-2 bg-blue-500/20 rounded-lg text-blue-300 text-sm">MW Planner</div>
                    <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-300 text-sm">MW Studio</div>
                    <div className="px-4 py-2 bg-green-500/20 rounded-lg text-green-300 text-sm">MW Measure</div>
                  </div>
                  <div className="flex justify-center">
                    <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-center">
                    <div className="text-white font-bold text-lg mb-2">MW Influence</div>
                    <div className="text-white/80 text-sm">DOOH Ad Server</div>
                  </div>
                  <div className="flex justify-center">
                    <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs text-center">Inventory</div>
                    <div className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs text-center">Booking</div>
                    <div className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs text-center">Creative</div>
                    <div className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs text-center">Pricing</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Challenges Holding Your Network Back
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Traditional ad serving approaches weren't built for today's programmatic landscape. Media owners face mounting pressure to increase revenue while dealing with outdated, rigid systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {problems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-red-50 rounded-xl text-red-600">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 pt-2">{item.title}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-sm mt-0.5">PROBLEM:</span>
                    <p className="text-gray-600">{item.problem}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-sm mt-0.5">SOLUTION:</span>
                    <p className="text-gray-700">{item.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MW Influence Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Leading Media Owners Choose MW Influence Over Legacy Solutions
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              The DOOH ad server market is crowded with old technology and demand-side platforms that prioritize buyers over you. MW Influence is different.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Beyond Loops",
                challenge: "Legacy ad servers were built to play files in a loop.",
                mwInfluence: "We maximize the revenue of every spot with intelligent, real-time decisioning.",
                differentiator: "API-first composable architecture means you can integrate without replacing your entire stack."
              },
              {
                title: "Transparent Control",
                challenge: "Traditional platforms use black-box algorithms that prioritize their demand over yours.",
                mwInfluence: "Glass-box transparency. You see exactly why every ad decision was made and control the yield optimization rules.",
                differentiator: "Built for media owners, not advertisers. Your revenue, your rules."
              },
              {
                title: "Enterprise Platform",
                challenge: "Most programmatic layers offer just one feature in your stack.",
                mwInfluence: "Complete operating system for DOOH inventory management, campaign execution, and yield optimization.",
                differentiator: "Manage digital, static, and transit networks from one unified control plane."
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6">{card.title}</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-amber-400 text-sm font-medium">Industry Challenge:</span>
                    <p className="text-gray-400 mt-1">{card.challenge}</p>
                  </div>
                  <div>
                    <span className="text-green-400 text-sm font-medium">MW Influence:</span>
                    <p className="text-gray-200 mt-1">{card.mwInfluence}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <span className="text-blue-400 text-sm font-medium">Key Differentiator:</span>
                  <p className="text-gray-300 mt-1">{card.differentiator}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Complete Ad Serving Platform for Modern Media Owners
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-blue-50 hover:shadow-lg transition-all group"
              >
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600 w-fit mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="workflow" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              From Planning to Proof: The MW Influence Workflow
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              MW Influence acts as the intelligent control plane that connects planning, execution, and measurement into one seamless operation.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-blue-200" />
            
            <div className="grid md:grid-cols-5 gap-8">
              {workflow.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 w-fit mx-auto mb-3">
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Composable Architecture Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built for Integration, Not Isolation
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Unlike monolithic legacy systems, MW Influence is built on composable principles. Our horizontal modules function as independent services accessible via RESTful APIs.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">What This Means for You:</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "No Rip-and-Replace Required: Keep your existing CMS, billing system, or planning tools. MW Influence integrates via API.",
                  "Use What You Need: Start with just the Decision Engine, or deploy the full stack including Inventory, Booking, Creative, and Pricing modules.",
                  "Scale Independently: Add capacity to high-demand services without over-provisioning the entire system.",
                  "Future-Proof Technology: Modern cloud-first architecture with horizontal scaling ensures your investment grows with your network."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Technical Highlights:</h3>
              <div className="flex flex-wrap gap-2">
                {["RESTful API Gateway", "Microservices architecture", "1000s of screens support", "OAuth 2.0 / SAML SSO"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8"
            >
              <div className="text-center text-gray-500 text-sm font-medium mb-6">MW Influence Composable Product Stack</div>
              <div className="space-y-4">
                <div className="text-center text-xs text-gray-500 mb-2">API Gateway</div>
                <div className="h-1 bg-blue-200 rounded" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <div className="text-blue-700 font-semibold text-sm">Planner</div>
                  </div>
                  <div className="bg-indigo-100 rounded-lg p-4 text-center">
                    <div className="text-indigo-700 font-semibold text-sm">Ad Server</div>
                  </div>
                  <div className="bg-purple-100 rounded-lg p-4 text-center">
                    <div className="text-purple-700 font-semibold text-sm">Studio</div>
                  </div>
                  <div className="bg-green-100 rounded-lg p-4 text-center">
                    <div className="text-green-700 font-semibold text-sm">Measure</div>
                  </div>
                </div>
                <div className="h-1 bg-gray-200 rounded" />
                <div className="text-center text-xs text-gray-500 mb-2">Core Services</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-gray-100 rounded-lg p-3 text-center">
                    <div className="text-gray-600 text-xs">User Mgmt</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-center">
                    <div className="text-gray-600 text-xs">Inventory</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-center">
                    <div className="text-gray-600 text-xs">Booking</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-center">
                    <div className="text-gray-600 text-xs">Data Layer</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Seamlessly Connects Your Entire Tech Stack
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ServerIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Moving Walls Ecosystem</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { name: "MW Planner", desc: "Campaign forecasting and inventory selection" },
                  { name: "MW Studio", desc: "CMS and device management for media owners" },
                  { name: "MW Measure", desc: "Reporting, analytics, and campaign intelligence" },
                  { name: "MW Activate (DSP)", desc: "Programmatic demand activation" }
                ].map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">{item.name}:</span>
                      <span className="text-gray-600 ml-1">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <CodeIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Third-Party Systems</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { name: "SSPs/DSPs", desc: "Vistar, Place Exchange, Magnite, VIOOH via RTB protocols" },
                  { name: "CMS Players", desc: "Broadsign, third-party content management systems" },
                  { name: "Data Providers", desc: "Audience data (Quadrant), traffic data (Google Maps)" },
                  { name: "ERP/Billing", desc: "Financial system integrations for invoicing and reconciliation" }
                ].map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">{item.name}:</span>
                      <span className="text-gray-600 ml-1">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Leading DOOH Media Owners Worldwide
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              From transit networks to retail malls and large-format roadside networks, enterprise media owners choose MW Influence to automate operations and maximize revenue.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <TrainIcon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Media Owner Transformation: From Manual Operations to Automated Yield Management
              </h3>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed">
              One of the world's largest metro rail media operators moved from spreadsheet-based scheduling to spot-level automation with MW Influence. The result: streamlined operations, reduced manual errors, and intelligent yield optimization across thousands of digital screens.
            </p>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Network Size", value: "Large-scale transit network" },
                { label: "Challenge", value: "Manual playlist creation, static pricing" },
                { label: "Solution", value: "MW Influence unified ad serving" },
                { label: "Outcome", value: "Operational efficiency, maximized yield" }
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                  <div className="text-white font-semibold">{stat.value}</div>
                </div>
              ))}
            </div>
            <blockquote className="border-l-4 border-blue-500 pl-6 py-2">
              <p className="text-xl text-gray-200 italic mb-4">
                "MW Influence transformed how we manage our network. The composable architecture let us integrate without disrupting operations, and the unified decision engine ensures we're maximizing revenue from every spot."
              </p>
              <cite className="text-gray-400">— Head of OOH, Enterprise DOOH Media Owner</cite>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Purpose-Built for Your Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {personas.map((persona, index) => (
              <motion.div
                key={persona.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-gray-50 rounded-2xl p-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl text-blue-600 mb-6">
                  {persona.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{persona.title}</h3>
                <div className="text-blue-600 font-medium text-sm mb-4">{persona.role}</div>
                <p className="text-gray-600">{persona.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Technology
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <ServerIcon className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Platform Capabilities</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Cloud-first architecture with 99.9% uptime SLA",
                  "Horizontal scaling to support networks of any size",
                  "Sub-100ms ad decisioning latency",
                  "Role-based access control (RBAC) with SSO support",
                  "Comprehensive API documentation and SDKs",
                  "Multi-tenant architecture with data isolation",
                  "Real-time monitoring and alerting"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <CodeIcon className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Standards & Protocols</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Ad Formats", value: "Display, Video, HTML5, VAST/VPAID" },
                  { label: "Protocols", value: "OpenRTB 2.5+, VAST 3.0+" },
                  { label: "APIs", value: "RESTful JSON APIs, Webhooks" },
                  { label: "Authentication", value: "OAuth 2.0, SAML 2.0, API Keys" },
                  { label: "Data", value: "CSV/JSON bulk import, Real-time streaming" },
                  { label: "Reporting", value: "CSV, Excel, PDF export" }
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-gray-500 font-medium min-w-[100px]">{item.label}:</span>
                    <span className="text-gray-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section - Don't Replace. Integrate. */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                <span className="text-blue-600 font-medium text-sm">13+ Integrations</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Don&apos;t Replace.
                <span className="block text-blue-600">Integrate.</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                MW Influence connects seamlessly with your existing ad tech ecosystem. No rip-and-replace—just instant network value from day one.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {['SSP Partners', 'DSP Partners', 'Programmatic', 'Real-Time Bidding'].map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{category}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center group cursor-pointer"
                  >
                    <div className="w-36 h-28 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                      <Image src={integration.logo} alt={integration.name} width={180} height={72} className="object-contain w-full h-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Network?
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Join the leading DOOH media owners who have moved beyond legacy loop-based systems to intelligent, revenue-optimizing ad serving.
            </p>
            <p className="text-gray-300 mb-8">
              Schedule a demo to see how MW Influence can unify your direct and programmatic demand, automate operations, and maximize yield across your entire network.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                "Composable, API-first architecture",
                "Unified direct and programmatic decisioning",
                "Sub-100ms real-time ad selection",
                "Transparent proof-of-play",
                "Dynamic pricing and yield optimization"
              ].map((benefit) => (
                <span key={benefit} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
                  <CheckIcon className="w-4 h-4 text-green-400" />
                  {benefit}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Schedule Your Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20"
              >
                Contact Sales
              </Link>
            </div>

            <p className="text-gray-400 text-sm">
              Prefer to talk to an expert first? Contact our team at{' '}
              <a href="mailto:sales@movingwalls.com" className="text-blue-400 hover:underline">
                sales@movingwalls.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About MW Influence
            </h2>
          </motion.div>

          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
