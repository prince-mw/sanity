import { Metadata } from "next";
import { getAllCaseStudies, transformCaseStudy } from "@/sanity/lib/fetch";
import { caseStudies as staticCaseStudies, caseStudyCountries, caseStudyIndustries } from "@/data/case-studies";
import CaseStudiesListClient from "@/components/CaseStudiesListClient";

export const metadata: Metadata = {
  title: "Case Studies | Moving Walls",
  description: "Discover how brands across industries leverage Moving Walls to transform their out-of-home advertising campaigns with measurable results.",
  openGraph: {
    title: "Case Studies | Moving Walls",
    description: "Real-world success stories from brands using Moving Walls platform.",
    type: "website",
  },
};

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
