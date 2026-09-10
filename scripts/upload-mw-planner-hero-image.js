// One-off: uploads MW Planner's bundled hero image (from Kritika's second AI Studio export,
// "mw-planner---data-backed-ooh-media-planning.zip") to Sanity's asset library.
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

const IMAGE_PATH = 'C:\\Users\\admin\\AppData\\Local\\Temp\\claude\\c--Users-admin-Desktop-MW-Website-sanity\\8b537cd2-4c41-4e4a-8a48-9d80e7ca8aad\\scratchpad\\mw-planner-v2\\src\\assets\\images\\hero_chevron_visual_1787655834491.jpg';

async function run() {
  const buffer = fs.readFileSync(IMAGE_PATH);
  const asset = await client.assets.upload('image', buffer, { filename: 'mw-planner-hero-chevron-visual.jpg' });
  console.log(`mw-planner-hero-chevron-visual.jpg -> ${asset.url}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
