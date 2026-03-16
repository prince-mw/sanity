"use client";

import { motion } from "framer-motion";
import { getBackgroundClasses, getMaxWidthClasses, type BackgroundColor, type MaxWidth } from "./utils";

interface CustomEmbedSectionProps {
  title?: string;
  code?: string;
  maxWidth?: MaxWidth;
  backgroundColor?: BackgroundColor;
}

export function CustomEmbedSection({
  title,
  code,
  maxWidth = 'medium',
  backgroundColor = 'transparent',
}: CustomEmbedSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  const widthClasses = getMaxWidthClasses(maxWidth);

  if (!code) return null;

  return (
    <section className={`py-8 md:py-12 ${bgClasses}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`${widthClasses} mx-auto`}
        >
          <div 
            className="custom-embed"
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </motion.div>
      </div>

      {/* Styles for common embeds */}
      <style jsx global>{`
        .custom-embed iframe {
          max-width: 100%;
          border-radius: 0.5rem;
        }
        .custom-embed img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </section>
  );
}
