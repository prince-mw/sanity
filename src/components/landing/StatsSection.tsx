"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, type BackgroundColor } from "./utils";

interface Stat {
  _key: string;
  value?: string;
  label?: string;
  prefix?: string;
  suffix?: string;
}

interface StatsSectionProps {
  heading?: string;
  subheading?: string;
  stats?: Stat[];
  backgroundColor?: BackgroundColor;
}

function AnimatedStat({ stat, isDark }: { stat: Stat; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView && stat.value) {
      // Extract numeric part for animation
      const numericMatch = stat.value.match(/[\d,]+/);
      if (numericMatch) {
        const targetNum = parseInt(numericMatch[0].replace(/,/g, ''), 10);
        const duration = 2000;
        const steps = 60;
        const increment = targetNum / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNum) {
            setDisplayValue(stat.value || '0');
            clearInterval(timer);
          } else {
            const formatted = Math.floor(current).toLocaleString();
            setDisplayValue(stat.value?.replace(numericMatch[0], formatted) || formatted);
          }
        }, duration / steps);

        return () => clearInterval(timer);
      } else {
        setDisplayValue(stat.value);
      }
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 ${isDark ? 'text-white' : 'text-mw-blue-600'}`}>
        {stat.prefix}
        <span>{displayValue}</span>
        {stat.suffix}
      </div>
      {stat.label && (
        <p className={`text-lg ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
          {stat.label}
        </p>
      )}
    </motion.div>
  );
}

export function StatsSection({
  heading,
  subheading,
  stats,
  backgroundColor = 'blue',
}: StatsSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  const isDark = backgroundColor === 'dark' || backgroundColor === 'blue' || backgroundColor === 'gradient';
  const textColor = getTextColorClasses(backgroundColor);
  const subtextColor = getSubtextColorClasses(backgroundColor);

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

        {/* Stats Grid */}
        {stats && stats.length > 0 && (
          <div className={`grid grid-cols-2 ${stats.length > 2 ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-8 md:gap-12`}>
            {stats.map((stat) => (
              <AnimatedStat key={stat._key} stat={stat} isDark={isDark} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
