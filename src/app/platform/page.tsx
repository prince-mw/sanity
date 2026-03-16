import { Metadata } from 'next'
import PlatformPageClient from '@/components/PlatformPageClient'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Platform | Moving Walls',
  description: 'Discover the Moving Walls platform - a unified solution for planning, activating, and measuring out-of-home advertising campaigns at scale.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('platform');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || 'Moving Walls Platform',
      description: seo?.metaDescription || 'The complete OOH advertising platform for modern marketers.',
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 3600

export default function PlatformPage() {
  return <PlatformPageClient />
}
