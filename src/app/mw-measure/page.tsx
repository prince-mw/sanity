import { getAllCaseStudies, SanityCaseStudy, getProductBySlug } from "@/sanity/lib/fetch";
import MWMeasure from "./MWMeasureClient";

export const revalidate = 60;

export default async function MWMeasurePage() {
  let caseStudies: SanityCaseStudy[] = [];
  try {
    const data = await getAllCaseStudies();
    caseStudies = data?.slice(0, 4) || [];
  } catch (error) {
    console.error("Error fetching case studies:", error);
  }

  const product = await getProductBySlug('mw-measure');

  return <MWMeasure caseStudies={caseStudies} product={product} />;
}
