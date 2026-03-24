/**
 * Replace all stg.movingwalls.com URLs with www.movingwalls.com in Sanity CMS
 * Handles: Portable Text markDefs (hyperlinks), string URL fields
 * Run with: node scripts/fix-staging-urls.js
 */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
});

const STAGING_HOST = 'stg.movingwalls.com';
const PRODUCTION_HOST = 'www.movingwalls.com';

function replaceInString(str) {
  if (typeof str !== 'string') return str;
  return str.replace(new RegExp(`https?://${STAGING_HOST.replace(/\./g, '\\.')}`, 'g'), `https://${PRODUCTION_HOST}`);
}

// Deep-walk a Portable Text array and fix all markDefs[].href values
function fixPortableText(blocks) {
  if (!Array.isArray(blocks)) return { blocks, changed: false };
  let changed = false;
  const fixed = blocks.map(block => {
    if (!block || !Array.isArray(block.markDefs)) return block;
    const newMarkDefs = block.markDefs.map(md => {
      if (md.href && md.href.includes(STAGING_HOST)) {
        changed = true;
        return { ...md, href: replaceInString(md.href) };
      }
      return md;
    });
    return { ...block, markDefs: newMarkDefs };
  });
  return { blocks: fixed, changed };
}

async function fixStagingUrls() {
  console.log('🔧 Replacing stg.movingwalls.com → www.movingwalls.com in Sanity CMS...\n');

  // --- PART 1: Fix Portable Text hyperlinks in content/body fields ---
  const contentTypes = ['blogPost', 'caseStudy', 'pressRelease', 'ebook', 'event', 'webinar', 'landingPage', 'product', 'staticPage', 'whitepaper'];

  // Fetch ALL documents of these types that have portable text fields
  const docs = await client.fetch(`
    *[_type in $types]{
      _id, _type, title, "slug": slug.current,
      content, body, challenge, solution, results
    }
  `, { types: contentTypes });

  console.log(`📄 Fetched ${docs.length} documents to scan.\n`);

  let patchCount = 0;
  let urlCount = 0;
  const ptFields = ['content', 'body', 'challenge', 'solution', 'results'];

  for (const doc of docs) {
    const patches = {};
    let docChanged = false;

    for (const field of ptFields) {
      if (Array.isArray(doc[field])) {
        const { blocks, changed } = fixPortableText(doc[field]);
        if (changed) {
          patches[field] = blocks;
          docChanged = true;
          // Count how many URLs were fixed
          const origLinks = doc[field].flatMap(b => (b.markDefs || []).filter(m => m.href && m.href.includes(STAGING_HOST)));
          urlCount += origLinks.length;
        }
      }
    }

    if (docChanged) {
      patchCount++;
      const slug = doc.slug || doc._id;
      console.log(`  ✏️  Patching [${doc._type}] ${doc.title || doc._id} (/${slug})`);
      await client.patch(doc._id).set(patches).commit();
    }
  }

  console.log(`\n📝 Fixed ${urlCount} hyperlinks across ${patchCount} documents.\n`);

  // --- PART 2: Fix string URL fields ---
  const stringFields = ['heroImage', 'viewUrl', 'pdfFileUrl', 'ctaLink', 'formUrl', 'contactFormUrl', 'applicationFormUrl'];

  const fieldDocs = await client.fetch(`
    *[
      defined(slug) &&
      (
        heroImage match "stg.movingwalls*" ||
        featuredImage match "stg.movingwalls*" ||
        viewUrl match "stg.movingwalls*" ||
        pdfFileUrl match "stg.movingwalls*" ||
        ctaLink match "stg.movingwalls*" ||
        formUrl match "stg.movingwalls*" ||
        contactFormUrl match "stg.movingwalls*" ||
        applicationFormUrl match "stg.movingwalls*"
      )
    ]{_id, _type, title, "slug": slug.current, heroImage, featuredImage, viewUrl, pdfFileUrl, ctaLink, formUrl, contactFormUrl, applicationFormUrl}
  `);

  let fieldPatchCount = 0;
  let fieldUrlCount = 0;

  for (const doc of fieldDocs) {
    const patches = {};
    const allFields = [...stringFields, 'featuredImage'];

    for (const field of allFields) {
      if (typeof doc[field] === 'string' && doc[field].includes(STAGING_HOST)) {
        patches[field] = replaceInString(doc[field]);
        fieldUrlCount++;
      }
    }

    if (Object.keys(patches).length > 0) {
      fieldPatchCount++;
      console.log(`  ✏️  Patching URL fields in [${doc._type}] ${doc.title || doc._id}`);
      for (const [key, val] of Object.entries(patches)) {
        console.log(`     ${key}: ${doc[key]} → ${val}`);
      }
      await client.patch(doc._id).set(patches).commit();
    }
  }

  if (fieldPatchCount > 0) {
    console.log(`\n🔗 Fixed ${fieldUrlCount} URL fields across ${fieldPatchCount} documents.\n`);
  } else {
    console.log('🔗 No string URL fields needed fixing.\n');
  }

  console.log('✅ All staging URLs replaced with production URLs!');
  console.log(`   Total: ${urlCount + fieldUrlCount} URLs fixed across ${patchCount + fieldPatchCount} documents.`);
}

fixStagingUrls().catch(console.error);
