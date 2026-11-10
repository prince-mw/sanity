import type { Metadata } from 'next'

// Proposal pages are private links: never indexed, never in the sitemap.
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function ProposalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
