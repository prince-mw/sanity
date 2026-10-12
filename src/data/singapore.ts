// Singapore landing page (/locations/singapore) and its five venue pages
// (/locations/singapore/{venue}). Hand-authored for now; structured so it can move
// into Sanity later without changing the page components.
//
// Image slots with `src: null` render a labelled placeholder until real images arrive.

export interface SgImage {
  src: string | null
  alt: string
  /** Tooltip / title attribute */
  title?: string
  /** What the placeholder asks for (shown only while src is null) */
  need: string
}

export interface SgStat {
  value: string
  label: string
}

export interface SgLandmark {
  name: string
  location: string
  format: string
  reach: string
  impressions: string
  image: SgImage
}

export interface SgSite {
  name: string
  /** Filter group, e.g. a region ("CBD", "North East") or an area ("Orchard Road") */
  group: string
  note?: string
}

export interface SgFaq {
  question: string
  /** Paragraphs separated by a blank line */
  answer: string
}

export interface SgVenue {
  slug: string
  // Main page tab
  tabLabel: string
  tabBestFor: string
  tabDescription: string
  tabStats: SgStat[]
  /** Shown instead of stat boxes when a venue has no figures yet */
  tabNote?: string
  badge: 'Programmatic' | 'Direct'
  image: SgImage
  // Venue page
  metaTitle: string
  metaDescription: string
  breadcrumbLabel: string
  h1: string
  tagline: string
  leadQuestion: string
  intro: string[]
  heroCta: string
  heroStats: SgStat[]
  whyHeading: string
  why: { title: string; description: string }[]
  premiumHeading: string
  premiumIntro: string
  landmarks: SgLandmark[]
  landmarksNote?: string
  /** Show premium location cards as images only (details still to come) */
  landmarksImageOnly?: boolean
  locationsHeading: string
  /** Groups whose full site list is still to come, e.g. { Central: 30 } (named sites < total) */
  groupTotals?: Record<string, number>
  sites: SgSite[]
  /** Descriptive location groups, used instead of a site table (airport) */
  locationGroups?: { title: string; description: string }[]
  formatsHeading: string
  formats: string[]
  whyChooseLead: string[]
  whyChooseList: string[]
  faqs: SgFaq[]
  ctaHeading: string
  ctaBody: string
  ctaButton: string
}

export const SG_BASE_PATH = '/locations/singapore'

// Fallback when the Sanity Singapore location doc can't be read
export const SG_CONTACT_FORM_URL =
  'https://forms.zohopublic.com/movingwallsholdingpteltd/form/SingaporeContact/formperma/cR6lghl1nztf-tJNW-J0xIGt2JGSKsMmRVq_R7Kl4is'

export const mwScienceBlock = {
  heading: 'Go Beyond Campaign Measurement with MW Science',
  body: 'MW Science connects audience, location, behavioural and consumer signals to help brands understand how OOH influences brand perception, consumer behaviour and the customer journey. In Singapore, campaigns above a set value include a brand lift study on our own consumer panel.',
  linkText: 'Explore MW Science',
  href: '/mw-science',
  groups: [
    {
      title: 'Understand your audience',
      items: ['Brand Lift Studies', 'Brand Health Tracking', 'Brand Perception & Awareness', 'Usage & Attitude Research'],
    },
    {
      title: 'Understand the customer journey',
      items: ['Consumer Purchase Journey Research', 'In-Home Placement Tests', 'Mystery Shopper Audits'],
    },
    { title: 'Test before you scale', items: ['Concept, Product & Package Testing'] },
  ],
}

// ---------------------------------------------------------------------------
// Venue pages
// ---------------------------------------------------------------------------

export const sgVenues: SgVenue[] = [
  {
    slug: 'mrt-station-advertising',
    tabLabel: 'Train Stations',
    tabBestFor: 'Mass reach and daily frequency, and the answer to most CBD briefs',
    tabDescription:
      'Platform, concourse and linkway screens across the Thomson-East Coast, Downtown and North East lines, plus landmark station spectaculars.',
    tabStats: [
      { value: '72', label: 'Stations' },
      { value: '322', label: 'Screens' },
      { value: '173M+', label: 'Monthly impressions' },
    ],
    badge: 'Programmatic',
    image: { src: 'https://cdn.sanity.io/images/u10im6di/production/1b8fe0907a2eb95d137d37cfb5574b775a9cc217-960x590.webp', alt: 'Large digital advertising screen above the escalators in a Singapore MRT station concourse', title: 'MRT station advertising in Singapore', need: '' },
    metaTitle: 'MRT Station Advertising in Singapore | 322 Screens | Moving Walls',
    metaDescription:
      'Programmatic MRT station advertising in Singapore: 322 screens across 72 stations on the Downtown, North East and Thomson-East Coast lines, 173M+ monthly impressions.',
    breadcrumbLabel: 'MRT Station Advertising',
    h1: 'MRT Station Advertising in Singapore',
    tagline: 'Reach Singapore Where It Moves, Twice a Day',
    leadQuestion: 'Looking for MRT station advertising in Singapore that proves its impact?',
    intro: [
      "Moving Walls helps brands reach Singapore's commuters through platform, concourse and linkway screens, plus landmark station spectaculars, on the Thomson-East Coast, Downtown and North East lines. Every campaign is bought programmatically and reported by screen.",
      "Singapore's public transport network carries more than 7 million journeys a day, and the same commuters pass the same stations every working day.",
      "Moving Walls' MRT network spans 72 stations and 322 screens, delivering 173M+ monthly impressions, from the CBD to Punggol and Woodlands.",
      'Through a single platform, advertisers can plan by line, region or CBD, activate in days and measure delivery by station.',
    ],
    heroCta: 'Plan Your MRT Campaign',
    heroStats: [
      { value: '72', label: 'Stations' },
      { value: '322', label: 'Screens' },
      { value: '173M+', label: 'Monthly impressions' },
    ],
    whyHeading: 'Why Advertise at MRT Stations?',
    why: [
      {
        title: 'Daily frequency at scale',
        description:
          'Commuters pass the same screens on the way in and on the way home, which builds frequency faster than almost any other format.',
      },
      {
        title: 'Three lines, three audiences',
        description:
          'The Downtown Line serves the business district and the east. The North East Line runs through Sengkang, Punggol and Hougang. The Thomson-East Coast Line links Woodlands to Orchard, the CBD and the east coast.',
      },
      {
        title: 'The answer to most CBD briefs',
        description:
          'Twelve stations sit in the core financial district, from Downtown and Telok Ayer to Shenton Way and Marina Bay.',
      },
      {
        title: 'Measurable campaign performance',
        description: 'Every station is bought programmatically, with delivery reported by station and screen.',
      },
    ],
    premiumHeading: 'Premium Billboard Locations at MRT Stations',
    premiumIntro: 'Premium advertising locations with maximum exposure',
    landmarks: [
      {
        name: 'Sengkang Sky',
        location: 'Sengkang MRT, North East',
        format: 'LED, 4800 × 1400 px',
        reach: '172,057',
        impressions: '834,480',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/1b8fe0907a2eb95d137d37cfb5574b775a9cc217-960x590.webp', alt: 'Sengkang Sky large LED DOOH screen above the escalators at Sengkang MRT station, Singapore', title: 'Sengkang Sky, Sengkang MRT', need: '' },
      },
      {
        name: 'Harbourfront Twist',
        location: 'HarbourFront MRT, Central',
        format: '2 LED screens, 4274 × 1200 px',
        reach: '88,950',
        impressions: '808,560',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/23c3e64a82961a3429f4205593450d9d11df8709-960x518.webp', alt: 'Harbourfront Twist pair of LED DOOH screens at HarbourFront MRT station, Singapore', title: 'Harbourfront Twist, HarbourFront MRT', need: '' },
      },
      {
        name: 'Bugis Runway',
        location: 'Bugis MRT, Central',
        format: '5-screen LED run, 6144 × 1152 px',
        reach: '97,814',
        impressions: '802,080',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/8baa7399f796918b072bf25b03a77f0ea4ce2423-960x518.webp', alt: 'Bugis Runway continuous LED DOOH screen run along the concourse at Bugis MRT station, Singapore', title: 'Bugis Runway, Bugis MRT', need: '' },
      },
    ],
    locationsHeading: 'MRT Advertising Locations Across Singapore',
    groupTotals: { Central: 30, East: 13 },
    sites: [
      ...['Bayfront', 'Chinatown', 'Clarke Quay', 'Downtown', 'Fort Canning', 'Gardens by the Bay', 'Marina Bay', 'Maxwell', 'Outram Park', 'Promenade', 'Shenton Way', 'Telok Ayer'].map(
        (name) => ({ name, group: 'CBD' })
      ),
      ...['Orchard', 'Dhoby Ghaut', 'Bugis', 'HarbourFront', 'Little India', 'Newton', 'Botanic Gardens'].map((name) => ({
        name,
        group: 'Central',
      })),
      ...['Buangkok', 'Hougang', 'Kovan', 'Lentor', 'Mayflower', 'Punggol', 'Punggol Coast', 'Sengkang', 'Serangoon'].map(
        (name) => ({ name, group: 'North East' })
      ),
      ...['Tampines', 'Bedok North', 'Expo', 'Marine Parade', 'Siglap', 'Upper Changi'].map((name) => ({ name, group: 'East' })),
      ...['Springleaf', 'Woodlands', 'Woodlands North', 'Woodlands South'].map((name) => ({ name, group: 'North' })),
      ...['Bukit Panjang', 'Cashew', 'Hillview', 'Hume'].map((name) => ({ name, group: 'West' })),
    ],
    formatsHeading: 'Different Types of MRT Advertising Formats',
    formats: ['Platform screens', 'Concourse screens', 'Linkway and mezzanine screens', 'Station spectaculars'],
    whyChooseLead: [
      "Finding the right stations shouldn't mean knowing which planning area each one sits in.",
      "Moving Walls brings Singapore's MRT inventory onto one platform, so brands can plan by line, region or CBD in minutes.",
    ],
    whyChooseList: [
      'Access 322 screens across 72 stations',
      'Filter to the CBD or any region',
      'Buy programmatically and adjust mid-flight',
      'Reach commuters, office workers and shoppers',
      'Measure delivery by station with transparent reporting',
    ],
    faqs: [
      {
        question: 'How much does MRT station advertising in Singapore cost?',
        answer:
          'Pricing depends on the station, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.',
      },
      {
        question: 'I have a CBD brief. Which stations should I use?',
        answer:
          'Filter the station list by CBD. It shows the 12 stations serving the financial district, with screens and monthly impressions for each.',
      },
      {
        question: 'Can I run MRT advertising in Singapore programmatically?',
        answer:
          'Yes. All 72 stations are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.',
      },
      { question: 'Which MRT lines are covered?', answer: 'The Thomson-East Coast, Downtown and North East lines.' },
    ],
    ctaHeading: 'Plan Your MRT Advertising Campaign in Singapore',
    ctaBody:
      'Whether you need one station spectacular or a line-wide takeover, Moving Walls helps you pick the right inventory and shows you what it delivered.',
    ctaButton: 'Talk to Our Experts Today',
  },
  {
    slug: 'bus-interchange-advertising',
    tabLabel: 'Bus Interchanges',
    tabBestFor: 'Heartland reach, where commuters wait and transfer',
    tabDescription:
      'Digital screens inside bus interchanges island-wide, a higher-dwell alternative to roadside bus shelter advertising and bus stop billboards.',
    tabStats: [
      { value: '24', label: 'Interchanges' },
      { value: '55', label: 'Screens' },
      { value: '14M+', label: 'Monthly impressions' },
    ],
    badge: 'Programmatic',
    image: { src: 'https://cdn.sanity.io/images/u10im6di/production/28b8d7625a97f713ce6f0de7dae1d5e614caaa46-960x590.webp', alt: 'Portrait digital advertising screen beside the fare gates at a Singapore bus interchange', title: 'Bus interchange advertising in Singapore', need: '' },
    metaTitle: 'Bus Interchange Advertising in Singapore | Moving Walls',
    metaDescription:
      'Digital bus interchange advertising in Singapore: 55 screens across 24 interchanges, 14M+ monthly impressions, bought programmatically and reported by screen.',
    breadcrumbLabel: 'Bus Interchange Advertising',
    h1: 'Bus Interchange Advertising in Singapore',
    tagline: 'Reach the Heartlands Where Commuters Wait and Transfer',
    leadQuestion: 'Looking for bus shelter advertising in Singapore that proves its impact?',
    intro: [
      "Moving Walls helps brands reach Singapore's heartland commuters through digital screens inside bus interchanges, where passengers queue, wait and switch between bus and MRT. That dwell time is longer than at a roadside bus stop billboard. Every campaign is bought programmatically and reported by screen.",
      'Interchanges sit at the centre of each housing estate, usually beside the MRT station and a neighbourhood mall.',
      "Moving Walls' interchange network spans 24 interchanges and 55 screens, delivering 14M+ monthly impressions, from Woodlands and Yishun to Tampines, Bedok and Jurong East.",
      'Through a single platform, advertisers can weight a campaign towards particular towns, schedule by commute hours and measure delivery by interchange.',
    ],
    heroCta: 'Plan Your Bus Interchange Campaign',
    heroStats: [
      { value: '24', label: 'Interchanges' },
      { value: '55', label: 'Screens' },
      { value: '14M+', label: 'Monthly impressions' },
    ],
    whyHeading: 'Why Advertise at Bus Interchanges?',
    why: [
      {
        title: 'Long dwell, repeat exposure',
        description: 'Commuters wait and transfer at the same interchange every day, so screens are seen for longer and more often.',
      },
      {
        title: 'Heartland reach',
        description: 'Interchanges serve the residential towns, reaching families and local workers close to home.',
      },
      {
        title: 'A natural pair for MRT',
        description: 'Stations deliver reach; interchanges add frequency against specific catchments.',
      },
      {
        title: 'Measurable campaign performance',
        description: 'All 24 interchanges are bought programmatically, with delivery reported by screen.',
      },
    ],
    premiumHeading: 'Premium Billboard Locations at Bus Interchanges',
    premiumIntro: 'Premium advertising locations with maximum exposure',
    landmarks: [
      {
        name: 'Woodlands Interchange',
        location: 'Woodlands, North',
        format: 'Portrait LED, 2160 × 3840 px',
        reach: '310,500',
        impressions: '943,920',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/fdc27f791cc53f82181096f9ca6d147a402f2e70-960x542.webp', alt: 'Portrait LED DOOH screen in the concourse of Woodlands bus interchange, Singapore', title: 'Woodlands Interchange, Woodlands', need: '' },
      },
      {
        name: 'Tampines Interchange',
        location: 'Tampines, East',
        format: 'Portrait LED, 2160 × 3840 px',
        reach: '160,085',
        impressions: '601,920',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/b77c62cebf21f9b8207df1954cc5401a01482247-960x526.webp', alt: 'Portrait LED DOOH screen at Tampines bus interchange, Singapore', title: 'Tampines Interchange, Tampines', need: '' },
      },
      {
        name: 'Toa Payoh Interchange',
        location: 'Toa Payoh, Central',
        format: 'Portrait LED, 2160 × 3840 px',
        reach: '138,531',
        impressions: '547,200',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/28b8d7625a97f713ce6f0de7dae1d5e614caaa46-960x590.webp', alt: 'Portrait LED DOOH screen beside the fare gates at Toa Payoh bus interchange, Singapore', title: 'Toa Payoh Interchange, Toa Payoh', need: '' },
      },
    ],
    landmarksNote: 'Figures are for a single screen at each interchange.',
    locationsHeading: 'Bus Interchange Advertising Locations Across Singapore',
    sites: [
      ...['Sembawang', 'Woodlands', 'Woodlands Temporary', 'Yishun'].map((name) => ({ name, group: 'North' })),
      ...['Ang Mo Kio', 'Buangkok', 'Hougang Central', 'Punggol Coast', 'Sengkang', 'Serangoon', 'Yio Chu Kang'].map((name) => ({
        name,
        group: 'North East',
      })),
      ...['Bedok', 'Pasir Ris', 'Tampines', 'Tampines North'].map((name) => ({ name, group: 'East' })),
      ...['Choa Chu Kang', 'Clementi', 'Joo Koon', 'Jurong East', 'Jurong Town Hall', 'Tengah'].map((name) => ({
        name,
        group: 'West',
      })),
      ...['HarbourFront', 'Toa Payoh', 'Woodleigh'].map((name) => ({ name, group: 'Central' })),
    ],
    formatsHeading: 'Different Types of Bus Interchange Advertising Formats',
    formats: ['Interchange digital screens', 'Interchange spectaculars, including the Bedok video wall and Yishun screen'],
    whyChooseLead: [
      "Reaching the heartlands shouldn't mean booking each town separately.",
      "Moving Walls brings Singapore's interchange screens onto one platform, so brands can plan them alongside MRT stations in one campaign.",
    ],
    whyChooseList: [
      'Access 55 screens across 24 interchanges',
      'Target by region or town',
      'Buy programmatically and adjust mid-flight',
      'Reach commuters, families and local workers',
      'Measure delivery by interchange with transparent reporting',
    ],
    faqs: [
      {
        question: 'How much does bus interchange advertising in Singapore cost?',
        answer:
          'Pricing depends on the interchange, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.',
      },
      {
        question: 'Do you offer roadside bus shelter advertising?',
        answer:
          'Our programmatic inventory is inside bus interchanges. Talk to our team if your plan also needs roadside bus shelters.',
      },
      {
        question: 'Can I run interchange advertising programmatically?',
        answer:
          'Yes. All 24 interchanges are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.',
      },
      {
        question: 'Can I combine interchanges with MRT stations?',
        answer: 'Yes. One plan on the Moving Walls platform can run across every venue type in Singapore.',
      },
    ],
    ctaHeading: 'Plan Your Bus Interchange Campaign in Singapore',
    ctaBody:
      'Whether you need one town or every interchange on the island, Moving Walls helps you pick the right inventory and shows you what it delivered.',
    ctaButton: 'Talk to Our Experts Today',
  },
  {
    slug: 'residential-screen-advertising',
    tabLabel: 'Residential',
    tabBestFor: 'Premium households, reached at home',
    tabDescription:
      'Lobby and lift screens in private condominiums across the island, seen by residents at the start and end of every day.',
    tabStats: [
      { value: '27', label: 'Condominiums' },
      { value: '107', label: 'Screens' },
      { value: '510K', label: 'Monthly impressions' },
    ],
    badge: 'Programmatic',
    image: { src: 'https://cdn.sanity.io/images/u10im6di/production/250837f690fbd0944ae9565ab18d59ee43ee78d9-960x579.webp', alt: 'Private condominium towers in Singapore where residents see lobby and lift screens', title: 'Residential screen advertising in Singapore', need: '' },
    metaTitle: 'Residential Screen Advertising in Singapore | Moving Walls',
    metaDescription:
      'Reach premium households at home with lobby and lift screens in 27 Singapore condominiums: 107 screens, bought programmatically and reported by building.',
    breadcrumbLabel: 'Residential Screen Advertising',
    h1: 'Residential Screen Advertising in Singapore',
    tagline: 'Reach Premium Households at Home',
    leadQuestion: 'Looking for outdoor digital signage in Singapore that reaches people at home?',
    intro: [
      "Moving Walls helps brands reach Singapore's private-housing residents through lobby and lift screens in condominiums across the island. Residents see them at the start and end of every day. Every campaign is bought programmatically and reported by building.",
      'Impression counts here are small by design. These are homes, not transit hubs, and what they offer is a known, affluent audience seen again and again in a quiet setting.',
      "Moving Walls' residential network spans 27 condominiums and 107 screens, from River Valley and Newton to Changi, Clementi and Woodlands.",
      'Through a single platform, advertisers can target by neighbourhood, schedule for morning and evening peaks and measure delivery by building.',
    ],
    heroCta: 'Plan Your Residential Campaign',
    heroStats: [
      { value: '27', label: 'Condominiums' },
      { value: '107', label: 'Screens' },
      { value: '510K', label: 'Monthly impressions' },
    ],
    whyHeading: 'Why Advertise in Residential Buildings?',
    why: [
      {
        title: 'The closest outdoor gets to home',
        description: 'Lobby and lift screens reach residents on every trip in and out of the building.',
      },
      {
        title: 'High frequency',
        description:
          'Average frequency runs above 10 at several buildings, including Avila Gardens (17.5), Varsity Park (13.6) and Skysuites @ Anson (12.7).',
      },
      { title: 'Premium households', description: 'The network covers private condominiums, not public housing.' },
      {
        title: 'Measurable campaign performance',
        description: 'All 27 buildings are bought programmatically, with delivery reported by building.',
      },
    ],
    premiumHeading: 'Premium Locations in Residential Buildings',
    premiumIntro: 'Premium advertising locations with maximum exposure',
    landmarks: [
      {
        name: 'Avila Gardens',
        location: 'Changi, East',
        format: '11 lobby and lift screens',
        reach: '3,888',
        impressions: '68,040',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/250837f690fbd0944ae9565ab18d59ee43ee78d9-960x579.webp', alt: 'Avila Gardens condominium towers in Changi, Singapore, with lobby and lift advertising screens', title: 'Avila Gardens, Changi', need: '' },
      },
      {
        name: 'The M',
        location: 'Downtown Core, Central',
        format: '2 screens, 1080 × 900 px',
        reach: '7,101',
        impressions: '56,880',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/3690f455a7172590d5ba28c9cb87c50dfa7029f5-960x518.webp', alt: 'The M condominium showroom with a scale model of the development in Downtown Core, Singapore', title: 'The M, Downtown Core', need: '' },
      },
      {
        name: 'Rivergate',
        location: 'River Valley, Central',
        format: '9 lobby and lift screens',
        reach: '3,396',
        impressions: '36,000',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/bc224be9612b52da536562ebe89d542ba99d2421-960x518.webp', alt: 'Rivergate condominium entrance and towers at night in River Valley, Singapore', title: 'Rivergate, River Valley', need: '' },
      },
    ],
    locationsHeading: 'Residential Advertising Locations Across Singapore',
    sites: [
      ...['1919 Black and White', '368 Thomson', '6 Derbyshire', 'Emerald Garden', 'Parc Mondrian', 'Richmond Park', 'Rivergate', 'Skysuites @ Anson', 'Stellar RV', 'The Axis', 'The Greenwood', 'The M', 'Victory Heights'].map(
        (name) => ({ name, group: 'Central' })
      ),
      ...['Avila Gardens', 'Balcon East', 'Parc Komo', 'Park Place Residences', 'Poshgrove East', 'The Belvedere'].map((name) => ({
        name,
        group: 'East',
      })),
      ...['iNz Residence', 'KI Residences', 'The Peak @ Balmeg', 'Varsity Park'].map((name) => ({ name, group: 'West' })),
      ...['Casablanca', 'North Gaia'].map((name) => ({ name, group: 'North' })),
      ...['Condo 1953', 'The Garden Residences'].map((name) => ({ name, group: 'North East' })),
    ],
    formatsHeading: 'Different Types of Residential Screen Advertising Formats',
    formats: ['Lobby screens', 'Lift screens'],
    whyChooseLead: [
      'Reaching people at home usually means going through a separate network owner.',
      "Moving Walls puts Singapore's condominium screens on the same platform as MRT and retail, so one plan reaches the same household on the commute and at home.",
    ],
    whyChooseList: [
      'Access 107 screens across 27 condominiums',
      'Target by neighbourhood or region',
      'Buy programmatically and adjust mid-flight',
      'Reach high-income households',
      'Measure delivery by building with transparent reporting',
    ],
    faqs: [
      {
        question: 'How much does residential screen advertising in Singapore cost?',
        answer:
          'Pricing depends on the buildings, number of screens and campaign length. Talk to our team for a plan and rates based on your audience and dates.',
      },
      {
        question: 'Why are impressions lower than at MRT stations?',
        answer: 'Each building has a fixed set of residents. You trade volume for a known, affluent audience that sees your ad many times.',
      },
      {
        question: 'Can I run residential advertising programmatically?',
        answer:
          'Yes. All 27 condominiums are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.',
      },
      {
        question: 'Can I combine residential screens with MRT stations?',
        answer: 'Yes. One plan on the Moving Walls platform can run across every venue type in Singapore.',
      },
    ],
    ctaHeading: 'Plan Your Residential Campaign in Singapore',
    ctaBody:
      'Whether you need a few buildings in one neighbourhood or all 27, Moving Walls helps you pick the right inventory and shows you what it delivered.',
    ctaButton: 'Talk to Our Experts Today',
  },
  {
    slug: 'retail-malls-advertising',
    tabLabel: 'Retail & Malls',
    tabBestFor: 'Launches and lifestyle brands, close to the point of purchase',
    tabDescription:
      'Large-format LED at Orchard Gateway, Orchard Hotel, Bugis Street and Chinatown Point, close to the point of purchase.',
    tabStats: [
      { value: '6', label: 'Sites' },
      { value: '15', label: 'Screens' },
      { value: '4.3M+', label: 'Monthly impressions' },
    ],
    badge: 'Programmatic',
    image: { src: 'https://cdn.sanity.io/images/u10im6di/production/4423baf48cc2c256db7440c39595fc0cef49695f-960x580.webp', alt: 'Large-format LED digital billboards on the façade of Chinatown Point mall in Singapore', title: 'Retail and mall advertising in Singapore', need: '' },
    metaTitle: 'Retail & Mall Advertising in Singapore | Moving Walls',
    metaDescription:
      'Retail and mall advertising in Singapore: LED spectaculars on Orchard Road and in Bugis and Chinatown, 4.3M+ monthly impressions, bought programmatically.',
    breadcrumbLabel: 'Retail & Malls Advertising',
    h1: 'Retail & Mall Advertising in Singapore',
    tagline: "Big Canvases in Singapore's Busiest Retail Districts",
    leadQuestion: 'Looking for a digital billboard in Singapore that proves its impact?',
    intro: [
      'Moving Walls helps brands reach shoppers and tourists through large-format LED spectaculars on Orchard Road and in Bugis and Chinatown. Every campaign is bought programmatically and reported by screen.',
      "Orchard Road is Singapore's primary retail corridor, and Bugis and Chinatown add high-traffic markets and street shopping.",
      "Moving Walls' retail network spans 6 sites and 15 screens, delivering 4.3M+ monthly impressions, led by Orchard Gateway, Orchard Hotel, Bugis Street and Chinatown Point.",
      'Through a single platform, advertisers can book a single landmark screen for a launch day, schedule by shopping hours and measure delivery by screen.',
    ],
    heroCta: 'Plan Your Billboard Campaign',
    heroStats: [
      { value: '6', label: 'Sites' },
      { value: '15', label: 'Screens' },
      { value: '4.3M+', label: 'Monthly impressions' },
    ],
    whyHeading: "Why Advertise on Singapore's Retail Billboards?",
    why: [
      {
        title: 'Close to the purchase',
        description: 'These screens sit where people are already shopping, in Orchard, Bugis and Chinatown.',
      },
      { title: 'Landmark reach', description: 'Orchard Gateway reaches 164,418 people a month, and Orchard Hotel 146,090.' },
      { title: 'Headline impact', description: 'A few landmark screens carry a launch, backed by MRT stations for reach.' },
      {
        title: 'Measurable campaign performance',
        description: 'All six sites are bought programmatically, with delivery reported by screen.',
      },
    ],
    premiumHeading: 'Premium Billboard Locations in Singapore',
    premiumIntro: 'Premium advertising locations with maximum exposure',
    landmarks: [
      {
        name: 'Orchard Gateway',
        location: 'Orchard Road',
        format: 'Façade LED, 1066 × 480 px',
        reach: '164,418',
        impressions: '982,770',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/f21433e59bd6278cdd3c509418b13f589f9df0b0-960x549.webp', alt: 'Orchard Gateway façade LED digital billboard on Orchard Road, Singapore', title: 'Orchard Gateway, Orchard Road', need: '' },
      },
      {
        name: 'Orchard Hotel',
        location: 'Orchard Road',
        format: 'LED, 1920 × 1080 px',
        reach: '146,090',
        impressions: '618,000',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/7e6cde263b857ed89d7f3df002a37cc6b153041b-960x518.webp', alt: 'Curved LED digital billboard in front of Orchard Hotel on Orchard Road, Singapore', title: 'Orchard Hotel, Orchard Road', need: '' },
      },
      {
        name: 'Chinatown Point',
        location: 'Chinatown',
        format: '3 LED screens, 720 × 420 px',
        reach: '113,524',
        impressions: '843,030',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/4423baf48cc2c256db7440c39595fc0cef49695f-960x580.webp', alt: 'Chinatown Point mall façade with LED digital billboards above a busy crossing, Singapore', title: 'Chinatown Point, Chinatown', need: '' },
      },
    ],
    locationsHeading: 'Billboard Locations Across Singapore',
    sites: [
      { name: 'Orchard Gateway façade LED', group: 'Orchard Road', note: 'On 09.00 to 23.00' },
      { name: 'Orchard Hotel LED', group: 'Orchard Road', note: 'On 08.00 to 22.00' },
      { name: 'Bugis Street, 8-screen installation in the market', group: 'Bugis', note: 'On 09.00 to 23.00' },
      { name: 'Chinatown Point, three screens', group: 'Chinatown', note: 'On 09.00 to 23.00' },
      { name: 'ERA APAC Centre (Toa Payoh)', group: 'Beyond the centre' },
      { name: 'ESR BizPark @ Changi', group: 'Beyond the centre' },
    ],
    formatsHeading: 'Different Types of Retail & Mall Advertising Formats',
    formats: ['Digital Billboards', 'Façade LED', 'Multi-screen spectaculars'],
    whyChooseLead: [
      "Booking a landmark screen shouldn't take weeks of back and forth.",
      "Moving Walls brings Singapore's retail spectaculars onto one platform, so brands can book them alongside MRT, interchange and residential screens.",
    ],
    whyChooseList: [
      'Access landmark LEDs on Orchard Road, in Bugis and in Chinatown',
      'Book a single screen for a launch day',
      'Buy programmatically and adjust mid-flight',
      'Reach shoppers and tourists',
      'Measure delivery by screen with transparent reporting',
    ],
    faqs: [
      {
        question: 'How much does billboard advertising in Singapore cost?',
        answer:
          'Pricing depends on the site, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.',
      },
      {
        question: "What's the difference between a digital billboard and an LED billboard?",
        answer:
          'Both are digital out-of-home formats. "Digital billboard" usually means a large outdoor screen; "LED billboard" can also cover façade and mall displays. Our Singapore retail sites include both.',
      },
      {
        question: 'Can I run billboard advertising in Singapore programmatically?',
        answer:
          'Yes. All six sites are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.',
      },
      {
        question: 'Can I book just one screen?',
        answer: 'Yes. A single landmark screen can run on its own or as part of a wider plan.',
      },
    ],
    ctaHeading: 'Plan Your Billboard Advertising Campaign in Singapore',
    ctaBody:
      'Whether you need one Orchard Road screen or every landmark site, Moving Walls helps you pick the right inventory and shows you what it delivered.',
    ctaButton: 'Talk to Our Experts Today',
  },
  {
    slug: 'airport-advertising',
    tabLabel: 'Airport',
    tabBestFor: 'Travel, luxury, finance and regional business audiences',
    tabDescription:
      'Changi terminal video walls, baggage claim and travelator media reaching inbound and outbound travellers. Booked direct.',
    tabStats: [],
    tabNote: 'Booked direct · site list to follow',
    badge: 'Direct',
    image: { src: 'https://cdn.sanity.io/images/u10im6di/production/2ce6ea523061538b4ea1ddb7f0648df2d3f0250f-960x580.webp', alt: 'Large LED advertising screens above a busy Changi Airport terminal hall in Singapore', title: 'Airport advertising in Singapore', need: '' },
    metaTitle: 'Changi Airport Advertising in Singapore | Moving Walls',
    metaDescription:
      "Reach international travellers at Changi Airport with arrival hall, departure and Jewel screens, booked direct and reported alongside your Singapore DOOH plan.",
    breadcrumbLabel: 'Airport Advertising',
    h1: 'Changi Airport Advertising in Singapore',
    tagline: 'Reach Travellers the Moment They Land at Changi',
    leadQuestion: 'Looking for airport advertising in Singapore that proves its impact?',
    intro: [
      "Moving Walls helps brands reach business travellers, regional visitors and returning residents through screens in Changi's arrival halls, departure areas and Jewel. Unlike the other venue types, Changi inventory is booked direct rather than programmatically.",
      "Changi is one of the world's busiest international hubs, handling close to 70 million passengers in 2025.",
      'Through a single platform, advertisers can book Changi direct and run the rest of their Singapore plan programmatically, with reporting in one place.',
    ],
    heroCta: 'Request Airport Availability',
    heroStats: [
      { value: '~70M', label: 'Passengers in 2025' },
      { value: 'Direct', label: 'Booking' },
      { value: '3', label: 'Zones: arrivals, departures, Jewel' },
    ],
    whyHeading: 'Why Advertise at Changi?',
    why: [
      {
        title: 'An international audience',
        description:
          'Changi reaches travellers unlike any other venue on the island: international, higher-spending and often in a buying mood.',
      },
      {
        title: 'High dwell time',
        description: 'Passengers wait for bags, greeters and boarding, with time to take in a message.',
      },
      {
        title: 'The first line of a Singapore plan',
        description:
          'For finance, luxury, travel and technology brands, the airport reaches the traveller on arrival; MRT and retail reach them again in the city.',
      },
      { title: 'One report', description: 'Airport delivery sits alongside the rest of your programmatic Singapore campaign.' },
    ],
    premiumHeading: 'Premium Locations at Changi Airport',
    landmarksImageOnly: true,
    premiumIntro: 'Premium advertising locations with maximum exposure',
    landmarks: [
      {
        name: '[Site from airport list]',
        location: '[Terminal]',
        format: '[Format]',
        reach: 'TBC',
        impressions: 'TBC',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/5c8b7dff524f8eae088f099a96c6b404f26b2eab-960x523.webp', alt: 'Giant digital waterfall LED wall in a Changi Airport terminal hall, Singapore', title: 'Changi Airport terminal digital screen', need: '' },
      },
      {
        name: '[Site from airport list]',
        location: '[Terminal]',
        format: '[Format]',
        reach: 'TBC',
        impressions: 'TBC',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/2ce6ea523061538b4ea1ddb7f0648df2d3f0250f-960x580.webp', alt: 'Large LED advertising screens above a busy Changi Airport terminal hall, Singapore', title: 'Changi Airport terminal advertising', need: '' },
      },
      {
        name: '[Site from airport list]',
        location: '[Jewel]',
        format: '[Format]',
        reach: 'TBC',
        impressions: 'TBC',
        image: { src: 'https://cdn.sanity.io/images/u10im6di/production/87b5ddc0046de1830188abfbbcb5158c4c646481-960x519.webp', alt: 'Rain Vortex indoor waterfall at Jewel Changi Airport, Singapore', title: 'Jewel Changi Airport', need: '' },
      },
    ],
    locationsHeading: 'Airport Advertising Locations in Singapore',
    sites: [],
    locationGroups: [
      { title: 'Arrival halls', description: 'Video walls where passengers wait for bags and meet greeters.' },
      {
        title: 'Departure and transit areas',
        description: 'Screens along halls and walkways for outbound and connecting travellers.',
      },
      { title: 'Jewel', description: 'Screens in the retail and leisure complex linked to the terminals.' },
    ],
    formatsHeading: 'Different Types of Airport Advertising Formats',
    formats: ['Arrival hall video walls', 'Departure and transit screens', 'Jewel retail screens'],
    whyChooseLead: [
      'Airport media is usually a separate negotiation from the rest of the plan.',
      'Moving Walls handles Changi alongside your programmatic Singapore buy, so the whole campaign is planned and reported in one place.',
    ],
    whyChooseList: [
      'Book Changi screens direct through one team',
      'Run MRT, retail and residential programmatically in the same plan',
      'Reach business and leisure travellers',
      'Measure the whole campaign with transparent reporting',
    ],
    faqs: [
      {
        question: 'How much does airport advertising in Singapore cost?',
        answer:
          "Changi media is quoted direct. Share your dates, audience and budget and we'll send current availability and rates.",
      },
      {
        question: 'Can I buy Changi programmatically?',
        answer:
          "Not today. Airport inventory isn't traded through a DSP, so it's booked direct. The rest of your Singapore plan can still run programmatically.",
      },
      {
        question: 'Can I combine Changi with MRT and retail screens?',
        answer: 'Yes. One plan can include Changi alongside every programmatic venue type, with reporting in one place.',
      },
    ],
    ctaHeading: 'Plan Your Airport Advertising Campaign in Singapore',
    ctaBody:
      'Whether you need one arrival hall screen or a full Changi presence, Moving Walls helps you pick the right inventory and shows you what it delivered.',
    ctaButton: 'Talk to Our Experts Today',
  },
]

export const getSgVenue = (slug: string) => sgVenues.find((v) => v.slug === slug) || null
const venueHref = (slug: string) => `${SG_BASE_PATH}/${slug}`

// ---------------------------------------------------------------------------
// Main Singapore page
// ---------------------------------------------------------------------------

export const sgMain = {
  metaTitle: 'Outdoor Advertising in Singapore | DOOH & Billboards | Moving Walls',
  metaDescription:
    'Plan outdoor advertising in Singapore across 490+ programmatic screens in MRT stations, bus interchanges, condominiums and malls, with delivery data and brand lift.',
  h1: 'Outdoor Advertising in Singapore',
  heroParagraphs: [
    'Singapore is one of the most concentrated out-of-home markets in Asia. Six million people live on one island of 730 square kilometers, and they make more than seven million public transport journeys a day.',
    'The Moving Walls platform connects brands to that audience through 490+ programmatic screens in train stations, bus interchanges, condominiums and malls. Plan by venue, buy programmatically or direct, and see what the campaign actually delivered.',
  ],
  heroPrimaryCta: 'DOOH Singapore',
  heroSecondaryCta: 'Browse by Venue',
  heroStats: [
    { value: '6M+', label: 'Population' },
    { value: '7M+', label: 'Daily public transport journeys' },
    { value: '490+', label: 'Programmatic screens' },
    { value: '100%', label: 'Urban population' },
  ],
  landscape: {
    heading: 'The Singapore OOH Landscape',
    intro:
      'Singapore is one of the few markets in the region where every kind of out-of-home trades side by side. Most screens are digital, a large share can be bought programmatically, and traditional large-format sites still anchor launches.',
    cards: [
      {
        title: 'Programmatic DOOH',
        description: 'A large share of digital inventory is bought by audience and daypart, with creative that can change mid-flight.',
      },
      {
        title: 'Digital screen networks',
        description: 'Loop-based networks across MRT stations, malls, lift lobbies, offices and bus interchanges, built for frequency.',
      },
      {
        title: 'Traditional billboards and large format',
        description: 'Static sites and building-scale formats, still used where scale and permanence matter.',
      },
      {
        title: 'Transit and airport',
        description: 'MRT, bus and Changi media reaching commuters and travellers on repeatable daily journeys.',
      },
    ],
  },
  venuesHeading: 'Find DOOH Screens by Venue in Singapore',
  venuesIntro:
    'Choose a venue type to see every site we offer in it, each listed once, with screen counts and monthly impressions. Everything except the airport is available programmatically.',
  landmarksHeading: 'High Visibility Digital Billboards in Singapore',
  landmarksIntro: 'The landmark sites. If you need three or four screens to carry a launch, start here.',
  landmarks: [
    {
      name: 'Serangoon Groove',
      location: 'Serangoon MRT, North East',
      format: 'LED, 7680 × 1200 px',
      reach: '151,333',
      impressions: '1,470,960',
      image: { src: 'https://cdn.sanity.io/images/u10im6di/production/e7e3df6342e7f41b675b1cc297de2b2f6b0300dc-960x520.webp', alt: 'Serangoon Groove curved LED DOOH screen inside Serangoon MRT station, Singapore', title: 'Serangoon Groove, Serangoon MRT', need: '' },
    },
    {
      name: 'Downtown Aura',
      location: 'Downtown MRT, CBD',
      format: 'LED, 10000 × 1000 px',
      reach: '142,610',
      impressions: '738,720',
      image: { src: 'https://cdn.sanity.io/images/u10im6di/production/85eec0548893fcde61a832963698a6d0b890f543-960x520.webp', alt: 'Downtown Aura LED DOOH screen at Downtown MRT station in Singapore’s CBD', title: 'Downtown Aura, Downtown MRT', need: '' },
    },
    {
      name: 'Orchard Gateway',
      location: 'Orchard Road',
      format: 'Façade LED, 1066 × 480 px',
      reach: '164,418',
      impressions: '982,770',
      image: { src: 'https://cdn.sanity.io/images/u10im6di/production/f21433e59bd6278cdd3c509418b13f589f9df0b0-960x549.webp', alt: 'Orchard Gateway façade LED digital billboard on Orchard Road, Singapore', title: 'Orchard Gateway, Orchard Road', need: '' },
    },
  ] as SgLandmark[],
  mediaTypesHeading: 'Out of Home Advertising Media Types Available',
  mediaTypes: [
    {
      title: 'MRT Station Advertising',
      description:
        'Platform, concourse and linkway screens across the Thomson-East Coast, Downtown and North East lines, plus landmark station spectaculars.',
      href: venueHref('mrt-station-advertising'),
      icon: 'train',
    },
    {
      title: 'Bus Interchange Advertising',
      description:
        'Digital screens inside bus interchanges island-wide, a higher-dwell alternative to roadside bus shelter advertising and bus stop billboards.',
      href: venueHref('bus-interchange-advertising'),
      icon: 'bus',
    },
    {
      title: 'Digital Billboards',
      description:
        'Large-format LED along expressways, arterial roads and retail frontages, with dayparted and trigger-based creative.',
      href: venueHref('retail-malls-advertising'),
      icon: 'billboard',
    },
    {
      title: 'Retail Spectaculars',
      description:
        'Large-format LED at Orchard Gateway, Orchard Hotel, Bugis Street and Chinatown Point, close to the point of purchase.',
      href: venueHref('retail-malls-advertising'),
      icon: 'store',
    },
    {
      title: 'Airport Media',
      description:
        'Changi terminal video walls, baggage claim and travelator media reaching inbound and outbound travellers. Booked direct.',
      href: venueHref('airport-advertising'),
      icon: 'plane',
    },
  ],
  billboard: {
    heading: 'Billboard Advertising in Singapore',
    paragraphs: [
      'Singapore is one of the most efficient outdoor advertising markets in Asia. The entire population lives in a single urban area of roughly 730 square kilometers, so a well-planned OOH campaign can build near-national reach in days rather than weeks.',
      'The market has also digitised faster than almost anywhere else in the region. Screens dominate MRT stations, malls, office lobbies, lift landings and taxi rooftops, and much of that inventory now trades programmatically. For advertisers, that turns outdoor advertising in Singapore from a fixed, long-cycle buy into a flexible channel bought by audience, dayparted by hour and optimised mid-flight.',
      'The practical effect is that billboard advertising in Singapore and a full digital outdoor advertising campaign are no longer separate conversations: static and digital sit in the same plan, bought against the same audience.',
      "It also means briefs move faster. A regional team that doesn't know the market shouldn't have to work out which mall sits in which district. Start from the venue type, and every relevant screen is already listed, once.",
    ],
    cta: 'Explore Advertising Options',
    image: { src: 'https://cdn.sanity.io/images/u10im6di/production/452975c1a3aa24548b88788a703c28546c30df44-960x540.webp', alt: 'Singapore CBD and Marina Bay skyline at dusk, a prime market for outdoor advertising', title: 'Outdoor advertising in Singapore', need: '' },
  },
  measurement: {
    heading: 'Run the Campaign. Get It Evaluated.',
    paragraphs: [
      'Most outdoor buys end at proof of posting. Every Moving Walls campaign in Singapore comes back with delivery data, and campaigns above a set value include a brand lift study run on our own consumer panel.',
      "You don't just find out where your ads ran. You find out whether they moved recall, consideration and intent.",
    ],
    rows: [
      { what: 'Delivery and reach', tells: 'Impressions, unique reach and frequency by site, venue and daypart' },
      { what: 'Audience verification', tells: 'Who passed the screens, against the audience you booked' },
      { what: 'Brand lift study', tells: 'Recall, consideration and intent against a control group' },
      { what: 'Outcome attribution', tells: 'Store visits and site traffic connected back to exposure' },
    ],
    cta: 'Talk to Us About Measurement',
  },
  potential: {
    heading: 'OOH Market Potential in Singapore',
    paragraphs: [
      "Singapore's OOH advertising sector continues to grow on the back of sustained public transport ridership, a record-breaking air hub and one of the highest digital screen densities in Southeast Asia. More than seven million public transport journeys are made on an average day, and Changi Airport handled close to 70 million passenger movements in 2025, a concentrated, repeatable audience few other markets can match at this scale.",
      'Digital out-of-home advertising in Singapore now accounts for the majority of outdoor spend, and the shift is accelerating as more networks connect to programmatic supply. Advertisers can buy digital billboards, MRT station screens, mall networks and taxi media by audience segment and time of day, run different creative in the CBD and the heartlands on the same campaign, and adjust flights based on live performance.',
      'Singapore also works as a regional launchpad. Many campaigns are planned and commissioned here and then extended across Southeast Asia: same platform, same planning logic, same measurement framework in every market.',
      'What has changed most is accountability. Measurement built on mobility data, audience panels and brand lift now makes it possible to report outdoor on the same terms as digital. As that capability matures, outdoor advertising companies in Singapore compete less on site lists and more on the quality of the planning and proof they deliver.',
    ],
  },
  stories: {
    heading: 'Success Stories: DOOH in Singapore',
    intro: 'Campaigns planned out of Singapore, running here and across the region.',
    items: [
      {
        tag: 'Case Study',
        headline: "JP Morgan reached 73,333 professionals across Singapore's CBD",
        button: 'View Case Study',
        href: '/case-studies/how-jp-morgan-lifted-etf-awareness-with-pdooh',
        image: 'https://cdn.sanity.io/images/u10im6di/production/20811096a5de71829914384b57cff2a3a28f5fd0-960x540.png',
      },
      {
        tag: 'Guide',
        headline: 'How are your audience moving? Traffic Insights',
        button: 'Download Guide',
        href: '/ebooks/how-are-your-audience-moving',
        image: 'https://cdn.sanity.io/images/u10im6di/production/04340b69fc0be0ed8ab887f303e3598af74a76db-490x249.png',
      },
    ],
  },
  cta: {
    heading: 'Boost Your Visibility in Singapore with OOH Advertising',
    body: "Tell us your audience, market and budget. We'll come back with a plan across billboards, transit and mall media, and the measurement to prove what it delivered.",
    button: 'Request Media Plan',
  },
  faqs: [
    {
      question: 'I have a CBD brief. How do I find the right screens?',
      answer:
        'Open the Train Stations tab and filter by CBD. It lists the stations serving the financial district: Downtown, Telok Ayer, Chinatown, Maxwell, Shenton Way, Marina Bay, Outram Park and more, with screen counts and monthly impressions, so you can shortlist without knowing which station sits in which planning area.',
    },
    {
      question: 'What makes out-of-home advertising effective in Singapore?',
      answer:
        'Singapore is compact, fully urbanised and built around public transport, so audiences are concentrated and predictable. More than seven million public transport journeys are made on an average day, and the same commuters pass the same screens repeatedly, which builds frequency quickly at manageable cost. Add a dense mall network, a world-leading airport and heavy expressway traffic, and a single OOH campaign can cover work, retail and residential journeys across almost the entire population.',
    },
    {
      question: 'What opportunities does digital out-of-home (DOOH) advertising offer in Singapore?',
      answer:
        'Digital screens dominate the market: MRT stations, malls, lift lobbies, office towers, taxi toppers and roadside LED. Because the inventory is digital and increasingly programmatic, advertisers can buy by audience rather than by site, run different creative by location and time of day, and trigger messages off conditions such as weather, traffic or stock levels.\n\nSingapore is also unusual in that programmatic screens, digital networks and classic billboards all trade side by side, so a single plan can mix formats that other markets in the region can\'t offer together.',
    },
    {
      question: 'Can I measure brand lift on a Singapore OOH campaign?',
      answer:
        'Yes. Alongside delivery reporting of impressions, unique reach and frequency, campaigns above a set value include a brand lift study run on our own consumer panel in Singapore, measuring recall, consideration and intent against a control group.\n\nIt runs in parallel with the campaign rather than as a separate research project, so results arrive with the post-campaign report instead of months later.',
    },
    {
      question: 'How much does billboard advertising in Singapore cost?',
      answer:
        'Billboard advertising rates in Singapore vary widely by format, location and duration. A digital slot on a heartland mall network sits at a very different price point to a premium Orchard Road façade or a Changi terminal video wall, and digital inventory is often sold by share of loop or by impressions rather than by fixed weekly rate.\n\nRather than one outdoor advertising rate card for Singapore, the more useful question is cost per thousand against the audience you actually want. Share your target audience, market and budget with us and we\'ll build a plan with transparent delivery estimates.',
    },
    {
      question: 'Can a campaign planned in Singapore run across Southeast Asia?',
      answer:
        'Yes, and many do. Singapore is where a lot of regional campaigns are commissioned, then extended into Malaysia, Indonesia, the Philippines and beyond. Moving Walls operates across 14+ markets on one platform, so planning, booking and measurement stay consistent wherever the campaign runs.',
    },
  ] as SgFaq[],
}

/** FAQPage JSON-LD; multi-paragraph answers are joined with a space */
export function sgFaqJsonLd(faqs: SgFaq[]) {
  if (!faqs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer.split('\n\n').join(' ') },
    })),
  }
}
