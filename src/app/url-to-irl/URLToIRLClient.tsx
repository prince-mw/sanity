'use client';

import React from 'react';
import { HeroSection } from './_components/HeroSection';
import { SectionNav } from './_components/SectionNav';
import { NadiaDaySection } from './_components/NadiaDaySection';
import { MoneySection } from './_components/MoneySection';
import { TurnSection } from './_components/TurnSection';
import { DifferenceSection } from './_components/DifferenceSection';
import { SystemSection } from './_components/SystemSection';
import { ProofSection } from './_components/ProofSection';
import { KnowledgeBaseSection } from './_components/KnowledgeBaseSection';
import { ModelsSection } from './_components/ModelsSection';
import { WhyUsSection } from './_components/WhyUsSection';
import { BriefSection } from './_components/BriefSection';
import { QuizSection } from './_components/QuizSection';

export default function URLToIRLClient() {
  return (
    <div className="min-h-screen bg-white text-[#1b1b20] antialiased selection:bg-[#0f1d4a] selection:text-white font-sans">
      <HeroSection />
      <SectionNav />
      <NadiaDaySection />
      <MoneySection />
      <TurnSection />
      <DifferenceSection />
      <SystemSection />
      <ProofSection />
      <KnowledgeBaseSection />
      <ModelsSection />
      <WhyUsSection />
      <BriefSection />
      <QuizSection />
    </div>
  );
}
