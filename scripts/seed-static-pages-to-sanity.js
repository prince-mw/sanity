const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// ============================================
// LANDING PAGES
// ============================================
const landingPages = [
  {
    _type: 'landingPage',
    title: 'Series C Funding Announcement',
    slug: { _type: 'slug', current: 'series-c-funding' },
    seoTitle: 'MovingWalls Series C Funding | $30M Investment Round',
    seoDescription: 'MovingWalls announces $30M Series C funding to accelerate global expansion and product innovation.',
    sections: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'MovingWalls Raises $30M Series C',
        subheading: 'Accelerating the future of programmatic out-of-home advertising with strategic investment from leading global investors.',
        ctaText: 'Read the Full Story',
        ctaLink: '/press-news',
      },
    ],
  },
  {
    _type: 'landingPage',
    title: 'Transit Partnership Program',
    slug: { _type: 'slug', current: 'transit-partnership' },
    seoTitle: 'Transit Partnership | MovingWalls',
    seoDescription: 'Partner with MovingWalls to monetize your transit advertising inventory with programmatic technology.',
    sections: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Transit Advertising Partnership',
        subheading: 'Transform your transit network into a premium programmatic advertising channel.',
        ctaText: 'Become a Partner',
        ctaLink: '/contact',
      },
    ],
  },
  {
    _type: 'landingPage',
    title: 'Privacy-First Measurement',
    slug: { _type: 'slug', current: 'privacy-first-measurement' },
    seoTitle: 'Privacy-First OOH Measurement | MovingWalls',
    seoDescription: 'Learn how MovingWalls delivers accurate audience measurement while respecting consumer privacy.',
    sections: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Privacy-First Measurement',
        subheading: 'Accurate audience insights without compromising consumer privacy. Our multi-signal approach delivers verified reach and attribution.',
        ctaText: 'Learn More',
        ctaLink: '/mw-measure',
      },
    ],
  },
  {
    _type: 'landingPage',
    title: 'AI-Powered Audience Targeting',
    slug: { _type: 'slug', current: 'ai-powered-audience-targeting' },
    seoTitle: 'AI Audience Targeting for OOH | MovingWalls',
    seoDescription: 'Leverage AI and machine learning to reach the right audiences at the right moments with precision OOH targeting.',
    sections: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'AI-Powered Audience Targeting',
        subheading: 'Machine learning models analyze movement patterns, behaviors, and contextual signals to deliver precision targeting at scale.',
        ctaText: 'Explore MW Science',
        ctaLink: '/mw-science',
      },
    ],
  },
  {
    _type: 'landingPage',
    title: 'AdTech Company of the Year',
    slug: { _type: 'slug', current: 'adtech-company-of-year' },
    seoTitle: 'AdTech Company of the Year | MovingWalls',
    seoDescription: 'MovingWalls recognized as AdTech Company of the Year for innovation in programmatic OOH advertising.',
    sections: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'AdTech Company of the Year',
        subheading: 'Recognized for pioneering innovation in programmatic out-of-home advertising technology.',
        ctaText: 'Our Story',
        ctaLink: '/our-story',
      },
    ],
  },
  {
    _type: 'landingPage',
    title: 'London Headquarters',
    slug: { _type: 'slug', current: 'london-headquarters' },
    seoTitle: 'London Office | MovingWalls UK',
    seoDescription: 'Visit MovingWalls London headquarters - our European hub for programmatic OOH solutions.',
    sections: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'MovingWalls London',
        subheading: 'Our European headquarters, serving brands and agencies across the UK and EMEA region.',
        ctaText: 'Contact Us',
        ctaLink: '/contact',
      },
    ],
  },
]

// ============================================
// AUDIENCE PAGES
// ============================================
const audiencePages = [
  {
    _type: 'audiencePage',
    pageType: 'agencies',
    title: 'White Label OOH Platform',
    titleHighlight: 'Built for Agencies',
    subtitle: 'Offer your clients a complete out of home solution under your own brand. MovingWalls gives you global inventory, intelligent campaign planning, and real-time analytics that help your agency act faster, plan smarter, and deliver measurable results.',
    ctaPrimary: 'Become a Partner',
    ctaPrimaryLink: '/contact',
    ctaSecondary: 'Watch Demo',
    ctaSecondaryLink: '#platform',
    platformFeatures: [
      { _key: 'pf1', id: 'planning', title: 'Campaign Planning', description: 'Plan multi-market OOH campaigns with AI-powered recommendations', icon: 'planning', features: ['Global inventory access', 'Audience targeting', 'Budget optimization', 'POI integration'] },
      { _key: 'pf2', id: 'activation', title: 'Programmatic Activation', description: 'Activate campaigns across digital OOH screens in real-time', icon: 'activation', features: ['Real-time bidding', 'Dynamic creative', 'Weather triggers', 'Dayparting'] },
      { _key: 'pf3', id: 'measurement', title: 'Campaign Measurement', description: 'Track verified impressions and business outcomes', icon: 'measurement', features: ['Verified reach', 'Attribution', 'Brand lift', 'Footfall tracking'] },
    ],
    benefits: [
      { _key: 'b1', title: 'White Label Platform', description: 'Your brand, your platform - fully customizable interface', icon: 'brand' },
      { _key: 'b2', title: 'Global Inventory', description: 'Access 100K+ screens across 50+ countries', icon: 'globe' },
      { _key: 'b3', title: 'Margin Control', description: 'Set your own markups and manage profitability', icon: 'money' },
      { _key: 'b4', title: 'Client Reporting', description: 'Automated reports with your branding', icon: 'report' },
    ],
    stats: [
      { _key: 's1', value: '100K+', label: 'OOH Screens' },
      { _key: 's2', value: '50+', label: 'Countries' },
      { _key: 's3', value: '500+', label: 'Agency Partners' },
      { _key: 's4', value: '10B+', label: 'Daily Impressions' },
    ],
    faqs: [
      { _key: 'f1', question: 'How does the white label solution work?', answer: 'Our platform can be fully branded with your agency identity, including custom domains, logos, and color schemes. Your clients see only your brand.' },
      { _key: 'f2', question: 'What inventory is available?', answer: 'Access over 100,000 digital and traditional OOH screens across 50+ countries, including premium networks from VIOOH, Magnite, and more.' },
      { _key: 'f3', question: 'How do you handle billing?', answer: 'You set your own markups and manage client billing. We handle media owner payments, giving you full margin control.' },
    ],
  },
  {
    _type: 'audiencePage',
    pageType: 'brands',
    title: 'OOH Advertising',
    titleHighlight: 'Made Simple',
    subtitle: 'Launch measurable outdoor campaigns across cities and continents from one connected platform. From brief to live in minutes. From impression to impact with clarity.',
    ctaPrimary: 'Get A Demo',
    ctaPrimaryLink: '/contact',
    ctaSecondary: 'Learn More',
    ctaSecondaryLink: '#features',
    platformFeatures: [
      { _key: 'pf1', id: 'campaigns', title: 'Campaign Management', description: 'Plan, launch, and optimize OOH campaigns from one dashboard', icon: 'campaigns', features: ['Self-service booking', 'Real-time optimization', 'Budget management', 'Creative tools'] },
      { _key: 'pf2', id: 'targeting', title: 'Audience Targeting', description: 'Reach the right people at the right moments', icon: 'targeting', features: ['Behavioral targeting', 'Contextual triggers', 'Location intelligence', 'Custom audiences'] },
      { _key: 'pf3', id: 'analytics', title: 'Performance Analytics', description: 'Measure real business outcomes from OOH', icon: 'analytics', features: ['Verified impressions', 'Store visits', 'Brand lift', 'Sales attribution'] },
    ],
    benefits: [
      { _key: 'b1', title: 'Global Reach', description: 'One platform for OOH campaigns across 50+ countries', icon: 'globe' },
      { _key: 'b2', title: 'Measurable Results', description: 'Track impressions to outcomes with verified data', icon: 'chart' },
      { _key: 'b3', title: 'Speed to Market', description: 'Go from brief to live campaign in minutes', icon: 'speed' },
      { _key: 'b4', title: 'Full Transparency', description: 'See exactly where your ads run and who sees them', icon: 'eye' },
    ],
    stats: [
      { _key: 's1', value: '500+', label: 'Brand Clients' },
      { _key: 's2', value: '15B+', label: 'Monthly Impressions' },
      { _key: 's3', value: '50+', label: 'Countries' },
      { _key: 's4', value: '3.2x', label: 'Average ROAS' },
    ],
    faqs: [
      { _key: 'f1', question: 'How quickly can I launch a campaign?', answer: 'Digital OOH campaigns can go live within hours. Traditional formats typically require 48-72 hours for creative production and posting.' },
      { _key: 'f2', question: 'What is the minimum budget?', answer: 'Campaigns can start from as low as $500 for targeted local activations. Contact us for enterprise pricing.' },
      { _key: 'f3', question: 'How do you measure effectiveness?', answer: 'We use multi-signal measurement including mobile location data, traffic counters, and brand lift studies to provide verified audience reach and attribution.' },
    ],
  },
  {
    _type: 'audiencePage',
    pageType: 'media-owners',
    title: 'Monetize Your OOH Inventory',
    titleHighlight: 'Smarter',
    subtitle: 'Turn your screens into a high-performing revenue engine. Connect to premium advertisers, optimize pricing dynamically, and automate your entire OOH sales operation so your team can focus on growth instead of repetitive tasks.',
    ctaPrimary: 'Join Our Network',
    ctaPrimaryLink: '/contact',
    ctaSecondary: 'Learn More',
    ctaSecondaryLink: '#platform',
    platformFeatures: [
      { _key: 'pf1', id: 'marketplace', title: 'Programmatic Marketplace', description: 'Connect your inventory to premium demand sources', icon: 'marketplace', features: ['DSP integrations', 'Automated sales', 'Dynamic pricing', 'Fill rate optimization'] },
      { _key: 'pf2', id: 'management', title: 'Inventory Management', description: 'Manage your entire OOH network from one platform', icon: 'management', features: ['Screen monitoring', 'Content scheduling', 'Proof of play', 'Maintenance alerts'] },
      { _key: 'pf3', id: 'analytics', title: 'Revenue Analytics', description: 'Maximize yield with data-driven insights', icon: 'analytics', features: ['Revenue forecasting', 'Occupancy tracking', 'Price optimization', 'Demand trends'] },
    ],
    benefits: [
      { _key: 'b1', title: 'Increase Revenue', description: 'Average 40% revenue uplift from programmatic', icon: 'money' },
      { _key: 'b2', title: 'Premium Demand', description: 'Access to top brands and agencies globally', icon: 'premium' },
      { _key: 'b3', title: 'Automated Operations', description: 'Reduce manual work by 80% with automation', icon: 'automation' },
      { _key: 'b4', title: 'Real-Time Control', description: 'Floor prices, block lists, and content rules', icon: 'control' },
    ],
    stats: [
      { _key: 's1', value: '100K+', label: 'Connected Screens' },
      { _key: 's2', value: '40%', label: 'Average Revenue Uplift' },
      { _key: 's3', value: '200+', label: 'Media Owner Partners' },
      { _key: 's4', value: '99.9%', label: 'Platform Uptime' },
    ],
    faqs: [
      { _key: 'f1', question: 'How do I connect my inventory?', answer: 'Our technical team handles the integration. Most digital screens can be connected within 2-4 weeks through our CMS integrations or API.' },
      { _key: 'f2', question: 'Do I lose control of my inventory?', answer: 'You maintain full control. Set floor prices, create block lists, approve creatives, and prioritize direct sales over programmatic.' },
      { _key: 'f3', question: 'What are the revenue share terms?', answer: 'We operate on a transparent revenue share model. Contact us for specific terms based on your inventory volume and market.' },
    ],
  },
]

// ============================================
// INDUSTRY PAGES
// ============================================
const industryPages = [
  {
    _type: 'industryPage',
    industry: 'finance',
    slug: { _type: 'slug', current: 'finance' },
    badgeText: 'Finance & Banking',
    title: 'Build Trust &',
    titleHighlight: 'Drive Growth',
    description: 'Establish credibility and drive customer acquisition with financial advertising that builds trust and communicates reliability to your target market.',
    heroStats: {
      cardTitle: 'Financial Marketing ROI',
      metrics: [
        { value: '$4.20', label: 'return for every $1 spent on OOH' },
        { value: '68%', label: 'increase in branch visits' },
        { value: '156%', label: 'boost in brand awareness' },
      ],
    },
    benefits: [
      { _key: 'b1', title: 'Build Financial Trust', description: 'Establish credibility and reliability in financial services', icon: 'building' },
      { _key: 'b2', title: 'Drive Account Growth', description: 'Increase new account openings and customer acquisition', icon: 'chart' },
      { _key: 'b3', title: 'Target Demographics', description: 'Reach specific financial planning segments effectively', icon: 'target' },
      { _key: 'b4', title: 'Security Messaging', description: 'Communicate safety and security of financial services', icon: 'shield' },
    ],
    benefitsSectionTitle: 'Why Financial Brands Choose MovingWalls',
    benefitsSectionSubtitle: 'Build customer trust and drive business growth with advertising that communicates stability and reliability.',
    services: [
      { _key: 's1', title: 'Banking & Credit Unions', description: 'Drive branch visits and account openings with local community focus', icon: 'bank', offerings: ['Branch Promotion', 'Account Acquisition', 'Loan Services', 'Community Banking'] },
      { _key: 's2', title: 'Investment Services', description: 'Build trust for wealth management and investment advisory services', icon: 'investment', offerings: ['Wealth Management', 'Retirement Planning', 'Investment Education', 'Advisory Services'] },
      { _key: 's3', title: 'Insurance Companies', description: 'Increase policy sales and brand awareness for insurance products', icon: 'insurance', offerings: ['Life Insurance', 'Auto Insurance', 'Home Insurance', 'Business Insurance'] },
      { _key: 's4', title: 'Fintech & Digital Banking', description: 'Promote digital financial services and mobile banking solutions', icon: 'fintech', offerings: ['Mobile Banking', 'Digital Payments', 'Cryptocurrency', 'Personal Finance'] },
    ],
    trustFactors: [
      { _key: 't1', metric: '73%', description: 'of consumers trust brands with local advertising' },
      { _key: 't2', metric: '2.5x', description: 'higher consideration for financial services' },
      { _key: 't3', metric: '45%', description: 'increase in brand trust and reliability' },
      { _key: 't4', metric: '89%', description: 'recognize financial brands from OOH campaigns' },
    ],
    order: 1,
    isActive: true,
  },
  {
    _type: 'industryPage',
    industry: 'healthcare',
    slug: { _type: 'slug', current: 'healthcare' },
    badgeText: 'Healthcare Marketing',
    title: 'Connect with Patients',
    titleHighlight: 'Effectively',
    description: 'Build trust, increase awareness, and drive patient engagement with healthcare advertising that reaches your community where they live, work, and travel.',
    heroStats: {
      cardTitle: 'Healthcare Trust Metrics',
      metrics: [
        { value: '89%', label: 'trust healthcare brands with local presence' },
        { value: '65%', label: 'influenced by OOH for health decisions' },
        { value: '2.8x', label: 'higher patient acquisition rate' },
      ],
    },
    benefits: [
      { _key: 'b1', title: 'Build Patient Trust', description: 'Establish credibility and trust in your healthcare services', icon: 'heart' },
      { _key: 'b2', title: 'Local Community Focus', description: 'Connect with patients in your service area effectively', icon: 'location' },
      { _key: 'b3', title: 'Health Awareness', description: 'Educate communities about health services and prevention', icon: 'education' },
      { _key: 'b4', title: 'Emergency Services', description: 'Promote urgent care and emergency services when needed', icon: 'emergency' },
    ],
    benefitsSectionTitle: 'Why Healthcare Providers Choose MovingWalls',
    benefitsSectionSubtitle: 'Build community trust and patient relationships with sensitive, effective healthcare advertising.',
    services: [
      { _key: 's1', title: 'Hospital & Health Systems', description: 'Build community trust and drive patient acquisition for health systems', icon: 'hospital', offerings: ['Brand Awareness', 'Service Promotion', 'Community Outreach', 'Emergency Care'] },
      { _key: 's2', title: 'Specialist Practices', description: 'Increase referrals and direct patient visits for specialized healthcare', icon: 'specialist', offerings: ['Specialist Referrals', 'Direct Patient Marketing', 'Condition Awareness', 'Treatment Education'] },
      { _key: 's3', title: 'Wellness & Prevention', description: 'Promote preventive care and wellness programs to improve community health', icon: 'wellness', offerings: ['Vaccination Campaigns', 'Screening Programs', 'Wellness Education', 'Lifestyle Programs'] },
    ],
    order: 2,
    isActive: true,
  },
  {
    _type: 'industryPage',
    industry: 'retail',
    slug: { _type: 'slug', current: 'retail' },
    badgeText: 'Retail & E-commerce',
    title: 'Drive Foot Traffic &',
    titleHighlight: 'Boost Sales',
    description: 'Transform your retail advertising with strategic out-of-home campaigns that connect with shoppers at the right moment, driving them from awareness to your store entrance.',
    heroStats: {
      cardTitle: 'Campaign Impact',
      metrics: [
        { value: '45%', label: 'Foot Traffic Increase' },
        { value: '32%', label: 'Sales Boost' },
        { value: '28%', label: 'Awareness Growth' },
      ],
    },
    benefits: [
      { _key: 'b1', title: 'Increase Foot Traffic', description: 'Drive more customers to your physical locations with targeted OOH campaigns', icon: 'footfall' },
      { _key: 'b2', title: 'Boost Sales', description: 'Convert awareness into purchases with strategic placement and timing', icon: 'sales' },
      { _key: 'b3', title: 'Target Shoppers', description: 'Reach customers when they are in shopping mode near retail locations', icon: 'target' },
      { _key: 'b4', title: 'Omnichannel Integration', description: 'Connect offline advertising with online experiences seamlessly', icon: 'omnichannel' },
    ],
    benefitsSectionTitle: 'Why Retailers Choose MovingWalls',
    benefitsSectionSubtitle: 'Drive measurable foot traffic and sales with data-driven OOH advertising.',
    services: [
      { _key: 's1', title: 'Fashion & Apparel', description: 'Seasonal campaigns and new collection launches', icon: 'fashion', offerings: ['Seasonal Campaigns', 'Collection Launches', 'Store Openings', 'Sale Events'] },
      { _key: 's2', title: 'Electronics & Tech', description: 'Product launches and retail promotions', icon: 'electronics', offerings: ['Product Launches', 'Retail Promotions', 'Brand Awareness', 'Store Traffic'] },
      { _key: 's3', title: 'Grocery & FMCG', description: 'Drive purchase consideration near point of sale', icon: 'grocery', offerings: ['Product Awareness', 'Store Proximity', 'Promotional Campaigns', 'Brand Building'] },
    ],
    caseStudies: [
      { _key: 'c1', brand: 'Fashion Retailer', metric: '45% increase', description: 'in store visits during campaign period' },
      { _key: 'c2', brand: 'Electronics Chain', metric: '32% boost', description: 'in weekend sales with targeted mall advertising' },
      { _key: 'c3', brand: 'Home Goods Store', metric: '28% growth', description: 'in brand awareness among target demographics' },
    ],
    order: 3,
    isActive: true,
  },
]

// ============================================
// INTEGRATIONS
// ============================================
const integrations = [
  {
    _type: 'integration',
    name: 'VIOOH',
    slug: { _type: 'slug', current: 'viooh' },
    category: 'ssp',
    description: 'Premium programmatic digital out-of-home (pDOOH) marketplace enabling automated trading of OOH inventory globally.',
    logoUrl: '/assets/images/integrations/viooh.svg',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Programmatic DOOH', 'Real-time bidding', 'Global inventory', 'Audience targeting'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    order: 1,
    isFeatured: true,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Display & Video 360',
    slug: { _type: 'slug', current: 'dv360' },
    category: 'ssp',
    description: "Google's enterprise demand-side platform for programmatic display, video, and connected TV advertising.",
    logoUrl: '/assets/images/integrations/dv360.svg',
    products: ['MW Planner', 'MW Measure', 'MW Activate', 'MW Marketplace'],
    features: ['Programmatic guaranteed', 'Custom bidding', 'Audience activation', 'Cross-device'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    order: 2,
    isFeatured: true,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Magnite',
    slug: { _type: 'slug', current: 'magnite' },
    category: 'ssp',
    description: "The world's largest independent sell-side advertising company, powering premium programmatic OOH and CTV.",
    logoUrl: '/assets/images/integrations/magnite.svg',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Header bidding', 'CTV/OTT', 'Audience segments', 'Deal management'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    order: 3,
    isFeatured: true,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Google Ad Manager 360',
    slug: { _type: 'slug', current: 'google-ad-manager-360' },
    category: 'ssp',
    description: 'Enterprise ad serving platform with advanced forecasting, yield management, and programmatic access.',
    logoUrl: '/assets/images/integrations/google-ad-manager-360.svg',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Yield optimization', 'Programmatic deals', 'Forecasting', 'Multi-format'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    order: 4,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'The Trade Desk',
    slug: { _type: 'slug', current: 'the-trade-desk' },
    category: 'dsp',
    description: 'The leading independent DSP for omnichannel programmatic advertising with Unified ID 2.0.',
    logoUrl: '/assets/images/integrations/the-trade-desk.svg',
    products: ['MW Planner', 'MW Measure', 'MW Activate', 'MW Marketplace'],
    features: ['Unified ID 2.0', 'Kokai AI', 'CTV/OTT', 'Retail media'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    order: 5,
    isFeatured: true,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'StackAdapt',
    slug: { _type: 'slug', current: 'stackadapt' },
    category: 'dsp',
    description: 'Multi-channel programmatic advertising platform with native, display, video, CTV, and DOOH capabilities.',
    logoUrl: '/assets/images/integrations/stackadapt.svg',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Multi-channel', 'Native ads', 'Contextual targeting', 'Custom audiences'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    order: 6,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Amobee',
    slug: { _type: 'slug', current: 'amobee' },
    category: 'dsp',
    description: 'End-to-end advertising platform for planning, activation, and optimization across all channels.',
    logoUrl: '/assets/images/integrations/amobee.svg',
    products: ['MW Planner', 'MW Activate'],
    features: ['Cross-channel', 'Brand intelligence', 'TV planning', 'Audience analytics'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    order: 7,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Hivestack',
    slug: { _type: 'slug', current: 'hivestack' },
    category: 'dsp',
    description: 'Full-stack programmatic digital OOH platform enabling buying and selling of DOOH inventory.',
    logoUrl: '/assets/images/integrations/hivestack.svg',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Programmatic DOOH', 'Supply-side platform', 'Demand-side platform', 'Real-time analytics'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    order: 8,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Place Exchange',
    slug: { _type: 'slug', current: 'place-exchange' },
    category: 'dsp',
    description: 'Programmatic OOH platform connecting premium inventory with leading demand sources.',
    logoUrl: '/assets/images/integrations/place-exchange.svg',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Premium inventory', 'Private marketplace', 'Audience targeting', 'Attribution'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    order: 9,
    isActive: true,
  },
]

// ============================================
// OOH FORMATS
// ============================================
const oohFormats = [
  {
    _type: 'oohFormat',
    name: 'Unipole',
    slug: { _type: 'slug', current: 'unipole' },
    category: 'dooh',
    icon: 'digital',
    shortDescription: 'The most popular DOOH format, Unipoles are found along high-traffic roads where a large screen is attached to a tall pole for maximum visibility.',
    longDescription: 'Unipoles represent one of the most effective and popular DOOH formats in outdoor advertising. Strategically positioned along high-traffic roads and highways, these towering displays feature large screens attached to tall poles, ensuring maximum visibility from great distances.',
    specs: ['Height: 40-100+ feet', 'Screen Size: 14\' x 48\' typical', 'LED/Digital display options', '360° visibility models', 'High-traffic road locations', 'Illuminated day and night'],
    benefits: ['Maximum highway visibility', 'Commuter-focused targeting', 'Impossible to miss', 'Premium road locations', 'Extended viewing distance', '24/7 brand presence'],
    imageUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
    order: 1,
    isFeatured: true,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'Wall Façade',
    slug: { _type: 'slug', current: 'wall-facade' },
    category: 'dooh',
    icon: 'spectacular',
    shortDescription: 'An extremely popular DOOH screen format positioned at high traffic locations with lots of foot and vehicle traffic.',
    longDescription: 'Wall façade advertising transforms building exteriors into dynamic brand canvases at the busiest intersections and junctions in urban centers. These large-format digital screens are strategically mounted on building walls at high-traffic locations.',
    specs: ['Size: Custom (building dependent)', 'High-resolution LED displays', 'Premium junction locations', 'Full motion video capable', 'Weather-resistant construction', 'Remote content management'],
    benefits: ['Dual audience reach', 'High-traffic junction visibility', 'Impactful creative canvas', 'Urban landmark presence', 'Constant audience flow', 'Premium brand positioning'],
    imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
    order: 2,
    isFeatured: true,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'LED Truck',
    slug: { _type: 'slug', current: 'led-truck' },
    category: 'mobile',
    icon: 'transit',
    shortDescription: 'An incredible, dynamic DOOH format that allows you to place an ad where your target audience is and follow them around on routes that they frequent.',
    longDescription: 'LED Trucks represent the ultimate in flexible outdoor advertising, combining the impact of large digital displays with complete mobility. These truck-mounted LED screens can be deployed wherever your target audience gathers.',
    specs: ['Mobile LED screen mounting', 'GPS route tracking', 'Real-time content updates', 'Flexible deployment', 'Event positioning capability', 'Route optimization'],
    benefits: ['Go where your audience is', 'Follow target routes', 'Event marketing ready', 'Maximum flexibility', 'Real-time deployment', 'Location-specific targeting'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    order: 3,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'Airport Screens',
    slug: { _type: 'slug', current: 'airport-screens' },
    category: 'transit',
    icon: 'airport',
    shortDescription: 'Airports are filled with people who are waiting - a captive audience looking around for things to occupy their time.',
    longDescription: 'Airport advertising provides access to one of the most valuable captive audiences in advertising. Travelers spend significant time waiting at check-in counters, security lines, immigration queues, baggage carousels, and departure gates.',
    specs: ['Terminal-wide coverage', 'Gate area screens', 'Baggage claim displays', 'Check-in counter positions', 'Immigration/Security zones', 'Departure lounge screens'],
    benefits: ['Captive audience', 'Long dwell times', 'Affluent demographics', 'Business travelers', 'International reach', 'Premium environment'],
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    order: 4,
    isFeatured: true,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'MRT/Transit Screens',
    slug: { _type: 'slug', current: 'mrt-transit-screens' },
    category: 'transit',
    icon: 'transit',
    shortDescription: 'Transit screens in train stations and platforms reach millions of daily commuters during their regular journeys.',
    longDescription: 'Transit advertising in MRT and rail networks provides unparalleled reach to urban commuters. Platform screens, in-train displays, and station media create multiple touchpoints throughout the commuter journey.',
    specs: ['Platform screen doors', 'In-train displays', 'Station concourse screens', 'Ticket hall positions', 'Escalator panels', 'Train wrap advertising'],
    benefits: ['Mass urban reach', 'Daily frequency', 'Captive audience', 'Journey integration', 'Multiple touchpoints', 'Urban professional targeting'],
    imageUrl: 'https://images.unsplash.com/photo-1565982057668-d8e56d86da2f?w=800&q=80',
    order: 5,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'Mall Digital Screens',
    slug: { _type: 'slug', current: 'mall-digital-screens' },
    category: 'place-based',
    icon: 'mall',
    shortDescription: 'Digital screens in shopping malls reach consumers when they are in purchase mode and ready to make buying decisions.',
    longDescription: 'Mall advertising places your brand in front of consumers at the point of purchase decision. Digital screens throughout shopping centers reach shoppers who are actively in buying mode.',
    specs: ['Concourse screens', 'Directory displays', 'Escalator media', 'Food court screens', 'Entrance displays', 'Store proximity units'],
    benefits: ['Purchase intent audience', 'High dwell time', 'Family demographics', 'Weekend peaks', 'Near point of sale', 'Retail environment'],
    imageUrl: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80',
    order: 6,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'Bus Shelter',
    slug: { _type: 'slug', current: 'bus-shelter' },
    category: 'street-furniture',
    icon: 'street',
    shortDescription: 'Bus shelters provide street-level engagement with pedestrians and commuters waiting for public transport.',
    longDescription: 'Bus shelter advertising offers intimate, street-level engagement with urban audiences. These roadside units capture attention from both pedestrians and vehicle passengers, providing high frequency exposure.',
    specs: ['Standard 6-sheet size', 'Backlit options', 'Digital versions available', 'Weather protection', 'Eye-level positioning', 'Sidewalk locations'],
    benefits: ['Street-level visibility', 'Pedestrian engagement', 'Commuter targeting', 'Local area coverage', 'Extended dwell time', 'All-weather exposure'],
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    order: 7,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'Traditional Billboard',
    slug: { _type: 'slug', current: 'traditional-billboard' },
    category: 'traditional',
    icon: 'billboard',
    shortDescription: 'Classic large-format billboards remain one of the most impactful advertising formats for brand awareness.',
    longDescription: 'Traditional billboards continue to deliver powerful brand impact through large-format, high-visibility advertising. These iconic formats dominate the roadside landscape and create instant brand recognition.',
    specs: ['48-sheet and 96-sheet sizes', 'Premium highway locations', 'Extended campaign periods', 'Vinyl or poster printing', 'Illuminated options', 'Static creative'],
    benefits: ['Massive impact', 'Brand dominance', 'Cost effective CPM', 'Long-term presence', 'Unmissable visibility', 'Local market coverage'],
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    order: 8,
    isActive: true,
  },
]

// ============================================
// SEED FUNCTIONS
// ============================================

async function seedLandingPages() {
  console.log('\n📄 Seeding Landing Pages...')
  for (const page of landingPages) {
    try {
      const existing = await client.fetch(
        `*[_type == "landingPage" && slug.current == $slug][0]`,
        { slug: page.slug.current }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${page.title}" - already exists`)
        continue
      }
      await client.create(page)
      console.log(`  ✅ Created "${page.title}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${page.title}":`, error.message)
    }
  }
}

async function seedAudiencePages() {
  console.log('\n👥 Seeding Audience Pages...')
  for (const page of audiencePages) {
    try {
      const existing = await client.fetch(
        `*[_type == "audiencePage" && pageType == $pageType][0]`,
        { pageType: page.pageType }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${page.pageType}" - already exists`)
        continue
      }
      await client.create(page)
      console.log(`  ✅ Created "${page.pageType}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${page.pageType}":`, error.message)
    }
  }
}

async function seedIndustryPages() {
  console.log('\n🏭 Seeding Industry Pages...')
  for (const page of industryPages) {
    try {
      const existing = await client.fetch(
        `*[_type == "industryPage" && industry == $industry][0]`,
        { industry: page.industry }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${page.industry}" - already exists`)
        continue
      }
      await client.create(page)
      console.log(`  ✅ Created "${page.industry}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${page.industry}":`, error.message)
    }
  }
}

async function seedIntegrations() {
  console.log('\n🔗 Seeding Integrations...')
  for (const integration of integrations) {
    try {
      const existing = await client.fetch(
        `*[_type == "integration" && slug.current == $slug][0]`,
        { slug: integration.slug.current }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${integration.name}" - already exists`)
        continue
      }
      await client.create(integration)
      console.log(`  ✅ Created "${integration.name}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${integration.name}":`, error.message)
    }
  }
}

async function seedOohFormats() {
  console.log('\n📺 Seeding OOH Formats...')
  for (const format of oohFormats) {
    try {
      const existing = await client.fetch(
        `*[_type == "oohFormat" && slug.current == $slug][0]`,
        { slug: format.slug.current }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${format.name}" - already exists`)
        continue
      }
      await client.create(format)
      console.log(`  ✅ Created "${format.name}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${format.name}":`, error.message)
    }
  }
}

// ============================================
// MAIN
// ============================================

async function seedAll() {
  console.log('🚀 Starting full content seeding...\n')
  console.log('='.repeat(50))
  
  await seedLandingPages()
  await seedAudiencePages()
  await seedIndustryPages()
  await seedIntegrations()
  await seedOohFormats()
  
  console.log('\n' + '='.repeat(50))
  console.log('✨ All content seeding complete!')
  console.log('\nView in Sanity Studio:')
  console.log('  - Landing Pages: /structure/landingPage')
  console.log('  - Audience Pages: /structure/audiencePage')
  console.log('  - Industry Pages: /structure/industryPage')
  console.log('  - Integrations: /structure/integration')
  console.log('  - OOH Formats: /structure/oohFormat')
}

seedAll()
