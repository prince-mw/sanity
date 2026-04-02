/**
 * Seed remaining CMS data to Sanity
 * 
 * Seeds: Footer config, TrustBar stats, Client Partners,
 *        Audience page defaults (stats, benefits, platformFeatures, faqs, customerLogos, journeySteps),
 *        Office locations
 */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  token: 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  apiVersion: '2024-01-01',
});

// ============================================
// 1. FOOTER CONFIG
// ============================================
async function seedFooterConfig() {
  console.log('\n📦 Seeding Footer Config...');
  
  const existing = await client.fetch(`*[_type == "footerConfig" && _id == "footerConfig"][0]._id`);
  if (existing) {
    console.log('  ⏭️  Footer config already exists, updating...');
  }

  const footerDoc = {
    _id: 'footerConfig',
    _type: 'footerConfig',
    companyDescription: 'Moving Walls connects the global Out of Home ecosystem into one unified cloud platform. From audience discovery to booking, activation, measurement, and optimisation, we simplify complexity so brands can grow confidently across markets.',
    navCategories: [
      {
        _key: 'company',
        title: 'Company',
        showLocationIcon: false,
        links: [
          { _key: 'our-story', name: 'Our Story', href: '/our-story' },
          { _key: 'leadership', name: 'Leadership', href: '/leadership' },
          { _key: 'locations', name: 'Office Locations', href: '/locations' },
          { _key: 'careers', name: 'Careers', href: '/careers' },
          { _key: 'contact', name: 'Contact Us', href: '/contact' },
        ],
      },
      {
        _key: 'solutions',
        title: 'Solutions',
        showLocationIcon: false,
        links: [
          { _key: 'brands', name: 'Brands', href: '/brands' },
          { _key: 'media-owners', name: 'Media Owners', href: '/media-owners' },
          { _key: 'agencies', name: 'Agencies', href: '/agencies' },
        ],
      },
      {
        _key: 'products',
        title: 'Products',
        showLocationIcon: false,
        links: [
          { _key: 'planner', name: 'MW Planner', href: '/mw-planner' },
          { _key: 'measure', name: 'MW Measure', href: '/mw-measure' },
          { _key: 'influence', name: 'MW Influence', href: '/mw-influence' },
          { _key: 'activate', name: 'MW Activate', href: '/mw-activate' },
          { _key: 'science', name: 'MW Science', href: '/mw-science' },
          { _key: 'studio', name: 'MW Studio', href: '/mw-studio' },
          { _key: 'market', name: 'MW Market', href: '/mw-market' },
        ],
      },
      {
        _key: 'resources',
        title: 'Resources',
        showLocationIcon: false,
        links: [
          { _key: 'ooh-formats', name: 'OOH Formats', href: '/ooh-formats' },
          { _key: 'ebooks', name: 'E-Books', href: '/ebooks' },
          { _key: 'blog', name: 'Blog', href: '/blog' },
          { _key: 'case-studies', name: 'Case Studies', href: '/case-studies' },
          { _key: 'press-news', name: 'Press & News', href: '/press-news' },
          { _key: 'events', name: 'Events', href: '/events' },
        ],
      },
      {
        _key: 'billboard-locations',
        title: 'Billboard Locations',
        showLocationIcon: true,
        links: [
          { _key: 'malaysia', name: 'Malaysia', href: '/locations/malaysia' },
          { _key: 'singapore', name: 'Singapore', href: '/locations/singapore' },
          { _key: 'indonesia', name: 'Indonesia', href: '/locations/indonesia' },
          { _key: 'india', name: 'India', href: '/locations/india' },
          { _key: 'philippines', name: 'Philippines', href: '/locations/philippines' },
          { _key: 'japan', name: 'Japan', href: '/locations/japan' },
          { _key: 'australia', name: 'Australia', href: '/locations/australia' },
          { _key: 'sri-lanka', name: 'Sri Lanka', href: '/locations/sri-lanka' },
          { _key: 'thailand', name: 'Thailand', href: '/locations/thailand' },
        ],
      },
    ],
    socialLinks: [
      { _key: 'linkedin', platform: 'linkedin', url: 'https://www.linkedin.com/company/moving-walls/' },
      { _key: 'x', platform: 'x', url: 'https://x.com/movingwalls' },
      { _key: 'youtube', platform: 'youtube', url: 'https://www.youtube.com/@MovingWallsMy' },
      { _key: 'instagram', platform: 'instagram', url: 'https://www.instagram.com/mymovingwalls/' },
      { _key: 'facebook', platform: 'facebook', url: 'https://www.facebook.com/movingwalls/' },
    ],
    movingHeartsTitle: 'Moving Hearts',
    movingHeartsStatsValue: '3M+',
    movingHeartsStatsLabel: 'Hearts Touched',
    movingHeartsTagline: 'Making outdoor advertising a force for good',
    movingHeartsUrl: '/moving-hearts',
    movingHeartsCtaText: 'Learn More',
    legalLinks: [
      { _key: 'privacy', label: 'Privacy Policy', href: '/privacy' },
      { _key: 'terms', label: 'Terms of Service', href: '/terms' },
      { _key: 'cookies', label: 'Cookie Policy', href: '/cookies' },
    ],
    copyrightText: `© ${new Date().getFullYear()} Moving Walls. All rights reserved.`,
  };

  await client.createOrReplace(footerDoc);
  console.log('  ✅ Footer config seeded (5 nav categories, 5 social links, 3 legal links)');
}

// ============================================
// 2. TRUST BAR STATS
// ============================================
async function seedTrustBar() {
  console.log('\n📦 Seeding Trust Bar...');
  
  const trustBarDoc = {
    _id: 'trustBar',
    _type: 'trustBar',
    stats: [
      { _key: 'ooh-sites', value: '1M+', label: 'OOH Sites' },
      { _key: 'markets', value: '50+', label: 'Markets' },
      { _key: 'clients', value: '500+', label: 'Clients' },
    ],
  };

  await client.createOrReplace(trustBarDoc);
  console.log('  ✅ Trust bar seeded (3 stats)');
}

// ============================================
// 3. CLIENT PARTNERS
// ============================================
async function seedClientPartners() {
  console.log('\n📦 Seeding Client Partners...');
  
  const clientPartnersDoc = {
    _id: 'clientPartners',
    _type: 'clientPartners',
    sectionTitle: 'Trusted Partners',
    sectionDescription: 'Working with leading platforms in the OOH ecosystem',
    partners: [
      { _key: 'vistar', name: 'Vistar Media', category: 'DOOH SSP' },
      { _key: 'place-exchange', name: 'Place Exchange', category: 'OOH Marketplace' },
      { _key: 'viooh', name: 'VIOOH', category: 'Premium DOOH' },
    ],
  };

  await client.createOrReplace(clientPartnersDoc);
  console.log('  ✅ Client partners seeded (3 partners)');
}

// ============================================
// 4. OFFICE LOCATIONS
// ============================================
async function seedOffices() {
  console.log('\n📦 Seeding Office Locations...');
  
  const offices = [
    {
      _id: 'office-singapore',
      _type: 'office',
      city: 'Singapore',
      country: 'Singapore',
      type: 'headquarters',
      address: 'Far East Finance Building, #8-02, 14 Robinson Road',
      phone: '+65 8755 6364',
      flag: '🇸🇬',
      coordinates: { lat: 1.2840, lng: 103.8513 },
      timezone: 'SGT',
      workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
      isHeadquarters: true,
      order: 1,
      isActive: true,
    },
    {
      _id: 'office-kuala-lumpur',
      _type: 'office',
      city: 'Kuala Lumpur',
      country: 'Malaysia',
      type: 'regional',
      address: 'Level 8 (Zone B), Wisma Standard Chartered, Bukit Jalil',
      phone: '+60 3 7610 2044',
      flag: '🇲🇾',
      coordinates: { lat: 3.1390, lng: 101.6869 },
      timezone: 'MYT',
      workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
      isHeadquarters: false,
      order: 2,
      isActive: true,
    },
    {
      _id: 'office-manila',
      _type: 'office',
      city: 'Manila',
      country: 'Philippines',
      type: 'regional',
      address: 'Unit 1207, Capital House, 9th Avenue, Taguig',
      phone: '+63 7527 5672',
      flag: '🇵🇭',
      coordinates: { lat: 14.5176, lng: 121.0509 },
      timezone: 'PHT',
      workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
      isHeadquarters: false,
      order: 3,
      isActive: true,
    },
    {
      _id: 'office-jakarta',
      _type: 'office',
      city: 'Jakarta',
      country: 'Indonesia',
      type: 'regional',
      address: 'Nobel House, 29th Floor, Mega Kuningan',
      phone: '+62 21 3005 3540',
      flag: '🇮🇩',
      coordinates: { lat: -6.2088, lng: 106.8456 },
      timezone: 'WIB',
      workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
      isHeadquarters: false,
      order: 4,
      isActive: true,
    },
    {
      _id: 'office-colombo',
      _type: 'office',
      city: 'Colombo',
      country: 'Sri Lanka',
      type: 'regional',
      address: '07 Turnour Rd, Colombo 8',
      phone: '',
      flag: '🇱🇰',
      coordinates: { lat: 6.9271, lng: 79.8612 },
      timezone: 'IST',
      workingHours: 'Mon-Fri 9:00 AM - 6:00 PM',
      isHeadquarters: false,
      order: 5,
      isActive: true,
    },
    {
      _id: 'office-bangalore',
      _type: 'office',
      city: 'Bangalore',
      country: 'India',
      type: 'regional',
      address: 'BHIVE Workspace, Indiranagar',
      phone: '',
      flag: '🇮🇳',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      timezone: 'IST',
      workingHours: 'Mon-Fri 9:30 AM - 6:30 PM',
      isHeadquarters: false,
      order: 6,
      isActive: true,
    },
    {
      _id: 'office-mumbai',
      _type: 'office',
      city: 'Mumbai',
      country: 'India',
      type: 'regional',
      address: 'Dynasty Business Park, Andheri East',
      phone: '',
      flag: '🇮🇳',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      timezone: 'IST',
      workingHours: 'Mon-Fri 9:30 AM - 6:30 PM',
      isHeadquarters: false,
      order: 7,
      isActive: true,
    },
    {
      _id: 'office-chennai',
      _type: 'office',
      city: 'Chennai',
      country: 'India',
      type: 'regional',
      address: 'Adwave Towers, T. Nagar',
      phone: '',
      flag: '🇮🇳',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      timezone: 'IST',
      workingHours: 'Mon-Fri 9:30 AM - 6:30 PM',
      isHeadquarters: false,
      order: 8,
      isActive: true,
    },
  ];

  for (const office of offices) {
    await client.createOrReplace(office);
  }
  console.log(`  ✅ Offices seeded (${offices.length} offices)`);
}

// ============================================
// 5. AUDIENCE PAGE DEFAULTS (Brands, Agencies, Media Owners)
// ============================================
async function seedAudiencePageDefaults() {
  console.log('\n📦 Seeding Audience Page Defaults...');

  // --- BRANDS ---
  const brandsExisting = await client.fetch(`*[_type == "audiencePage" && pageType == "brands"][0]._id`);
  const brandsId = brandsExisting || 'audiencePage-brands';
  
  const brandsPatch = {
    stats: [
      { _key: 'faster', value: '10x', label: 'Faster Campaign Launch' },
      { _key: 'planning', value: '85%', label: 'Planning Time Saved' },
      { _key: 'roas', value: '3.5x', label: 'Average ROAS' },
      { _key: 'visibility', value: '100%', label: 'Campaign Visibility' },
    ],
    benefits: [
      { _key: 'workflow', title: 'Simplified Workflow', description: 'Launch campaigns in minutes, not weeks' },
      { _key: 'reach', title: 'Global Reach', description: 'Access inventory across multiple continents' },
      { _key: 'attribution', title: 'Full Attribution', description: 'Connect OOH to sales and conversions' },
      { _key: 'optimization', title: 'Real-time Optimization', description: 'Adjust campaigns based on performance data' },
    ],
    platformFeatures: [
      {
        _key: 'campaigns',
        id: 'campaigns',
        tabLabel: 'Campaign Creation',
        name: 'Campaign Creation',
        title: 'Create and Launch in Minutes',
        description: 'Turn your brief into an optimised OOH proposal instantly. Define your audience, set campaign objectives, select markets, and activate with one click.',
        features: [],
        linkHref: '/mw-planner',
        linkText: 'Learn more',
      },
      {
        _key: 'realtime',
        id: 'realtime',
        tabLabel: 'Real Time Activation',
        name: 'Real Time Activation',
        title: 'Activate Campaigns Instantly',
        description: 'Deploy your campaigns across multiple markets simultaneously with real-time activation and dynamic content updates.',
        features: [],
        linkHref: '/mw-activate',
        linkText: 'Learn more',
      },
      {
        _key: 'measurement',
        id: 'measurement',
        tabLabel: 'Full Funnel Measurement',
        name: 'Full Funnel Measurement',
        title: 'Measure Every Impact',
        description: 'Track awareness, consideration, and conversion with comprehensive measurement tools that connect OOH exposure to business outcomes.',
        features: [],
        linkHref: '/mw-measure',
        linkText: 'Learn more',
      },
    ],
    faqs: [
      { _key: 'faq1', question: 'How quickly can I launch my first campaign?', answer: 'Most brands launch their first campaign within 24-48 hours. Our platform streamlines the entire process from planning to activation, eliminating the typical weeks-long setup time.' },
      { _key: 'faq2', question: "What's the minimum budget required?", answer: 'We work with brands of all sizes. Campaigns can start from as low as $5,000, making premium OOH advertising accessible to emerging brands and enterprises alike.' },
      { _key: 'faq3', question: 'Do you support international campaigns?', answer: 'Yes! We have inventory in 180+ countries across 2,500+ cities. Our platform makes it easy to launch and manage multi-market campaigns from a single dashboard.' },
      { _key: 'faq4', question: 'How do you measure campaign performance?', answer: 'We provide real-time analytics including impressions, reach, frequency, attribution tracking, and foot traffic lift. Our MW Measure platform integrates with your existing analytics tools for comprehensive reporting.' },
      { _key: 'faq5', question: 'Can I integrate Moving Walls with my existing marketing stack?', answer: 'Absolutely. We offer integrations with major CRM, DSP, analytics, and creative platforms. Our API also allows for custom integrations with your proprietary systems.' },
    ],
    trustBarTitle: 'Trusted by leading brands worldwide',
    customerLogos: [
      { _key: 'coca-cola', name: 'Coca-Cola' },
      { _key: 'mcdonalds', name: "McDonald's" },
      { _key: 'samsung', name: 'Samsung' },
      { _key: 'netflix', name: 'Netflix' },
      { _key: 'dell', name: 'Dell' },
      { _key: 'bosch', name: 'Bosch' },
      { _key: 'loreal', name: "L'Oreal Paris" },
      { _key: 'sunsilk', name: 'Sunsilk' },
      { _key: 'airasia', name: 'AirAsia' },
      { _key: 'grab', name: 'Grab' },
      { _key: 'foodpanda', name: 'Foodpanda' },
      { _key: 'lalamove', name: 'Lalamove' },
      { _key: 'hbo-go', name: 'HBO Go' },
      { _key: 'astro', name: 'Astro' },
      { _key: 'gamuda', name: 'Gamuda' },
      { _key: 'laguna', name: 'Laguna' },
      { _key: 'seaoil', name: 'SeaOil' },
      { _key: 'fair-price', name: 'Fair Price' },
    ],
    journeyTitle: 'Your Journey with Moving Walls',
    journeySubtitle: 'Create. Execute. Measure. A seamless journey from brief to results.',
    journeySteps: [
      { _key: 'step1', stepLabel: 'Step 1', stepName: 'Create', description: 'Go from concept to live without operational drag.', items: ['Define your audience', 'Set objectives', 'Receive optimised inventory recommendations', 'Launch instantly'] },
      { _key: 'step2', stepLabel: 'Step 2', stepName: 'Execute', description: 'Outdoor becomes responsive, not static.', items: ['Monitor campaigns in real time', 'Adjust placements dynamically', 'Optimise creative and locations', 'Track performance live'] },
      { _key: 'step3', stepLabel: 'Step 3', stepName: 'Measure', description: 'Full transparency from impression to outcome.', items: ['Transparent impression tracking', 'Footfall uplift measurement', 'Attribution insights', 'Clear ROI reporting'] },
    ],
  };

  if (brandsExisting) {
    await client.patch(brandsId).set(brandsPatch).commit();
    console.log('  ✅ Brands audience page updated with defaults');
  } else {
    await client.create({
      _id: brandsId,
      _type: 'audiencePage',
      pageType: 'brands',
      title: 'OOH Advertising',
      titleHighlight: 'Made Simple',
      subtitle: 'Launch measurable outdoor campaigns across cities and continents from one connected platform. From brief to live in minutes. From impression to impact with clarity.',
      primaryCTA: { text: 'Get A Demo', link: '/contact' },
      secondaryCTA: { text: 'Learn More', link: '#features' },
      ...brandsPatch,
    });
    console.log('  ✅ Brands audience page created with full defaults');
  }

  // --- AGENCIES ---
  const agenciesExisting = await client.fetch(`*[_type == "audiencePage" && pageType == "agencies"][0]._id`);
  const agenciesId = agenciesExisting || 'audiencePage-agencies';

  const agenciesPatch = {
    stats: [
      { _key: 'sites', value: '500K+', label: 'OOH Sites Globally' },
      { _key: 'markets', value: '30+', label: 'Markets Covered' },
      { _key: 'partners', value: '100+', label: 'Agency Partners' },
      { _key: 'support', value: '24/7', label: 'Expert Support' },
    ],
    benefits: [
      { _key: 'inventory', title: 'Global Inventory Access', description: 'Access OOH inventory across multiple markets from a single platform' },
      { _key: 'white-label', title: 'White Label Solution', description: 'Present the platform under your own brand identity' },
      { _key: 'analytics', title: 'Real-time Analytics', description: 'Track campaign performance with live reporting dashboards' },
      { _key: 'planning', title: 'Intelligent Planning', description: 'AI-powered recommendations for optimal media mix' },
    ],
    platformFeatures: [
      {
        _key: 'planning',
        id: 'planning',
        tabLabel: 'Planning',
        name: 'Planning',
        title: 'Customisable Planning',
        description: 'Our planning tool integrates with your current workflows with custom audiences, site scores, and negotiation features.',
        features: [],
        linkHref: '/mw-planner',
        linkText: 'Learn more',
      },
      {
        _key: 'reach',
        id: 'reach',
        tabLabel: 'Extended Reach',
        name: 'Extended Reach',
        title: 'Integrated Planning',
        description: 'Extend OOH planning to mobile platforms and extract audience lists for retargeting.',
        features: [],
        linkHref: '/mw-reach',
        linkText: 'Learn more',
      },
      {
        _key: 'support',
        id: 'support',
        tabLabel: 'Support',
        name: 'Support',
        title: 'Live Support',
        description: 'Our platform provides live support from OOH experts readily available for inquiries.',
        features: [],
        linkHref: '/contact',
        linkText: 'Contact us',
      },
    ],
    faqs: [
      { _key: 'faq1', question: 'How does white labeling work?', answer: 'You can customize the platform with your agency\'s branding, including logo, colors, and domain name.' },
      { _key: 'faq2', question: 'What markets are available?', answer: 'We cover 30+ markets across Asia Pacific, Europe, Middle East, and the Americas.' },
      { _key: 'faq3', question: 'Is training provided?', answer: 'Yes, we provide comprehensive onboarding and ongoing training for your team.' },
    ],
    trustBarTitle: 'Trusted by leading agencies worldwide',
    customerLogos: [
      { _key: 'coca-cola', name: 'Coca-Cola' },
      { _key: 'mcdonalds', name: "McDonald's" },
      { _key: 'samsung', name: 'Samsung' },
      { _key: 'netflix', name: 'Netflix' },
      { _key: 'dell', name: 'Dell' },
      { _key: 'bosch', name: 'Bosch' },
      { _key: 'loreal', name: "L'Oreal Paris" },
      { _key: 'sunsilk', name: 'Sunsilk' },
      { _key: 'airasia', name: 'AirAsia' },
      { _key: 'grab', name: 'Grab' },
      { _key: 'foodpanda', name: 'Foodpanda' },
      { _key: 'lalamove', name: 'Lalamove' },
      { _key: 'hbo-go', name: 'HBO Go' },
      { _key: 'astro', name: 'Astro' },
      { _key: 'gamuda', name: 'Gamuda' },
      { _key: 'laguna', name: 'Laguna' },
      { _key: 'seaoil', name: 'SeaOil' },
      { _key: 'fair-price', name: 'Fair Price' },
    ],
    journeyTitle: 'Scale Your Agency with Moving Walls',
    journeySubtitle: 'Plan. Execute. Report. Full campaign lifecycle management.',
    journeySteps: [
      { _key: 'step1', stepLabel: 'Step 1', stepName: 'Plan', description: 'Access global inventory and build proposals fast.', items: ['Access global inventory', 'Build proposals fast', 'Custom audience targeting', 'Smart recommendations'] },
      { _key: 'step2', stepLabel: 'Step 2', stepName: 'Execute', description: 'Manage multi-market campaigns from one dashboard.', items: ['Multi-market activation', 'Real-time monitoring', 'Dynamic optimization', 'White-label delivery'] },
      { _key: 'step3', stepLabel: 'Step 3', stepName: 'Report', description: 'Deliver comprehensive campaign reports to clients.', items: ['Branded reporting', 'Cross-market analytics', 'Footfall measurement', 'ROI attribution'] },
    ],
  };

  if (agenciesExisting) {
    await client.patch(agenciesId).set(agenciesPatch).commit();
    console.log('  ✅ Agencies audience page updated with defaults');
  } else {
    await client.create({
      _id: agenciesId,
      _type: 'audiencePage',
      pageType: 'agencies',
      title: 'White Label OOH Platform',
      titleHighlight: 'Built for Agencies',
      subtitle: 'Offer your clients a complete out of home solution under your own brand. Moving Walls gives you global inventory, intelligent campaign planning, and real-time analytics that help your agency act faster, plan smarter, and deliver measurable results.',
      primaryCTA: { text: 'Become a Partner', link: '/contact' },
      secondaryCTA: { text: 'Watch Demo', link: '#platform' },
      ...agenciesPatch,
    });
    console.log('  ✅ Agencies audience page created with full defaults');
  }

  // --- MEDIA OWNERS ---
  const moExisting = await client.fetch(`*[_type == "audiencePage" && pageType == "media-owners"][0]._id`);
  const moId = moExisting || 'audiencePage-media-owners';

  const moPatch = {
    stats: [
      { _key: 'revenue', value: '40%', label: 'Revenue Increase' },
      { _key: 'fill', value: '90%', label: 'Fill Rate' },
      { _key: 'ops', value: '50%', label: 'Ops Time Saved' },
      { _key: 'advertisers', value: '1000+', label: 'Active Advertisers' },
    ],
    benefits: [
      { _key: 'fill-rates', title: 'Increased Fill Rates', description: 'Connect to more demand sources and reduce unsold inventory' },
      { _key: 'pricing', title: 'Dynamic Pricing', description: 'Optimize pricing based on demand and market conditions' },
      { _key: 'automation', title: 'Automated Operations', description: 'Reduce manual work with automated booking and scheduling' },
      { _key: 'demand', title: 'Premium Demand Access', description: 'Connect directly with agency and brand advertisers' },
    ],
    platformFeatures: [
      {
        _key: 'marketplace',
        id: 'marketplace',
        tabLabel: 'Marketplace',
        name: 'Marketplace',
        title: 'Connect to Premium Demand',
        description: 'Connect your OOH inventory to an integrated demand marketplace designed for media owners.',
        features: [],
        linkHref: '/mw-market',
        linkText: 'Learn more',
      },
      {
        _key: 'inventory',
        id: 'inventory',
        tabLabel: 'Inventory',
        name: 'Inventory',
        title: 'Manage Your Assets',
        description: 'Centralize all your OOH assets in one platform. Track availability, manage bookings, and optimize inventory.',
        features: [],
        linkHref: '/products',
        linkText: 'Learn more',
      },
      {
        _key: 'yield',
        id: 'yield',
        tabLabel: 'Yield',
        name: 'Yield',
        title: 'Maximize Revenue',
        description: 'Use dynamic pricing and yield optimization tools to maximize the value of every screen.',
        features: [],
        linkHref: '/products',
        linkText: 'Learn more',
      },
    ],
    faqs: [
      { _key: 'faq1', question: 'How do I connect my inventory?', answer: 'We provide API integration and manual upload options. Our team will help you onboard your entire network.' },
      { _key: 'faq2', question: 'What pricing models are supported?', answer: 'We support CPM, fixed rate, share of voice, and custom pricing models.' },
      { _key: 'faq3', question: 'Can I maintain direct sales relationships?', answer: 'Absolutely. Our platform complements your direct sales with additional demand sources.' },
    ],
    trustBarTitle: 'Trusted by leading media owners worldwide',
    customerLogos: [
      { _key: 'coca-cola', name: 'Coca-Cola' },
      { _key: 'mcdonalds', name: "McDonald's" },
      { _key: 'samsung', name: 'Samsung' },
      { _key: 'netflix', name: 'Netflix' },
      { _key: 'dell', name: 'Dell' },
      { _key: 'bosch', name: 'Bosch' },
      { _key: 'loreal', name: "L'Oreal Paris" },
      { _key: 'sunsilk', name: 'Sunsilk' },
      { _key: 'airasia', name: 'AirAsia' },
      { _key: 'grab', name: 'Grab' },
      { _key: 'foodpanda', name: 'Foodpanda' },
      { _key: 'lalamove', name: 'Lalamove' },
      { _key: 'hbo-go', name: 'HBO Go' },
      { _key: 'astro', name: 'Astro' },
      { _key: 'gamuda', name: 'Gamuda' },
      { _key: 'laguna', name: 'Laguna' },
      { _key: 'seaoil', name: 'SeaOil' },
      { _key: 'fair-price', name: 'Fair Price' },
    ],
    journeyTitle: 'Monetize with Moving Walls',
    journeySubtitle: 'List. Connect. Earn. A seamless path to higher revenue.',
    journeySteps: [
      { _key: 'step1', stepLabel: 'Step 1', stepName: 'List', description: 'Digitize and list your inventory.', items: ['Upload inventory details', 'Set availability', 'Define pricing models', 'Add rich media previews'] },
      { _key: 'step2', stepLabel: 'Step 2', stepName: 'Connect', description: 'Reach premium demand partners.', items: ['Access programmatic demand', 'Connect with agencies', 'Automated matching', 'Real-time bidding'] },
      { _key: 'step3', stepLabel: 'Step 3', stepName: 'Earn', description: 'Maximize yield and grow revenue.', items: ['Dynamic pricing', 'Fill rate optimization', 'Revenue analytics', 'Automated invoicing'] },
    ],
  };

  if (moExisting) {
    await client.patch(moId).set(moPatch).commit();
    console.log('  ✅ Media Owners audience page updated with defaults');
  } else {
    await client.create({
      _id: moId,
      _type: 'audiencePage',
      pageType: 'media-owners',
      title: 'Monetize Your OOH Inventory',
      titleHighlight: 'Smarter',
      subtitle: 'Turn your screens into a high-performing revenue engine. Connect to premium advertisers, optimize pricing dynamically, and automate your entire OOH sales operation so your team can focus on growth instead of repetitive tasks.',
      primaryCTA: { text: 'Join Our Network', link: '/contact' },
      secondaryCTA: { text: 'Learn More', link: '#platform' },
      ...moPatch,
    });
    console.log('  ✅ Media Owners audience page created with full defaults');
  }
}

// ============================================
// 6. HELP CENTER FAQs
// ============================================
async function seedHelpCenterFaqs() {
  console.log('\n📦 Seeding Help Center FAQs...');
  
  const existing = await client.fetch(`count(*[_type == "helpCenterFaq"])`);
  if (existing > 0) {
    console.log(`  ⏭️  ${existing} help center FAQs already exist, skipping`);
    return;
  }

  const faqs = [
    { _id: 'hc-faq-1', _type: 'helpCenterFaq', category: 'Getting Started', question: 'How do I create my first campaign?', answer: "Navigate to the MW Planner dashboard, click 'New Campaign', and follow the step-by-step wizard to set up your campaign objectives, budget, targeting, and creative assets.", order: 1, isPublished: true },
    { _id: 'hc-faq-2', _type: 'helpCenterFaq', category: 'Getting Started', question: 'What are the system requirements?', answer: 'Moving Walls platform works on all modern browsers (Chrome, Firefox, Safari, Edge). We recommend using the latest browser version for optimal performance.', order: 2, isPublished: true },
    { _id: 'hc-faq-3', _type: 'helpCenterFaq', category: 'Account & Billing', question: 'How does billing work?', answer: "Billing is based on your campaign spend and platform usage. You'll receive monthly invoices with detailed breakdowns of all charges. Payment methods include credit card, wire transfer, and ACH.", order: 3, isPublished: true },
    { _id: 'hc-faq-4', _type: 'helpCenterFaq', category: 'Account & Billing', question: 'Can I change my subscription plan?', answer: 'Yes, you can upgrade or downgrade your plan at any time from the Account Settings page. Changes take effect at the start of your next billing cycle.', order: 4, isPublished: true },
    { _id: 'hc-faq-5', _type: 'helpCenterFaq', category: 'Platform Features', question: 'How do I set up geo-targeting?', answer: "In MW Reach, select the 'Location Targeting' option and either draw custom shapes on the map, upload location lists, or use predefined market areas (DMAs). You can also set radius targeting around specific addresses.", order: 5, isPublished: true },
    { _id: 'hc-faq-6', _type: 'helpCenterFaq', category: 'Platform Features', question: 'What analytics are available?', answer: 'MW Measure provides real-time analytics including impressions, reach, frequency, CTR, conversions, and ROI. You can create custom dashboards and schedule automated reports.', order: 6, isPublished: true },
    { _id: 'hc-faq-7', _type: 'helpCenterFaq', category: 'Troubleshooting', question: "Why isn't my campaign delivering?", answer: "Check your campaign status, budget availability, targeting settings, and creative approvals. Ensure your bid strategy is competitive and your audience isn't too narrow.", order: 7, isPublished: true },
    { _id: 'hc-faq-8', _type: 'helpCenterFaq', category: 'Troubleshooting', question: 'How do I reset my password?', answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your inbox to reset your password.", order: 8, isPublished: true },
    { _id: 'hc-faq-9', _type: 'helpCenterFaq', category: 'Integrations', question: 'What third-party integrations are supported?', answer: 'We integrate with major platforms including Google Analytics, Adobe Analytics, Salesforce, HubSpot, and various DSPs. Visit our Documentation page for the complete list and setup guides.', order: 9, isPublished: true },
    { _id: 'hc-faq-10', _type: 'helpCenterFaq', category: 'Integrations', question: 'How do I connect my CRM?', answer: 'Go to Settings > Integrations, select your CRM provider, and follow the OAuth authentication flow. Once connected, you can sync lead data automatically.', order: 10, isPublished: true },
  ];

  for (const faq of faqs) {
    await client.createOrReplace(faq);
  }
  console.log(`  ✅ Help Center FAQs seeded (${faqs.length} items)`);
}

// ============================================
// 7. DOCUMENTATION PAGE
// ============================================
async function seedDocumentationPage() {
  console.log('\n📦 Seeding Documentation Page...');

  const existing = await client.fetch(`*[_type == "apiReferencePage"][0]._id`);
  if (existing) {
    console.log('  ⏭️  API Reference Page already exists, skipping');
    return;
  }

  const docPage = {
    _id: 'documentationPage',
    _type: 'apiReferencePage',
    title: 'Documentation & Technical Guides',
    subtitle: 'Comprehensive guides and technical documentation for the Moving Walls platform.',
    endpoints: [
      { _key: 'ep1', method: 'GET', endpoint: '/api/v1/campaigns', description: 'List all campaigns', params: ['page', 'limit', 'status'] },
      { _key: 'ep2', method: 'POST', endpoint: '/api/v1/campaigns', description: 'Create a new campaign', params: ['name', 'budget', 'startDate', 'endDate'] },
      { _key: 'ep3', method: 'GET', endpoint: '/api/v1/inventory', description: 'Search available inventory', params: ['market', 'format', 'audience'] },
      { _key: 'ep4', method: 'GET', endpoint: '/api/v1/analytics', description: 'Get campaign analytics', params: ['campaignId', 'dateRange', 'metrics'] },
      { _key: 'ep5', method: 'PUT', endpoint: '/api/v1/campaigns/:id', description: 'Update campaign settings', params: ['budget', 'targeting', 'creative'] },
      { _key: 'ep6', method: 'DELETE', endpoint: '/api/v1/campaigns/:id', description: 'Archive a campaign', params: [] },
    ],
    sdks: [
      { _key: 'sdk1', name: 'Python SDK', language: 'Python', installCommand: 'pip install moving-walls', docsUrl: 'https://docs.movingwalls.com/python' },
      { _key: 'sdk2', name: 'Node.js SDK', language: 'JavaScript', installCommand: 'npm install @moving-walls/sdk', docsUrl: 'https://docs.movingwalls.com/node' },
      { _key: 'sdk3', name: 'Java SDK', language: 'Java', installCommand: 'com.movingwalls:sdk:1.0.0', docsUrl: 'https://docs.movingwalls.com/java' },
    ],
    ctaTitle: 'Need More Help?',
  };

  await client.createOrReplace(docPage);
  console.log('  ✅ Documentation page seeded (6 endpoints, 3 SDKs)');
}

// ============================================
// RUN ALL
// ============================================
async function main() {
  console.log('🚀 Starting comprehensive CMS data seeding...\n');
  
  try {
    await seedFooterConfig();
    await seedTrustBar();
    await seedClientPartners();
    await seedOffices();
    await seedAudiencePageDefaults();
    await seedHelpCenterFaqs();
    await seedDocumentationPage();
    
    console.log('\n✅ All CMS data seeded successfully!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
