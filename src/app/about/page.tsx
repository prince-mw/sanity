"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "../../components/ContactForm";

const associations = [
  { name: "World Out of Home Organisation", logo: "/assets/images/proudly-associated-logos/world-out-of-home-organisation-member-2024.png" },
  { name: "IAB SEA+India", logo: "/assets/images/proudly-associated-logos/iab-sea-india.png" },
  { name: "Digital Signage Federation", logo: "/assets/images/proudly-associated-logos/digital-signage-federation.png" },
  { name: "Outdoor Advertising Association of Malaysia", logo: "/assets/images/proudly-associated-logos/outdoor-advertising-association-of-malaysia.png" },
  { name: "Malaysian Digital Association", logo: "/assets/images/proudly-associated-logos/malaysian-digital-association.png" },
  { name: "Malaysia Advertisers Association", logo: "/assets/images/proudly-associated-logos/malaysia-advertisers-association.png" },
  { name: "Association of Advertising and Marketing Singapore", logo: "/assets/images/proudly-associated-logos/association-of-advertising-and-marketing-singapore.png" },
  { name: "Media Specialists Association of the Philippines", logo: "/assets/images/proudly-associated-logos/media-specialists-association-of-the-philippines.png" },
  { name: "Outdoor Advertising Association of Nigeria", logo: "/assets/images/proudly-associated-logos/outdoor-advertising-association-of-nigeria.png" },
];

export default function AboutUsPage() {
  const stats = [
    { number: "10B+", label: "Data Points Processed" },
    { number: "100K+", label: "OOH & Retail Sites Measured" },
    { number: "4", label: "Continents" },
    { number: "7+", label: "Markets Worldwide" }
  ];

  const capabilities = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Multi-Signal Measurement",
      description: "US patented multi-sensor technology tracking real-world movement for smarter planning and verification."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Programmatic Automation",
      description: "Unified connected media platform bringing addressability and automation to out-of-home advertising."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location Intelligence",
      description: "Turn physical locations into measurable, actionable media opportunities with behavioural insights."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Full-Funnel Measurement",
      description: "Deliver outcomes from exposure to action with our Global Multi-Signal OOH Measurement Framework."
    }
  ];

  const awards = [
    { name: "APAC CIO Outlook", description: "Innovation Recognition" },
    { name: "TiE50", description: "Top 50 Startup" },
    { name: "Unilever", description: "Innovation Award" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid-about" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-about)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-8">
              <svg className="w-4 h-4 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-mw-blue-600 text-sm font-medium">About Moving Walls</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Transforming How Brands
              <span className="text-mw-blue-600 block">Reach Real People</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              A global connected media and programmatic out-of-home (pDOOH) company 
              operating across four continents and seven markets.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-mw-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-mw-gray-600 mb-6 leading-relaxed">
                Moving Walls is a global connected media and programmatic out-of-home (pDOOH) company 
                transforming how brands reach real people in real places. We combine behavioural 
                intelligence, audience research, and automation to turn physical locations into 
                measurable, actionable media opportunities.
              </p>
              <p className="text-lg text-mw-gray-600 leading-relaxed">
                Powered by <strong className="text-mw-blue-600">Moving Audiences®</strong>, our US patented 
                multi-sensor measurement technology, we process more than 10 billion data points and 
                measure over 100,000 OOH and retail media sites globally.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-mw-blue-600 to-mw-blue-700 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Moving Audiences®</h3>
                    <p className="text-mw-blue-100">US Patented Technology</p>
                  </div>
                </div>
                <p className="text-mw-blue-100 leading-relaxed">
                  By tracking real-world movement, we enable smarter planning, buying, verification, 
                  and content delivery across billboards, digital signage, transit, and now in-store retail media.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
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
              What We Do
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Our unified connected media platform brings addressability and automation to OOH, 
              connecting advertisers to all media channels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-mw-sm hover:shadow-mw-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-mw-blue-100 rounded-xl text-mw-blue-600 mb-4">
                  {capability.icon}
                </div>
                <h3 className="text-xl font-bold text-mw-gray-900 mb-3">{capability.title}</h3>
                <p className="text-mw-gray-600 leading-relaxed">{capability.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Platform Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-white rounded-2xl p-8 lg:p-12 shadow-mw-md"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-mw-gray-900 mb-4">
                  Global Multi-Signal OOH Measurement Framework
                </h3>
                <p className="text-mw-gray-600 leading-relaxed mb-4">
                  Built on a comprehensive measurement framework with full-funnel capabilities, 
                  we deliver outcomes from exposure to action, helping brands:
                </p>
                <ul className="space-y-3">
                  {[
                    "Activate programmatic DOOH at scale",
                    "Improve traditional OOH efficiency",
                    "Execute data-driven outdoor campaigns",
                    "Make location-based advertising measurable and transparent"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-mw-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-mw-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-mw-gray-100 to-mw-gray-200 rounded-xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-mw-blue-600 rounded-full text-white mb-4">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-mw-gray-900 mb-2">Independent Solutions</h4>
                  <p className="text-mw-gray-600">
                    We provide independent solutions for both buyers and sellers, 
                    making location-based advertising measurable, transparent, and optimised.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Awards & Recognition - Hidden for now
      <section className="py-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Recognition & Awards
            </h2>
            <p className="text-lg text-mw-gray-600">
              Recognised for innovation and excellence in out-of-home advertising technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-mw-sm hover:shadow-mw-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{award.name}</h3>
                <p className="text-mw-gray-600">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Proudly Associated Section */}
      <section className="py-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-mw-blue-600 text-sm font-medium uppercase tracking-wider">
              Our Partners
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mt-4 mb-6">
              We are Proudly Associated with
            </h2>
            <p className="text-mw-gray-600 max-w-2xl mx-auto text-lg">
              Partnering with leading industry organizations to drive innovation and excellence in out-of-home advertising.
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-mw-gray-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-mw-gray-50 to-transparent z-10" />

            {/* Scrolling logos */}
            <motion.div
              animate={{ x: [0, -1440] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-8"
            >
              {/* Triple the associations for seamless loop */}
              {[...associations, ...associations, ...associations].map((association, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 h-20 bg-white rounded-xl border-2 border-mw-gray-200 flex items-center justify-center group hover:border-mw-blue-400 hover:shadow-mw-lg transition-all duration-300 px-4"
                >
                  <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300 h-12 w-full relative">
                    <Image
                      src={association.logo}
                      alt={association.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-mw-blue-600 to-mw-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-mw-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              We are on a mission to reimagine out-of-home media and turn every screen into a connected opportunity. 
              By combining global reach with local expertise, we're transforming how brands connect with 
              audiences in the physical world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-mw-gray-50 text-mw-blue-600 font-semibold rounded-lg transition-colors shadow-lg"
              >
                Get in Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/our-story"
                className="px-8 py-3 border-2 border-white hover:bg-white hover:text-mw-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                Read Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
