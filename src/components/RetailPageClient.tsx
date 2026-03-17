"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "./ContactForm";

// Types for CMS-managed content
interface RetailPageProps {
  badgeText?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  benefits?: Array<{ title: string; description: string }>;
  caseStudies?: Array<{ brand: string; metric: string; description: string }>;
  heroStats?: Array<{ value: string; label: string }>;
}

// Default values
const defaultContent = {
  badgeText: "Retail & E-commerce",
  title: "Drive Foot Traffic &",
  titleHighlight: "Boost Sales",
  subtitle: "Transform your retail advertising with strategic out-of-home campaigns that connect with shoppers at the right moment, driving them from awareness to your store entrance.",
  benefits: [
    { title: "Increase Foot Traffic", description: "Drive more customers to your physical locations with targeted OOH campaigns" },
    { title: "Boost Sales", description: "Convert awareness into purchases with strategic placement and timing" },
    { title: "Target Shoppers", description: "Reach customers when they're in shopping mode near retail locations" },
    { title: "Omnichannel Integration", description: "Connect offline advertising with online experiences seamlessly" },
  ],
  caseStudies: [
    { brand: "Fashion Retailer", metric: "45% increase", description: "in store visits during campaign period" },
    { brand: "Electronics Chain", metric: "32% boost", description: "in weekend sales with targeted mall advertising" },
    { brand: "Home Goods Store", metric: "28% growth", description: "in brand awareness among target demographics" },
  ],
  heroStats: [
    { value: "45%", label: "Foot Traffic ↑" },
    { value: "32%", label: "Sales Boost ↗" },
    { value: "28%", label: "Awareness ⭐" },
  ],
};

// Icon components
const BenefitIcon = ({ index }: { index: number }) => {
  const icons = [
    <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  ];
  return icons[index % icons.length];
};

export default function RetailPageClient(props: RetailPageProps) {
  const content = {
    badgeText: props.badgeText || defaultContent.badgeText,
    title: props.title || defaultContent.title,
    titleHighlight: props.titleHighlight || defaultContent.titleHighlight,
    subtitle: props.subtitle || defaultContent.subtitle,
    benefits: props.benefits?.length ? props.benefits : defaultContent.benefits,
    caseStudies: props.caseStudies?.length ? props.caseStudies : defaultContent.caseStudies,
    heroStats: props.heroStats?.length ? props.heroStats : defaultContent.heroStats,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-6">
                <span className="text-mw-blue-600 text-sm font-medium">{content.badgeText}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
                {content.title}
                <span className="text-mw-blue-600 block">{content.titleHighlight}</span>
              </h1>
              <p className="text-lg text-mw-gray-600 mb-8 leading-relaxed">
                {content.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#contact"
                  className="px-6 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-colors shadow-mw-md"
                >
                  Start Your Campaign
                </Link>
                <Link
                  href="#case-studies"
                  className="px-6 py-3 border border-mw-gray-300 hover:bg-mw-gray-50 text-mw-gray-700 font-medium rounded-lg transition-colors"
                >
                  View Case Studies
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Retail Infographics */}
              <div className="grid grid-cols-2 gap-4">
                {/* Shopping Journey Funnel */}
                <div className="bg-white p-6 rounded-xl shadow-mw-md border border-mw-gray-200">
                  <h4 className="text-lg font-semibold text-mw-gray-900 mb-4">Shopping Journey</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-mw-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                      <div>
                        <div className="text-sm font-medium text-mw-gray-900">Awareness</div>
                        <div className="text-xs text-mw-gray-500">Brand Discovery</div>
                      </div>
                    </div>
                    <div className="ml-4 w-0.5 h-4 bg-mw-gray-200"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-mw-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                      <div>
                        <div className="text-sm font-medium text-mw-gray-900">Consideration</div>
                        <div className="text-xs text-mw-gray-500">Research & Compare</div>
                      </div>
                    </div>
                    <div className="ml-4 w-0.5 h-4 bg-mw-gray-200"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-mw-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                      <div>
                        <div className="text-sm font-medium text-mw-gray-900">Visit Store</div>
                        <div className="text-xs text-mw-gray-500">Physical Location</div>
                      </div>
                    </div>
                    <div className="ml-4 w-0.5 h-4 bg-mw-gray-200"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-mw-success rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                      <div>
                        <div className="text-sm font-medium text-mw-gray-900">Purchase</div>
                        <div className="text-xs text-mw-gray-500">Conversion</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-mw-blue-600 p-6 rounded-xl text-white">
                  <h4 className="text-lg font-semibold mb-4">Campaign Impact</h4>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">45%</div>
                      <div className="text-mw-blue-100 text-sm">Foot Traffic ↑</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">32%</div>
                      <div className="text-mw-blue-100 text-sm">Sales Boost ↗</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">28%</div>
                      <div className="text-mw-blue-100 text-sm">Awareness ⭐</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 mb-4">
              Why Retailers Choose MovingWalls
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Our retail-focused advertising solutions help you connect with shoppers at every stage of their journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white border border-mw-gray-200 shadow-mw-sm hover:shadow-mw-md transition-shadow"
              >
                <div className="text-mw-blue-600 mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-mw-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-mw-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 mb-4">
              Proven Results for Retail Brands
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-mw-md"
              >
                <h3 className="text-lg font-semibold text-mw-gray-900 mb-2">{study.brand}</h3>
                <div className="text-3xl font-bold text-mw-blue-600 mb-2">{study.metric}</div>
                <p className="text-mw-gray-600">{study.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-mw-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Retail Advertising?
            </h2>
            <p className="text-lg text-mw-blue-100 mb-8">
              Let's discuss how our retail-focused OOH solutions can drive more customers to your stores.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-mw-gray-50 transition-colors shadow-mw-md"
            >
              Get Started Today
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