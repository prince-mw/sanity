'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanitizeHtml } from '@/lib/sanitize'

// Helper to build Sanity image URL from asset reference
function buildSanityImageUrl(image: any, width?: number): string {
  if (!image?.asset?._ref) return ''
  
  // Parse the asset reference: image-{id}-{dimensions}-{format}
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  
  if (!id || !dimensions || !format) return ''
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  
  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
  
  if (width) {
    url += `?w=${width}&q=85&auto=format`
  }
  
  return url
}

interface Speaker {
  _key: string
  name: string
  role: string
  company: string
  bio: string
  image: string
  linkedin: string
}

interface WebinarDetail {
  id: string
  slug: string
  title: string
  description: string
  date: string
  time: string
  duration: string
  speaker: string
  speakerRole: string
  speakerImage: string
  featuredImage: string
  webinarType: 'upcoming' | 'past'
  registrationLink: string
  watchLink: string
  content?: any
  htmlContent?: string
  speakers?: Speaker[]
}

interface RelatedWebinar {
  slug: string
  title: string
  description: string
  date: string
  duration: string
  speaker: string
  speakerRole: string
  featuredImage: string
  webinarType: 'upcoming' | 'past'
  speakers?: Speaker[]
}

interface WebinarDetailClientProps {
  webinar: WebinarDetail
  relatedWebinars: RelatedWebinar[]
}

const portableTextComponents = {
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
              <video className="absolute inset-0 w-full h-full object-cover" controls preload="metadata" playsInline>
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
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-mw-gray-900 mt-10 mb-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-mw-gray-900 mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold text-mw-gray-900 mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-mw-gray-700 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-mw-blue-500 pl-6 my-6 italic text-mw-gray-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a 
        href={value?.href} 
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-mw-blue-600 hover:underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-mw-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: any) => (
      <span className="underline">{children}</span>
    ),
    'strike-through': ({ children }: any) => (
      <span className="line-through">{children}</span>
    ),
    code: ({ children }: any) => (
      <code className="bg-mw-gray-100 text-mw-blue-600 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-mw-gray-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-mw-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
}

function formatDate(dateString: string): string {
  if (!dateString) return 'TBD'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Helper to get embeddable video URL
function getVideoEmbedUrl(url: string | undefined): string {
  if (!url) return ''
  
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = ''
    if (url.includes('youtu.be')) {
      videoId = url.split('/').pop()?.split('?')[0] || ''
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0] || ''
    } else if (url.includes('/embed/')) {
      videoId = url.split('/embed/')[1]?.split('?')[0] || ''
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.split('/').pop()?.split('?')[0] || ''
    return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : url
  }
  
  return url
}

export default function WebinarDetailClient({ webinar, relatedWebinars }: Readonly<WebinarDetailClientProps>) {
  const isUpcoming = webinar.webinarType === 'upcoming'
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  
  const videoEmbedUrl = getVideoEmbedUrl(webinar.watchLink)

  // If htmlContent exists, render only the custom HTML
  if (webinar.htmlContent) {
    return (
      <div className="min-h-screen">
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(webinar.htmlContent) }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-mw-gray-600">
                <li>
                  <Link href="/" className="hover:text-mw-blue-600 transition-colors">Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/webinars" className="hover:text-mw-blue-600 transition-colors">Webinars</Link>
                </li>
                <li>/</li>
                <li className="text-mw-gray-900 font-medium truncate max-w-[200px]">{webinar.title}</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Content */}
              <div>
                {/* Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    isUpcoming 
                      ? 'bg-mw-blue-100 text-mw-blue-700' 
                      : 'bg-mw-gray-100 text-mw-gray-700'
                  }`}>
                    {isUpcoming ? 'Upcoming Webinar' : 'Past Webinar'}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
                  {webinar.title}
                </h1>

                <p className="text-xl text-mw-gray-600 mb-8 leading-relaxed">
                  {webinar.description}
                </p>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-mw-gray-600">
                    <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-mw-gray-500">Date</p>
                      <p className="font-medium text-mw-gray-900">{formatDate(webinar.date)}</p>
                    </div>
                  </div>

                  {webinar.time && (
                    <div className="flex items-center gap-3 text-mw-gray-600">
                      <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-mw-gray-500">Time</p>
                        <p className="font-medium text-mw-gray-900">{webinar.time}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-mw-gray-600">
                    <div className="w-10 h-10 bg-mw-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-mw-gray-500">Duration</p>
                      <p className="font-medium text-mw-gray-900">{webinar.duration || '60 min'}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {isUpcoming ? (
                    <>
                      <a
                        href={webinar.registrationLink || '/contact'}
                        target={webinar.registrationLink ? '_blank' : undefined}
                        rel={webinar.registrationLink ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-xl transition-colors shadow-mw-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Register Now
                      </a>
                      <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-mw-gray-200 hover:border-mw-blue-600 text-mw-gray-700 hover:text-mw-blue-600 font-semibold rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Add to Calendar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => webinar.watchLink && setIsVideoModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-xl transition-colors shadow-mw-lg"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        Watch Recording
                      </button>
                      <Link
                        href="/webinars"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-mw-gray-200 hover:border-mw-blue-600 text-mw-gray-700 hover:text-mw-blue-600 font-semibold rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Browse All Webinars
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 rounded-2xl overflow-hidden shadow-2xl relative">
                  {webinar.featuredImage ? (
                    <img 
                      src={webinar.featuredImage} 
                      alt={webinar.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-24 h-24 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {!isUpcoming && webinar.watchLink && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <button 
                        onClick={() => setIsVideoModalOpen(true)}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                      >
                        <svg className="w-10 h-10 text-mw-blue-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-16 bg-white border-b border-mw-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-mw-gray-900 mb-8">
              {webinar.speakers && webinar.speakers.length > 1 ? 'Meet the Speakers' : 'About the Speaker'}
            </h2>
            
            {webinar.speakers && webinar.speakers.length > 0 ? (
              <div className={`grid gap-6 ${webinar.speakers.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
                {webinar.speakers.map((speaker, index) => (
                  <motion.div
                    key={speaker._key || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-mw-gray-50 rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      {speaker.image ? (
                        <img 
                          src={speaker.image} 
                          alt={speaker.name}
                          className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-mw-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-mw-blue-600">
                            {speaker.name?.charAt(0) || 'S'}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-mw-gray-900">{speaker.name}</h3>
                        <p className="text-mw-blue-600 font-medium">{speaker.role}</p>
                        {speaker.company && (
                          <p className="text-mw-gray-500 text-sm">{speaker.company}</p>
                        )}
                        {speaker.linkedin && (
                          <a 
                            href={speaker.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-mw-blue-600 hover:text-mw-blue-700 mt-2"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                    {speaker.bio && (
                      <p className="text-mw-gray-600 text-sm mt-4 leading-relaxed">{speaker.bio}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              // Fallback to legacy single speaker
              <div className="flex items-center gap-6 bg-mw-gray-50 rounded-2xl p-6">
                {webinar.speakerImage ? (
                  <img 
                    src={webinar.speakerImage} 
                    alt={webinar.speaker}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-mw-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-mw-blue-600">
                      {webinar.speaker?.charAt(0) || 'S'}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-mw-gray-900">{webinar.speaker || 'Speaker TBD'}</h3>
                  <p className="text-mw-gray-600">{webinar.speakerRole || 'Moving Walls'}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      {webinar.content && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-mw-gray-900 mb-8">What You&apos;ll Learn</h2>
              <div className="prose prose-lg max-w-none">
                <PortableText value={webinar.content} components={portableTextComponents} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Webinars */}
      {relatedWebinars.length > 0 && (
        <section className="py-16 bg-mw-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-mw-gray-900">More Webinars</h2>
                <Link 
                  href="/webinars"
                  className="text-mw-blue-600 hover:text-mw-blue-700 font-medium flex items-center gap-1"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedWebinars.map((related, index) => (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/webinars/${related.slug}`}
                      className="block bg-white rounded-xl overflow-hidden shadow-mw-sm hover:shadow-mw-lg transition-all duration-300 group"
                    >
                      <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 relative">
                        {related.featuredImage && (
                          <img 
                            src={related.featuredImage} 
                            alt={related.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                          related.webinarType === 'upcoming'
                            ? 'bg-mw-blue-100 text-mw-blue-700'
                            : 'bg-mw-gray-100 text-mw-gray-700'
                        }`}>
                          {related.webinarType === 'upcoming' ? 'Upcoming' : 'Past'}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-mw-gray-900 mb-2 group-hover:text-mw-blue-600 transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-mw-gray-600 mb-4 line-clamp-2">{related.description}</p>
                        <div className="flex items-center gap-2 text-sm text-mw-gray-500">
                          <span>{formatDate(related.date)}</span>
                          <span>•</span>
                          <span>{related.duration || '60 min'}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
              {isUpcoming ? 'Secure Your Spot Today' : 'Want to Learn More?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {isUpcoming 
                ? 'Register now and join our live session with industry experts.'
                : 'Explore our upcoming webinars and stay ahead of industry trends.'
              }
            </p>
            {isUpcoming ? (
              <a
                href={webinar.registrationLink || '/contact'}
                target={webinar.registrationLink ? '_blank' : undefined}
                rel={webinar.registrationLink ? 'noopener noreferrer' : undefined}
                className="inline-block px-8 py-4 bg-white text-mw-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-mw-lg"
              >
                Register for Free
              </a>
            ) : (
              <Link
                href="/webinars"
                className="inline-block px-8 py-4 bg-white text-mw-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-mw-lg"
              >
                Browse Upcoming Webinars
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && videoEmbedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-mw-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Video Container */}
              <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={videoEmbedUrl}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Webinar video"
                />
              </div>
              
              {/* Video Title */}
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-semibold">{webinar.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
