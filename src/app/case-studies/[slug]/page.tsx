import CaseStudyClient from './CaseStudyClient';

// Generate static params for all case studies (required for static export)
export function generateStaticParams() {
  return [
    { slug: 'global-retail-brand-340-roi' },
    { slug: 'fmcg-multi-market-launch' },
    { slug: 'automotive-dealership-traffic' },
    { slug: 'fintech-app-acquisition' },
    { slug: 'healthcare-patient-reach' },
    { slug: 'tech-product-launch' },
    { slug: 'bank-branch-visits' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  return <CaseStudyClient slug={slug} />;
}
