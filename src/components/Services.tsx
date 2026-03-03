"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";

export default function Services() {
  const { t } = useLocale();
  
  const solutions = [
    {
      titleKey: "landingPage.solutions.brand.title",
      subtitleKey: "landingPage.solutions.brand.subtitle",
      descriptionKey: "landingPage.solutions.brand.description",
      bgColor: "bg-transparent",
      href: "/brands",
      image: "/assets/images/Brand.png",
      featureKeys: [
        "landingPage.solutions.brand.features.0",
        "landingPage.solutions.brand.features.1",
        "landingPage.solutions.brand.features.2",
        "landingPage.solutions.brand.features.3"
      ],
      ctaKey: "landingPage.solutions.brand.cta"
    },
    {
      titleKey: "landingPage.solutions.mediaOwners.title",
      subtitleKey: "landingPage.solutions.mediaOwners.subtitle",
      descriptionKey: "landingPage.solutions.mediaOwners.description",
      bgColor: "bg-transparent",
      href: "/media-owners",
      image: "/assets/images/MediaOwners.png",
      featureKeys: [
        "landingPage.solutions.mediaOwners.features.0",
        "landingPage.solutions.mediaOwners.features.1",
        "landingPage.solutions.mediaOwners.features.2",
        "landingPage.solutions.mediaOwners.features.3"
      ],
      ctaKey: "landingPage.solutions.mediaOwners.cta"
    },
    {
      titleKey: "landingPage.solutions.agencies.title",
      subtitleKey: "landingPage.solutions.agencies.subtitle",
      descriptionKey: "landingPage.solutions.agencies.description",
      bgColor: "bg-transparent",
      href: "/agencies",
      image: "/assets/images/Agencies.png",
      featureKeys: [
        "landingPage.solutions.agencies.features.0",
        "landingPage.solutions.agencies.features.1",
        "landingPage.solutions.agencies.features.2",
        "landingPage.solutions.agencies.features.3"
      ],
      ctaKey: "landingPage.solutions.agencies.cta"
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-mw-blue-600 text-sm font-medium uppercase tracking-wider">
            {t('landingPage.solutions.badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-mw-gray-900 mt-4 mb-6">
            {t('landingPage.solutions.title')}
          </h2>
          <p className="text-mw-gray-600 max-w-2xl mx-auto text-lg">
            {t('landingPage.solutions.description')}
          </p>
        </motion.div>

        <div className="space-y-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Illustration */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative h-[280px] sm:h-[350px] md:h-[420px] lg:h-[500px] w-full">
                  <Image
                    src={solution.image}
                    alt={`${t(solution.titleKey)} illustration`}
                    fill
                    className="object-contain object-center lg:object-left"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <h3 className="text-3xl font-bold text-mw-gray-900 mb-2">
                  {t(solution.titleKey)}
                </h3>
                {solution.subtitleKey && (
                  <p className="text-xl font-semibold text-mw-blue-600 mb-4">
                    {t(solution.subtitleKey)}
                  </p>
                )}
                <div className="text-lg text-mw-gray-600 mb-6 leading-relaxed space-y-3">
                  {t(solution.descriptionKey).split('\n\n').map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {solution.featureKeys.map((featureKey, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-mw-gray-700">
                      <svg className="w-6 h-6 text-mw-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={solution.href}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-mw-md hover:shadow-mw-lg"
                >
                  {t(solution.ctaKey)}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
