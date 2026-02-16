import { Metadata } from "next";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import AsianBornGlobal from "../components/AsianBornGlobal";
import Services from "../components/Services";
import Clients from "../components/Clients";
import PlatformEcosystem from "../components/PlatformEcosystem";
import Products from "../components/Products";
import CustomerLogos from "../components/CustomerLogos";
import TestimonialSection from "../components/TestimonialSection";
import About from "../components/About";
import Newsletter from "../components/Newsletter";
import CaseStudiesSection from "../components/CaseStudiesSection";
import ContactForm from "../components/ContactForm";
import Sustainability from "../components/Sustainability";

export const metadata: Metadata = {
  title: "Moving Walls - Connected Media Platform for OOH Advertising",
  description: "Transform your advertising with Moving Walls' AI-powered OOH platform. Access 2.8B+ screens, real-time analytics, and programmatic buying across 30+ countries. Book a demo today.",
  alternates: {
    canonical: "https://www.movingwalls.com",
  },
  openGraph: {
    title: "Moving Walls - Connected Media Platform for OOH Advertising",
    description: "Transform your advertising with AI-powered OOH media planning, programmatic buying, and real-time measurement across 2.8B+ screens worldwide.",
    url: "https://www.movingwalls.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AsianBornGlobal />
      <Services />
      <Clients />
      <PlatformEcosystem />
      <Products />
      <CustomerLogos />
      <TestimonialSection />
      {/* <About /> */}
      <Sustainability />
      <Newsletter />
      <CaseStudiesSection />
      <ContactForm />
    </>
  );
}
