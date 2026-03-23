import { Metadata } from 'next';
import { getAudiencePage, getPageSeo, getTestimonialsByCategory, transformTestimonial, getSanityImageUrl, getAllCaseStudies, transformCaseStudy } from '@/sanity/lib/fetch';
import BrandsPageClient from '@/components/BrandsPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const [pageData, seoData] = await Promise.all([
    getAudiencePage('brands'),
    getPageSeo('brands')
  ]);

  const title = seoData?.seo?.metaTitle || pageData?.seoTitle || 'OOH Solutions for Brands | Moving Walls';
  const description = seoData?.seo?.metaDescription || pageData?.seoDescription || 
    'Launch measurable OOH campaigns across cities and continents. From brief to live in minutes. From impression to impact with clarity.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function BrandsPage() {
  const [pageData, testimonials, sanityCaseStudies] = await Promise.all([
    getAudiencePage('brands'),
    getTestimonialsByCategory('brands'),
    getAllCaseStudies()
  ]);

  // Transform testimonials for client component
  const transformedTestimonials = testimonials.map(t => transformTestimonial(t));

  // Transform real case studies from Sanity as fallback (limit to 6)
  const latestCaseStudies = sanityCaseStudies.slice(0, 6).map(cs => {
    const transformed = transformCaseStudy(cs);
    return {
      client: transformed.brand,
      category: transformed.industry,
      title: transformed.title,
      description: transformed.excerpt,
      image: transformed.featuredImage,
      duration: '',
      budget: '',
      metrics: transformed.metrics?.length ? transformed.metrics : [{ label: 'Results', value: 'View Details' }],
    };
  });

  // Transform Sanity data to match client component props
  const clientProps = pageData ? {
    title: pageData.title,
    titleHighlight: pageData.titleHighlight,
    subtitle: pageData.subtitle,
    primaryCTA: pageData.primaryCTA,
    secondaryCTA: pageData.secondaryCTA,
    heroImage: pageData.heroImage ? getSanityImageUrl(pageData.heroImage, { width: 1200 }) : undefined,
    stats: pageData.stats?.map(s => ({ value: s.value, label: s.label })),
    benefits: pageData.benefits?.map(b => ({ title: b.title, description: b.description, image: b.image ? getSanityImageUrl(b.image, { width: 600 }) : undefined })),
    platformSectionTitle: pageData.platformSectionTitle,
    platformSectionSubtitle: pageData.platformSectionSubtitle,
    platformFeatures: pageData.platformFeatures?.map(f => ({
      id: f.id,
      tabLabel: f.tabLabel,
      name: f.name,
      title: f.title,
      description: f.description,
      image: f.image ? getSanityImageUrl(f.image, { width: 800 }) : undefined,
      features: f.features,
      linkHref: f.linkHref,
      linkText: f.linkText,
    })),
    trustBarTitle: pageData.trustBarTitle,
    customerLogos: pageData.customerLogos?.map(l => ({
      name: l.name,
      logo: l.logo ? getSanityImageUrl(l.logo, { width: 240 }) : undefined,
    })),
    journeyTitle: pageData.journeyTitle,
    journeySubtitle: pageData.journeySubtitle,
    journeySteps: pageData.journeySteps?.map(s => ({
      stepLabel: s.stepLabel,
      stepName: s.stepName,
      description: s.description,
      items: s.items,
    })),
    caseStudySectionTitle: pageData.caseStudySectionTitle,
    caseStudySectionSubtitle: pageData.caseStudySectionSubtitle,
    caseStudies: pageData.caseStudies?.length ? pageData.caseStudies.map(cs => ({
      client: cs.client,
      category: cs.category,
      title: cs.title,
      description: cs.description,
      image: cs.image ? getSanityImageUrl(cs.image, { width: 800 }) : undefined,
      duration: cs.duration,
      budget: cs.budget,
      metrics: cs.metrics,
    })) : latestCaseStudies.length ? latestCaseStudies : undefined,
    faqs: pageData.faqs?.map(f => ({ question: f.question, answer: f.answer })),
    testimonials: transformedTestimonials,
  } : { 
    testimonials: transformedTestimonials,
    caseStudies: latestCaseStudies.length ? latestCaseStudies : undefined,
  };

  return <BrandsPageClient {...clientProps} />;
}
