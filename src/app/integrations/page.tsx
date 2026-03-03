'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Search Icon
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

// Arrow Right Icon
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

// Check Icon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

// External Link Icon
const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

// Code Icon
const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

// Categories
const categories = [
  { id: 'all', name: 'All Integrations', count: 13 },
  { id: 'ssp', name: 'SSP Partners', count: 4 },
  { id: 'dsp', name: 'DSP Partners', count: 9 },
]

// All integrations data — actual MW / LMX / MAX partner logos
const integrations = [
  {
    id: 'viooh',
    name: 'VIOOH',
    category: 'ssp',
    description: 'Premium programmatic digital out-of-home (pDOOH) marketplace enabling automated trading of OOH inventory globally.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Programmatic DOOH', 'Real-time bidding', 'Global inventory', 'Audience targeting'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/viooh.svg',
  },
  {
    id: 'dv360',
    name: 'Display & Video 360',
    category: 'ssp',
    description: 'Google\'s enterprise demand-side platform for programmatic display, video, and connected TV advertising.',
    products: ['MW Planner', 'MW Measure', 'MW Activate', 'MW Marketplace'],
    features: ['Programmatic guaranteed', 'Custom bidding', 'Audience activation', 'Cross-device'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/dv360.svg',
  },
  {
    id: 'magnite',
    name: 'Magnite',
    category: 'ssp',
    description: 'The world\'s largest independent sell-side advertising company, powering premium programmatic OOH and CTV.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Header bidding', 'CTV/OTT', 'Audience segments', 'Deal management'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/magnite.svg',
  },
  {
    id: 'google-ad-manager-360',
    name: 'Google Ad Manager 360',
    category: 'ssp',
    description: 'Enterprise ad serving platform with advanced forecasting, yield management, and programmatic access.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Yield optimization', 'Programmatic deals', 'Forecasting', 'Multi-format'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/google-ad-manager-360.svg',
  },
  {
    id: 'the-trade-desk',
    name: 'The Trade Desk',
    category: 'dsp',
    description: 'The leading independent DSP for omnichannel programmatic advertising with Unified ID 2.0.',
    products: ['MW Planner', 'MW Measure', 'MW Activate', 'MW Marketplace'],
    features: ['Unified ID 2.0', 'Kokai AI', 'CTV/OTT', 'Retail media'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/the-trade-desk.svg',
  },
  {
    id: 'cassie',
    name: 'Cassie',
    category: 'dsp',
    description: 'Consent and preference management platform ensuring compliant data-driven advertising.',
    products: ['MW Activate', 'MW Measure'],
    features: ['Consent management', 'Preference center', 'GDPR compliance', 'Data governance'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/cassie.svg',
  },
  {
    id: 'max',
    name: 'MAX',
    category: 'dsp',
    description: 'Moving Walls\' programmatic OOH buying platform for automated, data-driven outdoor advertising campaigns.',
    products: ['MW Planner', 'MW Activate', 'MW Measure'],
    features: ['Automated buying', 'Audience data', 'Campaign optimization', 'Real-time reporting'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/max.svg',
  },
  {
    id: 'stackadapt',
    name: 'StackAdapt',
    category: 'dsp',
    description: 'Multi-channel programmatic advertising platform with native, display, video, CTV, and DOOH capabilities.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Multi-channel', 'Native ads', 'Contextual targeting', 'Custom audiences'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/stackadapt.svg',
  },
  {
    id: 'amobee',
    name: 'Amobee',
    category: 'dsp',
    description: 'End-to-end advertising platform for planning, activation, and optimization across all channels.',
    products: ['MW Planner', 'MW Activate'],
    features: ['Cross-channel', 'Brand intelligence', 'TV planning', 'Audience analytics'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/amobee.svg',
  },
  {
    id: 'appnexus',
    name: 'AppNexus',
    category: 'dsp',
    description: 'Enterprise technology platform for programmatic advertising powering Xandr/Microsoft Advertising.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Programmable bidder', 'Curated deals', 'Identity', 'Yield analytics'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/appnexus.svg',
  },
  {
    id: 'mediamath',
    name: 'MediaMath',
    category: 'dsp',
    description: 'Omnichannel demand-side platform for advanced programmatic campaigns with transparency and control.',
    products: ['MW Planner', 'MW Activate'],
    features: ['Brain AI', 'Omnichannel', 'Identity', 'Transparency'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/mediamath.svg',
  },
  {
    id: 'verizon',
    name: 'Verizon Media',
    category: 'dsp',
    description: 'Verizon\'s advertising technology platform with premium inventory and telecom data for precision targeting.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Telecom data', 'Premium inventory', 'Cross-device', 'Brand safety'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/verizon.svg',
  },
  {
    id: 'mediasmart',
    name: 'Mediasmart',
    category: 'dsp',
    description: 'Mobile-first programmatic platform specializing in location-based and proximity advertising.',
    products: ['MW Activate', 'MW Measure'],
    features: ['Mobile DSP', 'Location targeting', 'Proximity ads', 'Footfall attribution'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/mediasmart.svg',
  },
]

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedIntegration, setSelectedIntegration] = useState<typeof integrations[0] | null>(null)

  // Filter integrations
  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || integration.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Integration Marketplace
            </h1>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto mb-10">
              Seamlessly connect with leading SSPs and DSPs. Our pre-built integrations power programmatic OOH advertising at scale.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-64 flex-shrink-0"
            >
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activeCategory === category.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* API Documentation Link */}
                <div className="mt-6 pt-6 border-t">
                  <Link
                    href="/api-reference"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <CodeIcon className="w-4 h-4" />
                    <span>API Documentation</span>
                    <ExternalLinkIcon className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Integration Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredIntegrations.length}</span> integrations
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredIntegrations.map((integration, index) => (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setSelectedIntegration(integration)}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:border-blue-200 group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors p-2">
                        <Image src={integration.logo} alt={integration.name} width={40} height={40} className="object-contain" />
                      </div>
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Live
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {integration.description}
                    </p>

                    {/* Products */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {integration.products.slice(0, 3).map((product) => (
                        <span
                          key={product}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {product}
                        </span>
                      ))}
                      {integration.products.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{integration.products.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-xs text-gray-500 capitalize">{integration.category}</span>
                      <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details
                        <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Detail Modal */}
      {selectedIntegration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIntegration(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Modal Header */}
            <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-2">
                    <Image src={selectedIntegration.logo} alt={selectedIntegration.name} width={48} height={48} className="object-contain" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedIntegration.name}</h2>
                    <p className="text-sm text-gray-500 capitalize">{selectedIntegration.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
                <p className="text-gray-600">{selectedIntegration.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedIntegration.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatible Products */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Compatible Products</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedIntegration.products.map((product) => (
                    <Link
                      key={product}
                      href={`/products/${product.toLowerCase().replace('mw-', 'mw-')}`}
                      className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      {product}
                    </Link>
                  ))}
                </div>
              </div>

              {/* API Configuration */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">API Configuration</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Authentication</span>
                    <span className="text-gray-900 font-medium">OAuth 2.0 / API Key</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rate Limit</span>
                    <span className="text-gray-900 font-medium">1000 req/min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Data Sync</span>
                    <span className="text-gray-900 font-medium">Real-time</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Webhook Support</span>
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <CheckIcon className="w-4 h-4" />
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50 flex items-center justify-between">
              <Link
                href={selectedIntegration.apiDocs}
                className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
              >
                <CodeIcon className="w-4 h-4" />
                View API Docs
              </Link>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Connect Integration
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Don't See Your Integration?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're constantly adding new integrations. Let us know what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Request Integration
              </Link>
              <Link
                href="/api-reference"
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <CodeIcon className="w-5 h-5" />
                Build Custom Integration
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
