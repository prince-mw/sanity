"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Sustainability() {
  return (
    <section className="relative h-[150px] overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">
      {/* Subtle animated hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const leftPosition = (i / 12) * 100;
          const size = 0.4 + (i % 3) * 0.15;
          const duration = 15 + (i % 4) * 3;
          const delay = (i / 12) * 8;
          
          return (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-white/20"
              style={{ left: `${leftPosition}%` }}
              initial={{ y: "-10%", scale: size, opacity: 0 }}
              animate={{ 
                y: ["-10%", "110%"],
                opacity: [0, 0.4, 0.4, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
                opacity: { times: [0, 0.1, 0.9, 1] }
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 text-center sm:text-left"
        >
          {/* Heart Icon */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex-shrink-0"
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Moving Hearts
          </h2>

          {/* Divider */}
          <span className="hidden sm:block w-px h-8 bg-white/30" />

          {/* Stats */}
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-xl sm:text-2xl font-semibold">3M+</span>
            <span className="text-sm sm:text-base">Hearts Touched</span>
          </div>

          {/* Divider */}
          <span className="hidden md:block w-px h-8 bg-white/30" />

          {/* Tagline */}
          <p className="hidden md:block text-white/80 text-sm max-w-xs">
            Responsible OOH Media Worldwide
          </p>

          {/* CTA Button */}
          <Link
            href="/movinghearts"
            className="ml-0 sm:ml-4 px-6 py-2.5 bg-white text-rose-600 font-semibold rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
          >
            Learn More
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
