'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { urlFor } from '@/sanity/lib/client'

interface SanityImageProps {
  image: any
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  onClick?: () => void
}

// Generate responsive srcSet for Sanity images
function generateSrcSet(image: any, widths: number[] = [320, 640, 768, 1024, 1280, 1536, 1920]): string {
  if (!image?.asset) return ''
  
  return widths
    .map(w => {
      try {
        const url = urlFor(image).width(w).quality(80).auto('format').url()
        return `${url} ${w}w`
      } catch {
        return ''
      }
    })
    .filter(Boolean)
    .join(', ')
}

// Generate blur placeholder data URL
function generateBlurDataURL(image: any): string {
  if (!image?.asset) return ''
  
  try {
    // Use a tiny version as blur placeholder
    return urlFor(image).width(20).quality(30).blur(10).auto('format').url()
  } catch {
    return ''
  }
}

// Get image dimensions from Sanity asset
function getImageDimensions(image: any): { width: number; height: number } | null {
  if (!image?.asset?._ref) return null
  
  // Extract dimensions from Sanity asset ID (format: image-{id}-{width}x{height}-{format})
  const ref = image.asset._ref
  const dimensions = ref.match(/-(\d+)x(\d+)-/)
  
  if (dimensions) {
    return {
      width: parseInt(dimensions[1], 10),
      height: parseInt(dimensions[2], 10),
    }
  }
  
  return null
}

export default function SanityImage({
  image,
  alt,
  width,
  height,
  fill = false,
  sizes = '100vw',
  priority = false,
  className = '',
  quality = 85,
  placeholder = 'blur',
  objectFit = 'cover',
  onClick,
}: SanityImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imageRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '200px', // Load images 200px before they enter viewport
        threshold: 0,
      }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  // Validate image
  if (!image?.asset) {
    return (
      <div 
        className={`bg-mw-gray-100 flex items-center justify-center ${className}`}
        style={{ width: width || '100%', height: height || 200 }}
      >
        <svg className="w-12 h-12 text-mw-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  // Generate optimized URL
  let imageUrl = ''
  let blurDataURL = ''
  
  try {
    const builder = urlFor(image).quality(quality).auto('format')
    
    if (width && !fill) {
      builder.width(width)
    }
    if (height && !fill) {
      builder.height(height)
    }
    
    imageUrl = builder.url()
    
    if (placeholder === 'blur') {
      blurDataURL = generateBlurDataURL(image)
    }
  } catch (error) {
    console.error('Error generating Sanity image URL:', error)
    setHasError(true)
  }

  // Get natural dimensions
  const dimensions = getImageDimensions(image)
  const finalWidth = width || dimensions?.width || 800
  const finalHeight = height || dimensions?.height || 600

  // Error state
  if (hasError || !imageUrl) {
    return (
      <div 
        className={`bg-mw-gray-100 flex items-center justify-center ${className}`}
        style={{ width: fill ? '100%' : finalWidth, height: fill ? '100%' : finalHeight }}
      >
        <span className="text-mw-gray-400 text-sm">Failed to load image</span>
      </div>
    )
  }

  // Placeholder until in view
  if (!isInView) {
    return (
      <div 
        ref={imageRef}
        className={`bg-mw-gray-100 animate-pulse ${className}`}
        style={{ 
          width: fill ? '100%' : finalWidth, 
          height: fill ? '100%' : finalHeight,
          aspectRatio: fill ? undefined : `${finalWidth}/${finalHeight}`,
        }}
      />
    )
  }

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  }[objectFit]

  return (
    <div 
      ref={imageRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: fill ? '100%' : finalWidth, 
        height: fill ? '100%' : finalHeight,
      }}
      onClick={onClick}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-mw-gray-100 animate-pulse" />
      )}
      
      <Image
        src={imageUrl}
        alt={alt}
        fill={fill}
        width={fill ? undefined : finalWidth}
        height={fill ? undefined : finalHeight}
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={placeholder === 'blur' && blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL || undefined}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${objectFitClass}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
}

// Responsive image component with srcset
export function ResponsiveSanityImage({
  image,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = '',
  priority = false,
  aspectRatio = '16/9',
}: {
  image: any
  alt: string
  sizes?: string
  className?: string
  priority?: boolean
  aspectRatio?: string
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  if (!image?.asset) {
    return (
      <div 
        className={`bg-mw-gray-100 flex items-center justify-center ${className}`}
        style={{ aspectRatio }}
      >
        <svg className="w-12 h-12 text-mw-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  const srcSet = generateSrcSet(image)
  const src = urlFor(image).width(1200).quality(85).auto('format').url()
  const blurDataURL = generateBlurDataURL(image)

  if (hasError) {
    return (
      <div 
        className={`bg-mw-gray-100 flex items-center justify-center ${className}`}
        style={{ aspectRatio }}
      >
        <span className="text-mw-gray-400 text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-mw-gray-100 animate-pulse" />
      )}
      
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{
          backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  )
}

// Background image component with lazy loading
export function SanityBackgroundImage({
  image,
  children,
  className = '',
  overlayClassName = '',
  priority = false,
}: {
  image: any
  children?: React.ReactNode
  className?: string
  overlayClassName?: string
  priority?: boolean
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '100px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  if (!image?.asset) {
    return (
      <div className={`bg-mw-gray-200 ${className}`}>
        {children}
      </div>
    )
  }

  const imageUrl = isInView 
    ? urlFor(image).width(1920).quality(80).auto('format').url()
    : ''
  
  const blurUrl = urlFor(image).width(50).quality(30).blur(20).auto('format').url()

  // Preload image
  useEffect(() => {
    if (!isInView || !imageUrl) return

    const img = new window.Image()
    img.onload = () => setIsLoaded(true)
    img.src = imageUrl
  }, [isInView, imageUrl])

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: isLoaded ? `url(${imageUrl})` : `url(${blurUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
