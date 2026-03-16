import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Transit Partnership - Moving Walls',
  description: 'Moving Walls transit advertising partnerships. Expand your reach with digital out-of-home advertising across transit networks.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('transit-partnership');
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

export default function TransitPartnershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
