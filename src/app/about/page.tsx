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
  const capabilities = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Multi-Signal Measurement",
      description: "Our patented multi-sensor technology captures real-world movement patterns to deliver verified reach, frequency, and audience insights. This replaces outdated traffic multipliers with real behavioural data."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Programmatic Automation",
      description: "We bring addressability and automation to out of home. Campaigns can be activated, optimised, and scaled across digital billboards, transit, digital signage, and in-store retail media from a unified platform."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location Intelligence",
      description: "We turn physical spaces into data-rich environments. By understanding how people move, dwell, and convert, brands can align creative, timing, and placement with actual behaviour."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Full-Funnel OOH Measurement",
      description: "Our Global Multi-Signal OOH Measurement Framework connects exposure to action. From verified impressions to store visits and business outcomes, we make performance visible."
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
              Moving Walls is a global connected media and programmatic out of home company powered by US patented measurement technology. We help brands reach real people in real places with precision, accountability, and confidence.
            </p>
            <p className="text-xl text-mw-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Across four continents and seven markets, we process more than 10 billion data points and measure over 100,000 OOH and retail media locations. Our scale is global. Our intelligence is local. Our focus is simple. Make outdoor media measurable, transparent, and performance driven.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are — Cinematic Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto leading-relaxed">
              Out of home advertising has always been powerful. But for decades it lacked one thing marketers demand today.
            </p>
          </motion.div>

          {/* PROOF highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            className="bg-mw-gray-50 border border-mw-gray-200 rounded-2xl py-10 px-8 text-center mb-10 relative overflow-hidden"
          >
            {/* Subtle animated glow behind text */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-mw-blue-100/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
            <p className="text-4xl md:text-5xl font-bold text-mw-blue-600 tracking-tight relative z-10">
              Proof.
            </p>
          </motion.div>

          {/* Narrative body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <p className="text-lg text-mw-gray-600 mb-5 leading-relaxed">
              We built Moving Walls to change that.
            </p>
            <p className="text-lg text-mw-gray-600 mb-5 leading-relaxed">
              At the heart of our platform is <strong className="text-mw-blue-600">Moving Audiences®</strong>, our US patented multi-sensor measurement technology. By tracking real-world movement and behavioural signals, we transform physical locations into intelligent, measurable media assets.
            </p>
            <p className="text-lg text-mw-gray-600 leading-relaxed">
              This is not just measurement. It is a fundamental shift in how outdoor media is planned, bought, verified, and optimised.
            </p>
          </motion.div>

          {/* Three comparison cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                before: "Estimated impressions",
                after: "Real audience intelligence",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                before: "Static placements",
                after: "Dynamic, data-driven campaigns",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                before: "Guesswork",
                after: "Accountability",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-mw-gray-50 border border-mw-gray-200 rounded-xl p-6 text-center hover:border-mw-blue-200 hover:shadow-sm transition-all duration-300"
              >
              <motion.div 
                className="inline-flex items-center justify-center w-10 h-10 bg-mw-blue-100 rounded-lg text-mw-blue-600 mb-4"
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                  {item.icon}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  className="text-sm text-mw-gray-400 line-through mb-2"
                >
                  {item.before}
                </motion.p>
                <motion.svg
                  className="w-4 h-4 text-mw-blue-400 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, y: -5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.15 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.15 }}
                  className="text-base font-semibold text-mw-gray-900"
                >
                  {item.after}
                </motion.p>
              </motion.div>
            ))}
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
              Our Core Capabilities
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Powered by Moving Audiences®, our technology stack transforms how outdoor media is planned, activated, and measured.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: 2x2 capability cards */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
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

            {/* Right: Industry Impact card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 bg-gradient-to-br from-mw-gray-900 to-mw-gray-800 rounded-2xl p-8 text-white overflow-hidden relative flex flex-col justify-center"
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="industry-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.5" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#industry-grid)" />
                </svg>
              </div>

              <div className="relative z-10 space-y-5">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-mw-blue-600/20 text-mw-blue-300 text-sm font-medium rounded-full mb-3">
                    Industry Impact
                  </span>
                  <h3 className="text-2xl font-bold">
                    Why This Changes the Industry
                  </h3>
                </div>

                <p className="text-mw-gray-300 leading-relaxed">
                  For years, out of home was treated as a top-of-funnel awareness channel. Powerful but difficult to measure. Important but hard to optimise.
                </p>

                {/* Highlighted callout */}
                <div className="bg-gradient-to-r from-mw-blue-600/20 to-mw-blue-500/10 border border-mw-blue-500/30 rounded-xl p-5">
                  <p className="text-lg font-bold text-white">
                    Moving Audiences® changes that reality.
                  </p>
                </div>

                <p className="text-mw-gray-300 leading-relaxed">
                  By grounding outdoor media in real-world behavioural data, we enable OOH to compete on the same performance metrics as digital channels. Campaigns become accountable. Media owners become data partners. Brands gain clarity instead of assumptions.
                </p>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-mw-blue-300 font-medium italic">
                    This is how out of home evolves from traditional visibility to connected media intelligence.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
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
              Our Associations
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