"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface NewsRelease {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  thumbnail: string;
  source?: string;
  externalLink?: string;
}

interface RelatedNews {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  thumbnail: string;
}

interface NewsDetailClientProps {
  release: NewsRelease;
  relatedNews: RelatedNews[];
}

export default function NewsDetailClient({ release, relatedNews }: NewsDetailClientProps) {
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
              <Link href="/press-news" className="hover:text-mw-blue-600 transition-colors">
                Press & News
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-mw-gray-700">{release.category}</span>
            </nav>

            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-6">
              <span className="text-mw-blue-600 text-sm font-medium">{release.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
              {release.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-mw-gray-600 mb-8 leading-relaxed">
              {release.excerpt}
            </p>

            {/* Source & Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-mw-gray-200">
              {release.source && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-mw-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-mw-gray-900">{release.source}</p>
                    <p className="text-sm text-mw-gray-500">Source</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-mw-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {release.date}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {release.thumbnail && (
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-video rounded-2xl overflow-hidden shadow-mw-xl bg-mw-gray-100 relative"
            >
              <Image
                src={release.thumbnail}
                alt={release.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      {release.content && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="prose prose-lg max-w-none
                prose-headings:text-mw-gray-900 prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
                prose-p:text-mw-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-mw-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-mw-gray-900
                prose-ul:my-6 prose-li:text-mw-gray-700 prose-li:mb-2
                prose-ol:my-6
                prose-blockquote:border-l-4 prose-blockquote:border-mw-blue-500 prose-blockquote:bg-mw-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                prose-img:rounded-xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: release.content }}
            />
          </div>
        </section>
      )}

      {/* External Link CTA (if no content but has external link) */}
      {!release.content && release.externalLink && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-mw-blue-50 border border-mw-blue-200 rounded-2xl p-8 text-center"
            >
              <svg className="w-16 h-16 text-mw-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-3">Read Full Article</h3>
              <p className="text-mw-gray-600 mb-6">This article was originally published externally. Click below to read the full article.</p>
              <a
                href={release.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-mw-blue-600 text-white rounded-lg font-semibold hover:bg-mw-blue-700 transition-colors"
              >
                Read Full Article
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* Share Section */}
      <section className="py-8 border-t border-mw-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-mw-gray-700">Share this news:</span>
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
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-mw-gray-100 hover:bg-mw-blue-100 text-mw-gray-600 hover:text-mw-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
            <Link
              href="/press-news"
              className="inline-flex items-center gap-2 text-mw-blue-600 font-medium hover:text-mw-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Press & News
            </Link>
          </div>
        </div>
      </section>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="py-16 bg-mw-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-mw-gray-900 mb-8">Related News</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((news, index) => (
                <motion.div
                  key={news.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={`/press-news/${news.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-mw-sm hover:shadow-mw-lg transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 relative overflow-hidden">
                      {news.thumbnail && (
                        <Image
                          src={news.thumbnail}
                          alt={news.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white text-mw-blue-600 text-xs font-medium rounded-full">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-mw-gray-900 mb-3 group-hover:text-mw-blue-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-mw-gray-600 mb-4 line-clamp-2">{news.excerpt}</p>
                      <div className="flex items-center pt-4 border-t border-mw-gray-200">
                        <span className="text-sm text-mw-gray-500">{news.date}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Press Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-mw-gray-900 to-mw-gray-800 rounded-2xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Press Inquiries</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              For media inquiries, interview requests, or additional information, please contact our press team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-mw-blue-600 rounded-lg font-semibold hover:bg-mw-gray-100 transition-colors"
            >
              Contact Press Team
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
