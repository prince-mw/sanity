import { Metadata } from 'next';
import { getIndustryPage, getPageSeo } from '@/sanity/lib/fetch';
import HealthcarePageClient from '@/components/HealthcarePageClient';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('healthcare');
  const title = seo?.seo?.metaTitle || 'Healthcare Marketing | MovingWalls';
  const description = seo?.seo?.metaDescription || 'Build trust and drive patient engagement with healthcare advertising that reaches your community effectively.';
  
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

export default async function HealthcarePage() {
  const pageData = await getIndustryPage('healthcare');

  return (
    <HealthcarePageClient
      badgeText={pageData?.badgeText}
      title={pageData?.title}
      titleHighlight={pageData?.titleHighlight}
      subtitle={pageData?.subtitle}
      benefits={pageData?.benefits}
      solutions={pageData?.services}
      heroStats={pageData?.heroStats}
    />
  );
}
