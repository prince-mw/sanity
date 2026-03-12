import { Metadata } from 'next'
import { getActiveJobPositions, transformJobPosition } from '@/sanity/lib/fetch'
import CareersPageClient, { JobPosition } from '@/components/CareersPageClient'

export const metadata: Metadata = {
  title: 'Careers | Moving Walls',
  description: 'Join MovingWalls and help revolutionize the advertising industry. Explore open positions and build your career with us.',
  openGraph: {
    title: 'Careers at Moving Walls',
    description: 'Join our team and shape the future of advertising technology.',
    type: 'website',
  },
}

export const revalidate = 300

const fallbackJobs: JobPosition[] = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    description: "Build scalable advertising technology platforms using modern web technologies. Lead architecture decisions and mentor junior developers.",
    requirements: ["5+ years full-stack development", "React/Node.js expertise", "Cloud platforms (AWS/GCP)", "Agile methodologies"],
    level: "Senior"
  },
  {
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "New York, NY / Hybrid",
    type: "Full-time",
    description: "Drive go-to-market strategy for our advertising platform products. Work closely with sales and product teams to position our solutions.",
    requirements: ["3+ years product marketing", "B2B SaaS experience", "Campaign management", "Strong analytical skills"],
    level: "Mid-Level"
  },
  {
    title: "Data Scientist",
    department: "Data & Analytics",
    location: "Austin, TX / Remote",
    type: "Full-time",
    description: "Develop machine learning models for audience targeting and campaign optimization. Analyze large datasets to drive product insights.",
    requirements: ["PhD/MS in relevant field", "Python/R proficiency", "ML/AI frameworks", "Statistical modeling"],
    level: "Senior"
  },
  {
    title: "Account Executive",
    department: "Sales",
    location: "Chicago, IL / Hybrid",
    type: "Full-time",
    description: "Manage enterprise client relationships and drive new business growth. Develop strategic partnerships with major brands and agencies.",
    requirements: ["3+ years B2B sales", "Advertising industry knowledge", "CRM proficiency", "Strong communication"],
    level: "Mid-Level"
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "Los Angeles, CA / Remote",
    type: "Full-time",
    description: "Design intuitive user experiences for our advertising platform. Create design systems and conduct user research.",
    requirements: ["4+ years UX/UI design", "Figma/Sketch expertise", "Design systems", "User research methods"],
    level: "Mid-Level"
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Seattle, WA / Remote",
    type: "Full-time",
    description: "Manage cloud infrastructure and deployment pipelines. Ensure platform scalability and security best practices.",
    requirements: ["4+ years DevOps experience", "Kubernetes/Docker", "CI/CD pipelines", "Security practices"],
    level: "Senior"
  }
]

export default async function CareersPage() {
  let jobs: JobPosition[] = fallbackJobs
  
  try {
    const sanityJobs = await getActiveJobPositions()
    
    if (sanityJobs && sanityJobs.length > 0) {
      jobs = sanityJobs.map(job => {
        const transformed = transformJobPosition(job)
        return {
          title: transformed.title,
          department: transformed.department || 'General',
          location: transformed.location || 'Remote',
          type: transformed.type || 'Full-time',
          description: transformed.description,
          requirements: transformed.requirements || [],
          level: transformed.level || 'Mid-Level',
          responsibilities: transformed.responsibilities || [],
          benefits: transformed.benefits || [],
          salaryRange: transformed.salaryRange,
          applyLink: transformed.applyLink
        }
      })
    }
  } catch (error) {
    console.error('Error fetching jobs from Sanity:', error)
  }
  
  return <CareersPageClient jobs={jobs} />
}
