"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleContext";

// Fade-in Counter with Typewriter Label
function AnimatedCounter({ value, suffix, label, duration = 2 }: { value: number; suffix: string; label: string; duration?: number }) {
  const [displayedLabel, setDisplayedLabel] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Typewriter effect for label
  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        currentIndex++;
        if (currentIndex <= label.length) {
          setDisplayedLabel(label.substring(0, currentIndex));
        } else {
          clearInterval(typeInterval);
          // Hide cursor after typing is complete
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, 100);
      
      return () => clearInterval(typeInterval);
    }
  }, [isInView, label]);

  return (
    <div ref={ref} className="text-center">
      {/* Number - static display */}
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
        <span 
          className="text-white"
          style={{
            textShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
          }}
        >
          {formatNumber(value)}
        </span>
        <span className="text-mw-blue-400">{suffix}</span>
      </div>
      
      {/* Typewriter label */}
      <div className="text-base sm:text-lg font-medium text-gray-300 h-7 flex items-center justify-center">
        <span>{displayedLabel}</span>
        {showCursor && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-mw-blue-400 ml-0.5"
          >
            |
          </motion.span>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const { t } = useLocale();

  // Handle video load error
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleError = () => setVideoError(true);
      video.addEventListener('error', handleError);
      return () => video.removeEventListener('error', handleError);
    }
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-20" style={{ minHeight: '90vh' }}>
      {/* Video Background with fallback gradient */}
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src="/assets/videos/SequenceBG.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-slate-900" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)', lineHeight: '1.45' }}
        >
          {t('hero.title')}
          <br />
          <span className="text-mw-blue-400">{t('hero.titleHighlight')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg text-gray-100 mb-10 max-w-6xl mx-auto leading-relaxed"
          style={{ textShadow: '0 1px 5px rgba(0,0,0,0.3)' }}
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="/contact" className="px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-mw-md hover:shadow-mw-lg inline-block text-center">
            {t('hero.cta.primary')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
