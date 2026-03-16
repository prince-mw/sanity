import Header, { SanityMegaMenuData } from "./Header";
import { getMegaMenu } from "@/sanity/lib/queries";

// Server Component wrapper for Header that fetches Sanity mega menu data
export default async function HeaderWrapper() {
  let sanityMenuData: SanityMegaMenuData | null = null;
  
  try {
    sanityMenuData = await getMegaMenu();
  } catch (error) {
    console.error("Error fetching mega menu from Sanity:", error);
    // Fall back to default menu data in Header component
  }
  
  return <Header sanityMenuData={sanityMenuData} />;
}
