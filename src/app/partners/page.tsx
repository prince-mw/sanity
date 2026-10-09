import { Metadata } from 'next';
import { getAllPartnerPages } from '@/sanity/lib/fetch';
import { partnersIndexContent } from '@/data/partners';
import PartnersListClient from '@/components/PartnersListClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: partnersIndexContent.metaTitle,
  description: partnersIndexContent.metaDescription,
  openGraph: {
    title: partnersIndexContent.metaTitle,
    description: partnersIndexContent.metaDescription,
    type: 'website',
    url: 'https://www.movingwalls.com/partners',
  },
  twitter: {
    card: 'summary_large_image',
    title: partnersIndexContent.metaTitle,
    description: partnersIndexContent.metaDescription,
  },
  alternates: {
    canonical: 'https://www.movingwalls.com/partners',
  },
};

export default async function PartnersPage() {
  const partners = await getAllPartnerPages();
  return <PartnersListClient intro={partnersIndexContent} partners={partners} />;
}
