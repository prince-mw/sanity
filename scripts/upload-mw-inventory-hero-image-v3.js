// One-off: uploads the new MW Inventory hero image ("Ring Ring, Calling All Billboards").
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

async function run() {
  const buffer = fs.readFileSync('C:\\Users\\admin\\Desktop\\MW Inventory Hero.png');
  const asset = await client.assets.upload('image', buffer, { filename: 'mw-inventory-hero-image-v3.png' });
  console.log(`mw-inventory-hero-image-v3.png -> ${asset.url}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
