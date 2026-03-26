'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { ZohoFormData } from '@/sanity/lib/fetch'
import { ZohoFormEmbed } from './ZohoFormEmbed'

interface FormPopupContextType {
  /** Whether a popup form is available for the current page */
  hasForm: boolean
  /** The form data for the current page (first match) */
  currentForm: ZohoFormData | null
  /** Open the popup form */
  openFormPopup: () => void
  /** Close the popup form */
  closeFormPopup: () => void
  /** Whether the popup is currently open */
  isOpen: boolean
  /** Current page path for tracking */
  pagePath: string
  /** UTM parameters from current URL */
  utmParams: Record<string, string>
}

const FormPopupContext = createContext<FormPopupContextType>({
  hasForm: false,
  currentForm: null,
  openFormPopup: () => {},
  closeFormPopup: () => {},
  isOpen: false,
  pagePath: '/',
  utmParams: {},
})

export function useFormPopup() {
  return useContext(FormPopupContext)
}

interface FormPopupProviderProps {
  children: React.ReactNode
  forms: ZohoFormData[]
}

export function FormPopupProvider({ children, forms }: FormPopupProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // Extract UTM parameters
  const utmParams: Record<string, string> = {}
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  for (const key of utmKeys) {
    const val = searchParams.get(key)
    if (val) utmParams[key] = val
  }

  // Find forms assigned to the current page
  const matchedForms = forms.filter((form) => {
    if (!form.assignedPages || form.assignedPages.length === 0) return false
    // Landing pages are accessible at both /slug and /lp/slug
    const pathsToCheck = [pathname]
    if (pathname.startsWith('/lp/')) {
      pathsToCheck.push('/' + pathname.slice(4)) // /lp/foo → /foo
    } else if (pathname !== '/') {
      pathsToCheck.push('/lp' + pathname) // /foo → /lp/foo
    }
    return form.assignedPages.some((page) => {
      for (const p of pathsToCheck) {
        if (page === p) return true
        if (page.endsWith('/*')) {
          const prefix = page.slice(0, -2)
          if (p.startsWith(prefix)) return true
        }
      }
      return false
    })
  })

  const currentForm = matchedForms[0] || null
  const hasForm = currentForm !== null

  const openFormPopup = useCallback(() => {
    if (hasForm) setIsOpen(true)
  }, [hasForm])

  const closeFormPopup = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFormPopup()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeFormPopup])

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <FormPopupContext.Provider
      value={{ hasForm, currentForm, openFormPopup, closeFormPopup, isOpen, pagePath: pathname, utmParams }}
    >
      {children}

      {/* Popup Modal Overlay */}
      <AnimatePresence>
        {isOpen && currentForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={currentForm.name || 'Form'}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeFormPopup}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={closeFormPopup}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Close form"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Form title */}
              {currentForm.name && (
                <div className="px-8 pt-8 pb-2">
                  <h3 className="text-xl font-bold text-gray-900">{currentForm.name}</h3>
                </div>
              )}

              {/* Form content */}
              <div className="px-8 pb-8 pt-4">
                <ZohoFormEmbed
                  form={{
                    ...currentForm,
                    // Override display to inline (we handle the modal wrapper)
                    displayMode: 'iframe',
                  }}
                  pageSource={pathname}
                  utmParams={utmParams}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormPopupContext.Provider>
  )
}
