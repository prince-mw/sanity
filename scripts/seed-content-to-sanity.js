/**
 * Seed Content to Sanity CMS
 * Phase 1: Seeds data for 12 existing schema types
 * 
 * Run: SANITY_API_TOKEN=<token> node scripts/seed-content-to-sanity.js
 */

const { createClient } = require('@sanity/client')
const crypto = require('crypto')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
})

function generateKey() {
  return crypto.randomBytes(6).toString('hex')
}

// ============================================
// OOH FORMATS (9 items)
// ============================================
const oohFormats = [
  {
    _type: 'oohFormat',
    name: 'Unipole',
    slug: { _type: 'slug', current: 'unipole' },
    category: 'dooh',
    icon: 'digital',
    shortDescription: 'The most popular DOOH format, Unipoles are found along high-traffic roads where a large screen is attached to a tall pole for maximum visibility.',
    longDescription: 'Unipoles represent one of the most effective and popular DOOH formats in outdoor advertising. Strategically positioned along high-traffic roads and highways, these towering displays feature large screens attached to tall poles, ensuring maximum visibility from great distances. The elevated positioning makes them impossible to miss for commuters, creating powerful brand impressions during daily journeys.',
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
    longDescription: 'Wall façade advertising transforms building exteriors into dynamic brand canvases at the busiest intersections and junctions in urban centers. These large-format digital screens are strategically mounted on building walls at high-traffic locations where foot traffic meets vehicle traffic.',
    specs: ['Size: Custom (building dependent)', 'High-resolution LED displays', 'Premium junction locations', 'Full motion video capable', 'Weather-resistant construction', 'Remote content management'],
    benefits: ['Dual audience reach (pedestrian + vehicular)', 'High-traffic junction visibility', 'Impactful creative canvas', 'Urban landmark presence', 'Constant audience flow', 'Premium brand positioning'],
    imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
    order: 2,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'E-Buntings',
    slug: { _type: 'slug', current: 'e-buntings' },
    category: 'dooh',
    icon: 'led',
    shortDescription: 'These synchronous, multi-panel displays line public streets - positioned along busy streets, these screens are almost impossible to miss!',
    longDescription: 'E-Buntings are a unique and highly effective DOOH format featuring multiple synchronized digital panels arranged along public streets. Whether positioned along the sides of busy walkways or running down the middle of major thoroughfares, these screens work in harmony to display the same advertisement simultaneously.',
    specs: ['Multi-panel synchronized displays', 'Street-side positioning', 'Same-time ad playback', 'High-frequency locations', 'Weather-resistant design', 'Central/side street mounting'],
    benefits: ['Synchronized brand messaging', 'Impossible to miss', 'Multiple touchpoints', 'Street-level engagement', 'Repetitive exposure', 'Immersive ad experience'],
    imageUrl: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80',
    order: 3,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'Overhead Bridge',
    slug: { _type: 'slug', current: 'overhead-bridge' },
    category: 'dooh',
    icon: 'billboard',
    shortDescription: 'Overhead bridges have the size and strength to support massive screens spanning the entire width of the road.',
    longDescription: 'Overhead bridge advertising leverages the structural advantage of pedestrian bridges and overpasses to deliver massive visual impact. These screens span the entire width of roads, ensuring that every driver passing underneath has your brand directly in their eyeline.',
    specs: ['Full road-width spans', 'Massive screen sizes', 'Bridge-mounted structure', 'High-visibility positioning', 'LED/Digital displays', 'Unavoidable eyeline placement'],
    benefits: ['Unavoidable visibility', 'Full road coverage', 'Direct eyeline targeting', 'Massive creative canvas', 'High traffic exposure', 'Memorable brand impact'],
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    order: 4,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'LED Truck',
    slug: { _type: 'slug', current: 'led-truck' },
    category: 'mobile',
    icon: 'transit',
    shortDescription: 'An incredible, dynamic DOOH format that allows you to place an ad where your target audience is and follow them around.',
    longDescription: 'LED Trucks represent the ultimate in flexible outdoor advertising, combining the impact of large digital displays with complete mobility. These truck-mounted LED screens can be deployed wherever your target audience gathers.',
    specs: ['Mobile LED screen mounting', 'GPS route tracking', 'Real-time content updates', 'Flexible deployment', 'Event positioning capability', 'Route optimization'],
    benefits: ['Go where your audience is', 'Follow target routes', 'Event marketing ready', 'Maximum flexibility', 'Real-time deployment', 'Location-specific targeting'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    order: 5,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'Airport Screens',
    slug: { _type: 'slug', current: 'airport-screens' },
    category: 'transit',
    icon: 'airport',
    shortDescription: 'Airports are filled with people who are waiting - you have a captive audience literally looking around for things to occupy their time.',
    longDescription: 'Airport advertising provides access to one of the most valuable captive audiences in advertising. Travelers spend significant time waiting - at check-in counters, security lines, immigration queues, baggage carousels, and departure gates.',
    specs: ['Terminal-wide coverage', 'Gate area screens', 'Baggage claim displays', 'Check-in counter positions', 'Immigration/Security zones', 'Departure lounge screens'],
    benefits: ['Captive waiting audience', 'Extended dwell time', 'Affluent traveler demographic', 'Business traveler reach', 'International exposure', 'High attention rates'],
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    order: 6,
    isFeatured: true,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'Digital Bulletin',
    slug: { _type: 'slug', current: 'digital-bulletin' },
    category: 'dooh',
    icon: 'digital',
    shortDescription: 'Large billboards on the side of highways and heavy-traffic roads, these massive billboards tower over their surroundings.',
    longDescription: 'Digital bulletins are the giants of outdoor advertising, positioned along highways and major arterial roads where they tower over the surrounding landscape.',
    specs: ['Size: 14\' x 48\' to 20\' x 60\'', 'Highway-side positioning', 'Towering height placement', 'LED digital displays', 'High-resolution graphics', 'Remote content management'],
    benefits: ['Unparalleled visibility', 'Highway dominance', 'Towers over surroundings', 'Massive audience reach', 'Extended viewing time', 'Premium brand exposure'],
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    order: 7,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'Bus Shelter',
    slug: { _type: 'slug', current: 'bus-shelter' },
    category: 'street-furniture',
    icon: 'street',
    shortDescription: 'An extremely popular format positioned at high traffic locations with lots of foot and vehicle traffic.',
    longDescription: 'Bus shelter advertising captures the attention of commuters in a unique environment where they have time to engage with your message.',
    specs: ['Size: 4\' x 6\' typical panel', 'Backlit/digital options', 'Double-sided visibility', 'Illuminated 24/7', 'Weather-protected viewing', 'High-traffic locations'],
    benefits: ['Eye-level viewing', 'Captive waiting audience', 'Dual audience reach', 'Urban coverage', 'High frequency exposure', 'Commuter targeting'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    order: 8,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'oohFormat',
    name: 'Cinema',
    slug: { _type: 'slug', current: 'cinema' },
    category: 'place-based',
    icon: 'spectacular',
    shortDescription: 'Nothing beats a large screen in a closed room where people have come in with the intention of watching that very screen.',
    longDescription: 'Cinema advertising offers an unmatched opportunity to reach fully engaged audiences in a premium entertainment environment.',
    specs: ['Pre-show ads: 15-60 seconds', 'Large screen format', 'Premium audio systems', 'Captive environment', 'Genre-based targeting', 'Movie audience profiling'],
    benefits: ['Full attention viewing', 'Captive audience', 'Premium environment', 'Emotional engagement', 'Predictable demographics', 'High recall rates'],
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    order: 9,
    isFeatured: false,
    isActive: true,
  },
]

// ============================================
// INTEGRATIONS (13 items)
// ============================================
const integrations = [
  {
    _type: 'integration',
    name: 'VIOOH',
    slug: { _type: 'slug', current: 'viooh' },
    category: 'ssp',
    description: 'Premium programmatic digital out-of-home (pDOOH) marketplace enabling automated trading of OOH inventory globally.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Programmatic DOOH', 'Real-time bidding', 'Global inventory', 'Audience targeting'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/viooh.svg',
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
    products: ['MW Planner', 'MW Measure', 'MW Activate', 'MW Marketplace'],
    features: ['Programmatic guaranteed', 'Custom bidding', 'Audience activation', 'Cross-device'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/dv360.svg',
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
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Header bidding', 'CTV/OTT', 'Audience segments', 'Deal management'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/magnite.svg',
    order: 3,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Google Ad Manager 360',
    slug: { _type: 'slug', current: 'google-ad-manager-360' },
    category: 'ssp',
    description: 'Enterprise ad serving platform with advanced forecasting, yield management, and programmatic access.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Yield optimization', 'Programmatic deals', 'Forecasting', 'Multi-format'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/google-ad-manager-360.svg',
    order: 4,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'The Trade Desk',
    slug: { _type: 'slug', current: 'the-trade-desk' },
    category: 'dsp',
    description: 'The leading independent DSP for omnichannel programmatic advertising with Unified ID 2.0.',
    products: ['MW Planner', 'MW Measure', 'MW Activate', 'MW Marketplace'],
    features: ['Unified ID 2.0', 'Kokai AI', 'CTV/OTT', 'Retail media'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/the-trade-desk.svg',
    order: 5,
    isFeatured: true,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Cassie',
    slug: { _type: 'slug', current: 'cassie' },
    category: 'dsp',
    description: 'Consent and preference management platform ensuring compliant data-driven advertising.',
    products: ['MW Activate', 'MW Measure'],
    features: ['Consent management', 'Preference center', 'GDPR compliance', 'Data governance'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/cassie.svg',
    order: 6,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'MAX',
    slug: { _type: 'slug', current: 'max' },
    category: 'dsp',
    description: "Moving Walls' programmatic OOH buying platform for automated, data-driven outdoor advertising campaigns.",
    products: ['MW Planner', 'MW Activate', 'MW Measure'],
    features: ['Automated buying', 'Audience data', 'Campaign optimization', 'Real-time reporting'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/max.svg',
    order: 7,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'StackAdapt',
    slug: { _type: 'slug', current: 'stackadapt' },
    category: 'dsp',
    description: 'Multi-channel programmatic advertising platform with native, display, video, CTV, and DOOH capabilities.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Multi-channel', 'Native ads', 'Contextual targeting', 'Custom audiences'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/stackadapt.svg',
    order: 8,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Amobee',
    slug: { _type: 'slug', current: 'amobee' },
    category: 'dsp',
    description: 'End-to-end advertising platform for planning, activation, and optimization across all channels.',
    products: ['MW Planner', 'MW Activate'],
    features: ['Cross-channel', 'Brand intelligence', 'TV planning', 'Audience analytics'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/amobee.svg',
    order: 9,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'AppNexus',
    slug: { _type: 'slug', current: 'appnexus' },
    category: 'dsp',
    description: 'Enterprise technology platform for programmatic advertising powering Xandr/Microsoft Advertising.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Programmable bidder', 'Curated deals', 'Identity', 'Yield analytics'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/appnexus.svg',
    order: 10,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'MediaMath',
    slug: { _type: 'slug', current: 'mediamath' },
    category: 'dsp',
    description: 'Omnichannel demand-side platform for advanced programmatic campaigns with transparency and control.',
    products: ['MW Planner', 'MW Activate'],
    features: ['Brain AI', 'Omnichannel', 'Identity', 'Transparency'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/mediamath.svg',
    order: 11,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Verizon Media',
    slug: { _type: 'slug', current: 'verizon' },
    category: 'dsp',
    description: "Verizon's advertising technology platform with premium inventory and telecom data for precision targeting.",
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Telecom data', 'Premium inventory', 'Cross-device', 'Brand safety'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/verizon.svg',
    order: 12,
    isFeatured: false,
    isActive: true,
  },
  {
    _type: 'integration',
    name: 'Mediasmart',
    slug: { _type: 'slug', current: 'mediasmart' },
    category: 'dsp',
    description: 'Mobile-first programmatic platform specializing in location-based and proximity advertising.',
    products: ['MW Activate', 'MW Measure'],
    features: ['Mobile DSP', 'Location targeting', 'Proximity ads', 'Footfall attribution'],
    apiDocsUrl: '/api-reference',
    status: 'live',
    logoUrl: '/assets/images/integrations/mediasmart.svg',
    order: 13,
    isFeatured: false,
    isActive: true,
  },
]

// ============================================
// INDUSTRY PAGES (3 items)
// ============================================
const industryPages = [
  {
    _type: 'industryPage',
    industry: 'finance',
    slug: { _type: 'slug', current: 'finance' },
    badgeText: 'Financial Services Marketing',
    title: 'Transform Financial Services',
    titleHighlight: 'Advertising',
    description: 'Reach high-value audiences with precision targeting for banking, insurance, investment, and fintech services through strategic out-of-home advertising campaigns.',
    heroStats: {
      _type: 'object',
      cardTitle: 'Finance Stats',
      metrics: [
        { _key: generateKey(), value: '67%', label: 'trust financial brands with local presence' },
        { _key: generateKey(), value: '42%', label: 'higher engagement for financial OOH' },
        { _key: generateKey(), value: '3.2x', label: 'ROI on targeted financial campaigns' },
      ],
    },
    benefits: [
      { _key: generateKey(), title: 'Build Trust', description: 'Establish credibility with physical advertising presence in key financial districts' },
      { _key: generateKey(), title: 'Target High-Value Areas', description: 'Reach affluent audiences near financial centers and business districts' },
      { _key: generateKey(), title: 'Compliance Ready', description: 'Our platform supports regulatory compliance requirements for financial advertising' },
      { _key: generateKey(), title: 'Security Messaging', description: 'Communicate safety and security of financial services' },
    ],
    services: [
      { _key: generateKey(), title: 'Banking & Credit Unions', description: 'Drive branch visits and account openings with local community focus', offerings: ['Branch Promotion', 'Account Acquisition', 'Loan Services', 'Community Banking'] },
      { _key: generateKey(), title: 'Investment Services', description: 'Build trust for wealth management and investment advisory services', offerings: ['Wealth Management', 'Retirement Planning', 'Investment Education', 'Advisory Services'] },
      { _key: generateKey(), title: 'Insurance Companies', description: 'Increase policy sales and brand awareness for insurance products', offerings: ['Life Insurance', 'Auto Insurance', 'Home Insurance', 'Business Insurance'] },
      { _key: generateKey(), title: 'Fintech & Digital Banking', description: 'Promote digital financial services and mobile banking solutions', offerings: ['Mobile Banking', 'Digital Payments', 'Cryptocurrency', 'Personal Finance'] },
    ],
    trustFactors: [
      { _key: generateKey(), metric: '73%', description: 'of consumers trust brands with local advertising' },
      { _key: generateKey(), metric: '2.5x', description: 'higher consideration for financial services' },
      { _key: generateKey(), metric: '45%', description: 'increase in brand trust and reliability' },
      { _key: generateKey(), metric: '89%', description: 'recognize financial brands from OOH campaigns' },
    ],
    caseStudies: [],
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
      _type: 'object',
      cardTitle: 'Healthcare Stats',
      metrics: [
        { _key: generateKey(), value: '89%', label: 'trust healthcare brands with local presence' },
        { _key: generateKey(), value: '65%', label: 'influenced by OOH for health decisions' },
        { _key: generateKey(), value: '2.8x', label: 'higher patient acquisition rate' },
      ],
    },
    benefits: [
      { _key: generateKey(), title: 'Build Patient Trust', description: 'Establish credibility and trust in your healthcare services' },
      { _key: generateKey(), title: 'Local Community Focus', description: 'Connect with patients in your service area effectively' },
      { _key: generateKey(), title: 'Health Awareness', description: 'Educate communities about health services and prevention' },
      { _key: generateKey(), title: 'Emergency Services', description: 'Promote urgent care and emergency services when needed' },
    ],
    services: [
      { _key: generateKey(), title: 'Hospital & Health Systems', description: 'Build community trust and drive patient acquisition for health systems', offerings: ['Brand Awareness', 'Service Promotion', 'Community Outreach', 'Emergency Care'] },
      { _key: generateKey(), title: 'Specialist Practices', description: 'Increase referrals and direct patient visits for specialized healthcare', offerings: ['Specialist Referrals', 'Direct Patient Marketing', 'Condition Awareness', 'Treatment Education'] },
      { _key: generateKey(), title: 'Wellness & Prevention', description: 'Promote preventive care and wellness programs to improve community health', offerings: ['Vaccination Campaigns', 'Screening Programs', 'Wellness Education', 'Lifestyle Programs'] },
    ],
    trustFactors: [
      { _key: generateKey(), metric: '89%', description: 'trust healthcare brands with local presence' },
      { _key: generateKey(), metric: '65%', description: 'are influenced by OOH for health decisions' },
      { _key: generateKey(), metric: '2.8x', description: 'higher patient acquisition rate' },
    ],
    caseStudies: [],
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
      _type: 'object',
      cardTitle: 'Retail Stats',
      metrics: [
        { _key: generateKey(), value: '45%', label: 'Foot Traffic ↑' },
        { _key: generateKey(), value: '32%', label: 'Sales Boost ↗' },
        { _key: generateKey(), value: '28%', label: 'Awareness ⭐' },
      ],
    },
    benefits: [
      { _key: generateKey(), title: 'Increase Foot Traffic', description: 'Drive more customers to your physical locations with targeted OOH campaigns' },
      { _key: generateKey(), title: 'Boost Sales', description: 'Convert awareness into purchases with strategic placement and timing' },
      { _key: generateKey(), title: 'Target Shoppers', description: 'Reach customers when they\'re in shopping mode near retail locations' },
      { _key: generateKey(), title: 'Omnichannel Integration', description: 'Connect offline advertising with online experiences seamlessly' },
    ],
    services: [],
    trustFactors: [],
    caseStudies: [
      { _key: generateKey(), brand: 'Fashion Retailer', metric: '45% increase', description: 'in store visits during campaign period' },
      { _key: generateKey(), brand: 'Electronics Chain', metric: '32% boost', description: 'in weekend sales with targeted mall advertising' },
      { _key: generateKey(), brand: 'Home Goods Store', metric: '28% growth', description: 'in brand awareness among target demographics' },
    ],
    order: 3,
    isActive: true,
  },
]

// ============================================
// AUDIENCE PAGES (3 items)
// ============================================
const audiencePages = [
  {
    _type: 'audiencePage',
    pageType: 'agencies',
    title: 'White Label OOH Platform',
    titleHighlight: 'Built for Agencies',
    subtitle: 'Offer your clients a complete out of home solution under your own brand. Moving Walls gives you global inventory, intelligent campaign planning, and real-time analytics that help your agency act faster, plan smarter, and deliver measurable results.',
    ctaPrimary: 'Become a Partner',
    ctaPrimaryLink: '/contact',
    ctaSecondary: 'Watch Demo',
    ctaSecondaryLink: '#platform',
    platformSectionTitle: 'Platform Features',
    platformSectionSubtitle: 'Everything your agency needs to succeed',
    platformFeatures: [
      { _key: generateKey(), id: 'planning', tabLabel: 'Planning', title: 'Customisable Planning', description: 'Our planning tool is designed to seamlessly integrate with your current workflows by providing custom audiences, site scores, and negotiation features that can be tailored to your specific needs.', linkHref: '/mw-planner', linkText: 'Learn more' },
      { _key: generateKey(), id: 'reach', tabLabel: 'Extended Reach', title: 'Integrated Planning', description: 'Our planning system offers an integrated approach that allows for the extension of OOH planning to mobile platforms. Additionally, our platform allows for the extraction of audience lists, which can be used for future retargeting efforts.', linkHref: '/mw-reach', linkText: 'Learn more' },
      { _key: generateKey(), id: 'support', tabLabel: 'Support', title: 'Live Support', description: 'Our platform provides live support from OOH experts who are readily available to assist you with any inquiries or additional planning requests you may have.', linkHref: '/contact', linkText: 'Contact us' },
    ],
    benefits: [
      { _key: generateKey(), title: 'Global Inventory Access', description: 'Access OOH inventory across multiple markets from a single platform' },
      { _key: generateKey(), title: 'White Label Solution', description: 'Present the platform under your own brand identity' },
      { _key: generateKey(), title: 'Real-time Analytics', description: 'Track campaign performance with live reporting dashboards' },
      { _key: generateKey(), title: 'Intelligent Planning', description: 'AI-powered recommendations for optimal media mix' },
    ],
    stats: [
      { _key: generateKey(), value: '500K+', label: 'OOH Sites Globally' },
      { _key: generateKey(), value: '30+', label: 'Markets Covered' },
      { _key: generateKey(), value: '100+', label: 'Agency Partners' },
      { _key: generateKey(), value: '24/7', label: 'Expert Support' },
    ],
    faqs: [
      { _key: generateKey(), question: 'How does white labeling work?', answer: 'You can customize the platform with your agency\'s branding, including logo, colors, and domain name.' },
      { _key: generateKey(), question: 'What markets are available?', answer: 'We cover 30+ markets across Asia Pacific, Europe, Middle East, and the Americas.' },
      { _key: generateKey(), question: 'Is training provided?', answer: 'Yes, we provide comprehensive onboarding and ongoing training for your team.' },
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
    platformSectionTitle: 'Platform Features',
    platformSectionSubtitle: 'Everything brands need for OOH success',
    platformFeatures: [
      { _key: generateKey(), id: 'campaigns', tabLabel: 'Campaign Creation', title: 'Create and Launch in Minutes', description: 'Turn your brief into an optimised OOH proposal instantly. Define your audience, set campaign objectives, select markets, and activate with one click.', linkHref: '/mw-planner', linkText: 'Learn more' },
      { _key: generateKey(), id: 'realtime', tabLabel: 'Real Time Activation', title: 'Activate Campaigns Instantly', description: 'Deploy your campaigns across multiple markets simultaneously with real-time activation and dynamic content updates.', linkHref: '/mw-activate', linkText: 'Learn more' },
      { _key: generateKey(), id: 'measurement', tabLabel: 'Full Funnel Measurement', title: 'Measure Every Impact', description: 'Track awareness, consideration, and conversion with comprehensive measurement tools that connect OOH exposure to business outcomes.', linkHref: '/mw-measure', linkText: 'Learn more' },
    ],
    benefits: [
      { _key: generateKey(), title: 'Simplified Workflow', description: 'Launch campaigns in minutes, not weeks' },
      { _key: generateKey(), title: 'Global Reach', description: 'Access inventory across multiple continents' },
      { _key: generateKey(), title: 'Full Attribution', description: 'Connect OOH to sales and conversions' },
      { _key: generateKey(), title: 'Real-time Optimization', description: 'Adjust campaigns based on performance data' },
    ],
    stats: [
      { _key: generateKey(), value: '10x', label: 'Faster Campaign Launch' },
      { _key: generateKey(), value: '85%', label: 'Planning Time Saved' },
      { _key: generateKey(), value: '3.5x', label: 'Average ROAS' },
      { _key: generateKey(), value: '100%', label: 'Campaign Visibility' },
    ],
    faqs: [
      { _key: generateKey(), question: 'How quickly can I launch a campaign?', answer: 'With our platform, you can go from brief to live campaign in as little as 15 minutes.' },
      { _key: generateKey(), question: 'What measurement options are available?', answer: 'We offer impression tracking, foot traffic attribution, brand lift studies, and sales correlation analysis.' },
      { _key: generateKey(), question: 'Can I run campaigns across multiple countries?', answer: 'Yes, our platform supports multi-market campaigns with centralized management and reporting.' },
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
    platformSectionTitle: 'Platform Features',
    platformSectionSubtitle: 'Everything media owners need to succeed',
    platformFeatures: [
      { _key: generateKey(), id: 'marketplace', tabLabel: 'Marketplace', title: 'Connect to Premium Demand', description: 'Connect your OOH inventory to an integrated demand marketplace designed for media owners. Enable access to programmatic and direct demand sources, improve fill rates, and monetize inventory more efficiently.', linkHref: '/mw-market', linkText: 'Learn more' },
      { _key: generateKey(), id: 'inventory', tabLabel: 'Inventory', title: 'Manage Your Assets', description: 'Centralize all your OOH assets in one platform. Track availability, manage bookings, and optimize inventory allocation with intelligent scheduling tools.', linkHref: '/products', linkText: 'Learn more' },
      { _key: generateKey(), id: 'yield', tabLabel: 'Yield', title: 'Maximize Revenue', description: 'Use dynamic pricing and yield optimization tools to maximize the value of every screen in your network.', linkHref: '/products', linkText: 'Learn more' },
    ],
    benefits: [
      { _key: generateKey(), title: 'Increased Fill Rates', description: 'Connect to more demand sources and reduce unsold inventory' },
      { _key: generateKey(), title: 'Dynamic Pricing', description: 'Optimize pricing based on demand and market conditions' },
      { _key: generateKey(), title: 'Automated Operations', description: 'Reduce manual work with automated booking and scheduling' },
      { _key: generateKey(), title: 'Premium Demand Access', description: 'Connect directly with agency and brand advertisers' },
    ],
    stats: [
      { _key: generateKey(), value: '40%', label: 'Revenue Increase' },
      { _key: generateKey(), value: '90%', label: 'Fill Rate' },
      { _key: generateKey(), value: '50%', label: 'Ops Time Saved' },
      { _key: generateKey(), value: '1000+', label: 'Active Advertisers' },
    ],
    faqs: [
      { _key: generateKey(), question: 'How do I connect my inventory?', answer: 'We provide API integration and manual upload options. Our team will help you onboard your entire network.' },
      { _key: generateKey(), question: 'What pricing models are supported?', answer: 'We support CPM, fixed rate, share of voice, and custom pricing models.' },
      { _key: generateKey(), question: 'Can I maintain direct sales relationships?', answer: 'Absolutely. Our platform complements your direct sales with additional demand sources.' },
    ],
  },
]

// ============================================
// JOB POSITIONS (6 items)
// ============================================
const jobPositions = [
  {
    _type: 'jobPosition',
    title: 'Senior Software Engineer',
    slug: { _type: 'slug', current: 'senior-software-engineer' },
    department: 'engineering',
    location: 'San Francisco, CA / Remote',
    type: 'full-time',
    level: 'senior',
    description: 'Build scalable advertising technology platforms using modern web technologies. Lead architecture decisions and mentor junior developers.',
    requirements: ['5+ years full-stack development', 'React/Node.js expertise', 'Cloud platforms (AWS/GCP)', 'Agile methodologies'],
    isActive: true,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: 'jobPosition',
    title: 'Product Marketing Manager',
    slug: { _type: 'slug', current: 'product-marketing-manager' },
    department: 'marketing',
    location: 'New York, NY / Hybrid',
    type: 'full-time',
    level: 'mid',
    description: 'Drive go-to-market strategy for our advertising platform products. Work closely with sales and product teams to position our solutions.',
    requirements: ['3+ years product marketing', 'B2B SaaS experience', 'Campaign management', 'Strong analytical skills'],
    isActive: true,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: 'jobPosition',
    title: 'Data Scientist',
    slug: { _type: 'slug', current: 'data-scientist' },
    department: 'data-analytics',
    location: 'Austin, TX / Remote',
    type: 'full-time',
    level: 'senior',
    description: 'Develop machine learning models for audience targeting and campaign optimization. Analyze large datasets to drive product insights.',
    requirements: ['PhD/MS in relevant field', 'Python/R proficiency', 'ML/AI frameworks', 'Statistical modeling'],
    isActive: true,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: 'jobPosition',
    title: 'Account Executive',
    slug: { _type: 'slug', current: 'account-executive' },
    department: 'sales',
    location: 'Chicago, IL / Hybrid',
    type: 'full-time',
    level: 'mid',
    description: 'Manage enterprise client relationships and drive new business growth. Develop strategic partnerships with major brands and agencies.',
    requirements: ['3+ years B2B sales', 'Advertising industry knowledge', 'CRM proficiency', 'Strong communication'],
    isActive: true,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: 'jobPosition',
    title: 'UX/UI Designer',
    slug: { _type: 'slug', current: 'ux-ui-designer' },
    department: 'design',
    location: 'Los Angeles, CA / Remote',
    type: 'full-time',
    level: 'mid',
    description: 'Design intuitive user experiences for our advertising platform. Create design systems and conduct user research.',
    requirements: ['4+ years UX/UI design', 'Figma/Sketch expertise', 'Design systems', 'User research methods'],
    isActive: true,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: 'jobPosition',
    title: 'DevOps Engineer',
    slug: { _type: 'slug', current: 'devops-engineer' },
    department: 'engineering',
    location: 'Seattle, WA / Remote',
    type: 'full-time',
    level: 'senior',
    description: 'Manage cloud infrastructure and deployment pipelines. Ensure platform scalability and security best practices.',
    requirements: ['4+ years DevOps experience', 'Kubernetes/Docker', 'CI/CD pipelines', 'Security practices'],
    isActive: true,
    publishedAt: new Date().toISOString(),
  },
]

// ============================================
// WEBINARS (7 items: 3 upcoming + 4 past)
// ============================================
const webinars = [
  {
    _type: 'webinar',
    title: 'AI-Powered Campaign Optimization: Advanced Strategies',
    slug: { _type: 'slug', current: 'ai-powered-campaign-optimization' },
    description: 'Learn cutting-edge techniques for leveraging AI and machine learning to optimize your advertising campaigns in real-time.',
    webinarType: 'upcoming',
    date: '2025-12-15T14:00:00.000Z',
    time: '2:00 PM EST',
    duration: '60 min',
    speaker: 'Dr. Sarah Mitchell',
    speakerRole: 'Chief Data Scientist',
    speakers: [{ _key: generateKey(), name: 'Dr. Sarah Mitchell', role: 'Chief Data Scientist' }],
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'webinar',
    title: 'Getting Started with Programmatic DOOH',
    slug: { _type: 'slug', current: 'getting-started-programmatic-dooh' },
    description: 'A comprehensive introduction to programmatic digital out-of-home advertising for beginners.',
    webinarType: 'upcoming',
    date: '2025-12-20T11:00:00.000Z',
    time: '11:00 AM EST',
    duration: '45 min',
    speaker: 'Michael Torres',
    speakerRole: 'Product Manager',
    speakers: [{ _key: generateKey(), name: 'Michael Torres', role: 'Product Manager' }],
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'webinar',
    title: 'Healthcare Marketing Compliance & Best Practices',
    slug: { _type: 'slug', current: 'healthcare-marketing-compliance' },
    description: 'Navigate healthcare advertising regulations while maximizing campaign effectiveness.',
    webinarType: 'upcoming',
    date: '2026-01-08T13:00:00.000Z',
    time: '1:00 PM EST',
    duration: '50 min',
    speaker: 'Dr. Amanda Lee',
    speakerRole: 'Healthcare Marketing Expert',
    speakers: [{ _key: generateKey(), name: 'Dr. Amanda Lee', role: 'Healthcare Marketing Expert' }],
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'webinar',
    title: 'Maximizing ROI with MW Planner: Complete Workshop',
    slug: { _type: 'slug', current: 'maximizing-roi-mw-planner' },
    description: 'Deep dive into campaign planning and optimization strategies using MW Planner platform.',
    webinarType: 'past',
    date: '2025-11-15T14:00:00.000Z',
    time: '2:00 PM EST',
    duration: '75 min',
    speaker: 'James Wilson',
    speakerRole: 'Senior Solutions Architect',
    speakers: [{ _key: generateKey(), name: 'James Wilson', role: 'Senior Solutions Architect' }],
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'webinar',
    title: 'The Future of Retail Advertising in 2025',
    slug: { _type: 'slug', current: 'future-retail-advertising-2025' },
    description: 'Explore emerging trends and technologies shaping the future of retail marketing.',
    webinarType: 'past',
    date: '2025-10-20T11:00:00.000Z',
    time: '11:00 AM EST',
    duration: '45 min',
    speaker: 'Lisa Chen',
    speakerRole: 'Industry Analyst',
    speakers: [{ _key: generateKey(), name: 'Lisa Chen', role: 'Industry Analyst' }],
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'webinar',
    title: 'Location-Based Targeting Masterclass',
    slug: { _type: 'slug', current: 'location-based-targeting-masterclass' },
    description: 'Advanced techniques for geo-targeting and location intelligence in advertising.',
    webinarType: 'past',
    date: '2025-09-10T15:00:00.000Z',
    time: '3:00 PM EST',
    duration: '60 min',
    speaker: 'Robert Martinez',
    speakerRole: 'Targeting Specialist',
    speakers: [{ _key: generateKey(), name: 'Robert Martinez', role: 'Targeting Specialist' }],
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'webinar',
    title: 'Creative Best Practices for DOOH Campaigns',
    slug: { _type: 'slug', current: 'creative-best-practices-dooh' },
    description: 'Design principles and creative strategies that drive engagement in outdoor advertising.',
    webinarType: 'past',
    date: '2025-08-05T13:00:00.000Z',
    time: '1:00 PM EST',
    duration: '40 min',
    speaker: 'Emily Rodriguez',
    speakerRole: 'Creative Director',
    speakers: [{ _key: generateKey(), name: 'Emily Rodriguez', role: 'Creative Director' }],
    isPublished: true,
    status: 'published',
  },
]

// ============================================
// EBOOKS (6 items)
// ============================================
const ebooks = [
  {
    _type: 'ebook',
    title: 'The Ultimate Guide to Programmatic DOOH in 2026',
    slug: { _type: 'slug', current: 'ultimate-guide-programmatic-dooh-2026' },
    description: 'A comprehensive guide covering everything you need to know about programmatic digital out-of-home advertising, from basics to advanced strategies.',
    category: 'guide',
    featured: true,
    isNew: true,
    year: '2026',
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'ebook',
    title: 'OOH Measurement Playbook',
    slug: { _type: 'slug', current: 'ooh-measurement-playbook' },
    description: 'Learn how to effectively measure and optimize your out-of-home campaigns with proven methodologies and metrics.',
    category: 'playbook',
    featured: false,
    isNew: false,
    year: '2025',
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'ebook',
    title: 'APAC OOH Market Report 2025',
    slug: { _type: 'slug', current: 'apac-ooh-market-report-2025' },
    description: 'In-depth analysis of the Asia-Pacific out-of-home advertising market, trends, and growth opportunities.',
    category: 'market-report',
    featured: false,
    isNew: true,
    year: '2025',
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'ebook',
    title: 'Audience Targeting in OOH: A Strategic Guide',
    slug: { _type: 'slug', current: 'audience-targeting-ooh-strategic-guide' },
    description: 'Master audience targeting strategies for out-of-home advertising campaigns using data-driven approaches.',
    category: 'guide',
    featured: false,
    isNew: false,
    year: '2025',
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'ebook',
    title: 'The Future of Retail Media Networks',
    slug: { _type: 'slug', current: 'future-retail-media-networks' },
    description: 'Explore how retail media networks are transforming the advertising landscape and creating new opportunities.',
    category: 'whitepaper',
    featured: false,
    isNew: false,
    year: '2025',
    isPublished: true,
    status: 'published',
  },
  {
    _type: 'ebook',
    title: 'Creative Best Practices for DOOH',
    slug: { _type: 'slug', current: 'creative-best-practices-dooh' },
    description: 'Design stunning digital out-of-home creatives that capture attention and drive engagement.',
    category: 'playbook',
    featured: false,
    isNew: false,
    year: '2024',
    isPublished: true,
    status: 'published',
  },
]

// ============================================
// TESTIMONIALS (3 items)
// ============================================
const testimonials = [
  {
    _type: 'testimonial',
    quote: "Moving Walls helped us launch Japan's Largest OOH Marketplace to great success.",
    author: 'Ryoji Akaishi',
    role: 'President',
    company: 'jeki',
    metric: "Japan's Largest OOH Marketplace",
    industry: 'media',
    order: 1,
    isFeatured: true,
    isPublished: true,
  },
  {
    _type: 'testimonial',
    quote: 'The audience measurement capabilities that Moving Walls provides have transformed how we approach OOH campaigns.',
    author: 'Saad Bencharef',
    role: 'Director',
    company: 'FC Media',
    metric: 'Audience Measurement Leader',
    industry: 'media-owner',
    order: 2,
    isFeatured: true,
    isPublished: true,
  },
  {
    _type: 'testimonial',
    quote: 'Moving Walls has revolutionized our DOOH planning and buying process across the Philippines.',
    author: 'Yasmin Mallari',
    role: 'CIO',
    company: 'GroupM Philippines',
    metric: 'DOOH Planning Innovation',
    industry: 'agency',
    order: 3,
    isFeatured: true,
    isPublished: true,
  },
]

// ============================================
// SEED FUNCTIONS
// ============================================

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
      console.log(`  ✅ Created "${page.industry}" industry page`)
    } catch (error) {
      console.error(`  ❌ Error creating "${page.industry}":`, error.message)
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
      console.log(`  ✅ Created "${page.pageType}" audience page`)
    } catch (error) {
      console.error(`  ❌ Error creating "${page.pageType}":`, error.message)
    }
  }
}

async function seedJobPositions() {
  console.log('\n💼 Seeding Job Positions...')
  for (const job of jobPositions) {
    try {
      const existing = await client.fetch(
        `*[_type == "jobPosition" && slug.current == $slug][0]`,
        { slug: job.slug.current }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${job.title}" - already exists`)
        continue
      }
      await client.create(job)
      console.log(`  ✅ Created "${job.title}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${job.title}":`, error.message)
    }
  }
}

async function seedWebinars() {
  console.log('\n🎥 Seeding Webinars...')
  for (const webinar of webinars) {
    try {
      const existing = await client.fetch(
        `*[_type == "webinar" && slug.current == $slug][0]`,
        { slug: webinar.slug.current }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${webinar.title}" - already exists`)
        continue
      }
      await client.create(webinar)
      console.log(`  ✅ Created "${webinar.title}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${webinar.title}":`, error.message)
    }
  }
}

async function seedEbooks() {
  console.log('\n📚 Seeding E-Books...')
  for (const ebook of ebooks) {
    try {
      const existing = await client.fetch(
        `*[_type == "ebook" && slug.current == $slug][0]`,
        { slug: ebook.slug.current }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${ebook.title}" - already exists`)
        continue
      }
      await client.create(ebook)
      console.log(`  ✅ Created "${ebook.title}"`)
    } catch (error) {
      console.error(`  ❌ Error creating "${ebook.title}":`, error.message)
    }
  }
}

async function seedTestimonials() {
  console.log('\n💬 Seeding Testimonials...')
  for (const testimonial of testimonials) {
    try {
      const existing = await client.fetch(
        `*[_type == "testimonial" && author == $author && company == $company][0]`,
        { author: testimonial.author, company: testimonial.company }
      )
      if (existing) {
        console.log(`  ⏭️  Skipping "${testimonial.author}" - already exists`)
        continue
      }
      await client.create(testimonial)
      console.log(`  ✅ Created testimonial from "${testimonial.author}"`)
    } catch (error) {
      console.error(`  ❌ Error creating testimonial "${testimonial.author}":`, error.message)
    }
  }
}

// ============================================
// MAIN
// ============================================

async function seedAll() {
  console.log('🚀 Starting Phase 1: Seed content for existing schemas...\n')
  console.log('='.repeat(50))

  if (!process.env.SANITY_API_TOKEN && !client.config().token) {
    console.error('❌ SANITY_API_TOKEN environment variable is required')
    process.exit(1)
  }

  await seedOohFormats()
  await seedIntegrations()
  await seedIndustryPages()
  await seedAudiencePages()
  await seedJobPositions()
  await seedWebinars()
  await seedEbooks()
  await seedTestimonials()

  console.log('\n' + '='.repeat(50))
  console.log('✨ Phase 1 seeding complete!')
  console.log('\nSeeded content types:')
  console.log('  - OOH Formats: 9 items')
  console.log('  - Integrations: 13 items')
  console.log('  - Industry Pages: 3 items')
  console.log('  - Audience Pages: 3 items')
  console.log('  - Job Positions: 6 items')
  console.log('  - Webinars: 7 items')
  console.log('  - E-Books: 6 items')
  console.log('  - Testimonials: 3 items')
}

seedAll()
