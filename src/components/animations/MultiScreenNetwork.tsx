'use client'

import { motion } from 'framer-motion'

export default function MultiScreenNetwork() {
  // City silhouettes with billboard positions
  const cities = [
    { name: 'NYC', x: 15, y: 65, buildings: [40, 65, 55, 80, 45, 70, 50] },
    { name: 'London', x: 45, y: 25, buildings: [35, 50, 45, 60, 40, 55, 48] },
    { name: 'Singapore', x: 80, y: 55, buildings: [50, 75, 60, 85, 55, 70, 65] },
  ]

  // Billboard screens that sync
  const billboards = [
    { id: 1, x: 18, y: 45, rotation: -15, city: 'NYC' },
    { id: 2, x: 48, y: 12, rotation: 5, city: 'London' },
    { id: 3, x: 78, y: 35, rotation: 10, city: 'Singapore' },
  ]

  // Control center position
  const controlCenter = { x: 50, y: 75 }

  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[350px] md:min-h-[400px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-2xl overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99, 179, 237, 0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${5 + (i * 17) % 90}%`,
            top: `${8 + (i * 13) % 85}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Connection lines from billboards to control center */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {billboards.map((billboard, i) => (
          <g key={billboard.id}>
            {/* Static line */}
            <line
              x1={`${billboard.x}%`}
              y1={`${billboard.y + 8}%`}
              x2={`${controlCenter.x}%`}
              y2={`${controlCenter.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            {/* Animated data pulse along line */}
            <motion.circle
              r="4"
              fill="#06b6d4"
              filter="url(#glow)"
              initial={{
                cx: `${billboard.x}%`,
                cy: `${billboard.y + 8}%`,
              }}
              animate={{
                cx: [`${billboard.x}%`, `${controlCenter.x}%`],
                cy: [`${billboard.y + 8}%`, `${controlCenter.y}%`],
                opacity: [1, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeInOut',
              }}
            />
          </g>
        ))}
        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* City Silhouettes with Billboards */}
      {cities.map((city, cityIndex) => (
        <div
          key={city.name}
          className="absolute"
          style={{
            left: `${city.x - 12}%`,
            top: `${city.y}%`,
            width: '24%',
          }}
        >
          {/* City name label */}
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-cyan-300 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: cityIndex * 0.3 + 0.5 }}
          >
            {city.name}
          </motion.div>

          {/* Building silhouettes */}
          <svg viewBox="0 0 140 60" className="w-full h-auto opacity-60">
            {city.buildings.map((height, i) => (
              <motion.rect
                key={i}
                x={i * 20}
                y={60 - height * 0.7}
                width="16"
                height={height * 0.7}
                fill="url(#buildingGradient)"
                initial={{ height: 0, y: 60 }}
                animate={{ height: height * 0.7, y: 60 - height * 0.7 }}
                transition={{ delay: cityIndex * 0.2 + i * 0.05, duration: 0.5 }}
              />
            ))}
            <defs>
              <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}

      {/* 3D Isometric Billboards */}
      {billboards.map((billboard, i) => (
        <motion.div
          key={billboard.id}
          className="absolute"
          style={{
            left: `${billboard.x - 8}%`,
            top: `${billboard.y}%`,
            width: '16%',
            zIndex: 10,
            transform: `perspective(500px) rotateY(${billboard.rotation}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: i * 0.3, duration: 0.6 }}
        >
          {/* Billboard frame */}
          <div className="relative">
            {/* 3D effect - side panel */}
            <div
              className="absolute -right-2 top-1 bottom-1 w-2 bg-gradient-to-b from-gray-600 to-gray-800"
              style={{ transform: 'skewY(-45deg)', transformOrigin: 'top left' }}
            />
            
            {/* Main screen */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-sm p-0.5 shadow-2xl border border-gray-700">
              {/* Screen content - synced animation */}
              <motion.div
                className="relative aspect-[16/10] bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-sm overflow-hidden"
                animate={{
                  background: [
                    'linear-gradient(135deg, #2563eb 0%, #06b6d4 50%, #1d4ed8 100%)',
                    'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #8b5cf6 100%)',
                    'linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%)',
                    'linear-gradient(135deg, #2563eb 0%, #06b6d4 50%, #1d4ed8 100%)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Brand logo placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-white font-bold text-xs tracking-wider opacity-90"
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    YOUR BRAND
                  </motion.div>
                </div>

                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />

                {/* Glowing corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />
              </motion.div>

              {/* Status indicator */}
              <div className="absolute -top-1 -right-1">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(74, 222, 128, 0.7)',
                      '0 0 0 6px rgba(74, 222, 128, 0)',
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>

            {/* Billboard pole */}
            <div className="mx-auto w-1 h-6 bg-gradient-to-b from-gray-600 to-gray-800" />
            <div className="mx-auto w-3 h-1 bg-gray-700 rounded-full" />
          </div>

          {/* Sync indicator */}
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </motion.div>
        </motion.div>
      ))}

      {/* Control Center Hub */}
      <motion.div
        className="absolute"
        style={{
          left: `${controlCenter.x - 10}%`,
          top: `${controlCenter.y - 5}%`,
          width: '20%',
          zIndex: 15,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Control center box */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[10px] text-cyan-300 font-semibold tracking-wider">CONTROL CENTER</span>
          </div>

          {/* Mini dashboard */}
          <div className="grid grid-cols-3 gap-1">
            {['NYC', 'LON', 'SG'].map((city, i) => (
              <motion.div
                key={city}
                className="bg-slate-700/50 rounded p-1 text-center"
                animate={{ backgroundColor: ['rgba(51, 65, 85, 0.5)', 'rgba(6, 182, 212, 0.2)', 'rgba(51, 65, 85, 0.5)'] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                <div className="text-[8px] text-slate-400">{city}</div>
                <motion.div
                  className="text-[10px] text-cyan-400 font-bold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  LIVE
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Sync status */}
          <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-center gap-1">
            <motion.svg
              className="w-3 h-3 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </motion.svg>
            <span className="text-[9px] text-green-400">All Synced</span>
          </div>
        </div>
      </motion.div>

    </div>
  )
}
