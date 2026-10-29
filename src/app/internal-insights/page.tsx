import { Metadata } from 'next'
import { isAuthed } from '@/lib/insights/auth'
import { getDashboard } from '@/lib/insights/data'
import { getActionStatuses } from '@/lib/insights/actions'
import { DEFAULT_RANGE, RANGE_KEYS, periods, type RangeKey } from '@/lib/insights/ranges'
import { DEFAULT_TAB, TABS, type TabKey } from '@/lib/insights/tabs'
import { isInsightsConfigured } from '@/lib/insights/google'
import InsightsLogin from './InsightsLogin'
import InsightsShell from './InsightsShell'
import InsightsDashboard from './InsightsDashboard'
import CampaignsTab from './CampaignsTab'

// Internal, password-protected performance dashboard. Not in the sitemap, not linked anywhere,
// and noindex (meta tag here + X-Robots-Tag header in next.config.ts). Deliberately NOT listed
// in robots.txt, which would advertise the URL.

export const metadata: Metadata = {
  title: 'Internal Insights | Moving Walls',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export const dynamic = 'force-dynamic'

const Message = ({ title, detail }: { title: string; detail?: string }) => (
  <div className="max-w-xl mx-auto py-16 px-4 text-center">
    <p className="font-semibold text-gray-900 mb-2">{title}</p>
    {detail && <p className="text-sm text-gray-500">{detail}</p>}
  </div>
)

async function LocationsTab({ range }: { range: RangeKey }) {
  if (!(await isInsightsConfigured())) return <Message title="Data connection is not configured." detail="Google settings are missing." />
  try {
    // Statuses are read fresh on every visit (not cached) so everyone sees the latest
    const [data, statuses] = await Promise.all([getDashboard(range), getActionStatuses()])
    return <InsightsDashboard data={data} statuses={statuses} />
  } catch (err) {
    return <Message title="Could not load data from Google." detail={err instanceof Error ? err.message : String(err)} />
  }
}

export default async function InternalInsightsPage({ searchParams }: { searchParams: Promise<{ range?: string; tab?: string }> }) {
  if (!(await isAuthed())) return <InsightsLogin />

  const params = await searchParams
  const range: RangeKey = RANGE_KEYS.includes(params.range as RangeKey) ? (params.range as RangeKey) : DEFAULT_RANGE
  const tab: TabKey = TABS.some((t) => t.key === params.tab) ? (params.tab as TabKey) : DEFAULT_TAB

  return (
    <InsightsShell tab={tab} range={range} period={periods(range)}>
      {tab === 'campaigns' ? <CampaignsTab /> : <LocationsTab range={range} />}
    </InsightsShell>
  )
}
