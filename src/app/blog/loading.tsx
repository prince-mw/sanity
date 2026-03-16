import { BlogListSkeleton, HeroSkeleton } from '@/components/Skeleton'

export default function BlogLoading() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSkeleton />

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BlogListSkeleton count={9} />
      </section>
    </main>
  )
}
