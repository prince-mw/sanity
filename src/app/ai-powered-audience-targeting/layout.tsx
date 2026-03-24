import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'AI Powered Audience Targeting for OOH | Moving Walls',
  description: 'Leverage artificial intelligence for precise audience targeting in out-of-home advertising. Data-driven insights for smarter OOH campaigns.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('ai-powered-audience-targeting');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || defaultMeta.description,
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/ai-powered-audience-targeting",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function AIPoweredAudienceTargetingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
