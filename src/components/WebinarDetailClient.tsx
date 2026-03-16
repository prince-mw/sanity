'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface WebinarDetail {
  id: string
  slug: string
  title: string
  description: string
  date: string
  time: string
  duration: string
  speaker: string
  speakerRole: string
  speakerImage: string
  featuredImage: string
  attendees: number
  views: number
  rating: number
  level: string
  webinarType: 'upcoming' | 'past'
  registrationLink: string
  watchLink: string
  content?: any
}

interface RelatedWebinar {
  slug: string
  title: string
  description: string
  date: string
  duration: string
  speaker: string
  speakerRole: string
  featuredImage: string
  level: string
  webinarType: 'upcoming' | 'past'
}

interface WebinarDetailClientProps {
  webinar: WebinarDetail
  relatedWebinars: RelatedWebinar[]
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <img
            src={value.asset.url}
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
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-mw-gray-900 mt-6 mb-3">{children}</h3>
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
        target="_blank" 
        rel="noopener noreferrer"
        className="text-mw-blue-600 hover:underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-mw-gray-900">{children}</strong>
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
}

function formatDate(dateString: string): string {
  if (!dateString) return 'TBD'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatLevel(level: string): string {
  if (!level) return 'All Levels'
  return level.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

export default function WebinarDetailClient({ webinar, relatedWebinars }: WebinarDetailClientProps) {
  const isUpcoming = webinar.webinarType === 'upcoming'

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-mw-gray-600">
                <li>
                  <Link href="/" className="hover:text-mw-blue-600 transition-colors">Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/webinars" className="hover:text-mw-blue-600 transition-colors">Webinars</Link>
                </li>
                <li>/</li>
                <li className="text-mw-gray-900 font-medium truncate max-w-[200px]">{webinar.title}</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Content */}
              <div>
                {/* Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    isUpcoming 
                      ? 'bg-mw-blue-100 text-mw-blue-700' 
                      : 'bg-mw-gray-100 text-mw-gray-700'
                  }`}>
                    {isUpcoming ? 'Upcoming Webinar' : 'Past Webinar'}
                  </span>
                  <span className="px-3 py-1 bg-mw-gray-100 text-mw-gray-600 rounded-full text-xs font-medium">
                    {formatLevel(webinar.level)}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
                  {webinar.title}
                </h1>

                <p className="text-xl text-mw-gray-600 mb-8 leading-relaxed">
                  {webinar.description}
                </p>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-mw-gray-600">
                    <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-mw-gray-500">Date</p>
                      <p className="font-medium text-mw-gray-900">{formatDate(webinar.date)}</p>
                    </div>
                  </div>

                  {webinar.time && (
                    <div className="flex items-center gap-3 text-mw-gray-600">
                      <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-mw-gray-500">Time</p>
                        <p className="font-medium text-mw-gray-900">{webinar.time}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-mw-gray-600">
                    <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-mw-gray-500">Duration</p>
                      <p className="font-medium text-mw-gray-900">{webinar.duration || '60 min'}</p>
                    </div>
                  </div>

                  {isUpcoming && webinar.attendees > 0 && (
                    <div className="flex items-center gap-3 text-mw-gray-600">
                      <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-mw-gray-500">Registered</p>
                        <p className="font-medium text-mw-gray-900">{webinar.attendees.toLocaleString()} attendees</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {isUpcoming ? (
                    <>
                      <a
                        href={webinar.registrationLink || '/contact'}
                        target={webinar.registrationLink ? '_blank' : undefined}
                        rel={webinar.registrationLink ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-xl transition-colors shadow-mw-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Register Now
                      </a>
                      <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-mw-gray-200 hover:border-mw-blue-600 text-mw-gray-700 hover:text-mw-blue-600 font-semibold rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Add to Calendar
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href={webinar.watchLink || '#'}
                        target={webinar.watchLink ? '_blank' : undefined}
                        rel={webinar.watchLink ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-xl transition-colors shadow-mw-lg"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        Watch Recording
                      </a>
                      <Link
                        href="/webinars"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-mw-gray-200 hover:border-mw-blue-600 text-mw-gray-700 hover:text-mw-blue-600 font-semibold rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Browse All Webinars
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Featured Image / Video */}
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 rounded-2xl overflow-hidden shadow-2xl relative">
                  {webinar.featuredImage ? (
                    <img 
                      src={webinar.featuredImage} 
                      alt={webinar.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                  )}
                  {!isUpcoming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-mw-blue-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Speaker Section */}
      <section className="py-16 bg-white border-b border-mw-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-mw-gray-900 mb-8">About the Speaker</h2>
            <div className="flex items-center gap-6 bg-mw-gray-50 rounded-2xl p-6">
              {webinar.speakerImage ? (
                <img 
                  src={webinar.speakerImage} 
                  alt={webinar.speaker}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-mw-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-mw-blue-600">
                    {webinar.speaker?.charAt(0) || 'S'}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-mw-gray-900">{webinar.speaker || 'Speaker TBD'}</h3>
                <p className="text-mw-gray-600">{webinar.speakerRole || 'Moving Walls'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      {webinar.content && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-mw-gray-900 mb-8">What You&apos;ll Learn</h2>
              <div className="prose prose-lg max-w-none">
                <PortableText value={webinar.content} components={portableTextComponents} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Webinars */}
      {relatedWebinars.length > 0 && (
        <section className="py-16 bg-mw-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-mw-gray-900">More Webinars</h2>
                <Link 
                  href="/webinars"
                  className="text-mw-blue-600 hover:text-mw-blue-700 font-medium flex items-center gap-1"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedWebinars.map((related, index) => (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/webinars/${related.slug}`}
                      className="block bg-white rounded-xl overflow-hidden shadow-mw-sm hover:shadow-mw-lg transition-all duration-300 group"
                    >
                      <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 relative">
                        {related.featuredImage && (
                          <img 
                            src={related.featuredImage} 
                            alt={related.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                          related.webinarType === 'upcoming'
                            ? 'bg-mw-blue-100 text-mw-blue-700'
                            : 'bg-mw-gray-100 text-mw-gray-700'
                        }`}>
                          {related.webinarType === 'upcoming' ? 'Upcoming' : 'Past'}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-mw-gray-900 mb-2 group-hover:text-mw-blue-600 transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-mw-gray-600 mb-4 line-clamp-2">{related.description}</p>
                        <div className="flex items-center gap-2 text-sm text-mw-gray-500">
                          <span>{formatDate(related.date)}</span>
                          <span>•</span>
                          <span>{related.duration || '60 min'}</span>
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
      <section className="py-20 bg-gradient-to-br from-mw-blue-600 to-mw-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {isUpcoming ? 'Secure Your Spot Today' : 'Want to Learn More?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {isUpcoming 
                ? 'Register now and join our live session with industry experts.'
                : 'Explore our upcoming webinars and stay ahead of industry trends.'
              }
            </p>
            {isUpcoming ? (
              <a
                href={webinar.registrationLink || '/contact'}
                target={webinar.registrationLink ? '_blank' : undefined}
                rel={webinar.registrationLink ? 'noopener noreferrer' : undefined}
                className="inline-block px-8 py-4 bg-white text-mw-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-mw-lg"
              >
                Register for Free
              </a>
            ) : (
              <Link
                href="/webinars"
                className="inline-block px-8 py-4 bg-white text-mw-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-mw-lg"
              >
                Browse Upcoming Webinars
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
