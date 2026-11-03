"use client";

import { motion } from "framer-motion";
import { getBackgroundClasses, getAlignmentClasses, getMaxWidthClasses, getTextColorClasses, type BackgroundColor, type Alignment, type MaxWidth } from "./utils";
import SanityPortableText from "@/components/SanityPortableText";

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
    <section className={`${bgClasses} mw-section`}>
      <div className="mw-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`${widthClasses} ${alignClasses}`}
        >
          {heading && (
            <h2 className={`font-bold mb-6 ${textColor} text-3xl lg:text-4xl`}>
              {heading}
            </h2>
          )}
          
          {content && (
            <div className={`prose prose-lg mw-measure ${alignment === 'center' ? 'mx-auto' : ''} ${backgroundColor === 'dark' || backgroundColor === 'blue' ? 'prose-invert' : ''}`}>
              <SanityPortableText value={content} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
