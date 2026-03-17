'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Icon Components
const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

// Gradient configurations
const gradientClasses: Record<string, string> = {
  'blue-indigo': 'from-slate-900 via-blue-900 to-indigo-900',
  'green-teal': 'from-slate-900 via-green-900 to-teal-900',
  'purple-pink': 'from-slate-900 via-purple-900 to-pink-900',
  'orange-red': 'from-slate-900 via-orange-900 to-red-900',
  'dark-slate': 'from-slate-900 via-slate-800 to-slate-900',
}

export interface HeroStat {
  value: string
  label: string
}

export interface SecondaryCta {
  text: string
  link?: string
  isVideo?: boolean
}

export interface ProductHeroSectionProps {
  badge?: string
  title: string
  subtitle?: string
  description?: string
  gradient?: string
  heroImage?: string
  heroVideo?: string
  ctaText?: string
  ctaLink?: string
  secondaryCta?: SecondaryCta
  stats?: HeroStat[]
  onVideoClick?: () => void
}

export default function ProductHeroSection({
  badge,
  title,
  subtitle,
  description,
  gradient = 'blue-indigo',
  heroImage,
  heroVideo,
  ctaText = 'Get Started',
  ctaLink = '/contact',
  secondaryCta,
  stats,
  onVideoClick,
}: ProductHeroSectionProps) {
  const gradientClass = gradientClasses[gradient] || gradientClasses['blue-indigo']

  return (
    <section className={`relative min-h-[90vh] bg-gradient-to-br ${gradientClass} overflow-hidden`}>
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-500" />
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/assets/images/grid-pattern.svg')] bg-center opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-200">{badge}</span>
              </motion.div>
            )}

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {title}
              {subtitle && (
                <>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {subtitle}
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                {description}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                href={ctaLink}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                {ctaText}
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {secondaryCta && (
                <button
                  onClick={secondaryCta.isVideo ? onVideoClick : undefined}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                >
                  {secondaryCta.isVideo && <PlayIcon className="w-5 h-5" />}
                  {secondaryCta.text}
                </button>
              )}
            </div>

            {/* Stats Row */}
            {stats && stats.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 border-t border-white/10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center lg:text-left"
                  >
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column - Hero Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={title}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <PlayIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Product Demo</p>
                  </div>
                </div>
              )}

              {/* Play Button Overlay for Video */}
              {heroVideo && (
                <button
                  onClick={onVideoClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayIcon className="w-8 h-8 text-slate-900 ml-1" />
                  </div>
                </button>
              )}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-80 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-60 blur-xl" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
