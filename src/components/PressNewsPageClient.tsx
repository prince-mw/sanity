'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ContactForm from './ContactForm'

export interface PressRelease {
  date: string
  category: string
  title: string
  excerpt: string
  readTime: string
  thumbnail?: string
  slug?: string
}

interface PressNewsPageClientProps {
  pressReleases: PressRelease[]
}

export default function PressNewsPageClient({ pressReleases }: PressNewsPageClientProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Press & News
              <span className="text-mw-blue-600 block">Latest Updates</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stay updated with Moving Walls&apos;s latest announcements, product launches, 
              partnerships, and industry recognition. Access our media resources 
              and press materials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Latest Press Releases
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Get the latest news and announcements directly from Moving Walls.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {pressReleases.length === 0 ? (
              <div className="lg:col-span-2 text-center py-16">
                <svg className="w-16 h-16 text-mw-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-xl font-semibold text-mw-gray-700 mb-2">No Press Releases</h3>
                <p className="text-mw-gray-500 max-w-md mx-auto">There are no press releases available at the moment. Check back soon for the latest announcements.</p>
              </div>
            ) : pressReleases.map((release, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-mw-lg border border-mw-gray-100 overflow-hidden hover:shadow-mw-xl transition-shadow"
              >
                <Link href={release.slug ? `/press-news/${release.slug}` : '#'} className="block">
                <div className="relative h-48 bg-gradient-to-br from-mw-blue-50 to-mw-blue-100 overflow-hidden">
                  {release.thumbnail ? (
                    <Image
                      src={release.thumbnail}
                      alt={release.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          {release.category === 'Product Launch' && (
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          )}
                          {release.category === 'Funding' && (
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          )}
                          {release.category === 'Partnership' && (
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          )}
                          {release.category === 'Recognition' && (
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          )}
                          {(release.category === 'Product Update' || release.category === 'Expansion') && (
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          )}
                          {/* Default icon for unknown categories */}
                          {!['Product Launch', 'Funding', 'Partnership', 'Recognition', 'Product Update', 'Expansion'].includes(release.category) && (
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-mw-blue-700 text-sm font-medium">{release.category}</p>
                      </div>
                    </div>
                  )}
                  {/* Category overlay when image is present */}
                  {release.thumbnail && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="px-3 py-1 bg-mw-blue-600 text-white text-xs font-medium rounded-full">
                        {release.category}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-mw-blue-100 text-mw-blue-600 text-xs font-medium rounded-full">
                      {release.category}
                    </span>
                    <span className="text-mw-gray-500 text-sm">{release.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-mw-gray-900 mb-3 hover:text-mw-blue-600 transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-mw-gray-600 leading-relaxed mb-4">{release.excerpt}</p>
                  <span className="text-mw-blue-600 hover:text-mw-blue-700 font-medium text-sm flex items-center gap-1">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  )
}
