#!/usr/bin/env node
/**
 * Production Readiness Test Script
 * Tests SEO, images, and links for production deployment
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3003';

// Pages to test
const PAGES_TO_TEST = [
  '/',
  '/about',
  '/brands',
  '/agencies',
  '/media-owners',
  '/retail',
  '/finance',
  '/healthcare',
  '/blog',
  '/press-news',
  '/products',
  '/contact',
  '/platform',
  '/mw-planner',
  '/careers',
];

const results = {
  seo: { pass: 0, fail: 0, warnings: 0, details: [] },
  images: { pass: 0, fail: 0, warnings: 0, details: [] },
  links: { pass: 0, fail: 0, warnings: 0, details: [] },
};

async function fetchPage(url) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'ProductionReadinessBot/1.0' }
    });
    if (!response.ok) {
      return { error: `HTTP ${response.status}`, html: null };
    }
    const html = await response.text();
    return { error: null, html };
  } catch (error) {
    return { error: error.message, html: null };
  }
}

function extractMetaTags(html) {
  const tags = {};
  
  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  tags.title = titleMatch ? titleMatch[1] : null;
  
  // Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                   html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  tags.description = descMatch ? descMatch[1] : null;
  
  // OG tags
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  tags.ogTitle = ogTitleMatch ? ogTitleMatch[1] : null;
  
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
  tags.ogDescription = ogDescMatch ? ogDescMatch[1] : null;
  
  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  tags.ogImage = ogImageMatch ? ogImageMatch[1] : null;
  
  // Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  tags.canonical = canonicalMatch ? canonicalMatch[1] : null;
  
  return tags;
}

function extractImages(html) {
  const images = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    const altMatch = match[0].match(/alt=["']([^"']*)["']/i);
    images.push({
      src,
      alt: altMatch ? altMatch[1] : null,
      isSanityCDN: src.includes('cdn.sanity.io'),
      isExternal: src.startsWith('http') && !src.includes('localhost'),
    });
  }
  return images;
}

function extractInternalLinks(html, baseUrl) {
  const links = [];
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    // Only internal links
    if (href.startsWith('/') || href.startsWith(baseUrl)) {
      links.push(href.replace(baseUrl, ''));
    }
  }
  return [...new Set(links)]; // Deduplicate
}

async function testSEO(page, html) {
  const meta = extractMetaTags(html);
  const issues = [];
  
  // Check title
  if (!meta.title) {
    issues.push({ type: 'error', msg: 'Missing <title> tag' });
  } else if (meta.title.length < 30) {
    issues.push({ type: 'warning', msg: `Title too short (${meta.title.length} chars)` });
  } else if (meta.title.length > 60) {
    issues.push({ type: 'warning', msg: `Title too long (${meta.title.length} chars)` });
  }
  
  // Check description
  if (!meta.description) {
    issues.push({ type: 'error', msg: 'Missing meta description' });
  } else if (meta.description.length < 120) {
    issues.push({ type: 'warning', msg: `Description too short (${meta.description.length} chars)` });
  } else if (meta.description.length > 160) {
    issues.push({ type: 'warning', msg: `Description too long (${meta.description.length} chars)` });
  }
  
  // Check OG tags
  if (!meta.ogTitle) {
    issues.push({ type: 'warning', msg: 'Missing og:title' });
  }
  if (!meta.ogDescription) {
    issues.push({ type: 'warning', msg: 'Missing og:description' });
  }
  
  return { page, meta, issues };
}

async function testImages(page, html) {
  const images = extractImages(html);
  const issues = [];
  
  for (const img of images) {
    if (!img.alt && !img.src.includes('icon') && !img.src.includes('logo')) {
      issues.push({ type: 'warning', msg: `Missing alt text: ${img.src.substring(0, 50)}...` });
    }
    
    // Check if Sanity images use CDN
    if (img.src.includes('sanity') && !img.isSanityCDN) {
      issues.push({ type: 'error', msg: `Sanity image not using CDN: ${img.src}` });
    }
  }
  
  const sanityImages = images.filter(i => i.isSanityCDN).length;
  const totalImages = images.length;
  
  return { page, totalImages, sanityImages, issues };
}

async function testInternalLinks(page, html) {
  const links = extractInternalLinks(html, BASE_URL);
  const issues = [];
  const brokenLinks = [];
  
  // Test a sample of links (max 10 per page to avoid too many requests)
  const linksToTest = links.slice(0, 10);
  
  for (const link of linksToTest) {
    if (link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('tel:')) {
      continue;
    }
    
    try {
      const response = await fetch(`${BASE_URL}${link}`, { method: 'HEAD' });
      if (!response.ok && response.status !== 308 && response.status !== 307) {
        brokenLinks.push({ link, status: response.status });
        issues.push({ type: 'error', msg: `Broken link: ${link} (${response.status})` });
      }
    } catch (error) {
      // Ignore connection errors for now
    }
  }
  
  return { page, totalLinks: links.length, testedLinks: linksToTest.length, brokenLinks, issues };
}

async function runTests() {
  console.log('\n🧪 PRODUCTION READINESS TESTS');
  console.log('═'.repeat(50));
  console.log(`Testing against: ${BASE_URL}\n`);
  
  // Test each page
  for (const page of PAGES_TO_TEST) {
    const url = `${BASE_URL}${page}`;
    process.stdout.write(`Testing ${page}... `);
    
    const { error, html } = await fetchPage(url);
    
    if (error) {
      console.log(`❌ ${error}`);
      results.seo.fail++;
      results.seo.details.push({ page, error });
      continue;
    }
    
    // SEO Test
    const seoResult = await testSEO(page, html);
    if (seoResult.issues.filter(i => i.type === 'error').length > 0) {
      results.seo.fail++;
    } else {
      results.seo.pass++;
    }
    results.seo.warnings += seoResult.issues.filter(i => i.type === 'warning').length;
    results.seo.details.push(seoResult);
    
    // Images Test
    const imageResult = await testImages(page, html);
    if (imageResult.issues.filter(i => i.type === 'error').length > 0) {
      results.images.fail++;
    } else {
      results.images.pass++;
    }
    results.images.warnings += imageResult.issues.filter(i => i.type === 'warning').length;
    results.images.details.push(imageResult);
    
    // Links Test
    const linkResult = await testInternalLinks(page, html);
    if (linkResult.brokenLinks.length > 0) {
      results.links.fail++;
    } else {
      results.links.pass++;
    }
    results.links.details.push(linkResult);
    
    console.log('✓');
  }
  
  // Print Summary
  console.log('\n' + '═'.repeat(50));
  console.log('📊 RESULTS SUMMARY');
  console.log('═'.repeat(50));
  
  // SEO Summary
  console.log('\n🔍 SEO VERIFICATION');
  console.log(`   ✅ Pass: ${results.seo.pass}`);
  console.log(`   ❌ Fail: ${results.seo.fail}`);
  console.log(`   ⚠️  Warnings: ${results.seo.warnings}`);
  
  // Images Summary
  console.log('\n🖼️  IMAGE VERIFICATION');
  console.log(`   ✅ Pass: ${results.images.pass}`);
  console.log(`   ❌ Fail: ${results.images.fail}`);
  console.log(`   ⚠️  Warnings: ${results.images.warnings}`);
  
  const totalSanityImages = results.images.details.reduce((sum, d) => sum + d.sanityImages, 0);
  const totalImages = results.images.details.reduce((sum, d) => sum + d.totalImages, 0);
  console.log(`   📷 Sanity CDN images: ${totalSanityImages}/${totalImages}`);
  
  // Links Summary
  console.log('\n🔗 LINK VERIFICATION');
  console.log(`   ✅ Pass: ${results.links.pass}`);
  console.log(`   ❌ Fail: ${results.links.fail}`);
  
  const totalBrokenLinks = results.links.details.reduce((sum, d) => sum + d.brokenLinks.length, 0);
  if (totalBrokenLinks > 0) {
    console.log(`   🔴 Broken links found: ${totalBrokenLinks}`);
    results.links.details.forEach(d => {
      d.brokenLinks.forEach(bl => {
        console.log(`      - ${d.page} → ${bl.link} (${bl.status})`);
      });
    });
  }
  
  // Detailed Issues
  console.log('\n' + '═'.repeat(50));
  console.log('📋 DETAILED ISSUES');
  console.log('═'.repeat(50));
  
  results.seo.details.forEach(d => {
    if (d.issues && d.issues.length > 0) {
      console.log(`\n${d.page}:`);
      d.issues.forEach(i => {
        const icon = i.type === 'error' ? '❌' : '⚠️';
        console.log(`   ${icon} ${i.msg}`);
      });
    }
  });
  
  // Final verdict
  console.log('\n' + '═'.repeat(50));
  const totalFails = results.seo.fail + results.images.fail + results.links.fail;
  if (totalFails === 0) {
    console.log('✅ ALL TESTS PASSED - Ready for production!');
  } else {
    console.log(`⚠️  ${totalFails} issue(s) found - Review before deployment`);
  }
  console.log('═'.repeat(50) + '\n');
}

// Run tests
runTests().catch(console.error);
