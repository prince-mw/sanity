/**
 * WordPress XML Blog Import Script
 * 
 * This script:
 * 1. Parses WordPress XML export file
 * 2. Deletes all existing blog posts from Sanity
 * 3. Migrates new blog posts to Sanity with proper formatting
 * 4. Generates static TypeScript data file
 * 
 * Usage: node scripts/import-wordpress-blogs.js <path-to-xml-file>
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

// Category mapping
const categoryMap = {};

// ============== XML PARSING ==============

function parseWordPressXML(xmlContent) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xmlContent)) !== null) {
    const itemXml = match[1];
    
    // Check if it's a blog post
    const postTypeMatch = itemXml.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
    const postType = postTypeMatch ? postTypeMatch[1] : '';
    
    if (postType !== 'post') continue;
    
    // Check if published
    const statusMatch = itemXml.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/);
    const status = statusMatch ? statusMatch[1] : '';
    
    if (status !== 'publish') continue;
    
    // Extract fields
    const title = extractCDATA(itemXml, 'title') || '';
    const pubDate = extractTag(itemXml, 'pubDate') || '';
    const creator = extractCDATA(itemXml, 'dc:creator') || 'Moving Walls Team';
    const content = extractCDATA(itemXml, 'content:encoded') || '';
    const excerpt = extractCDATA(itemXml, 'excerpt:encoded') || '';
    const postName = extractCDATA(itemXml, 'wp:post_name') || '';
    
    // Extract SEO meta (Yoast)
    let seoTitle = '';
    let seoDescription = '';
    const metaRegex = /<wp:postmeta>([\s\S]*?)<\/wp:postmeta>/g;
    let metaMatch;
    while ((metaMatch = metaRegex.exec(itemXml)) !== null) {
      const metaKey = extractCDATA(metaMatch[1], 'wp:meta_key');
      const metaValue = extractCDATA(metaMatch[1], 'wp:meta_value');
      if (metaKey === '_yoast_wpseo_title') seoTitle = metaValue || '';
      if (metaKey === '_yoast_wpseo_metadesc') seoDescription = metaValue || '';
    }
    
    // Extract categories
    const categories = [];
    const categoryRegex = /<category domain="category"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g;
    let catMatch;
    while ((catMatch = categoryRegex.exec(itemXml)) !== null) {
      categories.push(catMatch[1]);
    }
    
    // Extract tags
    const tags = [];
    const tagRegex = /<category domain="post_tag"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g;
    let tagMatch;
    while ((tagMatch = tagRegex.exec(itemXml)) !== null) {
      tags.push(tagMatch[1]);
    }
    
    // Extract featured image from content
    const imageMatch = content.match(/src="(https?:\/\/[^"]+\.(jpg|jpeg|png|gif|webp))"/i);
    const featuredImage = imageMatch ? imageMatch[1] : '';
    
    // Clean content
    const cleanedContent = cleanWordPressContent(content);
    const cleanedExcerpt = cleanWordPressContent(excerpt) || generateExcerpt(cleanedContent);
    
    // Generate slug
    const slug = postName || generateSlug(title);
    
    items.push({
      slug,
      title: decodeHTMLEntities(title),
      excerpt: cleanedExcerpt,
      content: cleanedContent,
      htmlContent: content, // Keep original for Sanity conversion
      category: mapCategory(categories[0] || 'Industry Trends'),
      author: creator,
      date: formatDate(pubDate),
      readTime: calculateReadTime(cleanedContent),
      featuredImage: featuredImage || getDefaultImage(mapCategory(categories[0])),
      tags: tags.length > 0 ? tags : ['OOH', 'DOOH'],
      seoTitle: seoTitle || '',
      seoDescription: seoDescription || '',
    });
  }
  
  return items;
}

function extractCDATA(xml, tag) {
  // Handle both CDATA and regular content
  const cdataRegex = new RegExp(`<${tag.replace(':', '\\:')}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag.replace(':', '\\:')}>`);
  const match = xml.match(cdataRegex);
  if (match) return match[1];
  
  // Try without CDATA
  const plainRegex = new RegExp(`<${tag.replace(':', '\\:')}>([^<]*)<\\/${tag.replace(':', '\\:')}>`);
  const plainMatch = xml.match(plainRegex);
  return plainMatch ? plainMatch[1] : null;
}

function extractTag(xml, tag) {
  const regex = new RegExp(`<${tag}>([^<]*)<\\/${tag}>`);
  const match = xml.match(regex);
  return match ? match[1] : null;
}

function cleanWordPressContent(content) {
  if (!content) return '';
  
  // Remove WordPress block comments
  let cleaned = content
    .replace(/<!-- wp:[^>]+ -->/g, '')
    .replace(/<!-- \/wp:[^>]+ -->/g, '')
    .replace(/<!-- wp:[^>]+ \{[^}]*\} -->/g, '')
    .replace(/<!-- wp:[^>]+ \{"[^"]*":"[^"]*"[^}]*\} -->/g, '');
  
  // Clean up figure/image blocks
  cleaned = cleaned
    .replace(/<figure[^>]*class="wp-block-image[^"]*"[^>]*>/g, '<figure>')
    .replace(/<figure[^>]*>/g, '<figure>')
    .replace(/<\/figure>/g, '</figure>');
  
  // Remove inline styles
  cleaned = cleaned.replace(/ style="[^"]*"/g, '');
  
  // Clean up extra whitespace
  cleaned = cleaned
    .replace(/\n\s*\n/g, '\n')
    .replace(/^\s+|\s+$/g, '')
    .trim();
  
  return cleaned;
}

function decodeHTMLEntities(text) {
  if (!text) return '';
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#39;/g, "'")
    .replace(/&#038;/g, '&');
}

function generateExcerpt(content, maxLength = 200) {
  const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
}

function calculateReadTime(content) {
  const text = content.replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function mapCategory(wpCategory) {
  const mapping = {
    'Uncategorized': 'Industry Trends',
    'Blog': 'Industry Trends',
    'News': 'Industry Trends',
    'Case Study': 'Case Studies',
    'Case Studies': 'Case Studies',
    'Technology': 'Technology',
    'Programmatic': 'Programmatic DOOH',
    'Programmatic DOOH': 'Programmatic DOOH',
    'Measurement': 'Measurement',
    'Analytics': 'Measurement',
    'Media Owners': 'Media Owners',
    'Best Practices': 'Best Practices',
    'Tips': 'Best Practices',
  };
  return mapping[wpCategory] || 'Industry Trends';
}

function getDefaultImage(category) {
  const images = {
    'Industry Trends': 'https://stg.movingwalls.com/wp-content/uploads/2024/01/industry-trends.webp',
    'Case Studies': 'https://stg.movingwalls.com/wp-content/uploads/2024/01/case-studies.webp',
    'Technology': 'https://stg.movingwalls.com/wp-content/uploads/2024/01/technology.webp',
    'Programmatic DOOH': 'https://stg.movingwalls.com/wp-content/uploads/2024/01/programmatic.webp',
    'Measurement': 'https://stg.movingwalls.com/wp-content/uploads/2024/01/measurement.webp',
    'Media Owners': 'https://stg.movingwalls.com/wp-content/uploads/2024/01/media-owners.webp',
    'Best Practices': 'https://stg.movingwalls.com/wp-content/uploads/2024/01/best-practices.webp',
  };
  return images[category] || images['Industry Trends'];
}

// ============== SANITY MIGRATION ==============

function generateKey() {
  return Math.random().toString(36).substring(2, 10);
}

// Convert HTML to Sanity Portable Text
function htmlToPortableText(html) {
  if (!html) return [];
  
  const blocks = [];
  
  // Clean up the HTML first
  let cleanHtml = html
    .replace(/<!-- wp:[^>]+ -->/g, '')
    .replace(/<!-- \/wp:[^>]+ -->/g, '')
    .replace(/<!-- wp:[^>]+ \{[^}]*\} -->/g, '');
  
  // Split by block-level elements
  const blockRegex = /<(p|h[1-6]|ul|ol|blockquote|figure)[^>]*>([\s\S]*?)<\/\1>/gi;
  let lastIndex = 0;
  let match;
  
  while ((match = blockRegex.exec(cleanHtml)) !== null) {
    const tag = match[1].toLowerCase();
    const content = match[2];
    
    if (tag === 'figure') {
      // Skip images in content - they are complex to handle with Sanity references
      // Featured image is already captured separately
      continue;
    } else if (tag === 'ul' || tag === 'ol') {
      // Handle lists
      const listItems = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
      listItems.forEach(li => {
        const itemContent = li.replace(/<\/?li[^>]*>/gi, '');
        const { children, markDefs } = parseInlineContent(itemContent);
        
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          listItem: tag === 'ul' ? 'bullet' : 'number',
          level: 1,
          markDefs,
          children: children.length > 0 ? children : [{
            _type: 'span',
            _key: generateKey(),
            text: decodeHTMLEntities(itemContent.replace(/<[^>]+>/g, '')),
            marks: []
          }]
        });
      });
    } else {
      // Handle paragraphs and headings
      let style = 'normal';
      if (tag.match(/^h[1-6]$/)) {
        style = tag;
      } else if (tag === 'blockquote') {
        style = 'blockquote';
      }
      
      const { children, markDefs } = parseInlineContent(content);
      
      if (children.length > 0 || content.trim()) {
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style,
          markDefs,
          children: children.length > 0 ? children : [{
            _type: 'span',
            _key: generateKey(),
            text: decodeHTMLEntities(content.replace(/<[^>]+>/g, '')),
            marks: []
          }]
        });
      }
    }
  }
  
  // If no blocks found, create a simple text block
  if (blocks.length === 0 && cleanHtml.trim()) {
    blocks.push({
      _type: 'block',
      _key: generateKey(),
      style: 'normal',
      markDefs: [],
      children: [{
        _type: 'span',
        _key: generateKey(),
        text: decodeHTMLEntities(cleanHtml.replace(/<[^>]+>/g, '')).substring(0, 50000),
        marks: []
      }]
    });
  }
  
  return blocks;
}

function parseInlineContent(html) {
  const children = [];
  const markDefs = [];
  
  // Normalize whitespace
  html = html.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Simple regex-based parsing for inline elements
  let remaining = html;
  let safetyCounter = 0;
  const maxIterations = 1000;
  
  while (remaining.length > 0 && safetyCounter < maxIterations) {
    safetyCounter++;
    
    // Find the next tag
    const nextTag = remaining.match(/^(.*?)<(strong|b|em|i|a|br)[\s>]/i);
    
    if (!nextTag) {
      // No more tags, add remaining text
      if (remaining.trim()) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: decodeHTMLEntities(remaining.replace(/<[^>]+>/g, '')),
          marks: []
        });
      }
      break;
    }
    
    // Add text before the tag
    if (nextTag[1].trim()) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: decodeHTMLEntities(nextTag[1]),
        marks: []
      });
    }
    
    remaining = remaining.substring(nextTag[1].length);
    
    // Process the tag
    const tag = nextTag[2].toLowerCase();
    
    if (tag === 'br') {
      const brMatch = remaining.match(/^<br\s*\/?>/i);
      if (brMatch) {
        remaining = remaining.substring(brMatch[0].length);
      }
      continue;
    }
    
    if (tag === 'strong' || tag === 'b') {
      const strongMatch = remaining.match(/^<(?:strong|b)>([\s\S]*?)<\/(?:strong|b)>/i);
      if (strongMatch) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: decodeHTMLEntities(strongMatch[1].replace(/<[^>]+>/g, '')),
          marks: ['strong']
        });
        remaining = remaining.substring(strongMatch[0].length);
        continue;
      }
    }
    
    if (tag === 'em' || tag === 'i') {
      const emMatch = remaining.match(/^<(?:em|i)>([\s\S]*?)<\/(?:em|i)>/i);
      if (emMatch) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: decodeHTMLEntities(emMatch[1].replace(/<[^>]+>/g, '')),
          marks: ['em']
        });
        remaining = remaining.substring(emMatch[0].length);
        continue;
      }
    }
    
    if (tag === 'a') {
      const linkMatch = remaining.match(/^<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
      if (linkMatch) {
        const linkKey = generateKey();
        markDefs.push({
          _type: 'link',
          _key: linkKey,
          href: linkMatch[1]
        });
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: decodeHTMLEntities(linkMatch[2].replace(/<[^>]+>/g, '')),
          marks: [linkKey]
        });
        remaining = remaining.substring(linkMatch[0].length);
        continue;
      }
    }
    
    // Skip unmatched tag
    const skipTag = remaining.match(/^<[^>]+>/);
    if (skipTag) {
      remaining = remaining.substring(skipTag[0].length);
    } else {
      remaining = remaining.substring(1);
    }
  }
  
  return { children, markDefs };
}

async function createCategories(posts) {
  const uniqueCategories = [...new Set(posts.map(p => p.category))];
  
  console.log('\n📁 Creating/updating categories...');
  
  for (const categoryName of uniqueCategories) {
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

async function deleteExistingBlogPosts() {
  console.log('\n🗑️  Deleting existing blog posts...');
  
  try {
    const existingPosts = await client.fetch(`*[_type == "blogPost"]._id`);
    console.log(`  Found ${existingPosts.length} existing posts to delete`);
    
    if (existingPosts.length > 0) {
      // Delete in batches
      const batchSize = 50;
      for (let i = 0; i < existingPosts.length; i += batchSize) {
        const batch = existingPosts.slice(i, i + batchSize);
        const transaction = client.transaction();
        batch.forEach(id => transaction.delete(id));
        await transaction.commit();
        console.log(`  Deleted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(existingPosts.length / batchSize)}`);
      }
    }
    
    console.log('  ✓ All existing blog posts deleted');
  } catch (error) {
    console.error('  ✗ Error deleting posts:', error.message);
    throw error;
  }
}

async function migrateBlogPosts(posts) {
  console.log(`\n📝 Migrating ${posts.length} blog posts to Sanity...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    
    try {
      // Convert HTML content to Portable Text
      const portableTextContent = htmlToPortableText(post.htmlContent || post.content);
      
      // Build the document
      const doc = {
        _type: 'blogPost',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        excerpt: post.excerpt,
        content: portableTextContent,
        publishedAt: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
        categories: post.category && categoryMap[post.category] ? [{
          _type: 'reference',
          _ref: categoryMap[post.category],
          _key: generateKey()
        }] : [],
      };
      
      // Add SEO if available
      if (post.seoTitle || post.seoDescription) {
        doc.seo = {
          metaTitle: post.seoTitle || post.title,
          metaDescription: post.seoDescription || post.excerpt,
        };
      }
      
      await client.create(doc);
      successCount++;
      console.log(`  ✓ [${i + 1}/${posts.length}] ${post.title.substring(0, 50)}...`);
      
      // Small delay to avoid rate limiting
      if (i % 10 === 0 && i > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      errorCount++;
      console.error(`  ✗ [${i + 1}/${posts.length}] Error: ${post.title.substring(0, 30)}... - ${error.message}`);
    }
  }
  
  console.log(`\n📊 Migration complete: ${successCount} success, ${errorCount} errors`);
}

function generateStaticDataFile(posts) {
  console.log('\n📄 Generating static TypeScript data file...');
  
  const tsContent = `// Auto-generated blog posts data - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}
// Source: WordPress XML import

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featuredImage: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = ${JSON.stringify(posts.map(p => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  content: p.content,
  category: p.category,
  author: p.author,
  date: p.date,
  readTime: p.readTime,
  featuredImage: p.featuredImage,
  tags: p.tags,
})), null, 2)};

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return blogPosts.slice(0, limit);
  
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === currentPost.category)
    .slice(0, limit);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map(post => post.category))];
}
`;
  
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'blog-posts.ts');
  fs.writeFileSync(outputPath, tsContent, 'utf-8');
  console.log(`  ✓ Generated: ${outputPath}`);
  
  // Also save JSON for scripts
  const jsonPath = path.join(__dirname, 'blog-posts.json');
  fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`  ✓ Generated: ${jsonPath}`);
}

// ============== MAIN EXECUTION ==============

async function main() {
  const xmlFilePath = process.argv[2];
  
  if (!xmlFilePath) {
    console.error('Usage: node scripts/import-wordpress-blogs.js <path-to-xml-file>');
    console.error('Example: node scripts/import-wordpress-blogs.js ~/Downloads/Blog\\ Posts.xml');
    process.exit(1);
  }
  
  const resolvedPath = path.resolve(xmlFilePath);
  
  if (!fs.existsSync(resolvedPath)) {
    console.error(`File not found: ${resolvedPath}`);
    process.exit(1);
  }
  
  console.log('🚀 WordPress Blog Import Script');
  console.log('================================');
  console.log(`📂 Reading: ${resolvedPath}`);
  
  // Parse XML
  const xmlContent = fs.readFileSync(resolvedPath, 'utf-8');
  const posts = parseWordPressXML(xmlContent);
  
  console.log(`\n📚 Found ${posts.length} published blog posts`);
  
  if (posts.length === 0) {
    console.error('No blog posts found in XML file');
    process.exit(1);
  }
  
  // Show preview
  console.log('\n📋 First 5 posts:');
  posts.slice(0, 5).forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.title.substring(0, 60)}... (${p.category})`);
  });
  
  // Create categories
  await createCategories(posts);
  
  // Delete existing posts
  await deleteExistingBlogPosts();
  
  // Migrate new posts
  await migrateBlogPosts(posts);
  
  // Generate static files
  generateStaticDataFile(posts);
  
  console.log('\n✅ Import complete!');
  console.log(`   Total posts imported: ${posts.length}`);
  console.log('   Run "npm run dev" to see the changes on your website');
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
