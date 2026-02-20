"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale, Locale } from "@/i18n/LocaleContext";

// Function to create translated mega menu data
const createMegaMenuData = (t: (key: string) => string) => ({
  Solutions: {
    sections: [
      {
        title: t('megaMenu.solutions.byIndustry'),
        items: [
          { name: t('megaMenu.solutions.brand.name'), description: t('megaMenu.solutions.brand.description'), href: "/solutions/brands" },
          { name: t('megaMenu.solutions.mediaOwners.name'), description: t('megaMenu.solutions.mediaOwners.description'), href: "/solutions/media-owners" },
          { name: t('megaMenu.solutions.agencies.name'), description: t('megaMenu.solutions.agencies.description'), href: "/solutions/agencies" },
        ],
      },
    ],
    featured: {
      title: t('megaMenu.solutions.featured.title'),
      description: t('megaMenu.solutions.featured.description'),
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
      href: "/resources/case-studies/automotive-dealership-traffic",
    },
  },
  Products: {
    sections: [
      {
        title: t('megaMenu.products.platformSuite'),
        items: [
          { name: t('megaMenu.products.planner.name'), description: t('megaMenu.products.planner.description'), href: "/products/mw-planner" },
          { name: t('megaMenu.products.measure.name'), description: t('megaMenu.products.measure.description'), href: "/products/mw-measure" },
          { name: t('megaMenu.products.influence.name'), description: t('megaMenu.products.influence.description'), href: "/products/mw-influence" },
          { name: t('megaMenu.products.activate.name'), description: t('megaMenu.products.activate.description'), href: "/products/mw-activate" },
        ],
      },
      {
        title: t('megaMenu.products.intelligenceSuite'),
        items: [
          { name: t('megaMenu.products.science.name'), description: t('megaMenu.products.science.description'), href: "/products/mw-science" },
          { name: t('megaMenu.products.studio.name'), description: t('megaMenu.products.studio.description'), href: "/products/mw-studio" },
          { name: t('megaMenu.products.market.name'), description: t('megaMenu.products.market.description'), href: "/products/mw-market" },
        ],
      },
    ],
    featured: {
      title: t('megaMenu.products.featured.title'),
      description: t('megaMenu.products.featured.description'),
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      href: "/resources/case-studies/global-retail-brand-340-roi",
    },
  },
  About: {
    sections: [
      {
        title: t('megaMenu.about.company'),
        items: [
          { name: "About Us", description: "Learn about Moving Walls", href: "/about" },
          { name: t('megaMenu.about.ourStory.name'), description: t('megaMenu.about.ourStory.description'), href: "/about/our-story" },
          { name: t('megaMenu.about.leadership.name'), description: t('megaMenu.about.leadership.description'), href: "/about/leadership" },
          { name: t('megaMenu.about.careers.name'), description: t('megaMenu.about.careers.description'), href: "/about/careers" },
        ],
      },
      {
        title: t('megaMenu.about.connect'),
        items: [
          { name: t('megaMenu.about.contact.name'), description: t('megaMenu.about.contact.description'), href: "/contact" },
          { name: t('megaMenu.about.partners.name'), description: t('megaMenu.about.partners.description'), href: "/partners" },
          { name: t('megaMenu.about.events.name'), description: t('megaMenu.about.events.description'), href: "/events" },
        ],
      },
    ],
    featured: {
      title: t('megaMenu.about.featured.title'),
      description: t('megaMenu.about.featured.description'),
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      href: "/resources/case-studies/fintech-app-acquisition",
    },
  },
  Resources: {
    sections: [
      {
        title: t('megaMenu.resources.learn'),
        items: [
          { name: t('megaMenu.resources.blog.name'), description: t('megaMenu.resources.blog.description'), href: "/resources/blog" },
          { name: t('megaMenu.resources.webinars.name'), description: t('megaMenu.resources.webinars.description'), href: "/resources/webinars" },
          { name: t('megaMenu.resources.caseStudies.name'), description: t('megaMenu.resources.caseStudies.description'), href: "/resources/case-studies" },
          { name: t('megaMenu.resources.ebooks.name'), description: t('megaMenu.resources.ebooks.description'), href: "/resources/ebooks" },
          { name: t('megaMenu.resources.ooh101.name'), description: t('megaMenu.resources.ooh101.description'), href: "/resources/ooh-101" },
          { name: t('megaMenu.resources.pressNews.name'), description: t('megaMenu.resources.pressNews.description'), href: "/about/press-news" },
        ],
      },
      {
        title: t('megaMenu.resources.support'),
        items: [
          { name: t('megaMenu.resources.helpCenter.name'), description: t('megaMenu.resources.helpCenter.description'), href: "/resources/help-center" },
          { name: t('megaMenu.resources.documentation.name'), description: t('megaMenu.resources.documentation.description'), href: "/resources/documentation" },
          { name: t('megaMenu.resources.apiReference.name'), description: t('megaMenu.resources.apiReference.description'), href: "/resources/api-reference" },
          { name: t('megaMenu.resources.community.name'), description: t('megaMenu.resources.community.description'), href: "/resources/community" },
          { name: t('megaMenu.resources.integrations.name'), description: t('megaMenu.resources.integrations.description'), href: "/integrations" },
        ],
      },
    ],
    featured: {
      title: t('megaMenu.resources.featured.title'),
      description: t('megaMenu.resources.featured.description'),
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      href: "/resources/case-studies/tech-product-launch",
    },
  },
});

// Navigation links with translation keys
const navLinkKeys = [
  { key: "nav.solutions", name: "Solutions", href: "#solutions", hasMegaMenu: true },
  { key: "nav.products", name: "Products", href: "#products", hasMegaMenu: true },
  { key: "nav.about", name: "About", href: "#about", hasMegaMenu: true },
  { key: "nav.resources", name: "Resources", href: "#resources", hasMegaMenu: true },
  { key: "nav.contact", name: "Contact", href: "/contact", hasMegaMenu: false },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  // Use the locale context
  const { locale, setLocale, localeNames, localeCodes, locales, t } = useLocale();
  
  // Create translated mega menu data
  const megaMenuData = useMemo(() => createMegaMenuData(t), [t]);
  
  // Create translated nav links
  const navLinks = useMemo(() => navLinkKeys.map(link => ({
    ...link,
    translatedName: t(link.key)
  })), [t]);
  
  // Build languages array from locale context
  const languages = locales.map((loc) => ({
    locale: loc,
    code: localeCodes[loc],
    name: localeNames[loc],
  }));

  const handleMouseEnter = (name: string) => {
    if (megaMenuData[name as keyof typeof megaMenuData]) {
      setActiveMegaMenu(name);
    }
  };

  const handleMouseLeave = () => {
    setActiveMegaMenu(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-mw-gray-200 shadow-mw-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Image
                src="/assets/logo/MW-logo-web.svg"
                alt="Moving Walls Logo"
                width={180}
                height={40}
                priority
                className="h-8 lg:h-10 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                {link.hasMegaMenu ? (
                  <button
                    className="flex items-center gap-1 text-mw-gray-600 hover:text-mw-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                  >
                    {link.translatedName}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeMegaMenu === link.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-mw-gray-600 hover:text-mw-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                  >
                    {link.translatedName}
                  </Link>
                )}
              </motion.div>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                onBlur={() => setTimeout(() => setIsLanguageOpen(false), 150)}
                className="flex items-center gap-2 px-3 py-2 text-mw-gray-600 hover:text-mw-blue-600 transition-colors duration-200 text-sm font-medium rounded-lg hover:bg-mw-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{localeCodes[locale]}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-mw-gray-200 py-2 z-50 max-h-80 overflow-y-auto"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.locale}
                        onClick={() => {
                          setLocale(lang.locale);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-mw-blue-50 transition-colors ${
                          locale === lang.locale ? 'bg-mw-blue-50 text-mw-blue-600' : 'text-mw-gray-700'
                        }`}
                      >
                        <span className="font-medium text-xs bg-mw-gray-100 px-2 py-0.5 rounded">{lang.code}</span>
                        <span>{lang.name}</span>
                        {locale === lang.locale && (
                          <svg className="w-4 h-4 ml-auto text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-mw-blue-600 hover:bg-mw-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-mw-gray-600 hover:text-mw-blue-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMegaMenu && megaMenuData[activeMegaMenu as keyof typeof megaMenuData] && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full bg-white border-t border-mw-gray-200 shadow-mw-lg"
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-4 gap-8">
                  {/* Menu Sections */}
                  {megaMenuData[activeMegaMenu as keyof typeof megaMenuData].sections.map(
                    (section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <h3 className="text-xs font-semibold text-mw-gray-400 uppercase tracking-wider mb-4">
                          {section.title}
                        </h3>
                        <ul className="space-y-3">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                href={item.href}
                                className="group block"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                <span className="text-mw-gray-900 font-medium group-hover:text-mw-blue-600 transition-colors">
                                  {item.name}
                                </span>
                                <p className="text-sm text-mw-gray-500 mt-0.5">
                                  {item.description}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}

                  {/* Featured Section */}
                  <div className="bg-mw-gray-50 rounded-xl p-6 border border-mw-gray-200">
                    <div className="h-32 bg-mw-blue-100 rounded-lg mb-4 overflow-hidden relative">
                      <img
                        src={megaMenuData[activeMegaMenu as keyof typeof megaMenuData].featured.image}
                        alt={megaMenuData[activeMegaMenu as keyof typeof megaMenuData].featured.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-mw-gray-900 mb-1">
                      {megaMenuData[activeMegaMenu as keyof typeof megaMenuData].featured.title}
                    </h4>
                    <p className="text-sm text-mw-gray-500 mb-4">
                      {megaMenuData[activeMegaMenu as keyof typeof megaMenuData].featured.description}
                    </p>
                    <Link
                      href={megaMenuData[activeMegaMenu as keyof typeof megaMenuData].featured.href}
                      className="text-sm font-medium text-mw-blue-600 hover:text-mw-blue-700 inline-flex items-center gap-1"
                      onClick={() => setActiveMegaMenu(null)}
                    >
                      Learn more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-white"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.hasMegaMenu ? (
                      <div>
                        <button
                          className="w-full flex items-center justify-between text-mw-gray-600 hover:text-mw-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                          onClick={() =>
                            setMobileExpandedMenu(
                              mobileExpandedMenu === link.name ? null : link.name
                            )
                          }
                        >
                          {link.translatedName}
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileExpandedMenu === link.name ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {mobileExpandedMenu === link.name &&
                            megaMenuData[link.name as keyof typeof megaMenuData] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 pb-2 space-y-4"
                              >
                                {megaMenuData[link.name as keyof typeof megaMenuData].sections.map(
                                  (section, sectionIndex) => (
                                    <div key={sectionIndex}>
                                      <h4 className="text-xs font-semibold text-mw-gray-400 uppercase tracking-wider mb-2">
                                        {section.title}
                                      </h4>
                                      <ul className="space-y-2">
                                        {section.items.map((item, itemIndex) => (
                                          <li key={itemIndex}>
                                            <Link
                                              href={item.href}
                                              className="block text-sm text-mw-gray-600 hover:text-mw-blue-600"
                                              onClick={() => {
                                                setIsOpen(false);
                                                setMobileExpandedMenu(null);
                                              }}
                                            >
                                              {item.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )
                                )}
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="block text-mw-gray-600 hover:text-mw-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.translatedName}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile Language Selector */}
                <div className="pt-4 border-t border-mw-gray-200">
                  <p className="text-xs font-semibold text-mw-gray-400 uppercase tracking-wider mb-3">Language</p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.slice(0, 8).map((lang) => (
                      <button
                        key={lang.locale}
                        onClick={() => {
                          setLocale(lang.locale);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                          locale === lang.locale 
                            ? 'bg-mw-blue-100 text-mw-blue-600' 
                            : 'bg-mw-gray-50 text-mw-gray-700 hover:bg-mw-gray-100'
                        }`}
                      >
                        <span className="font-medium text-xs bg-mw-gray-200 px-1.5 py-0.5 rounded">{lang.code}</span>
                        <span className="truncate text-xs">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                  <button 
                    className="w-full mt-2 text-sm text-mw-blue-600 hover:text-mw-blue-700 py-2"
                    onClick={() => {
                      // Could open a full language modal
                    }}
                  >
                    View all languages →
                  </button>
                </div>

                <button className="w-full bg-mw-blue-600 hover:bg-mw-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mt-4">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
