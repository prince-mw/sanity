import { CaseStudyListSkeleton, HeroSkeleton } from '@/components/Skeleton'

export default function CaseStudiesLoading() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSkeleton />

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CaseStudyListSkeleton count={6} />
      </section>
    </main>
  )
}
