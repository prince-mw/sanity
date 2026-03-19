'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import TestimonialSectionClient from '@/components/TestimonialSectionClient'

// Types for CMS-managed content
interface BrandsPageProps {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  stats?: Array<{ value: string; label: string }>;
  benefits?: Array<{ title: string; description: string }>;
  platformFeatures?: Array<{
    id: string;
    name: string;
    title: string;
    description: string;
    linkHref?: string;
    linkText?: string;
  }>;
  faqs?: Array<{ question: string; answer: string }>;
  testimonials?: Array<{
    _id?: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    metric?: string;
    industry?: string;
    image?: { asset: { _ref: string } };
    companyLogo?: { asset: { _ref: string } };
  }>;
}

// Default values for fallback
const defaultContent = {
  title: "OOH Advertising",
  titleHighlight: "Made Simple",
  subtitle: "Launch measurable outdoor campaigns across cities and continents from one connected platform. From brief to live in minutes. From impression to impact with clarity.",
  primaryCTA: { text: "Get A Demo", href: "/contact" },
  secondaryCTA: { text: "Learn More", href: "#features" },
  stats: [
    { value: "10x", label: "Faster Campaign Launch" },
    { value: "85%", label: "Planning Time Saved" },
    { value: "3.5x", label: "Average ROAS" },
    { value: "100%", label: "Campaign Visibility" },
  ],
  benefits: [
    { title: "Simplified Workflow", description: "Launch campaigns in minutes, not weeks" },
    { title: "Global Reach", description: "Access inventory across multiple continents" },
    { title: "Full Attribution", description: "Connect OOH to sales and conversions" },
    { title: "Real-time Optimization", description: "Adjust campaigns based on performance data" },
  ],
  platformFeatures: [
    {
      id: "campaigns",
      name: "Campaign Creation",
      title: "Create and Launch in Minutes",
      description: "Turn your brief into an optimised OOH proposal instantly. Define your audience, set campaign objectives, select markets, and activate with one click.",
      linkHref: "/mw-planner",
      linkText: "Learn more",
    },
    {
      id: "realtime",
      name: "Real Time Activation",
      title: "Activate Campaigns Instantly",
      description: "Deploy your campaigns across multiple markets simultaneously with real-time activation and dynamic content updates.",
      linkHref: "/mw-activate",
      linkText: "Learn more",
    },
    {
      id: "measurement",
      name: "Full Funnel Measurement",
      title: "Measure Every Impact",
      description: "Track awareness, consideration, and conversion with comprehensive measurement tools that connect OOH exposure to business outcomes.",
      linkHref: "/mw-measure",
      linkText: "Learn more",
    },
  ],
  faqs: [
    {
      question: "How quickly can I launch my first campaign?",
      answer: "Most brands launch their first campaign within 24-48 hours. Our platform streamlines the entire process from planning to activation, eliminating the typical weeks-long setup time."
    },
    {
      question: "What's the minimum budget required?",
      answer: "We work with brands of all sizes. Campaigns can start from as low as $5,000, making premium OOH advertising accessible to emerging brands and enterprises alike."
    },
    {
      question: "Do you support international campaigns?",
      answer: "Yes! We have inventory in 180+ countries across 2,500+ cities. Our platform makes it easy to launch and manage multi-market campaigns from a single dashboard."
    },
    {
      question: "How do you measure campaign performance?",
      answer: "We provide real-time analytics including impressions, reach, frequency, attribution tracking, and foot traffic lift. Our MW Measure platform integrates with your existing analytics tools for comprehensive reporting."
    },
    {
      question: "Can I integrate Moving Walls with my existing marketing stack?",
      answer: "Absolutely. We offer integrations with major CRM, DSP, analytics, and creative platforms. Our API also allows for custom integrations with your proprietary systems."
    }
  ],
};

export default function BrandsPageClient(props: BrandsPageProps) {
  // Merge props with defaults
  const content = {
    title: props.title || defaultContent.title,
    titleHighlight: props.titleHighlight || defaultContent.titleHighlight,
    subtitle: props.subtitle || defaultContent.subtitle,
    primaryCTA: props.primaryCTA || defaultContent.primaryCTA,
    secondaryCTA: props.secondaryCTA || defaultContent.secondaryCTA,
    stats: props.stats?.length ? props.stats : defaultContent.stats,
    benefits: props.benefits?.length ? props.benefits : defaultContent.benefits,
    platformFeatures: props.platformFeatures?.length ? props.platformFeatures : defaultContent.platformFeatures,
    faqs: props.faqs?.length ? props.faqs : defaultContent.faqs,
  };

  const [activeTab, setActiveTab] = useState('retail')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activePlatform, setActivePlatform] = useState('campaigns')
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Globe */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-700 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background Stars - Fixed positions to avoid hydration mismatch */}
        <div className="absolute inset-0">
          {[
            { left: 5, top: 10 }, { left: 15, top: 25 }, { left: 25, top: 5 }, { left: 35, top: 45 },
            { left: 45, top: 15 }, { left: 55, top: 35 }, { left: 65, top: 8 }, { left: 75, top: 55 },
            { left: 85, top: 20 }, { left: 95, top: 40 }, { left: 10, top: 60 }, { left: 20, top: 75 },
            { left: 30, top: 85 }, { left: 40, top: 65 }, { left: 50, top: 90 }, { left: 60, top: 70 },
            { left: 70, top: 80 }, { left: 80, top: 95 }, { left: 90, top: 72 }, { left: 8, top: 88 },
            { left: 18, top: 42 }, { left: 28, top: 58 }, { left: 38, top: 22 }, { left: 48, top: 78 },
            { left: 58, top: 12 }, { left: 68, top: 48 }, { left: 78, top: 32 }, { left: 88, top: 62 },
            { left: 3, top: 35 }, { left: 13, top: 92 }, { left: 23, top: 18 }, { left: 33, top: 52 },
            { left: 43, top: 28 }, { left: 53, top: 82 }, { left: 63, top: 38 }, { left: 73, top: 68 },
            { left: 83, top: 15 }, { left: 93, top: 58 }, { left: 7, top: 72 }, { left: 17, top: 48 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: (i % 5) * 0.4,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {content.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                  {content.titleHighlight}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-mw-blue-100 max-w-xl mb-8 leading-relaxed">
                {content.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={content.primaryCTA.href}
                  className="inline-flex items-center justify-center gap-2 bg-white text-mw-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-mw-gray-50 transition-all hover:scale-105 shadow-lg"
                >
                  {content.primaryCTA.text}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Interactive 3D Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px]">
                {/* Outer Glow Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Orbital Ring 1 */}
                <motion.div
                  className="absolute inset-4 rounded-full border border-cyan-300/20"
                  style={{ transform: 'rotateX(60deg)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div 
                    className="absolute -top-2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Orbital Ring 2 */}
                <motion.div
                  className="absolute inset-8 rounded-full border border-blue-300/20"
                  style={{ transform: 'rotateX(75deg) rotateY(20deg)' }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div 
                    className="absolute -bottom-2 right-1/4 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>

                {/* Main Globe */}
                <motion.div
                  className="absolute inset-12 rounded-full bg-gradient-to-br from-mw-blue-600 via-mw-blue-700 to-mw-blue-900 shadow-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  style={{
                    boxShadow: '0 0 60px rgba(6, 182, 212, 0.3), inset -20px -20px 60px rgba(0,0,0,0.3), inset 20px 20px 60px rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Globe Grid Lines */}
                  <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
                    {/* Horizontal Lines */}
                    {[20, 40, 60, 80].map((top, i) => (
                      <div key={`h-${i}`} className="absolute w-full h-px bg-cyan-300" style={{ top: `${top}%` }} />
                    ))}
                    {/* Vertical Lines */}
                    {[20, 40, 60, 80].map((left, i) => (
                      <div key={`v-${i}`} className="absolute h-full w-px bg-cyan-300" style={{ left: `${left}%` }} />
                    ))}
                  </div>

                  {/* Glowing Location Dots - Major Cities */}
                  {[
                    { top: '25%', left: '70%', size: 'lg', delay: 0 },     // Tokyo
                    { top: '35%', left: '15%', size: 'md', delay: 0.5 },   // New York
                    { top: '30%', left: '45%', size: 'lg', delay: 1 },     // London
                    { top: '60%', left: '75%', size: 'md', delay: 1.5 },   // Sydney
                    { top: '40%', left: '55%', size: 'sm', delay: 2 },     // Dubai
                    { top: '45%', left: '25%', size: 'md', delay: 2.5 },   // LA
                    { top: '50%', left: '65%', size: 'lg', delay: 3 },     // Singapore
                    { top: '35%', left: '48%', size: 'sm', delay: 3.5 },   // Paris
                    { top: '55%', left: '35%', size: 'md', delay: 4 },     // São Paulo
                    { top: '28%', left: '58%', size: 'sm', delay: 4.5 },   // Mumbai
                  ].map((dot, i) => (
                    <motion.div
                      key={i}
                      className={`absolute rounded-full ${
                        dot.size === 'lg' ? 'w-4 h-4' : dot.size === 'md' ? 'w-3 h-3' : 'w-2 h-2'
                      }`}
                      style={{ top: dot.top, left: dot.left }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: dot.delay,
                      }}
                    >
                      <div className="w-full h-full bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/80" />
                      <motion.div
                        className="absolute inset-0 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: dot.delay }}
                      />
                    </motion.div>
                  ))}
                </motion.div>


              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-24 bg-gradient-to-b from-white via-mw-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-mw-gray-900 mb-6">
              Plan. Activate. Measure.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-blue-600 to-cyan-500">All in One Place.</span>
            </h2>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto leading-relaxed">
              The outdoors has always delivered attention. What it lacked was speed and accountability.
              Moving Walls connects planning, booking, activation, and attribution into one streamlined workflow. No manual coordination. No disconnected systems. No blind spending.
            </p>
          </motion.div>

          {/* Top Tabs - Campaigns, Real Time, Measurement */}
          <div className="flex justify-center mb-16 px-4">
            <div className="inline-flex flex-wrap justify-center border border-mw-gray-200 p-1.5 rounded-xl gap-1">
              {[
                { id: 'campaigns', name: 'Campaign Creation', icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )},
                { id: 'realtime', name: 'Real Time Activation', icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )},
                { id: 'measurement', name: 'Full Funnel Measurement', icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )},
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatform(tab.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-base ${
                    activePlatform === tab.id
                      ? 'bg-mw-blue-600 text-white'
                      : 'text-mw-gray-600 hover:text-mw-blue-600 hover:bg-mw-gray-50'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content - Left text, Right image */}
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
              {activePlatform === 'campaigns' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-mw-gray-900 mb-4">
                    Create and Launch in Minutes
                  </h3>
                  <p className="text-lg text-mw-gray-600 leading-relaxed mb-8">
                    Turn your brief into an optimised OOH proposal instantly.
                  </p>
                  
                  {/* Horizontal/Vertical Pipeline Steps */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
                    {[
                      { label: 'Define your audience', icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )},
                      { label: 'Set campaign objectives', icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )},
                      { label: 'Select markets', icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )},
                      { label: 'Activate with one click', icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )},
                    ].map((step, i) => (
                      <div key={i} className="flex items-center sm:flex-1 w-full sm:w-auto">
                        <div className="flex flex-row sm:flex-col items-center sm:text-center gap-3 sm:gap-0">
                          <div className="relative flex-shrink-0">
                            {/* Ripple ring when active */}
                            {activeStep === i && (
                              <motion.div
                                className="absolute inset-0 rounded-full border-2 border-mw-blue-400"
                                initial={{ scale: 1, opacity: 0.8 }}
                                animate={{ scale: 1.8, opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
                              />
                            )}
                            <motion.div
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center sm:mb-2 transition-colors duration-300 ${
                                activeStep === i
                                  ? 'bg-mw-blue-600 text-white shadow-lg shadow-blue-300'
                                  : 'bg-mw-blue-50 text-mw-blue-600 border-2 border-mw-blue-200'
                              }`}
                              animate={activeStep === i ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                              transition={{ duration: 0.6, ease: 'easeInOut' }}
                            >
                              {step.icon}
                            </motion.div>
                          </div>
                          <span className={`text-xs font-semibold sm:max-w-[100px] leading-tight transition-colors duration-300 ${
                            activeStep === i ? 'text-mw-blue-700' : 'text-mw-gray-700'
                          }`}>{step.label}</span>
                        </div>
                        {i < 3 && (
                          <div className="hidden sm:block flex-1 mx-2 mt-[-20px]">
                            <div className="h-0.5 bg-gradient-to-r from-mw-blue-200 to-mw-blue-300 relative overflow-hidden">
                              {/* Animated fill when transitioning from this step */}
                              {activeStep > i && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-mw-blue-500 to-mw-blue-600"
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ duration: 0.4 }}
                                  style={{ transformOrigin: 'left' }}
                                />
                              )}
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-mw-blue-400" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="text-base text-mw-gray-500 leading-relaxed border-l-4 border-mw-blue-400 pl-4">
                    Our platform evaluates movement patterns, historical performance, and contextual signals to recommend high-impact inventory aligned to your goals.
                  </p>
                </motion.div>
              )}
              {activePlatform === 'realtime' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-mw-gray-900 mb-4">
                    Execute Campaigns in Real-Time
                  </h3>
                  <p className="text-lg text-mw-gray-600 leading-relaxed">
                    Manage and activate OOH campaigns through a purpose-built Demand-Side Platform, designed for real-time execution and optimization. Use live data signals, such as audience movement, location context, and performance metrics, to refine delivery, adjust targeting, and optimize creative while campaigns are live.
                  </p>
                </motion.div>
              )}
              {activePlatform === 'measurement' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-mw-gray-900 mb-4">
                    Measurement & Analytics
                  </h3>
                  <p className="text-lg text-mw-gray-600 leading-relaxed">
                    Measure and validate campaign performance with transparent, real-time analytics and attribution. Monitor impressions, assess real-world impact, and track outcomes using standardized measurement and verification tools that support confident, data-driven optimization.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Right - Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="bg-gradient-to-br from-mw-gray-100 to-mw-gray-200 rounded-2xl p-4">
                <div className="rounded-xl overflow-hidden">
                  {activePlatform === 'campaigns' && (
                    <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                      alt="Campaign Dashboard"
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  )}
                  {activePlatform === 'realtime' && (
                    <Image
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
                      alt="Real-Time Dashboard"
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  )}
                  {activePlatform === 'measurement' && (
                    <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80"
                      alt="Analytics Dashboard"
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-gray-50 border-b overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 mb-8 font-semibold">Trusted by leading brands worldwide</p>
        </div>
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* Marquee container */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex items-center gap-16 pr-16"
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
            >
              {/* First set of logos - using actual customer logos */}
              {[
                { name: 'Coca-Cola', logo: '/assets/images/our-customers-logos/coca-cola.png' },
                { name: "McDonald's", logo: '/assets/images/our-customers-logos/mcdonalds.png' },
                { name: 'Samsung', logo: '/assets/images/our-customers-logos/samsung.png' },
                { name: 'Netflix', logo: '/assets/images/our-customers-logos/netflix.png' },
                { name: 'Dell', logo: '/assets/images/our-customers-logos/dell.png' },
                { name: 'Bosch', logo: '/assets/images/our-customers-logos/bosch.png' },
                { name: "L'Oreal Paris", logo: '/assets/images/our-customers-logos/l_oreal paris.png' },
                { name: 'Sunsilk', logo: '/assets/images/our-customers-logos/sunsilk.png' },
                { name: 'AirAsia', logo: '/assets/images/our-customers-logos/airasia.png' },
                { name: 'Grab', logo: '/assets/images/our-customers-logos/grab.png' },
                { name: 'Foodpanda', logo: '/assets/images/our-customers-logos/foodpanda.png' },
                { name: 'Lalamove', logo: '/assets/images/our-customers-logos/lalamove.png' },
                { name: 'HBO Go', logo: '/assets/images/our-customers-logos/hbo-go.png' },
                { name: 'Astro', logo: '/assets/images/our-customers-logos/astro.png' },
                { name: 'Gamuda', logo: '/assets/images/our-customers-logos/gamuda.png' },
                { name: 'Laguna', logo: '/assets/images/our-customers-logos/laguna.png' },
                { name: 'SeaOil', logo: '/assets/images/our-customers-logos/seaoil.png' },
                { name: 'Fair Price', logo: '/assets/images/our-customers-logos/fair-price.png' },
              ].map((brand, i) => (
                <div key={i} className="flex-shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="h-8 w-auto max-w-[120px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                { name: 'Coca-Cola', logo: '/assets/images/our-customers-logos/coca-cola.png' },
                { name: "McDonald's", logo: '/assets/images/our-customers-logos/mcdonalds.png' },
                { name: 'Samsung', logo: '/assets/images/our-customers-logos/samsung.png' },
                { name: 'Netflix', logo: '/assets/images/our-customers-logos/netflix.png' },
                { name: 'Dell', logo: '/assets/images/our-customers-logos/dell.png' },
                { name: 'Bosch', logo: '/assets/images/our-customers-logos/bosch.png' },
                { name: "L'Oreal Paris", logo: '/assets/images/our-customers-logos/l_oreal paris.png' },
                { name: 'Sunsilk', logo: '/assets/images/our-customers-logos/sunsilk.png' },
                { name: 'AirAsia', logo: '/assets/images/our-customers-logos/airasia.png' },
                { name: 'Grab', logo: '/assets/images/our-customers-logos/grab.png' },
                { name: 'Foodpanda', logo: '/assets/images/our-customers-logos/foodpanda.png' },
                { name: 'Lalamove', logo: '/assets/images/our-customers-logos/lalamove.png' },
                { name: 'HBO Go', logo: '/assets/images/our-customers-logos/hbo-go.png' },
                { name: 'Astro', logo: '/assets/images/our-customers-logos/astro.png' },
                { name: 'Gamuda', logo: '/assets/images/our-customers-logos/gamuda.png' },
                { name: 'Laguna', logo: '/assets/images/our-customers-logos/laguna.png' },
                { name: 'SeaOil', logo: '/assets/images/our-customers-logos/seaoil.png' },
                { name: 'Fair Price', logo: '/assets/images/our-customers-logos/fair-price.png' },
              ].map((brand, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="h-8 w-auto max-w-[120px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Journey Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Journey with Moving Walls
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create. Execute. Measure. A seamless journey from brief to results.
            </p>
          </motion.div>

          {/* Journey Path */}
          <div className="relative">
            {/* Animated Flow Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-2 transform -translate-y-1/2 z-0">
              {/* Base gradient line - Campaigns → Real Time → Measurement */}
              <div className="absolute inset-0 bg-gradient-to-r from-mw-blue-300 via-purple-400 to-green-400 rounded-full opacity-30"></div>
              
              {/* Animated flowing particles */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {/* Particle flow - Campaigns phase */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(14,116,144,1) 0%, rgba(14,116,144,0) 70%)',
                    boxShadow: '0 0 25px 8px rgba(14,116,144,0.7)',
                  }}
                  animate={{
                    x: ['-5%', '35%'],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Particle flow - Real Time phase */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,1) 0%, rgba(139,92,246,0) 70%)',
                    boxShadow: '0 0 25px 8px rgba(139,92,246,0.7)',
                  }}
                  animate={{
                    x: ['30%', '70%'],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Particle flow - Measurement phase */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(34,197,94,1) 0%, rgba(34,197,94,0) 70%)',
                    boxShadow: '0 0 25px 8px rgba(34,197,94,0.7)',
                  }}
                  animate={{
                    x: ['65%', '105%'],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 2,
                    ease: 'easeOut',
                  }}
                />

                {/* Connection sparkles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 w-2 h-2 rounded-full bg-white"
                    style={{
                      left: `${10 + i * 12}%`,
                      boxShadow: '0 0 8px 2px rgba(255,255,255,0.8)',
                    }}
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Journey Steps - Campaigns → Real Time → Measurement */}
            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
              {/* Step 1 - Campaigns */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-mw-blue-50 to-cyan-100 rounded-2xl p-8 border-2 border-mw-blue-200 shadow-lg h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-mw-blue-500 to-cyan-600 flex items-center justify-center shadow-lg"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </motion.div>
                    <div>
                      <span className="text-xs font-bold text-mw-blue-600 uppercase tracking-wider">Step 1</span>
                      <h3 className="text-xl font-bold text-gray-800">Create</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Go from concept to live without operational drag.
                  </p>
                  <div className="space-y-3">
                    {['Define your audience', 'Set objectives', 'Receive optimised inventory recommendations', 'Launch instantly'].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-white/70 rounded-lg p-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-mw-blue-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Arrow */}
                <div className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-mw-blue-500 to-purple-500 shadow-lg flex items-center justify-center"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Step 2 - Real Time */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 shadow-2xl h-full transform lg:-translate-y-4">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <motion.span 
                      className="bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Live Now
                    </motion.span>
                  </div>
                  <div className="flex items-center gap-3 mb-6 pt-2">
                    <motion.div 
                      className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center"
                      animate={{ 
                        boxShadow: ['0 0 0 0 rgba(255,255,255,0.4)', '0 0 0 20px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0.4)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </motion.div>
                    <div>
                      <span className="text-xs font-bold text-purple-200 uppercase tracking-wider">Step 2</span>
                      <h3 className="text-xl font-bold text-white">Execute</h3>
                    </div>
                  </div>
                  <p className="text-purple-100 mb-6">
                    Outdoor becomes responsive, not static.
                  </p>
                  <div className="space-y-3">
                    {['Monitor campaigns in real time', 'Adjust placements dynamically', 'Optimise creative and locations', 'Track performance live'].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-green-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white font-medium text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Arrow */}
                <div className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-green-500 shadow-lg flex items-center justify-center"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Step 3 - Measurement */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border-2 border-green-300 shadow-lg h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </motion.div>
                    <div>
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Step 3</span>
                      <h3 className="text-xl font-bold text-gray-800">Measure</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Full transparency from impression to outcome.
                  </p>
                  <div className="space-y-3">
                    {['Transparent impression tracking', 'Footfall uplift measurement', 'Attribution insights', 'Clear ROI reporting'].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 bg-white/80 rounded-lg p-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile Journey Arrows */}
            <div className="lg:hidden flex flex-col items-center gap-4 my-8">
              <motion.svg 
                className="w-8 h-8 text-mw-blue-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Case Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how leading brands achieved remarkable results with Moving Walls
            </p>
          </motion.div>

          {/* Case Studies Carousel */}
          <div className="relative">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 30,
                    ease: 'linear',
                  },
                }}
              >
                {/* Case Study Cards - First Set */}
                {[
                  {
                    client: 'Luxury Auto Group',
                    category: 'Automotive',
                    title: 'Premium Automotive Brand Achieves 300% ROI in Q4',
                    description: 'Increase dealership visits and test drive bookings during competitive holiday season',
                    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
                    duration: '90 days',
                    budget: '$250K',
                    metrics: [
                      { label: 'ROI Increase', value: '+300%' },
                      { label: 'Dealership Visits', value: '+187%' },
                    ],
                  },
                  {
                    client: 'FashionForward Stores',
                    category: 'Retail',
                    title: 'National Retail Chain Drives 45% Foot Traffic Increase',
                    description: 'Combat declining in-store visits amid shift to online shopping',
                    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
                    duration: '120 days',
                    budget: '$180K',
                    metrics: [
                      { label: 'Foot Traffic', value: '+45%' },
                      { label: 'In-Store Sales', value: '+62%' },
                    ],
                  },
                  {
                    client: 'MedCare Network',
                    category: 'Healthcare',
                    title: 'Healthcare Provider Reaches 2M Patients with Compliance',
                    description: 'Increase awareness of preventive care services while maintaining HIPAA compliance',
                    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
                    duration: '60 days',
                    budget: '$95K',
                    metrics: [
                      { label: 'Impressions', value: '2.1M' },
                      { label: 'Appointments', value: '+78%' },
                    ],
                  },
                  {
                    client: 'NextGen Financial',
                    category: 'Finance',
                    title: 'Fintech Startup Generates 5,000+ Quality Leads',
                    description: 'Build brand awareness and generate qualified leads in competitive market',
                    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
                    duration: '45 days',
                    budget: '$125K',
                    metrics: [
                      { label: 'Qualified Leads', value: '5,234' },
                      { label: 'Brand Lift', value: '+89%' },
                    ],
                  },
                  {
                    client: 'InnovateTech Corp',
                    category: 'Technology',
                    title: 'Tech Company Launches Product with 10M Impressions',
                    description: 'Create buzz for new product launch in saturated market',
                    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
                    duration: '30 days',
                    budget: '$200K',
                    metrics: [
                      { label: 'Impressions', value: '10.2M' },
                      { label: 'Pre-orders', value: '12.5K' },
                    ],
                  },
                  {
                    client: 'Global Consumer Brands',
                    category: 'FMCG',
                    title: "FMCG Giant's Multi-Market Launch Success",
                    description: 'Orchestrate a synchronized product launch across 8 Asian markets',
                    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop',
                    duration: '60 days',
                    budget: '$350K',
                    metrics: [
                      { label: 'Markets', value: '8' },
                      { label: 'Sales Lift', value: '+89%' },
                    ],
                  },
                ].map((study, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-[85vw] sm:w-[380px]"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="group bg-white rounded-2xl shadow-mw-lg hover:shadow-mw-xl border border-mw-blue-100 overflow-hidden h-full transition-all duration-300">
                      {/* Image Thumbnail */}
                      <div className="relative h-52 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Category & Key Metric overlay */}
                        <div className="absolute inset-0 p-5 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-mw-gray-800 text-xs font-semibold rounded-full">
                              {study.category}
                            </span>
                            <span className="px-3 py-1 bg-mw-blue-600 text-white text-xs font-bold rounded-full">
                              {study.metrics[0].value}
                            </span>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="text-white/80 text-sm">{study.duration}</span>
                            <span className="text-white/80 text-sm">{study.budget}</span>
                          </div>
                        </div>
                      </div>
                      {/* Card Body */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-mw-gray-900 mb-2 group-hover:text-mw-blue-600 transition-colors duration-300 leading-tight">
                          {study.title}
                        </h3>
                        <p className="text-sm text-mw-blue-600 font-medium mb-3">{study.client}</p>
                        <p className="text-mw-gray-600 text-sm mb-5 leading-relaxed">{study.description}</p>
                        <Link
                          href="/case-studies"
                          className="inline-flex items-center gap-2 text-mw-blue-600 font-semibold text-sm group-hover:gap-3 transition-all"
                        >
                          View Case Study
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {/* Duplicate Set for Seamless Loop */}
                {[
                  {
                    client: 'Luxury Auto Group',
                    category: 'Automotive',
                    title: 'Premium Automotive Brand Achieves 300% ROI in Q4',
                    description: 'Increase dealership visits and test drive bookings during competitive holiday season',
                    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
                    duration: '90 days',
                    budget: '$250K',
                    metrics: [
                      { label: 'ROI Increase', value: '+300%' },
                      { label: 'Dealership Visits', value: '+187%' },
                    ],
                  },
                  {
                    client: 'FashionForward Stores',
                    category: 'Retail',
                    title: 'National Retail Chain Drives 45% Foot Traffic Increase',
                    description: 'Combat declining in-store visits amid shift to online shopping',
                    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
                    duration: '120 days',
                    budget: '$180K',
                    metrics: [
                      { label: 'Foot Traffic', value: '+45%' },
                      { label: 'In-Store Sales', value: '+62%' },
                    ],
                  },
                  {
                    client: 'MedCare Network',
                    category: 'Healthcare',
                    title: 'Healthcare Provider Reaches 2M Patients with Compliance',
                    description: 'Increase awareness of preventive care services while maintaining HIPAA compliance',
                    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
                    duration: '60 days',
                    budget: '$95K',
                    metrics: [
                      { label: 'Impressions', value: '2.1M' },
                      { label: 'Appointments', value: '+78%' },
                    ],
                  },
                  {
                    client: 'NextGen Financial',
                    category: 'Finance',
                    title: 'Fintech Startup Generates 5,000+ Quality Leads',
                    description: 'Build brand awareness and generate qualified leads in competitive market',
                    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
                    duration: '45 days',
                    budget: '$125K',
                    metrics: [
                      { label: 'Qualified Leads', value: '5,234' },
                      { label: 'Brand Lift', value: '+89%' },
                    ],
                  },
                  {
                    client: 'InnovateTech Corp',
                    category: 'Technology',
                    title: 'Tech Company Launches Product with 10M Impressions',
                    description: 'Create buzz for new product launch in saturated market',
                    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
                    duration: '30 days',
                    budget: '$200K',
                    metrics: [
                      { label: 'Impressions', value: '10.2M' },
                      { label: 'Pre-orders', value: '12.5K' },
                    ],
                  },
                  {
                    client: 'Global Consumer Brands',
                    category: 'FMCG',
                    title: "FMCG Giant's Multi-Market Launch Success",
                    description: 'Orchestrate a synchronized product launch across 8 Asian markets',
                    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop',
                    duration: '60 days',
                    budget: '$350K',
                    metrics: [
                      { label: 'Markets', value: '8' },
                      { label: 'Sales Lift', value: '+89%' },
                    ],
                  },
                ].map((study, index) => (
                  <motion.div
                    key={`dup-${index}`}
                    className="flex-shrink-0 w-[85vw] sm:w-[380px]"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="group bg-white rounded-2xl shadow-mw-lg hover:shadow-mw-xl border border-mw-blue-100 overflow-hidden h-full transition-all duration-300">
                      {/* Image Thumbnail */}
                      <div className="relative h-52 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Category & Key Metric overlay */}
                        <div className="absolute inset-0 p-5 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-mw-gray-800 text-xs font-semibold rounded-full">
                              {study.category}
                            </span>
                            <span className="px-3 py-1 bg-mw-blue-600 text-white text-xs font-bold rounded-full">
                              {study.metrics[0].value}
                            </span>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="text-white/80 text-sm">{study.duration}</span>
                            <span className="text-white/80 text-sm">{study.budget}</span>
                          </div>
                        </div>
                      </div>
                      {/* Card Body */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-mw-gray-900 mb-2 group-hover:text-mw-blue-600 transition-colors duration-300 leading-tight">
                          {study.title}
                        </h3>
                        <p className="text-sm text-mw-blue-600 font-medium mb-3">{study.client}</p>
                        <p className="text-mw-gray-600 text-sm mb-5 leading-relaxed">{study.description}</p>
                        <Link
                          href="/case-studies"
                          className="inline-flex items-center gap-2 text-mw-blue-600 font-semibold text-sm group-hover:gap-3 transition-all"
                        >
                          View Case Study
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 bg-mw-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-mw-blue-700 transition-all hover:scale-105 shadow-lg"
            >
              View All Case Studies
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Platform Integration Section */}
      <section className="py-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Complete MW Platform Suite
            </h2>
            <p className="text-xl text-mw-gray-600">
              All the tools you need, integrated seamlessly
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
            {/* Featured Card - MW Planner (spans 2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-mw-blue-600 via-mw-blue-700 to-purple-700 rounded-2xl p-8 md:p-10 shadow-mw-xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm mb-6 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">MW Planner</h3>
                <p className="text-blue-100 text-lg mb-6 max-w-md">AI-powered campaign planning and audience insights. Discover where your audiences are and plan with precision.</p>
                <Link href="/mw-planner" className="inline-flex items-center gap-2 text-white font-semibold text-sm bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-lg transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* MW Marketplace */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.999 2.999 0 01.79-1.89l1.72-1.72A.75.75 0 016.04 5.5h11.92a.75.75 0 01.53.22l1.72 1.72a3 3 0 01.79 1.89" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Marketplace</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Access 250,000+ premium billboard locations worldwide</p>
              <Link href="/mw-market" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* MW Studio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Studio</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Creative design and optimization tools for every format</p>
              <Link href="/mw-studio" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Row 3: MW Activate, MW Measure, MW Science, MW Influence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Activate</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Campaign activation and automation at scale</p>
              <Link href="/mw-activate" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Measure</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Real-time analytics and attribution tracking</p>
              <Link href="/mw-measure" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Science</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Data science and predictive analytics engine</p>
              <Link href="/mw-science" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mw-blue-500 to-purple-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Influence</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Intelligent DOOH ad serving and yield optimization</p>
              <Link href="/mw-influence" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSectionClient testimonials={props.testimonials} />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-mw-gray-600">
              Everything you need to know about Moving Walls for brands
            </p>
          </motion.div>

          <div className="space-y-4">
            {content.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-mw-gray-50 rounded-2xl border border-mw-blue-100 overflow-hidden shadow-mw-lg"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-mw-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-bold text-mw-gray-900 pr-8">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 text-mw-blue-600 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? 'auto' : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-mw-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
