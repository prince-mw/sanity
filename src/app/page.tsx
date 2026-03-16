import { Metadata } from "next";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import AsianBornGlobal from "../components/AsianBornGlobal";
import Services from "../components/Services";
import Clients from "../components/Clients";
import PlatformEcosystem from "../components/PlatformEcosystem";
import CustomerLogos from "../components/CustomerLogos";
import TestimonialSection from "../components/TestimonialSection";
import About from "../components/About";
import Newsletter from "../components/Newsletter";
import CaseStudiesSection from "../components/CaseStudiesSection";
import ContactForm from "../components/ContactForm";
import { getPageSeo, getSanityImageUrl } from "@/sanity/lib/fetch";

const defaultMeta = {
  title: "MovingWalls - Connected Media Platform for OOH Advertising",
  description: "Transform your advertising with MovingWalls' AI-powered OOH platform. Access 2.8B+ screens, real-time analytics, and programmatic buying across 30+ countries. Book a demo today.",
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

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AsianBornGlobal />
      <Services />
      {/* <Clients /> */}
      <PlatformEcosystem />
      <CustomerLogos />
      <TestimonialSection />
      {/* <About /> */}
      <Newsletter />
      <CaseStudiesSection />
      <ContactForm />
    </>
  );
}
