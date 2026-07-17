import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getJobPositionBySlug, getJobPositionSlugs, getRelatedJobs, transformJobPosition, getSanityImageUrl } from "@/sanity/lib/fetch";
import JobDetailClient from "@/components/JobDetailClient";

export const revalidate = 30;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Fallback job data for when Sanity doesn't have the job
const fallbackJobs: Record<string, {
  title: string
  slug: string
  department: string
  location: string
  type: string
  level: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
}> = {
  'senior-software-engineer': {
    title: "Senior Software Engineer",
    slug: "senior-software-engineer",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    level: "Senior",
    description: "Build scalable advertising technology platforms using modern web technologies. Lead architecture decisions and mentor junior developers.",
    requirements: ["5+ years full-stack development", "React/Node.js expertise", "Cloud platforms (AWS/GCP)", "Agile methodologies"],
    responsibilities: ["Design and implement scalable backend services", "Lead technical architecture decisions", "Mentor junior developers", "Collaborate with product team on feature development"],
    benefits: ["Competitive salary", "Remote work flexibility", "Health insurance", "Learning budget"]
  },
  'product-marketing-manager': {
    title: "Product Marketing Manager",
    slug: "product-marketing-manager",
    department: "Marketing",
    location: "New York, NY / Hybrid",
    type: "Full-time",
    level: "Mid-Level",
    description: "Drive go-to-market strategy for our advertising platform products. Work closely with sales and product teams to position our solutions.",
    requirements: ["3+ years product marketing", "B2B SaaS experience", "Campaign management", "Strong analytical skills"],
    responsibilities: ["Develop product positioning and messaging", "Create marketing collateral", "Support sales enablement", "Analyze market trends"],
    benefits: ["Competitive salary", "Hybrid work model", "Health insurance", "Professional development"]
  },
  'data-scientist': {
    title: "Data Scientist",
    slug: "data-scientist",
    department: "Data & Analytics",
    location: "Austin, TX / Remote",
    type: "Full-time",
    level: "Senior",
    description: "Develop machine learning models for audience targeting and campaign optimization. Analyze large datasets to drive product insights.",
    requirements: ["PhD/MS in relevant field", "Python/R proficiency", "ML/AI frameworks", "Statistical modeling"],
    responsibilities: ["Build ML models for audience targeting", "Analyze campaign performance data", "Develop data pipelines", "Present insights to stakeholders"],
    benefits: ["Competitive salary", "Remote work", "Health insurance", "Conference attendance"]
  },
  'account-executive': {
    title: "Account Executive",
    slug: "account-executive",
    department: "Sales",
    location: "Chicago, IL / Hybrid",
    type: "Full-time",
    level: "Mid-Level",
    description: "Manage enterprise client relationships and drive new business growth. Develop strategic partnerships with major brands and agencies.",
    requirements: ["3+ years B2B sales", "Advertising industry knowledge", "CRM proficiency", "Strong communication"],
    responsibilities: ["Manage client relationships", "Drive new business opportunities", "Negotiate contracts", "Achieve sales targets"],
    benefits: ["Base + commission", "Hybrid work", "Health insurance", "Sales incentives"]
  },
  'ux-ui-designer': {
    title: "UX/UI Designer",
    slug: "ux-ui-designer",
    department: "Design",
    location: "Los Angeles, CA / Remote",
    type: "Full-time",
    level: "Mid-Level",
    description: "Design intuitive user experiences for our advertising platform. Create design systems and conduct user research.",
    requirements: ["4+ years UX/UI design", "Figma/Sketch expertise", "Design systems", "User research methods"],
    responsibilities: ["Design user interfaces", "Create design systems", "Conduct user research", "Collaborate with engineers"],
    benefits: ["Competitive salary", "Remote work", "Health insurance", "Creative freedom"]
  },
  'devops-engineer': {
    title: "DevOps Engineer",
    slug: "devops-engineer",
    department: "Engineering",
    location: "Seattle, WA / Remote",
    type: "Full-time",
    level: "Senior",
    description: "Manage cloud infrastructure and deployment pipelines. Ensure platform scalability and security best practices.",
    requirements: ["4+ years DevOps experience", "Kubernetes/Docker", "CI/CD pipelines", "Security practices"],
    responsibilities: ["Manage cloud infrastructure", "Build CI/CD pipelines", "Monitor system health", "Implement security practices"],
    benefits: ["Competitive salary", "Remote work", "Health insurance", "Learning budget"]
  }
}

export async function generateStaticParams() {
  try {
    const jobs = await getJobPositionSlugs();
    const sanityParams = jobs.map((job) => ({
      slug: job.slug || '',
    }));
    
    // Also include fallback job slugs
    const fallbackParams = Object.keys(fallbackJobs).map(slug => ({ slug }));
    
    return [...sanityParams, ...fallbackParams];
  } catch {
    // Return fallback slugs if Sanity fails
    return Object.keys(fallbackJobs).map(slug => ({ slug }));
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
    
    // Check for fallback job if Sanity doesn't have it
    const fallbackJob = fallbackJobs[slug];
    if (fallbackJob) {
      return {
        title: `${fallbackJob.title} | Careers at Moving Walls`,
        description: `Join Moving Walls as a ${fallbackJob.title}. ${fallbackJob.location} position.`,
        openGraph: {
          title: `${fallbackJob.title} | Careers at Moving Walls`,
          description: fallbackJob.description,
          type: 'website',
        },
        alternates: {
          canonical: `https://www.movingwalls.com/careers/${slug}`,
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
    
    // Still try fallback on error
    const fallbackJob = fallbackJobs[slug];
    if (fallbackJob) {
      return {
        title: `${fallbackJob.title} | Careers at Moving Walls`,
        description: fallbackJob.description,
      };
    }
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
    
    if (job && job.isActive) {
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
    }
    
    // Check for fallback job
    const fallbackJob = fallbackJobs[slug];
    if (fallbackJob) {
      // Get related jobs from fallback data (same department)
      const relatedFallbackJobs = Object.values(fallbackJobs)
        .filter(j => j.slug !== slug && j.department === fallbackJob.department)
        .slice(0, 3);
      
      return (
        <JobDetailClient 
          job={{
            ...fallbackJob,
            fullDescription: null,
          }}
          relatedJobs={relatedFallbackJobs}
        />
      );
    }
    
    notFound();
  } catch (error) {
    console.error("Error fetching job:", error);
    
    // Try fallback on error
    const fallbackJob = fallbackJobs[slug];
    if (fallbackJob) {
      return (
        <JobDetailClient 
          job={{
            ...fallbackJob,
            fullDescription: null,
          }}
          relatedJobs={[]}
        />
      );
    }
    
    notFound();
  }
}
