"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, type BackgroundColor } from "./utils";

const ebookCategoryLabels: Record<string, string> = {
  guide: 'Guide',
  whitepaper: 'Whitepaper',
  playbook: 'Playbook',
  'market-report': 'Market Report',
  'case-study': 'Case Study',
};

function formatEbookCategory(category?: string): string {
  return ebookCategoryLabels[category || ''] || 'Guide';
}

const ChartIcon = (
  <svg className="w-6 h-6 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V9m5 8V5m5 12v-4M4 21h16" />
  </svg>
);

const DeviceIcon = (
  <svg className="w-6 h-6 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

interface SuccessStoryRef {
  title?: string
  slug?: string
  category?: string
  excerpt?: string
}

interface SuccessStoryItem {
  _key: string
  contentType?: 'caseStudy' | 'ebook'
  description?: string
  buttonText?: string
  caseStudy?: SuccessStoryRef
  ebook?: SuccessStoryRef
}

interface SuccessStoriesSectionProps {
  sectionHeading?: string
  sectionSubheading?: string
  stories?: SuccessStoryItem[]
  backgroundColor?: BackgroundColor
}

export function SuccessStoriesSection({ sectionHeading, sectionSubheading, stories, backgroundColor = 'gray' }: SuccessStoriesSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  const textColor = getTextColorClasses(backgroundColor);
  const subtextColor = getSubtextColorClasses(backgroundColor);

  const items = (stories || [])
    .map((story) => {
      const isEbook = story.contentType === 'ebook';
      const ref = isEbook ? story.ebook : story.caseStudy;
      if (!ref?.slug) return null;
      return {
        key: story._key,
        type: story.contentType,
        label: isEbook ? formatEbookCategory(ref.category) : 'Case Study',
        title: ref.title || '',
        description: story.description || ref.excerpt || '',
        buttonText: story.buttonText || (isEbook ? 'Download Ebook' : 'View Case Study'),
        href: isEbook ? `/ebooks/${ref.slug}` : `/case-studies/${ref.slug}`,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  const gridClasses =
    items.length === 1
      ? 'grid-cols-1 max-w-md mx-auto'
      : items.length === 2
        ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className={`py-16 md:py-20 ${bgClasses}`}>
      <div className="container mx-auto px-4">
        {(sectionHeading || sectionSubheading) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            {sectionHeading && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{sectionHeading}</h2>
            )}
            {sectionSubheading && (
              <p className={`text-lg ${subtextColor}`}>{sectionSubheading}</p>
            )}
          </motion.div>
        )}

        <div className={`grid gap-8 ${gridClasses}`}>
          {items.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-mw-blue-50 flex items-center justify-center mb-4">
                {item.type === 'ebook' ? DeviceIcon : ChartIcon}
              </div>
              <div className="text-sm font-semibold text-mw-blue-600 mb-2">{item.label}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              {item.description && <p className="text-gray-600 mb-6 flex-1">{item.description}</p>}
              <Link
                href={item.href}
                className="inline-flex items-center justify-center gap-2 bg-mw-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-700 transition-colors self-start"
              >
                {item.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
