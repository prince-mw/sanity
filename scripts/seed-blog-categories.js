/**
 * Seed Blog Categories to Sanity CMS
 * 
 * This script adds the predefined blog categories to Sanity.
 * Run with: node scripts/seed-blog-categories.js
 */

const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

// Blog categories with colors
const categories = [
  { title: 'Data Driven OOH', color: '#3B82F6' },         // Blue
  { title: 'DOOH', color: '#8B5CF6' },                     // Purple
  { title: 'Driving Success in OOH', color: '#10B981' },   // Green
  { title: 'Events', color: '#F59E0B' },                   // Amber
  { title: 'Future of OOH', color: '#EC4899' },            // Pink
  { title: 'Measuring OOH Effectiveness', color: '#06B6D4' }, // Cyan
  { title: 'Media Owners', color: '#EF4444' },             // Red
  { title: 'Moving Walls Market', color: '#14B8A6' },      // Teal
  { title: 'OOH Insights and Trends', color: '#6366F1' },  // Indigo
  { title: 'OOH Planning', color: '#F97316' },             // Orange
  { title: 'OOH SaaS', color: '#84CC16' },                 // Lime
  { title: 'Technology Transforming OOH', color: '#0EA5E9' }, // Sky
  { title: 'Thought Leadership', color: '#A855F7' },       // Violet
];

// Helper to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function seedCategories() {
  console.log('🚀 Starting category seeding...\n');

  // First, check existing categories
  const existingCategories = await client.fetch(`*[_type == "category"]{ title, slug }`);
  const existingTitles = new Set(existingCategories.map(c => c.title.toLowerCase()));
  
  console.log(`📋 Found ${existingCategories.length} existing categories`);
  
  let created = 0;
  let skipped = 0;

  for (const category of categories) {
    const slug = generateSlug(category.title);
    
    // Check if category already exists (by title)
    if (existingTitles.has(category.title.toLowerCase())) {
      console.log(`⏭️  Skipping existing: ${category.title}`);
      skipped++;
      continue;
    }

    try {
      const doc = {
        _type: 'category',
        title: category.title,
        slug: { _type: 'slug', current: slug },
        color: category.color,
        description: `Articles about ${category.title}`,
      };

      const result = await client.create(doc);
      console.log(`✅ Created: ${category.title} (${result._id})`);
      created++;
    } catch (error) {
      console.error(`❌ Failed to create ${category.title}:`, error.message);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total categories now: ${existingCategories.length + created}`);
  console.log('\n✨ Done!');
}

// Run
seedCategories().catch(console.error);
