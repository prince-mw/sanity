"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function WhitepapersPage() {
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);

  const whitepapers = [
    {
      title: "The State of Digital Out-of-Home Advertising 2025",
      description: "Comprehensive analysis of DOOH trends, market dynamics, consumer behavior, and ROI metrics across industries.",
      category: "Industry Report",
      pages: 45,
      downloads: "12.5K+",
      publishDate: "Nov 2025",
      topics: ["Market Analysis", "Consumer Insights", "ROI Metrics", "Future Trends"],
      featured: true
    },
    {
      title: "AI-Powered Advertising: The Complete Guide",
      description: "How machine learning and artificial intelligence are transforming campaign optimization and audience targeting.",
      category: "Technology",
      pages: 38,
      downloads: "8.2K+",
      publishDate: "Oct 2025",
      topics: ["Machine Learning", "Optimization", "Targeting", "Automation"]
    },
    {
      title: "Programmatic DOOH: Best Practices for 2025",
      description: "Strategic framework for implementing and optimizing programmatic digital out-of-home advertising campaigns.",
      category: "Best Practices",
      pages: 32,
      downloads: "9.7K+",
      publishDate: "Sep 2025",
      topics: ["Programmatic", "Strategy", "Implementation", "Optimization"]
    },
    {
      title: "Healthcare Marketing Compliance Guide",
      description: "Navigate HIPAA regulations and healthcare advertising compliance while maximizing campaign effectiveness.",
      category: "Compliance",
      pages: 28,
      downloads: "5.4K+",
      publishDate: "Aug 2025",
      topics: ["HIPAA", "Compliance", "Healthcare", "Best Practices"]
    },
    {
      title: "Retail Advertising in the Omnichannel Era",
      description: "Strategies for connecting online and offline experiences to drive foot traffic and sales.",
      category: "Industry Guide",
      pages: 35,
      downloads: "7.8K+",
      publishDate: "Jul 2025",
      topics: ["Retail", "Omnichannel", "Foot Traffic", "Sales"]
    },
    {
      title: "Location Intelligence: Advanced Geo-Targeting",
      description: "Leveraging location data and geographic insights for precision advertising and audience targeting.",
      category: "Technology",
      pages: 42,
      downloads: "6.3K+",
      publishDate: "Jun 2025",
      topics: ["Geo-Targeting", "Location Data", "Audience", "Analytics"]
    },
    {
      title: "Automotive Advertising Playbook",
      description: "Proven strategies for reaching car shoppers throughout their journey from research to purchase.",
      category: "Industry Guide",
      pages: 40,
      downloads: "4.9K+",
      publishDate: "May 2025",
      topics: ["Automotive", "Lead Generation", "Dealerships", "Strategy"]
    },
    {
      title: "Measuring Campaign Success: KPIs That Matter",
      description: "Comprehensive guide to tracking, analyzing, and optimizing advertising performance with key metrics.",
      category: "Analytics",
      pages: 30,
      downloads: "10.1K+",
      publishDate: "Apr 2025",
      topics: ["KPIs", "Analytics", "Measurement", "Optimization"]
    }
  ];

  const handleDownload = (paperTitle: string) => {
    setSelectedPaper(paperTitle);
    setShowDownloadForm(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-8">
              <svg className="w-4 h-4 text-mw-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span className="text-mw-blue-600 text-sm font-medium">Research & Insights</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Whitepapers &
              <span className="text-mw-blue-600 block">Research Reports</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              In-depth research, industry insights, and comprehensive guides to help you stay ahead 
              in the evolving advertising landscape.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { number: "30+", label: "Whitepapers" },
                { number: "50K+", label: "Downloads" },
                { number: "100%", label: "Free Access" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-mw-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-mw-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Whitepaper */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {whitepapers.filter(p => p.featured).map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-mw-blue-600 to-mw-blue-800 rounded-2xl overflow-hidden shadow-mw-xl"
            >
              <div className="grid lg:grid-cols-2 gap-12 p-8 lg:p-12">
                <div className="text-white">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-6">
                    Featured Report
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">{paper.title}</h2>
                  <p className="text-blue-100 text-lg mb-6">{paper.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-2xl font-bold mb-1">{paper.pages}</div>
                      <div className="text-sm text-blue-100">Pages</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-2xl font-bold mb-1">{paper.downloads}</div>
                      <div className="text-sm text-blue-100">Downloads</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {paper.topics.map((topic, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleDownload(paper.title)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Now
                  </button>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-full aspect-[3/4] bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center justify-center">
                    <svg className="w-24 h-24 text-white/30 mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white font-medium">PDF Format</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Whitepapers Grid */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-mw-gray-900 mb-2">All Whitepapers</h2>
            <p className="text-lg text-mw-gray-600">Explore our complete research library</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whitepapers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-mw-sm hover:shadow-mw-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-mw-blue-100 text-mw-blue-600 text-xs font-medium rounded-full">
                      {paper.category}
                    </span>
                    <span className="text-sm text-mw-gray-500">{paper.publishDate}</span>
                  </div>

                  <div className="aspect-[3/4] bg-gradient-to-br from-mw-gray-100 to-mw-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-20 h-20 text-mw-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-mw-gray-900 mb-3 group-hover:text-mw-blue-600 transition-colors line-clamp-2">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-mw-gray-600 mb-4 line-clamp-3">{paper.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.topics.slice(0, 3).map((topic, idx) => (
                      <span key={idx} className="px-2 py-1 bg-mw-gray-100 text-mw-gray-600 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-mw-gray-200 mb-4">
                    <span className="text-sm text-mw-gray-600">{paper.pages} pages</span>
                    <span className="text-sm text-mw-gray-600">{paper.downloads} downloads</span>
                  </div>

                  <button
                    onClick={() => handleDownload(paper.title)}
                    className="w-full px-4 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Modal */}
      {showDownloadForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-mw-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-mw-gray-900 mb-2">Download Whitepaper</h3>
              <p className="text-sm text-mw-gray-600">Fill out the form below to access your free download</p>
            </div>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Work Email *"
                  required
                  className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Company Name *"
                  required
                  className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-mw-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDownloadForm(false)}
                  className="flex-1 px-4 py-3 border border-mw-gray-300 text-mw-gray-700 font-medium rounded-lg hover:bg-mw-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Download
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-mw-blue-600 to-mw-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Need Custom Research?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our research team can create custom reports tailored to your specific needs.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-mw-lg"
            >
              Request Custom Research
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
