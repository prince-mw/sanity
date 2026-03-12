import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getAllCaseStudies, transformCaseStudy } from "@/sanity/lib/fetch";
import { caseStudies as staticCaseStudies } from "@/data/case-studies";
import CaseStudyDetailClient from "./CaseStudyDetailClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const caseStudies = await getAllCaseStudies();
    return caseStudies.map((cs) => ({
      slug: cs.slug?.current || '',
    }));
  } catch {
    return staticCaseStudies.map((cs) => ({
      slug: cs.slug,
    }));
  }
}

function getRelatedCaseStudies(currentSlug: string, industry: string, caseStudies: any[], limit: number = 3) {
  return caseStudies
    .filter(cs => cs.slug !== currentSlug && cs.industry === industry)
    .slice(0, limit);
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  
  let caseStudy;
  let relatedCaseStudies = [];

  try {
    const sanityCaseStudy = await getCaseStudyBySlug(slug);
    
    if (sanityCaseStudy) {
      caseStudy = transformCaseStudy(sanityCaseStudy);
      
      // Get related case studies
      const allCaseStudies = await getAllCaseStudies();
      const transformedAll = allCaseStudies.map(transformCaseStudy);
      relatedCaseStudies = getRelatedCaseStudies(slug, caseStudy.industry, transformedAll, 3);
    } else {
      // Fallback to static data
      const staticCaseStudy = staticCaseStudies.find(cs => cs.slug === slug);
      if (staticCaseStudy) {
        caseStudy = staticCaseStudy;
        relatedCaseStudies = getRelatedCaseStudies(slug, staticCaseStudy.industry, staticCaseStudies, 3);
      }
    }
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    // Fallback to static data
    const staticCaseStudy = staticCaseStudies.find(cs => cs.slug === slug);
    if (staticCaseStudy) {
      caseStudy = staticCaseStudy;
      relatedCaseStudies = getRelatedCaseStudies(slug, staticCaseStudy.industry, staticCaseStudies, 3);
    }
  }

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailClient caseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies} />;
}
