import { getSanityImageUrl } from '@/sanity/lib/fetch'

export const defaultIntegrations = [
  { name: 'VIOOH', category: 'SSP', logo: '/assets/images/integrations/viooh.svg' },
  { name: 'DV360', category: 'SSP', logo: '/assets/images/integrations/dv360.svg' },
  { name: 'Magnite', category: 'SSP', logo: '/assets/images/integrations/magnite.svg' },
  { name: 'Google Ad Manager 360', category: 'SSP', logo: '/assets/images/integrations/google-ad-manager-360.svg' },
  { name: 'The Trade Desk', category: 'DSP', logo: '/assets/images/integrations/the-trade-desk.svg' },
  { name: 'Cassie', category: 'DSP', logo: '/assets/images/integrations/cassie.svg' },
  { name: 'MAX', category: 'DSP', logo: '/assets/images/integrations/max.svg' },
  { name: 'StackAdapt', category: 'DSP', logo: '/assets/images/integrations/stackadapt.svg' },
  { name: 'Amobee', category: 'DSP', logo: '/assets/images/integrations/amobee.svg' },
  { name: 'AppNexus', category: 'DSP', logo: '/assets/images/integrations/appnexus.svg' },
  { name: 'MediaMath', category: 'DSP', logo: '/assets/images/integrations/mediamath.svg' },
  { name: 'Verizon Media', category: 'DSP', logo: '/assets/images/integrations/verizon.svg' },
  { name: 'Mediasmart', category: 'DSP', logo: '/assets/images/integrations/mediasmart.svg' },
]

export interface DisplayIntegration {
  name: string
  category: string
  logo: string
}

export function getDisplayIntegrations(
  cmsIntegrations?: Array<{ name: string; logo?: any; category?: string }> | null
): DisplayIntegration[] {
  if (cmsIntegrations && cmsIntegrations.length > 0) {
    return cmsIntegrations.map(i => ({
      name: i.name,
      category: i.category || '',
      logo: getSanityImageUrl(i.logo, { width: 200 }) || '',
    })).filter(i => i.name && i.logo)
  }
  return defaultIntegrations
}
