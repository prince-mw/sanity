const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You need to set this
})

const products = [
  {
    _type: 'product',
    name: 'MW Planner',
    slug: { _type: 'slug', current: 'mw-planner' },
    tagline: 'AI-Powered Campaign Intelligence',
    description: 'Turn data into campaign success with AI-powered forecasting, cross-channel optimization, and real-time performance tracking.',
    category: 'planning',
    order: 1,
    isActive: true,
    features: [
      {
        _key: 'f1',
        icon: 'target',
        title: 'AI-Powered Forecasting',
        description: 'Predict campaign performance with 94% accuracy before spending a single dollar.',
      },
      {
        _key: 'f2',
        icon: 'chart',
        title: 'Cross-Channel Optimization',
        description: 'Automatically allocate budgets across channels for maximum ROI impact.',
      },
      {
        _key: 'f3',
        icon: 'users',
        title: 'Audience Intelligence',
        description: 'Discover high-value segments using machine learning on your first-party data.',
      },
      {
        _key: 'f4',
        icon: 'trending',
        title: 'Real-Time Dashboards',
        description: 'Monitor live performance metrics with customizable, shareable dashboards.',
      },
      {
        _key: 'f5',
        icon: 'document',
        title: 'Automated Reporting',
        description: 'Generate stakeholder-ready reports automatically on your schedule.',
      },
      {
        _key: 'f6',
        icon: 'dollar',
        title: 'Budget Optimizer',
        description: 'Maximize every dollar with AI-driven budget recommendations.',
      },
    ],
    testimonials: [
      {
        _key: 't1',
        quote: "MW Planner's AI recommendations saved us from a $400K budget misallocation. The predictive insights are game-changing.",
        author: 'Sarah Chen',
        role: 'CMO',
        company: 'TechFlow Solutions',
        metric: '287% ROI',
      },
      {
        _key: 't2',
        quote: "We went from reactive to predictive. MW Planner anticipated our Black Friday surge and optimized our spend perfectly.",
        author: 'Marcus Johnson',
        role: 'VP Marketing',
        company: 'RetailMax Group',
        metric: '164% CVR',
      },
    ],
    ctaText: 'Get Started',
    ctaLink: '/contact',
  },
  {
    _type: 'product',
    name: 'MW Activate',
    slug: { _type: 'slug', current: 'mw-activate' },
    tagline: 'Programmatic OOH Activation',
    description: 'Connect to the world\'s largest programmatic OOH network. Activate campaigns across digital billboards, transit, and retail media in real-time.',
    category: 'activation',
    order: 2,
    isActive: true,
    features: [
      {
        _key: 'f1',
        icon: 'globe',
        title: 'Global OOH Network',
        description: 'Access 500,000+ screens across 50+ countries through a single platform.',
      },
      {
        _key: 'f2',
        icon: 'lightning',
        title: 'Real-Time Bidding',
        description: 'Programmatic buying with instant activation and dynamic pricing.',
      },
      {
        _key: 'f3',
        icon: 'layers',
        title: 'Multi-Format Support',
        description: 'Digital billboards, transit screens, mall networks, and street furniture.',
      },
      {
        _key: 'f4',
        icon: 'integration',
        title: 'DSP Integration',
        description: 'Connect with DV360, The Trade Desk, and other major DSPs.',
      },
    ],
    stats: [
      { _key: 's1', value: '500K+', label: 'Screens', growth: 15 },
      { _key: 's2', value: '50+', label: 'Countries', growth: 12 },
      { _key: 's3', value: '99.9%', label: 'Uptime', growth: 0 },
    ],
    ctaText: 'Start Activating',
    ctaLink: '/contact',
  },
  {
    _type: 'product',
    name: 'MW Measure',
    slug: { _type: 'slug', current: 'mw-measure' },
    tagline: 'OOH Measurement & Attribution',
    description: 'Measure what matters. Our patented multi-signal technology delivers verified impressions, audience insights, and business outcomes.',
    category: 'measurement',
    order: 3,
    isActive: true,
    features: [
      {
        _key: 'f1',
        icon: 'eye',
        title: 'Verified Impressions',
        description: 'Multi-sensor technology captures real audience exposure, not estimates.',
      },
      {
        _key: 'f2',
        icon: 'users',
        title: 'Audience Insights',
        description: 'Understand who sees your ads with demographic and behavioral data.',
      },
      {
        _key: 'f3',
        icon: 'location',
        title: 'Footfall Attribution',
        description: 'Connect OOH exposure to store visits and conversions.',
      },
      {
        _key: 'f4',
        icon: 'chart',
        title: 'Real-Time Analytics',
        description: 'Live dashboards with impression delivery and performance metrics.',
      },
    ],
    stats: [
      { _key: 's1', value: '10B+', label: 'Data Points Daily', growth: 20 },
      { _key: 's2', value: '100K+', label: 'Measured Locations', growth: 25 },
      { _key: 's3', value: '94%', label: 'Accuracy Rate', growth: 2 },
    ],
    ctaText: 'See Measurement Demo',
    ctaLink: '/contact',
  },
  {
    _type: 'product',
    name: 'MW Influence',
    slug: { _type: 'slug', current: 'mw-influence' },
    tagline: 'Global Audience Reach',
    description: 'Reach the right audiences at the right moments across the world\'s most impactful OOH locations.',
    category: 'activation',
    order: 4,
    isActive: true,
    features: [
      {
        _key: 'f1',
        icon: 'globe',
        title: 'Global Reach',
        description: 'Access premium inventory across Asia-Pacific, Americas, and EMEA.',
      },
      {
        _key: 'f2',
        icon: 'target',
        title: 'Audience Targeting',
        description: 'Target by demographics, behaviors, and real-world movement patterns.',
      },
      {
        _key: 'f3',
        icon: 'clock',
        title: 'Daypart Optimization',
        description: 'Reach audiences at peak engagement times throughout the day.',
      },
      {
        _key: 'f4',
        icon: 'currency',
        title: 'Multi-Currency Support',
        description: 'Plan and buy in local currencies across all markets.',
      },
    ],
    ctaText: 'Expand Your Reach',
    ctaLink: '/contact',
  },
  {
    _type: 'product',
    name: 'MW Market',
    slug: { _type: 'slug', current: 'mw-market' },
    tagline: 'OOH Inventory Marketplace',
    description: 'Discover and compare OOH inventory across formats, locations, and pricing in a unified marketplace.',
    category: 'planning',
    order: 5,
    isActive: true,
    features: [
      {
        _key: 'f1',
        icon: 'search',
        title: 'Inventory Discovery',
        description: 'Search and filter OOH inventory by location, format, and audience.',
      },
      {
        _key: 'f2',
        icon: 'compare',
        title: 'Side-by-Side Comparison',
        description: 'Compare reach, pricing, and performance across multiple sites.',
      },
      {
        _key: 'f3',
        icon: 'dollar',
        title: 'Transparent Pricing',
        description: 'See real-time rates and availability for informed decisions.',
      },
      {
        _key: 'f4',
        icon: 'map',
        title: 'Interactive Maps',
        description: 'Visualize inventory on maps with traffic and audience data.',
      },
    ],
    ctaText: 'Explore Marketplace',
    ctaLink: '/contact',
  },
  {
    _type: 'product',
    name: 'MW Science',
    slug: { _type: 'slug', current: 'mw-science' },
    tagline: 'Research & AI Insights',
    description: 'Leverage cutting-edge AI and research capabilities to understand audiences, predict outcomes, and optimize campaigns.',
    category: 'intelligence',
    order: 6,
    isActive: true,
    features: [
      {
        _key: 'f1',
        icon: 'brain',
        title: 'AI-Powered Insights',
        description: 'Machine learning models trained on billions of OOH data points.',
      },
      {
        _key: 'f2',
        icon: 'lab',
        title: 'Research & Testing',
        description: 'A/B testing and creative optimization for OOH campaigns.',
      },
      {
        _key: 'f3',
        icon: 'chart',
        title: 'Predictive Modeling',
        description: 'Forecast campaign performance before you commit budget.',
      },
      {
        _key: 'f4',
        icon: 'segment',
        title: 'Audience Segmentation',
        description: 'Build custom audience segments from behavioral and location data.',
      },
    ],
    stats: [
      { _key: 's1', value: '95%', label: 'Model Accuracy', growth: 3 },
      { _key: 's2', value: '50+', label: 'AI Models', growth: 10 },
    ],
    ctaText: 'Discover Insights',
    ctaLink: '/contact',
  },
  {
    _type: 'product',
    name: 'MW Studio',
    slug: { _type: 'slug', current: 'mw-studio' },
    tagline: 'Creative Management Platform',
    description: 'Design, manage, and deploy OOH creative assets across your entire network with our no-code creative studio.',
    category: 'creative',
    order: 7,
    isActive: true,
    features: [
      {
        _key: 'f1',
        icon: 'design',
        title: 'No-Code Builder',
        description: 'Create stunning OOH creatives without design expertise.',
      },
      {
        _key: 'f2',
        icon: 'template',
        title: 'Template Library',
        description: '100+ professionally designed templates for every format.',
      },
      {
        _key: 'f3',
        icon: 'dynamic',
        title: 'Dynamic Creative',
        description: 'Personalize content based on time, weather, and audience.',
      },
      {
        _key: 'f4',
        icon: 'distribute',
        title: 'One-Click Distribution',
        description: 'Deploy creative to screens across your network instantly.',
      },
    ],
    ctaText: 'Start Creating',
    ctaLink: '/contact',
  },
]

async function seedProducts() {
  console.log('Starting product seeding...\n')
  
  for (const product of products) {
    try {
      // Check if product already exists
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]`,
        { slug: product.slug.current }
      )
      
      if (existing) {
        console.log(`⏭️  Skipping "${product.name}" - already exists`)
        continue
      }
      
      const result = await client.create(product)
      console.log(`✅ Created "${product.name}" with ID: ${result._id}`)
    } catch (error) {
      console.error(`❌ Error creating "${product.name}":`, error.message)
    }
  }
  
  console.log('\n✨ Product seeding complete!')
}

seedProducts()
