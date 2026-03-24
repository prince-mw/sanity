"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { openCookieSettings } from "./CookieConsent";
import { useLocale } from "@/i18n/LocaleContext";
import { FooterContent } from "@/sanity/lib/fetch";

interface FooterProps {
  content?: FooterContent | null
}

const defaultFooterLinks = {
  company: [
    { name: "Our Story", href: "/our-story" },
    { name: "Leadership", href: "/leadership" },
    { name: "Office Locations", href: "/locations" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ],
  solutions: [
    { name: "Brands", href: "/brands" },
    { name: "Media Owners", href: "/media-owners" },
    { name: "Agencies", href: "/agencies" },
  ],
  products: [
    { name: "MW Planner", href: "/mw-planner" },
    { name: "MW Measure", href: "/mw-measure" },
    { name: "MW Influence", href: "/mw-influence" },
    { name: "MW Activate", href: "/mw-activate" },
    { name: "MW Science", href: "/mw-science" },
    { name: "MW Studio", href: "/mw-studio" },
    { name: "MW Market", href: "/mw-market" },
  ],
  resources: [
    { name: "OOH Formats", href: "/ooh-formats" },
    { name: "E-Books", href: "/ebooks" },
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Press & News", href: "/press-news" },
    { name: "Events", href: "/events" },
  ],
  billboardLocations: [
    { name: "Malaysia", href: "/locations/malaysia" },
    { name: "Singapore", href: "/locations/singapore" },
    { name: "Indonesia", href: "/locations/indonesia" },
    { name: "India", href: "/locations/india" },
    { name: "Philippines", href: "/locations/philippines" },
    { name: "Japan", href: "/locations/japan" },
    { name: "Australia", href: "/locations/australia" },
    { name: "Sri Lanka", href: "/locations/sri-lanka" },
    { name: "Thailand", href: "/locations/thailand" },
  ],
};

const defaultNavCategories = [
  { title: 'Company', showLocationIcon: false, links: defaultFooterLinks.company },
  { title: 'Solutions', showLocationIcon: false, links: defaultFooterLinks.solutions },
  { title: 'Products', showLocationIcon: false, links: defaultFooterLinks.products },
  { title: 'Resources', showLocationIcon: false, links: defaultFooterLinks.resources },
  { title: 'Billboard Locations', showLocationIcon: true, links: defaultFooterLinks.billboardLocations },
];

const defaultSocialLinks = [
  { platform: "linkedin", url: "https://www.linkedin.com/company/moving-walls/" },
  { platform: "x", url: "https://x.com/movingwalls" },
  { platform: "youtube", url: "https://www.youtube.com/@MovingWallsMy" },
  { platform: "instagram", url: "https://www.instagram.com/mymovingwalls/" },
  { platform: "facebook", url: "https://www.facebook.com/movingwalls/" },
];

const defaultLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socialIconMap: Record<string, JSX.Element> = {
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  x: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  tiktok: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
};

export default function Footer({ content }: FooterProps) {
  const { t } = useLocale();

  const companyDescription = content?.companyDescription || "Moving Walls connects the global Out of Home ecosystem into one unified cloud platform. From audience discovery to booking, activation, measurement, and optimisation, we simplify complexity so brands can grow confidently across markets.";
  const navCategories = content?.navCategories?.length ? content.navCategories : defaultNavCategories;
  const socials = content?.socialLinks?.length ? content.socialLinks : defaultSocialLinks;
  const movingHeartsTitle = content?.movingHeartsTitle || 'Moving Hearts';
  const movingHeartsStatsValue = content?.movingHeartsStatsValue || '3M+';
  const movingHeartsStatsLabel = content?.movingHeartsStatsLabel || 'Hearts Touched';
  const movingHeartsTagline = content?.movingHeartsTagline || 'Responsible OOH Media Worldwide';
  const movingHeartsUrl = content?.movingHeartsUrl || 'https://movinghearts.media/';
  const movingHeartsCtaText = content?.movingHeartsCtaText || 'Learn More';
  const legalLinks = content?.legalLinks?.length ? content.legalLinks : defaultLegalLinks;
  const copyrightText = content?.copyrightText
    ? content.copyrightText.replace('{year}', new Date().getFullYear().toString())
    : `© ${new Date().getFullYear()} Moving Walls. All rights reserved.`;
  
  return (
    <footer className="bg-mw-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="footer-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Logo & Description - Stacked */}
          <div className="mb-10">
            {/* Logo */}
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/assets/logo/MW-logo-web.svg"
                alt="MovingWalls Logo"
                width={180}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            {/* Description */}
            <p className="text-mw-gray-300 text-base leading-relaxed max-w-4xl">
              {companyDescription}
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {navCategories.map((category) => (
              <div key={category.title}>
                <h4 className="text-white font-bold mb-6 text-lg">{category.title}</h4>
                <ul className="space-y-3">
                  {category.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-mw-gray-300 hover:text-white transition-colors flex items-center group"
                      >
                        {category.showLocationIcon && (
                          <svg className="w-4 h-4 mr-2 text-mw-blue-400 group-hover:text-mw-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Moving Hearts Section */}
        <div className="relative overflow-hidden">
          {/* Wavy Top Border */}
          <svg className="absolute top-0 left-0 w-full h-6" viewBox="0 0 1440 24" preserveAspectRatio="none">
            <motion.path
              d="M0,12 C240,24 480,0 720,12 C960,24 1200,0 1440,12 L1440,0 L0,0 Z"
              fill="#1f2937"
              animate={{
                d: [
                  "M0,12 C240,24 480,0 720,12 C960,24 1200,0 1440,12 L1440,0 L0,0 Z",
                  "M0,12 C240,0 480,24 720,12 C960,0 1200,24 1440,12 L1440,0 L0,0 Z",
                  "M0,12 C240,24 480,0 720,12 C960,24 1200,0 1440,12 L1440,0 L0,0 Z",
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>

          {/* Aurora gradient background */}
          <div className="relative pt-8 pb-6 overflow-hidden">
            {/* Animated aurora gradient layers */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600"
              animate={{
                background: [
                  "linear-gradient(90deg, #059669 0%, #14b8a6 50%, #16a34a 100%)",
                  "linear-gradient(90deg, #14b8a6 0%, #16a34a 50%, #059669 100%)",
                  "linear-gradient(90deg, #16a34a 0%, #059669 50%, #14b8a6 100%)",
                  "linear-gradient(90deg, #059669 0%, #14b8a6 50%, #16a34a 100%)",
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Shimmer overlay */}
            <motion.div 
              className="absolute inset-0 opacity-30"
              style={{
                background: "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["200% 0%", "-200% 0%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating leaves and eco particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Floating leaves */}
              {[...Array(6)].map((_, i) => {
                const leftPosition = (i / 6) * 100;
                const size = 0.5 + (i % 3) * 0.2;
                return (
                  <motion.div
                    key={`leaf-${i}`}
                    className="absolute text-white/20"
                    style={{ left: `${leftPosition}%` }}
                    initial={{ y: "110%", scale: size, rotate: 0, opacity: 0 }}
                    animate={{ 
                      y: ["-10%", "110%"],
                      rotate: [0, 360],
                      opacity: [0, 0.4, 0.4, 0]
                    }}
                    transition={{
                      duration: 14 + (i % 4) * 3,
                      repeat: Infinity,
                      delay: (i / 6) * 5,
                      ease: "linear",
                      opacity: { times: [0, 0.1, 0.9, 1] }
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                    </svg>
                  </motion.div>
                );
              })}
              
              {/* Glowing particles (firefly effect) */}
              {[
                { left: 8, top: 20 },
                { left: 22, top: 65 },
                { left: 35, top: 40 },
                { left: 48, top: 80 },
                { left: 62, top: 25 },
                { left: 75, top: 55 },
                { left: 88, top: 35 },
                { left: 15, top: 75 },
                { left: 42, top: 15 },
                { left: 58, top: 90 },
                { left: 82, top: 70 },
                { left: 95, top: 45 },
              ].map((pos, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-lime-300"
                  style={{ 
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    boxShadow: "0 0 8px 2px rgba(163, 230, 53, 0.6)",
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 2 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 text-center sm:text-left"
              >
                {/* Heart-Leaf Icon */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex-shrink-0 relative"
                >
                  {/* Glow effect behind icon */}
                  <div className="absolute inset-0 blur-lg bg-lime-400/40 rounded-full scale-150" />
                  <svg className="relative w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {/* Small leaf accent */}
                  <motion.svg 
                    className="absolute -top-1 -right-1 w-4 h-4 text-lime-300"
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                  </motion.svg>
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                  {movingHeartsTitle}
                </h2>

                {/* Divider */}
                <span className="hidden sm:block w-px h-8 bg-white/30" />

                {/* Stats */}
                <div className="flex items-center gap-2 text-white/90">
                  <span className="text-xl sm:text-2xl font-semibold">{movingHeartsStatsValue}</span>
                  <span className="text-sm sm:text-base">{movingHeartsStatsLabel}</span>
                </div>

                {/* Divider */}
                <span className="hidden md:block w-px h-8 bg-white/30" />

                {/* Tagline */}
                <p className="hidden md:block text-white/80 text-sm max-w-xs">
                  {movingHeartsTagline}
                </p>

                {/* CTA Button */}
                <a
                  href={movingHeartsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-0 sm:ml-4 px-6 py-2.5 bg-white text-emerald-600 font-semibold rounded-[6px] hover:bg-lime-50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] flex items-center gap-2 group"
                >
                  {movingHeartsCtaText}
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Wavy Bottom Border */}
          <svg className="absolute bottom-0 left-0 w-full h-6" viewBox="0 0 1440 24" preserveAspectRatio="none">
            <motion.path
              d="M0,12 C240,0 480,24 720,12 C960,0 1200,24 1440,12 L1440,24 L0,24 Z"
              fill="#111827"
              animate={{
                d: [
                  "M0,12 C240,0 480,24 720,12 C960,0 1200,24 1440,12 L1440,24 L0,24 Z",
                  "M0,12 C240,24 480,0 720,12 C960,24 1200,0 1440,12 L1440,24 L0,24 Z",
                  "M0,12 C240,0 480,24 720,12 C960,0 1200,24 1440,12 L1440,24 L0,24 Z",
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-mw-gray-800 bg-mw-gray-900/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <p className="text-mw-gray-400 text-sm text-center md:text-left">
                  {copyrightText}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-sm">
                  {legalLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-mw-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  ))}
                  <button 
                    onClick={openCookieSettings}
                    className="text-mw-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Settings
                  </button>
                </div>
              </div>
              {/* Follow Us & Social Links */}
              <div className="flex items-center gap-3">
                <span className="text-mw-gray-400 text-sm hidden md:block">{t('footer.followUs')}</span>
                <div className="flex space-x-2">
                  {socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-mw-gray-800 hover:bg-mw-blue-600 rounded-lg flex items-center justify-center text-mw-gray-400 hover:text-white transition-all duration-200"
                      aria-label={social.platform}
                    >
                      {socialIconMap[social.platform] || null}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
