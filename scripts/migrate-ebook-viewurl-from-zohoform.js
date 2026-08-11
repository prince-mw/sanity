// One-time migration: copy each e-book's linked Zoho form URL onto its own
// viewUrl field, then unset the zohoForm reference (being retired from the schema).
// Run with: SANITY_API_TOKEN=... node scripts/migrate-ebook-viewurl-from-zohoform.js

const { createClient } = require('@sanity/client');

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('SANITY_API_TOKEN is not set in the environment.');
  process.exit(1);
}

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  token,
  apiVersion: '2025-01-01',
});

async function migrate() {
  const ebooks = await client.fetch(
    `*[_type == "ebook" && defined(zohoForm._ref)]{_id, title, "formUrl": zohoForm->formUrl}`
  );

  console.log(`Found ${ebooks.length} e-book(s) with a Download Form reference.\n`);

  let updated = 0;
  let skipped = 0;

  for (const ebook of ebooks) {
    if (!ebook.formUrl) {
      console.log(`SKIP  ${ebook.title} (${ebook._id}) — linked form has no Zoho Form URL`);
      skipped++;
      continue;
    }

    await client.patch(ebook._id).set({ viewUrl: ebook.formUrl }).unset(['zohoForm']).commit();
    console.log(`OK    ${ebook.title} (${ebook._id}) -> ${ebook.formUrl}`);
    updated++;
  }

  console.log(`\nDone. Updated ${updated}, skipped ${skipped}.`);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
