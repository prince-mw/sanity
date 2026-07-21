'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ZohoPopupContextType {
  /** Opens a popup iframe for an arbitrary Zoho form URL, independent of the current page. */
  openZohoPopup: (url: string, title?: string) => void
  closeZohoPopup: () => void
  isOpen: boolean
  /**
   * The current page's own contact form URL (e.g. a location/city's contactFormUrl), set by that
   * page on mount. Consumers like the navbar CTA read this to open the right form for wherever
   * the visitor currently is, falling back to their default behavior when it's null.
   */
  currentPageFormUrl: string | null
  setCurrentPageFormUrl: (url: string | null) => void
}

const ZohoPopupContext = createContext<ZohoPopupContextType | undefined>(undefined)

export function ZohoPopupProvider({ children }: { children: ReactNode }) {
  const [activeUrl, setActiveUrl] = useState<string | null>(null)
  const [activeTitle, setActiveTitle] = useState('Contact Us')
  const [currentPageFormUrl, setCurrentPageFormUrl] = useState<string | null>(null)

  const openZohoPopup = useCallback((url: string, title?: string) => {
    if (!url) return
    setActiveUrl(url)
    setActiveTitle(title || 'Contact Us')
  }, [])

  const closeZohoPopup = useCallback(() => setActiveUrl(null), [])

  return (
    <ZohoPopupContext.Provider
      value={{ openZohoPopup, closeZohoPopup, isOpen: activeUrl !== null, currentPageFormUrl, setCurrentPageFormUrl }}
    >
      {children}
      <AnimatePresence>
        {activeUrl && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeZohoPopup} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden z-10"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-mw-blue-600 to-mw-blue-700">
                <h3 className="text-lg font-semibold text-white">{activeTitle}</h3>
                <button onClick={closeZohoPopup} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-[70vh]">
                <iframe
                  src={activeUrl}
                  width="100%"
                  height="100%"
                  frameBorder={0}
                  style={{ border: 'none' }}
                  title={activeTitle}
                  allow="geolocation"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ZohoPopupContext.Provider>
  )
}

export function useZohoPopup() {
  const context = useContext(ZohoPopupContext)
  if (context === undefined) {
    throw new Error('useZohoPopup must be used within a ZohoPopupProvider')
  }
  return context
}

/** Heuristic: does this link point at a Zoho form (vs. an ordinary internal/external link)? */
export function isZohoFormUrl(url?: string | null): url is string {
  if (!url) return false
  return /zohopublic\.[a-z.]+|forms\.zoho\.com/i.test(url)
}
