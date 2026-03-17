"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getTimelineEvents, transformTimelineEvent } from "@/sanity/lib/fetch";

// Static fallback timeline data
const staticTimelineMilestones = [
  {
    year: "2015",
    quarter: "Q1",
    title: "Company Founded",
    description: "Moving Walls was born from a vision to revolutionize advertising through data-driven insights and innovative technology platforms.",
    achievement: "Secured initial funding of $2M",
    icon: "🚀",
    color: "from-blue-500 to-blue-600"
  },
  {
    year: "2016",
    quarter: "Q3",
    title: "First Major Client",
    description: "Landed our first Fortune 500 client and delivered our inaugural advertising campaign with 300% ROI improvement.",
    achievement: "Reached $1M ARR milestone",
    icon: "🎯",
    color: "from-green-500 to-green-600"
  },
  {
    year: "2017",
    quarter: "Q2",
    title: "Transit Partnerships",
    description: "Secured partnerships with 15 major transit authorities, expanding our out-of-home advertising network across key metropolitan areas.",
    achievement: "Network expanded to 50+ cities",
    icon: "🚇",
    color: "from-purple-500 to-purple-600"
  },
  {
    year: "2018",
    quarter: "Q4",
    title: "Digital Platform Launch",
    description: "Launched our proprietary digital advertising platform with real-time bidding and advanced targeting capabilities.",
    achievement: "Platform processed 1B+ impressions",
    icon: "💻",
    color: "from-orange-500 to-orange-600"
  },
  {
    year: "2019",
    quarter: "Q1",
    title: "AI Integration",
    description: "Introduced machine learning algorithms for audience targeting and campaign optimization, improving performance by 150%.",
    achievement: "AI-powered 10,000+ campaigns",
    icon: "🤖",
    color: "from-red-500 to-red-600"
  },
  {
    year: "2020",
    quarter: "Q3",
    title: "Global Expansion",
    description: "Opened international offices in London, Toronto, and Sydney, establishing Moving Walls as a global advertising technology leader.",
    achievement: "Expanded to 3 continents",
    icon: "🌍",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    year: "2021",
    quarter: "Q2",
    title: "IPO Preparation",
    description: "Achieved unicorn status with $1B valuation and began preparation for initial public offering with strategic partnerships.",
    achievement: "Valued at $1B+",
    icon: "🦄",
    color: "from-pink-500 to-pink-600"
  },
  {
    year: "2022",
    quarter: "Q4",
    title: "Market Leadership",
    description: "Became the fastest-growing advertising technology platform with 1000+ brand partnerships and industry recognition.",
    achievement: "1000+ active clients",
    icon: "👑",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    year: "2023",
    quarter: "Q1",
    title: "Innovation Awards",
    description: "Received multiple industry awards for innovation in advertising technology and sustainable business practices.",
    achievement: "5 major industry awards",
    icon: "🏆",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    year: "2024",
    quarter: "Q3",
    title: "Next Generation Platform",
    description: "Launched Moving Walls 3.0 with advanced analytics, cross-platform integration, and enhanced automation capabilities.",
    achievement: "Platform 3.0 live globally",
    icon: "⚡",
    color: "from-cyan-500 to-cyan-600"
  }
];

export default function OurJourneyPageClient() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [timelineMilestones, setTimelineMilestones] = useState(staticTimelineMilestones);

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const data = await getTimelineEvents()
        if (data && data.length > 0) {
          const transformed = data.map(transformTimelineEvent).map(event => ({
            ...event,
            icon: event.icon || '🚀',
            color: `from-${event.color || 'blue'}-500 to-${event.color || 'blue'}-600`
          }))
          setTimelineMilestones(transformed)
        }
      } catch (error) {
        console.error('Error fetching timeline events:', error)
      }
    }
    fetchTimeline()
  }, [])

  const growthPhases = [
    {
      phase: "Startup Era",
      years: "2015 - 2017",
      focus: "Foundation & Vision",
      description: "Building the core team, developing our initial platform, and establishing our first client relationships in the advertising technology space.",
      keyMetrics: [
        { label: "Team Size", value: "12 employees" },
        { label: "Clients", value: "25 brands" },
        { label: "Revenue", value: "$3.2M ARR" },
        { label: "Markets", value: "3 cities" }
      ],
      achievements: [
        "Secured Series A funding",
        "Built MVP platform",
        "First Fortune 500 client",
        "Core team assembled"
      ]
    },
    {
      phase: "Expansion Era",
      years: "2018 - 2020",
      focus: "Scale & Growth",
      description: "Rapid expansion of our platform capabilities, geographic reach, and client base while maintaining service quality and innovation leadership.",
      keyMetrics: [
        { label: "Team Size", value: "85 employees" },
        { label: "Clients", value: "200+ brands" },
        { label: "Revenue", value: "$25M ARR" },
        { label: "Markets", value: "50+ cities" }
      ],
      achievements: [
        "International expansion",
        "AI platform integration",
        "Series B funding round",
        "Industry partnerships"
      ]
    },
    {
      phase: "Innovation Era",
      years: "2021 - 2023",
      focus: "Technology & Leadership",
      description: "Establishing market leadership through breakthrough innovations in AI-driven advertising, advanced analytics, and automated campaign optimization.",
      keyMetrics: [
        { label: "Team Size", value: "180+ employees" },
        { label: "Clients", value: "500+ brands" },
        { label: "Revenue", value: "$120M ARR" },
        { label: "Markets", value: "25 countries" }
      ],
      achievements: [
        "Unicorn valuation",
        "Award-winning platform",
        "Market leadership",
        "Global recognition"
      ]
    },
    {
      phase: "Future Era",
      years: "2024+",
      focus: "Next Generation",
      description: "Pioneering the future of advertising technology with cutting-edge innovations, sustainable practices, and global market expansion.",
      keyMetrics: [
        { label: "Team Size", value: "250+ employees" },
        { label: "Clients", value: "1000+ brands" },
        { label: "Revenue", value: "$300M+ ARR" },
        { label: "Markets", value: "50+ countries" }
      ],
      achievements: [
        "Platform 3.0 launch",
        "Sustainability goals",
        "Next-gen AI features",
        "Global market leader"
      ]
    }
  ];

  const officeExpansion = [
    { city: "Singapore", year: 2014, type: "Global HQ", employees: "50+", milestone: "Company Founded" },
    { city: "Kuala Lumpur", year: 2016, type: "Regional Office", employees: "25+", milestone: "Malaysia Expansion" },
    { city: "Jakarta", year: 2017, type: "Regional Office", employees: "20+", milestone: "Indonesia Market Entry" },
    { city: "Manila", year: 2018, type: "Regional Office", employees: "15+", milestone: "Philippines Expansion" },
    { city: "Mumbai", year: 2019, type: "Regional Office", employees: "30+", milestone: "India Expansion" },
    { city: "Bangalore", year: 2020, type: "Regional Office", employees: "20+", milestone: "India Tech Hub" },
    { city: "Chennai", year: 2021, type: "Regional Office", employees: "15+", milestone: "South India Growth" },
    { city: "Colombo", year: 2022, type: "Regional Office", employees: "10+", milestone: "Sri Lanka Entry" }
  ];

  const awards = [
    { year: 2019, award: "AdTech Innovation Award", organization: "Marketing Technology Awards" },
    { year: 2020, award: "Best Advertising Platform", organization: "TechCrunch Disrupt" },
    { year: 2021, award: "AI Excellence Award", organization: "AI Breakthrough Awards" },
    { year: 2022, award: "Company of the Year", organization: "Advertising Age" },
    { year: 2023, award: "Sustainable Business Leader", organization: "Green Tech Awards" },
    { year: 2024, award: "Global Innovation Champion", organization: "World Economic Forum" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-mw-gray-50 via-white to-mw-blue-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-mw-gray-500 mb-8">
              <Link href="/" className="hover:text-mw-blue-600">Home</Link>
              <span>/</span>
              <Link href="/about" className="hover:text-mw-blue-600">About</Link>
              <span>/</span>
              <span className="text-mw-blue-600">Our Journey</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-8">
              <span className="text-mw-blue-600 text-sm font-medium">The Moving Walls Story</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Our Journey
              <span className="text-mw-blue-600 block">From Vision to Reality</span>
            </h1>
            
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover the remarkable story of how Moving Walls transformed from a bold startup vision 
              into a global leader in advertising technology, driven by innovation, determination, 
              and an unwavering commitment to client success.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center bg-white rounded-xl p-6 shadow-mw-sm border border-mw-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">9+</div>
                <div className="text-sm text-mw-gray-600">Years of Innovation</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center bg-white rounded-xl p-6 shadow-mw-sm border border-mw-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">1000+</div>
                <div className="text-sm text-mw-gray-600">Brand Partners</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center bg-white rounded-xl p-6 shadow-mw-sm border border-mw-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">9</div>
                <div className="text-sm text-mw-gray-600">Global Offices</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center bg-white rounded-xl p-6 shadow-mw-sm border border-mw-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">$300M+</div>
                <div className="text-sm text-mw-gray-600">Annual Revenue</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Timeline of Innovation
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Every milestone tells a story of innovation, growth, and the relentless pursuit of excellence.
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-mw-blue-200 via-mw-blue-300 to-mw-blue-200 transform -translate-y-1/2"></div>
              
              {/* Timeline Items */}
              <div className="flex justify-between items-center relative z-10">
                {timelineMilestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative cursor-pointer group"
                    onClick={() => setActiveTimeline(index)}
                  >
                    {/* Timeline Dot */}
                    <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg transition-all duration-300 bg-gradient-to-r ${milestone.color} ${
                      activeTimeline === index ? 'scale-125 shadow-xl' : 'hover:scale-110'
                    }`}></div>
                    
                    {/* Year Label */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="text-sm font-semibold text-mw-gray-900">{milestone.year}</div>
                      <div className="text-xs text-mw-gray-500">{milestone.quarter}</div>
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                      <div className="bg-white rounded-lg shadow-xl border border-mw-gray-200 p-4 w-80">
                        <div className="text-lg font-bold text-mw-gray-900 mb-2 flex items-center gap-2">
                          <span className="text-xl">{milestone.icon}</span>
                          {milestone.title}
                        </div>
                        <p className="text-sm text-mw-gray-600 mb-2">{milestone.description}</p>
                        <div className="text-xs font-semibold text-mw-blue-600">{milestone.achievement}</div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {timelineMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r ${milestone.color} flex-shrink-0`}>
                  <span className="text-lg">{milestone.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-mw-blue-600">{milestone.year} {milestone.quarter}</span>
                  </div>
                  <h3 className="text-lg font-bold text-mw-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-mw-gray-600 mb-2">{milestone.description}</p>
                  <div className="text-sm font-semibold text-mw-blue-600">{milestone.achievement}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Phases Section */}
      <section className="py-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Phases of Growth
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Four distinct eras that shaped our evolution from startup to market leader.
            </p>
          </motion.div>

          {/* Phase Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {growthPhases.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActivePhase(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activePhase === index
                    ? 'bg-mw-blue-600 text-white shadow-lg'
                    : 'bg-white text-mw-gray-600 hover:bg-mw-blue-50 hover:text-mw-blue-600 border border-mw-gray-200'
                }`}
              >
                {phase.phase}
              </button>
            ))}
          </div>

          {/* Active Phase Content */}
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-mw-lg border border-mw-gray-100"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-2xl font-bold text-mw-blue-600">{growthPhases[activePhase].years}</div>
                  <div className="px-3 py-1 bg-mw-blue-100 text-mw-blue-600 text-sm font-medium rounded-full">
                    {growthPhases[activePhase].focus}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-mw-gray-900 mb-4">{growthPhases[activePhase].phase}</h3>
                <p className="text-lg text-mw-gray-600 mb-8 leading-relaxed">
                  {growthPhases[activePhase].description}
                </p>

                {/* Key Achievements */}
                <div>
                  <h4 className="text-lg font-bold text-mw-gray-900 mb-4">Key Achievements</h4>
                  <div className="space-y-2">
                    {growthPhases[activePhase].achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-mw-blue-600 rounded-full"></div>
                        <span className="text-mw-gray-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-6">
                {growthPhases[activePhase].keyMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-center bg-mw-gray-50 rounded-xl p-6"
                  >
                    <div className="text-2xl font-bold text-mw-blue-600 mb-2">{metric.value}</div>
                    <div className="text-sm text-mw-gray-600">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Expansion Map */}
      <section className="py-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Global Expansion Timeline
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Our strategic expansion across key markets worldwide, building local expertise while maintaining global consistency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officeExpansion.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-mw-gray-100 hover:shadow-mw-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-mw-gray-900">{office.city}</h3>
                  <span className="text-2xl font-bold text-mw-blue-600">{office.year}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-mw-gray-500">Type:</span>
                    <span className="text-mw-gray-900 font-medium">{office.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mw-gray-500">Team:</span>
                    <span className="text-mw-gray-900 font-medium">{office.employees}</span>
                  </div>
                  <div className="pt-2 border-t border-mw-gray-100">
                    <span className="text-mw-blue-600 font-medium">{office.milestone}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Recognition & Awards
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Industry recognition for our innovation, leadership, and commitment to excellence.
            </p>
          </motion.div>

          <div className="space-y-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-6 bg-gradient-to-r from-mw-blue-50 to-white border border-mw-gray-100 rounded-xl p-6"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  🏆
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-1">
                    <h3 className="text-lg font-bold text-mw-gray-900">{award.award}</h3>
                    <span className="px-2 py-1 bg-mw-blue-100 text-mw-blue-600 text-sm font-medium rounded">{award.year}</span>
                  </div>
                  <p className="text-mw-gray-600">{award.organization}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-gradient-to-br from-mw-blue-600 via-mw-blue-700 to-mw-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Journey Continues
            </h2>
            <p className="text-xl text-mw-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              This is just the beginning. With cutting-edge AI, sustainable practices, and an unwavering 
              commitment to innovation, we're building the future of advertising technology. Join us as 
              we shape the next chapter of our remarkable journey.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-2">Next-Gen Platform</h3>
                <p className="text-mw-blue-200">AI-powered advertising solutions launching in 2025</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold mb-2">Sustainability Goals</h3>
                <p className="text-mw-blue-200">Carbon-neutral operations by 2026</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold mb-2">Global Expansion</h3>
                <p className="text-mw-blue-200">50+ markets worldwide by 2027</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-mw-gray-50 text-mw-blue-600 font-semibold rounded-lg transition-colors shadow-lg"
              >
                Join Our Journey
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/careers"
                className="px-8 py-3 border-2 border-white hover:bg-white hover:text-mw-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                View Careers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}