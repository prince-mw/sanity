import { Metadata } from 'next'
import { isAuthed } from '@/lib/insights/auth'
import { getDashboard } from '@/lib/insights/data'
import { DEFAULT_RANGE, RANGE_KEYS, type RangeKey } from '@/lib/insights/ranges'
import { isInsightsConfigured } from '@/lib/insights/google'
import InsightsLogin from './InsightsLogin'
import InsightsDashboard from './InsightsDashboard'

// Internal, password-protected performance dashboard. Not in the sitemap, not linked anywhere,
// and noindex (meta tag here + X-Robots-Tag header in next.config.ts). Deliberately NOT listed
// in robots.txt, which would advertise the URL.

export const metadata: Metadata = {
  title: 'Internal Insights | Moving Walls',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export const dynamic = 'force-dynamic'

export default async function InternalInsightsPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  if (!(await isAuthed())) return <InsightsLogin />

  if (!(await isInsightsConfigured())) {
    return <p className="max-w-xl mx-auto py-32 px-4 text-center text-gray-600">Data connection is not configured (GOOGLE_SA_KEY_B64).</p>
  }

  const { range } = await searchParams
  const key: RangeKey = RANGE_KEYS.includes(range as RangeKey) ? (range as RangeKey) : DEFAULT_RANGE
  try {
    const data = await getDashboard(key)
    return <InsightsDashboard data={data} range={key} />
  } catch (err) {
    return (
      <div className="max-w-xl mx-auto py-32 px-4 text-center">
        <p className="font-semibold text-gray-900 mb-2">Could not load data from Google.</p>
        <p className="text-sm text-gray-500">{err instanceof Error ? err.message : String(err)}</p>
      </div>
    )
  }
}
