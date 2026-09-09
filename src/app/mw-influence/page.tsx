import { getProductBySlug } from "@/sanity/lib/fetch";
import MWInfluenceClient from "./MWInfluenceClient";

export const revalidate = 30;

export default async function MWInfluenceServerPage() {
  const product = await getProductBySlug('mw-influence');

  return <MWInfluenceClient product={product} />;
}
