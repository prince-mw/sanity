'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DynamicZohoForm } from './DynamicZohoForm'
import type { ZohoFormData } from '@/sanity/lib/fetch'

interface ZohoFormEmbedProps {
  /** Pass the full ZohoFormData from Sanity for automatic mode detection */
  form?: ZohoFormData
  /** Legacy: direct form URL (iframe mode only) */
  formUrl?: string
  name?: string
  displayMode?: 'iframe' | 'modal' | 'newtab'
  height?: number
  width?: string
  buttonText?: string
  buttonClassName?: string
  className?: string
  /** Page source for lead tracking (auto-injected as hidden field) */
  pageSource?: string
  /** UTM parameters to pass through to form submission */
  utmParams?: Record<string, string>
}

export function ZohoFormEmbed({
  form,
  formUrl: legacyFormUrl,
  name: legacyName,
  displayMode: legacyDisplayMode = 'iframe',
  height: legacyHeight = 600,
  width: legacyWidth = '100%',
  buttonText = 'Download Now',
  buttonClassName,
  className,
  pageSource,
  utmParams,
}: ZohoFormEmbedProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Resolve props — prefer `form` object, fall back to legacy individual props
  const renderMode = form?.renderMode || 'iframe'
  const formUrl = form?.formUrl || legacyFormUrl || ''
  const name = form?.name || legacyName
  const displayMode = form?.displayMode || legacyDisplayMode
  const height = form?.height || legacyHeight
  const width = form?.width || legacyWidth

  // ── Native Rendered Form ──────────────────────────────────
  if (renderMode === 'native' && form?.fields && form.fields.length > 0 && form.zohoFormPermalink) {
    const nativeFormContent = (
      <DynamicZohoForm
        fields={form.fields}
        zohoFormPermalink={form.zohoFormPermalink}
        zohoPortalName={form.zohoPortalName}
        submitButtonText={form.submitButtonText}
        successMessage={form.successMessage}
        successRedirectUrl={form.successRedirectUrl}
        className={className}
        pageSource={pageSource}
        utmParams={utmParams}
      />
    )

    // Native form in modal mode
    if (displayMode === 'modal') {
      return (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className={buttonClassName || 'inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'}
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
                  className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {name || 'Submit Form'}
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
                  <div className="p-6">{nativeFormContent}</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )
    }

    // Native form inline (default)
    return nativeFormContent
  }

  // ── Iframe Mode ───────────────────────────────────────────

  if (!formUrl) return null

  // New tab mode
  if (displayMode === 'newtab') {
    return (
      <a
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName || 'inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'}
      >
        {buttonText}
      </a>
    )
  }

  // Modal mode
  if (displayMode === 'modal') {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className={buttonClassName || 'inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'}
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
