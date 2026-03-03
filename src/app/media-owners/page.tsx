'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import TestimonialSection from '@/components/TestimonialSection'

export default function MediaOwnersPage() {
  const [activeTab, setActiveTab] = useState('traditional')
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
                Monetize Your OOH Inventory{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                  With Smart SSP Technology
                </span>
              </h1>
              <p className="text-lg md:text-xl text-mw-blue-100 max-w-xl mb-8 leading-relaxed">
                Connect your inventory to premium demand sources and automate your OOH sales operations.
              </p>
              
              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-cyan-300">500K+</div>
                  <div className="text-sm text-mw-blue-200">Screens Connected</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-cyan-300">95%</div>
                  <div className="text-sm text-mw-blue-200">Fill Rate</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-cyan-300">180+</div>
                  <div className="text-sm text-mw-blue-200">Countries</div>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-mw-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-mw-gray-50 transition-all hover:scale-105 shadow-lg"
                >
                  Join Our Network
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#platform"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Right Side - 3D Billboard Network Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
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

                {/* Floating Info Cards */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -right-4 top-1/4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 z-10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium">Live Screens</span>
                  </div>
                  <div className="text-lg font-bold text-cyan-300">500K+</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                  className="absolute -left-4 bottom-1/3 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 z-10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium">Network Health</span>
                  </div>
                  <div className="text-lg font-bold text-cyan-300">99.9%</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="absolute left-1/4 -bottom-2 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 z-10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium">Daily Revenue</span>
                  </div>
                  <div className="text-lg font-bold text-cyan-300">$2.4M</div>
                </motion.div>
              </div>
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
              Leverage Advanced<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-blue-600 to-cyan-500">SSP Technology</span>
            </h2>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto leading-relaxed">
              A complete suite of tools to manage, sell, and optimize your OOH inventory
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
                  <p className="text-lg text-mw-gray-600 leading-relaxed">
                    Access thousands of advertisers and agencies through our integrated demand marketplace. Maximize fill rates with programmatic and direct sales channels.
                  </p>
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
                  <p className="text-lg text-mw-gray-600 leading-relaxed">
                    Maximize revenue with AI-powered yield optimization. Dynamic pricing, demand forecasting, and automated deal prioritization ensure you get the best value for your inventory.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Right - Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="bg-gradient-to-br from-mw-gray-100 to-mw-gray-200 rounded-2xl p-4">
                <div className="rounded-xl overflow-hidden">
                  {activePlatform === 'marketplace' && (
                    <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                      alt="Demand Marketplace Dashboard"
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  )}
                  {activePlatform === 'inventory' && (
                    <Image
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
                      alt="Inventory Management Dashboard"
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  )}
                  {activePlatform === 'yield' && (
                    <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80"
                      alt="Yield Optimization Dashboard"
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-gray-50 border-b overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 mb-8 font-semibold">TRUSTED BY LEADING MEDIA OWNERS WORLDWIDE</p>
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
              {[
                { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
                { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
                { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
                { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
                { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
                { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
                { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
                { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
                { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg' },
                { name: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
                { name: 'Shopify', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
                { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg' },
                { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
                { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
                { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
                { name: 'SAP', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg' },
              ].map((brand, i) => (
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
              {[
                { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
                { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
                { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
                { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
                { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
                { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
                { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
                { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
                { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg' },
                { name: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
                { name: 'Shopify', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
                { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg' },
                { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
                { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
                { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
                { name: 'SAP', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg' },
              ].map((brand, i) => (
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
              Your Journey to Maximum Yield
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Moving Walls transforms your inventory monetization
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
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">The Old Way</span>
                      <h3 className="text-xl font-bold text-gray-800">Challenges</h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: 'Low fill rates & unsold inventory' },
                      { icon: <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, text: 'Limited demand access' },
                      { icon: <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, text: 'Manual booking processes' },
                      { icon: <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: 'No real-time performance data' },
                      { icon: <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>, text: 'Complex pricing management' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-white/60 rounded-lg p-3"
                      >
                        <div className="flex-shrink-0">{item.icon}</div>
                        <span className="text-gray-700 text-sm">{item.text}</span>
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
                      Transformation
                    </span>
                  </div>
                  <div className="text-center mb-6 pt-4">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Moving Walls SSP</h3>
                    <p className="text-blue-200 text-sm">Your complete monetization solution</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Premium Demand Access',
                      'AI Yield Optimization',
                      'Real-Time Analytics',
                      'Automated Operations',
                    ].map((feature, index) => (
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
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wider">The New Way</span>
                      <h3 className="text-xl font-bold text-gray-800">Results</h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, text: '95% average fill rate', metric: '95% fill' },
                      { icon: <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: '1000+ advertiser connections', metric: 'Global reach' },
                      { icon: <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, text: 'Real-time performance insights', metric: 'Live data' },
                      { icon: <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, text: 'AI-optimized pricing', metric: '+35% eCPM' },
                      { icon: <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, text: 'Fully automated workflows', metric: '80% time saved' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 bg-white/80 rounded-lg p-3"
                      >
                        <div className="flex-shrink-0">{item.icon}</div>
                        <div className="flex-1">
                          <span className="text-gray-700 text-sm block">{item.text}</span>
                          <span className="text-green-600 text-xs font-bold">{item.metric}</span>
                        </div>
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
              Everything Media Owners Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools designed specifically for media owners to maximize revenue and operational efficiency
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'SSP Technology',
                description: 'Connect to premium programmatic demand with our advanced supply-side platform',
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Inventory Management',
                description: 'Centralized dashboard to manage all your screens, availability, and pricing rules',
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                title: 'Yield Optimization',
                description: 'AI-powered pricing algorithms that maximize revenue across your network',
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                color: 'from-purple-500 to-purple-600'
              },
              {
                title: 'Proof of Play',
                description: 'Automated verification and reporting for all campaign deliveries',
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                color: 'from-pink-500 to-pink-600'
              },
              {
                title: 'Demand Connections',
                description: 'Direct integrations with agencies, DSPs, and brand advertisers globally',
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: 'from-yellow-500 to-yellow-600'
              },
              {
                title: 'Revenue Analytics',
                description: 'Comprehensive dashboards tracking fill rates, eCPM, and revenue trends',
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                color: 'from-green-500 to-green-600'
              },
              {
                title: 'Creative Trafficking',
                description: 'Automated creative approval, scheduling, and delivery to all screens',
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                color: 'from-cyan-500 to-cyan-600'
              },
              {
                title: 'Billing & Invoicing',
                description: 'Automated billing, reconciliation, and financial reporting',
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                color: 'from-teal-500 to-teal-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-3 text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
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
              Get Started in 4 Simple Steps
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
                  description: 'Integrate your screens via API or bulk upload with our simple onboarding process',
                  icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                },
                {
                  title: 'Set Your Terms',
                  description: 'Configure pricing rules, floor prices, and availability for each screen or venue',
                  icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                },
                {
                  title: 'Go Live',
                  description: 'Activate demand connections and start receiving campaign requests automatically',
                  icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                },
                {
                  title: 'Grow Revenue',
                  description: 'Watch your fill rates and eCPM increase with AI-powered optimization',
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

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solutions for Every Media Type
            </h2>
            <p className="text-xl text-gray-600">
              Tailored solutions for your inventory type
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['traditional', 'digital', 'transit', 'retail', 'placebased'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab === 'traditional' ? 'Traditional OOH' : 
                 tab === 'digital' ? 'Digital OOH' : 
                 tab === 'transit' ? 'Transit' : 
                 tab === 'retail' ? 'Retail Media' : 'Place-Based'}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {activeTab === 'traditional' && 'Traditional OOH'}
                  {activeTab === 'digital' && 'Digital OOH'}
                  {activeTab === 'transit' && 'Transit Media'}
                  {activeTab === 'retail' && 'Retail Media Networks'}
                  {activeTab === 'placebased' && 'Place-Based Media'}
                </h3>
                <div className="space-y-4 mb-6">
                  {activeTab === 'traditional' && (
                    <>
                      <p className="text-gray-600">Connect static billboards to digital buying</p>
                      <p className="text-gray-600">Automated proof of posting</p>
                      <p className="text-gray-600">Unified availability management</p>
                    </>
                  )}
                  {activeTab === 'digital' && (
                    <>
                      <p className="text-gray-600">Real-time programmatic capabilities</p>
                      <p className="text-gray-600">Dynamic creative optimization</p>
                      <p className="text-gray-600">Impression-level reporting</p>
                    </>
                  )}
                  {activeTab === 'transit' && (
                    <>
                      <p className="text-gray-600">Route and schedule optimization</p>
                      <p className="text-gray-600">Mobile audience measurement</p>
                      <p className="text-gray-600">Multi-format support</p>
                    </>
                  )}
                  {activeTab === 'retail' && (
                    <>
                      <p className="text-gray-600">Shopper audience targeting</p>
                      <p className="text-gray-600">Purchase attribution</p>
                      <p className="text-gray-600">Brand advertiser connections</p>
                    </>
                  )}
                  {activeTab === 'placebased' && (
                    <>
                      <p className="text-gray-600">Venue-specific audience data</p>
                      <p className="text-gray-600">Contextual targeting options</p>
                      <p className="text-gray-600">Dwell time analytics</p>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-sm text-gray-600">Fill Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">+35%</div>
                    <div className="text-sm text-gray-600">eCPM Lift</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500K+</div>
                    <div className="text-sm text-gray-600">Screens</div>
                  </div>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                <div className="w-32 h-32 text-blue-600">
                  {activeTab === 'traditional' && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                  {activeTab === 'digital' && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                  {activeTab === 'transit' && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
                  {activeTab === 'retail' && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                  {activeTab === 'placebased' && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 shadow-2xl border border-gray-200"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-6">
                  FEATURED CASE STUDY
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  How UrbanMedia Increased Revenue by 47%
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  UrbanMedia, a leading DOOH operator with 5,000+ screens, partnered with Moving Walls to transform their monetization strategy. Within 6 months, they achieved record revenue growth.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">47% revenue increase in 6 months</div>
                      <div className="text-sm text-gray-600">Highest growth in company history</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">95% average fill rate achieved</div>
                      <div className="text-sm text-gray-600">Up from 67% before Moving Walls</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">200+ new advertiser relationships</div>
                      <div className="text-sm text-gray-600">Through programmatic demand access</div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                >
                  Read Full Case Study
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1569428034239-f9565e32e224?w=600&h=450&fit=crop"
                    alt="UrbanMedia Success Story"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
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
      <TestimonialSection />

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
