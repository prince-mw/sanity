// One-off: uploads Kritika's 3 real MW Inventory product screenshots to Sanity's asset
// library and prints back the resulting CDN URLs, for hardcoding into the corresponding
// feature components (mirrors how mockData.ts already hardcodes a static image URL).
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
  { path: 'C:\\Users\\admin\\Desktop\\Manage Your Supply With Confidence.png', filename: 'mw-inventory-manage-supply-confidence.png' },
  { path: 'C:\\Users\\admin\\Desktop\\Know What You Can Sell.png', filename: 'mw-inventory-know-what-you-can-sell.png' },
  { path: 'C:\\Users\\admin\\Desktop\\Control How Inventory Gets Sold.png', filename: 'mw-inventory-control-how-inventory-sold.png' },
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
