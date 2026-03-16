import { EventCardSkeleton, HeroSkeleton } from '@/components/Skeleton'

export default function EventsLoading() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSkeleton />

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  )
}
