'use client'

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

// OOH Format type
export interface OOHFormat {
  name: string
  category: string
  icon: string
  description: string
  longDescription: string
  specs: string[]
  benefits: string[]
  image: string
  video?: string
}

interface OOHFormatsPageClientProps {
  oohFormats: OOHFormat[]
}

// Static FAQs
const faqs = [
  {
    question: "What is OOH advertising?",
    answer: "OOH (Out-of-Home) advertising refers to any visual advertising media found outside of the home. This includes billboards, transit ads, street furniture, place-based media, and digital signage that reaches consumers while they are on the go.",
  },
  {
    question: "What is the difference between OOH and DOOH?",
    answer: "OOH encompasses all out-of-home advertising formats, while DOOH (Digital Out-of-Home) specifically refers to digital screens and displays. DOOH offers advantages like dynamic content, real-time updates, programmatic buying, and audience targeting capabilities.",
  },
  {
    question: "Which OOH format is best for my campaign?",
    answer: "The best format depends on your campaign objectives, target audience, budget, and geographic requirements. Billboards are great for broad awareness, transit ads reach commuters, place-based media targets specific contexts, and digital formats offer flexibility and targeting.",
  },
  {
    question: "How is OOH advertising effectiveness measured?",
    answer: "OOH effectiveness is measured through impressions, reach, frequency, and engagement metrics. Modern measurement includes mobile device tracking, eye-tracking studies, foot traffic attribution, and brand lift studies to quantify campaign impact.",
  },
  {
    question: "Can OOH advertising be targeted?",
    answer: "Yes, especially with DOOH. Targeting options include geographic targeting, dayparting (time-based), demographic targeting based on location data, contextual targeting (weather, events), and programmatic buying based on audience data.",
  },
  {
    question: "What is programmatic DOOH?",
    answer: "Programmatic DOOH allows advertisers to buy digital out-of-home inventory through automated, data-driven processes similar to online advertising. It enables real-time bidding, audience targeting, and dynamic content delivery across digital screens.",
  },
]

export default function OOHFormatsPageClient({ oohFormats }: OOHFormatsPageClientProps) {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Out-of-Home Advertising Demystified
                </h1>
                <p className="text-mw-blue-200 text-lg">Learn the basics of outdoor advertising and become an expert</p>
              </motion.div>
              <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-xl text-mw-blue-100 max-w-3xl mb-10">
                Unlock the basics of outdoor advertising with our comprehensive guide. Discover the most effective OOH formats to reach your target audience.
              </motion.p>
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-mw-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-50 transition-colors">
                  Plan Your Campaign
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link href="/locations" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  View Locations
                </Link>
              </motion.div>
            </div>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hidden lg:block">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                    <p className="text-white/80 text-sm">Watch OOH Formats Overview</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-mw-blue-900/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Format Sections - Alternating Layout */}
      {oohFormats.map((format, index) => {
        const isEven = index % 2 === 0
        
        return (
          <section
            key={format.name}
            id={index === 0 || oohFormats[index - 1]?.category !== format.category 
              ? format.category.toLowerCase().replace(/[^a-z0-9]/g, '-') 
              : undefined}
            className={`py-10 md:py-14 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* Content Side */}
                <motion.div variants={staggerItem} className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {format.name}
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {format.longDescription}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-8 mb-8">
                    {/* Specifications Timeline */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Specifications
                      </h4>
                      <div className="relative">
                        <motion.div 
                          initial={{ height: 0 }}
                          whileInView={{ height: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="absolute left-[7px] top-0 w-0.5 bg-gradient-to-b from-mw-blue-400 to-mw-blue-200"
                        />
                        <ul className="space-y-3">
                          {format.specs?.map((spec, i) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1, duration: 0.4 }}
                              className="text-sm text-gray-600 flex items-start gap-3 relative group"
                            >
                              <motion.span 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + 0.1, type: 'spring', stiffness: 300 }}
                                className="w-4 h-4 rounded-full bg-mw-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:bg-mw-blue-600 transition-colors"
                              >
                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <motion.path 
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={3} 
                                    d="M5 13l4 4L19 7" 
                                  />
                                </svg>
                              </motion.span>
                              <span className="group-hover:text-gray-900 transition-colors">{spec}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Key Benefits Timeline */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Key Benefits
                      </h4>
                      <div className="relative">
                        <motion.div 
                          initial={{ height: 0 }}
                          whileInView={{ height: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                          className="absolute left-[7px] top-0 w-0.5 bg-gradient-to-b from-green-400 to-green-200"
                        />
                        <ul className="space-y-3">
                          {format.benefits?.map((benefit, i) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                              className="text-sm text-gray-600 flex items-start gap-3 relative group"
                            >
                              <motion.span 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + 0.4, type: 'spring', stiffness: 300 }}
                                className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:bg-green-600 transition-colors"
                              >
                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <motion.path 
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.5, duration: 0.3 }}
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={3} 
                                    d="M5 13l4 4L19 7" 
                                  />
                                </svg>
                              </motion.span>
                              <span className="group-hover:text-gray-900 transition-colors">{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-mw-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-700 transition-colors"
                  >
                    Inquire About This Format
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>

                {/* Image/Video Side */}
                <motion.div variants={staggerItem} className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                    {/* Real Image */}
                    <img 
                      src={format.image} 
                      alt={format.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    {/* Format Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-semibold text-lg">{format.name}</p>
                      <p className="text-white/80 text-sm">{format.category}</p>
                    </div>
                    {/* Play button for video formats */}
                    {format.video && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white hover:scale-110 transition-all shadow-lg">
                          <svg className="w-7 h-7 text-mw-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Separator line between formats in same category */}
            {index < oohFormats.length - 1 && oohFormats[index + 1]?.category === format.category && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="border-t border-gray-200"></div>
              </div>
            )}
          </section>
        )
      })}

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about OOH advertising formats
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
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
    </div>
  )
}
