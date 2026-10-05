// Default content for the Retail Media landing page (/retail).
// Used as the fallback for any field left empty in the Sanity `retailMediaPage`
// singleton, and as the full page if Sanity is unreachable. Keep in sync with
// scripts/seed-retail-media-page.js, which seeds the CMS from this copy.

export interface RetailStat {
  value: string
  label: string
}

export interface RetailTitledItem {
  title: string
  description: string
}

export interface RetailMoment {
  stage: string
  where: string
  whatItDoes: string
  whatWeMeasure: string
}

export interface RetailStep {
  title: string
  subtitle: string
  description: string
}

export interface RetailMeasurementLayer {
  layer: string
  question: string
  method: string
}

export interface RetailImage {
  url: string
  alt: string
}

export interface RetailFaq {
  question: string
  answer: string
}

export interface RetailMediaContent {
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroStats: RetailStat[]
  heroCtaText: string

  contextHeading: string
  contextParagraphs: string[]
  contextCallout: string
  contextStats: RetailStat[]
  contextClosing: string
  lastMileHeading: string
  lastMileParagraphs: string[]

  momentsHeading: string
  moments: RetailMoment[]

  approachEyebrow: string
  approachHeading: string
  approachIntro: string
  approachPillars: RetailTitledItem[]
  categoriesLabel: string
  categories: string[]

  howItWorksEyebrow: string
  howItWorksHeading: string
  howItWorksSteps: RetailStep[]
  howItWorksImage: RetailImage | null

  creativeHeading: string
  creativeIntro: string
  creativeItems: RetailTitledItem[]

  measurementHeading: string
  measurementIntro: string
  measurementLayers: RetailMeasurementLayer[]

  caseEyebrow: string
  caseHeading: string
  caseBody: string
  caseStats: RetailStat[]
  caseImage: RetailImage | null
  caseLinkText: string
  caseLinkUrl: string

  ctaHeading: string
  ctaBody: string
  ctaButtonText: string

  faqHeading: string
  faqs: RetailFaq[]
}

export const defaultRetailMediaContent: RetailMediaContent = {
  heroEyebrow: 'Retail Media in Southeast Asia',
  heroTitle: 'Reach Shoppers Where Purchases Happen',
  heroSubtitle:
    'Moving Walls helps brands and agencies plan, buy and measure advertising on in-store and storefront screens across Vietnam, the Philippines, Malaysia, Thailand and Indonesia. Audience data decides which stores, screens and hours carry your budget.',
  heroStats: [
    { value: '5', label: 'Active SEA markets' },
    { value: '4000+', label: 'Retail screens' },
    { value: '800+', label: 'Premium retail venues' },
    { value: '~180M', label: 'Monthly impressions' },
  ],
  heroCtaText: 'Discuss your retail media strategy',

  contextHeading: 'Retail media budgets moved online. Shoppers still buy in stores.',
  contextParagraphs: [
    'Retail media is now one of the largest advertising channels in the world. Global spend is projected at about US$165 billion in 2026, up from about US$140 billion in 2024, and is forecast to reach a quarter of all digital ad spend by 2028.',
    'In Asia Pacific, retail media is forecast at US$75.5 billion in 2026. In Southeast Asia it is growing between 15% and 36% this year, led by commerce platforms such as Shopee and TikTok Shop.',
  ],
  contextCallout: 'Most of that money is spent online. Most shopping is not.',
  contextStats: [
    { value: '85%', label: 'of grocery visits still happen in store' },
    { value: '10% to 40%', label: 'of retail media revenue comes from in-store advertising' },
  ],
  contextClosing:
    'For brands that sell through supermarkets, pharmacies, convenience stores and malls, the store is where many purchase decisions are made. It is also the part of the shopper journey that is hardest to plan against and measure.',
  lastMileHeading: 'Last mile advertising with in-store retail media',
  lastMileParagraphs: [
    'In-store retail media is often described by marketers as last mile advertising because it reaches shoppers close to the point of purchase. It uses digital screens at store entrances, in aisles and at checkout to reach shoppers while they are choosing between products, rather than hours or days before.',
    'Shopper research supports the role of the store. In a US study, 44% of shoppers said a retail media ad led to a purchase decision, while 58% of shoppers who saw an ad on a store-entrance screen bought the advertised product straight away.',
  ],

  momentsHeading: 'One store visit, three moments of influence',
  moments: [
    {
      stage: 'Awareness',
      where: 'Mall and store entrances',
      whatItDoes: 'Builds visibility before the shopper walks in',
      whatWeMeasure: 'Reach and frequency',
    },
    {
      stage: 'Consideration',
      where: 'In store and along shopper paths',
      whatItDoes: 'Uses dwell time while shoppers browse',
      whatWeMeasure: 'Dwell and attention',
    },
    {
      stage: 'Conversion',
      where: 'Aisle, point of sale and checkout',
      whatItDoes: 'Reaches shoppers at the shelf and till',
      whatWeMeasure: 'Product offtake and ROI',
    },
  ],

  approachEyebrow: 'The Moving Walls approach',
  approachHeading: 'Plan on audiences, not screen lists',
  approachIntro:
    'Buying every screen in a retail network spends a budget on stores whose shoppers do not match your audience. Moving Walls plans retail campaigns from the audience outward.',
  approachPillars: [
    {
      title: 'Catchment mobility',
      description:
        'SDK mobility data maps verified pedestrian movement around each store, rather than drawing an arbitrary radius on a map.',
    },
    {
      title: 'Audience profiling',
      description:
        'Each venue is profiled by the age, gender and income mix of its shoppers, the categories they over-index on, and when footfall peaks: morning, lunch, evening or weekend.',
    },
    {
      title: 'Targeted delivery',
      description:
        "The plan selects the stores that over-index for your audience, drops the screens that do not, and weights delivery to each venue's peak hours. The result is less wastage on the same budget.",
    },
  ],
  categoriesLabel: 'Category audiences available',
  categories: [
    'FMCG',
    'Beauty and personal care',
    'Pharmacy',
    'Food and beverage',
    'QSR and food delivery',
    'Electronics',
    'Fintech',
  ],

  howItWorksEyebrow: 'How it works',
  howItWorksHeading: 'Plan, activate, measure, retarget',
  howItWorksSteps: [
    {
      title: 'Plan',
      subtitle: 'Audience intelligence',
      description: 'Select store catchments that match your shopper profile.',
    },
    {
      title: 'Activate',
      subtitle: 'Dynamic delivery',
      description: 'Launch programmatic or direct campaigns, with creative content that responds to context.',
    },
    {
      title: 'Measure',
      subtitle: 'Three-layer audit',
      description: 'Verify exposure, brand perception and retail offtake.',
    },
    {
      title: 'Retarget',
      subtitle: 'Extend the reach',
      description: 'Re-engage store visitors afterwards with mobile, social or display ads.',
    },
  ],
  howItWorksImage: {
    url: 'https://cdn.sanity.io/images/u10im6di/production/7131f197692d564a51064c436bf95dce7ef8814e-960x540.webp',
    alt: 'Moving Walls retail media workflow: plan, activate, measure and retarget',
  },

  creativeHeading: 'Dynamic creative',
  creativeIntro:
    'Start with one master video: an existing brand film or social asset, adapted for in-store screens. Moving Walls then changes what plays based on conditions at each store.',
  creativeItems: [
    { title: 'Weather', description: 'Show cold drinks when it is hot and hot drinks when it rains.' },
    { title: 'Promotions', description: 'Display the prices, discounts and bundle offers running this week.' },
    { title: 'Time of day', description: 'Coffee and grab-and-go in the morning, dinner ingredients after 5 PM.' },
  ],

  measurementHeading: 'Measurement',
  measurementIntro:
    'Impressions tell you a screen played. Retail advertisers also need to know whether the right people saw it and whether it moved the product. Moving Walls reports across three layers.',
  measurementLayers: [
    {
      layer: '1. Exposure',
      question: 'Did we reach the planned audience?',
      method:
        'SDK mobility data and proof-of-play verify delivery in the planned catchments and remove unverified impressions',
    },
    {
      layer: '2. Perception',
      question: 'Did shoppers remember the brand?',
      method:
        'Controlled panel studies (n=300 per flight) measure ad recall, brand favourability and purchase intent against SEA category norms',
    },
    {
      layer: '3. Action',
      question: 'Did it sell more?',
      method:
        'Independent retail scanner data (NielsenIQ or retailer EPOS) compares sales in exposed stores with matched control stores',
    },
  ],

  caseEyebrow: 'Retail media in practice',
  caseHeading: 'Colgate on 7-Eleven screens in the Philippines',
  caseBody:
    "GroupM ran Colgate's Optic White Vitamin C campaign on Moving Walls' programmatic retail network across 7-Eleven stores in the Philippines. The aim was to reach shoppers at the point of purchase, building brand recall and conversion at checkout.",
  caseStats: [
    { value: '156', label: '7-Eleven stores' },
    { value: '4.5M+', label: 'Impressions' },
  ],
  caseImage: {
    url: 'https://cdn.sanity.io/images/u10im6di/production/72a4c26ab841ceb3cc0909db584ad20108168b36-960x540.webp',
    alt: 'Colgate Optic White Vitamin C ad on a 7-Eleven in-store screen in the Philippines',
  },
  caseLinkText: '',
  caseLinkUrl: '',

  ctaHeading: 'Discuss your retail media strategy',
  ctaBody:
    'Tell us your markets, audience, objective and budget. We will walk you through the stores, screens, buying options and measurements that fit your plan.',
  ctaButtonText: 'Discuss your retail media strategy',

  faqHeading: 'Frequently asked questions',
  faqs: [
    {
      question: 'What is retail media?',
      answer:
        'Retail media is advertising sold on retail-owned or retail-located channels, such as retailer websites and apps, and screens inside physical stores. In-store retail media places ads on digital screens at store entrances, in aisles and at checkout, where shoppers are making purchase decisions.',
    },
    {
      question: 'How is in-store retail media different from standard DOOH?',
      answer:
        'Standard DOOH is usually bought by location and screen. Moving Walls plans in-store retail media by audience: each store is profiled by who shops there, what categories they over-index on and when footfall peaks, and the campaign runs only on the stores that match.',
    },
    {
      question: 'Which Southeast Asian markets does Moving Walls cover for retail media?',
      answer:
        'Moving Walls covers key Southeast Asian markets for retail media, including Vietnam, the Philippines, Malaysia, Thailand, and Indonesia. This regional coverage enables brands to plan and activate retail media campaigns across multiple high-growth markets in Southeast Asia.',
    },
    {
      question: 'What kinds of stores are included?',
      answer:
        'Supermarkets and minimarts, pharmacies, health and beauty stores, convenience stores, hypermarket checkouts, malls and mall posterboxes. Coverage by format varies by market.',
    },
    {
      question: 'Can I run one campaign across several markets?',
      answer:
        'Yes. Moving Walls can plan a single retail campaign across multiple Southeast Asian markets, with a consistent measurement approach across them.',
    },
  ],
}
