import { getAllIntegrations, transformIntegration } from '@/sanity/lib/fetch'
import IntegrationsPageClient, { Integration } from '@/components/IntegrationsPageClient'

// Static fallback data for when Sanity is unavailable
const fallbackIntegrations: Integration[] = [
  {
    id: 'viooh',
    name: 'VIOOH',
    category: 'ssp',
    description: 'Premium programmatic digital out-of-home (pDOOH) marketplace enabling automated trading of OOH inventory globally.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Programmatic DOOH', 'Real-time bidding', 'Global inventory', 'Audience targeting'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/viooh.svg',
  },
  {
    id: 'dv360',
    name: 'Display & Video 360',
    category: 'ssp',
    description: 'Google\'s enterprise demand-side platform for programmatic display, video, and connected TV advertising.',
    products: ['MW Planner', 'MW Measure', 'MW Activate', 'MW Marketplace'],
    features: ['Programmatic guaranteed', 'Custom bidding', 'Audience activation', 'Cross-device'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/dv360.svg',
  },
  {
    id: 'magnite',
    name: 'Magnite',
    category: 'ssp',
    description: 'The world\'s largest independent sell-side advertising company, powering premium programmatic OOH and CTV.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Header bidding', 'CTV/OTT', 'Audience segments', 'Deal management'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/magnite.svg',
  },
  {
    id: 'google-ad-manager-360',
    name: 'Google Ad Manager 360',
    category: 'ssp',
    description: 'Enterprise ad serving platform with advanced forecasting, yield management, and programmatic access.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Yield optimization', 'Programmatic deals', 'Forecasting', 'Multi-format'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/google-ad-manager-360.svg',
  },
  {
    id: 'the-trade-desk',
    name: 'The Trade Desk',
    category: 'dsp',
    description: 'The leading independent DSP for omnichannel programmatic advertising with Unified ID 2.0.',
    products: ['MW Planner', 'MW Measure', 'MW Activate', 'MW Marketplace'],
    features: ['Unified ID 2.0', 'Kokai AI', 'CTV/OTT', 'Retail media'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/the-trade-desk.svg',
  },
  {
    id: 'cassie',
    name: 'Cassie',
    category: 'dsp',
    description: 'Consent and preference management platform ensuring compliant data-driven advertising.',
    products: ['MW Activate', 'MW Measure'],
    features: ['Consent management', 'Preference center', 'GDPR compliance', 'Data governance'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/cassie.svg',
  },
  {
    id: 'max',
    name: 'MAX',
    category: 'dsp',
    description: 'MovingWalls\' programmatic OOH buying platform for automated, data-driven outdoor advertising campaigns.',
    products: ['MW Planner', 'MW Activate', 'MW Measure'],
    features: ['Automated buying', 'Audience data', 'Campaign optimization', 'Real-time reporting'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/max.svg',
  },
  {
    id: 'stackadapt',
    name: 'StackAdapt',
    category: 'dsp',
    description: 'Multi-channel programmatic advertising platform with native, display, video, CTV, and DOOH capabilities.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Multi-channel', 'Native ads', 'Contextual targeting', 'Custom audiences'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/stackadapt.svg',
  },
  {
    id: 'amobee',
    name: 'Amobee',
    category: 'dsp',
    description: 'End-to-end advertising platform for planning, activation, and optimization across all channels.',
    products: ['MW Planner', 'MW Activate'],
    features: ['Cross-channel', 'Brand intelligence', 'TV planning', 'Audience analytics'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/amobee.svg',
  },
  {
    id: 'appnexus',
    name: 'AppNexus',
    category: 'dsp',
    description: 'Enterprise technology platform for programmatic advertising powering Xandr/Microsoft Advertising.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Programmable bidder', 'Curated deals', 'Identity', 'Yield analytics'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/appnexus.svg',
  },
  {
    id: 'mediamath',
    name: 'MediaMath',
    category: 'dsp',
    description: 'Omnichannel demand-side platform for advanced programmatic campaigns with transparency and control.',
    products: ['MW Planner', 'MW Activate'],
    features: ['Brain AI', 'Omnichannel', 'Identity', 'Transparency'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/mediamath.svg',
  },
  {
    id: 'verizon',
    name: 'Verizon Media',
    category: 'dsp',
    description: 'Verizon\'s advertising technology platform with premium inventory and telecom data for precision targeting.',
    products: ['MW Activate', 'MW Marketplace'],
    features: ['Telecom data', 'Premium inventory', 'Cross-device', 'Brand safety'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/verizon.svg',
  },
  {
    id: 'mediasmart',
    name: 'Mediasmart',
    category: 'dsp',
    description: 'Mobile-first programmatic platform specializing in location-based and proximity advertising.',
    products: ['MW Activate', 'MW Measure'],
    features: ['Mobile DSP', 'Location targeting', 'Proximity ads', 'Footfall attribution'],
    apiDocs: '/api-reference',
    status: 'live',
    logo: '/assets/images/integrations/mediasmart.svg',
  },
]

export const metadata = {
  title: 'Integration Marketplace | MovingWalls',
  description: 'Seamlessly connect with leading SSPs and DSPs. Our pre-built integrations power programmatic OOH advertising at scale.',
}

export const revalidate = 3600 // Revalidate every hour

async function getIntegrations(): Promise<Integration[]> {
  try {
    const sanityIntegrations = await getAllIntegrations()
    
    if (sanityIntegrations && sanityIntegrations.length > 0) {
      return sanityIntegrations.map(integration => {
        const transformed = transformIntegration(integration)
        return {
          id: transformed.id,
          name: transformed.name,
          category: transformed.category,
          description: transformed.description,
          products: transformed.products,
          features: transformed.features,
          apiDocs: transformed.apiDocs,
          status: transformed.status,
          logo: transformed.logo || `/assets/images/integrations/${transformed.id}.svg`,
        }
      })
    }
    
    return fallbackIntegrations
  } catch (error) {
    console.error('Error fetching integrations from Sanity:', error)
    return fallbackIntegrations
  }
}

export default async function IntegrationsPage() {
  const integrations = await getIntegrations()
  
  return <IntegrationsPageClient integrations={integrations} />
}
