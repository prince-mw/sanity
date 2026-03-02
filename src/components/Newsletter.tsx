"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLocale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-24 bg-mw-blue-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-mw-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
                {t('newsletter.title')}
                <span className="block text-mw-blue-600">{t('newsletter.titleHighlight')}</span>
              </h2>
              
              <p className="text-mw-gray-600 text-lg">
                {t('newsletter.description')}
              </p>
            </motion.div>

            {/* Right content - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-mw-gray-50 rounded-2xl p-8 border border-mw-gray-200">
                <div className="relative">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-mw-blue-600 rounded-2xl mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{t('newsletter.subscribeNow')}</h3>
                    <p className="text-mw-gray-500 text-sm">{t('newsletter.noSpam')}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder={t('newsletter.namePlaceholder')}
                        className="w-full px-5 py-4 bg-white border border-mw-gray-300 rounded-xl text-mw-gray-900 placeholder-mw-gray-400 focus:outline-none focus:border-mw-blue-500 focus:ring-2 focus:ring-mw-blue-100 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder={t('newsletter.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 bg-white border border-mw-gray-300 rounded-xl text-mw-gray-900 placeholder-mw-gray-400 focus:outline-none focus:border-mw-blue-500 focus:ring-2 focus:ring-mw-blue-100 transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-mw-md"
                    >
                      {isSubmitted ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t('newsletter.subscribedSuccess')}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          {t('newsletter.subscribeNow')}
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </form>

                  <p className="text-mw-gray-500 text-xs text-center mt-6">
                    {t('newsletter.agreementText')}{" "}
                    <a href="/privacy" className="text-mw-blue-600 hover:underline">{t('newsletter.privacyPolicy')}</a>
                    {" "}{t('newsletter.and')}{" "}
                    <a href="/terms" className="text-mw-blue-600 hover:underline">{t('newsletter.termsOfService')}</a>
                  </p>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
