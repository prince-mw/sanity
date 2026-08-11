'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import SanityPortableText from '@/components/SanityPortableText'
import { useZohoPopup } from './ZohoPopupProvider'

interface Ebook {
  id: string
  title: string
  slug: string
  description: string
  category: string
  image: string
  year: string
  featured?: boolean
  isNew?: boolean
  viewUrl?: string
  body?: any[]
}

interface EbookDetailClientProps {
  ebook: Ebook
  relatedEbooks: Ebook[]
}

export default function EbookDetailClient({ ebook, relatedEbooks }: EbookDetailClientProps) {
  const { openZohoPopup } = useZohoPopup()

  const handleDownload = () => {
    if (ebook.viewUrl) {
      openZohoPopup(ebook.viewUrl, ebook.title)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-mw-blue-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href="/ebooks" className="hover:text-white transition-colors">E-Books</Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-white">{ebook.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1 rounded-full">
                  {ebook.category}
                </span>
                {ebook.isNew && (
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
                )}
                {ebook.featured && (
                  <span className="bg-mw-yellow-500 text-mw-blue-900 text-xs font-bold px-3 py-1 rounded-full">FEATURED</span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {ebook.title}
              </h1>
              
              <p className="text-lg text-mw-blue-100 mb-8">
                {ebook.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleDownload}
                  className="bg-white text-mw-blue-600 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-mw-blue-50 transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Free E-Book
                </button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={ebook.image} 
                  alt={ebook.title}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Body Content Section */}
      {ebook.body && ebook.body.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-mw-blue-600 prose-strong:text-gray-900">
              <SanityPortableText value={ebook.body} />
            </div>
          </div>
        </section>
      )}

      {/* Related E-Books Section */}
      {relatedEbooks.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Related E-Books</h2>
              <Link 
                href="/ebooks" 
                className="text-mw-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedEbooks.map((relatedEbook, index) => (
                <motion.div
                  key={relatedEbook.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={relatedEbook.image}
                      alt={relatedEbook.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                        {relatedEbook.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-gray-400 mb-2 block">{relatedEbook.year}</span>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-mw-blue-600 transition-colors">
                      {relatedEbook.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {relatedEbook.description}
                    </p>
                    <Link
                      href={`/ebooks/${relatedEbook.slug}`}
                      className="text-mw-blue-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
