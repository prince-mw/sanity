import { Metadata } from 'next';
import { getIndustryPage, getPageSeo } from '@/sanity/lib/fetch';
import FinancePageClient from '@/components/FinancePageClient';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('finance');
  
  return {
    title: seo?.metaTitle || 'Finance & Banking | MovingWalls',
    description: seo?.metaDescription || 'Transform your financial services marketing with strategic out-of-home campaigns that build trust, credibility, and drive customer acquisition.',
    openGraph: seo?.ogImage ? {
      images: [{ url: seo.ogImage }],
    } : undefined,
  };
}

export default async function FinancePage() {
  const pageData = await getIndustryPage('finance');

  return (
    <FinancePageClient
      badgeText={pageData?.badgeText}
      title={pageData?.title}
      titleHighlight={pageData?.titleHighlight}
      subtitle={pageData?.subtitle}
      benefits={pageData?.benefits}
      services={pageData?.services}
      trustFactors={pageData?.trustFactors}
      heroStats={pageData?.heroStats}
    />
  );
}
