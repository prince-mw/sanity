"use client";

import { motion, PanInfo } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

// Define testimonial type
interface Testimonial {
  _id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric?: string;
  industry?: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  companyLogo?: {
    asset: {
      _ref: string;
    };
  };
}

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
}

// Fallback testimonials data when Sanity data is not available
const fallbackTestimonials: Testimonial[] = [
  {
    quote: "By customising Moving Walls' platform, Jeki adds new services using its transport advertising expertise. We aim to build one of Japan's largest marketplaces with nationwide, diverse OOH inventory.",
    author: "Ryoji Akaishi",
    role: "President and Representative Director",
    company: "jeki",
    metric: "Japan's Largest OOH Marketplace",
    industry: "Transport Advertising"
  },
  {
    quote: "This partnership provides us with cutting-edge audience measurement solutions that bring unprecedented insights to our advertising campaigns.",
    author: "Saad Bencharef",
    role: "Director of Data and Digital Transformation",
    company: "FC Media",
    metric: "Cutting-edge Measurement",
    industry: "Media"
  },
  {
    quote: "Brand investments grow when advertisers have clarity on ad placements and performance. This partnership strengthens our DOOH planning and expands measurement capabilities for our clients.",
    author: "Yasmin Mallari",
    role: "Chief Investment Officer",
    company: "GroupM, Philippines",
    metric: "Enhanced DOOH Planning",
    industry: "Agency"
  }
];

// Custom hook to detect screen size
function useResponsiveItemsPerView() {
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet: 2 cards
      } else {
        setItemsPerView(3); // Desktop: 3 cards
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  return itemsPerView;
}

export default function TestimonialSection({ testimonials: sanityTestimonials }: TestimonialSectionProps) {
  const { t } = useLocale();
  
  // Use Sanity testimonials if provided, otherwise fall back to hardcoded data
  const testimonials: Testimonial[] = sanityTestimonials && sanityTestimonials.length > 0 
    ? sanityTestimonials 
    : fallbackTestimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const itemsPerView = useResponsiveItemsPerView();
  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  // Reset currentIndex when itemsPerView changes to prevent out-of-bounds
  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(0);
    }
  }, [itemsPerView, totalSlides, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle swipe gestures for mobile
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Get visible testimonials for current slide
  const getVisibleTestimonials = () => {
    const start = currentIndex * itemsPerView;
    return testimonials.slice(start, start + itemsPerView);
  };

  // Get author initials
  const getInitials = (name: string) => {
    return name.split(' ').map((n: string) => n[0]).join('');
  };

  // Dynamic grid columns based on items per view
  const getGridCols = () => {
    if (itemsPerView === 1) return 'grid-cols-1';
    if (itemsPerView === 2) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-mw-blue-600 text-sm font-medium uppercase tracking-wider">
            {t('landingPage.testimonials.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mt-4 mb-6">
            {t('landingPage.testimonials.title')} <span className="text-mw-blue-600">{t('landingPage.testimonials.titleHighlight')}</span>
          </h2>
          <p className="text-mw-gray-600 max-w-2xl mx-auto text-lg">
            {t('landingPage.testimonials.description')}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows - hidden on mobile, visible on md+ */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg items-center justify-center text-mw-gray-600 hover:text-mw-blue-600 hover:shadow-xl transition-all duration-300"
            aria-label="Previous testimonials"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg items-center justify-center text-mw-gray-600 hover:text-mw-blue-600 hover:shadow-xl transition-all duration-300"
            aria-label="Next testimonials"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container with Swipe Support */}
          <div className="overflow-hidden px-1">
            <motion.div
              key={`${currentIndex}-${itemsPerView}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              drag={itemsPerView === 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className={`grid ${getGridCols()} gap-6 md:gap-8 cursor-grab active:cursor-grabbing md:cursor-default`}
            >
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={testimonial._id || `${currentIndex}-${testimonial.author}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-mw-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-mw-gray-200 hover:border-mw-blue-300 flex flex-col group"
                >
                  {/* Quote Icon */}
                  <svg className="w-10 h-10 text-mw-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  {/* Quote */}
                  <p className="text-mw-gray-700 mb-6 flex-grow leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-mw-gray-200">
                    {testimonial.image?.asset ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                        <Image
                          src={urlFor(testimonial.image).width(96).height(96).url()}
                          alt={testimonial.author}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-mw-blue-600 to-mw-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {getInitials(testimonial.author)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-mw-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-mw-gray-600">{testimonial.role}</div>
                      <div className="text-xs text-mw-blue-600 font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden justify-center items-center gap-2 mt-6 text-mw-gray-500 text-sm">
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span>Swipe to navigate</span>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-6 md:mt-10">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="p-3 -m-3 flex items-center justify-center"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={`block transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? "w-8 h-3 bg-mw-blue-600"
                      : "w-3 h-3 bg-mw-gray-300 hover:bg-mw-blue-400"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="h-1 bg-mw-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-mw-blue-600"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity,
                }}
                key={`progress-${currentIndex}-${itemsPerView}`}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a 
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mw-blue-600 text-white font-semibold rounded-lg hover:bg-mw-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Success Stories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
