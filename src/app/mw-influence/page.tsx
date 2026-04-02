import { getAllCaseStudies, SanityCaseStudy, getProductBySlug } from "@/sanity/lib/fetch";
import MWInfluencePage from "./MWInfluenceClient";
import { getPartnerIntegrationLogosList } from '@/data/default-integrations'

export const revalidate = 60;

export default async function MWInfluenceServerPage() {
  let caseStudies: SanityCaseStudy[] = [];
  try {
    const data = await getAllCaseStudies();
    caseStudies = data?.slice(0, 4) || [];
  } catch (error) {
    console.error("Error fetching case studies:", error);
  }

  const [product, partnerLogos] = await Promise.all([
    getProductBySlug('mw-influence'),
    getPartnerIntegrationLogosList(),
  ]);

  return <MWInfluencePage caseStudies={caseStudies} product={product} partnerLogos={partnerLogos} />;
}
