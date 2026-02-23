"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Learn",
      description: "Expand your knowledge with expert insights and educational content",
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      resources: [
        { name: "Blog", href: "/resources/blog", description: "Industry insights and tips", count: "150+ Articles" },
        { name: "Case Studies", href: "/resources/case-studies", description: "Success stories", count: "75+ Stories" },
        { name: "Whitepapers", href: "/resources/whitepapers", description: "In-depth research", count: "30+ Papers" }
      ]
    },
    {
      title: "Support",
      description: "Get the help you need to succeed with our platform",
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      resources: [
        { name: "Help Center", href: "/resources/help-center", description: "Get answers fast", count: "500+ FAQs" },
        { name: "Documentation", href: "/resources/documentation", description: "Technical guides", count: "Complete Docs" }
      ]
    }
  ];

  const featuredResources = [
    {
      type: "Whitepaper",
      title: "2024 Digital Out-of-Home Advertising Report",
      description: "Comprehensive analysis of DOOH trends, consumer behavior, and ROI metrics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      downloadCount: "2.5K+",
      href: "/resources/whitepapers"
    },

    {
      type: "Case Study",
      title: "How Brand X Achieved 300% ROI in 90 Days",
      description: "Deep dive into a successful automotive campaign using MW-Platform",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      readTime: "8 min",
      href: "/resources/case-studies"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-8">
              <span className="text-mw-blue-600 text-sm font-medium">Knowledge Hub</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Resources to
              <span className="text-mw-blue-600 block">Power Your Success</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Access expert insights, technical documentation, and learning materials to maximize 
              your advertising performance with Moving Walls.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources, articles, guides..."
                  className="w-full px-6 py-4 pl-14 border border-mw-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent shadow-mw-sm"
                />
                <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mw-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 mb-4">Featured Resources</h2>
            <p className="text-lg text-mw-gray-600">Top picks to accelerate your learning</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={resource.href} className="group block bg-white border border-mw-gray-200 rounded-xl overflow-hidden hover:shadow-mw-lg transition-all duration-300">
                  <div className="aspect-video bg-mw-gray-100 relative overflow-hidden">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white text-mw-blue-600 text-xs font-medium rounded-full">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-mw-gray-900 mb-3 group-hover:text-mw-blue-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-mw-gray-600 mb-4 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-mw-gray-500">
                        {resource.downloadCount || resource.duration || resource.readTime}
                      </span>
                      <span className="text-mw-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      {resourceCategories.map((category, catIndex) => (
        <section key={catIndex} className={`py-20 ${catIndex % 2 === 0 ? 'bg-mw-gray-50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-mw-blue-100 rounded-xl mb-4 text-mw-blue-600">
                {category.icon}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 mb-4">{category.title}</h2>
              <p className="text-lg text-mw-gray-600 max-w-2xl mx-auto">{category.description}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={resource.href}
                    className="group block bg-white border border-mw-gray-200 rounded-xl p-6 hover:shadow-mw-lg hover:border-mw-blue-300 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-mw-gray-900 mb-2 group-hover:text-mw-blue-600 transition-colors">
                          {resource.name}
                        </h3>
                        <p className="text-sm text-mw-gray-600 mb-3">{resource.description}</p>
                        <span className="inline-block px-3 py-1 bg-mw-blue-50 text-mw-blue-600 text-xs font-medium rounded-full">
                          {resource.count}
                        </span>
                      </div>
                      <svg className="w-6 h-6 text-mw-gray-400 group-hover:text-mw-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
