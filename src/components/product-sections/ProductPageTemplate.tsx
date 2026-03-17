'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VideoModal from '@/components/VideoModal'
import {
  ProductHeroSection,
  ProductPainPointsSection,
  ProductFeaturesSection,
  ProductHowItWorksSection,
  ProductIntegrationsSection,
  ProductTestimonialsSection,
  ProductResourcesSection,
  ProductFinalCTASection,
} from '@/components/product-sections'

// Type for transformed enhanced product data
export interface ProductPageData {
  name: string
  slug: string
  tagline: string
  description: string
  icon: string
  category: string
  hero: {
    badge: string
    title: string
    subtitle: string
    description: string
    gradient: string
    heroImage: string
    heroVideo: string
    ctaText: string
    ctaLink: string
    secondaryCta?: {
      text: string
      link?: string
      isVideo?: boolean
    }
    stats: Array<{ value: string; label: string }>
  }
  painPoints: {
    title: string
    subtitle: string
    items: Array<{
      icon?: string
      title: string
      description: string
      beforeState?: string
      afterState?: string
    }>
  }
  features: {
    title: string
    subtitle: string
    layout: '2-col' | '3-col' | 'alternating'
    items: Array<{
      icon?: string
      title: string
      description: string
      image?: string
      metric?: string
    }>
  }
  howItWorks: {
    title: string
    subtitle: string
    steps: Array<{
      stepNumber: number
      title: string
      description: string
      icon?: string
      image?: string
    }>
  }
  integrations: {
    title: string
    subtitle: string
    items: Array<{
      name: string
      logo?: string
      category?: string
    }>
  }
  testimonials: {
    title: string
    items: Array<{
      quote: string
      author: string
      role?: string
      company?: string
      avatar?: string
      metric?: string
    }>
  }
  resources: {
    title: string
    caseStudies: Array<{
      _id: string
      title: string
      slug?: { current?: string }
      client?: string
      heroImage?: string
      excerpt?: string
    }>
    blogPosts: Array<{
      _id: string
      title: string
      slug?: { current?: string }
      featuredImage?: string
      excerpt?: string
      publishedAt?: string
    }>
    whitepapers: Array<{
      _id: string
      title: string
      slug?: { current?: string }
      coverImage?: string
      description?: string
    }>
    externalResources: Array<{
      title: string
      description?: string
      url: string
      type?: 'documentation' | 'api' | 'guide' | 'video' | 'other'
    }>
  }
  finalCta: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
  }
  benefits: string[]
  useCases: Array<{ title: string; description: string; industry?: string }>
  demoVideo: string
  seo: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
    keywords?: string[]
  }
}

interface ProductPageTemplateProps {
  product: ProductPageData
}

export default function ProductPageTemplate({ product }: ProductPageTemplateProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handleVideoClick = () => {
    if (product.hero.heroVideo || product.demoVideo) {
      setIsVideoModalOpen(true)
    }
  }

  // Check which sections have data
  const hasPainPoints = product.painPoints.items && product.painPoints.items.length > 0
  const hasFeatures = product.features.items && product.features.items.length > 0
  const hasHowItWorks = product.howItWorks.steps && product.howItWorks.steps.length > 0
  const hasIntegrations = product.integrations.items && product.integrations.items.length > 0
  const hasTestimonials = product.testimonials.items && product.testimonials.items.length > 0
  const hasResources = (
    (product.resources.caseStudies && product.resources.caseStudies.length > 0) ||
    (product.resources.blogPosts && product.resources.blogPosts.length > 0) ||
    (product.resources.whitepapers && product.resources.whitepapers.length > 0) ||
    (product.resources.externalResources && product.resources.externalResources.length > 0)
  )

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <ProductHeroSection
          badge={product.hero.badge}
          title={product.hero.title}
          subtitle={product.hero.subtitle}
          description={product.hero.description}
          gradient={product.hero.gradient}
          heroImage={product.hero.heroImage}
          heroVideo={product.hero.heroVideo}
          ctaText={product.hero.ctaText}
          ctaLink={product.hero.ctaLink}
          secondaryCta={product.hero.secondaryCta}
          stats={product.hero.stats}
          onVideoClick={handleVideoClick}
        />

        {/* Pain Points Section */}
        {hasPainPoints && (
          <ProductPainPointsSection
            title={product.painPoints.title}
            subtitle={product.painPoints.subtitle}
            painPoints={product.painPoints.items}
          />
        )}

        {/* Features Section */}
        {hasFeatures && (
          <ProductFeaturesSection
            title={product.features.title}
            subtitle={product.features.subtitle}
            features={product.features.items}
            layout={product.features.layout}
          />
        )}

        {/* How It Works Section */}
        {hasHowItWorks && (
          <ProductHowItWorksSection
            title={product.howItWorks.title}
            subtitle={product.howItWorks.subtitle}
            steps={product.howItWorks.steps}
          />
        )}

        {/* Integrations Section */}
        {hasIntegrations && (
          <ProductIntegrationsSection
            title={product.integrations.title}
            subtitle={product.integrations.subtitle}
            integrations={product.integrations.items}
          />
        )}

        {/* Testimonials Section */}
        {hasTestimonials && (
          <ProductTestimonialsSection
            title={product.testimonials.title}
            testimonials={product.testimonials.items}
          />
        )}

        {/* Resources Section */}
        {hasResources && (
          <ProductResourcesSection
            title={product.resources.title}
            caseStudies={product.resources.caseStudies}
            blogPosts={product.resources.blogPosts}
            whitepapers={product.resources.whitepapers}
            externalResources={product.resources.externalResources}
          />
        )}

        {/* Final CTA Section */}
        <ProductFinalCTASection
          title={product.finalCta.title}
          subtitle={product.finalCta.subtitle}
          ctaText={product.finalCta.ctaText}
          ctaLink={product.finalCta.ctaLink}
          gradient={product.hero.gradient}
        />
      </main>

      <Footer />

      {/* Video Modal */}
      {(product.hero.heroVideo || product.demoVideo) && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl={product.hero.heroVideo || product.demoVideo}
        />
      )}
    </>
  )
}
