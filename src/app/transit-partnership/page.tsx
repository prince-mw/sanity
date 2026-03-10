"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TransitPartnershipPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-mw-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/press-news" className="inline-flex items-center text-mw-blue-600 hover:text-mw-blue-700 mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Press & News
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-mw-blue-100 text-mw-blue-600 text-sm font-medium rounded-full">
                Partnership
              </span>
              <span className="text-mw-gray-500">September 12, 2024</span>
              <span className="text-mw-gray-400">•</span>
              <span className="text-mw-gray-500">2 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
              Strategic Partnership with Global Transit Authority Network
            </h1>
            
            <p className="text-xl text-mw-gray-600 leading-relaxed mb-8">
              Major partnership expands MovingWalls's out-of-home advertising network to 25 new metropolitan areas, reaching over 100 million daily commuters worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Featured Image */}
            <div className="relative h-80 bg-gradient-to-br from-mw-blue-50 to-mw-blue-100 rounded-xl mb-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-mw-blue-700 font-medium">Strategic Partnership</p>
              </div>
            </div>

            <div className="text-mw-gray-700 space-y-6">
              <p className="text-lg font-medium text-mw-gray-900">
                NEW YORK, NY - September 12, 2024 - MovingWalls today announced a landmark partnership with the Global Transit Authority Network (GTAN), significantly expanding its out-of-home advertising capabilities across 25 major metropolitan areas worldwide.
              </p>

              <p>
                This strategic alliance will provide MovingWalls with exclusive advertising access to premium transit locations including subway systems, bus networks, and transit hubs in cities across North America, Europe, and Asia, reaching an estimated 100 million daily commuters.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Partnership Scope</h2>
              
              <p>
                The partnership encompasses transit systems in major cities including:
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div>
                  <h4 className="font-semibold text-mw-gray-900">North America</h4>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• New York City</li>
                    <li>• Los Angeles</li>
                    <li>• Chicago</li>
                    <li>• Toronto</li>
                    <li>• Washington D.C.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-mw-gray-900">Europe</h4>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• London</li>
                    <li>• Paris</li>
                    <li>• Berlin</li>
                    <li>• Madrid</li>
                    <li>• Amsterdam</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-mw-gray-900">Asia-Pacific</h4>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Tokyo</li>
                    <li>• Singapore</li>
                    <li>• Sydney</li>
                    <li>• Hong Kong</li>
                    <li>• Seoul</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Digital Innovation in Transit</h2>
              
              <p>
                As part of this partnership, MovingWalls will deploy state-of-the-art digital displays throughout the transit network, featuring dynamic content capabilities and real-time optimization based on passenger flow, weather conditions, and local events.
              </p>

              <p>
                "This partnership represents a significant evolution in out-of-home advertising," said Maria Santos, VP of Strategic Partnerships at MovingWalls. "We're not just placing static ads in transit locations—we're creating dynamic, contextually relevant experiences that provide value to both advertisers and commuters."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Technology Integration</h2>
              
              <p>
                MovingWalls will integrate its proprietary AI-powered targeting technology with transit data to deliver highly relevant advertising content. The system will analyze factors including:
              </p>

              <ul className="space-y-2 ml-6">
                <li>• Peak and off-peak commuting patterns</li>
                <li>• Demographic data by station and route</li>
                <li>• Weather and seasonal factors</li>
                <li>• Local events and activities</li>
                <li>• Real-time ridership data</li>
              </ul>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Industry Impact</h2>
              
              <p>
                The partnership is expected to generate significant value for advertisers seeking to reach urban audiences at scale. Early pilot programs showed 60% higher engagement rates compared to traditional outdoor advertising, with particularly strong performance in the retail, entertainment, and technology sectors.
              </p>

              <p>
                "Transit advertising has always been about reaching people during their daily routines," said Dr. James Wright, GTAN Executive Director. "Our partnership with MovingWalls brings this medium into the digital age, creating opportunities for more relevant, engaging, and effective advertising experiences."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Rollout Timeline</h2>
              
              <p>
                The partnership will be implemented in phases, beginning with tier-one markets in Q1 2025. MovingWalls expects the full network to be operational by Q3 2025, with advanced features including mobile integration and augmented reality capabilities launching in select markets by year-end.
              </p>

              <p>
                Initial focus will be on high-traffic stations and routes, with expansion to secondary locations based on performance metrics and advertiser demand. The company anticipates this partnership will contribute significantly to its revenue growth in 2025 and beyond.
              </p>

              <div className="bg-mw-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-bold text-mw-gray-900 mb-4">About Global Transit Authority Network</h3>
                <p className="text-mw-gray-700">
                  GTAN is a consortium of major metropolitan transit authorities worldwide, representing over 25 cities and serving more than 100 million daily passengers. The network focuses on improving urban mobility while creating sustainable revenue opportunities through strategic partnerships.
                </p>
              </div>

              <div className="bg-mw-gray-50 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-bold text-mw-gray-900 mb-4">Media Contact</h3>
                <p className="text-mw-gray-700">
                  Jennifer Walsh<br/>
                  Director of Communications<br/>
                  MovingWalls<br/>
                  Phone: (555) 123-4567<br/>
                  Email: media@movingwalls.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}