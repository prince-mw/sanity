'use client'

import { motion } from 'framer-motion'

export default function ProgrammaticAuctionFlow() {
  // Auction flow steps
  const steps = [
    { id: 1, label: 'Screen\nAvailable', icon: 'screen', color: 'from-cyan-400 to-cyan-600' },
    { id: 2, label: 'Bid Requests\nSent', icon: 'broadcast', color: 'from-blue-400 to-blue-600' },
    { id: 3, label: 'Bids\nReceived', icon: 'bids', color: 'from-purple-400 to-purple-600' },
    { id: 4, label: 'Winner\nSelected', icon: 'winner', color: 'from-yellow-400 to-yellow-600' },
    { id: 5, label: 'Content\nDeployed', icon: 'deploy', color: 'from-green-400 to-green-600' },
  ]

  // Bidders for animation
  const bidders = [
    { name: 'Brand A', bid: '$2,450', delay: 0 },
    { name: 'Brand B', bid: '$2,180', delay: 0.3 },
    { name: 'Brand C', bid: '$2,890', delay: 0.6, winner: true },
    { name: 'Brand D', bid: '$2,320', delay: 0.9 },
  ]

  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[350px] md:min-h-[400px] bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden p-3 sm:p-4 md:p-6">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="auctionGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#auctionGrid)" />
        </svg>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${10 + (i * 23) % 80}%`,
            top: `${15 + (i * 17) % 70}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + (i % 2),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Main Flow Container */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        {/* Flow Title */}
        <motion.div
          className="text-center mb-3 sm:mb-4 md:mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] sm:text-xs font-semibold text-purple-300 uppercase tracking-wider">Real-Time Programmatic</span>
        </motion.div>

        {/* Horizontal Flow Line with Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-1 -translate-y-1/2">
            <div className="h-full bg-gradient-to-r from-cyan-500/20 via-purple-500/40 to-green-500/20 rounded-full" />
            {/* Animated pulse along line */}
            <motion.div
              className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between px-1 sm:px-2 md:px-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.4 }}
              >
                {/* Step Icon */}
                <motion.div
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(168, 85, 247, 0)',
                      '0 0 20px 4px rgba(168, 85, 247, 0.3)',
                      '0 0 0 0 rgba(168, 85, 247, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                >
                  {/* Icons */}
                  {step.icon === 'screen' && (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {step.icon === 'broadcast' && (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  )}
                  {step.icon === 'bids' && (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {step.icon === 'winner' && (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  )}
                  {step.icon === 'deploy' && (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}

                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-white/30"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </motion.div>

                {/* Step Label */}
                <div className="mt-1 sm:mt-2 md:mt-3 text-center">
                  <span className="text-[7px] sm:text-[9px] md:text-[11px] text-white/80 font-medium whitespace-pre-line leading-tight">
                    {step.label}
                  </span>
                </div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="absolute top-6 text-purple-300"
                    style={{ left: `${(index + 1) * 20 - 2}%` }}
                    animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bidding Cards Section */}
        <div className="mt-4 sm:mt-6 md:mt-8 relative">
          <div className="flex justify-center gap-1 sm:gap-2 md:gap-3">
            {bidders.map((bidder, i) => (
              <motion.div
                key={bidder.name}
                className={`relative px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg border backdrop-blur-sm ${
                  bidder.winner
                    ? 'bg-green-500/20 border-green-400/50'
                    : 'bg-slate-800/50 border-slate-600/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + bidder.delay }}
              >
                {bidder.winner && (
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-yellow-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </motion.div>
                )}
                <div className="text-[6px] sm:text-[8px] md:text-[9px] text-slate-400 uppercase">{bidder.name}</div>
                <motion.div
                  className={`text-[10px] sm:text-xs md:text-sm font-bold ${bidder.winner ? 'text-green-400' : 'text-white'}`}
                  animate={bidder.winner ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {bidder.bid}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-6 flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="text-center">
            <div className="text-[10px] text-slate-400 uppercase">Avg. Fill Rate</div>
            <motion.div
              className="text-lg font-bold text-cyan-400"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              94%
            </motion.div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-slate-400 uppercase">Response Time</div>
            <div className="text-lg font-bold text-purple-400">&lt;100ms</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-slate-400 uppercase">Daily Auctions</div>
            <motion.div
              className="text-lg font-bold text-green-400"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              2.4M+
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
