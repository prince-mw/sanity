'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { CTAButton } from "@/components/CTAButton"
import CaseStudiesSection from "@/components/CaseStudiesSection"
import type { SanityProduct } from "@/sanity/lib/fetch"

interface MWActivateClientProps {
  caseStudies?: any[]
  product?: SanityProduct | null
}

// Custom SVG icons with sci-fi styling
const TerminalIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
)

const CpuChipIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a3 3 0 003-3V7.5a3 3 0 00-3-3H6.75a3 3 0 00-3 3v9a3 3 0 003 3z" />
  </svg>
)

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
)

const ServerStackIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
  </svg>
)

const ChartBarSquareIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </svg>
)

const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

// Integration logos for Don't Replace. Integrate. section
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

export default function MWActivate({ caseStudies = [], product }: MWActivateClientProps) {
  const [activeMode, setActiveMode] = useState<'owners' | 'buyers'>('owners')
  const [systemStatus] = useState({
    online: true,
    activeConnections: 1247,
    dataProcessed: '2.4TB',
    uptime: '99.97%'
  })

  // CMS-driven hero content with fallbacks
  const heroTitle = product?.heroTitle || 'MW Activate'
  const heroSubtitle = product?.heroSubtitle || 'A Complete Demand-Side Platform for DOOH and In-Store Retail Media Advertising'
  const heroDescription = product?.description || 'Launch and optimize campaigns instantly with AI-powered automation that delivers'
  const ctaText = product?.ctaText || 'Book Demo'
  const ctaLink = product?.ctaLink || '/contact'

  const ownersFeatures = [
    {
      icon: ServerStackIcon,
      title: "Inventory Management System",
      description: "Manage your entire OOH network with real-time availability, pricing, and performance tracking.",
      metrics: { locations: "847", fill: "92%", revenue: "$2.4M" }
    },
    {
      icon: CpuChipIcon,
      title: "Yield Optimization Engine",
      description: "AI-powered dynamic pricing that maximizes revenue across all inventory slots automatically.",
      metrics: { yield: "+34%", efficiency: "97%", saved: "$847K" }
    },
    {
      icon: ChartBarSquareIcon,
      title: "Analytics Command Center",
      description: "Deep insights into network performance, audience reach, and revenue optimization opportunities.",
      metrics: { impressions: "12.4M", reach: "3.2M", growth: "+28%" }
    },
    {
      icon: BoltIcon,
      title: "Automated Booking Portal",
      description: "Instant booking system with real-time availability, automated contracts, and payment processing.",
      metrics: { bookings: "247", speed: "<2min", satisfaction: "4.9/5" }
    }
  ]

  const buyersFeatures = [
    {
      icon: RocketIcon,
      title: "Campaign Launch System",
      description: "Deploy OOH campaigns across multiple locations instantly with one-click activation and optimization.",
      metrics: { speed: "95% faster", success: "98%", campaigns: "1.2K" }
    },
    {
      icon: TerminalIcon,
      title: "Audience Targeting AI",
      description: "Advanced targeting based on location data, demographics, traffic patterns, and behavioral insights.",
      metrics: { precision: "94%", reach: "3.2M", conversion: "+31%" }
    },
    {
      icon: ChartBarSquareIcon,
      title: "Performance Predictor",
      description: "Predictive analytics showing expected reach, impressions, and ROI before campaign launch.",
      metrics: { accuracy: "91%", roi: "+167%", saved: "$240K" }
    },
    {
      icon: BoltIcon,
      title: "Instant Booking Hub",
      description: "Browse available inventory, compare locations, and book premium OOH spots in real-time.",
      metrics: { inventory: "8.4K", response: "<15ms", savings: "23%" }
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-mw-blue-600 text-white py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {heroTitle}
                <span className="block text-3xl md:text-4xl font-light mt-3 text-white/80">
                  {heroSubtitle}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-blue-100">
                {heroDescription}
                <span className="text-yellow-300 font-semibold"> +167% ROI improvement</span> while you sleep.
              </p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <CTAButton href={ctaLink} className="bg-white text-mw-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl inline-flex items-center gap-2">
                  {ctaText}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </CTAButton>
              </motion.div>
            </motion.div>

            {/* Right Side - Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Live Activity Feed */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white/90">Live Optimizations</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-300">Live</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { action: 'Bid adjusted', client: 'E-commerce', impact: '+24% conv.', time: '1m ago' },
                    { action: 'Budget shifted', client: 'Travel Brand', impact: '$8K optimized', time: '3m ago' },
                    { action: 'Creative rotated', client: 'Tech Startup', impact: '+31% CTR', time: '6m ago' }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-start justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{activity.action}</div>
                        <div className="text-xs text-white/70">{activity.client}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-300">{activity.impact}</div>
                        <div className="text-xs text-blue-300">{activity.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Intelligent Campaign Activation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From launch to optimization, MW Activate handles every aspect of campaign 
              management with AI-powered automation and real-time performance enhancement.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(activeMode === 'owners' ? ownersFeatures : buyersFeatures).map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-mw-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-mw-blue-600" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activation Features Section */}
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
              OOH {activeMode === 'owners' ? 'Media Owner' : 'Buyer'} Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeMode === 'owners' 
                ? 'Maximize revenue across your OOH network with intelligent inventory management and automated optimization.'
                : 'Launch and optimize OOH campaigns with real-time booking, audience targeting, and performance analytics.'}
            </p>
          </motion.div>

          {/* Mode Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-2 rounded-xl flex gap-2">
              <button
                onClick={() => setActiveMode('owners')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeMode === 'owners'
                    ? 'bg-mw-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Media Owners
              </button>
              <button
                onClick={() => setActiveMode('buyers')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeMode === 'buyers'
                    ? 'bg-mw-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Buyers & Agencies
              </button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {(activeMode === 'owners' ? ownersFeatures : buyersFeatures).map((feature, index) => {
                // First card is hero (spans 2 cols, 2 rows)
                const isHero = index === 0;
                // Cards 2 & 3 stack on the right
                const isRightStack = index === 1 || index === 2;
                // Card 4 spans full width at bottom
                const isFullWidth = index === 3;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`
                      relative overflow-hidden rounded-2xl border border-gray-200 transition-all hover:shadow-2xl hover:border-mw-blue-300
                      ${isHero ? 'md:col-span-2 md:row-span-2 bg-mw-blue-600 text-white p-8 min-h-[400px]' : ''}
                      ${isRightStack ? 'bg-white p-6 hover:scale-[1.02]' : ''}
                      ${isFullWidth ? 'md:col-span-3 bg-mw-blue-800 text-white p-8' : ''}
                    `}
                  >
                    {isHero ? (
                      // Hero Card Layout
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                            <feature.icon className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            {feature.title}
                          </h3>
                          <p className="text-lg text-white/80 mb-6 max-w-md">
                            {feature.description}
                          </p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          {Object.entries(feature.metrics).map(([key, value]) => (
                            <span key={key} className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                              {value}
                            </span>
                          ))}
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                      </div>
                    ) : isFullWidth ? (
                      // Full Width Bottom Card
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-16 h-16 bg-mw-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-xl font-bold mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                        <div className="flex gap-3 flex-wrap justify-center md:justify-end">
                          {Object.entries(feature.metrics).map(([key, value]) => (
                            <span key={key} className="bg-mw-blue-500/20 text-mw-blue-200 px-4 py-2 rounded-full text-sm font-semibold border border-mw-blue-500/30">
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Right Stack Cards
                      <div className="h-full flex flex-col">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-mw-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {feature.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 flex-1">
                          {feature.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {Object.entries(feature.metrics).map(([key, value]) => (
                            <span key={key} className="bg-mw-blue-50 text-mw-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-mw-blue-200">
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* System Status Dashboard - Split Panel with Circular Gauges */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Command Center Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor system health, active connections, and real-time processing 
              across the entire OOH marketplace network.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - Circular Gauges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-green-600 text-sm font-medium">ONLINE</span>
                </div>
              </div>

              {/* Server Rack Node Grid */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 text-xs uppercase tracking-wider font-medium">Infrastructure Nodes</span>
                  <span className="text-gray-500 text-xs">12 Active</span>
                </div>
                
                {/* Node Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {[
                    { id: 'N01', status: 'healthy', load: 78 },
                    { id: 'N02', status: 'healthy', load: 65 },
                    { id: 'N03', status: 'healthy', load: 82 },
                    { id: 'N04', status: 'healthy', load: 71 },
                    { id: 'N05', status: 'healthy', load: 88 },
                    { id: 'N06', status: 'healthy', load: 45 },
                    { id: 'N07', status: 'healthy', load: 67 },
                    { id: 'N08', status: 'healthy', load: 92 },
                    { id: 'N09', status: 'warning', load: 95 },
                    { id: 'N10', status: 'healthy', load: 58 },
                    { id: 'N11', status: 'healthy', load: 73 },
                    { id: 'N12', status: 'healthy', load: 61 },
                  ].map((node, index) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all shadow-sm ${
                        node.status === 'healthy' 
                          ? 'bg-white border-gray-200 hover:border-green-400 hover:shadow-md' 
                          : 'bg-yellow-50 border-yellow-300 hover:border-yellow-400 hover:shadow-md'
                      }`}>
                        {/* Status LED */}
                        <div className={`w-2.5 h-2.5 rounded-full mb-1 ${
                          node.status === 'healthy' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500 animate-pulse'
                        }`} />
                        <span className="text-gray-600 text-xs font-mono font-medium">{node.id}</span>
                      </div>
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 transition-opacity shadow-lg border border-gray-200">
                        <div className="font-semibold">{node.id}</div>
                        <div className="text-gray-500">Load: {node.load}%</div>
                        <div className={node.status === 'healthy' ? 'text-green-600' : 'text-yellow-600'}>
                          {node.status === 'healthy' ? '● Healthy' : '● High Load'}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Rack Status Bar */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-gray-600 text-xs">Healthy: 11</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-gray-600 text-xs">Warning: 1</span>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">Avg Load: 73%</span>
                </div>
              </div>

              {/* Quick Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-blue-50 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-blue-600">12.8K</div>
                  <div className="text-xs text-gray-600 mt-1">Connections</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-purple-50 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-purple-600">2.4TB</div>
                  <div className="text-xs text-gray-600 mt-1">Data Processed</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-green-50 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-green-600">99.97%</div>
                  <div className="text-xs text-gray-600 mt-1">Uptime</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Panel - Performance Heatmap */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Network Performance</h3>
                <span className="text-xs text-gray-400">Last 7 days</span>
              </div>

              {/* Heatmap Grid */}
              <div className="space-y-4">
                {[
                  { label: "Transaction Speed", value: "<15ms", cells: [95, 98, 92, 99, 97, 94, 98] },
                  { label: "System Reliability", value: "99.97%", cells: [99, 99, 98, 99, 99, 99, 99] },
                  { label: "Network Capacity", value: "8.4K/10K", cells: [72, 78, 85, 82, 88, 84, 84] },
                  { label: "Response Time", value: "12ms", cells: [88, 92, 95, 90, 96, 93, 95] }
                ].map((metric, rowIndex) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * rowIndex }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-32 flex-shrink-0">
                      <span className="text-sm font-medium text-gray-700 block truncate">{metric.label}</span>
                      <span className="text-xs text-gray-400">{metric.value}</span>
                    </div>
                    <div className="flex gap-1.5 flex-1">
                      {metric.cells.map((value, cellIndex) => {
                        const getHeatColor = (val: number) => {
                          if (val >= 95) return 'bg-green-500';
                          if (val >= 85) return 'bg-green-400';
                          if (val >= 75) return 'bg-yellow-400';
                          if (val >= 65) return 'bg-orange-400';
                          return 'bg-red-400';
                        };
                        return (
                          <motion.div
                            key={cellIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.05 * cellIndex + 0.1 * rowIndex,
                              type: "spring",
                              stiffness: 200
                            }}
                            viewport={{ once: true }}
                            className={`flex-1 h-10 rounded-md ${getHeatColor(value)} cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-gray-400 transition-all group relative`}
                          >
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 transition-opacity">
                              {value}%
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Day Labels */}
              <div className="flex items-center gap-4 mt-3">
                <div className="w-32 flex-shrink-0" />
                <div className="flex gap-1.5 flex-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="flex-1 text-center text-xs text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap Legend */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Performance:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded bg-red-400" />
                    <div className="w-4 h-4 rounded bg-orange-400" />
                    <div className="w-4 h-4 rounded bg-yellow-400" />
                    <div className="w-4 h-4 rounded bg-green-400" />
                    <div className="w-4 h-4 rounded bg-green-500" />
                  </div>
                  <span className="text-xs text-gray-400">Low → High</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-gray-500">Live</span>
                </div>
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
                MW Activate connects seamlessly with your existing ad tech stack. No rip-and-replace—just instant activation from day one.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {['Ad Servers', 'DSPs', 'SSPs', 'Analytics'].map((category) => (
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

      {/* Case Studies */}
      <CaseStudiesSection initialCaseStudies={caseStudies} />
    </div>
  )
}