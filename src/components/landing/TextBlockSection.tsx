"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { getBackgroundClasses, getTextColorClasses, type BackgroundColor, type Alignment, type MaxWidth } from "./utils";
import SanityPortableText from "@/components/SanityPortableText";
import { useSectionGraphics } from "./SectionGraphic";
import { TIER_CLASSES, textChars, widthTier } from "./measure";

interface TextBlockSectionProps {
  heading?: string;
  content?: any;
  alignment?: Alignment;
  /** Kept for the CMS schema; the width now comes from the text itself (see measure.ts). */
  maxWidth?: MaxWidth;
  backgroundColor?: BackgroundColor;
}

export function TextBlockSection({
  heading,
  content,
  alignment = 'left',
  backgroundColor = 'white',
}: TextBlockSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  const textColor = getTextColorClasses(backgroundColor);
  const slots = useSectionGraphics(heading);
  const tier = widthTier(textChars(content) + (heading?.length ?? 0));
  const { box, prose } = TIER_CLASSES[tier];
  const invert = backgroundColor === 'dark' || backgroundColor === 'blue' ? 'prose-invert' : '';
  // Only a short, CTA-like block may centre its lines; longer text reads left-aligned.
  const centreText = tier === 'short' && alignment === 'center';

  // Split the text where each graphic slots in.
  const blocks: any[] = Array.isArray(content) ? content : [];
  const cuts = [...new Set(slots.map(s => Math.min(s.after, blocks.length)))].sort((a, b) => a - b);
  const chunks = Array.isArray(content)
    ? [0, ...cuts].map((from, i) => ({ from, to: cuts[i] ?? blocks.length }))
    : [];

  return (
    <section className={`${bgClasses} mw-section`}>
      <div className="mw-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mx-auto ${box}`}
        >
          {heading && (
            <h2 className={`font-bold mb-8 text-center ${textColor} text-3xl lg:text-4xl`}>{heading}</h2>
          )}
          {Array.isArray(content) ? (
            chunks.map(({ from, to }, i) => (
              <Fragment key={from}>
                {to > from && (
                  <div className={`prose ${prose} max-w-none ${centreText ? 'text-center' : ''} ${invert}`}>
                    <SanityPortableText value={blocks.slice(from, to)} />
                  </div>
                )}
                {(i < cuts.length ? slots.filter(s => Math.min(s.after, blocks.length) === cuts[i]) : []).map((s, k) => (
                  <div key={k} className="my-14 xl:-mx-24">{s.node}</div>
                ))}
              </Fragment>
            ))
          ) : (
            content && (
              <div className={`prose ${prose} max-w-none ${centreText ? 'text-center' : ''} ${invert}`}>
                <SanityPortableText value={content} />
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
