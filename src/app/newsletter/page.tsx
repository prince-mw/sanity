import { Metadata } from 'next'
import NewsletterPageClient from '@/components/NewsletterPageClient'
import { getPageSeo, getSanityImageUrl, getZohoFormsByType } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Newsletter | Moving Walls',
  description: 'Get industry insights on OOH advertising, programmatic DOOH, and connected media delivered weekly to your inbox.',
}

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('newsletter')
  const seo = pageSeo?.seo

  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || defaultMeta.description,
      type: 'website',
      images: seo?.ogImage
        ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }]
        : [],
    },
    alternates: {
      canonical: 'https://www.movingwalls.com/newsletter',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export const revalidate = 60

export default async function NewsletterPage() {
  // Fetch the newsletter Zoho Campaigns embed URL from Sanity (formType: 'newsletter')
  let formUrl: string | null = null
  try {
    const forms = await getZohoFormsByType('newsletter')
    const activeForm = forms.find(f => f.isActive !== false && f.formUrl)
    formUrl = activeForm?.formUrl || null
  } catch {
    // fall through to static embed URL
  }

  return <NewsletterPageClient formUrl={formUrl} />
}
