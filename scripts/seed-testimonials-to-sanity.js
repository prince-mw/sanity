/**
 * Migration script to seed testimonials into Sanity CMS
 * 
 * Run with: node scripts/seed-testimonials-to-sanity.js
 */

const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

// Testimonials data from translations
const testimonials = [
  {
    _id: 'testimonial-jeki-ryoji-akaishi',
    _type: 'testimonial',
    quote: "By customising Moving Walls' platform, Jeki adds new services using its transport advertising expertise. We aim to build one of Japan's largest marketplaces with nationwide, diverse OOH inventory.",
    author: 'Ryoji Akaishi',
    role: 'President and Representative Director',
    company: 'jeki',
    metric: "Japan's Largest OOH Marketplace",
    industry: 'media-owner',
    order: 1,
    isFeatured: true,
    isPublished: true,
    status: 'published',
  },
  {
    _id: 'testimonial-fc-media-saad-bencharef',
    _type: 'testimonial',
    quote: 'This partnership provides us with cutting-edge audience measurement solutions that bring unprecedented insights to our advertising campaigns.',
    author: 'Saad Bencharef',
    role: 'Director of Data and Digital Transformation',
    company: 'FC Media',
    metric: 'Cutting-edge Measurement',
    industry: 'media',
    order: 2,
    isFeatured: true,
    isPublished: true,
    status: 'published',
  },
  {
    _id: 'testimonial-groupm-yasmin-mallari',
    _type: 'testimonial',
    quote: 'Brand investments grow when advertisers have clarity on ad placements and performance. This partnership strengthens our DOOH planning and expands measurement capabilities for our clients.',
    author: 'Yasmin Mallari',
    role: 'Chief Investment Officer',
    company: 'GroupM, Philippines',
    metric: 'Enhanced DOOH Planning',
    industry: 'agency',
    order: 3,
    isFeatured: true,
    isPublished: true,
    status: 'published',
  },
];

async function seedTestimonials() {
  console.log('🚀 Starting testimonials migration to Sanity...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const testimonial of testimonials) {
    try {
      // Check if testimonial already exists
      const existing = await client.fetch(
        `*[_type == "testimonial" && _id == $id][0]`,
        { id: testimonial._id }
      );

      if (existing) {
        console.log(`⏭️  Updating existing testimonial: ${testimonial.author}`);
        await client
          .patch(testimonial._id)
          .set(testimonial)
          .commit();
      } else {
        console.log(`➕ Creating testimonial: ${testimonial.author}`);
        await client.createOrReplace(testimonial);
      }

      successCount++;
      console.log(`   ✅ Success: ${testimonial.author} - ${testimonial.company}\n`);
    } catch (error) {
      errorCount++;
      console.error(`   ❌ Error for ${testimonial.author}: ${error.message}\n`);
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total: ${testimonials.length}`);
  
  if (errorCount === 0) {
    console.log('\n🎉 All testimonials migrated successfully!');
  }
}

// Run migration
seedTestimonials().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
