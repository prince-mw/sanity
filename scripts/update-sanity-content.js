#!/usr/bin/env node
/**
 * Update Sanity with actual website content
 * Run: node scripts/update-sanity-content.js
 */

const https = require('https');

const PROJECT_ID = 'u10im6di';
const DATASET = 'production';
const API_TOKEN = 'sk5kojjsR23HhJZE1MpTnf1xyKuIdNaAaR9xyhGvzBcwr96ChVgUwGt5hsbp68nwiZfPyuc2omBq3KYvKuG8XyRMa83VzZXlmhwZjCeaStjh6pYcw2TVJgk1XefWGKJGFkQjEnjKYajxiHwbL1D1Wrq4O6jUeUx4FwuDbEVVN0xR6MoUcEkU';

// Sanity API mutations
function makeSanityRequest(mutations) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ mutations });
    
    const options = {
      hostname: `${PROJECT_ID}.api.sanity.io`,
      port: 443,
      path: `/v2024-01-01/data/mutate/${DATASET}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`Sanity API error: ${res.statusCode} - ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ============================================================================
// AUDIENCE PAGES DATA (Agencies, Brands, Media Owners)
// ============================================================================
const audiencePages = [
  {
    _id: 'audiencePage-agencies',
    _type: 'audiencePage',
    pageType: 'agencies',
    title: 'White Label OOH Platform',
    titleHighlight: 'Built for Agencies',
    subtitle: 'Offer your clients a complete out of home solution under your own brand. Moving Walls gives you global inventory, intelligent campaign planning, and real-time analytics that help your agency act faster, plan smarter, and deliver measurable results.',
    primaryCTA: { text: 'Become a Partner', href: '/contact' },
    secondaryCTA: { text: 'Watch Demo', href: '#platform' },
    platformFeatures: [
      {
        _key: 'planning',
        id: 'planning',
        name: 'Planning',
        title: 'Customisable Planning',
        description: 'Our planning tool is designed to seamlessly integrate with your current workflows by providing custom audiences, site scores, and negotiation features that can be tailored to your specific needs.',
        linkHref: '/mw-planner',
        linkText: 'Learn more'
      },
      {
        _key: 'reach',
        id: 'reach',
        name: 'Extended Reach',
        title: 'Integrated Planning',
        description: 'Our planning system offers an integrated approach that allows for the extension of OOH planning to mobile platforms. Additionally, our platform allows for the extraction of audience lists, which can be used for future retargeting efforts.',
        linkHref: '/mw-reach',
        linkText: 'Learn more'
      },
      {
        _key: 'support',
        id: 'support',
        name: 'Support',
        title: 'Live Support',
        description: 'Our platform provides live support from OOH experts who are readily available to assist you with any inquiries or additional planning requests you may have.',
        linkHref: '/contact',
        linkText: 'Contact us'
      }
    ],
    benefits: [
      { _key: 'b1', title: 'Global Inventory Access', description: 'Access OOH inventory across multiple markets from a single platform' },
      { _key: 'b2', title: 'White Label Solution', description: 'Present the platform under your own brand identity' },
      { _key: 'b3', title: 'Real-time Analytics', description: 'Track campaign performance with live reporting dashboards' },
      { _key: 'b4', title: 'Intelligent Planning', description: 'AI-powered recommendations for optimal media mix' }
    ],
    stats: [
      { _key: 's1', value: '500K+', label: 'OOH Sites Globally' },
      { _key: 's2', value: '30+', label: 'Markets Covered' },
      { _key: 's3', value: '100+', label: 'Agency Partners' },
      { _key: 's4', value: '24/7', label: 'Expert Support' }
    ],
    faqs: [
      { _key: 'f1', question: 'How does white labeling work?', answer: 'You can customize the platform with your agency\'s branding, including logo, colors, and domain name.' },
      { _key: 'f2', question: 'What markets are available?', answer: 'We cover 30+ markets across Asia Pacific, Europe, Middle East, and the Americas.' },
      { _key: 'f3', question: 'Is training provided?', answer: 'Yes, we provide comprehensive onboarding and ongoing training for your team.' }
    ]
  },
  {
    _id: 'audiencePage-brands',
    _type: 'audiencePage',
    pageType: 'brands',
    title: 'OOH Advertising',
    titleHighlight: 'Made Simple',
    subtitle: 'Launch measurable outdoor campaigns across cities and continents from one connected platform. From brief to live in minutes. From impression to impact with clarity.',
    primaryCTA: { text: 'Get A Demo', href: '/contact' },
    secondaryCTA: { text: 'Learn More', href: '#features' },
    platformFeatures: [
      {
        _key: 'campaigns',
        id: 'campaigns',
        name: 'Campaign Creation',
        title: 'Create and Launch in Minutes',
        description: 'Turn your brief into an optimised OOH proposal instantly. Define your audience, set campaign objectives, select markets, and activate with one click.',
        linkHref: '/mw-planner',
        linkText: 'Learn more'
      },
      {
        _key: 'realtime',
        id: 'realtime',
        name: 'Real Time Activation',
        title: 'Activate Campaigns Instantly',
        description: 'Deploy your campaigns across multiple markets simultaneously with real-time activation and dynamic content updates.',
        linkHref: '/mw-activate',
        linkText: 'Learn more'
      },
      {
        _key: 'measurement',
        id: 'measurement',
        name: 'Full Funnel Measurement',
        title: 'Measure Every Impact',
        description: 'Track awareness, consideration, and conversion with comprehensive measurement tools that connect OOH exposure to business outcomes.',
        linkHref: '/mw-measure',
        linkText: 'Learn more'
      }
    ],
    benefits: [
      { _key: 'b1', title: 'Simplified Workflow', description: 'Launch campaigns in minutes, not weeks' },
      { _key: 'b2', title: 'Global Reach', description: 'Access inventory across multiple continents' },
      { _key: 'b3', title: 'Full Attribution', description: 'Connect OOH to sales and conversions' },
      { _key: 'b4', title: 'Real-time Optimization', description: 'Adjust campaigns based on performance data' }
    ],
    stats: [
      { _key: 's1', value: '10x', label: 'Faster Campaign Launch' },
      { _key: 's2', value: '85%', label: 'Planning Time Saved' },
      { _key: 's3', value: '3.5x', label: 'Average ROAS' },
      { _key: 's4', value: '100%', label: 'Campaign Visibility' }
    ],
    faqs: [
      { _key: 'f1', question: 'How quickly can I launch a campaign?', answer: 'With our platform, you can go from brief to live campaign in as little as 15 minutes.' },
      { _key: 'f2', question: 'What measurement options are available?', answer: 'We offer impression tracking, foot traffic attribution, brand lift studies, and sales correlation analysis.' },
      { _key: 'f3', question: 'Can I run campaigns across multiple countries?', answer: 'Yes, our platform supports multi-market campaigns with centralized management and reporting.' }
    ]
  },
  {
    _id: 'audiencePage-media-owners',
    _type: 'audiencePage',
    pageType: 'media-owners',
    title: 'Monetize Your OOH Inventory',
    titleHighlight: 'Smarter',
    subtitle: 'Turn your screens into a high-performing revenue engine. Connect to premium advertisers, optimize pricing dynamically, and automate your entire OOH sales operation so your team can focus on growth instead of repetitive tasks.',
    primaryCTA: { text: 'Join Our Network', href: '/contact' },
    secondaryCTA: { text: 'Learn More', href: '#platform' },
    platformFeatures: [
      {
        _key: 'marketplace',
        id: 'marketplace',
        name: 'Marketplace',
        title: 'Connect to Premium Demand',
        description: 'Connect your OOH inventory to an integrated demand marketplace designed for media owners. Enable access to programmatic and direct demand sources, improve fill rates, and monetize inventory more efficiently across digital and static screens.',
        linkHref: '/mw-market',
        linkText: 'Learn more'
      },
      {
        _key: 'inventory',
        id: 'inventory',
        name: 'Inventory',
        title: 'Manage Your Assets',
        description: 'Centralize all your OOH assets in one platform. Track availability, manage bookings, and optimize inventory allocation with intelligent scheduling tools.',
        linkHref: '/products',
        linkText: 'Learn more'
      },
      {
        _key: 'yield',
        id: 'yield',
        name: 'Yield',
        title: 'Maximize Revenue',
        description: 'Use dynamic pricing and yield optimization tools to maximize the value of every screen in your network. AI-powered recommendations help you capture more revenue.',
        linkHref: '/products',
        linkText: 'Learn more'
      }
    ],
    benefits: [
      { _key: 'b1', title: 'Increased Fill Rates', description: 'Connect to more demand sources and reduce unsold inventory' },
      { _key: 'b2', title: 'Dynamic Pricing', description: 'Optimize pricing based on demand and market conditions' },
      { _key: 'b3', title: 'Automated Operations', description: 'Reduce manual work with automated booking and scheduling' },
      { _key: 'b4', title: 'Premium Demand Access', description: 'Connect directly with agency and brand advertisers' }
    ],
    stats: [
      { _key: 's1', value: '40%', label: 'Revenue Increase' },
      { _key: 's2', value: '90%', label: 'Fill Rate' },
      { _key: 's3', value: '50%', label: 'Ops Time Saved' },
      { _key: 's4', value: '1000+', label: 'Active Advertisers' }
    ],
    faqs: [
      { _key: 'f1', question: 'How do I connect my inventory?', answer: 'We provide API integration and manual upload options. Our team will help you onboard your entire network.' },
      { _key: 'f2', question: 'What pricing models are supported?', answer: 'We support CPM, fixed rate, share of voice, and custom pricing models.' },
      { _key: 'f3', question: 'Can I maintain direct sales relationships?', answer: 'Absolutely. Our platform complements your direct sales with additional demand sources.' }
    ]
  }
];

// ============================================================================
// INDUSTRY PAGES DATA (Finance, Healthcare, Retail)
// ============================================================================
const industryPages = [
  {
    _id: 'industryPage-finance',
    _type: 'industryPage',
    industry: 'finance',
    slug: { _type: 'slug', current: 'finance' },
    badgeText: 'Finance & Banking',
    title: 'Build Trust &',
    titleHighlight: 'Drive Growth',
    subtitle: 'Establish credibility and drive customer acquisition with financial advertising that builds trust and communicates reliability to your target market.',
    heroStats: [
      { _key: 'hs1', value: '$4.20', label: 'return for every $1 spent on OOH' },
      { _key: 'hs2', value: '68%', label: 'increase in branch visits' },
      { _key: 'hs3', value: '156%', label: 'boost in brand awareness' }
    ],
    benefits: [
      { _key: 'b1', title: 'Build Financial Trust', description: 'Establish credibility and reliability in financial services' },
      { _key: 'b2', title: 'Drive Account Growth', description: 'Increase new account openings and customer acquisition' },
      { _key: 'b3', title: 'Target Demographics', description: 'Reach specific financial planning segments effectively' },
      { _key: 'b4', title: 'Security Messaging', description: 'Communicate safety and security of financial services' }
    ],
    services: [
      { _key: 's1', title: 'Banking & Credit Unions', description: 'Drive branch visits and account openings with local community focus', offerings: ['Branch Promotion', 'Account Acquisition', 'Loan Services', 'Community Banking'] },
      { _key: 's2', title: 'Investment Services', description: 'Build trust for wealth management and investment advisory services', offerings: ['Wealth Management', 'Retirement Planning', 'Investment Education', 'Advisory Services'] },
      { _key: 's3', title: 'Insurance Companies', description: 'Increase policy sales and brand awareness for insurance products', offerings: ['Life Insurance', 'Auto Insurance', 'Home Insurance', 'Business Insurance'] },
      { _key: 's4', title: 'Fintech & Digital Banking', description: 'Promote digital financial services and mobile banking solutions', offerings: ['Mobile Banking', 'Digital Payments', 'Cryptocurrency', 'Personal Finance'] }
    ],
    trustFactors: [
      { _key: 't1', metric: '73%', description: 'of consumers trust brands with local advertising' },
      { _key: 't2', metric: '2.5x', description: 'higher consideration for financial services' },
      { _key: 't3', metric: '45%', description: 'increase in brand trust and reliability' },
      { _key: 't4', metric: '89%', description: 'recognize financial brands from OOH campaigns' }
    ],
    caseStudies: []
  },
  {
    _id: 'industryPage-healthcare',
    _type: 'industryPage',
    industry: 'healthcare',
    slug: { _type: 'slug', current: 'healthcare' },
    badgeText: 'Healthcare Marketing',
    title: 'Connect with Patients',
    titleHighlight: 'Effectively',
    subtitle: 'Build trust, increase awareness, and drive patient engagement with healthcare advertising that reaches your community where they live, work, and travel.',
    heroStats: [
      { _key: 'hs1', value: '89%', label: 'trust healthcare brands with local presence' },
      { _key: 'hs2', value: '65%', label: 'influenced by OOH for health decisions' },
      { _key: 'hs3', value: '2.8x', label: 'higher patient acquisition rate' }
    ],
    benefits: [
      { _key: 'b1', title: 'Build Patient Trust', description: 'Establish credibility and trust in your healthcare services' },
      { _key: 'b2', title: 'Local Community Focus', description: 'Connect with patients in your service area effectively' },
      { _key: 'b3', title: 'Health Awareness', description: 'Educate communities about health services and prevention' },
      { _key: 'b4', title: 'Emergency Services', description: 'Promote urgent care and emergency services when needed' }
    ],
    services: [
      { _key: 's1', title: 'Hospital & Health Systems', description: 'Build community trust and drive patient acquisition for health systems', offerings: ['Brand Awareness', 'Service Promotion', 'Community Outreach', 'Emergency Care'] },
      { _key: 's2', title: 'Specialist Practices', description: 'Increase referrals and direct patient visits for specialized healthcare', offerings: ['Specialist Referrals', 'Direct Patient Marketing', 'Condition Awareness', 'Treatment Education'] },
      { _key: 's3', title: 'Wellness & Prevention', description: 'Promote preventive care and wellness programs to improve community health', offerings: ['Vaccination Campaigns', 'Screening Programs', 'Wellness Education', 'Lifestyle Programs'] }
    ],
    trustFactors: [
      { _key: 't1', metric: '89%', description: 'trust healthcare brands with local presence' },
      { _key: 't2', metric: '65%', description: 'are influenced by OOH for health decisions' },
      { _key: 't3', metric: '2.8x', description: 'higher patient acquisition rate' }
    ],
    caseStudies: []
  },
  {
    _id: 'industryPage-retail',
    _type: 'industryPage',
    industry: 'retail',
    slug: { _type: 'slug', current: 'retail' },
    badgeText: 'Retail & E-commerce',
    title: 'Drive Foot Traffic &',
    titleHighlight: 'Boost Sales',
    subtitle: 'Transform your retail advertising with strategic out-of-home campaigns that connect with shoppers at the right moment, driving them from awareness to your store entrance.',
    heroStats: [
      { _key: 'hs1', value: '45%', label: 'Foot Traffic ↑' },
      { _key: 'hs2', value: '32%', label: 'Sales Boost ↗' },
      { _key: 'hs3', value: '28%', label: 'Awareness ⭐' }
    ],
    benefits: [
      { _key: 'b1', title: 'Increase Foot Traffic', description: 'Drive more customers to your physical locations with targeted OOH campaigns' },
      { _key: 'b2', title: 'Boost Sales', description: 'Convert awareness into purchases with strategic placement and timing' },
      { _key: 'b3', title: 'Target Shoppers', description: 'Reach customers when they\'re in shopping mode near retail locations' },
      { _key: 'b4', title: 'Omnichannel Integration', description: 'Connect offline advertising with online experiences seamlessly' }
    ],
    services: [],
    trustFactors: [],
    caseStudies: [
      { _key: 'c1', brand: 'Fashion Retailer', metric: '45% increase', description: 'in store visits during campaign period' },
      { _key: 'c2', brand: 'Electronics Chain', metric: '32% boost', description: 'in weekend sales with targeted mall advertising' },
      { _key: 'c3', brand: 'Home Goods Store', metric: '28% growth', description: 'in brand awareness among target demographics' }
    ]
  }
];

// ============================================================================
// INTEGRATIONS DATA
// ============================================================================
const integrations = [
  {
    _id: 'integration-viooh',
    _type: 'integration',
    name: 'VIOOH',
    slug: { _type: 'slug', current: 'viooh' },
    category: 'ssp',
    description: 'Premium programmatic digital out-of-home (pDOOH) marketplace enabling automated trading of OOH inventory globally.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Programmatic DOOH', 'Real-time bidding', 'Global inventory', 'Audience targeting'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/viooh.svg'
  },
  {
    _id: 'integration-dv360',
    _type: 'integration',
    name: 'Display & Video 360',
    slug: { _type: 'slug', current: 'dv360' },
    category: 'ssp',
    description: 'Google\'s enterprise demand-side platform for programmatic display, video, and connected TV advertising.',
    products: ['MW Planner', 'MW Measure', 'MW Activate', 'MW Marketplace'],
    features: ['Programmatic guaranteed', 'Custom bidding', 'Audience activation', 'Cross-device'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/dv360.svg'
  },
  {
    _id: 'integration-magnite',
    _type: 'integration',
    name: 'Magnite',
    slug: { _type: 'slug', current: 'magnite' },
    category: 'ssp',
    description: 'The world\'s largest independent sell-side advertising company, powering premium programmatic OOH and CTV.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Header bidding', 'CTV/OTT', 'Audience segments', 'Deal management'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/magnite.svg'
  },
  {
    _id: 'integration-google-ad-manager',
    _type: 'integration',
    name: 'Google Ad Manager 360',
    slug: { _type: 'slug', current: 'google-ad-manager-360' },
    category: 'ssp',
    description: 'Enterprise ad serving platform with advanced forecasting, yield management, and programmatic access.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Yield optimization', 'Programmatic deals', 'Forecasting', 'Multi-format'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/google-ad-manager-360.svg'
  },
  {
    _id: 'integration-the-trade-desk',
    _type: 'integration',
    name: 'The Trade Desk',
    slug: { _type: 'slug', current: 'the-trade-desk' },
    category: 'dsp',
    description: 'The leading independent DSP for omnichannel programmatic advertising with Unified ID 2.0.',
    products: ['MW Planner', 'MW Measure', 'MW Activate', 'MW Marketplace'],
    features: ['Unified ID 2.0', 'Kokai AI', 'CTV/OTT', 'Retail media'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/the-trade-desk.svg'
  },
  {
    _id: 'integration-cassie',
    _type: 'integration',
    name: 'Cassie',
    slug: { _type: 'slug', current: 'cassie' },
    category: 'dsp',
    description: 'Consent and preference management platform ensuring compliant data-driven advertising.',
    products: ['MW Activate', 'MW Measure'],
    features: ['Consent management', 'Preference center', 'GDPR compliance', 'Data governance'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/cassie.svg'
  },
  {
    _id: 'integration-max',
    _type: 'integration',
    name: 'MAX',
    slug: { _type: 'slug', current: 'max' },
    category: 'dsp',
    description: 'Moving Walls\' programmatic OOH buying platform for automated, data-driven outdoor advertising campaigns.',
    products: ['MW Planner', 'MW Activate', 'MW Measure'],
    features: ['Automated buying', 'Audience data', 'Campaign optimization', 'Real-time reporting'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/max.svg'
  },
  {
    _id: 'integration-stackadapt',
    _type: 'integration',
    name: 'StackAdapt',
    slug: { _type: 'slug', current: 'stackadapt' },
    category: 'dsp',
    description: 'Multi-channel programmatic advertising platform with native, display, video, CTV, and DOOH capabilities.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Multi-channel', 'Native ads', 'Contextual targeting', 'Custom audiences'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/stackadapt.svg'
  },
  {
    _id: 'integration-amobee',
    _type: 'integration',
    name: 'Amobee',
    slug: { _type: 'slug', current: 'amobee' },
    category: 'dsp',
    description: 'End-to-end advertising platform for planning, activation, and optimization across all channels.',
    products: ['MW Planner', 'MW Activate'],
    features: ['Cross-channel', 'Brand intelligence', 'TV planning', 'Audience analytics'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/amobee.svg'
  },
  {
    _id: 'integration-appnexus',
    _type: 'integration',
    name: 'AppNexus',
    slug: { _type: 'slug', current: 'appnexus' },
    category: 'dsp',
    description: 'Enterprise technology platform for programmatic advertising powering Xandr/Microsoft Advertising.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Programmable bidder', 'Curated deals', 'Identity', 'Yield analytics'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/appnexus.svg'
  },
  {
    _id: 'integration-mediamath',
    _type: 'integration',
    name: 'MediaMath',
    slug: { _type: 'slug', current: 'mediamath' },
    category: 'dsp',
    description: 'Omnichannel demand-side platform for advanced programmatic campaigns with transparency and control.',
    products: ['MW Planner', 'MW Activate'],
    features: ['Brain AI', 'Omnichannel', 'Identity', 'Transparency'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/mediamath.svg'
  },
  {
    _id: 'integration-verizon',
    _type: 'integration',
    name: 'Verizon Media',
    slug: { _type: 'slug', current: 'verizon' },
    category: 'dsp',
    description: 'Verizon\'s advertising technology platform with premium inventory and telecom data for precision targeting.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Telecom data', 'Premium inventory', 'Cross-device', 'Brand safety'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/verizon.svg'
  },
  {
    _id: 'integration-mediasmart',
    _type: 'integration',
    name: 'Mediasmart',
    slug: { _type: 'slug', current: 'mediasmart' },
    category: 'dsp',
    description: 'Mobile-first programmatic platform specializing in location-based and proximity advertising.',
    products: ['MW Activate', 'MW Measure'],
    features: ['Mobile DSP', 'Location targeting', 'Proximity ads', 'Footfall attribution'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/mediasmart.svg'
  }
];

// ============================================================================
// OOH FORMATS DATA
// ============================================================================
const oohFormats = [
  {
    _id: 'oohFormat-unipole',
    _type: 'oohFormat',
    name: 'Unipole',
    slug: { _type: 'slug', current: 'unipole' },
    category: 'Digital Out-of-Home (DOOH)',
    icon: 'digital',
    shortDescription: 'The most popular DOOH format, Unipoles are found along high-traffic roads where a large screen is attached to a tall pole for maximum visibility.',
    longDescription: 'Unipoles represent one of the most effective and popular DOOH formats in outdoor advertising. Strategically positioned along high-traffic roads and highways, these towering displays feature large screens attached to tall poles, ensuring maximum visibility from great distances. The elevated positioning makes them impossible to miss for commuters, creating powerful brand impressions during daily journeys.',
    specs: ['Height: 40-100+ feet', 'Screen Size: 14\' x 48\' typical', 'LED/Digital display options', '360° visibility models', 'High-traffic road locations', 'Illuminated day and night'],
    benefits: ['Maximum highway visibility', 'Commuter-focused targeting', 'Impossible to miss', 'Premium road locations', 'Extended viewing distance', '24/7 brand presence'],
    imageUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80'
  },
  {
    _id: 'oohFormat-wall-facade',
    _type: 'oohFormat',
    name: 'Wall Façade',
    slug: { _type: 'slug', current: 'wall-facade' },
    category: 'Digital Out-of-Home (DOOH)',
    icon: 'spectacular',
    shortDescription: 'An extremely popular DOOH screen format positioned at high traffic locations with lots of foot and vehicle traffic.',
    longDescription: 'Wall façade advertising transforms building exteriors into dynamic brand canvases at the busiest intersections and junctions in urban centers. These large-format digital screens are strategically mounted on building walls at high-traffic locations where foot traffic meets vehicle traffic.',
    specs: ['Size: Custom (building dependent)', 'High-resolution LED displays', 'Premium junction locations', 'Full motion video capable', 'Weather-resistant construction', 'Remote content management'],
    benefits: ['Dual audience reach (pedestrian + vehicular)', 'High-traffic junction visibility', 'Impactful creative canvas', 'Urban landmark presence', 'Constant audience flow', 'Premium brand positioning'],
    imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80'
  },
  {
    _id: 'oohFormat-e-buntings',
    _type: 'oohFormat',
    name: 'E-Buntings',
    slug: { _type: 'slug', current: 'e-buntings' },
    category: 'Digital Out-of-Home (DOOH)',
    icon: 'led',
    shortDescription: 'Synchronous, multi-panel displays line public streets - positioned along busy streets, these screens are almost impossible to miss!',
    longDescription: 'E-Buntings are a unique and highly effective DOOH format featuring multiple synchronized digital panels arranged along public streets. Whether positioned along the sides of busy walkways or running down the middle of major thoroughfares, these screens work in harmony to display the same advertisement simultaneously.',
    specs: ['Multi-panel synchronized displays', 'Street-side positioning', 'Same-time ad playback', 'High-frequency locations', 'Weather-resistant design', 'Central/side street mounting'],
    benefits: ['Synchronized brand messaging', 'Impossible to miss', 'Multiple touchpoints', 'Street-level engagement', 'Repetitive exposure', 'Immersive ad experience'],
    imageUrl: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80'
  },
  {
    _id: 'oohFormat-overhead-bridge',
    _type: 'oohFormat',
    name: 'Overhead Bridge',
    slug: { _type: 'slug', current: 'overhead-bridge' },
    category: 'Digital Out-of-Home (DOOH)',
    icon: 'billboard',
    shortDescription: 'Overhead bridges support massive screens spanning the entire width of the road - they are wide, big and hard to miss.',
    longDescription: 'Overhead bridge advertising leverages the structural advantage of pedestrian bridges and overpasses to deliver massive visual impact. These screens span the entire width of roads, ensuring that every driver passing underneath has your brand directly in their eyeline.',
    specs: ['Full road-width spans', 'Massive screen sizes', 'Bridge-mounted structure', 'High-visibility positioning', 'LED/Digital displays', 'Unavoidable eyeline placement'],
    benefits: ['Unavoidable visibility', 'Full road coverage', 'Direct eyeline targeting', 'Massive creative canvas', 'High traffic exposure', 'Memorable brand impact'],
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80'
  },
  {
    _id: 'oohFormat-led-truck',
    _type: 'oohFormat',
    name: 'LED Truck',
    slug: { _type: 'slug', current: 'led-truck' },
    category: 'Mobile Advertising',
    icon: 'transit',
    shortDescription: 'An incredible, dynamic DOOH format that allows you to place an ad where your target audience is and follow them around.',
    longDescription: 'LED Trucks represent the ultimate in flexible outdoor advertising, combining the impact of large digital displays with complete mobility. These truck-mounted LED screens can be deployed wherever your target audience gathers - from busy shopping districts to event venues and sports stadiums.',
    specs: ['Mobile LED screen mounting', 'GPS route tracking', 'Real-time content updates', 'Flexible deployment', 'Event positioning capability', 'Route optimization'],
    benefits: ['Go where your audience is', 'Follow target routes', 'Event marketing ready', 'Maximum flexibility', 'Real-time deployment', 'Location-specific targeting'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    _id: 'oohFormat-airport-screens',
    _type: 'oohFormat',
    name: 'Airport Screens',
    slug: { _type: 'slug', current: 'airport-screens' },
    category: 'Transit Advertising',
    icon: 'airport',
    shortDescription: 'Airports are filled with people waiting - you have a captive audience looking around for things to occupy their time.',
    longDescription: 'Airport advertising provides access to one of the most valuable captive audiences in advertising. Travelers spend significant time waiting - at check-in counters, security lines, immigration queues, baggage carousels, and departure gates.',
    specs: ['Terminal-wide coverage', 'Gate area screens', 'Baggage claim displays', 'Check-in counter positions', 'Immigration/Security zones', 'Departure lounge screens'],
    benefits: ['Captive waiting audience', 'Extended dwell time', 'Affluent traveler demographic', 'Business traveler reach', 'International exposure', 'High attention rates'],
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'
  },
  {
    _id: 'oohFormat-digital-bulletin',
    _type: 'oohFormat',
    name: 'Digital Bulletin',
    slug: { _type: 'slug', current: 'digital-bulletin' },
    category: 'Digital Out-of-Home (DOOH)',
    icon: 'digital',
    shortDescription: 'Large billboards on highways and heavy-traffic roads that tower over surroundings for unparalleled visibility.',
    longDescription: 'Digital bulletins are the giants of outdoor advertising, positioned along highways and major arterial roads where they tower over the surrounding landscape. These massive digital displays command attention from great distances.',
    specs: ['Size: 14\' x 48\' to 20\' x 60\'', 'Highway-side positioning', 'Towering height placement', 'LED digital displays', 'High-resolution graphics', 'Remote content management'],
    benefits: ['Unparalleled visibility', 'Highway dominance', 'Towers over surroundings', 'Massive audience reach', 'Extended viewing time', 'Premium brand exposure'],
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80'
  },
  {
    _id: 'oohFormat-bus-shelter',
    _type: 'oohFormat',
    name: 'Bus Shelter',
    slug: { _type: 'slug', current: 'bus-shelter' },
    category: 'Street Furniture',
    icon: 'street',
    shortDescription: 'Popular DOOH format at high traffic locations with foot and vehicle traffic, offering dual audience reach.',
    longDescription: 'Bus shelter advertising captures the attention of commuters in a unique environment where they have time to engage with your message. Positioned at high-traffic locations throughout urban areas, these displays reach both waiting passengers and passing pedestrians and vehicles.',
    specs: ['Size: 4\' x 6\' typical panel', 'Backlit/digital options', 'Double-sided visibility', 'Illuminated 24/7', 'Weather-protected viewing', 'High-traffic locations'],
    benefits: ['Eye-level viewing', 'Captive waiting audience', 'Dual audience reach', 'Urban coverage', 'High frequency exposure', 'Commuter targeting'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80'
  },
  {
    _id: 'oohFormat-cinema',
    _type: 'oohFormat',
    name: 'Cinema',
    slug: { _type: 'slug', current: 'cinema' },
    category: 'Place-Based Media',
    icon: 'spectacular',
    shortDescription: 'Nothing beats a large screen in a closed room where people came with the intention of watching that very screen.',
    longDescription: 'Cinema advertising offers an unmatched opportunity to reach fully engaged audiences in a premium entertainment environment. Viewers have specifically come to watch content on a large screen, making them exceptionally receptive to advertising.',
    specs: ['Pre-show ads: 15-60 seconds', 'Large screen format', 'Premium audio systems', 'Captive environment', 'Genre-based targeting', 'Movie audience profiling'],
    benefits: ['Full attention viewing', 'Captive audience', 'Premium environment', 'Emotional engagement', 'Predictable demographics', 'High recall rates'],
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80'
  }
];

// ============================================================================
// MAIN EXECUTION
// ============================================================================
async function updateSanityContent() {
  console.log('Starting Sanity content update...\n');
  
  try {
    // Delete existing documents first
    console.log('Deleting existing documents...');
    const deleteQueries = [
      '*[_type == "audiencePage"]',
      '*[_type == "industryPage"]',
      '*[_type == "integration"]',
      '*[_type == "oohFormat"]'
    ];
    
    for (const query of deleteQueries) {
      const deleteMutations = [{ delete: { query } }];
      await makeSanityRequest(deleteMutations);
      console.log(`  Deleted documents matching: ${query}`);
    }
    
    // Create audience pages
    console.log('\nCreating audience pages...');
    for (const page of audiencePages) {
      const mutations = [{ createOrReplace: page }];
      await makeSanityRequest(mutations);
      console.log(`  Created: ${page.pageType}`);
    }
    console.log(`✓ ${audiencePages.length} audience pages created`);
    
    // Create industry pages
    console.log('\nCreating industry pages...');
    for (const page of industryPages) {
      const mutations = [{ createOrReplace: page }];
      await makeSanityRequest(mutations);
      console.log(`  Created: ${page.industry}`);
    }
    console.log(`✓ ${industryPages.length} industry pages created`);
    
    // Create integrations
    console.log('\nCreating integrations...');
    for (const integration of integrations) {
      const mutations = [{ createOrReplace: integration }];
      await makeSanityRequest(mutations);
      console.log(`  Created: ${integration.name}`);
    }
    console.log(`✓ ${integrations.length} integrations created`);
    
    // Create OOH formats
    console.log('\nCreating OOH formats...');
    for (const format of oohFormats) {
      const mutations = [{ createOrReplace: format }];
      await makeSanityRequest(mutations);
      console.log(`  Created: ${format.name}`);
    }
    console.log(`✓ ${oohFormats.length} OOH formats created`);
    
    console.log('\n========================================');
    console.log('Sanity content update complete!');
    console.log('========================================');
    console.log(`Total documents created: ${audiencePages.length + industryPages.length + integrations.length + oohFormats.length}`);
    
  } catch (error) {
    console.error('Error updating Sanity content:', error);
    process.exit(1);
  }
}

updateSanityContent();
