// Replaces stale "Moving Walls <Product>" phrasing with "MW <Product>" across
// blogPost and pressRelease titles + body content (portable text).
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

function replaceAll(text) {
  let result = text;
  let count = 0;
  for (const [from, to] of REPLACEMENTS) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = result.match(re);
    if (matches) count += matches.length;
    result = result.replace(re, to);
  }
  return { result, count };
}

function replaceInContent(content) {
  if (!Array.isArray(content)) return { newContent: content, count: 0 };
  let totalCount = 0;
  const newContent = content.map((block) => {
    if (block._type !== 'block' || !Array.isArray(block.children)) return block;
    const newChildren = block.children.map((child) => {
      if (typeof child.text !== 'string') return child;
      const { result, count } = replaceAll(child.text);
      if (count > 0) totalCount += count;
      return count > 0 ? { ...child, text: result } : child;
    });
    return { ...block, children: newChildren };
  });
  return { newContent, count: totalCount };
}

async function run() {
  const blogPosts = await client.fetch('*[_type=="blogPost"]{_id, title, content}');
  const pressReleases = await client.fetch('*[_type=="pressRelease"]{_id, title, content}');

  const allDocs = [...blogPosts.map(d => ({ ...d, docType: 'blogPost' })), ...pressReleases.map(d => ({ ...d, docType: 'pressRelease' }))];

  const patches = [];
  let bodyOccurrences = 0;
  let titleOccurrences = 0;

  for (const doc of allDocs) {
    const set = {};
    if (typeof doc.title === 'string') {
      const { result, count } = replaceAll(doc.title);
      if (count > 0) {
        set.title = result;
        titleOccurrences += count;
      }
    }
    const { newContent, count: contentCount } = replaceInContent(doc.content);
    if (contentCount > 0) {
      set.content = newContent;
      bodyOccurrences += contentCount;
    }
    if (Object.keys(set).length > 0) {
      patches.push({ _id: doc._id, docType: doc.docType, oldTitle: doc.title, set });
    }
  }

  console.log(`Documents to patch: ${patches.length}`);
  console.log(`Body occurrences to fix: ${bodyOccurrences}`);
  console.log(`Title occurrences to fix: ${titleOccurrences}`);
  console.log('');

  for (const p of patches) {
    const changedFields = Object.keys(p.set).join(', ');
    console.log(`- [${p.docType}] ${p._id} :: ${p.oldTitle} (patching: ${changedFields})`);
  }

  fs.writeFileSync(path.join(__dirname, 'mw-product-names-patch-plan.json'), JSON.stringify(patches, null, 2));

  const APPLY = process.argv.includes('--apply');
  if (!APPLY) {
    console.log('\nDRY RUN ONLY — no changes committed. Re-run with --apply to commit.');
    return;
  }

  console.log('\nApplying patches...');
  let tx = client.transaction();
  let opCount = 0;
  for (const p of patches) {
    tx = tx.patch(p._id, (patch) => patch.set(p.set));
    opCount++;
    if (opCount % 40 === 0) {
      await tx.commit();
      tx = client.transaction();
    }
  }
  if (opCount % 40 !== 0) {
    await tx.commit();
  }
  console.log(`Committed ${patches.length} document patches.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
