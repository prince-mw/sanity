"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchResult {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeToPath: Record<string, string> = {
  blogPost: "/blog",
  caseStudy: "/case-studies",
  pressRelease: "/press-news",
  event: "/events",
  webinar: "/webinars",
  ebook: "/ebooks",
  whitepaper: "/whitepapers",
};

const typeLabels: Record<string, string> = {
  blogPost: "Blog",
  caseStudy: "Case Study",
  pressRelease: "Press",
  event: "Event",
  webinar: "Webinar",
  ebook: "E-Book",
  whitepaper: "Whitepaper",
};

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [total, setTotal] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounced search
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setTotal(0);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=8`);
      const data = await res.json();
      setResults(data.results || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, performSearch]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            const result = results[selectedIndex];
            const path = typeToPath[result._type] || "";
            router.push(`${path}/${result.slug}`);
            onClose();
          } else if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            onClose();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, query, router, onClose]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  const getResultUrl = (result: SearchResult) => {
    const basePath = typeToPath[result._type] || "";
    return `${basePath}/${result.slug}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="relative border-b border-mw-gray-200">
                <svg
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-mw-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search blog posts, case studies, resources..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(-1);
                  }}
                  className="w-full px-14 py-5 text-lg focus:outline-none"
                />
                {isLoading && (
                  <div className="absolute right-14 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-mw-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-mw-gray-400 hover:text-mw-gray-600"
                >
                  <kbd className="px-2 py-1 text-xs bg-mw-gray-100 rounded">ESC</kbd>
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <Link
                        key={result._id}
                        href={getResultUrl(result)}
                        onClick={onClose}
                        className={`flex items-start gap-4 px-5 py-3 hover:bg-mw-gray-50 transition-colors ${
                          index === selectedIndex ? "bg-mw-blue-50" : ""
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        {result.image && (
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-mw-gray-100">
                            <Image
                              src={result.image}
                              alt={result.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-mw-blue-600 bg-mw-blue-50 px-2 py-0.5 rounded">
                              {typeLabels[result._type] || result._type}
                            </span>
                            {result.category && (
                              <span className="text-xs text-mw-gray-500">
                                {result.category}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-mw-gray-900 truncate">
                            {result.title}
                          </h3>
                          <p className="text-sm text-mw-gray-500 line-clamp-1">
                            {result.excerpt}
                          </p>
                        </div>
                        {result.date && (
                          <span className="text-xs text-mw-gray-400 flex-shrink-0">
                            {result.date}
                          </span>
                        )}
                      </Link>
                    ))}
                    {total > results.length && (
                      <Link
                        href={`/search?q=${encodeURIComponent(query)}`}
                        onClick={onClose}
                        className="block px-5 py-3 text-center text-sm text-mw-blue-600 hover:bg-mw-gray-50 border-t border-mw-gray-100"
                      >
                        View all {total} results →
                      </Link>
                    )}
                  </div>
                ) : query.length >= 2 && !isLoading ? (
                  <div className="py-12 text-center">
                    <svg
                      className="w-12 h-12 text-mw-gray-300 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-mw-gray-500">No results found for &quot;{query}&quot;</p>
                    <p className="text-sm text-mw-gray-400 mt-1">
                      Try different keywords or browse our categories
                    </p>
                  </div>
                ) : (
                  <div className="py-8 px-5">
                    <p className="text-sm text-mw-gray-500 mb-4">Quick links</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Blog", href: "/blog", icon: "📝" },
                        { label: "Case Studies", href: "/case-studies", icon: "📊" },
                        { label: "Events", href: "/events", icon: "📅" },
                        { label: "Webinars", href: "/webinars", icon: "🎥" },
                        { label: "E-Books", href: "/ebooks", icon: "📚" },
                        { label: "Whitepapers", href: "/whitepapers", icon: "📄" },
                      ].map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-mw-gray-600 hover:bg-mw-gray-50 rounded-lg"
                        >
                          <span>{link.icon}</span>
                          <span>{link.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-mw-gray-100 px-5 py-3 flex items-center justify-between text-xs text-mw-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-mw-gray-100 rounded">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-mw-gray-100 rounded">↓</kbd>
                    <span className="ml-1">Navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-mw-gray-100 rounded">Enter</kbd>
                    <span className="ml-1">Select</span>
                  </span>
                </div>
                <span>Powered by Sanity</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
