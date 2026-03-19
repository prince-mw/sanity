import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Leadership Team | Moving Walls',
    description: 'Meet the visionaries behind Moving Walls - coming soon.',
    robots: { index: false, follow: false },
  };
}

export const revalidate = 300

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mw-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-mw-blue-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-mw-gray-900 mb-4">
            Under Construction
          </h1>
          <p className="text-xl text-mw-gray-600 mb-8">
            We&apos;re working on something great. Our leadership page will be available soon.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/about"
            className="px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Learn About Us
          </Link>
          <Link
            href="/"
            className="px-8 py-4 bg-white border-2 border-mw-gray-300 hover:border-mw-blue-600 text-mw-gray-700 hover:text-mw-blue-600 font-semibold rounded-lg transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
