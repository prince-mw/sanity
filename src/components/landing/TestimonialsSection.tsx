"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, type BackgroundColor } from "./utils";

interface Testimonial {
  _key: string;
  quote?: string;
  name?: string;
  role?: string;
  company?: string;
  image?: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  heading?: string;
  subheading?: string;
  layout?: 'carousel' | 'grid' | 'single';
  items?: Testimonial[];
  backgroundColor?: BackgroundColor;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isDark }: { testimonial: Testimonial; isDark: boolean }) {
  return (
    <div className={`p-8 rounded-2xl ${isDark ? 'bg-white/10' : 'bg-white'} shadow-lg h-full flex flex-col`}>
      {testimonial.rating && (
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>
      )}
      
      {testimonial.quote && (
        <blockquote className={`text-lg mb-6 flex-grow ${isDark ? 'text-white/90' : 'text-gray-700'}`}>
          &quot;{testimonial.quote}&quot;
        </blockquote>
      )}
      
      <div className="flex items-center gap-4">
        {testimonial.image && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={testimonial.image}
              alt={testimonial.name || 'Testimonial author'}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          {testimonial.name && (
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {testimonial.name}
            </p>
          )}
          {(testimonial.role || testimonial.company) && (
            <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
              {testimonial.role}{testimonial.role && testimonial.company && ', '}{testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection({
  heading,
  subheading,
  layout = 'carousel',
  items,
  backgroundColor = 'gray',
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const bgClasses = getBackgroundClasses(backgroundColor);
  const textColor = getTextColorClasses(backgroundColor);
  const subtextColor = getSubtextColorClasses(backgroundColor);
  const isDark = backgroundColor === 'dark' || backgroundColor === 'blue' || backgroundColor === 'gradient';

  if (!items || items.length === 0) return null;

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

        {/* Single Layout */}
        {layout === 'single' && (
          <div className="max-w-3xl mx-auto">
            <TestimonialCard testimonial={items[0]} isDark={isDark} />
          </div>
        )}

        {/* Grid Layout */}
        {layout === 'grid' && (
          <div className={`grid md:grid-cols-2 ${items.length >= 3 ? 'lg:grid-cols-3' : ''} gap-8`}>
            {items.map((testimonial, index) => (
              <motion.div
                key={testimonial._key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} isDark={isDark} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Carousel Layout */}
        {layout === 'carousel' && (
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TestimonialCard testimonial={items[activeIndex]} isDark={isDark} />
            </motion.div>
            
            {/* Carousel Navigation */}
            {items.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeIndex 
                        ? (isDark ? 'bg-white' : 'bg-mw-blue-600')
                        : (isDark ? 'bg-white/30' : 'bg-gray-300')
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
