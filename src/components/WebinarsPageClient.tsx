'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export interface UpcomingWebinar {
  title: string
  description: string
  date: string
  time: string
  duration: string
  speaker: string
  speakerRole: string
  speakerImage?: string
  featuredImage?: string
  attendees: number
  level: string
}

export interface PastWebinar {
  title: string
  description: string
  date: string
  time: string
  duration: string
  speaker: string
  speakerRole: string
  speakerImage?: string
  featuredImage?: string
  level: string
}

interface WebinarsPageClientProps {
  upcomingWebinars: UpcomingWebinar[]
  pastWebinars: PastWebinar[]
}

export default function WebinarsPageClient({ upcomingWebinars, pastWebinars }: WebinarsPageClientProps) {
  const [activeTab, setActiveTab] = useState('upcoming')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-8">
              <svg className="w-4 h-4 text-mw-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span className="text-mw-blue-600 text-sm font-medium">Learning Hub</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Webinars &
              <span className="text-mw-blue-600 block">Live Events</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join live sessions with industry experts or access our library of on-demand webinars 
              to accelerate your advertising success.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              {[
                { number: '50+', label: 'Webinars' },
                { number: '10K+', label: 'Attendees' },
                { number: '4.8★', label: 'Avg Rating' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-mw-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-mw-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b border-mw-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-mw-blue-600 text-white shadow-mw-sm'
                  : 'bg-mw-gray-100 text-mw-gray-700 hover:bg-mw-gray-200'
              }`}
            >
              Upcoming Webinars
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'past'
                  ? 'bg-mw-blue-600 text-white shadow-mw-sm'
                  : 'bg-mw-gray-100 text-mw-gray-700 hover:bg-mw-gray-200'
              }`}
            >
              Past Webinars
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      {activeTab === 'upcoming' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-2">Upcoming Webinars</h2>
              <p className="text-lg text-mw-gray-600">Register now to secure your spot</p>
            </div>

            <div className="space-y-6">
              {upcomingWebinars.map((webinar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-mw-gray-200 rounded-xl overflow-hidden hover:shadow-mw-lg transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-3 gap-6 p-6">
                    {/* Webinar Image/Preview */}
                    <div className="lg:col-span-1">
                      <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {webinar.featuredImage ? (
                          <img src={webinar.featuredImage} alt={webinar.title} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                        )}
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white text-mw-blue-600 text-xs font-medium rounded-full">
                          {webinar.level}
                        </span>
                      </div>
                    </div>

                    {/* Webinar Details */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-mw-gray-900 mb-2">{webinar.title}</h3>
                          <p className="text-mw-gray-600 mb-4">{webinar.description}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{webinar.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{webinar.time} ({webinar.duration})</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          {webinar.speakerImage ? (
                            <img src={webinar.speakerImage} alt={webinar.speaker} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                          <div>
                            <p className="font-medium text-mw-gray-900">{webinar.speaker}</p>
                            <p className="text-xs text-mw-gray-500">{webinar.speakerRole}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{webinar.attendees} registered</span>
                        </div>
                      </div>

                      <button className="px-6 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-colors shadow-mw-md">
                        Register Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Webinars */}
      {activeTab === 'past' && (
        <section className="py-16 bg-mw-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-2">Past Webinars</h2>
              <p className="text-lg text-mw-gray-600">Catch up on what you missed</p>
            </div>

            <div className="space-y-6">
              {pastWebinars.map((webinar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-mw-gray-200 rounded-xl overflow-hidden hover:shadow-mw-lg transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-3 gap-6 p-6">
                    {/* Webinar Image/Preview */}
                    <div className="lg:col-span-1">
                      <div className="aspect-video bg-gradient-to-br from-mw-gray-400 to-mw-gray-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {webinar.featuredImage ? (
                          <img src={webinar.featuredImage} alt={webinar.title} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                        )}
                        <span className="absolute top-3 left-3 px-3 py-1 bg-mw-gray-100 text-mw-gray-700 text-xs font-medium rounded-full">
                          {webinar.level}
                        </span>
                        <span className="absolute top-3 right-3 px-3 py-1 bg-mw-gray-700 text-white text-xs font-medium rounded-full">
                          Recorded
                        </span>
                      </div>
                    </div>

                    {/* Webinar Details */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-mw-gray-900 mb-2">{webinar.title}</h3>
                          <p className="text-mw-gray-600 mb-4">{webinar.description}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          <svg className="w-5 h-5 text-mw-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{webinar.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          <svg className="w-5 h-5 text-mw-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{webinar.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          {webinar.speakerImage ? (
                            <img src={webinar.speakerImage} alt={webinar.speaker} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <svg className="w-5 h-5 text-mw-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                          <div>
                            <p className="font-medium text-mw-gray-900">{webinar.speaker}</p>
                            <p className="text-xs text-mw-gray-500">{webinar.speakerRole}</p>
                          </div>
                        </div>
                      </div>

                      <button className="px-6 py-3 bg-mw-gray-600 hover:bg-mw-gray-700 text-white font-medium rounded-lg transition-colors shadow-mw-md">
                        Watch Recording
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-mw-blue-600 to-mw-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Want to Host a Webinar?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Share your expertise with our community. We&apos;re always looking for industry experts to collaborate with.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-mw-lg"
            >
              Become a Speaker
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
