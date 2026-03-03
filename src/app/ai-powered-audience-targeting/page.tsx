"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AIPoweredAudienceTargetingPage() {
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
                Product Launch
              </span>
              <span className="text-mw-gray-500">November 15, 2024</span>
              <span className="text-mw-gray-400">•</span>
              <span className="text-mw-gray-500">3 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
              Moving Walls Launches AI-Powered Audience Targeting Platform
            </h1>
            
            <p className="text-xl text-mw-gray-600 leading-relaxed mb-8">
              Revolutionary machine learning algorithms improve campaign performance by 40% while reducing cost per acquisition across all advertising channels.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-mw-blue-700 font-medium">AI-Powered Platform Launch</p>
              </div>
            </div>

            <div className="text-mw-gray-700 space-y-6">
              <p className="text-lg font-medium text-mw-gray-900">
                NEW YORK, NY - November 15, 2024 - Moving Walls, the leading advertising technology platform, today announced the launch of its revolutionary AI-powered audience targeting platform, marking a significant milestone in programmatic advertising innovation.
              </p>

              <p>
                The new platform leverages advanced machine learning algorithms and real-time data processing to deliver unprecedented targeting accuracy, resulting in an average 40% improvement in campaign performance and a 25% reduction in cost per acquisition for early adopters.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Revolutionary Technology</h2>
              
              <p>
                "This launch represents years of research and development in artificial intelligence and machine learning," said Sarah Chen, Chief Technology Officer at Moving Walls. "Our AI platform doesn't just analyze demographics—it understands behavioral patterns, contextual signals, and real-time intent to deliver the right message to the right person at precisely the right moment."
              </p>

              <p>
                The platform processes over 10 billion data points daily, analyzing everything from browsing behavior and purchase history to weather patterns and local events that might influence consumer decisions. This comprehensive approach enables advertisers to reach their ideal customers with surgical precision.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Key Features</h2>
              
              <ul className="space-y-3">
                <li><strong>Predictive Audience Modeling:</strong> AI algorithms predict future customer behavior based on historical data and real-time signals</li>
                <li><strong>Dynamic Creative Optimization:</strong> Automatically adjusts ad creative elements based on audience preferences and performance data</li>
                <li><strong>Real-time Bidding Intelligence:</strong> Optimizes bid strategies using machine learning to maximize ROI</li>
                <li><strong>Cross-channel Attribution:</strong> Provides comprehensive view of customer journey across all touchpoints</li>
                <li><strong>Privacy-First Design:</strong> Built with privacy compliance at its core, ensuring GDPR and CCPA compliance</li>
              </ul>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Industry Impact</h2>
              
              <p>
                Beta testing with select partners showed remarkable results. Global retail giant TechnoMart saw a 45% increase in conversion rates, while fashion brand StyleForward achieved a 60% reduction in customer acquisition costs. Healthcare provider MedCare improved appointment bookings by 35% while maintaining strict compliance standards.
              </p>

              <p>
                "The results speak for themselves," said Michael Rodriguez, VP of Marketing at TechnoMart. "Moving Walls's AI platform didn't just improve our advertising performance—it transformed how we think about customer engagement. We're reaching customers we never knew existed with messages that truly resonate."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Looking Forward</h2>
              
              <p>
                The AI-powered audience targeting platform is now available to all Moving Walls clients, with enterprise features rolling out over the next quarter. The company plans to expand the platform's capabilities to include voice and video content optimization, as well as augmented reality advertising experiences.
              </p>

              <p>
                "This is just the beginning," added Chen. "We're already working on the next generation of AI features that will make advertising even more relevant, effective, and respectful of consumer privacy. The future of advertising is intelligent, and it starts today."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">About Moving Walls</h2>
              
              <p>
                Founded in 2015, Moving Walls is a leading advertising technology company that specializes in programmatic advertising, audience targeting, and campaign optimization. With offices in New York, San Francisco, London, and Singapore, Moving Walls serves over 500 brands worldwide and processes billions of advertising transactions daily. For more information, visit www.movingwalls.com.
              </p>

              <div className="bg-mw-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-bold text-mw-gray-900 mb-4">Media Contact</h3>
                <p className="text-mw-gray-700">
                  Jennifer Walsh<br/>
                  Director of Communications<br/>
                  Moving Walls<br/>
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