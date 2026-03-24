'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FormFieldRenderer } from './FormFieldRenderer'
import type { ZohoFormFieldData } from '@/sanity/lib/fetch'

interface DynamicZohoFormProps {
  fields: ZohoFormFieldData[]
  zohoFormPermalink: string
  zohoFormLinkName?: string
  zohoPortalName?: string
  submitButtonText?: string
  successMessage?: string
  successRedirectUrl?: string
  className?: string
  /** Page source for lead attribution tracking */
  pageSource?: string
  /** UTM parameters to pass through */
  utmParams?: Record<string, string>
}

function validateField(field: ZohoFormFieldData, value: string): string | undefined {
  if (field.required && !value.trim()) {
    return `${field.label} is required`
  }

  if (!value.trim()) return undefined

  if (field.fieldType === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
  }

  if (field.fieldType === 'phone') {
    const phoneRegex = /^[+]?[\d\s()-]{7,20}$/
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number'
    }
  }

  if (field.validationPattern) {
    try {
      const regex = new RegExp(field.validationPattern)
      if (!regex.test(value)) {
        return field.validationMessage || `${field.label} is not in the expected format`
      }
    } catch {
      // Invalid regex pattern from CMS — skip custom validation
    }
  }

  return undefined
}

export function DynamicZohoForm({
  fields,
  zohoFormPermalink,
  zohoFormLinkName,
  zohoPortalName,
  submitButtonText = 'Submit',
  successMessage = 'Thank you! Your submission has been received.',
  successRedirectUrl,
  className,
  pageSource,
  utmParams,
}: DynamicZohoFormProps) {
  // Initialize form data with default values
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    for (const field of fields) {
      initial[field.zohoFieldName] = field.defaultValue || ''
    }
    // Auto-inject tracking fields
    if (pageSource) initial['Page_Source'] = pageSource
    if (typeof window !== 'undefined') initial['Page_URL'] = window.location.href
    if (utmParams) {
      for (const [key, value] of Object.entries(utmParams)) {
        initial[key] = value
      }
    }
    return initial
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  const handleChange = useCallback((fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
    // Clear error on change
    setErrors((prev) => {
      if (!prev[fieldName]) return prev
      const next = { ...prev }
      delete next[fieldName]
      return next
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    // Validate all fields
    const newErrors: Record<string, string> = {}
    for (const field of fields) {
      const error = validateField(field, formData[field.zohoFieldName] || '')
      if (error) {
        newErrors[field.zohoFieldName] = error
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/zoho-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zohoFormPermalink,
          zohoFormLinkName: zohoFormLinkName || '',
          zohoPortalName: zohoPortalName || 'movingwallsholdingpteltd',
          fields: formData,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        setSubmitState('error')
        setSubmitError(result.error || 'Submission failed. Please try again.')
        return
      }

      setSubmitState('success')

      if (successRedirectUrl) {
        window.location.href = successRedirectUrl
      }
    } catch {
      setSubmitState('error')
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (submitState === 'success' && !successRedirectUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center py-12 px-6 ${className || ''}`}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg text-gray-700">{successMessage}</p>
      </motion.div>
    )
  }

  const visibleFields = fields.filter((f) => f.fieldType !== 'hidden')
  const hiddenFields = fields.filter((f) => f.fieldType === 'hidden')

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {/* Hidden fields */}
      {hiddenFields.map((field) => (
        <input
          key={field.zohoFieldName}
          type="hidden"
          name={field.zohoFieldName}
          value={formData[field.zohoFieldName] || ''}
        />
      ))}

      {/* Honeypot field for spam protection */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
        <input
          type="text"
          name="_honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={formData._honeypot || ''}
          onChange={(e) => handleChange('_honeypot', e.target.value)}
        />
      </div>

      {/* Visible fields */}
      <div className="flex flex-wrap gap-4">
        {visibleFields.map((field) => (
          <FormFieldRenderer
            key={field.zohoFieldName}
            field={field}
            value={formData[field.zohoFieldName] || ''}
            onChange={handleChange}
            error={errors[field.zohoFieldName]}
          />
        ))}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {submitState === 'error' && submitError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-sm text-red-600">{submitError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  )
}

export default DynamicZohoForm
