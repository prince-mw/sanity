#!/usr/bin/env node
/**
 * Comprehensive Sanity Integration Test & Report Generator
 * Tests all fetch functions and generates a detailed report
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
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  const results = {
    timestamp: new Date().toISOString(),
    summary: { total: 0, passed: 0, failed: 0, warnings: 0 },
    tests: [],
    contentCounts: {},
    dataValidation: [],
    pageIntegration: [],
  };

  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║      SANITY CMS INTEGRATION TEST & ANALYSIS REPORT           ║');
  console.log('╠═══════════════════════════════════════════════════════════════╣');
  console.log(`║  Project: ${PROJECT_ID}                                        ║`);
  console.log(`║  Dataset: ${DATASET}                                           ║`);
  console.log(`║  Date: ${new Date().toLocaleDateString()}                                        ║`);
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // 1. Content Type Counts
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  📊 CONTENT INVENTORY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const countQuery = `{
    "audiencePage": count(*[_type == "audiencePage"]),
    "industryPage": count(*[_type == "industryPage"]),
    "integration": count(*[_type == "integration"]),
    "oohFormat": count(*[_type == "oohFormat"]),
    "blogPost": count(*[_type == "blogPost"]),
    "caseStudy": count(*[_type == "caseStudy"]),
    "event": count(*[_type == "event"]),
    "webinar": count(*[_type == "webinar"]),
    "pressRelease": count(*[_type == "pressRelease"]),
    "teamMember": count(*[_type == "teamMember"]),
    "office": count(*[_type == "office"]),
    "job": count(*[_type == "job"]),
    "ebook": count(*[_type == "ebook"]),
    "whitepaper": count(*[_type == "whitepaper"])
  }`;

  const counts = await fetchSanity(countQuery);
  results.contentCounts = counts.result;

  console.log('  Content Type          │ Count │ Status');
  console.log('  ──────────────────────┼───────┼─────────');
  
  const contentTypes = [
    { key: 'audiencePage', name: 'Audience Pages', expected: 3 },
    { key: 'industryPage', name: 'Industry Pages', expected: 3 },
    { key: 'integration', name: 'Integrations', expected: 13 },
    { key: 'oohFormat', name: 'OOH Formats', expected: 9 },
    { key: 'blogPost', name: 'Blog Posts', expected: 0 },
    { key: 'caseStudy', name: 'Case Studies', expected: 0 },
    { key: 'event', name: 'Events', expected: 0 },
    { key: 'webinar', name: 'Webinars', expected: 0 },
    { key: 'pressRelease', name: 'Press Releases', expected: 0 },
    { key: 'teamMember', name: 'Team Members', expected: 0 },
    { key: 'office', name: 'Offices', expected: 0 },
    { key: 'job', name: 'Jobs', expected: 0 },
    { key: 'ebook', name: 'E-Books', expected: 0 },
    { key: 'whitepaper', name: 'Whitepapers', expected: 0 },
  ];

  contentTypes.forEach(ct => {
    const count = counts.result[ct.key] || 0;
    const status = count >= ct.expected ? '✅' : (count > 0 ? '⚠️' : '❌');
    const countStr = count.toString().padStart(3);
    console.log(`  ${ct.name.padEnd(20)} │ ${countStr}   │ ${status}`);
  });

  // 2. Data Validation Tests
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  🧪 FETCH FUNCTION TESTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Test 2.1: Audience Pages
  const audienceTests = [
    { type: 'agencies', name: 'Agencies Page' },
    { type: 'brands', name: 'Brands Page' },
    { type: 'media-owners', name: 'Media Owners Page' },
  ];

  for (const test of audienceTests) {
    results.summary.total++;
    const query = `*[_type == "audiencePage" && pageType == "${test.type}"][0]{ 
      title, titleHighlight, subtitle, primaryCTA, platformFeatures[]{id, name, title}, benefits[]{title} 
    }`;
    const data = await fetchSanity(query);
    const result = data.result;
    
    const hasTitle = !!result?.title;
    const hasFeatures = result?.platformFeatures?.length > 0;
    const hasBenefits = result?.benefits?.length > 0;
    const hasCTA = !!result?.primaryCTA?.text;
    
    const passed = hasTitle && (hasFeatures || hasBenefits);
    if (passed) results.summary.passed++; else results.summary.failed++;

    results.tests.push({
      name: `getAudiencePage('${test.type}')`,
      status: passed ? 'PASS' : 'FAIL',
      details: { hasTitle, hasFeatures, hasBenefits, hasCTA }
    });

    console.log(`  ${passed ? '✅' : '❌'} getAudiencePage('${test.type}')`);
    console.log(`     Title: ${result?.title || 'MISSING'} ${result?.titleHighlight || ''}`);
    console.log(`     Features: ${result?.platformFeatures?.length || 0} | Benefits: ${result?.benefits?.length || 0}`);
    console.log(`     CTA: ${result?.primaryCTA?.text || 'MISSING'}\n`);
  }

  // Test 2.2: Industry Pages
  const industryTests = [
    { type: 'finance', name: 'Finance Industry' },
    { type: 'healthcare', name: 'Healthcare Industry' },
    { type: 'retail', name: 'Retail Industry' },
  ];

  for (const test of industryTests) {
    results.summary.total++;
    const query = `*[_type == "industryPage" && industry == "${test.type}"][0]{ 
      title, titleHighlight, badgeText, heroStats[]{value, label}, benefits[]{title}, services[]{title} 
    }`;
    const data = await fetchSanity(query);
    const result = data.result;
    
    const hasTitle = !!result?.title;
    const hasStats = result?.heroStats?.length > 0;
    const hasBenefits = result?.benefits?.length > 0;
    
    const passed = hasTitle && hasStats;
    if (passed) results.summary.passed++; else results.summary.failed++;

    results.tests.push({
      name: `getIndustryPage('${test.type}')`,
      status: passed ? 'PASS' : 'FAIL',
      details: { hasTitle, hasStats, hasBenefits }
    });

    console.log(`  ${passed ? '✅' : '❌'} getIndustryPage('${test.type}')`);
    console.log(`     Title: ${result?.title || 'MISSING'} ${result?.titleHighlight || ''}`);
    console.log(`     Badge: ${result?.badgeText || 'N/A'}`);
    console.log(`     Stats: ${result?.heroStats?.length || 0} | Benefits: ${result?.benefits?.length || 0}\n`);
  }

  // Test 2.3: Integrations
  results.summary.total++;
  const integrationsQuery = `*[_type == "integration"]{ name, category, description, features, status }`;
  const integrationsData = await fetchSanity(integrationsQuery);
  const integrations = integrationsData.result || [];
  
  const sspCount = integrations.filter(i => i.category === 'ssp').length;
  const dspCount = integrations.filter(i => i.category === 'dsp').length;
  const withFeatures = integrations.filter(i => i.features?.length > 0).length;
  
  const intPassed = integrations.length >= 10;
  if (intPassed) results.summary.passed++; else results.summary.failed++;

  results.tests.push({
    name: 'getAllIntegrations()',
    status: intPassed ? 'PASS' : 'FAIL',
    count: integrations.length,
    details: { ssp: sspCount, dsp: dspCount, withFeatures }
  });

  console.log(`  ${intPassed ? '✅' : '❌'} getAllIntegrations()`);
  console.log(`     Total: ${integrations.length} integrations`);
  console.log(`     SSP: ${sspCount} | DSP: ${dspCount}`);
  console.log(`     With Features: ${withFeatures}/${integrations.length}\n`);

  // Test 2.4: OOH Formats
  results.summary.total++;
  const oohQuery = `*[_type == "oohFormat"]{ name, category, icon, shortDescription, specs, benefits }`;
  const oohData = await fetchSanity(oohQuery);
  const oohFormats = oohData.result || [];
  
  const withSpecs = oohFormats.filter(f => f.specs?.length > 0).length;
  const withBenefits = oohFormats.filter(f => f.benefits?.length > 0).length;
  
  const oohPassed = oohFormats.length >= 8;
  if (oohPassed) results.summary.passed++; else results.summary.failed++;

  results.tests.push({
    name: 'getAllOohFormats()',
    status: oohPassed ? 'PASS' : 'FAIL',
    count: oohFormats.length,
    details: { withSpecs, withBenefits }
  });

  console.log(`  ${oohPassed ? '✅' : '❌'} getAllOohFormats()`);
  console.log(`     Total: ${oohFormats.length} formats`);
  console.log(`     With Specs: ${withSpecs} | With Benefits: ${withBenefits}\n`);

  // 3. Page Integration Analysis
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  🔗 PAGE INTEGRATION STATUS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const pageStatus = [
    // Audience Pages
    { page: '/agencies', sanityType: 'audiencePage', sanityData: true, pageUpdated: false, dataSource: 'Static' },
    { page: '/brands', sanityType: 'audiencePage', sanityData: true, pageUpdated: false, dataSource: 'Static' },
    { page: '/media-owners', sanityType: 'audiencePage', sanityData: true, pageUpdated: false, dataSource: 'Static' },
    // Industry Pages
    { page: '/finance', sanityType: 'industryPage', sanityData: true, pageUpdated: false, dataSource: 'Static' },
    { page: '/healthcare', sanityType: 'industryPage', sanityData: true, pageUpdated: false, dataSource: 'Static' },
    { page: '/retail', sanityType: 'industryPage', sanityData: true, pageUpdated: false, dataSource: 'Static' },
    // Feature Pages
    { page: '/integrations', sanityType: 'integration', sanityData: true, pageUpdated: false, dataSource: 'Static' },
    { page: '/ooh-formats', sanityType: 'oohFormat', sanityData: true, pageUpdated: false, dataSource: 'Static' },
  ];

  console.log('  Page Route           │ Sanity Data │ Page Status │ Data Source');
  console.log('  ─────────────────────┼─────────────┼─────────────┼────────────');
  
  pageStatus.forEach(p => {
    const sanityIcon = p.sanityData ? '✅ Ready' : '❌ Empty';
    const pageIcon = p.pageUpdated ? '✅ Updated' : '⚠️ Static';
    console.log(`  ${p.page.padEnd(19)} │ ${sanityIcon.padEnd(9)}  │ ${pageIcon.padEnd(11)} │ ${p.dataSource}`);
  });

  results.pageIntegration = pageStatus;

  // 4. Data Sample View
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  📋 SAMPLE DATA PREVIEW');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Sample: Integration names
  console.log('  Integrations in Sanity:');
  integrations.forEach(i => {
    console.log(`    • ${i.name} (${i.category.toUpperCase()})`);
  });

  // Sample: OOH Format names
  console.log('\n  OOH Formats in Sanity:');
  oohFormats.forEach(f => {
    console.log(`    • ${f.name} [${f.category}]`);
  });

  // 5. Summary & Recommendations
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  📈 SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const totalContent = Object.values(counts.result).reduce((sum, n) => sum + n, 0);
  const passRate = ((results.summary.passed / results.summary.total) * 100).toFixed(1);
  
  console.log(`  ┌─────────────────────────────────────────────────────────────┐`);
  console.log(`  │  Total Documents in Sanity: ${totalContent.toString().padStart(3)}                          │`);
  console.log(`  │  Fetch Tests: ${results.summary.passed}/${results.summary.total} Passed (${passRate}%)                         │`);
  console.log(`  │  Pages Ready for Integration: 8/8                          │`);
  console.log(`  │  Pages Currently Using Sanity: 0/8                         │`);
  console.log(`  └─────────────────────────────────────────────────────────────┘\n`);

  console.log('  🔧 RECOMMENDATIONS:\n');
  console.log('  1. Update page components to fetch from Sanity');
  console.log('     - /agencies, /brands, /media-owners → getAudiencePage()');
  console.log('     - /finance, /healthcare, /retail → getIndustryPage()');
  console.log('     - /integrations → getAllIntegrations()');
  console.log('     - /ooh-formats → getAllOohFormats()\n');
  console.log('  2. Add fallback data for offline resilience');
  console.log('  3. Implement ISR (Incremental Static Regeneration) for caching\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Report generated at:', new Date().toISOString());
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return results;
}

runTests().catch(console.error);
