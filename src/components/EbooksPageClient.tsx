'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useZohoPopup } from './ZohoPopupProvider'

const ITEMS_PER_PAGE = 12

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

// E-Book type
export interface Ebook {
  id: number | string
  title: string
  slug?: string
  description: string
  category: string
  image: string
  featured: boolean
  isNew?: boolean
  new?: boolean
  year: string
  viewUrl?: string
}

// Categories for filtering
const categories = ["All", "Guide", "Whitepaper", "Playbook", "Market Report"]

// E-Book Card Component
const EbookCard = ({ 
  ebook, 
  onDownload 
}: { 
  ebook: Ebook; 
  onDownload: (ebook: Ebook) => void 
}) => (
  <motion.div
    variants={staggerItem}
    className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <img
        src={ebook.image}
        alt={ebook.title}
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="absolute top-4 left-4 flex gap-2">
        {(ebook.new || ebook.isNew) && (
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
        )}
        {ebook.featured && (
          <span className="bg-mw-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">FEATURED</span>
        )}
      </div>

      <div className="absolute top-4 right-4">
        <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
          {ebook.category}
        </span>
      </div>

    </div>

    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-gray-400">{ebook.year}</span>
      </div>
      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-mw-blue-600 transition-colors">
        {ebook.slug ? (
          <Link href={`/ebooks/${ebook.slug}`}>{ebook.title}</Link>
        ) : (
          ebook.title
        )}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
        {ebook.description}
      </p>
      <div className="flex items-center gap-4">
        {ebook.slug && (
          <Link
            href={`/ebooks/${ebook.slug}`}
            className="text-mw-blue-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Read More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
        <button
          onClick={() => onDownload(ebook)}
          className="text-mw-blue-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
        >
          Download
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  </motion.div>
)

interface EbooksPageClientProps {
  ebooks: Ebook[]
}

export default function EbooksPageClient({ ebooks }: EbooksPageClientProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const { openZohoPopup } = useZohoPopup()

  const filteredEbooks = activeCategory === "All"
    ? ebooks
    : ebooks.filter(ebook => ebook.category === activeCategory)

  const totalPages = Math.ceil(filteredEbooks.length / ITEMS_PER_PAGE)
  const paginatedEbooks = filteredEbooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages)
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
    }
    return pages
  }

  const featuredEbook = ebooks.find(ebook => ebook.featured)

  const handleDownload = (ebook: Ebook) => {
    if (ebook.viewUrl) {
      openZohoPopup(ebook.viewUrl, ebook.title)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Mastering the OOH Game
            </h1>
            <p className="text-xl text-mw-blue-100 mb-8">
              Download our exclusive e-books and become an expert in Out-of-Home advertising. Learn from industry leaders with comprehensive guides, whitepapers, and playbooks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured E-Book Section */}
      {featuredEbook && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)"/>
                </svg>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16 items-center relative">
                <div>
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
                    ✨ Featured E-Book
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {featuredEbook.title}
                  </h2>
                  <p className="text-lg text-white/80 mb-8">
                    {featuredEbook.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => handleDownload(featuredEbook)}
                      className="inline-flex items-center gap-2 bg-white text-mw-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-mw-blue-50 transition-colors shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Free E-Book
                    </button>
                    {featuredEbook.slug && (
                      <Link
                        href={`/ebooks/${featuredEbook.slug}`}
                        className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                      >
                        Read More
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] rounded-md overflow-hidden shadow-2xl transform lg:translate-x-8 lg:-translate-y-4 rotate-2 hover:rotate-0 transition-transform duration-500 bg-gray-100">
                    <img
                      src={featuredEbook.image}
                      alt={featuredEbook.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-yellow-900 font-bold text-sm text-center">NEW<br/>2026</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-mw-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs opacity-70">
                    ({ebooks.filter(e => e.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* E-Books Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginatedEbooks.map((ebook) => (
              <EbookCard key={ebook.id} ebook={ebook} onDownload={handleDownload} />
            ))}
          </motion.div>

          {filteredEbooks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No e-books found in this category.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                    disabled={page === "..."}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      page === currentPage
                        ? "bg-mw-blue-600 text-white"
                        : page === "..."
                        ? "text-gray-400 cursor-default"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
