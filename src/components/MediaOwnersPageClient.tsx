'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import TestimonialSectionClient from '@/components/TestimonialSectionClient'

// Types for CMS-managed content
interface MediaOwnersPageProps {
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

// Default values for fallback
const defaultContent = {
  title: "Monetize Your OOH Inventory",
  titleHighlight: "Smarter",
  subtitle: "Turn your screens into a high-performing revenue engine. Connect to premium advertisers, optimize pricing dynamically, and automate your entire OOH sales operation so your team can focus on growth instead of repetitive tasks.",
  primaryCTA: { text: "Join Our Network", href: "/contact" },
  secondaryCTA: { text: "Learn More", href: "#platform" },
  stats: [
    { value: "40%", label: "Revenue Increase" },
    { value: "90%", label: "Fill Rate" },
    { value: "50%", label: "Ops Time Saved" },
    { value: "1000+", label: "Active Advertisers" },
  ],
  benefits: [
    { title: "Increased Fill Rates", description: "Connect to more demand sources and reduce unsold inventory" },
    { title: "Dynamic Pricing", description: "Optimize pricing based on demand and market conditions" },
    { title: "Automated Operations", description: "Reduce manual work with automated booking and scheduling" },
    { title: "Premium Demand Access", description: "Connect directly with agency and brand advertisers" },
  ],
  platformFeatures: [
    {
      id: "marketplace",
      name: "Marketplace",
      title: "Connect to Premium Demand",
      description: "Connect your OOH inventory to an integrated demand marketplace designed for media owners.",
      linkHref: "/mw-market",
      linkText: "Learn more",
    },
    {
      id: "inventory",
      name: "Inventory",
      title: "Manage Your Assets",
      description: "Centralize all your OOH assets in one platform. Track availability, manage bookings, and optimize inventory.",
      linkHref: "/products",
      linkText: "Learn more",
    },
    {
      id: "yield",
      name: "Yield",
      title: "Maximize Revenue",
      description: "Use dynamic pricing and yield optimization tools to maximize the value of every screen.",
      linkHref: "/products",
      linkText: "Learn more",
    },
  ],
  faqs: [
    {
      question: "How do I connect my inventory?",
      answer: "We provide API integration and manual upload options. Our team will help you onboard your entire network."
    },
    {
      question: "What pricing models are supported?",
      answer: "We support CPM, fixed rate, share of voice, and custom pricing models."
    },
    {
      question: "Can I maintain direct sales relationships?",
      answer: "Absolutely. Our platform complements your direct sales with additional demand sources."
    },
  ],
};

export default function MediaOwnersPageClient(props: MediaOwnersPageProps) {
  // Merge props with defaults
  const content = {
    title: props.title || defaultContent.title,
    titleHighlight: props.titleHighlight || defaultContent.titleHighlight,
    subtitle: props.subtitle || defaultContent.subtitle,
    primaryCTA: props.primaryCTA || defaultContent.primaryCTA,
    secondaryCTA: props.secondaryCTA || defaultContent.secondaryCTA,
    stats: props.stats?.length ? props.stats : defaultContent.stats,
    benefits: props.benefits?.length ? props.benefits : defaultContent.benefits,
    platformFeatures: props.platformFeatures?.length ? props.platformFeatures : defaultContent.platformFeatures,
    faqs: props.faqs?.length ? props.faqs : defaultContent.faqs,
  };

  // Trust bar logos - CMS or fallback
  const trustBarTitle = props.trustBarTitle || 'TRUSTED BY LEADING MEDIA OWNERS WORLDWIDE';
  const customerLogos = props.customerLogos?.length ? props.customerLogos : [
    { name: '3thirds Inc', logo: '/assets/images/media-owners/3thirds-inc.png' },
    { name: 'Act Media', logo: '/assets/images/media-owners/act-media.png' },
    { name: 'Aqua Corporation', logo: '/assets/images/media-owners/aqua-corporation.png' },
    { name: 'Brands on Road', logo: '/assets/images/media-owners/brands-on-road.png' },
    { name: 'Bright Sky', logo: '/assets/images/media-owners/bright-sky.png' },
    { name: 'Eye', logo: '/assets/images/media-owners/eye.png' },
    { name: 'FC Media', logo: '/assets/images/media-owners/fc-media.png' },
    { name: 'Focus Media Network', logo: '/assets/images/media-owners/focus-media-network.png' },
    { name: 'Lantern Media', logo: '/assets/images/media-owners/lantern-media.png' },
    { name: 'Medik TV', logo: '/assets/images/media-owners/medik-tv.png' },
    { name: 'Ming Media Promotion', logo: '/assets/images/media-owners/ming-media-promotion.png' },
    { name: 'Moove Media', logo: '/assets/images/media-owners/moove-media.png' },
    { name: 'Phar', logo: '/assets/images/media-owners/phar.png' },
    { name: 'Primedia Outdoor', logo: '/assets/images/media-owners/primedia-outdoor.png' },
    { name: 'Spectrum Outdoor', logo: '/assets/images/media-owners/spectrum-outdoor.png' },
    { name: 'Times OOH', logo: '/assets/images/media-owners/times-ooh.png' },
    { name: 'Vlink Interactive', logo: '/assets/images/media-owners/vlink-interactive.png' },
    { name: 'Warna Warni', logo: '/assets/images/media-owners/warna-warni.png' },
  ];

  // Journey section - CMS or fallback
  const journeyTitle = props.journeyTitle || 'From Inefficiency to Maximum Yield';
  const journeySubtitle = props.journeySubtitle || 'See how Moving Walls transforms your inventory monetization';
  const journeySteps = props.journeySteps?.length ? props.journeySteps : [
    { stepLabel: 'The Old Way', stepName: 'Challenges', description: '', items: ['Low fill rates', 'Limited demand access', 'Manual booking', 'No real-time insights', 'Complicated pricing slowed growth'] },
    { stepLabel: 'Transformation', stepName: 'Moving Walls SSP', description: 'Your complete monetization solution', items: ['Premium demand access', 'Automated yield optimization', 'Real-time analytics', 'Fully streamlined workflows'] },
    { stepLabel: 'Results for Media Owners', stepName: 'Results', description: '', items: ['95% fill rate achieved', '+35% eCPM improvement', 'Global demand access', 'Real-time performance insights', '80% operations time saved'] },
  ];

  // Feature grid section - CMS or fallback
  const featureGridTitle = props.featureGridTitle || 'Everything Media Owners Need to Succeed';
  const featureGridSubtitle = props.featureGridSubtitle || '';
  const featureGrid = props.featureGrid?.length ? props.featureGrid : [
    { title: 'SSP Technology', description: 'Connect to programmatic demand and premium advertisers globally while keeping full control over pricing and availability' },
    { title: 'Inventory Management', description: 'Centralized dashboard to oversee all screens, campaigns, and pricing rules at a glance' },
    { title: 'Yield Optimization', description: 'Continuous optimization to ensure every impression is sold at maximum value' },
    { title: 'Proof of Play', description: 'Automated verification and reporting for every campaign' },
    { title: 'Demand Connections', description: 'Direct integrations with agencies, DSPs, and brand advertisers around the world' },
    { title: 'Revenue Analytics', description: 'Real-time dashboards to monitor fill rates, revenue trends, and eCPM growth' },
    { title: 'Creative Trafficking', description: 'Automatic scheduling and delivery of creative content to screens' },
    { title: 'Billing & Invoicing', description: 'Automated reconciliation and financial reporting' },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activePlatform, setActivePlatform] = useState('marketplace')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Globe */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-700 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background Stars - Fixed positions */}
        <div className="absolute inset-0">
          {[
            { left: 5, top: 10 }, { left: 15, top: 25 }, { left: 25, top: 5 }, { left: 35, top: 45 },
            { left: 45, top: 15 }, { left: 55, top: 35 }, { left: 65, top: 8 }, { left: 75, top: 55 },
            { left: 85, top: 20 }, { left: 95, top: 40 }, { left: 10, top: 60 }, { left: 20, top: 75 },
            { left: 30, top: 85 }, { left: 40, top: 65 }, { left: 50, top: 90 }, { left: 60, top: 70 },
            { left: 70, top: 80 }, { left: 80, top: 95 }, { left: 90, top: 72 }, { left: 8, top: 88 },
            { left: 18, top: 42 }, { left: 28, top: 58 }, { left: 38, top: 22 }, { left: 48, top: 78 },
            { left: 58, top: 12 }, { left: 68, top: 48 }, { left: 78, top: 32 }, { left: 88, top: 62 },
            { left: 3, top: 35 }, { left: 13, top: 92 }, { left: 23, top: 18 }, { left: 33, top: 52 },
            { left: 43, top: 28 }, { left: 53, top: 82 }, { left: 63, top: 38 }, { left: 73, top: 68 },
            { left: 83, top: 15 }, { left: 93, top: 58 }, { left: 7, top: 72 }, { left: 17, top: 48 },
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                  {content.titleHighlight}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-mw-blue-100 max-w-xl mb-8 leading-relaxed">
                {content.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={content.primaryCTA.href}
                  className="inline-flex items-center justify-center gap-2 bg-white text-mw-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-mw-gray-50 transition-all hover:scale-105 shadow-lg"
                >
                  {content.primaryCTA.text}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Hero Image or 3D Billboard Network Grid */}
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
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px]">
                {/* 3D Billboard Network Container */}
                <motion.div
                  className="absolute inset-0"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  {/* Network Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translateZ(0px)' }}>
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                        <stop offset="50%" stopColor="rgba(6, 182, 212, 0.6)" />
                        <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                      </linearGradient>
                    </defs>
                    {/* Connection lines between billboards */}
                    {[
                      { x1: '50%', y1: '20%', x2: '20%', y2: '40%' },
                      { x1: '50%', y1: '20%', x2: '80%', y2: '35%' },
                      { x1: '20%', y1: '40%', x2: '35%', y2: '70%' },
                      { x1: '80%', y1: '35%', x2: '70%', y2: '65%' },
                      { x1: '35%', y1: '70%', x2: '70%', y2: '65%' },
                      { x1: '50%', y1: '20%', x2: '50%', y2: '50%' },
                      { x1: '20%', y1: '40%', x2: '50%', y2: '50%' },
                      { x1: '80%', y1: '35%', x2: '50%', y2: '50%' },
                    ].map((line, i) => (
                      <motion.line
                        key={i}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="url(#lineGradient)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
                        transition={{
                          pathLength: { duration: 2, delay: i * 0.2 },
                          opacity: { duration: 3, repeat: Infinity, delay: i * 0.3 }
                        }}
                      />
                    ))}
                  </svg>

                  {/* Central Hub Node */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20"
                    style={{ transform: 'translateZ(30px)' }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-2xl shadow-cyan-500/50 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-cyan-400"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* 3D Billboards arranged in network */}
                  {[
                    { x: '50%', y: '15%', z: 40, rotateX: -15, rotateY: 0, size: 'lg', color: 'cyan', delay: 0 },
                    { x: '15%', y: '38%', z: 25, rotateX: 0, rotateY: 25, size: 'md', color: 'blue', delay: 0.3 },
                    { x: '85%', y: '32%', z: 35, rotateX: 5, rotateY: -20, size: 'lg', color: 'cyan', delay: 0.6 },
                    { x: '30%', y: '72%', z: 20, rotateX: 10, rotateY: 15, size: 'md', color: 'indigo', delay: 0.9 },
                    { x: '75%', y: '68%', z: 30, rotateX: 5, rotateY: -10, size: 'lg', color: 'blue', delay: 1.2 },
                  ].map((billboard, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: billboard.x,
                        top: billboard.y,
                        transform: `translate(-50%, -50%) translateZ(${billboard.z}px) rotateX(${billboard.rotateX}deg) rotateY(${billboard.rotateY}deg)`,
                        transformStyle: 'preserve-3d',
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: billboard.delay, duration: 0.5 }}
                    >
                      {/* Billboard Frame */}
                      <motion.div
                        className={`${billboard.size === 'lg' ? 'w-20 h-14' : 'w-16 h-11'} rounded-lg overflow-hidden shadow-xl`}
                        style={{
                          background: `linear-gradient(135deg, ${billboard.color === 'cyan' ? '#0891b2' : billboard.color === 'blue' ? '#2563eb' : '#4f46e5'}, ${billboard.color === 'cyan' ? '#06b6d4' : billboard.color === 'blue' ? '#3b82f6' : '#6366f1'})`,
                          boxShadow: `0 10px 40px -10px ${billboard.color === 'cyan' ? 'rgba(6, 182, 212, 0.5)' : billboard.color === 'blue' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(99, 102, 241, 0.5)'}`,
                        }}
                        animate={{ 
                          boxShadow: [
                            `0 10px 40px -10px ${billboard.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : billboard.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
                            `0 10px 40px -10px ${billboard.color === 'cyan' ? 'rgba(6, 182, 212, 0.7)' : billboard.color === 'blue' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(99, 102, 241, 0.7)'}`,
                            `0 10px 40px -10px ${billboard.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : billboard.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: billboard.delay }}
                      >
                        {/* Screen Content Animation */}
                        <div className="w-full h-full p-1.5 flex flex-col gap-1">
                          <motion.div
                            className="flex-1 bg-white/20 rounded"
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: billboard.delay + 0.5 }}
                          />
                          <div className="flex gap-1">
                            <motion.div
                              className="flex-1 h-1.5 bg-white/30 rounded"
                              animate={{ scaleX: [0.5, 1, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity, delay: billboard.delay }}
                            />
                            <div className="w-3 h-1.5 bg-white/40 rounded" />
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Billboard Stand */}
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-gray-400 to-gray-600"
                        style={{ top: '100%', transformOrigin: 'top' }}
                      />
                      
                      {/* Status Indicator */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: billboard.delay }}
                        style={{ boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)' }}
                      />
                    </motion.div>
                  ))}

                  {/* Data Flow Particles */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-2 h-2 rounded-full bg-cyan-400"
                      style={{
                        left: '50%',
                        top: '50%',
                        boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
                      }}
                      animate={{
                        x: [0, (i % 2 === 0 ? 1 : -1) * (50 + i * 20)],
                        y: [0, (i % 3 === 0 ? -1 : 1) * (30 + i * 15)],
                        opacity: [1, 0],
                        scale: [0.5, 1.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
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
      <section id="platform" className="py-24 bg-gradient-to-b from-white via-mw-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-mw-gray-900 mb-6">
              Advanced SSP Technology<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-blue-600 to-cyan-500">for Media Owners</span>
            </h2>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto leading-relaxed">
              A complete suite of tools to manage, sell, and optimize your OOH inventory with speed, precision, and intelligence.
            </p>
          </motion.div>

          {/* Top Tabs */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex border border-mw-gray-200 p-1.5 rounded-xl gap-1 flex-wrap justify-center">
              {[
                { id: 'marketplace', name: 'Marketplace' },
                { id: 'inventory', name: 'Inventory' },
                { id: 'yield', name: 'Yield' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatform(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activePlatform === tab.id
                      ? 'bg-mw-blue-600 text-white'
                      : 'text-mw-gray-600 hover:text-mw-blue-600 hover:bg-mw-gray-50'
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
              {activePlatform === 'marketplace' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-mw-gray-900 mb-4">
                    Connect to Premium Demand
                  </h3>
                  <p className="text-lg text-mw-gray-600 leading-relaxed mb-6">
                    Connect your OOH inventory to an integrated demand marketplace designed for media owners. Enable access to programmatic and direct demand sources, improve fill rates, and monetize inventory more efficiently across digital and static screens.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-mw-gray-700">
                      <svg className="w-5 h-5 text-mw-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Access demand from advertisers and agencies
                    </li>
                    <li className="flex items-center gap-3 text-mw-gray-700">
                      <svg className="w-5 h-5 text-mw-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Support for programmatic and direct sales channels
                    </li>
                    <li className="flex items-center gap-3 text-mw-gray-700">
                      <svg className="w-5 h-5 text-mw-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Real-time bidding integration
                    </li>
                  </ul>
                </motion.div>
              )}
              {activePlatform === 'inventory' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-mw-gray-900 mb-4">
                    Inventory Management
                  </h3>
                  <p className="text-lg text-mw-gray-600 leading-relaxed">
                    Manage all your OOH assets in one place. Upload creative specifications, set availability, define pricing rules, and track performance across your entire network.
                  </p>
                </motion.div>
              )}
              {activePlatform === 'yield' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-mw-gray-900 mb-4">
                    Yield Optimization
                  </h3>
                  <p className="text-lg text-mw-gray-600 leading-relaxed mb-6">
                    Maximize revenue per screen through flexible pricing controls and demand-based adjustments. Set dynamic floor prices, manage rate rules, and respond to changing demand to improve yield across your OOH inventory.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-mw-gray-700">
                      <svg className="w-5 h-5 text-mw-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Dynamic pricing controls
                    </li>
                    <li className="flex items-center gap-3 text-mw-gray-700">
                      <svg className="w-5 h-5 text-mw-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Demand-based rate adjustments
                    </li>
                    <li className="flex items-center gap-3 text-mw-gray-700">
                      <svg className="w-5 h-5 text-mw-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Yield performance visibility
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Right - Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="bg-gradient-to-br from-mw-gray-100 to-mw-gray-200 rounded-2xl p-4">
                <div className="rounded-xl overflow-hidden">
                  {(() => {
                    const activeFeature = content.platformFeatures.find(f => f.id === activePlatform);
                    if (activeFeature && 'image' in activeFeature && activeFeature.image) {
                      return (
                        <Image
                          src={activeFeature.image}
                          alt={activeFeature.title || 'Feature'}
                          width={800}
                          height={500}
                          className="w-full h-auto object-cover"
                        />
                      );
                    }
                    const fallbackImages: Record<string, { src: string; alt: string }> = {
                      marketplace: { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop', alt: 'Demand Marketplace Dashboard' },
                      inventory: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop', alt: 'Inventory Management Dashboard' },
                      yield: { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80', alt: 'Yield Optimization Dashboard' },
                    };
                    const fallback = fallbackImages[activePlatform] || fallbackImages.marketplace;
                    return (
                      <Image
                        src={fallback.src}
                        alt={fallback.alt}
                        width={800}
                        height={500}
                        className="w-full h-auto object-cover"
                      />
                    );
                  })()}
                </div>
              </div>
            </div>
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
                    src={brand.logo} 
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
                    src={brand.logo} 
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
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">{journeySteps[0]?.stepLabel || 'The Old Way'}</span>
                      <h3 className="text-xl font-bold text-gray-800">{journeySteps[0]?.stepName || 'Challenges'}</h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {(journeySteps[0]?.items || ['Low fill rates', 'Limited demand access', 'Manual booking', 'No real-time insights', 'Complicated pricing slowed growth']).map((item, index) => (
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
                      {journeySteps[1]?.stepLabel || 'Transformation'}
                    </span>
                  </div>
                  <div className="text-center mb-6 pt-4">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{journeySteps[1]?.stepName || 'Moving Walls SSP'}</h3>
                    <p className="text-blue-200 text-sm">{journeySteps[1]?.description || 'Your complete monetization solution'}</p>
                  </div>
                  <div className="space-y-3">
                    {(journeySteps[1]?.items || [
                      'Premium demand access',
                      'Automated yield optimization',
                      'Real-time analytics',
                      'Fully streamlined workflows',
                    ]).map((feature, index) => (
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
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all text-sm">
                      Start Your Transformation
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
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
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wider">{journeySteps[2]?.stepLabel || 'Results for Media Owners'}</span>
                      <h3 className="text-xl font-bold text-gray-800">{journeySteps[2]?.stepName || 'Results'}</h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {(journeySteps[2]?.items || ['95% fill rate achieved', '+35% eCPM improvement', 'Global demand access', 'Real-time performance insights', '80% operations time saved']).map((item, index) => (
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
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, color: 'from-blue-500 to-blue-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>, color: 'from-indigo-500 to-indigo-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, color: 'from-purple-500 to-purple-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, color: 'from-pink-500 to-pink-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'from-yellow-500 to-yellow-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, color: 'from-green-500 to-green-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, color: 'from-cyan-500 to-cyan-600' },
                { icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, color: 'from-teal-500 to-teal-600' },
              ];
              return featureGrid.map((feature, index) => {
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

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started in Four Steps
            </h2>
            <p className="text-xl text-gray-600">
              From integration to revenue in weeks, not months
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {[
                {
                  title: 'Connect Inventory',
                  description: 'Integrate your screens with a simple onboarding process via API or bulk upload',
                  icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                },
                {
                  title: 'Set Your Terms',
                  description: 'Define pricing rules, floor rates, and availability for each screen or venue',
                  icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                },
                {
                  title: 'Go Live',
                  description: 'Activate your demand connections and start receiving campaign requests automatically',
                  icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                },
                {
                  title: 'Grow Revenue',
                  description: 'Watch fill rates and revenue increase as automation optimizes every impression',
                  icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative h-full"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-blue-200 transition-all h-full flex flex-col">
                    <div className="w-16 h-16 mb-4 text-blue-600">{item.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 flex-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Complete MW Platform Suite
            </h2>
            <p className="text-xl text-mw-gray-600">
              All the tools you need, integrated seamlessly
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
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">MW Planner</h3>
                <p className="text-blue-100 text-lg mb-6 max-w-md">AI-powered campaign planning and audience insights. Discover where your audiences are and plan with precision.</p>
                <Link href="/mw-planner" className="inline-flex items-center gap-2 text-white font-semibold text-sm bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-lg transition-all">
                  Learn More
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
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Marketplace</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Access 250,000+ premium billboard locations worldwide</p>
              <Link href="/mw-market" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
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
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Studio</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Creative design and optimization tools for every format</p>
              <Link href="/mw-studio" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
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
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Activate</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Campaign activation and automation at scale</p>
              <Link href="/mw-activate" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
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
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Measure</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Real-time analytics and attribution tracking</p>
              <Link href="/mw-measure" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
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
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Science</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Data science and predictive analytics engine</p>
              <Link href="/mw-science" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
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
              <h3 className="text-xl font-bold text-mw-gray-900 mb-2">MW Influence</h3>
              <p className="text-mw-gray-600 text-sm mb-4">Intelligent DOOH ad serving and yield optimization</p>
              <Link href="/mw-influence" className="text-mw-blue-600 font-semibold text-sm hover:text-mw-blue-700 transition-colors inline-flex items-center gap-1">
                Learn More
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about partnering with Moving Walls
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "How does the SSP integration work?",
                answer: "Our SSP integrates with your existing systems via APIs or direct connections. We support all major ad servers and CMS platforms. Integration typically takes 2-4 weeks depending on your technical setup, with dedicated support throughout the process."
              },
              {
                question: "What types of demand can I access?",
                answer: "You'll access programmatic demand from major DSPs, direct deals from agencies and brands, and our own marketplace of 1000+ advertisers. We handle all technical integrations so you can focus on optimizing your inventory."
              },
              {
                question: "How does yield optimization work?",
                answer: "Our AI analyzes demand patterns, historical performance, and market conditions to optimize floor prices in real-time. This typically increases eCPM by 20-40% while maintaining healthy fill rates above 90%."
              },
              {
                question: "What reporting and analytics are available?",
                answer: "Access comprehensive dashboards showing fill rates, eCPM, revenue trends, advertiser mix, and proof of play. Reports can be automated and white-labeled for your clients. We also provide predictive analytics for forecasting."
              },
              {
                question: "What are the costs and revenue share?",
                answer: "We operate on a revenue share model aligned with your success. No upfront costs or minimum commitments. Our share is competitive with industry standards and decreases as your revenue scales. Contact us for specific terms."
              }
            ].map((faq, index) => (
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
