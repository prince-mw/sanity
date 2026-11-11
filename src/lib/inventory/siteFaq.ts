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
