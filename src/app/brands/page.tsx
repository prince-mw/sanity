import { Metadata } from 'next';
import { getAudiencePage, getPageSeo, getTestimonialsByCategory, transformTestimonial } from '@/sanity/lib/fetch';
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
  const [pageData, testimonials] = await Promise.all([
    getAudiencePage('brands'),
    getTestimonialsByCategory('brands')
  ]);

  // Transform testimonials for client component
  const transformedTestimonials = testimonials.map(t => transformTestimonial(t));

  // Transform Sanity data to match client component props
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

  return <BrandsPageClient {...clientProps} />;
}
