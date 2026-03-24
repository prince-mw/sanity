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

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Convert a Sanity image reference to a CDN URL
function sanityImageUrl(ref: string): string {
  // ref format: image-{hash}-{widthxheight}-{format}
  const parts = ref.replace(/^image-/, '').split('-');
  const format = parts.pop();
  const dimensions = parts.pop();
  const id = parts.join('-');
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}?w=1200&q=85&auto=format`;
}

// Check if a value is a Sanity image object and resolve it to a URL string
function resolveImageValue(value: unknown): string | unknown {
  if (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    (value as any)._type === 'image' &&
    (value as any).asset?._ref
  ) {
    return sanityImageUrl((value as any).asset._ref);
  }
  return value;
}

// Resolve all Sanity image references in a section's props to CDN URLs
function resolveSectionImages(section: Record<string, any>): Record<string, any> {
  const resolved: Record<string, any> = {};

  for (const [key, value] of Object.entries(section)) {
    if (key === '_type' || key === '_key') {
      resolved[key] = value;
      continue;
    }

    // Direct image field (e.g., image, backgroundImage)
    const resolvedValue = resolveImageValue(value);
    if (resolvedValue !== value) {
      resolved[key] = resolvedValue;
      continue;
    }

    // Array of items that may contain image fields (e.g., images[], logos[], items[])
    if (Array.isArray(value)) {
      resolved[key] = value.map((item) => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          const resolvedItem: Record<string, any> = {};
          for (const [itemKey, itemValue] of Object.entries(item)) {
            const resolvedItemValue = resolveImageValue(itemValue);
            resolvedItem[itemKey] = resolvedItemValue !== itemValue ? resolvedItemValue : itemValue;
          }
          return resolvedItem;
        }
        return item;
      });
      continue;
    }

    resolved[key] = value;
  }

  return resolved;
}

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

        const resolved = resolveSectionImages(section);
        return <Component key={section._key} {...resolved} />;
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
