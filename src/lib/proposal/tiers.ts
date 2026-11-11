import 'server-only'
import type { PublicSite } from '@/lib/inventory/types'
import { ruleScore } from './pick'
import type { AudienceGroup, Brief, Suggestion, TierId, VersionSite } from './types'

// Three sizes of the same plan, and the suggestions that make it stronger.
// Both are computed from the current version and the candidate pool at view
// time, never stored: a client click publishes the chosen list as a version.
// Rif, 11 Nov 2026: Essentials = strongest 60% of the plan (the downsell that
// keeps the deal); Full coverage = the plan + up to 4 sites in formats it lacks.

const fmtOf = (s: PublicSite) => (s.displayFormat ?? s.format ?? 'Outdoor').trim()
const isMall = (s: PublicSite) => /mall|retail|shop|concourse|atrium/i.test(`${s.venueType} ${s.format} ${s.displayFormat} ${s.name}`)
const isTransit = (s: PublicSite) => /transit|rail|train|station|mrt|lrt|bus|commuter/i.test(`${s.venueType} ${s.format} ${s.displayFormat} ${s.name}`)
const isResidential = (s: PublicSite) => /residential|condo|elevator|lift|lobby/i.test(`${s.venueType} ${s.format} ${s.displayFormat} ${s.name}`)
const isAirport = (s: PublicSite) => /airport|klia|terminal/i.test(`${s.venueType} ${s.format} ${s.displayFormat} ${s.name}`)

const byScore = (brief: Brief) => (a: PublicSite, b: PublicSite) => ruleScore(brief, b) - ruleScore(brief, a) || a.name.localeCompare(b.name)

function reasonFor(s: PublicSite, why: string): string {
  const f = fmtOf(s), where = s.areaName ? ` in ${s.areaName}` : ''
  return `${f}${where}: ${why}${s.audience?.impressions ? `; ${s.audience.impressions} impressions a month` : ''}.`
}

export function buildTiers(brief: Brief, current: VersionSite[], candidates: PublicSite[]): { id: TierId; label: string; blurb: string; sites: VersionSite[] }[] {
  const inPlan = new Set(current.map(s => s.siteId))
  const byId = new Map(candidates.map(s => [s.id, s]))
  const ordered = [...current].sort((a, b) => a.order - b.order)
  const keep = Math.max(2, Math.round(ordered.length * 0.6))
  const essentials = ordered.slice(0, Math.min(keep, ordered.length)).map((s, i) => ({ ...s, order: i }))

  const formatsIn = new Set(ordered.map(s => byId.get(s.siteId)).filter(Boolean).map(s => fmtOf(s!)))
  const rest = candidates.filter(s => !inPlan.has(s.id)).sort(byScore(brief))
  const newFormats = rest.filter(s => !formatsIn.has(fmtOf(s)))
  const extras = [...newFormats, ...rest.filter(s => !newFormats.includes(s))].slice(0, 4)
  const full = [...ordered, ...extras.map(s => ({ siteId: s.id, siteName: s.name, reason: reasonFor(s, formatsIn.has(fmtOf(s)) ? 'adds reach where the plan is already strong' : 'a format the plan did not have, for a different moment of the day'), order: 0, citySlug: s.citySlug }))].map((s, i) => ({ ...s, order: i }))

  return [
    { id: 'essentials', label: 'Essentials', blurb: `The ${essentials.length} strongest sites, for a tight budget.`, sites: essentials },
    { id: 'recommended', label: 'Recommended', blurb: 'The plan built for your brief.', sites: ordered },
    { id: 'full', label: 'Full coverage', blurb: extras.length ? `Everything in Recommended plus ${extras.length} more ${extras.length === 1 ? 'site' : 'sites'} in formats it lacks.` : 'Every site that fits this brief.', sites: full },
  ]
}

/**
 * What the plan lacks, in priority: the moment the brief names but no site
 * covers; the audience the plan reaches least; a longer run for frequency; a
 * digital site when the plan is all static. At most 4.
 */
export function buildSuggestions(brief: Brief, current: VersionSite[], candidates: PublicSite[], audience: AudienceGroup[]): Suggestion[] {
  const inPlan = new Set(current.map(s => s.siteId))
  const rest = candidates.filter(s => !inPlan.has(s.id)).sort(byScore(brief))
  const planSites = candidates.filter(s => inPlan.has(s.id))
  const out: Suggestion[] = []
  const text = `${brief.audience} ${brief.industry}`.toLowerCase()

  const moment = (test: (s: PublicSite) => boolean, title: string, body: string, why: string) => {
    if (planSites.some(test)) return
    const adds = rest.filter(test).slice(0, 2)
    if (!adds.length) return
    out.push({ id: `moment-${title.toLowerCase().replace(/\W+/g, '-')}`, kind: 'moment', title, body, siteIds: adds.map(s => s.id), reasons: Object.fromEntries(adds.map(s => [s.id, reasonFor(s, why)])) })
  }
  if (/mall|shop|retail|pavilion|klcc|store|boutique/.test(text)) moment(isMall, 'Cover the shopping moment', 'Your brief names shopping, but no site in the plan is inside or at a mall. These screens meet the same people at the point of purchase.', 'inside the mall the brief names, at the point of purchase')
  if (/commut|train|lrt|mrt|rail|transit|office/.test(text)) moment(isTransit, 'Catch the commute', 'The plan reaches commuters on the road; these sites reach them on the rail and bus journey too.', 'on the commute the brief describes, at eye level and dwell time')
  if (/resident|home|condo|family|household/.test(text)) moment(isResidential, 'Be there at home', 'Residential screens reach the household every day, in the lift lobby they pass morning and evening.', 'in the lift lobby the household passes twice a day')
  if (/tourist|visitor|travel|airport|arrival/.test(text)) moment(isAirport, 'Welcome them on arrival', 'Airport media reaches visitors at the first moment they are in the city.', 'the first screen a visitor sees after landing')

  // The audience the plan reaches least, if a site adds it
  const weakest = [...audience].sort((a, b) => a.members.length - b.members.length)[0]
  if (weakest && weakest.members.length < Math.max(2, Math.ceil(planSites.length / 2)) && rest.length) {
    const add = rest[0]
    out.push({ id: `audience-${weakest.key}`, kind: 'audience', title: `Reach more ${weakest.label.toLowerCase()}`, body: `Only ${weakest.members.length} of ${planSites.length} sites reach ${weakest.label.toLowerCase()}. One more site on their route lifts that share.`, siteIds: [add.id], reasons: { [add.id]: reasonFor(add, `adds ${weakest.label.toLowerCase()} the plan reaches least`) } })
  }

  if ((brief.durationWeeks ?? 4) <= 4) {
    out.push({ id: 'weeks-8', kind: 'frequency', title: 'Run 8 weeks instead of 4', body: 'The same sites, twice as long: the same people see the message about twice as often, which is what moves recall and intent.', siteIds: [], reasons: {}, weeks: 8 })
  }

  if (planSites.length && !planSites.some(s => s.digital)) {
    const d = rest.find(s => s.digital)
    if (d) out.push({ id: 'digital', kind: 'digital', title: 'Add one digital screen', body: 'A digital site lets the creative change by time of day: a breakfast message for the inbound crowd, an evening offer for the outbound one.', siteIds: [d.id], reasons: { [d.id]: reasonFor(d, 'a digital screen so the creative can change by time of day') } })
  }
  return out.slice(0, 4)
}
