import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with MovingWalls. Contact our team for OOH advertising solutions, partnerships, or support. Available worldwide.',
  openGraph: {
    title: 'Contact MovingWalls',
    description: 'Get in touch with our team for OOH advertising solutions, partnerships, or support.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
