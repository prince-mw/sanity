"use client";

import { motion } from "framer-motion";
import { getBackgroundClasses, getAlignmentClasses, getMaxWidthClasses, getTextColorClasses, type BackgroundColor, type Alignment, type MaxWidth } from "./utils";
import { PortableText } from "@portabletext/react";

interface TextBlockSectionProps {
  heading?: string;
  content?: any;
  alignment?: Alignment;
  maxWidth?: MaxWidth;
  backgroundColor?: BackgroundColor;
}

export function TextBlockSection({
  heading,
  content,
  alignment = 'left',
  maxWidth = 'medium',
  backgroundColor = 'white',
}: TextBlockSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  const alignClasses = getAlignmentClasses(alignment);
  const widthClasses = getMaxWidthClasses(maxWidth);
  const textColor = getTextColorClasses(backgroundColor);

  return (
    <section className={`py-16 md:py-24 ${bgClasses}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`${widthClasses} ${alignClasses}`}
        >
          {heading && (
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textColor}`}>
              {heading}
            </h2>
          )}
          
          {content && (
            <div className={`prose prose-lg max-w-none ${backgroundColor === 'dark' || backgroundColor === 'blue' ? 'prose-invert' : ''}`}>
              <PortableText value={content} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
