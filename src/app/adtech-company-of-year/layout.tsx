import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Moving Walls - AdTech Company of the Year | Moving Walls',
  description: 'Moving Walls recognized as AdTech Company of the Year for pioneering innovations in programmatic out-of-home advertising technology.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('adtech-company-of-year');
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
      canonical: "https://www.movingwalls.com/adtech-company-of-year",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function AdTechCompanyOfYearLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
