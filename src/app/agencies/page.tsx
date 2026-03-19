import { Metadata } from 'next';
import { getAudiencePage, getPageSeo, getTestimonialsByCategory, transformTestimonial } from '@/sanity/lib/fetch';
import AgenciesPageClient from '@/components/AgenciesPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const [pageData, seoData] = await Promise.all([
    getAudiencePage('agencies'),
    getPageSeo('agencies')
  ]);

  const title = seoData?.seo?.metaTitle || pageData?.seoTitle || 'White Label OOH Platform for Agencies | Moving Walls';
  const description = seoData?.seo?.metaDescription || pageData?.seoDescription || 
    'Offer your clients a complete OOH solution under your own brand with global inventory, intelligent planning, and real-time analytics.';

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

export const revalidate = 3600;

export default async function AgenciesPage() {
  const [pageData, testimonials] = await Promise.all([
    getAudiencePage('agencies'),
    getTestimonialsByCategory('agencies')
  ]);

  // Transform testimonials for client component
  const transformedTestimonials = testimonials.map(t => transformTestimonial(t));

  const clientProps = pageData ? {
    title: pageData.title,
    titleHighlight: pageData.titleHighlight,
    subtitle: pageData.subtitle,
    primaryCTA: pageData.primaryCTA,
    secondaryCTA: pageData.secondaryCTA,
    stats: pageData.stats?.map(s => ({ value: s.value, label: s.label })),
    benefits: pageData.benefits?.map(b => ({ title: b.title, description: b.description })),
    platformFeatures: pageData.platformFeatures?.map(f => ({
      id: f.id,
      name: f.name,
      title: f.title,
      description: f.description,
      linkHref: f.linkHref,
      linkText: f.linkText,
    })),
    faqs: pageData.faqs?.map(f => ({ question: f.question, answer: f.answer })),
    testimonials: transformedTestimonials,
  } : { testimonials: transformedTestimonials };

  return <AgenciesPageClient {...clientProps} />;
}
