/**
 * Fix remaining staging URL text in Portable Text children spans
 * (for cases where stg.movingwalls.com appears as literal text, not just as a link href)
 * Run with: node scripts/fix-staging-text.js
 */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
});

const STAGING = 'stg.movingwalls.com';
const PRODUCTION = 'www.movingwalls.com';

function fixTextInBlocks(blocks) {
  if (!Array.isArray(blocks)) return { blocks, changed: false };
  let changed = false;
  const fixed = blocks.map(block => {
    if (!block) return block;
    const newBlock = { ...block };

    // Fix text in children spans
    if (Array.isArray(block.children)) {
      newBlock.children = block.children.map(child => {
        if (child.text && typeof child.text === 'string' && child.text.includes(STAGING)) {
          changed = true;
          return { ...child, text: child.text.replace(new RegExp(STAGING.replace(/\./g, '\\.'), 'g'), PRODUCTION) };
        }
        return child;
      });
    }
    return newBlock;
  });
  return { blocks: fixed, changed };
}

async function fixStagingText() {
  console.log('🔧 Fixing staging URL text in Portable Text spans...\n');

  // Fetch the 2 known documents + any others that might have text content with staging URLs
  const docs = await client.fetch(`
    *[
      _type in ["blogPost", "caseStudy", "pressRelease", "ebook", "event", "webinar", "staticPage", "whitepaper"] &&
      (pt::text(content) match "stg.movingwalls*" || pt::text(body) match "stg.movingwalls*")
    ]{_id, _type, title, "slug": slug.current, content, body}
  `);

  console.log(`Found ${docs.length} documents with staging text in body/content.\n`);

  let patchCount = 0;
  for (const doc of docs) {
    const patches = {};
    let docChanged = false;

    for (const field of ['content', 'body']) {
      if (Array.isArray(doc[field])) {
        const { blocks, changed } = fixTextInBlocks(doc[field]);
        if (changed) {
          patches[field] = blocks;
          docChanged = true;
        }
      }
    }

    if (docChanged) {
      patchCount++;
      console.log(`  ✏️  Fixing text in [${doc._type}] ${doc.title} (/${doc.slug})`);
      await client.patch(doc._id).set(patches).commit();
    }
  }

  console.log(`\n✅ Fixed text spans in ${patchCount} documents.`);
}

fixStagingText().catch(console.error);
