// Publishes the 46 one-pager drafts created by pilot-onepager-drafts.js /
// migrate-onepager-drafts.js / migrate-airasia-final.js. For each doc: takes the
// current draft content, writes it as the published document, then deletes the draft
// — the standard Sanity "publish" operation, done via the API as one atomic transaction
// per document. Safe to re-run: a doc with no remaining draft is skipped.
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
  const draftIds = await client.fetch(
    `*[_type == "caseStudy" && _id in path("drafts.**") && defined(challenge)]._id`
  );

  if (draftIds.length === 0) {
    console.log('No one-pager drafts found to publish.');
    return;
  }

  console.log(`Found ${draftIds.length} one-pager drafts to publish.\n`);

  let ok = 0;
  let failed = 0;
  for (const draftId of draftIds) {
    const publishedId = draftId.replace(/^drafts\./, '');
    try {
      const draftDoc = await client.getDocument(draftId);
      const publishedDoc = { ...draftDoc, _id: publishedId };
      delete publishedDoc._rev;

      await client
        .transaction()
        .createOrReplace(publishedDoc)
        .delete(draftId)
        .commit();

      console.log(`Published: ${publishedId} — ${draftDoc.title}`);
      ok++;
    } catch (err) {
      console.error(`FAILED: ${draftId}`, err.message);
      failed++;
    }
  }

  console.log(`\nDone. ${ok} published, ${failed} failed.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
