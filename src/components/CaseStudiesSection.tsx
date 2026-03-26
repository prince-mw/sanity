"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getSanityImageUrl } from "@/sanity/lib/fetch";

interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  clientLogo?: any;
  featuredImage?: any;
  industry: string;
  location: string;
  excerpt: string;
  publishedAt: string;
}

interface CaseStudiesSectionProps {
  initialCaseStudies?: CaseStudy[];
}

export default function CaseStudiesSection({ initialCaseStudies = [] }: CaseStudiesSectionProps) {
  const caseStudies = initialCaseStudies;
  const loading = false;

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
          {loading ? (
            <div className="col-span-4 text-center py-16 text-mw-gray-500">Loading case studies...</div>
          ) : caseStudies.length === 0 ? (
            <div className="col-span-4 text-center py-16 text-mw-gray-500">No case studies found.</div>
          ) : (
            caseStudies.map((study, index) => (
              <motion.div
                key={study._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-mw-gray-100"
              >
                {/* Image Thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  {study.featuredImage ? (
                    <Image
                      src={getSanityImageUrl(study.featuredImage, { width: 400, height: 176 })}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-mw-gray-100 text-mw-gray-400">No Image</div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* Industry & Client overlay */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-mw-gray-800 text-xs font-semibold rounded-full">
                        {study.industry}
                      </span>
                      <span className="px-3 py-1 bg-mw-blue-600 text-white text-xs font-bold rounded-full">
                        {study.client}
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
                    {study.excerpt}
                  </p>
                  {/* CTA - Links to case study detail page */}
                  <Link 
                    href={`/case-studies/${study.slug.current}`}
                    className="inline-flex items-center gap-2 text-mw-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                    aria-label={`Read more about ${study.title}`}
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
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
            href="/case-studies"
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
