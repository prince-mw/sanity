// The site page FAQ (Rif, 11 Nov 2026: site template — good for SEO, a good
// read, good design). There will be thousands of site pages once the
// Inventory API lands, so nothing here is written per site: every question
// and answer is built from the site's own data, and a question whose data is
// missing is simply left out. The same list feeds the page and its FAQPage
// JSON-LD, so they can never disagree. No prices, ever.

import type { PublicSite } from './types'

export type Faq = { q: string; a: string }

const list = (xs: string[]) => xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`

export function siteFaqs(site: PublicSite, personaNames: string[] = []): Faq[] {
  const format = (site.displayFormat ?? site.format ?? 'outdoor advertising site').toLowerCase().replace(/\bled\b/g, 'LED').replace(/\bdooh\b/g, 'DOOH')
  const where = `${site.areaName}, ${site.cityName}`
  const sp = site.specs
  const out: Faq[] = []

  if (site.audience?.reach || site.audience?.impressions) {
    const parts = [site.audience.reach ? `a monthly reach of ${site.audience.reach} people` : null, site.audience.impressions ? `${site.audience.impressions} monthly impressions` : null].filter(Boolean) as string[]
    out.push({ q: `How many people see ${site.name}?`, a: `${site.name} has ${list(parts)}, as published by the media owner. Moving Walls confirms the latest audience figures for your dates when you book.` })
  }
  if (personaNames.length) {
    out.push({ q: `Who does ${site.name} reach?`, a: `The main audiences at this ${format} in ${where} are ${list(personaNames.slice(0, 4).map(n => n.toLowerCase()))}.` })
  }
  const size = [site.size, sp?.resolution ? `${sp.resolution} resolution` : null].filter(Boolean) as string[]
  if (size.length) out.push({ q: `What size is ${site.name}?`, a: `${site.name} is ${list(size)}${sp?.panels != null || sp?.screens != null ? `, with ${[sp?.panels != null ? `${sp.panels} panel${sp.panels === 1 ? '' : 's'}` : null, sp?.screens != null ? `${sp.screens} screen${sp.screens === 1 ? '' : 's'}` : null].filter(Boolean).join(' and ')}` : ''}.` })

  const files = [sp?.videoFormats?.length ? `video as ${sp.videoFormats.join(' or ')}` : null, sp?.imageFormats?.length ? `images as ${sp.imageFormats.join(' or ')}` : null].filter(Boolean) as string[]
  const loop = site.digital?.spotSeconds ? `Each spot runs ${site.digital.spotSeconds} seconds${site.digital.spotsPerLoop ? `, with ${site.digital.spotsPerLoop} spots in the loop` : ''}.` : ''
  if (files.length || loop) out.push({ q: `What artwork does ${site.name} need?`, a: [files.length ? `The screen takes ${list(files)}${sp?.resolution ? ` at ${sp.resolution}` : ''}.` : '', loop, sp?.contentApproval ? 'Artwork is approved by the media owner before it goes live.' : ''].filter(Boolean).join(' ') })

  if (sp?.leadTimeDays != null) out.push({ q: `How far ahead should I book ${site.name}?`, a: `Allow at least ${sp.leadTimeDays} days between booking and the start date, for availability, artwork checks and approval. Festive periods fill earlier, so book those well ahead.` })

  out.push({ q: `How do I book ${site.name}?`, a: `Add it to an instant proposal or send an enquiry from this page. A Moving Walls planner checks availability for your dates, confirms the cost and sends the next steps. Nothing is booked until you confirm.` })
  return out
}

const words = (s: string | null | undefined) => (s ?? '').trim().split(/\s+/).filter(Boolean).length

/**
 * Every site page needs at least 150 words of its own content (Rif, 11 Nov
 * 2026). Hand-written descriptions exist only for some sites, so when a site's
 * description is short or missing this builds an overview from its data —
 * place, size, digital or classic, audience figures, artwork, planning. Facts
 * only, nothing invented: a sentence whose data is missing is left out.
 */
export function siteOverview(site: PublicSite, description: string | null): string | null {
  if (words(description) >= 80) return null
  const fmt = site.displayFormat ?? site.format ?? 'outdoor advertising site'
  const f = fmt.toLowerCase().replace(/\bled\b/g, 'LED').replace(/\bdooh\b/g, 'DOOH')
  const article = /^[aeiou]/i.test(f) ? 'an' : 'a'
  const venue = site.venueType?.toLowerCase()
  const d = site.digital
  const sp = site.specs
  const s: string[] = []
  s.push(`${site.name} is ${article} ${f} in ${site.areaName}, ${site.cityName}${site.address ? `, at ${site.address}` : ''}.`)
  if (venue) s.push(venue.includes('mall') ? `It sits inside a shopping mall, where people are close to the point of purchase.` : venue.includes('road') ? `It faces road traffic, so drivers and passengers see it on their daily routes through ${site.areaName}.` : `It is a ${venue} site, seen by people moving through ${site.areaName} on foot and by road.`)
  if (site.size) s.push(`The ${d ? 'screen' : 'face'} measures ${site.size}${sp?.resolution ? ` at ${sp.resolution}` : ''}${site.illuminated ? ' and is lit after dark' : ''}.`)
  if (d?.spotSeconds) s.push(`As a digital site it plays ${d.spotsPerLoop ? `a loop of ${d.spotsPerLoop} spots` : 'a loop of spots'} of ${d.spotSeconds} seconds each, so a campaign can start without printing and the message can change by time of day.`)
  else s.push(`As a classic site it carries one design for the length of the booking, which builds steady, repeated exposure with the people who pass it every day.`)
  if (site.audience?.reach || site.audience?.impressions) s.push(`Media-owner figures put its monthly ${[site.audience.reach ? `reach at ${site.audience.reach}` : null, site.audience.impressions ? `impressions at ${site.audience.impressions}` : null].filter(Boolean).join(' and ')}.`)
  const files = [sp?.videoFormats?.length ? sp.videoFormats.join(' or ') : null, sp?.imageFormats?.length ? sp.imageFormats.join(' or ') : null].filter(Boolean)
  if (files.length || sp?.leadTimeDays != null) s.push(`${files.length ? `Artwork is supplied as ${files.join(', or ')}` : 'Artwork is checked against the site specification'}${sp?.leadTimeDays != null ? `, and bookings need at least ${sp.leadTimeDays} days before the start date` : ''}.`)
  s.push(`Moving Walls can plan ${site.name} together with other sites in ${site.areaName} and across ${site.cityName}, check availability for your dates and report on delivery once the campaign is live.`)
  return s.join(' ')
}

/** The page's own words (hero line, description, overview, specs, audiences, FAQ), for the 150-word floor. */
export const contentWords = (...texts: (string | null | undefined)[]) => texts.reduce((n, t) => n + words(t), 0)
