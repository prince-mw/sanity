'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

// Custom SVG icons for No-Code Platform
const CubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
)

const WrenchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
  </svg>
)

const PuzzleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
  </svg>
)

const SquaresIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
)

const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

const CodeBracketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
)

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
)

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
)

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

export default function MWStudio() {
  const [activeMode, setActiveMode] = useState<'marketplace' | 'campaigns'>('marketplace')

  const marketplaceFeatures = [
    {
      icon: GlobeIcon,
      title: "Instant Site Launch",
      description: "Create and publish a full marketplace website without developers. Get online in minutes.",
      metric: "5 Minutes"
    },
    {
      icon: PuzzleIcon,
      title: "Customizable Themes",
      description: "Choose from 6 professional templates that match your brand - Elegant, Master, Creative & more.",
      metric: "6 Templates"
    },
    {
      icon: CubeIcon,
      title: "Inventory Integration",
      description: "Sync directly with your Reach dashboard and sell your OOH inventory in real-time.",
      metric: "Live Sync"
    },
    {
      icon: ChartBarIcon,
      title: "Analytics & Insights",
      description: "Track visitor activity, campaign interest, and performance metrics effortlessly.",
      metric: "Real-time"
    }
  ]

  const campaignFeatures = [
    {
      icon: SquaresIcon,
      title: "Visual Campaign Builder",
      description: "Design OOH content with drag-and-drop tools. No design skills required.",
      metric: "10x Faster"
    },
    {
      icon: WrenchIcon,
      title: "Smart Layouts",
      description: "Auto-adjust designs for any screen size - billboards, transit, digital displays.",
      metric: "Auto-resize"
    },
    {
      icon: BoltIcon,
      title: "One-Click Deploy",
      description: "Publish campaigns across your entire OOH network instantly.",
      metric: "< 2 minutes"
    },
    {
      icon: CodeBracketIcon,
      title: "Component Library",
      description: "200+ reusable design blocks for faster campaign creation.",
      metric: "200+ Assets"
    }
  ]

  const builderFeatures = [
    { name: "Visual Canvas", desc: "Design in real-time with live preview", icon: SquaresIcon },
    { name: "Smart Layouts", desc: "Auto-adjust for any screen size", icon: WrenchIcon },
    { name: "Asset Manager", desc: "Organize media files effortlessly", icon: CubeIcon },
    { name: "Version Control", desc: "Track changes and rollback anytime", icon: CodeBracketIcon }
  ]

  const marketplaceTemplates = [
    { type: "Elegant", description: "Premium layout for high-value inventory", color: "from-blue-500 to-cyan-500", badge: "" },
    { type: "Master", description: "Built for large-scale operations", color: "from-purple-500 to-pink-500", badge: "" },
    { type: "Creative", description: "Bold visuals and dynamic elements", color: "from-green-500 to-emerald-500", badge: "" },
    { type: "Promotional", description: "Perfect for deals and campaigns", color: "from-orange-500 to-red-500", badge: "" },
    { type: "Minimalist", description: "Sleek, distraction-free layout", color: "from-indigo-500 to-blue-500", badge: "" },
    { type: "Basic", description: "Clean template for quick launch", color: "from-gray-500 to-slate-500", badge: "" }
  ]

  const marketplaceSteps = [
    {
      step: "01",
      title: "Register & Login",
      desc: "Sign up and access your LMX dashboard"
    },
    {
      step: "02",
      title: "Launch Site Builder",
      desc: "Open the Site Builder tool from your menu"
    },
    {
      step: "03",
      title: "Choose Your Theme",
      desc: "Select from 6 professional templates"
    },
    {
      step: "04",
      title: "Configure Your Site",
      desc: "Add logo, banners, and link inventory"
    },
    {
      step: "05",
      title: "Publish & Go Live",
      desc: "Preview and publish your marketplace"
    }
  ]

  const campaignSteps = [
    {
      step: "01",
      title: "Choose Template",
      desc: "Select campaign design template"
    },
    {
      step: "02",
      title: "Customize Design",
      desc: "Drag, drop, and edit visually"
    },
    {
      step: "03",
      title: "Preview & Test",
      desc: "See live preview across formats"
    },
    {
      step: "04",
      title: "Deploy Network",
      desc: "Publish to all locations instantly"
    }
  ]

  const liveActivity = [
    { action: "Campaign Created", user: "Sarah M.", asset: "Downtown Billboard", time: "2m ago", type: "success" },
    { action: "Template Published", user: "Mike T.", asset: "Transit Series", time: "5m ago", type: "info" },
    { action: "Design Approved", user: "Lisa K.", asset: "Mall Display", time: "8m ago", type: "success" },
    { action: "Asset Uploaded", user: "John D.", asset: "Video Content", time: "12m ago", type: "info" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Merged Marketplace & Campaign Builder */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-500/20 p-2 rounded-lg border border-cyan-400/30">
                  <CodeBracketIcon className="w-6 h-6 text-cyan-300" />
                </div>
                <span className="text-cyan-300 font-semibold">All-in-One No-Code Platform</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                MW Studio
                <span className="block text-3xl md:text-4xl font-light mt-3 text-blue-200">
                  Build Marketplaces & Create Campaigns
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-blue-100">
                Launch your OOH marketplace website and design stunning campaigns - all in one platform.
                <span className="text-cyan-300 font-semibold"> No code, no delays, no limits</span>.
              </p>

              {/* Dual Value Props */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                >
                  <GlobeIcon className="w-8 h-8 text-cyan-300 mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">Marketplace Builder</div>
                  <div className="text-xs text-blue-200">Launch in 5 minutes</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                >
                  <SquaresIcon className="w-8 h-8 text-cyan-300 mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">Campaign Creator</div>
                  <div className="text-xs text-blue-200">Design in 8 minutes</div>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-4"
              >
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-blue-400 transition-all shadow-2xl hover:shadow-cyan-500/50 inline-flex items-center gap-2">
                  Get Started Free
                  <BoltIcon className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Side - Platform Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Platform Stats */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Platform Capabilities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '6', label: 'Templates', color: 'text-cyan-300', icon: PuzzleIcon },
                    { value: '5 min', label: 'Setup Time', color: 'text-green-300', icon: BoltIcon },
                    { value: 'Live', label: 'Inventory Sync', color: 'text-purple-300', icon: CubeIcon },
                    { value: '200+', label: 'Components', color: 'text-blue-300', icon: SquaresIcon }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-300" />
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-blue-200">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Marketplace Sites', value: '847', icon: GlobeIcon },
                  { label: 'Campaigns Live', value: '2,341', icon: ChartBarIcon }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                  >
                    <stat.icon className="w-6 h-6 text-cyan-300 mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dual Mode Selector Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              One Platform, Two Powerful Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Build your OOH marketplace website to sell inventory, and create stunning campaigns to display on your network.
            </p>
            
            {/* Mode Toggle */}
            <div className="flex justify-center">
              <div className="bg-gray-100 p-2 rounded-xl inline-flex gap-2">
                <button
                  onClick={() => setActiveMode('marketplace')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    activeMode === 'marketplace'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GlobeIcon className="w-5 h-5" />
                    Marketplace Builder
                  </div>
                </button>
                <button
                  onClick={() => setActiveMode('campaigns')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    activeMode === 'campaigns'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <SquaresIcon className="w-5 h-5" />
                    Campaign Creator
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {activeMode === 'marketplace' ? 'Launch Your OOH Marketplace' : 'Create Stunning Campaigns'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeMode === 'marketplace' 
                ? 'Everything you need to build and launch a professional marketplace website for your OOH inventory.'
                : 'Design professional OOH campaigns with drag-and-drop tools. No design skills required.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(activeMode === 'marketplace' ? marketplaceFeatures : campaignFeatures).map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <div className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                  {feature.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Library Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {activeMode === 'marketplace' ? 'Choose Your Marketplace Theme' : 'Campaign Design Templates'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeMode === 'marketplace'
                ? 'Select from professionally designed templates that match your brand and business goals.'
                : 'Start with ready-made templates for billboards, transit, and digital displays.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceTemplates.map((template, index) => (
              <motion.div
                key={template.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative p-8 text-white h-64 flex flex-col justify-between">
                  <div>
                    {template.badge && (
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block">
                        {template.badge}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{template.type}</h3>
                    <p className="text-sm text-white/90">{template.description}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-3">
                      <span className="text-sm font-semibold flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                        Preview
                      </span>
                      <span className="text-sm font-semibold flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg">
                        Use Template
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Builder Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Intuitive Visual Builder
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Design OOH campaigns with drag-and-drop simplicity. Real-time preview, 
                smart components, and automated formatting built-in.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {builderFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{feature.name}</h4>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-50 to-blue-100 p-8 rounded-2xl"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Platform Metrics</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Campaign Build Time</span>
                    <span className="text-2xl font-bold text-cyan-600">&lt; 10 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Templates Available</span>
                    <span className="text-2xl font-bold text-blue-600">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Component Library</span>
                    <span className="text-2xl font-bold text-indigo-600">200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Deployment Speed</span>
                    <span className="text-2xl font-bold text-green-600">Instant</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {activeMode === 'marketplace' ? 'Get Started in 5 Simple Steps' : 'Launch Campaigns in Under 10 Minutes'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeMode === 'marketplace'
                ? 'Our streamlined process gets your digital marketplace up and running in no time.'
                : 'From template to live campaign in 4 simple steps. No designers, no developers, no delays.'}
            </p>
          </motion.div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hidden lg:block" style={{ top: '32px' }}></div>
            
            <div className={`grid md:grid-cols-2 gap-8 relative ${
              activeMode === 'marketplace' ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
            }`}>
              {(activeMode === 'marketplace' ? marketplaceSteps : campaignSteps).map((workflow, index) => (
                <motion.div
                  key={workflow.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg relative z-10">
                    {workflow.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {workflow.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    {workflow.desc}
                  </p>
                </motion.div>
              ))}
            </div>
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
                MW Studio connects seamlessly with your existing creative tools. No rip-and-replace—just instant creative production from day one.
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Building OOH Campaigns Today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join 1,200+ media owners using MW Studio to create professional 
              OOH campaigns without designers or developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl inline-flex items-center justify-center gap-2"
              >
                Start Free Trial
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-cyan-600 transition-colors"
              >
                Browse Templates
              </motion.button>
            </div>
            <p className="text-sm text-cyan-100 mt-6">✓ 500+ templates  ✓ Drag & drop builder  ✓ One-click deploy</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}