'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ZohoFormEmbedProps {
  formUrl: string
  name?: string
  displayMode?: 'iframe' | 'modal' | 'newtab'
  height?: number
  width?: string
  buttonText?: string
  buttonClassName?: string
  className?: string
}

export function ZohoFormEmbed({
  formUrl,
  name,
  displayMode = 'iframe',
  height = 600,
  width = '100%',
  buttonText = 'Download Now',
  buttonClassName,
  className,
}: ZohoFormEmbedProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // For new tab mode
  if (displayMode === 'newtab') {
    return (
      <a
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName || 'inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors'}
      >
        {buttonText}
      </a>
    )
  }

  // For modal mode
  if (displayMode === 'modal') {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className={buttonClassName || 'inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors'}
        >
          {buttonText}
        </button>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {name || 'Get Your Copy'}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Iframe */}
                <div className="p-4">
                  <iframe
                    src={formUrl}
                    width="100%"
                    height={height}
                    style={{ border: 'none' }}
                    title={name || 'Zoho Form'}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Default: Embedded iframe
  return (
    <div className={className || 'w-full'}>
      <iframe
        src={formUrl}
        width={width}
        height={height}
        style={{ border: 'none' }}
        title={name || 'Zoho Form'}
        loading="lazy"
        className="rounded-lg"
      />
    </div>
  )
}

export default ZohoFormEmbed
