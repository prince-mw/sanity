"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/LocaleContext";
import { useEffect } from "react";
import { appendReferrerName } from "@/lib/referrerName";

interface ContactFormProps {
  formSectionTitle?: string
  formSectionDescription?: string
  companyName?: string
  companyAddress?: string
  companyEmail?: string
  zohoFormUrl?: string
}

export default function ContactForm({
  formSectionTitle,
  formSectionDescription,
  companyName,
  companyAddress,
  companyEmail,
  zohoFormUrl,
}: ContactFormProps) {
  const { t } = useLocale();
  const pathname = usePathname();

  const title = formSectionTitle || t('landingPage.contactForm.title');
  const description = formSectionDescription || t('landingPage.contactForm.description');
  const name = companyName || 'Moving Walls Pte Ltd';
  const address = companyAddress || '14, Robinson Road #8-02\nFar East Financial Building\nSingapore 048545';
  const email = companyEmail || 'info@movingwalls.com';
  const baseFormUrl = zohoFormUrl || 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWContactUs/formperma/U0Rmmz1KaZyfpwtqHbfK6sbw19RecVMg6aMmZ3G0vuw';
  const formUrl = appendReferrerName(baseFormUrl, pathname);
  const formPermalink = formUrl.match(/formperma\/([^/?]+)/)?.[1];

  // Zoho's iframe embed on this plan has no auto-height signal, so the height below is a fixed,
  // hand-tuned estimate per breakpoint (mobile fields stack into one column and need more height).
  // This listener stays in case Zoho ever adds that signal for this form — harmless no-op until then.
  useEffect(() => {
    if (!formPermalink) return;

    function handleZohoResize(e: MessageEvent) {
      const data = e.data;
      if (typeof data !== 'string') return;
      const parts = data.split('|');
      if (parts.length !== 2 && parts.length !== 3) return;
      const [perma, height] = parts;
      if (perma !== formPermalink) return;

      const container = document.getElementById(`zf_div_${perma}`);
      const iframe = container?.getElementsByTagName('iframe')[0];
      const newHeight = `${parseInt(height, 10) + 15}px`;
      if (iframe && iframe.style.height !== newHeight) {
        iframe.style.height = newHeight;
      }
    }

    window.addEventListener('message', handleZohoResize);
    return () => window.removeEventListener('message', handleZohoResize);
  }, [formPermalink]);

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-mw-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-mw-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-mw-gray-900 mb-1">{name}</h4>
                      <p className="text-mw-gray-600">{address.split('\n').map((line, i) => (
                        <span key={i}>{line}{i < address.split('\n').length - 1 && <br />}</span>
                      ))}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-mw-gray-900 mb-1">{t('landingPage.contactForm.emailLabel')}</h4>
                      <a href={`mailto:${email}`} className="text-mw-gray-600 font-medium hover:text-mw-blue-600 transition-colors">{email}</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form - Zoho Iframe */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                id={formPermalink ? `zf_div_${formPermalink}` : undefined}
                className="bg-white rounded-2xl shadow-mw-lg overflow-hidden"
              >
                {/* suppressHydrationWarning: ZohoUTMTracker appends UTM params to the src in the DOM */}
                <iframe
                  src={formUrl}
                  title="Contact Us"
                  className="w-full h-[720px] sm:h-[780px] lg:h-[620px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  suppressHydrationWarning
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}