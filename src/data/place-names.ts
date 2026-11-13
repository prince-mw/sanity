// How a country's inventory is grouped into the places the website pages
// (Rif, 14 Nov 2026). Only countries listed here are grouped this way; every
// other country keeps the address levels in source.ts.
//
// The country page shows one card per state, except where people search for
// a big city instead: the cities named (with map points) in the country's
// approved guide (country-guide-drafts.ts, audiences.cities). A big city whose
// name is also its state's name (Kuala Lumpur, Penang, Melaka) takes the whole
// state; any other big city (Johor Bahru, Ipoh, Kota Kinabalu) takes the sites
// within `bigCityRadiusKm` of its point, and the rest of its state keeps a
// state page. Adding a city to the guide gives it a page; no site is dropped.

export type PlacePlan = {
  /** Address level that holds the state. */
  stateLevel: 1 | 2
  /** English names for the API's spellings (Rif, 14 Nov 2026: English names). */
  names: Record<string, string>
  bigCityRadiusKm: number
}

export const PLACE_PLANS: Record<string, PlacePlan> = {
  malaysia: {
    stateLevel: 1,
    names: {
      'Pulau Pinang': 'Penang',
      'Trengganu': 'Terengganu',
      'Wilayah Persekutuan Kuala Lumpur': 'Kuala Lumpur',
      'Wilayah Persekutuan Putrajaya': 'Putrajaya',
      'Wilayah Persekutuan Labuan': 'Labuan',
      'Bandaraya Georgetown': 'George Town',
      'Johor Baharu': 'Johor Bahru',
      'Bandar Johor Bahru': 'Johor Bahru City Centre',
      'Bandar Melaka': 'Melaka City',
    },
    bigCityRadiusKm: 15,
  },
}
