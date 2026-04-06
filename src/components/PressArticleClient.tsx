"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { getSanityImageUrl } from "@/sanity/lib/fetch";
import { sanitizeHtml } from "@/lib/sanitize";

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
  return categoryMap[category] || category.replaceAll('-', ' ').replaceAll(/\b\w/g, c => c.toUpperCase());
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
// Helper to build Sanity image URL from asset reference
function buildSanityImageUrl(image: any, width?: number): string {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  if (!id || !dimensions || !format) return ''
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
  if (width) url += `?w=${width}&q=85&auto=format`
  return url
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      const imageUrl = buildSanityImageUrl(value, 800)
      if (!imageUrl) return null
      return (
        <figure className="my-8">
          <img src={imageUrl} alt={value.alt || ''} className="rounded-xl w-full" />
          {value.caption && (
            <figcaption className="text-center text-sm text-mw-gray-500 mt-2">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    video: ({ value }: any) => {
      if (value?.videoType === 'file' && value?.videoFileUrl) {
        return (
          <figure className="my-8">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-mw-gray-100">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                preload="metadata"
                playsInline
              >
                <source src={value.videoFileUrl} type={value.videoFileMimeType || 'video/mp4'} />
                <track kind="captions" default />
              </video>
            </div>
            {value.caption && (
              <figcaption className="text-center text-sm text-mw-gray-500 mt-2">{value.caption}</figcaption>
            )}
          </figure>
        )
      }
      if (!value?.url) return null
      const getVideoEmbed = (url: string) => {
        const ytMatch = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&\s?]+)/.exec(url)
        const vimeoMatch = /vimeo\.com\/(?:video\/)?(\d+)/.exec(url)
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
        return null
      }
      const embedUrl = getVideoEmbed(value.url)
      if (!embedUrl) return null
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-mw-gray-100">
            <iframe src={embedUrl} className="absolute inset-0 w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title={value.caption || 'Embedded video'} />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-mw-gray-500 mt-2">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({ value }: any) => {
      if (value.code && (value.language === 'html' || value.code.trim().startsWith('<'))) {
        return <div className="my-8 html-embed" dangerouslySetInnerHTML={{ __html: sanitizeHtml(value.code) }} />
      }
      return (
        <pre className="my-6 p-4 bg-mw-gray-900 text-mw-gray-100 rounded-xl overflow-x-auto text-sm">
          <code>{value.code}</code>
        </pre>
      )
    },
    htmlEmbed: ({ value }: any) => {
      if (!value?.code) return null
      return <div className="my-8 html-embed" dangerouslySetInnerHTML={{ __html: sanitizeHtml(value.code) }} />
    },
    callout: ({ value }: any) => {
      const typeStyles: Record<string, { bg: string; border: string; icon: string }> = {
        info: { bg: 'bg-blue-50', border: 'border-blue-400', icon: '💡' },
        warning: { bg: 'bg-amber-50', border: 'border-amber-400', icon: '⚠️' },
        success: { bg: 'bg-green-50', border: 'border-green-400', icon: '✅' },
        error: { bg: 'bg-red-50', border: 'border-red-400', icon: '❌' },
        tip: { bg: 'bg-purple-50', border: 'border-purple-400', icon: '💬' },
        note: { bg: 'bg-gray-50', border: 'border-gray-400', icon: '📝' },
      }
      const style = typeStyles[value.type] || typeStyles.info
      return (
        <div className={`my-6 p-4 ${style.bg} border-l-4 ${style.border} rounded-r-lg`}>
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">{style.icon}</span>
            <div className="flex-1">
              {value.title && <h4 className="font-semibold text-mw-gray-900 mb-2">{value.title}</h4>}
              <p className="text-mw-gray-700 leading-relaxed">{value.content}</p>
            </div>
          </div>
        </div>
      )
    },
    statBlock: ({ value }: any) => {
      const themeStyles: Record<string, { bg: string; text: string; label: string }> = {
        light: { bg: 'bg-white border border-mw-gray-200', text: 'text-mw-blue-600', label: 'text-mw-gray-600' },
        dark: { bg: 'bg-mw-gray-900', text: 'text-white', label: 'text-mw-gray-300' },
        blue: { bg: 'bg-mw-blue-600', text: 'text-white', label: 'text-mw-blue-100' },
      }
      const style = themeStyles[value.theme] || themeStyles.light
      return (
        <div className={`my-8 p-6 ${style.bg} rounded-xl`}>
          <div className={value.layout === 'row' ? 'flex flex-wrap justify-center gap-8' : 'grid grid-cols-2 gap-4'}>
            {value.stats?.map((stat: any, i: number) => (
              <div key={stat._key || `stat-${i}`} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${style.text} mb-2`}>{stat.value}</div>
                <div className={`text-sm font-medium ${style.label}`}>{stat.label}</div>
                {stat.description && <div className={`text-xs mt-1 ${style.label} opacity-80`}>{stat.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )
    },
    ctaButton: ({ value }: any) => {
      const styleClasses: Record<string, string> = {
        primary: 'bg-mw-blue-600 hover:bg-mw-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors',
        secondary: 'border-2 border-mw-blue-600 text-mw-blue-600 hover:bg-mw-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors',
        dark: 'bg-mw-gray-900 hover:bg-mw-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors',
        link: 'text-mw-blue-600 hover:text-mw-blue-700 font-semibold transition-colors',
      }
      const isExternal = value.url?.startsWith('http')
      const alignmentMap: Record<string, string> = { center: 'justify-center', right: 'justify-end' }
      const alignmentClass = alignmentMap[value.alignment] || 'justify-start'
      return (
        <div className={`my-6 flex ${alignmentClass}`}>
          <a href={value.url || '#'} className={styleClasses[value.style] || styleClasses.primary} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{value.text}</a>
        </div>
      )
    },
    tableBlock: ({ value }: any) => (
      <div className="my-8 overflow-x-auto">
        {value.caption && <div className="text-sm text-mw-gray-600 mb-2 font-medium">{value.caption}</div>}
        <table className={`w-full ${value.bordered ? 'border border-mw-gray-200' : ''}`}>
          <thead><tr className="bg-mw-gray-100">{value.headers?.map((h: string, i: number) => (<th key={`header-${i}`} className={`px-4 py-3 text-left text-sm font-semibold text-mw-gray-900 ${value.bordered ? 'border border-mw-gray-200' : ''}`}>{h}</th>))}</tr></thead>
          <tbody>{value.rows?.map((row: any, ri: number) => (<tr key={row._key || `row-${ri}`} className={value.striped && ri % 2 === 1 ? 'bg-mw-gray-50' : ''}>{row.cells?.map((cell: string, ci: number) => (<td key={`cell-${ri}-${ci}`} className={`px-4 py-3 text-sm text-mw-gray-700 ${value.bordered ? 'border border-mw-gray-200' : ''}`}>{cell}</td>))}</tr>))}</tbody>
        </table>
      </div>
    ),
    testimonialBlock: ({ value }: any) => {
      const avatarUrl = value.avatar?.asset ? buildSanityImageUrl(value.avatar, 80) : ''
      return (
        <div className="my-8 bg-mw-gray-50 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {avatarUrl && <img src={avatarUrl} alt={value.author} width={80} height={80} className="rounded-full flex-shrink-0" />}
            <div className="flex-1">
              {value.rating && <div className="flex gap-1 mb-3">{Array.from({ length: 5 }, (_, i) => (<span key={`star-${i}`} className={`text-lg ${i < value.rating ? 'text-yellow-400' : 'text-mw-gray-300'}`}>★</span>))}</div>}
              <blockquote className="text-lg text-mw-gray-700 italic mb-4">&ldquo;{value.quote}&rdquo;</blockquote>
              <div>
                <div className="font-semibold text-mw-gray-900">{value.author}</div>
                {(value.role || value.company) && <div className="text-sm text-mw-gray-600">{value.role}{value.role && value.company && ' at '}{value.company}</div>}
              </div>
            </div>
          </div>
        </div>
      )
    },
    accordionBlock: ({ value }: any) => (
      <div className="my-8">
        {value.title && <h3 className="text-xl font-bold text-mw-gray-900 mb-4">{value.title}</h3>}
        <div className="space-y-3">
          {value.items?.map((item: any, i: number) => (
            <details key={item._key || `faq-${i}`} className="group bg-white border border-mw-gray-200 rounded-lg overflow-hidden">
              <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-mw-gray-50 transition-colors">
                <span className="font-medium text-mw-gray-900">{item.question}</span>
                <svg className="w-5 h-5 text-mw-gray-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-4 pb-4 text-mw-gray-700"><p>{item.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    ),
  },
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

export default function PressArticleClient({ article }: Readonly<PressArticleClientProps>) {
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
                  Email: info@movingwalls.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
