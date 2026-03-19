'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export interface Event {
  slug?: string
  title: string
  type: string
  date: string
  time: string
  location: string
  description: string
  speakers: string[]
  speakersList?: { name: string; role?: string; company?: string; image?: string }[]
  price: string
  capacity: string
  category: string
  featured: boolean
  featuredImage?: string
  content?: string
}

interface EventsPageClientProps {
  upcomingEvents: Event[]
  pastEvents: Event[]
}

export default function EventsPageClient({ upcomingEvents, pastEvents }: EventsPageClientProps) {
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
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-mw-blue-600 text-sm font-medium">Learn & Connect</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Events &
              <span className="text-mw-blue-600 block">Training</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join us for conferences, workshops, and training sessions. Stay ahead of industry trends, 
              learn best practices, and connect with fellow advertising professionals.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              {[
                { number: '30+', label: 'Events per Year' },
                { number: '15+', label: 'Countries' },
                { number: '5K+', label: 'Attendees' }
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
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'past'
                  ? 'bg-mw-blue-600 text-white shadow-mw-sm'
                  : 'bg-mw-gray-100 text-mw-gray-700 hover:bg-mw-gray-200'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {activeTab === 'upcoming' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-lg text-mw-gray-600">Register now to secure your spot</p>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="text-center py-16 bg-mw-gray-50 rounded-xl">
                <svg className="w-16 h-16 text-mw-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-mw-gray-700 mb-2">No Upcoming Events</h3>
                <p className="text-mw-gray-500">Check back soon for new events or browse our past events.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border border-mw-gray-200 rounded-xl overflow-hidden hover:shadow-mw-lg transition-all duration-300"
                  >
                    <div className="grid lg:grid-cols-3 gap-6 p-6">
                      {/* Event Image/Preview */}
                      <div className="lg:col-span-1">
                        <Link href={event.slug ? `/events/${event.slug}` : '#'}>
                          <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer">
                            {event.featuredImage ? (
                              <img src={event.featuredImage} alt={event.title} className="w-full h-full object-cover" />
                            ) : (
                              <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                            )}
                            <div className="absolute top-3 left-3 flex gap-2">
                              <span className="px-3 py-1 bg-white text-mw-blue-600 text-xs font-medium rounded-full">
                                Upcoming
                              </span>
                              {event.featured && (
                                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-medium rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                            <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${
                              event.type === 'Webinar' ? 'bg-green-100 text-green-700' :
                              event.type === 'Workshop' ? 'bg-purple-100 text-purple-700' :
                              event.type === 'Conference' ? 'bg-orange-100 text-orange-700' :
                              event.type === 'Summit' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {event.type}
                            </span>
                          </div>
                        </Link>
                      </div>

                      {/* Event Details */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <Link href={event.slug ? `/events/${event.slug}` : '#'}>
                              <h3 className="text-2xl font-bold text-mw-gray-900 mb-2 hover:text-mw-blue-600 transition-colors cursor-pointer">{event.title}</h3>
                            </Link>
                            <p className="text-mw-gray-600 mb-4">{event.description}</p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                            <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                            <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                            <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                            <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-semibold text-mw-blue-600">{event.price}</span>
                          </div>
                        </div>

                        {/* Speakers */}
                        {event.speakersList && event.speakersList.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-mw-gray-500 mb-2">Speakers</p>
                            <div className="flex items-center gap-3 flex-wrap">
                              {event.speakersList.slice(0, 3).map((speaker, spkIdx) => (
                                <div key={spkIdx} className="flex items-center gap-2">
                                  {speaker.image ? (
                                    <img src={speaker.image} alt={speaker.name} className="w-8 h-8 rounded-full object-cover" />
                                  ) : (
                                    <div className="w-8 h-8 bg-mw-gray-200 rounded-full flex items-center justify-center">
                                      <span className="text-xs font-medium text-mw-gray-600">{speaker.name[0]}</span>
                                    </div>
                                  )}
                                  <div>
                                    <p className="text-sm font-medium text-mw-gray-900">{speaker.name}</p>
                                    {speaker.role && <p className="text-xs text-mw-gray-500">{speaker.role}</p>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Link 
                          href={event.slug ? `/events/${event.slug}` : '#'}
                          className="inline-block px-6 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-colors shadow-mw-md"
                        >
                          {event.price === 'Free' ? 'Register Free' : 
                           event.price === 'Conference Pass Required' ? 'Learn More' :
                           event.price === 'Invitation Only' ? 'Request Invite' : 'Register Now'}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Past Events */}
      {activeTab === 'past' && (
        <section className="py-16 bg-mw-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-2">Past Events</h2>
              <p className="text-lg text-mw-gray-600">Browse our event history</p>
            </div>

            {pastEvents.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl">
                <svg className="w-16 h-16 text-mw-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-mw-gray-700 mb-2">No Past Events</h3>
                <p className="text-mw-gray-500">Events will appear here once they&apos;ve concluded.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border border-mw-gray-200 rounded-xl overflow-hidden hover:shadow-mw-lg transition-all duration-300"
                  >
                    <div className="grid lg:grid-cols-3 gap-6 p-6">
                      {/* Event Image/Preview */}
                      <div className="lg:col-span-1">
                        <Link href={event.slug ? `/events/${event.slug}` : '#'}>
                          <div className="aspect-video bg-gradient-to-br from-mw-gray-400 to-mw-gray-600 rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer">
                            {event.featuredImage ? (
                              <img src={event.featuredImage} alt={event.title} className="w-full h-full object-cover grayscale-[30%]" />
                            ) : (
                              <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span className="absolute top-3 right-3 px-3 py-1 bg-mw-gray-700 text-white text-xs font-medium rounded-full">
                              Completed
                            </span>
                            <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full ${
                              event.type === 'Webinar' ? 'bg-green-100 text-green-700' :
                              event.type === 'Workshop' ? 'bg-purple-100 text-purple-700' :
                              event.type === 'Conference' ? 'bg-orange-100 text-orange-700' :
                              event.type === 'Summit' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {event.type}
                            </span>
                          </div>
                        </Link>
                      </div>

                      {/* Event Details */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <Link href={event.slug ? `/events/${event.slug}` : '#'}>
                              <h3 className="text-2xl font-bold text-mw-gray-900 mb-2 hover:text-mw-blue-600 transition-colors cursor-pointer">{event.title}</h3>
                            </Link>
                            <p className="text-mw-gray-600 mb-4">{event.description}</p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                            <svg className="w-5 h-5 text-mw-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                            <svg className="w-5 h-5 text-mw-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {/* Speakers */}
                        {event.speakersList && event.speakersList.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-mw-gray-500 mb-2">Speakers</p>
                            <div className="flex items-center gap-3 flex-wrap">
                              {event.speakersList.slice(0, 3).map((speaker, spkIdx) => (
                                <div key={spkIdx} className="flex items-center gap-2">
                                  {speaker.image ? (
                                    <img src={speaker.image} alt={speaker.name} className="w-8 h-8 rounded-full object-cover" />
                                  ) : (
                                    <div className="w-8 h-8 bg-mw-gray-200 rounded-full flex items-center justify-center">
                                      <span className="text-xs font-medium text-mw-gray-600">{speaker.name[0]}</span>
                                    </div>
                                  )}
                                  <div>
                                    <p className="text-sm font-medium text-mw-gray-900">{speaker.name}</p>
                                    {speaker.role && <p className="text-xs text-mw-gray-500">{speaker.role}</p>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Link 
                          href={event.slug ? `/events/${event.slug}` : '#'}
                          className="inline-block px-6 py-3 bg-mw-gray-600 hover:bg-mw-gray-700 text-white font-medium rounded-lg transition-colors shadow-mw-md"
                        >
                          View Event Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
