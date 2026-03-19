'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

// Helper to build Sanity image URL from asset reference
function buildSanityImageUrl(image: any, width?: number): string {
  if (!image?.asset?._ref) return ''
  
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  
  if (!id || !dimensions || !format) return ''
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  
  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
  
  if (width) {
    url += `?w=${width}&q=85&auto=format`
  }
  
  return url
}

interface Speaker {
  name: string
  role: string
  company: string
  image: string
}

interface EventDetail {
  id: string
  slug: string
  title: string
  type: string
  description: string
  date: string
  time: string
  location: string
  price: string
  capacity: string
  category: string
  featured: boolean
  featuredImage: string
  registrationLink: string
  virtualLink: string
  isVirtual: boolean
  content?: any
  speakers: Speaker[]
}

interface RelatedEvent {
  slug: string
  title: string
  type: string
  date: string
  location: string
  description: string
  featuredImage: string
}

interface EventDetailClientProps {
  event: EventDetail
  relatedEvents: RelatedEvent[]
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      const imageUrl = buildSanityImageUrl(value, 800)
      if (!imageUrl) return null
      return (
        <figure className="my-8">
          <img
            src={imageUrl}
            alt={value.alt || ''}
            className="rounded-xl w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-mw-gray-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-mw-gray-900 mt-10 mb-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-mw-gray-900 mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold text-mw-gray-900 mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-mw-gray-700 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-mw-blue-500 pl-6 my-6 italic text-mw-gray-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a 
        href={value?.href} 
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-mw-blue-600 hover:underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-mw-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-mw-gray-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-mw-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
}

export default function EventDetailClient({ event, relatedEvents }: EventDetailClientProps) {
  const isPast = (() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const eventDate = new Date(event.date)
    if (isNaN(eventDate.getTime())) {
      const match = event.date.match(/(\w+)\s+(\d+)(?:-\d+)?,?\s*(\d{4})?/)
      if (match) {
        const months: Record<string, number> = {
          'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
          'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        }
        const month = months[match[1]] ?? 0
        const day = parseInt(match[2])
        const year = match[3] ? parseInt(match[3]) : today.getFullYear()
        const parsedDate = new Date(year, month, day)
        return parsedDate < today
      }
      return false
    }
    return eventDate < today
  })()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                href="/events"
                className="inline-flex items-center gap-2 text-mw-blue-600 hover:text-mw-blue-700 mb-6 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Events</span>
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                  isPast 
                    ? 'bg-mw-gray-200 text-mw-gray-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {isPast ? 'Completed' : 'Upcoming'}
                </span>
                <span className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                  event.type === 'Webinar' ? 'bg-green-100 text-green-700' :
                  event.type === 'Workshop' ? 'bg-purple-100 text-purple-700' :
                  event.type === 'Conference' ? 'bg-orange-100 text-orange-700' :
                  event.type === 'Summit' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {event.type}
                </span>
                {event.featured && (
                  <span className="px-4 py-1.5 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
                {event.title}
              </h1>

              <p className="text-xl text-mw-gray-600 mb-8 leading-relaxed">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-mw-gray-200">
                  <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-500">Date</p>
                    <p className="font-semibold text-mw-gray-900">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-mw-gray-200">
                  <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-500">Time</p>
                    <p className="font-semibold text-mw-gray-900">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-mw-gray-200">
                  <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-500">Location</p>
                    <p className="font-semibold text-mw-gray-900">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-mw-gray-200">
                  <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-500">Price</p>
                    <p className="font-semibold text-mw-blue-600">{event.price}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              {!isPast && (
                <div className="flex flex-wrap gap-4">
                  {event.registrationLink ? (
                    <a 
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-xl transition-colors shadow-mw-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Register Now
                    </a>
                  ) : (
                    <button 
                      className="inline-flex items-center gap-2 px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-xl transition-colors shadow-mw-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Register Now
                    </button>
                  )}
                  
                  {event.isVirtual && event.virtualLink && (
                    <a 
                      href={event.virtualLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-mw-gray-50 text-mw-gray-900 font-semibold rounded-xl border border-mw-gray-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Join Virtual Event
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:sticky lg:top-32"
            >
              <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 rounded-2xl overflow-hidden shadow-mw-xl">
                {event.featuredImage ? (
                  <img 
                    src={event.featuredImage} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Capacity Info */}
              {event.capacity && (
                <div className="mt-4 p-4 bg-mw-gray-50 rounded-xl border border-mw-gray-200">
                  <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Capacity: <strong className="text-mw-gray-900">{event.capacity}</strong></span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      {event.speakers && event.speakers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-8">Speakers</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.speakers.map((speaker, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-mw-gray-50 rounded-xl p-6 border border-mw-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      {speaker.image ? (
                        <img 
                          src={speaker.image} 
                          alt={speaker.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-mw-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-mw-blue-600">{speaker.name[0]}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-mw-gray-900">{speaker.name}</h3>
                        {speaker.role && (
                          <p className="text-sm text-mw-gray-600">{speaker.role}</p>
                        )}
                        {speaker.company && (
                          <p className="text-sm text-mw-blue-600">{speaker.company}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content Section */}
      {event.content && event.content.length > 0 && (
        <section className="py-16 bg-mw-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-8">About This Event</h2>
              <div className="bg-white rounded-2xl p-8 border border-mw-gray-200">
                <PortableText value={event.content} components={portableTextComponents} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-mw-gray-900">More Events</h2>
                <Link 
                  href="/events"
                  className="text-mw-blue-600 hover:text-mw-blue-700 font-medium transition-colors"
                >
                  View All →
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map((relEvent, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/events/${relEvent.slug}`}>
                      <div className="bg-white rounded-xl border border-mw-gray-200 overflow-hidden hover:shadow-mw-lg transition-all duration-300 group">
                        <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 relative overflow-hidden">
                          {relEvent.featuredImage ? (
                            <img 
                              src={relEvent.featuredImage} 
                              alt={relEvent.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-12 h-12 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                          <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${
                            relEvent.type === 'Webinar' ? 'bg-green-100 text-green-700' :
                            relEvent.type === 'Workshop' ? 'bg-purple-100 text-purple-700' :
                            relEvent.type === 'Conference' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {relEvent.type}
                          </span>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-mw-gray-900 mb-2 group-hover:text-mw-blue-600 transition-colors line-clamp-2">
                            {relEvent.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-mw-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{relEvent.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-mw-blue-600 to-mw-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-mw-blue-100 mb-8">
              Don&apos;t miss out on upcoming events, webinars, and training sessions.
            </p>
            <Link 
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-mw-blue-600 font-semibold rounded-xl hover:bg-mw-blue-50 transition-colors shadow-mw-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              View All Events
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
