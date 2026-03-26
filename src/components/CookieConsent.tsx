'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface CookiePreferences {
  essential: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'mw_cookie_consent'
const COOKIE_PREFERENCES_KEY = 'mw_cookie_preferences'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }
    }
  }, [])

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, new Date().toISOString())
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs))
    setPreferences(prefs)
    setIsVisible(false)
    setShowSettings(false)
    
    // Dispatch custom event for other components to react
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: prefs }))
  }

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    })
  }

  const handleRejectAll = () => {
    saveConsent({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    })
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return // Cannot toggle essential
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Function to reopen settings (can be called from footer link)
  useEffect(() => {
    const handleOpenSettings = () => {
      setIsVisible(true)
      setShowSettings(true)
    }
    
    window.addEventListener('openCookieSettings', handleOpenSettings)
    return () => window.removeEventListener('openCookieSettings', handleOpenSettings)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-3 md:p-4"
          >
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {!showSettings ? (
                  // Main Banner View
                  <div className="px-4 py-3 md:px-6 md:py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Text */}
                      <div className="flex-1">
                        <p className="text-gray-600 text-sm">
                          We use cookies to enhance your experience.{' '}
                          <Link href="/cookies" className="text-blue-600 hover:underline" aria-label="Learn more about our cookie policy">Learn more</Link>
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setShowSettings(true)}
                          className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Settings
                        </button>
                        <button
                          onClick={handleRejectAll}
                          className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={handleAcceptAll}
                          className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                        >
                          Accept All
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Settings View
                  <div className="px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">Cookie Settings</h3>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {/* Essential */}
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-green-100 text-green-700">
                        <span className="w-2 h-2 rounded-full bg-green-600"></span>
                        Essential
                      </div>

                      {/* Functional */}
                      <button
                        onClick={() => togglePreference('functional')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          preferences.functional ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${preferences.functional ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                        Functional
                      </button>

                      {/* Analytics */}
                      <button
                        onClick={() => togglePreference('analytics')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          preferences.analytics ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${preferences.analytics ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                        Analytics
                      </button>

                      {/* Marketing */}
                      <button
                        onClick={() => togglePreference('marketing')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          preferences.marketing ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${preferences.marketing ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                        Marketing
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={handleRejectAll}
                        className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Reject All
                      </button>
                      <button
                        onClick={handleSavePreferences}
                        className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        Save Preferences
                      </button>
                      <button
                        onClick={handleAcceptAll}
                        className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                      >
                        Accept All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Export a function to open cookie settings from anywhere
export function openCookieSettings() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('openCookieSettings'))
  }
}

// Export a hook to get current consent status
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null)

  useEffect(() => {
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
    if (savedPreferences) {
      setConsent(JSON.parse(savedPreferences))
    }

    const handleUpdate = (e: CustomEvent<CookiePreferences>) => {
      setConsent(e.detail)
    }

    window.addEventListener('cookieConsentUpdated', handleUpdate as EventListener)
    return () => window.removeEventListener('cookieConsentUpdated', handleUpdate as EventListener)
  }, [])

  return consent
}
