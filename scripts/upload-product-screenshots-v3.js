// One-off: re-uploads the edited (same-filename) product screenshots for all 4 products
// from C:\Users\admin\Desktop\new-website\Products — replacing yesterday's v2 uploads.
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

const SRC = 'C:\\Users\\admin\\Desktop\\new-website\\Products';

const FILES = [
  // MW Measure
  { path: `${SRC}\\MW Measure\\Campaign Insights.png`, filename: 'mw-measure-campaign-insights-v3.png' },
  { path: `${SRC}\\MW Measure\\brand lift studies and impact measurement.png`, filename: 'mw-measure-brand-lift-v3.png' },
  { path: `${SRC}\\MW Measure\\AI Analyzer.png`, filename: 'mw-measure-ai-analyser-v3.png' },
  { path: `${SRC}\\MW Measure\\Dashboard (Campaign Performance).png`, filename: 'mw-measure-dashboard-v3.png' },
  // MW Inventory
  { path: `${SRC}\\MW Inventory\\Dashboard (Inventory Management).png`, filename: 'mw-inventory-dashboard-v3.png' },
  { path: `${SRC}\\MW Inventory\\Audience Reach Performance.png`, filename: 'mw-inventory-availability-v3.png' },
  // MW Planner
  { path: `${SRC}\\MW Planner\\Audience Reach Performance-planner.png`, filename: 'mw-planner-audience-reach-v3.png' },
  { path: `${SRC}\\MW Planner\\Budget Tracker.png`, filename: 'mw-planner-budget-tracker-v3.png' },
  { path: `${SRC}\\MW Planner\\Dashboard (Plan Overview).png`, filename: 'mw-planner-dashboard-overview-v3.png' },
  // MW Influence
  { path: `${SRC}\\MW Influence\\Dashboard.png`, filename: 'mw-influence-dashboard-v3.png' },
  { path: `${SRC}\\MW Influence\\Creatives management.png`, filename: 'mw-influence-creatives-management-v3.png' },
  { path: `${SRC}\\MW Influence\\campaign performance.png`, filename: 'mw-influence-campaign-performance-v3.png' },
];

async function run() {
  const results = {};
  for (const file of FILES) {
    const buffer = fs.readFileSync(file.path);
    const asset = await client.assets.upload('image', buffer, { filename: file.filename });
    console.log(`${file.filename} -> ${asset.url}`);
    results[file.filename] = asset.url;
  }
  fs.writeFileSync(path.join(__dirname, 'product-screenshots-v3-urls.json'), JSON.stringify(results, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
