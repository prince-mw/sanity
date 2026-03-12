"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import { useState, useEffect } from "react";
import { getAllEvents, transformEvent, SanityEvent } from "../../sanity/lib/fetch";

// Static fallback data
const staticEvents = [
  {
    title: "The Future of Programmatic Advertising",
    type: "Webinar",
    date: "December 15, 2024",
    time: "2:00 PM - 3:00 PM PST",
    location: "Virtual Event",
    description: "Join our experts as we explore emerging trends in programmatic advertising and discuss how AI is reshaping the industry.",
    speakers: ["Sarah Mitchell, CEO", "David Chen, CTO"],
    price: "Free",
    capacity: "500 attendees",
    category: "Technology",
    featured: true
  },
  {
    title: "MovingWalls at AdTech Conference 2025",
    type: "Conference",
    date: "January 22-24, 2025",
    time: "9:00 AM - 6:00 PM PST",
    location: "Moscone Center, San Francisco",
    description: "Meet our team at booth #245 and see live demos of our latest advertising technology innovations.",
    speakers: ["Maria Rodriguez, CMO", "Product Demo Team"],
    price: "Conference Pass Required",
    capacity: "Meet at Booth #245",
    category: "Conference",
    featured: false
  },
  {
    title: "Data Privacy in Modern Advertising",
    type: "Workshop",
    date: "February 8, 2025",
    time: "10:00 AM - 4:00 PM EST",
    location: "New York Office",
    description: "Interactive workshop covering privacy-first advertising strategies and compliance with global data regulations.",
    speakers: ["Dr. Lisa Park, CDO", "Legal & Compliance Team"],
    price: "$299",
    capacity: "30 attendees",
    category: "Compliance",
    featured: false
  },
  {
    title: "Customer Success Stories & Best Practices",
    type: "Webinar",
    date: "February 20, 2025",
    time: "1:00 PM - 2:00 PM EST",
    location: "Virtual Event",
    description: "Learn from successful campaigns and discover best practices from leading brands using MovingWalls platforms.",
    speakers: ["Michael Brown, CRO", "Customer Success Team"],
    price: "Free",
    capacity: "1000 attendees",
    category: "Case Studies",
    featured: false
  },
  {
    title: "MovingWalls European Summit",
    type: "Summit",
    date: "March 15, 2025",
    time: "9:00 AM - 5:00 PM GMT",
    location: "London Office",
    description: "Annual European summit featuring keynotes, networking, and deep-dive sessions on advertising innovation.",
    speakers: ["Full Leadership Team", "Industry Guest Speakers"],
    price: "Invitation Only",
    capacity: "150 attendees",
    category: "Summit",
    featured: true
  },
  {
    title: "Mobile Advertising Masterclass",
    type: "Training",
    date: "March 28, 2025",
    time: "11:00 AM - 3:00 PM PST",
    location: "San Francisco Office",
    description: "Hands-on training session focused on mobile advertising strategies and campaign optimization techniques.",
    speakers: ["Product Training Team", "Mobile Strategy Experts"],
    price: "$199",
    capacity: "25 attendees",
    category: "Training",
    featured: false
  }
];

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState(staticEvents);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const sanityEvents = await getAllEvents();
        if (sanityEvents && sanityEvents.length > 0) {
          const transformedEvents = sanityEvents.map(transformEvent);
          setUpcomingEvents(transformedEvents);
        }
      } catch (error) {
        console.error('Error fetching events from Sanity:', error);
        // Keep static data as fallback
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const eventTypes = [
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      title: "Webinars",
      description: "Free online sessions covering industry trends and product updates",
      count: "12+ per year"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" /></svg>,
      title: "Workshops",
      description: "Interactive, hands-on training sessions at our global offices",
      count: "8+ per year"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: "Conferences",
      description: "Industry conferences where you can meet our team and see demos",
      count: "15+ per year"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      title: "Training",
      description: "Deep-dive training sessions and certification programs",
      count: "6+ per year"
    }
  ];

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
              Don't miss these upcoming opportunities to learn, network, and advance your advertising expertise.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-mw-blue-200"></div>

            <div className="space-y-12">
              {upcomingEvents.map((event, index) => (
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
  );
}