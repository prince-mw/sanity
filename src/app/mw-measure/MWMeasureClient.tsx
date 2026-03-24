'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Image from 'next/image'
import { CTAButton } from "@/components/CTAButton"
import CaseStudiesSection from "@/components/CaseStudiesSection"
import type { SanityProduct } from "@/sanity/lib/fetch"

interface MWMeasureClientProps {
  caseStudies?: any[]
  product?: SanityProduct | null
}

// Custom SVG icons
const MapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
)

const LocationIcon = ({ className }: { className?: string }) => (
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

const TruckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
)

const BuildingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
)

const DevicePhoneMobileIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
)

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

export default function MWMeasure({ caseStudies = [], product }: MWMeasureClientProps) {
  const [selectedLocation, setSelectedLocation] = useState('downtown')
  const [hoveredFormat, setHoveredFormat] = useState<string | null>(null)
  const [animatedMetrics, setAnimatedMetrics] = useState<{[key: string]: number}>({})

  // CMS-driven hero content with fallbacks
  const heroTitle = product?.heroTitle || 'MW Measure'
  const heroSubtitle = product?.heroSubtitle || 'OOH Analytics Dashboard'
  const heroDescription = product?.description || 'Transform Out-of-Home advertising with real-time location intelligence,'

  const locations = [
    { 
      id: 'downtown',
      name: 'Downtown Billboard', 
      type: 'Billboard',
      impressions: '2.4M',
      reach: '847K',
      frequency: 2.8,
      cost: '$12,500',
      cpm: '$5.21',
      traffic: 'High',
      demographics: '25-44, Urban Professionals',
      peakHours: '7-9 AM, 5-7 PM'
    },
    { 
      id: 'transit',
      name: 'Metro Transit', 
      type: 'Transit',
      impressions: '3.1M',
      reach: '1.2M',
      frequency: 2.6,
      cost: '$18,000',
      cpm: '$5.81',
      traffic: 'Very High',
      demographics: '18-54, Commuters',
      peakHours: '6-10 AM, 4-8 PM'
    },
    { 
      id: 'mall',
      name: 'Shopping District', 
      type: 'Digital',
      impressions: '1.8M',
      reach: '624K',
      frequency: 2.9,
      cost: '$9,200',
      cpm: '$5.11',
      traffic: 'Medium-High',
      demographics: '25-54, High Income',
      peakHours: '11 AM-8 PM'
    }
  ]

  const oohMetrics = [
    {
      icon: MapIcon,
      title: "Location Intelligence",
      description: "Advanced geospatial analytics with traffic patterns, demographic profiling, and competitor proximity mapping."
    },
    {
      icon: UsersIcon,
      title: "Audience Measurement",
      description: "Real-time foot traffic analysis, dwell time tracking, and audience demographics powered by mobile location data."
    },
    {
      icon: EyeIcon,
      title: "Attention Metrics",
      description: "Computer vision-powered viewability tracking, engagement scoring, and creative performance optimization."
    },
    {
      icon: ChartBarIcon,
      title: "Attribution Analytics",
      description: "Store visit lift measurement, mobile attribution, and cross-channel impact analysis for complete ROI visibility."
    }
  ]

  const formatTypes = [
    {
      category: "Billboards",
      icon: BuildingIcon,
      metrics: ["Static Large Format", "Digital Billboards", "Spectacular Displays", "Highway Billboards", "Urban Posters", "Wallscapes"],
      liveStats: {
        activeLocations: 1247,
        dailyImpressions: "8.4M",
        avgCPM: "$4.20",
        performance: "+18%"
      },
      color: "from-blue-500 to-indigo-600"
    },
    {
      category: "Transit",
      icon: TruckIcon,
      metrics: ["Bus Shelters", "Metro/Subway Ads", "Bus Wraps", "Train Station Displays", "Airport Advertising", "Taxi/Rideshare Wraps"],
      liveStats: {
        activeLocations: 3421,
        dailyImpressions: "12.7M",
        avgCPM: "$5.80",
        performance: "+24%"
      },
      color: "from-indigo-500 to-blue-600"
    },
    {
      category: "Street Furniture",
      icon: LocationIcon,
      metrics: ["Kiosks", "Benches", "Newsstand Displays", "Phone Booth Ads", "Bike Share Stations", "Smart City Displays"],
      liveStats: {
        activeLocations: 892,
        dailyImpressions: "3.2M",
        avgCPM: "$3.90",
        performance: "+12%"
      },
      color: "from-blue-600 to-indigo-500"
    },
    {
      category: "Place-Based",
      icon: BuildingIcon,
      metrics: ["Retail Screens", "Cinema Advertising", "Sports Venues", "Shopping Malls", "Gyms & Wellness", "Office Buildings"],
      liveStats: {
        activeLocations: 2156,
        dailyImpressions: "6.9M",
        avgCPM: "$6.50",
        performance: "+31%"
      },
      color: "from-indigo-600 to-blue-500"
    }
  ]

  const liveData = [
    { location: 'Times Square', impressions: 125847, change: '+12%', status: 'Peak' },
    { location: 'Union Station', impressions: 98234, change: '+8%', status: 'High' },
    { location: 'Airport Terminal', impressions: 76543, change: '+15%', status: 'Peak' },
    { location: 'Shopping District', impressions: 54321, change: '+5%', status: 'Medium' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
                <span className="block text-3xl md:text-4xl font-light mt-3 text-blue-200">
                  {heroSubtitle}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-blue-100">
                {heroDescription}
                <span className="text-yellow-300 font-semibold"> audience measurement</span>, and 
                <span className="text-blue-300 font-semibold"> attribution analytics</span>.
              </p>

              {/* Key Features List */}
              <div className="space-y-4 mb-8">
                {[
                  { 
                    icon: <MapIcon className="w-6 h-6" />, 
                    text: 'Live Performance Maps' 
                  },
                  { 
                    icon: <UsersIcon className="w-6 h-6" />, 
                    text: 'Real-Time Foot Traffic Analytics' 
                  },
                  { 
                    icon: <LocationIcon className="w-6 h-6" />, 
                    text: 'Geographic Audience Insights' 
                  },
                  { 
                    icon: <ChartBarIcon className="w-6 h-6" />, 
                    text: 'Store Visit Attribution' 
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-lg"
                  >
                    <div className="text-yellow-300">{item.icon}</div>
                    <span className="text-white/90">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all shadow-2xl hover:shadow-yellow-500/50 inline-flex items-center gap-2">
                  View Live Dashboard
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Side - Live OOH Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Main Stats Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 text-white/90">Live OOH Performance</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '12.4M', label: 'Daily Impressions', color: 'text-yellow-300' },
                    { value: '3.2M', label: 'Unique Reach', color: 'text-green-300' },
                    { value: '847', label: 'Active Locations', color: 'text-purple-300' },
                    { value: '+23%', label: 'Store Visit Lift', color: 'text-pink-300' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>


            </motion.div>
          </div>
        </div>
      </section>

      {/* OOH Analytics Features */}
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
              Complete OOH Measurement Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From location intelligence to audience insights, get comprehensive analytics 
              that transform Out-of-Home campaigns into measurable, optimizable channels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {oohMetrics.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Location Performance Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Live Performance Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor real-time OOH campaign performance across all locations with interactive 
              analytics, audience insights, and environmental context data.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {locations.map((location) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                onClick={() => setSelectedLocation(location.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all ${
                  selectedLocation === location.id
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl scale-105'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-lg font-bold mb-1 ${selectedLocation === location.id ? 'text-white' : 'text-gray-900'}`}>
                      {location.name}
                    </h3>
                    <div className={`inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                      selectedLocation === location.id ? 'bg-white/20' : 'bg-blue-100 text-blue-700'
                    }`}>
                      <LocationIcon className="w-4 h-4" />
                      {location.type}
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    selectedLocation === location.id ? 'bg-green-300 animate-pulse' : 'bg-green-500'
                  }`}></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-sm ${selectedLocation === location.id ? 'text-white/80' : 'text-gray-600'}`}>Impressions</span>
                    <span className="font-bold">{location.impressions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${selectedLocation === location.id ? 'text-white/80' : 'text-gray-600'}`}>Reach</span>
                    <span className="font-bold">{location.reach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${selectedLocation === location.id ? 'text-white/80' : 'text-gray-600'}`}>CPM</span>
                    <span className="font-bold">{location.cpm}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Location Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200"
          >
            {locations.filter(loc => loc.id === selectedLocation).map(location => (
              <div key={location.id}>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Frequency</div>
                    <div className="text-3xl font-bold text-blue-600">{location.frequency}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Monthly Cost</div>
                    <div className="text-3xl font-bold text-indigo-600">{location.cost}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Traffic Level</div>
                    <div className="text-3xl font-bold text-blue-600">{location.traffic}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Reach</div>
                    <div className="text-3xl font-bold text-blue-600">{location.reach}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <UsersIcon className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Audience Demographics</h4>
                    </div>
                    <p className="text-gray-700">{location.demographics}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <ClockIcon className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-semibold text-gray-900">Peak Hours</h4>
                    </div>
                    <p className="text-gray-700">{location.peakHours}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OOH Format Types */}
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
              Measure Every OOH Format
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive analytics across all Out-of-Home advertising formats - from traditional 
              billboards to digital displays and everything in between.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {formatTypes.map((type, index) => (
              <motion.div
                key={type.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredFormat(type.category)}
                onMouseLeave={() => setHoveredFormat(null)}
                className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${
                  hoveredFormat === type.category 
                    ? 'scale-105 shadow-2xl ring-2 ring-blue-500 z-10' 
                    : 'hover:shadow-xl'
                }`}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 transition-opacity duration-500`}
                  animate={{ opacity: hoveredFormat === type.category ? 0.1 : 0 }}
                />

                <div className="relative p-6">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center transition-all duration-500`}
                      animate={{ 
                        scale: hoveredFormat === type.category ? 1.1 : 1,
                        rotate: hoveredFormat === type.category ? 360 : 0
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <type.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {type.category}
                      </h3>
                      {hoveredFormat === type.category && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          className="flex items-center gap-1 mt-1"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs text-green-600 font-semibold">Live Data</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Animated Live Stats on Hover */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredFormat === type.category ? 'auto' : 0,
                      opacity: hoveredFormat === type.category ? 1 : 0
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 space-y-3 border border-blue-100">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 font-medium">Active Locations</span>
                        <motion.span 
                          className="text-lg font-bold text-blue-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredFormat === type.category ? 1 : 0 }}
                          transition={{ delay: 0.1, type: "spring" }}
                        >
                          {type.liveStats.activeLocations.toLocaleString()}
                        </motion.span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 font-medium">Daily Impressions</span>
                        <motion.span 
                          className="text-lg font-bold text-indigo-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredFormat === type.category ? 1 : 0 }}
                          transition={{ delay: 0.2, type: "spring" }}
                        >
                          {type.liveStats.dailyImpressions}
                        </motion.span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 font-medium">Avg CPM</span>
                        <motion.span 
                          className="text-lg font-bold text-blue-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredFormat === type.category ? 1 : 0 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          {type.liveStats.avgCPM}
                        </motion.span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                        <span className="text-xs text-gray-600 font-medium">Performance</span>
                        <motion.span 
                          className="text-lg font-bold text-green-600 flex items-center gap-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredFormat === type.category ? 1 : 0 }}
                          transition={{ delay: 0.4, type: "spring" }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          {type.liveStats.performance}
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Format List */}
                  <ul className="space-y-2">
                    {type.metrics.map((metric, idx) => (
                      <motion.li 
                        key={metric} 
                        className="flex items-start space-x-2"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ 
                          x: hoveredFormat === type.category ? 0 : -10,
                          opacity: hoveredFormat === type.category ? 1 : 0.7
                        }}
                        transition={{ delay: hoveredFormat === type.category ? idx * 0.05 : 0 }}
                      >
                        <motion.svg 
                          className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth={1.5} 
                          stroke="currentColor"
                          animate={{ 
                            scale: hoveredFormat === type.category ? [1, 1.2, 1] : 1,
                          }}
                          transition={{ delay: idx * 0.05, duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </motion.svg>
                        <span className={`text-sm transition-colors duration-300 ${
                          hoveredFormat === type.category ? 'text-gray-900 font-medium' : 'text-gray-600'
                        }`}>
                          {metric}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover CTA */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredFormat === type.category ? 'auto' : 0,
                      opacity: hoveredFormat === type.category ? 1 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="overflow-hidden"
                  >
                    <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2">
                      View Analytics
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                </div>

                {/* Animated Corner Badge */}
                {hoveredFormat === type.category && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-3 right-3"
                  >
                    <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      Active
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>


        </div>
      </section>

      {/* Real-Time Audience Analytics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Real-Time Audience Insights
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Leverage mobile location data, traffic patterns, and demographic intelligence 
                to understand who's seeing your OOH campaigns in real-time.
              </p>
              <div className="space-y-6">
                {[
                  { 
                    icon: <UsersIcon className="w-6 h-6" />,
                    title: "Foot Traffic Analysis", 
                    value: "847K daily",
                    color: "from-purple-500 to-pink-500"
                  },
                  { 
                    icon: <ClockIcon className="w-6 h-6" />,
                    title: "Average Dwell Time", 
                    value: "4.2 minutes",
                    color: "from-blue-500 to-indigo-500"
                  },
                  { 
                    icon: <DevicePhoneMobileIcon className="w-6 h-6" />,
                    title: "Mobile Attribution", 
                    value: "92% match rate",
                    color: "from-pink-500 to-rose-500"
                  },
                  { 
                    icon: <LocationIcon className="w-6 h-6" />,
                    title: "Store Visit Lift", 
                    value: "+23% increase",
                    color: "from-indigo-500 to-purple-500"
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl"
                  >
                      <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                        {stat.icon}
                      </div>
                      <span className="text-gray-700 font-medium">{stat.title}</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-900">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Demographics Breakdown</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Age 18-24</span>
                      <span className="text-lg font-semibold text-gray-900">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Age 25-34</span>
                      <span className="text-lg font-semibold text-gray-900">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Age 35-44</span>
                      <span className="text-lg font-semibold text-gray-900">27%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full" style={{ width: '27%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Age 45+</span>
                      <span className="text-lg font-semibold text-gray-900">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Top Audience Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Technology', 'Fashion', 'Travel', 'Food & Dining', 'Fitness', 'Entertainment'].map((interest) => (
                      <span key={interest} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Attribution & ROI */}
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
              Complete Attribution & ROI Tracking
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect OOH exposure to real business outcomes with advanced attribution 
              models that prove the value of your outdoor advertising investments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Store Visit Attribution",
                metrics: [
                  { label: "Store Visits", value: "124.7K" },
                  { label: "Visit Lift", value: "+23%" },
                  { label: "Attributed Revenue", value: "$2.4M" }
                ]
              },
              {
                title: "Digital Cross-Channel",
                metrics: [
                  { label: "Search Lift", value: "+156%" },
                  { label: "Website Visits", value: "89.2K" },
                  { label: "Social Engagement", value: "+47%" }
                ]
              },
              {
                title: "Brand Impact",
                metrics: [
                  { label: "Brand Awareness", value: "+38%" },
                  { label: "Ad Recall", value: "67%" },
                  { label: "Purchase Intent", value: "+29%" }
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">{section.title}</h3>
                <div className="space-y-4">
                  {section.metrics.map((metric) => (
                    <div key={metric.label} className="flex justify-between items-center">
                      <span className="text-gray-600">{metric.label}</span>
                      <span className="text-2xl font-bold text-blue-600">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
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
                MW Measure connects seamlessly with your existing OOH ecosystem. No rip-and-replace—just instant measurement value from day one.
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Transform OOH Into Measurable Performance
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join leading brands leveraging real-time location intelligence, audience analytics, 
              and attribution modeling to maximize their Out-of-Home advertising ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                View Live Demo
                <EyeIcon className="w-5 h-5" />
              </CTAButton>
              <CTAButton
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center gap-2"
              >
                Book a Free Demo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
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