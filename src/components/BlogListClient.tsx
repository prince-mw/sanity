"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useMemo } from "react";
import Image from "next/image";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  featuredImage: string;
  tags: string[];
  featured?: boolean;
}

interface BlogListClientProps {
  posts: BlogPost[];
  categories: string[];
}

const POSTS_PER_PAGE = 12;

type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

export default function BlogListClient({ posts, categories }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort articles
  const processedArticles = useMemo(() => {
    let articles = selectedCategory === "All" 
      ? [...posts] 
      : posts.filter(article => article.category === selectedCategory);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

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
  }, [posts, selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(processedArticles.length / POSTS_PER_PAGE);
  const paginatedArticles = processedArticles.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

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

  const featuredArticle = posts.find(p => p.featured) || posts[0];

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
              <span className="text-mw-blue-600 text-sm font-medium">Moving Walls Blog</span>
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
      <section className="py-6 bg-white border-b border-mw-gray-200 sticky top-14 lg:top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-mw-gray-600 whitespace-nowrap">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-2 border border-mw-gray-300 rounded-lg text-sm font-medium text-mw-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500 cursor-pointer min-w-[180px]"
              >
                {categories.map((category) => {
                  const count = category === "All" 
                    ? posts.length 
                    : posts.filter(p => p.category === category).length;
                  return (
                    <option key={category} value={category}>
                      {category} ({count})
                    </option>
                  );
                })}
              </select>
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

      {/* Featured Article */}
      {selectedCategory === "All" && !searchQuery && currentPage === 1 && featuredArticle && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href={`/blog/${featuredArticle.slug}`}>
                <div className="relative bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 rounded-2xl overflow-hidden group">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="flex flex-col justify-center text-white">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm w-fit mb-4">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Featured Article
                      </span>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4">{featuredArticle.title}</h2>
                      <p className="text-blue-100 text-lg mb-6 line-clamp-3">{featuredArticle.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-blue-200">
                        <span>{featuredArticle.author}</span>
                        <span>•</span>
                        <span>{featuredArticle.date}</span>
                        <span>•</span>
                        <span>{featuredArticle.readTime}</span>
                      </div>
                    </div>
                    {featuredArticle.featuredImage && (
                      <div className="relative aspect-video lg:aspect-auto rounded-xl overflow-hidden">
                        <Image
                          src={featuredArticle.featuredImage}
                          alt={featuredArticle.title}
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

      {/* Articles Grid */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-mw-gray-600">
              Showing <span className="font-semibold">{paginatedArticles.length}</span> of{" "}
              <span className="font-semibold">{processedArticles.length}</span> articles
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {paginatedArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-mw-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-mw-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-mw-gray-900 mb-2">No articles found</h3>
              <p className="text-mw-gray-600 mb-6">Try adjusting your search or filter to find what you&apos;re looking for.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-mw-blue-600 text-white rounded-lg hover:bg-mw-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedArticles.map((article, index) => (
                  <motion.article
                    key={article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group"
                  >
                    <Link href={`/blog/${article.slug}`} className="bg-white rounded-xl overflow-hidden shadow-mw-sm hover:shadow-mw-lg transition-all duration-300 h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        {article.featuredImage && (
                          <Image
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-mw-blue-600">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-mw-gray-900 mb-2 line-clamp-2 group-hover:text-mw-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-mw-gray-600 mb-4 line-clamp-2 flex-grow">{article.excerpt}</p>
                        <div className="flex items-center gap-3 text-sm text-mw-gray-500 mt-auto">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
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

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-mw-gray-900 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-mw-gray-600 mb-8 max-w-2xl mx-auto">
            Get the latest insights, trends, and updates delivered directly to your inbox.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mw-blue-600 text-white rounded-xl hover:bg-mw-blue-700 transition-colors font-medium"
          >
            Subscribe Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
