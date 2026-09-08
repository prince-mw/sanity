// One-off: uploads Kritika's 4 real MW Measure product screenshots (from the second
// AI Studio export) to Sanity's asset library and prints back the resulting CDN URLs,
// for hardcoding into CampaignInsightsSection.tsx's FeatureScreenshot components.
const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const envPath = path.join(__dirname, '..', '.env.local');
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && !process.env[match[1]]) {
    process.env[match[1]] = match[2].trim();
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const SCRATCHPAD = 'C:\\Users\\admin\\AppData\\Local\\Temp\\claude\\c--Users-admin-Desktop-MW-Website-sanity\\8b537cd2-4c41-4e4a-8a48-9d80e7ca8aad\\scratchpad\\mw-measure-v2';

const FILES = [
  { path: path.join(SCRATCHPAD, 'feature1.png'), filename: 'mw-measure-campaign-insights.png' },
  { path: path.join(SCRATCHPAD, 'feature2.png'), filename: 'mw-measure-brand-lift-summary.png' },
  { path: path.join(SCRATCHPAD, 'feature3.png'), filename: 'mw-measure-ai-analyser.png' },
  { path: path.join(SCRATCHPAD, 'feature4.png'), filename: 'mw-measure-dashboard.png' },
];

async function run() {
  for (const file of FILES) {
    const buffer = fs.readFileSync(file.path);
    const asset = await client.assets.upload('image', buffer, { filename: file.filename });
    console.log(`${file.filename} -> ${asset.url}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
