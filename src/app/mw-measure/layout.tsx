import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: "MW Measure - Don't Just Deliver OOH Campaigns. Prove It. | Moving Walls",
  description: 'Convert campaign delivery data into actionable proof. MW Measure is the command center for Out-of-Home advertising, providing real-time reach, frequency, saturation analysis, and verified attribution analytics.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('mw-measure');
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
      canonical: "https://www.movingwalls.com/mw-measure",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function MWMeasureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
