import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getJobPositionBySlug, getJobPositionSlugs, getRelatedJobs, transformJobPosition, getSanityImageUrl } from "@/sanity/lib/fetch";
import JobDetailClient from "@/components/JobDetailClient";

export const revalidate = 30;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const jobs = await getJobPositionSlugs();
    return jobs.map((job) => ({
      slug: job.slug || '',
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const job = await getJobPositionBySlug(slug);
    
    if (job) {
      const seo = job.seo;
      const title = seo?.metaTitle || `${job.title} | Careers at Moving Walls`;
      const description = seo?.metaDescription || job.description || `Join Moving Walls as a ${job.title}. ${job.location || 'Remote/Hybrid'} position.`;
      const ogImage = seo?.ogImage 
        ? getSanityImageUrl(seo.ogImage, { width: 1200 })
        : null;
      
      return {
        title,
        description,
        keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
        openGraph: {
          title,
          description,
          type: 'website',
          images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: ogImage ? [ogImage] : [],
        },
        alternates: {
          canonical: `https://www.movingwalls.com/careers/${slug}`,
        },
        robots: seo?.noIndex ? { index: false, follow: false } : undefined,
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
  
  return {
    title: 'Job Position | Moving Walls Careers',
    description: 'Explore career opportunities at Moving Walls.',
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const job = await getJobPositionBySlug(slug);
    
    if (!job || !job.isActive) {
      notFound();
    }
    
    const transformed = transformJobPosition(job);
    const relatedJobs = await getRelatedJobs(slug, job.department, 3);
    
    const transformedRelatedJobs = relatedJobs.map(j => transformJobPosition(j));
    
    return (
      <JobDetailClient 
        job={{
          ...transformed,
          fullDescription: job.fullDescription,
        }}
        relatedJobs={transformedRelatedJobs}
      />
    );
  } catch (error) {
    console.error("Error fetching job:", error);
    notFound();
  }
}
