import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'OOH Advertising for Retail Industry | Moving Walls',
  description: 'Drive foot traffic and sales with targeted out-of-home advertising for retail. Location-based campaigns to reach shoppers at the right moment.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('retail');
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
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function RetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
