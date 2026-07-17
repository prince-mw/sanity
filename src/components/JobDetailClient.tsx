'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SanityPortableText from '@/components/SanityPortableText'

export interface JobDetail {
  id: string
  title: string
  slug: string
  department: string
  location: string
  type: string
  level: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  salaryRange: string
  applyLink: string
  applicationFormUrl: string
  fullDescription?: any[]
}

export interface RelatedJob {
  id: string
  title: string
  slug: string
  department: string
  location: string
  type: string
  level: string
  description: string
}

interface JobDetailClientProps {
  job: JobDetail
  relatedJobs: RelatedJob[]
}

export default function JobDetailClient({ job, relatedJobs }: JobDetailClientProps) {
  const [applicationModal, setApplicationModal] = useState<{ isOpen: boolean; formUrl: string }>({ 
    isOpen: false, 
    formUrl: '' 
  })

  const handleApply = () => {
    if (job.applicationFormUrl) {
      setApplicationModal({ isOpen: true, formUrl: job.applicationFormUrl })
    } else if (job.applyLink) {
      window.open(job.applyLink, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-mw-gray-600">
            <Link href="/" className="hover:text-mw-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/careers" className="hover:text-mw-blue-600 transition-colors">Careers</Link>
            <span>/</span>
            <span className="text-mw-gray-900 font-medium">{job.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                job.level === 'Senior' || job.level === 'senior' ? 'bg-purple-100 text-purple-600' : 
                job.level === 'Mid-Level' || job.level === 'mid' ? 'bg-blue-100 text-blue-600' : 
                job.level === 'Lead' || job.level === 'lead' ? 'bg-orange-100 text-orange-600' :
                job.level === 'Manager' || job.level === 'manager' ? 'bg-indigo-100 text-indigo-600' :
                job.level === 'Director' || job.level === 'director' ? 'bg-red-100 text-red-600' :
                'bg-green-100 text-green-600'
              }`}>
                {formatLevel(job.level)}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-mw-blue-100 text-mw-blue-600">
                {job.department}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mb-6">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-mw-gray-600 mb-8">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.type}
              </span>
              {job.salaryRange && (
                <span className="flex items-center gap-2 text-mw-blue-600 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {job.salaryRange}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleApply}
                className="inline-flex items-center gap-2 px-8 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-lg transition-colors shadow-mw-md"
              >
                Apply for this Role
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 border border-mw-gray-300 text-mw-gray-700 hover:bg-mw-gray-50 font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                All Positions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About the Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-mw-gray-900 mb-4">About the Role</h2>
                <p className="text-mw-gray-600 leading-relaxed text-lg">{job.description}</p>
              </motion.div>

              {/* Full Description (Portable Text) */}
              {job.fullDescription && job.fullDescription.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="prose prose-lg max-w-none prose-headings:text-mw-gray-900 prose-p:text-mw-gray-600 prose-li:text-mw-gray-600"
                >
                  <SanityPortableText value={job.fullDescription} />
                </motion.div>
              )}

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-mw-gray-900 mb-6">Responsibilities</h2>
                  <ul className="space-y-4">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-mw-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-mw-gray-600 text-lg">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-mw-gray-900 mb-6">Requirements</h2>
                  <ul className="space-y-4">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-mw-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-mw-gray-600 text-lg">{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-mw-gray-900 mb-6">Benefits</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {job.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-800 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Apply Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-mw-gray-50 rounded-xl p-6 border border-mw-gray-100"
                >
                  <h3 className="text-lg font-bold text-mw-gray-900 mb-4">Interested in this role?</h3>
                  <p className="text-mw-gray-600 mb-6">Apply now and join our team of innovators shaping the future of advertising technology.</p>
                  <button
                    onClick={handleApply}
                    className="w-full px-6 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Apply Now
                  </button>
                </motion.div>

                {/* Job Details Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl p-6 border border-mw-gray-200 shadow-mw-md"
                >
                  <h3 className="text-lg font-bold text-mw-gray-900 mb-4">Job Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-mw-gray-500">Department</span>
                      <span className="text-mw-gray-900 font-medium">{job.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mw-gray-500">Location</span>
                      <span className="text-mw-gray-900 font-medium">{job.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mw-gray-500">Type</span>
                      <span className="text-mw-gray-900 font-medium">{job.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mw-gray-500">Level</span>
                      <span className="text-mw-gray-900 font-medium">{formatLevel(job.level)}</span>
                    </div>
                    {job.salaryRange && (
                      <div className="flex justify-between">
                        <span className="text-mw-gray-500">Salary</span>
                        <span className="text-mw-blue-600 font-medium">{job.salaryRange}</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Share Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl p-6 border border-mw-gray-200"
                >
                  <h3 className="text-lg font-bold text-mw-gray-900 mb-4">Share this job</h3>
                  <div className="flex gap-3">
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.movingwalls.com/careers/${job.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-[#0077B5] text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${job.title} position at Moving Walls!`)}&url=${encodeURIComponent(`https://www.movingwalls.com/careers/${job.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`https://www.movingwalls.com/careers/${job.slug}`)
                      }}
                      className="flex items-center justify-center w-10 h-10 bg-mw-gray-200 text-mw-gray-700 rounded-lg hover:bg-mw-gray-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <section className="py-16 bg-mw-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-4">Other Opportunities</h2>
              <p className="text-lg text-mw-gray-600">Explore more positions that might interest you</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedJobs.map((relatedJob, index) => (
                <motion.div
                  key={relatedJob.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/careers/${relatedJob.slug}`}
                    className="block bg-white rounded-xl p-6 shadow-mw-md border border-mw-gray-100 hover:shadow-mw-lg transition-shadow h-full"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        relatedJob.level === 'Senior' || relatedJob.level === 'senior' ? 'bg-purple-100 text-purple-600' : 
                        relatedJob.level === 'Mid-Level' || relatedJob.level === 'mid' ? 'bg-blue-100 text-blue-600' : 
                        'bg-green-100 text-green-600'
                      }`}>
                        {formatLevel(relatedJob.level)}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-mw-gray-100 text-mw-gray-600">
                        {relatedJob.department}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-mw-gray-900 mb-2">{relatedJob.title}</h3>
                    <p className="text-sm text-mw-gray-600 mb-4 line-clamp-2">{relatedJob.description}</p>
                    <div className="flex items-center gap-4 text-sm text-mw-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {relatedJob.location}
                      </span>
                      <span>{relatedJob.type}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                View All Positions
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Application Modal */}
      {applicationModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setApplicationModal({ isOpen: false, formUrl: '' })}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-mw-gray-200">
              <h3 className="text-lg font-bold text-mw-gray-900">Apply for {job.title}</h3>
              <button 
                onClick={() => setApplicationModal({ isOpen: false, formUrl: '' })}
                className="p-2 hover:bg-mw-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-mw-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-[70vh]">
              <iframe 
                src={applicationModal.formUrl} 
                className="w-full h-full border-0"
                title="Application Form"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function formatLevel(level: string): string {
  const levels: Record<string, string> = {
    'entry': 'Entry Level',
    'mid': 'Mid-Level',
    'senior': 'Senior',
    'lead': 'Lead',
    'manager': 'Manager',
    'director': 'Director',
    'vp': 'VP',
    'Senior': 'Senior',
    'Mid-Level': 'Mid-Level',
    'Entry Level': 'Entry Level',
  }
  return levels[level] || level || 'Mid-Level'
}
