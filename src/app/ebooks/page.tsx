'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAllEbooks, getFeaturedEbook, transformEbook, SanityEbook } from '../../sanity/lib/fetch'

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
interface Ebook {
  id: number | string
  title: string
  description: string
  category: string
  image: string
  featured: boolean
  isNew?: boolean
  new?: boolean
  year: string
  viewUrl?: string
}

// Static fallback E-Book data
const staticEbooks: Ebook[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Programmatic Out-of-Home Advertising",
    description: "How leading brands and agencies are using data-driven, measurable OOH to win attention in a fragmented, performance-driven connected media world.",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    featured: true,
    new: true,
    year: "2026",
    viewUrl: "#",
  },
  {
    id: 2,
    title: "Solutions by MovingWalls: Unlocking the Power of Last Mile Advertising",
    description: "Discover how data-driven retail media and last-mile advertising can boost engagement and sales at the point of purchase.",
    category: "Playbook",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    featured: false,
    new: true,
    year: "2025",
    viewUrl: "#",
  },
  {
    id: 3,
    title: "Sustainability in Out-of-Home Media: An Open-Source Industry Roadmap",
    description: "Discover how the OOH industry is adopting sustainability with actionable insights and best practices to reduce carbon emissions.",
    category: "Whitepaper",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    featured: false,
    new: false,
    year: "2025",
    viewUrl: "#",
  },
  {
    id: 4,
    title: "The Future of OOH & DOOH in Japan: Trends, Innovation, and Market Predictions for 2025",
    description: "Explore the transformative trends reshaping Japan's Out-of-Home and Digital Out-of-Home advertising landscape.",
    category: "Market Report",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    featured: false,
    new: false,
    year: "2024",
    viewUrl: "#",
  },
  {
    id: 5,
    title: "The Future of OOH & DOOH in Vietnam: Trends, Innovation, and Market Predictions for 2025",
    description: "Explore Vietnam's evolving OOH landscape. From the growth of programmatic DOOH to new LED installations.",
    category: "Market Report",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80",
    featured: false,
    new: false,
    year: "2024",
    viewUrl: "#",
  },
  {
    id: 6,
    title: "Why Out-of-Home (OOH) Must Be Part of Your Marketing Plan",
    description: "Discover the unparalleled advantages of OOH media. Explore how integrating OOH into your marketing strategy can amplify your brand's reach.",
    category: "Whitepaper",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    featured: false,
    new: false,
    year: "2024",
    viewUrl: "#",
  },
  {
    id: 7,
    title: "Ultimate Guide to DOOH 2024",
    description: "Dive into the dynamic world of Digital Out-of-Home advertising in the Asia-Pacific region with our comprehensive guide.",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
    featured: false,
    new: false,
    year: "2024",
    viewUrl: "#",
  },
  {
    id: 8,
    title: "Your Guide to Cyber Security for Digital Signage and OOH Screens",
    description: "In an era where data security is paramount, ensuring the safety of your digital signage and OOH screens is crucial.",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    featured: false,
    new: false,
    year: "2024",
    viewUrl: "#",
  },
  {
    id: 9,
    title: "Navigating Outside the Home Media Using Data and Emerging Technology",
    description: "Discover the Outernet Campaign Playbook showcasing innovative executions. Explore planning, delivery, measurement, and verification strategies.",
    category: "Playbook",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
    featured: false,
    new: false,
    year: "2023",
    viewUrl: "#",
  },
  {
    id: 10,
    title: "Mastering Digital Out-of-Home in Malaysia",
    description: "Discover the potential of DOOH advertising in Malaysia and revolutionize your marketing efforts. Stay ahead with valuable insights.",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
    featured: false,
    new: false,
    year: "2023",
    viewUrl: "#",
  },
  {
    id: 11,
    title: "Always On DOOH Advertising",
    description: "Discover the power of real-world data. Learn how to engage your target audience, increase foot traffic, and create impactful DOOH campaigns.",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    featured: false,
    new: false,
    year: "2023",
    viewUrl: "#",
  },
  {
    id: 12,
    title: "Enhanced Customer Experience with CMS",
    description: "Boost system efficiency by embracing a reliable, effective, and streamlined approach to content delivery on screens.",
    category: "Whitepaper",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    featured: false,
    new: false,
    year: "2023",
    viewUrl: "#",
  },
  {
    id: 13,
    title: "ICC Coffee Table: Activate Your Fans, Grow Your Viewership",
    description: "Unlock the power of sponsored highlights content on digital screens outside homes. Engage new audiences with relevant content.",
    category: "Playbook",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
    featured: false,
    new: false,
    year: "2023",
    viewUrl: "#",
  },
  {
    id: 14,
    title: "Optimising DOOH: Foodpanda's Playbook for OOH Media",
    description: "Discover the pandemic's impact on traditional media and the rising potential of Outernet Marketing with data-driven strategies.",
    category: "Playbook",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=80",
    featured: false,
    new: false,
    year: "2023",
    viewUrl: "#",
  },
  {
    id: 15,
    title: "Sustainable, Inclusive Innovation is Fueling India",
    description: "Discover the immense potential of India's thriving Out-of-Home advertising industry. Explore the latest trends and revenue insights.",
    category: "Market Report",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
    featured: false,
    new: false,
    year: "2023",
    viewUrl: "#",
  },
  {
    id: 16,
    title: "Unlocking the Power of the Outernet 2023",
    description: "Unlock the power of Outernet advertising and harness its impact in a digitally-driven world. Gain insights into OOH campaign effectiveness.",
    category: "Whitepaper",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    featured: false,
    new: false,
    year: "2023",
    viewUrl: "#",
  },
  {
    id: 17,
    title: "Your Ultimate Guide to Digital Out-of-Home",
    description: "Digital is transforming how outdoor advertising is bought and delivered. The conversion of traditional billboards to digital panels has given the medium new capabilities.",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    featured: false,
    new: false,
    year: "2023",
    viewUrl: "#",
  },
  {
    id: 18,
    title: "MSAP x MW Video Outside Playbook",
    description: "In digital, video has become the most popular and engaging form of content. Learn how the world's largest advertisers use premium video formats.",
    category: "Playbook",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    featured: false,
    new: false,
    year: "2023",
    viewUrl: "#",
  },
  {
    id: 19,
    title: "How Are Your Audience Moving? Traffic Insights Singapore",
    description: "Traffic insights reflecting high footfall at shopping malls, increasing room rates, overbooked flights and tourist arrivals in Singapore.",
    category: "Market Report",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
    featured: false,
    new: false,
    year: "2022",
    viewUrl: "#",
  },
]

// Categories for filtering
const categories = ["All", "Guide", "Whitepaper", "Playbook", "Market Report"]

// Download Modal Component
const DownloadModal = ({ 
  isOpen, 
  onClose, 
  ebook 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  ebook: Ebook | null 
}) => {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate download
    setSubmitted(true)
    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setEmail('')
      setName('')
      setCompany('')
    }, 2000)
  }

  if (!isOpen || !ebook) return null

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Download E-Book</h3>
                <p className="text-sm text-gray-500 mt-1">Fill in your details to get instant access</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="font-medium text-gray-900 text-sm line-clamp-2">{ebook.title}</p>
              <span className="inline-block mt-2 text-xs bg-mw-blue-100 text-mw-blue-700 px-2 py-1 rounded-full">
                {ebook.category}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Your Company"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-mw-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-mw-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Now
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Download Started!</h3>
            <p className="text-gray-500">Your e-book is being downloaded. Check your downloads folder.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

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
    {/* Image */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <img 
        src={ebook.image} 
        alt={ebook.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        {(ebook.new || ebook.isNew) && (
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
        )}
        {ebook.featured && (
          <span className="bg-mw-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">FEATURED</span>
        )}
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 right-4">
        <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
          {ebook.category}
        </span>
      </div>

      {/* Buttons Overlay */}
      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href={ebook.viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-mw-blue-600 px-5 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-mw-blue-50 shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View
        </a>
        <button
          onClick={() => onDownload(ebook)}
          className="bg-mw-blue-600 text-white px-5 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-mw-blue-700 shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-gray-400">{ebook.year}</span>
      </div>
      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-mw-blue-600 transition-colors">
        {ebook.title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
        {ebook.description}
      </p>
      <div className="flex items-center gap-4">
        <a
          href={ebook.viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 font-medium text-sm flex items-center gap-1 hover:text-mw-blue-600 hover:gap-2 transition-all"
        >
          View E-Book
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
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

export default function EbooksPage() {
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [selectedEbook, setSelectedEbook] = React.useState<Ebook | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [ebooks, setEbooks] = React.useState<Ebook[]>(staticEbooks)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchEbooks() {
      try {
        const sanityEbooks = await getAllEbooks()
        if (sanityEbooks && sanityEbooks.length > 0) {
          setEbooks(sanityEbooks.map(transformEbook))
        }
      } catch (error) {
        console.error('Error fetching ebooks from Sanity:', error)
        // Keep static data as fallback
      } finally {
        setIsLoading(false)
      }
    }
    fetchEbooks()
  }, [])

  const filteredEbooks = activeCategory === "All" 
    ? ebooks 
    : ebooks.filter(ebook => ebook.category === activeCategory)

  const featuredEbook = ebooks.find(ebook => ebook.featured)

  const handleDownload = (ebook: Ebook) => {
    setSelectedEbook(ebook)
    setIsModalOpen(true)
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
                  <button
                    onClick={() => handleDownload(featuredEbook)}
                    className="inline-flex items-center gap-2 bg-white text-mw-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-mw-blue-50 transition-colors shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Free E-Book
                  </button>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] rounded-md overflow-hidden shadow-2xl transform lg:translate-x-8 lg:-translate-y-4 rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img 
                      src={featuredEbook.image} 
                      alt={featuredEbook.title}
                      className="w-full h-full object-cover"
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
                onClick={() => setActiveCategory(category)}
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
            {filteredEbooks.map((ebook) => (
              <EbookCard key={ebook.id} ebook={ebook} onDownload={handleDownload} />
            ))}
          </motion.div>

          {filteredEbooks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No e-books found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Download Modal */}
      <DownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        ebook={selectedEbook} 
      />
    </div>
  )
}
