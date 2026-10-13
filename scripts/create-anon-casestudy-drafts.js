// One-off script: creates DRAFT-only case studies from scripts/anon-casestudies-oct2026.js.
// Nothing goes live until the drafts are published (scripts/publish-onepager-drafts.js or Studio).
//
// Usage: node scripts/create-anon-casestudy-drafts.js <photo-dir> [slide,slide,...]
//   <photo-dir> holds s01.jpg, s02.jpg … (photo extracted from each slide)
//   optional slide list limits the run, e.g. "1,11,27" for the pilots
const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
const CASES = require('./anon-casestudies-oct2026');

// Minimal .env.local loader (no dotenv dependency in this project)
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

const [photoDir, only] = process.argv.slice(2);
if (!photoDir) {
  console.error('Usage: node scripts/create-anon-casestudy-drafts.js <photo-dir> [slides]');
  process.exit(1);
}
const onlySlides = only ? only.split(',').map(Number) : null;

const key = (i) => `k${i}${Math.random().toString(36).slice(2, 8)}`;

async function run() {
  for (const cs of CASES) {
    if (onlySlides && !onlySlides.includes(cs.slide)) continue;
    const id = `case-study-anon-${cs.slug}`;

    const photo = path.join(photoDir, `s${String(cs.slide).padStart(2, '0')}.jpg`);
    const asset = await client.assets.upload('image', fs.createReadStream(photo), {
      filename: `${cs.slug}.jpg`,
    });

    await client.createOrReplace({
      _id: `drafts.${id}`,
      _type: 'caseStudy',
      isPublished: true,
      status: 'published',
      publishedAt: `${cs.publishedAt}T04:30:00.000Z`,
      title: cs.title,
      slug: { _type: 'slug', current: cs.slug },
      industry: cs.industry,
      location: cs.location,
      featuredImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      titleHighlight: cs.titleHighlight,
      categoryBadge: cs.categoryBadge,
      metaLine: cs.metaLine,
      challenge: cs.challenge,
      whatWeDid: cs.whatWeDid,
      whyItWorked: cs.whyItWorked,
      metrics: cs.metrics.map((m, i) => ({ _key: key(i), ...m })),
      seo: { _type: 'seo', ...cs.seo },
    });
    console.log(`Draft: slide ${cs.slide} → ${cs.slug}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
