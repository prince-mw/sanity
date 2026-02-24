/**
 * WordPress XML to Case Studies Parser
 * Parses WordPress export XML files and generates TypeScript case study data
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
    
    // Check if it's a case study
    const postTypeMatch = itemXml.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
    const postType = postTypeMatch ? postTypeMatch[1] : '';
    
    if (postType !== 'case-studies') continue;
    
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
    const postName = extractCDATA(itemXml, 'wp:post_name') || '';
    
    // Clean content and extract structured data
    const cleanedContent = cleanWordPressContent(content);
    const structuredData = extractCaseStudyData(content);
    
    // Extract featured image from content
    const imageMatch = content.match(/src="(https?:\/\/[^"]+\.(jpg|jpeg|png|gif|webp))"/i);
    const featuredImage = imageMatch ? imageMatch[1] : '';
    
    // Extract PDF link
    const pdfMatch = content.match(/href="(https?:\/\/[^"]+\.pdf)"/i);
    const pdfLink = pdfMatch ? pdfMatch[1] : '';
    
    // Generate slug
    const slug = postName || generateSlug(title);
    
    // Determine industry from brand/content
    const industry = determineIndustry(structuredData.brand, cleanedContent, title);
    
    // Determine country - use detected or try to extract from content/title
    let country = structuredData.country;
    if (!country || country === 'Global') {
      country = detectCountryFromText(cleanedContent + ' ' + title);
    }
    
    items.push({
      slug,
      title: decodeHTMLEntities(title),
      brand: structuredData.brand || extractBrandFromTitle(title),
      country: country || 'Global',
      industry,
      partner: structuredData.partner || '',
      challenge: structuredData.challenge || '',
      objective: structuredData.objective || '',
      solution: structuredData.solution || '',
      results: structuredData.results || '',
      content: cleanedContent,
      featuredImage: featuredImage || getDefaultImage(industry),
      pdfLink,
      date: formatDate(pubDate),
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
  
  // Remove download buttons
  cleaned = cleaned.replace(/<div class="wp-block-buttons">[\s\S]*?<\/div>[\s\S]*?<\/div>/g, '');
  cleaned = cleaned.replace(/<div class="wp-block-button[^"]*">[\s\S]*?<\/div>/g, '');
  
  // Clean up extra whitespace
  cleaned = cleaned
    .replace(/\n\s*\n/g, '\n')
    .replace(/^\s+|\s+$/g, '')
    .trim();
  
  return cleaned;
}

function extractCaseStudyData(content) {
  const data = {
    brand: '',
    country: '',
    partner: '',
    challenge: '',
    objective: '',
    solution: '',
    results: ''
  };
  
  // Extract Brand - multiple patterns for different formats
  const brandMatch = content.match(/<strong>Brand:?\s*<\/strong>\s*([^<]+)/i) ||
                     content.match(/Brand:?\s*<\/strong>\s*([^<]+)/i) ||
                     content.match(/<h[56][^>]*><strong>Brand:?<\/strong>\s*([^<]+)/i) ||
                     content.match(/<h[56][^>]*><strong>Brand:?\s*<\/strong>\s*([^<]+)/i) ||
                     content.match(/<h5[^>]*>.*?<strong>Brand:?<\/strong>\s*([^<]+)/i) ||
                     content.match(/<p><strong>Brand:?\s*<\/strong>\s*([^<]+)/i);
  if (brandMatch) {
    data.brand = brandMatch[1].replace(/&nbsp;/g, ' ').trim();
  }
  
  // Extract Country
  const countryMatch = content.match(/<strong>Country:?\s*<\/strong>\s*([^<]+)/i) ||
                       content.match(/Country:?\s*<\/strong>\s*([^<]+)/i) ||
                       content.match(/<h[56][^>]*><strong>Country:?<\/strong>\s*([^<]+)/i);
  if (countryMatch) {
    data.country = countryMatch[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  // Extract Partner
  const partnerMatch = content.match(/<strong>Partner:?\s*<\/strong>\s*([^<]+)/i) ||
                       content.match(/Partner:?\s*<\/strong>\s*([^<]+)/i);
  if (partnerMatch) data.partner = partnerMatch[1].trim();
  
  // Extract Challenge
  const challengeMatch = content.match(/<strong>Challenge:?\s*<\/strong>\s*([\s\S]*?)(?=<strong>|<\/p>\s*<p><strong>|$)/i);
  if (challengeMatch) {
    data.challenge = challengeMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  
  // Extract Objective
  const objectiveMatch = content.match(/<strong>Objective:?\s*<\/strong>\s*([\s\S]*?)(?=<strong>|<\/p>\s*<p><strong>|$)/i);
  if (objectiveMatch) {
    data.objective = objectiveMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  
  // Extract Solution
  const solutionMatch = content.match(/<strong>Solution:?\s*<\/strong>\s*([\s\S]*?)(?=<strong>|<\/p>\s*<p><strong>|$)/i);
  if (solutionMatch) {
    data.solution = solutionMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  
  // Extract Results
  const resultsMatch = content.match(/<strong>Results:?\s*<\/strong>\s*([\s\S]*?)(?=<strong>|<\/p>\s*$|<figure|$)/i);
  if (resultsMatch) {
    data.results = resultsMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  
  return data;
}

function extractBrandFromTitle(title) {
  // Skip titles that start with common non-brand words
  const skipWords = ['how', 'why', 'what', 'when', 'where', 'the', 'a', 'an', 'this', 'case', 'study'];
  const firstWord = title.split(/\s+/)[0].toLowerCase();
  if (skipWords.includes(firstWord)) {
    return '';
  }
  
  // Common patterns in titles
  const patterns = [
    /^([A-Z][a-zA-Z0-9]+)/,  // First word capitalized
    /Brand:\s*([^,\-]+)/i,
  ];
  
  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match && !skipWords.includes(match[1].toLowerCase())) {
      return match[1].trim();
    }
  }
  
  return '';
}

function determineIndustry(brand, content, title) {
  const text = `${brand} ${content} ${title}`.toLowerCase();
  
  const industryKeywords = {
    'FMCG': ['fmcg', 'sunsilk', 'unilever', 'nestle', 'tropicana', 'pepsico', 'coca-cola', 'mcdonald', 'burger', 'food', 'beverage', 'snack', 'garnier', 'loreal', 'lancôme', 'neutrogena', 'lipton'],
    'Technology': ['samsung', 'dell', 'lenovo', 'apple', 'microsoft', 'tech', 'software', 'mobile', 'smartphone', 'tablet', 'laptop', 'computer', 'sony'],
    'Automotive': ['toyota', 'honda', 'bmw', 'mercedes', 'ford', 'car', 'vehicle', 'motor', 'automotive', 'shell', 'petrol', 'gas', 'caltex', 'seaoil', 'fuel'],
    'Finance': ['bank', 'visa', 'mastercard', 'finance', 'insurance', 'loan', 'credit', 'payment', 'rbi', 'reserve bank'],
    'Retail': ['mall', 'shop', 'retail', 'store', 'e-commerce', 'fairprice', 'grocery', 'supermarket'],
    'Tourism': ['tourism', 'travel', 'hotel', 'airline', 'destination', 'holiday', 'abu dhabi tourism'],
    'Entertainment': ['movie', 'film', 'cinema', 'entertainment', 'music', 'game', 'bullet train', 'sony pictures'],
    'Telecommunications': ['telecom', 'mobile network', 'sim', 'data plan', '5g', '4g'],
  };
  
  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        return industry;
      }
    }
  }
  
  return 'Other';
}

function detectCountryFromText(text) {
  const textLower = text.toLowerCase();
  
  const countryKeywords = {
    'Malaysia': ['malaysia', 'kuala lumpur', 'kl', 'malaysian'],
    'Indonesia': ['indonesia', 'indonesian', 'jakarta'],
    'Philippines': ['philippines', 'philippine', 'manila', 'filipino'],
    'India': ['india', 'indian', 'mumbai', 'delhi', 'bangalore', 'jaipur'],
    'Singapore': ['singapore', 'singaporean'],
    'Thailand': ['thailand', 'thai', 'bangkok'],
    'Vietnam': ['vietnam', 'vietnamese', 'hanoi', 'ho chi minh'],
    'UAE': ['uae', 'dubai', 'abu dhabi', 'emirates'],
    'Saudi Arabia': ['saudi', 'riyadh', 'jeddah'],
    'Japan': ['japan', 'japanese', 'tokyo'],
    'South Korea': ['korea', 'korean', 'seoul'],
    'Australia': ['australia', 'australian', 'sydney', 'melbourne'],
    'USA': ['united states', 'usa', 'america', 'new york', 'los angeles'],
    'UK': ['united kingdom', 'uk', 'britain', 'london', 'england'],
  };
  
  for (const [country, keywords] of Object.entries(countryKeywords)) {
    for (const keyword of keywords) {
      if (textLower.includes(keyword)) {
        return country;
      }
    }
  }
  
  return null;
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
    .replace(/&#8212;/g, '—')
    .replace(/&nbsp;/g, ' ');
}

function getDefaultImage(industry) {
  const images = {
    'FMCG': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
    'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    'Automotive': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    'Finance': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    'Retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    'Tourism': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    'Entertainment': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop',
    'Telecommunications': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    'Other': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
  };
  return images[industry] || images['Other'];
}

// Main execution
async function main() {
  const mwCaseStudiesPath = '/Users/vivekanandchoudhari/Downloads/MW Case Studies.xml';
  const lmxCaseStudiesPath = '/Users/vivekanandchoudhari/Downloads/LMX Case Studies.xml';
  
  console.log('Reading WordPress XML files...');
  
  let allCaseStudies = [];
  
  // Parse MW Case Studies
  if (fs.existsSync(mwCaseStudiesPath)) {
    console.log('Parsing MW Case Studies...');
    const mwXml = fs.readFileSync(mwCaseStudiesPath, 'utf-8');
    const mwCaseStudies = parseXML(mwXml);
    console.log(`Found ${mwCaseStudies.length} case studies in MW`);
    allCaseStudies = [...allCaseStudies, ...mwCaseStudies];
  } else {
    console.log('MW Case Studies file not found at:', mwCaseStudiesPath);
  }
  
  // Parse LMX Case Studies
  if (fs.existsSync(lmxCaseStudiesPath)) {
    console.log('Parsing LMX Case Studies...');
    const lmxXml = fs.readFileSync(lmxCaseStudiesPath, 'utf-8');
    const lmxCaseStudies = parseXML(lmxXml);
    console.log(`Found ${lmxCaseStudies.length} case studies in LMX`);
    allCaseStudies = [...allCaseStudies, ...lmxCaseStudies];
  } else {
    console.log('LMX Case Studies file not found at:', lmxCaseStudiesPath);
  }
  
  // Remove duplicates by slug
  const uniqueCaseStudies = [];
  const seenSlugs = new Set();
  for (const cs of allCaseStudies) {
    if (!seenSlugs.has(cs.slug)) {
      seenSlugs.add(cs.slug);
      uniqueCaseStudies.push(cs);
    }
  }
  
  // Sort by date (newest first)
  uniqueCaseStudies.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Mark first 3 as featured
  uniqueCaseStudies.slice(0, 3).forEach(cs => {
    cs.featured = true;
  });
  
  console.log(`\nTotal unique case studies: ${uniqueCaseStudies.length}`);
  
  // Get unique countries and industries
  const countries = [...new Set(uniqueCaseStudies.map(cs => cs.country))].filter(Boolean).sort();
  const industries = [...new Set(uniqueCaseStudies.map(cs => cs.industry))].filter(Boolean).sort();
  
  console.log('\nCountries:', countries.join(', '));
  console.log('Industries:', industries.join(', '));
  
  // Generate TypeScript file
  const outputPath = path.join(__dirname, '../src/data/case-studies.ts');
  
  const tsContent = `// Case Studies data - Auto-generated from WordPress export
// Generated on: ${new Date().toISOString()}
// Total case studies: ${uniqueCaseStudies.length}

export interface CaseStudy {
  slug: string;
  title: string;
  brand: string;
  country: string;
  industry: string;
  partner?: string;
  challenge: string;
  objective: string;
  solution: string;
  results: string;
  content: string;
  featuredImage: string;
  pdfLink?: string;
  date: string;
  featured?: boolean;
}

export const caseStudyCountries = [
  "All",
  ${countries.map(c => `"${c}"`).join(',\n  ')}
];

export const caseStudyIndustries = [
  "All",
  ${industries.map(i => `"${i}"`).join(',\n  ')}
];

export const caseStudies: CaseStudy[] = ${JSON.stringify(uniqueCaseStudies, null, 2)};

// Helper functions
export const getFeaturedCaseStudies = () => caseStudies.filter(cs => cs.featured);

export const getCaseStudyBySlug = (slug: string) => caseStudies.find(cs => cs.slug === slug);

export const getCaseStudiesByCountry = (country: string) => 
  country === 'All' ? caseStudies : caseStudies.filter(cs => cs.country === country);

export const getCaseStudiesByIndustry = (industry: string) => 
  industry === 'All' ? caseStudies : caseStudies.filter(cs => cs.industry === industry);

export const searchCaseStudies = (query: string) => {
  const q = query.toLowerCase();
  return caseStudies.filter(cs => 
    cs.title.toLowerCase().includes(q) ||
    cs.brand.toLowerCase().includes(q) ||
    cs.country.toLowerCase().includes(q) ||
    cs.industry.toLowerCase().includes(q) ||
    cs.challenge.toLowerCase().includes(q) ||
    cs.results.toLowerCase().includes(q)
  );
};

export const getRelatedCaseStudies = (slug: string, industry?: string, limit = 3) => {
  return caseStudies
    .filter(cs => cs.slug !== slug && (industry ? cs.industry === industry : true))
    .slice(0, limit);
};
`;
  
  fs.writeFileSync(outputPath, tsContent);
  console.log(`\nGenerated: ${outputPath}`);
  
  // Print summaries
  console.log('\nCase Studies by Country:');
  const countryCount = {};
  uniqueCaseStudies.forEach(cs => {
    countryCount[cs.country] = (countryCount[cs.country] || 0) + 1;
  });
  Object.entries(countryCount).sort((a, b) => b[1] - a[1]).forEach(([country, count]) => {
    console.log(`  ${country}: ${count}`);
  });
  
  console.log('\nCase Studies by Industry:');
  const industryCount = {};
  uniqueCaseStudies.forEach(cs => {
    industryCount[cs.industry] = (industryCount[cs.industry] || 0) + 1;
  });
  Object.entries(industryCount).sort((a, b) => b[1] - a[1]).forEach(([industry, count]) => {
    console.log(`  ${industry}: ${count}`);
  });
}

main().catch(console.error);
