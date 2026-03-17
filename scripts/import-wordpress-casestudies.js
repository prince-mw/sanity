/**
 * WordPress XML Case Studies Import Script - WITH FULL IMAGE MIGRATION
 * 
 * This script:
 * 1. Parses WordPress XML export file for case-studies
 * 2. Downloads and uploads images to Sanity Assets
 * 3. Deletes all existing case studies from Sanity
 * 4. Migrates case studies with proper formatting
 * 
 * Usage: node scripts/import-wordpress-casestudies.js <path-to-xml-file>
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

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, { 
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SanityImporter/1.0)'
      }
    }, (response) => {
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

async function uploadImageToSanity(imageUrl) {
  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl);
  }
  
  try {
    const imageBuffer = await downloadImage(imageUrl);
    
    const urlParts = imageUrl.split('/');
    let filename = urlParts[urlParts.length - 1].split('?')[0];
    filename = decodeURIComponent(filename);
    
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
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename,
      contentType
    });
    
    const assetRef = {
      _type: 'reference',
      _ref: asset._id
    };
    
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
    
    // Check if it's a case-studies post type
    const postTypeMatch = itemXml.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
    const postType = postTypeMatch ? postTypeMatch[1] : '';
    
    if (postType !== 'case-studies') continue;
    
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
    
    // Extract ALL images from content
    const contentImages = [];
    const imageRegex = /<img[^>]+src="(https?:\/\/[^"]+\.(jpg|jpeg|png|gif|webp))"/gi;
    let imgMatch;
    while ((imgMatch = imageRegex.exec(content)) !== null) {
      contentImages.push(imgMatch[1]);
    }
    
    // Featured image is the first one
    const featuredImage = contentImages[0] || '';
    
    // Parse structured fields from content
    const parsedContent = parseCaseStudyContent(content);
    
    // Generate slug
    const slug = postName || generateSlug(title);
    
    items.push({
      slug,
      title: decodeHTMLEntities(title),
      excerpt: cleanWordPressContent(excerpt) || parsedContent.excerpt,
      content: content,
      htmlContent: content,
      client: parsedContent.client,
      country: parsedContent.country,
      partner: parsedContent.partner,
      challenge: parsedContent.challenge,
      objective: parsedContent.objective,
      solution: parsedContent.solution,
      results: parsedContent.results,
      metrics: parsedContent.metrics,
      date: formatDate(pubDate),
      featuredImage: featuredImage,
      contentImages: contentImages,
      industry: mapIndustry(parsedContent.client, title),
    });
  }
  
  return items;
}

function parseCaseStudyContent(html) {
  const result = {
    client: '',
    country: '',
    partner: '',
    challenge: '',
    objective: '',
    solution: '',
    results: '',
    metrics: [],
    excerpt: '',
  };
  
  // Extract Brand/Client
  const brandMatch = html.match(/<strong>Brand:\s*<\/strong>\s*([^<]+)/i) 
    || html.match(/<strong>Brand:<\/strong>\s*([^<]+)/i)
    || html.match(/Brand:\s*<\/strong>\s*([^<]+)/i);
  if (brandMatch) {
    result.client = decodeHTMLEntities(brandMatch[1].trim());
  }
  
  // Extract Country
  const countryMatch = html.match(/<strong>Country:\s*<\/strong>\s*(<a[^>]*>)?([^<]+)/i)
    || html.match(/<strong>Country:<\/strong>\s*(<a[^>]*>)?([^<]+)/i);
  if (countryMatch) {
    result.country = decodeHTMLEntities((countryMatch[2] || countryMatch[1]).replace(/<[^>]+>/g, '').trim());
  }
  
  // Extract Partner
  const partnerMatch = html.match(/<strong>Partner:\s*<\/strong>\s*([^<]+)/i);
  if (partnerMatch) {
    result.partner = decodeHTMLEntities(partnerMatch[1].trim());
  }
  
  // Extract Challenge
  const challengeMatch = html.match(/<strong>Challenge:\s*<\/strong>\s*([\s\S]*?)(?=<strong>|<\/p>\s*<p><strong>|$)/i)
    || html.match(/<h[56][^>]*><strong>Challenge:<\/strong>\s*<\/h[56]>\s*<p>([\s\S]*?)<\/p>/i);
  if (challengeMatch) {
    result.challenge = cleanText(challengeMatch[1]);
  }
  
  // Extract Objective
  const objectiveMatch = html.match(/<strong>Objective:\s*<\/strong>\s*([\s\S]*?)(?=<strong>|<\/p>\s*<p><strong>|$)/i)
    || html.match(/<h[56][^>]*><strong>Objective[:\s]*<\/strong>\s*<\/h[56]>\s*<p>([\s\S]*?)<\/p>/i);
  if (objectiveMatch) {
    result.objective = cleanText(objectiveMatch[1]);
  }
  
  // Extract Solution
  const solutionMatch = html.match(/<strong>Solution:\s*<\/strong>\s*([\s\S]*?)(?=<strong>|<\/p>\s*<p><strong>|$)/i)
    || html.match(/<h[56][^>]*><strong>Solution[:\s]*<\/strong>\s*<\/h[56]>\s*([\s\S]*?)(?=<h[456]|$)/i);
  if (solutionMatch) {
    result.solution = cleanText(solutionMatch[1]);
  }
  
  // Extract Results
  const resultsMatch = html.match(/<strong>Results?:\s*<\/strong>\s*([\s\S]*?)(?=<strong>|<\/p>\s*<p><strong>|$)/i)
    || html.match(/<h[56][^>]*><strong>Results?[:\s]*<\/strong>\s*<\/h[56]>\s*([\s\S]*?)(?=<h[456]|$)/i);
  if (resultsMatch) {
    result.results = cleanText(resultsMatch[1]);
  }
  
  // Extract metrics (numbers like +1.4MIL, 142.63%, etc.)
  const metricsRegex = /(\+?[\d,.]+(?:MIL|K|%|Million)?)\s*(?:Audiences|Impressions|Reach|Views|Potential Views)?/gi;
  let metricMatch;
  const foundMetrics = [];
  while ((metricMatch = metricsRegex.exec(html)) !== null) {
    const value = metricMatch[1];
    if (value.length > 2 && !foundMetrics.includes(value)) {
      foundMetrics.push(value);
      // Try to determine label
      const context = html.substring(Math.max(0, metricMatch.index - 50), metricMatch.index + metricMatch[0].length + 50);
      let label = 'Impressions';
      if (/reach/i.test(context)) label = 'Reach';
      if (/views/i.test(context)) label = 'Views';
      if (/audiences?/i.test(context)) label = 'Audiences';
      if (/%/.test(value)) label = 'Performance';
      
      result.metrics.push({ label, value });
    }
  }
  
  // Limit to top 3 metrics
  result.metrics = result.metrics.slice(0, 3);
  
  // Generate excerpt from challenge or first paragraph
  if (result.challenge) {
    result.excerpt = result.challenge.substring(0, 200) + '...';
  } else {
    const firstPara = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (firstPara) {
      result.excerpt = cleanText(firstPara[1]).substring(0, 200) + '...';
    }
  }
  
  return result;
}

function cleanText(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

function mapIndustry(client, title) {
  const text = (client + ' ' + title).toLowerCase();
  
  if (/mcdonald|burger|food|kfc|restaurant|cafe/i.test(text)) return 'fmcg';
  if (/samsung|dell|tech|software|app|mobile/i.test(text)) return 'technology';
  if (/visa|bank|finance|caltex|shell|petrol|gas/i.test(text)) return 'finance';
  if (/airasia|travel|tourism|hotel|airline/i.test(text)) return 'travel';
  if (/neutrogena|lancome|ysl|beauty|cosmetic|loreal/i.test(text)) return 'fmcg';
  if (/seaoil|caltex|shell|petrol/i.test(text)) return 'automotive';
  if (/pharma|health|medical|hospital/i.test(text)) return 'healthcare';
  if (/retail|mall|shop|store/i.test(text)) return 'retail';
  if (/cricket|sport|icc|ipl/i.test(text)) return 'entertainment';
  if (/car|auto|vehicle|toyota|honda|bmw/i.test(text)) return 'automotive';
  
  return 'other';
}

// ============== SANITY MIGRATION ==============

function generateKey() {
  return Math.random().toString(36).substring(2, 10);
}

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
      const imgMatch = content.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
      if (imgMatch) {
        const imageUrl = imgMatch[1];
        const altMatch = content.match(/alt="([^"]*)"/i);
        const captionMatch = content.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
        
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

function textToPortableText(text) {
  if (!text) return [];
  return [{
    _type: 'block',
    _key: generateKey(),
    style: 'normal',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: generateKey(),
      text: text,
      marks: []
    }]
  }];
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

async function deleteExistingCaseStudies() {
  console.log('\n🗑️  Deleting existing case studies...');
  
  try {
    const existingItems = await client.fetch(`*[_type == "caseStudy"]._id`);
    console.log(`  Found ${existingItems.length} existing case studies to delete`);
    
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
    
    console.log('  ✓ All existing case studies deleted');
  } catch (error) {
    console.error('  ✗ Error deleting case studies:', error.message);
    throw error;
  }
}

async function migrateCaseStudies(items) {
  console.log(`\n📋 Migrating ${items.length} case studies to Sanity...`);
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
        _type: 'caseStudy',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        client: item.client || item.title.split(' ')[0],
        location: item.country || '',
        industry: item.industry,
        publishedAt: item.date,
        content: portableTextContent,
        isPublished: true,
        status: 'published',
      };
      
      // Add featured image if uploaded
      if (featuredImageAsset) {
        doc.featuredImage = {
          _type: 'image',
          asset: featuredImageAsset
        };
      }
      
      // Add challenge, solution, results as blockContent if available
      if (item.challenge) {
        doc.challenge = textToPortableText(item.challenge);
      }
      if (item.solution) {
        doc.solution = textToPortableText(item.solution);
      }
      if (item.results) {
        doc.results = textToPortableText(item.results);
      }
      
      // Add metrics if available
      if (item.metrics && item.metrics.length > 0) {
        doc.metrics = item.metrics.map(m => ({
          _key: generateKey(),
          label: m.label,
          value: m.value
        }));
      }
      
      await client.create(doc);
      successCount++;
      console.log(`  ✓ [${i + 1}/${items.length}] ${item.client || item.title.substring(0, 20)} - ${item.title.substring(0, 40)}... (${contentImagesUploaded + (featuredImageAsset ? 1 : 0)} images)`);
      
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
    console.log('Usage: node scripts/import-wordpress-casestudies.js <path-to-xml-file>');
    process.exit(1);
  }
  
  const xmlPath = args[0];
  
  if (!fs.existsSync(xmlPath)) {
    console.error(`File not found: ${xmlPath}`);
    process.exit(1);
  }
  
  console.log('🚀 WordPress Case Studies Import Script');
  console.log('=======================================\n');
  console.log(`📂 Reading XML file: ${xmlPath}`);
  
  const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
  
  console.log('📝 Parsing WordPress XML...');
  const caseStudies = parseWordPressXML(xmlContent);
  console.log(`   Found ${caseStudies.length} case studies to import`);
  
  if (caseStudies.length === 0) {
    console.log('⚠️  No case studies found in the XML file.');
    process.exit(0);
  }
  
  // Preview first few items
  console.log('\n📋 Preview of case studies:');
  caseStudies.slice(0, 5).forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.client || 'N/A'} - ${item.title.substring(0, 50)}... [${item.industry}]`);
  });
  console.log(`  ... and ${Math.max(0, caseStudies.length - 5)} more\n`);
  
  // Delete existing case studies
  await deleteExistingCaseStudies();
  
  // Migrate case studies
  const result = await migrateCaseStudies(caseStudies);
  
  console.log('\n✅ Import complete!');
  console.log(`   Total: ${result.successCount} case studies imported`);
  console.log(`   Images: ${result.imageCount} uploaded`);
  if (result.errorCount > 0) {
    console.log(`   Errors: ${result.errorCount}`);
  }
}

main().catch(error => {
  console.error('\n💥 Fatal error:', error);
  process.exit(1);
});
