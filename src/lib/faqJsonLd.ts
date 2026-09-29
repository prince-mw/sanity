interface AccordionItem {
  question?: string
  answer?: string
}

interface PortableTextBlock {
  _type: string
  items?: AccordionItem[]
}

/**
 * Builds FAQPage JSON-LD from any accordionBlock(s) found in a portable-text content
 * array — the same "Frequently Asked Questions" block editors can drop into blog posts,
 * case studies, events, webinars, press releases, jobs, and team bios. Returns null when
 * there's nothing to mark up, so callers can render conditionally without extra checks.
 */
export function extractFaqJsonLd(blocks: PortableTextBlock[] | null | undefined) {
  if (!blocks || !Array.isArray(blocks)) return null

  const faqItems = blocks
    .filter((block) => block?._type === 'accordionBlock')
    .flatMap((block) => block.items || [])
    .filter((item): item is Required<AccordionItem> => Boolean(item?.question && item?.answer))

  if (faqItems.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
