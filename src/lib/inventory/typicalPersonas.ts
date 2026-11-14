// Typical audiences by kind of site, for sites with no written personas yet
// (Rif, 14 Nov 2026: the Details popup should say who a site reaches). There
// will be thousands of API sites, so nothing is written per site: the venue
// type picks the audiences and the site's own area names them. Shown as
// "typical for this kind of site", never as measured data.

import type { Persona } from './siteContent'
import type { PublicSite } from './types'

type Kind = 'road' | 'transit' | 'mall' | 'office' | 'campus' | 'travel' | 'leisure' | 'local'

/** Which kind of site a venue type is. Matched on the venue's words; unknown venues count as roadside outdoor. */
function kindOf(venue: string | null, format: string | null): Kind {
  const v = `${venue ?? ''} ${format ?? ''}`.toLowerCase()
  if (/airport|arrival|terminal|departure/.test(v)) return 'travel'
  if (/train|station|platform|subway|metro|transit|bus|lrt|mrt/.test(v)) return 'transit'
  if (/mall|retail|shop|concourse|store|food court|supermarket|hypermarket/.test(v)) return 'mall'
  if (/office|lobby|lift|elevator|bank|financial|business/.test(v)) return 'office'
  if (/campus|education|college|universit|school/.test(v)) return 'campus'
  if (/cinema|movie|sport|stadium|arena|leisure|gym|athletic|entertainment|dining|restaurant/.test(v)) return 'leisure'
  if (/residen|clinic|care|veterinar|health|common area|convenience/.test(v)) return 'local'
  return 'road'
}

export function typicalPersonas(site: PublicSite): Persona[] {
  const area = site.areaName, city = site.cityName
  const P: Record<Kind, Persona[]> = {
    road: [
      { name: 'Drivers and passengers', icon: 'driver', who: `People driving through ${area} on their daily routes`, when: 'Morning and evening rush hours, when traffic slows', why: 'The same route every day builds repeated exposure' },
      { name: 'Commuters', icon: 'commuter', who: `People travelling between home and work across ${city}`, when: 'Weekdays, both directions', why: 'High frequency at low cost per view' },
    ],
    transit: [
      { name: 'Public transport commuters', icon: 'commuter', who: `People using trains and buses in ${area}`, when: 'Weekday peaks, morning and evening', why: 'Waiting time means longer looks at the screen' },
      { name: 'Students and young workers', icon: 'student', who: `Younger riders moving around ${city} without a car`, when: 'Weekdays and weekends', why: 'Reach an audience that drives less' },
    ],
    mall: [
      { name: 'Shoppers', icon: 'shopper', who: `People shopping and eating in ${area}`, when: 'Evenings and weekends, peaking on Saturdays', why: 'Close to the point of purchase' },
      { name: 'Families', icon: 'family', who: 'Parents and children on a day out', when: 'Weekends and school holidays', why: 'Household decisions are made together' },
    ],
    office: [
      { name: 'Office workers', icon: 'office', who: `Professionals working in ${area}`, when: 'Working days, arrivals, lunch and departures', why: 'A daily, predictable audience with spending power' },
      { name: 'Business visitors', icon: 'traveller', who: 'Clients and visitors to the building', when: 'Working days', why: 'Reach decision-makers where they meet' },
    ],
    campus: [
      { name: 'Students', icon: 'student', who: `Students on campus in ${area}`, when: 'Term time, weekdays', why: 'Build habits early with a young audience' },
      { name: 'Staff and visitors', icon: 'office', who: 'Lecturers, staff and visiting parents', when: 'Weekdays', why: 'A second audience at the same site' },
    ],
    travel: [
      { name: 'Travellers', icon: 'traveller', who: `People arriving in or leaving ${city}`, when: 'Every day, with holiday peaks', why: 'A captive, often higher-spending audience' },
      { name: 'Tourists', icon: 'tourist', who: `Visitors to ${city} on their first stop`, when: 'Holiday seasons and weekends', why: 'First impressions of the city' },
    ],
    leisure: [
      { name: 'Leisure visitors', icon: 'family', who: `Families and friends out in ${area}`, when: 'Evenings and weekends', why: 'Relaxed time, more attention to the screen' },
      { name: 'Young adults', icon: 'nightlife', who: 'People out for films, sport or dinner', when: 'Evenings and weekends', why: 'An audience that is hard to reach at home' },
    ],
    local: [
      { name: 'Local residents', icon: 'resident', who: `People who live around ${area}`, when: 'Every day, close to home', why: 'Repeated exposure near where they shop and live' },
      { name: 'Families', icon: 'family', who: 'Households running daily errands', when: 'Weekday evenings and weekends', why: 'Everyday decisions made nearby' },
    ],
  }
  return P[kindOf(site.venueType, site.displayFormat)]
}
