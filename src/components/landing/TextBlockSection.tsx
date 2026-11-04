"use client";

import { motion } from "framer-motion";
import { getBackgroundClasses, getAlignmentClasses, getMaxWidthClasses, getTextColorClasses, type BackgroundColor, type Alignment, type MaxWidth } from "./utils";
import SanityPortableText from "@/components/SanityPortableText";
import { useSectionGraphic } from "./SectionGraphic";

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
  const graphic = useSectionGraphic(heading);

  return (
    <section className={`${bgClasses} mw-section`}>
      <div className="mw-container">
        {graphic ? (
          // One centred column; the graphic sits after the first paragraph so a
          // long text never leaves an empty column beside it.
          <div className="mx-auto max-w-3xl">
            {heading && <h2 className={`font-bold mb-8 text-center ${textColor} text-3xl lg:text-4xl`}>{heading}</h2>}
            {content && (
              <div className={`prose prose-lg max-w-none ${backgroundColor === 'dark' || backgroundColor === 'blue' ? 'prose-invert' : ''}`}>
                <SanityPortableText value={Array.isArray(content) ? content.slice(0, 1) : content} />
              </div>
            )}
            <div className="my-12 md:-mx-16 lg:-mx-24">{graphic}</div>
            {Array.isArray(content) && content.length > 1 && (
              <div className={`prose prose-lg max-w-none ${backgroundColor === 'dark' || backgroundColor === 'blue' ? 'prose-invert' : ''}`}>
                <SanityPortableText value={content.slice(1)} />
              </div>
            )}
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
