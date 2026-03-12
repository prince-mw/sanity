#!/usr/bin/env node
/**
 * Verify Sanity CMS content
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
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    req.end();
  });
}

async function verify() {
  console.log('Verifying Sanity content...\n');
  
  const counts = await fetchSanity('{ "audiencePage": count(*[_type == "audiencePage"]), "industryPage": count(*[_type == "industryPage"]), "integration": count(*[_type == "integration"]), "oohFormat": count(*[_type == "oohFormat"]) }');
  console.log('Content counts:');
  console.log(JSON.stringify(counts.result, null, 2));
  
  // Sample audience page
  const agencies = await fetchSanity('*[_type == "audiencePage" && pageType == "agencies"][0]{ title, titleHighlight, subtitle, primaryCTA, platformFeatures[]{id, name, title} }');
  console.log('\nAgencies page sample:');
  console.log(JSON.stringify(agencies.result, null, 2));
  
  // Sample industry page  
  const finance = await fetchSanity('*[_type == "industryPage" && industry == "finance"][0]{ title, titleHighlight, badgeText, heroStats }');
  console.log('\nFinance page sample:');
  console.log(JSON.stringify(finance.result, null, 2));
  
  // Sample integration
  const integration = await fetchSanity('*[_type == "integration"][0]{ name, category, description, features }');
  console.log('\nFirst integration:');
  console.log(JSON.stringify(integration.result, null, 2));
}

verify();
