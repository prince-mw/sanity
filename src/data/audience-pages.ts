/**
 * Static fallback data for audience pages (Agencies, Brands, Media Owners)
 * Used when Sanity data is unavailable
 */

export const agenciesPageData = {
  pageType: 'agencies' as const,
  title: 'White Label OOH Platform',
  titleHighlight: 'Built for Agencies',
  subtitle: 'Offer your clients a complete out of home solution under your own brand. Moving Walls gives you global inventory, intelligent campaign planning, and real-time analytics that help your agency act faster, plan smarter, and deliver measurable results.',
  primaryCTA: { text: 'Become a Partner', href: '/contact' },
  secondaryCTA: { text: 'Watch Demo', href: '#platform' },
  platformFeatures: [
    {
      id: 'planning',
      name: 'Planning',
      title: 'Customisable Planning',
      description: 'Our planning tool is designed to seamlessly integrate with your current workflows by providing custom audiences, site scores, and negotiation features that can be tailored to your specific needs.',
      linkHref: '/mw-planner',
      linkText: 'Learn more'
    },
    {
      id: 'reach',
      name: 'Extended Reach',
      title: 'Integrated Planning',
      description: 'Our planning system offers an integrated approach that allows for the extension of OOH planning to mobile platforms. Additionally, our platform allows for the extraction of audience lists, which can be used for future retargeting efforts.',
      linkHref: '/mw-reach',
      linkText: 'Learn more'
    },
    {
      id: 'support',
      name: 'Support',
      title: 'Live Support',
      description: 'Our platform provides live support from OOH experts who are readily available to assist you with any inquiries or additional planning requests you may have.',
      linkHref: '/contact',
      linkText: 'Contact us'
    }
  ],
  benefits: [
    { title: 'Global Inventory Access', description: 'Access OOH inventory across multiple markets from a single platform' },
    { title: 'White Label Solution', description: 'Present the platform under your own brand identity' },
    { title: 'Real-time Analytics', description: 'Track campaign performance with live reporting dashboards' },
    { title: 'Intelligent Planning', description: 'AI-powered recommendations for optimal media mix' }
  ],
  stats: [
    { value: '500K+', label: 'OOH Sites Globally' },
    { value: '30+', label: 'Markets Covered' },
    { value: '100+', label: 'Agency Partners' },
    { value: '24/7', label: 'Expert Support' }
  ],
  faqs: [
    { question: 'How does white labeling work?', answer: 'You can customize the platform with your agency\'s branding, including logo, colors, and domain name.' },
    { question: 'What markets are available?', answer: 'We cover 30+ markets across Asia Pacific, Europe, Middle East, and the Americas.' },
    { question: 'Is training provided?', answer: 'Yes, we provide comprehensive onboarding and ongoing training for your team.' }
  ]
}

export const brandsPageData = {
  pageType: 'brands' as const,
  title: 'OOH Advertising',
  titleHighlight: 'Made Simple',
  subtitle: 'Launch measurable outdoor campaigns across cities and continents from one connected platform. From brief to live in minutes. From impression to impact with clarity.',
  primaryCTA: { text: 'Get A Demo', href: '/contact' },
  secondaryCTA: { text: 'Learn More', href: '#features' },
  platformFeatures: [
    {
      id: 'campaigns',
      name: 'Campaign Creation',
      title: 'Create and Launch in Minutes',
      description: 'Turn your brief into an optimised OOH proposal instantly. Define your audience, set campaign objectives, select markets, and activate with one click.',
      linkHref: '/mw-planner',
      linkText: 'Learn more'
    },
    {
      id: 'realtime',
      name: 'Real Time Activation',
      title: 'Activate Campaigns Instantly',
      description: 'Deploy your campaigns across multiple markets simultaneously with real-time activation and dynamic content updates.',
      linkHref: '/mw-activate',
      linkText: 'Learn more'
    },
    {
      id: 'measurement',
      name: 'Full Funnel Measurement',
      title: 'Measure Every Impact',
      description: 'Track awareness, consideration, and conversion with comprehensive measurement tools that connect OOH exposure to business outcomes.',
      linkHref: '/mw-measure',
      linkText: 'Learn more'
    }
  ],
  benefits: [
    { title: 'Simplified Workflow', description: 'Launch campaigns in minutes, not weeks' },
    { title: 'Global Reach', description: 'Access inventory across multiple continents' },
    { title: 'Full Attribution', description: 'Connect OOH to sales and conversions' },
    { title: 'Real-time Optimization', description: 'Adjust campaigns based on performance data' }
  ],
  stats: [
    { value: '10x', label: 'Faster Campaign Launch' },
    { value: '85%', label: 'Planning Time Saved' },
    { value: '3.5x', label: 'Average ROAS' },
    { value: '100%', label: 'Campaign Visibility' }
  ],
  faqs: [
    { question: 'How quickly can I launch a campaign?', answer: 'With our platform, you can go from brief to live campaign in as little as 15 minutes.' },
    { question: 'What measurement options are available?', answer: 'We offer impression tracking, foot traffic attribution, brand lift studies, and sales correlation analysis.' },
    { question: 'Can I run campaigns across multiple countries?', answer: 'Yes, our platform supports multi-market campaigns with centralized management and reporting.' }
  ]
}

export const mediaOwnersPageData = {
  pageType: 'media-owners' as const,
  title: 'Monetize Your OOH Inventory',
  titleHighlight: 'Smarter',
  subtitle: 'Turn your screens into a high-performing revenue engine. Connect to premium advertisers, optimize pricing dynamically, and automate your entire OOH sales operation so your team can focus on growth instead of repetitive tasks.',
  primaryCTA: { text: 'Join Our Network', href: '/contact' },
  secondaryCTA: { text: 'Learn More', href: '#platform' },
  platformFeatures: [
    {
      id: 'marketplace',
      name: 'Marketplace',
      title: 'Connect to Premium Demand',
      description: 'Connect your OOH inventory to an integrated demand marketplace designed for media owners. Enable access to programmatic and direct demand sources, improve fill rates, and monetize inventory more efficiently across digital and static screens.',
      linkHref: '/mw-market',
      linkText: 'Learn more'
    },
    {
      id: 'inventory',
      name: 'Inventory',
      title: 'Manage Your Assets',
      description: 'Centralize all your OOH assets in one platform. Track availability, manage bookings, and optimize inventory allocation with intelligent scheduling tools.',
      linkHref: '/products',
      linkText: 'Learn more'
    },
    {
      id: 'yield',
      name: 'Yield',
      title: 'Maximize Revenue',
      description: 'Use dynamic pricing and yield optimization tools to maximize the value of every screen in your network. AI-powered recommendations help you capture more revenue.',
      linkHref: '/products',
      linkText: 'Learn more'
    }
  ],
  benefits: [
    { title: 'Increased Fill Rates', description: 'Connect to more demand sources and reduce unsold inventory' },
    { title: 'Dynamic Pricing', description: 'Optimize pricing based on demand and market conditions' },
    { title: 'Automated Operations', description: 'Reduce manual work with automated booking and scheduling' },
    { title: 'Premium Demand Access', description: 'Connect directly with agency and brand advertisers' }
  ],
  stats: [
    { value: '40%', label: 'Revenue Increase' },
    { value: '90%', label: 'Fill Rate' },
    { value: '50%', label: 'Ops Time Saved' },
    { value: '1000+', label: 'Active Advertisers' }
  ],
  faqs: [
    { question: 'How do I connect my inventory?', answer: 'We provide API integration and manual upload options. Our team will help you onboard your entire network.' },
    { question: 'What pricing models are supported?', answer: 'We support CPM, fixed rate, share of voice, and custom pricing models.' },
    { question: 'Can I maintain direct sales relationships?', answer: 'Absolutely. Our platform complements your direct sales with additional demand sources.' }
  ]
}

export type AudiencePageData = typeof agenciesPageData | typeof brandsPageData | typeof mediaOwnersPageData
