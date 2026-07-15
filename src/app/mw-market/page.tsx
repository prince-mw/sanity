import { getAllCaseStudies, SanityCaseStudy, getProductBySlug } from "@/sanity/lib/fetch";
import MWMarketPage from "./MWMarketClient";
import { getPartnerIntegrationLogosList } from '@/data/default-integrations'
import { getFeaturedTestimonials } from '@/sanity/lib/queries'

export const revalidate = 30;

export default async function MWMarketServerPage() {
  const [product, partnerLogos, testimonials] = await Promise.all([
    getProductBySlug('mw-market'),
    getPartnerIntegrationLogosList(),
    getFeaturedTestimonials(),
  ]);

  // Use CMS-selected case studies if the editor has picked any; otherwise fall back to latest 4
  let caseStudies: SanityCaseStudy[] = [];
  if (product?.relatedCaseStudies?.length) {
    caseStudies = product.relatedCaseStudies as SanityCaseStudy[];
  } else {
    try {
      const data = await getAllCaseStudies();
      caseStudies = data?.slice(0, 4) || [];
    } catch (error) {
      console.error("Error fetching case studies:", error);
    }
  }

  return <MWMarketPage caseStudies={caseStudies} product={product} partnerLogos={partnerLogos} testimonials={testimonials} />;
}
