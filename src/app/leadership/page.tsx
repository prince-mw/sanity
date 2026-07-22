import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Temporarily hidden — templated content, not final. Will be republished once finalized.
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: { index: false, follow: false },
  }
}

export default function LeadershipPage() {
  notFound()
}
