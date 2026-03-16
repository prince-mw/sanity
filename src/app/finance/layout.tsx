import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'OOH Advertising for Finance Industry | Moving Walls',
  description: 'Targeted out-of-home advertising solutions for financial services. Reach affluent audiences and drive brand awareness for banks, insurance, and fintech.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('finance');
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

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
