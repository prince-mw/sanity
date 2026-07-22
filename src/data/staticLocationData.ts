// Static fallback data for location pages
// This data is used when Sanity doesn't have an entry for a location

export interface LocationData {
  name: string
  slug: string
  city: string
  description: string
  heroTitle?: string
  heroImage: string
  heroTagline?: string
  contactFormUrl?: string
  highVisibilityBillboards: Array<{
    name: string
    location: string
    reach: string
    impressions: string
    description: string
    image?: string
  }>
  stats: Array<{ label: string; value: string }>
  mediaTypes: Array<{ name: string; icon: string; description: string }>
  faqs: Array<{ question: string; answer: string }>
  sections?: any[]
  sectionsPosition?: string
}

// Malaysia static data
export const malaysiaData: LocationData = {
  name: 'Malaysia',
  slug: 'malaysia',
  city: 'Kuala Lumpur',
  description: 'Leverage the power of OOH advertising in Malaysia to reach a wider audience through strategic outdoor placements.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Malaysia',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/MalaysiaContact',
  highVisibilityBillboards: [
    {
      name: "KL City Center",
      location: "JLN IMBI, Berjaya Time Square, Park Royal Hotel",
      reach: "132,145",
      impressions: "1,075,680",
      description: "A premier outdoor advertising billboard located in the bustling district of Kuala Lumpur.",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    },
    {
      name: "Golden Triangle",
      location: "Bukit Bintang Golden Triangle KL",
      reach: "142,820",
      impressions: "1,000,000+",
      description: "A prime spot for outdoor advertising with high-traffic ensuring substantial reach.",
      image: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&q=80",
    },
    {
      name: "1 Utama",
      location: "LDP Highway - From Kepong, Petaling, Selangor",
      reach: "193,818",
      impressions: "1,034,280",
      description: "A prime outdoor advertising billboard in the heart of Petaling, Selangor.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    },
  ],
  stats: [
    { label: 'Population', value: '33.4M+' },
    { label: 'Urbanization Rate', value: '76%' },
    { label: 'KL Residents', value: '1.9M' },
    { label: 'Key Markets', value: '4+' },
  ],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'High-impact digital displays' },
    { name: 'Transit', icon: 'transit', description: 'Bus, taxi, and rail advertising' },
    { name: 'Mall Networks', icon: 'mall', description: 'Shopping center displays' },
    { name: 'Street Furniture', icon: 'static', description: 'Bus shelters and kiosks' },
  ],
  faqs: [
    { question: "What is DOOH advertising?", answer: "DOOH (Digital Out-of-Home) uses digital screens in public spaces to deliver dynamic, engaging ads that can be updated in real time." },
    { question: "Why invest in OOH advertising in Malaysia?", answer: "Malaysia's cities, diverse population, and growing economy make it ideal for impactful campaigns that reach commuters, shoppers, and travelers." },
    { question: "What types of OOH advertising are available?", answer: "Billboards, transit ads (buses, taxis, trains), street furniture, malls, airports, and digital billboards in high-traffic areas." },
    { question: "How can I measure campaign effectiveness?", answer: "Track impressions, engagement rates, conversions, and real-time insights via programmatic DOOH analytics." },
    { question: "What are the benefits of DOOH advertising?", answer: "High visibility, dynamic content, precise audience targeting, and actionable performance data." },
    { question: "How does Moving Walls help advertisers in Malaysia?", answer: "Our Moving Audiences platform enables precise targeting, real-time analytics, and seamless campaign execution across DOOH networks." },
  ],
}

// Singapore static data
export const singaporeData: LocationData = {
  name: 'Singapore',
  slug: 'singapore',
  city: 'Singapore',
  description: 'Connect with Singapore\'s tech-savvy population through premium OOH placements across the city-state.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Singapore',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/SingaporeContact',
  highVisibilityBillboards: [
    {
      name: "Orchard Road",
      location: "ION Orchard, Ngee Ann City",
      reach: "185,000",
      impressions: "1,200,000+",
      description: "Singapore's premier shopping belt with high foot traffic.",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    },
    {
      name: "Marina Bay",
      location: "Marina Bay Sands, The Shoppes",
      reach: "165,000",
      impressions: "980,000+",
      description: "Iconic waterfront location with premium audience.",
      image: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&q=80",
    },
  ],
  stats: [
    { label: 'Population', value: '5.9M' },
    { label: 'Digital Penetration', value: '92%' },
    { label: 'Urban Coverage', value: '100%' },
    { label: 'Monthly Reach', value: '4.5M' },
  ],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital displays' },
    { name: 'MRT Advertising', icon: 'transit', description: 'Mass Rapid Transit network' },
    { name: 'Mall Networks', icon: 'mall', description: 'Shopping center displays' },
    { name: 'Bus Shelters', icon: 'static', description: 'Street-level advertising' },
  ],
  faqs: [
    { question: "What makes Singapore unique for OOH?", answer: "Singapore's compact size, high urbanization, and tech-savvy population make it perfect for targeted OOH campaigns." },
    { question: "What are the main OOH formats?", answer: "Digital billboards, MRT advertising, bus wraps, mall screens, and Changi Airport displays." },
    { question: "How effective is OOH in Singapore?", answer: "With 100% urban coverage and high public transport usage, OOH reaches nearly the entire population." },
  ],
}

// Indonesia static data
export const indonesiaData: LocationData = {
  name: 'Indonesia',
  slug: 'indonesia',
  city: 'Jakarta',
  description: 'Reach Southeast Asia\'s largest market with OOH advertising across Indonesia\'s major cities.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Indonesia',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/IndonesiaContact',
  highVisibilityBillboards: [
    {
      name: "Jakarta CBD",
      location: "Sudirman - Thamrin Corridor",
      reach: "250,000",
      impressions: "2,000,000+",
      description: "Indonesia's main business corridor with premium visibility.",
      image: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80",
    },
  ],
  stats: [
    { label: 'Population', value: '275M' },
    { label: 'Urban Population', value: '56%' },
    { label: 'Jakarta Metro', value: '34M' },
    { label: 'Key Cities', value: '5+' },
  ],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Large format displays' },
    { name: 'Transit', icon: 'transit', description: 'TransJakarta and MRT' },
    { name: 'Mall Networks', icon: 'mall', description: 'Shopping center advertising' },
    { name: 'Highway', icon: 'highway', description: 'Toll road billboards' },
  ],
  faqs: [
    { question: "Why advertise in Indonesia?", answer: "Indonesia is Southeast Asia's largest economy with over 275 million people and growing middle class." },
    { question: "What cities should I target?", answer: "Jakarta, Surabaya, Bandung, Medan, and Bali are key markets with strong OOH infrastructure." },
  ],
}

// Thailand static data
export const thailandData: LocationData = {
  name: 'Thailand',
  slug: 'thailand',
  city: 'Bangkok',
  description: 'Engage Thai consumers through strategic OOH placements in Bangkok and major tourist destinations.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Thailand',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/ThailandContact',
  highVisibilityBillboards: [
    {
      name: "Siam Square",
      location: "Central Bangkok, BTS Siam",
      reach: "180,000",
      impressions: "1,400,000+",
      description: "Bangkok's premier shopping and entertainment district.",
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    },
  ],
  stats: [
    { label: 'Population', value: '70M' },
    { label: 'Bangkok Metro', value: '17M' },
    { label: 'Annual Tourists', value: '40M+' },
    { label: 'Key Markets', value: '4+' },
  ],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital displays' },
    { name: 'BTS/MRT', icon: 'transit', description: 'Rail transit advertising' },
    { name: 'Mall Networks', icon: 'mall', description: 'Shopping center displays' },
    { name: 'Airport', icon: 'airport', description: 'Suvarnabhumi & Don Mueang' },
  ],
  faqs: [
    { question: "Why advertise in Thailand?", answer: "Thailand combines a large domestic market with over 40 million annual tourists." },
    { question: "What makes Bangkok special for OOH?", answer: "Dense urban environment, extensive BTS/MRT network, and world-class shopping malls." },
  ],
}

// Philippines static data
export const philippinesData: LocationData = {
  name: 'Philippines',
  slug: 'philippines',
  city: 'Manila',
  description: 'Connect with the Philippines\' young, mobile-first population through impactful OOH advertising.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Philippines',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/PhilippinesContact',
  highVisibilityBillboards: [
    {
      name: "EDSA Guadalupe",
      location: "EDSA Highway, Makati",
      reach: "220,000",
      impressions: "1,800,000+",
      description: "Philippines' busiest highway corridor.",
      image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80",
    },
  ],
  stats: [
    { label: 'Population', value: '115M' },
    { label: 'Metro Manila', value: '14M' },
    { label: 'Median Age', value: '25.7' },
    { label: 'Key Markets', value: '3+' },
  ],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'LED displays' },
    { name: 'Transit', icon: 'transit', description: 'MRT and bus advertising' },
    { name: 'Mall Networks', icon: 'mall', description: 'SM and Ayala malls' },
    { name: 'Highway', icon: 'highway', description: 'EDSA and expressways' },
  ],
  faqs: [
    { question: "Why advertise in the Philippines?", answer: "Young population with median age of 25.7 and high mobile penetration." },
    { question: "What are the main OOH markets?", answer: "Metro Manila, Cebu, and Davao are the key urban markets." },
  ],
}

// India static data
export const indiaData: LocationData = {
  name: 'India',
  slug: 'india',
  city: 'Mumbai',
  description: 'Reach India\'s 1.4 billion consumers through strategic OOH placements across major metros.',
  heroImage: '',
  heroTagline: 'OOH Advertising in India',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/IndiaContact',
  highVisibilityBillboards: [
    {
      name: "Mumbai BKC",
      location: "Bandra-Kurla Complex",
      reach: "350,000",
      impressions: "2,800,000+",
      description: "India's premier business district.",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80",
    },
  ],
  stats: [
    { label: 'Population', value: '1.4B' },
    { label: 'Urban Population', value: '35%' },
    { label: 'Metro Cities', value: '8+' },
    { label: 'Monthly Reach', value: '500M+' },
  ],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital OOH' },
    { name: 'Transit', icon: 'transit', description: 'Metro and bus advertising' },
    { name: 'Mall Networks', icon: 'mall', description: 'Shopping center displays' },
    { name: 'Airport', icon: 'airport', description: 'Major airport advertising' },
  ],
  faqs: [
    { question: "Why advertise in India?", answer: "World's most populous country with rapidly growing middle class and digital infrastructure." },
    { question: "Which cities should I target?", answer: "Mumbai, Delhi-NCR, Bangalore, Chennai, Hyderabad, and Kolkata are key markets." },
  ],
}

// Japan static data
export const japanData: LocationData = {
  name: 'Japan',
  slug: 'japan',
  city: 'Tokyo',
  description: 'Connect with Japanese consumers through premium OOH placements in world-class urban environments.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Japan',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/JapanContact',
  highVisibilityBillboards: [
    {
      name: "Shibuya Crossing",
      location: "Shibuya Station Area",
      reach: "500,000",
      impressions: "4,000,000+",
      description: "World's busiest pedestrian crossing.",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80",
    },
  ],
  stats: [
    { label: 'Population', value: '125M' },
    { label: 'Tokyo Metro', value: '37M' },
    { label: 'GDP per Capita', value: '$42K' },
    { label: 'Key Markets', value: '4+' },
  ],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital displays' },
    { name: 'Train Advertising', icon: 'transit', description: 'JR and Metro systems' },
    { name: 'Station Media', icon: 'mall', description: 'Station complex advertising' },
    { name: 'Street Vision', icon: 'static', description: 'Iconic street displays' },
  ],
  faqs: [
    { question: "What makes Japan unique for OOH?", answer: "World-class transit systems, high urbanization, and premium consumer market." },
    { question: "What are the main advertising formats?", answer: "Train advertising, station media, digital billboards, and iconic locations like Shibuya." },
  ],
}

// Australia static data
export const australiaData: LocationData = {
  name: 'Australia',
  slug: 'australia',
  city: 'Sydney',
  description: 'Reach Australian consumers through premium OOH placements in major metropolitan areas.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Australia',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/AustraliaContact',
  highVisibilityBillboards: [
    {
      name: "Sydney CBD",
      location: "George Street, Sydney",
      reach: "150,000",
      impressions: "1,200,000+",
      description: "Sydney's premier business and retail corridor.",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    },
  ],
  stats: [
    { label: 'Population', value: '26M' },
    { label: 'Urban Rate', value: '86%' },
    { label: 'Key Cities', value: '5' },
    { label: 'Digital OOH', value: '40%+' },
  ],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital displays' },
    { name: 'Transit', icon: 'transit', description: 'Rail and bus advertising' },
    { name: 'Retail', icon: 'mall', description: 'Shopping center networks' },
    { name: 'Airport', icon: 'airport', description: 'International airports' },
  ],
  faqs: [
    { question: "Why advertise in Australia?", answer: "High-income market with 86% urban population concentrated in major cities." },
    { question: "What are the main OOH markets?", answer: "Sydney, Melbourne, Brisbane, Perth, and Adelaide are the key markets." },
  ],
}

// Sri Lanka static data
export const sriLankaData: LocationData = {
  name: 'Sri Lanka',
  slug: 'sri-lanka',
  city: 'Colombo',
  description: 'Connect with Sri Lankan consumers through strategic OOH placements in Colombo and beyond.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Sri Lanka',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/SriLankaContact',
  highVisibilityBillboards: [
    {
      name: "Colombo Fort",
      location: "Central Colombo",
      reach: "85,000",
      impressions: "680,000+",
      description: "Colombo's historic business district.",
      image: "https://images.unsplash.com/photo-1586871608370-4adee64d1794?w=800&q=80",
    },
  ],
  stats: [
    { label: 'Population', value: '22M' },
    { label: 'Colombo Metro', value: '5.6M' },
    { label: 'Urban Rate', value: '19%' },
    { label: 'Annual Tourists', value: '2M+' },
  ],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'LED displays' },
    { name: 'Transit', icon: 'transit', description: 'Bus and rail advertising' },
    { name: 'Retail', icon: 'mall', description: 'Mall advertising' },
    { name: 'Highway', icon: 'highway', description: 'Expressway billboards' },
  ],
  faqs: [
    { question: "Why advertise in Sri Lanka?", answer: "Growing economy with increasing urbanization and tourism." },
    { question: "What are the main markets?", answer: "Colombo is the primary market, with Kandy and Galle as secondary markets." },
  ],
}

// USA static data
export const usaData: LocationData = {
  name: 'USA',
  slug: 'usa',
  city: 'New York',
  description: 'Reach American consumers through premium OOH placements in major US metropolitan areas.',
  heroImage: '',
  heroTagline: 'OOH Advertising in USA',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/USAContact',
  highVisibilityBillboards: [
    {
      name: "Times Square",
      location: "Manhattan, New York",
      reach: "450,000",
      impressions: "3,600,000+",
      description: "The world's most iconic advertising location.",
      image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    },
  ],
  stats: [
    { label: 'Population', value: '335M' },
    { label: 'Urban Rate', value: '83%' },
    { label: 'OOH Spend', value: '$8.6B' },
    { label: 'Key Markets', value: '10+' },
  ],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital OOH' },
    { name: 'Transit', icon: 'transit', description: 'Subway and bus advertising' },
    { name: 'Place-Based', icon: 'mall', description: 'Retail and venue networks' },
    { name: 'Highway', icon: 'highway', description: 'Interstate billboards' },
  ],
  faqs: [
    { question: "Why advertise in the USA?", answer: "World's largest advertising market with $8.6 billion in OOH spend." },
    { question: "What are the key markets?", answer: "New York, LA, Chicago, Houston, Miami, and San Francisco lead the market." },
  ],
}

// Map of all static location data
export const staticLocationMap: Record<string, LocationData> = {
  'malaysia': malaysiaData,
  'singapore': singaporeData,
  'indonesia': indonesiaData,
  'thailand': thailandData,
  'philippines': philippinesData,
  'india': indiaData,
  'japan': japanData,
  'australia': australiaData,
  'sri-lanka': sriLankaData,
  'usa': usaData,
}

// Get static data by slug
export function getStaticLocationData(slug: string): LocationData | null {
  return staticLocationMap[slug] || null
}

// List of all static location slugs
export const STATIC_LOCATION_SLUGS = Object.keys(staticLocationMap)
