import { Metadata } from 'next';
import { getIndustryPage, getPageSeo, getAllCaseStudies, transformCaseStudy } from '@/sanity/lib/fetch';
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
  const [pageData, sanityCaseStudies] = await Promise.all([
    getIndustryPage('retail'),
    getAllCaseStudies()
  ]);

  // Transform real case studies from Sanity as fallback (limit to 3)
  const latestCaseStudies = sanityCaseStudies.slice(0, 3).map(cs => {
    const transformed = transformCaseStudy(cs);
    return {
      brand: transformed.brand || transformed.title,
      metric: transformed.metrics?.[0]?.value || 'View Details',
      description: transformed.excerpt || transformed.title,
    };
  });

  return (
    <RetailPageClient
      badgeText={pageData?.badgeText}
      title={pageData?.title}
      titleHighlight={pageData?.titleHighlight}
      subtitle={pageData?.subtitle}
      benefits={pageData?.benefits}
      caseStudies={pageData?.caseStudies?.length ? pageData.caseStudies : latestCaseStudies.length ? latestCaseStudies : undefined}
      heroStats={pageData?.heroStats}
    />
  );
}