/**
 * Migration Script: Blog Posts to Sanity
 * 
 * This script migrates existing blog posts from blog-posts.json to Sanity CMS.
 * 
 * Usage: node scripts/migrate-blogs-to-sanity.js
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

// Load blog posts from JSON
const jsonFilePath = path.join(__dirname, 'blog-posts.json');
if (!fs.existsSync(jsonFilePath)) {
  console.error('blog-posts.json not found. Run: node scripts/convert-blogs-to-json.js first');
  process.exit(1);
}

const blogPosts = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
console.log(`Loaded ${blogPosts.length} blog posts from JSON`);

// Map category names to Sanity category references
const categoryMap = {};

// Convert HTML content to Sanity block content (simplified - stores as single text block)
function htmlToBlockContent(html) {
  if (!html) return [];
  
  // Clean HTML to plain text (for basic migration)
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
      text: cleanText.substring(0, 50000), // Limit text size
      marks: []
    }]
  }];
}

async function createCategories() {
  const categories = [
    "Industry Trends",
    "Best Practices",
    "Technology",
    "Case Studies",
    "Programmatic DOOH",
    "Measurement",
    "Media Owners"
  ];

  console.log('\nCreating categories...');
  
  for (const categoryName of categories) {
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    try {
      const existing = await client.fetch(
        `*[_type == "category" && slug.current == $slug][0]`,
        { slug }
      );

      if (existing) {
        categoryMap[categoryName] = existing._id;
        console.log(`  ✓ Category exists: ${categoryName}`);
      } else {
        const category = await client.create({
          _type: 'category',
          title: categoryName,
          slug: { _type: 'slug', current: slug }
        });
        categoryMap[categoryName] = category._id;
        console.log(`  + Created category: ${categoryName}`);
      }
    } catch (error) {
      console.error(`  ✗ Error with category ${categoryName}:`, error.message);
    }
  }
}

let defaultAuthorId;

async function createDefaultAuthor() {
  console.log('\nCreating default author...');
  
  try {
    const existing = await client.fetch(
      `*[_type == "author" && slug.current == "movingwalls-team"][0]`
    );

    if (existing) {
      defaultAuthorId = existing._id;
      console.log('  ✓ Author exists: Moving Walls Team');
    } else {
      const author = await client.create({
        _type: 'author',
        name: 'Moving Walls Team',
        slug: { _type: 'slug', current: 'movingwalls-team' },
        role: 'Content Team',
        bio: 'The Moving Walls content team writes about OOH advertising, DOOH technology, and industry trends.'
      });
      defaultAuthorId = author._id;
      console.log('  + Created author: Moving Walls Team');
    }
  } catch (error) {
    console.error('  ✗ Error with author:', error.message);
  }
}

async function migrateBlogPost(post, index) {
  const slug = post.slug;
  
  try {
    const existing = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]`,
      { slug }
    );

    if (existing) {
      console.log(`  [${index + 1}/${blogPosts.length}] ⏭ Skipped: ${post.title.substring(0, 40)}...`);
      return { skipped: true };
    }

    const doc = {
      _type: 'blogPost',
      title: post.title,
      slug: { _type: 'slug', current: slug },
      excerpt: post.excerpt || '',
      content: htmlToBlockContent(post.content),
      publishedAt: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
      author: defaultAuthorId ? { _type: 'reference', _ref: defaultAuthorId } : undefined,
      categories: post.category && categoryMap[post.category] 
        ? [{ _type: 'reference', _ref: categoryMap[post.category], _key: Math.random().toString(36).substring(7) }]
        : [],
      seoTitle: post.title,
      seoDescription: post.excerpt || '',
    };

    await client.create(doc);
    console.log(`  [${index + 1}/${blogPosts.length}] ✓ Migrated: ${post.title.substring(0, 40)}...`);
    return { migrated: true };
  } catch (error) {
    console.error(`  [${index + 1}/${blogPosts.length}] ✗ Error: ${post.title.substring(0, 40)}...`, error.message);
    return { error: true };
  }
}

async function migrate() {
  console.log('='.repeat(60));
  console.log('Blog Posts Migration to Sanity');
  console.log('='.repeat(60));

  try {
    await createCategories();
    await createDefaultAuthor();

    console.log('\nMigrating blog posts...');
    
    let migrated = 0;
    let skipped = 0;
    let errors = 0;

    for (let i = 0; i < blogPosts.length; i++) {
      const result = await migrateBlogPost(blogPosts[i], i);
      if (result.migrated) migrated++;
      if (result.skipped) skipped++;
      if (result.error) errors++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n' + '='.repeat(60));
    console.log('Migration Complete!');
    console.log('='.repeat(60));
    console.log(`Total Posts: ${blogPosts.length}`);
    console.log(`✓ Migrated: ${migrated}`);
    console.log(`⏭ Skipped: ${skipped}`);
    console.log(`✗ Errors: ${errors}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
