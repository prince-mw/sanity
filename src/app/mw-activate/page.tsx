import { getAllCaseStudies, SanityCaseStudy, getProductBySlug } from "@/sanity/lib/fetch";
import MWActivate from "./MWActivateClient";

export const revalidate = 60;

export default async function MWActivatePage() {
  let caseStudies: SanityCaseStudy[] = [];
  try {
    const data = await getAllCaseStudies();
    caseStudies = data?.slice(0, 4) || [];
  } catch (error) {
    console.error("Error fetching case studies:", error);
  }

  const product = await getProductBySlug('mw-activate');

  return <MWActivate caseStudies={caseStudies} product={product} />;
}
