"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getBackgroundClasses, getButtonClasses, type BackgroundColor } from "./utils";
import { CTAButton } from "../CTAButton";

interface CTABannerSectionProps {
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  backgroundColor?: BackgroundColor;
}

export function CTABannerSection({
  heading,
  subheading,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  backgroundColor = 'blue',
}: CTABannerSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  const isDark = ['blue', 'dark', 'gradient'].includes(backgroundColor);

  return (
    <section className={`relative py-16 md:py-24 overflow-hidden ${!backgroundImage ? bgClasses : ''}`}>
      {/* Background Image */}
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-mw-blue-900/80" />
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {heading && (
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark || backgroundImage ? 'text-white' : 'text-gray-900'}`}>
              {heading}
            </h2>
          )}
          
          {subheading && (
            <p className={`text-lg mb-8 ${isDark || backgroundImage ? 'text-white/90' : 'text-gray-600'}`}>
              {subheading}
            </p>
          )}

          {/* CTA Buttons */}
          {(ctaText || secondaryCtaText) && (
            <div className="flex flex-wrap gap-4 justify-center">
              {ctaText && ctaLink && (
                <CTAButton 
                  href={ctaLink}
                  className={getButtonClasses('primary', isDark || !!backgroundImage)}
                >
                  {ctaText}
                </CTAButton>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <CTAButton 
                  href={secondaryCtaLink}
                  forceNavigate
                  className={getButtonClasses('secondary', isDark || !!backgroundImage)}
                >
                  {secondaryCtaText}
                </CTAButton>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
