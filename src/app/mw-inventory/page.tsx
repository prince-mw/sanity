import { getProductBySlug } from "@/sanity/lib/fetch";
import MWInventoryClient from "./MWInventoryClient";

export const revalidate = 30;

export default async function MWInventoryServerPage() {
  const product = await getProductBySlug('mw-inventory');

  return <MWInventoryClient product={product} />;
}
