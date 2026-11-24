import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@/lib/insights/auth'
import { getInsightsConfig } from '@/lib/insights/config'
import { RESTRICTED_TABS } from '@/lib/insights/tabs'
import { parseRange, type RangeKey } from '@/lib/insights/ranges'
import { getActionStatuses } from '@/lib/insights/actions'
import { isInsightsConfigured } from '@/lib/insights/google'
import { isZohoConfigured } from '@/lib/insights/zoho'
import { getDashboard } from '@/lib/insights/data'
import { getAdsDashboard } from '@/lib/insights/ads'
import { getBlogAudit } from '@/lib/insights/blogAudit'
import { getLeadsDashboard } from '@/lib/insights/leads'
import { getCampaignDashboard } from '@/lib/insights/campaigns'
import { getContentDashboard } from '@/lib/insights/content'
import { getPipelineDashboard } from '@/lib/insights/pipeline'
import { OVERVIEW_PARTS, buildOverviewPiece, unavailablePiece, type OverviewPart, type OverviewPiece, type OverviewSources } from '@/lib/insights/overview'
import { isSnapshotRange, readSnapshots, writeSnapshot } from '@/lib/insights/overviewCache'

// GET ?part=<source>&range=<range> → one source's piece of the Overview tab (OverviewPiece JSON), built from the data
//   and saved as the shared snapshot (overviewCache.ts).
// GET ?part=saved&range=<range> → { pieces, stale, at } — every usable saved snapshot at once (quick). The browser then
//   loads any missing piece, and afterwards re-requests the stale ones, with ?part=<source> (which saves a new snapshot).
//   (Rebuilding with next/server after() doesn't work on Amplify: work after the response is stopped.)
// The Overview page loads each piece with its own request, so a slow (cold-cache) source can't push the
// whole page past the hosting time limit. Requires the dashboard sign-in cookie.

export const dynamic = 'force-dynamic'

const headers = { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'private, no-store' }

const LOADERS: { [P in OverviewPart]: (range: ReturnType<typeof parseRange>) => Promise<OverviewSources[P] | null> } = {
  site: async (range) => ((await isInsightsConfigured()) ? getDashboard(range) : null),
  ads: async (range) => ((await isInsightsConfigured()) ? getAdsDashboard(range) : null),
  blog: () => getBlogAudit(),
  leads: async (range) => ((await isZohoConfigured()) ? getLeadsDashboard(range) : null),
  campaigns: async (range) => ((await isZohoConfigured()) ? getCampaignDashboard(range) : null),
  content: async (range) => ((await isZohoConfigured()) ? getContentDashboard(range) : null),
  pipeline: async () => ((await isZohoConfigured()) ? getPipelineDashboard() : null),
}

/** Builds one piece from its data; null when the source failed (not saved, so the next visit tries again) */
async function buildPiece(part: OverviewPart, range: RangeKey): Promise<OverviewPiece | null> {
  try {
    const [data, statuses] = await Promise.all([LOADERS[part](range), getActionStatuses().catch(() => ({}))])
    return data ? buildOverviewPiece(part, data, statuses) : unavailablePiece(part)
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const user = await currentUser()
  if (user === null) return NextResponse.json({ error: 'Not signed in.' }, { status: 401, headers })

  // Pipeline numbers stay hidden from people who can't open that tab (when it's restricted)
  const canSeePipeline = !RESTRICTED_TABS.includes('pipeline') || !!(user && (await getInsightsConfig()).pipelineViewers.includes(user))
  const range = parseRange(req.nextUrl.searchParams.get('range') ?? undefined)
  const part = req.nextUrl.searchParams.get('part')

  if (part === 'saved') {
    if (!isSnapshotRange(range)) return NextResponse.json({ pieces: {} }, { headers })
    const snaps = await readSnapshots(range, [...OVERVIEW_PARTS]).catch(() => ({}) as Awaited<ReturnType<typeof readSnapshots>>)
    const pieces: Partial<Record<OverviewPart, OverviewPiece>> = {}
    const stale: OverviewPart[] = []
    let oldest = ''
    for (const [p, s] of Object.entries(snaps) as [OverviewPart, NonNullable<(typeof snaps)[OverviewPart]>][]) {
      if (p === 'pipeline' && !canSeePipeline) continue
      pieces[p] = s.piece
      if (s.stale) stale.push(p)
      if (!oldest || s.at < oldest) oldest = s.at
    }
    return NextResponse.json({ pieces, stale, at: oldest }, { headers })
  }

  if (!OVERVIEW_PARTS.includes(part as OverviewPart)) return NextResponse.json({ error: 'Unknown part.' }, { status: 400, headers })
  const p = part as OverviewPart
  if (p === 'pipeline' && !canSeePipeline) return NextResponse.json({ headline: [] }, { headers })

  const piece = await buildPiece(p, range)
  // A source that fails shows "couldn't load" on its card; the rest of the Overview is unaffected
  if (!piece) return NextResponse.json(unavailablePiece(p), { headers })
  if (isSnapshotRange(range)) await writeSnapshot(range, p, piece)
  return NextResponse.json(piece, { headers })
}
