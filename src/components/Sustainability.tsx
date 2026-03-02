"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Starting count for hearts
const STARTING_COUNT = 3000000;

export default function Sustainability() {
  const [heartCount, setHeartCount] = useState(STARTING_COUNT);
  const [videoError, setVideoError] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startAnimation) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [startAnimation]);

  // Increment counter every 3 seconds when in view
  useEffect(() => {
    if (!startAnimation) return;

    const interval = setInterval(() => {
      setHeartCount(prev => prev + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [startAnimation]);

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section ref={sectionRef} className="relative py-12 overflow-hidden">
      {/* Background Video with fallback */}
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src="/assets/videos/Sustainability.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-950" />
      )}

      {/* Theme Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-mw-blue-900/40 to-mw-blue-800/40" />

      {/* Animated Falling Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(35)].map((_, i) => {
          const leftPosition = (i / 35) * 100;
          const size = 0.5 + (i % 4) * 0.2;
          const duration = 20 + (i % 6) * 4; // Much slower: 20-44 seconds
          const delay = (i / 35) * 12;
          
          // Alternate between white transparent and neon cyan transparent
          const isWhite = i % 2 === 0;
          const colorClass = isWhite ? 'text-white/40' : 'text-cyan-400/50';
          const glowClass = isWhite 
            ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' 
            : 'drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]';
          
          return (
            <motion.div
              key={`heart-${i}`}
              className={`absolute ${colorClass}`}
              style={{ left: `${leftPosition}%` }}
              initial={{ 
                y: "-10%",
                scale: size,
                rotate: -15 + (i % 3) * 15,
                opacity: 0
              }}
              animate={{ 
                y: "-10%",
                rotate: [-15 + (i % 3) * 15, 15 - (i % 3) * 15],
                opacity: [0, 0.7, 0.7, 0]
              }}
              transition={{
                y: {
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "linear"
                },
                rotate: {
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  times: [0, 0.05, 0.92, 1],
                  ease: "easeOut"
                }
              }}
            >
              <motion.div
                animate={{ y: ["-10%", "1100%"] }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "linear"
                }}
              >
                <svg className={`w-5 h-5 sm:w-7 sm:h-7 ${glowClass}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Moving Hearts
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl text-mw-blue-100 mb-12"
          >
            Towards More Responsible OOH Media Worldwide
          </motion.p>

          {/* Three Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1 - Carbon Neutral */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group bg-white/10 backdrop-blur-md rounded-[6px] p-6 border border-white/20 hover:bg-white/15 hover:border-mw-blue-400/40 transition-all duration-300"
            >
              {/* Animated Icon */}
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                </motion.svg>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">Carbon Neutral by Default</h3>
              <p className="text-mw-blue-100/80 text-sm leading-relaxed">
                Campaign emissions are calculated and offset across bookings.
              </p>
            </motion.div>

            {/* Card 2 - Industry Standard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="group bg-white/10 backdrop-blur-md rounded-[6px] p-6 border border-white/20 hover:bg-white/15 hover:border-mw-blue-400/40 transition-all duration-300"
            >
              {/* Animated Icon */}
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">Industry Standard Adoption</h3>
              <p className="text-mw-blue-100/80 text-sm leading-relaxed">
                Moving Walls is the first OOH platform to adopt the Global Media Sustainability Framework version 1.2 as a global standard.
              </p>
            </motion.div>

            {/* Card 3 - Commitment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="group bg-white/10 backdrop-blur-md rounded-[6px] p-6 border border-white/20 hover:bg-white/15 hover:border-mw-blue-400/40 transition-all duration-300"
            >
              {/* Animated Icon */}
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </motion.svg>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">Sustainable Commitment</h3>
              <p className="text-mw-blue-100/80 text-sm leading-relaxed">
                We work with certified carbon offset partners to ensure credible and measurable impact across markets.
              </p>
            </motion.div>
          </div>

          {/* Hearts Counter */}
          <div className="flex flex-col items-center gap-3">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-base sm:text-lg text-mw-blue-100"
            >
              To date, our partners have generated
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-[6px] px-8 py-4 border border-white/20"
            >
              <div className="flex items-center justify-center gap-4">
                {/* Animated Number */}
                <motion.span
                  key={heartCount}
                  initial={{ scale: 1.05, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
                >
                  {formatNumber(heartCount)}
                </motion.span>
                
                {/* Heartbeat Icon */}
                <motion.svg 
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    repeatDelay: 0.5,
                    ease: "easeInOut" 
                  }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </motion.svg>
              </div>
            </motion.div>
          </div>

          {/* Learn More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8"
          >
            <a
              href="https://movinghearts.media/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-mw-blue-50 text-mw-blue-700 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Learn More
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
