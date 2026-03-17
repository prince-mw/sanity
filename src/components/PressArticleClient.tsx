"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { getSanityImageUrl } from "@/sanity/lib/fetch";

interface PressArticle {
  _id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readTime: string;
  content: any[];
  featuredImage?: any;
}

interface PressArticleClientProps {
  article: PressArticle;
}

// Format category for display
function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'product-launch': 'Product Launch',
    'product-news': 'Product News',
    'product-update': 'Product Update',
    'funding': 'Funding',
    'partnership': 'Partnership',
    'expansion': 'Expansion',
    'recognition': 'Recognition',
    'company-news': 'Company News',
    'media-spotlight': 'Media Spotlight',
    'award': 'Award',
    'industry-news': 'Industry News',
  };
  return categoryMap[category] || category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Portable Text components for rendering content
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-mw-gray-700 mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-mw-gray-900 mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-mw-gray-900 mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-mw-blue-500 pl-4 my-6 italic text-mw-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-3 ml-6 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-3 ml-6 mb-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-mw-gray-700">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-mw-gray-700">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-mw-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em>{children}</em>
    ),
    link: ({ children, value }) => (
      <a 
        href={value?.href} 
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-mw-blue-600 hover:text-mw-blue-700 underline"
      >
        {children}
      </a>
    ),
  },
};

export default function PressArticleClient({ article }: PressArticleClientProps) {
  const featuredImageUrl = article.featuredImage 
    ? getSanityImageUrl(article.featuredImage, { width: 1200, height: 600 })
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-mw-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/press-news" className="inline-flex items-center text-mw-blue-600 hover:text-mw-blue-700 mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Press & News
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-mw-blue-100 text-mw-blue-600 text-sm font-medium rounded-full">
                {formatCategory(article.category)}
              </span>
              <span className="text-mw-gray-500">{formatDate(article.publishedAt)}</span>
              <span className="text-mw-gray-400">•</span>
              <span className="text-mw-gray-500">{article.readTime || '3 min read'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-lg sm:text-xl text-mw-gray-600 leading-relaxed mb-8">
              {article.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Featured Image */}
            {featuredImageUrl ? (
              <div className="relative aspect-video rounded-xl mb-8 overflow-hidden">
                <Image
                  src={featuredImageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative h-80 bg-gradient-to-br from-mw-blue-50 to-mw-blue-100 rounded-xl mb-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <p className="text-mw-blue-700 font-medium">{formatCategory(article.category)}</p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="text-mw-gray-700 space-y-6">
              {article.content && article.content.length > 0 ? (
                <PortableText 
                  value={article.content} 
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-mw-gray-500 italic">Content not available.</p>
              )}

              {/* Media Contact */}
              <div className="bg-mw-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-bold text-mw-gray-900 mb-4">Media Contact</h3>
                <p className="text-mw-gray-700">
                  Moving Walls Communications<br/>
                  Email: media@movingwalls.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
