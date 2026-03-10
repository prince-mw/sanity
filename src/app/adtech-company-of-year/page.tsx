"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AdTechCompanyOfYearPage() {
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
                Recognition
              </span>
              <span className="text-mw-gray-500">August 5, 2024</span>
              <span className="text-mw-gray-400">•</span>
              <span className="text-mw-gray-500">3 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
              MovingWalls Named 'AdTech Company of the Year' by Industry Awards
            </h1>
            
            <p className="text-xl text-mw-gray-600 leading-relaxed mb-8">
              Recognition highlights company's innovation in programmatic advertising and measurement solutions, cementing position as industry leader.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <p className="text-mw-blue-700 font-medium">Industry Recognition</p>
              </div>
            </div>

            <div className="text-mw-gray-700 space-y-6">
              <p className="text-lg font-medium text-mw-gray-900">
                NEW YORK, NY - August 5, 2024 - MovingWalls has been named 'AdTech Company of the Year' at the prestigious Digital Marketing Excellence Awards, recognizing the company's outstanding innovation in programmatic advertising and measurement solutions.
              </p>

              <p>
                The award ceremony, held at the Marriott Marquis in New York City, brought together over 1,000 industry leaders, marketers, and technology innovators to celebrate excellence in digital marketing and advertising technology.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Award Recognition</h2>
              
              <p>
                The judges praised MovingWalls's comprehensive approach to solving complex advertising challenges through innovative technology and data-driven insights. The company was specifically recognized for its AI-powered audience targeting platform, privacy-first measurement tools, and exceptional client results.
              </p>

              <p>
                "MovingWalls has consistently demonstrated leadership in advancing advertising technology while maintaining the highest standards of privacy and transparency," said Dr. Elizabeth Harper, Chair of the Awards Committee. "Their innovative solutions have set new industry benchmarks for effectiveness and accountability."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Innovation Highlights</h2>
              
              <p>
                The award recognizes several key innovations that MovingWalls introduced over the past year:
              </p>

              <ul className="space-y-3">
                <li><strong>AI-Powered Targeting:</strong> Revolutionary machine learning algorithms that improve campaign performance by up to 40%</li>
                <li><strong>Privacy-First Measurement:</strong> Industry-leading tools that provide accurate attribution while ensuring complete privacy compliance</li>
                <li><strong>Cross-Channel Optimization:</strong> Unified platform that optimizes campaigns across all digital and traditional media channels</li>
                <li><strong>Real-Time Analytics:</strong> Advanced dashboard providing actionable insights within minutes of campaign launch</li>
              </ul>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Client Impact</h2>
              
              <p>
                The recognition comes as MovingWalls continues to deliver exceptional results for its global client base. Over the past year, the platform has:
              </p>

              <ul className="space-y-2 ml-6">
                <li>• Improved average campaign ROI by 45%</li>
                <li>• Reduced cost per acquisition by 30% across all verticals</li>
                <li>• Increased brand awareness metrics by 50%</li>
                <li>• Achieved 98% client satisfaction scores</li>
                <li>• Processed over $2 billion in advertising spend</li>
              </ul>

              <p>
                "This award is a testament to our team's dedication to innovation and our clients' success," said David Kim, CEO of MovingWalls. "We're honored to be recognized by our peers and remain committed to pushing the boundaries of what's possible in advertising technology."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Industry Leadership</h2>
              
              <p>
                The award adds to MovingWalls's growing list of industry accolades, including recognition from AdExchanger, Digiday, and the Interactive Advertising Bureau. The company has been consistently ranked among the top advertising technology platforms by leading industry publications.
              </p>

              <p>
                Sarah Chen, Chief Technology Officer, accepted the award on behalf of the company, highlighting the collaborative effort across all teams. "This recognition belongs to every member of the MovingWalls family who works tirelessly to deliver exceptional results for our clients," Chen said during her acceptance speech.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Future Innovation</h2>
              
              <p>
                Looking ahead, MovingWalls plans to continue its innovation trajectory with upcoming launches in voice advertising, connected TV optimization, and augmented reality ad experiences. The company is also expanding its machine learning capabilities to provide even more sophisticated targeting and measurement solutions.
              </p>

              <div className="bg-mw-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-bold text-mw-gray-900 mb-4">About Digital Marketing Excellence Awards</h3>
                <p className="text-mw-gray-700">
                  The Digital Marketing Excellence Awards recognize outstanding achievement in digital marketing and advertising technology. Established in 2010, the awards have become the industry's most prestigious recognition program, celebrating innovation, results, and leadership in digital marketing.
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