"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleContext";

export default function About() {
  const { t } = useLocale();
  
  return (
    <section id="about" className="py-24 bg-mw-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Animated circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-mw-blue-200 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border-2 border-mw-blue-300 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 border-2 border-mw-blue-400 rounded-full"
              />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-2xl shadow-mw-lg border border-mw-gray-200">
                  <div className="text-3xl md:text-5xl font-bold text-mw-blue-600 mb-2">15+</div>
                  <div className="text-mw-gray-500 text-sm">{t('landingPage.about.features.yearsOfExcellence')}</div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-1/4 bg-white p-4 rounded-xl shadow-mw-md border border-mw-gray-200"
              >
                <div className="text-2xl font-bold text-mw-gray-900">50M+</div>
                <div className="text-xs text-mw-gray-500">{t('landingPage.about.features.dailyImpressions')}</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-0 left-1/4 bg-white p-4 rounded-xl shadow-mw-md border border-mw-gray-200"
              >
                <div className="text-2xl font-bold text-mw-gray-900">100+</div>
                <div className="text-xs text-mw-gray-500">{t('landingPage.about.features.markets')}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mb-6">
              {t('landingPage.about.title')}
            </h2>
            <p className="text-mw-gray-600 text-lg mb-6">
              {t('landingPage.about.description1')}
            </p>
            <p className="text-mw-gray-600 mb-8">
              {t('landingPage.about.description2')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {[
                { label: t('landingPage.about.features.dataDriven.label'), desc: t('landingPage.about.features.dataDriven.desc') },
                { label: t('landingPage.about.features.fullService.label'), desc: t('landingPage.about.features.fullService.desc') },
                { label: t('landingPage.about.features.globalReach.label'), desc: t('landingPage.about.features.globalReach.desc') },
                { label: t('landingPage.about.features.innovation.label'), desc: t('landingPage.about.features.innovation.desc') },
              ].map((item, index) => (
                <div key={index}>
                  <h4 className="text-mw-gray-900 font-semibold mb-1">{item.label}</h4>
                  <p className="text-mw-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <button className="px-6 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-mw-md">
              {t('landingPage.about.cta')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
