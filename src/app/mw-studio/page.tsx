import { getAllCaseStudies, SanityCaseStudy, getProductBySlug } from "@/sanity/lib/fetch"
import MWStudio from "./MWStudioClient"

export const revalidate = 60

export default async function MWStudioPage() {
  let caseStudies: SanityCaseStudy[] = []
  try {
    const data = await getAllCaseStudies()
    caseStudies = data?.slice(0, 4) || []
  } catch (error) {
    console.error("Error fetching case studies:", error)
  }

  const product = await getProductBySlug('mw-studio').catch(() => null)

  return <MWStudio caseStudies={caseStudies} product={product} />
}
