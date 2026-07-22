// Permanently deletes the two real Sanity documents backing pages being removed from the site:
//   - the apiReferencePage document (backs /documentation)
//   - the pageSeo("api-reference") document (SEO metadata for /api-reference)
// Confirmed via scripts/preview-page-removal-deletions.js — these are the ONLY real documents
// involved; /whitepapers has 0 documents and the 6 press-release-slug pages have 0 matching
// pressRelease documents (all existing pressRelease docs have a null articleSlug), so there is
// nothing else to delete for those.
//
// Run: SANITY_API_TOKEN=<your write token> node scripts/delete-documentation-and-apiref-seo.js
const { createClient } = require('@sanity/client');

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Missing SANITY_API_TOKEN env var. Run as:');
  console.error('  SANITY_API_TOKEN=<your write token> node scripts/delete-documentation-and-apiref-seo.js');
  process.exit(1);
}

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
});

const IDS_TO_DELETE = [
  'rOv2v1AtN64guwYLFmK4Xl', // apiReferencePage — backs /documentation
  'pageSeo-api-reference', // pageSeo doc for /api-reference
];

async function main() {
  for (const id of IDS_TO_DELETE) {
    const doc = await client.fetch('*[_id == $id][0]{ _id, _type, title, pageId }', { id });
    if (!doc) {
      console.log(`Skipping ${id} — not found (already deleted?)`);
      continue;
    }
    console.log(`Deleting ${doc._type} ${doc._id} (${doc.title || doc.pageId || 'untitled'})...`);
    await client.delete(id);
    // Also delete the draft counterpart if one exists, so no orphaned draft lingers in Studio.
    const draftId = `drafts.${id}`;
    const draft = await client.fetch('*[_id == $id][0]{ _id }', { id: draftId });
    if (draft) {
      console.log(`  Also deleting draft ${draftId}...`);
      await client.delete(draftId);
    }
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
