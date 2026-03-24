"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { CTAButton } from "./CTAButton";
import type { ContactPageContent } from "@/sanity/lib/fetch";

export interface Office {
  city: string
  country: string
  type: string
  address: string
  phone: string
  email: string
  isHeadquarters: boolean
}

interface ContactPageClientProps {
  offices: Office[]
  content: ContactPageContent | null
}

export default function ContactPageClient({ offices, content }: ContactPageClientProps) {
  const heroTitle = content?.heroTitle || "Let's Build Something";
  const heroTitleHighlight = content?.heroTitleHighlight || "Extraordinary Together";
  const heroDescription = content?.heroDescription || "Every great campaign starts with a conversation. Whether you're launching your first digital campaign or scaling a global advertising strategy, our team of experts is ready to turn your vision into measurable results.";
  const heroCtaText = content?.heroCtaText || "Book a Free Demo";
  const heroCtaLink = content?.heroCtaLink || "/contact";
  const officesSectionTitle = content?.officesSectionTitle || "Our Global Presence";
  const officesSectionDescription = content?.officesSectionDescription || "With offices strategically located across Asia, we're always close to our clients.";

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      details: "+65 6714 6699",
      description: "Available Mon-Fri, 9AM-6PM SGT"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      details: "info@movingwalls.com",
      description: "We'll respond within 2 hours"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Global Offices",
      details: `${offices.length} Cities Worldwide`,
      description: "Singapore • KL • Manila • Jakarta"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Instant Demo",
      details: "Live Product Tour",
      description: "See MW Platform in action now"
    }
  ];

  const departments = [
    {
      title: "New Business & Strategy",
      email: "info@movingwalls.com",
      description: "Ready to scale your advertising? Connect with our growth strategists for custom campaign planning and ROI forecasting.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      response: "2 hours"
    },
    {
      title: "Platform & Technical Support",
      email: "info@movingwalls.com",
      description: "Need help with MW products? Our technical specialists provide 24/7 support for all platform features and integrations.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      response: "30 minutes"
    },
    {
      title: "Enterprise Solutions",
      email: "info@movingwalls.com",
      description: "Large-scale deployments and custom integrations? Our enterprise team specializes in complex, multi-market campaigns.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      response: "4 hours"
    },
    {
      title: "Strategic Partnerships",
      email: "info@movingwalls.com",
      description: "Technology integrations, agency partnerships, or joint ventures? Let's explore how we can grow together.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      response: "1 business day"
    },
    {
      title: "Media & Press Relations",
      email: "info@movingwalls.com",
      description: "Journalists, analysts, and media professionals—access press releases, executive interviews, and company insights.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      response: "Same day"
    },
    {
      title: "Careers & Talent",
      email: "info@movingwalls.com",
      description: "Join the future of advertising technology. Explore opportunities to shape the industry with cutting-edge AI and data science.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      ),
      response: "3 business days"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-mw-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              {heroTitle}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-blue-600 to-indigo-600 block">
                {heroTitleHighlight}
              </span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              {heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <CTAButton href={heroCtaLink} className="px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-lg shadow-mw-md hover:shadow-mw-lg transform hover:-translate-y-0.5 transition-all duration-200">
                {heroCtaText}
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              {officesSectionTitle}
            </h2>
            <p className="text-xl text-mw-gray-600 max-w-2xl mx-auto">
              {officesSectionDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={`${office.city}-${office.type}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 border border-mw-gray-200 hover:border-mw-blue-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-mw-gray-900 group-hover:text-mw-blue-600 transition-colors">
                    {office.city}
                  </h3>
                  {office.isHeadquarters && (
                    <span className="bg-mw-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      HQ
                    </span>
                  )}
                </div>
                <p className="text-mw-gray-600 text-sm mb-2">{office.country}</p>
                <div className="space-y-1 text-sm text-left">
                  <p className="text-mw-gray-600">{office.address}</p>
                  <p className="text-mw-gray-600">
                    <a href="mailto:info@movingwalls.com" className="text-mw-blue-600 hover:text-mw-blue-700 transition-colors">
                      info@movingwalls.com
                    </a>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm
        formSectionTitle={content?.formSectionTitle}
        formSectionDescription={content?.formSectionDescription}
        companyName={content?.companyName}
        companyAddress={content?.companyAddress}
        companyPhone={content?.companyPhone}
        companyEmail={content?.companyEmail}
        zohoFormUrl={content?.zohoFormUrl}
        zohoFormHeight={content?.zohoFormHeight}
      />
    </div>
  );
}
