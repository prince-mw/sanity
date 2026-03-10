'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

// FAQ Component
function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div variants={staggerItem} className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={onClick} className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-gray-900">{question}</span>
        <svg className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-5 pt-0 bg-white">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </motion.div>
  )
}

// Media Type Icons
const MediaIcons: Record<string, React.ReactNode> = {
  digital: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  transit: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 4h8m-6 4h4m-2-12a9 9 0 110 18 9 9 0 010-18z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M3 12h18" />
    </svg>
  ),
  bus: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h.01M16 17h.01M9 11h6M4 11V7a4 4 0 014-4h8a4 4 0 014 4v4M4 11v6a1 1 0 001 1h1m14-7v6a1 1 0 01-1 1h-1m-13 0a2 2 0 104 0m10 0a2 2 0 104 0" />
    </svg>
  ),
  mall: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  highway: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  airport: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  sports: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export default function USAPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [selectedMarket, setSelectedMarket] = useState(0)
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [currentTimeLabel, setCurrentTimeLabel] = useState('')
  const [currentTimePosition, setCurrentTimePosition] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      // Use EST timezone for US display
      const now = new Date()
      const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
      const hour = estTime.getHours()
      setCurrentHour(hour)
      const label = hour === 0 ? '12AM' : hour < 12 ? `${hour}AM` : hour === 12 ? '12PM' : `${hour - 12}PM`
      setCurrentTimeLabel(`${label} EST`)
      setCurrentTimePosition((hour / 24) * 100)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const keyMarkets = [
    {
      city: "New York City",
      code: "NYC",
      population: "8.3M",
      screens: 4250,
      screensGrowth: 15,
      dailyReach: "12.5M",
      dailyReachGrowth: 12.5,
      monthlyImpressions: "375M",
      monthlyImpressionsGrowth: 18.2,
      yoyGrowth: 22.5,
      avgDwell: "2.8 min",
      peakHours: "7-10 AM, 4-8 PM",
      topCategory: "Finance & Luxury",
      viewability: 96.2,
      hourlyData: [12, 15, 22, 45, 68, 82, 92, 95, 88, 82, 78, 75, 72, 70, 78, 85, 92, 95, 88, 72, 55, 38, 22, 15],
      description: "The world's advertising capital with iconic Times Square billboards and subway networks.",
      locations: [
        { name: "Times Square", desc: "Iconic Landmark", traffic: 380000, screens: 582, score: 99 },
        { name: "Grand Central", desc: "Transit Hub", traffic: 750000, screens: 425, score: 97 },
      ],
      audience: [
        { name: "Commuters", percentage: 38, color: "bg-blue-500" },
        { name: "Tourists", percentage: 28, color: "bg-amber-500" },
        { name: "Professionals", percentage: 22, color: "bg-emerald-500" },
        { name: "Students", percentage: 12, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Spectacular LED", percentage: 35 },
        { name: "Subway Displays", percentage: 32 },
        { name: "Street Furniture", percentage: 20 },
        { name: "Bus Shelters", percentage: 13 },
      ],
    },
    {
      city: "Los Angeles",
      code: "LAX",
      population: "3.9M",
      screens: 3580,
      screensGrowth: 18,
      dailyReach: "10.2M",
      dailyReachGrowth: 15.8,
      monthlyImpressions: "306M",
      monthlyImpressionsGrowth: 22.5,
      yoyGrowth: 25.8,
      avgDwell: "3.5 min",
      peakHours: "7-10 AM, 3-7 PM",
      topCategory: "Entertainment & Tech",
      viewability: 94.8,
      hourlyData: [10, 12, 18, 35, 58, 75, 88, 92, 85, 78, 72, 68, 65, 62, 68, 78, 88, 92, 85, 68, 48, 32, 18, 12],
      description: "Entertainment capital with the iconic Sunset Boulevard and LA Live spectacular displays.",
      locations: [
        { name: "Sunset Boulevard", desc: "Entertainment District", traffic: 520000, screens: 385, score: 98 },
        { name: "LAX Airport", desc: "Major Hub", traffic: 280000, screens: 295, score: 95 },
      ],
      audience: [
        { name: "Drivers", percentage: 42, color: "bg-blue-500" },
        { name: "Entertainment", percentage: 25, color: "bg-amber-500" },
        { name: "Tech Workers", percentage: 20, color: "bg-emerald-500" },
        { name: "Tourists", percentage: 13, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Highway Billboards", percentage: 42 },
        { name: "Digital Spectaculars", percentage: 28 },
        { name: "Airport Media", percentage: 18 },
        { name: "Transit Wraps", percentage: 12 },
      ],
    },
    {
      city: "Chicago",
      code: "CHI",
      population: "2.7M",
      screens: 2180,
      screensGrowth: 14,
      dailyReach: "6.8M",
      dailyReachGrowth: 10.5,
      monthlyImpressions: "204M",
      monthlyImpressionsGrowth: 16.8,
      yoyGrowth: 18.2,
      avgDwell: "2.5 min",
      peakHours: "6-9 AM, 4-7 PM",
      topCategory: "Finance & CPG",
      viewability: 93.5,
      hourlyData: [8, 12, 22, 48, 72, 85, 92, 88, 82, 75, 70, 68, 65, 68, 75, 85, 92, 88, 75, 58, 42, 28, 15, 10],
      description: "The Midwest advertising hub with Michigan Avenue and CTA transit network coverage.",
      locations: [
        { name: "Magnificent Mile", desc: "Shopping District", traffic: 280000, screens: 345, score: 96 },
        { name: "O'Hare Airport", desc: "World's Busiest", traffic: 210000, screens: 268, score: 94 },
      ],
      audience: [
        { name: "Commuters", percentage: 40, color: "bg-blue-500" },
        { name: "Shoppers", percentage: 28, color: "bg-amber-500" },
        { name: "Professionals", percentage: 22, color: "bg-emerald-500" },
        { name: "Tourists", percentage: 10, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "CTA Transit", percentage: 38 },
        { name: "Urban Billboards", percentage: 32 },
        { name: "Airport Displays", percentage: 18 },
        { name: "Street Furniture", percentage: 12 },
      ],
    },
    {
      city: "Miami",
      code: "MIA",
      population: "450K",
      screens: 1650,
      screensGrowth: 22,
      dailyReach: "5.2M",
      dailyReachGrowth: 18.5,
      monthlyImpressions: "156M",
      monthlyImpressionsGrowth: 28.5,
      yoyGrowth: 32.5,
      avgDwell: "3.8 min",
      peakHours: "9 AM-8 PM",
      topCategory: "Tourism & Real Estate",
      viewability: 92.8,
      hourlyData: [15, 18, 22, 32, 48, 62, 75, 82, 88, 92, 94, 95, 94, 92, 88, 85, 82, 78, 72, 62, 48, 35, 25, 18],
      description: "Gateway to Latin America with vibrant South Beach and Brickell financial district coverage.",
      locations: [
        { name: "South Beach", desc: "Tourism Hub", traffic: 420000, screens: 285, score: 95 },
        { name: "Brickell", desc: "Financial District", traffic: 180000, screens: 225, score: 93 },
      ],
      audience: [
        { name: "Tourists", percentage: 45, color: "bg-amber-500" },
        { name: "Latin Visitors", percentage: 25, color: "bg-emerald-500" },
        { name: "Professionals", percentage: 18, color: "bg-blue-500" },
        { name: "Residents", percentage: 12, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Beach Displays", percentage: 35 },
        { name: "Highway Billboards", percentage: 28 },
        { name: "Airport Media", percentage: 22 },
        { name: "Urban Screens", percentage: 15 },
      ],
    },
  ]

  const currentMarket = keyMarkets[selectedMarket]

  const faqs = [
    {
      question: "What is DOOH advertising in the USA?",
      answer: "DOOH (Digital Out-of-Home) advertising in the USA uses digital screens in public spaces like highways, transit systems, airports, malls, and iconic locations like Times Square to deliver dynamic, targeted ads that can be updated in real time.",
    },
    {
      question: "Why invest in OOH advertising in the United States?",
      answer: "The USA has the world's largest OOH advertising market with diverse consumer demographics, high car ownership, and iconic advertising locations. It offers unmatched reach across urban, suburban, and rural audiences.",
    },
    {
      question: "What types of OOH advertising are available in the USA?",
      answer: "Digital billboards, highway spectaculars, transit advertising (subway, bus, rail), airport media, place-based networks, sports venue displays, and programmatic DOOH across all major markets.",
    },
    {
      question: "How can I measure OOH campaign effectiveness in the USA?",
      answer: "Track impressions using Geopath data (formerly TAB), mobile location data, brand lift studies, and real-time analytics via programmatic DOOH platforms like Moving Audiences.",
    },
    {
      question: "What are the regulations for OOH advertising in the USA?",
      answer: "OOH advertising in the USA is regulated at federal, state, and local levels. The Highway Beautification Act governs roadside advertising, while local zoning laws control urban displays. Content must comply with FCC and FTC guidelines.",
    },
    {
      question: "How does MovingWalls help advertisers in the USA?",
      answer: "MovingWalls provides access to premium OOH inventory across all major US markets, with precise audience targeting based on demographic and behavioral data, real-time campaign analytics, and seamless programmatic buying.",
    },
  ]

  const countryData = {
    name: "United States",
    description: "The world's largest and most sophisticated OOH advertising market, featuring iconic locations, advanced programmatic capabilities, and unmatched consumer reach.",
    stats: [
      { label: "Billboard Sites", value: "350,000+" },
      { label: "Digital Screens", value: "12,000+" },
      { label: "Monthly Reach", value: "280M+" },
      { label: "DMA Markets", value: "210" },
    ],
    majorCities: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Miami",
      "San Francisco",
      "Las Vegas",
      "Dallas",
      "Atlanta",
      "Boston",
      "Seattle",
    ],
    mediaTypes: [
      { name: "Digital Billboards", icon: "digital", description: "Premium LED displays on highways and urban centers" },
      { name: "Transit Advertising", icon: "transit", description: "Subway, rail, and bus system coverage" },
      { name: "Bus Media", icon: "bus", description: "Full bus wraps and shelter displays" },
      { name: "Place-Based Networks", icon: "mall", description: "Retail, office, and lifestyle venues" },
      { name: "Highway Spectaculars", icon: "highway", description: "High-impact roadside billboards" },
      { name: "Airport Media", icon: "airport", description: "Major hub advertising networks" },
    ],
    caseStudies: [
      {
        title: "Tech Product Launch",
        client: "Fortune 500 Tech Company",
        results: "68% increase in brand awareness",
      },
      {
        title: "Entertainment Premiere",
        client: "Major Film Studio",
        results: "Record 42M opening weekend",
      },
      {
        title: "Retail Brand Campaign",
        client: "National Retail Chain",
        results: "32% lift in foot traffic",
      },
    ],
    partners: [
      "Clear Channel Outdoor",
      "Lamar Advertising",
      "OUTFRONT Media",
      "JCDecaux North America",
      "Intersection",
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with NYC Skyline */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background Stars */}
        <div className="absolute inset-0">
          {[
            { left: 8, top: 12 }, { left: 18, top: 28 }, { left: 28, top: 8 }, { left: 38, top: 48 },
            { left: 48, top: 18 }, { left: 58, top: 38 }, { left: 68, top: 12 }, { left: 78, top: 58 },
            { left: 88, top: 22 }, { left: 92, top: 42 }, { left: 12, top: 62 }, { left: 22, top: 78 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.4 }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                OOH Advertising in the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400">{countryData.name}</span>
              </h1>
              <p className="text-lg md:text-xl text-mw-blue-100 max-w-xl mb-8 leading-relaxed">
                {countryData.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-mw-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-50 transition-all hover:scale-105">
                  Contact Sales
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - NYC Skyline Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <div className="relative w-[280px] h-[300px] sm:w-[350px] sm:h-[380px] md:w-[420px] md:h-[420px]">
                {/* NYC Skyline Buildings */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1 items-end">
                  {/* Empire State Building */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div 
                      className="w-8 md:w-10 h-56 md:h-64 bg-gradient-to-t from-gray-700 via-gray-500 to-gray-400 rounded-t"
                      style={{ boxShadow: 'inset -3px 0 10px rgba(0,0,0,0.3)' }}
                    >
                      {/* Antenna */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-400" />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      {/* Windows */}
                      <div className="absolute inset-2 grid grid-cols-2 gap-0.5">
                        {[...Array(28)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-yellow-200/40 rounded-sm"
                            animate={{ opacity: [0.2, 0.7, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Chrysler Building style */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div 
                      className="w-6 md:w-8 h-44 md:h-52 bg-gradient-to-t from-gray-600 via-gray-400 to-gray-300 rounded-t"
                      style={{ boxShadow: 'inset -3px 0 10px rgba(0,0,0,0.3)' }}
                    >
                      {/* Art Deco Top */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-400" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
                      <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
                        {[...Array(22)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-yellow-200/40 rounded-sm"
                            animate={{ opacity: [0.2, 0.7, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: (i + 5) * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* One World Trade Center */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div 
                      className="w-10 md:w-12 h-60 md:h-72 bg-gradient-to-t from-blue-900 via-blue-700 to-blue-500"
                      style={{ 
                        clipPath: 'polygon(15% 100%, 0% 0%, 100% 0%, 85% 100%)',
                        boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.3)'
                      }}
                    >
                      {/* Antenna */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-400" />
                      <div className="absolute inset-x-3 inset-y-2 grid grid-cols-1 gap-1">
                        {[...Array(18)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-cyan-300/30 rounded-sm"
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Shorter buildings */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="w-6 md:w-8 h-36 md:h-44 bg-gradient-to-t from-gray-700 via-gray-500 to-gray-400 rounded-t">
                      <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
                        {[...Array(16)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-yellow-200/40 rounded-sm"
                            animate={{ opacity: [0.2, 0.7, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: (i + 10) * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="w-5 md:w-6 h-28 md:h-36 bg-gradient-to-t from-gray-600 via-gray-400 to-gray-300 rounded-t">
                      <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
                        {[...Array(14)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-yellow-200/40 rounded-sm"
                            animate={{ opacity: [0.2, 0.7, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: (i + 15) * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Times Square Billboard Effect */}
                <motion.div
                  className="absolute bottom-32 left-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    className="w-14 h-10 rounded bg-gradient-to-br from-red-500 via-pink-500 to-yellow-500"
                    animate={{ 
                      background: [
                        'linear-gradient(to bottom right, #ef4444, #ec4899, #eab308)',
                        'linear-gradient(to bottom right, #3b82f6, #8b5cf6, #ec4899)',
                        'linear-gradient(to bottom right, #10b981, #06b6d4, #3b82f6)',
                        'linear-gradient(to bottom right, #ef4444, #ec4899, #eab308)'
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}
                  />
                </motion.div>

                {/* Floating Digital Screens */}
                {[
                  { x: -80, y: 120, delay: 0.8, color: 'red' },
                  { x: 90, y: 140, delay: 1.1, color: 'blue' },
                  { x: -60, y: 220, delay: 1.4, color: 'emerald' },
                  { x: 100, y: 200, delay: 1.7, color: 'amber' },
                ].map((screen, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: `calc(50% + ${screen.x}px)`, bottom: `${screen.y}px` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: screen.delay }}
                  >
                    <motion.div
                      className={`w-10 h-7 rounded bg-gradient-to-br ${screen.color === 'red' ? 'from-red-400 to-orange-500' : screen.color === 'blue' ? 'from-blue-400 to-indigo-500' : screen.color === 'emerald' ? 'from-emerald-400 to-cyan-500' : 'from-amber-400 to-orange-500'}`}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: screen.delay }}
                      style={{ boxShadow: `0 0 15px ${screen.color === 'red' ? 'rgba(239, 68, 68, 0.5)' : screen.color === 'blue' ? 'rgba(59, 130, 246, 0.5)' : screen.color === 'emerald' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(245, 158, 11, 0.5)'}` }}
                    />
                  </motion.div>
                ))}

                {/* Statue of Liberty silhouette */}
                <motion.div
                  className="absolute bottom-16 right-8"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="w-8 h-16 bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t-full opacity-50" />
                </motion.div>


              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="py-12 bg-gray-50 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {countryData.stats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Media Types */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Media Types</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive OOH advertising solutions across the {countryData.name}</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {countryData.mediaTypes.map((media) => (
              <motion.div key={media.name} variants={staggerItem} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">{MediaIcons[media.icon]}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{media.name}</h3>
                <p className="text-gray-600">{media.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Markets Dashboard */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="mb-8">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Key Markets Dashboard
              </h2>
              <p className="text-gray-600">Real-time outdoor advertising metrics across the United States</p>
            </div>

            {/* Location Tabs */}
            <div className="bg-white border border-gray-200 rounded-2xl p-2 grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
              {keyMarkets.map((market, index) => (
                <button
                  key={market.city}
                  onClick={() => setSelectedMarket(index)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-center ${
                    selectedMarket === index
                      ? 'bg-mw-blue-600 text-white shadow-lg shadow-mw-blue-600/25'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="hidden sm:inline">{market.city}</span>
                  <span className="sm:hidden">{market.code}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Content */}
          <motion.div
            key={selectedMarket}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* City Header Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-mw-blue-500 to-mw-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{currentMarket.code}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentMarket.city}</h3>
                    <p className="text-gray-500">{currentMarket.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-green-700 font-semibold">+{currentMarket.yoyGrowth}% YoY</span>
                </div>
              </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {currentMarket.screensGrowth}%
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentMarket.screens.toLocaleString()}</div>
                <div className="text-gray-500 text-sm">Total Screens</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {currentMarket.dailyReachGrowth}%
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentMarket.dailyReach}</div>
                <div className="text-gray-500 text-sm">Daily Reach</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {currentMarket.monthlyImpressionsGrowth}%
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentMarket.monthlyImpressions}</div>
                <div className="text-gray-500 text-sm">Monthly Impressions</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentMarket.population}</div>
                <div className="text-gray-500 text-sm">Population</div>
              </div>
            </div>

            {/* Performance Metrics & Peak Hours */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-mw-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Performance Metrics
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Average Dwell Time</span>
                    <span className="font-semibold text-gray-900">{currentMarket.avgDwell}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Peak Hours</span>
                    <span className="font-semibold text-gray-900">{currentMarket.peakHours}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Top Category</span>
                    <span className="font-semibold text-gray-900">{currentMarket.topCategory}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-600">Viewability Rate</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-mw-blue-600 rounded-full" style={{ width: `${currentMarket.viewability}%` }} />
                      </div>
                      <span className="font-semibold text-gray-900">{currentMarket.viewability}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Peak Hours Chart */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-mw-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Hourly Traffic Distribution
                  </h4>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-t from-mw-blue-600 to-mw-blue-400" />
                      <span className="text-gray-500">Traffic Volume</span>
                    </div>
                  </div>
                </div>

                {/* Chart Container */}
                <div className="relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 -ml-1">
                    <span>100%</span>
                    <span>75%</span>
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                  </div>

                  {/* Chart Area */}
                  <div className="ml-8">
                    {/* Grid lines */}
                    <div className="absolute left-8 right-0 top-0 h-40 flex flex-col justify-between pointer-events-none">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full border-t border-gray-100" />
                      ))}
                    </div>

                    {/* Bars */}
                    <div className="flex items-end justify-between h-40 gap-0.5 relative">
                      {/* Current Time Indicator */}
                      <motion.div
                        className="absolute z-20 group cursor-pointer"
                        style={{ left: `${currentTimePosition}%`, bottom: '0' }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                          <div className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg">
                            <div className="flex items-center gap-2">
                              <span className="text-red-400">●</span>
                              <span>Current Time: {currentTimeLabel}</span>
                            </div>
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45" />
                        </div>
                        
                        {/* Pulsing Dot */}
                        <div className="relative -translate-x-1/2">
                          <span className="absolute inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75 animate-ping" />
                          <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500 border-2 border-white shadow-lg" />
                        </div>
                      </motion.div>

                      {currentMarket.hourlyData.map((value, i) => {
                        const isPeak = value >= 85;
                        const hour = i;
                        const isCurrentHour = hour === currentHour;
                        const timeLabel = hour === 0 ? '12AM' : hour < 12 ? `${hour}AM` : hour === 12 ? '12PM' : `${hour - 12}PM`;
                        return (
                          <div key={i} className={`flex-1 flex flex-col items-center group relative ${isCurrentHour ? 'z-10' : ''}`}>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                                <div className="font-semibold">{timeLabel} {isCurrentHour && '(Now)'}</div>
                                <div className="text-gray-300">{value}% capacity</div>
                                <div className="text-gray-300">{Math.round(value * (parseInt(currentMarket.dailyReach) * 10) / 2400).toLocaleString()} visitors</div>
                              </div>
                              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45" />
                            </div>
                            
                            {/* Bar */}
                            <motion.div
                              className={`w-full rounded-t-sm cursor-pointer transition-all duration-200 group-hover:opacity-80 ${
                                isCurrentHour
                                  ? 'bg-gradient-to-t from-red-500 to-red-400 ring-2 ring-red-300 ring-offset-1'
                                  : isPeak 
                                    ? 'bg-gradient-to-t from-amber-500 to-amber-400' 
                                    : 'bg-gradient-to-t from-mw-blue-600 to-mw-blue-400'
                              }`}
                              initial={{ height: 0 }}
                              animate={{ height: `${value}%` }}
                              transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
                            />
                            
                            {/* Peak indicator */}
                            {isPeak && !isCurrentHour && (
                              <motion.div
                                className="absolute -top-1 left-1/2 -translate-x-1/2"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + i * 0.03 }}
                              >
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* X-axis labels */}
                    <div className="flex justify-between mt-3 text-xs text-gray-500">
                      <span>12AM</span>
                      <span>3AM</span>
                      <span>6AM</span>
                      <span>9AM</span>
                      <span>12PM</span>
                      <span>3PM</span>
                      <span>6PM</span>
                      <span>9PM</span>
                      <span>12AM</span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center justify-center gap-6 text-xs flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-mw-blue-600 to-mw-blue-400" />
                    <span className="text-gray-500">Normal Traffic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-amber-500 to-amber-400" />
                    <span className="text-gray-500">Peak Traffic (≥85%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-red-500 to-red-400" />
                    <span className="text-gray-500">Current Hour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prime Locations Table */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-mw-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Prime Locations
                </h4>
                <span className="text-gray-500 text-sm">{currentMarket.locations.length} zones available</span>
              </div>
              
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 mb-2">
                <div className="col-span-1">#</div>
                <div className="col-span-3">Location</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-2 text-right">Daily Traffic</div>
                <div className="col-span-1 text-right">Screens</div>
                <div className="col-span-2 text-right">Score</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-2">
                {currentMarket.locations.map((loc, index) => (
                  <motion.div
                    key={loc.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-12 gap-4 py-4 px-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="hidden md:flex col-span-1 items-center">
                      <span className="w-8 h-8 bg-mw-blue-100 text-mw-blue-600 rounded-lg flex items-center justify-center font-semibold text-sm group-hover:bg-mw-blue-600 group-hover:text-white transition-colors">
                        {index + 1}
                      </span>
                    </div>
                    <div className="col-span-1 md:col-span-3 flex items-center">
                      <span className="font-semibold text-gray-900">{loc.name}</span>
                    </div>
                    <div className="col-span-1 md:col-span-3 flex items-center text-gray-600 text-sm">
                      {loc.desc}
                    </div>
                    <div className="hidden md:flex col-span-2 items-center justify-end font-medium text-gray-900">
                      {(loc.traffic / 1000).toFixed(0)}K
                    </div>
                    <div className="hidden md:flex col-span-1 items-center justify-end">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                        {loc.screens}
                      </span>
                    </div>
                    <div className="hidden md:flex col-span-2 items-center justify-end gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-mw-blue-500 to-mw-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${loc.score}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="font-semibold text-gray-900 w-8">{loc.score}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Audience & Media Format */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Audience Breakdown */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-mw-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Audience Breakdown
                </h4>
                <div className="space-y-4">
                  {currentMarket.audience.map((segment, index) => (
                    <div key={segment.name} className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                      <span className="flex-1 text-gray-700">{segment.name}</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${segment.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${segment.percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="font-semibold text-gray-900 w-12 text-right">{segment.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media Format Mix */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-mw-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  Media Format Mix
                </h4>
                <div className="space-y-4">
                  {currentMarket.mediaFormats.map((format, index) => (
                    <div key={format.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">{format.name}</span>
                        <span className="font-semibold text-gray-900">{format.percentage}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-mw-blue-500 to-mw-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${format.percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Coverage Areas</h2>
            <p className="text-lg text-gray-600">Key locations with billboard inventory</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {countryData.majorCities.map((city) => (
              <motion.div key={city} variants={staggerItem} className="bg-white border border-gray-200 rounded-full px-6 py-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium text-gray-900">{city}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">See how brands have achieved results with OOH in the {countryData.name}</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {countryData.caseStudies.map((study) => (
              <motion.div key={study.title} variants={staggerItem} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-mw-blue-100 to-mw-blue-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-mw-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{study.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{study.client}</p>
                  <div className="flex items-center gap-2 text-mw-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="font-medium">{study.results}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeIn}
        className="py-16 md:py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Media Partners</h2>
            <p className="text-lg text-gray-600">Working with leading media owners in the {countryData.name}</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-6">
            {countryData.partners.map((partner) => (
              <motion.div key={partner} variants={staggerItem} className="bg-white border border-gray-200 rounded-lg px-8 py-4">
                <span className="font-medium text-gray-700">{partner}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Explore Other Markets */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Other Markets</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover OOH advertising opportunities across global markets</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { name: "Malaysia", flag: "🇲🇾", href: "/locations/malaysia" },
              { name: "Singapore", flag: "🇸🇬", href: "/locations/singapore" },
              { name: "Indonesia", flag: "🇮🇩", href: "/locations/indonesia" },
              { name: "India", flag: "🇮🇳", href: "/locations/india" },
              { name: "Philippines", flag: "🇵🇭", href: "/locations/philippines" },
              { name: "Japan", flag: "🇯🇵", href: "/locations/japan" },
              { name: "Australia", flag: "🇦🇺", href: "/locations/australia" },
              { name: "Thailand", flag: "🇹🇭", href: "/locations/thailand" },
            ].map((country) => (
              <motion.div key={country.name} variants={staggerItem}>
                <Link href={country.href} className="block bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-mw-blue-400 transition-all group">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{country.flag}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-mw-blue-600 transition-colors">{country.name}</h3>
                      <p className="text-sm text-gray-500">View billboards →</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">FAQs – OOH Advertising in the USA</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} isOpen={openFAQ === index} onClick={() => setOpenFAQ(openFAQ === index ? null : index)} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
