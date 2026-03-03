"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "../../components/ContactForm";

export default function PressNewsPage() {
  const pressReleases = [
    {
      date: "November 15, 2024",
      category: "Product Launch",
      title: "Moving Walls Launches AI-Powered Audience Targeting Platform",
      excerpt: "Revolutionary machine learning algorithms improve campaign performance by 40% while reducing cost per acquisition.",
      readTime: "3 min read",
      thumbnail: "/assets/images/press/ai-platform-launch.svg"
    },
    {
      date: "October 28, 2024",
      category: "Funding",
      title: "Moving Walls Closes $50M Series C Funding Round",
      excerpt: "Investment led by top-tier VCs will fuel international expansion and product development initiatives.",
      readTime: "4 min read",
      thumbnail: "/assets/images/press/funding-announcement.svg"
    },
    {
      date: "September 12, 2024",
      category: "Partnership",
      title: "Strategic Partnership with Global Transit Authority Network",
      excerpt: "Major partnership expands Moving Walls's out-of-home advertising network to 25 new metropolitan areas.",
      readTime: "2 min read",
      thumbnail: "/assets/images/press/transit-partnership.svg"
    },
    {
      date: "August 5, 2024",
      category: "Recognition",
      title: "Moving Walls Named 'AdTech Company of the Year' by Industry Awards",
      excerpt: "Recognition highlights company's innovation in programmatic advertising and measurement solutions.",
      readTime: "3 min read",
      thumbnail: "/assets/images/press/industry-award.svg"
    },
    {
      date: "July 22, 2024",
      category: "Product Update",
      title: "New Privacy-First Measurement Suite Launches",
      excerpt: "Industry-leading privacy compliance tools help brands navigate evolving data regulations while maintaining effectiveness.",
      readTime: "5 min read",
      thumbnail: "/assets/images/press/privacy-suite.svg"
    },
    {
      date: "June 18, 2024",
      category: "Expansion",
      title: "Moving Walls Opens European Headquarters in London",
      excerpt: "New office serves as regional hub for European operations and client services expansion.",
      readTime: "2 min read",
      thumbnail: "/assets/images/press/london-office.svg"
    }
  ];

  const mediaFeatures = [
    {
      outlet: "AdWeek",
      title: "How Moving Walls is Revolutionizing Out-of-Home Advertising",
      date: "November 8, 2024",
      type: "Feature Article",
      thumbnail: "/assets/images/press/adweek-feature.svg"
    },
    {
      outlet: "TechCrunch",
      title: "The Future of Programmatic Advertising Technology",
      date: "October 15, 2024",
      type: "Industry Analysis",
      thumbnail: "/assets/images/press/techcrunch-analysis.svg"
    },
    {
      outlet: "Marketing Land",
      title: "CEO Interview: Building the Next Generation Ad Platform",
      date: "September 30, 2024",
      type: "Executive Interview",
      thumbnail: "/assets/images/press/ceo-interview.svg"
    },
    {
      outlet: "Forbes",
      title: "Moving Walls Among Top 50 Most Innovative Companies",
      date: "September 1, 2024",
      type: "Recognition",
      thumbnail: "/assets/images/press/forbes-recognition.svg"
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
              <span className="text-mw-blue-600 text-sm font-medium">Media Center</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Press & News
              <span className="text-mw-blue-600 block">Latest Updates</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stay updated with Moving Walls's latest announcements, product launches, 
              partnerships, and industry recognition. Access our media resources 
              and press materials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Latest Press Releases
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Get the latest news and announcements directly from Moving Walls.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {pressReleases.map((release, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-mw-lg border border-mw-gray-100 overflow-hidden hover:shadow-mw-xl transition-shadow cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-mw-blue-50 to-mw-blue-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        {release.category === 'Product Launch' && (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                        {release.category === 'Funding' && (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        )}
                        {release.category === 'Partnership' && (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )}
                        {release.category === 'Recognition' && (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        )}
                        {(release.category === 'Product Update' || release.category === 'Expansion') && (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        )}
                      </div>
                      <p className="text-mw-blue-700 text-sm font-medium">{release.category}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-mw-blue-100 text-mw-blue-600 text-xs font-medium rounded-full">
                      {release.category}
                    </span>
                    <span className="text-mw-gray-500 text-sm">{release.date}</span>
                    <span className="text-mw-gray-400 text-sm">•</span>
                    <span className="text-mw-gray-500 text-sm">{release.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-mw-gray-900 mb-3 hover:text-mw-blue-600 transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-mw-gray-600 leading-relaxed mb-4">{release.excerpt}</p>
                <Link href={
                  index === 0 ? "/ai-powered-audience-targeting" :
                  index === 1 ? "/series-c-funding" :
                  index === 2 ? "/transit-partnership" :
                  index === 3 ? "/adtech-company-of-year" :
                  index === 4 ? "/privacy-first-measurement" :
                  "/london-headquarters"
                } className="text-mw-blue-600 hover:text-mw-blue-700 font-medium text-sm flex items-center gap-1">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage Section */}
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
              Media Coverage
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-2xl mx-auto">
              See what industry publications are saying about Moving Walls and our impact on advertising technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {mediaFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-mw-md border border-mw-gray-100 hover:shadow-mw-lg transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-gradient-to-br from-mw-gray-50 to-mw-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-mw-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        {feature.outlet === 'AdWeek' && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        )}
                        {feature.outlet === 'TechCrunch' && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )}
                        {feature.outlet === 'Marketing Land' && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        )}
                        {feature.outlet === 'Forbes' && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-mw-gray-700 text-xs font-medium">{feature.outlet}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-mw-blue-600">{feature.outlet}</span>
                    <span className="text-mw-gray-500 text-sm">{feature.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-mw-gray-900 mb-2">{feature.title}</h3>
                  <span className="text-mw-gray-600 text-sm">{feature.type}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Resources Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Press Resources
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-2xl mx-auto">
              Access our media kit, executive bios, high-resolution images, and other press materials.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-mw-blue-100 rounded-full text-mw-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-3">Media Kit</h3>
              <p className="text-mw-gray-600 mb-4">Complete media kit with logos, product shots, and company information.</p>
              <button className="text-mw-blue-600 hover:text-mw-blue-700 font-medium">Download Kit</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-mw-blue-100 rounded-full text-mw-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-3">Executive Bios</h3>
              <p className="text-mw-gray-600 mb-4">Professional biographies and headshots of our leadership team.</p>
              <button className="text-mw-blue-600 hover:text-mw-blue-700 font-medium">View Bios</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-mw-blue-100 rounded-full text-mw-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-3">Media Contact</h3>
              <p className="text-mw-gray-600 mb-4">Connect with our media relations team for interviews and inquiries.</p>
              <Link href="#contact" className="text-mw-blue-600 hover:text-mw-blue-700 font-medium">Contact Media Team</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Media Inquiries Welcome
            </h2>
            <p className="text-xl text-mw-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Looking for expert commentary on advertising technology trends? 
              Our executives are available for interviews and industry insights.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-mw-gray-50 text-mw-blue-600 font-semibold rounded-lg transition-colors shadow-lg"
            >
              Contact Media Team
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}