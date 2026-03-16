"use client";

import { HeroSection } from './HeroSection';
import { TextBlockSection } from './TextBlockSection';
import { TwoColumnSection } from './TwoColumnSection';
import { FeatureGridSection } from './FeatureGridSection';
import { StatsSection } from './StatsSection';
import { LogoCarouselSection } from './LogoCarouselSection';
import { VideoEmbedSection } from './VideoEmbedSection';
import { ImageGallerySection } from './ImageGallerySection';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';
import { CTABannerSection } from './CTABannerSection';
import { PricingSection } from './PricingSection';
import { ContactFormSection } from './ContactFormSection';
import { SpacerSection } from './SpacerSection';
import { CustomEmbedSection } from './CustomEmbedSection';

// Section type mapping
const sectionComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  textBlock: TextBlockSection,
  twoColumn: TwoColumnSection,
  featureGrid: FeatureGridSection,
  stats: StatsSection,
  logoCarousel: LogoCarouselSection,
  videoEmbed: VideoEmbedSection,
  imageGallery: ImageGallerySection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
  ctaBanner: CTABannerSection,
  pricing: PricingSection,
  contactForm: ContactFormSection,
  spacer: SpacerSection,
  customEmbed: CustomEmbedSection,
};

interface Section {
  _type: string;
  _key: string;
  [key: string]: any;
}

interface LandingPageRendererProps {
  sections: Section[];
}

export function LandingPageRenderer({ sections }: LandingPageRendererProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className="landing-page">
      {sections.map((section) => {
        const Component = sectionComponents[section._type];
        
        if (!Component) {
          console.warn(`Unknown section type: ${section._type}`);
          return null;
        }

        return <Component key={section._key} {...section} />;
      })}
    </div>
  );
}

// Export all section components
export {
  HeroSection,
  TextBlockSection,
  TwoColumnSection,
  FeatureGridSection,
  StatsSection,
  LogoCarouselSection,
  VideoEmbedSection,
  ImageGallerySection,
  TestimonialsSection,
  FAQSection,
  CTABannerSection,
  PricingSection,
  ContactFormSection,
  SpacerSection,
  CustomEmbedSection,
};
