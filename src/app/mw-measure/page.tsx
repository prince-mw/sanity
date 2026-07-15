import { getAllCaseStudies, SanityCaseStudy, getProductBySlug } from "@/sanity/lib/fetch";
import MWMeasure from "./MWMeasureClient";
import { getPartnerIntegrationLogosList } from '@/data/default-integrations'

export const revalidate = 30;

export default async function MWMeasurePage() {
  let caseStudies: SanityCaseStudy[] = [];
  try {
    const data = await getAllCaseStudies();
    caseStudies = data?.slice(0, 4) || [];
  } catch (error) {
    console.error("Error fetching case studies:", error);
  }

  const [product, partnerLogos] = await Promise.all([
    getProductBySlug('mw-measure'),
    getPartnerIntegrationLogosList(),
  ]);

  return <MWMeasure caseStudies={caseStudies} product={product} partnerLogos={partnerLogos} />;
}
