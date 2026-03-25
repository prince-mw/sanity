const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// ============================================
// COMPANY PAGES
// ============================================
const companyPages = [
  {
    _type: 'companyPage',
    pageType: 'about',
    title: 'About Moving Walls',
    subtitle: 'Transforming How Brands Reach Real People',
    heroDescription: 'Moving Walls is a global connected media and programmatic out of home company powered by US patented measurement technology. We help brands reach real people in real places with precision, accountability, and confidence.',
    mission: 'At Moving Walls, we believe advertising should be more than just reaching audiences—it should create meaningful connections. Our mission is to empower brands with intelligent, data-driven advertising solutions that deliver measurable results and drive real business growth.',
    vision: 'To make outdoor media measurable, transparent, and performance driven across the globe.',
    values: [
      { _key: 'v1', icon: 'lightning', title: 'Innovation First', description: 'We constantly push boundaries to deliver cutting-edge advertising solutions that drive real results.' },
      { _key: 'v2', icon: 'shield', title: 'Trust & Transparency', description: 'We build lasting partnerships through honest communication and transparent business practices.' },
      { _key: 'v3', icon: 'users', title: 'Client Success', description: 'Your success is our success. We\'re dedicated to delivering measurable results for every campaign.' },
      { _key: 'v4', icon: 'globe', title: 'Global Impact', description: 'We\'re building advertising solutions that work across cultures, markets, and communities worldwide.' },
    ],
    capabilities: [
      { _key: 'c1', icon: 'chart', title: 'Multi-Signal Measurement', description: 'Our patented multi-sensor technology captures real-world movement patterns to deliver verified reach, frequency, and audience insights.' },
      { _key: 'c2', icon: 'lightning', title: 'Programmatic Automation', description: 'We bring addressability and automation to out of home. Campaigns can be activated, optimised, and scaled across digital billboards, transit, digital signage, and in-store retail media.' },
      { _key: 'c3', icon: 'location', title: 'Location Intelligence', description: 'We turn physical spaces into data-rich environments. By understanding how people move, dwell, and convert, brands can align creative, timing, and placement with actual behaviour.' },
      { _key: 'c4', icon: 'target', title: 'Full-Funnel OOH Measurement', description: 'Our Global Multi-Signal OOH Measurement Framework connects exposure to action. From verified impressions to store visits and business outcomes.' },
    ],
    stats: [
      { _key: 's1', value: '10B+', label: 'Data Points Daily' },
      { _key: 's2', value: '100K+', label: 'OOH Locations' },
      { _key: 's3', value: '50+', label: 'Countries' },
      { _key: 's4', value: '4', label: 'Continents' },
    ],
    associations: [
      { _key: 'a1', name: 'World Out of Home Organisation' },
      { _key: 'a2', name: 'IAB SEA+India' },
      { _key: 'a3', name: 'Digital Signage Federation' },
      { _key: 'a4', name: 'Outdoor Advertising Association of Malaysia' },
      { _key: 'a5', name: 'Malaysian Digital Association' },
      { _key: 'a6', name: 'Malaysia Advertisers Association' },
      { _key: 'a7', name: 'Association of Advertising and Marketing Singapore' },
      { _key: 'a8', name: 'Media Specialists Association of the Philippines' },
      { _key: 'a9', name: 'Outdoor Advertising Association of Nigeria' },
    ],
    awards: [
      { _key: 'aw1', name: 'APAC CIO Outlook', description: 'Innovation Recognition' },
      { _key: 'aw2', name: 'TiE50', description: 'Top 50 Startup' },
      { _key: 'aw3', name: 'Unilever', description: 'Innovation Award' },
    ],
  },
  {
    _type: 'companyPage',
    pageType: 'our-story',
    title: 'Our Story',
    subtitle: 'Innovation & Growth',
    heroDescription: 'From a bold vision to market leadership, discover how Moving Walls transformed the advertising landscape through innovative technology and unwavering commitment to client success.',
    mission: 'At Moving Walls, we believe advertising should be more than just reaching audiences—it should create meaningful connections. Our mission is to empower brands with intelligent, data-driven advertising solutions that deliver measurable results and drive real business growth.',
    vision: 'We\'re building the future of advertising—one where technology meets creativity, data drives decisions, and every campaign creates lasting impact.',
    values: [
      { _key: 'v1', icon: 'lightning', title: 'Innovation First', description: 'We constantly push boundaries to deliver cutting-edge advertising solutions that drive real results.' },
      { _key: 'v2', icon: 'shield', title: 'Trust & Transparency', description: 'We build lasting partnerships through honest communication and transparent business practices.' },
      { _key: 'v3', icon: 'users', title: 'Client Success', description: 'Your success is our success. We\'re dedicated to delivering measurable results for every campaign.' },
      { _key: 'v4', icon: 'globe', title: 'Global Impact', description: 'We\'re building advertising solutions that work across cultures, markets, and communities worldwide.' },
    ],
  },
  {
    _type: 'companyPage',
    pageType: 'platform',
    title: 'Moving Audiences Platform',
    subtitle: 'The Intelligence Layer for OOH',
    heroDescription: 'Our unified platform connects data signals, AI processing, and activation capabilities to deliver measurable OOH campaigns at scale.',
    capabilities: [
      { _key: 'c1', icon: 'data', title: 'Multi-Signal Data', description: 'Aggregate location, mobile, traffic, and census data for comprehensive audience insights.' },
      { _key: 'c2', icon: 'brain', title: 'AI Processing', description: 'Machine learning models analyze patterns to optimize targeting and predict outcomes.' },
      { _key: 'c3', icon: 'activate', title: 'Programmatic Activation', description: 'Connect to global OOH inventory through integrated DSP partnerships.' },
      { _key: 'c4', icon: 'measure', title: 'Real-Time Measurement', description: 'Track campaign performance with verified impressions and attribution.' },
    ],
  },
]

// ============================================
// TIMELINE EVENTS
// ============================================
const timelineEvents = [
  {
    _type: 'timelineEvent',
    year: '2015',
    quarter: 'Q1',
    title: 'Company Founded',
    description: 'Moving Walls was born from a vision to revolutionize advertising through data-driven insights and innovative technology platforms.',
    achievement: 'Secured initial funding of $2M',
    icon: '🚀',
    color: 'blue',
    phase: 'startup',
    order: 1,
    isHighlight: true,
  },
  {
    _type: 'timelineEvent',
    year: '2016',
    quarter: 'Q3',
    title: 'First Major Client',
    description: 'Landed our first Fortune 500 client and delivered our inaugural advertising campaign with 300% ROI improvement.',
    achievement: 'Reached $1M ARR milestone',
    icon: '🎯',
    color: 'green',
    phase: 'startup',
    order: 2,
    isHighlight: false,
  },
  {
    _type: 'timelineEvent',
    year: '2017',
    quarter: 'Q2',
    title: 'Transit Partnerships',
    description: 'Secured partnerships with 15 major transit authorities, expanding our out-of-home advertising network across key metropolitan areas.',
    achievement: 'Network expanded to 50+ cities',
    icon: '🚇',
    color: 'purple',
    phase: 'startup',
    order: 3,
    isHighlight: false,
  },
  {
    _type: 'timelineEvent',
    year: '2018',
    quarter: 'Q4',
    title: 'Digital Platform Launch',
    description: 'Launched our proprietary digital advertising platform with real-time bidding and advanced targeting capabilities.',
    achievement: 'Platform processed 1B+ impressions',
    icon: '💻',
    color: 'orange',
    phase: 'expansion',
    order: 4,
    isHighlight: true,
  },
  {
    _type: 'timelineEvent',
    year: '2019',
    quarter: 'Q1',
    title: 'AI Integration',
    description: 'Introduced machine learning algorithms for audience targeting and campaign optimization, improving performance by 150%.',
    achievement: 'AI-powered 10,000+ campaigns',
    icon: '🤖',
    color: 'red',
    phase: 'expansion',
    order: 5,
    isHighlight: false,
  },
  {
    _type: 'timelineEvent',
    year: '2020',
    quarter: 'Q3',
    title: 'Global Expansion',
    description: 'Opened international offices in London, Toronto, and Sydney, establishing Moving Walls as a global advertising technology leader.',
    achievement: 'Expanded to 3 continents',
    icon: '🌍',
    color: 'blue',
    phase: 'expansion',
    order: 6,
    isHighlight: true,
  },
  {
    _type: 'timelineEvent',
    year: '2021',
    quarter: 'Q2',
    title: 'Series B Funding',
    description: 'Raised significant funding to accelerate product development and market expansion across Asia-Pacific.',
    achievement: 'Major investment milestone',
    icon: '🦄',
    color: 'purple',
    phase: 'innovation',
    order: 7,
    isHighlight: true,
  },
  {
    _type: 'timelineEvent',
    year: '2022',
    quarter: 'Q4',
    title: 'Market Leadership',
    description: 'Became the fastest-growing advertising technology platform with 1000+ brand partnerships and industry recognition.',
    achievement: '1000+ active clients',
    icon: '👑',
    color: 'orange',
    phase: 'innovation',
    order: 8,
    isHighlight: false,
  },
  {
    _type: 'timelineEvent',
    year: '2023',
    quarter: 'Q1',
    title: 'Innovation Awards',
    description: 'Received multiple industry awards for innovation in advertising technology and sustainable business practices.',
    achievement: '5 major industry awards',
    icon: '🏆',
    color: 'green',
    phase: 'innovation',
    order: 9,
    isHighlight: false,
  },
  {
    _type: 'timelineEvent',
    year: '2024',
    quarter: 'Q3',
    title: 'Next Generation Platform',
    description: 'Launched Moving Walls 3.0 with advanced analytics, cross-platform integration, and enhanced automation capabilities.',
    achievement: 'Platform 3.0 live globally',
    icon: '⚡',
    color: 'blue',
    phase: 'innovation',
    order: 10,
    isHighlight: true,
  },
]

// ============================================
// OFFICES
// ============================================
const offices = [
  {
    _type: 'office',
    city: 'Singapore',
    country: 'Singapore',
    type: 'headquarters',
    address: 'Far East Finance Building, #8-02, 14 Robinson Road, Singapore 048545',
    phone: '+65 8755 6364',
    email: 'info@movingwalls.com',
    flag: '🇸🇬',
    timezone: 'GMT+8',
    workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
    isHeadquarters: true,
    order: 1,
    isActive: true,
  },
  {
    _type: 'office',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    type: 'regional',
    address: 'Level 8 (Zone B), Wisma Standard Chartered, No. 2, Jalan Teknologi Taman Teknologi Malaysia, 57000 Bukit Jalil',
    phone: '+60 3 7610 2044',
    email: 'info@movingwalls.com',
    flag: '🇲🇾',
    timezone: 'GMT+8',
    workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
    isHeadquarters: false,
    order: 2,
    isActive: true,
  },
  {
    _type: 'office',
    city: 'Manila',
    country: 'Philippines',
    type: 'regional',
    address: 'Unit 1207, Capital House, 9th Avenue, cor Lane S, Taguig',
    phone: '+63 7527 5672',
    email: 'info@movingwalls.com',
    flag: '🇵🇭',
    timezone: 'GMT+8',
    workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
    isHeadquarters: false,
    order: 3,
    isActive: true,
  },
  {
    _type: 'office',
    city: 'Jakarta',
    country: 'Indonesia',
    type: 'regional',
    address: 'Tower 45th floor, Jalan Prof Dr Satrio, Kav. 18 Jakarta 12940',
    phone: '+62 21 3005 3540',
    email: 'info@movingwalls.com',
    flag: '🇮🇩',
    timezone: 'GMT+7',
    workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
    isHeadquarters: false,
    order: 4,
    isActive: true,
  },
  {
    _type: 'office',
    city: 'Colombo',
    country: 'Sri Lanka',
    type: 'regional',
    address: '07 Turnour Rd, Colombo 8',
    phone: '',
    email: 'info@movingwalls.com',
    flag: '🇱🇰',
    timezone: 'GMT+5:30',
    workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
    isHeadquarters: false,
    order: 5,
    isActive: true,
  },
  {
    _type: 'office',
    city: 'Bangalore',
    country: 'India',
    type: 'regional',
    address: 'BHIVE Workspace, 3rd Floor, No.467/468, Shri Krishna Temple Rd, Stage 1 Indiranagar, Bengaluru, Karnataka 560038',
    phone: '',
    email: 'info@movingwalls.com',
    flag: '🇮🇳',
    timezone: 'GMT+5:30',
    workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
    isHeadquarters: false,
    order: 6,
    isActive: true,
  },
  {
    _type: 'office',
    city: 'Mumbai',
    country: 'India',
    type: 'regional',
    address: 'Dynasty Business Park, A wing 7th Floor, Near Metro Station, Andheri - Kurla Rd, Andheri East, Mumbai, Maharashtra 400065',
    phone: '',
    email: 'info@movingwalls.com',
    flag: '🇮🇳',
    timezone: 'GMT+5:30',
    workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
    isHeadquarters: false,
    order: 7,
    isActive: true,
  },
  {
    _type: 'office',
    city: 'Bangkok',
    country: 'Thailand',
    type: 'regional',
    address: 'Bangkok, Thailand',
    phone: '',
    email: 'info@movingwalls.com',
    flag: '🇹🇭',
    timezone: 'GMT+7',
    workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
    isHeadquarters: false,
    order: 8,
    isActive: true,
  },
]

// ============================================
// LOCATIONS (Country Pages)
// ============================================
const locations = [
  {
    _type: 'location',
    country: 'Malaysia',
    slug: { _type: 'slug', current: 'malaysia' },
    city: 'Kuala Lumpur',
    flag: '🇲🇾',
    description: 'Our headquarters and APAC hub with extensive coverage across Kuala Lumpur, Penang, Johor Bahru, and beyond.',
    fullDescription: 'Leverage the power of OOH advertising in Malaysia to reach a wider audience through strategic outdoor placements.',
    billboards: '50,000+',
    stats: [
      { _key: 's1', label: 'Billboard Inventory', value: '50,000+' },
      { _key: 's2', label: 'Daily Impressions', value: '150M+' },
      { _key: 's3', label: 'Major Cities', value: '15+' },
      { _key: 's4', label: 'Transit Partners', value: '25+' },
    ],
    majorCities: ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Kota Kinabalu', 'Ipoh', 'Melaka'],
    mediaTypes: [
      { _key: 'm1', name: 'Digital Billboards', icon: '📺', description: 'High-impact digital screens in prime locations' },
      { _key: 'm2', name: 'Transit Advertising', icon: '🚇', description: 'MRT, LRT, and bus network coverage' },
      { _key: 'm3', name: 'Mall Networks', icon: '🏬', description: 'Premium shopping mall placements' },
      { _key: 'm4', name: 'Street Furniture', icon: '🚏', description: 'Bus shelters and urban displays' },
    ],
    faqs: [
      { _key: 'f1', question: 'What is DOOH advertising?', answer: 'DOOH (Digital Out-of-Home) uses digital screens in public spaces to deliver dynamic, engaging ads that can be updated in real time.' },
      { _key: 'f2', question: 'Why invest in OOH advertising in Malaysia?', answer: 'Malaysia\'s cities, diverse population, and growing economy make it ideal for impactful campaigns that reach commuters, shoppers, and travelers.' },
      { _key: 'f3', question: 'What types of OOH advertising are available?', answer: 'Billboards, transit ads (buses, taxis, trains), street furniture, malls, airports, and digital billboards in high-traffic areas.' },
    ],
    order: 1,
    isActive: true,
  },
  {
    _type: 'location',
    country: 'Singapore',
    slug: { _type: 'slug', current: 'singapore' },
    city: 'Singapore',
    flag: '🇸🇬',
    description: 'Strategic Southeast Asia operations with premium digital OOH inventory across the city-state.',
    fullDescription: 'Singapore offers premium OOH opportunities with high-quality digital screens and affluent audiences.',
    billboards: '15,000+',
    stats: [
      { _key: 's1', label: 'Billboard Inventory', value: '15,000+' },
      { _key: 's2', label: 'Daily Impressions', value: '80M+' },
      { _key: 's3', label: 'MRT Stations', value: '130+' },
      { _key: 's4', label: 'Mall Partners', value: '50+' },
    ],
    majorCities: ['Central', 'Orchard', 'Marina Bay', 'Jurong', 'Changi'],
    mediaTypes: [
      { _key: 'm1', name: 'MRT Network', icon: '🚇', description: 'Extensive coverage across all MRT lines' },
      { _key: 'm2', name: 'Bus Shelters', icon: '🚏', description: 'Island-wide bus shelter advertising' },
      { _key: 'm3', name: 'Digital Screens', icon: '📺', description: 'Premium CBD and retail locations' },
    ],
    order: 2,
    isActive: true,
  },
  {
    _type: 'location',
    country: 'Indonesia',
    slug: { _type: 'slug', current: 'indonesia' },
    city: 'Jakarta',
    flag: '🇮🇩',
    description: 'Largest market in Southeast Asia with massive reach across Java and key Indonesian cities.',
    fullDescription: 'Indonesia represents the largest OOH market in Southeast Asia with extensive coverage across Jakarta, Surabaya, Bandung and more.',
    billboards: '100,000+',
    stats: [
      { _key: 's1', label: 'Billboard Inventory', value: '100,000+' },
      { _key: 's2', label: 'Daily Impressions', value: '500M+' },
      { _key: 's3', label: 'Major Cities', value: '25+' },
      { _key: 's4', label: 'Population Reach', value: '270M+' },
    ],
    majorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Yogyakarta'],
    mediaTypes: [
      { _key: 'm1', name: 'Digital Billboards', icon: '📺', description: 'Large format LED screens on major highways' },
      { _key: 'm2', name: 'Transit Media', icon: '🚌', description: 'TransJakarta and commuter rail advertising' },
      { _key: 'm3', name: 'Mall Circuits', icon: '🏬', description: 'Premium placement in top shopping centers' },
    ],
    order: 3,
    isActive: true,
  },
  {
    _type: 'location',
    country: 'India',
    slug: { _type: 'slug', current: 'india' },
    city: 'Mumbai',
    flag: '🇮🇳',
    description: 'Rapidly growing OOH market with coverage across Mumbai, Delhi, Bangalore, and tier-2 cities.',
    fullDescription: 'India offers unprecedented scale with OOH advertising reaching over 1 billion people across metro and emerging cities.',
    billboards: '200,000+',
    stats: [
      { _key: 's1', label: 'Billboard Inventory', value: '200,000+' },
      { _key: 's2', label: 'Daily Impressions', value: '800M+' },
      { _key: 's3', label: 'Metro Cities', value: '8' },
      { _key: 's4', label: 'Tier-2 Cities', value: '50+' },
    ],
    majorCities: ['Mumbai', 'Delhi NCR', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'],
    mediaTypes: [
      { _key: 'm1', name: 'Metro Advertising', icon: '🚇', description: 'Delhi Metro, Mumbai Metro, and more' },
      { _key: 'm2', name: 'Airport Media', icon: '✈️', description: 'Major international airports' },
      { _key: 'm3', name: 'Highway Billboards', icon: '🛣️', description: 'National highway network coverage' },
    ],
    order: 4,
    isActive: true,
  },
  {
    _type: 'location',
    country: 'Philippines',
    slug: { _type: 'slug', current: 'philippines' },
    city: 'Manila',
    flag: '🇵🇭',
    description: 'Dynamic advertising landscape with strong digital adoption in Metro Manila and key provinces.',
    fullDescription: 'The Philippines offers vibrant OOH opportunities with high engagement rates and growing digital inventory.',
    billboards: '30,000+',
    stats: [
      { _key: 's1', label: 'Billboard Inventory', value: '30,000+' },
      { _key: 's2', label: 'Daily Impressions', value: '120M+' },
      { _key: 's3', label: 'EDSA Coverage', value: '100%' },
      { _key: 's4', label: 'Mall Partners', value: '40+' },
    ],
    majorCities: ['Metro Manila', 'Cebu', 'Davao', 'Clark', 'Iloilo'],
    order: 5,
    isActive: true,
  },
  {
    _type: 'location',
    country: 'Japan',
    slug: { _type: 'slug', current: 'japan' },
    city: 'Tokyo',
    flag: '🇯🇵',
    description: 'Premium digital OOH market with world-class inventory in Tokyo, Osaka, and major cities.',
    fullDescription: 'Japan represents the gold standard in digital OOH with spectacular displays in Shibuya, Shinjuku, and beyond.',
    billboards: '80,000+',
    stats: [
      { _key: 's1', label: 'Digital Screens', value: '80,000+' },
      { _key: 's2', label: 'Daily Impressions', value: '300M+' },
      { _key: 's3', label: 'Train Stations', value: '500+' },
      { _key: 's4', label: 'Premium Formats', value: '3D/LED' },
    ],
    majorCities: ['Tokyo', 'Osaka', 'Nagoya', 'Yokohama', 'Fukuoka', 'Sapporo'],
    order: 6,
    isActive: true,
  },
  {
    _type: 'location',
    country: 'Australia',
    slug: { _type: 'slug', current: 'australia' },
    city: 'Sydney',
    flag: '🇦🇺',
    description: 'Leading Oceania operations with coverage across Sydney, Melbourne, Brisbane, and Perth.',
    fullDescription: 'Australia offers sophisticated OOH solutions with high viewability and programmatic capabilities.',
    billboards: '25,000+',
    stats: [
      { _key: 's1', label: 'Digital Screens', value: '25,000+' },
      { _key: 's2', label: 'Daily Reach', value: '15M+' },
      { _key: 's3', label: 'Major CBDs', value: '5' },
      { _key: 's4', label: 'Programmatic %', value: '70%+' },
    ],
    majorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    order: 7,
    isActive: true,
  },
  {
    _type: 'location',
    country: 'Sri Lanka',
    slug: { _type: 'slug', current: 'sri-lanka' },
    city: 'Colombo',
    flag: '🇱🇰',
    description: 'Emerging South Asian market with growing digital OOH infrastructure.',
    fullDescription: 'Sri Lanka presents growing opportunities in OOH advertising with expanding digital capabilities.',
    billboards: '10,000+',
    stats: [
      { _key: 's1', label: 'Billboard Inventory', value: '10,000+' },
      { _key: 's2', label: 'Daily Impressions', value: '25M+' },
      { _key: 's3', label: 'Major Cities', value: '5' },
    ],
    majorCities: ['Colombo', 'Kandy', 'Galle', 'Negombo'],
    order: 8,
    isActive: true,
  },
  {
    _type: 'location',
    country: 'Thailand',
    slug: { _type: 'slug', current: 'thailand' },
    city: 'Bangkok',
    flag: '🇹🇭',
    description: 'Vibrant advertising ecosystem with extensive BTS/MRT transit coverage in Bangkok.',
    fullDescription: 'Thailand offers dynamic OOH opportunities with excellent transit media and growing regional coverage.',
    billboards: '45,000+',
    stats: [
      { _key: 's1', label: 'Billboard Inventory', value: '45,000+' },
      { _key: 's2', label: 'Daily Impressions', value: '180M+' },
      { _key: 's3', label: 'BTS Stations', value: '60+' },
      { _key: 's4', label: 'Tourist Reach', value: '40M+/yr' },
    ],
    majorCities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hat Yai'],
    order: 9,
    isActive: true,
  },
]

// ============================================
// SEED FUNCTIONS
// ============================================

async function seedCompanyPages() {
  console.log('\n📄 Seeding Company Pages...')
  for (const page of companyPages) {
    try {
      const existing = await client.fetch(
        `*[_type == "companyPage" && pageType == $pageType][0]`,
        { pageType: page.pageType }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${page.pageType}" - already exists`)
        continue
      }
      const result = await client.create(page)
      console.log(`  ✅ Created "${page.pageType}" page`)
    } catch (error) {
      console.error(`  ❌ Error creating "${page.pageType}":`, error.message)
    }
  }
}

async function seedTimelineEvents() {
  console.log('\n📅 Seeding Timeline Events...')
  for (const event of timelineEvents) {
    try {
      const existing = await client.fetch(
        `*[_type == "timelineEvent" && year == $year && title == $title][0]`,
        { year: event.year, title: event.title }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${event.year} - ${event.title}" - already exists`)
        continue
      }
      const result = await client.create(event)
      console.log(`  ✅ Created "${event.year} - ${event.title}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${event.title}":`, error.message)
    }
  }
}

async function seedOffices() {
  console.log('\n🏢 Seeding Offices...')
  for (const office of offices) {
    try {
      const existing = await client.fetch(
        `*[_type == "office" && city == $city && country == $country][0]`,
        { city: office.city, country: office.country }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${office.city}, ${office.country}" - already exists`)
        continue
      }
      const result = await client.create(office)
      console.log(`  ✅ Created "${office.city}, ${office.country}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${office.city}":`, error.message)
    }
  }
}

async function seedLocations() {
  console.log('\n🌍 Seeding Locations...')
  for (const location of locations) {
    try {
      const existing = await client.fetch(
        `*[_type == "location" && slug.current == $slug][0]`,
        { slug: location.slug.current }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${location.country}" - already exists`)
        continue
      }
      const result = await client.create(location)
      console.log(`  ✅ Created "${location.country}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${location.country}":`, error.message)
    }
  }
}

// ============================================
// MAIN
// ============================================

async function seedAll() {
  console.log('🚀 Starting full Sanity data migration...\n')
  console.log('='.repeat(50))
  
  await seedCompanyPages()
  await seedTimelineEvents()
  await seedOffices()
  await seedLocations()
  
  console.log('\n' + '='.repeat(50))
  console.log('✨ All data seeding complete!')
  console.log('\nYou can now view content in Sanity Studio:')
  console.log('  - Company Pages: /structure/companyPage')
  console.log('  - Timeline Events: /structure/timelineEvent')
  console.log('  - Offices: /structure/office')
  console.log('  - Locations: /structure/location')
}

seedAll()
