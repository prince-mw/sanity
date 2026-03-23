import { getAllCaseStudies, SanityCaseStudy } from "@/sanity/lib/fetch";
import MWScience from "./MWScienceClient";

export const revalidate = 60;

export default async function MWSciencePage() {
  let caseStudies: SanityCaseStudy[] = [];
  try {
    const data = await getAllCaseStudies();
    caseStudies = data?.slice(0, 4) || [];
  } catch (error) {
    console.error("Error fetching case studies:", error);
  }

  return <MWScience caseStudies={caseStudies} />;
}
