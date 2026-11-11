import 'server-only'
import { sitesFor } from '@/lib/inventory/source'
import { pickPlan, rulesPick } from './pick'
import { cityOf } from './markets'
import { titleLineFor, resolveSites } from './store'
import type { Brief, ProposalDoc, ProposalVersion, ProposalView } from './types'

// A sample proposal built from the live inventory, for reviewing the proposal
// page and the editor on staging without saving anything. /proposals/demo.
// `cities` (from ?cities=kuala-lumpur,penang) shows a multi-city plan.
// Rif, 11 Nov 2026.

export const DEMO_SHARE_ID = 'demo'

const BRIEF: Brief = {
  countrySlug: 'malaysia', cities: ['kuala-lumpur'], countryWide: false, citySlug: 'kuala-lumpur', cityName: 'Kuala Lumpur',
  startDate: '2027-01-12', durationWeeks: 4, objective: 'launch',
  audience: 'Office workers in the Golden Triangle, 25–45, who shop at KLCC and Pavilion after work',
  industry: 'Beauty', budgetBand: 'mid', formats: [], targetSites: 5,
}

const KL_SUMMARY = 'A launch plan across five sites in Kuala Lumpur over four weeks: two landmark highway unipoles on the main commuter routes into the city, a roadside LED on Jalan Tun Razak beside KLCC, and two screens in Bukit Bintang where the audience shops after work. The digital sites carry a countdown creative in the first week and the launch creative from day one; the unipoles hold the hero visual throughout. The Moving Walls team confirms availability before anything is booked.'

export async function buildDemoView(cities: string[] = ['kuala-lumpur']): Promise<ProposalView | null> {
  const wanted = Array.from(new Set(cities.map(c => c.trim()).filter(c => cityOf(BRIEF.countrySlug, c)?.available)))
  const briefCities = wanted.length ? wanted : ['kuala-lumpur']
  const brief: Brief = { ...BRIEF, cities: briefCities, citySlug: briefCities[0], cityName: cityOf(BRIEF.countrySlug, briefCities[0])?.name ?? 'Kuala Lumpur' }
  const kl = await sitesFor(BRIEF.countrySlug, 'kuala-lumpur')
  if (!kl.length) return null
  const single = briefCities.length === 1 && briefCities[0] === 'kuala-lumpur'
  const pick = single
    ? (() => { const base = rulesPick(brief, kl, [], brief.targetSites); return { ...base, sites: base.sites.map(s => ({ ...s, citySlug: 'kuala-lumpur' })) } })()
    : await pickPlan({ ...brief, targetSites: 4 + 3 * (briefCities.length - 1) }, [])
  const now = new Date().toISOString()
  const v1: ProposalVersion = { n: 1, createdAt: now, source: 'rules', summary: single ? KL_SUMMARY : pick.summary, sites: pick.sites }
  const doc: ProposalDoc = {
    _id: 'proposal-demo', shareId: DEMO_SHARE_ID, editTokenHash: '', status: 'sent', titleLine: titleLineFor(brief),
    creator: { name: '', email: '', company: 'Example Beauty Co.', country: 'Malaysia' }, leadId: null, brief,
    currentVersion: 1, versions: [v1], changeRequests: [], cityRequests: [], participants: [],
    shown: { options: [], postApproval: [] }, derivedFrom: null,
    approvedAt: null, createdAt: now, updatedAt: now,
  }
  return resolveSites(doc)
}
