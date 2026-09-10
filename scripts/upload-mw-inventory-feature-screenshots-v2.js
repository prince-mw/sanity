// One-off: uploads the updated MW Inventory product screenshots for the
// "Manage Your Supply With Confidence" and "Know What You Can Sell" sections.
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
  { path: 'C:\\Users\\admin\\Desktop\\Dashboard (Inventory Management).png', filename: 'mw-inventory-dashboard-v2.png' },
  { path: 'C:\\Users\\admin\\Desktop\\Audience Reach Performance.png', filename: 'mw-inventory-availability-v2.png' },
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
