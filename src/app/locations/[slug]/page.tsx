'use client'

import { useEffect, useState } from 'react'
import { useParams, redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getLocationBySlug, transformLocationFull } from '@/sanity/lib/fetch'

// Known static location slugs that have dedicated pages
const STATIC_LOCATION_SLUGS = [
  'australia',
  'india', 
  'indonesia',
  'japan',
  'malaysia',
  'philippines',
  'singapore',
  'sri-lanka',
  'thailand',
  'usa'
]

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

interface LocationData {
  name: string
  slug: string
  city: string
  flag: string
  description: string
  heroImage: string
  stats: Array<{ label: string; value: string }>
  majorCities: string[]
  mediaTypes: Array<{ name: string; icon: string; description: string }>
  keyMarkets: any[]
  faqs: Array<{ question: string; answer: string }>
  caseStudies: Array<{ title: string; client: string; results: string }>
  partners: string[]
}

export default function DynamicLocationPage() {
  const params = useParams()
  const slug = params.slug as string
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    async function fetchLocation() {
      // If this is a known static location, check Sanity first
      // If no Sanity data, we'll redirect to the static page
      try {
        const data = await getLocationBySlug(slug)
        if (data) {
          setLocation(transformLocationFull(data))
        } else if (STATIC_LOCATION_SLUGS.includes(slug)) {
          // No Sanity data but static page exists - redirect
          setShouldRedirect(true)
        } else {
          // Unknown slug with no Sanity data - 404
          setLocation(null)
        }
      } catch (error) {
        console.error('Error fetching location:', error)
        if (STATIC_LOCATION_SLUGS.includes(slug)) {
          setShouldRedirect(true)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchLocation()
  }, [slug])

  // Redirect to static page if needed
  useEffect(() => {
    if (shouldRedirect && !isLoading) {
      window.location.href = `/locations/${slug}`
    }
  }, [shouldRedirect, isLoading, slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-mw-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading location data...</p>
        </div>
      </div>
    )
  }

  if (shouldRedirect) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <p className="text-gray-600 mb-6">The location you're looking for doesn't exist.</p>
          <Link href="/locations" className="text-mw-blue-600 hover:underline">
            ← Back to Locations
          </Link>
        </div>
      </div>
    )
  }

  // Render dynamic location page from Sanity data
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
              <span className="text-5xl">{location.flag}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              OOH Advertising in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                {location.name}
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-mw-blue-100 max-w-3xl mx-auto mb-8">
              {location.description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white text-mw-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-50 transition-all"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/locations" 
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                All Locations
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {location.stats && location.stats.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {location.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 text-center shadow-sm"
                >
                  <div className="text-2xl md:text-3xl font-bold text-mw-blue-600 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Major Cities */}
      {location.majorCities && location.majorCities.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Markets</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {location.majorCities.map((city, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-6 py-3 bg-mw-blue-50 text-mw-blue-700 rounded-full font-medium"
                >
                  {city}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Media Types */}
      {location.mediaTypes && location.mediaTypes.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Media Types Available</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.mediaTypes.map((media, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="text-4xl mb-4">{media.icon}</div>
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
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {location.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <details className="group">
                    <summary className="px-6 py-4 cursor-pointer flex items-center justify-between font-semibold text-gray-900 hover:bg-gray-50">
                      {faq.question}
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-mw-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Launch Your Campaign in {location.name}?
          </h2>
          <p className="text-mw-blue-100 mb-8">
            Connect with our local team to discover premium OOH advertising opportunities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-mw-blue-900 font-semibold rounded-lg hover:bg-mw-blue-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/mw-planner"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Explore MW Planner
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
