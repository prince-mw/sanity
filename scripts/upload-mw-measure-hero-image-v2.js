// One-off: uploads the high-res (1200x1200) replacement for the MW Measure hero image —
// the earlier 366x340 export was too small and pixelated once the hero visual was enlarged.
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
  const buffer = fs.readFileSync('C:\\Users\\admin\\Desktop\\MW Measure Hero Geometry Representation.png');
  const asset = await client.assets.upload('image', buffer, { filename: 'mw-measure-hero-image-v2.png' });
  console.log(`mw-measure-hero-image-v2.png -> ${asset.url}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
