'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LocationData } from '@/data/staticLocationData'
import { CTAButton } from './CTAButton'

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

// Media type icon mapping
const mediaTypeIcons: Record<string, JSX.Element> = {
  digital: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  transit: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2m0-8h-4" />
    </svg>
  ),
  mall: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  static: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  highway: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  airport: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  bus: (
    <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
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

interface LocationDetailClientProps {
  initialData: LocationData
}

export default function LocationDetailClient({ initialData }: LocationDetailClientProps) {
  const location = initialData
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const [selectedMarket, setSelectedMarket] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  // Update current time every minute for the chart indicator
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Calculate current time position
  const currentTimePosition = ((currentTime.getHours() * 60 + currentTime.getMinutes()) / 1440) * 100
  const currentHour = currentTime.getHours()
  const currentTimeLabel = currentHour === 0 ? '12:00 AM' : currentHour < 12 ? `${currentHour}:${currentTime.getMinutes().toString().padStart(2, '0')} AM` : currentHour === 12 ? `12:${currentTime.getMinutes().toString().padStart(2, '0')} PM` : `${currentHour - 12}:${currentTime.getMinutes().toString().padStart(2, '0')} PM`

  const currentMarket = location.keyMarkets?.[selectedMarket]

  // Render location page
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[
            { left: 5, top: 10 }, { left: 15, top: 25 }, { left: 25, top: 5 }, { left: 35, top: 45 },
            { left: 45, top: 15 }, { left: 55, top: 35 }, { left: 65, top: 8 }, { left: 75, top: 55 },
            { left: 85, top: 20 }, { left: 95, top: 40 }, { left: 10, top: 60 }, { left: 20, top: 75 },
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                OOH Advertising in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                  {location.name}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-mw-blue-100 max-w-xl mb-8 leading-relaxed">
                {location.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {location.contactFormUrl ? (
                  <button 
                    onClick={() => setIsContactFormOpen(true)}
                    className="inline-flex items-center gap-2 bg-white text-mw-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-50 transition-all hover:scale-105"
                  >
                    Get Started
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                ) : (
                  <CTAButton href="/contact" className="inline-flex items-center gap-2 bg-white text-mw-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-50 transition-all hover:scale-105">
                    Get Started
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </CTAButton>
                )}
                <Link href="/locations" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                  All Locations
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block"
            >
              {location.stats && location.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {location.stats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-mw-blue-200 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Mobile */}
      {location.stats && location.stats.length > 0 && (
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={staggerContainer} 
          className="py-12 bg-gray-50 border-b border-gray-200 lg:hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {location.stats.map((stat, index) => (
                <motion.div key={index} variants={staggerItem} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* High Visibility Billboards */}
      {location.highVisibilityBillboards && location.highVisibilityBillboards.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">High Visibility Billboards</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Premium advertising locations with maximum exposure</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {location.highVisibilityBillboards.map((billboard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  {billboard.image && (
                    <div className="h-48 bg-gradient-to-br from-mw-blue-100 to-mw-blue-50 relative">
                      <img 
                        src={billboard.image} 
                        alt={billboard.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{billboard.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      {Icons.location}
                      <span>{billboard.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{billboard.description}</p>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-lg font-bold text-mw-blue-600">{billboard.reach}</div>
                        <div className="text-xs text-gray-500">Daily Reach</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-mw-blue-600">{billboard.impressions}</div>
                        <div className="text-xs text-gray-500">Monthly Impressions</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Markets Section */}
      {location.keyMarkets && location.keyMarkets.length > 0 && currentMarket && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Markets</h2>
              <p className="text-lg text-gray-600">Explore OOH opportunities across major cities</p>
            </motion.div>

            {/* Market Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {location.keyMarkets.map((market, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMarket(index)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                    selectedMarket === index
                      ? 'bg-mw-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-mw-blue-50'
                  }`}
                >
                  {market.city}
                </button>
              ))}
            </div>

            {/* Market Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-mw-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-mw-blue-600">{currentMarket.screens?.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Screens</div>
                  {currentMarket.screensGrowth && (
                    <div className="text-xs text-green-600 mt-1">+{currentMarket.screensGrowth}% YoY</div>
                  )}
                </div>
                <div className="text-center p-4 bg-mw-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-mw-blue-600">{currentMarket.dailyReach}</div>
                  <div className="text-sm text-gray-600">Daily Reach</div>
                  {currentMarket.dailyReachGrowth && (
                    <div className="text-xs text-green-600 mt-1">+{currentMarket.dailyReachGrowth}% YoY</div>
                  )}
                </div>
                <div className="text-center p-4 bg-mw-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-mw-blue-600">{currentMarket.monthlyImpressions}</div>
                  <div className="text-sm text-gray-600">Monthly Impressions</div>
                </div>
                <div className="text-center p-4 bg-mw-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-mw-blue-600">{currentMarket.viewability}%</div>
                  <div className="text-sm text-gray-600">Viewability</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{currentMarket.description}</p>

              {/* Hourly Traffic Chart */}
              {currentMarket.hourlyData && (
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">24-Hour Traffic Pattern</h4>
                  <div className="relative h-32 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-end justify-between h-full gap-1">
                      {currentMarket.hourlyData.map((value: number, index: number) => (
                        <div
                          key={index}
                          className="flex-1 bg-mw-blue-600 rounded-t transition-all hover:bg-mw-blue-500"
                          style={{ height: `${value}%` }}
                          title={`${index}:00 - ${value}%`}
                        />
                      ))}
                    </div>
                    {/* Current time indicator */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-red-500"
                      style={{ left: `${currentTimePosition}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-red-500 whitespace-nowrap">
                        {currentTimeLabel}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>12AM</span>
                    <span>6AM</span>
                    <span>12PM</span>
                    <span>6PM</span>
                    <span>12AM</span>
                  </div>
                </div>
              )}

              {/* Top Locations */}
              {currentMarket.locations && currentMarket.locations.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Top Locations</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentMarket.locations.map((loc: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{loc.name}</div>
                          <div className="text-sm text-gray-500">{loc.desc}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-mw-blue-600">{loc.screens} screens</div>
                          <div className="text-xs text-gray-500">{loc.traffic?.toLocaleString()} daily traffic</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Audience & Media Formats */}
              <div className="grid md:grid-cols-2 gap-8">
                {currentMarket.audience && currentMarket.audience.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Audience Breakdown</h4>
                    <div className="space-y-3">
                      {currentMarket.audience.map((segment: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">{segment.name}</span>
                            <span className="font-medium">{segment.percentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${segment.color} rounded-full`}
                              style={{ width: `${segment.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentMarket.mediaFormats && currentMarket.mediaFormats.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Media Formats</h4>
                    <div className="space-y-3">
                      {currentMarket.mediaFormats.map((format: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">{format.name}</span>
                            <span className="font-medium">{format.percentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-mw-blue-600 rounded-full"
                              style={{ width: `${format.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Media Types */}
      {location.mediaTypes && location.mediaTypes.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Media Types Available</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {location.mediaTypes.map((media, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">
                    {mediaTypeIcons[media.icon] || mediaTypeIcons.digital}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{media.name}</h3>
                  <p className="text-gray-600">{media.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {location.faqs && location.faqs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={staggerContainer}
              className="space-y-4"
            >
              {location.faqs.map((faq, index) => (
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
      )}

      {/* Contact Form Modal */}
      {isContactFormOpen && location.contactFormUrl && (
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
              <h3 className="text-lg font-semibold text-white">Contact Our {location.name} Team</h3>
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
                src={location.contactFormUrl}
                width="100%"
                height="100%"
                frameBorder={0}
                style={{ border: 'none' }}
                title={`${location.name} Contact Form`}
                allow="geolocation"
              />
            </div>
          </motion.div>
        </div>
      )}

    </main>
  )
}
