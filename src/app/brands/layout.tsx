import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OOH Advertising Solutions for Brands',
  description: 'Elevate your brand with Moving Walls OOH advertising solutions. Reach consumers at every stage of their journey with targeted outdoor campaigns.',
  openGraph: {
    title: 'OOH Advertising Solutions for Brands | Moving Walls',
    description: 'Elevate your brand with targeted outdoor advertising campaigns that reach consumers effectively.',
  },
}

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
