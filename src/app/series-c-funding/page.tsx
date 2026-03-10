"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SeriesCFundingPage() {
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
                Funding
              </span>
              <span className="text-mw-gray-500">October 28, 2024</span>
              <span className="text-mw-gray-400">•</span>
              <span className="text-mw-gray-500">4 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
              MovingWalls Closes $50M Series C Funding Round
            </h1>
            
            <p className="text-xl text-mw-gray-600 leading-relaxed mb-8">
              Investment led by top-tier VCs will fuel international expansion and product development initiatives to accelerate growth in the global advertising technology market.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <p className="text-mw-blue-700 font-medium">Series C Funding Round</p>
              </div>
            </div>

            <div className="text-mw-gray-700 space-y-6">
              <p className="text-lg font-medium text-mw-gray-900">
                NEW YORK, NY - October 28, 2024 - MovingWalls, the rapidly growing advertising technology platform, today announced the successful completion of its $50 million Series C funding round, led by Sequoia Capital with participation from existing investors Andreessen Horowitz, GV (Google Ventures), and new investor Accel Partners.
              </p>

              <p>
                This latest funding round brings MovingWalls's total capital raised to $120 million and values the company at $800 million, representing a significant milestone in the company's journey to transform the advertising technology landscape.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Fueling Global Expansion</h2>
              
              <p>
                The Series C funding will primarily support MovingWalls's aggressive international expansion plans, with immediate focus on establishing stronger presence in European and Asian markets. The company plans to open new offices in Berlin, Tokyo, and Sydney by Q2 2025, while significantly expanding its existing London and Singapore operations.
              </p>

              <p>
                "This investment validates our vision of creating the most intelligent and effective advertising platform in the world," said David Kim, CEO and Co-founder of MovingWalls. "The funding will accelerate our global expansion and allow us to bring our innovative solutions to advertisers and publishers worldwide."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Strategic Investment Leadership</h2>
              
              <p>
                Sequoia Capital's decision to lead the round reflects confidence in MovingWalls's market position and growth trajectory. Partner Amanda Chen from Sequoia Capital will join MovingWalls's board of directors, bringing extensive experience in scaling technology companies globally.
              </p>

              <p>
                "MovingWalls has demonstrated exceptional growth and innovation in the advertising technology space," said Amanda Chen. "Their AI-driven approach to audience targeting and campaign optimization is exactly what the market needs, and we're excited to support their next phase of growth."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Investment Allocation</h2>
              
              <ul className="space-y-3">
                <li><strong>International Expansion (40%):</strong> Opening new offices and hiring local teams in key markets</li>
                <li><strong>Product Development (30%):</strong> Accelerating AI and machine learning capabilities</li>
                <li><strong>Talent Acquisition (20%):</strong> Expanding engineering, sales, and customer success teams</li>
                <li><strong>Strategic Partnerships (10%):</strong> Building relationships with key industry players</li>
              </ul>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Market Performance</h2>
              
              <p>
                MovingWalls has experienced remarkable growth over the past year, with revenue increasing 300% year-over-year and client base expanding to over 500 brands globally. The platform now processes over $2 billion in advertising spend annually, making it one of the fastest-growing adtech platforms in the market.
              </p>

              <p>
                Key metrics driving investor confidence include:
              </p>

              <ul className="space-y-2 ml-6">
                <li>• 300% year-over-year revenue growth</li>
                <li>• 95% client retention rate</li>
                <li>• $2B+ in annual advertising spend managed</li>
                <li>• 40% average improvement in campaign performance</li>
                <li>• Operations in 15 countries across 4 continents</li>
              </ul>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Industry Recognition</h2>
              
              <p>
                The funding announcement comes on the heels of significant industry recognition for MovingWalls, including being named "AdTech Company of the Year" and ranking #12 on the Fast Company Most Innovative Companies list. The company's AI-powered platform has been praised for its ability to deliver superior results while maintaining strict privacy compliance.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Future Outlook</h2>
              
              <p>
                With this new funding, MovingWalls is positioned to accelerate its mission of making advertising more intelligent, effective, and respectful of consumer privacy. The company plans to double its workforce over the next 18 months and launch several new product innovations.
              </p>

              <p>
                "We're just getting started," added CEO David Kim. "This funding gives us the resources to execute on our vision of transforming how brands connect with consumers. We're building the future of advertising, and this investment brings that future significantly closer."
              </p>

              <div className="bg-mw-gray-50 rounded-lg p-6 mt-8">
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