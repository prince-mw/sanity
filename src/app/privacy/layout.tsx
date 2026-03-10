import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'MovingWalls Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with GDPR and CCPA.',
  openGraph: {
    title: 'Privacy Policy | MovingWalls',
    description: 'Learn how MovingWalls collects, uses, and protects your personal data.',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
