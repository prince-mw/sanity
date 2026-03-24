import { Metadata } from 'next'
import LocationsPageClient from '@/components/LocationsPageClient'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Global Locations | Moving Walls',
  description: 'Moving Walls operates across Asia Pacific - Malaysia, Singapore, Indonesia, India, Philippines, Japan, Thailand, Sri Lanka, Australia, and USA.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('locations');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || 'Our Global Locations | Moving Walls',
      description: seo?.metaDescription || 'Discover Moving Walls offices and operations across the globe.',
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/locations",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 3600

export default function LocationsPage() {
  return <LocationsPageClient />
}
