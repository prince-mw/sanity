"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Animated Counter Component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function OOH101Page() {
  const [activeCategory, setActiveCategory] = useState("all");

  const oohFormats = [
    {
      name: "Unipole",
      category: "roadside",
      description: "The most popular DOOH format, Unipoles are found along high-traffic roads where a large screen is attached to a tall pole for maximum visibility.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-500",
      stats: { reach: "500K+", visibility: "High", audience: "Commuters" },
      featured: true
    },
    {
      name: "Wall Façade",
      category: "roadside",
      description: "An extremely popular DOOH screen format positioned at high traffic locations with lots of foot and vehicle traffic.",
      image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&h=600&fit=crop",
      color: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-500",
      stats: { reach: "1M+", visibility: "Very High", audience: "Mixed" },
      featured: false
    },
    {
      name: "E-Buntings",
      category: "roadside",
      description: "Synchronous, multi-panel displays that line public streets. Multiple screens play the same ad simultaneously.",
      image: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800&h=600&fit=crop",
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-500",
      stats: { reach: "300K+", visibility: "Medium", audience: "Pedestrians" },
      featured: false
    },
    {
      name: "Overhead Bridge",
      category: "roadside",
      description: "Overhead bridges support massive screens spanning the entire width of the road. Wide, big and hard to miss.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      color: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-500",
      stats: { reach: "800K+", visibility: "Very High", audience: "Drivers" },
      featured: false
    },
    {
      name: "LED Truck",
      category: "mobile",
      description: "A dynamic DOOH format that follows your audience on routes they frequent. Maximum flexibility and effectiveness.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      color: "from-red-500 to-red-600",
      iconBg: "bg-red-500",
      stats: { reach: "200K+", visibility: "High", audience: "Targeted" },
      featured: false
    },
    {
      name: "Airport Screens",
      category: "indoor",
      description: "Captive audience waiting for check-in, security, or flights. Premium audience with high purchasing power.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
      color: "from-indigo-500 to-indigo-600",
      iconBg: "bg-indigo-500",
      stats: { reach: "150K+", visibility: "High", audience: "Travelers" },
      featured: false
    },
    {
      name: "Digital Bulletin",
      category: "roadside",
      description: "Large billboards on highways and heavy-traffic roads. Massive billboards that tower over surroundings.",
      image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&h=600&fit=crop",
      color: "from-cyan-500 to-cyan-600",
      iconBg: "bg-cyan-500",
      stats: { reach: "1.5M+", visibility: "Maximum", audience: "All" },
      featured: true
    },
    {
      name: "Bus Shelter",
      category: "transit",
      description: "Positioned at high traffic locations ensuring there's always vehicular or pedestrian audience viewing.",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop",
      color: "from-teal-500 to-teal-600",
      iconBg: "bg-teal-500",
      stats: { reach: "400K+", visibility: "High", audience: "Commuters" },
      featured: false
    },
    {
      name: "Cinema",
      category: "indoor",
      description: "Large screen in a closed room where people came to watch. Movie characteristics help predict audience demographics.",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
      color: "from-pink-500 to-pink-600",
      iconBg: "bg-pink-500",
      stats: { reach: "50K+", visibility: "Maximum", audience: "Entertainment" },
      featured: false
    }
  ];

  const categories = [
    { id: "all", name: "All Formats", count: 9 },
    { id: "roadside", name: "Roadside", count: 5 },
    { id: "transit", name: "Transit", count: 1 },
    { id: "indoor", name: "Indoor", count: 2 },
    { id: "mobile", name: "Mobile", count: 1 }
  ];

  const filteredFormats = activeCategory === "all" 
    ? oohFormats 
    : oohFormats.filter(f => f.category === activeCategory);

  const benefits = [
    {
      title: "Massive Reach",
      description: "OOH advertising reaches consumers outside their homes, delivering high-frequency exposure to diverse audiences.",
      stat: "97%",
      statLabel: "of consumers see OOH ads weekly",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "24/7 Visibility",
      description: "Unlike other media, OOH ads are always on - working round the clock to build brand awareness.",
      stat: "24/7",
      statLabel: "always-on advertising",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Unskippable",
      description: "You can't skip, block, or scroll past a billboard. OOH captures attention in the real world.",
      stat: "70%",
      statLabel: "notice OOH ads while driving",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Location Targeting",
      description: "Reach specific audiences based on where they live, work, shop, and travel with precision.",
      stat: "5.9x",
      statLabel: "more impressions per dollar",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Plan",
      description: "Define your target audience, select locations, and set campaign goals with data-driven insights.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      step: 2,
      title: "Book",
      description: "Reserve your inventory across multiple media owners with transparent pricing and availability.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      step: 3,
      title: "Create",
      description: "Design impactful creatives optimized for each format and screen specification.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      step: 4,
      title: "Measure",
      description: "Track performance with real-time analytics, footfall attribution, and brand lift studies.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const locations = [
    { name: "Malaysia", href: "/locations/malaysia", screens: "50,000+", flag: "🇲🇾" },
    { name: "Singapore", href: "/locations/singapore", screens: "15,000+", flag: "🇸🇬" },
    { name: "Indonesia", href: "/locations/indonesia", screens: "200,000+", flag: "🇮🇩" },
    { name: "India", href: "/locations/india", screens: "300,000+", flag: "🇮🇳" },
    { name: "Philippines", href: "/locations/philippines", screens: "80,000+", flag: "🇵🇭" },
    { name: "Japan", href: "/locations/japan", screens: "100,000+", flag: "🇯🇵" },
    { name: "Australia", href: "/locations/australia", screens: "40,000+", flag: "🇦🇺" },
    { name: "Sri Lanka", href: "/locations/sri-lanka", screens: "10,000+", flag: "🇱🇰" },
    { name: "Thailand", href: "/locations/thailand", screens: "75,000+", flag: "🇹🇭" }
  ];

  const glossaryTerms = [
    { term: "CPM", definition: "Cost Per Mille - the cost to reach 1,000 impressions" },
    { term: "Impressions", definition: "The number of times an ad is viewed by consumers" },
    { term: "Reach", definition: "The unique number of people exposed to your ad" },
    { term: "Frequency", definition: "How many times the same person sees your ad" },
    { term: "DOOH", definition: "Digital Out-of-Home - digital billboards and screens" },
    { term: "pDOOH", definition: "Programmatic DOOH - automated buying of OOH inventory" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Split Layout */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-blue-300 text-sm mb-6">
                <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-white">OOH 101</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-white text-sm font-medium">Comprehensive Guide</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Out-of-Home
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 block">
                  Advertising 101
                </span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-xl">
                Your complete guide to outdoor advertising. Learn about formats, strategies, 
                measurement, and best practices from industry experts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/platform"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                >
                  Explore Inventory
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
                >
                  Talk to an Expert
                </Link>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Floating Billboard Cards */}
              <div className="relative h-[500px]">
                {/* Main Card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <div className="text-lg font-bold text-gray-900">Digital Billboard</div>
                    <div className="text-sm text-gray-500">Premium Roadside Format</div>
                  </div>
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-8 right-0 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="text-2xl font-bold text-blue-600">1M+</div>
                  <div className="text-xs text-gray-500">OOH Sites</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-12 left-0 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="text-2xl font-bold text-indigo-600">40+</div>
                  <div className="text-xs text-gray-500">Markets</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute top-24 left-8 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="text-2xl font-bold text-cyan-600">1.5K+</div>
                  <div className="text-xs text-gray-500">Media Owners</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl text-blue-600 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                <AnimatedCounter target={40} suffix="+" />
              </div>
              <div className="text-sm text-gray-500 mt-1">Markets Covered</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl text-indigo-600 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                <AnimatedCounter target={1500} suffix="+" />
              </div>
              <div className="text-sm text-gray-500 mt-1">Media Owners</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-100 rounded-xl text-cyan-600 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                <AnimatedCounter target={1000000} suffix="+" />
              </div>
              <div className="text-sm text-gray-500 mt-1">OOH Sites</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl text-green-600 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                <AnimatedCounter target={97} suffix="%" />
              </div>
              <div className="text-sm text-gray-500 mt-1">Consumer Reach</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why OOH Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
              <span className="text-blue-600 text-sm font-medium">Why OOH?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Power of Out-of-Home Advertising
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              In a world of digital clutter, OOH cuts through the noise and reaches consumers where they live, work, and play.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {benefit.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{benefit.stat}</div>
                    <div className="text-xs text-gray-500">{benefit.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How DOOH Works - Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-4">
              <span className="text-indigo-600 text-sm font-medium">The Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How DOOH Advertising Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From planning to measurement, here is how successful OOH campaigns come to life.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm z-20 lg:hidden">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OOH Formats Section with Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
              <span className="text-purple-600 text-sm font-medium">Format Guide</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              OOH Advertising Formats
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From towering billboards to intimate bus shelters, discover the full spectrum of out-of-home advertising formats.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.name}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeCategory === cat.id ? "bg-white/20" : "bg-gray-100"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Format Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFormats.map((format, index) => (
                <motion.div
                  key={format.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
                    format.featured ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={format.image}
                      alt={format.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${format.color} opacity-70`} />
                    
                    {/* Format Badge */}
                    {format.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-white text-xs font-medium">Popular</span>
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 ${format.iconBg} rounded-full`} />
                        <span className="text-white/80 text-xs uppercase tracking-wide">
                          {format.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold">{format.name}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      {format.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{format.stats.reach}</div>
                        <div className="text-xs text-gray-500">Daily Reach</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{format.stats.visibility}</div>
                        <div className="text-xs text-gray-500">Visibility</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{format.stats.audience}</div>
                        <div className="text-xs text-gray-500">Audience</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Locations Section - Map Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-full mb-4">
              <span className="text-cyan-600 text-sm font-medium">Global Coverage</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Billboard Locations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover OOH advertising opportunities across our expanding network of markets.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={location.href}
                  className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all group border border-transparent hover:border-blue-200"
                >
                  <div className="text-4xl">{location.flag}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {location.name}
                    </div>
                    <div className="text-sm text-gray-500">{location.screens} screens</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
              <span className="text-orange-600 text-sm font-medium">Terminology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              OOH Glossary
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key terms and definitions you need to know in out-of-home advertising.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossaryTerms.map((item, index) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 shadow-sm"
              >
                <div className="font-bold text-blue-600 text-lg mb-1">{item.term}</div>
                <p className="text-gray-600 text-sm">{item.definition}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Launch Your OOH Campaign?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you are new to outdoor advertising or looking to optimize your strategy, 
              our team of experts is here to help you succeed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/platform"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Platform
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                Talk to an Expert
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free consultation
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Custom proposals
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Expert guidance
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
