"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, type BackgroundColor } from "./utils";

interface GalleryImage {
  _key: string;
  image?: string;
  caption?: string;
  alt?: string;
}

interface ImageGallerySectionProps {
  heading?: string;
  subheading?: string;
  images?: GalleryImage[];
  layout?: 'grid' | 'carousel' | 'masonry';
  columns?: 2 | 3 | 4;
  backgroundColor?: BackgroundColor;
}

export function ImageGallerySection({
  heading,
  subheading,
  images,
  layout = 'grid',
  columns = 3,
  backgroundColor = 'white',
}: ImageGallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const bgClasses = getBackgroundClasses(backgroundColor);
  const textColor = getTextColorClasses(backgroundColor);
  const subtextColor = getSubtextColorClasses(backgroundColor);

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
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

        {/* Gallery Grid */}
        {images && images.length > 0 && (
          <div className={`grid ${gridCols[columns]} gap-4`}>
            {images.map((img, index) => (
              <motion.div
                key={img._key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(img)}
              >
                {img.image && (
                  <>
                    <Image
                      src={img.image}
                      alt={img.alt || img.caption || 'Gallery image'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                    {/* Caption */}
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                        <p className="text-white text-sm">{img.caption}</p>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
              {selectedImage.image && (
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.alt || selectedImage.caption || 'Gallery image'}
                  fill
                  className="object-contain"
                />
              )}
              {selectedImage.caption && (
                <p className="absolute bottom-4 left-0 right-0 text-center text-white">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
