"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LondonHeadquartersPage() {
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
                Expansion
              </span>
              <span className="text-mw-gray-500">June 18, 2024</span>
              <span className="text-mw-gray-400">•</span>
              <span className="text-mw-gray-500">2 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
              MovingWalls Opens European Headquarters in London
            </h1>
            
            <p className="text-xl text-mw-gray-600 leading-relaxed mb-8">
              New office serves as regional hub for European operations and client services expansion, reinforcing commitment to global growth.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-mw-blue-700 font-medium">European Expansion</p>
              </div>
            </div>

            <div className="text-mw-gray-700 space-y-6">
              <p className="text-lg font-medium text-mw-gray-900">
                LONDON, UK - June 18, 2024 - MovingWalls today announced the opening of its European headquarters in London's prestigious Canary Wharf district, marking a significant milestone in the company's international expansion strategy.
              </p>

              <p>
                The new 25,000 square foot office will serve as the regional hub for MovingWalls's European operations, housing teams focused on sales, client services, product development, and regulatory compliance across the European market.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Strategic Location</h2>
              
              <p>
                Located at 40 Bank Street in Canary Wharf, the new headquarters positions MovingWalls at the heart of London's financial and technology district. The location provides easy access to major European markets and places the company alongside other leading global technology firms.
              </p>

              <p>
                "London is the perfect base for our European expansion," said David Kim, CEO of MovingWalls. "The city's position as a global financial center, combined with its thriving tech ecosystem and access to top talent, makes it an ideal location for our regional headquarters."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Team Expansion</h2>
              
              <p>
                The London office officially opened with a team of 50 employees and plans to expand to 150 staff members by the end of 2024. The company is actively recruiting across multiple departments, with particular focus on:
              </p>

              <ul className="space-y-2 ml-6">
                <li>• Engineering and product development</li>
                <li>• Sales and business development</li>
                <li>• Client success and account management</li>
                <li>• Marketing and communications</li>
                <li>• Legal and compliance</li>
                <li>• Data science and analytics</li>
              </ul>

              <p>
                Leading the European operations is Emma Richardson, who joins MovingWalls as VP of European Operations. Richardson brings over 15 years of experience in advertising technology and previously held senior positions at major adtech companies across Europe.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Market Opportunity</h2>
              
              <p>
                The European digital advertising market represents significant growth opportunity for MovingWalls, with programmatic advertising spend expected to reach €45 billion by 2025. The company's privacy-first approach and GDPR-compliant solutions position it well to serve European brands and agencies.
              </p>

              <p>
                "European advertisers are increasingly demanding sophisticated, privacy-compliant solutions that deliver real results," said Emma Richardson. "MovingWalls's technology platform and commitment to transparency make us uniquely positioned to serve this market."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Local Partnerships</h2>
              
              <p>
                As part of the European launch, MovingWalls has established partnerships with leading local agencies and technology providers, including:
              </p>

              <ul className="space-y-2 ml-6">
                <li>• GroupM UK for programmatic advertising</li>
                <li>• Havas Media Group for cross-channel campaigns</li>
                <li>• Independent agency partners across major European markets</li>
                <li>• Data providers for local market insights</li>
              </ul>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Technology and Innovation</h2>
              
              <p>
                The London office includes a dedicated innovation lab focused on developing solutions specific to European market needs. The lab will concentrate on areas including privacy technology, cross-border campaign optimization, and integration with European media platforms.
              </p>

              <p>
                "Innovation happens when you're close to your customers," added Richardson. "Our London innovation lab will ensure we're developing solutions that truly address the unique challenges European advertisers face."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Community Commitment</h2>
              
              <p>
                MovingWalls is committed to being an active member of the London tech community. The company plans to host regular industry events, participate in local tech meetups, and support advertising technology education initiatives at London universities.
              </p>

              <p>
                The office features modern collaborative spaces, state-of-the-art technology infrastructure, and sustainable design elements that reflect MovingWalls's commitment to environmental responsibility.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Future Expansion</h2>
              
              <p>
                The London headquarters represents the first phase of MovingWalls's European expansion. The company plans to establish additional offices in key European markets over the next 18 months, with Berlin and Amsterdam identified as priority locations.
              </p>

              <div className="bg-mw-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-bold text-mw-gray-900 mb-4">About MovingWalls European Operations</h3>
                <p className="text-mw-gray-700">
                  MovingWalls's European operations are headquartered in London and serve clients across the UK, Ireland, and continental Europe. The team focuses on delivering privacy-compliant, data-driven advertising solutions that help brands achieve their marketing objectives in the European market.
                </p>
              </div>

              <div className="bg-mw-gray-50 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-bold text-mw-gray-900 mb-4">Media Contact</h3>
                <p className="text-mw-gray-700">
                  Jennifer Walsh<br/>
                  Director of Communications<br/>
                  MovingWalls<br/>
                  Phone: (555) 123-4567<br/>
                  Email: media@movingwalls.com<br/><br/>
                  
                  Emma Richardson<br/>
                  VP of European Operations<br/>
                  MovingWalls Europe<br/>
                  Phone: +44 20 7946 0958<br/>
                  Email: emma.richardson@movingwalls.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}