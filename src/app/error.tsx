'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-mw-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Error Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-200 rounded-full opacity-60" />
          <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-red-200 rounded-full opacity-60" />
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-mw-gray-900 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-mw-gray-600 mb-8 leading-relaxed">
          We apologize for the inconvenience. An unexpected error occurred while loading this page. 
          Our team has been notified.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-8 text-left bg-mw-gray-100 rounded-lg p-4">
            <summary className="cursor-pointer text-sm font-medium text-mw-gray-700 mb-2">
              Error Details (Dev Only)
            </summary>
            <pre className="text-xs text-red-600 overflow-auto max-h-40 p-2 bg-white rounded">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mw-blue-600 text-white rounded-lg font-medium hover:bg-mw-blue-700 transition-colors shadow-lg shadow-mw-blue-600/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-mw-gray-700 rounded-lg font-medium hover:bg-mw-gray-50 transition-colors border border-mw-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-mw-gray-500">
          If the problem persists, please{' '}
          <Link href="/contact" className="text-mw-blue-600 hover:underline">
            contact our support team
          </Link>
        </p>
      </div>
    </div>
  )
}
