"use client";

import { PortableText, PortableTextComponents, PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";

// Custom components for Portable Text rendering
const components: PortableTextComponents = {
  // Block styles (headings, paragraphs, etc.)
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-mw-gray-900 mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-mw-gray-900 mt-10 mb-5 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-mw-gray-900 mt-6 mb-3 first:mt-0">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-mw-gray-700 leading-relaxed mb-6 last:mb-0">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-mw-blue-500 bg-mw-blue-50 py-4 px-6 rounded-r-lg my-6 italic text-mw-gray-700">
        {children}
      </blockquote>
    ),
  },

  // List styles
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-6 text-mw-gray-700 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-6 text-mw-gray-700 ml-4">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-mw-gray-700 leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-mw-gray-700 leading-relaxed">{children}</li>
    ),
  },

  // Inline marks (bold, italic, links, etc.)
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-mw-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-mw-gray-100 text-mw-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    underline: ({ children }) => (
      <span className="underline">{children}</span>
    ),
    "strike-through": ({ children }) => (
      <span className="line-through">{children}</span>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mw-blue-600 hover:text-mw-blue-700 underline transition-colors"
          >
            {children}
          </a>
        );
      }
      
      return (
        <Link href={href} className="text-mw-blue-600 hover:text-mw-blue-700 underline transition-colors">
          {children}
        </Link>
      );
    },
  },

  // Custom types (images, code blocks, etc.)
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      
      const imageUrl = urlFor(value).width(1200).quality(90).url();
      const alt = value.alt || "Blog image";
      
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-mw-gray-100">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-mw-gray-500 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      return (
        <pre className="bg-mw-gray-900 text-mw-gray-100 rounded-xl p-6 overflow-x-auto my-6">
          <code className="text-sm font-mono">
            {value.code}
          </code>
        </pre>
      );
    },
    codeBlock: ({ value }) => {
      return (
        <pre className="bg-mw-gray-900 text-mw-gray-100 rounded-xl p-6 overflow-x-auto my-6">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-mw-gray-700">
            <span className="text-xs text-mw-gray-400 uppercase tracking-wider">
              {value.language || 'code'}
            </span>
          </div>
          <code className="text-sm font-mono">
            {value.code}
          </code>
        </pre>
      );
    },
    // Video embed
    video: ({ value }) => {
      if (!value?.url) return null;
      
      // Extract video ID for YouTube/Vimeo
      const getVideoEmbed = (url: string) => {
        const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/);
        const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        
        if (youtubeMatch) {
          return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
        }
        if (vimeoMatch) {
          return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        }
        return null;
      };

      const embedUrl = getVideoEmbed(value.url);
      
      if (!embedUrl) return null;

      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-mw-gray-100">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-mw-gray-500 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    // Callout block
    callout: ({ value }) => {
      const typeStyles: Record<string, { bg: string; border: string; icon: string; title: string }> = {
        info: { bg: 'bg-blue-50', border: 'border-blue-400', icon: '💡', title: 'Info' },
        warning: { bg: 'bg-amber-50', border: 'border-amber-400', icon: '⚠️', title: 'Warning' },
        success: { bg: 'bg-green-50', border: 'border-green-400', icon: '✅', title: 'Success' },
        error: { bg: 'bg-red-50', border: 'border-red-400', icon: '❌', title: 'Error' },
        tip: { bg: 'bg-purple-50', border: 'border-purple-400', icon: '💬', title: 'Tip' },
        note: { bg: 'bg-gray-50', border: 'border-gray-400', icon: '📝', title: 'Note' },
      };
      
      const style = typeStyles[value.type] || typeStyles.info;
      
      return (
        <div className={`my-6 p-4 ${style.bg} border-l-4 ${style.border} rounded-r-lg`}>
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">{style.icon}</span>
            <div className="flex-1">
              {value.title && (
                <h4 className="font-semibold text-mw-gray-900 mb-2">{value.title}</h4>
              )}
              <p className="text-mw-gray-700 leading-relaxed">{value.content}</p>
            </div>
          </div>
        </div>
      );
    },
    // Statistics block
    statBlock: ({ value }) => {
      const themeStyles: Record<string, { bg: string; text: string; label: string }> = {
        light: { bg: 'bg-white border border-mw-gray-200', text: 'text-mw-blue-600', label: 'text-mw-gray-600' },
        dark: { bg: 'bg-mw-gray-900', text: 'text-white', label: 'text-mw-gray-300' },
        blue: { bg: 'bg-mw-blue-600', text: 'text-white', label: 'text-mw-blue-100' },
      };
      
      const style = themeStyles[value.theme] || themeStyles.light;
      const layoutClass = value.layout === 'row' ? 'flex flex-wrap justify-center gap-8' : 'grid grid-cols-2 gap-4';
      
      return (
        <div className={`my-8 p-6 ${style.bg} rounded-xl`}>
          <div className={layoutClass}>
            {value.stats?.map((stat: { value: string; label: string; description?: string }, index: number) => (
              <div key={index} className={value.layout === 'cards' ? 'bg-white/10 rounded-lg p-4 text-center' : 'text-center'}>
                <div className={`text-3xl md:text-4xl font-bold ${style.text} mb-2`}>{stat.value}</div>
                <div className={`text-sm font-medium ${style.label}`}>{stat.label}</div>
                {stat.description && (
                  <div className={`text-xs mt-1 ${style.label} opacity-80`}>{stat.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    },
    // CTA Button
    ctaButton: ({ value }) => {
      const styleClasses: Record<string, string> = {
        primary: 'bg-mw-blue-600 hover:bg-mw-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors',
        secondary: 'border-2 border-mw-blue-600 text-mw-blue-600 hover:bg-mw-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors',
        dark: 'bg-mw-gray-900 hover:bg-mw-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors',
        link: 'text-mw-blue-600 hover:text-mw-blue-700 font-semibold inline-flex items-center gap-2 transition-colors',
      };
      
      const alignmentClass: Record<string, string> = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
      };
      
      const buttonStyle = styleClasses[value.style] || styleClasses.primary;
      const alignment = alignmentClass[value.alignment] || alignmentClass.left;
      
      const ButtonContent = () => (
        <>
          {value.text}
          {value.style === 'link' && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </>
      );
      
      const isExternal = value.url?.startsWith('http');
      
      return (
        <div className={`my-6 flex ${alignment}`}>
          {isExternal ? (
            <a
              href={value.url}
              className={buttonStyle}
              target={value.openInNewTab ? '_blank' : undefined}
              rel={value.openInNewTab ? 'noopener noreferrer' : undefined}
            >
              <ButtonContent />
            </a>
          ) : (
            <Link href={value.url || '#'} className={buttonStyle}>
              <ButtonContent />
            </Link>
          )}
        </div>
      );
    },
    // Table block
    tableBlock: ({ value }) => {
      return (
        <div className="my-8 overflow-x-auto">
          {value.caption && (
            <div className="text-sm text-mw-gray-600 mb-2 font-medium">{value.caption}</div>
          )}
          <table className={`w-full ${value.bordered ? 'border border-mw-gray-200' : ''}`}>
            <thead>
              <tr className="bg-mw-gray-100">
                {value.headers?.map((header: string, index: number) => (
                  <th
                    key={index}
                    className={`px-4 py-3 text-left text-sm font-semibold text-mw-gray-900 ${
                      value.bordered ? 'border border-mw-gray-200' : ''
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.rows?.map((row: { cells: string[] }, rowIndex: number) => (
                <tr
                  key={rowIndex}
                  className={value.striped && rowIndex % 2 === 1 ? 'bg-mw-gray-50' : ''}
                >
                  {row.cells?.map((cell: string, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      className={`px-4 py-3 text-sm text-mw-gray-700 ${
                        value.bordered ? 'border border-mw-gray-200' : ''
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    // Testimonial block
    testimonialBlock: ({ value }) => {
      return (
        <div className="my-8 bg-mw-gray-50 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {value.avatar?.asset && (
              <div className="flex-shrink-0">
                <Image
                  src={urlFor(value.avatar).width(80).height(80).url()}
                  alt={value.author}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
            )}
            <div className="flex-1">
              {value.rating && (
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < value.rating ? 'text-yellow-400' : 'text-mw-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              <blockquote className="text-lg text-mw-gray-700 italic mb-4">
                "{value.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold text-mw-gray-900">{value.author}</div>
                  {(value.role || value.company) && (
                    <div className="text-sm text-mw-gray-600">
                      {value.role}{value.role && value.company && ' at '}{value.company}
                    </div>
                  )}
                </div>
                {value.companyLogo?.asset && (
                  <Image
                    src={urlFor(value.companyLogo).width(100).height(40).url()}
                    alt={value.company || 'Company logo'}
                    width={100}
                    height={40}
                    className="object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    },
    // Accordion/FAQ block
    accordionBlock: ({ value }) => {
      return (
        <div className="my-8">
          {value.title && (
            <h3 className="text-xl font-bold text-mw-gray-900 mb-4">{value.title}</h3>
          )}
          <div className="space-y-3">
            {value.items?.map((item: { question: string; answer: string }, index: number) => (
              <details
                key={index}
                className="group bg-white border border-mw-gray-200 rounded-lg overflow-hidden"
              >
                <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-mw-gray-50 transition-colors">
                  <span className="font-medium text-mw-gray-900">{item.question}</span>
                  <svg
                    className="w-5 h-5 text-mw-gray-500 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-mw-gray-700">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      );
    },
  },
};

// Component props interface
interface SanityPortableTextProps {
  value: PortableTextBlock[] | null | undefined;
  className?: string;
}

// Main component export
export default function SanityPortableText({ value, className = "" }: SanityPortableTextProps) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div className={`portable-text ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}

// Export components for customization
export { components };
