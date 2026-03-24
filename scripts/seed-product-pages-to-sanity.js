/**
 * Migration script to seed/update Product page hero content into Sanity CMS
 * This creates or updates the 6 product documents with CMS-editable hero content.
 * 
 * Run with: node scripts/seed-product-pages-to-sanity.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

const products = [
  {
    _type: 'product',
    slug: { _type: 'slug', current: 'mw-planner' },
    name: 'MW Planner',
    tagline: 'AI-Powered Campaign Intelligence',
    description: 'The AI command center that predicts performance, optimizes budgets, and delivers measurable ROI—before you spend a dollar.',
    heroBadge: 'AI-Powered Campaign Intelligence',
    heroTitle: 'Turn Data Into',
    heroSubtitle: 'Campaign Success',
    heroGradient: 'from-slate-900 via-blue-900 to-indigo-900',
    ctaText: 'Start Free Trial',
    ctaLink: '/contact',
    category: 'planning',
    isPublished: true,
    order: 1,
  },
  {
    _type: 'product',
    slug: { _type: 'slug', current: 'mw-activate' },
    name: 'MW Activate',
    tagline: 'Complete DSP for DOOH & Retail Media',
    description: 'Launch and optimize campaigns instantly with AI-powered automation that delivers',
    heroTitle: 'MW Activate',
    heroSubtitle: 'A Complete Demand-Side Platform for DOOH and In-Store Retail Media Advertising',
    heroGradient: 'from-blue-600 to-blue-700',
    ctaText: 'Book Demo',
    ctaLink: '/contact',
    category: 'activation',
    isPublished: true,
    order: 2,
  },
  {
    _type: 'product',
    slug: { _type: 'slug', current: 'mw-influence' },
    name: 'MW Influence',
    tagline: 'DOOH Ad Server for Revenue',
    description: 'Stop settling for loop-based scheduling and estimated delivery. MW Influence is the intelligent control plane that unifies your inventory management, campaign execution, and yield optimization into one revenue-maximizing engine.',
    heroTitle: 'The DOOH Ad Server Built for Revenue, Not Just Reliability',
    heroSubtitle: 'Future-Proof Your Network with Composable, API-First Ad Technology',
    heroGradient: 'from-slate-900 via-blue-900 to-slate-900',
    ctaText: 'Request a Demo',
    ctaLink: '/contact',
    category: 'ad-serving',
    isPublished: true,
    order: 3,
  },
  {
    _type: 'product',
    slug: { _type: 'slug', current: 'mw-market' },
    name: 'MW Market',
    tagline: 'Global OOH Billboard Marketplace',
    description: 'Classic & Digital Billboards Available Worldwide',
    heroTitle: 'MW Market',
    heroSubtitle: 'Global OOH Billboard Market',
    heroGradient: 'from-blue-900 via-blue-800 to-indigo-900',
    ctaText: 'Explore Market',
    ctaLink: '/contact',
    category: 'marketplace',
    isPublished: true,
    order: 4,
  },
  {
    _type: 'product',
    slug: { _type: 'slug', current: 'mw-measure' },
    name: 'MW Measure',
    tagline: 'OOH Analytics Dashboard',
    description: 'Transform Out-of-Home advertising with real-time location intelligence,',
    heroTitle: 'MW Measure',
    heroSubtitle: 'OOH Analytics Dashboard',
    heroGradient: 'from-blue-900 via-blue-800 to-indigo-900',
    ctaText: 'Get Started',
    ctaLink: '/contact',
    category: 'measurement',
    isPublished: true,
    order: 5,
  },
  {
    _type: 'product',
    slug: { _type: 'slug', current: 'mw-science' },
    name: 'MW Science',
    tagline: 'AI-Powered Audience Intelligence',
    description: 'Transform data into strategic advantage with machine learning models that deliver',
    heroTitle: 'MW Science',
    heroSubtitle: 'AI-Powered Audience Intelligence',
    heroGradient: 'from-blue-900 via-blue-800 to-indigo-900',
    ctaText: 'Learn More',
    ctaLink: '/contact',
    category: 'data-science',
    isPublished: true,
    order: 6,
  },
];

async function seedProducts() {
  console.log('Seeding product page content...');
  
  for (const product of products) {
    const slug = product.slug.current;
    
    try {
      // Check if product already exists
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]`,
        { slug }
      );
      
      if (existing) {
        // Merge: only update fields that don't already exist in CMS
        const updates = {};
        const fieldsToUpdate = [
          'heroBadge', 'heroTitle', 'heroSubtitle', 'heroGradient',
          'ctaText', 'ctaLink', 'description',
        ];
        
        for (const field of fieldsToUpdate) {
          if (!existing[field] && product[field]) {
            updates[field] = product[field];
          }
        }
        
        if (Object.keys(updates).length > 0) {
          await client.patch(existing._id).set(updates).commit();
          console.log(`✅ Updated ${slug}: added ${Object.keys(updates).join(', ')}`);
        } else {
          console.log(`⏭️  ${slug}: already has all hero fields, skipping`);
        }
      } else {
        // Create new product document
        const result = await client.create(product);
        console.log(`✅ Created ${slug}: ${result._id}`);
      }
    } catch (error) {
      console.error(`❌ Error with ${slug}:`, error.message);
    }
  }
  
  console.log('\nDone! Product pages seeded.');
}

seedProducts();
