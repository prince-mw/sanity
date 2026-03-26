"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { CTAButton } from "./CTAButton";

// Digital Noise Overlay Component
function DigitalNoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Noise animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;
    const fps = 15; // Lower FPS for more visible noise effect
    const interval = 1000 / fps;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawNoise = (time: number) => {
      if (time - lastTime < interval) {
        animationId = requestAnimationFrame(drawNoise);
        return;
      }
      lastTime = time;

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        // Blue-tinted noise
        data[i] = noise * 0.3;     // R
        data[i + 1] = noise * 0.4; // G
        data[i + 2] = noise * 0.8; // B (more blue)
        data[i + 3] = 15;          // Very low alpha for subtle effect
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(drawNoise);
    };

    animationId = requestAnimationFrame(drawNoise);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Generate random spark lines
  const [sparkLines, setSparkLines] = useState<Array<{
    id: number;
    top: number;
    color: string;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    const colors = [
      'rgba(59, 130, 246, 0.3)',   // blue
      'rgba(6, 182, 212, 0.25)',   // cyan
      'rgba(139, 92, 246, 0.25)',  // purple
      'rgba(236, 72, 153, 0.2)',   // pink
      'rgba(34, 197, 94, 0.2)',    // green
      'rgba(251, 191, 36, 0.2)',   // amber
      'rgba(255, 255, 255, 0.15)', // white
    ];

    const lines = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      top: 5 + Math.random() * 90,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }));

    setSparkLines(lines);
  }, []);

  return (
    <>
      {/* Noise Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ zIndex: 1 }}
      />

      {/* Subtle Scan Lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 255, 255, 0.02) 3px, rgba(255, 255, 255, 0.02) 4px)',
        }}
      />

      {/* Animated Spark Lines */}
      {sparkLines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute pointer-events-none"
          style={{
            zIndex: 3,
            top: `${line.top}%`,
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent 0%, ${line.color} 20%, ${line.color} 80%, transparent 100%)`,
          }}
          initial={{ opacity: 0, scaleX: 0.3 }}
          animate={{ 
            opacity: [0, 0.8, 0.4, 0.9, 0],
            scaleX: [0.3, 1, 0.8, 1, 0.3],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Occasional brighter spark flashes */}
      {sparkLines.slice(0, 4).map((line) => (
        <motion.div
          key={`flash-${line.id}`}
          className="absolute pointer-events-none"
          style={{
            zIndex: 3,
            top: `${(line.top + 15) % 100}%`,
            left: `${Math.random() * 60 + 20}%`,
            width: '100px',
            height: '2px',
            background: `radial-gradient(ellipse at center, ${line.color.replace('0.2', '0.5').replace('0.25', '0.6').replace('0.3', '0.7')} 0%, transparent 70%)`,
            filter: 'blur(1px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.3,
            delay: line.delay + 1.5,
            repeat: Infinity,
            repeatDelay: 3 + Math.random() * 4,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
        }}
      />
    </>
  );
}

// Word Morph Animation Component
function WordMorph({ words, interval = 2000 }: { words: string[]; interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (!isInView) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, words.length, interval]);

  // Find the longest word to set fixed width
  const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, '');

  return (
    <span ref={ref} className="inline-flex justify-center relative" style={{ minWidth: `${longestWord.length * 0.6}em` }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: 90 }}
          transition={{ 
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block text-mw-blue-400"
          style={{
            textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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

// Typewriter Bullets Component
function TypewriterBullets({ bullets }: { bullets: string[] }) {
  const [displayState, setDisplayState] = useState<{
    completedBullets: string[];
    currentText: string;
    currentIndex: number;
    isComplete: boolean;
  }>({
    completedBullets: [],
    currentText: "",
    currentIndex: 0,
    isComplete: false
  });
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;
    
    let bulletIndex = 0;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;
    
    const typeNext = () => {
      if (bulletIndex >= bullets.length) {
        return; // All done
      }
      
      const currentBullet = bullets[bulletIndex];
      
      if (charIndex < currentBullet.length) {
        // Type next character
        charIndex++;
        setDisplayState(prev => ({
          ...prev,
          currentText: currentBullet.substring(0, charIndex)
        }));
        timeoutId = setTimeout(typeNext, 40);
      } else {
        // Bullet complete - move to next
        const completedBullet = currentBullet;
        bulletIndex++;
        charIndex = 0;
        
        if (bulletIndex >= bullets.length) {
          // All bullets done
          setDisplayState(prev => ({
            completedBullets: [...prev.completedBullets, completedBullet],
            currentText: "",
            currentIndex: bulletIndex,
            isComplete: true
          }));
        } else {
          // More bullets to type
          setDisplayState(prev => ({
            completedBullets: [...prev.completedBullets, completedBullet],
            currentText: "",
            currentIndex: bulletIndex,
            isComplete: false
          }));
          timeoutId = setTimeout(typeNext, 300);
        }
      }
    };
    
    typeNext();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView, bullets]);

  const { completedBullets, currentText, isComplete } = displayState;

  return (
    <div ref={ref} className="mb-10 max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-base sm:text-lg text-gray-100 font-bold" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.3)' }}>
        {completedBullets.map((bullet, index) => (
          <span key={index} className="flex items-center">
            <span>{bullet}</span>
            {index < bullets.length - 1 && (
              <span className="text-mw-blue-400/50 mx-3">|</span>
            )}
          </span>
        ))}
        {currentText && !isComplete && (
          <span className="flex items-center">
            {completedBullets.length > 0 && (
              <span className="text-mw-blue-400/50 mr-3">|</span>
            )}
            <span>{currentText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-mw-blue-400 ml-0.5"
            >
              |
            </motion.span>
          </span>
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
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src="/assets/videos/SequenceBG.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-slate-900" />
      )}

      {/* Digital Noise Overlay */}
      <DigitalNoiseOverlay />

      {/* Dark Overlay - reduced for better video visibility */}
      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 4 }} />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 10 }}>
        {/* Brand Name - Moving Walls */}
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight" 
          style={{ letterSpacing: '0.02em' }}
        >
          Moving Walls
        </motion.span>
        
        {/* Headline with Word Morph */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)', lineHeight: '1.3' }}
        >
          The World&apos;s Leading
          <br />
          <WordMorph 
            words={['OOH', 'Digital', 'Programmatic', 'Connected']} 
            interval={2000}
          />
          <br />
          <span className="text-white">Media Platform</span>
        </motion.h1>

        {/* Typewriter Animated Bullet Points - One Row */}
        <TypewriterBullets 
          bullets={[
            'Built for connection, not just visibility.',
            'Turns physical spaces into measurable media.',
            'Brings together screens, data, and buying.',
            'Reaches audiences across markets.'
          ]} 
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <CTAButton href="/contact" className="px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-mw-md hover:shadow-mw-lg inline-block text-center">
            {t('hero.cta.primary')}
          </CTAButton>
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
