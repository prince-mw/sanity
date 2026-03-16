"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getBackgroundClasses, getButtonClasses, type BackgroundColor } from "./utils";
import { PortableText } from "@portabletext/react";

interface TwoColumnSectionProps {
  heading?: string;
  content?: any;
  image?: string;
  imagePosition?: 'left' | 'right';
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: BackgroundColor;
}

export function TwoColumnSection({
  heading,
  content,
  image,
  imagePosition = 'right',
  ctaText,
  ctaLink,
  backgroundColor = 'white',
}: TwoColumnSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  const isDark = backgroundColor === 'dark' || backgroundColor === 'blue' || backgroundColor === 'gradient';

  return (
    <section className={`py-16 md:py-24 ${bgClasses}`}>
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${imagePosition === 'left' ? 'md:grid-flow-dense' : ''}`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === 'left' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={imagePosition === 'left' ? 'md:col-start-2' : ''}
          >
            {heading && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {heading}
              </h2>
            )}
            
            {content && (
              <div className={`prose prose-lg max-w-none mb-8 ${isDark ? 'prose-invert' : ''}`}>
                <PortableText value={content} />
              </div>
            )}

            {ctaText && ctaLink && (
              <Link href={ctaLink} className={getButtonClasses('primary', isDark)}>
                {ctaText}
              </Link>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === 'left' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={imagePosition === 'left' ? 'md:col-start-1 md:row-start-1' : ''}
          >
            {image && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={image}
                  alt={heading || 'Section image'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
