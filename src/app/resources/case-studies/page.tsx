"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { caseStudies, caseStudyCountries, caseStudyIndustries, type CaseStudy } from "@/data/case-studies";

type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

const ITEMS_PER_PAGE = 12;

export default function CaseStudiesPage() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort case studies
  const filteredAndSortedCaseStudies = useMemo(() => {
    let filtered = caseStudies.filter(cs => {
      const matchesCountry = selectedCountry === "All" || cs.country === selectedCountry;
      const matchesIndustry = selectedIndustry === "All" || cs.industry === selectedIndustry;
      return matchesCountry && matchesIndustry;
    });

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  }, [selectedCountry, selectedIndustry, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCaseStudies.length / ITEMS_PER_PAGE);
  const paginatedCaseStudies = filteredAndSortedCaseStudies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setCurrentPage(1);
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // Get featured case study (most recent featured one)
  const featuredCase = caseStudies.find(cs => cs.featured);

  // Helper to extract a short description from content
  const getExcerpt = (content: string, maxLength: number = 150) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-8">
              <svg className="w-4 h-4 text-mw-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-mw-blue-600 text-sm font-medium">Success Stories</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Case Studies &
              <span className="text-mw-blue-600 block">Client Success</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover how leading brands achieve exceptional results with Moving Walls's advertising solutions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { number: "500+", label: "Success Stories" },
                { number: "275%", label: "Avg ROI" },
                { number: "98%", label: "Client Retention" },
                { number: "$2B+", label: "Ad Spend Managed" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-mw-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-mw-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-8 bg-white border-b border-mw-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Country Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-mw-gray-700">Country:</label>
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="px-3 py-2 rounded-lg border border-mw-gray-300 bg-white text-mw-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500"
              >
                {caseStudyCountries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-mw-gray-700">Industry:</label>
              <select
                value={selectedIndustry}
                onChange={(e) => handleIndustryChange(e.target.value)}
                className="px-3 py-2 rounded-lg border border-mw-gray-300 bg-white text-mw-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500"
              >
                {caseStudyIndustries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm font-medium text-mw-gray-700">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-3 py-2 rounded-lg border border-mw-gray-300 bg-white text-mw-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-mw-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      {selectedCountry === "All" && selectedIndustry === "All" && featuredCase && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-mw-blue-600 to-mw-blue-800 rounded-2xl overflow-hidden shadow-mw-xl"
            >
              <div className="p-8 lg:p-12">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-6">
                  Featured Case Study
                </span>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">{featuredCase.title}</h2>
                    <p className="text-blue-100 text-lg mb-6">{getExcerpt(featuredCase.content, 200)}</p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-xl font-bold mb-1">{featuredCase.country}</div>
                        <div className="text-sm text-blue-100">Country</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-xl font-bold mb-1">{featuredCase.industry}</div>
                        <div className="text-sm text-blue-100">Industry</div>
                      </div>
                      {featuredCase.brand && featuredCase.brand !== 'How' && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                          <div className="text-xl font-bold mb-1">{featuredCase.brand}</div>
                          <div className="text-sm text-blue-100">Brand</div>
                        </div>
                      )}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-xl font-bold mb-1">{formatDate(featuredCase.date)}</div>
                        <div className="text-sm text-blue-100">Published</div>
                      </div>
                    </div>

                    <Link
                      href={`/resources/case-studies/${featuredCase.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Read Full Story
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  <div className="relative h-64 lg:h-auto rounded-xl overflow-hidden">
                    {featuredCase.featuredImage && (
                      <Image
                        src={featuredCase.featuredImage}
                        alt={featuredCase.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Case Studies Grid */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-mw-gray-900">
              {selectedCountry === "All" && selectedIndustry === "All" 
                ? "All Case Studies" 
                : `${selectedCountry !== "All" ? selectedCountry : ""} ${selectedIndustry !== "All" ? selectedIndustry : ""} Case Studies`.trim()}
            </h2>
            <span className="text-sm text-mw-gray-600">
              {filteredAndSortedCaseStudies.length} {filteredAndSortedCaseStudies.length === 1 ? 'story' : 'stories'}
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </span>
          </div>

          {paginatedCaseStudies.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-mw-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-mw-gray-600 text-lg">No case studies found matching your filters.</p>
              <button
                onClick={() => { setSelectedCountry("All"); setSelectedIndustry("All"); }}
                className="mt-4 px-4 py-2 text-mw-blue-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedCaseStudies.map((caseStudy, index) => (
                  <motion.div
                    key={caseStudy.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-mw-gray-100"
                  >
                    {/* Image Thumbnail */}
                    <div className="relative h-48 overflow-hidden bg-mw-gray-100">
                      {caseStudy.featuredImage ? (
                        <Image
                          src={caseStudy.featuredImage}
                          alt={caseStudy.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-mw-blue-100 to-mw-blue-200">
                          <svg className="w-12 h-12 text-mw-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Category & Country overlay */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-mw-gray-800 text-xs font-semibold rounded-full">
                            {caseStudy.industry}
                          </span>
                          <span className="px-2 py-1 bg-mw-blue-600 text-white text-xs font-bold rounded-full">
                            {caseStudy.country}
                          </span>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-white/80 text-xs">{formatDate(caseStudy.date)}</span>
                          {caseStudy.pdfLink && (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                              PDF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-mw-gray-900 mb-2 line-clamp-2 group-hover:text-mw-blue-600 transition-colors duration-300">
                        {caseStudy.title}
                      </h3>
                      {caseStudy.brand && caseStudy.brand !== 'How' && caseStudy.brand.length > 2 && (
                        <p className="text-sm text-mw-blue-600 font-medium mb-2">{caseStudy.brand}</p>
                      )}
                      <p className="text-mw-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {getExcerpt(caseStudy.content)}
                      </p>
                      
                      {/* CTA */}
                      <Link 
                        href={`/resources/case-studies/${caseStudy.slug}`}
                        className="inline-flex items-center gap-2 text-mw-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                      >
                        View Case Study
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-mw-gray-300 text-mw-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-mw-gray-100 transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first, last, current, and adjacent pages
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? "bg-mw-blue-600 text-white"
                                : "text-mw-gray-700 hover:bg-mw-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="px-2 text-mw-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-mw-gray-300 text-mw-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-mw-gray-100 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-mw-blue-600 to-mw-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve exceptional results like these.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-mw-lg"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
