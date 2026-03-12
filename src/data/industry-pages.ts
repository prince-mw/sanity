/**
 * Static fallback data for industry pages (Finance, Healthcare, Retail)
 * Used when Sanity data is unavailable
 */

export const financePageData = {
  industry: 'finance' as const,
  badgeText: 'Finance & Banking',
  title: 'Build Trust &',
  titleHighlight: 'Drive Growth',
  subtitle: 'Establish credibility and drive customer acquisition with financial advertising that builds trust and communicates reliability to your target market.',
  heroStats: [
    { value: '$4.20', label: 'return for every $1 spent on OOH' },
    { value: '68%', label: 'increase in branch visits' },
    { value: '156%', label: 'boost in brand awareness' }
  ],
  benefits: [
    { title: 'Build Financial Trust', description: 'Establish credibility and reliability in financial services' },
    { title: 'Drive Account Growth', description: 'Increase new account openings and customer acquisition' },
    { title: 'Target Demographics', description: 'Reach specific financial planning segments effectively' },
    { title: 'Security Messaging', description: 'Communicate safety and security of financial services' }
  ],
  services: [
    { 
      title: 'Banking & Credit Unions', 
      description: 'Drive branch visits and account openings with local community focus', 
      offerings: ['Branch Promotion', 'Account Acquisition', 'Loan Services', 'Community Banking'] 
    },
    { 
      title: 'Investment Services', 
      description: 'Build trust for wealth management and investment advisory services', 
      offerings: ['Wealth Management', 'Retirement Planning', 'Investment Education', 'Advisory Services'] 
    },
    { 
      title: 'Insurance Companies', 
      description: 'Increase policy sales and brand awareness for insurance products', 
      offerings: ['Life Insurance', 'Auto Insurance', 'Home Insurance', 'Business Insurance'] 
    },
    { 
      title: 'Fintech & Digital Banking', 
      description: 'Promote digital financial services and mobile banking solutions', 
      offerings: ['Mobile Banking', 'Digital Payments', 'Cryptocurrency', 'Personal Finance'] 
    }
  ],
  trustFactors: [
    { metric: '73%', description: 'of consumers trust brands with local advertising' },
    { metric: '2.5x', description: 'higher consideration for financial services' },
    { metric: '45%', description: 'increase in brand trust and reliability' },
    { metric: '89%', description: 'recognize financial brands from OOH campaigns' }
  ],
  caseStudies: []
}

export const healthcarePageData = {
  industry: 'healthcare' as const,
  badgeText: 'Healthcare Marketing',
  title: 'Connect with Patients',
  titleHighlight: 'Effectively',
  subtitle: 'Build trust, increase awareness, and drive patient engagement with healthcare advertising that reaches your community where they live, work, and travel.',
  heroStats: [
    { value: '89%', label: 'trust healthcare brands with local presence' },
    { value: '65%', label: 'influenced by OOH for health decisions' },
    { value: '2.8x', label: 'higher patient acquisition rate' }
  ],
  benefits: [
    { title: 'Build Patient Trust', description: 'Establish credibility and trust in your healthcare services' },
    { title: 'Local Community Focus', description: 'Connect with patients in your service area effectively' },
    { title: 'Health Awareness', description: 'Educate communities about health services and prevention' },
    { title: 'Emergency Services', description: 'Promote urgent care and emergency services when needed' }
  ],
  services: [
    { 
      title: 'Hospital & Health Systems', 
      description: 'Build community trust and drive patient acquisition for health systems', 
      offerings: ['Brand Awareness', 'Service Promotion', 'Community Outreach', 'Emergency Care'] 
    },
    { 
      title: 'Specialist Practices', 
      description: 'Increase referrals and direct patient visits for specialized healthcare', 
      offerings: ['Specialist Referrals', 'Direct Patient Marketing', 'Condition Awareness', 'Treatment Education'] 
    },
    { 
      title: 'Wellness & Prevention', 
      description: 'Promote preventive care and wellness programs to improve community health', 
      offerings: ['Vaccination Campaigns', 'Screening Programs', 'Wellness Education', 'Lifestyle Programs'] 
    }
  ],
  trustFactors: [
    { metric: '89%', description: 'trust healthcare brands with local presence' },
    { metric: '65%', description: 'are influenced by OOH for health decisions' },
    { metric: '2.8x', description: 'higher patient acquisition rate' }
  ],
  caseStudies: []
}

export const retailPageData = {
  industry: 'retail' as const,
  badgeText: 'Retail & E-commerce',
  title: 'Drive Foot Traffic &',
  titleHighlight: 'Boost Sales',
  subtitle: 'Transform your retail advertising with strategic out-of-home campaigns that connect with shoppers at the right moment, driving them from awareness to your store entrance.',
  heroStats: [
    { value: '45%', label: 'Foot Traffic ↑' },
    { value: '32%', label: 'Sales Boost ↗' },
    { value: '28%', label: 'Awareness ⭐' }
  ],
  benefits: [
    { title: 'Increase Foot Traffic', description: 'Drive more customers to your physical locations with targeted OOH campaigns' },
    { title: 'Boost Sales', description: 'Convert awareness into purchases with strategic placement and timing' },
    { title: 'Target Shoppers', description: 'Reach customers when they\'re in shopping mode near retail locations' },
    { title: 'Omnichannel Integration', description: 'Connect offline advertising with online experiences seamlessly' }
  ],
  services: [],
  trustFactors: [],
  caseStudies: [
    { brand: 'Fashion Retailer', metric: '45% increase', description: 'in store visits during campaign period' },
    { brand: 'Electronics Chain', metric: '32% boost', description: 'in weekend sales with targeted mall advertising' },
    { brand: 'Home Goods Store', metric: '28% growth', description: 'in brand awareness among target demographics' }
  ]
}

export type IndustryPageData = typeof financePageData | typeof healthcarePageData | typeof retailPageData
