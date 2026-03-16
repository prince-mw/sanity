import { Metadata } from "next";
import { getAllCaseStudies, transformCaseStudy, getPageSeo, getSanityImageUrl } from "@/sanity/lib/fetch";
import { caseStudies as staticCaseStudies, caseStudyCountries, caseStudyIndustries } from "@/data/case-studies";
import CaseStudiesListClient from "@/components/CaseStudiesListClient";

const defaultMeta = {
  title: "Case Studies | Moving Walls",
  description: "Discover how brands across industries leverage Moving Walls to transform their out-of-home advertising campaigns with measurable results.",
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('case-studies');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || "Real-world success stories from brands using Moving Walls platform.",
      type: "website",
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 60;

export default async function CaseStudiesPage() {
  let caseStudies;

  try {
    const sanityCaseStudies = await getAllCaseStudies();
    
    if (sanityCaseStudies && sanityCaseStudies.length > 0) {
      caseStudies = sanityCaseStudies.map(transformCaseStudy);
    } else {
      caseStudies = staticCaseStudies;
    }
  } catch (error) {
    console.error("Error fetching from Sanity, using static data:", error);
    caseStudies = staticCaseStudies;
  }

  return (
    <CaseStudiesListClient 
      caseStudies={caseStudies} 
      countries={caseStudyCountries}
      industries={caseStudyIndustries}
    />
  );
}
