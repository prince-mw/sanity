import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SingaporeVenueClient from '@/components/SingaporeVenueClient'
import { getLocationBySlug } from '@/sanity/lib/fetch'
import { getSgVenue, sgVenues, sgFaqJsonLd, SG_BASE_PATH, SG_CONTACT_FORM_URL } from '@/data/singapore'

type Props = { params: Promise<{ venue: string }> }

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return sgVenues.map((v) => ({ venue: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { venue: slug } = await params
  const venue = getSgVenue(slug)
  if (!venue) return {}
  const url = `https://www.movingwalls.com${SG_BASE_PATH}/${venue.slug}`
  return {
    title: venue.metaTitle,
    description: venue.metaDescription,
    openGraph: { title: venue.metaTitle, description: venue.metaDescription, type: 'website', url },
    twitter: { card: 'summary_large_image', title: venue.metaTitle, description: venue.metaDescription },
    alternates: { canonical: url },
  }
}

export default async function SingaporeVenuePage({ params }: Props) {
  const { venue: slug } = await params
  const venue = getSgVenue(slug)
  if (!venue) notFound()

  const doc = await getLocationBySlug('singapore')
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const sections: any[] = (doc as any)?.sections || []
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const formUrl = doc?.contactFormUrl || SG_CONTACT_FORM_URL
  const logoSection = sections.find((s) => s._type === 'logoCarousel') || null

  // Image-only cards: don't send the placeholder site details to the browser at all
  const clientVenue = venue.landmarksImageOnly
    ? { ...venue, landmarks: venue.landmarks.map((l) => ({ ...l, name: '', location: '', format: '', reach: '', impressions: '' })) }
    : venue

  const url = `https://www.movingwalls.com${SG_BASE_PATH}/${venue.slug}`
  const faqJsonLd = sgFaqJsonLd(venue.faqs)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.movingwalls.com' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.movingwalls.com/locations' },
      { '@type': 'ListItem', position: 3, name: 'Singapore', item: `https://www.movingwalls.com${SG_BASE_PATH}` },
      { '@type': 'ListItem', position: 4, name: venue.breadcrumbLabel, item: url },
    ],
  }

  return (
    <>
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SingaporeVenueClient venue={clientVenue} formUrl={formUrl} logoSection={logoSection} />
    </>
  )
}
