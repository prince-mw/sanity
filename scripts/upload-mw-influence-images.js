// One-off: downloads the AI Studio mockup's images for MW Influence (Kritika's mockup,
// "MW Influence.zip") from their temporary googleusercontent URLs and re-uploads them to
// Sanity's asset library, so the new page can reference stable cdn.sanity.io URLs instead
// of the export's short-lived source links.
const fs = require('fs');
const path = require('path');
const https = require('https');
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

// Note: most of this mockup's image URLs (lh3.googleusercontent.com/aida/...) are
// session-scoped to whoever generated them in AI Studio and 403 for us — only the
// aida-public/ ones are fetchable. The rest need real screenshots from Kritika, same
// as MW Inventory and MW Measure ended up using.
const IMAGES = [
  { filename: 'mw-influence-row-proof-of-play.png', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiLwcRf7J855GzIXooqLCEfXMAoEF04cWFV8qqx9yYMSf5R2l2KC4xURMRnTFc2hf2VQ01KflVZlEtpVWdGFPrV1vWqXFc4PuS6mIVGlTz4IUZcMC05SjYwjHW_xqWQfl7nTK0Clcof4z0XrDLAO8dd8kTCC7ymlgbT8bl8smtMmCxMeZZHsUQPfZxga07b3cMO7UwPBfqrCdaXhFtmU35pjP0uOkQfmA5yt2p4XyprCU-cnVC_Qhq' },
  { filename: 'mw-influence-tech-stack-diagram.png', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiOGROzm5GMrPXLV9mYODGXwWtdwsVM4HalXGLcgWNkJiq9z_OWquI5yXrkykhyAOSX3HfHxD_VQxJ5zBCnPc2u-eZ_PD_8jafnovqBXnS8RRaFH4gwcy0ob32YbmvmV4e6d2w_ldIdqRT72ZYR0EjQnqkR9DeBSMu0uyG9RFNcmPLDZCVUhVxtisFXl5f0NcHgFYprsYJsdth0eLsMT-LPhNiSIhcGq54M7sunvCRM62wGt0-k5Z73DOU6dM66WaXwvJ04-niYWb-hA' },
];

function download(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://aistudio.google.com/',
      },
    };
    https.get(url, options, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`GET ${url} -> ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  for (const img of IMAGES) {
    const buffer = await download(img.url);
    const asset = await client.assets.upload('image', buffer, { filename: img.filename });
    console.log(`${img.filename} -> ${asset.url}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
