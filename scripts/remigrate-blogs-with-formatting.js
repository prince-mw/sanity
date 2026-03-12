/**
 * Re-Migration Script: Blog Posts to Sanity with FULL HTML formatting
 * 
 * This script re-migrates existing blog posts, properly converting
 * WordPress HTML to Sanity Portable Text with all formatting preserved.
 * 
 * Usage: node scripts/remigrate-blogs-with-formatting.js
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
  console.error('blog-posts.json not found.');
  process.exit(1);
}

const blogPosts = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
console.log(`Loaded ${blogPosts.length} blog posts from JSON`);

// Generate unique keys for Sanity
function generateKey() {
  return Math.random().toString(36).substring(2, 10);
}

// Decode HTML entities
function decodeHtmlEntities(text) {
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
    .replace(/&#39;/g, "'");
}

// Parse inline content with marks (bold, italic, links)
function parseInlineContent(html, markDefs = []) {
  const children = [];
  
  // Remove newlines and normalize whitespace
  html = html.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  
  // Process inline elements
  let remaining = html;
  
  while (remaining.length > 0) {
    // Check for <strong> or <b>
    const strongMatch = remaining.match(/^(.*?)<(strong|b)>(.*?)<\/\2>/i);
    if (strongMatch && strongMatch[1].length === 0) {
      const innerContent = strongMatch[3];
      // Check for nested link inside strong
      const linkInStrong = innerContent.match(/<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i);
      if (linkInStrong) {
        const linkKey = generateKey();
        markDefs.push({
          _type: 'link',
          _key: linkKey,
          href: linkInStrong[1]
        });
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: decodeHtmlEntities(linkInStrong[2].replace(/<[^>]*>/g, '')),
          marks: ['strong', linkKey]
        });
      } else {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: decodeHtmlEntities(innerContent.replace(/<[^>]*>/g, '')),
          marks: ['strong']
        });
      }
      remaining = remaining.substring(strongMatch[0].length);
      continue;
    }
    
    // Check for <em> or <i>
    const emMatch = remaining.match(/^(.*?)<(em|i)>(.*?)<\/\2>/i);
    if (emMatch && emMatch[1].length === 0) {
      const innerContent = emMatch[3];
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: decodeHtmlEntities(innerContent.replace(/<[^>]*>/g, '')),
        marks: ['em']
      });
      remaining = remaining.substring(emMatch[0].length);
      continue;
    }
    
    // Check for <a> links
    const linkMatch = remaining.match(/^(.*?)<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i);
    if (linkMatch && linkMatch[1].length === 0) {
      const linkKey = generateKey();
      markDefs.push({
        _type: 'link',
        _key: linkKey,
        href: linkMatch[2]
      });
      // Check for strong inside link
      const strongInLink = linkMatch[3].match(/<strong>(.*?)<\/strong>/i);
      if (strongInLink) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: decodeHtmlEntities(strongInLink[1].replace(/<[^>]*>/g, '')),
          marks: [linkKey, 'strong']
        });
      } else {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: decodeHtmlEntities(linkMatch[3].replace(/<[^>]*>/g, '')),
          marks: [linkKey]
        });
      }
      remaining = remaining.substring(linkMatch[0].length);
      continue;
    }
    
    // Check for <br> or <br/>
    const brMatch = remaining.match(/^(.*?)<br\s*\/?>/i);
    if (brMatch && brMatch[1].length === 0) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: '\n',
        marks: []
      });
      remaining = remaining.substring(brMatch[0].length);
      continue;
    }
    
    // Find next tag or end
    const nextTagMatch = remaining.match(/^([^<]+)/);
    if (nextTagMatch) {
      const text = decodeHtmlEntities(nextTagMatch[1]);
      if (text.trim()) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: text,
          marks: []
        });
      }
      remaining = remaining.substring(nextTagMatch[0].length);
    } else if (remaining.startsWith('<')) {
      // Skip unknown tags - find closing >
      const closeTag = remaining.indexOf('>');
      if (closeTag > -1) {
        remaining = remaining.substring(closeTag + 1);
      } else {
        break;
      }
    } else {
      break;
    }
  }
  
  // If no children created, add whole text as single span
  if (children.length === 0 && html.trim()) {
    children.push({
      _type: 'span',
      _key: generateKey(),
      text: decodeHtmlEntities(html.replace(/<[^>]*>/g, '')),
      marks: []
    });
  }
  
  return { children, markDefs };
}

// Convert WordPress HTML to Sanity Portable Text blocks
function htmlToPortableText(html) {
  if (!html) return [];
  
  const blocks = [];
  
  // Split by block-level elements
  // Match: p, h1-h6, ul, ol, figure, blockquote, div
  const blockRegex = /<(p|h[1-6]|ul|ol|figure|blockquote|div)[^>]*>([\s\S]*?)<\/\1>/gi;
  
  let match;
  while ((match = blockRegex.exec(html)) !== null) {
    const tagName = match[1].toLowerCase();
    const content = match[2];
    
    // Handle headings
    if (tagName.match(/^h[1-6]$/)) {
      const markDefs = [];
      const { children } = parseInlineContent(content, markDefs);
      
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: tagName,
        markDefs: markDefs,
        children: children.length > 0 ? children : [{
          _type: 'span',
          _key: generateKey(),
          text: decodeHtmlEntities(content.replace(/<[^>]*>/g, '')),
          marks: []
        }]
      });
    }
    // Handle paragraphs
    else if (tagName === 'p') {
      // Skip empty paragraphs
      const cleanContent = content.replace(/<[^>]*>/g, '').trim();
      if (!cleanContent) continue;
      
      const markDefs = [];
      const { children } = parseInlineContent(content, markDefs);
      
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        markDefs: markDefs,
        children: children.length > 0 ? children : [{
          _type: 'span',
          _key: generateKey(),
          text: decodeHtmlEntities(cleanContent),
          marks: []
        }]
      });
    }
    // Handle unordered lists
    else if (tagName === 'ul') {
      const listItems = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
      
      for (const li of listItems) {
        const liContent = li.replace(/<\/?li[^>]*>/gi, '');
        const markDefs = [];
        const { children } = parseInlineContent(liContent, markDefs);
        
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          markDefs: markDefs,
          children: children.length > 0 ? children : [{
            _type: 'span',
            _key: generateKey(),
            text: decodeHtmlEntities(liContent.replace(/<[^>]*>/g, '')),
            marks: []
          }]
        });
      }
    }
    // Handle ordered lists
    else if (tagName === 'ol') {
      const listItems = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
      
      for (const li of listItems) {
        const liContent = li.replace(/<\/?li[^>]*>/gi, '');
        const markDefs = [];
        const { children } = parseInlineContent(liContent, markDefs);
        
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          listItem: 'number',
          level: 1,
          markDefs: markDefs,
          children: children.length > 0 ? children : [{
            _type: 'span',
            _key: generateKey(),
            text: decodeHtmlEntities(liContent.replace(/<[^>]*>/g, '')),
            marks: []
          }]
        });
      }
    }
    // Handle blockquotes
    else if (tagName === 'blockquote') {
      const markDefs = [];
      const { children } = parseInlineContent(content, markDefs);
      
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'blockquote',
        markDefs: markDefs,
        children: children.length > 0 ? children : [{
          _type: 'span',
          _key: generateKey(),
          text: decodeHtmlEntities(content.replace(/<[^>]*>/g, '')),
          marks: []
        }]
      });
    }
    // Handle figures (images)
    else if (tagName === 'figure') {
      const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*?)["'])?[^>]*>/i);
      if (imgMatch) {
        const captionMatch = content.match(/<figcaption[^>]*>(.*?)<\/figcaption>/i);
        
        blocks.push({
          _type: 'image',
          _key: generateKey(),
          _sanityAsset: `image@${imgMatch[1]}`,
          alt: imgMatch[2] || '',
          caption: captionMatch ? decodeHtmlEntities(captionMatch[1].replace(/<[^>]*>/g, '')) : ''
        });
      }
    }
    // Handle divs with specific classes (like wp-block-media-text)
    else if (tagName === 'div') {
      // Extract any paragraphs inside divs
      const innerBlocks = htmlToPortableText(content);
      blocks.push(...innerBlocks);
    }
  }
  
  return blocks;
}

async function updateBlogPost(post, index) {
  const slug = post.slug;
  
  try {
    // Find existing post by slug
    const existing = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]`,
      { slug }
    );

    if (!existing) {
      console.log(`  [${index + 1}/${blogPosts.length}] ⏭ Not found: ${post.title.substring(0, 40)}...`);
      return { notFound: true };
    }

    // Convert HTML to Portable Text
    const portableTextContent = htmlToPortableText(post.content);
    
    if (portableTextContent.length === 0) {
      console.log(`  [${index + 1}/${blogPosts.length}] ⚠ No content: ${post.title.substring(0, 40)}...`);
      return { noContent: true };
    }

    // Update post with new content
    await client.patch(existing._id)
      .set({ content: portableTextContent })
      .commit();

    console.log(`  [${index + 1}/${blogPosts.length}] ✓ Updated: ${post.title.substring(0, 40)}... (${portableTextContent.length} blocks)`);
    return { updated: true };
  } catch (error) {
    console.error(`  [${index + 1}/${blogPosts.length}] ✗ Error: ${post.title.substring(0, 40)}...`, error.message);
    return { error: true };
  }
}

async function migrate() {
  console.log('='.repeat(60));
  console.log('Blog Posts Re-Migration with Full Formatting');
  console.log('='.repeat(60));

  let updated = 0;
  let notFound = 0;
  let noContent = 0;
  let errors = 0;

  console.log('\nUpdating blog posts with formatted content...');

  for (let i = 0; i < blogPosts.length; i++) {
    const result = await updateBlogPost(blogPosts[i], i);
    if (result.updated) updated++;
    if (result.notFound) notFound++;
    if (result.noContent) noContent++;
    if (result.error) errors++;
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\n' + '='.repeat(60));
  console.log('Re-Migration Complete!');
  console.log('='.repeat(60));
  console.log(`  Updated:   ${updated}`);
  console.log(`  Not Found: ${notFound}`);
  console.log(`  No Content: ${noContent}`);
  console.log(`  Errors:    ${errors}`);
}

migrate().catch(console.error);
