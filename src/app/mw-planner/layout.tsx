import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MW Planner - Strategic OOH Campaign Planning',
  description: 'Plan and optimize your out-of-home advertising campaigns with MW Planner. AI-powered media planning, audience insights, and strategic campaign optimization.',
  openGraph: {
    title: 'MW Planner - Strategic OOH Campaign Planning | Moving Walls',
    description: 'Plan and optimize your out-of-home advertising campaigns with AI-powered media planning and strategic optimization.',
  },
}

export default function MWPlannerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
