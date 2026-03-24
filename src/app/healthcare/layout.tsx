import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'OOH Advertising for Healthcare Industry | Moving Walls',
  description: 'Targeted out-of-home advertising solutions for healthcare. Reach patients and healthcare professionals with compliant, impactful OOH campaigns.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('healthcare');
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
      canonical: "https://www.movingwalls.com/healthcare",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function HealthcareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
