'use client';

import React from 'react';
import { getSanityImageUrl, type SanityProduct } from '@/sanity/lib/fetch';
import { HeroSection } from './_components/HeroSection';
import { ComparisonSection } from './_components/ComparisonSection';
import { FeatureSupplyConfidence } from './_components/FeatureSupplyConfidence';
import { FeatureBundleOpportunities } from './_components/FeatureBundleOpportunities';
import { FeatureControlSelling } from './_components/FeatureControlSelling';
import { FeatureCalendarAvailability } from './_components/FeatureCalendarAvailability';
import { MwScienceStrip } from './_components/MwScienceStrip';
import { CtaSection } from './_components/CtaSection';

interface MWInventoryClientProps {
  product?: SanityProduct | null;
}

export default function MWInventoryClient({ product }: MWInventoryClientProps) {
  // Comparison section's two 3-item lists only override the defaults once the editor has
  // filled in a full, valid set of 3 pain points with both before/after copy — a partial
  // list would leave the layout with empty rows, so we fall back wholesale otherwise.
  const validPainPoints = (product?.painPoints || []).filter((p) => p.beforeState && p.afterState);
  const withoutPoints = validPainPoints.length === 3 ? validPainPoints.map((p) => p.beforeState as string) : undefined;
  const withPoints = validPainPoints.length === 3 ? validPainPoints.map((p) => p.afterState as string) : undefined;

  const steps = product?.howItWorksSteps || [];
  const [step1, step2, step3, step4] = steps;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] antialiased selection:bg-[#062068] selection:text-white font-sans">
      <HeroSection
        badge={product?.heroBadge || undefined}
        title={product?.heroTitle || undefined}
        subtitle={product?.heroSubtitle || undefined}
        heroImageUrl={getSanityImageUrl(product?.heroImage, { width: 1200 })}
        ctaText={product?.ctaText || undefined}
        ctaLink={product?.ctaLink || undefined}
      />
      <ComparisonSection
        title={product?.painPointsTitle || undefined}
        withoutPoints={withoutPoints}
        withPoints={withPoints}
      />

      <section className="pt-2 pb-8 bg-white border-t border-gray-200/70" id="features-section">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto pt-8 pb-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#062068] font-sans">
              {product?.featuresTitle || 'Unlock More Value From What You Own.'}
            </h2>
          </div>

          <FeatureSupplyConfidence
            title={step1?.title || undefined}
            description={step1?.description || undefined}
            imageUrl={getSanityImageUrl(step1?.image, { width: 900 })}
          />
          <FeatureBundleOpportunities
            title={step2?.title || undefined}
            description={step2?.description || undefined}
          />
          <FeatureControlSelling
            title={step3?.title || undefined}
            description={step3?.description || undefined}
            imageUrl={getSanityImageUrl(step3?.image, { width: 900 })}
          />
          <FeatureCalendarAvailability
            title={step4?.title || undefined}
            description={step4?.description || undefined}
            imageUrl={getSanityImageUrl(step4?.image, { width: 900 })}
          />
        </div>
      </section>

      <MwScienceStrip />
      <CtaSection
        title={product?.finalCtaTitle || undefined}
        subtitle={product?.finalCtaSubtitle || undefined}
        ctaText={product?.ctaText || undefined}
        ctaLink={product?.ctaLink || undefined}
      />
    </div>
  );
}
