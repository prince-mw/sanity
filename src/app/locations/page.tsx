'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

// Location data
const locations = [
  {
    country: "United States",
    city: "New York",
    flag: "🇺🇸",
    href: "/locations/usa",
    description: "World's largest OOH market",
    billboards: "350,000+",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80"
  },
  {
    country: "Malaysia",
    city: "Kuala Lumpur",
    flag: "🇲🇾",
    href: "/locations/malaysia",
    description: "Our headquarters and APAC hub",
    billboards: "50,000+",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80"
  },
  {
    country: "Singapore",
    city: "Singapore",
    flag: "🇸🇬",
    href: "/locations/singapore",
    description: "Strategic Southeast Asia operations",
    billboards: "15,000+",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80"
  },
  {
    country: "Indonesia",
    city: "Jakarta",
    flag: "🇮🇩",
    href: "/locations/indonesia",
    description: "Largest market in Southeast Asia",
    billboards: "100,000+",
    image: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80"
  },
  {
    country: "India",
    city: "Mumbai",
    flag: "🇮🇳",
    href: "/locations/india",
    description: "Rapidly growing OOH market",
    billboards: "200,000+",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80"
  },
  {
    country: "Philippines",
    city: "Manila",
    flag: "🇵🇭",
    href: "/locations/philippines",
    description: "Dynamic advertising landscape",
    billboards: "30,000+",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80"
  },
  {
    country: "Japan",
    city: "Tokyo",
    flag: "🇯🇵",
    href: "/locations/japan",
    description: "Premium digital OOH market",
    billboards: "80,000+",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80"
  },
  {
    country: "Australia",
    city: "Sydney",
    flag: "🇦🇺",
    href: "/locations/australia",
    description: "Leading Oceania operations",
    billboards: "25,000+",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80"
  },
  {
    country: "Sri Lanka",
    city: "Colombo",
    flag: "🇱🇰",
    href: "/locations/sri-lanka",
    description: "Emerging South Asian market",
    billboards: "10,000+",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=800&q=80"
  },
  {
    country: "Thailand",
    city: "Bangkok",
    flag: "🇹🇭",
    href: "/locations/thailand",
    description: "Vibrant advertising ecosystem",
    billboards: "45,000+",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80"
  },
]

const stats = [
  { label: "Countries", value: "10+" },
  { label: "Billboard Inventory", value: "850K+" },
  { label: "Daily Impressions", value: "1.5B+" },
  { label: "Partner Networks", value: "250+" },
]

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-5 h-5 text-mw-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-sm font-medium">Global Presence</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Global <span className="text-mw-blue-300">Locations</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl text-mw-blue-100 max-w-3xl mx-auto mb-12">
              With offices across Asia-Pacific and beyond, we provide localized support and access to premium OOH inventory worldwide.
            </motion.p>

            {/* Stats */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-mw-blue-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Markets
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any location to discover available billboard inventory and local advertising opportunities.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {locations.map((location) => (
              <motion.div key={location.country} variants={staggerItem}>
                <Link href={location.href} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${location.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <span className="text-3xl">{location.flag}</span>
                        <div>
                          <h3 className="text-xl font-bold text-white">{location.country}</h3>
                          <p className="text-white/80 text-sm">{location.city}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{location.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-semibold text-gray-900">{location.billboards} Billboards</span>
                        </div>
                        <span className="text-mw-blue-600 group-hover:translate-x-1 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Launch Your Campaign?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-8">
              Get in touch with our local teams to discover the best advertising opportunities in your target market.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-mw-blue-600 text-white font-semibold rounded-lg hover:bg-mw-blue-700 transition-colors"
              >
                Contact Us
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/mw-planner"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-mw-blue-600 text-mw-blue-600 font-semibold rounded-lg hover:bg-mw-blue-50 transition-colors"
              >
                Explore MW Planner
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
