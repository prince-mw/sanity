"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, type BackgroundColor } from "./utils";
import { useZohoPopup, isZohoFormUrl } from "../ZohoPopupProvider";

interface Logo {
  _key: string;
  logo?: string;
  name?: string;
  link?: string;
}

interface LogoCarouselSectionProps {
  heading?: string;
  subheading?: string;
  logos?: Logo[];
  grayscale?: boolean;
  backgroundColor?: BackgroundColor;
}

export function LogoCarouselSection({
  heading,
  subheading,
  logos,
  grayscale = true,
  backgroundColor = 'white',
}: LogoCarouselSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  const textColor = getTextColorClasses(backgroundColor);
  const subtextColor = getSubtextColorClasses(backgroundColor);
  const { openZohoPopup } = useZohoPopup();

  return (
    <section className={`py-16 md:py-20 ${bgClasses}`}>
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

        {/* Logos — infinite-scroll marquee */}
        {logos && logos.length > 0 && (
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
            <div className="flex gap-8 md:gap-12 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo._key}-${index}`}
                  className={`relative flex-shrink-0 h-12 w-32 ${grayscale ? 'grayscale hover:grayscale-0' : ''} transition-all duration-300 opacity-60 hover:opacity-100`}
                >
                  {logo.logo && (
                    logo.link ? (
                      isZohoFormUrl(logo.link) ? (
                        <button onClick={() => openZohoPopup(logo.link!, logo.name)} className="relative block w-full h-full">
                          <Image
                            src={logo.logo}
                            alt={logo.name || 'Partner logo'}
                            fill
                            className="object-contain"
                          />
                        </button>
                      ) : (
                        <a href={logo.link} target="_blank" rel="noopener noreferrer" className="relative block w-full h-full">
                          <Image
                            src={logo.logo}
                            alt={logo.name || 'Partner logo'}
                            fill
                            className="object-contain"
                          />
                        </a>
                      )
                    ) : (
                      <Image
                        src={logo.logo}
                        alt={logo.name || 'Partner logo'}
                        fill
                        className="object-contain"
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
