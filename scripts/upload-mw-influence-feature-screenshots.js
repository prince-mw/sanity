// One-off: uploads real MW Influence product screenshots for the "Automated Workflow",
// "Asset Management" and "Verification & Telemetry" feature points, replacing the earlier
// hand-built mock UI panels.
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
  { path: 'C:\\Users\\admin\\Desktop\\Dashboard.png', filename: 'mw-influence-dashboard.png' },
  { path: 'C:\\Users\\admin\\Desktop\\Creatives management.png', filename: 'mw-influence-creatives-management.png' },
  { path: 'C:\\Users\\admin\\Desktop\\campaign performance.png', filename: 'mw-influence-campaign-performance.png' },
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
