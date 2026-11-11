// The area template's FAQ (Rif, 11 Nov 2026): the same look as the country
// and city FAQ, built on <details> so the answers are in the page HTML for
// search engines and open without JavaScript. FAQPage data is added by the page.

import { Plus } from 'lucide-react'

export function AreaFaq({ placeName, faqs }: { placeName: string; faqs: { q: string; a: string }[] }) {
  if (!faqs.length) return null
  return (
    <section className="bg-gray-50 mw-section" aria-labelledby="area-faq-title">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 id="area-faq-title" className="mb-8 text-center text-3xl font-bold text-gray-900 lg:text-4xl">Advertising in {placeName}: questions</h2>
        <div className="space-y-4">
          {faqs.map(f => (
            <details key={f.q} className="group overflow-hidden rounded-xl border border-gray-200 bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-gray-900 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="h-5 w-5 flex-shrink-0 text-mw-blue-600 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
