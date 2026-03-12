"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface CaseStudy {
  slug: string;
  title: string;
  brand: string;
  country: string;
  industry: string;
  content: string;
  challenge?: string;
  solution?: string;
  results?: string;
  featuredImage: string;
  date: string;
}

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudy;
  relatedCaseStudies: CaseStudy[];
}

export default function CaseStudyDetailClient({ caseStudy, relatedCaseStudies }: CaseStudyDetailClientProps) {
  const getExcerpt = (content: string, maxLength: number = 150) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-mw-gray-500 mb-8">
              <Link href="/case-studies" className="hover:text-mw-blue-600 transition-colors">
                Case Studies
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-mw-gray-700">{caseStudy.industry}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full">
                <span className="text-mw-blue-600 text-sm font-medium">{caseStudy.industry}</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-mw-gray-100 rounded-full">
                <span className="text-mw-gray-600 text-sm font-medium">{caseStudy.country}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
              {caseStudy.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-mw-gray-200">
              {caseStudy.brand && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-mw-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-mw-gray-700 font-medium">Client: {caseStudy.brand}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-mw-gray-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(caseStudy.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {caseStudy.featuredImage && (
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-video rounded-2xl overflow-hidden shadow-mw-xl bg-mw-gray-100 relative"
            >
              <Image
                src={caseStudy.featuredImage}
                alt={caseStudy.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Challenge Section */}
          {caseStudy.challenge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-mw-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                The Challenge
              </h2>
              <div 
                className="prose prose-lg max-w-none prose-p:text-mw-gray-700 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: caseStudy.challenge }}
              />
            </motion.div>
          )}

          {/* Solution Section */}
          {caseStudy.solution && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-mw-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
                The Solution
              </h2>
              <div 
                className="prose prose-lg max-w-none prose-p:text-mw-gray-700 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: caseStudy.solution }}
              />
            </motion.div>
          )}

          {/* Results Section */}
          {caseStudy.results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-mw-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
                The Results
              </h2>
              <div 
                className="prose prose-lg max-w-none prose-p:text-mw-gray-700 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: caseStudy.results }}
              />
            </motion.div>
          )}

          {/* Main Content (if no structured sections) */}
          {!caseStudy.challenge && !caseStudy.solution && !caseStudy.results && caseStudy.content && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="prose prose-lg max-w-none
                prose-headings:text-mw-gray-900 prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-mw-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-mw-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-mw-gray-900
                prose-ul:my-6 prose-li:text-mw-gray-700 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: caseStudy.content }}
            />
          )}
        </div>
      </section>

      {/* Back & Share Section */}
      <section className="py-8 border-t border-mw-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-mw-gray-700">Share:</span>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-mw-gray-100 hover:bg-mw-blue-100 text-mw-gray-600 hover:text-mw-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-mw-gray-100 hover:bg-mw-blue-100 text-mw-gray-600 hover:text-mw-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-mw-blue-600 font-medium hover:text-mw-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-16 bg-mw-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-mw-gray-900 mb-8">Related Case Studies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCaseStudies.map((related, index) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={`/case-studies/${related.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-mw-sm hover:shadow-mw-lg transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 relative overflow-hidden">
                      {related.featuredImage && (
                        <Image
                          src={related.featuredImage}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white text-mw-blue-600 text-xs font-medium rounded-full">
                          {related.industry}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-mw-gray-900 mb-3 group-hover:text-mw-blue-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-mw-gray-600 mb-4 line-clamp-2">{getExcerpt(related.content)}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-mw-gray-200">
                        <span className="text-sm text-mw-gray-500">{related.country}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-mw-gray-900 to-mw-gray-800 rounded-2xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Achieve Similar Results?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how MovingWalls can help you transform your advertising strategy and drive measurable results.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
