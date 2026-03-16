/**
 * Migration Script: Set Publishing Workflow Fields
 * 
 * This script sets isPublished=true and status='published' for all existing content
 * that doesn't have these fields set yet.
 * 
 * Usage: node scripts/migrate-publishing-workflow.js
 */

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
})

// Content types to migrate
const CONTENT_TYPES = [
  'blogPost',
  'caseStudy',
  'pressRelease',
  'event',
  'webinar',
  'ebook',
  'whitepaper',
  'teamMember',
  'product',
]

async function migrateContentType(type) {
  console.log(`\n📦 Migrating ${type}...`)
  
  // Fetch all documents of this type that don't have publishing fields set
  const query = `*[_type == "${type}" && (isPublished == null || status == null)]`
  const documents = await client.fetch(query)
  
  if (documents.length === 0) {
    console.log(`  ✓ No ${type} documents need migration`)
    return 0
  }
  
  console.log(`  Found ${documents.length} documents to migrate`)
  
  let migratedCount = 0
  
  for (const doc of documents) {
    try {
      await client
        .patch(doc._id)
        .set({
          isPublished: true,
          status: 'published',
        })
        .commit()
      
      migratedCount++
      process.stdout.write(`  Migrated ${migratedCount}/${documents.length}\r`)
    } catch (error) {
      console.error(`\n  ✗ Failed to migrate ${doc._id}: ${error.message}`)
    }
  }
  
  console.log(`\n  ✓ Successfully migrated ${migratedCount}/${documents.length} ${type} documents`)
  return migratedCount
}

async function main() {
  console.log('===========================================')
  console.log('Publishing Workflow Migration Script')
  console.log('===========================================')
  console.log('\nThis script will set isPublished=true and status="published"')
  console.log('for all existing content that doesn\'t have these fields set.\n')
  
  let totalMigrated = 0
  
  for (const type of CONTENT_TYPES) {
    const migrated = await migrateContentType(type)
    totalMigrated += migrated
  }
  
  console.log('\n===========================================')
  console.log(`✓ Migration complete! Total documents migrated: ${totalMigrated}`)
  console.log('===========================================\n')
  
  console.log('All existing content now has:')
  console.log('  - isPublished: true')
  console.log('  - status: "published"')
  console.log('\nYou can now use the Sanity Studio to:')
  console.log('  - Toggle isPublished to hide/show content')
  console.log('  - Set status to "archived" to archive content')
  console.log('  - Set status to "draft" for work-in-progress content')
}

main().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
