'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export interface Testimonial {
  quote: string
  author: string
  role?: string
  company?: string
  avatar?: string
  metric?: string
}

export interface ProductTestimonialsSectionProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
}

export default function ProductTestimonialsSection({
  title = 'What Our Customers Say',
  subtitle,
  testimonials,
}: ProductTestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!testimonials || testimonials.length === 0) return null

  // Single testimonial - featured style
  if (testimonials.length === 1) {
    const testimonial = testimonials[0]
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <svg className="w-12 h-12 text-blue-500 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-2xl sm:text-3xl text-gray-900 font-medium leading-relaxed mb-8">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4">
              {testimonial.avatar ? (
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.author.charAt(0)}
                </div>
              )}
              <div className="text-left">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                {(testimonial.role || testimonial.company) && (
                  <p className="text-gray-600 text-sm">
                    {testimonial.role}{testimonial.role && testimonial.company && ' at '}{testimonial.company}
                  </p>
                )}
              </div>
            </div>
            {testimonial.metric && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {testimonial.metric}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  // Multiple testimonials - carousel/grid style
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm text-blue-300 rounded-full text-sm font-medium border border-white/20 mb-4">
            Customer Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Testimonials Grid */}
        {testimonials.length <= 3 ? (
          <div className={`grid ${testimonials.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        ) : (
          /* Carousel for more than 3 */
          <div>
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8"
                animate={{ x: `-${activeIndex * (100 / 3)}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full md:w-1/3 flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} index={index} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index * 3)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(activeIndex / 3) === index
                      ? 'bg-blue-500 w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full flex flex-col"
    >
      {/* Quote Icon */}
      <svg className="w-10 h-10 text-blue-500/50 mb-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Quote */}
      <p className="text-gray-300 text-lg leading-relaxed mb-6 flex-grow">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Metric Badge */}
      {testimonial.metric && (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-6 w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          {testimonial.metric}
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-white/10">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt={testimonial.author}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
            {testimonial.author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-white">{testimonial.author}</p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-gray-400 text-sm">
              {testimonial.role}{testimonial.role && testimonial.company && ' at '}{testimonial.company}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
