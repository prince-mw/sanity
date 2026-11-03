"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLocale } from "@/i18n/LocaleContext";

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

const typeToPath: Record<string, string> = {
  blogPost: "/blog",
  caseStudy: "/case-studies",
  pressRelease: "/press-news",
  event: "/events",
  webinar: "/webinars",
  ebook: "/ebooks",
};

// Translation keys for the result-type badges (resolved with t() at render)
const typeLabels: Record<string, string> = {
  blogPost: "ui.search.types.blogPost",
  caseStudy: "ui.search.types.caseStudy",
  pressRelease: "ui.search.types.pressRelease",
  event: "ui.search.types.event",
  webinar: "ui.search.types.webinar",
  ebook: "ui.search.types.ebook",
};

const contentTypes = [
  { value: "", label: "ui.search.filters.all" },
  { value: "blogPost", label: "ui.search.filters.blogPost" },
  { value: "caseStudy", label: "ui.search.filters.caseStudy" },
  { value: "pressRelease", label: "ui.search.filters.pressRelease" },
  { value: "event", label: "ui.search.filters.event" },
  { value: "webinar", label: "ui.search.filters.webinar" },
  { value: "ebook", label: "ui.search.filters.ebook" },
];

function SearchContent() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const initialType = searchParams.get("type") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState(initialType);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const RESULTS_PER_PAGE = 12;

  const performSearch = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        limit: String(RESULTS_PER_PAGE * page),
      });
      if (selectedType) {
        params.set("type", selectedType);
      }

      const res = await fetch(`/api/search?${params}`);
      const data = await res.json();
      setResults(data.results || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [query, selectedType, page]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedType) params.set("type", selectedType);
    router.push(`/search?${params}`);
    performSearch();
  };

  const getResultUrl = (result: SearchResult) => {
    const basePath = typeToPath[result._type] || "";
    return `${basePath}/${result.slug}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pb-12 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50 mw-hero-top">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-mw-gray-900 mb-4">
              {t("ui.search.title")}
            </h1>
            <p className="text-mw-gray-600">
              {t("ui.search.subtitle")}
            </p>
          </motion.div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
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
                type="text"
                placeholder={t("ui.search.placeholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-14 py-4 border border-mw-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mw-blue-500 text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-mw-blue-600 text-white rounded-lg hover:bg-mw-blue-700 transition-colors"
              >
                {t("ui.search.button")}
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {contentTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => {
                    setSelectedType(type.value);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedType === type.value
                      ? "bg-mw-blue-600 text-white"
                      : "bg-mw-gray-100 text-mw-gray-600 hover:bg-mw-gray-200"
                  }`}
                >
                  {t(type.label)}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="mw-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-mw-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : results.length > 0 ? (
            <>
              <p className="text-mw-gray-600 mb-8">
                {t("ui.search.found").split("{n}")[0]}<span className="font-semibold">{total}</span>{(t("ui.search.found").split("{n}")[1] || "").replace("{q}", query)}
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result, index) => (
                  <motion.div
                    key={result._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={getResultUrl(result)}
                      className="block bg-white rounded-2xl border border-mw-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      {result.image && (
                        <div className="relative h-48 bg-mw-gray-100">
                          <Image
                            src={result.image}
                            alt={result.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-mw-blue-700 bg-mw-blue-50 px-2 py-1 rounded-lg">
                            {typeLabels[result._type] ? t(typeLabels[result._type]) : result._type}
                          </span>
                          {result.date && (
                            <span className="text-xs text-mw-gray-400">
                              {result.date}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-mw-gray-900 mb-2 line-clamp-2 group-hover:text-mw-blue-600 transition-colors">
                          {result.title}
                        </h3>
                        <p className="text-sm text-mw-gray-500 line-clamp-2">
                          {result.excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              {results.length < total && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-8 py-3 bg-mw-gray-100 text-mw-gray-700 rounded-lg font-medium hover:bg-mw-gray-200 transition-colors"
                  >
                    {t("ui.search.loadMore")}
                  </button>
                </div>
              )}
            </>
          ) : query ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 text-mw-gray-300 mx-auto mb-4"
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
              <h2 className="text-xl font-semibold text-mw-gray-900 mb-2">
                {t("ui.search.noResults")}
              </h2>
              <p className="text-mw-gray-500 mb-6">
                {t("ui.search.noMatch").replace("{q}", query)}
              </p>
              <div className="text-sm text-mw-gray-500">
                <p className="mb-2">{t("ui.search.suggestions")}</p>
                <ul className="space-y-1">
                  <li>• {t("ui.search.checkSpelling")}</li>
                  <li>• {t("ui.search.differentKeywords")}</li>
                  <li>• {t("ui.search.generalTerms")}</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 text-mw-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-mw-gray-900 mb-2">
                {t("ui.search.startTitle")}
              </h2>
              <p className="text-mw-gray-500">
                {t("ui.search.startText")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-mw-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
