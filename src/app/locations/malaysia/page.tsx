'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

// SVG Icons
const Icons = {
  billboard: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  location: (
    <svg className="w-6 h-6 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5 text-mw-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  users: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  eye: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  plus: (
    <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  minus: (
    <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  ),
}

// FAQ Accordion Component
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <motion.div variants={staggerItem} className="border border-gray-200 rounded-lg overflow-hidden">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
    >
      <span className="font-semibold text-gray-900">{question}</span>
      {isOpen ? Icons.minus : Icons.plus}
    </button>
    {isOpen && (
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-gray-600">{answer}</p>
      </div>
    )}
  </motion.div>
)

export default function MalaysiaPage() {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(0)
  const [isContactFormOpen, setIsContactFormOpen] = React.useState(false)

  const highVisibilityBillboards = [
    {
      name: "KL City Center",
      location: "JLN IMBI, Berjaya Time Square, Park Royal Hotel",
      reach: "132,145",
      impressions: "1,075,680",
      description: "A premier outdoor advertising billboard located in the bustling district of Kuala Lumpur.",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    },
    {
      name: "Golden Triangle",
      location: "Bukit Bintang Golden Triangle KL",
      reach: "142,820",
      impressions: "1,000,000+",
      description: "A prime spot for outdoor advertising with high-traffic ensuring substantial reach.",
      image: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&q=80",
    },
    {
      name: "1 Utama",
      location: "LDP Highway - From Kepong, Petaling, Selangor",
      reach: "193,818",
      impressions: "1,034,280",
      description: "A prime outdoor advertising billboard in the heart of Petaling, Selangor.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    },
  ]

  const [selectedMarket, setSelectedMarket] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute for the chart indicator
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  // Calculate current time position as percentage (0-100) across 24 hours
  const currentTimePosition = ((currentTime.getHours() * 60 + currentTime.getMinutes()) / 1440) * 100
  const currentHour = currentTime.getHours()
  const currentTimeLabel = currentHour === 0 ? '12:00 AM' : currentHour < 12 ? `${currentHour}:${currentTime.getMinutes().toString().padStart(2, '0')} AM` : currentHour === 12 ? `12:${currentTime.getMinutes().toString().padStart(2, '0')} PM` : `${currentHour - 12}:${currentTime.getMinutes().toString().padStart(2, '0')} PM`

  const keyMarkets = [
    {
      city: "Kuala Lumpur",
      code: "KUL",
      population: "1.9M",
      screens: 2847,
      screensGrowth: 12,
      dailyReach: "4.2M",
      dailyReachGrowth: 8.3,
      monthlyImpressions: "126M",
      monthlyImpressionsGrowth: 15.2,
      yoyGrowth: 18.5,
      avgDwell: "2.4 min",
      peakHours: "8-10 AM, 5-8 PM",
      topCategory: "Retail & F&B",
      viewability: 94.2,
      hourlyData: [15, 35, 85, 95, 70, 45, 40, 55, 75, 90, 85, 60, 45, 50, 65, 80, 95, 85, 55, 30, 20, 15, 10, 8],
      description: "The capital and economic heart of Malaysia with iconic landmarks like the Petronas Twin Towers.",
      locations: [
        { name: "Bukit Bintang", desc: "Shopping & Entertainment", traffic: 850000, screens: 342, score: 98 },
        { name: "Golden Triangle", desc: "Commercial Hub", traffic: 720000, screens: 278, score: 96 },
        { name: "KL Sentral", desc: "Transportation Hub", traffic: 620000, screens: 186, score: 95 },
        { name: "Federal Highway", desc: "Major Highway", traffic: 480000, screens: 124, score: 92 },
      ],
      audience: [
        { name: "Professionals", percentage: 35, color: "bg-blue-500" },
        { name: "Families", percentage: 28, color: "bg-emerald-500" },
        { name: "Students", percentage: 22, color: "bg-purple-500" },
        { name: "Tourists", percentage: 15, color: "bg-amber-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 45 },
        { name: "Transit Screens", percentage: 32 },
        { name: "Mall Networks", percentage: 18 },
        { name: "Street Furniture", percentage: 5 },
      ],
    },
    {
      city: "Penang",
      code: "PEN",
      population: "1.8M",
      screens: 1256,
      screensGrowth: 18,
      dailyReach: "2.1M",
      dailyReachGrowth: 12.5,
      monthlyImpressions: "63M",
      monthlyImpressionsGrowth: 19.8,
      yoyGrowth: 22.3,
      avgDwell: "3.1 min",
      peakHours: "10 AM-12 PM, 6-9 PM",
      topCategory: "Tourism & Hospitality",
      viewability: 91.8,
      hourlyData: [10, 20, 45, 65, 80, 90, 85, 75, 60, 70, 85, 95, 80, 65, 70, 80, 90, 95, 85, 60, 40, 25, 15, 10],
      description: "Known for its rich cultural heritage and booming tourism industry.",
      locations: [
        { name: "George Town", desc: "UNESCO Heritage Site", traffic: 420000, screens: 156, score: 94 },
        { name: "Gurney Drive", desc: "Seafront Promenade", traffic: 380000, screens: 98, score: 91 },
      ],
      audience: [
        { name: "Tourists", percentage: 42, color: "bg-amber-500" },
        { name: "Families", percentage: 30, color: "bg-emerald-500" },
        { name: "Professionals", percentage: 18, color: "bg-blue-500" },
        { name: "Students", percentage: 10, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 38 },
        { name: "Transit Screens", percentage: 28 },
        { name: "Mall Networks", percentage: 24 },
        { name: "Street Furniture", percentage: 10 },
      ],
    },
    {
      city: "Johor Bahru",
      code: "JHB",
      population: "1.7M",
      screens: 1124,
      screensGrowth: 24,
      dailyReach: "1.8M",
      dailyReachGrowth: 15.7,
      monthlyImpressions: "54M",
      monthlyImpressionsGrowth: 22.4,
      yoyGrowth: 28.7,
      avgDwell: "1.8 min",
      peakHours: "7-9 AM, 4-7 PM",
      topCategory: "Cross-border Retail",
      viewability: 89.5,
      hourlyData: [8, 25, 70, 95, 80, 55, 45, 50, 60, 65, 70, 75, 70, 60, 65, 80, 95, 90, 70, 45, 30, 20, 12, 8],
      description: "The southern gateway to Malaysia, rapidly growing city with cross-border traffic.",
      locations: [
        { name: "CIQ Complex", desc: "Singapore Gateway", traffic: 520000, screens: 86, score: 97 },
        { name: "Legoland Malaysia", desc: "Family Attraction", traffic: 180000, screens: 42, score: 88 },
      ],
      audience: [
        { name: "Cross-border Commuters", percentage: 38, color: "bg-blue-500" },
        { name: "Families", percentage: 32, color: "bg-emerald-500" },
        { name: "Professionals", percentage: 20, color: "bg-purple-500" },
        { name: "Tourists", percentage: 10, color: "bg-amber-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 52 },
        { name: "Transit Screens", percentage: 25 },
        { name: "Mall Networks", percentage: 15 },
        { name: "Street Furniture", percentage: 8 },
      ],
    },
    {
      city: "Kota Kinabalu",
      code: "BKI",
      population: "500K",
      screens: 423,
      screensGrowth: 32,
      dailyReach: "620K",
      dailyReachGrowth: 24.3,
      monthlyImpressions: "18.6M",
      monthlyImpressionsGrowth: 28.6,
      yoyGrowth: 34.2,
      avgDwell: "2.8 min",
      peakHours: "9-11 AM, 5-8 PM",
      topCategory: "Tourism & Adventure",
      viewability: 87.3,
      hourlyData: [5, 15, 35, 55, 75, 85, 90, 85, 70, 65, 70, 80, 85, 75, 70, 75, 85, 90, 80, 55, 35, 20, 10, 5],
      description: "The capital of Sabah, known for its natural attractions and adventure tourism.",
      locations: [
        { name: "Jesselton Point", desc: "Ferry Terminal", traffic: 85000, screens: 28, score: 86 },
        { name: "Imago Shopping Mall", desc: "Premier Shopping", traffic: 120000, screens: 64, score: 89 },
      ],
      audience: [
        { name: "Tourists", percentage: 48, color: "bg-amber-500" },
        { name: "Families", percentage: 28, color: "bg-emerald-500" },
        { name: "Professionals", percentage: 16, color: "bg-blue-500" },
        { name: "Students", percentage: 8, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 35 },
        { name: "Transit Screens", percentage: 20 },
        { name: "Mall Networks", percentage: 35 },
        { name: "Street Furniture", percentage: 10 },
      ],
    },
  ]

  const currentMarket = keyMarkets[selectedMarket]

  const faqs = [
    {
      question: "What is DOOH advertising?",
      answer: "DOOH (Digital Out-of-Home) uses digital screens in public spaces to deliver dynamic, engaging ads that can be updated in real time.",
    },
    {
      question: "Why invest in OOH advertising in Malaysia?",
      answer: "Malaysia's cities, diverse population, and growing economy make it ideal for impactful campaigns that reach commuters, shoppers, and travelers.",
    },
    {
      question: "What types of OOH advertising are available?",
      answer: "Billboards, transit ads (buses, taxis, trains), street furniture, malls, airports, and digital billboards in high-traffic areas.",
    },
    {
      question: "How can I measure campaign effectiveness?",
      answer: "Track impressions, engagement rates, conversions, and real-time insights via programmatic DOOH analytics.",
    },
    {
      question: "What are the benefits of DOOH advertising?",
      answer: "High visibility, dynamic content, precise audience targeting, and actionable performance data.",
    },
    {
      question: "How does Moving Walls help advertisers in Malaysia?",
      answer: "Our Moving Audiences platform enables precise targeting, real-time analytics, and seamless campaign execution across DOOH networks.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Petronas Towers */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background Stars */}
        <div className="absolute inset-0">
          {[
            { left: 5, top: 10 }, { left: 15, top: 25 }, { left: 25, top: 5 }, { left: 35, top: 45 },
            { left: 45, top: 15 }, { left: 55, top: 35 }, { left: 65, top: 8 }, { left: 75, top: 55 },
            { left: 85, top: 20 }, { left: 95, top: 40 }, { left: 10, top: 60 }, { left: 20, top: 75 },
            { left: 30, top: 85 }, { left: 40, top: 65 }, { left: 50, top: 90 }, { left: 60, top: 70 },
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
                OOH Advertising in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Malaysia</span>
              </h1>
              <p className="text-lg md:text-xl text-mw-blue-100 max-w-xl mb-8 leading-relaxed">
                Leverage the power of OOH advertising in Malaysia to reach a wider audience through strategic outdoor placements.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-mw-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-50 transition-all hover:scale-105">
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - 3D Petronas Towers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <div className="relative w-[280px] h-[320px] sm:w-[350px] sm:h-[400px] md:w-[400px] md:h-[450px]">
                {/* City Glow Base */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-20 bg-gradient-to-t from-cyan-500/20 to-transparent blur-2xl" />
                
                {/* Twin Towers Container */}
                <div className="absolute inset-0 flex items-end justify-center gap-4 pb-8">
                  {/* Left Tower */}
                  <motion.div
                    className="relative"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Tower Structure */}
                    <div className="relative w-16 h-64 md:w-20 md:h-72">
                      {/* Tower Body */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-800 via-blue-600 to-cyan-400 rounded-t-full" 
                        style={{ clipPath: 'polygon(20% 100%, 80% 100%, 90% 20%, 50% 0%, 10% 20%)' }}>
                        {/* Window Lights */}
                        <div className="absolute inset-x-2 top-1/4 bottom-4 grid grid-cols-3 gap-1">
                          {[...Array(18)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="bg-yellow-200/60 rounded-sm"
                              animate={{ opacity: [0.3, 0.9, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Spire */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-cyan-400 to-white" />
                      <motion.div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full"
                        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}
                      />
                      {/* Digital Screen on Tower */}
                      <motion.div
                        className="absolute top-1/3 -right-3 w-6 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-500"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.6)' }}
                      />
                    </div>
                  </motion.div>

                  {/* Sky Bridge */}
                  <motion.div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-20 h-3 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}
                  />

                  {/* Right Tower */}
                  <motion.div
                    className="relative"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <div className="relative w-16 h-64 md:w-20 md:h-72">
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-800 via-blue-600 to-cyan-400 rounded-t-full"
                        style={{ clipPath: 'polygon(20% 100%, 80% 100%, 90% 20%, 50% 0%, 10% 20%)' }}>
                        <div className="absolute inset-x-2 top-1/4 bottom-4 grid grid-cols-3 gap-1">
                          {[...Array(18)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="bg-yellow-200/60 rounded-sm"
                              animate={{ opacity: [0.3, 0.9, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 + 0.5 }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-cyan-400 to-white" />
                      <motion.div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full"
                        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        style={{ boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}
                      />
                      <motion.div
                        className="absolute top-1/2 -left-3 w-6 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-500"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.6)' }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Surrounding Billboards */}
                {[
                  { x: -80, y: 60, delay: 0.3 },
                  { x: 80, y: 80, delay: 0.6 },
                  { x: -60, y: 140, delay: 0.9 },
                  { x: 70, y: 160, delay: 1.2 },
                ].map((billboard, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: `calc(50% + ${billboard.x}px)`, bottom: `${billboard.y}px` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: billboard.delay }}
                  >
                    <motion.div
                      className="w-8 h-6 rounded bg-gradient-to-br from-blue-400 to-cyan-500"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: billboard.delay }}
                      style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
                    />
                    <div className="w-0.5 h-4 bg-gray-500 mx-auto" />
                  </motion.div>
                ))}

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="lineGradientMY" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                      <stop offset="50%" stopColor="rgba(6, 182, 212, 0.6)" />
                      <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                    </linearGradient>
                  </defs>
                  {[
                    { x1: '35%', y1: '40%', x2: '15%', y2: '70%' },
                    { x1: '65%', y1: '40%', x2: '85%', y2: '65%' },
                    { x1: '35%', y1: '55%', x2: '20%', y2: '80%' },
                    { x1: '65%', y1: '55%', x2: '80%', y2: '75%' },
                  ].map((line, i) => (
                    <motion.line
                      key={i}
                      x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                      stroke="url(#lineGradientMY)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0.3, 0.7, 0.3] }}
                      transition={{ pathLength: { duration: 2, delay: i * 0.3 }, opacity: { duration: 2, repeat: Infinity, delay: i * 0.3 } }}
                    />
                  ))}
                </svg>


              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">33.4M+</div>
              <div className="text-gray-600">Population</div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">76%</div>
              <div className="text-gray-600">Urbanization Rate</div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">1.9M</div>
              <div className="text-gray-600">KL Residents</div>
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">4+</div>
              <div className="text-gray-600">Key Markets</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Digital Billboard Advertising Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Digital Billboard Advertising Malaysia
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Malaysia&apos;s dynamic market offers a rich tapestry of advertising opportunities. The country&apos;s population of over 33.4 million people is predominantly urban, with major cities experiencing rapid growth.
                </p>
                <p className="mb-4">
                  The Klang Valley, which includes Kuala Lumpur and its surrounding areas, contributes significantly to the nation&apos;s GDP and is a prime area for advertising.
                </p>
                <p>
                  The urbanization rate in Malaysia is about 76%, reflecting a high concentration of people in cities where consumer spending is robust.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-mw-blue-50 to-mw-blue-100 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Why Malaysia?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  {Icons.check}
                  <span className="text-gray-700">Strong consumer spending power driven by growing middle class</span>
                </li>
                <li className="flex items-start gap-3">
                  {Icons.check}
                  <span className="text-gray-700">Diverse population with mix of ethnicities and cultures</span>
                </li>
                <li className="flex items-start gap-3">
                  {Icons.check}
                  <span className="text-gray-700">High urban concentration ideal for OOH campaigns</span>
                </li>
                <li className="flex items-start gap-3">
                  {Icons.check}
                  <span className="text-gray-700">Increasing disposable incomes</span>
                </li>
                <li className="flex items-start gap-3">
                  {Icons.check}
                  <span className="text-gray-700">Well-developed transportation network (LRT, MRT, Monorail)</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* High-Visibility Billboards */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              High-Visibility Billboards in Malaysia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium outdoor advertising locations with maximum reach and impressions
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            {highVisibilityBillboards.map((billboard) => (
              <motion.div key={billboard.name} variants={staggerItem} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={billboard.image} 
                    alt={billboard.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-mw-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Premium Location
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{billboard.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{billboard.location}</p>
                  <p className="text-gray-600 text-sm mb-4">{billboard.description}</p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 text-mw-blue-600 mb-1">
                        {Icons.users}
                      </div>
                      <div className="text-lg font-bold text-gray-900">{billboard.reach}</div>
                      <div className="text-xs text-gray-500">Reach</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-mw-blue-600 mb-1">
                        {Icons.eye}
                      </div>
                      <div className="text-lg font-bold text-gray-900">{billboard.impressions}</div>
                      <div className="text-xs text-gray-500">Impressions</div>
                    </div>
                  </div>
                </div>
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
              <p className="text-gray-600">Real-time outdoor advertising metrics across Malaysia</p>
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
                      {/* Current Time Indicator - Small Dot with Tooltip */}
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

      {/* Success Story CTA */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-mw-blue-900 to-mw-blue-800 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
                  CASE STUDY
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Our DOOH Success Stories in Malaysia
                </h2>
                <p className="text-mw-blue-100 mb-6">
                  Moving Walls is a global leader in AdTech and MediaTech, providing enterprise software solutions for Out-of-Home advertising.
                </p>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 bg-white text-mw-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-50 transition-colors"
                >
                  View Case Study
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Explore Other Markets */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Other Markets
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover OOH advertising opportunities across global markets
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "United States", flag: "🇺🇸", href: "/locations/usa" },
              { name: "Singapore", flag: "🇸🇬", href: "/locations/singapore" },
              { name: "Indonesia", flag: "🇮🇩", href: "/locations/indonesia" },
              { name: "India", flag: "🇮🇳", href: "/locations/india" },
              { name: "Philippines", flag: "🇵🇭", href: "/locations/philippines" },
              { name: "Japan", flag: "🇯🇵", href: "/locations/japan" },
              { name: "Australia", flag: "🇦🇺", href: "/locations/australia" },
              { name: "Thailand", flag: "🇹🇭", href: "/locations/thailand" },
            ].map((country) => (
              <motion.div key={country.name} variants={staggerItem}>
                <Link
                  href={country.href}
                  className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-mw-blue-400 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{country.flag}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-mw-blue-600 transition-colors">
                        {country.name}
                      </h3>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              FAQs – Digital Out-of-Home Advertising in Malaysia
            </h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-mw-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={fadeUp} 
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Our Malaysia Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Get in touch with our local experts in Kuala Lumpur. We&apos;re here to help you plan your next DOOH campaign.
            </p>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
              <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 bg-mw-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Start Your Campaign?</h3>
                  <p className="text-gray-600 mb-6">Fill out our contact form and our Malaysia team will get back to you within 24 hours.</p>
                </div>
                <button
                  onClick={() => setIsContactFormOpen(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Open Contact Form
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsContactFormOpen(false)}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-mw-blue-600 to-mw-blue-700">
              <h3 className="text-lg font-semibold text-white">Contact Our Malaysia Team</h3>
              <button
                onClick={() => setIsContactFormOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Form iframe */}
            <div className="h-[70vh]">
              <iframe
                src="https://forms.zoho.com/movingwallsholdingpteltd/form/MalaysiaContact"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 'none' }}
                title="Malaysia Contact Form"
                allow="geolocation"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
