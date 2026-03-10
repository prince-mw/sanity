"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function DocumentationPage() {
  const [activeSidebar, setActiveSidebar] = useState("quickstart");

  const sidebarItems = [
    { id: "quickstart", label: "Quick Start Guide", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    { id: "platform", label: "Platform Overview", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { id: "campaigns", label: "Campaign Management", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
    { id: "targeting", label: "Audience Targeting", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { id: "analytics", label: "Analytics & Reporting", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { id: "integrations", label: "Integrations", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Documentation &
              <span className="text-mw-blue-600 block">Technical Guides</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive guides and technical documentation for the MovingWalls platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-mw-gray-200 rounded-xl p-4 space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSidebar(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-3 ${
                      activeSidebar === item.id
                        ? "bg-mw-blue-600 text-white"
                        : "bg-mw-gray-50 text-mw-gray-700 hover:bg-mw-gray-100"
                    }`}
                  >
                    <span className={activeSidebar === item.id ? "text-white" : "text-mw-blue-600"}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-mw-gray-200 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-mw-gray-900 mb-6">Quick Start Guide</h2>
                
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Getting Started with MovingWalls</h3>
                  <p className="text-mw-gray-600 mb-6">
                    Welcome to MovingWalls! This guide will help you get up and running with our advertising platform in minutes.
                  </p>

                  <h4 className="text-xl font-bold text-mw-gray-900 mt-6 mb-3">Step 1: Account Setup</h4>
                  <div className="bg-mw-gray-50 rounded-lg p-6 mb-6">
                    <ol className="list-decimal list-inside space-y-2 text-mw-gray-700">
                      <li>Log in to your MovingWalls account</li>
                      <li>Complete your company profile</li>
                      <li>Add payment methods</li>
                      <li>Set up team members and permissions</li>
                    </ol>
                  </div>

                  <h4 className="text-xl font-bold text-mw-gray-900 mt-6 mb-3">Step 2: Create Your First Campaign</h4>
                  <div className="bg-mw-gray-50 rounded-lg p-6 mb-6">
                    <ol className="list-decimal list-inside space-y-2 text-mw-gray-700">
                      <li>Navigate to MW Planner</li>
                      <li>Click "New Campaign"</li>
                      <li>Set campaign objectives and budget</li>
                      <li>Define your target audience</li>
                      <li>Upload creative assets</li>
                      <li>Review and launch</li>
                    </ol>
                  </div>

                  <h4 className="text-xl font-bold text-mw-gray-900 mt-6 mb-3">Step 3: Monitor Performance</h4>
                  <p className="text-mw-gray-600 mb-4">
                    Use MW Measure to track your campaign performance in real-time. Access detailed analytics including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-mw-gray-700 mb-6">
                    <li>Impressions and reach</li>
                    <li>Click-through rates</li>
                    <li>Conversion tracking</li>
                    <li>ROI metrics</li>
                  </ul>

                  <div className="bg-mw-blue-50 border-l-4 border-mw-blue-600 rounded-r-lg p-6 mt-8">
                    <h5 className="font-bold text-mw-gray-900 mb-2">💡 Pro Tip</h5>
                    <p className="text-mw-gray-700">
                      Start with a small test budget to optimize your targeting and creative before scaling up your campaigns.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-mw-gray-900 mt-12 mb-4">Need More Help?</h3>
                  <div className="grid md:grid-cols-1 gap-4 mt-6">
                    <Link href="/contact" className="flex items-center gap-3 p-4 bg-mw-gray-50 rounded-lg hover:bg-mw-blue-50 transition-colors">
                      <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      <div>
                        <p className="font-semibold text-mw-gray-900">Contact Support</p>
                        <p className="text-sm text-mw-gray-600">Get in touch</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
