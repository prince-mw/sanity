// Migration script for team members to Sanity
// Run with: node scripts/migrate-team-to-sanity.js

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
})

// Leadership team data - Sample data for the Leadership page
const teamMembersData = [
  {
    name: "Srikanth Ramachandran",
    role: "Founder & Group CEO",
    department: "executive",
    bio: "Srikanth is the visionary founder of Moving Walls with over 20 years of experience in advertising technology. He has been instrumental in transforming out-of-home advertising through data-driven solutions.",
    linkedin: "https://www.linkedin.com/in/srikanthramachandran/",
    isLeadership: true,
    order: 1,
  },
  {
    name: "Natasha Rawlings",
    role: "Chief Revenue Officer",
    department: "executive",
    bio: "Natasha leads global revenue strategy with deep expertise in digital advertising and enterprise sales. She has driven significant growth across APAC and European markets.",
    linkedin: "https://www.linkedin.com/",
    isLeadership: true,
    order: 2,
  },
  {
    name: "Gautam Bhirani",
    role: "Co-Founder & CEO, Moving Walls India",
    department: "executive",
    bio: "Gautam co-founded Moving Walls and leads Indian operations. His expertise in media planning and technology has been pivotal in building the company's presence in one of the world's fastest-growing markets.",
    linkedin: "https://www.linkedin.com/",
    isLeadership: true,
    order: 3,
  },
  {
    name: "Dr. Ahmad Nazri",
    role: "Chief Technology Officer",
    department: "technology",
    bio: "Dr. Ahmad oversees all technology initiatives and R&D. He brings a wealth of experience in AI/ML, ad-tech platforms, and scalable cloud architectures.",
    linkedin: "https://www.linkedin.com/",
    isLeadership: true,
    order: 4,
  },
  {
    name: "Michelle Tan",
    role: "Chief Marketing Officer",
    department: "marketing",
    bio: "Michelle leads global marketing strategy and brand development. She has extensive experience in building tech brands and driving demand generation at scale.",
    linkedin: "https://www.linkedin.com/",
    isLeadership: true,
    order: 5,
  },
  {
    name: "James Wilson",
    role: "Chief Financial Officer",
    department: "finance",
    bio: "James oversees financial strategy, operations, and investor relations. He brings expertise from leading roles at major technology companies.",
    linkedin: "https://www.linkedin.com/",
    isLeadership: true,
    order: 6,
  },
  {
    name: "Priya Sharma",
    role: "VP of Product",
    department: "product",
    bio: "Priya leads product strategy and roadmap development. She has a track record of building award-winning ad-tech products that solve real advertiser challenges.",
    linkedin: "https://www.linkedin.com/",
    isLeadership: true,
    order: 7,
  },
  {
    name: "Daniel Lee",
    role: "VP of Engineering",
    department: "technology",
    bio: "Daniel leads engineering teams across multiple offices. He specializes in building high-performance, scalable systems for programmatic advertising.",
    linkedin: "https://www.linkedin.com/",
    isLeadership: true,
    order: 8,
  },
]

// Helper to create slug
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Main migration function
async function migrateTeamMembers() {
  console.log('Starting team members migration...')
  console.log(`Found ${teamMembersData.length} team members to migrate`)

  let successCount = 0
  let errorCount = 0

  for (const member of teamMembersData) {
    try {
      const slug = createSlug(member.name)
      
      // Check if member already exists
      const existing = await client.fetch(
        `*[_type == "teamMember" && slug.current == $slug][0]`,
        { slug }
      )

      const doc = {
        _type: 'teamMember',
        name: member.name,
        slug: { _type: 'slug', current: slug },
        role: member.role,
        department: member.department,
        bio: member.bio,
        linkedin: member.linkedin,
        isLeadership: member.isLeadership,
        order: member.order,
      }

      if (existing) {
        // Update existing document
        await client.patch(existing._id).set(doc).commit()
        console.log(`✓ Updated: ${member.name}`)
      } else {
        // Create new document
        await client.create(doc)
        console.log(`✓ Created: ${member.name}`)
      }

      successCount++
    } catch (error) {
      console.error(`✗ Error migrating "${member.name}":`, error.message)
      errorCount++
    }
  }

  console.log('\n--- Migration Complete ---')
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)
}

migrateTeamMembers().catch(console.error)
