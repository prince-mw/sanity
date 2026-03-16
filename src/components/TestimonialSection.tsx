import { getFeaturedTestimonials } from "@/sanity/lib/queries";
import TestimonialSectionClient from "./TestimonialSectionClient";

export default async function TestimonialSection() {
  // Fetch testimonials from Sanity
  const testimonials = await getFeaturedTestimonials();
  
  return <TestimonialSectionClient testimonials={testimonials} />;
}
