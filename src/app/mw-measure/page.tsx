import { getProductBySlug } from "@/sanity/lib/fetch";
import MWMeasureClient from "./MWMeasureClient";

export const revalidate = 30;

export default async function MWMeasureServerPage() {
  const product = await getProductBySlug('mw-measure');

  return <MWMeasureClient product={product} />;
}
