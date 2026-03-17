import { Metadata } from 'next';
import { getIndustryPage, getPageSeo } from '@/sanity/lib/fetch';
import RetailPageClient from '@/components/RetailPageClient';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('retail');
  const title = seo?.seo?.metaTitle || 'Retail & E-commerce | MovingWalls';
  const description = seo?.seo?.metaDescription || 'Transform your retail advertising with strategic out-of-home campaigns that connect with shoppers at the right moment.';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(seo?.seo?.ogImage && { images: [{ url: seo.seo.ogImage }] }),
    },
  };
}

export default async function RetailPage() {
  const pageData = await getIndustryPage('retail');

  return (
    <RetailPageClient
      badgeText={pageData?.badgeText}
      title={pageData?.title}
      titleHighlight={pageData?.titleHighlight}
      subtitle={pageData?.subtitle}
      benefits={pageData?.benefits}
      caseStudies={pageData?.caseStudies}
      heroStats={pageData?.heroStats}
    />
  );
}