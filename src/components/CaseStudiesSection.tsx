"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const caseStudies = [
  {
    id: 1,
    title: "FC Media Proves OOH Campaign Performance in Morocco",
    description: "How FC Media used audience measurement to bring transparency and accountability to OOH campaign delivery and post-campaign evaluation.",
    image: "https://stg.movingwalls.com/wp-content/uploads/2026/02/fc-media-advertising-dooh-screens.webp",
    category: "Retail",
    metrics: "25% Brand Lift",
    href: "/resources/case-studies/fc-media-ooh-campaign-measurement-morocco"
  },
  {
    id: 2,
    title: "Fintech Wins High-Intent Attention in 54 Days",
    description: "How a leading payment app reached 239,650 unique people across 8 high-traffic urban locations in the Philippines.",
    image: "https://stg.movingwalls.com/wp-content/uploads/2026/01/real-world-audience-intelligence.webp",
    category: "FMCG",
    metrics: "3M+ Views",
    href: "/resources/case-studies/fintech-dooh-high-intent-attention"
  },
  {
    id: 3,
    title: "Luxury Hotel Reaches High-Intent Travelers",
    description: "A global luxury hotel used programmatic DOOH to reach travelers and commuters across Sydney with 2.5M+ impressions.",
    image: "https://stg.movingwalls.com/wp-content/uploads/2025/12/australian-ooh-revenue-results.webp",
    category: "Tourism",
    metrics: "284K Reached",
    href: "/resources/case-studies/luxury-hotel-programmatic-dooh-campaign"
  },
  {
    id: 4,
    title: "Calvin Klein Takes Over Vietnam with DOOH",
    description: "Calvin Klein's 27-day dynamic campaign across 230 screens delivered over 1.56 million impressions.",
    image: "https://stg.movingwalls.com/wp-content/uploads/2025/10/calvin-klein-dooh-campaign-vietnam.webp",
    category: "Retail",
    metrics: "1.56M Impressions",
    href: "/resources/case-studies/calvin-klein-dooh-campaign-vietnam"
  }
];

export default function CaseStudiesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
            Explore Our Case Studies
          </h2>
          <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
            Discover how leading brands across industries have achieved remarkable results 
            with Moving Walls' connected media platform.
          </p>
        </motion.div>

        {/* Case Studies Grid - 4 in a row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-mw-gray-100"
            >
              {/* Image Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Category & Metrics overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-mw-gray-800 text-xs font-semibold rounded-full">
                      {study.category}
                    </span>
                    <span className="px-3 py-1 bg-mw-blue-600 text-white text-xs font-bold rounded-full">
                      {study.metrics}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-mw-gray-900 mb-2 group-hover:text-mw-blue-600 transition-colors duration-300 line-clamp-2">
                  {study.title}
                </h3>
                <p className="text-mw-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {study.description}
                </p>
                
                {/* CTA - Links to main case studies page */}
                <Link 
                  href="/resources/case-studies"
                  className="inline-flex items-center gap-2 text-mw-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/resources/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mw-gray-900 text-white font-semibold rounded-full hover:bg-mw-gray-800 transition-colors duration-300"
          >
            View All Case Studies
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
