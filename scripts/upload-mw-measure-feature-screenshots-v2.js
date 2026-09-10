// One-off: uploads Kritika's real MW Measure product screenshots (replacing the earlier
// AI-generated placeholder cards) for the "Deep Campaign Insights at Scale" section.
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

const FILES = [
  { path: 'C:\\Users\\admin\\Downloads\\Campaign Insights.png', filename: 'mw-measure-campaign-insights-v2.png' },
  { path: 'C:\\Users\\admin\\Downloads\\brand lift studies and impact measurement.png', filename: 'mw-measure-brand-lift-v2.png' },
  { path: 'C:\\Users\\admin\\Downloads\\AI Analyzer.png', filename: 'mw-measure-ai-analyser-v2.png' },
  { path: 'C:\\Users\\admin\\Downloads\\Dashboard (Campaign Performance).png', filename: 'mw-measure-dashboard-v2.png' },
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
