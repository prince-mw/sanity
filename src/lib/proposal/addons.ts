// Add-ons a client can put on a proposal. Copy lives here so Rif can edit it.
// Prices: a longer run is priced from the inventory rates (the proposal's
// investment range follows); the other three are "on request" until Rif
// gives figures (11 Nov 2026). Importable from client code.

export type AddonId = 'measure' | 'creative' | 'dynamic' | 'weeks-8' | 'weeks-12'

export type Addon = {
  id: AddonId
  title: string
  benefit: string          // one line: why it is worth it
  detail: string           // what the client gets
  price: 'rates' | 'on-request'
  weeks?: number           // for the longer-run add-ons
}

export const ADDONS: Addon[] = [
  { id: 'measure', title: 'Campaign measurement report', benefit: 'Know what the campaign did, not just where it ran.', detail: 'Reach and frequency by site, the audience profile actually reached, and footfall lift around your stores, delivered two weeks after the campaign ends (MW Measure).', price: 'on-request' },
  { id: 'creative', title: 'Creative adaptation and mock-ups', benefit: 'One master file, every screen right first time.', detail: 'Artwork resized and checked against every site’s specification, plus on-screen mock-ups of your creative on each site for sign-off.', price: 'on-request' },
  { id: 'dynamic', title: 'Dynamic, day-parted creative', benefit: 'Say the right thing at the right hour.', detail: 'Different creative by time of day or trigger on the digital sites: a breakfast message for the inbound crowd, an evening offer for the outbound one, a countdown to launch day.', price: 'on-request' },
  { id: 'weeks-8', title: 'Run 8 weeks', benefit: 'Twice the frequency on the same sites.', detail: 'The same plan for 8 weeks instead of 4. The investment range updates on the spot.', price: 'rates', weeks: 8 },
  { id: 'weeks-12', title: 'Run 12 weeks', benefit: 'A full quarter of presence.', detail: 'The same plan for 12 weeks. Recommended for launches that build to a date and for always-on brand presence.', price: 'rates', weeks: 12 },
]

export const addonOf = (id: string) => ADDONS.find(a => a.id === id) ?? null
