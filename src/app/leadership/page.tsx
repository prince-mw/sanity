"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-mw-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [15, -15, 15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mw-blue-600/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mw-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mw-blue-400"></span>
              </span>
              <span className="text-mw-blue-200 text-sm font-medium tracking-wide">Under Construction</span>
            </div>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-mw-blue-500 to-purple-600 shadow-2xl shadow-mw-blue-500/25">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Leadership
            <span className="block bg-gradient-to-r from-mw-blue-300 via-mw-blue-400 to-purple-400 bg-clip-text text-transparent">
              Coming Soon
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-lg sm:text-xl text-mw-blue-200/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We are preparing something special. Meet the visionaries behind Moving Walls — 
            the team driving innovation in outdoor advertising technology across the globe.
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-mw-blue-400/50" />
            <div className="w-2 h-2 rounded-full bg-mw-blue-400/60" />
            <div className="w-3 h-3 rounded-full bg-mw-blue-400" />
            <div className="w-2 h-2 rounded-full bg-mw-blue-400/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-mw-blue-400/50" />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/our-story"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-mw-gray-50 text-mw-blue-700 font-semibold rounded-xl transition-all shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/15"
            >
              Explore Our Story
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}