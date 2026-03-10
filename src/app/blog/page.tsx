"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useMemo } from "react";
import { blogPosts, blogCategories, getFeaturedPost, searchPosts } from "@/data/blog-posts";

const POSTS_PER_PAGE = 12;

type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort articles
  const processedArticles = useMemo(() => {
    // First filter by category
    let articles = selectedCategory === "All" 
      ? [...blogPosts] 
      : blogPosts.filter(article => article.category === selectedCategory);

    // Then filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Sort articles
    switch (sortBy) {
      case "newest":
        articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        articles.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "title-asc":
        articles.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        articles.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return articles;
  }, [selectedCategory, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedArticles.length / POSTS_PER_PAGE);
  const paginatedArticles = processedArticles.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const featuredArticle = getFeaturedPost();

  // Generate page numbers to show
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
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
              </svg>
              <span className="text-mw-blue-600 text-sm font-medium">MovingWalls Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Industry Insights &
              <span className="text-mw-blue-600 block">Expert Tips</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stay ahead with the latest trends, best practices, and insights from advertising experts.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full px-6 py-4 pl-14 border border-mw-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent shadow-mw-sm"
                />
                <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mw-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange("")}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-mw-gray-400 hover:text-mw-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="py-6 bg-white border-b border-mw-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Category Filter Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-mw-gray-600 whitespace-nowrap">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-2 border border-mw-gray-300 rounded-lg text-sm font-medium text-mw-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500 cursor-pointer min-w-[180px]"
              >
                {blogCategories.map((category) => {
                  const count = category === "All" 
                    ? blogPosts.length 
                    : blogPosts.filter(p => p.category === category).length;
                  return (
                    <option key={category} value={category}>
                      {category} ({count})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Sort Dropdown */}
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

      {/* Featured Article */}
      {selectedCategory === "All" && !searchQuery && currentPage === 1 && featuredArticle && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-mw-blue-600 to-mw-blue-800 rounded-2xl overflow-hidden shadow-mw-xl"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
                <div className="text-white">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-4">
                    Featured Article
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">{featuredArticle.title}</h2>
                  <p className="text-blue-100 text-lg mb-6 line-clamp-3">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{featuredArticle.author[0]}</span>
                      </div>
                      <span className="text-sm">{featuredArticle.author}</span>
                    </div>
                    <span className="text-sm text-blue-100">{featuredArticle.date}</span>
                    <span className="text-sm text-blue-100">{featuredArticle.readTime}</span>
                  </div>
                  <Link
                    href={`/resources/blog/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Read Article
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="aspect-video bg-white/10 rounded-xl backdrop-blur-sm overflow-hidden">
                  {featuredArticle.featuredImage ? (
                    <img
                      src={featuredArticle.featuredImage}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0v8h12V6H4z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-mw-gray-900">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"` 
                  : selectedCategory === "All" 
                    ? "All Articles" 
                    : `${selectedCategory} Articles`}
              </h2>
              <p className="text-sm text-mw-gray-600 mt-1">
                Showing {((currentPage - 1) * POSTS_PER_PAGE) + 1}-{Math.min(currentPage * POSTS_PER_PAGE, processedArticles.length)} of {processedArticles.length} articles
              </p>
            </div>
            {(searchQuery || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setCurrentPage(1);
                }}
                className="text-sm text-mw-blue-600 hover:text-mw-blue-700 font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear filters
              </button>
            )}
          </div>

          {paginatedArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl">
              <svg className="w-16 h-16 mx-auto text-mw-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-mw-gray-900 mb-2">No articles found</h3>
              <p className="text-mw-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-mw-blue-600 text-white rounded-lg hover:bg-mw-blue-700 transition-colors"
              >
                View All Articles
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedArticles.map((article, index) => (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <Link 
                      href={`/resources/blog/${article.slug}`} 
                      className="group block bg-white rounded-xl overflow-hidden shadow-mw-sm hover:shadow-mw-lg transition-all duration-300 h-full"
                    >
                      <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 relative overflow-hidden">
                        {article.featuredImage && (
                          <img
                            src={article.featuredImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white text-mw-blue-600 text-xs font-medium rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-mw-gray-900 mb-3 group-hover:text-mw-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-mw-gray-600 mb-4 line-clamp-2 flex-grow">{article.excerpt}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-mw-gray-200">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-mw-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-mw-blue-600">{article.author[0]}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-mw-gray-900 truncate max-w-[100px]">{article.author}</p>
                              <p className="text-xs text-mw-gray-500">{article.date}</p>
                            </div>
                          </div>
                          <span className="text-sm text-mw-gray-500">{article.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-12 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg border transition-colors ${
                        currentPage === 1
                          ? "border-mw-gray-200 text-mw-gray-300 cursor-not-allowed"
                          : "border-mw-gray-300 text-mw-gray-700 hover:bg-mw-gray-100"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
                        typeof page === "number" ? (
                          <button
                            key={index}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${
                              currentPage === page
                                ? "bg-mw-blue-600 text-white"
                                : "text-mw-gray-700 hover:bg-mw-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        ) : (
                          <span key={index} className="px-2 text-mw-gray-400">...</span>
                        )
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg border transition-colors ${
                        currentPage === totalPages
                          ? "border-mw-gray-200 text-mw-gray-300 cursor-not-allowed"
                          : "border-mw-gray-300 text-mw-gray-700 hover:bg-mw-gray-100"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </nav>
              )}

              {/* Quick Jump */}
              {totalPages > 7 && (
                <div className="mt-4 text-center">
                  <span className="text-sm text-mw-gray-500">Go to page: </span>
                  <select
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="ml-2 px-3 py-1 border border-mw-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mw-blue-500"
                  >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <option key={page} value={page}>Page {page}</option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
