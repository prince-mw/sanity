import { Metadata } from 'next';
import { getIndustryPage, getPageSeo } from '@/sanity/lib/fetch';
import RetailPageClient from '@/components/RetailPageClient';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('retail');
  
  return {
    title: seo?.metaTitle || 'Retail & E-commerce | MovingWalls',
    description: seo?.metaDescription || 'Transform your retail advertising with strategic out-of-home campaigns that connect with shoppers at the right moment.',
    openGraph: seo?.ogImage ? {
      images: [{ url: seo.ogImage }],
    } : undefined,
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