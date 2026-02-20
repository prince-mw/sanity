'use client'

import { motion } from "framer-motion"

// Custom SVG icons
const RocketLaunchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.58-5.84a14.927 14.927 0 015.84 2.58M9.75 18.75l-1.5 1.5M18.75 9.75l-1.5-1.5" />
  </svg>
)

const UserGroupIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
)

const GlobeAltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9zm-9.716-6.747C3.124 12.348 6.748 8.724 12 8.724s8.876 3.624 8.876 11.529" />
  </svg>
)

const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

// Integration logos for Don't Replace. Integrate. section
const integrations = [
  { 
    name: 'Google Ads', 
    category: 'Advertising',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
      </svg>
    )
  },
  { 
    name: 'Meta Ads', 
    category: 'Social',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
      </svg>
    )
  },
  { 
    name: 'DV360', 
    category: 'Programmatic',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )
  },
  { 
    name: 'Trade Desk', 
    category: 'DSP',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#0CA678"/>
        <path d="M6 8h12v2H6V8zm0 3h12v2H6v-2zm0 3h8v2H6v-2z" fill="white"/>
      </svg>
    )
  },
  { 
    name: 'Xandr', 
    category: 'DSP',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#FF6B35"/>
        <path d="M7 7l5 5-5 5M12 7l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    name: 'LiveRamp', 
    category: 'DMP',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00C389"/>
        <path d="M6 12h4l2-4 2 8 2-4h4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    name: 'Lotame', 
    category: 'DMP',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#6366F1"/>
        <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="white"/>
      </svg>
    )
  },
  { 
    name: 'Analytics', 
    category: 'Measurement',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M22.84 2.998v17.004c0 1.1-.9 2-2 2H4.16c-1.1 0-2-.9-2-2V3.998c0-1.1.9-2 2-2h16.68c1.1 0 2 .9 2 2z" fill="#F9AB00"/>
        <path d="M20.16 14.498v4.504c0 .55-.45 1-1 1h-4.504c-.55 0-1-.45-1-1v-4.504c0-.55.45-1 1-1h4.504c.55 0 1 .45 1 1z" fill="#E37400"/>
      </svg>
    )
  },
  { 
    name: 'Adobe', 
    category: 'Analytics',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425h-3.71zm.001 0h3.71L24 1.376H15.087l-1.12 21.248zM0 1.376l6.966 21.248h3.71L4.12 8.809l4.209-7.433H0z" fill="#FF0000"/>
      </svg>
    )
  },
]

export default function MWInfluence() {
  const features = [
    {
      icon: RocketLaunchIcon,
      title: "Cross-Channel Activation",
      description: "Deploy campaigns simultaneously across display, social, video, audio, and emerging channels."
    },
    {
      icon: UserGroupIcon,
      title: "Advanced Audience Targeting",
      description: "Precision targeting with first-party data integration and AI-powered lookalike modeling."
    },
    {
      icon: GlobeAltIcon,
      title: "Global Reach Capabilities",
      description: "Expand your reach across international markets with localized targeting and creative adaptation."
    },
    {
      icon: BoltIcon,
      title: "Real-Time Optimization",
      description: "Dynamic campaign optimization based on performance data and audience behavior patterns."
    }
  ]

  const channels = [
    {
      category: "Digital Display",
      channels: ["Programmatic Display", "Rich Media", "Native Advertising", "Retargeting", "Dynamic Creative", "Cross-Device Targeting"],
      reach: "2.8B+ Users",
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Social Media",
      channels: ["Facebook & Instagram", "Twitter/X", "LinkedIn", "TikTok", "Snapchat", "Pinterest"],
      reach: "4.2B+ Users",
      color: "from-pink-500 to-rose-500"
    },
    {
      category: "Connected TV",
      channels: ["Streaming Platforms", "OTT Services", "FAST Channels", "Smart TV Apps", "Gaming Platforms", "Live Sports"],
      reach: "1.9B+ Households",
      color: "from-purple-500 to-indigo-500"
    },
    {
      category: "Audio & Podcast",
      channels: ["Music Streaming", "Podcast Networks", "Radio Streaming", "Voice Assistants", "In-Game Audio", "Retail Audio"],
      reach: "3.1B+ Listeners",
      color: "from-green-500 to-emerald-500"
    },
    {
      category: "Digital Out-of-Home",
      channels: ["Digital Billboards", "Transit Screens", "Retail Displays", "Airport Networks", "Stadium Displays", "Street Furniture"],
      reach: "500M+ Daily Views",
      color: "from-orange-500 to-red-500"
    },
    {
      category: "Emerging Channels",
      channels: ["AR/VR Advertising", "Gaming & Esports", "Metaverse Platforms", "Wearable Devices", "Smart Home", "AI Assistants"],
      reach: "250M+ Early Adopters",
      color: "from-violet-500 to-purple-500"
    }
  ]

  const targetingCapabilities = [
    "Demographic Targeting", "Geographic Targeting", "Behavioral Targeting", "Interest-Based Targeting",
    "Contextual Targeting", "Lookalike Audiences", "Custom Audiences", "Retargeting & Remarketing",
    "Cross-Device Targeting", "Sequential Messaging", "Dayparting & Frequency", "Weather-Based Targeting"
  ]

  const globalStats = [
    { region: "North America", reach: "380M Users", campaigns: "12.5K Active" },
    { region: "Europe", reach: "520M Users", campaigns: "18.2K Active" },
    { region: "Asia Pacific", reach: "2.1B Users", campaigns: "24.8K Active" },
    { region: "Latin America", reach: "290M Users", campaigns: "6.7K Active" },
    { region: "Middle East & Africa", reach: "180M Users", campaigns: "4.3K Active" },
    { region: "Global Total", reach: "3.5B Users", campaigns: "66.5K Active" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                MW Influence
                <span className="block text-3xl md:text-4xl font-light mt-3 text-cyan-200">
                  Global Audience at Scale
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-blue-100">
                Connect with your ideal audiences across every channel with precision targeting that reaches
                <span className="text-yellow-300 font-semibold"> 4.2B+ users globally</span>.
              </p>

              {/* Key Features List */}
              <div className="space-y-4 mb-8">
                {[
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    ), 
                    text: 'Cross-Channel Activation' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ), 
                    text: 'Advanced Audience Targeting' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    ), 
                    text: 'Real-Time Performance Tracking' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ), 
                    text: 'Dynamic Campaign Optimization' 
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-lg"
                  >
                    <div className="text-yellow-300">{item.icon}</div>
                    <span className="text-white/90">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-indigo-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all shadow-2xl hover:shadow-yellow-500/50 inline-flex items-center gap-2">
                  Book Demo
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Side - Stats & Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Main Stats Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 text-white/90">Global Reach</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '4.2B+', label: 'Users Reached', color: 'text-yellow-300' },
                    { value: '180+', label: 'Countries', color: 'text-green-300' },
                    { value: '15+', label: 'Channels', color: 'text-purple-300' },
                    { value: '92%', label: 'Match Rate', color: 'text-blue-300' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-cyan-200">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white/90">Live Campaigns</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-300">Live</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { action: 'Audience expanded', client: 'Global Auto', impact: '+2.5M reach', time: '3m ago' },
                    { action: 'Channel added', client: 'FinTech Co', impact: 'CTV activated', time: '6m ago' },
                    { action: 'Target optimized', client: 'Fashion Brand', impact: '+18% CTR', time: '10m ago' }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-start justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{activity.action}</div>
                        <div className="text-xs text-cyan-200">{activity.client}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-300">{activity.impact}</div>
                        <div className="text-xs text-blue-300">{activity.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Maximize Your Audience Reach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with your ideal customers across every channel and device 
              with precision targeting and intelligent optimization capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Channel Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access premium inventory across all major advertising channels 
              and emerging platforms to reach your audiences wherever they are.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {channels.map((channel, index) => (
              <motion.div
                key={channel.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className={`inline-block bg-gradient-to-r ${channel.color} text-white px-3 py-1 rounded-full text-sm font-semibold mb-4`}>
                  {channel.reach}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {channel.category}
                </h3>
                <ul className="space-y-2">
                  {channel.channels.map((ch) => (
                    <li key={ch} className="flex items-center space-x-2">
                      <CheckIcon className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{ch}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Targeting Capabilities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Advanced Targeting Capabilities
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Leverage sophisticated targeting options and AI-powered optimization 
                to ensure your messages reach the most relevant audiences at the optimal time.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {targetingCapabilities.map((capability, index) => (
                  <motion.div
                    key={capability}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-2xl"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Targeting Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Audience Match Rate</span>
                    <span className="text-2xl font-bold text-indigo-600">94.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '94.7%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600">Cross-Device Linking</span>
                    <span className="text-2xl font-bold text-blue-600">87.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '87.3%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600">Lookalike Accuracy</span>
                    <span className="text-2xl font-bold text-cyan-600">91.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-cyan-600 h-3 rounded-full" style={{ width: '91.2%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Global Reach & Scale
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with audiences worldwide through our extensive network 
              of premium publishers and strategic partnerships across all major markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {globalStats.map((stat, index) => (
              <motion.div
                key={stat.region}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${stat.region === 'Global Total' ? 'md:col-span-2 lg:col-span-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white' : 'bg-gray-50'} p-6 rounded-xl text-center`}
              >
                <h3 className={`text-2xl font-bold mb-2 ${stat.region === 'Global Total' ? 'text-white' : 'text-gray-900'}`}>
                  {stat.region}
                </h3>
                <div className="space-y-2">
                  <div className={`text-lg ${stat.region === 'Global Total' ? 'text-blue-100' : 'text-gray-600'}`}>
                    Reach: <span className={`font-semibold ${stat.region === 'Global Total' ? 'text-white' : 'text-indigo-600'}`}>{stat.reach}</span>
                  </div>
                  <div className={`text-lg ${stat.region === 'Global Total' ? 'text-blue-100' : 'text-gray-600'}`}>
                    Campaigns: <span className={`font-semibold ${stat.region === 'Global Total' ? 'text-white' : 'text-indigo-600'}`}>{stat.campaigns}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-Time Optimization Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real-Time Campaign Optimization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-driven optimization engine continuously monitors and adjusts 
              your campaigns to maximize performance across all channels and touchpoints.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { metric: "Bid Adjustments", frequency: "Every 15ms", icon: "lightning" },
              { metric: "Audience Updates", frequency: "Real-time", icon: "target" },
              { metric: "Creative Rotation", frequency: "Dynamic", icon: "refresh" },
              { metric: "Budget Pacing", frequency: "Continuous", icon: "chart" }
            ].map((optimization, index) => (
              <motion.div
                key={optimization.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{optimization.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {optimization.metric}
                </h3>
                <p className="text-indigo-600 font-semibold">
                  {optimization.frequency}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section - Don't Replace. Integrate. */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                <span className="text-blue-600 font-medium text-sm">50+ Integrations</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Don&apos;t Replace.
                <span className="block text-blue-600">Integrate.</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                MW Reach connects seamlessly with your existing tech stack. No rip-and-replace—just instant audience reach from day one.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {['Advertising', 'DSPs', 'DMPs', 'Analytics'].map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{category}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="/integrations"
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2"
                >
                  View All Integrations
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-3 gap-4">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 hover:shadow-md transition-all text-center group cursor-pointer"
                  >
                    <div className="w-14 h-14 mx-auto mb-3 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
                      {integration.logo}
                    </div>
                    <div className="text-sm font-medium text-gray-700">{integration.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{integration.category}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Reach Every Audience, Everywhere
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Scale your campaigns globally with precision targeting, 
              real-time optimization, and comprehensive channel coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Launch Campaigns
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Explore Reach
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}