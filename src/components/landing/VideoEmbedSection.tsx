"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, parseVideoUrl, type BackgroundColor } from "./utils";

interface VideoEmbedSectionProps {
  heading?: string;
  subheading?: string;
  videoUrl: string;
  thumbnail?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16';
  autoplay?: boolean;
  backgroundColor?: BackgroundColor;
}

export function VideoEmbedSection({
  heading,
  subheading,
  videoUrl,
  thumbnail,
  aspectRatio = '16:9',
  autoplay = false,
  backgroundColor = 'white',
}: VideoEmbedSectionProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const bgClasses = getBackgroundClasses(backgroundColor);
  const textColor = getTextColorClasses(backgroundColor);
  const subtextColor = getSubtextColorClasses(backgroundColor);

  const videoInfo = parseVideoUrl(videoUrl);

  const aspectRatioClasses: Record<string, string> = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]',
  };

  const getEmbedUrl = () => {
    if (videoInfo.type === 'youtube' && videoInfo.id) {
      return `https://www.youtube.com/embed/${videoInfo.id}?autoplay=1&rel=0`;
    }
    if (videoInfo.type === 'vimeo' && videoInfo.id) {
      return `https://player.vimeo.com/video/${videoInfo.id}?autoplay=1`;
    }
    return videoUrl;
  };

  const getThumbnailUrl = () => {
    if (thumbnail) return thumbnail;
    if (videoInfo.type === 'youtube' && videoInfo.id) {
      return `https://img.youtube.com/vi/${videoInfo.id}/maxresdefault.jpg`;
    }
    return null;
  };

  return (
    <section className={`py-16 md:py-24 ${bgClasses}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(heading || subheading) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            {heading && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={`text-lg ${subtextColor}`}>
                {subheading}
              </p>
            )}
          </motion.div>
        )}

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className={`relative ${aspectRatioClasses[aspectRatio]} rounded-2xl overflow-hidden shadow-2xl bg-gray-900`}>
            {isPlaying ? (
              <iframe
                src={getEmbedUrl()}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full group"
              >
                {/* Thumbnail */}
                {getThumbnailUrl() && (
                  <Image
                    src={getThumbnailUrl()!}
                    alt={heading || 'Video thumbnail'}
                    fill
                    className="object-cover"
                  />
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                    <svg className="w-8 h-8 text-mw-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
