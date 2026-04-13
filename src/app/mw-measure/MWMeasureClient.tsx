'use client'

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { CTAButton } from "@/components/CTAButton"
import CaseStudiesSection from "@/components/CaseStudiesSection"
import { getDisplayIntegrations, DisplayIntegration } from '@/data/default-integrations'
import type { SanityProduct } from "@/sanity/lib/fetch"
import { getSanityImageUrl } from "@/sanity/lib/fetch"

interface MWMeasureClientProps {
  caseStudies?: any[]
  product?: SanityProduct | null
  partnerLogos?: DisplayIntegration[] | null
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

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

// Audience Icon (Users group)
const AudienceIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
)

// Verified Insights Icon (Badge with checkmark)
const VerifiedIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
)

// Timeline Section with Scroll-Based Animation
interface TimelineStep {
  stepNumber?: number
  title: string
  description?: string
  image?: { asset: { _ref: string } }
}

function TimelineSection({ 
  steps, 
  title, 
  subtitle 
}: { 
  steps: TimelineStep[]
  title?: string
  subtitle?: string 
}) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)
  
  // Use spring for smooth animation
  const smoothProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  // Calculate scroll progress manually for reliability
  const updateProgress = useCallback(() => {
    if (!timelineRef.current) return
    
    const element = timelineRef.current
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    // Calculate how much of the element has been scrolled through
    // Start when top of element reaches 80% of viewport
    // End when bottom of element reaches 20% of viewport
    const start = windowHeight * 0.8
    const end = windowHeight * 0.2
    
    // Element's position relative to viewport
    const elementTop = rect.top
    const elementBottom = rect.bottom
    const elementHeight = rect.height
    
    // Calculate progress (0 to 1)
    let scrollProgress = 0
    
    if (elementTop <= start && elementBottom >= end) {
      // Element is in the tracking zone
      const totalScrollDistance = (start - end) + elementHeight
      const scrolled = start - elementTop
      scrollProgress = Math.min(Math.max(scrolled / totalScrollDistance, 0), 1)
    } else if (elementBottom < end) {
      // Element has fully passed
      scrollProgress = 1
    }
    // If elementTop > start, scrollProgress stays 0 (element hasn't entered yet)
    
    progress.set(scrollProgress)
  }, [progress])
  
  useEffect(() => {
    // Initial calculation
    updateProgress()
    
    // Add scroll listener
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress])
  
  return (
    <section className="overflow-hidden">
      {/* Section Header */}
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {title || 'How It Works'}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle || ''}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Timeline Container - This is what we track for scroll */}
      <div ref={timelineRef} className="relative">
          {/* Vertical Timeline Line - Desktop (Scroll-based) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-0">
            {/* Background track */}
            <div className="absolute inset-0 bg-gray-200 rounded-full" />
            {/* Animated progress - uses scaleY for bidirectional scroll */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
              className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/30"
            />
          </div>

          {/* Vertical Timeline Line - Mobile/Tablet (Scroll-based) */}
          <div className="lg:hidden absolute left-6 sm:left-8 top-0 bottom-0 w-1 z-0">
            {/* Background track */}
            <div className="absolute inset-0 bg-gray-200 rounded-full" />
            {/* Animated progress - uses scaleY for bidirectional scroll */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
              className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/30"
            />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => {
              const imageUrl = step.image ? getSanityImageUrl(step.image, { width: 800 }) : null
              const isImageLeft = index % 2 !== 0 // Odd: image left, Even (1st, 3rd): image right
              const stepNumber = step.stepNumber || index + 1
              // Cool Pastels color palette - alternating
              const sectionColors = ['#F8FAFC', '#EFF6FF', '#F8FAFC', '#EEF2FF'] // slate-50, blue-50, slate-50, indigo-50
              const bgColor = sectionColors[index % sectionColors.length]
              
              return (
                <motion.div 
                  key={`timeline-step-${stepNumber}-${step.title.slice(0, 20)}`} 
                  className="relative"
                  initial={{ backgroundColor: 'rgba(255,255,255,0)' }}
                  whileInView={{ backgroundColor: bgColor }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-2 lg:gap-20 items-center max-w-7xl mx-auto">
                    {/* Left Side */}
                    <motion.div
                      initial={{ opacity: 0, x: -60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      {isImageLeft && imageUrl ? (
                        <div className="relative group">
                          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                            <Image
                              src={imageUrl}
                              alt={step.title}
                              width={800}
                              height={500}
                              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 pr-8">
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                            {step.title}
                          </h3>
                          {step.description && (
                            <p className="text-lg text-gray-600 leading-relaxed">
                              {step.description}
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>

                    {/* Center - Floating Number Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="absolute left-1/2 -translate-x-1/2 z-10"
                    >
                      <div className="relative">
                        {/* Pulse Ring */}
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                          className="absolute inset-0 bg-blue-500 rounded-full"
                        />
                        {/* Number Badge */}
                        <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                          <span className="text-white text-2xl font-bold">
                            {String(stepNumber).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right Side */}
                    <motion.div
                      initial={{ opacity: 0, x: 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      {isImageLeft && (
                        <div className="space-y-4 pl-8">
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                            {step.title}
                          </h3>
                          {step.description && (
                            <p className="text-lg text-gray-600 leading-relaxed">
                              {step.description}
                            </p>
                          )}
                        </div>
                      )}
                      {!isImageLeft && imageUrl && (
                        <div className="relative group">
                          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                            <Image
                              src={imageUrl}
                              alt={step.title}
                              width={800}
                              height={500}
                              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Mobile/Tablet Layout */}
                  <div className="lg:hidden flex gap-4 sm:gap-6 max-w-7xl mx-auto">
                    {/* Floating Number Badge - Mobile */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      className="flex-shrink-0 relative z-10"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          className="absolute inset-0 bg-blue-500 rounded-full"
                        />
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                          <span className="text-white text-lg sm:text-xl font-bold">
                            {String(stepNumber).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="flex-1 space-y-4"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      )}
                      {imageUrl && (
                        <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100 mt-4">
                          <Image
                            src={imageUrl}
                            alt={step.title}
                            width={800}
                            height={500}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                    </motion.div>
                  </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Timeline End Dot */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-6 w-5 h-5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full border-4 border-white shadow-lg"
          />
        </div>
    </section>
  )
}

export default function MWMeasure({ caseStudies = [], product, partnerLogos }: MWMeasureClientProps) {
  // CMS-driven hero content (no static fallbacks)
  const heroTitle = product?.heroTitle || ''
  const heroSubtitle = product?.heroSubtitle || ''
  const heroDescription = product?.description || ''
  const tagline = product?.tagline || ''
  const heroImageUrl = product?.heroImage ? getSanityImageUrl(product.heroImage, { width: 800 }) : null
  const integrations = getDisplayIntegrations(product?.integrations, partnerLogos)
  
  // Hero gradient from CMS
  const gradientMap: Record<string, string> = {
    'blue-indigo': 'from-blue-900 via-blue-800 to-indigo-900',
    'teal-blue': 'from-teal-900 via-teal-800 to-blue-900',
    'purple-pink': 'from-purple-900 via-purple-800 to-pink-900',
    'indigo-purple': 'from-indigo-900 via-indigo-800 to-purple-900',
  }
  const heroGradient = gradientMap[product?.heroGradient || ''] || 'from-blue-900 via-blue-800 to-indigo-900'

  // CMS data only - no static fallbacks
  const heroStats = product?.heroStats || []
  const benefits = product?.benefits || []

  const heroStatColors = ['text-yellow-300', 'text-green-300', 'text-purple-300', 'text-pink-300']
  const benefitIcons = [MapIcon, AudienceIcon, VerifiedIcon, LocationIcon, ChartBarIcon]

  // Features from CMS
  const defaultOohMetrics = [
    {
      icon: MapIcon,
      title: "Location Intelligence",
      description: "Advanced geospatial analytics with traffic patterns, demographic profiling, and competitor proximity mapping."
    },
    {
      icon: AudienceIcon,
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

  const measureIconMap: Record<string, React.FC<{ className?: string }>> = {
    'map': MapIcon, 
    'users': UsersIcon, 
    'audience': AudienceIcon, 
    'verified': VerifiedIcon, 
    'insight': VerifiedIcon,  // CMS uses 'insight' for verified insights
    'eye': EyeIcon, 
    'chart-bar': ChartBarIcon, 
    'chart': ChartBarIcon,    // CMS uses 'chart' for reporting
    'location': LocationIcon,
  }

  const oohMetrics = product?.features?.length
    ? product.features.map((f, i) => ({
        icon: measureIconMap[f.icon || ''] || defaultOohMetrics[i]?.icon || MapIcon,
        title: f.title,
        description: f.description || '',
      }))
    : defaultOohMetrics

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* Bento Grid Hero Section */}
      <section className={`relative bg-gradient-to-br ${heroGradient} text-white py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content Grid - Left Content, Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-6 sm:mb-8">
            
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              {tagline && (
                <div className="inline-flex items-center bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md mb-4 sm:mb-6 w-fit">
                  <span className="text-white/90 font-medium text-xs sm:text-sm">{tagline}</span>
                </div>
              )}
              
              {heroTitle && (
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                  {heroTitle}
                </h1>
              )}
              
              {heroSubtitle && (
                <p className="text-lg sm:text-xl md:text-2xl font-light text-blue-200 mb-4 sm:mb-6">
                  {heroSubtitle}
                </p>
              )}
              
              {heroDescription && (
                <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 leading-relaxed max-w-xl">
                  {heroDescription}
                </p>
              )}

              {/* CTA Buttons */}
              {product?.ctaText && (
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <CTAButton
                    href={product?.ctaLink || ''}
                    className="bg-white text-blue-900 px-5 sm:px-6 py-3 sm:py-3.5 rounded-md font-semibold text-sm sm:text-base hover:bg-blue-50 transition-all shadow-xl inline-flex items-center justify-center gap-2"
                  >
                    {product.ctaText}
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </CTAButton>
                  {product?.secondaryCta?.text && (
                    <CTAButton
                      href={product.secondaryCta.link || ''}
                      className="bg-white/10 text-white border border-white/30 px-5 sm:px-6 py-3 sm:py-3.5 rounded-md font-semibold text-sm sm:text-base hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
                    >
                      {product.secondaryCta.text}
                    </CTAButton>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right Side - Hero Image */}
            {heroImageUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md border border-white/20 rounded-md overflow-hidden order-1 lg:order-2"
              >
                <Image
                  src={heroImageUrl}
                  alt={heroTitle}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </motion.div>
            )}
          </div>

          {/* Bottom KPI Cards Row */}
          {heroStats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={`stat-${stat.label}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-4 sm:p-5 text-center"
                >
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${heroStatColors[index % heroStatColors.length]} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Benefits Row */}
          {benefits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 bg-white/5 backdrop-blur-md border border-white/20 rounded-md p-4 sm:p-5"
            >
              {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: all in one row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {benefits.map((text, index) => {
                  const IconComp = benefitIcons[index % benefitIcons.length]
                  return (
                    <div key={`benefit-${index}`} className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-md flex items-center justify-center text-yellow-300 flex-shrink-0">
                        <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span className="text-white/90 font-medium text-xs sm:text-sm leading-tight">{text}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* OOH Analytics Features */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {product?.measurementSuiteTitle || product?.featuresTitle || 'Complete OOH Measurement Suite'}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              {product?.measurementSuiteSubtitle || product?.featuresSubtitle || 'From location intelligence to audience insights, get comprehensive analytics that transform Out-of-Home campaigns into measurable, optimizable channels.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {oohMetrics.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-blue-600 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
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

      {/* How It Works Section - Timeline Vertical Connector with Floating Numbers */}
      {product?.howItWorksSteps && product.howItWorksSteps.length > 0 && (
        <TimelineSection steps={product.howItWorksSteps} title={product?.howItWorksTitle} subtitle={product?.howItWorksSubtitle} />
      )}

      {/* Integrations Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                <span className="text-blue-600 font-medium text-xs sm:text-sm">{integrations.length}+ Integrations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                {(() => {
                  const title = product?.integrationsTitle || "Don't Replace. Integrate."
                  const parts = title.split('.')
                  if (parts.length >= 2) {
                    return (
                      <>
                        {parts[0]}.
                        <span className="block text-blue-600">{parts.slice(1).join('.').trim()}</span>
                      </>
                    )
                  }
                  return title
                })()}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed whitespace-pre-line">
                {product?.integrationsSubtitle || "MW Measure connects seamlessly with your existing OOH ecosystem. No rip-and-replace—just instant measurement value from day one."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center group cursor-pointer"
                  >
                    <div className="w-24 h-20 sm:w-28 sm:h-22 lg:w-36 lg:h-28 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              {product?.finalCtaTitle || 'Transform OOH Into Measurable Performance'}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
              {product?.finalCtaSubtitle || 'Join leading brands leveraging real-time location intelligence, audience analytics, and attribution modeling to maximize their Out-of-Home advertising ROI.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <CTAButton
                href={product?.ctaLink || '/contact'}
                className="bg-white text-blue-600 px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                {product?.ctaText || 'View Live Demo'}
                <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </CTAButton>
              <CTAButton
                href={product?.secondaryCta?.link || '/contact'}
                className="border-2 border-white text-white px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center gap-2"
              >
                {product?.secondaryCta?.text || 'Book a Free Demo'}
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
