'use client'

import { motion } from "framer-motion"
import Link from 'next/link'

// Static fallback content
const STATIC_FORM_URL = 'https://xjwif-zgpm.maillist-manage.com/ua/Optin?od=11287ecbeb72cd&zx=13089112c&tD=1d17ccf5180e2411&sD=1d17ccf51ad46835'
const STATIC_HEADLINE = 'Get Industry Insights Delivered Weekly'
const STATIC_DESCRIPTION = 'Stay ahead of how cities evolve, how audiences move, and how connected media reshapes advertising across regions.'

interface NewsletterPageClientProps {
  formUrl?: string | null
  headline?: string | null
  description?: string | null
}

export default function NewsletterPageClient({
  formUrl,
  headline,
  description,
}: NewsletterPageClientProps) {
  const embedUrl = formUrl || STATIC_FORM_URL
  const displayHeadline = headline || STATIC_HEADLINE
  const displayDescription = description || STATIC_DESCRIPTION

  // Split headline into lines for styled rendering
  const headlineParts = displayHeadline.split(' ')
  const midpoint = Math.ceil(headlineParts.length / 2)
  const lineOne = headlineParts.slice(0, midpoint).join(' ')
  const lineTwo = headlineParts.slice(midpoint).join(' ')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">

      {/* Top Header Back Navigation */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
        >
          ← Back to Homepage
        </Link>
      </div>

      {/* Main Core Body Segment */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

          {/* Left Column: Headline + Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight flex flex-col">
              <span>{lineOne}</span>
              {lineTwo && <span className="text-blue-600">{lineTwo}</span>}
            </h1>

            <p className="text-gray-600 text-lg md:text-xl max-w-xl font-light leading-relaxed">
              {displayDescription}
            </p>
          </motion.div>

          {/* Right Column: Newsletter Form Embed */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center w-full">
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl w-full max-w-[410px] relative overflow-hidden pt-10 pb-4 px-2 transition-all">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />

              <div className="w-full h-[340px] bg-white rounded-2xl overflow-hidden">
                <iframe
                  id="newsletter-signup-iframe"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 overflow-hidden"
                  src={embedUrl}
                  title="Newsletter Signup Form"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Moving Walls. All rights reserved.
      </div>

    </div>
  )
}
