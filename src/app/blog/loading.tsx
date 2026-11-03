import { BlogListSkeleton, HeroSkeleton } from '@/components/Skeleton'

export default function BlogLoading() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSkeleton />

      {/* Blog Grid */}
      <section className="mw-container mw-section">
        <BlogListSkeleton count={9} />
      </section>
    </main>
  )
}
