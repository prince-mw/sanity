import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'OOH Platform for Advertising Agencies | Moving Walls',
  description: 'Scale your agency\'s OOH capabilities with Moving Walls. White-label solutions, multi-market campaigns, automated reporting, and access to premium screens worldwide.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('agencies');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || 'Scale your agency\'s OOH capabilities with Moving Walls.',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function AgenciesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
