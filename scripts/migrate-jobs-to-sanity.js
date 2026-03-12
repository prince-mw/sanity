// Migration script for job positions to Sanity
// Run with: node scripts/migrate-jobs-to-sanity.js

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
})

const jobPositions = [
  {
    title: "Senior Software Engineer",
    department: "engineering",
    location: "San Francisco, CA / Remote",
    type: "full-time",
    description: "Build scalable advertising technology platforms using modern web technologies. Lead architecture decisions and mentor junior developers.",
    requirements: ["5+ years full-stack development", "React/Node.js expertise", "Cloud platforms (AWS/GCP)", "Agile methodologies"],
    level: "senior"
  },
  {
    title: "Product Marketing Manager",
    department: "marketing",
    location: "New York, NY / Hybrid",
    type: "full-time",
    description: "Drive go-to-market strategy for our advertising platform products. Work closely with sales and product teams to position our solutions.",
    requirements: ["3+ years product marketing", "B2B SaaS experience", "Campaign management", "Strong analytical skills"],
    level: "mid"
  },
  {
    title: "Data Scientist",
    department: "data-analytics",
    location: "Austin, TX / Remote",
    type: "full-time",
    description: "Develop machine learning models for audience targeting and campaign optimization. Analyze large datasets to drive product insights.",
    requirements: ["PhD/MS in relevant field", "Python/R proficiency", "ML/AI frameworks", "Statistical modeling"],
    level: "senior"
  },
  {
    title: "Account Executive",
    department: "sales",
    location: "Chicago, IL / Hybrid",
    type: "full-time",
    description: "Manage enterprise client relationships and drive new business growth. Develop strategic partnerships with major brands and agencies.",
    requirements: ["3+ years B2B sales", "Advertising industry knowledge", "CRM proficiency", "Strong communication"],
    level: "mid"
  },
  {
    title: "UX/UI Designer",
    department: "design",
    location: "Los Angeles, CA / Remote",
    type: "full-time",
    description: "Design intuitive user experiences for our advertising platform. Create design systems and conduct user research.",
    requirements: ["4+ years UX/UI design", "Figma/Sketch expertise", "Design systems", "User research methods"],
    level: "mid"
  },
  {
    title: "DevOps Engineer",
    department: "engineering",
    location: "Seattle, WA / Remote",
    type: "full-time",
    description: "Manage cloud infrastructure and deployment pipelines. Ensure platform scalability and security best practices.",
    requirements: ["4+ years DevOps experience", "Kubernetes/Docker", "CI/CD pipelines", "Security practices"],
    level: "senior"
  }
]

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function migrateJobs() {
  console.log('Starting job positions migration...')
  console.log(`Found ${jobPositions.length} positions to migrate`)

  let successCount = 0
  let errorCount = 0

  for (const job of jobPositions) {
    try {
      const slug = createSlug(job.title)
      
      const existing = await client.fetch(
        `*[_type == "jobPosition" && slug.current == $slug][0]`,
        { slug }
      )

      const doc = {
        _type: 'jobPosition',
        title: job.title,
        slug: { _type: 'slug', current: slug },
        department: job.department,
        location: job.location,
        type: job.type,
        description: job.description,
        requirements: job.requirements,
        level: job.level,
        isActive: true,
        publishedAt: new Date().toISOString(),
      }

      if (existing) {
        await client.patch(existing._id).set(doc).commit()
        console.log(`✓ Updated: ${job.title}`)
      } else {
        await client.create(doc)
        console.log(`✓ Created: ${job.title}`)
      }

      successCount++
    } catch (error) {
      console.error(`✗ Error migrating "${job.title}":`, error.message)
      errorCount++
    }
  }

  console.log('\n--- Migration Complete ---')
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)
}

migrateJobs().catch(console.error)
