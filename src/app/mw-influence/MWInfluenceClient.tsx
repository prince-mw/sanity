'use client';

import React from 'react';
import type { SanityProduct } from '@/sanity/lib/fetch';
import { HeroSection } from './_components/HeroSection';
import { ValuePropositionSection } from './_components/ValuePropositionSection';
import { FeatureShowcase } from './_components/FeatureShowcase';
import { StackIntegrationSection } from './_components/StackIntegrationSection';
import { MwScienceStrip } from './_components/MwScienceStrip';
import { FooterCTA } from './_components/FooterCTA';

interface MWInfluenceClientProps {
  product?: SanityProduct | null;
}

export default function MWInfluenceClient({ product }: MWInfluenceClientProps) {
  return (
    <div className="min-h-screen bg-white text-[#1b1b20] antialiased selection:bg-[#0f1d4a] selection:text-white font-sans">
      <HeroSection
        badge={product?.heroBadge || undefined}
        title={product?.heroTitle || undefined}
        subtitle={product?.heroSubtitle || undefined}
      />
      <ValuePropositionSection />
      <FeatureShowcase />
      <StackIntegrationSection />
      <MwScienceStrip />
      <FooterCTA />
    </div>
  );
}
