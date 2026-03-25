"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleContext";

export default function CaseStudySection() {
  const { t } = useLocale();
  
  return (
    <section id="case-study" className="py-24 bg-mw-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-mw-blue-600 text-sm font-medium uppercase tracking-wider">
            {t('landingPage.caseStudy.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mt-4">
            {t('landingPage.caseStudy.title')}
          </h2>
        </motion.div>

        {/* Blog-style Featured Card */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Link href="/case-studies" className="group block">
            <div className="bg-white rounded-2xl shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 overflow-hidden">
              {/* Featured Image / Gradient Header */}
              <div className="h-64 bg-gradient-to-br from-mw-blue-600 via-mw-blue-500 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/images/pattern.svg')] opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                      {t('landingPage.caseStudy.industry')}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold mb-2">
                      300% {t('landingPage.caseStudy.roasIncrease')}
                    </h3>
                    <p className="text-blue-100 text-lg">
                      {t('landingPage.caseStudy.headline')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-4 text-sm text-mw-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t('landingPage.caseStudy.date')}
                  </span>
                </div>

                <p className="text-mw-gray-700 text-lg leading-relaxed mb-8">
                  {t('landingPage.caseStudy.description')}
                </p>

                {/* Key Results Grid */}
                <div className="grid sm:grid-cols-3 gap-6 mb-8 p-6 bg-mw-gray-50 rounded-xl">
                  <div>
                    <div className="text-3xl font-bold text-mw-blue-600 mb-1">300%</div>
                    <div className="text-sm text-mw-gray-600">{t('landingPage.caseStudy.roasIncrease')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-mw-blue-600 mb-1">2.4M</div>
                    <div className="text-sm text-mw-gray-600">{t('landingPage.caseStudy.dailyReach')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-mw-blue-600 mb-1">47%</div>
                    <div className="text-sm text-mw-gray-600">{t('landingPage.caseStudy.lowerCPA')}</div>
                  </div>
                </div>

                {/* Read More CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-mw-gray-200">
                  <span className="text-mw-blue-600 font-semibold group-hover:gap-3 flex items-center gap-2 transition-all">
                    {t('landingPage.caseStudy.readFullCaseStudy')}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-mw-gray-500">Powered by</span>
                    <div className="flex gap-1">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">MW Planner</span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">MW Reach</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">MW Measure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      </div>
    </section>
  );
}
