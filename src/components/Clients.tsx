"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleContext";

const clients = [
  { 
    name: "Vistar Media", 
    category: "DOOH SSP",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
        <rect width="24" height="24" rx="4" fill="#00D4AA"/>
        <path d="M6 12l4 5 8-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    name: "Place Exchange", 
    category: "OOH Marketplace",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
        <rect width="24" height="24" rx="4" fill="#6366F1"/>
        <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M12 13v4M8 21c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    name: "VIOOH", 
    category: "Premium DOOH",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
        <rect width="24" height="24" rx="4" fill="#1E3A8A"/>
        <path d="M4 8h16M4 12h16M4 16h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="18" cy="16" r="2" fill="#60A5FA"/>
      </svg>
    )
  },
];

export default function Clients() {
  const { t } = useLocale();
  
  return (
    <section className="py-16 bg-white border-y border-mw-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-mw-gray-500 text-sm font-medium uppercase tracking-wider">
            {t('landingPage.clients.title')}
          </span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex flex-col items-center justify-center p-6 bg-mw-gray-50 rounded-xl border border-mw-gray-200 hover:border-mw-blue-300 hover:shadow-mw-md transition-all duration-300 group"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                {client.logo}
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-mw-gray-900 group-hover:text-mw-blue-600 transition-colors">
                  {client.name}
                </div>
                <div className="text-xs text-mw-gray-500 mt-1">{client.category}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-mw-gray-500 mt-12 text-sm"
        >
          {t('landingPage.clients.description')}
        </motion.p>
      </div>
    </section>
  );
}
