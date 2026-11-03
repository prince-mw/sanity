import { CaseStudyListSkeleton, HeroSkeleton } from '@/components/Skeleton'

export default function CaseStudiesLoading() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSkeleton />

      {/* Case Studies Grid */}
      <section className="mw-container mw-section">
        <CaseStudyListSkeleton count={6} />
      </section>
    </main>
  )
}
