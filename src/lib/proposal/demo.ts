import 'server-only'
import { sitesFor } from '@/lib/inventory/source'
import { rulesPick } from './pick'
import { titleLineFor, resolveSites } from './store'
import type { Brief, ProposalDoc, ProposalVersion, ProposalView } from './types'

// A sample proposal built from the live inventory, for reviewing the proposal
// page and the editor on staging without saving anything. /proposals/demo.
// Rif, 11 Nov 2026.

export const DEMO_SHARE_ID = 'demo'

const BRIEF: Brief = {
  countrySlug: 'malaysia', citySlug: 'kuala-lumpur', cityName: 'Kuala Lumpur',
  startDate: '2027-01-12', durationWeeks: 4, objective: 'launch',
  audience: 'Office workers in the Golden Triangle, 25–45, who shop at KLCC and Pavilion after work',
  industry: 'Beauty', budgetBand: 'mid', formats: [], targetSites: 5,
}

export async function buildDemoView(): Promise<ProposalView | null> {
  const candidates = await sitesFor(BRIEF.countrySlug, BRIEF.citySlug)
  if (!candidates.length) return null
  const pick = rulesPick(BRIEF, candidates, [], BRIEF.targetSites)
  const now = new Date().toISOString()
  const v1: ProposalVersion = { n: 1, createdAt: now, source: 'rules', summary: 'A launch plan across five sites in Kuala Lumpur over four weeks: two landmark highway unipoles on the main commuter routes into the city, a roadside LED on Jalan Tun Razak beside KLCC, and two screens in Bukit Bintang where the audience shops after work. The digital sites carry a countdown creative in the first week and the launch creative from day one; the unipoles hold the hero visual throughout. The Moving Walls team confirms availability before anything is booked.', sites: pick.sites }
  const doc: ProposalDoc = {
    _id: 'proposal-demo', shareId: DEMO_SHARE_ID, editTokenHash: '', status: 'sent', titleLine: titleLineFor(BRIEF),
    creator: { name: '', email: '', company: 'Example Beauty Co.', country: 'Malaysia' }, leadId: null, brief: BRIEF,
    currentVersion: 1, versions: [v1], changeRequests: [], approvedAt: null, createdAt: now, updatedAt: now,
  }
  return resolveSites(doc)
}
