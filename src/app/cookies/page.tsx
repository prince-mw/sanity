'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CookiePolicyPage() {
  const lastUpdated = "January 31, 2026"

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-200">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners useful information about how their site is being used.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Cookies can be "persistent" (remaining on your device until deleted) or "session" (deleted when you close your browser). They can be set by the website you're visiting ("first-party cookies") or by third parties ("third-party cookies").
              </p>
            </div>

            {/* How We Use Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Moving Walls uses cookies and similar technologies for several purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To ensure our website functions properly</li>
                <li>To remember your preferences and settings</li>
                <li>To understand how you use our website</li>
                <li>To improve our services and user experience</li>
                <li>To deliver relevant advertising (with your consent)</li>
              </ul>
            </div>

            {/* Types of Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              
              {/* Essential Cookies */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Essential Cookies (Required)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-green-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Cookie Name</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Purpose</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-green-100">
                        <td className="py-2">mw_cookie_consent</td>
                        <td className="py-2">Stores your cookie consent preferences</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr className="border-b border-green-100">
                        <td className="py-2">mw_session</td>
                        <td className="py-2">Maintains your session state</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr>
                        <td className="py-2">csrf_token</td>
                        <td className="py-2">Security token for form submissions</td>
                        <td className="py-2">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Functional Cookies (Optional)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-blue-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Cookie Name</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Purpose</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-blue-100">
                        <td className="py-2">mw_language</td>
                        <td className="py-2">Remembers your language preference</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2">mw_region</td>
                        <td className="py-2">Stores your regional preferences</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr>
                        <td className="py-2">mw_theme</td>
                        <td className="py-2">Remembers display preferences</td>
                        <td className="py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Analytics Cookies (Optional)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Cookie Name</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Purpose</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-purple-100">
                        <td className="py-2">_ga</td>
                        <td className="py-2">Google Analytics - Distinguishes users</td>
                        <td className="py-2">2 years</td>
                      </tr>
                      <tr className="border-b border-purple-100">
                        <td className="py-2">_ga_*</td>
                        <td className="py-2">Google Analytics 4 - Session state</td>
                        <td className="py-2">2 years</td>
                      </tr>
                      <tr>
                        <td className="py-2">_gid</td>
                        <td className="py-2">Google Analytics - Distinguishes users</td>
                        <td className="py-2">24 hours</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Marketing Cookies (Optional)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant adverts on other sites.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-orange-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Cookie Name</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Purpose</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-orange-100">
                        <td className="py-2">_fbp</td>
                        <td className="py-2">Meta Pixel - Advertising delivery</td>
                        <td className="py-2">90 days</td>
                      </tr>
                      <tr className="border-b border-orange-100">
                        <td className="py-2">li_fat_id</td>
                        <td className="py-2">LinkedIn Ads - Member tracking</td>
                        <td className="py-2">30 days</td>
                      </tr>
                      <tr>
                        <td className="py-2">IDE</td>
                        <td className="py-2">Google Ads - Conversion tracking</td>
                        <td className="py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Our Cookie Consent Tool</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you first visit our website, you will see a cookie consent banner that allows you to accept or customize your cookie preferences. You can change your preferences at any time by clicking the "Cookie Settings" link in the footer of our website.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Browser Settings</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options" or "Preferences" menu of your browser. Here are links to manage cookies in popular browsers:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Apple Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Opt-Out Links</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can also opt out of certain third-party cookies using these services:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-Out</a></li>
                <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Digital Advertising Alliance</a></li>
                <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Your Online Choices (EU)</a></li>
              </ul>
            </div>

            {/* Updates */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Changes to This Cookie Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. When we make changes, we will update the "Last Updated" date at the top of this page. We encourage you to periodically review this page for the latest information on our cookie practices.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 mb-2"><strong>Moving Walls Pte. Ltd.</strong></p>
                <p className="text-gray-600 mb-2">Email: privacy@movingwalls.com</p>
                <p className="text-gray-600 mb-2">Address: Far East Finance Building, #8-02, 14 Robinson Road, Singapore 048545</p>
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">
                For more information about how we handle your personal data, please see our{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </p>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  )
}
