'use client'

import { motion } from 'framer-motion'

export default function ScreenPortfolioManager() {
  // OOH format types with stats
  const oohFormats = [
    {
      id: 1,
      type: 'Billboard',
      icon: 'billboard',
      status: 'live',
      impressions: '2.4M',
      revenue: '$18.5K',
      x: 5,
      y: 8,
    },
    {
      id: 2,
      type: 'Transit',
      icon: 'transit',
      status: 'available',
      impressions: '890K',
      revenue: '$6.2K',
      x: 68,
      y: 5,
    },
    {
      id: 3,
      type: 'Street\nFurniture',
      icon: 'street',
      status: 'live',
      impressions: '1.2M',
      revenue: '$9.8K',
      x: 5,
      y: 42,
    },
    {
      id: 4,
      type: 'Digital\nScreens',
      icon: 'digital',
      status: 'maintenance',
      impressions: '3.1M',
      revenue: '$24.3K',
      x: 68,
      y: 38,
    },
  ]

  const statusColors = {
    live: { bg: 'bg-green-500', text: 'text-green-400', glow: 'rgba(34, 197, 94, 0.5)' },
    available: { bg: 'bg-cyan-500', text: 'text-cyan-400', glow: 'rgba(6, 182, 212, 0.5)' },
    maintenance: { bg: 'bg-amber-500', text: 'text-amber-400', glow: 'rgba(245, 158, 11, 0.5)' },
  }

  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[400px] bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-2xl overflow-hidden">
      {/* Isometric grid background */}
      <div className="absolute inset-0 opacity-15">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="isoGrid" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="skewX(-30)">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(99, 179, 237, 0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#isoGrid)" />
        </svg>
      </div>

      {/* Ambient particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-blue-400/50 rounded-full"
          style={{
            left: `${8 + (i * 19) % 84}%`,
            top: `${12 + (i * 23) % 76}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Connection lines to management hub */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {oohFormats.map((format, i) => (
          <g key={format.id}>
            <line
              x1={`${format.x + 14}%`}
              y1={`${format.y + 18}%`}
              x2="50%"
              y2="88%"
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <motion.circle
              r="3"
              fill="#60a5fa"
              initial={{ cx: `${format.x + 14}%`, cy: `${format.y + 18}%` }}
              animate={{
                cx: [`${format.x + 14}%`, '50%'],
                cy: [`${format.y + 18}%`, '88%'],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            />
          </g>
        ))}
      </svg>

      {/* OOH Format Cards - Isometric Style */}
      {oohFormats.map((format, index) => {
        const status = statusColors[format.status as keyof typeof statusColors]
        return (
          <motion.div
            key={format.id}
            className="absolute"
            style={{
              left: `${format.x}%`,
              top: `${format.y}%`,
              width: '26%',
              zIndex: 10,
              transform: 'perspective(800px) rotateX(8deg) rotateY(-3deg)',
            }}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {/* Card with 3D effect */}
            <div className="relative">
              {/* Side shadow for 3D effect */}
              <div
                className="absolute -right-1 top-1 bottom-0 w-2 bg-gradient-to-b from-slate-700 to-slate-900 rounded-r-lg"
                style={{ transform: 'skewY(-5deg)' }}
              />
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-lg p-2.5 border border-slate-700/50 shadow-xl">
                {/* Status indicator */}
                <div className="absolute -top-1.5 -right-1.5">
                  <motion.div
                    className={`w-3 h-3 ${status.bg} rounded-full`}
                    animate={{
                      boxShadow: [
                        `0 0 0 0 ${status.glow}`,
                        `0 0 8px 3px ${status.glow}`,
                        `0 0 0 0 ${status.glow}`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Header with icon */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                    {format.icon === 'billboard' && (
                      <svg className="w-3 h-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                      </svg>
                    )}
                    {format.icon === 'transit' && (
                      <svg className="w-3 h-3 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    )}
                    {format.icon === 'street' && (
                      <svg className="w-3 h-3 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )}
                    {format.icon === 'digital' && (
                      <svg className="w-3 h-3 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="text-[8px] sm:text-[9px] text-white font-semibold whitespace-pre-line leading-tight">{format.type}</div>
                    <div className={`text-[6px] sm:text-[7px] ${status.text} uppercase font-medium`}>{format.status}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="bg-slate-700/30 rounded px-1.5 py-0.5">
                    <div className="text-[5px] sm:text-[6px] text-slate-400 uppercase">Impressions</div>
                    <motion.div
                      className="text-[8px] sm:text-[10px] font-bold text-white"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {format.impressions}
                    </motion.div>
                  </div>
                  <div className="bg-slate-700/30 rounded px-1.5 py-0.5">
                    <div className="text-[5px] sm:text-[6px] text-slate-400 uppercase">Revenue</div>
                    <motion.div
                      className="text-[8px] sm:text-[10px] font-bold text-green-400"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {format.revenue}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Unified Management Interface Hub */}
      <motion.div
        className="absolute bottom-3 z-20"
        style={{ width: '50%', left: '24%', transform: 'translateX(-50%)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="relative bg-gradient-to-r from-slate-800/95 via-blue-900/95 to-slate-800/95 backdrop-blur-md rounded-xl p-3 border border-blue-500/30 shadow-2xl">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-xl bg-blue-500/10 animate-pulse" />
          
          {/* Header */}
          <div className="relative flex items-center justify-between mb-2 pb-1.5 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-[9px] text-blue-300 font-semibold uppercase tracking-wider">Unified Management Hub</span>
            </div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            </div>
          </div>

          {/* Dashboard Stats Row */}
          <div className="relative grid grid-cols-4 gap-2">
            {[
              { label: 'Total Screens', value: '1,847', color: 'text-white' },
              { label: 'Active Campaigns', value: '234', color: 'text-cyan-400' },
              { label: 'Total Impressions', value: '7.6M', color: 'text-purple-400' },
              { label: 'Monthly Revenue', value: '$58.8K', color: 'text-green-400' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <div className="text-[7px] text-slate-400 uppercase tracking-wide">{stat.label}</div>
                <motion.div
                  className={`text-xs font-bold ${stat.color}`}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {stat.value}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Status Legend */}
          <div className="relative mt-2 pt-1.5 border-t border-slate-700/50 flex justify-center gap-3">
            {[
              { label: 'Live', color: 'bg-green-500' },
              { label: 'Available', color: 'bg-cyan-500' },
              { label: 'Maintenance', color: 'bg-amber-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                <span className="text-[7px] text-slate-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
