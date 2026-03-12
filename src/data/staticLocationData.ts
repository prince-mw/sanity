// Static fallback data for location pages
// This data is used when Sanity doesn't have an entry for a location

export interface LocationData {
  name: string
  slug: string
  city: string
  flag: string
  description: string
  heroImage: string
  heroTagline?: string
  billboards?: string
  highVisibilityBillboards: Array<{
    name: string
    location: string
    reach: string
    impressions: string
    description: string
    image?: string
  }>
  stats: Array<{ label: string; value: string }>
  majorCities: string[]
  mediaTypes: Array<{ name: string; icon: string; description: string }>
  keyMarkets: Array<{
    city: string
    code?: string
    population?: string
    screens?: number
    screensGrowth?: number
    dailyReach?: string
    dailyReachGrowth?: number
    monthlyImpressions?: string
    monthlyImpressionsGrowth?: number
    yoyGrowth?: number
    avgDwell?: string
    peakHours?: string
    topCategory?: string
    viewability?: number
    description?: string
    hourlyData?: number[]
    locations?: Array<{
      name: string
      desc?: string
      traffic?: number
      screens?: number
      score?: number
    }>
    audience?: Array<{
      name: string
      percentage: number
      color?: string
    }>
    mediaFormats?: Array<{
      name: string
      percentage: number
    }>
  }>
  faqs: Array<{ question: string; answer: string }>
  caseStudies: Array<{ title: string; client: string; results: string }>
  partners: string[]
}

// Malaysia static data
export const malaysiaData: LocationData = {
  name: 'Malaysia',
  slug: 'malaysia',
  city: 'Kuala Lumpur',
  flag: '🇲🇾',
  description: 'Leverage the power of OOH advertising in Malaysia to reach a wider audience through strategic outdoor placements.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Malaysia',
  billboards: '50,000+',
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
  majorCities: ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Kota Kinabalu'],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'High-impact digital displays' },
    { name: 'Transit', icon: 'transit', description: 'Bus, taxi, and rail advertising' },
    { name: 'Mall Networks', icon: 'mall', description: 'Shopping center displays' },
    { name: 'Street Furniture', icon: 'static', description: 'Bus shelters and kiosks' },
  ],
  keyMarkets: [
    {
      city: "Kuala Lumpur",
      code: "KUL",
      population: "1.9M",
      screens: 2847,
      screensGrowth: 12,
      dailyReach: "4.2M",
      dailyReachGrowth: 8.3,
      monthlyImpressions: "126M",
      monthlyImpressionsGrowth: 15.2,
      yoyGrowth: 18.5,
      avgDwell: "2.4 min",
      peakHours: "8-10 AM, 5-8 PM",
      topCategory: "Retail & F&B",
      viewability: 94.2,
      hourlyData: [15, 35, 85, 95, 70, 45, 40, 55, 75, 90, 85, 60, 45, 50, 65, 80, 95, 85, 55, 30, 20, 15, 10, 8],
      description: "The capital and economic heart of Malaysia with iconic landmarks like the Petronas Twin Towers.",
      locations: [
        { name: "Bukit Bintang", desc: "Shopping & Entertainment", traffic: 850000, screens: 342, score: 98 },
        { name: "Golden Triangle", desc: "Commercial Hub", traffic: 720000, screens: 278, score: 96 },
        { name: "KL Sentral", desc: "Transportation Hub", traffic: 620000, screens: 186, score: 95 },
        { name: "Federal Highway", desc: "Major Highway", traffic: 480000, screens: 124, score: 92 },
      ],
      audience: [
        { name: "Professionals", percentage: 35, color: "bg-blue-500" },
        { name: "Families", percentage: 28, color: "bg-emerald-500" },
        { name: "Students", percentage: 22, color: "bg-purple-500" },
        { name: "Tourists", percentage: 15, color: "bg-amber-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 45 },
        { name: "Transit Screens", percentage: 32 },
        { name: "Mall Networks", percentage: 18 },
        { name: "Street Furniture", percentage: 5 },
      ],
    },
    {
      city: "Penang",
      code: "PEN",
      population: "1.8M",
      screens: 1256,
      screensGrowth: 18,
      dailyReach: "2.1M",
      dailyReachGrowth: 12.5,
      monthlyImpressions: "63M",
      monthlyImpressionsGrowth: 19.8,
      yoyGrowth: 22.3,
      avgDwell: "3.1 min",
      peakHours: "10 AM-12 PM, 6-9 PM",
      topCategory: "Tourism & Hospitality",
      viewability: 91.8,
      hourlyData: [10, 20, 45, 65, 80, 90, 85, 75, 60, 70, 85, 95, 80, 65, 70, 80, 90, 95, 85, 60, 40, 25, 15, 10],
      description: "Known for its rich cultural heritage and booming tourism industry.",
      locations: [
        { name: "George Town", desc: "UNESCO Heritage Site", traffic: 420000, screens: 156, score: 94 },
        { name: "Gurney Drive", desc: "Seafront Promenade", traffic: 380000, screens: 98, score: 91 },
      ],
      audience: [
        { name: "Tourists", percentage: 42, color: "bg-amber-500" },
        { name: "Families", percentage: 30, color: "bg-emerald-500" },
        { name: "Professionals", percentage: 18, color: "bg-blue-500" },
        { name: "Students", percentage: 10, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 38 },
        { name: "Transit Screens", percentage: 28 },
        { name: "Mall Networks", percentage: 24 },
        { name: "Street Furniture", percentage: 10 },
      ],
    },
    {
      city: "Johor Bahru",
      code: "JHB",
      population: "1.7M",
      screens: 1124,
      screensGrowth: 24,
      dailyReach: "1.8M",
      dailyReachGrowth: 15.7,
      monthlyImpressions: "54M",
      monthlyImpressionsGrowth: 22.4,
      yoyGrowth: 28.7,
      avgDwell: "1.8 min",
      peakHours: "7-9 AM, 4-7 PM",
      topCategory: "Cross-border Retail",
      viewability: 89.5,
      hourlyData: [8, 25, 70, 95, 80, 55, 45, 50, 60, 65, 70, 75, 70, 60, 65, 80, 95, 90, 70, 45, 30, 20, 12, 8],
      description: "The southern gateway to Malaysia, rapidly growing city with cross-border traffic.",
      locations: [
        { name: "CIQ Complex", desc: "Singapore Gateway", traffic: 520000, screens: 86, score: 97 },
        { name: "Legoland Malaysia", desc: "Family Attraction", traffic: 180000, screens: 42, score: 88 },
      ],
      audience: [
        { name: "Cross-border Commuters", percentage: 38, color: "bg-blue-500" },
        { name: "Families", percentage: 32, color: "bg-emerald-500" },
        { name: "Professionals", percentage: 20, color: "bg-purple-500" },
        { name: "Tourists", percentage: 10, color: "bg-amber-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 52 },
        { name: "Transit Screens", percentage: 25 },
        { name: "Mall Networks", percentage: 15 },
        { name: "Street Furniture", percentage: 8 },
      ],
    },
    {
      city: "Kota Kinabalu",
      code: "BKI",
      population: "500K",
      screens: 423,
      screensGrowth: 32,
      dailyReach: "620K",
      dailyReachGrowth: 24.3,
      monthlyImpressions: "18.6M",
      monthlyImpressionsGrowth: 28.6,
      yoyGrowth: 34.2,
      avgDwell: "2.8 min",
      peakHours: "9-11 AM, 5-8 PM",
      topCategory: "Tourism & Adventure",
      viewability: 87.3,
      hourlyData: [5, 15, 35, 55, 75, 85, 90, 85, 70, 65, 70, 80, 85, 75, 70, 75, 85, 90, 80, 55, 35, 20, 10, 5],
      description: "The capital of Sabah, known for its natural attractions and adventure tourism.",
      locations: [
        { name: "Jesselton Point", desc: "Ferry Terminal", traffic: 85000, screens: 28, score: 86 },
        { name: "Imago Shopping Mall", desc: "Premier Shopping", traffic: 120000, screens: 64, score: 89 },
      ],
      audience: [
        { name: "Tourists", percentage: 48, color: "bg-amber-500" },
        { name: "Families", percentage: 28, color: "bg-emerald-500" },
        { name: "Professionals", percentage: 16, color: "bg-blue-500" },
        { name: "Students", percentage: 8, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 35 },
        { name: "Transit Screens", percentage: 20 },
        { name: "Mall Networks", percentage: 35 },
        { name: "Street Furniture", percentage: 10 },
      ],
    },
  ],
  faqs: [
    { question: "What is DOOH advertising?", answer: "DOOH (Digital Out-of-Home) uses digital screens in public spaces to deliver dynamic, engaging ads that can be updated in real time." },
    { question: "Why invest in OOH advertising in Malaysia?", answer: "Malaysia's cities, diverse population, and growing economy make it ideal for impactful campaigns that reach commuters, shoppers, and travelers." },
    { question: "What types of OOH advertising are available?", answer: "Billboards, transit ads (buses, taxis, trains), street furniture, malls, airports, and digital billboards in high-traffic areas." },
    { question: "How can I measure campaign effectiveness?", answer: "Track impressions, engagement rates, conversions, and real-time insights via programmatic DOOH analytics." },
    { question: "What are the benefits of DOOH advertising?", answer: "High visibility, dynamic content, precise audience targeting, and actionable performance data." },
    { question: "How does MovingWalls help advertisers in Malaysia?", answer: "Our Moving Audiences platform enables precise targeting, real-time analytics, and seamless campaign execution across DOOH networks." },
  ],
  caseStudies: [],
  partners: [],
}

// Singapore static data
export const singaporeData: LocationData = {
  name: 'Singapore',
  slug: 'singapore',
  city: 'Singapore',
  flag: '🇸🇬',
  description: 'Connect with Singapore\'s tech-savvy population through premium OOH placements across the city-state.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Singapore',
  billboards: '25,000+',
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
  majorCities: ['Singapore'],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital displays' },
    { name: 'MRT Advertising', icon: 'transit', description: 'Mass Rapid Transit network' },
    { name: 'Mall Networks', icon: 'mall', description: 'Shopping center displays' },
    { name: 'Bus Shelters', icon: 'static', description: 'Street-level advertising' },
  ],
  keyMarkets: [
    {
      city: "Central Singapore",
      code: "SGP",
      population: "5.9M",
      screens: 3500,
      screensGrowth: 15,
      dailyReach: "4.5M",
      dailyReachGrowth: 10.2,
      monthlyImpressions: "135M",
      monthlyImpressionsGrowth: 18.5,
      yoyGrowth: 22.0,
      avgDwell: "2.8 min",
      peakHours: "8-10 AM, 6-9 PM",
      topCategory: "Retail & Finance",
      viewability: 96.5,
      hourlyData: [12, 30, 80, 95, 75, 50, 45, 55, 70, 85, 90, 65, 50, 55, 70, 85, 95, 90, 60, 35, 25, 18, 12, 10],
      description: "Asia's premier financial hub with world-class infrastructure.",
      locations: [
        { name: "Orchard Road", desc: "Shopping Belt", traffic: 920000, screens: 450, score: 99 },
        { name: "Marina Bay", desc: "Financial District", traffic: 680000, screens: 320, score: 97 },
        { name: "Raffles Place", desc: "CBD", traffic: 580000, screens: 280, score: 96 },
      ],
      audience: [
        { name: "Professionals", percentage: 40, color: "bg-blue-500" },
        { name: "Tourists", percentage: 25, color: "bg-amber-500" },
        { name: "Families", percentage: 20, color: "bg-emerald-500" },
        { name: "Students", percentage: 15, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 50 },
        { name: "Transit Screens", percentage: 30 },
        { name: "Mall Networks", percentage: 15 },
        { name: "Street Furniture", percentage: 5 },
      ],
    },
  ],
  faqs: [
    { question: "What makes Singapore unique for OOH?", answer: "Singapore's compact size, high urbanization, and tech-savvy population make it perfect for targeted OOH campaigns." },
    { question: "What are the main OOH formats?", answer: "Digital billboards, MRT advertising, bus wraps, mall screens, and Changi Airport displays." },
    { question: "How effective is OOH in Singapore?", answer: "With 100% urban coverage and high public transport usage, OOH reaches nearly the entire population." },
  ],
  caseStudies: [],
  partners: [],
}

// Indonesia static data
export const indonesiaData: LocationData = {
  name: 'Indonesia',
  slug: 'indonesia',
  city: 'Jakarta',
  flag: '🇮🇩',
  description: 'Reach Southeast Asia\'s largest market with OOH advertising across Indonesia\'s major cities.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Indonesia',
  billboards: '100,000+',
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
  majorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Bali'],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Large format displays' },
    { name: 'Transit', icon: 'transit', description: 'TransJakarta and MRT' },
    { name: 'Mall Networks', icon: 'mall', description: 'Shopping center advertising' },
    { name: 'Highway', icon: 'highway', description: 'Toll road billboards' },
  ],
  keyMarkets: [
    {
      city: "Jakarta",
      code: "JKT",
      population: "10.5M",
      screens: 5200,
      screensGrowth: 20,
      dailyReach: "8.5M",
      dailyReachGrowth: 15.3,
      monthlyImpressions: "255M",
      monthlyImpressionsGrowth: 22.8,
      yoyGrowth: 28.5,
      avgDwell: "3.2 min",
      peakHours: "7-10 AM, 5-9 PM",
      topCategory: "Retail & FMCG",
      viewability: 88.5,
      hourlyData: [10, 25, 75, 95, 85, 55, 45, 50, 65, 80, 85, 70, 55, 60, 75, 90, 95, 85, 65, 40, 28, 18, 12, 8],
      description: "Indonesia's capital and largest city, hub of business and commerce.",
      locations: [
        { name: "Sudirman", desc: "Business District", traffic: 1200000, screens: 580, score: 95 },
        { name: "Thamrin", desc: "Commercial Corridor", traffic: 980000, screens: 420, score: 93 },
      ],
      audience: [
        { name: "Professionals", percentage: 32, color: "bg-blue-500" },
        { name: "Commuters", percentage: 35, color: "bg-emerald-500" },
        { name: "Families", percentage: 20, color: "bg-purple-500" },
        { name: "Students", percentage: 13, color: "bg-amber-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 42 },
        { name: "Transit Screens", percentage: 28 },
        { name: "Mall Networks", percentage: 20 },
        { name: "Street Furniture", percentage: 10 },
      ],
    },
  ],
  faqs: [
    { question: "Why advertise in Indonesia?", answer: "Indonesia is Southeast Asia's largest economy with over 275 million people and growing middle class." },
    { question: "What cities should I target?", answer: "Jakarta, Surabaya, Bandung, Medan, and Bali are key markets with strong OOH infrastructure." },
  ],
  caseStudies: [],
  partners: [],
}

// Thailand static data
export const thailandData: LocationData = {
  name: 'Thailand',
  slug: 'thailand',
  city: 'Bangkok',
  flag: '🇹🇭',
  description: 'Engage Thai consumers through strategic OOH placements in Bangkok and major tourist destinations.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Thailand',
  billboards: '45,000+',
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
  majorCities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya'],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital displays' },
    { name: 'BTS/MRT', icon: 'transit', description: 'Rail transit advertising' },
    { name: 'Mall Networks', icon: 'mall', description: 'Shopping center displays' },
    { name: 'Airport', icon: 'airport', description: 'Suvarnabhumi & Don Mueang' },
  ],
  keyMarkets: [
    {
      city: "Bangkok",
      code: "BKK",
      population: "10.7M",
      screens: 4100,
      screensGrowth: 18,
      dailyReach: "7.2M",
      dailyReachGrowth: 12.8,
      monthlyImpressions: "216M",
      monthlyImpressionsGrowth: 20.5,
      yoyGrowth: 24.3,
      avgDwell: "2.9 min",
      peakHours: "8-10 AM, 5-8 PM",
      topCategory: "Retail & Tourism",
      viewability: 91.2,
      hourlyData: [12, 28, 78, 95, 80, 52, 42, 52, 68, 82, 88, 68, 52, 58, 72, 88, 95, 88, 62, 38, 25, 18, 12, 10],
      description: "Thailand's capital and primary economic hub with world-class infrastructure.",
      locations: [
        { name: "Siam Square", desc: "Shopping Hub", traffic: 950000, screens: 480, score: 97 },
        { name: "Sukhumvit", desc: "Business & Entertainment", traffic: 820000, screens: 380, score: 95 },
      ],
      audience: [
        { name: "Urban Consumers", percentage: 35, color: "bg-blue-500" },
        { name: "Tourists", percentage: 30, color: "bg-amber-500" },
        { name: "Professionals", percentage: 22, color: "bg-emerald-500" },
        { name: "Students", percentage: 13, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 45 },
        { name: "Transit Screens", percentage: 32 },
        { name: "Mall Networks", percentage: 18 },
        { name: "Street Furniture", percentage: 5 },
      ],
    },
  ],
  faqs: [
    { question: "Why advertise in Thailand?", answer: "Thailand combines a large domestic market with over 40 million annual tourists." },
    { question: "What makes Bangkok special for OOH?", answer: "Dense urban environment, extensive BTS/MRT network, and world-class shopping malls." },
  ],
  caseStudies: [],
  partners: [],
}

// Philippines static data
export const philippinesData: LocationData = {
  name: 'Philippines',
  slug: 'philippines',
  city: 'Manila',
  flag: '🇵🇭',
  description: 'Connect with the Philippines\' young, mobile-first population through impactful OOH advertising.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Philippines',
  billboards: '35,000+',
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
  majorCities: ['Manila', 'Cebu', 'Davao'],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'LED displays' },
    { name: 'Transit', icon: 'transit', description: 'MRT and bus advertising' },
    { name: 'Mall Networks', icon: 'mall', description: 'SM and Ayala malls' },
    { name: 'Highway', icon: 'highway', description: 'EDSA and expressways' },
  ],
  keyMarkets: [
    {
      city: "Metro Manila",
      code: "MNL",
      population: "14M",
      screens: 3800,
      screensGrowth: 22,
      dailyReach: "9.5M",
      dailyReachGrowth: 18.5,
      monthlyImpressions: "285M",
      monthlyImpressionsGrowth: 25.2,
      yoyGrowth: 30.5,
      avgDwell: "3.5 min",
      peakHours: "7-10 AM, 5-9 PM",
      topCategory: "Retail & Telco",
      viewability: 86.8,
      hourlyData: [8, 22, 72, 95, 88, 58, 48, 55, 68, 78, 82, 72, 58, 62, 75, 88, 95, 88, 68, 42, 28, 18, 12, 8],
      description: "The Philippines' capital region and economic center.",
      locations: [
        { name: "EDSA", desc: "Main Highway", traffic: 1500000, screens: 620, score: 94 },
        { name: "Makati CBD", desc: "Business District", traffic: 680000, screens: 320, score: 96 },
      ],
      audience: [
        { name: "Commuters", percentage: 38, color: "bg-blue-500" },
        { name: "Young Adults", percentage: 32, color: "bg-emerald-500" },
        { name: "Professionals", percentage: 18, color: "bg-purple-500" },
        { name: "Families", percentage: 12, color: "bg-amber-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 48 },
        { name: "Transit Screens", percentage: 25 },
        { name: "Mall Networks", percentage: 22 },
        { name: "Street Furniture", percentage: 5 },
      ],
    },
  ],
  faqs: [
    { question: "Why advertise in the Philippines?", answer: "Young population with median age of 25.7 and high mobile penetration." },
    { question: "What are the main OOH markets?", answer: "Metro Manila, Cebu, and Davao are the key urban markets." },
  ],
  caseStudies: [],
  partners: [],
}

// India static data
export const indiaData: LocationData = {
  name: 'India',
  slug: 'india',
  city: 'Mumbai',
  flag: '🇮🇳',
  description: 'Reach India\'s 1.4 billion consumers through strategic OOH placements across major metros.',
  heroImage: '',
  heroTagline: 'OOH Advertising in India',
  billboards: '200,000+',
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
  majorCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital OOH' },
    { name: 'Transit', icon: 'transit', description: 'Metro and bus advertising' },
    { name: 'Mall Networks', icon: 'mall', description: 'Shopping center displays' },
    { name: 'Airport', icon: 'airport', description: 'Major airport advertising' },
  ],
  keyMarkets: [
    {
      city: "Mumbai",
      code: "BOM",
      population: "21M",
      screens: 8500,
      screensGrowth: 25,
      dailyReach: "15M",
      dailyReachGrowth: 20.5,
      monthlyImpressions: "450M",
      monthlyImpressionsGrowth: 28.2,
      yoyGrowth: 32.5,
      avgDwell: "2.8 min",
      peakHours: "8-11 AM, 6-10 PM",
      topCategory: "Retail & Finance",
      viewability: 85.5,
      hourlyData: [8, 20, 68, 92, 85, 55, 45, 52, 65, 78, 82, 70, 55, 60, 72, 85, 92, 85, 65, 42, 28, 18, 12, 8],
      description: "India's financial capital and most populous city.",
      locations: [
        { name: "BKC", desc: "Business Hub", traffic: 1800000, screens: 850, score: 95 },
        { name: "Western Express", desc: "Major Highway", traffic: 2200000, screens: 680, score: 93 },
      ],
      audience: [
        { name: "Professionals", percentage: 35, color: "bg-blue-500" },
        { name: "Commuters", percentage: 32, color: "bg-emerald-500" },
        { name: "Families", percentage: 20, color: "bg-purple-500" },
        { name: "Students", percentage: 13, color: "bg-amber-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 40 },
        { name: "Transit Screens", percentage: 30 },
        { name: "Mall Networks", percentage: 20 },
        { name: "Street Furniture", percentage: 10 },
      ],
    },
  ],
  faqs: [
    { question: "Why advertise in India?", answer: "World's most populous country with rapidly growing middle class and digital infrastructure." },
    { question: "Which cities should I target?", answer: "Mumbai, Delhi-NCR, Bangalore, Chennai, Hyderabad, and Kolkata are key markets." },
  ],
  caseStudies: [],
  partners: [],
}

// Japan static data
export const japanData: LocationData = {
  name: 'Japan',
  slug: 'japan',
  city: 'Tokyo',
  flag: '🇯🇵',
  description: 'Connect with Japanese consumers through premium OOH placements in world-class urban environments.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Japan',
  billboards: '60,000+',
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
  majorCities: ['Tokyo', 'Osaka', 'Nagoya', 'Fukuoka'],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital displays' },
    { name: 'Train Advertising', icon: 'transit', description: 'JR and Metro systems' },
    { name: 'Station Media', icon: 'mall', description: 'Station complex advertising' },
    { name: 'Street Vision', icon: 'static', description: 'Iconic street displays' },
  ],
  keyMarkets: [
    {
      city: "Tokyo",
      code: "TYO",
      population: "14M",
      screens: 12000,
      screensGrowth: 10,
      dailyReach: "25M",
      dailyReachGrowth: 8.5,
      monthlyImpressions: "750M",
      monthlyImpressionsGrowth: 12.2,
      yoyGrowth: 15.5,
      avgDwell: "2.2 min",
      peakHours: "8-10 AM, 6-9 PM",
      topCategory: "Retail & Entertainment",
      viewability: 97.5,
      hourlyData: [15, 32, 82, 95, 78, 55, 48, 55, 72, 88, 92, 75, 58, 62, 75, 88, 95, 90, 68, 42, 28, 20, 15, 12],
      description: "World's largest metropolitan area with unmatched urban density.",
      locations: [
        { name: "Shibuya", desc: "Youth Culture Hub", traffic: 3000000, screens: 1200, score: 99 },
        { name: "Shinjuku", desc: "Transport Hub", traffic: 3500000, screens: 1500, score: 98 },
      ],
      audience: [
        { name: "Commuters", percentage: 40, color: "bg-blue-500" },
        { name: "Youth", percentage: 28, color: "bg-emerald-500" },
        { name: "Professionals", percentage: 22, color: "bg-purple-500" },
        { name: "Tourists", percentage: 10, color: "bg-amber-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 55 },
        { name: "Transit Screens", percentage: 28 },
        { name: "Station Media", percentage: 12 },
        { name: "Street Furniture", percentage: 5 },
      ],
    },
  ],
  faqs: [
    { question: "What makes Japan unique for OOH?", answer: "World-class transit systems, high urbanization, and premium consumer market." },
    { question: "What are the main advertising formats?", answer: "Train advertising, station media, digital billboards, and iconic locations like Shibuya." },
  ],
  caseStudies: [],
  partners: [],
}

// Australia static data  
export const australiaData: LocationData = {
  name: 'Australia',
  slug: 'australia',
  city: 'Sydney',
  flag: '🇦🇺',
  description: 'Reach Australian consumers through premium OOH placements in major metropolitan areas.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Australia',
  billboards: '30,000+',
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
  majorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital displays' },
    { name: 'Transit', icon: 'transit', description: 'Rail and bus advertising' },
    { name: 'Retail', icon: 'mall', description: 'Shopping center networks' },
    { name: 'Airport', icon: 'airport', description: 'International airports' },
  ],
  keyMarkets: [
    {
      city: "Sydney",
      code: "SYD",
      population: "5.4M",
      screens: 4500,
      screensGrowth: 12,
      dailyReach: "3.8M",
      dailyReachGrowth: 10.2,
      monthlyImpressions: "114M",
      monthlyImpressionsGrowth: 15.5,
      yoyGrowth: 18.2,
      avgDwell: "2.5 min",
      peakHours: "7-9 AM, 5-7 PM",
      topCategory: "Retail & Finance",
      viewability: 94.8,
      hourlyData: [10, 28, 78, 95, 75, 52, 45, 52, 68, 82, 88, 68, 52, 55, 68, 82, 95, 88, 62, 38, 25, 18, 12, 10],
      description: "Australia's largest city and financial hub.",
      locations: [
        { name: "CBD", desc: "Business District", traffic: 850000, screens: 520, score: 96 },
        { name: "Circular Quay", desc: "Tourist Hub", traffic: 620000, screens: 280, score: 94 },
      ],
      audience: [
        { name: "Professionals", percentage: 38, color: "bg-blue-500" },
        { name: "Tourists", percentage: 25, color: "bg-amber-500" },
        { name: "Commuters", percentage: 25, color: "bg-emerald-500" },
        { name: "Students", percentage: 12, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 45 },
        { name: "Transit Screens", percentage: 30 },
        { name: "Retail Networks", percentage: 18 },
        { name: "Street Furniture", percentage: 7 },
      ],
    },
  ],
  faqs: [
    { question: "Why advertise in Australia?", answer: "High-income market with 86% urban population concentrated in major cities." },
    { question: "What are the main OOH markets?", answer: "Sydney, Melbourne, Brisbane, Perth, and Adelaide are the key markets." },
  ],
  caseStudies: [],
  partners: [],
}

// Sri Lanka static data
export const sriLankaData: LocationData = {
  name: 'Sri Lanka',
  slug: 'sri-lanka',
  city: 'Colombo',
  flag: '🇱🇰',
  description: 'Connect with Sri Lankan consumers through strategic OOH placements in Colombo and beyond.',
  heroImage: '',
  heroTagline: 'OOH Advertising in Sri Lanka',
  billboards: '8,000+',
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
  majorCities: ['Colombo', 'Kandy', 'Galle'],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'LED displays' },
    { name: 'Transit', icon: 'transit', description: 'Bus and rail advertising' },
    { name: 'Retail', icon: 'mall', description: 'Mall advertising' },
    { name: 'Highway', icon: 'highway', description: 'Expressway billboards' },
  ],
  keyMarkets: [
    {
      city: "Colombo",
      code: "CMB",
      population: "752K",
      screens: 850,
      screensGrowth: 28,
      dailyReach: "1.2M",
      dailyReachGrowth: 22.5,
      monthlyImpressions: "36M",
      monthlyImpressionsGrowth: 30.2,
      yoyGrowth: 35.5,
      avgDwell: "2.8 min",
      peakHours: "8-10 AM, 5-8 PM",
      topCategory: "Retail & FMCG",
      viewability: 82.5,
      hourlyData: [8, 22, 68, 92, 80, 52, 42, 50, 62, 75, 80, 65, 52, 55, 68, 82, 92, 85, 62, 38, 25, 15, 10, 8],
      description: "Sri Lanka's commercial capital and largest city.",
      locations: [
        { name: "Colombo Fort", desc: "Business District", traffic: 320000, screens: 180, score: 88 },
        { name: "Galle Road", desc: "Main Corridor", traffic: 280000, screens: 150, score: 85 },
      ],
      audience: [
        { name: "Commuters", percentage: 35, color: "bg-blue-500" },
        { name: "Professionals", percentage: 28, color: "bg-emerald-500" },
        { name: "Tourists", percentage: 22, color: "bg-amber-500" },
        { name: "Students", percentage: 15, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 35 },
        { name: "Static Billboards", percentage: 30 },
        { name: "Transit Screens", percentage: 25 },
        { name: "Mall Networks", percentage: 10 },
      ],
    },
  ],
  faqs: [
    { question: "Why advertise in Sri Lanka?", answer: "Growing economy with increasing urbanization and tourism." },
    { question: "What are the main markets?", answer: "Colombo is the primary market, with Kandy and Galle as secondary markets." },
  ],
  caseStudies: [],
  partners: [],
}

// USA static data
export const usaData: LocationData = {
  name: 'USA',
  slug: 'usa',
  city: 'New York',
  flag: '🇺🇸',
  description: 'Reach American consumers through premium OOH placements in major US metropolitan areas.',
  heroImage: '',
  heroTagline: 'OOH Advertising in USA',
  billboards: '400,000+',
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
  majorCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco'],
  mediaTypes: [
    { name: 'Digital Billboards', icon: 'digital', description: 'Premium digital OOH' },
    { name: 'Transit', icon: 'transit', description: 'Subway and bus advertising' },
    { name: 'Place-Based', icon: 'mall', description: 'Retail and venue networks' },
    { name: 'Highway', icon: 'highway', description: 'Interstate billboards' },
  ],
  keyMarkets: [
    {
      city: "New York",
      code: "NYC",
      population: "8.3M",
      screens: 15000,
      screensGrowth: 8,
      dailyReach: "12M",
      dailyReachGrowth: 6.5,
      monthlyImpressions: "360M",
      monthlyImpressionsGrowth: 10.2,
      yoyGrowth: 12.5,
      avgDwell: "2.0 min",
      peakHours: "8-10 AM, 5-8 PM",
      topCategory: "Finance & Retail",
      viewability: 95.2,
      hourlyData: [12, 28, 78, 95, 80, 55, 48, 55, 70, 85, 90, 72, 55, 58, 72, 85, 95, 88, 65, 40, 28, 20, 15, 12],
      description: "America's largest city and financial capital.",
      locations: [
        { name: "Times Square", desc: "Entertainment Hub", traffic: 450000, screens: 2500, score: 99 },
        { name: "Manhattan", desc: "Business District", traffic: 1200000, screens: 3500, score: 97 },
      ],
      audience: [
        { name: "Professionals", percentage: 35, color: "bg-blue-500" },
        { name: "Tourists", percentage: 28, color: "bg-amber-500" },
        { name: "Commuters", percentage: 25, color: "bg-emerald-500" },
        { name: "Students", percentage: 12, color: "bg-purple-500" },
      ],
      mediaFormats: [
        { name: "Digital Billboards", percentage: 50 },
        { name: "Transit Screens", percentage: 28 },
        { name: "Place-Based", percentage: 15 },
        { name: "Static Billboards", percentage: 7 },
      ],
    },
  ],
  faqs: [
    { question: "Why advertise in the USA?", answer: "World's largest advertising market with $8.6 billion in OOH spend." },
    { question: "What are the key markets?", answer: "New York, LA, Chicago, Houston, Miami, and San Francisco lead the market." },
  ],
  caseStudies: [],
  partners: [],
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
