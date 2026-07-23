#!/usr/bin/env node
/**
 * Full Sanity CMS <-> Website Sync Check
 * Verifies all content types in Sanity are properly synced to website pages
 */

const https = require('https');
const PROJECT_ID = 'u10im6di';
const DATASET = 'production';

function fetchSanity(query) {
  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(query);
    const options = {
      hostname: `${PROJECT_ID}.api.sanity.io`,
      path: `/v2024-01-01/data/query/${DATASET}?query=${encodedQuery}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error('Failed to parse response: ' + body.substring(0, 200)));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('========================================');
  console.log('  SANITY CMS CONTENT SYNC AUDIT');
  console.log('========================================\n');

  const issues = [];
  const summary = {};

  // 1. Check all document type counts
  const typeCounts = [
    'blogPost', 'caseStudy', 'pressRelease', 'event', 'webinar',
    'ebook', 'product', 'teamMember', 'jobPosition',
    'landingPage', 'location', 'audiencePage', 'industryPage',
    'integration', 'oohFormat', 'companyPage', 'legalPage',
    'testimonial', 'trustBar', 'clientPartners', 'footerConfig',
    'megaMenu', 'office', 'timelineEvent', 'zohoForm', 'contactPage',
    'careersPage', 'helpCenterFaq', 'apiReferencePage', 'communityPage',
    'platformConfig', 'analyticsConfig', 'pageSeo', 'redirectSettings',
    'category', 'author'
  ];

  console.log('--- CONTENT TYPE INVENTORY ---\n');
  
  for (const type of typeCounts) {
    const result = await fetchSanity(`count(*[_type == "${type}"])`);
    const count = result.result || 0;
    summary[type] = count;
    const icon = count === 0 ? '❌' : '✅';
    console.log(`  ${icon} ${type.padEnd(25)} ${count}`);
    
    if (count === 0) {
      issues.push({ type: 'EMPTY_TYPE', content: type, detail: `No documents of type "${type}" found in Sanity` });
    }
  }

  // 2. Check for content with missing required fields
  console.log('\n\n--- DATA QUALITY CHECKS ---\n');

  // Blog posts without slugs
  const blogsNoSlug = await fetchSanity('count(*[_type == "blogPost" && !defined(slug.current)])');
  if (blogsNoSlug.result > 0) {
    console.log(`  ⚠️  Blog Posts missing slug: ${blogsNoSlug.result}`);
    const details = await fetchSanity('*[_type == "blogPost" && !defined(slug.current)]{ _id, title }[0...10]');
    details.result.forEach(d => {
      issues.push({ type: 'MISSING_SLUG', content: 'blogPost', detail: `"${d.title}" (${d._id})` });
      console.log(`     - ${d.title}`);
    });
  } else {
    console.log('  ✅ All Blog Posts have slugs');
  }

  // Blog posts without published status
  const blogsUnpublished = await fetchSanity('count(*[_type == "blogPost" && (isPublished != true || status != "published")])');
  console.log(`  ℹ️  Blog Posts NOT published: ${blogsUnpublished.result} of ${summary.blogPost}`);

  // Case studies without slugs
  const casesNoSlug = await fetchSanity('count(*[_type == "caseStudy" && !defined(slug.current)])');
  if (casesNoSlug.result > 0) {
    console.log(`  ⚠️  Case Studies missing slug: ${casesNoSlug.result}`);
    const details = await fetchSanity('*[_type == "caseStudy" && !defined(slug.current)]{ _id, title }[0...10]');
    details.result.forEach(d => {
      issues.push({ type: 'MISSING_SLUG', content: 'caseStudy', detail: `"${d.title}" (${d._id})` });
      console.log(`     - ${d.title}`);
    });
  } else {
    console.log('  ✅ All Case Studies have slugs');
  }

  // Case studies unpublished
  const casesUnpublished = await fetchSanity('count(*[_type == "caseStudy" && (isPublished != true || status != "published")])');
  console.log(`  ℹ️  Case Studies NOT published: ${casesUnpublished.result} of ${summary.caseStudy}`);

  // Products without names or slugs
  const prodsIssues = await fetchSanity('*[_type == "product" && (!defined(name) || name == "" || !defined(slug.current))]{ _id, name, slug }');
  if (prodsIssues.result.length > 0) {
    console.log(`  ⚠️  Products missing name/slug: ${prodsIssues.result.length}`);
    prodsIssues.result.forEach(p => {
      issues.push({ type: 'MISSING_DATA', content: 'product', detail: `"${p.name || '(no name)'}" - slug: ${p.slug?.current || '(missing)'}` });
      console.log(`     - ${p.name || '(no name)'} | slug: ${p.slug?.current || '(missing)'}`);
    });
  } else {
    console.log('  ✅ All Products have names and slugs');
  }

  // Products inactive
  const prodsInactive = await fetchSanity('*[_type == "product" && isActive != true]{ name, slug }');
  if (prodsInactive.result.length > 0) {
    console.log(`  ℹ️  Products INACTIVE: ${prodsInactive.result.length}`);
    prodsInactive.result.forEach(p => console.log(`     - ${p.name || '(no name)'}`));
  }

  // Locations check
  const locsAll = await fetchSanity('*[_type == "location"]{ country, slug, isActive }');
  const locsInactive = locsAll.result.filter(l => !l.isActive);
  const locsNoSlug = locsAll.result.filter(l => !l.slug?.current);
  if (locsNoSlug.length > 0) {
    console.log(`  ⚠️  Locations missing slug: ${locsNoSlug.length}`);
    locsNoSlug.forEach(l => {
      issues.push({ type: 'MISSING_SLUG', content: 'location', detail: l.country });
      console.log(`     - ${l.country}`);
    });
  }
  if (locsInactive.length > 0) {
    console.log(`  ℹ️  Locations INACTIVE: ${locsInactive.length}`);
    locsInactive.forEach(l => console.log(`     - ${l.country}`));
  }

  // Blog posts without featured images
  const blogsNoImage = await fetchSanity('count(*[_type == "blogPost" && isPublished == true && !defined(featuredImage.asset)])');
  if (blogsNoImage.result > 0) {
    console.log(`  ⚠️  Published Blog Posts without featured image: ${blogsNoImage.result}`);
    const details = await fetchSanity('*[_type == "blogPost" && isPublished == true && !defined(featuredImage.asset)]{ title }[0...5]');
    details.result.forEach(d => {
      issues.push({ type: 'MISSING_IMAGE', content: 'blogPost', detail: d.title });
      console.log(`     - ${d.title}`);
    });
  } else {
    console.log('  ✅ All published Blog Posts have featured images');
  }

  // Blog posts without content body
  const blogsNoContent = await fetchSanity('count(*[_type == "blogPost" && isPublished == true && (!defined(content) || length(content) == 0)])');
  if (blogsNoContent.result > 0) {
    console.log(`  ⚠️  Published Blog Posts without content body: ${blogsNoContent.result}`);
    const details = await fetchSanity('*[_type == "blogPost" && isPublished == true && (!defined(content) || length(content) == 0)]{ title }[0...5]');
    details.result.forEach(d => {
      issues.push({ type: 'MISSING_CONTENT', content: 'blogPost', detail: d.title });
      console.log(`     - ${d.title}`);
    });
  } else {
    console.log('  ✅ All published Blog Posts have content');
  }

  // Case studies without featured images  
  const casesNoImage = await fetchSanity('count(*[_type == "caseStudy" && isPublished == true && !defined(featuredImage.asset)])');
  if (casesNoImage.result > 0) {
    console.log(`  ⚠️  Published Case Studies without featured image: ${casesNoImage.result}`);
    const details = await fetchSanity('*[_type == "caseStudy" && isPublished == true && !defined(featuredImage.asset)]{ title }[0...5]');
    details.result.forEach(d => {
      issues.push({ type: 'MISSING_IMAGE', content: 'caseStudy', detail: d.title });
      console.log(`     - ${d.title}`);
    });
  }

  // Events without dates
  const eventsNoDate = await fetchSanity('count(*[_type == "event" && !defined(startDate)])');
  if (eventsNoDate.result > 0) {
    console.log(`  ⚠️  Events without start date: ${eventsNoDate.result}`);
    issues.push({ type: 'MISSING_DATA', content: 'event', detail: `${eventsNoDate.result} events missing startDate` });
  }

  // 3. WEBSITE PAGE <-> SANITY MAPPING CHECK
  console.log('\n\n--- WEBSITE PAGE vs SANITY DATA MAPPING ---\n');

  // Expected website pages that SHOULD be backed by Sanity data
  const pageToSanityMap = {
    '/blog': { type: 'blogPost', query: 'count(*[_type == "blogPost" && isPublished == true && status == "published"])', min: 1 },
    '/blog/[slug]': { type: 'blogPost', query: 'count(*[_type == "blogPost" && isPublished == true && defined(slug.current)])', min: 1 },
    '/case-studies': { type: 'caseStudy', query: 'count(*[_type == "caseStudy" && isPublished == true && status == "published"])', min: 1 },
    '/press-news': { type: 'pressRelease', query: 'count(*[_type == "pressRelease"])', min: 1 },
    '/events': { type: 'event', query: 'count(*[_type == "event"])', min: 1 },
    '/webinars': { type: 'webinar', query: 'count(*[_type == "webinar"])', min: 1 },
    '/ebooks': { type: 'ebook', query: 'count(*[_type == "ebook"])', min: 1 },
    '/whitepapers': { type: 'whitepaper', query: 'count(*[_type == "whitepaper"])', min: 0 },
    '/careers': { type: 'jobPosition', query: 'count(*[_type == "jobPosition" && isActive == true])', min: 0 },
    '/leadership': { type: 'teamMember', query: 'count(*[_type == "teamMember" && isLeadership == true])', min: 1 },
    '/locations': { type: 'location', query: 'count(*[_type == "location" && isActive == true])', min: 1 },
    '/products': { type: 'product', query: 'count(*[_type == "product" && isActive == true])', min: 1 },
    '/integrations': { type: 'integration', query: 'count(*[_type == "integration"])', min: 1 },
    '/ooh-formats': { type: 'oohFormat', query: 'count(*[_type == "oohFormat"])', min: 1 },
    '/agencies': { type: 'audiencePage', query: 'count(*[_type == "audiencePage" && pageType == "agencies"])', min: 1 },
    '/brands': { type: 'audiencePage', query: 'count(*[_type == "audiencePage" && pageType == "brands"])', min: 1 },
    '/media-owners': { type: 'audiencePage', query: 'count(*[_type == "audiencePage" && pageType == "media-owners"])', min: 1 },
    '/finance': { type: 'industryPage', query: 'count(*[_type == "industryPage" && industry == "finance"])', min: 1 },
    '/retail': { type: 'industryPage', query: 'count(*[_type == "industryPage" && industry == "retail"])', min: 1 },
    '/healthcare': { type: 'industryPage', query: 'count(*[_type == "industryPage" && industry == "healthcare"])', min: 1 },
    '/contact': { type: 'contactPage', query: 'count(*[_type == "contactPage"])', min: 1 },
    '/about (our-story)': { type: 'companyPage', query: 'count(*[_type == "companyPage" && pageType == "our-story"])', min: 1 },
    '/our-journey': { type: 'companyPage', query: 'count(*[_type == "companyPage" && pageType == "our-journey"])', min: 1 },
    '/privacy': { type: 'legalPage', query: 'count(*[_type == "legalPage" && pageType == "privacy"])', min: 1 },
    '/terms': { type: 'legalPage', query: 'count(*[_type == "legalPage" && pageType == "terms"])', min: 1 },
    '/cookies': { type: 'legalPage', query: 'count(*[_type == "legalPage" && pageType == "cookies"])', min: 1 },
    '/help-center': { type: 'helpCenterFaq', query: 'count(*[_type == "helpCenterFaq"])', min: 1 },
    '/community': { type: 'communityPage', query: 'count(*[_type == "communityPage"])', min: 1 },
    '/api-reference': { type: 'apiReferencePage', query: 'count(*[_type == "apiReferencePage"])', min: 1 },
    '/lp/*': { type: 'landingPage', query: 'count(*[_type == "landingPage" && isPublished == true])', min: 1 },
  };

  // Product pages
  const productSlugs = ['mw-planner', 'mw-activate', 'mw-influence', 'mw-measure', 'mw-studio', 'mw-science', 'mw-market'];
  for (const slug of productSlugs) {
    pageToSanityMap[`/${slug}`] = {
      type: 'product',
      query: `count(*[_type == "product" && slug.current == "${slug}" && isActive == true])`,
      min: 1
    };
  }

  for (const [page, config] of Object.entries(pageToSanityMap)) {
    const result = await fetchSanity(config.query);
    const count = result.result || 0;
    
    if (count < config.min) {
      console.log(`  ❌ ${page.padEnd(30)} → ${config.type.padEnd(20)} MISSING (${count} docs, need >= ${config.min})`);
      issues.push({ type: 'PAGE_NO_DATA', content: page, detail: `Expected ${config.type} data, found ${count} documents` });
    } else if (count === 0 && config.min === 0) {
      console.log(`  ⚠️  ${page.padEnd(30)} → ${config.type.padEnd(20)} EMPTY (0 docs, page may show empty state)`);
    } else {
      console.log(`  ✅ ${page.padEnd(30)} → ${config.type.padEnd(20)} OK (${count} docs)`);
    }
  }

  // 4. Check global/singleton content
  console.log('\n\n--- GLOBAL/SINGLETON CONTENT ---\n');
  
  const singletons = {
    'Mega Menu': 'count(*[_type == "megaMenu"])',
    'Footer Config': 'count(*[_type == "footerConfig"])',
    'Trust Bar': 'count(*[_type == "trustBar"])',
    'Client Partners': 'count(*[_type == "clientPartners"])',
    'Analytics Config': 'count(*[_type == "analyticsConfig"])',
    'Redirect Settings': 'count(*[_type == "redirectSettings"])',
    'Platform Config': 'count(*[_type == "platformConfig"])',
    'Careers Page Config': 'count(*[_type == "careersPage"])',
  };

  for (const [name, query] of Object.entries(singletons)) {
    const result = await fetchSanity(query);
    const count = result.result || 0;
    if (count === 0) {
      console.log(`  ❌ ${name.padEnd(25)} NOT CONFIGURED`);
      issues.push({ type: 'MISSING_SINGLETON', content: name, detail: 'No document found in Sanity' });
    } else {
      console.log(`  ✅ ${name.padEnd(25)} OK (${count})`);
    }
  }

  // 5. Check SEO coverage
  console.log('\n\n--- SEO COVERAGE ---\n');
  
  const expectedSeoPages = [
    'home', 'about', 'blog', 'case-studies', 'press-news', 'events',
    'webinars', 'ebooks', 'whitepapers', 'careers', 'contact', 'leadership',
    'locations', 'products', 'integrations', 'ooh-formats', 'agencies',
    'brands', 'media-owners', 'finance', 'retail', 'healthcare', 'platform',
    'community', 'help-center', 'api-reference', 'privacy', 'terms', 'cookies',
    'our-story', 'our-journey', 'search', 'sitemap', 'documentation',
    'mw-planner', 'mw-activate', 'mw-influence', 'mw-measure', 'mw-studio',
    'mw-science', 'mw-market', 'movinghearts', 'series-c-funding',
    'adtech-company-of-year', 'ai-powered-audience-targeting',
    'london-headquarters', 'transit-partnership', 'privacy-first-measurement'
  ];

  const seoPages = await fetchSanity('*[_type == "pageSeo"]{ pageId }');
  const seoPageIds = (seoPages.result || []).map(p => p.pageId);
  
  const missingSeo = expectedSeoPages.filter(p => !seoPageIds.includes(p));
  const extraSeo = seoPageIds.filter(p => !expectedSeoPages.includes(p));
  
  if (missingSeo.length > 0) {
    console.log(`  ⚠️  Pages WITHOUT SEO config (${missingSeo.length}):`);
    missingSeo.forEach(p => {
      console.log(`     - ${p}`);
      issues.push({ type: 'MISSING_SEO', content: p, detail: 'No pageSeo document' });
    });
  } else {
    console.log('  ✅ All expected pages have SEO configuration');
  }
  
  if (extraSeo.length > 0) {
    console.log(`  ℹ️  Extra SEO configs not matched: ${extraSeo.join(', ')}`);
  }

  // 6. Check Zoho Forms
  console.log('\n\n--- ZOHO FORM INTEGRATIONS ---\n');
  const zohoForms = await fetchSanity('*[_type == "zohoForm"]{ name, formType, isActive, assignedPages }');
  if (zohoForms.result.length === 0) {
    console.log('  ❌ No Zoho Forms configured');
    issues.push({ type: 'MISSING_FORMS', content: 'zohoForm', detail: 'No forms for lead capture' });
  } else {
    zohoForms.result.forEach(f => {
      const active = f.isActive !== false ? '✅' : '⚠️ ';
      console.log(`  ${active} ${f.name} (${f.formType || 'unknown'}) - Pages: ${(f.assignedPages || []).join(', ') || 'none'}`);
    });
  }

  // 7. Final Summary
  console.log('\n\n========================================');
  console.log('  SYNC AUDIT SUMMARY');
  console.log('========================================\n');

  const criticalIssues = issues.filter(i => ['PAGE_NO_DATA', 'MISSING_SINGLETON', 'EMPTY_TYPE'].includes(i.type));
  const warningIssues = issues.filter(i => ['MISSING_SLUG', 'MISSING_IMAGE', 'MISSING_CONTENT', 'MISSING_DATA'].includes(i.type));
  const seoIssues = issues.filter(i => i.type === 'MISSING_SEO');

  console.log(`  🔴 CRITICAL (page has no data):     ${criticalIssues.length}`);
  console.log(`  🟡 WARNINGS (data quality):          ${warningIssues.length}`);
  console.log(`  🔵 SEO GAPS:                         ${seoIssues.length}`);
  console.log(`  📊 TOTAL ISSUES:                     ${issues.length}`);

  if (criticalIssues.length > 0) {
    console.log('\n  🔴 CRITICAL ISSUES (pages showing empty/broken):');
    criticalIssues.forEach(i => {
      console.log(`     ❌ ${i.content}: ${i.detail}`);
    });
  }

  if (warningIssues.length > 0) {
    console.log('\n  🟡 DATA QUALITY WARNINGS:');
    warningIssues.forEach(i => {
      console.log(`     ⚠️  [${i.content}] ${i.detail}`);
    });
  }

  if (issues.length === 0) {
    console.log('\n  🎉 All Sanity content is properly synced to the website!');
  }
}

main().catch(console.error);
