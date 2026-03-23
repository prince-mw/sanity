"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { CTAButton } from "./CTAButton";

interface CaseStudy {
  slug: string;
  title: string;
  brand: string;
  country: string;
  industry: string;
  content: string;
  excerpt?: string;
  featuredImage: string;
  date: string;
  featured?: boolean;
}

interface CaseStudiesListClientProps {
  caseStudies: CaseStudy[];
  countries: string[];
  industries: string[];
}

type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

const ITEMS_PER_PAGE = 12;

export default function CaseStudiesListClient({ 
  caseStudies, 
  countries, 
  industries 
}: CaseStudiesListClientProps) {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedCaseStudies = useMemo(() => {
    let filtered = caseStudies.filter(cs => {
      const matchesCountry = selectedCountry === "All" || cs.country === selectedCountry;
      const matchesIndustry = selectedIndustry === "All" || cs.industry === selectedIndustry;
      return matchesCountry && matchesIndustry;
    });

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
  }, [caseStudies, selectedCountry, selectedIndustry, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedCaseStudies.length / ITEMS_PER_PAGE);
  const paginatedCaseStudies = filteredAndSortedCaseStudies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

  const featuredCase = caseStudies.find(cs => cs.featured) || caseStudies[0];

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
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
              Case Studies
              <span className="text-mw-blue-600 block">Real Results, Real Impact</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover how leading brands across industries achieve measurable success with our platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="py-6 bg-white border-b border-mw-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm text-mw-gray-600 whitespace-nowrap">Country:</span>
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="px-4 py-2 border border-mw-gray-300 rounded-lg text-sm font-medium text-mw-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500 cursor-pointer flex-1 sm:flex-none sm:min-w-[140px]"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm text-mw-gray-600 whitespace-nowrap">Industry:</span>
                <select
                  value={selectedIndustry}
                  onChange={(e) => handleIndustryChange(e.target.value)}
                  className="px-4 py-2 border border-mw-gray-300 rounded-lg text-sm font-medium text-mw-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500 cursor-pointer flex-1 sm:flex-none sm:min-w-[160px]"
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-mw-gray-600 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-4 py-2 border border-mw-gray-300 rounded-lg text-sm font-medium text-mw-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      {selectedCountry === "All" && selectedIndustry === "All" && currentPage === 1 && featuredCase && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href={`/case-studies/${featuredCase.slug}`}>
                <div className="relative bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 rounded-2xl overflow-hidden group">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="flex flex-col justify-center text-white">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm w-fit mb-4">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Featured Case Study
                      </span>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4">{featuredCase.title}</h2>
                      <p className="text-blue-100 text-lg mb-6 line-clamp-3">
                        {featuredCase.excerpt || getExcerpt(featuredCase.content, 200)}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-blue-200">
                        <span>{featuredCase.brand || 'Client'}</span>
                        <span>•</span>
                        <span>{featuredCase.industry}</span>
                        <span>•</span>
                        <span>{featuredCase.country}</span>
                      </div>
                    </div>
                    {featuredCase.featuredImage && (
                      <div className="relative aspect-video lg:aspect-auto rounded-xl overflow-hidden">
                        <Image
                          src={featuredCase.featuredImage}
                          alt={featuredCase.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Case Studies Grid */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-mw-gray-600">
              Showing <span className="font-semibold">{paginatedCaseStudies.length}</span> of{" "}
              <span className="font-semibold">{filteredAndSortedCaseStudies.length}</span> case studies
              {selectedCountry !== "All" && ` in ${selectedCountry}`}
              {selectedIndustry !== "All" && ` • ${selectedIndustry}`}
            </p>
          </div>

          {paginatedCaseStudies.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-mw-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-mw-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-mw-gray-900 mb-2">No case studies found</h3>
              <p className="text-mw-gray-600 mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
              <button
                onClick={() => {
                  setSelectedCountry("All");
                  setSelectedIndustry("All");
                }}
                className="px-6 py-3 bg-mw-blue-600 text-white rounded-lg hover:bg-mw-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedCaseStudies.map((caseStudy, index) => (
                  <motion.article
                    key={caseStudy.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group"
                  >
                    <Link href={`/case-studies/${caseStudy.slug}`} className="bg-white rounded-xl overflow-hidden shadow-mw-sm hover:shadow-mw-lg transition-all duration-300 h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        {caseStudy.featuredImage && (
                          <Image
                            src={caseStudy.featuredImage}
                            alt={caseStudy.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-mw-blue-600">
                            {caseStudy.industry}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-mw-gray-900 mb-2 line-clamp-2 group-hover:text-mw-blue-600 transition-colors">
                          {caseStudy.title}
                        </h3>
                        <p className="text-mw-gray-600 mb-4 line-clamp-2 flex-grow">
                          {caseStudy.excerpt || getExcerpt(caseStudy.content)}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-mw-gray-500 mt-auto">
                          <span>{caseStudy.country}</span>
                          <span>•</span>
                          <span>{formatDate(caseStudy.date)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-mw-gray-300 text-mw-gray-700 hover:bg-mw-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                            ? "text-mw-gray-400 cursor-default"
                            : "border border-mw-gray-300 text-mw-gray-700 hover:bg-mw-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-mw-gray-300 text-mw-gray-700 hover:bg-mw-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-mw-gray-900 mb-4">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-mw-gray-600 mb-8 max-w-2xl mx-auto">
            Join leading brands who have achieved measurable results with our platform.
          </p>
          <CTAButton
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mw-blue-600 text-white rounded-xl hover:bg-mw-blue-700 transition-colors font-medium"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
