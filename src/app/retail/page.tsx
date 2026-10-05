import { getRetailMediaPage } from '@/sanity/lib/fetch';
import RetailMediaPageClient from '@/components/RetailMediaPageClient';

export const revalidate = 3600;

export default async function RetailPage() {
  const content = await getRetailMediaPage();

  const faqJsonLd = content.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <RetailMediaPageClient content={content} />
    </>
  );
}
