// Which options a client sees (Rif, 11 Nov 2026): decided once, here, not per
// proposal by the visitor — the creator on this site usually *is* the client,
// so asking them to pick their own upsells makes no sense. Moving Walls staff
// can still override a proposal from the editor; an override is any non-empty
// `shown` on the document.
//
// Rule: smallest ask first. Before approval, a longer run when the plan is
// short (or the moment suggestion), plus the one service that fits the
// objective. After approval, the bigger plan where one exists, plus the next
// service not already offered.

import type { Brief, Suggestion, Tier } from './types'
import type { Objective } from './types'

export type Shown = { options: string[]; postApproval: string[] }

const SERVICE_BY_OBJECTIVE: Record<Objective, string> = { launch: 'creative', awareness: 'planner', footfall: 'measure', event: 'dynamic' }
const SERVICE_ORDER = ['measure', 'planner', 'creative', 'market', 'dynamic']

export function autoShown(brief: Brief, suggestions: Suggestion[], tiers: Tier[]): Shown {
  const has = (id: string) => suggestions.some(s => s.id === id)
  const first = (brief.durationWeeks != null && brief.durationWeeks <= 4 && has('run-8-weeks')) ? 'run-8-weeks' : suggestions.find(s => s.kind === 'moment')?.id ?? suggestions.find(s => s.kind === 'audience')?.id ?? null
  const service = SERVICE_BY_OBJECTIVE[brief.objective ?? 'awareness'] ?? 'planner'
  const options = [first, service].filter((x): x is string => !!x)

  const larger = tiers.find(t => t.id === 'full' && !t.current) ? 'larger' : null
  const nextService = SERVICE_ORDER.find(s => !options.includes(s)) ?? null
  const postApproval = [larger, nextService].filter((x): x is string => !!x)
  return { options: options.slice(0, 2), postApproval: postApproval.slice(0, 2) }
}

/** The document's override when staff set one, else the rule. */
export function effectiveShown(doc: { shown?: Shown | null; brief: Brief }, suggestions: Suggestion[], tiers: Tier[]): Shown {
  const s = doc.shown
  if (s && (s.options.length > 0 || s.postApproval.length > 0)) return s
  return autoShown(doc.brief, suggestions, tiers)
}

/** Why this one leads, in the client's words, from the brief's objective. */
export const recommendedBecause = (objective: Objective | null): string => ({
  launch: 'Recommended for a launch',
  awareness: 'Recommended for awareness',
  footfall: 'Recommended for footfall',
  event: 'Recommended for an event',
} as Record<string, string>)[objective ?? ''] ?? 'Recommended for this plan'
