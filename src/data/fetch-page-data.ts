/**
 * Data fetching utilities for static pages with Sanity CMS fallback
 */

import { getAudiencePage, getIndustryPage, getAllIntegrations, getAllOohFormats, transformIntegration, transformOohFormat } from '@/sanity/lib/fetch'
import { agenciesPageData, brandsPageData, mediaOwnersPageData } from './audience-pages'
import { financePageData, healthcarePageData, retailPageData } from './industry-pages'
import { integrationsData } from './integrations'
import { oohFormatsData } from './ooh-formats'

/**
 * Fetch audience page data from Sanity with fallback to static
 */
export async function getAudiencePageData(pageType: 'agencies' | 'brands' | 'media-owners') {
  try {
    const sanityData = await getAudiencePage(pageType)
    if (sanityData) {
      return {
        source: 'sanity' as const,
        data: {
          pageType: sanityData.pageType,
          title: sanityData.title || getStaticAudienceData(pageType).title,
          titleHighlight: sanityData.titleHighlight || getStaticAudienceData(pageType).titleHighlight,
          subtitle: sanityData.subtitle || getStaticAudienceData(pageType).subtitle,
          primaryCTA: sanityData.primaryCTA || getStaticAudienceData(pageType).primaryCTA,
          secondaryCTA: sanityData.secondaryCTA || getStaticAudienceData(pageType).secondaryCTA,
          platformFeatures: sanityData.platformFeatures?.length ? sanityData.platformFeatures : getStaticAudienceData(pageType).platformFeatures,
          benefits: sanityData.benefits?.length ? sanityData.benefits : getStaticAudienceData(pageType).benefits,
          stats: sanityData.stats?.length ? sanityData.stats : getStaticAudienceData(pageType).stats,
          faqs: sanityData.faqs?.length ? sanityData.faqs : getStaticAudienceData(pageType).faqs,
        }
      }
    }
  } catch (error) {
    console.error(`Error fetching ${pageType} page from Sanity:`, error)
  }
  
  return {
    source: 'static' as const,
    data: getStaticAudienceData(pageType)
  }
}

function getStaticAudienceData(pageType: 'agencies' | 'brands' | 'media-owners') {
  switch (pageType) {
    case 'agencies':
      return agenciesPageData
    case 'brands':
      return brandsPageData
    case 'media-owners':
      return mediaOwnersPageData
  }
}

/**
 * Fetch industry page data from Sanity with fallback to static
 */
export async function getIndustryPageData(industry: 'finance' | 'healthcare' | 'retail') {
  try {
    const sanityData = await getIndustryPage(industry)
    if (sanityData) {
      return {
        source: 'sanity' as const,
        data: {
          industry: sanityData.industry,
          badgeText: sanityData.badgeText || getStaticIndustryData(industry).badgeText,
          title: sanityData.title || getStaticIndustryData(industry).title,
          titleHighlight: sanityData.titleHighlight || getStaticIndustryData(industry).titleHighlight,
          subtitle: sanityData.subtitle || getStaticIndustryData(industry).subtitle,
          heroStats: sanityData.heroStats?.length ? sanityData.heroStats : getStaticIndustryData(industry).heroStats,
          benefits: sanityData.benefits?.length ? sanityData.benefits : getStaticIndustryData(industry).benefits,
          services: sanityData.services?.length ? sanityData.services : getStaticIndustryData(industry).services,
          trustFactors: sanityData.trustFactors?.length ? sanityData.trustFactors : getStaticIndustryData(industry).trustFactors,
          caseStudies: sanityData.caseStudies?.length ? sanityData.caseStudies : getStaticIndustryData(industry).caseStudies,
        }
      }
    }
  } catch (error) {
    console.error(`Error fetching ${industry} page from Sanity:`, error)
  }
  
  return {
    source: 'static' as const,
    data: getStaticIndustryData(industry)
  }
}

function getStaticIndustryData(industry: 'finance' | 'healthcare' | 'retail') {
  switch (industry) {
    case 'finance':
      return financePageData
    case 'healthcare':
      return healthcarePageData
    case 'retail':
      return retailPageData
  }
}

/**
 * Fetch integrations from Sanity with fallback to static
 */
export async function getIntegrationsPageData() {
  try {
    const sanityData = await getAllIntegrations()
    if (sanityData && sanityData.length > 0) {
      return {
        source: 'sanity' as const,
        data: sanityData.map(transformIntegration)
      }
    }
  } catch (error) {
    console.error('Error fetching integrations from Sanity:', error)
  }
  
  return {
    source: 'static' as const,
    data: integrationsData
  }
}

/**
 * Fetch OOH formats from Sanity with fallback to static
 */
export async function getOohFormatsPageData() {
  try {
    const sanityData = await getAllOohFormats()
    if (sanityData && sanityData.length > 0) {
      return {
        source: 'sanity' as const,
        data: sanityData.map(transformOohFormat)
      }
    }
  } catch (error) {
    console.error('Error fetching OOH formats from Sanity:', error)
  }
  
  return {
    source: 'static' as const,
    data: oohFormatsData
  }
}
