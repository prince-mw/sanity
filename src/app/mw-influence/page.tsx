import { getAllCaseStudies, SanityCaseStudy } from "@/sanity/lib/fetch";
import MWInfluencePage from "./MWInfluenceClient";

export const revalidate = 60;

export default async function MWInfluenceServerPage() {
  let caseStudies: SanityCaseStudy[] = [];
  try {
    const data = await getAllCaseStudies();
    caseStudies = data?.slice(0, 4) || [];
  } catch (error) {
    console.error("Error fetching case studies:", error);
  }

  return <MWInfluencePage caseStudies={caseStudies} />;
}
