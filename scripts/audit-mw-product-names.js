// Read-only audit: scans blogPost and pressRelease body content for stale
// "Moving Walls <Product>" phrasing that should be the short "MW <Product>" form.
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

const REPLACEMENTS = [
  ['Moving Walls Planner', 'MW Planner'],
  ['Moving Walls Studio', 'MW Studio'],
  ['Moving Walls Measure', 'MW Measure'],
  ['Moving Walls Influence', 'MW Influence'],
  ['Moving Walls Activate', 'MW Activate'],
  ['Moving Walls Market', 'MW Market'],
  ['Moving Walls Science', 'MW Science'],
];

function blockText(block) {
  if (!block || block._type !== 'block' || !Array.isArray(block.children)) return '';
  return block.children.map((c) => c.text || '').join('');
}

function countInDoc(content) {
  if (!Array.isArray(content)) return {};
  const fullText = content.map(blockText).join('\n');
  const counts = {};
  for (const [from] of REPLACEMENTS) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = fullText.match(re);
    if (matches && matches.length) counts[from] = matches.length;
  }
  return counts;
}

async function run() {
  const blogPosts = await client.fetch('*[_type=="blogPost"]{_id, title, "slug": slug.current, content}');
  const pressReleases = await client.fetch('*[_type=="pressRelease"]{_id, title, "slug": slug.current, content}');

  const report = { blogPost: [], pressRelease: [] };
  const totals = {};

  for (const doc of blogPosts) {
    const counts = countInDoc(doc.content);
    if (Object.keys(counts).length) {
      report.blogPost.push({ _id: doc._id, title: doc.title, slug: doc.slug, counts });
      for (const [k, v] of Object.entries(counts)) totals[k] = (totals[k] || 0) + v;
    }
  }
  for (const doc of pressReleases) {
    const counts = countInDoc(doc.content);
    if (Object.keys(counts).length) {
      report.pressRelease.push({ _id: doc._id, title: doc.title, slug: doc.slug, counts });
      for (const [k, v] of Object.entries(counts)) totals[k] = (totals[k] || 0) + v;
    }
  }

  console.log(`Scanned ${blogPosts.length} blog posts, ${pressReleases.length} press releases.\n`);
  console.log('=== Matches by document ===');
  console.log(JSON.stringify(report, null, 2));
  console.log('\n=== Totals by phrase ===');
  console.log(JSON.stringify(totals, null, 2));
  const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0);
  console.log(`\nGrand total occurrences: ${grandTotal}`);
  console.log(`Documents affected: ${report.blogPost.length} blog posts, ${report.pressRelease.length} press releases`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
