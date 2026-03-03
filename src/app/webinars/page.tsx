"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function WebinarsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingWebinars = [
    {
      title: "AI-Powered Campaign Optimization: Advanced Strategies",
      description: "Learn cutting-edge techniques for leveraging AI and machine learning to optimize your advertising campaigns in real-time.",
      date: "Dec 15, 2025",
      time: "2:00 PM EST",
      duration: "60 min",
      speaker: "Dr. Sarah Mitchell",
      role: "Chief Data Scientist",
      image: "/placeholder.jpg",
      attendees: 234,
      level: "Advanced"
    },
    {
      title: "Getting Started with Programmatic DOOH",
      description: "A comprehensive introduction to programmatic digital out-of-home advertising for beginners.",
      date: "Dec 20, 2025",
      time: "11:00 AM EST",
      duration: "45 min",
      speaker: "Michael Torres",
      role: "Product Manager",
      image: "/placeholder.jpg",
      attendees: 456,
      level: "Beginner"
    },
    {
      title: "Healthcare Marketing Compliance & Best Practices",
      description: "Navigate healthcare advertising regulations while maximizing campaign effectiveness.",
      date: "Jan 8, 2026",
      time: "1:00 PM EST",
      duration: "50 min",
      speaker: "Dr. Amanda Lee",
      role: "Healthcare Marketing Expert",
      image: "/placeholder.jpg",
      attendees: 189,
      level: "Intermediate"
    }
  ];

  const onDemandWebinars = [
    {
      title: "Maximizing ROI with MW Planner: Complete Workshop",
      description: "Deep dive into campaign planning and optimization strategies using MW Planner platform.",
      duration: "75 min",
      speaker: "James Wilson",
      role: "Senior Solutions Architect",
      views: 2456,
      rating: 4.8,
      level: "Intermediate"
    },
    {
      title: "The Future of Retail Advertising in 2025",
      description: "Explore emerging trends and technologies shaping the future of retail marketing.",
      duration: "45 min",
      speaker: "Lisa Chen",
      role: "Industry Analyst",
      views: 3892,
      rating: 4.9,
      level: "All Levels"
    },
    {
      title: "Location-Based Targeting Masterclass",
      description: "Advanced techniques for geo-targeting and location intelligence in advertising.",
      duration: "60 min",
      speaker: "Robert Martinez",
      role: "Targeting Specialist",
      views: 1823,
      rating: 4.7,
      level: "Advanced"
    },
    {
      title: "Creative Best Practices for DOOH Campaigns",
      description: "Design principles and creative strategies that drive engagement in outdoor advertising.",
      duration: "40 min",
      speaker: "Emily Rodriguez",
      role: "Creative Director",
      views: 4123,
      rating: 4.9,
      level: "All Levels"
    },
    {
      title: "Data-Driven Audience Insights with MW Science",
      description: "Unlock the power of AI-driven audience analysis for better targeting.",
      duration: "55 min",
      speaker: "David Park",
      role: "Data Science Lead",
      views: 2789,
      rating: 4.8,
      level: "Intermediate"
    },
    {
      title: "Automotive Campaign Strategies That Convert",
      description: "Proven tactics for reaching car shoppers and driving dealership visits.",
      duration: "50 min",
      speaker: "Jennifer Brooks",
      role: "Automotive Specialist",
      views: 1567,
      rating: 4.6,
      level: "Intermediate"
    }
  ];

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
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span className="text-mw-blue-600 text-sm font-medium">Learning Hub</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Webinars &
              <span className="text-mw-blue-600 block">Live Events</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join live sessions with industry experts or access our library of on-demand webinars 
              to accelerate your advertising success.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { number: "50+", label: "Webinars" },
                { number: "10K+", label: "Attendees" },
                { number: "4.8★", label: "Avg Rating" }
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

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b border-mw-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "upcoming"
                  ? "bg-mw-blue-600 text-white shadow-mw-sm"
                  : "bg-mw-gray-100 text-mw-gray-700 hover:bg-mw-gray-200"
              }`}
            >
              Upcoming Webinars
            </button>
            <button
              onClick={() => setActiveTab("ondemand")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "ondemand"
                  ? "bg-mw-blue-600 text-white shadow-mw-sm"
                  : "bg-mw-gray-100 text-mw-gray-700 hover:bg-mw-gray-200"
              }`}
            >
              On-Demand Library
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      {activeTab === "upcoming" && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-2">Upcoming Webinars</h2>
              <p className="text-lg text-mw-gray-600">Register now to secure your spot</p>
            </div>

            <div className="space-y-6">
              {upcomingWebinars.map((webinar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-mw-gray-200 rounded-xl overflow-hidden hover:shadow-mw-lg transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-3 gap-6 p-6">
                    {/* Webinar Image/Preview */}
                    <div className="lg:col-span-1">
                      <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white text-mw-blue-600 text-xs font-medium rounded-full">
                          {webinar.level}
                        </span>
                      </div>
                    </div>

                    {/* Webinar Details */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-mw-gray-900 mb-2">{webinar.title}</h3>
                          <p className="text-mw-gray-600 mb-4">{webinar.description}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{webinar.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{webinar.time} ({webinar.duration})</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <div>
                            <p className="font-medium text-mw-gray-900">{webinar.speaker}</p>
                            <p className="text-xs text-mw-gray-500">{webinar.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-mw-gray-600">
                          <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{webinar.attendees} registered</span>
                        </div>
                      </div>

                      <button className="px-6 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-colors shadow-mw-md">
                        Register Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* On-Demand Library */}
      {activeTab === "ondemand" && (
        <section className="py-16 bg-mw-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-2">On-Demand Library</h2>
              <p className="text-lg text-mw-gray-600">Watch anytime, anywhere</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {onDemandWebinars.map((webinar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-mw-sm hover:shadow-mw-lg transition-all duration-300 group"
                >
                  <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-mw-lg">
                        <svg className="w-8 h-8 text-mw-blue-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white text-mw-blue-600 text-xs font-medium rounded-full">
                        {webinar.level}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                        {webinar.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-mw-gray-900 mb-3 group-hover:text-mw-blue-600 transition-colors line-clamp-2">
                      {webinar.title}
                    </h3>
                    <p className="text-sm text-mw-gray-600 mb-4 line-clamp-2">{webinar.description}</p>

                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-mw-gray-200">
                      <div className="w-10 h-10 bg-mw-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-mw-gray-600">{webinar.speaker[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-mw-gray-900">{webinar.speaker}</p>
                        <p className="text-xs text-mw-gray-500">{webinar.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium text-mw-gray-900">{webinar.rating}</span>
                      </div>
                      <span className="text-mw-gray-500">{webinar.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
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
              Want to Host a Webinar?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Share your expertise with our community. We're always looking for industry experts to collaborate with.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-mw-lg"
            >
              Become a Speaker
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
