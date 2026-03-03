"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyFirstMeasurementPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-mw-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/press-news" className="inline-flex items-center text-mw-blue-600 hover:text-mw-blue-700 mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Press & News
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-mw-blue-100 text-mw-blue-600 text-sm font-medium rounded-full">
                Product Update
              </span>
              <span className="text-mw-gray-500">July 22, 2024</span>
              <span className="text-mw-gray-400">•</span>
              <span className="text-mw-gray-500">5 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-mw-gray-900 mb-6 leading-tight">
              New Privacy-First Measurement Suite Launches
            </h1>
            
            <p className="text-xl text-mw-gray-600 leading-relaxed mb-8">
              Industry-leading privacy compliance tools help brands navigate evolving data regulations while maintaining measurement effectiveness and attribution accuracy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Featured Image */}
            <div className="relative h-80 bg-gradient-to-br from-mw-blue-50 to-mw-blue-100 rounded-xl mb-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-mw-blue-700 font-medium">Privacy-First Measurement</p>
              </div>
            </div>

            <div className="text-mw-gray-700 space-y-6">
              <p className="text-lg font-medium text-mw-gray-900">
                NEW YORK, NY - July 22, 2024 - Moving Walls today unveiled its comprehensive Privacy-First Measurement Suite, designed to help brands maintain accurate attribution and measurement capabilities while ensuring full compliance with global privacy regulations including GDPR, CCPA, and emerging data protection laws.
              </p>

              <p>
                The new suite addresses the growing challenge brands face in measuring advertising effectiveness as third-party cookies phase out and privacy regulations become more stringent. Moving Walls's solution provides accurate measurement without compromising user privacy or regulatory compliance.
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Privacy by Design</h2>
              
              <p>
                The Privacy-First Measurement Suite is built on the principle of "privacy by design," ensuring that data protection and user consent are integral to every measurement process. The platform uses advanced techniques including differential privacy, federated learning, and anonymized cohort analysis to deliver insights without exposing individual user data.
              </p>

              <p>
                "Privacy isn't an afterthought in our measurement approach—it's the foundation," said Dr. Lisa Rodriguez, Chief Privacy Officer at Moving Walls. "We've engineered solutions that give advertisers the insights they need while respecting user privacy and meeting the highest compliance standards."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Key Features</h2>
              
              <p>
                The suite includes several groundbreaking features that set new industry standards for privacy-compliant measurement:
              </p>

              <ul className="space-y-3">
                <li><strong>Cookieless Attribution:</strong> Advanced statistical models provide accurate attribution without relying on third-party cookies</li>
                <li><strong>Consent Management Integration:</strong> Seamless integration with consent management platforms ensures compliance with user preferences</li>
                <li><strong>Differential Privacy Analytics:</strong> Mathematical techniques add statistical noise to protect individual privacy while preserving aggregate insights</li>
                <li><strong>First-Party Data Activation:</strong> Tools to maximize value from consented first-party data relationships</li>
                <li><strong>Cross-Device Tracking:</strong> Privacy-compliant methods for understanding cross-device customer journeys</li>
                <li><strong>Real-Time Privacy Monitoring:</strong> Continuous compliance monitoring with automated alerts for potential issues</li>
              </ul>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Regulatory Compliance</h2>
              
              <p>
                The platform has been designed to meet and exceed requirements from major privacy frameworks:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-mw-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-mw-gray-900 mb-2">GDPR Compliance</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Lawful basis validation</li>
                    <li>• Data minimization principles</li>
                    <li>• Right to erasure support</li>
                    <li>• Data portability features</li>
                  </ul>
                </div>
                <div className="bg-mw-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-mw-gray-900 mb-2">CCPA/CPRA Compliance</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Opt-out mechanism support</li>
                    <li>• Sensitive data protection</li>
                    <li>• Consumer rights fulfillment</li>
                    <li>• Third-party disclosure tracking</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Industry Impact</h2>
              
              <p>
                Early adopters of the Privacy-First Measurement Suite have reported maintaining 95% of their previous measurement accuracy while achieving full regulatory compliance. The solution has been particularly valuable for brands operating in multiple jurisdictions with varying privacy requirements.
              </p>

              <p>
                "The transition to privacy-first measurement seemed daunting, but Moving Walls made it seamless," said Michelle Thompson, VP of Digital Marketing at GlobalBrand Corp. "We're actually getting better insights than before because the data is cleaner and more actionable."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Technical Innovation</h2>
              
              <p>
                The suite leverages cutting-edge technologies including:
              </p>

              <ul className="space-y-2 ml-6">
                <li>• Machine learning models trained on privacy-safe datasets</li>
                <li>• Blockchain-based consent verification</li>
                <li>• Homomorphic encryption for secure data analysis</li>
                <li>• Zero-knowledge proofs for attribution validation</li>
                <li>• Federated learning for cross-platform insights</li>
              </ul>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Future-Proof Solution</h2>
              
              <p>
                As privacy regulations continue to evolve globally, Moving Walls's Privacy-First Measurement Suite is designed to adapt automatically to new requirements. The platform includes built-in flexibility to accommodate future regulatory changes without requiring significant technical modifications.
              </p>

              <p>
                "We're not just solving today's privacy challenges—we're building for the regulatory landscape of tomorrow," added Dr. Rodriguez. "Our clients can focus on growing their business while we handle the complexities of privacy compliance."
              </p>

              <h2 className="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">Availability</h2>
              
              <p>
                The Privacy-First Measurement Suite is now available to all Moving Walls clients, with enterprise features rolling out in phases through Q4 2024. The company is also offering comprehensive training programs and dedicated privacy consultation services to ensure successful implementation.
              </p>

              <div className="bg-mw-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-bold text-mw-gray-900 mb-4">Media Contact</h3>
                <p className="text-mw-gray-700">
                  Jennifer Walsh<br/>
                  Director of Communications<br/>
                  Moving Walls<br/>
                  Phone: (555) 123-4567<br/>
                  Email: media@movingwalls.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}