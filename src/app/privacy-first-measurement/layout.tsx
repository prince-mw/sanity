import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Privacy-First Measurement for OOH | Moving Walls',
  description: 'Privacy-compliant measurement solutions for out-of-home advertising. GDPR-ready analytics without compromising campaign effectiveness.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('privacy-first-measurement');
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
      canonical: "https://www.movingwalls.com/privacy-first-measurement",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function PrivacyFirstMeasurementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
