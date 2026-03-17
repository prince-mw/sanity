/**
 * WordPress XML News Import Script - WITH FULL IMAGE MIGRATION
 * 
 * This script:
 * 1. Parses WordPress XML export file for news/press items
 * 2. Downloads and uploads images to Sanity Assets
 * 3. Deletes all existing press releases from Sanity
 * 4. Migrates news items as press releases with proper formatting
 * 
 * Usage: node scripts/import-wordpress-news.js <path-to-xml-file>
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Sanity client configuration
const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

// Image cache to avoid re-uploading the same image
const imageCache = new Map();

// ============== IMAGE HANDLING ==============

/**
 * Download image from URL and return buffer
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, { 
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SanityImporter/1.0)'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadImage(response.headers.location).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    });
    
    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Download timeout'));
    });
  });
}

/**
 * Upload image to Sanity and return asset reference
 */
async function uploadImageToSanity(imageUrl) {
  // Check cache first
  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl);
  }
  
  try {
    // Download the image
    const imageBuffer = await downloadImage(imageUrl);
    
    // Get filename from URL
    const urlParts = imageUrl.split('/');
    let filename = urlParts[urlParts.length - 1].split('?')[0];
    filename = decodeURIComponent(filename);
    
    // Determine content type
    const ext = filename.split('.').pop()?.toLowerCase() || 'jpg';
    const contentTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml'
    };
    const contentType = contentTypes[ext] || 'image/jpeg';
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename,
      contentType
    });
    
    const assetRef = {
      _type: 'reference',
      _ref: asset._id
    };
    
    // Cache the result
    imageCache.set(imageUrl, assetRef);
    
    return assetRef;
  } catch (error) {
    console.error(`    ⚠ Failed to upload image: ${imageUrl.substring(0, 50)}... - ${error.message}`);
    return null;
  }
}

// ============== XML PARSING ==============

function parseWordPressXML(xmlContent) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xmlContent)) !== null) {
    const itemXml = match[1];
    
    // Check if it's a news post type (custom post type 'news' or standard 'post')
    const postTypeMatch = itemXml.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
    const postType = postTypeMatch ? postTypeMatch[1] : '';
    
    if (postType !== 'post' && postType !== 'news') continue;
    
    // Check if published
    const statusMatch = itemXml.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/);
    const status = statusMatch ? statusMatch[1] : '';
    
    if (status !== 'publish') continue;
    
    // Extract fields
    const title = extractCDATA(itemXml, 'title') || '';
    const pubDate = extractTag(itemXml, 'pubDate') || '';
    const content = extractCDATA(itemXml, 'content:encoded') || '';
    const excerpt = extractCDATA(itemXml, 'excerpt:encoded') || '';
    const postName = extractCDATA(itemXml, 'wp:post_name') || '';
    
    // Extract categories to determine news category
    const categories = [];
    const categoryRegex = /<category domain="category"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g;
    let catMatch;
    while ((catMatch = categoryRegex.exec(itemXml)) !== null) {
      categories.push(catMatch[1]);
    }
    
    // Extract ALL images from content
    const contentImages = [];
    const imageRegex = /<img[^>]+src="(https?:\/\/[^"]+\.(jpg|jpeg|png|gif|webp))"/gi;
    let imgMatch;
    while ((imgMatch = imageRegex.exec(content)) !== null) {
      contentImages.push(imgMatch[1]);
    }
    
    // Featured image is the first one
    const featuredImage = contentImages[0] || '';
    
    // Clean content
    const cleanedContent = cleanWordPressContent(content);
    const cleanedExcerpt = cleanWordPressContent(excerpt) || generateExcerpt(cleanedContent);
    
    // Generate slug
    const slug = postName || generateSlug(title);
    
    // Map category to news category
    const newsCategory = mapNewsCategory(categories[0] || '');
    
    items.push({
      slug,
      title: decodeHTMLEntities(title),
      excerpt: cleanedExcerpt,
      content: cleanedContent,
      htmlContent: content, // Keep original for Sanity conversion
      category: newsCategory,
      date: formatDate(pubDate),
      readTime: calculateReadTime(cleanedContent),
      featuredImage: featuredImage,
      contentImages: contentImages,
    });
  }
  
  return items;
}

function extractCDATA(xml, tag) {
  const cdataRegex = new RegExp(`<${tag.replace(':', '\\:')}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag.replace(':', '\\:')}>`);
  const match = xml.match(cdataRegex);
  if (match) return match[1];
  
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
  
  let cleaned = content
    .replace(/<!-- wp:[^>]+ -->/g, '')
    .replace(/<!-- \/wp:[^>]+ -->/g, '')
    .replace(/<!-- wp:[^>]+ \{[^}]*\} -->/g, '');
  
  cleaned = cleaned
    .replace(/<figure[^>]*class="wp-block-image[^"]*"[^>]*>/g, '<figure>')
    .replace(/<figure[^>]*>/g, '<figure>')
    .replace(/<\/figure>/g, '</figure>');
  
  cleaned = cleaned.replace(/ style="[^"]*"/g, '');
  
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
    .substring(0, 96);
}

function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString();
  const date = new Date(dateStr);
  return date.toISOString();
}

function calculateReadTime(content) {
  const text = content.replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function mapNewsCategory(wpCategory) {
  const lowerCat = (wpCategory || '').toLowerCase();
  
  if (lowerCat.includes('partner')) return 'partnership';
  if (lowerCat.includes('product')) return 'product-news';
  if (lowerCat.includes('launch')) return 'product-launch';
  if (lowerCat.includes('award')) return 'award';
  if (lowerCat.includes('fund')) return 'funding';
  if (lowerCat.includes('expand')) return 'expansion';
  if (lowerCat.includes('media')) return 'media-spotlight';
  
  return 'company-news';
}

// ============== SANITY MIGRATION ==============

function generateKey() {
  return Math.random().toString(36).substring(2, 10);
}

/**
 * Convert HTML to Sanity Portable Text WITH image uploads
 */
async function htmlToPortableTextWithImages(html) {
  if (!html) return [];
  
  const blocks = [];
  
  let cleanHtml = html
    .replace(/<!-- wp:[^>]+ -->/g, '')
    .replace(/<!-- \/wp:[^>]+ -->/g, '')
    .replace(/<!-- wp:[^>]+ \{[^}]*\} -->/g, '');
  
  const blockRegex = /<(p|h[1-6]|ul|ol|blockquote|figure)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  
  while ((match = blockRegex.exec(cleanHtml)) !== null) {
    const tag = match[1].toLowerCase();
    const content = match[2];
    
    if (tag === 'figure') {
      // Handle images - upload to Sanity
      const imgMatch = content.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
      if (imgMatch) {
        const imageUrl = imgMatch[1];
        const altMatch = content.match(/alt="([^"]*)"/i);
        const captionMatch = content.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
        
        // Upload image to Sanity
        const assetRef = await uploadImageToSanity(imageUrl);
        
        if (assetRef) {
          blocks.push({
            _type: 'image',
            _key: generateKey(),
            asset: assetRef,
            alt: altMatch ? decodeHTMLEntities(altMatch[1]) : '',
            caption: captionMatch ? decodeHTMLEntities(captionMatch[1].replace(/<[^>]+>/g, '')) : '',
          });
        }
      }
    } else if (tag === 'ul' || tag === 'ol') {
      const listItems = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
      for (const li of listItems) {
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
      }
    } else {
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
  
  html = html.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  let remaining = html;
  let safetyCounter = 0;
  const maxIterations = 1000;
  
  while (remaining.length > 0 && safetyCounter < maxIterations) {
    safetyCounter++;
    
    const nextTag = remaining.match(/^(.*?)<(strong|b|em|i|a|br)[\s>]/i);
    
    if (!nextTag) {
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
    
    if (nextTag[1].trim()) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: decodeHTMLEntities(nextTag[1]),
        marks: []
      });
    }
    
    remaining = remaining.substring(nextTag[1].length);
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
    
    const skipTag = remaining.match(/^<[^>]+>/);
    if (skipTag) {
      remaining = remaining.substring(skipTag[0].length);
    } else {
      remaining = remaining.substring(1);
    }
  }
  
  return { children, markDefs };
}

async function deleteExistingPressReleases() {
  console.log('\n🗑️  Deleting existing press releases...');
  
  try {
    const existingItems = await client.fetch(`*[_type == "pressRelease"]._id`);
    console.log(`  Found ${existingItems.length} existing press releases to delete`);
    
    if (existingItems.length > 0) {
      const batchSize = 50;
      for (let i = 0; i < existingItems.length; i += batchSize) {
        const batch = existingItems.slice(i, i + batchSize);
        const transaction = client.transaction();
        batch.forEach(id => transaction.delete(id));
        await transaction.commit();
        console.log(`  Deleted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(existingItems.length / batchSize)}`);
      }
    }
    
    console.log('  ✓ All existing press releases deleted');
  } catch (error) {
    console.error('  ✗ Error deleting press releases:', error.message);
    throw error;
  }
}

async function migrateNewsItems(items) {
  console.log(`\n📰 Migrating ${items.length} news items to Sanity...`);
  console.log('   (This will take a while due to image uploads)\n');
  
  let successCount = 0;
  let errorCount = 0;
  let imageCount = 0;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    try {
      // Upload featured image first
      let featuredImageAsset = null;
      if (item.featuredImage) {
        featuredImageAsset = await uploadImageToSanity(item.featuredImage);
        if (featuredImageAsset) imageCount++;
      }
      
      // Convert HTML content to Portable Text with images
      const portableTextContent = await htmlToPortableTextWithImages(item.htmlContent || item.content);
      
      // Count images uploaded in content
      const contentImagesUploaded = portableTextContent.filter(b => b._type === 'image').length;
      imageCount += contentImagesUploaded;
      
      // Build the document
      const doc = {
        _type: 'pressRelease',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        excerpt: item.excerpt,
        content: portableTextContent,
        publishedAt: item.date,
        category: item.category,
        readTime: item.readTime,
        source: 'Moving Walls',
        isPublished: true,
        status: 'published',
        hasFullArticle: true,
      };
      
      // Add featured image if uploaded
      if (featuredImageAsset) {
        doc.featuredImage = {
          _type: 'image',
          asset: featuredImageAsset
        };
      }
      
      await client.create(doc);
      successCount++;
      console.log(`  ✓ [${i + 1}/${items.length}] ${item.title.substring(0, 50)}... (${contentImagesUploaded + (featuredImageAsset ? 1 : 0)} images)`);
      
      // Delay to avoid rate limiting
      if (i % 5 === 0 && i > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      errorCount++;
      console.error(`  ✗ [${i + 1}/${items.length}] Error: ${item.title.substring(0, 30)}... - ${error.message}`);
    }
  }
  
  console.log(`\n📊 Migration complete: ${successCount} success, ${errorCount} errors, ${imageCount} images uploaded`);
  return { successCount, errorCount, imageCount };
}

// ============== MAIN ==============

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node scripts/import-wordpress-news.js <path-to-xml-file>');
    process.exit(1);
  }
  
  const xmlPath = args[0];
  
  if (!fs.existsSync(xmlPath)) {
    console.error(`File not found: ${xmlPath}`);
    process.exit(1);
  }
  
  console.log('🚀 WordPress News Import Script');
  console.log('================================\n');
  console.log(`📂 Reading XML file: ${xmlPath}`);
  
  const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
  
  console.log('📝 Parsing WordPress XML...');
  const newsItems = parseWordPressXML(xmlContent);
  console.log(`   Found ${newsItems.length} news items to import`);
  
  if (newsItems.length === 0) {
    console.log('⚠️  No news items found in the XML file.');
    process.exit(0);
  }
  
  // Preview first few items
  console.log('\n📋 Preview of news items:');
  newsItems.slice(0, 5).forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.title.substring(0, 60)}... [${item.category}] - ${item.date.split('T')[0]}`);
  });
  console.log(`  ... and ${Math.max(0, newsItems.length - 5)} more\n`);
  
  // Delete existing press releases
  await deleteExistingPressReleases();
  
  // Migrate news items
  const result = await migrateNewsItems(newsItems);
  
  console.log('\n✅ Import complete!');
  console.log(`   Total: ${result.successCount} news items imported`);
  console.log(`   Images: ${result.imageCount} uploaded`);
  if (result.errorCount > 0) {
    console.log(`   Errors: ${result.errorCount}`);
  }
}

main().catch(error => {
  console.error('\n💥 Fatal error:', error);
  process.exit(1);
});
