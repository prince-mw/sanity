import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Page and Sanity content type removed.
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: { index: false, follow: false },
  }
}

export default function WhitepapersPage() {
  notFound()
}
