import { ReactNode } from 'react'

// Base skeleton component with shimmer animation
export function Skeleton({ 
  className = '',
  children,
}: { 
  className?: string
  children?: ReactNode 
}) {
  return (
    <div 
      className={`animate-pulse bg-gradient-to-r from-mw-gray-200 via-mw-gray-100 to-mw-gray-200 bg-[length:200%_100%] ${className}`}
      style={{
        animation: 'shimmer 1.5s ease-in-out infinite',
      }}
    >
      {children}
    </div>
  )
}

// Text line skeleton
export function SkeletonText({ 
  lines = 1,
  className = '',
}: { 
  lines?: number
  className?: string 
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 rounded ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`} 
        />
      ))}
    </div>
  )
}

// Blog card skeleton
export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-mw border border-mw-gray-100">
      {/* Image */}
      <Skeleton className="aspect-[16/9] w-full" />
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Category & Date */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
        
        {/* Title */}
        <Skeleton className="h-6 w-full rounded" />
        <Skeleton className="h-6 w-3/4 rounded" />
        
        {/* Excerpt */}
        <SkeletonText lines={2} />
        
        {/* Author */}
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 rounded mb-1" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Case study card skeleton
export function CaseStudyCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-mw border border-mw-gray-100">
      {/* Image */}
      <Skeleton className="aspect-[16/10] w-full" />
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Logo */}
        <Skeleton className="h-8 w-32 rounded" />
        
        {/* Title */}
        <Skeleton className="h-6 w-full rounded" />
        
        {/* Meta */}
        <div className="flex gap-4">
          <Skeleton className="h-5 w-20 rounded" />
          <Skeleton className="h-5 w-24 rounded" />
        </div>
        
        {/* Excerpt */}
        <SkeletonText lines={2} />
      </div>
    </div>
  )
}

// Blog list skeleton (grid of cards)
export function BlogListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Case study list skeleton
export function CaseStudyListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <CaseStudyCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Blog detail page skeleton
export function BlogDetailSkeleton() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex gap-2 mb-8">
        <Skeleton className="h-4 w-12 rounded" />
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-32 rounded" />
      </div>

      {/* Header */}
      <header className="mb-8">
        <Skeleton className="h-6 w-24 rounded-full mb-4" />
        <Skeleton className="h-10 w-full rounded mb-2" />
        <Skeleton className="h-10 w-3/4 rounded mb-6" />
        
        {/* Meta */}
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32 rounded mb-1" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <Skeleton className="aspect-[16/9] w-full rounded-xl mb-8" />

      {/* Content */}
      <div className="space-y-4">
        <SkeletonText lines={4} />
        <Skeleton className="h-6 w-2/3 rounded mt-8 mb-4" />
        <SkeletonText lines={5} />
        <Skeleton className="h-6 w-1/2 rounded mt-8 mb-4" />
        <SkeletonText lines={3} />
      </div>
    </article>
  )
}

// Hero section skeleton
export function HeroSkeleton() {
  return (
    <div className="relative bg-mw-gray-100 min-h-[60vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="max-w-2xl">
          <Skeleton className="h-12 w-3/4 rounded mb-4" />
          <Skeleton className="h-12 w-1/2 rounded mb-6" />
          <SkeletonText lines={3} className="mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-36 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Team member card skeleton
export function TeamMemberSkeleton() {
  return (
    <div className="text-center">
      <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
      <Skeleton className="h-5 w-32 rounded mx-auto mb-2" />
      <Skeleton className="h-4 w-24 rounded mx-auto mb-3" />
      <div className="flex justify-center gap-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  )
}

// Event card skeleton
export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-mw border border-mw-gray-100 p-6">
      <div className="flex gap-4">
        {/* Date Badge */}
        <div className="flex-shrink-0">
          <Skeleton className="w-16 h-20 rounded-lg" />
        </div>
        
        {/* Content */}
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Search results skeleton
export function SearchResultsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-4 border border-mw-gray-100">
          <div className="flex gap-4">
            <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Table skeleton
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-mw-gray-200">
      {/* Header */}
      <div className="bg-mw-gray-50 border-b border-mw-gray-200 p-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1 rounded" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={rowIndex} 
          className="p-4 flex gap-4 border-b border-mw-gray-100 last:border-b-0"
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton 
              key={colIndex} 
              className={`h-4 flex-1 rounded ${colIndex === 0 ? 'w-1/4' : ''}`} 
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// Page loading skeleton (full page)
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen">
      <HeroSkeleton />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 rounded mx-auto mb-4" />
          <Skeleton className="h-4 w-96 rounded mx-auto" />
        </div>
        <BlogListSkeleton count={3} />
      </div>
    </div>
  )
}
