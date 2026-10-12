import { Metadata } from 'next'
import SingaporeLandingClient from '@/components/SingaporeLandingClient'
import { getLocationBySlug } from '@/sanity/lib/fetch'
import { sgMain, sgFaqJsonLd, SG_CONTACT_FORM_URL } from '@/data/singapore'

// Dedicated Singapore page — takes precedence over the generic /locations/[slug] route.
// The Singapore form URL and the "Trusted Globally by Marketers" logo strip still come
// from the Singapore location document in Sanity.

const url = 'https://www.movingwalls.com/locations/singapore'

export const metadata: Metadata = {
  title: sgMain.metaTitle,
  description: sgMain.metaDescription,
  openGraph: { title: sgMain.metaTitle, description: sgMain.metaDescription, type: 'website', url },
  twitter: { card: 'summary_large_image', title: sgMain.metaTitle, description: sgMain.metaDescription },
  alternates: { canonical: url },
}

export const revalidate = 3600

async function getSingaporeShared() {
  const doc = await getLocationBySlug('singapore')
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const sections: any[] = (doc as any)?.sections || []
  /* eslint-enable @typescript-eslint/no-explicit-any */
  return {
    formUrl: doc?.contactFormUrl || SG_CONTACT_FORM_URL,
    logoSection: sections.find((s) => s._type === 'logoCarousel') || null,
  }
}

export default async function SingaporePage() {
  const { formUrl, logoSection } = await getSingaporeShared()
  const faqJsonLd = sgFaqJsonLd(sgMain.faqs)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.movingwalls.com' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.movingwalls.com/locations' },
      { '@type': 'ListItem', position: 3, name: 'Singapore', item: url },
    ],
  }

  return (
    <>
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SingaporeLandingClient formUrl={formUrl} logoSection={logoSection} />
    </>
  )
}
