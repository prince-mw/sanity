import { Metadata } from 'next'
import { isAuthed } from '@/lib/insights/auth'
import { getDashboard } from '@/lib/insights/data'
import { getActionStatuses } from '@/lib/insights/actions'
import { DEFAULT_RANGE, RANGE_KEYS, calendarPeriods, periods, type RangeKey } from '@/lib/insights/ranges'
import { DEFAULT_TAB, TABS, type TabKey } from '@/lib/insights/tabs'
import { isInsightsConfigured } from '@/lib/insights/google'
import InsightsLogin from './InsightsLogin'
import InsightsShell from './InsightsShell'
import InsightsDashboard from './InsightsDashboard'
import CampaignsTab from './CampaignsTab'
import { getCampaignDashboard } from '@/lib/insights/campaigns'
import { isZohoConfigured } from '@/lib/insights/zoho'
import { getProjectsDashboard } from '@/lib/insights/projects'
import ProjectsTab from './ProjectsTab'
import { getContentDashboard } from '@/lib/insights/content'
import ContentTab from './ContentTab'
import { getBlogAudit } from '@/lib/insights/blogAudit'
import BlogTab from './BlogTab'
import { getLeadsDashboard } from '@/lib/insights/leads'
import LeadsTab from './LeadsTab'

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

async function CampaignsSection({ range }: { range: RangeKey }) {
  if (!(await isZohoConfigured())) return <Message title="Waiting for the Zoho Analytics connection." detail="Email campaign results will appear here once read-only Zoho Analytics access is set up." />
  try {
    const [data, statuses] = await Promise.all([getCampaignDashboard(range), getActionStatuses()])
    return <CampaignsTab data={data} statuses={statuses} />
  } catch (err) {
    return <Message title="Could not load data from Zoho Analytics." detail={err instanceof Error ? err.message : String(err)} />
  }
}

async function ProjectsSection({ range }: { range: RangeKey }) {
  if (!(await isZohoConfigured())) return <Message title="Waiting for the Zoho Analytics connection." detail="Roadmap and execution data will appear here once read-only Zoho Analytics access is set up." />
  try {
    const [data, statuses] = await Promise.all([getProjectsDashboard(range), getActionStatuses()])
    return <ProjectsTab data={data} statuses={statuses} />
  } catch (err) {
    return <Message title="Could not load data from Zoho Analytics." detail={err instanceof Error ? err.message : String(err)} />
  }
}

async function ContentSection({ range }: { range: RangeKey }) {
  if (!(await isZohoConfigured())) return <Message title="Waiting for the Zoho Analytics connection." detail="Content and social data will appear here once read-only Zoho Analytics access is set up." />
  try {
    const [data, statuses] = await Promise.all([getContentDashboard(range), getActionStatuses()])
    return <ContentTab data={data} statuses={statuses} />
  } catch (err) {
    return <Message title="Could not load content data." detail={err instanceof Error ? err.message : String(err)} />
  }
}

async function LeadsSection({ range }: { range: RangeKey }) {
  if (!(await isZohoConfigured())) return <Message title="Waiting for the Zoho Analytics connection." detail="Lead and deal data will appear here once read-only Zoho Analytics access is set up." />
  try {
    // Website leads by page come from the Location pages data (GA4); the tab still loads without them
    const [data, site] = await Promise.all([getLeadsDashboard(range), getDashboard(range).catch(() => null)])
    return <LeadsTab data={data} websiteLeads={site?.leadSources ?? null} />
  } catch (err) {
    return <Message title="Could not load lead and deal data from Zoho Analytics." detail={err instanceof Error ? err.message : String(err)} />
  }
}

async function BlogSection() {
  try {
    const [data, statuses] = await Promise.all([getBlogAudit(), getActionStatuses()])
    if (!data) return <Message title="The blog audit isn't available." detail="The audit data could not be read from the CMS." />
    return <BlogTab data={data} statuses={statuses} />
  } catch (err) {
    return <Message title="Could not load the blog audit." detail={err instanceof Error ? err.message : String(err)} />
  }
}

export default async function InternalInsightsPage({ searchParams }: { searchParams: Promise<{ range?: string; tab?: string }> }) {
  if (!(await isAuthed())) return <InsightsLogin />

  const params = await searchParams
  const range: RangeKey = RANGE_KEYS.includes(params.range as RangeKey) ? (params.range as RangeKey) : DEFAULT_RANGE
  const tab: TabKey = TABS.some((t) => t.key === params.tab) ? (params.tab as TabKey) : DEFAULT_TAB

  return (
    <InsightsShell tab={tab} range={range} period={tab === 'projects' ? calendarPeriods(range) : periods(range)} snapshot={tab === 'blog' ? 'Snapshot audit · 30 Oct 2026 · data 29 Oct 2025 – 29 Oct 2026' : undefined}>
      {tab === 'campaigns' ? <CampaignsSection range={range} /> : tab === 'leads' ? <LeadsSection range={range} /> : tab === 'content' ? <ContentSection range={range} /> : tab === 'blog' ? <BlogSection /> : tab === 'projects' ? <ProjectsSection range={range} /> : <LocationsTab range={range} />}
    </InsightsShell>
  )
}
