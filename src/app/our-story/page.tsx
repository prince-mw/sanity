import { Metadata } from 'next'
import OurStoryPageClient from '@/components/OurStoryPageClient'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Our Story | Moving Walls',
  description: 'Discover the story behind Moving Walls - from our founding vision to becoming a global leader in programmatic out-of-home advertising technology.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('our-story');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || 'The journey of transforming outdoor advertising through innovation.',
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 3600

export default function OurStoryPage() {
  return <OurStoryPageClient />
}
