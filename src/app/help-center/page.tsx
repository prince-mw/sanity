"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Getting Started", "Account & Billing", "Platform Features", "Troubleshooting", "Integrations"];

  const faqData = [
    {
      category: "Getting Started",
      question: "How do I create my first campaign?",
      answer: "Navigate to the MW Planner dashboard, click 'New Campaign', and follow the step-by-step wizard to set up your campaign objectives, budget, targeting, and creative assets."
    },
    {
      category: "Getting Started",
      question: "What are the system requirements?",
      answer: "MovingWalls platform works on all modern browsers (Chrome, Firefox, Safari, Edge). We recommend using the latest browser version for optimal performance."
    },
    {
      category: "Account & Billing",
      question: "How does billing work?",
      answer: "Billing is based on your campaign spend and platform usage. You'll receive monthly invoices with detailed breakdowns of all charges. Payment methods include credit card, wire transfer, and ACH."
    },
    {
      category: "Account & Billing",
      question: "Can I change my subscription plan?",
      answer: "Yes, you can upgrade or downgrade your plan at any time from the Account Settings page. Changes take effect at the start of your next billing cycle."
    },
    {
      category: "Platform Features",
      question: "How do I set up geo-targeting?",
      answer: "In MW Reach, select the 'Location Targeting' option and either draw custom shapes on the map, upload location lists, or use predefined market areas (DMAs). You can also set radius targeting around specific addresses."
    },
    {
      category: "Platform Features",
      question: "What analytics are available?",
      answer: "MW Measure provides real-time analytics including impressions, reach, frequency, CTR, conversions, and ROI. You can create custom dashboards and schedule automated reports."
    },
    {
      category: "Troubleshooting",
      question: "Why isn't my campaign delivering?",
      answer: "Check your campaign status, budget availability, targeting settings, and creative approvals. Ensure your bid strategy is competitive and your audience isn't too narrow."
    },
    {
      category: "Troubleshooting",
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your inbox to reset your password."
    },
    {
      category: "Integrations",
      question: "What third-party integrations are supported?",
      answer: "We integrate with major platforms including Google Analytics, Adobe Analytics, Salesforce, HubSpot, and various DSPs. Visit our Documentation page for the complete list and setup guides."
    },
    {
      category: "Integrations",
      question: "How do I connect my CRM?",
      answer: "Go to Settings > Integrations, select your CRM provider, and follow the OAuth authentication flow. Once connected, you can sync lead data automatically."
    }
  ];

  const filteredFAQs = faqData.filter(faq => 
    (selectedCategory === "All" || faq.category === selectedCategory) &&
    (searchQuery === "" || faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const quickLinks = [
    { title: "Platform Overview", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, href: "#" },
    { title: "Video Tutorials", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>, href: "#" },
    { title: "Contact Support", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, href: "/contact" }
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              How Can We
              <span className="text-mw-blue-600 block">Help You Today?</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Search our knowledge base or browse categories to find answers to your questions.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 border border-mw-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent shadow-mw-lg"
                />
                <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mw-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-mw-gray-50 rounded-xl hover:bg-mw-blue-50 hover:shadow-mw-md transition-all duration-300 group"
              >
                <div className="text-mw-blue-600 mb-3">{link.icon}</div>
                <h3 className="text-lg font-semibold text-mw-gray-900 group-hover:text-mw-blue-600 transition-colors">
                  {link.title}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-y border-mw-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-mw-blue-600 text-white shadow-mw-sm"
                    : "bg-mw-gray-100 text-mw-gray-700 hover:bg-mw-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-mw-gray-900 mb-2">
              {selectedCategory === "All" ? "Frequently Asked Questions" : `${selectedCategory} Questions`}
            </h2>
            <p className="text-lg text-mw-gray-600">{filteredFAQs.length} articles found</p>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-mw-sm hover:shadow-mw-md transition-all duration-300 group"
              >
                <summary className="flex items-start justify-between cursor-pointer list-none">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-mw-blue-100 text-mw-blue-600 text-xs font-medium rounded mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-mw-gray-900 group-hover:text-mw-blue-600 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <svg className="w-5 h-5 text-mw-gray-400 ml-4 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-mw-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-mw-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg text-mw-gray-600">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-20 bg-gradient-to-br from-mw-blue-600 to-mw-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-mw-lg"
              >
                Contact Support
              </a>
              <a
                href="#"
                className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Live Chat
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
