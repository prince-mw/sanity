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
    alternates: {
      canonical: "https://www.movingwalls.com/retail",
    },
    // Temporarily hidden — templated content, not final. Page itself calls notFound(); force noindex here too since this layout still wraps the 404 boundary.
    robots: { index: false, follow: false },
  };
}

export default function RetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
