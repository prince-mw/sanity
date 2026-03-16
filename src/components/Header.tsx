"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale, Locale } from "@/i18n/LocaleContext";
import GlobalSearch from "./GlobalSearch";

// Types for Sanity mega menu data
export interface SanityMenuLink {
  _key: string;
  isEnabled?: boolean;
  title: string;
  description?: string;
  linkType: string;
  url?: string;
  internalPage?: string;
  icon?: string;
  openInNewTab?: boolean;
  productRef?: { slug: string };
  caseStudyRef?: { slug: string };
  blogPostRef?: { slug: string };
}

export interface SanityMenuColumn {
  _key: string;
  heading?: string;
  links: SanityMenuLink[];
}

export interface SanityMenuItem {
  _key: string;
  isEnabled?: boolean;
  title: string;
  menuType: 'link' | 'megaMenu';
  linkType?: string;
  url?: string;
  internalPage?: string;
  openInNewTab?: boolean;
  highlight?: string;
  icon?: string;
  columns?: SanityMenuColumn[];
  featuredContent?: {
    enabled: boolean;
    title?: string;
    description?: string;
    image?: string;
    linkType?: string;
    url?: string;
    internalPage?: string;
    buttonText?: string;
  };
  showFeaturedContent?: boolean;
}

export interface SanityMegaMenuData {
  _id: string;
  title: string;
  mainNavItems: SanityMenuItem[];
  ctaButton?: {
    enabled: boolean;
    text: string;
    linkType: string;
    url?: string;
    internalPage?: string;
    style: string;
  };
  settings?: {
    stickyHeader?: boolean;
    showSearch?: boolean;
    mobileBreakpoint?: string;
  };
}

// Helper to resolve link href from Sanity data
function resolveHref(link: SanityMenuLink): string {
  switch (link.linkType) {
    case 'custom':
      return link.url || '#';
    case 'internal':
      return link.internalPage || '#';
    case 'product':
      return link.productRef?.slug ? `/products/${link.productRef.slug}` : '#';
    case 'caseStudy':
      return link.caseStudyRef?.slug ? `/case-studies/${link.caseStudyRef.slug}` : '#';
    case 'blogPost':
      return link.blogPostRef?.slug ? `/blog/${link.blogPostRef.slug}` : '#';
    default:
      return link.url || link.internalPage || '#';
  }
}

// Helper to resolve menu item href
function resolveMenuItemHref(item: SanityMenuItem): string {
  if (item.menuType === 'link') {
    if (item.linkType === 'custom') {
      return item.url || '#';
    }
    return item.internalPage || '#';
  }
  return '#';
}

// Transform Sanity menu data to the format used by the component
function transformSanityMenu(sanityData: SanityMegaMenuData | null, t: (key: string) => string) {
  if (!sanityData?.mainNavItems) return null;

  const megaMenuData: Record<string, { sections: Array<{ title: string; items: Array<{ name: string; description: string; href: string }> }> }> = {};
  const navLinks: Array<{ key: string; name: string; translatedName: string; href: string; hasMegaMenu: boolean; openInNewTab?: boolean }> = [];

  // Filter to only enabled menu items (isEnabled !== false means enabled by default)
  const enabledItems = sanityData.mainNavItems.filter(item => item.isEnabled !== false);

  enabledItems.forEach((item) => {
    const navLink = {
      key: item._key,
      name: item.title,
      translatedName: item.title,
      href: item.menuType === 'megaMenu' ? `#${item.title.toLowerCase()}` : resolveMenuItemHref(item),
      hasMegaMenu: item.menuType === 'megaMenu',
      openInNewTab: item.openInNewTab,
    };
    navLinks.push(navLink);

    if (item.menuType === 'megaMenu' && item.columns) {
      megaMenuData[item.title] = {
        sections: item.columns.map((column) => ({
          title: column.heading || '',
          // Filter to only enabled links within each column
          items: column.links
            .filter(link => link.isEnabled !== false)
            .map((link) => ({
              name: link.title,
              description: link.description || '',
              href: resolveHref(link),
            })),
        })),
      };
    }
  });

  return { megaMenuData, navLinks, ctaButton: sanityData.ctaButton };
}

// Function to create translated mega menu data
const createMegaMenuData = (t: (key: string) => string) => ({
  Solutions: {
    sections: [
      {
        title: t('megaMenu.solutions.byIndustry'),
        items: [
          { name: t('megaMenu.solutions.brand.name'), description: t('megaMenu.solutions.brand.description'), href: "/brands" },
          { name: t('megaMenu.solutions.mediaOwners.name'), description: t('megaMenu.solutions.mediaOwners.description'), href: "/media-owners" },
          { name: t('megaMenu.solutions.agencies.name'), description: t('megaMenu.solutions.agencies.description'), href: "/agencies" },
        ],
      },
    ],
  },
  Products: {
    sections: [
      {
        title: t('megaMenu.products.platformSuite'),
        items: [
          { name: t('megaMenu.products.planner.name'), description: t('megaMenu.products.planner.description'), href: "/mw-planner" },
          { name: t('megaMenu.products.measure.name'), description: t('megaMenu.products.measure.description'), href: "/mw-measure" },
          { name: t('megaMenu.products.influence.name'), description: t('megaMenu.products.influence.description'), href: "/mw-influence" },
          { name: t('megaMenu.products.activate.name'), description: t('megaMenu.products.activate.description'), href: "/mw-activate" },
        ],
      },
      {
        title: t('megaMenu.products.intelligenceSuite'),
        items: [
          { name: t('megaMenu.products.science.name'), description: t('megaMenu.products.science.description'), href: "/mw-science" },
          { name: t('megaMenu.products.studio.name'), description: t('megaMenu.products.studio.description'), href: "/mw-studio" },
          { name: t('megaMenu.products.market.name'), description: t('megaMenu.products.market.description'), href: "/mw-market" },
        ],
      },
    ],
  },
  About: {
    sections: [
      {
        title: t('megaMenu.about.company'),
        items: [
          { name: "About Us", description: "Learn about MovingWalls", href: "/about" },
          { name: t('megaMenu.about.ourStory.name'), description: t('megaMenu.about.ourStory.description'), href: "/our-story" },
          { name: t('megaMenu.about.leadership.name'), description: t('megaMenu.about.leadership.description'), href: "/leadership" },
          { name: t('megaMenu.about.careers.name'), description: t('megaMenu.about.careers.description'), href: "/careers" },
        ],
      },
    ],
  },
  Resources: {
    sections: [
      {
        title: t('megaMenu.resources.learn'),
        items: [
          { name: t('megaMenu.resources.blog.name'), description: t('megaMenu.resources.blog.description'), href: "/blog" },
          { name: t('megaMenu.resources.caseStudies.name'), description: t('megaMenu.resources.caseStudies.description'), href: "/case-studies" },
          { name: t('megaMenu.resources.ebooks.name'), description: t('megaMenu.resources.ebooks.description'), href: "/ebooks" },
          { name: t('megaMenu.resources.webinars.name'), description: t('megaMenu.resources.webinars.description'), href: "/webinars" },
          { name: t('megaMenu.resources.oohFormats.name'), description: t('megaMenu.resources.oohFormats.description'), href: "/ooh-formats" },
          { name: t('megaMenu.resources.pressNews.name'), description: t('megaMenu.resources.pressNews.description'), href: "/press-news" },
          { name: t('megaMenu.about.events.name'), description: t('megaMenu.about.events.description'), href: "/events" },
        ],
      },
    ],
  },
});

// Navigation links with translation keys (fallback)
const navLinkKeys = [
  { key: "nav.solutions", name: "Solutions", href: "#solutions", hasMegaMenu: true },
  { key: "nav.products", name: "Products", href: "#products", hasMegaMenu: true },
  { key: "nav.about", name: "About", href: "#about", hasMegaMenu: true },
  { key: "nav.resources", name: "Resources", href: "#resources", hasMegaMenu: true },
  { key: "nav.contact", name: "Contact", href: "/contact", hasMegaMenu: false },
];

interface HeaderProps {
  sanityMenuData?: SanityMegaMenuData | null;
}

export default function Header({ sanityMenuData }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Use the locale context
  const { locale, setLocale, localeNames, localeCodes, locales, t } = useLocale();
  
  // Transform Sanity data or fall back to local data
  const transformedSanityData = useMemo(() => transformSanityMenu(sanityMenuData || null, t), [sanityMenuData, t]);
  
  // Create translated mega menu data (fallback)
  const fallbackMegaMenuData = useMemo(() => createMegaMenuData(t), [t]);
  
  // Use Sanity data if available, otherwise use fallback
  const megaMenuData = transformedSanityData?.megaMenuData || fallbackMegaMenuData;
  
  // Create translated nav links (use Sanity data or fallback)
  const navLinks = useMemo(() => {
    if (transformedSanityData?.navLinks) {
      return transformedSanityData.navLinks;
    }
    return navLinkKeys.map(link => ({
      ...link,
      translatedName: t(link.key)
    }));
  }, [t, transformedSanityData]);
  
  // CTA button from Sanity or default
  const ctaButton = transformedSanityData?.ctaButton;
  
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
                alt="MovingWalls Logo"
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

            {/* Search Button */}
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 }}
              className="p-2 text-mw-gray-600 hover:text-mw-blue-600 hover:bg-mw-gray-50 rounded-lg transition-colors duration-200"
              aria-label="Open search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>

            {/* CTA Button - uses Sanity data if available */}
            {(ctaButton?.enabled !== false) && (
              <motion.a
                href={ctaButton?.linkType === 'custom' ? (ctaButton?.url || '/contact') : (ctaButton?.internalPage || '/contact')}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 inline-block ${
                  ctaButton?.style === 'secondary' 
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    : ctaButton?.style === 'outline'
                      ? 'border-2 border-mw-blue-600 text-mw-blue-600 hover:bg-mw-blue-50'
                      : 'bg-mw-blue-600 hover:bg-mw-blue-700 text-white'
                }`}
              >
                {ctaButton?.text || 'Get Started'}
              </motion.a>
            )}
          </div>

          {/* Mobile Search & Menu Buttons */}
          <div className="flex items-center lg:hidden">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-mw-gray-600 hover:text-mw-blue-600"
              aria-label="Open search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-mw-gray-600 hover:text-mw-blue-600"
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
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
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

                {/* Mobile CTA Button */}
                {(ctaButton?.enabled !== false) && (
                  <a 
                    href={ctaButton?.linkType === 'custom' ? (ctaButton?.url || '/contact') : (ctaButton?.internalPage || '/contact')} 
                    className={`block w-full px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mt-4 text-center ${
                      ctaButton?.style === 'secondary' 
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                        : ctaButton?.style === 'outline'
                          ? 'border-2 border-mw-blue-600 text-mw-blue-600 hover:bg-mw-blue-50'
                          : 'bg-mw-blue-600 hover:bg-mw-blue-700 text-white'
                    }`}
                  >
                    {ctaButton?.text || 'Get Started'}
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
