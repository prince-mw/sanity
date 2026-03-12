'use client'

import { motion } from 'framer-motion'
import ContactForm from './ContactForm'

export interface Event {
  title: string
  type: string
  date: string
  time: string
  location: string
  description: string
  speakers: string[]
  price: string
  capacity: string
  category: string
  featured: boolean
}

interface EventsPageClientProps {
  events: Event[]
}

export default function EventsPageClient({ events }: EventsPageClientProps) {
  const eventTypes = [
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      title: 'Webinars',
      description: 'Free online sessions covering industry trends and product updates',
      count: '12+ per year'
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" /></svg>,
      title: 'Workshops',
      description: 'Interactive, hands-on training sessions at our global offices',
      count: '8+ per year'
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: 'Conferences',
      description: 'Industry conferences where you can meet our team and see demos',
      count: '15+ per year'
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      title: 'Training',
      description: 'Deep-dive training sessions and certification programs',
      count: '6+ per year'
    }
  ]

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-8">
              <span className="text-mw-blue-600 text-sm font-medium">Learning & Networking</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Events & Training
              <span className="text-mw-blue-600 block">Learn & Connect</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join us for webinars, workshops, conferences, and training sessions. 
              Stay ahead of industry trends, learn best practices, and connect with 
              fellow advertising professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events - Timeline View */}
      <section className="py-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Don&apos;t miss these upcoming opportunities to learn, network, and advance your advertising expertise.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-mw-blue-200"></div>

            <div className="space-y-12">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-mw-blue-600 border-4 border-white shadow-lg z-10"></div>

                  {/* Date badge - mobile */}
                  <div className="ml-16 md:hidden mb-2">
                    <span className="inline-block px-3 py-1 bg-mw-blue-600 text-white text-sm font-semibold rounded-full">
                      {event.date}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    {/* Date badge - desktop */}
                    <div className={`hidden md:block mb-3 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <span className="inline-block px-3 py-1 bg-mw-blue-600 text-white text-sm font-semibold rounded-full">
                        {event.date}
                      </span>
                    </div>

                    <div className={`bg-white rounded-xl shadow-lg border border-mw-gray-100 p-6 hover:shadow-xl transition-shadow ${
                      event.featured ? 'border-mw-blue-300 ring-2 ring-mw-blue-100' : ''
                    }`}>
                      <div className={`flex items-center gap-2 mb-3 flex-wrap ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        {event.featured && (
                          <span className="px-2 py-1 bg-mw-blue-100 text-mw-blue-600 text-xs font-medium rounded-full">
                            Featured
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          event.type === 'Webinar' ? 'bg-green-100 text-green-600' :
                          event.type === 'Workshop' ? 'bg-purple-100 text-purple-600' :
                          event.type === 'Conference' ? 'bg-orange-100 text-orange-600' :
                          event.type === 'Summit' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {event.type}
                        </span>
                      </div>

                      <h3 className={`text-xl font-bold text-mw-gray-900 mb-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        {event.title}
                      </h3>
                      
                      <p className={`text-mw-gray-600 text-sm mb-4 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        {event.description}
                      </p>

                      <div className={`flex flex-col gap-2 text-sm text-mw-gray-500 mb-4 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="text-mw-blue-600 font-semibold">{event.price}</span>
                        <button className="px-4 py-2 bg-mw-blue-600 hover:bg-mw-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
                          {event.price === 'Free' ? 'Register Free' : 
                           event.price === 'Conference Pass Required' ? 'Find Us There' :
                           event.price === 'Invitation Only' ? 'Request Invite' : 'Register Now'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  )
}
