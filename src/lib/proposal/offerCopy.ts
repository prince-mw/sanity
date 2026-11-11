// Offers that sell (Rif, 11 Nov 2026): each offer is three parts — a benefit
// headline in the client's words, one proof line tied to *this* plan, and the
// ask on the button. No prices (agreed: one indicative range per plan only).

import { ADDONS } from './addons'
import type { Suggestion, Tier } from './types'

export type OfferCopy = { headline: string; proof: string; cta: string }

type Ctx = { sites: number; weeks: number | null; cityLabel: string; digitalSites: number }

const n = (x: number, one: string, many = `${one}s`) => `${x} ${x === 1 ? one : many}`

export function offerCopy(id: string, ctx: Ctx, suggestions: Suggestion[], tiers: Tier[]): OfferCopy | null {
  const sites = n(ctx.sites, 'site')
  switch (id) {
    case 'measure': return { headline: 'Know who actually saw it.', proof: `Reach, frequency and footfall lift around your stores for these ${sites}, set up before launch so the baseline exists.`, cta: 'Add measurement' }
    case 'planner': return { headline: 'See the audience before you buy.', proof: `Who passes each of the ${sites} and when, with forecast reach for the plan, so sign-off comes with evidence.`, cta: 'Add the audience report' }
    case 'creative': return { headline: 'Every screen right first time.', proof: `One master file adapted to all ${sites}’ specifications, with a mock-up of your creative on each for sign-off.`, cta: 'Add creative adaptation' }
    case 'dynamic': return { headline: 'Say the right thing at the right hour.', proof: ctx.digitalSites > 0 ? `A breakfast line in the morning and the evening offer at 6 pm, on the ${n(ctx.digitalSites, 'digital site')} in this plan.` : 'A breakfast line in the morning and the evening offer at 6 pm, on the digital sites in this plan.', cta: 'Add day-parting' }
    case 'market': return { headline: 'Pay by impression. Change sites mid-flight.', proof: `The digital sites in this plan bought programmatically: budget moved between them while the campaign runs, with play reports as it goes.`, cta: 'Buy programmatically' }
    case 'weeks-8': case 'run-8-weeks': return { headline: 'Recall builds with repetition.', proof: `The same ${sites} for 8 weeks instead of ${ctx.weeks ?? 4}: one booking, no new artwork, the same people seeing it about twice as often.`, cta: 'Extend to 8 weeks' }
    case 'weeks-12': return { headline: 'A full quarter of presence.', proof: `The same ${sites} for 12 weeks, building to your date and staying on when competitors go quiet.`, cta: 'Extend to 12 weeks' }
    case 'larger': { const t = tiers.find(x => x.id === 'full'); return t ? { headline: `More of ${ctx.cityLabel}, same brief.`, proof: `${n(t.totals.sites, 'site')} instead of ${ctx.sites}${t.totals.reach != null ? `, ${t.totals.reach.toLocaleString('en-US')} monthly reach` : ''}: the plan the brief deserves when the budget allows.`, cta: `Switch to ${t.totals.sites} sites` } : null }
    case 'smaller': { const t = tiers.find(x => x.id === 'essentials'); return t ? { headline: 'Start lighter.', proof: `The ${n(t.totals.sites, 'site')} that carry this brief on their own; the rest can follow once the first results are in.`, cta: `Switch to ${t.totals.sites} sites` } : null }
  }
  const s = suggestions.find(x => x.id === id)
  if (s) {
    const d = s.delta
    const adds = d?.sites ? `${n(d.sites, 'more site')}${d.reach != null ? `, +${d.reach.toLocaleString('en-US')} monthly reach` : ''}.` : ''
    return { headline: s.title, proof: [s.body, adds].filter(Boolean).join(' '), cta: s.kind === 'frequency' ? 'Extend to 8 weeks' : d?.sites === 1 ? 'Add the site' : 'Add the sites' }
  }
  const a = ADDONS.find(x => x.id === id)
  return a ? { headline: a.benefit, proof: a.detail, cta: 'Add' } : null
}
