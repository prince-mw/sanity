import type { Metadata } from 'next'
import Image from 'next/image'

// Proposal pages are private links: never indexed, never in the sitemap. They
// are also a funnel: the root layout renders no site header, footer or global
// CTA here, and this bar carries the logo without a link, so the only actions on
// the page are the proposal's own (Rif, 11 Nov 2026).
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function ProposalsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="no-print border-b border-gray-100 bg-white">
        <div className="mw-container flex h-14 items-center justify-between lg:h-16">
          <Image src="/assets/logo/MW-logo-web.svg" alt="Moving Walls" width={132} height={36} priority className="h-8 w-auto lg:h-9" />
          <span className="text-sm font-semibold text-gray-500">Instant proposal</span>
        </div>
      </div>
      {children}
    </>
  )
}
