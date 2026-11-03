import { EventCardSkeleton, HeroSkeleton } from '@/components/Skeleton'

export default function EventsLoading() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSkeleton />

      {/* Events Grid */}
      <section className="mw-container mw-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  )
}
