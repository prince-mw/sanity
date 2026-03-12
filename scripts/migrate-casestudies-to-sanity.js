/**
 * Migration Script: Case Studies to Sanity
 * 
 * This script migrates existing case studies from case-studies.json to Sanity CMS.
 * 
 * Usage: node scripts/migrate-casestudies-to-sanity.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Sanity client configuration
const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

// Load case studies from JSON
const jsonFilePath = path.join(__dirname, 'case-studies.json');
if (!fs.existsSync(jsonFilePath)) {
  console.error('case-studies.json not found. Run: node scripts/convert-casestudies-to-json.js first');
  process.exit(1);
}

const caseStudies = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
console.log(`Loaded ${caseStudies.length} case studies from JSON`);

// Convert HTML content to Sanity block content (simplified)
function htmlToBlockContent(html) {
  if (!html) return [];
  
  const cleanText = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return [];

  return [{
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style: 'normal',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: Math.random().toString(36).substring(7),
      text: cleanText.substring(0, 50000),
      marks: []
    }]
  }];
}

// Map industry to Sanity values
function mapIndustry(industry) {
  const industryMap = {
    'Automotive': 'automotive',
    'FMCG': 'fmcg',
    'Finance': 'finance',
    'Other': 'other',
    'Retail': 'retail',
    'Technology': 'technology',
    'Telecommunications': 'technology',
    'Tourism': 'travel'
  };
  return industryMap[industry] || 'other';
}

async function migrateCaseStudy(study, index) {
  const slug = study.slug;
  
  try {
    const existing = await client.fetch(
      `*[_type == "caseStudy" && slug.current == $slug][0]`,
      { slug }
    );

    if (existing) {
      console.log(`  [${index + 1}/${caseStudies.length}] ⏭ Skipped: ${study.title.substring(0, 40)}...`);
      return { skipped: true };
    }

    // Extract excerpt from content
    let excerpt = '';
    if (study.content) {
      const cleanContent = study.content.replace(/<[^>]*>/g, '').substring(0, 300);
      excerpt = cleanContent + (cleanContent.length >= 300 ? '...' : '');
    }

    const doc = {
      _type: 'caseStudy',
      title: study.title,
      slug: { _type: 'slug', current: slug },
      client: study.brand || 'Client',
      industry: mapIndustry(study.industry),
      location: study.country || 'Global',
      publishedAt: study.date ? new Date(study.date).toISOString() : new Date().toISOString(),
      excerpt: excerpt,
      challenge: study.challenge ? htmlToBlockContent(study.challenge) : htmlToBlockContent(study.content),
      solution: study.solution ? htmlToBlockContent(study.solution) : [],
      results: study.results ? htmlToBlockContent(study.results) : [],
    };

    await client.create(doc);
    console.log(`  [${index + 1}/${caseStudies.length}] ✓ Migrated: ${study.title.substring(0, 40)}...`);
    return { migrated: true };
  } catch (error) {
    console.error(`  [${index + 1}/${caseStudies.length}] ✗ Error: ${study.title.substring(0, 40)}...`, error.message);
    return { error: true };
  }
}

async function migrate() {
  console.log('='.repeat(60));
  console.log('Case Studies Migration to Sanity');
  console.log('='.repeat(60));

  try {
    console.log('\nMigrating case studies...');
    
    let migrated = 0;
    let skipped = 0;
    let errors = 0;

    for (let i = 0; i < caseStudies.length; i++) {
      const result = await migrateCaseStudy(caseStudies[i], i);
      if (result.migrated) migrated++;
      if (result.skipped) skipped++;
      if (result.error) errors++;
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n' + '='.repeat(60));
    console.log('Migration Complete!');
    console.log('='.repeat(60));
    console.log(`Total Case Studies: ${caseStudies.length}`);
    console.log(`✓ Migrated: ${migrated}`);
    console.log(`⏭ Skipped: ${skipped}`);
    console.log(`✗ Errors: ${errors}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
