"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch a few recent posts as suggestions
    fetch('/api/search?q=&limit=3')
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setRecentPosts(data.results.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const popularLinks = [
    { name: "Our Platform", href: "/platform", icon: "🚀" },
    { name: "Case Studies", href: "/case-studies", icon: "📊" },
    { name: "Blog", href: "/blog", icon: "📝" },
    { name: "Contact Us", href: "/contact", icon: "✉️" },
    { name: "About Us", href: "/about", icon: "ℹ️" },
    { name: "Careers", href: "/careers", icon: "💼" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span className="text-[180px] md:text-[220px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-mw-blue-600 to-mw-blue-400 leading-none select-none">
              404
            </span>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg 
                className="w-24 h-24 text-mw-blue-500 opacity-20"
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-mw-gray-600 mb-8 max-w-xl mx-auto">
            The page you&apos;re looking for seems to have wandered off. Don&apos;t worry, 
            let&apos;s help you find your way back.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSearch}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search our site..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 border border-mw-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent shadow-mw-sm bg-white"
            />
            <svg 
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mw-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-mw-blue-600 text-white rounded-lg hover:bg-mw-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </motion.form>

        {/* Popular Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-lg font-semibold text-mw-gray-900 mb-4">
            Popular Pages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg mx-auto">
            {popularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-mw-gray-200 hover:border-mw-blue-300 hover:bg-mw-blue-50 transition-all group"
              >
                <span className="text-lg">{link.icon}</span>
                <span className="text-sm font-medium text-mw-gray-700 group-hover:text-mw-blue-600">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mw-blue-600 text-white rounded-xl font-semibold hover:bg-mw-blue-700 transition-colors shadow-mw"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Homepage
          </Link>
        </motion.div>

        {/* Support Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-mw-gray-500"
        >
          Need help? <Link href="/contact" className="text-mw-blue-600 hover:underline">Contact our support team</Link>
        </motion.p>
      </div>
    </div>
  );
}
