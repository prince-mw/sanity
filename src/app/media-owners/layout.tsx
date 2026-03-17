import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'OOH Monetization Platform for Media Owners | Moving Walls',
  description: 'Maximize your OOH inventory revenue with Moving Walls. Dynamic pricing, automated marketplace, real-time analytics, and programmatic capabilities for media owners.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('media-owners');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || 'Maximize your OOH inventory revenue with Moving Walls.',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function MediaOwnersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
