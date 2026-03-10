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

// Icons for FAQ
const Icons = {
  plus: <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  minus: <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>,
}

// FAQ Accordion Component
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <motion.div variants={staggerItem} className="border border-gray-200 rounded-lg overflow-hidden">
    <button onClick={onClick} className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
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

// SVG Icons for media types
const MediaIcons: Record<string, React.ReactElement> = {
  digital: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  train: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 4h8m-4 4v3m-4 0h8a1 1 0 001-1V6a1 1 0 00-1-1H7a1 1 0 00-1 1v11a1 1 0 001 1zm-3 0a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  ),
  building: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  screen: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  airport: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  store: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
}

export default function JapanPage() {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(0)
  const [selectedMarket, setSelectedMarket] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const currentTimePosition = ((currentTime.getHours() * 60 + currentTime.getMinutes()) / 1440) * 100
  const currentHour = currentTime.getHours()
  const currentTimeLabel = currentHour === 0 ? '12:00 AM' : currentHour < 12 ? `${currentHour}:${currentTime.getMinutes().toString().padStart(2, '0')} AM` : currentHour === 12 ? `12:${currentTime.getMinutes().toString().padStart(2, '0')} PM` : `${currentHour - 12}:${currentTime.getMinutes().toString().padStart(2, '0')} PM`

  const keyMarkets = [
    {
      city: "Tokyo",
      code: "TYO",
      population: "14.0M",
      screens: 6856,
      screensGrowth: 12,
      dailyReach: "22.5M",
      dailyReachGrowth: 8.5,
      monthlyImpressions: "675M",
      monthlyImpressionsGrowth: 14.8,
      yoyGrowth: 18.5,
      avgDwell: "2.2 min",
      peakHours: "7-10 AM, 5-9 PM",
      topCategory: "Tech & Fashion",
      viewability: 97.5,
      hourlyData: [12, 32, 85, 98, 88, 62, 52, 58, 75, 88, 85, 72, 58, 65, 78, 92, 98, 95, 82, 55, 38, 25, 15, 12],
      description: "Japan's capital and the world's largest metropolitan area with iconic Shibuya Crossing.",
      locations: [
        { name: "Shibuya Crossing", desc: "Iconic Intersection", traffic: 2850000, screens: 586, score: 99 },
        { name: "Shinjuku Station", desc: "Busiest Station", traffic: 2520000, screens: 485, score: 98 },
        { name: "Ginza", desc: "Luxury District", traffic: 1850000, screens: 385, score: 97 },
        { name: "Akihabara", desc: "Tech Hub", traffic: 1250000, screens: 286, score: 95 },
      ],
      audience: [
        { name: "Commuters", percentage: 42, color: "bg-blue-500" },
        { name: "Tourists", percentage: 25, color: "bg-amber-500" },
        { name: "Young Adults", percentage: 20, color: "bg-purple-500" },
        { name: "Professionals", percentage: 13, color: "bg-emerald-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 45 },
        { name: "Train Station Screens", percentage: 32 },
        { name: "Building Wraps", percentage: 15 },
        { name: "Street Furniture", percentage: 8 },
      ],
    },
    {
      city: "Osaka",
      code: "OSA",
      population: "2.7M",
      screens: 3256,
      screensGrowth: 15,
      dailyReach: "8.5M",
      dailyReachGrowth: 10.8,
      monthlyImpressions: "255M",
      monthlyImpressionsGrowth: 18.5,
      yoyGrowth: 22.8,
      avgDwell: "2.5 min",
      peakHours: "8-11 AM, 5-9 PM",
      topCategory: "Entertainment & F&B",
      viewability: 95.8,
      hourlyData: [10, 28, 78, 95, 85, 58, 48, 55, 72, 85, 88, 78, 62, 68, 78, 88, 95, 92, 78, 52, 35, 22, 12, 10],
      description: "Japan's kitchen and entertainment capital with vibrant Dotonbori district.",
      locations: [
        { name: "Dotonbori", desc: "Entertainment Hub", traffic: 1450000, screens: 425, score: 97 },
        { name: "Umeda Station", desc: "Transport Hub", traffic: 1250000, screens: 356, score: 96 },
      ],
      audience: [
        { name: "Tourists", percentage: 38, color: "bg-amber-500" },
        { name: "Commuters", percentage: 32, color: "bg-blue-500" },
        { name: "Young Adults", percentage: 18, color: "bg-purple-500" },
        { name: "Families", percentage: 12, color: "bg-emerald-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 42 },
        { name: "Train Station Screens", percentage: 28 },
        { name: "Mall Networks", percentage: 20 },
        { name: "Street Furniture", percentage: 10 },
      ],
    },
    {
      city: "Nagoya",
      code: "NGO",
      population: "2.3M",
      screens: 1856,
      screensGrowth: 18,
      dailyReach: "5.8M",
      dailyReachGrowth: 12.5,
      monthlyImpressions: "174M",
      monthlyImpressionsGrowth: 22.5,
      yoyGrowth: 26.8,
      avgDwell: "2.3 min",
      peakHours: "8-10 AM, 5-8 PM",
      topCategory: "Auto & Manufacturing",
      viewability: 94.2,
      hourlyData: [8, 25, 72, 92, 82, 55, 45, 52, 68, 82, 85, 72, 58, 62, 75, 85, 92, 88, 72, 48, 32, 20, 10, 8],
      description: "Japan's automotive capital and home to Toyota headquarters.",
      locations: [
        { name: "Nagoya Station", desc: "Central Hub", traffic: 920000, screens: 286, score: 95 },
        { name: "Sakae District", desc: "Shopping Area", traffic: 680000, screens: 225, score: 93 },
      ],
      audience: [
        { name: "Commuters", percentage: 40, color: "bg-blue-500" },
        { name: "Professionals", percentage: 28, color: "bg-emerald-500" },
        { name: "Families", percentage: 20, color: "bg-purple-500" },
        { name: "Tourists", percentage: 12, color: "bg-amber-500" },
      ],
      mediaFormats: [
        { name: "Train Station Screens", percentage: 38 },
        { name: "Digital Billboards", percentage: 35 },
        { name: "Mall Networks", percentage: 18 },
        { name: "Street Furniture", percentage: 9 },
      ],
    },
    {
      city: "Fukuoka",
      code: "FUK",
      population: "1.6M",
      screens: 1245,
      screensGrowth: 22,
      dailyReach: "3.8M",
      dailyReachGrowth: 15.8,
      monthlyImpressions: "114M",
      monthlyImpressionsGrowth: 28.5,
      yoyGrowth: 32.5,
      avgDwell: "2.6 min",
      peakHours: "9-11 AM, 5-8 PM",
      topCategory: "Startups & Tech",
      viewability: 93.5,
      hourlyData: [8, 22, 68, 88, 82, 58, 48, 55, 72, 85, 88, 78, 62, 68, 78, 88, 95, 92, 75, 52, 35, 22, 12, 8],
      description: "Kyushu's largest city and a major startup hub in Japan.",
      locations: [
        { name: "Tenjin District", desc: "Shopping Hub", traffic: 580000, screens: 186, score: 94 },
        { name: "Hakata Station", desc: "Transport Hub", traffic: 520000, screens: 165, score: 92 },
      ],
      audience: [
        { name: "Commuters", percentage: 35, color: "bg-blue-500" },
        { name: "Young Adults", percentage: 28, color: "bg-purple-500" },
        { name: "Tourists", percentage: 22, color: "bg-amber-500" },
        { name: "Families", percentage: 15, color: "bg-emerald-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 40 },
        { name: "Train Station Screens", percentage: 32 },
        { name: "Mall Networks", percentage: 18 },
        { name: "Street Furniture", percentage: 10 },
      ],
    },
  ]

  const currentMarket = keyMarkets[selectedMarket]

  const faqs = [
    {
      question: "What is DOOH advertising in Japan?",
      answer: "DOOH (Digital Out-of-Home) advertising in Japan uses high-tech digital screens in train stations, Shibuya Crossing, shopping districts, and urban centers to deliver dynamic, engaging ads with world-class display technology.",
    },
    {
      question: "Why invest in OOH advertising in Japan?",
      answer: "Japan's 126 million population, high urbanization, affluent consumers, and tech-savvy audience make it a premium OOH market. Iconic locations like Shibuya and Shinjuku offer unparalleled brand visibility.",
    },
    {
      question: "What types of OOH advertising are available in Japan?",
      answer: "Giant LED displays, train station digital networks (JR, Metro), wrapped trains, convenience store screens, shopping district billboards, airport advertising, and cutting-edge programmatic DOOH.",
    },
    {
      question: "How can I measure OOH campaign effectiveness in Japan?",
      answer: "Track impressions using train ridership data, mobile device IDs, Wi-Fi analytics, and real-time reporting through programmatic DOOH platforms like Moving Audiences.",
    },
    {
      question: "What are the key OOH markets in Japan?",
      answer: "Major markets include Tokyo (Shibuya, Shinjuku, Ginza), Osaka (Dotonbori, Umeda), Nagoya, Fukuoka, and Sapporo. Tokyo's train network reaches over 40 million daily passengers.",
    },
    {
      question: "How does MovingWalls help advertisers in Japan?",
      answer: "MovingWalls provides access to premium OOH inventory across Japan, with precise audience targeting, real-time analytics, and programmatic buying through our Moving Audiences platform.",
    },
  ]

  const countryData = {
    name: "Japan",
    description: "Japan's sophisticated advertising market and tech-savvy consumers make it ideal for innovative digital OOH campaigns in one of the world's most advanced markets.",
    stats: [
      { label: "Billboard Sites", value: "12,000+" },
      { label: "Digital Screens", value: "8,500+" },
      { label: "Monthly Reach", value: "95M+" },
      { label: "Major Cities", value: "50+" },
    ],
    majorCities: ["Tokyo", "Osaka", "Nagoya", "Yokohama", "Shibuya", "Shinjuku", "Kyoto", "Fukuoka"],
    mediaTypes: [
      { name: "Digital Billboards", icon: "digital", description: "Premium LED screens in urban centers" },
      { name: "Train Station Media", icon: "train", description: "JR and Metro station advertising" },
      { name: "Building Wraps", icon: "building", description: "Large-scale building facades" },
      { name: "Shibuya Screens", icon: "screen", description: "Iconic crossing digital displays" },
      { name: "Airport Media", icon: "airport", description: "Narita and Haneda networks" },
      { name: "Convenience Store", icon: "store", description: "In-store digital screens" },
    ],
    caseStudies: [
      { title: "Global Tech Launch", client: "International Tech Brand", results: "89% brand recognition in Tokyo" },
      { title: "Anime Collaboration", client: "Entertainment Company", results: "3.2M social media impressions" },
      { title: "Luxury Fashion Campaign", client: "European Fashion House", results: "56% lift in store visits" },
    ],
    partners: ["JR East Media", "Dentsu", "Hakuhodo", "Tokyo Metro Advertising"],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Shibuya Crossing */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background Stars */}
        <div className="absolute inset-0">
          {[
            { left: 5, top: 15 }, { left: 15, top: 28 }, { left: 25, top: 9 }, { left: 35, top: 55 },
            { left: 45, top: 17 }, { left: 55, top: 38 }, { left: 65, top: 13 }, { left: 75, top: 58 },
            { left: 85, top: 22 }, { left: 10, top: 66 }, { left: 20, top: 78 }, { left: 30, top: 70 },
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">{countryData.name}</span>
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

            {/* Right Side - 3D Shibuya Crossing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <div className="relative w-[280px] h-[320px] sm:w-[350px] sm:h-[400px] md:w-[400px] md:h-[450px]">
                {/* Crossing Ground Pattern */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[300px] h-[100px]" style={{ transform: 'rotateX(60deg) translateX(-50%)' }}>
                  {/* Zebra Crossings */}
                  {[0, 1, 2, 3].map((dir) => (
                    <div
                      key={dir}
                      className="absolute left-1/2 top-1/2 w-16 h-32"
                      style={{ 
                        transform: `translate(-50%, -50%) rotate(${dir * 45}deg)`,
                      }}
                    >
                      {[...Array(8)].map((_, si) => (
                        <div key={si} className={`h-3 mb-0.5 ${si % 2 === 0 ? 'bg-white/30' : 'bg-transparent'}`} />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Buildings with LED Screens */}
                {[
                  { x: -100, y: 60, h: 140, w: 55, screens: 2, delay: 0.3 },
                  { x: -40, y: 70, h: 160, w: 65, screens: 3, delay: 0.4 },
                  { x: 40, y: 65, h: 150, w: 60, screens: 2, delay: 0.5 },
                  { x: 100, y: 75, h: 130, w: 50, screens: 2, delay: 0.6 },
                ].map((bldg, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ 
                      left: `calc(50% + ${bldg.x}px)`,
                      bottom: `${bldg.y}px`,
                      transform: 'translateX(-50%)',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: bldg.delay }}
                  >
                    {/* Building Structure */}
                    <div 
                      className="bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 rounded-t relative"
                      style={{ width: `${bldg.w}px`, height: `${bldg.h}px` }}
                    >
                      {/* Window Grid */}
                      <div className="absolute inset-2 grid grid-cols-3 gap-0.5">
                        {[...Array(15)].map((_, wi) => (
                          <motion.div
                            key={wi}
                            className="bg-yellow-200/30 rounded-sm"
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: wi * 0.1 + i * 0.2 }}
                          />
                        ))}
                      </div>
                      
                      {/* LED Screens */}
                      {[...Array(bldg.screens)].map((_, si) => (
                        <motion.div
                          key={si}
                          className="absolute rounded"
                          style={{
                            left: '50%',
                            top: `${15 + si * 35}%`,
                            transform: 'translateX(-50%)',
                            width: `${bldg.w - 10}px`,
                            height: '28px',
                            background: `linear-gradient(${90 + si * 45}deg, ${['#ec4899', '#8b5cf6', '#06b6d4', '#10b981'][i % 4]}, ${['#f97316', '#6366f1', '#14b8a6', '#84cc16'][(i + 1) % 4]})`,
                            boxShadow: `0 0 20px ${['rgba(236, 72, 153, 0.6)', 'rgba(139, 92, 246, 0.6)', 'rgba(6, 182, 212, 0.6)', 'rgba(16, 185, 129, 0.6)'][i % 4]}`,
                          }}
                          animate={{ 
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: si * 0.5 }}
                        >
                          {/* Japanese Text Placeholder */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[8px] font-bold text-white">広告</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Rooftop Neon Signs */}
                    <motion.div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold"
                      style={{ 
                        color: ['#ec4899', '#8b5cf6', '#06b6d4', '#f97316'][i % 4],
                        textShadow: `0 0 10px ${['#ec4899', '#8b5cf6', '#06b6d4', '#f97316'][i % 4]}`,
                      }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ネオン
                    </motion.div>
                  </motion.div>
                ))}

                {/* Pedestrians (represented as dots) */}
                {[...Array(12)].map((i, idx) => (
                  <motion.div
                    key={`ped-${idx}`}
                    className="absolute w-2 h-2 bg-white/60 rounded-full"
                    style={{
                      left: `${40 + (idx % 4) * 8}%`,
                      bottom: `${20 + Math.floor(idx / 4) * 5}%`,
                    }}
                    animate={{
                      x: [0, (idx % 2 === 0 ? 1 : -1) * 30, 0],
                      y: [0, (idx % 3) * 10, 0],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 4 + (idx % 3),
                      repeat: Infinity,
                      delay: idx * 0.3,
                    }}
                  />
                ))}

                {/* Iconic Starbucks Building */}
                <motion.div
                  className="absolute bottom-[80px] left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="w-20 h-10 bg-gradient-to-t from-green-800 to-green-600 rounded-t">
                    <motion.div
                      className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-400 rounded-full"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)' }}
                    />
                  </div>
                </motion.div>


              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="py-12 bg-gray-50 border-b border-gray-200"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-8">{countryData.stats.map((stat) => (<motion.div key={stat.label} variants={staggerItem} className="text-center"><div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">{stat.value}</div><div className="text-gray-600">{stat.label}</div></motion.div>))}</div></div></motion.section>

      <section className="py-16 md:py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Media Types</h2><p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive OOH advertising solutions across {countryData.name}</p></motion.div><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{countryData.mediaTypes.map((media) => (<motion.div key={media.name} variants={staggerItem} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"><div className="mb-4">{MediaIcons[media.icon]}</div><h3 className="text-xl font-semibold text-gray-900 mb-2">{media.name}</h3><p className="text-gray-600">{media.description}</p></motion.div>))}</motion.div></div></section>

            <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="mb-8">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Key Markets Dashboard
              </h2>
              <p className="text-gray-600">Real-time outdoor advertising metrics across Japan</p>
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
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>{currentMarket.screensGrowth}%</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentMarket.screens.toLocaleString()}</div>
                <div className="text-gray-500 text-sm">Total Screens</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"><svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>{currentMarket.dailyReachGrowth}%</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentMarket.dailyReach}</div>
                <div className="text-gray-500 text-sm">Daily Reach</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"><svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>{currentMarket.monthlyImpressionsGrowth}%</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentMarket.monthlyImpressions}</div>
                <div className="text-gray-500 text-sm">Monthly Impressions</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center"><svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentMarket.population}</div>
                <div className="text-gray-500 text-sm">Population</div>
              </div>
            </div>

            {/* Performance Metrics & Peak Hours */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2"><svg className="w-5 h-5 text-mw-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>Performance Metrics</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Average Dwell Time</span><span className="font-semibold text-gray-900">{currentMarket.avgDwell}</span></div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Peak Hours</span><span className="font-semibold text-gray-900">{currentMarket.peakHours}</span></div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Top Category</span><span className="font-semibold text-gray-900">{currentMarket.topCategory}</span></div>
                  <div className="flex items-center justify-between py-3"><span className="text-gray-600">Viewability Rate</span><div className="flex items-center gap-3"><div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-mw-blue-600 rounded-full" style={{ width: `${currentMarket.viewability}%` }} /></div><span className="font-semibold text-gray-900">{currentMarket.viewability}%</span></div></div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6"><h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><svg className="w-5 h-5 text-mw-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Hourly Traffic Distribution</h4></div>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 -ml-1"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
                  <div className="ml-8">
                    <div className="absolute left-8 right-0 top-0 h-40 flex flex-col justify-between pointer-events-none">{[0, 1, 2, 3, 4].map((i) => (<div key={i} className="w-full border-t border-gray-100" />))}</div>
                    <div className="flex items-end justify-between h-40 gap-0.5 relative">
                      <motion.div className="absolute z-20 group cursor-pointer" style={{ left: `${currentTimePosition}%`, bottom: '0' }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}><div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"><div className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg"><div className="flex items-center gap-2"><span className="text-red-400">●</span><span>Current Time: {currentTimeLabel}</span></div></div><div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45" /></div><div className="relative -translate-x-1/2"><span className="absolute inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75 animate-ping" /><span className="relative inline-flex h-4 w-4 rounded-full bg-red-500 border-2 border-white shadow-lg" /></div></motion.div>
                      {currentMarket.hourlyData.map((value, i) => { const isPeak = value >= 85; const hour = i; const isCurrentHour = hour === currentHour; const timeLabel = hour === 0 ? '12AM' : hour < 12 ? `${hour}AM` : hour === 12 ? '12PM' : `${hour - 12}PM`; return (<div key={i} className={`flex-1 flex flex-col items-center group relative ${isCurrentHour ? 'z-10' : ''}`}><div className="absolute bottom-full mb-2 hidden group-hover:block z-10"><div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg"><div className="font-semibold">{timeLabel} {isCurrentHour && '(Now)'}</div><div className="text-gray-300">{value}% capacity</div></div><div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45" /></div><motion.div className={`w-full rounded-t-sm cursor-pointer transition-all duration-200 group-hover:opacity-80 ${isCurrentHour ? 'bg-gradient-to-t from-red-500 to-red-400 ring-2 ring-red-300 ring-offset-1' : isPeak ? 'bg-gradient-to-t from-amber-500 to-amber-400' : 'bg-gradient-to-t from-mw-blue-600 to-mw-blue-400'}`} initial={{ height: 0 }} animate={{ height: `${value}%` }} transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }} />{isPeak && !isCurrentHour && (<motion.div className="absolute -top-1 left-1/2 -translate-x-1/2" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.03 }}><div className="w-1.5 h-1.5 bg-amber-500 rounded-full" /></motion.div>)}</div>); })}
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-500"><span>12AM</span><span>3AM</span><span>6AM</span><span>9AM</span><span>12PM</span><span>3PM</span><span>6PM</span><span>9PM</span><span>12AM</span></div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-6 text-xs flex-wrap"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-t from-mw-blue-600 to-mw-blue-400" /><span className="text-gray-500">Normal Traffic</span></div><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-t from-amber-500 to-amber-400" /><span className="text-gray-500">Peak Traffic (≥85%)</span></div><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-t from-red-500 to-red-400" /><span className="text-gray-500">Current Hour</span></div></div>
              </div>
            </div>

            {/* Prime Locations Table */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6"><h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><svg className="w-5 h-5 text-mw-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>Prime Locations</h4><span className="text-gray-500 text-sm">{currentMarket.locations.length} zones available</span></div>
              <div className="hidden md:grid grid-cols-12 gap-4 py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 mb-2"><div className="col-span-1">#</div><div className="col-span-3">Location</div><div className="col-span-3">Description</div><div className="col-span-2 text-right">Daily Traffic</div><div className="col-span-1 text-right">Screens</div><div className="col-span-2 text-right">Score</div></div>
              <div className="space-y-2">{currentMarket.locations.map((loc, index) => (<motion.div key={loc.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="grid grid-cols-2 md:grid-cols-12 gap-4 py-4 px-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer group"><div className="hidden md:flex col-span-1 items-center"><span className="w-8 h-8 bg-mw-blue-100 text-mw-blue-600 rounded-lg flex items-center justify-center font-semibold text-sm group-hover:bg-mw-blue-600 group-hover:text-white transition-colors">{index + 1}</span></div><div className="col-span-1 md:col-span-3 flex items-center"><span className="font-semibold text-gray-900">{loc.name}</span></div><div className="col-span-1 md:col-span-3 flex items-center text-gray-600 text-sm">{loc.desc}</div><div className="hidden md:flex col-span-2 items-center justify-end font-medium text-gray-900">{(loc.traffic / 1000).toFixed(0)}K</div><div className="hidden md:flex col-span-1 items-center justify-end"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">{loc.screens}</span></div><div className="hidden md:flex col-span-2 items-center justify-end gap-2"><div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-mw-blue-500 to-mw-blue-600 rounded-full" initial={{ width: 0 }} animate={{ width: `${loc.score}%` }} transition={{ duration: 0.8, delay: index * 0.1 }} /></div><span className="font-semibold text-gray-900 w-8">{loc.score}</span></div></motion.div>))}</div>
            </div>

            {/* Audience & Media Format */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"><h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2"><svg className="w-5 h-5 text-mw-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>Audience Breakdown</h4><div className="space-y-4">{currentMarket.audience.map((segment, index) => (<div key={segment.name} className="flex items-center gap-4"><div className={`w-3 h-3 rounded-full ${segment.color}`} /><span className="flex-1 text-gray-700">{segment.name}</span><div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden"><motion.div className={`h-full ${segment.color} rounded-full`} initial={{ width: 0 }} animate={{ width: `${segment.percentage}%` }} transition={{ duration: 0.8, delay: index * 0.1 }} /></div><span className="font-semibold text-gray-900 w-12 text-right">{segment.percentage}%</span></div>))}</div></div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"><h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2"><svg className="w-5 h-5 text-mw-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>Media Format Mix</h4><div className="space-y-4">{currentMarket.mediaFormats.map((format, index) => (<div key={format.name}><div className="flex items-center justify-between mb-2"><span className="text-gray-700">{format.name}</span><span className="font-semibold text-gray-900">{format.percentage}%</span></div><div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-mw-blue-500 to-mw-blue-600 rounded-full" initial={{ width: 0 }} animate={{ width: `${format.percentage}%` }} transition={{ duration: 0.8, delay: index * 0.1 }} /></div></div>))}</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Coverage Areas</h2><p className="text-lg text-gray-600">Major cities with billboard inventory</p></motion.div><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="flex flex-wrap justify-center gap-4">{countryData.majorCities.map((city) => (<motion.div key={city} variants={staggerItem} className="bg-white border border-gray-200 rounded-full px-6 py-3 flex items-center gap-2"><svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span className="font-medium text-gray-900">{city}</span></motion.div>))}</motion.div></div></section>

      <section className="py-16 md:py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2></motion.div><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">{countryData.caseStudies.map((study) => (<motion.div key={study.title} variants={staggerItem} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"><div className="h-48 bg-gradient-to-br from-mw-blue-100 to-mw-blue-200 flex items-center justify-center"><svg className="w-16 h-16 text-mw-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div><div className="p-6"><h3 className="text-lg font-semibold text-gray-900 mb-2">{study.title}</h3><p className="text-sm text-gray-500 mb-3">{study.client}</p><div className="flex items-center gap-2 text-mw-blue-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg><span className="font-medium">{study.results}</span></div></div></motion.div>))}</motion.div></div></section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="py-16 md:py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Media Partners</h2></div><div className="flex flex-wrap justify-center gap-6">{countryData.partners.map((partner) => (<div key={partner} className="bg-white border border-gray-200 rounded-lg px-8 py-4"><span className="font-medium text-gray-700">{partner}</span></div>))}</div></div></motion.section>

      {/* Explore Other Markets */}
      <section className="py-16 md:py-20 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Other Markets</h2><p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover OOH advertising opportunities across global markets</p></motion.div><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">{[{ name: "Malaysia", flag: "🇲🇾", href: "/locations/malaysia" },{ name: "Singapore", flag: "🇸🇬", href: "/locations/singapore" },{ name: "Indonesia", flag: "🇮🇩", href: "/locations/indonesia" },{ name: "India", flag: "🇮🇳", href: "/locations/india" },{ name: "Philippines", flag: "🇵🇭", href: "/locations/philippines" },{ name: "Australia", flag: "🇦🇺", href: "/locations/australia" },{ name: "Thailand", flag: "🇹🇭", href: "/locations/thailand" },{ name: "Sri Lanka", flag: "🇱🇰", href: "/locations/sri-lanka" }].map((country) => (<motion.div key={country.name} variants={staggerItem}><Link href={country.href} className="block bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-mw-blue-400 transition-all group"><div className="flex items-center gap-4"><span className="text-4xl">{country.flag}</span><div><h3 className="font-semibold text-gray-900 group-hover:text-mw-blue-600 transition-colors">{country.name}</h3><p className="text-sm text-gray-500">View billboards →</p></div></div></Link></motion.div>))}</motion.div></div></section>

      {/* FAQs */}
      <section className="py-16 md:py-20"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">FAQs – OOH Advertising in Japan</h2></motion.div><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-4">{faqs.map((faq, index) => (<FAQItem key={index} question={faq.question} answer={faq.answer} isOpen={openFAQ === index} onClick={() => setOpenFAQ(openFAQ === index ? null : index)} />))}</motion.div></div></section>

    </div>
  )
}
