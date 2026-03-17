'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export interface CaseStudy {
  _id: string
  title: string
  slug?: { current?: string }
  client?: string
  heroImage?: string
  excerpt?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug?: { current?: string }
  featuredImage?: string
  excerpt?: string
  publishedAt?: string
}

export interface Whitepaper {
  _id: string
  title: string
  slug?: { current?: string }
  coverImage?: string
  description?: string
}

export interface ExternalResource {
  title: string
  description?: string
  url: string
  type?: 'documentation' | 'api' | 'guide' | 'video' | 'other'
}

export interface ProductResourcesSectionProps {
  title?: string
  caseStudies?: CaseStudy[]
  blogPosts?: BlogPost[]
  whitepapers?: Whitepaper[]
  externalResources?: ExternalResource[]
}

const resourceTypeIcons: Record<string, React.FC<{ className?: string }>> = {
  documentation: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  api: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  guide: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  video: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  other: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
}

export default function ProductResourcesSection({
  title = 'Resources',
  caseStudies,
  blogPosts,
  whitepapers,
  externalResources,
}: ProductResourcesSectionProps) {
  const hasCaseStudies = caseStudies && caseStudies.length > 0
  const hasBlogPosts = blogPosts && blogPosts.length > 0
  const hasWhitepapers = whitepapers && whitepapers.length > 0
  const hasExternalResources = externalResources && externalResources.length > 0

  if (!hasCaseStudies && !hasBlogPosts && !hasWhitepapers && !hasExternalResources) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            Learn More
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deeper with case studies, guides, and documentation
          </p>
        </motion.div>

        {/* Case Studies */}
        {hasCaseStudies && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Case Studies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.slice(0, 3).map((caseStudy, index) => (
                <motion.div
                  key={caseStudy._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/case-studies/${caseStudy.slug?.current || caseStudy._id}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="aspect-video relative overflow-hidden bg-gray-200">
                      {caseStudy.heroImage ? (
                        <Image
                          src={caseStudy.heroImage}
                          alt={caseStudy.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                          <span className="text-white/50 text-4xl font-bold">
                            {caseStudy.client?.charAt(0) || caseStudy.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      {caseStudy.client && (
                        <span className="text-sm text-blue-600 font-medium">{caseStudy.client}</span>
                      )}
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-1">
                        {caseStudy.title}
                      </h4>
                      {caseStudy.excerpt && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{caseStudy.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts */}
        {hasBlogPosts && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </span>
              Related Articles
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug?.current || post._id}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="aspect-video relative overflow-hidden bg-gray-200">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600">
                          <span className="text-white/50 text-4xl font-bold">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {post.title}
                      </h4>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Whitepapers */}
        {hasWhitepapers && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              Whitepapers &amp; Guides
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whitepapers.slice(0, 3).map((whitepaper, index) => (
                <motion.div
                  key={whitepaper._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/whitepapers/${whitepaper.slug?.current || whitepaper._id}`}
                    className="group flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex-shrink-0 w-16 h-20 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                        {whitepaper.title}
                      </h4>
                      {whitepaper.description && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{whitepaper.description}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* External Resources */}
        {hasExternalResources && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
              External Resources
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {externalResources.map((resource, index) => {
                const IconComponent = resourceTypeIcons[resource.type || 'other']

                return (
                  <motion.a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-center gap-4 bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      <IconComponent className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                        {resource.title}
                      </h4>
                      {resource.description && (
                        <p className="text-gray-500 text-xs truncate">{resource.description}</p>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
