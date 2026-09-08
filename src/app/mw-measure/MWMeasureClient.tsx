'use client';

import React from 'react';
import type { SanityProduct } from '@/sanity/lib/fetch';
import { HeroSection } from './_components/HeroSection';
import { ComparisonSection } from './_components/ComparisonSection';
import { ThreeAnswersSection } from './_components/ThreeAnswersSection';
import { CampaignInsightsSection } from './_components/CampaignInsightsSection';
import { AudiencesSection } from './_components/AudiencesSection';
import { MwScienceStrip } from './_components/MwScienceStrip';
import { FooterCTA } from './_components/FooterCTA';

interface MWMeasureClientProps {
  product?: SanityProduct | null;
}

export default function MWMeasureClient({ product }: MWMeasureClientProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <HeroSection
        badge={product?.heroBadge || undefined}
        title={product?.heroTitle || undefined}
        subtitle={product?.heroSubtitle || undefined}
      />
      <ComparisonSection />
      <ThreeAnswersSection />
      <CampaignInsightsSection />
      <AudiencesSection />
      <MwScienceStrip />
      <FooterCTA />
    </div>
  );
}
