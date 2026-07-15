"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleContext";
import ZohoCampaignsEmbed from "./ZohoCampaignsEmbed";

export default function Newsletter() {
  const { t } = useLocale();

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

            {/* Right content - Zoho Campaigns embed */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ZohoCampaignsEmbed height={340} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
