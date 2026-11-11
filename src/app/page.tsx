import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import AsianBornGlobal from "../components/AsianBornGlobal";
import Services from "../components/Services";
import Clients from "../components/Clients";
import TestimonialSection from "../components/TestimonialSection";
import { ProposalPromo } from "../components/proposal/ProposalPromo";
import { MockupPromo } from "../components/proposal/MockupPromo";
import { promoEnabled } from "@/lib/proposal/promo";

// Lazy-load below-fold client components to reduce initial bundle size and TBT
const PlatformEcosystem = dynamic(() => import("../components/PlatformEcosystem"));
const CustomerLogos = dynamic(() => import("../components/CustomerLogos"));
const About = dynamic(() => import("../components/About"));
const Newsletter = dynamic(() => import("../components/Newsletter"));
const CaseStudiesSection = dynamic(() => import("../components/CaseStudiesSection"));
const ContactForm = dynamic(() => import("../components/ContactForm"));
import { getPageSeo, getSanityImageUrl, getAllCaseStudies, SanityCaseStudy, getTrustBarContent, getContactZohoForm, getClientPartnersContent, getAllPartnerPages } from "@/sanity/lib/fetch";

import { getRequestLocale } from "@/i18n/serverLocale";
import ja from "../../messages/ja.json";
import ko from "../../messages/ko.json";
import id from "../../messages/id.json";
import zh from "../../messages/zh.json";
import es from "../../messages/es.json";
import pt from "../../messages/pt.json";

export const revalidate = 3600;

// Tab title/description for visitors browsing in another language. Crawlers and link previews
// send no language, so they always get the English SEO text from Sanity.
const translatedMeta: Record<string, { homeTitle: string; homeDescription: string }> = {
  ja: ja.metadata, ko: ko.metadata, id: id.metadata, zh: zh.metadata, es: es.metadata, pt: pt.metadata,
};

const defaultMeta = {
  title: "Moving Walls - Connected Media Platform for OOH Advertising",
  description: "Transform your advertising with Moving Walls' AI-powered OOH platform. Access 2.8B+ screens, real-time analytics, and programmatic buying across 30+ countries. Book a demo today.",
};

export async function generateMetadata(): Promise<Metadata> {
  const [pageSeo, locale] = await Promise.all([getPageSeo('home'), getRequestLocale()]);
  const seo = pageSeo?.seo;
  const translated = translatedMeta[locale];

  return {
    title: translated?.homeTitle || seo?.metaTitle || defaultMeta.title,
    description: translated?.homeDescription || seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    alternates: {
      canonical: "https://www.movingwalls.com",
    },
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || defaultMeta.description,
      url: "https://www.movingwalls.com",
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function Home() {
  const [caseStudiesData, trustBarContent, contactForm, clientPartnersContent, partnerPages] = await Promise.all([
    getAllCaseStudies().catch(() => null),
    getTrustBarContent(),
    getContactZohoForm(),
    getClientPartnersContent(),
    getAllPartnerPages(),
  ]);

  const caseStudies: SanityCaseStudy[] = caseStudiesData?.slice(0, 4) || [];

  return (
    <>
      <Hero />
      <TrustBar stats={trustBarContent?.stats} />
      {promoEnabled() && <ProposalPromo variant="home" />}
      {promoEnabled() && <MockupPromo variant="home" />}
      <AsianBornGlobal />
      <Services />
      <PlatformEcosystem />
      <CustomerLogos />
      <Clients
        partners={clientPartnersContent?.partners}
        sectionTitle={clientPartnersContent?.sectionTitle}
        sectionTitleTranslations={clientPartnersContent?.sectionTitleTranslations}
        sectionDescription={clientPartnersContent?.sectionDescription}
        sectionDescriptionTranslations={clientPartnersContent?.sectionDescriptionTranslations}
        partnerPages={partnerPages.map((p) => ({ name: p.name, slug: p.slug }))}
      />
      <TestimonialSection />
      {/* <About /> */}
      <Newsletter />
      <CaseStudiesSection initialCaseStudies={caseStudies} />
      <ContactForm
        zohoFormUrl={contactForm?.formUrl}
      />
    </>
  );
}
