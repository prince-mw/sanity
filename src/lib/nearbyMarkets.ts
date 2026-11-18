// Neighbouring markets linked from location pages that have no sibling city pages
// (single-city countries such as Ghana, and country pages without city pages such as Egypt).
// Gives every such page internal links to related markets instead of a dead end.
// Only English location pages use this; values are country page slugs under /locations/.
import type { NearbyMarketsCopy } from '@/components/LocationDetailClient'

export const NEARBY_MARKETS: Record<string, string[]> = {
  // Africa
  ghana: ['nigeria', 'kenya', 'south-africa'],
  egypt: ['morocco', 'saudi-arabia', 'jordan', 'uae'],
  morocco: ['egypt', 'nigeria', 'south-africa'],
  // Middle East
  oman: ['uae', 'qatar', 'saudi-arabia', 'bahrain'],
  qatar: ['uae', 'saudi-arabia', 'bahrain', 'oman'],
  bahrain: ['saudi-arabia', 'uae', 'qatar', 'kuwait'],
  kuwait: ['saudi-arabia', 'bahrain', 'uae', 'qatar'],
  jordan: ['saudi-arabia', 'egypt', 'uae', 'kuwait'],
  // Asia Pacific
  taiwan: ['hong-kong', 'japan', 'south-korea'],
  thailand: ['malaysia', 'singapore', 'indonesia'],
  'hong-kong': ['taiwan', 'singapore', 'japan'],
  'sri-lanka': ['india', 'singapore', 'malaysia'],
  australia: ['singapore', 'indonesia', 'japan'],
  // Europe
  germany: ['netherlands', 'united-kingdom', 'italy'],
  netherlands: ['germany', 'united-kingdom', 'italy'],
}

export const NEARBY_MARKETS_COPY: NearbyMarketsCopy = {
  heading: 'Explore Nearby Markets',
  subheading: 'Extend your campaign into neighbouring markets in one buy',
  viewAllLabel: 'View All Markets',
  viewAllHref: '/locations',
}
