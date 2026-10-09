"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleContext";
import type { ClientPartner } from "@/sanity/lib/fetch";
import { getSanityImageUrl } from "@/sanity/lib/fetch";

interface ClientsProps {
  partners?: ClientPartner[] | null
  sectionTitle?: string | null
  sectionDescription?: string | null
  /** Partner pages under /partners — logos with a matching page link to it */
  partnerPages?: { name: string; slug: string }[]
}

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Match a homepage logo (e.g. "LGE", "Solum") to its partner page ("LG Electronics", "SOLUM")
function findPartnerHref(name: string, pages: { name: string; slug: string }[]): string | null {
  const n = normalize(name);
  if (!n) return null;
  const page = pages.find((p) => {
    const pn = normalize(p.name);
    const ps = normalize(p.slug);
    return pn === n || ps === n || pn.startsWith(n) || n.startsWith(ps);
  });
  return page ? `/partners/${page.slug}` : null;
}

const defaultPartners = [
  { 
    name: "Vistar Media", 
    category: "DOOH SSP",
    logo: (
      <svg viewBox="0 0 24 24" className="w-16 h-16 sm:w-20 sm:h-20" fill="none">
        <rect width="24" height="24" rx="4" fill="#00D4AA"/>
        <path d="M6 12l4 5 8-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    name: "Place Exchange", 
    category: "OOH Marketplace",
    logo: (
      <svg viewBox="0 0 24 24" className="w-16 h-16 sm:w-20 sm:h-20" fill="none">
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
      <svg viewBox="0 0 24 24" className="w-16 h-16 sm:w-20 sm:h-20" fill="none">
        <rect width="24" height="24" rx="4" fill="#1E3A8A"/>
        <path d="M4 8h16M4 12h16M4 16h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="18" cy="16" r="2" fill="#60A5FA"/>
      </svg>
    )
  },
];

export default function Clients({ partners, sectionTitle, sectionDescription, partnerPages = [] }: ClientsProps) {
  const { t } = useLocale();
  const hasCmsPartners = partners && partners.length > 0;
  
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
          <span className="text-mw-blue-600 text-sm font-medium uppercase tracking-wider">
            {t('landingPage.clients.eyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mt-4 mb-6">
            {sectionTitle || t('landingPage.clients.title')}
          </h2>
          {sectionDescription && (
            <p className="text-mw-gray-600 max-w-3xl mx-auto text-lg">
              {sectionDescription}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {hasCmsPartners ? partners.map((partner, index) => {
            const href = findPartnerHref(partner.name, partnerPages);
            return (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative flex flex-col items-center justify-center p-6 sm:p-8 bg-mw-gray-50 rounded-xl border border-mw-gray-200 hover:border-mw-blue-300 hover:shadow-mw-md transition-all duration-300 group"
            >
              {href && (
                <Link href={href} className="absolute inset-0 z-10 rounded-xl" aria-label={`${partner.name} × Moving Walls partnership`} />
              )}
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {partner.logo ? (
                  <img
                    src={getSanityImageUrl(partner.logo, { width: 200 })}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 bg-mw-blue-100 rounded-lg flex items-center justify-center text-mw-blue-600 font-bold text-2xl">
                    {partner.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-mw-gray-900 group-hover:text-mw-blue-600 transition-colors">
                  {partner.name}
                </div>
                <div className="text-xs text-mw-gray-500 mt-1">{partner.category}</div>
                {href && (
                  <div className="mt-2 text-xs font-semibold text-mw-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">View partnership →</div>
                )}
              </div>
            </motion.div>
            );
          }) : defaultPartners.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex flex-col items-center justify-center p-6 sm:p-8 bg-mw-gray-50 rounded-xl border border-mw-gray-200 hover:border-mw-blue-300 hover:shadow-mw-md transition-all duration-300 group"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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

        {partnerPages.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 text-mw-blue-600 font-semibold hover:gap-3 transition-all"
            >
              {t('landingPage.clients.viewAll')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}