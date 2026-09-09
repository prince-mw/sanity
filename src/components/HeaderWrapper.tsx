import Header, { SanityMegaMenuData } from "./Header";
import { getMegaMenu, getBlogLanguageGroups, BlogLanguageGroups } from "@/sanity/lib/queries";

// Server Component wrapper for Header that fetches Sanity mega menu data
export default async function HeaderWrapper() {
  let sanityMenuData: SanityMegaMenuData | null = null;
  let blogLanguageGroups: BlogLanguageGroups = {};

  try {
    sanityMenuData = await getMegaMenu();
  } catch (error) {
    console.error("Error fetching mega menu from Sanity:", error);
    // Fall back to default menu data in Header component
  }

  try {
    blogLanguageGroups = await getBlogLanguageGroups();
  } catch (error) {
    console.error("Error fetching blog language groups from Sanity:", error);
    // Language switcher just won't redirect to a translated sibling for any blog post
  }

  return <Header sanityMenuData={sanityMenuData} blogLanguageGroups={blogLanguageGroups} />;
}
