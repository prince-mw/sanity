// One-off: uploads real MW Planner product screenshots for the "Build Plans Around Your
// Audience", "Make Better Use of Your Budget" and "Present Plans With Confidence" feature
// points, replacing the earlier hand-built mock UI panels.
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
  { path: 'C:\\Users\\admin\\Desktop\\Audience Reach Performance-planner.png', filename: 'mw-planner-audience-reach.png' },
  { path: 'C:\\Users\\admin\\Desktop\\Budget Tracker.png', filename: 'mw-planner-budget-tracker.png' },
  { path: 'C:\\Users\\admin\\Desktop\\Dashboard (Plan Overview).png', filename: 'mw-planner-dashboard-overview.png' },
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
