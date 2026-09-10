'use client';

import React from 'react';
import type { SanityProduct } from '@/sanity/lib/fetch';
import { HeroSection } from './_components/HeroSection';
import { DataPlanningSection } from './_components/DataPlanningSection';
import { FeatureShowcaseSection } from './_components/FeatureShowcaseSection';
import { WorkflowJourneySection } from './_components/WorkflowJourneySection';
import { AudienceCardsSection } from './_components/AudienceCardsSection';
import { MwScienceStrip } from './_components/MwScienceStrip';
import { FooterCTA } from './_components/FooterCTA';

interface MWPlannerClientProps {
  product?: SanityProduct | null;
}

export default function MWPlannerClient({ product }: MWPlannerClientProps) {
  return (
    <div className="min-h-screen bg-white text-[#191c1e] antialiased selection:bg-[#062068] selection:text-white font-sans">
      <HeroSection
        badge={product?.heroBadge || undefined}
        title={product?.heroTitle || undefined}
        subtitle={product?.heroSubtitle || undefined}
      />
      <DataPlanningSection />
      <FeatureShowcaseSection />
      <WorkflowJourneySection />
      <AudienceCardsSection />
      <MwScienceStrip />
      <FooterCTA />
    </div>
  );
}
