'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export interface Integration {
  name: string
  logo?: string
  category?: string
}

export interface ProductIntegrationsSectionProps {
  title?: string
  subtitle?: string
  integrations: Integration[]
  showCategories?: boolean
}

export default function ProductIntegrationsSection({
  title = 'Seamless Integrations',
  subtitle,
  integrations,
  showCategories = true,
}: ProductIntegrationsSectionProps) {
  if (!integrations || integrations.length === 0) return null

  // Group integrations by category
  const groupedIntegrations = integrations.reduce((acc, integration) => {
    const category = integration.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(integration)
    return acc
  }, {} as Record<string, Integration[]>)

  const categories = Object.keys(groupedIntegrations)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Categorized Display */}
        {showCategories && categories.length > 1 ? (
          <div className="space-y-12">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
                  {category}
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {groupedIntegrations[category].map((integration, index) => (
                    <IntegrationCard
                      key={index}
                      integration={integration}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Simple Grid Display */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => (
              <IntegrationCard
                key={index}
                integration={integration}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Don&apos;t see your platform? We&apos;re constantly adding new integrations.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Request an Integration
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function IntegrationCard({
  integration,
  index,
}: {
  integration: Integration
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center min-h-[120px]"
    >
      {integration.logo ? (
        <div className="relative w-16 h-16 mb-3 group-hover:scale-110 transition-transform">
          <Image
            src={integration.logo}
            alt={integration.name}
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <div className="w-16 h-16 mb-3 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="text-2xl font-bold text-gray-400">
            {integration.name.charAt(0)}
          </span>
        </div>
      )}
      <span className="text-sm font-medium text-gray-700 text-center">
        {integration.name}
      </span>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
    </motion.div>
  )
}
