'use client'

import { motion } from "framer-motion"
import Image from 'next/image'
import { CTAButton } from "@/components/CTAButton"

// Custom SVG icons
const BeakerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5a2.25 2.25 0 00-.659 1.591L4.5 18a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25l-.159-1.909a2.25 2.25 0 00-.659-1.591L14.25 10.409a2.25 2.25 0 01-.659-1.591V3.104M9.75 3.104c0-.414.336-.75.75-.75h3c.414 0 .75.336.75.75M9.75 3.104V18h4.5V3.104" />
  </svg>
)

const CpuChipIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-16.5 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
  </svg>
)

const BrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>
)

const ChartPieIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

// Integration partners for Don't Replace. Integrate. section
const integrations = [
  { name: 'VIOOH', category: 'SSP', logo: '/assets/images/integrations/viooh.svg' },
  { name: 'DV360', category: 'SSP', logo: '/assets/images/integrations/dv360.svg' },
  { name: 'Magnite', category: 'SSP', logo: '/assets/images/integrations/magnite.svg' },
  { name: 'Google Ad Manager 360', category: 'SSP', logo: '/assets/images/integrations/google-ad-manager-360.svg' },
  { name: 'The Trade Desk', category: 'DSP', logo: '/assets/images/integrations/the-trade-desk.svg' },
  { name: 'Cassie', category: 'DSP', logo: '/assets/images/integrations/cassie.svg' },
  { name: 'MAX', category: 'DSP', logo: '/assets/images/integrations/max.svg' },
  { name: 'StackAdapt', category: 'DSP', logo: '/assets/images/integrations/stackadapt.svg' },
  { name: 'Amobee', category: 'DSP', logo: '/assets/images/integrations/amobee.svg' },
  { name: 'AppNexus', category: 'DSP', logo: '/assets/images/integrations/appnexus.svg' },
  { name: 'MediaMath', category: 'DSP', logo: '/assets/images/integrations/mediamath.svg' },
  { name: 'Verizon Media', category: 'DSP', logo: '/assets/images/integrations/verizon.svg' },
  { name: 'Mediasmart', category: 'DSP', logo: '/assets/images/integrations/mediasmart.svg' },
]

export default function MWScience() {
  const features = [
    {
      icon: BeakerIcon,
      title: "Research & Testing",
      description: "Advanced A/B testing and multivariate analysis with statistical significance modeling."
    },
    {
      icon: CpuChipIcon,
      title: "AI-Powered Insights",
      description: "Machine learning algorithms that surface actionable insights from complex data patterns."
    },
    {
      icon: BrainIcon,
      title: "Predictive Modeling",
      description: "Forecast audience behavior, market trends, and campaign performance with precision."
    },
    {
      icon: ChartPieIcon,
      title: "Advanced Segmentation",
      description: "Dynamic audience segmentation based on behavioral, demographic, and psychographic data."
    }
  ]

  const researchCapabilities = [
    {
      category: "Audience Research",
      capabilities: ["Behavioral Analysis", "Psychographic Profiling", "Journey Mapping", "Intent Prediction", "Lookalike Modeling", "Churn Analysis"]
    },
    {
      category: "Market Intelligence",
      capabilities: ["Competitive Analysis", "Market Trends", "Category Insights", "Opportunity Identification", "Brand Positioning", "Share of Voice"]
    },
    {
      category: "Performance Science",
      capabilities: ["Attribution Modeling", "Incrementality Testing", "Media Mix Modeling", "Geo-Testing", "Holdout Analysis", "Lift Studies"]
    },
    {
      category: "Creative Science",
      capabilities: ["Creative Testing", "Message Optimization", "Visual Analysis", "Emotional Response", "Brand Safety", "Content Performance"]
    }
  ]

  const aiModels = [
    { name: "Audience Prediction", accuracy: "94.2%", description: "Predicts audience behavior and preferences" },
    { name: "Conversion Forecasting", accuracy: "89.7%", description: "Forecasts conversion probability and timing" },
    { name: "Churn Prevention", accuracy: "91.5%", description: "Identifies at-risk customers before they churn" },
    { name: "Content Optimization", accuracy: "86.3%", description: "Optimizes creative elements for performance" },
    { name: "Budget Allocation", accuracy: "92.8%", description: "Recommends optimal budget distribution" },
    { name: "Trend Detection", accuracy: "88.9%", description: "Identifies emerging market trends and opportunities" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-fuchsia-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
                MW Science
                <span className="block text-3xl md:text-4xl font-light mt-3 text-purple-200">
                  AI-Powered Audience Intelligence
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-violet-100">
                Transform data into strategic advantage with machine learning models that deliver
                <span className="text-yellow-300 font-semibold"> 94% prediction accuracy</span>.
              </p>

              {/* Key Features List */}
              <div className="space-y-4 mb-8">
                {[
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ), 
                    text: 'Predictive Audience Modeling' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    ), 
                    text: 'Advanced AI Research Tools' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    ), 
                    text: 'Market Intelligence & Trends' 
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ), 
                    text: 'A/B Testing & Experimentation' 
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
                <CTAButton href="/contact" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-violet-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all shadow-2xl hover:shadow-yellow-500/50 inline-flex items-center gap-2">
                  Book Demo
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </CTAButton>
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
                <h3 className="text-xl font-semibold mb-6 text-white/90">AI Model Performance</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '94.2%', label: 'Prediction Accuracy', color: 'text-yellow-300' },
                    { value: '1M+', label: 'Data Points/sec', color: 'text-green-300' },
                    { value: '250+', label: 'AI Models', color: 'text-purple-300' },
                    { value: '15K+', label: 'Tests Run', color: 'text-blue-300' }
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
                      <div className="text-sm text-purple-200">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white/90">Research Activity</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-300">Live</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { action: 'Model trained', client: 'Audience Predict', impact: '96% accuracy', time: '1m ago' },
                    { action: 'Test completed', client: 'Creative A/B', impact: 'Winner found', time: '4m ago' },
                    { action: 'Insight generated', client: 'Market Trends', impact: 'New pattern', time: '7m ago' }
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
                        <div className="text-xs text-purple-200">{activity.client}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-300">{activity.impact}</div>
                        <div className="text-xs text-violet-300">{activity.time}</div>
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
              Advanced Research Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock deeper understanding of your audiences with our comprehensive suite 
              of research tools powered by artificial intelligence and machine learning.
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
                <feature.icon className="w-12 h-12 text-violet-600 mb-4" />
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

      {/* Research Capabilities Section */}
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
              Comprehensive Research Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From audience research to creative optimization, our platform covers 
              every aspect of marketing science and consumer insight generation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchCapabilities.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start space-x-2">
                      <CheckIcon className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{capability}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Models Section */}
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
              AI-Powered Prediction Models
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proprietary machine learning models deliver industry-leading accuracy 
              in predicting consumer behavior and market outcomes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiModels.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {model.name}
                  </h3>
                  <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded-full text-sm font-semibold">
                    {model.accuracy}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {model.description}
                </p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full" 
                    style={{ width: model.accuracy }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Dashboard Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Real-Time Intelligence Dashboard
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Access live insights and recommendations powered by continuous 
                data analysis and machine learning model updates.
              </p>
              <div className="space-y-6">
                {[
                  { insight: "Audience Behavioral Patterns", status: "3 new insights detected", color: "text-green-600" },
                  { insight: "Market Trend Analysis", status: "Emerging opportunity identified", color: "text-blue-600" },
                  { insight: "Creative Performance", status: "Optimization recommendations ready", color: "text-purple-600" },
                  { insight: "Competitive Intelligence", status: "2 competitor strategy updates", color: "text-orange-600" }
                ].map((item, index) => (
                  <motion.div
                    key={item.insight}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center py-3 border-l-4 border-violet-500 pl-4 bg-gray-50 rounded-r-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.insight}</h4>
                      <p className={`text-sm ${item.color}`}>{item.status}</p>
                    </div>
                    <div className="w-3 h-3 bg-violet-500 rounded-full animate-pulse"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-violet-50 to-purple-100 p-8 rounded-2xl"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Research Impact Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Audience Understanding</span>
                    <span className="text-2xl font-bold text-violet-600">+287%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Prediction Accuracy</span>
                    <span className="text-2xl font-bold text-purple-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Research Speed</span>
                    <span className="text-2xl font-bold text-fuchsia-600">10x Faster</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Insight Actionability</span>
                    <span className="text-2xl font-bold text-indigo-600">96.7%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scientific Method Section */}
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
              Scientific Marketing Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our research follows rigorous scientific principles to ensure reliable, 
              actionable insights that drive measurable business outcomes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Hypothesis", desc: "Form data-driven hypotheses based on market signals and behavioral patterns" },
              { step: "02", title: "Design", desc: "Structure experiments with proper controls and statistical significance requirements" },
              { step: "03", title: "Execute", desc: "Deploy tests across multiple channels with real-time monitoring and adjustment" },
              { step: "04", title: "Analyze", desc: "Apply advanced statistical methods and ML algorithms to extract insights" },
              { step: "05", title: "Apply", desc: "Implement findings with continuous monitoring and iterative optimization" }
            ].map((methodology, index) => (
              <motion.div
                key={methodology.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {methodology.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {methodology.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {methodology.desc}
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
                <span className="text-blue-600 font-medium text-sm">13+ Integrations</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Don&apos;t Replace.
                <span className="block text-blue-600">Integrate.</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                MW Science connects seamlessly with your existing data sources. No rip-and-replace—just instant insights from day one.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {['SSP Partners', 'DSP Partners', 'Programmatic', 'Real-Time Bidding'].map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{category}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center group cursor-pointer"
                  >
                    <div className="w-36 h-28 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                      <Image src={integration.logo} alt={integration.name} width={180} height={72} className="object-contain w-full h-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}