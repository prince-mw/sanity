import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Discover the Moving Walls story. Learn how we became a global leader in OOH advertising technology, connecting brands with audiences worldwide.',
  openGraph: {
    title: 'Our Story | Moving Walls',
    description: 'Discover how Moving Walls became a global leader in OOH advertising technology.',
  },
}

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
