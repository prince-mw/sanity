/**
 * WordPress XML to Blog Posts Parser
 * Parses WordPress export XML files and generates TypeScript blog data
 */

const fs = require('fs');
const path = require('path');

// Simple XML parser without external dependencies
function parseXML(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    
    // Check if it's a blog post (not attachment, page, etc.)
    const postTypeMatch = itemXml.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
    const postType = postTypeMatch ? postTypeMatch[1] : '';
    
    if (postType !== 'post') continue;
    
    // Check if published
    const statusMatch = itemXml.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/);
    const status = statusMatch ? statusMatch[1] : '';
    
    if (status !== 'publish') continue;
    
    // Extract fields
    const title = extractCDATA(itemXml, 'title') || '';
    const link = extractTag(itemXml, 'link') || '';
    const pubDate = extractTag(itemXml, 'pubDate') || '';
    const creator = extractCDATA(itemXml, 'dc:creator') || 'Moving Walls Team';
    const content = extractCDATA(itemXml, 'content:encoded') || '';
    const excerpt = extractCDATA(itemXml, 'excerpt:encoded') || '';
    const postName = extractCDATA(itemXml, 'wp:post_name') || '';
    
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
      category: mapCategory(categories[0] || 'Industry Trends'),
      author: creator,
      date: formatDate(pubDate),
      readTime: calculateReadTime(cleanedContent),
      featuredImage: featuredImage || getDefaultImage(mapCategory(categories[0])),
      tags: tags.length > 0 ? tags : ['OOH', 'DOOH'],
    });
  }
  
  return items;
}

function extractCDATA(xml, tag) {
  const regex = new RegExp(`<${tag}><\\!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`);
  const match = xml.match(regex);
  return match ? match[1] : null;
}

function extractTag(xml, tag) {
  const regex = new RegExp(`<${tag}>([^<]*)<\\/${tag}>`);
  const match = xml.match(regex);
  return match ? match[1] : null;
}

function cleanWordPressContent(content) {
  if (!content) return '';
  
  // Remove WordPress blocks
  let cleaned = content
    .replace(/<!-- wp:[^>]+ -->/g, '')
    .replace(/<!-- \/wp:[^>]+ -->/g, '')
    .replace(/<!-- wp:[^>]+ {[^}]*} -->/g, '')
    .replace(/<!-- wp:[^>]+ {"[^"]*":"[^"]*"[^}]*} -->/g, '');
  
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

function generateExcerpt(content, maxLength = 200) {
  // Strip HTML tags
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

function decodeHTMLEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—');
}

function getDefaultImage(category) {
  const images = {
    'Programmatic DOOH': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    'Industry Trends': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    'Case Studies': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'Best Practices': 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop',
    'Measurement': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    'Media Owners': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  };
  return images[category] || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop';
}

function mapCategory(wpCategory) {
  const categoryMap = {
    // Programmatic DOOH related
    'Programmatic DOOH': 'Programmatic DOOH',
    'Programmatic OOH': 'Programmatic DOOH',
    'pDOOH': 'Programmatic DOOH',
    'DOOH': 'Programmatic DOOH',
    
    // Industry Trends
    'OOH': 'Industry Trends',
    'Industry Updates': 'Industry Trends',
    'News': 'Industry Trends',
    'Trends': 'Industry Trends',
    'OOH Insights and Trends': 'Industry Trends',
    'Future of OOH': 'Industry Trends',
    'Thought Leadership': 'Industry Trends',
    'Events': 'Industry Trends',
    'Moving Walls Market': 'Industry Trends',
    
    // Case Studies
    'Case Study': 'Case Studies',
    'Case Studies': 'Case Studies',
    'Success Stories': 'Case Studies',
    'Driving Success in OOH': 'Case Studies',
    
    // Best Practices
    'How-to': 'Best Practices',
    'Tips': 'Best Practices',
    'Guide': 'Best Practices',
    'Guides': 'Best Practices',
    'Best Practices': 'Best Practices',
    'OOH Planning': 'Best Practices',
    
    // Technology
    'Technology': 'Technology',
    'Tech': 'Technology',
    'Technology Transforming OOH': 'Technology',
    'Data Driven OOH': 'Technology',
    'OOH SaaS': 'Technology',
    
    // Measurement
    'Measurement': 'Measurement',
    'Analytics': 'Measurement',
    'Attribution': 'Measurement',
    'Measuring OOH Effectiveness': 'Measurement',
    
    // Media Owners
    'Media Owners': 'Media Owners',
    'LMX': 'Media Owners',
    'Supply Side': 'Media Owners',
  };
  return categoryMap[wpCategory] || 'Industry Trends';
}

// Main execution
async function main() {
  const mwBlogsPath = '/Users/vivekanandchoudhari/Downloads/MW Blogs.xml';
  const lmxBlogsPath = '/Users/vivekanandchoudhari/Downloads/LMX Blogs.xml';
  
  console.log('Reading WordPress XML files...');
  
  let allPosts = [];
  
  // Parse MW Blogs
  if (fs.existsSync(mwBlogsPath)) {
    console.log('Parsing MW Blogs...');
    const mwXml = fs.readFileSync(mwBlogsPath, 'utf-8');
    const mwPosts = parseXML(mwXml);
    console.log(`Found ${mwPosts.length} posts in MW Blogs`);
    allPosts = [...allPosts, ...mwPosts];
  }
  
  // Parse LMX Blogs
  if (fs.existsSync(lmxBlogsPath)) {
    console.log('Parsing LMX Blogs...');
    const lmxXml = fs.readFileSync(lmxBlogsPath, 'utf-8');
    const lmxPosts = parseXML(lmxXml);
    // Add source tag to LMX posts
    lmxPosts.forEach(post => {
      post.tags = [...post.tags, 'LMX'];
      // Ensure LMX posts use Media Owners category if they don't have a specific category
      if (post.category === 'Industry Trends') {
        post.category = 'Media Owners';
      }
    });
    console.log(`Found ${lmxPosts.length} posts in LMX Blogs`);
    allPosts = [...allPosts, ...lmxPosts];
  }
  
  // Remove duplicates by slug
  const uniquePosts = [];
  const seenSlugs = new Set();
  for (const post of allPosts) {
    if (!seenSlugs.has(post.slug)) {
      seenSlugs.add(post.slug);
      uniquePosts.push(post);
    }
  }
  
  // Sort by date (newest first)
  uniquePosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Mark first 3 as featured
  uniquePosts.slice(0, 3).forEach(post => {
    post.featured = true;
  });
  
  console.log(`\nTotal unique posts: ${uniquePosts.length}`);
  
  // Generate TypeScript file
  const outputPath = path.join(__dirname, '../src/data/blog-posts-generated.ts');
  
  const tsContent = `// Blog posts data - Auto-generated from WordPress export
// Generated on: ${new Date().toISOString()}
// Total posts: ${uniquePosts.length}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  featuredImage: string;
  tags: string[];
  featured?: boolean;
}

export const blogCategories = [
  "All",
  "Industry Trends",
  "Best Practices",
  "Technology",
  "Case Studies",
  "Programmatic DOOH",
  "Measurement",
  "Media Owners"
];

export const blogPosts: BlogPost[] = ${JSON.stringify(uniquePosts, null, 2)};

// Helper functions
export const getFeaturedPost = () => blogPosts.find(post => post.featured);

export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);

export const getPostsByCategory = (category: string) => 
  category === 'All' ? blogPosts : blogPosts.filter(post => post.category === category);

export const searchPosts = (query: string) => {
  const q = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(q) ||
    post.excerpt.toLowerCase().includes(q) ||
    post.tags.some(tag => tag.toLowerCase().includes(q))
  );
};

export const getRelatedPosts = (slug: string, category?: string, limit = 3) => {
  return blogPosts
    .filter(post => post.slug !== slug && (category ? post.category === category : true))
    .slice(0, limit);
};
`;
  
  fs.writeFileSync(outputPath, tsContent);
  console.log(`\nGenerated: ${outputPath}`);
  
  // Print summary
  const categoryCount = {};
  uniquePosts.forEach(post => {
    categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
  });
  
  console.log('\nPosts by category:');
  Object.entries(categoryCount).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });
}

main().catch(console.error);
