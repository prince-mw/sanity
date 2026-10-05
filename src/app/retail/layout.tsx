import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Retail Media in Southeast Asia | In-Store Screens | Moving Walls',
  description: 'Plan, buy and measure in-store retail media across Vietnam, the Philippines, Malaysia, Thailand and Indonesia. 4000+ retail screens, planned on audience data.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('retail');
  const seo = pageSeo?.seo;
  const title = seo?.metaTitle || defaultMeta.title;
  const description = seo?.metaDescription || defaultMeta.description;
  const images = seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [];

  return {
    title,
    description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://www.movingwalls.com/retail',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: "https://www.movingwalls.com/retail",
    },
    ...(seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export default function RetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
