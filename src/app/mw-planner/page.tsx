import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl, getProductBySlug } from '@/sanity/lib/fetch'
import MWPlannerClient from './MWPlannerClient'

const defaultMeta = {
  title: 'MW Planner - Build OOH Plans You Can Defend | Moving Walls',
  description: 'Transform campaign briefs into data-backed OOH plans with live inventory, audience insights, and forecasting—all in one platform.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('mw-planner');
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
      canonical: "https://www.movingwalls.com/mw-planner",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 30;

export default async function MWPlannerPage() {
  const product = await getProductBySlug('mw-planner');

  return <MWPlannerClient product={product} />;
}
