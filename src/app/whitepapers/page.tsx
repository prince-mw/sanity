import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Temporarily hidden — being reworked. Will be republished once finalized.
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: { index: false, follow: false },
  }
}

export default function WhitepapersPage() {
  notFound()
}
