'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CTAButton } from '@/components/CTAButton'
import Image from 'next/image'
import { useState } from 'react'
import TestimonialSectionClient from '@/components/TestimonialSectionClient'
import { useLocale } from '@/i18n/LocaleContext'

// Types for CMS-managed content
interface AgenciesPageProps {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  heroImage?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  stats?: Array<{ value: string; label: string }>;
  benefits?: Array<{ title: string; description: string; image?: string }>;
  platformSectionTitle?: string;
  platformSectionSubtitle?: string;
  platformFeatures?: Array<{
    id: string;
    tabLabel?: string;
    name: string;
    title: string;
    description: string;
    image?: string;
    features?: string[];
    linkHref?: string;
    linkText?: string;
  }>;
  trustBarTitle?: string;
  customerLogos?: Array<{ name: string; logo?: string }>;
  journeyTitle?: string;
  journeySubtitle?: string;
  journeySteps?: Array<{ stepLabel: string; stepName: string; description: string; items: string[] }>;
  featureGridTitle?: string;
  featureGridSubtitle?: string;
  featureGrid?: Array<{ title: string; description: string; iconName?: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  testimonials?: Array<{
    _id?: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    metric?: string;
    industry?: string;
    image?: { asset: { _ref: string } };
    companyLogo?: { asset: { _ref: string } };
  }>;
}

// Default values for fallback (English literals kept here for the dead/unused fields below;
// title/subtitle/primaryCTA are overridden with translated values inside the component)
const defaultContent = {
  title: "White Label OOH Platform",
  titleHighlight: "Built for Agencies",
  subtitle: "Offer your clients a complete out of home solution under your own brand. Moving Walls gives you global inventory, intelligent campaign planning, and real-time analytics that help your agency act faster, plan smarter, and deliver measurable results.",
  primaryCTA: { text: "Become a Partner", href: "/contact" },
  secondaryCTA: { text: "Watch Demo", href: "#platform" },
  stats: [
    { value: "500K+", label: "OOH Sites Globally" },
    { value: "30+", label: "Markets Covered" },
    { value: "100+", label: "Agency Partners" },
    { value: "24/7", label: "Expert Support" },
  ],
  benefits: [
    { title: "Global Inventory Access", description: "Access OOH inventory across multiple markets from a single platform" },
    { title: "White Label Solution", description: "Present the platform under your own brand identity" },
    { title: "Real-time Analytics", description: "Track campaign performance with live reporting dashboards" },
    { title: "Intelligent Planning", description: "AI-powered recommendations for optimal media mix" },
  ],
  platformFeatures: [
    {
      id: "planning",
      name: "Planning",
      title: "Customisable Planning",
      description: "Our planning tool integrates with your current workflows with custom audiences, site scores, and negotiation features.",
      linkHref: "/mw-planner",
      linkText: "Learn more",
    },
    {
      id: "reach",
      name: "Extended Reach",
      title: "Integrated Planning",
      description: "Extend OOH planning to mobile platforms and extract audience lists for retargeting.",
      linkHref: "/mw-reach",
      linkText: "Learn more",
    },
    {
      id: "support",
      name: "Support",
      title: "Live Support",
      description: "Our platform provides live support from OOH experts readily available for inquiries.",
      linkHref: "/contact",
      linkText: "Contact us",
    },
  ],
  faqs: [
    {
      question: "How does white labeling work?",
      answer: "You can customize the platform with your agency's branding, including logo, colors, and domain name."
    },
    {
      question: "What markets are available?",
      answer: "We cover 30+ markets across Asia Pacific, Europe, Middle East, and the Americas."
    },
    {
      question: "Is training provided?",
      answer: "Yes, we provide comprehensive onboarding and ongoing training for your team."
    },
  ],
};

export default function AgenciesPageClient(props: AgenciesPageProps) {
  const { t } = useLocale();

  // Merge props with defaults
  const content = {
    title: props.title || t('agenciesPage.hero.title'),
    titleHighlight: props.titleHighlight || t('agenciesPage.hero.titleHighlight'),
    subtitle: props.subtitle || t('agenciesPage.hero.subtitle'),
    primaryCTA: props.primaryCTA || { text: t('agenciesPage.hero.primaryCta'), href: defaultContent.primaryCTA.href },
    secondaryCTA: props.secondaryCTA || defaultContent.secondaryCTA,
    stats: props.stats?.length ? props.stats : defaultContent.stats,
    benefits: props.benefits?.length ? props.benefits : defaultContent.benefits,
    platformFeatures: props.platformFeatures?.length ? props.platformFeatures : defaultContent.platformFeatures,
    faqs: props.faqs?.length ? props.faqs : defaultContent.faqs,
  };

  // Trust bar logos - CMS or fallback
  const trustBarTitle = props.trustBarTitle || t('agenciesPage.trustBar.title');
  const cmsLogosWithImages = (props.customerLogos || []).filter(l => l.logo);
  const customerLogos = cmsLogosWithImages.length ? cmsLogosWithImages : [
    { name: 'Coca-Cola', logo: '/assets/images/our-customers-logos/coca-cola.png' },
    { name: "McDonald's", logo: '/assets/images/our-customers-logos/mcdonalds.png' },
    { name: 'Samsung', logo: '/assets/images/our-customers-logos/samsung.png' },
    { name: 'Netflix', logo: '/assets/images/our-customers-logos/netflix.png' },
    { name: 'Dell', logo: '/assets/images/our-customers-logos/dell.png' },
    { name: 'Bosch', logo: '/assets/images/our-customers-logos/bosch.png' },
    { name: "L'Oreal Paris", logo: '/assets/images/our-customers-logos/l_oreal paris.png' },
    { name: 'Sunsilk', logo: '/assets/images/our-customers-logos/sunsilk.png' },
    { name: 'AirAsia', logo: '/assets/images/our-customers-logos/airasia.png' },
    { name: 'Grab', logo: '/assets/images/our-customers-logos/grab.png' },
    { name: 'Foodpanda', logo: '/assets/images/our-customers-logos/foodpanda.png' },
    { name: 'Lalamove', logo: '/assets/images/our-customers-logos/lalamove.png' },
    { name: 'HBO Go', logo: '/assets/images/our-customers-logos/hbo-go.png' },
    { name: 'Astro', logo: '/assets/images/our-customers-logos/astro.png' },
    { name: 'Gamuda', logo: '/assets/images/our-customers-logos/gamuda.png' },
    { name: 'Laguna', logo: '/assets/images/our-customers-logos/laguna.png' },
    { name: 'SeaOil', logo: '/assets/images/our-customers-logos/seaoil.png' },
    { name: 'Fair Price', logo: '/assets/images/our-customers-logos/fair-price.png' },
  ];

  // Journey section - CMS or fallback
  const journeyTitle = props.journeyTitle || t('agenciesPage.journey.title');
  const journeySubtitle = props.journeySubtitle || t('agenciesPage.journey.subtitle');
  const journeySteps = props.journeySteps?.length ? props.journeySteps : [
    { stepLabel: t('agenciesPage.journey.old.stepLabel'), stepName: t('agenciesPage.journey.old.stepName'), description: '', items: t('agenciesPage.journey.old.items') },
    { stepLabel: t('agenciesPage.journey.transformation.stepLabel'), stepName: t('agenciesPage.journey.transformation.stepName'), description: t('agenciesPage.journey.transformation.description'), items: t('agenciesPage.journey.transformation.items') },
    { stepLabel: t('agenciesPage.journey.new.stepLabel'), stepName: t('agenciesPage.journey.new.stepName'), description: '', items: t('agenciesPage.journey.new.items') },
  ];

  // Feature grid section - CMS or fallback
  const featureGridTitle = props.featureGridTitle || t('agenciesPage.featureGrid.title');
  const featureGridSubtitle = props.featureGridSubtitle || t('agenciesPage.featureGrid.subtitle');
  const featureGrid = props.featureGrid?.length ? props.featureGrid : t('agenciesPage.featureGrid.items');

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activePlatform, setActivePlatform] = useState('planning')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Isometric City */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background Stars */}
        <div className="absolute inset-0">
          {[
            { left: 5, top: 10 }, { left: 15, top: 25 }, { left: 25, top: 5 }, { left: 35, top: 45 },
            { left: 45, top: 15 }, { left: 55, top: 35 }, { left: 65, top: 8 }, { left: 75, top: 55 },
            { left: 85, top: 20 }, { left: 95, top: 40 }, { left: 10, top: 60 }, { left: 20, top: 75 },
            { left: 30, top: 85 }, { left: 40, top: 65 }, { left: 50, top: 90 }, { left: 60, top: 70 },
            { left: 70, top: 80 }, { left: 80, top: 95 }, { left: 90, top: 72 }, { left: 8, top: 88 },
            { left: 18, top: 42 }, { left: 28, top: 58 }, { left: 38, top: 22 }, { left: 48, top: 78 },
            { left: 58, top: 12 }, { left: 68, top: 48 }, { left: 78, top: 32 }, { left: 88, top: 62 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: (i % 5) * 0.4,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {content.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                  {content.titleHighlight}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-xl mb-8 leading-relaxed">
                {content.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton
                  href={content.primaryCTA.href}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all hover:scale-105 shadow-lg"
                >
                  {content.primaryCTA.text}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </CTAButton>
              </div>
            </motion.div>

            {/* Right Side - Hero Image or Isometric City with Animated Screens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              {props.heroImage ? (
                <div className="relative w-full max-w-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={props.heroImage}
                    alt={content.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              ) : (
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px]" style={{ perspective: '1200px' }}>
                {/* Isometric City Container */}
                <motion.div
                  className="absolute inset-0"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(60deg) rotateZ(-45deg)',
                  }}
                >
                  {/* City Base/Ground */}
                  <div 
                    className="absolute left-1/2 top-1/2 w-72 h-72 bg-gradient-to-br from-blue-800/50 to-indigo-900/50 rounded-lg"
                    style={{ transform: 'translate(-50%, -50%) translateZ(-20px)' }}
                  />
                  
                  {/* Grid Lines on Ground */}
                  <div className="absolute left-1/2 top-1/2 w-72 h-72" style={{ transform: 'translate(-50%, -50%) translateZ(-19px)' }}>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div key={`h-${i}`} className="absolute w-full h-px bg-blue-400/20" style={{ top: `${i * 20}%` }} />
                    ))}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div key={`v-${i}`} className="absolute h-full w-px bg-blue-400/20" style={{ left: `${i * 20}%` }} />
                    ))}
                  </div>

                  {/* Isometric Buildings */}
                  {[
                    { x: -60, y: -40, height: 80, width: 40, color: 'blue', hasScreen: true, screenDelay: 0 },
                    { x: 20, y: -60, height: 100, width: 35, color: 'indigo', hasScreen: true, screenDelay: 0.3 },
                    { x: -30, y: 30, height: 60, width: 45, color: 'blue', hasScreen: true, screenDelay: 0.6 },
                    { x: 50, y: 10, height: 70, width: 38, color: 'indigo', hasScreen: false, screenDelay: 0 },
                    { x: -70, y: 20, height: 50, width: 30, color: 'blue', hasScreen: false, screenDelay: 0 },
                    { x: 60, y: -30, height: 55, width: 32, color: 'indigo', hasScreen: true, screenDelay: 0.9 },
                    { x: 0, y: 0, height: 90, width: 42, color: 'purple', hasScreen: true, screenDelay: 1.2 },
                  ].map((building, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${building.x}px)`,
                        top: `calc(50% + ${building.y}px)`,
                        transformStyle: 'preserve-3d',
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    >
                      {/* Building Side Face (right) */}
                      <div
                        className={`absolute ${
                          building.color === 'blue' ? 'bg-blue-800' :
                          building.color === 'indigo' ? 'bg-indigo-800' :
                          'bg-purple-800'
                        }`}
                        style={{
                          width: `${building.height}px`,
                          height: `${building.width * 0.6}px`,
                          left: `${building.width / 2}px`,
                          top: `${-building.width * 0.3}px`,
                          transform: 'rotateY(-90deg)',
                          transformOrigin: 'left',
                        }}
                      />

                      {/* Building Front Face */}
                      <div
                        className={`absolute bg-gradient-to-t ${
                          building.color === 'blue' ? 'from-blue-700 to-blue-500' :
                          building.color === 'indigo' ? 'from-indigo-700 to-indigo-500' :
                          'from-purple-700 to-purple-500'
                        }`}
                        style={{
                          width: `${building.width}px`,
                          height: `${building.height}px`,
                          left: `${-building.width / 2}px`,
                          top: `${building.width * 0.3 - building.height}px`,
                          transform: 'rotateX(-90deg)',
                          transformOrigin: 'bottom',
                          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
                        }}
                      >
                        {/* Windows */}
                        <div className="absolute inset-2 grid grid-cols-3 gap-1">
                          {[...Array(9)].map((_, wi) => (
                            <motion.div
                              key={wi}
                              className="bg-yellow-300/60 rounded-sm"
                              animate={{ opacity: [0.3, 0.8, 0.3] }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: wi * 0.2 + i * 0.1 
                              }}
                            />
                          ))}
                        </div>
                        
                        {/* Digital Screen on Building */}
                        {building.hasScreen && (
                          <motion.div
                            className="absolute -right-2 top-1/4 w-8 h-6 rounded overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                              boxShadow: '0 0 15px rgba(14, 165, 233, 0.6)',
                            }}
                            animate={{
                              boxShadow: [
                                '0 0 15px rgba(14, 165, 233, 0.4)',
                                '0 0 25px rgba(14, 165, 233, 0.8)',
                                '0 0 15px rgba(14, 165, 233, 0.4)',
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: building.screenDelay }}
                          >
                            <motion.div
                              className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: building.screenDelay }}
                            />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Building Roof (top face) */}
                      <div
                        className={`absolute ${
                          building.color === 'blue' ? 'bg-blue-400' :
                          building.color === 'indigo' ? 'bg-indigo-400' :
                          'bg-purple-400'
                        }`}
                        style={{
                          width: `${building.width}px`,
                          height: `${building.width * 0.6}px`,
                          left: `${-building.width / 2}px`,
                          top: `${-building.width * 0.3}px`,
                          transform: `translateZ(${building.height}px)`,
                        }}
                      />
                    </motion.div>
                  ))}

                  {/* Street Level Digital Screens */}
                  {[
                    { x: -80, y: -10, delay: 0.2 },
                    { x: 80, y: 40, delay: 0.5 },
                    { x: 30, y: -80, delay: 0.8 },
                  ].map((screen, i) => (
                    <motion.div
                      key={`street-${i}`}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${screen.x}px)`,
                        top: `calc(50% + ${screen.y}px)`,
                        x: '-50%',
                        y: '-100%',
                        rotateX: -90,
                        transformOrigin: 'bottom',
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + screen.delay }}
                    >
                      {/* Screen Frame */}
                      <motion.div
                        className="w-10 h-14 rounded bg-gradient-to-t from-gray-700 to-gray-500"
                        style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
                      >
                        <motion.div
                          className="absolute top-1 left-1 right-1 bottom-4 rounded overflow-hidden"
                          style={{
                            background: 'linear-gradient(180deg, #06b6d4, #3b82f6)',
                            boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
                          }}
                          animate={{
                            background: [
                              'linear-gradient(180deg, #06b6d4, #3b82f6)',
                              'linear-gradient(180deg, #8b5cf6, #ec4899)',
                              'linear-gradient(180deg, #10b981, #06b6d4)',
                              'linear-gradient(180deg, #06b6d4, #3b82f6)',
                            ]
                          }}
                          transition={{ duration: 4, repeat: Infinity, delay: screen.delay }}
                        />
                      </motion.div>
                      {/* Stand */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-600" />
                    </motion.div>
                  ))}

                  {/* Animated Data Particles Rising */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={`data-${i}`}
                      className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-cyan-400"
                      style={{ 
                        marginLeft: `${(i - 2) * 30}px`,
                        boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
                      }}
                      animate={{
                        z: [0, 100],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </motion.div>


              </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('agenciesPage.platformSection.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('agenciesPage.platformSection.subtitle')}
            </p>
          </motion.div>

          {/* Row Tabs */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex border border-gray-200 p-1.5 rounded-xl gap-1 flex-wrap justify-center">
              {[
                { id: 'planning', name: t('agenciesPage.platformSection.tabs.planning') },
                { id: 'reach', name: t('agenciesPage.platformSection.tabs.reach') },
                { id: 'support', name: t('agenciesPage.platformSection.tabs.support') },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatform(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activePlatform === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activePlatform === 'planning' && (
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('agenciesPage.platformSection.planning.title')}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t('agenciesPage.platformSection.planning.description')}
                  </p>
                  <Link href="/mw-planner" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all text-sm">
                    {t('agenciesPage.platformSection.planning.linkText')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 aspect-[4/3] flex items-center justify-center">
                  <div className="w-full h-full flex flex-col">
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                        <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
                        <div className="h-8 w-full bg-blue-100 rounded"></div>
                      </div>
                      <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                        <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
                        <div className="h-8 w-full bg-blue-100 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                      <div className="h-full bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg flex items-center justify-center">
                        <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activePlatform === 'reach' && (
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('agenciesPage.platformSection.reach.title')}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t('agenciesPage.platformSection.reach.description')}
                  </p>
                  <Link href="/mw-reach" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all text-sm">
                    {t('agenciesPage.platformSection.reach.linkText')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 aspect-[4/3] flex items-center justify-center">
                  <div className="w-full h-full grid grid-cols-3 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg mb-2 flex items-center justify-center">
                          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activePlatform === 'support' && (
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('agenciesPage.platformSection.support.title')}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t('agenciesPage.platformSection.support.description')}
                  </p>
                  <CTAButton href="/contact" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all text-sm">
                    {t('agenciesPage.platformSection.support.linkText')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </CTAButton>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 aspect-[4/3] flex items-center justify-center">
                  <div className="w-full h-full flex flex-col gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-32 bg-gray-200 rounded mb-1"></div>
                          <div className="h-2 w-24 bg-gray-100 rounded"></div>
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full font-semibold">Online</div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                        <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                      <div className="h-full bg-gradient-to-r from-indigo-100 to-purple-100 rounded flex items-center justify-center">
                        <svg className="w-12 h-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-gray-50 border-b overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 mb-8 font-semibold">{trustBarTitle}</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          <div className="flex overflow-hidden">
            <motion.div
              className="flex items-center gap-16 pr-16"
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
            >
              {customerLogos.map((brand, i) => (
                <div key={i} className="flex-shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={brand.logo || ''} 
                    alt={brand.name}
                    className="h-8 w-auto max-w-[120px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
              {customerLogos.map((brand, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={brand.logo || ''} 
                    alt={brand.name}
                    className="h-8 w-auto max-w-[120px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Journey Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {journeyTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {journeySubtitle}
            </p>
          </motion.div>

          <div className="relative">
            {/* Animated Particle Stream Path */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-blue-300 to-green-200 opacity-40"></div>
              
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(239,68,68,1) 0%, rgba(239,68,68,0) 70%)',
                    boxShadow: '0 0 20px 5px rgba(239,68,68,0.6)',
                  }}
                  animate={{
                    x: ['0%', '33%'],
                    background: [
                      'radial-gradient(circle, rgba(239,68,68,1) 0%, rgba(239,68,68,0) 70%)',
                      'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(59,130,246,0) 70%)',
                    ],
                    boxShadow: [
                      '0 0 20px 5px rgba(239,68,68,0.6)',
                      '0 0 30px 10px rgba(59,130,246,0.8)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 left-[33%] w-6 h-6 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(139,92,246,0.5) 50%, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      '0 0 20px 5px rgba(59,130,246,0.4)',
                      '0 0 40px 15px rgba(139,92,246,0.8)',
                      '0 0 20px 5px rgba(59,130,246,0.4)',
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 1.8,
                  }}
                />
                
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-[50%] w-2 h-2 rounded-full bg-white"
                    style={{
                      boxShadow: '0 0 10px 3px rgba(255,255,255,0.8)',
                    }}
                    animate={{
                      x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 10)],
                      y: [0, (i < 3 ? -1 : 1) * (15 + i * 5)],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: 2 + i * 0.15,
                      ease: 'easeOut',
                    }}
                  />
                ))}
                
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(59,130,246,0) 70%)',
                    boxShadow: '0 0 20px 5px rgba(59,130,246,0.6)',
                  }}
                  animate={{
                    x: ['50%', '100%'],
                    background: [
                      'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(59,130,246,0) 70%)',
                      'radial-gradient(circle, rgba(34,197,94,1) 0%, rgba(34,197,94,0) 70%)',
                    ],
                    boxShadow: [
                      '0 0 30px 10px rgba(59,130,246,0.8)',
                      '0 0 25px 8px rgba(34,197,94,0.7)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 2.5,
                    ease: 'easeOut',
                  }}
                />
                
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`trail-red-${i}`}
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-400"
                    style={{ opacity: 0.6 - i * 0.15 }}
                    animate={{
                      x: ['0%', '30%'],
                      opacity: [0.6 - i * 0.15, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
                
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`trail-green-${i}`}
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-400"
                    style={{ opacity: 0.7 - i * 0.15 }}
                    animate={{
                      x: ['55%', '100%'],
                      opacity: [0.7 - i * 0.15, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 2.8 + i * 0.2,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>
              
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
              {/* Old Way */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 border-2 border-gray-300 shadow-lg h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">{journeySteps[0]?.stepLabel || t('agenciesPage.journey.old.stepLabel')}</span>
                      <h3 className="text-xl font-bold text-gray-800">{journeySteps[0]?.stepName || t('agenciesPage.journey.old.stepName')}</h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {(journeySteps[0]?.items || t('agenciesPage.journey.old.items')).map((item: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-white/60 rounded-lg p-3"
                      >
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Transformation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-2xl h-full transform lg:-translate-y-4">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                      {journeySteps[1]?.stepLabel || t('agenciesPage.journey.transformation.stepLabel')}
                    </span>
                  </div>
                  <div className="text-center mb-6 pt-4">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{journeySteps[1]?.stepName || t('agenciesPage.journey.transformation.stepName')}</h3>
                    <p className="text-blue-200 text-sm">{journeySteps[1]?.description || t('agenciesPage.journey.transformation.description')}</p>
                  </div>
                  <div className="space-y-3">
                    {(journeySteps[1]?.items || t('agenciesPage.journey.transformation.items')).map((feature: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-green-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white font-medium text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <CTAButton href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all text-sm">
                      {t('agenciesPage.journey.transformation.cta')}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </CTAButton>
                  </div>
                </div>
                <div className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* New Way */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border-2 border-green-300 shadow-lg h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wider">{journeySteps[2]?.stepLabel || t('agenciesPage.journey.new.stepLabel')}</span>
                      <h3 className="text-xl font-bold text-gray-800">{journeySteps[2]?.stepName || t('agenciesPage.journey.new.stepName')}</h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {(journeySteps[2]?.items || t('agenciesPage.journey.new.items')).map((item: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 bg-white/80 rounded-lg p-3"
                      >
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:hidden flex flex-col items-center gap-4 my-8">
              <svg className="w-8 h-8 text-blue-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {featureGridTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {featureGridSubtitle}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(() => {
              const featureIcons = [
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>, color: 'from-blue-500 to-blue-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, color: 'from-indigo-500 to-indigo-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, color: 'from-purple-500 to-purple-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, color: 'from-pink-500 to-pink-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'from-yellow-500 to-yellow-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'from-green-500 to-green-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, color: 'from-cyan-500 to-cyan-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>, color: 'from-teal-500 to-teal-600' },
              ];
              return featureGrid.map((feature: { title: string; description: string }, index: number) => {
                const visual = featureIcons[index % featureIcons.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${visual.color} p-3 text-white mb-6 group-hover:scale-110 transition-transform`}>
                      {visual.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* Platform Integration Section */}
      <section className="py-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              {t('agenciesPage.platformSuite.title')}
            </h2>
            <p className="text-xl text-mw-gray-600">
              {t('agenciesPage.platformSuite.subtitle')}
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
            {/* Featured Card - MW Planner (spans 2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-mw-blue-600 via-mw-blue-700 to-purple-700 rounded-2xl p-8 md:p-10 shadow-mw-xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm mb-6 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t('agenciesPage.platformSuite.cards.planner.title')}</h3>
                <p className="text-blue-100 text-lg mb-6 max-w-md">{t('agenciesPage.platformSuite.cards.planner.description')}</p>
                <Link href="/mw-planner" className="inline-flex items-center gap-2 text-white font-semibold text-sm bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-lg transition-all">
                  {t('agenciesPage.platformSuite.learnMore')}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* MW Marketplace */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.999 2.999 0 01.79-1.89l1.72-1.72A.75.75 0 016.04 5.5h11.92a.75.75 0 01.53.22l1.72 1.72a3 3 0 01.79 1.89" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{t('agenciesPage.platformSuite.cards.marketplace.title')}</h3>
              <p className="text-mw-gray-600 text-sm mb-4">{t('agenciesPage.platformSuite.cards.marketplace.description')}</p>
              <Link href="/mw-market" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                {t('agenciesPage.platformSuite.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* MW Studio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{t('agenciesPage.platformSuite.cards.studio.title')}</h3>
              <p className="text-mw-gray-600 text-sm mb-4">{t('agenciesPage.platformSuite.cards.studio.description')}</p>
              <Link href="/mw-studio" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                {t('agenciesPage.platformSuite.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Row 3: MW Activate, MW Measure, MW Science, MW Influence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{t('agenciesPage.platformSuite.cards.activate.title')}</h3>
              <p className="text-mw-gray-600 text-sm mb-4">{t('agenciesPage.platformSuite.cards.activate.description')}</p>
              <Link href="/mw-activate" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                {t('agenciesPage.platformSuite.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{t('agenciesPage.platformSuite.cards.measure.title')}</h3>
              <p className="text-mw-gray-600 text-sm mb-4">{t('agenciesPage.platformSuite.cards.measure.description')}</p>
              <Link href="/mw-measure" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                {t('agenciesPage.platformSuite.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{t('agenciesPage.platformSuite.cards.science.title')}</h3>
              <p className="text-mw-gray-600 text-sm mb-4">{t('agenciesPage.platformSuite.cards.science.description')}</p>
              <Link href="/mw-science" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                {t('agenciesPage.platformSuite.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border border-mw-blue-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mw-blue-500 to-purple-600 mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{t('agenciesPage.platformSuite.cards.influence.title')}</h3>
              <p className="text-mw-gray-600 text-sm mb-4">{t('agenciesPage.platformSuite.cards.influence.description')}</p>
              <Link href="/mw-influence" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                {t('agenciesPage.platformSuite.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSectionClient testimonials={props.testimonials} />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('agenciesPage.faq.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('agenciesPage.faq.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {(t('agenciesPage.faq.items') as Array<{ question: string; answer: string }>).map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-8">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? 'auto' : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
