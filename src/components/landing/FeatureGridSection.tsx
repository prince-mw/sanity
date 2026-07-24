"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, type BackgroundColor } from "./utils";
import { useZohoPopup, isZohoFormUrl } from "../ZohoPopupProvider";

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
  const { openZohoPopup } = useZohoPopup();

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
            {features.map((feature, index) => {
              const renderTitle = (titleClass: string) => (
                <h3 className={`text-xl font-semibold mb-2 ${titleClass}`}>
                  {feature.link ? (
                    isZohoFormUrl(feature.link) ? (
                      <button onClick={() => openZohoPopup(feature.link!, feature.title)} className="hover:underline text-left">
                        {feature.title}
                      </button>
                    ) : (
                      <Link href={feature.link} className="hover:underline">
                        {feature.title}
                      </Link>
                    )
                  ) : (
                    feature.title
                  )}
                </h3>
              );

              return (
                <motion.div
                  key={feature._key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-xl overflow-hidden"
                >
                  {feature.icon ? (
                    <div className="group relative h-72 sm:h-80">
                      <Image
                        src={feature.icon}
                        alt={feature.title || 'Feature image'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        {feature.title && renderTitle('text-white')}
                        {feature.description && (
                          <p className="text-white/90">{feature.description}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`h-72 sm:h-80 flex flex-col justify-center p-6 ${backgroundColor === 'white' ? 'bg-gray-50 hover:bg-gray-100' : backgroundColor === 'gray' ? 'bg-white hover:shadow-lg' : 'bg-white/10 hover:bg-white/20'} transition-all`}
                    >
                      {feature.title && renderTitle(textColor)}
                      {feature.description && (
                        <p className={subtextColor}>{feature.description}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
