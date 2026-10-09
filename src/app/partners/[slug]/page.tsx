import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPartnerPageBySlug } from '@/sanity/lib/fetch';
import PartnerDetailClient from '@/components/PartnerDetailClient';

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const partner = await getPartnerPageBySlug(slug);
  if (!partner) return {};

  const title = partner.metaTitle || `${partner.name} × Moving Walls | Partners`;
  const description = partner.metaDescription || partner.summary || '';
  const url = `https://www.movingwalls.com/partners/${partner.slug}`;

  return {
    title,
    description,
    openGraph: { title, description, type: 'website', url },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
  };
}

export default async function PartnerPage({ params }: Props) {
  const { slug } = await params;
  const partner = await getPartnerPageBySlug(slug);
  if (!partner) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.movingwalls.com' },
      { '@type': 'ListItem', position: 2, name: 'Partners', item: 'https://www.movingwalls.com/partners' },
      { '@type': 'ListItem', position: 3, name: partner.name, item: `https://www.movingwalls.com/partners/${partner.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PartnerDetailClient partner={partner} />
    </>
  );
}
