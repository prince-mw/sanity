"use client";

import { motion } from "framer-motion";
import type { TrustBarStat } from "@/sanity/lib/fetch";

interface TrustBarProps {
  stats?: TrustBarStat[] | null
}

const defaultStats: TrustBarStat[] = [
  { value: "40+", label: "Markets Covered" },
  { value: "1,500+", label: "Media Owners" },
  { value: "1,000,000+", label: "OOH Sites" },
];

export default function TrustBar({ stats }: TrustBarProps) {
  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-8 bg-mw-gray-50 border-y border-mw-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 items-center"
        >
          {displayStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-mw-blue-600">{stat.value}</div>
              <div className="text-sm font-medium text-mw-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
