/**
 * Seed Location Data to Sanity
 * 
 * This script migrates all static country landing page data to Sanity CMS.
 * Run with: node scripts/seed-locations-to-sanity.js
 * 
 * Prerequisites:
 * - SANITY_PROJECT_ID and SANITY_DATASET environment variables
 * - SANITY_API_TOKEN with write permissions
 */

const { createClient } = require('@sanity/client')
const crypto = require('crypto')

// Sanity client configuration
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Helper function to generate unique keys for array items
function generateKey() {
  return crypto.randomBytes(6).toString('hex')
}

// Add _key to all array items recursively
function addKeysToArrayItems(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (typeof item === 'object' && item !== null) {
        // Add _key if it's an object and doesn't have one
        const withKey = { _key: generateKey(), ...addKeysToArrayItems(item) }
        return withKey
      }
      return item // Primitives (strings, numbers) don't need keys
    })
  } else if (typeof obj === 'object' && obj !== null) {
    const result = {}
    for (const key of Object.keys(obj)) {
      result[key] = addKeysToArrayItems(obj[key])
    }
    return result
  }
  return obj
}

// ============================================================================
// MALAYSIA DATA
// ============================================================================
const malaysiaData = {
  _type: 'location',
  country: 'Malaysia',
  slug: { _type: 'slug', current: 'malaysia' },
  city: 'Kuala Lumpur',
  flag: '🇲🇾',
  description: 'Leverage the power of OOH advertising in Malaysia to reach a wider audience through strategic outdoor placements.',
  fullDescription: "Malaysia's dynamic market offers a rich tapestry of advertising opportunities. The country's population of over 33.4 million people is predominantly urban, with major cities experiencing rapid growth.",
  billboards: '5,000+',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/MalaysiaContact',
  stats: [
    { label: 'Population', value: '33.4M+' },
    { label: 'Urbanization Rate', value: '76%' },
    { label: 'KL Residents', value: '1.9M' },
    { label: 'Key Markets', value: '4+' },
  ],
  whyInvest: [
    'Strong consumer spending power driven by growing middle class',
    'Diverse population with mix of ethnicities and cultures',
    'High urban concentration ideal for OOH campaigns',
    'Increasing disposable incomes',
    'Well-developed transportation network (LRT, MRT, Monorail)',
  ],
  highVisibilityBillboards: [
    {
      name: 'KL City Center',
      location: 'JLN IMBI, Berjaya Time Square, Park Royal Hotel',
      reach: '132,145',
      impressions: '1,075,680',
      description: 'A premier outdoor advertising billboard located in the bustling district of Kuala Lumpur.',
    },
    {
      name: 'Golden Triangle',
      location: 'Bukit Bintang Golden Triangle KL',
      reach: '142,820',
      impressions: '1,000,000+',
      description: 'A prime spot for outdoor advertising with high-traffic ensuring substantial reach.',
    },
    {
      name: '1 Utama',
      location: 'LDP Highway - From Kepong, Petaling, Selangor',
      reach: '193,818',
      impressions: '1,034,280',
      description: 'A prime outdoor advertising billboard in the heart of Petaling, Selangor.',
    },
  ],
  majorCities: ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Kota Kinabalu', 'Kuching', 'Ipoh', 'Malacca'],
  keyMarkets: [
    {
      city: 'Kuala Lumpur',
      code: 'KUL',
      population: '1.9M',
      screens: 2847,
      screensGrowth: 12,
      dailyReach: '4.2M',
      dailyReachGrowth: 8.3,
      monthlyImpressions: '126M',
      monthlyImpressionsGrowth: 15.2,
      yoyGrowth: 18.5,
      avgDwell: '2.4 min',
      peakHours: '8-10 AM, 5-8 PM',
      topCategory: 'Retail & F&B',
      viewability: 94.2,
      hourlyData: [15, 35, 85, 95, 70, 45, 40, 55, 75, 90, 85, 60, 45, 50, 65, 80, 95, 85, 55, 30, 20, 15, 10, 8],
      description: 'The capital and economic heart of Malaysia with iconic landmarks like the Petronas Twin Towers.',
      locations: [
        { name: 'Bukit Bintang', desc: 'Shopping & Entertainment', traffic: 850000, screens: 342, score: 98 },
        { name: 'Golden Triangle', desc: 'Commercial Hub', traffic: 720000, screens: 278, score: 96 },
        { name: 'KL Sentral', desc: 'Transportation Hub', traffic: 620000, screens: 186, score: 95 },
        { name: 'Federal Highway', desc: 'Major Highway', traffic: 480000, screens: 124, score: 92 },
      ],
      audience: [
        { name: 'Professionals', percentage: 35, color: 'bg-blue-500' },
        { name: 'Families', percentage: 28, color: 'bg-emerald-500' },
        { name: 'Students', percentage: 22, color: 'bg-purple-500' },
        { name: 'Tourists', percentage: 15, color: 'bg-amber-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 45 },
        { name: 'Transit Screens', percentage: 32 },
        { name: 'Mall Networks', percentage: 18 },
        { name: 'Street Furniture', percentage: 5 },
      ],
    },
    {
      city: 'Penang',
      code: 'PEN',
      population: '1.8M',
      screens: 1256,
      screensGrowth: 18,
      dailyReach: '2.1M',
      dailyReachGrowth: 12.5,
      monthlyImpressions: '63M',
      monthlyImpressionsGrowth: 19.8,
      yoyGrowth: 22.3,
      avgDwell: '3.1 min',
      peakHours: '10 AM-12 PM, 6-9 PM',
      topCategory: 'Tourism & Hospitality',
      viewability: 91.8,
      hourlyData: [10, 20, 45, 65, 80, 90, 85, 75, 60, 70, 85, 95, 80, 65, 70, 80, 90, 95, 85, 60, 40, 25, 15, 10],
      description: 'Known for its rich cultural heritage and booming tourism industry.',
      locations: [
        { name: 'George Town', desc: 'UNESCO Heritage Site', traffic: 420000, screens: 156, score: 94 },
        { name: 'Gurney Drive', desc: 'Seafront Promenade', traffic: 380000, screens: 98, score: 91 },
      ],
      audience: [
        { name: 'Tourists', percentage: 42, color: 'bg-amber-500' },
        { name: 'Families', percentage: 30, color: 'bg-emerald-500' },
        { name: 'Professionals', percentage: 18, color: 'bg-blue-500' },
        { name: 'Students', percentage: 10, color: 'bg-purple-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 38 },
        { name: 'Transit Screens', percentage: 28 },
        { name: 'Mall Networks', percentage: 24 },
        { name: 'Street Furniture', percentage: 10 },
      ],
    },
    {
      city: 'Johor Bahru',
      code: 'JHB',
      population: '1.7M',
      screens: 1124,
      screensGrowth: 24,
      dailyReach: '1.8M',
      dailyReachGrowth: 15.7,
      monthlyImpressions: '54M',
      monthlyImpressionsGrowth: 22.4,
      yoyGrowth: 28.7,
      avgDwell: '1.8 min',
      peakHours: '7-9 AM, 4-7 PM',
      topCategory: 'Cross-border Retail',
      viewability: 89.5,
      hourlyData: [8, 25, 70, 95, 80, 55, 45, 50, 60, 65, 70, 75, 70, 60, 65, 80, 95, 90, 70, 45, 30, 20, 12, 8],
      description: 'The southern gateway to Malaysia, rapidly growing city with cross-border traffic.',
      locations: [
        { name: 'CIQ Complex', desc: 'Singapore Gateway', traffic: 520000, screens: 86, score: 97 },
        { name: 'Legoland Malaysia', desc: 'Family Attraction', traffic: 180000, screens: 42, score: 88 },
      ],
      audience: [
        { name: 'Cross-border Commuters', percentage: 38, color: 'bg-blue-500' },
        { name: 'Families', percentage: 32, color: 'bg-emerald-500' },
        { name: 'Professionals', percentage: 20, color: 'bg-purple-500' },
        { name: 'Tourists', percentage: 10, color: 'bg-amber-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 52 },
        { name: 'Transit Screens', percentage: 25 },
        { name: 'Mall Networks', percentage: 15 },
        { name: 'Street Furniture', percentage: 8 },
      ],
    },
    {
      city: 'Kota Kinabalu',
      code: 'BKI',
      population: '500K',
      screens: 423,
      screensGrowth: 32,
      dailyReach: '620K',
      dailyReachGrowth: 24.3,
      monthlyImpressions: '18.6M',
      monthlyImpressionsGrowth: 28.6,
      yoyGrowth: 34.2,
      avgDwell: '2.8 min',
      peakHours: '9-11 AM, 5-8 PM',
      topCategory: 'Tourism & Adventure',
      viewability: 87.3,
      hourlyData: [5, 15, 35, 55, 75, 85, 90, 85, 70, 65, 70, 80, 85, 75, 70, 75, 85, 90, 80, 55, 35, 20, 10, 5],
      description: 'The capital of Sabah, known for its natural attractions and adventure tourism.',
      locations: [
        { name: 'Jesselton Point', desc: 'Ferry Terminal', traffic: 85000, screens: 28, score: 86 },
        { name: 'Imago Shopping Mall', desc: 'Premier Shopping', traffic: 120000, screens: 64, score: 89 },
      ],
      audience: [
        { name: 'Tourists', percentage: 48, color: 'bg-amber-500' },
        { name: 'Families', percentage: 28, color: 'bg-emerald-500' },
        { name: 'Professionals', percentage: 16, color: 'bg-blue-500' },
        { name: 'Students', percentage: 8, color: 'bg-purple-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 35 },
        { name: 'Transit Screens', percentage: 20 },
        { name: 'Mall Networks', percentage: 35 },
        { name: 'Street Furniture', percentage: 10 },
      ],
    },
  ],
  faqs: [
    {
      question: 'What is DOOH advertising?',
      answer: 'DOOH (Digital Out-of-Home) uses digital screens in public spaces to deliver dynamic, engaging ads that can be updated in real time.',
    },
    {
      question: 'Why invest in OOH advertising in Malaysia?',
      answer: "Malaysia's cities, diverse population, and growing economy make it ideal for impactful campaigns that reach commuters, shoppers, and travelers.",
    },
    {
      question: 'What types of OOH advertising are available?',
      answer: 'Billboards, transit ads (buses, taxis, trains), street furniture, malls, airports, and digital billboards in high-traffic areas.',
    },
    {
      question: 'How can I measure campaign effectiveness?',
      answer: 'Track impressions, engagement rates, conversions, and real-time insights via programmatic DOOH analytics.',
    },
    {
      question: 'What are the benefits of DOOH advertising?',
      answer: 'High visibility, dynamic content, precise audience targeting, and actionable performance data.',
    },
    {
      question: 'How does Moving Walls help advertisers in Malaysia?',
      answer: 'Our Moving Audiences platform enables precise targeting, real-time analytics, and seamless campaign execution across DOOH networks.',
    },
  ],
  caseStudies: [
    { title: 'National FMCG Campaign', client: 'Leading FMCG Brand', results: '+45% brand awareness' },
    { title: 'Tourism Promotion', client: 'Tourism Malaysia', results: '+32% visitor inquiries' },
    { title: 'Retail Launch', client: 'Major Retail Chain', results: '+28% foot traffic' },
  ],
  partners: ['Astro', 'Big Tree', 'Seni Jaya', 'Kurnia Outdoor', 'Laguna Media'],
  order: 1,
  isActive: true,
}

// ============================================================================
// SINGAPORE DATA
// ============================================================================
const singaporeData = {
  _type: 'location',
  country: 'Singapore',
  slug: { _type: 'slug', current: 'singapore' },
  city: 'Singapore',
  flag: '🇸🇬',
  description: 'Reach affluent consumers in one of Asia\'s most connected and dynamic advertising markets.',
  fullDescription: 'Singapore is a global business hub with one of the highest GDP per capita in the world. The city-state offers advertisers access to a highly educated, tech-savvy population with significant purchasing power.',
  billboards: '3,500+',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/SingaporeContact',
  stats: [
    { label: 'Population', value: '5.9M' },
    { label: 'GDP Per Capita', value: '$65K+' },
    { label: 'Urban Population', value: '100%' },
    { label: 'MRT Stations', value: '180+' },
  ],
  whyInvest: [
    'Highest GDP per capita in Southeast Asia',
    '100% urbanized population with high purchasing power',
    'World-class public transportation infrastructure',
    'Global business and tourism hub',
    'Highly educated and tech-savvy consumers',
  ],
  highVisibilityBillboards: [
    {
      name: 'Orchard Road',
      location: 'ION Orchard to Takashimaya stretch',
      reach: '285,000',
      impressions: '2,140,000',
      description: 'Premium advertising space along Singapore\'s most famous shopping boulevard.',
    },
    {
      name: 'Marina Bay Sands',
      location: 'Marina Bay Area',
      reach: '312,000',
      impressions: '2,450,000',
      description: 'Iconic location with visibility to tourists and business travelers.',
    },
    {
      name: 'Changi Airport',
      location: 'Terminal 1-4, Jewel',
      reach: '185,000',
      impressions: '1,580,000',
      description: 'Gateway to Singapore reaching international travelers.',
    },
  ],
  majorCities: ['Singapore Central', 'Orchard', 'Marina Bay', 'Jurong', 'Tampines', 'Woodlands'],
  keyMarkets: [
    {
      city: 'Singapore Central',
      code: 'SGC',
      population: '1.2M',
      screens: 2156,
      screensGrowth: 8,
      dailyReach: '3.8M',
      dailyReachGrowth: 6.5,
      monthlyImpressions: '114M',
      monthlyImpressionsGrowth: 12.3,
      yoyGrowth: 14.2,
      avgDwell: '2.8 min',
      peakHours: '8-10 AM, 6-9 PM',
      topCategory: 'Finance & Luxury',
      viewability: 96.5,
      hourlyData: [12, 28, 75, 95, 82, 55, 48, 60, 78, 92, 88, 65, 52, 58, 72, 85, 95, 90, 68, 42, 28, 18, 12, 10],
      description: 'The financial heart of Singapore with the highest concentration of premium consumers.',
      locations: [
        { name: 'Orchard Road', desc: 'Shopping Belt', traffic: 920000, screens: 425, score: 99 },
        { name: 'Marina Bay', desc: 'Business District', traffic: 780000, screens: 318, score: 98 },
        { name: 'Raffles Place', desc: 'CBD', traffic: 650000, screens: 245, score: 97 },
        { name: 'Bugis', desc: 'Mixed Use', traffic: 520000, screens: 186, score: 95 },
      ],
      audience: [
        { name: 'Professionals', percentage: 42, color: 'bg-blue-500' },
        { name: 'Tourists', percentage: 28, color: 'bg-amber-500' },
        { name: 'Shoppers', percentage: 20, color: 'bg-emerald-500' },
        { name: 'Students', percentage: 10, color: 'bg-purple-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 52 },
        { name: 'Transit Screens', percentage: 28 },
        { name: 'Mall Networks', percentage: 15 },
        { name: 'Street Furniture', percentage: 5 },
      ],
    },
  ],
  faqs: [
    {
      question: 'What makes Singapore unique for OOH advertising?',
      answer: 'Singapore offers 100% urbanization, world-class infrastructure, and access to one of Asia\'s most affluent consumer bases.',
    },
    {
      question: 'What are the best locations for billboard advertising?',
      answer: 'Orchard Road, Marina Bay, CBD, and major MRT interchanges offer the highest visibility and reach.',
    },
    {
      question: 'How regulated is outdoor advertising in Singapore?',
      answer: 'Singapore has clear guidelines managed by the Urban Redevelopment Authority (URA), ensuring quality and compliance.',
    },
    {
      question: 'What is the average cost of billboard advertising?',
      answer: 'Costs vary by location, with premium spots like Orchard Road commanding higher rates due to footfall and affluence.',
    },
  ],
  caseStudies: [
    { title: 'Luxury Brand Launch', client: 'International Luxury Brand', results: '+52% brand recall' },
    { title: 'Financial Services', client: 'Major Bank', results: '+38% product awareness' },
    { title: 'Tourism Campaign', client: 'Regional Tourism Board', results: '+41% visitor interest' },
  ],
  partners: ['Clear Channel', 'JCDecaux', 'SMRT Media', 'Focus Media', 'Moove Media'],
  order: 2,
  isActive: true,
}

// ============================================================================
// INDONESIA DATA
// ============================================================================
const indonesiaData = {
  _type: 'location',
  country: 'Indonesia',
  slug: { _type: 'slug', current: 'indonesia' },
  city: 'Jakarta',
  flag: '🇮🇩',
  description: 'Access Southeast Asia\'s largest economy with over 275 million consumers through strategic OOH placements.',
  fullDescription: 'Indonesia is the world\'s fourth most populous country and Southeast Asia\'s largest economy. With a rapidly growing middle class and increasing urbanization, it offers tremendous opportunities for advertisers.',
  billboards: '15,000+',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/IndonesiaContact',
  stats: [
    { label: 'Population', value: '275M+' },
    { label: 'GDP Growth', value: '5.3%' },
    { label: 'Jakarta Population', value: '10.5M' },
    { label: 'Key Markets', value: '6+' },
  ],
  whyInvest: [
    'Largest economy in Southeast Asia',
    'Rapidly growing middle class',
    'Young demographic with median age of 30',
    'High mobile and digital adoption',
    'Expanding infrastructure and transportation',
  ],
  highVisibilityBillboards: [
    {
      name: 'Sudirman CBD',
      location: 'Jalan Sudirman, Jakarta',
      reach: '425,000',
      impressions: '3,200,000',
      description: 'Prime location in Jakarta\'s central business district with highest traffic.',
    },
    {
      name: 'Grand Indonesia',
      location: 'Thamrin, Central Jakarta',
      reach: '380,000',
      impressions: '2,850,000',
      description: 'Premium mall location in the heart of Jakarta.',
    },
    {
      name: 'Semanggi Interchange',
      location: 'South Jakarta',
      reach: '520,000',
      impressions: '3,900,000',
      description: 'Major highway interchange with exceptional vehicle traffic.',
    },
  ],
  majorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar', 'Bali'],
  keyMarkets: [
    {
      city: 'Jakarta',
      code: 'JKT',
      population: '10.5M',
      screens: 4850,
      screensGrowth: 22,
      dailyReach: '8.2M',
      dailyReachGrowth: 18.5,
      monthlyImpressions: '246M',
      monthlyImpressionsGrowth: 24.8,
      yoyGrowth: 28.5,
      avgDwell: '3.2 min',
      peakHours: '7-10 AM, 5-9 PM',
      topCategory: 'Retail & E-commerce',
      viewability: 88.5,
      hourlyData: [8, 22, 68, 95, 88, 62, 45, 52, 68, 82, 78, 58, 48, 55, 72, 88, 95, 92, 75, 52, 35, 22, 12, 8],
      description: 'The capital and economic center of Indonesia with massive daily population flow.',
      locations: [
        { name: 'Sudirman', desc: 'CBD', traffic: 1250000, screens: 580, score: 98 },
        { name: 'Thamrin', desc: 'Commercial Hub', traffic: 980000, screens: 420, score: 96 },
        { name: 'Kuningan', desc: 'Business District', traffic: 750000, screens: 310, score: 94 },
        { name: 'Kelapa Gading', desc: 'Residential & Mall', traffic: 620000, screens: 245, score: 92 },
      ],
      audience: [
        { name: 'Professionals', percentage: 32, color: 'bg-blue-500' },
        { name: 'Families', percentage: 28, color: 'bg-emerald-500' },
        { name: 'Young Adults', percentage: 25, color: 'bg-purple-500' },
        { name: 'Students', percentage: 15, color: 'bg-amber-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 42 },
        { name: 'Transit Screens', percentage: 30 },
        { name: 'Mall Networks', percentage: 20 },
        { name: 'Street Furniture', percentage: 8 },
      ],
    },
    {
      city: 'Surabaya',
      code: 'SUB',
      population: '2.9M',
      screens: 1680,
      screensGrowth: 28,
      dailyReach: '3.5M',
      dailyReachGrowth: 22.3,
      monthlyImpressions: '105M',
      monthlyImpressionsGrowth: 26.5,
      yoyGrowth: 32.4,
      avgDwell: '2.8 min',
      peakHours: '7-9 AM, 5-8 PM',
      topCategory: 'Retail & Manufacturing',
      viewability: 86.2,
      hourlyData: [10, 25, 72, 92, 85, 58, 42, 48, 62, 78, 75, 55, 45, 52, 68, 85, 92, 88, 70, 48, 32, 20, 12, 8],
      description: 'Indonesia\'s second largest city and a major industrial hub in East Java.',
      locations: [
        { name: 'Tunjungan', desc: 'Shopping District', traffic: 580000, screens: 280, score: 95 },
        { name: 'HR Muhammad', desc: 'CBD', traffic: 420000, screens: 185, score: 92 },
      ],
      audience: [
        { name: 'Professionals', percentage: 30, color: 'bg-blue-500' },
        { name: 'Families', percentage: 35, color: 'bg-emerald-500' },
        { name: 'Young Adults', percentage: 22, color: 'bg-purple-500' },
        { name: 'Students', percentage: 13, color: 'bg-amber-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 38 },
        { name: 'Transit Screens', percentage: 28 },
        { name: 'Mall Networks', percentage: 25 },
        { name: 'Street Furniture', percentage: 9 },
      ],
    },
  ],
  faqs: [
    {
      question: 'Why advertise in Indonesia?',
      answer: 'Indonesia offers access to 275M+ consumers in Southeast Asia\'s largest economy with a rapidly growing middle class.',
    },
    {
      question: 'What are the key cities for OOH advertising?',
      answer: 'Jakarta, Surabaya, Bandung, Medan, and Bali offer the highest concentration of screens and audiences.',
    },
    {
      question: 'What types of OOH media are available?',
      answer: 'Digital billboards, LED screens, transit advertising, mall media, and traditional static billboards.',
    },
    {
      question: 'How is campaign effectiveness measured?',
      answer: 'Through impression tracking, audience measurement, brand lift studies, and programmatic analytics.',
    },
  ],
  caseStudies: [
    { title: 'E-commerce Campaign', client: 'Major E-commerce Platform', results: '+65% app downloads' },
    { title: 'FMCG Launch', client: 'Consumer Goods Company', results: '+42% brand awareness' },
    { title: 'Telco Promotion', client: 'Leading Telco', results: '+38% plan upgrades' },
  ],
  partners: ['PT Dwi Sapta', 'MNC Media', 'Sindo Media', 'Transjakarta Media', 'PT Elang Mahkota'],
  order: 3,
  isActive: true,
}

// ============================================================================
// INDIA DATA
// ============================================================================
const indiaData = {
  _type: 'location',
  country: 'India',
  slug: { _type: 'slug', current: 'india' },
  city: 'Mumbai',
  flag: '🇮🇳',
  description: 'Reach over 1.4 billion consumers in the world\'s fastest-growing major economy.',
  fullDescription: 'India is the world\'s most populous country and one of the fastest-growing major economies. With rapid urbanization and a burgeoning middle class, it offers unparalleled opportunities for advertisers.',
  billboards: '50,000+',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/IndiaContact',
  stats: [
    { label: 'Population', value: '1.4B+' },
    { label: 'GDP Growth', value: '7.2%' },
    { label: 'Metro Residents', value: '150M+' },
    { label: 'Key Markets', value: '10+' },
  ],
  whyInvest: [
    'World\'s fastest-growing major economy',
    'Massive consumer market with 1.4B+ people',
    'Rapidly expanding middle class',
    'Growing digital infrastructure',
    'Diverse regional markets with unique opportunities',
  ],
  highVisibilityBillboards: [
    {
      name: 'Marine Drive',
      location: 'Mumbai, Maharashtra',
      reach: '580,000',
      impressions: '4,350,000',
      description: 'Iconic seafront location in the financial capital of India.',
    },
    {
      name: 'Connaught Place',
      location: 'New Delhi',
      reach: '620,000',
      impressions: '4,650,000',
      description: 'Prime commercial hub in India\'s capital city.',
    },
    {
      name: 'MG Road',
      location: 'Bangalore, Karnataka',
      reach: '485,000',
      impressions: '3,640,000',
      description: 'Central business district of India\'s tech capital.',
    },
  ],
  majorCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'],
  keyMarkets: [
    {
      city: 'Mumbai',
      code: 'BOM',
      population: '21M',
      screens: 8500,
      screensGrowth: 18,
      dailyReach: '15.2M',
      dailyReachGrowth: 14.5,
      monthlyImpressions: '456M',
      monthlyImpressionsGrowth: 22.3,
      yoyGrowth: 25.8,
      avgDwell: '2.8 min',
      peakHours: '8-11 AM, 5-9 PM',
      topCategory: 'Finance & Entertainment',
      viewability: 87.5,
      hourlyData: [10, 25, 65, 92, 88, 62, 45, 52, 68, 85, 82, 60, 48, 55, 72, 88, 95, 92, 78, 55, 38, 25, 15, 10],
      description: 'India\'s financial capital and entertainment hub with the highest advertising spend.',
      locations: [
        { name: 'Bandra-Kurla Complex', desc: 'Business Hub', traffic: 1850000, screens: 720, score: 98 },
        { name: 'Marine Drive', desc: 'Landmark', traffic: 1250000, screens: 380, score: 97 },
        { name: 'Lower Parel', desc: 'Corporate Zone', traffic: 980000, screens: 420, score: 96 },
        { name: 'Andheri', desc: 'Commercial Hub', traffic: 1420000, screens: 580, score: 95 },
      ],
      audience: [
        { name: 'Professionals', percentage: 38, color: 'bg-blue-500' },
        { name: 'Young Adults', percentage: 28, color: 'bg-purple-500' },
        { name: 'Families', percentage: 22, color: 'bg-emerald-500' },
        { name: 'Students', percentage: 12, color: 'bg-amber-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 35 },
        { name: 'Transit Screens', percentage: 32 },
        { name: 'Mall Networks', percentage: 22 },
        { name: 'Street Furniture', percentage: 11 },
      ],
    },
    {
      city: 'Delhi NCR',
      code: 'DEL',
      population: '32M',
      screens: 9200,
      screensGrowth: 22,
      dailyReach: '18.5M',
      dailyReachGrowth: 16.8,
      monthlyImpressions: '555M',
      monthlyImpressionsGrowth: 24.5,
      yoyGrowth: 28.2,
      avgDwell: '2.5 min',
      peakHours: '8-10 AM, 5-8 PM',
      topCategory: 'Retail & Government',
      viewability: 85.2,
      hourlyData: [8, 22, 62, 90, 85, 58, 42, 48, 65, 82, 78, 58, 45, 52, 68, 85, 92, 88, 72, 52, 35, 22, 12, 8],
      description: 'India\'s capital region with the highest concentration of government and corporate offices.',
      locations: [
        { name: 'Connaught Place', desc: 'CBD', traffic: 2150000, screens: 680, score: 99 },
        { name: 'Gurugram', desc: 'Corporate Hub', traffic: 1850000, screens: 920, score: 97 },
        { name: 'Noida', desc: 'IT Hub', traffic: 1420000, screens: 580, score: 95 },
      ],
      audience: [
        { name: 'Professionals', percentage: 35, color: 'bg-blue-500' },
        { name: 'Families', percentage: 30, color: 'bg-emerald-500' },
        { name: 'Young Adults', percentage: 22, color: 'bg-purple-500' },
        { name: 'Students', percentage: 13, color: 'bg-amber-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 38 },
        { name: 'Transit Screens', percentage: 28 },
        { name: 'Mall Networks', percentage: 24 },
        { name: 'Street Furniture', percentage: 10 },
      ],
    },
  ],
  faqs: [
    {
      question: 'What makes India attractive for OOH advertising?',
      answer: 'India offers access to 1.4B+ consumers with a rapidly growing middle class and increasing urbanization.',
    },
    {
      question: 'What are the top markets for billboard advertising?',
      answer: 'Mumbai, Delhi NCR, Bangalore, Chennai, and Hyderabad are the top metros for OOH advertising.',
    },
    {
      question: 'How is DOOH growing in India?',
      answer: 'DOOH is growing at 20%+ annually, driven by infrastructure development and programmatic adoption.',
    },
    {
      question: 'What regulations apply to OOH advertising?',
      answer: 'Regulations vary by state and municipality, with guidelines on size, placement, and content.',
    },
  ],
  caseStudies: [
    { title: 'Smartphone Launch', client: 'Major Electronics Brand', results: '+58% brand recall' },
    { title: 'Financial Services', client: 'Leading Insurance Company', results: '+45% lead generation' },
    { title: 'FMCG Campaign', client: 'Consumer Goods Giant', results: '+52% brand awareness' },
  ],
  partners: ['Times OOH', 'Laqshya Media', 'JCDecaux India', 'Selvel Oneway', 'Pioneer Publicity'],
  order: 4,
  isActive: true,
}

// ============================================================================
// USA DATA
// ============================================================================
const usaData = {
  _type: 'location',
  country: 'United States',
  slug: { _type: 'slug', current: 'usa' },
  city: 'New York',
  flag: '🇺🇸',
  description: 'Access the world\'s largest advertising market with premium OOH placements across major metropolitan areas.',
  fullDescription: 'The United States represents the world\'s largest advertising market with sophisticated infrastructure and highly engaged consumers across diverse demographic segments.',
  billboards: '350,000+',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/USAContact',
  stats: [
    { label: 'Population', value: '335M+' },
    { label: 'Ad Spend', value: '$9B+' },
    { label: 'Major Markets', value: '50+' },
    { label: 'DOOH Screens', value: '150K+' },
  ],
  whyInvest: [
    'World\'s largest advertising market',
    'Highly developed DOOH infrastructure',
    'Advanced targeting and measurement capabilities',
    'Diverse consumer demographics',
    'High consumer spending power',
  ],
  highVisibilityBillboards: [
    {
      name: 'Times Square',
      location: 'Manhattan, New York',
      reach: '380,000',
      impressions: '1,500,000+',
      description: 'The most iconic advertising location in the world with 24/7 global visibility.',
    },
    {
      name: 'Sunset Strip',
      location: 'Los Angeles, California',
      reach: '295,000',
      impressions: '2,200,000',
      description: 'Premium entertainment industry billboard corridor.',
    },
    {
      name: 'Chicago Loop',
      location: 'Chicago, Illinois',
      reach: '245,000',
      impressions: '1,850,000',
      description: 'Central business district of the Midwest\'s largest city.',
    },
  ],
  majorCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'San Francisco', 'Miami', 'Dallas'],
  keyMarkets: [
    {
      city: 'New York',
      code: 'NYC',
      population: '8.3M',
      screens: 15200,
      screensGrowth: 8,
      dailyReach: '12.5M',
      dailyReachGrowth: 5.2,
      monthlyImpressions: '375M',
      monthlyImpressionsGrowth: 8.5,
      yoyGrowth: 10.2,
      avgDwell: '2.2 min',
      peakHours: '7-10 AM, 4-8 PM',
      topCategory: 'Finance & Media',
      viewability: 94.8,
      hourlyData: [15, 32, 78, 95, 85, 62, 52, 58, 72, 88, 85, 68, 55, 60, 75, 88, 95, 90, 72, 48, 32, 22, 15, 12],
      description: 'The world\'s most iconic advertising market with unmatched visibility and prestige.',
      locations: [
        { name: 'Times Square', desc: 'Entertainment Hub', traffic: 380000, screens: 2850, score: 100 },
        { name: 'Madison Avenue', desc: 'Advertising Row', traffic: 285000, screens: 1250, score: 98 },
        { name: 'Fifth Avenue', desc: 'Luxury Retail', traffic: 320000, screens: 1680, score: 99 },
        { name: 'Penn Station', desc: 'Transit Hub', traffic: 650000, screens: 980, score: 97 },
      ],
      audience: [
        { name: 'Professionals', percentage: 38, color: 'bg-blue-500' },
        { name: 'Tourists', percentage: 32, color: 'bg-amber-500' },
        { name: 'Consumers', percentage: 20, color: 'bg-emerald-500' },
        { name: 'Students', percentage: 10, color: 'bg-purple-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 55 },
        { name: 'Transit Screens', percentage: 25 },
        { name: 'Place-Based', percentage: 15 },
        { name: 'Street Furniture', percentage: 5 },
      ],
    },
    {
      city: 'Los Angeles',
      code: 'LAX',
      population: '4M',
      screens: 12500,
      screensGrowth: 12,
      dailyReach: '9.8M',
      dailyReachGrowth: 8.5,
      monthlyImpressions: '294M',
      monthlyImpressionsGrowth: 12.2,
      yoyGrowth: 14.5,
      avgDwell: '3.5 min',
      peakHours: '7-10 AM, 4-8 PM',
      topCategory: 'Entertainment & Tech',
      viewability: 92.5,
      hourlyData: [12, 28, 72, 92, 82, 58, 48, 55, 68, 85, 82, 62, 52, 58, 72, 85, 92, 88, 68, 45, 30, 20, 14, 10],
      description: 'The entertainment capital with massive highway visibility and celebrity reach.',
      locations: [
        { name: 'Sunset Strip', desc: 'Entertainment', traffic: 295000, screens: 1850, score: 98 },
        { name: 'Hollywood', desc: 'Entertainment Hub', traffic: 420000, screens: 2100, score: 97 },
        { name: 'Downtown', desc: 'Business District', traffic: 380000, screens: 1520, score: 95 },
      ],
      audience: [
        { name: 'Commuters', percentage: 42, color: 'bg-blue-500' },
        { name: 'Entertainment Seekers', percentage: 28, color: 'bg-purple-500' },
        { name: 'Tourists', percentage: 18, color: 'bg-amber-500' },
        { name: 'Professionals', percentage: 12, color: 'bg-emerald-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 48 },
        { name: 'Transit Screens', percentage: 22 },
        { name: 'Place-Based', percentage: 20 },
        { name: 'Street Furniture', percentage: 10 },
      ],
    },
  ],
  faqs: [
    {
      question: 'What makes the US OOH market unique?',
      answer: 'The US offers the world\'s largest OOH market with advanced programmatic capabilities and sophisticated measurement.',
    },
    {
      question: 'What are the top OOH markets in the US?',
      answer: 'New York, Los Angeles, Chicago, Dallas-Fort Worth, and Miami are the largest OOH markets.',
    },
    {
      question: 'How is DOOH growing in the US?',
      answer: 'DOOH represents over 30% of total OOH spending and is growing at 10%+ annually.',
    },
    {
      question: 'What measurement standards are used?',
      answer: 'Geopath (formerly TAB) provides standardized audience measurement across the US OOH industry.',
    },
  ],
  caseStudies: [
    { title: 'Tech Product Launch', client: 'Major Tech Company', results: '+62% brand awareness' },
    { title: 'Streaming Service', client: 'Entertainment Platform', results: '+48% subscriber growth' },
    { title: 'Automotive Campaign', client: 'Leading Auto Brand', results: '+35% dealer visits' },
  ],
  partners: ['Lamar Advertising', 'Outfront Media', 'Clear Channel', 'JCDecaux', 'GSTV'],
  order: 5,
  isActive: true,
}

// ============================================================================
// PHILIPPINES DATA
// ============================================================================
const philippinesData = {
  _type: 'location',
  country: 'Philippines',
  slug: { _type: 'slug', current: 'philippines' },
  city: 'Manila',
  flag: '🇵🇭',
  description: 'Connect with over 115 million consumers in one of Southeast Asia\'s fastest-growing markets.',
  fullDescription: 'The Philippines is one of the fastest-growing economies in Southeast Asia with a young, digitally-savvy population and increasing urbanization.',
  billboards: '8,000+',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/PhilippinesContact',
  stats: [
    { label: 'Population', value: '115M+' },
    { label: 'GDP Growth', value: '6.1%' },
    { label: 'Metro Manila', value: '14M' },
    { label: 'Key Markets', value: '5+' },
  ],
  whyInvest: [
    'One of Asia\'s fastest-growing economies',
    'Young population with median age of 25',
    'High social media and digital engagement',
    'Growing middle class consumer market',
    'English-speaking population',
  ],
  highVisibilityBillboards: [
    {
      name: 'EDSA',
      location: 'Metro Manila',
      reach: '520,000',
      impressions: '3,900,000',
      description: 'The main highway artery of Metro Manila with massive daily traffic.',
    },
    {
      name: 'BGC',
      location: 'Bonifacio Global City',
      reach: '285,000',
      impressions: '2,140,000',
      description: 'Premium business district with affluent audience.',
    },
    {
      name: 'Makati',
      location: 'Ayala Avenue',
      reach: '320,000',
      impressions: '2,400,000',
      description: 'The financial center of the Philippines.',
    },
  ],
  majorCities: ['Manila', 'Cebu', 'Davao', 'Quezon City', 'Makati', 'BGC'],
  keyMarkets: [
    {
      city: 'Metro Manila',
      code: 'MNL',
      population: '14M',
      screens: 3250,
      screensGrowth: 18,
      dailyReach: '8.5M',
      dailyReachGrowth: 15.2,
      monthlyImpressions: '255M',
      monthlyImpressionsGrowth: 22.5,
      yoyGrowth: 26.8,
      avgDwell: '4.2 min',
      peakHours: '7-10 AM, 5-9 PM',
      topCategory: 'Retail & Telco',
      viewability: 85.5,
      hourlyData: [8, 22, 62, 88, 82, 55, 42, 48, 62, 78, 75, 55, 45, 52, 68, 82, 90, 88, 72, 52, 35, 22, 12, 8],
      description: 'The capital region with the highest concentration of consumers and businesses.',
      locations: [
        { name: 'EDSA', desc: 'Main Highway', traffic: 1850000, screens: 580, score: 96 },
        { name: 'BGC', desc: 'Business District', traffic: 520000, screens: 320, score: 98 },
        { name: 'Makati', desc: 'Financial Center', traffic: 680000, screens: 420, score: 97 },
        { name: 'Ortigas', desc: 'Commercial Hub', traffic: 580000, screens: 285, score: 94 },
      ],
      audience: [
        { name: 'Commuters', percentage: 38, color: 'bg-blue-500' },
        { name: 'Professionals', percentage: 28, color: 'bg-emerald-500' },
        { name: 'Young Adults', percentage: 22, color: 'bg-purple-500' },
        { name: 'Families', percentage: 12, color: 'bg-amber-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 42 },
        { name: 'Transit Screens', percentage: 28 },
        { name: 'Mall Networks', percentage: 22 },
        { name: 'Street Furniture', percentage: 8 },
      ],
    },
  ],
  faqs: [
    {
      question: 'Why advertise in the Philippines?',
      answer: 'The Philippines offers access to 115M+ consumers with high digital engagement and a growing middle class.',
    },
    {
      question: 'What are the best locations for OOH?',
      answer: 'EDSA, BGC, Makati, and major malls offer the highest visibility and premium audiences.',
    },
    {
      question: 'How effective is DOOH in the Philippines?',
      answer: 'DOOH is growing rapidly with increasing adoption of programmatic and data-driven campaigns.',
    },
    {
      question: 'What formats are most popular?',
      answer: 'LED billboards, mall media, transit advertising, and digital street furniture are most popular.',
    },
  ],
  caseStudies: [
    { title: 'Telco Campaign', client: 'Major Network Provider', results: '+48% brand awareness' },
    { title: 'FMCG Launch', client: 'Consumer Goods Brand', results: '+35% sales lift' },
    { title: 'Banking Services', client: 'Digital Bank', results: '+52% app downloads' },
  ],
  partners: ['United Neon', 'Dooh Inc', 'Ayala Land', 'SM Supermalls', 'MMDA'],
  order: 6,
  isActive: true,
}

// ============================================================================
// JAPAN DATA
// ============================================================================
const japanData = {
  _type: 'location',
  country: 'Japan',
  slug: { _type: 'slug', current: 'japan' },
  city: 'Tokyo',
  flag: '🇯🇵',
  description: 'Engage with consumers in the world\'s third-largest economy through premium digital OOH placements.',
  fullDescription: 'Japan represents one of the most sophisticated advertising markets globally with highly advanced DOOH infrastructure and tech-savvy consumers.',
  billboards: '25,000+',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/JapanContact',
  stats: [
    { label: 'Population', value: '125M' },
    { label: 'GDP', value: '$4.2T' },
    { label: 'Tokyo Metro', value: '37M' },
    { label: 'Key Markets', value: '4+' },
  ],
  whyInvest: [
    'World\'s third-largest economy',
    'Most advanced DOOH technology',
    'High consumer purchasing power',
    'Excellent public transportation infrastructure',
    'Strong brand-conscious consumer culture',
  ],
  highVisibilityBillboards: [
    {
      name: 'Shibuya Crossing',
      location: 'Shibuya, Tokyo',
      reach: '450,000',
      impressions: '3,375,000',
      description: 'The world\'s busiest pedestrian crossing with iconic digital displays.',
    },
    {
      name: 'Shinjuku Station',
      location: 'Shinjuku, Tokyo',
      reach: '380,000',
      impressions: '2,850,000',
      description: 'The world\'s busiest train station with massive daily foot traffic.',
    },
    {
      name: 'Ginza',
      location: 'Chuo, Tokyo',
      reach: '285,000',
      impressions: '2,140,000',
      description: 'Tokyo\'s premier luxury shopping district.',
    },
  ],
  majorCities: ['Tokyo', 'Osaka', 'Nagoya', 'Fukuoka', 'Sapporo', 'Kyoto'],
  keyMarkets: [
    {
      city: 'Tokyo',
      code: 'TYO',
      population: '14M',
      screens: 8500,
      screensGrowth: 6,
      dailyReach: '12.5M',
      dailyReachGrowth: 4.2,
      monthlyImpressions: '375M',
      monthlyImpressionsGrowth: 8.5,
      yoyGrowth: 10.2,
      avgDwell: '2.5 min',
      peakHours: '7-10 AM, 5-9 PM',
      topCategory: 'Technology & Fashion',
      viewability: 96.8,
      hourlyData: [10, 25, 72, 95, 88, 62, 52, 58, 75, 92, 88, 65, 52, 58, 72, 88, 95, 92, 75, 52, 35, 22, 12, 8],
      description: 'The world\'s largest metropolitan area with iconic advertising locations.',
      locations: [
        { name: 'Shibuya', desc: 'Youth & Fashion Hub', traffic: 2800000, screens: 1250, score: 100 },
        { name: 'Shinjuku', desc: 'Transportation Hub', traffic: 3600000, screens: 1580, score: 99 },
        { name: 'Ginza', desc: 'Luxury District', traffic: 850000, screens: 680, score: 98 },
        { name: 'Ikebukuro', desc: 'Commercial Hub', traffic: 2700000, screens: 920, score: 96 },
      ],
      audience: [
        { name: 'Commuters', percentage: 42, color: 'bg-blue-500' },
        { name: 'Shoppers', percentage: 28, color: 'bg-emerald-500' },
        { name: 'Young Adults', percentage: 20, color: 'bg-purple-500' },
        { name: 'Tourists', percentage: 10, color: 'bg-amber-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 58 },
        { name: 'Transit Screens', percentage: 28 },
        { name: 'Place-Based', percentage: 10 },
        { name: 'Street Furniture', percentage: 4 },
      ],
    },
  ],
  faqs: [
    {
      question: 'What makes Japan unique for OOH?',
      answer: 'Japan offers the world\'s most advanced DOOH technology with highly engaged, brand-conscious consumers.',
    },
    {
      question: 'What are the iconic OOH locations?',
      answer: 'Shibuya Crossing, Shinjuku Station, Ginza, and Akihabara offer the highest visibility.',
    },
    {
      question: 'How is DOOH evolving in Japan?',
      answer: 'Japan leads in interactive and AI-powered DOOH with real-time content optimization.',
    },
    {
      question: 'What languages are used in advertising?',
      answer: 'While Japanese dominates, English and Chinese are increasingly used in tourist areas.',
    },
  ],
  caseStudies: [
    { title: 'Tech Launch', client: 'Global Electronics Brand', results: '+55% awareness' },
    { title: 'Fashion Campaign', client: 'Luxury Fashion House', results: '+42% store visits' },
    { title: 'Entertainment', client: 'Gaming Company', results: '+68% engagement' },
  ],
  partners: ['Dentsu', 'Hakuhodo', 'JR East Marketing', 'Tokyo Metro Media', 'Shibuya TV'],
  order: 7,
  isActive: true,
}

// ============================================================================
// AUSTRALIA DATA
// ============================================================================
const australiaData = {
  _type: 'location',
  country: 'Australia',
  slug: { _type: 'slug', current: 'australia' },
  city: 'Sydney',
  flag: '🇦🇺',
  description: 'Reach affluent consumers across Australia\'s dynamic urban centers with premium OOH placements.',
  fullDescription: 'Australia offers advertisers access to one of the world\'s most affluent and urbanized populations with advanced digital out-of-home infrastructure.',
  billboards: '12,000+',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/AustraliaContact',
  stats: [
    { label: 'Population', value: '26M+' },
    { label: 'GDP Per Capita', value: '$55K+' },
    { label: 'Urban Population', value: '86%' },
    { label: 'Key Markets', value: '5+' },
  ],
  whyInvest: [
    'High GDP per capita and consumer spending',
    'Advanced DOOH infrastructure',
    'Highly urbanized population',
    'Strong measurement and data capabilities',
    'Diverse multicultural audience',
  ],
  highVisibilityBillboards: [
    {
      name: 'Sydney CBD',
      location: 'George Street, Sydney',
      reach: '285,000',
      impressions: '2,140,000',
      description: 'Prime location in Australia\'s largest city.',
    },
    {
      name: 'Melbourne CBD',
      location: 'Bourke Street, Melbourne',
      reach: '265,000',
      impressions: '1,990,000',
      description: 'Central location in Australia\'s cultural capital.',
    },
    {
      name: 'Brisbane CBD',
      location: 'Queen Street, Brisbane',
      reach: '185,000',
      impressions: '1,390,000',
      description: 'Premium location in Queensland\'s capital.',
    },
  ],
  majorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast'],
  keyMarkets: [
    {
      city: 'Sydney',
      code: 'SYD',
      population: '5.3M',
      screens: 3850,
      screensGrowth: 10,
      dailyReach: '4.2M',
      dailyReachGrowth: 6.5,
      monthlyImpressions: '126M',
      monthlyImpressionsGrowth: 12.2,
      yoyGrowth: 14.5,
      avgDwell: '2.6 min',
      peakHours: '7-10 AM, 4-7 PM',
      topCategory: 'Finance & Retail',
      viewability: 94.5,
      hourlyData: [12, 28, 72, 92, 85, 58, 48, 55, 72, 88, 85, 62, 50, 55, 70, 85, 92, 88, 70, 48, 32, 22, 15, 12],
      description: 'Australia\'s largest city and economic hub with global visibility.',
      locations: [
        { name: 'Pitt Street', desc: 'Retail Hub', traffic: 580000, screens: 420, score: 98 },
        { name: 'Circular Quay', desc: 'Tourist Hub', traffic: 450000, screens: 285, score: 97 },
        { name: 'Martin Place', desc: 'Financial Hub', traffic: 380000, screens: 220, score: 96 },
      ],
      audience: [
        { name: 'Professionals', percentage: 38, color: 'bg-blue-500' },
        { name: 'Tourists', percentage: 25, color: 'bg-amber-500' },
        { name: 'Shoppers', percentage: 22, color: 'bg-emerald-500' },
        { name: 'Students', percentage: 15, color: 'bg-purple-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 52 },
        { name: 'Transit Screens', percentage: 28 },
        { name: 'Place-Based', percentage: 15 },
        { name: 'Street Furniture', percentage: 5 },
      ],
    },
  ],
  faqs: [
    {
      question: 'Why advertise in Australia?',
      answer: 'Australia offers access to affluent consumers with high purchasing power and advanced OOH infrastructure.',
    },
    {
      question: 'What are the major OOH markets?',
      answer: 'Sydney, Melbourne, Brisbane, Perth, and Adelaide are the primary OOH markets.',
    },
    {
      question: 'How is DOOH measured in Australia?',
      answer: 'The OMA (Outdoor Media Association) provides standardized audience measurement through MOVE.',
    },
    {
      question: 'What is the media landscape?',
      answer: 'Major players include oOh!media, JCDecaux, and QMS with advanced programmatic capabilities.',
    },
  ],
  caseStudies: [
    { title: 'Retail Campaign', client: 'Major Retailer', results: '+45% store traffic' },
    { title: 'Tourism Promotion', client: 'Tourism Board', results: '+38% visitor interest' },
    { title: 'Tech Launch', client: 'Tech Company', results: '+52% brand awareness' },
  ],
  partners: ['oOh!media', 'JCDecaux Australia', 'QMS', 'Scentre Group', 'APN Outdoor'],
  order: 8,
  isActive: true,
}

// ============================================================================
// THAILAND DATA
// ============================================================================
const thailandData = {
  _type: 'location',
  country: 'Thailand',
  slug: { _type: 'slug', current: 'thailand' },
  city: 'Bangkok',
  flag: '🇹🇭',
  description: 'Connect with consumers in Southeast Asia\'s second-largest economy through strategic OOH placements.',
  fullDescription: 'Thailand offers advertisers access to a dynamic market with a growing middle class, vibrant tourism sector, and increasing digital adoption.',
  billboards: '10,000+',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/ThailandContact',
  stats: [
    { label: 'Population', value: '70M+' },
    { label: 'Bangkok Metro', value: '15M+' },
    { label: 'Tourists/Year', value: '40M+' },
    { label: 'Key Markets', value: '4+' },
  ],
  whyInvest: [
    'Southeast Asia\'s second-largest economy',
    'Major global tourism destination',
    'Growing middle class consumer market',
    'Well-developed transportation network',
    'High mobile and digital penetration',
  ],
  highVisibilityBillboards: [
    {
      name: 'Siam Square',
      location: 'Pathum Wan, Bangkok',
      reach: '385,000',
      impressions: '2,890,000',
      description: 'The heart of Bangkok\'s shopping and entertainment district.',
    },
    {
      name: 'Sukhumvit',
      location: 'Sukhumvit Road, Bangkok',
      reach: '420,000',
      impressions: '3,150,000',
      description: 'Major commercial corridor with high-end retail and hospitality.',
    },
    {
      name: 'Silom',
      location: 'Silom Road, Bangkok',
      reach: '295,000',
      impressions: '2,210,000',
      description: 'Bangkok\'s financial district with premium business audience.',
    },
  ],
  majorCities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hat Yai', 'Khon Kaen'],
  keyMarkets: [
    {
      city: 'Bangkok',
      code: 'BKK',
      population: '10.5M',
      screens: 4200,
      screensGrowth: 15,
      dailyReach: '8.5M',
      dailyReachGrowth: 12.5,
      monthlyImpressions: '255M',
      monthlyImpressionsGrowth: 18.8,
      yoyGrowth: 22.5,
      avgDwell: '3.5 min',
      peakHours: '7-10 AM, 5-9 PM',
      topCategory: 'Retail & Tourism',
      viewability: 88.5,
      hourlyData: [10, 25, 68, 90, 85, 58, 45, 52, 68, 85, 82, 60, 48, 55, 72, 88, 95, 90, 75, 52, 35, 22, 12, 8],
      description: 'Thailand\'s capital and economic center with massive daily population flow.',
      locations: [
        { name: 'Siam', desc: 'Shopping Hub', traffic: 920000, screens: 580, score: 98 },
        { name: 'Sukhumvit', desc: 'Commercial Zone', traffic: 850000, screens: 520, score: 96 },
        { name: 'Silom', desc: 'Business District', traffic: 680000, screens: 380, score: 95 },
        { name: 'Chatuchak', desc: 'Market District', traffic: 580000, screens: 220, score: 92 },
      ],
      audience: [
        { name: 'Commuters', percentage: 35, color: 'bg-blue-500' },
        { name: 'Tourists', percentage: 28, color: 'bg-amber-500' },
        { name: 'Shoppers', percentage: 22, color: 'bg-emerald-500' },
        { name: 'Professionals', percentage: 15, color: 'bg-purple-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 45 },
        { name: 'Transit Screens', percentage: 30 },
        { name: 'Mall Networks', percentage: 18 },
        { name: 'Street Furniture', percentage: 7 },
      ],
    },
  ],
  faqs: [
    {
      question: 'Why advertise in Thailand?',
      answer: 'Thailand offers access to 70M+ consumers plus 40M+ annual tourists in Southeast Asia\'s second-largest economy.',
    },
    {
      question: 'What are the best OOH locations?',
      answer: 'Siam Square, Sukhumvit, Silom, and major BTS/MRT stations offer the highest visibility.',
    },
    {
      question: 'How is transit advertising performing?',
      answer: 'Transit media on BTS Skytrain and MRT has high effectiveness due to captive audience and dwell time.',
    },
    {
      question: 'What content regulations apply?',
      answer: 'Content must respect Thai culture and royalty, with specific guidelines for alcohol and tobacco.',
    },
  ],
  caseStudies: [
    { title: 'Tourism Campaign', client: 'International Hotel Chain', results: '+48% bookings' },
    { title: 'Retail Launch', client: 'Fashion Brand', results: '+42% store visits' },
    { title: 'FMCG Promotion', client: 'Beverage Company', results: '+35% sales lift' },
  ],
  partners: ['Master Ad', 'JCDecaux Thailand', 'Plan B Media', 'VGI Global', 'BTS Advertising'],
  order: 9,
  isActive: true,
}

// ============================================================================
// SRI LANKA DATA
// ============================================================================
const sriLankaData = {
  _type: 'location',
  country: 'Sri Lanka',
  slug: { _type: 'slug', current: 'sri-lanka' },
  city: 'Colombo',
  flag: '🇱🇰',
  description: 'Reach consumers in South Asia\'s emerging market with strategic OOH placements across Sri Lanka.',
  fullDescription: 'Sri Lanka offers advertisers access to an emerging market with a growing urban population, increasing tourist arrivals, and developing infrastructure.',
  billboards: '2,500+',
  contactFormUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/SriLankaContact',
  stats: [
    { label: 'Population', value: '22M+' },
    { label: 'Colombo Metro', value: '5.6M' },
    { label: 'GDP Growth', value: '4.5%' },
    { label: 'Key Markets', value: '3+' },
  ],
  whyInvest: [
    'Emerging South Asian market',
    'Strategic location in Indian Ocean',
    'Growing tourism sector',
    'Developing infrastructure',
    'Young and educated workforce',
  ],
  highVisibilityBillboards: [
    {
      name: 'Galle Face',
      location: 'Colombo 3',
      reach: '125,000',
      impressions: '940,000',
      description: 'Iconic oceanfront promenade in the heart of Colombo.',
    },
    {
      name: 'Kandy Road',
      location: 'A1 Highway',
      reach: '185,000',
      impressions: '1,390,000',
      description: 'Major highway connecting Colombo to the hill country.',
    },
    {
      name: 'Pettah',
      location: 'Colombo 11',
      reach: '220,000',
      impressions: '1,650,000',
      description: 'Bustling commercial district with high foot traffic.',
    },
  ],
  majorCities: ['Colombo', 'Kandy', 'Galle', 'Negombo', 'Jaffna'],
  keyMarkets: [
    {
      city: 'Colombo',
      code: 'CMB',
      population: '5.6M',
      screens: 850,
      screensGrowth: 22,
      dailyReach: '2.8M',
      dailyReachGrowth: 18.5,
      monthlyImpressions: '84M',
      monthlyImpressionsGrowth: 25.2,
      yoyGrowth: 28.5,
      avgDwell: '3.2 min',
      peakHours: '7-10 AM, 4-8 PM',
      topCategory: 'Retail & Telco',
      viewability: 82.5,
      hourlyData: [8, 22, 62, 88, 82, 55, 42, 48, 62, 78, 75, 55, 45, 52, 68, 82, 90, 88, 72, 52, 35, 22, 12, 8],
      description: 'Sri Lanka\'s commercial capital and economic hub.',
      locations: [
        { name: 'Fort', desc: 'Business District', traffic: 380000, screens: 180, score: 95 },
        { name: 'Pettah', desc: 'Commercial Hub', traffic: 520000, screens: 220, score: 94 },
        { name: 'Colombo 7', desc: 'Upmarket Residential', traffic: 185000, screens: 95, score: 92 },
      ],
      audience: [
        { name: 'Commuters', percentage: 38, color: 'bg-blue-500' },
        { name: 'Shoppers', percentage: 28, color: 'bg-emerald-500' },
        { name: 'Professionals', percentage: 22, color: 'bg-purple-500' },
        { name: 'Tourists', percentage: 12, color: 'bg-amber-500' },
      ],
      mediaFormats: [
        { name: 'Digital Billboards', percentage: 35 },
        { name: 'Static Billboards', percentage: 38 },
        { name: 'Transit Screens', percentage: 18 },
        { name: 'Street Furniture', percentage: 9 },
      ],
    },
  ],
  faqs: [
    {
      question: 'Why advertise in Sri Lanka?',
      answer: 'Sri Lanka offers access to an emerging market with growing urbanization and tourism.',
    },
    {
      question: 'What are the main advertising markets?',
      answer: 'Colombo, Kandy, and Galle are the primary markets for OOH advertising.',
    },
    {
      question: 'How is DOOH developing?',
      answer: 'DOOH is growing rapidly with increasing adoption of digital screens in major cities.',
    },
    {
      question: 'What media formats are available?',
      answer: 'Billboards, transit advertising, street furniture, and emerging digital screens.',
    },
  ],
  caseStudies: [
    { title: 'Telco Launch', client: 'Mobile Network', results: '+42% subscriber growth' },
    { title: 'Retail Campaign', client: 'Fashion Retailer', results: '+35% store visits' },
    { title: 'Banking Services', client: 'Digital Bank', results: '+28% account openings' },
  ],
  partners: ['Triad (Pvt) Ltd', 'Grant Advertising', 'Phoenix Ogilvy', 'Leo Burnett', 'MullenLowe'],
  order: 10,
  isActive: true,
}

// ============================================================================
// ALL LOCATIONS ARRAY
// ============================================================================
const allLocations = [
  malaysiaData,
  singaporeData,
  indonesiaData,
  indiaData,
  usaData,
  philippinesData,
  japanData,
  australiaData,
  thailandData,
  sriLankaData,
]

// ============================================================================
// SEED FUNCTION
// ============================================================================
async function seedLocations() {
  console.log('🌍 Starting location data seed to Sanity...\n')
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is required')
    console.log('\nTo get a token:')
    console.log('1. Go to https://www.sanity.io/manage')
    console.log('2. Select your project')
    console.log('3. Go to API → Tokens')
    console.log('4. Create a token with "Editor" permissions')
    console.log('\nThen run: SANITY_API_TOKEN=your_token node scripts/seed-locations-to-sanity.js')
    process.exit(1)
  }

  let successCount = 0
  let errorCount = 0

  for (const location of allLocations) {
    try {
      console.log(`📍 Processing: ${location.country}...`)
      
      // Add _key to all array items
      const locationWithKeys = addKeysToArrayItems(location)
      
      // Check if location already exists
      const existing = await client.fetch(
        `*[_type == "location" && slug.current == $slug][0]`,
        { slug: location.slug.current }
      )
      
      if (existing) {
        // Update existing document
        console.log(`   ↻ Updating existing location: ${location.country}`)
        await client
          .patch(existing._id)
          .set(locationWithKeys)
          .commit()
        console.log(`   ✅ Updated: ${location.country}`)
      } else {
        // Create new document
        console.log(`   + Creating new location: ${location.country}`)
        await client.create(locationWithKeys)
        console.log(`   ✅ Created: ${location.country}`)
      }
      
      successCount++
    } catch (error) {
      console.error(`   ❌ Error with ${location.country}:`, error.message)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`📊 Seed Summary:`)
  console.log(`   ✅ Successful: ${successCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`   📍 Total: ${allLocations.length}`)
  console.log('='.repeat(50))
}

// Run the seed function
seedLocations().catch(console.error)
