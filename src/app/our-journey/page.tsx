import { Metadata } from 'next'
import OurJourneyPageClient from '@/components/OurJourneyPageClient'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Our Journey | Moving Walls',
  description: 'Explore the milestones and achievements that shaped Moving Walls into a global leader in out-of-home advertising technology.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('our-journey');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || 'Key milestones in our mission to transform outdoor advertising.',
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/our-journey",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 3600

export default function OurJourneyPage() {
  return <OurJourneyPageClient />
}
