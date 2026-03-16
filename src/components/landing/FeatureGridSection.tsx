"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, type BackgroundColor } from "./utils";

interface Feature {
  _key: string;
  title?: string;
  description?: string;
  icon?: string;
  link?: string;
}

interface FeatureGridSectionProps {
  heading?: string;
  subheading?: string;
  columns?: 2 | 3 | 4;
  features?: Feature[];
  backgroundColor?: BackgroundColor;
}

export function FeatureGridSection({
  heading,
  subheading,
  columns = 3,
  features,
  backgroundColor = 'white',
}: FeatureGridSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  const textColor = getTextColorClasses(backgroundColor);
  const subtextColor = getSubtextColorClasses(backgroundColor);

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

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

        {/* Features Grid */}
        {features && features.length > 0 && (
          <div className={`grid ${gridCols[columns]} gap-8`}>
            {features.map((feature, index) => (
              <motion.div
                key={feature._key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl ${backgroundColor === 'white' ? 'bg-gray-50 hover:bg-gray-100' : backgroundColor === 'gray' ? 'bg-white hover:shadow-lg' : 'bg-white/10 hover:bg-white/20'} transition-all`}
              >
                {feature.icon && (
                  <div className="w-14 h-14 relative mb-4">
                    <Image
                      src={feature.icon}
                      alt={feature.title || 'Feature icon'}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                
                {feature.title && (
                  <h3 className={`text-xl font-semibold mb-3 ${textColor}`}>
                    {feature.link ? (
                      <Link href={feature.link} className="hover:underline">
                        {feature.title}
                      </Link>
                    ) : (
                      feature.title
                    )}
                  </h3>
                )}
                
                {feature.description && (
                  <p className={subtextColor}>
                    {feature.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
