'use client'

import { motion } from "framer-motion"
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
  const benefitIcons = [MapIcon, UsersIcon, LocationIcon, ChartBarIcon]

  // Features from CMS
  const defaultOohMetrics = [
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

  const measureIconMap: Record<string, React.FC<{ className?: string }>> = {
    'map': MapIcon, 'users': UsersIcon, 'eye': EyeIcon, 'chart-bar': ChartBarIcon,
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
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md mb-4 sm:mb-6 w-fit">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
              {product?.measurementSuiteTitle || product?.featuresTitle || 'Complete OOH Measurement Suite'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {product?.measurementSuiteSubtitle || product?.featuresSubtitle || 'From location intelligence to audience insights, get comprehensive analytics that transform Out-of-Home campaigns into measurable, optimizable channels.'}
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

      {/* How It Works Section - from CMS */}
      {product?.howItWorksSteps && product.howItWorksSteps.length > 0 && (
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
                {product?.howItWorksTitle || 'How It Works'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {product?.howItWorksSubtitle || ''}
              </p>
            </motion.div>

            <div className="space-y-12">
              {product.howItWorksSteps.map((step, index) => {
                const imageUrl = step.image ? getSanityImageUrl(step.image, { width: 800 }) : null
                const isEven = index % 2 === 0
                
                return (
                  <motion.div
                    key={step.stepNumber || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                  >
                    {/* Image Side */}
                    {imageUrl && (
                      <div className="lg:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                          <Image
                            src={imageUrl}
                            alt={step.title}
                            width={800}
                            height={500}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Content Side */}
                    <div className={`lg:w-1/2 ${!imageUrl ? 'lg:w-full' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                          {step.stepNumber || index + 1}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {step.title}
                          </h3>
                          {step.description && (
                            <p className="text-lg text-gray-600">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Integrations Section */}
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
                <span className="text-blue-600 font-medium text-sm">{integrations.length}+ Integrations</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
              <p className="text-xl text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
                {product?.integrationsSubtitle || "MW Measure connects seamlessly with your existing OOH ecosystem. No rip-and-replace—just instant measurement value from day one."}
              </p>
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
              {product?.finalCtaTitle || 'Transform OOH Into Measurable Performance'}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {product?.finalCtaSubtitle || 'Join leading brands leveraging real-time location intelligence, audience analytics, and attribution modeling to maximize their Out-of-Home advertising ROI.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton
                href={product?.ctaLink || '/contact'}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                {product?.ctaText || 'View Live Demo'}
                <EyeIcon className="w-5 h-5" />
              </CTAButton>
              <CTAButton
                href={product?.secondaryCta?.link || '/contact'}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center gap-2"
              >
                {product?.secondaryCta?.text || 'Book a Free Demo'}
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
