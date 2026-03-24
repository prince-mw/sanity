import { Metadata } from 'next';
import { getAudiencePage, getPageSeo, getTestimonialsByCategory, transformTestimonial, getSanityImageUrl } from '@/sanity/lib/fetch';
import MediaOwnersPageClient from '@/components/MediaOwnersPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const [pageData, seoData] = await Promise.all([
    getAudiencePage('media-owners'),
    getPageSeo('media-owners')
  ]);

  const title = seoData?.seo?.metaTitle || pageData?.seoTitle || 'OOH Inventory Monetization for Media Owners | Moving Walls';
  const description = seoData?.seo?.metaDescription || pageData?.seoDescription || 
    'Turn your screens into a high-performing revenue engine. Connect to premium advertisers and automate your OOH sales operation.';

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
    alternates: {
      canonical: "https://www.movingwalls.com/media-owners",
    },
  };
}

export const revalidate = 3600;

export default async function MediaOwnersPage() {
  const [pageData, testimonials] = await Promise.all([
    getAudiencePage('media-owners'),
    getTestimonialsByCategory('media-owners')
  ]);

  // Transform testimonials for client component
  const transformedTestimonials = testimonials.map(t => transformTestimonial(t));

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
    featureGridTitle: pageData.featureGridTitle,
    featureGridSubtitle: pageData.featureGridSubtitle,
    featureGrid: pageData.featureGrid?.map(fg => ({
      title: fg.title,
      description: fg.description,
      iconName: fg.iconName,
    })),
    faqs: pageData.faqs?.map(f => ({ question: f.question, answer: f.answer })),
    testimonials: transformedTestimonials,
  } : { testimonials: transformedTestimonials };

  return <MediaOwnersPageClient {...clientProps} />;
}
