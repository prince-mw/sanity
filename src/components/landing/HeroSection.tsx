"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CTAButton } from "../CTAButton";
import { getHeightClasses, getAlignmentClasses, getButtonClasses, parseVideoUrl } from "./utils";

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  alignment?: 'left' | 'center' | 'right';
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  height?: 'full' | 'large' | 'medium' | 'small';
}

export function HeroSection({
  heading,
  subheading,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  alignment = 'center',
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  height = 'large',
}: HeroSectionProps) {
  const heightClasses = getHeightClasses(height);
  const alignClasses = getAlignmentClasses(alignment);
  
  const containerAlign = alignment === 'left' 
    ? 'items-start' 
    : alignment === 'right' 
      ? 'items-end' 
      : 'items-center';

  // Parse video URL for embed
  const videoInfo = backgroundVideo ? parseVideoUrl(backgroundVideo) : null;

  return (
    <section className={`relative flex items-center justify-center overflow-hidden ${heightClasses}`}>
      {/* Background Video or Image */}
      {backgroundVideo && videoInfo?.type === 'youtube' ? (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoInfo.id}?autoplay=1&mute=1&loop=1&playlist=${videoInfo.id}&controls=0&showinfo=0&rel=0&modestbranding=1`}
            className="absolute inset-0 w-full h-full object-cover scale-150"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : backgroundImage ? (
        <Image
          src={backgroundImage}
          alt={heading}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-mw-blue-600 to-mw-blue-900" />
      )}

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      {/* Content */}
      <div className={`relative z-10 container mx-auto px-4 py-20 flex flex-col ${containerAlign}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-4xl ${alignClasses}`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {heading}
          </h1>
          
          {subheading && (
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {subheading}
            </p>
          )}

          {/* CTA Buttons */}
          {(ctaText || secondaryCtaText) && (
            <div className={`flex flex-wrap gap-4 ${alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : ''}`}>
              {ctaText && ctaLink && (
                <CTAButton 
                  href={ctaLink}
                  className={getButtonClasses('primary', true)}
                >
                  {ctaText}
                </CTAButton>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <CTAButton 
                  href={secondaryCtaLink}
                  className={getButtonClasses('secondary', true)}
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
