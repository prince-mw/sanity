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
  /**
   * How addresses name the states, and postcode prefix → state, in the API's own
   * state spellings. Used to tell a wrong stored state from a misplaced pin
   * (trustedLevels in normalize.ts). Same tables as the inventory-hygiene scan.
   */
  address?: { states: Record<string, string[]>; postcodes: [number, number, string][] }
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
    address: {
      states: {
        Johor: ['johor', 'johore'], Kedah: ['kedah'], Kelantan: ['kelantan'], Melaka: ['melaka', 'malacca'],
        'Negeri Sembilan': ['negeri sembilan', 'n. sembilan', 'negri sembilan'], Pahang: ['pahang'], Perak: ['perak'],
        Perlis: ['perlis'], 'Pulau Pinang': ['pulau pinang', 'penang', 'p. pinang'], Sabah: ['sabah'], Sarawak: ['sarawak'],
        Selangor: ['selangor'], Trengganu: ['terengganu', 'trengganu'], 'Kuala Lumpur': ['kuala lumpur'],
        Putrajaya: ['putrajaya'], Labuan: ['labuan'],
      },
      postcodes: [
        [1, 2, 'Perlis'], [5, 9, 'Kedah'], [10, 14, 'Pulau Pinang'], [15, 18, 'Kelantan'], [20, 24, 'Trengganu'],
        [25, 28, 'Pahang'], [39, 39, 'Pahang'], [49, 49, 'Pahang'], [69, 69, 'Pahang'], [30, 36, 'Perak'],
        [40, 48, 'Selangor'], [63, 68, 'Selangor'], [50, 60, 'Kuala Lumpur'], [62, 62, 'Putrajaya'],
        [70, 73, 'Negeri Sembilan'], [75, 78, 'Melaka'], [79, 86, 'Johor'], [87, 87, 'Labuan'], [88, 91, 'Sabah'], [93, 98, 'Sarawak'],
      ],
    },
  },
}
