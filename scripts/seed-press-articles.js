const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

// Press articles to migrate
const pressArticles = [
  {
    _type: 'pressRelease',
    title: 'Moving Walls Launches AI-Powered Audience Targeting Platform',
    slug: { current: 'ai-powered-audience-targeting-press', _type: 'slug' },
    articleSlug: { current: 'ai-powered-audience-targeting', _type: 'slug' },
    publishedAt: '2024-11-15T09:00:00Z',
    category: 'product-launch',
    readTime: '3 min read',
    hasFullArticle: true,
    isPublished: true,
    status: 'published',
    excerpt: 'Revolutionary machine learning algorithms improve campaign performance by 40% while reducing cost per acquisition across all advertising channels.',
    content: [
      { _type: 'block', _key: 'intro', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'intro1', text: 'NEW YORK, NY - November 15, 2024 - Moving Walls, the leading advertising technology platform, today announced the launch of its revolutionary AI-powered audience targeting platform, marking a significant milestone in programmatic advertising innovation.', marks: [] }
      ]},
      { _type: 'block', _key: 'p1', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p1a', text: 'The new platform leverages advanced machine learning algorithms and real-time data processing to deliver unprecedented targeting accuracy, resulting in an average 40% improvement in campaign performance and a 25% reduction in cost per acquisition for early adopters.', marks: [] }
      ]},
      { _type: 'block', _key: 'h1', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h1a', text: 'Revolutionary Technology', marks: [] }
      ]},
      { _type: 'block', _key: 'p2', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p2a', text: '"This launch represents years of research and development in artificial intelligence and machine learning," said Sarah Chen, Chief Technology Officer at Moving Walls. "Our AI platform doesn\'t just analyze demographics—it understands behavioral patterns, contextual signals, and real-time intent to deliver the right message to the right person at precisely the right moment."', marks: [] }
      ]},
      { _type: 'block', _key: 'p3', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p3a', text: 'The platform processes over 10 billion data points daily, analyzing everything from browsing behavior and purchase history to weather patterns and local events that might influence consumer decisions. This comprehensive approach enables advertisers to reach their ideal customers with surgical precision.', marks: [] }
      ]},
      { _type: 'block', _key: 'h2', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h2a', text: 'Key Features', marks: [] }
      ]},
      { _type: 'block', _key: 'l1', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l1a', text: 'Predictive Audience Modeling: AI algorithms predict future customer behavior based on historical data and real-time signals', marks: [] }
      ]},
      { _type: 'block', _key: 'l2', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l2a', text: 'Dynamic Creative Optimization: Automatically adjusts ad creative elements based on audience preferences and performance data', marks: [] }
      ]},
      { _type: 'block', _key: 'l3', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l3a', text: 'Real-time Bidding Intelligence: Optimizes bid strategies using machine learning to maximize ROI', marks: [] }
      ]},
      { _type: 'block', _key: 'l4', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l4a', text: 'Cross-channel Attribution: Provides comprehensive view of customer journey across all touchpoints', marks: [] }
      ]},
      { _type: 'block', _key: 'l5', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l5a', text: 'Privacy-First Design: Built with privacy compliance at its core, ensuring GDPR and CCPA compliance', marks: [] }
      ]},
      { _type: 'block', _key: 'h3', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h3a', text: 'Industry Impact', marks: [] }
      ]},
      { _type: 'block', _key: 'p4', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p4a', text: 'Beta testing with select partners showed remarkable results. Global retail giant TechnoMart saw a 45% increase in conversion rates, while fashion brand StyleForward achieved a 60% reduction in customer acquisition costs. Healthcare provider MedCare improved appointment bookings by 35% while maintaining strict compliance standards.', marks: [] }
      ]},
      { _type: 'block', _key: 'h4', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h4a', text: 'Looking Forward', marks: [] }
      ]},
      { _type: 'block', _key: 'p5', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p5a', text: 'The AI-powered audience targeting platform is now available to all Moving Walls clients, with enterprise features rolling out over the next quarter. The company plans to expand the platform\'s capabilities to include voice and video content optimization, as well as augmented reality advertising experiences.', marks: [] }
      ]},
      { _type: 'block', _key: 'h5', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h5a', text: 'About Moving Walls', marks: [] }
      ]},
      { _type: 'block', _key: 'p6', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p6a', text: 'Founded in 2015, Moving Walls is a leading advertising technology company that specializes in programmatic advertising, audience targeting, and campaign optimization. With offices in New York, San Francisco, London, and Singapore, Moving Walls serves over 500 brands worldwide and processes billions of advertising transactions daily.', marks: [] }
      ]},
    ],
  },
  {
    _type: 'pressRelease',
    title: 'Moving Walls Closes $50M Series C Funding Round',
    slug: { current: 'series-c-funding-press', _type: 'slug' },
    articleSlug: { current: 'series-c-funding', _type: 'slug' },
    publishedAt: '2024-10-28T09:00:00Z',
    category: 'funding',
    readTime: '4 min read',
    hasFullArticle: true,
    isPublished: true,
    status: 'published',
    excerpt: 'Investment led by top-tier VCs will fuel international expansion and product development initiatives to accelerate growth in the global advertising technology market.',
    content: [
      { _type: 'block', _key: 'intro', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'intro1', text: 'NEW YORK, NY - October 28, 2024 - Moving Walls, the rapidly growing advertising technology platform, today announced the successful completion of its $50 million Series C funding round, led by Sequoia Capital with participation from existing investors Andreessen Horowitz, GV (Google Ventures), and new investor Accel Partners.', marks: [] }
      ]},
      { _type: 'block', _key: 'p1', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p1a', text: 'This latest funding round brings Moving Walls\'s total capital raised to $120 million and values the company at $800 million, representing a significant milestone in the company\'s journey to transform the advertising technology landscape.', marks: [] }
      ]},
      { _type: 'block', _key: 'h1', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h1a', text: 'Fueling Global Expansion', marks: [] }
      ]},
      { _type: 'block', _key: 'p2', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p2a', text: 'The Series C funding will primarily support Moving Walls\'s aggressive international expansion plans, with immediate focus on establishing stronger presence in European and Asian markets. The company plans to open new offices in Berlin, Tokyo, and Sydney by Q2 2025, while significantly expanding its existing London and Singapore operations.', marks: [] }
      ]},
      { _type: 'block', _key: 'quote', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'q1', text: '"This investment validates our vision of creating the most intelligent and effective advertising platform in the world," said David Kim, CEO and Co-founder of Moving Walls. "The funding will accelerate our global expansion and allow us to bring our innovative solutions to advertisers and publishers worldwide."', marks: [] }
      ]},
      { _type: 'block', _key: 'h2', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h2a', text: 'Strategic Investment Leadership', marks: [] }
      ]},
      { _type: 'block', _key: 'p3', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p3a', text: 'Sequoia Capital\'s decision to lead the round reflects confidence in Moving Walls\'s market position and growth trajectory. Partner Amanda Chen from Sequoia Capital will join Moving Walls\'s board of directors, bringing extensive experience in scaling technology companies globally.', marks: [] }
      ]},
      { _type: 'block', _key: 'h3', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h3a', text: 'Investment Allocation', marks: [] }
      ]},
      { _type: 'block', _key: 'l1', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l1a', text: 'International Expansion (40%): Opening new offices and hiring local teams in key markets', marks: [] }
      ]},
      { _type: 'block', _key: 'l2', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l2a', text: 'Product Development (30%): Accelerating AI and machine learning capabilities', marks: [] }
      ]},
      { _type: 'block', _key: 'l3', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l3a', text: 'Talent Acquisition (20%): Expanding engineering, sales, and customer success teams', marks: [] }
      ]},
      { _type: 'block', _key: 'l4', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l4a', text: 'Strategic Partnerships (10%): Building relationships with key industry players', marks: [] }
      ]},
    ],
  },
  {
    _type: 'pressRelease',
    title: 'New Privacy-First Measurement Suite Launches',
    slug: { current: 'privacy-first-measurement-press', _type: 'slug' },
    articleSlug: { current: 'privacy-first-measurement', _type: 'slug' },
    publishedAt: '2024-07-22T09:00:00Z',
    category: 'product-update',
    readTime: '5 min read',
    hasFullArticle: true,
    isPublished: true,
    status: 'published',
    excerpt: 'Industry-leading privacy compliance tools help brands navigate evolving data regulations while maintaining measurement effectiveness and attribution accuracy.',
    content: [
      { _type: 'block', _key: 'intro', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'intro1', text: 'NEW YORK, NY - July 22, 2024 - Moving Walls today unveiled its comprehensive Privacy-First Measurement Suite, designed to help brands maintain accurate attribution and measurement capabilities while ensuring full compliance with global privacy regulations including GDPR, CCPA, and emerging data protection laws.', marks: [] }
      ]},
      { _type: 'block', _key: 'p1', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p1a', text: 'The new suite addresses the growing challenge brands face in measuring advertising effectiveness as third-party cookies phase out and privacy regulations become more stringent. Moving Walls\'s solution provides accurate measurement without compromising user privacy or regulatory compliance.', marks: [] }
      ]},
      { _type: 'block', _key: 'h1', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h1a', text: 'Privacy by Design', marks: [] }
      ]},
      { _type: 'block', _key: 'p2', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p2a', text: 'The Privacy-First Measurement Suite is built on the principle of "privacy by design," ensuring that data protection and user consent are integral to every measurement process. The platform uses advanced techniques including differential privacy, federated learning, and anonymized cohort analysis to deliver insights without exposing individual user data.', marks: [] }
      ]},
      { _type: 'block', _key: 'quote', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'q1', text: '"Privacy isn\'t an afterthought in our measurement approach—it\'s the foundation," said Dr. Lisa Rodriguez, Chief Privacy Officer at Moving Walls. "We\'ve engineered solutions that give advertisers the insights they need while respecting user privacy and meeting the highest compliance standards."', marks: [] }
      ]},
      { _type: 'block', _key: 'h2', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h2a', text: 'Key Features', marks: [] }
      ]},
      { _type: 'block', _key: 'l1', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l1a', text: 'Cookieless Attribution: Advanced statistical models provide accurate attribution without relying on third-party cookies', marks: [] }
      ]},
      { _type: 'block', _key: 'l2', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l2a', text: 'Consent Management Integration: Seamless integration with consent management platforms ensures compliance with user preferences', marks: [] }
      ]},
      { _type: 'block', _key: 'l3', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l3a', text: 'Differential Privacy Analytics: Mathematical techniques add statistical noise to protect individual privacy while preserving aggregate insights', marks: [] }
      ]},
      { _type: 'block', _key: 'l4', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l4a', text: 'First-Party Data Activation: Tools to maximize value from consented first-party data relationships', marks: [] }
      ]},
      { _type: 'block', _key: 'l5', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l5a', text: 'Cross-Device Tracking: Privacy-compliant methods for understanding cross-device customer journeys', marks: [] }
      ]},
      { _type: 'block', _key: 'l6', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l6a', text: 'Real-Time Privacy Monitoring: Continuous compliance monitoring with automated alerts for potential issues', marks: [] }
      ]},
      { _type: 'block', _key: 'h3', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h3a', text: 'Industry Impact', marks: [] }
      ]},
      { _type: 'block', _key: 'p3', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p3a', text: 'Early adopters of the Privacy-First Measurement Suite have reported maintaining 95% of their previous measurement accuracy while achieving full regulatory compliance. The solution has been particularly valuable for brands operating in multiple jurisdictions with varying privacy requirements.', marks: [] }
      ]},
    ],
  },
  {
    _type: 'pressRelease',
    title: 'Moving Walls Named \'AdTech Company of the Year\' by Industry Awards',
    slug: { current: 'adtech-company-of-year-press', _type: 'slug' },
    articleSlug: { current: 'adtech-company-of-year', _type: 'slug' },
    publishedAt: '2024-08-05T09:00:00Z',
    category: 'recognition',
    readTime: '3 min read',
    hasFullArticle: true,
    isPublished: true,
    status: 'published',
    excerpt: 'Recognition highlights company\'s innovation in programmatic advertising and measurement solutions, cementing position as industry leader.',
    content: [
      { _type: 'block', _key: 'intro', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'intro1', text: 'NEW YORK, NY - August 5, 2024 - Moving Walls has been named \'AdTech Company of the Year\' at the prestigious Digital Marketing Excellence Awards, recognizing the company\'s outstanding innovation in programmatic advertising and measurement solutions.', marks: [] }
      ]},
      { _type: 'block', _key: 'p1', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p1a', text: 'The award ceremony, held at the Marriott Marquis in New York City, brought together over 1,000 industry leaders, marketers, and technology innovators to celebrate excellence in digital marketing and advertising technology.', marks: [] }
      ]},
      { _type: 'block', _key: 'h1', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h1a', text: 'Award Recognition', marks: [] }
      ]},
      { _type: 'block', _key: 'p2', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p2a', text: 'The judges praised Moving Walls\'s comprehensive approach to solving complex advertising challenges through innovative technology and data-driven insights. The company was specifically recognized for its AI-powered audience targeting platform, privacy-first measurement tools, and exceptional client results.', marks: [] }
      ]},
      { _type: 'block', _key: 'quote', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'q1', text: '"Moving Walls has consistently demonstrated leadership in advancing advertising technology while maintaining the highest standards of privacy and transparency," said Dr. Elizabeth Harper, Chair of the Awards Committee. "Their innovative solutions have set new industry benchmarks for effectiveness and accountability."', marks: [] }
      ]},
      { _type: 'block', _key: 'h2', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h2a', text: 'Innovation Highlights', marks: [] }
      ]},
      { _type: 'block', _key: 'l1', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l1a', text: 'AI-Powered Targeting: Revolutionary machine learning algorithms that improve campaign performance by up to 40%', marks: [] }
      ]},
      { _type: 'block', _key: 'l2', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l2a', text: 'Privacy-First Measurement: Industry-leading tools that provide accurate attribution while ensuring complete privacy compliance', marks: [] }
      ]},
      { _type: 'block', _key: 'l3', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l3a', text: 'Cross-Channel Optimization: Unified platform that optimizes campaigns across all digital and traditional media channels', marks: [] }
      ]},
      { _type: 'block', _key: 'l4', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [
        { _type: 'span', _key: 'l4a', text: 'Real-Time Analytics: Advanced dashboard providing actionable insights within minutes of campaign launch', marks: [] }
      ]},
      { _type: 'block', _key: 'h3', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h3a', text: 'Client Impact', marks: [] }
      ]},
      { _type: 'block', _key: 'p3', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p3a', text: '"This award is a testament to our team\'s dedication to innovation and our clients\' success," said David Kim, CEO of Moving Walls. "We\'re honored to be recognized by our peers and remain committed to pushing the boundaries of what\'s possible in advertising technology."', marks: [] }
      ]},
    ],
  },
  {
    _type: 'pressRelease',
    title: 'Moving Walls Opens European Headquarters in London',
    slug: { current: 'london-headquarters-press', _type: 'slug' },
    articleSlug: { current: 'london-headquarters', _type: 'slug' },
    publishedAt: '2024-06-18T09:00:00Z',
    category: 'expansion',
    readTime: '2 min read',
    hasFullArticle: true,
    isPublished: true,
    status: 'published',
    excerpt: 'New office serves as regional hub for European operations and client services expansion, reinforcing commitment to global growth.',
    content: [
      { _type: 'block', _key: 'intro', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'intro1', text: 'LONDON, UK - June 18, 2024 - Moving Walls today announced the opening of its European headquarters in London\'s prestigious Canary Wharf district, marking a significant milestone in the company\'s international expansion strategy.', marks: [] }
      ]},
      { _type: 'block', _key: 'p1', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p1a', text: 'The new 25,000 square foot office will serve as the regional hub for Moving Walls\'s European operations, housing teams focused on sales, client services, product development, and regulatory compliance across the European market.', marks: [] }
      ]},
      { _type: 'block', _key: 'h1', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h1a', text: 'Strategic Location', marks: [] }
      ]},
      { _type: 'block', _key: 'p2', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p2a', text: 'Located at 40 Bank Street in Canary Wharf, the new headquarters positions Moving Walls at the heart of London\'s financial and technology district. The location provides easy access to major European markets and places the company alongside other leading global technology firms.', marks: [] }
      ]},
      { _type: 'block', _key: 'quote', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'q1', text: '"London is the perfect base for our European expansion," said David Kim, CEO of Moving Walls. "The city\'s position as a global financial center, combined with its thriving tech ecosystem and access to top talent, makes it an ideal location for our regional headquarters."', marks: [] }
      ]},
      { _type: 'block', _key: 'h2', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h2a', text: 'Team Expansion', marks: [] }
      ]},
      { _type: 'block', _key: 'p3', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p3a', text: 'The London office officially opened with a team of 50 employees and plans to expand to 150 staff members by the end of 2024. Leading the European operations is Emma Richardson, who joins Moving Walls as VP of European Operations.', marks: [] }
      ]},
      { _type: 'block', _key: 'h3', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h3a', text: 'Market Opportunity', marks: [] }
      ]},
      { _type: 'block', _key: 'p4', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p4a', text: 'The European digital advertising market represents significant growth opportunity for Moving Walls, with programmatic advertising spend expected to reach €45 billion by 2025. The company\'s privacy-first approach and GDPR-compliant solutions position it well to serve European brands and agencies.', marks: [] }
      ]},
    ],
  },
  {
    _type: 'pressRelease',
    title: 'Strategic Partnership with Global Transit Authority Network',
    slug: { current: 'transit-partnership-press', _type: 'slug' },
    articleSlug: { current: 'transit-partnership', _type: 'slug' },
    publishedAt: '2024-09-12T09:00:00Z',
    category: 'partnership',
    readTime: '2 min read',
    hasFullArticle: true,
    isPublished: true,
    status: 'published',
    excerpt: 'Major partnership expands Moving Walls\'s out-of-home advertising network to 25 new metropolitan areas, reaching over 100 million daily commuters worldwide.',
    content: [
      { _type: 'block', _key: 'intro', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'intro1', text: 'NEW YORK, NY - September 12, 2024 - Moving Walls today announced a landmark partnership with the Global Transit Authority Network (GTAN), significantly expanding its out-of-home advertising capabilities across 25 major metropolitan areas worldwide.', marks: [] }
      ]},
      { _type: 'block', _key: 'p1', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p1a', text: 'This strategic alliance will provide Moving Walls with exclusive advertising access to premium transit locations including subway systems, bus networks, and transit hubs in cities across North America, Europe, and Asia, reaching an estimated 100 million daily commuters.', marks: [] }
      ]},
      { _type: 'block', _key: 'h1', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h1a', text: 'Partnership Scope', marks: [] }
      ]},
      { _type: 'block', _key: 'p2', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p2a', text: 'The partnership encompasses transit systems in major cities including New York, London, Tokyo, Singapore, Toronto, Paris, Berlin, and Sydney, among others across North America, Europe, and Asia-Pacific.', marks: [] }
      ]},
      { _type: 'block', _key: 'h2', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h2a', text: 'Digital Innovation in Transit', marks: [] }
      ]},
      { _type: 'block', _key: 'p3', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p3a', text: 'As part of this partnership, Moving Walls will deploy state-of-the-art digital displays throughout the transit network, featuring dynamic content capabilities and real-time optimization based on passenger flow, weather conditions, and local events.', marks: [] }
      ]},
      { _type: 'block', _key: 'quote', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'q1', text: '"This partnership represents a significant evolution in out-of-home advertising," said Maria Santos, VP of Strategic Partnerships at Moving Walls. "We\'re not just placing static ads in transit locations—we\'re creating dynamic, contextually relevant experiences that provide value to both advertisers and commuters."', marks: [] }
      ]},
      { _type: 'block', _key: 'h3', style: 'h2', markDefs: [], children: [
        { _type: 'span', _key: 'h3a', text: 'Industry Impact', marks: [] }
      ]},
      { _type: 'block', _key: 'p4', style: 'normal', markDefs: [], children: [
        { _type: 'span', _key: 'p4a', text: 'The partnership is expected to generate significant value for advertisers seeking to reach urban audiences at scale. Early pilot programs showed 60% higher engagement rates compared to traditional outdoor advertising, with particularly strong performance in the retail, entertainment, and technology sectors.', marks: [] }
      ]},
    ],
  },
];

async function seedPressArticles() {
  console.log('Starting press articles migration...\n');

  for (const article of pressArticles) {
    const articleSlug = article.articleSlug.current;
    
    // Check if already exists
    const existing = await client.fetch(
      `*[_type == "pressRelease" && articleSlug.current == $slug][0]._id`,
      { slug: articleSlug }
    );
    
    if (existing) {
      console.log(`⏭️  Skipping "${article.title}" - already exists`);
      continue;
    }
    
    try {
      const result = await client.create(article);
      console.log(`✅ Created: "${article.title}" (articleSlug: ${articleSlug})`);
    } catch (error) {
      console.error(`❌ Failed to create "${article.title}":`, error.message);
    }
  }

  console.log('\n✅ Press articles migration complete!');
}

seedPressArticles().catch(console.error);
