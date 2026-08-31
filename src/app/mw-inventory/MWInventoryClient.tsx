'use client';

import React from 'react';
import type { SanityProduct } from '@/sanity/lib/fetch';
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
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] antialiased selection:bg-[#062068] selection:text-white font-sans">
      <HeroSection
        badge={product?.heroBadge || undefined}
        title={product?.heroTitle || undefined}
        subtitle={product?.heroSubtitle || undefined}
      />
      <ComparisonSection />

      <section className="pt-2 pb-8 bg-white border-t border-gray-200/70" id="features-section">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto pt-8 pb-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#062068] font-sans">
              Unlock More Value From What You Own.
            </h2>
            <p className="text-base sm:text-lg font-medium text-gray-500 mt-2">
              How MW Inventory Helps
            </p>
          </div>

          <FeatureSupplyConfidence />
          <FeatureBundleOpportunities />
          <FeatureControlSelling />
          <FeatureCalendarAvailability />
        </div>
      </section>

      <MwScienceStrip />
      <CtaSection />
    </div>
  );
}
