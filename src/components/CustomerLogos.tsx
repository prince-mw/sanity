"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleContext";
import Image from "next/image";

export default function CustomerLogos() {
  const { t } = useLocale();
  
  // Customer logos from the our-customers-logos folder
  const customers = [
    { name: "Coca-Cola", logo: "/assets/images/our-customers-logos/coca-cola.png" },
    { name: "McDonald's", logo: "/assets/images/our-customers-logos/mcdonalds.png" },
    { name: "Samsung", logo: "/assets/images/our-customers-logos/samsung.png" },
    { name: "Netflix", logo: "/assets/images/our-customers-logos/netflix.png" },
    { name: "Dell", logo: "/assets/images/our-customers-logos/dell.png" },
    { name: "Bosch", logo: "/assets/images/our-customers-logos/bosch.png" },
    { name: "L'Oreal Paris", logo: "/assets/images/our-customers-logos/l_oreal paris.png" },
    { name: "Sunsilk", logo: "/assets/images/our-customers-logos/sunsilk.png" },
    { name: "AirAsia", logo: "/assets/images/our-customers-logos/airasia.png" },
    { name: "Grab", logo: "/assets/images/our-customers-logos/grab.png" },
    { name: "Foodpanda", logo: "/assets/images/our-customers-logos/foodpanda.png" },
    { name: "Lalamove", logo: "/assets/images/our-customers-logos/lalamove.png" },
    { name: "HBO Go", logo: "/assets/images/our-customers-logos/hbo-go.png" },
    { name: "Astro", logo: "/assets/images/our-customers-logos/astro.png" },
    { name: "Gamuda", logo: "/assets/images/our-customers-logos/gamuda.png" },
    { name: "Laguna", logo: "/assets/images/our-customers-logos/laguna.png" },
    { name: "SeaOil", logo: "/assets/images/our-customers-logos/seaoil.png" },
    { name: "Fair Price", logo: "/assets/images/our-customers-logos/fair-price.png" },
  ];

  return (
    <section className="py-20 bg-mw-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-mw-blue-600 text-sm font-medium uppercase tracking-wider">
            {t('landingPage.customerLogos.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mt-4 mb-6">
            {t('landingPage.customerLogos.title')}
          </h2>
          <div className="text-mw-gray-600 max-w-3xl mx-auto text-lg space-y-3">
            {t('landingPage.customerLogos.description').split('\n\n').map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-mw-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-mw-gray-50 to-transparent z-10" />

          {/* Scrolling logos */}
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            className="flex gap-8"
          >
            {/* Triple the customers for seamless loop */}
            {[...customers, ...customers, ...customers].map((customer, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-20 bg-white rounded-xl border-2 border-mw-gray-200 flex items-center justify-center group hover:border-mw-blue-400 hover:shadow-mw-lg transition-all duration-300 px-4"
              >
                <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300 h-12 w-full relative">
                  <Image
                    src={customer.logo}
                    alt={customer.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-8 flex-wrap justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-mw-blue-600">500+</div>
              <div className="text-sm text-mw-gray-600 mt-1">Global Brands</div>
            </div>
            <div className="w-px h-12 bg-mw-gray-300 hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold text-mw-blue-600">50+</div>
              <div className="text-sm text-mw-gray-600 mt-1">Countries</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
