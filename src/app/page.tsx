import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import AsianBornGlobal from "../components/AsianBornGlobal";
import Services from "../components/Services";
import Clients from "../components/Clients";
import TestimonialSection from "../components/TestimonialSection";

// Lazy-load below-fold client components to reduce initial bundle size and TBT
const PlatformEcosystem = dynamic(() => import("../components/PlatformEcosystem"));
const CustomerLogos = dynamic(() => import("../components/CustomerLogos"));
const About = dynamic(() => import("../components/About"));
const Newsletter = dynamic(() => import("../components/Newsletter"));
const CaseStudiesSection = dynamic(() => import("../components/CaseStudiesSection"));
const ContactForm = dynamic(() => import("../components/ContactForm"));
import { getPageSeo, getSanityImageUrl, getAllCaseStudies, SanityCaseStudy, getTrustBarContent, getContactZohoForm } from "@/sanity/lib/fetch";

const defaultMeta = {
  title: "Moving Walls - Connected Media Platform for OOH Advertising",
  description: "Transform your advertising with Moving Walls' AI-powered OOH platform. Access 2.8B+ screens, real-time analytics, and programmatic buying across 30+ countries. Book a demo today.",
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('home');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
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
  // Fetch case studies server-side
  let caseStudies: SanityCaseStudy[] = [];
  try {
    const data = await getAllCaseStudies();
    caseStudies = data?.slice(0, 4) || [];
  } catch (error) {
    console.error("Error fetching case studies:", error);
  }

  // Fetch trust bar stats
  const trustBarContent = await getTrustBarContent();

  // Fetch contact form from CMS
  const contactForm = await getContactZohoForm();

  return (
    <>
      <Hero />
      <TrustBar stats={trustBarContent?.stats} />
      <AsianBornGlobal />
      <Services />
      {/* <Clients /> */}
      <PlatformEcosystem />
      <CustomerLogos />
      <TestimonialSection />
      {/* <About /> */}
      <Newsletter />
      <CaseStudiesSection initialCaseStudies={caseStudies} />
      <ContactForm
        zohoFormUrl={contactForm?.formUrl}
        zohoFormHeight={contactForm?.height}
      />
    </>
  );
}
