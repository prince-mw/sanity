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
