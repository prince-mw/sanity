// Read-only preview of exactly what would be deleted when removing:
// /whitepapers (all whitepaper docs), /documentation (apiReferencePage doc),
// /api-reference (pageSeo doc), and 6 press-release pages (pressRelease docs).
// Run: node scripts/preview-page-removal-deletions.js
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const PRESS_SLUGS = [
  'series-c-funding',
  'london-headquarters',
  'ai-powered-audience-targeting',
  'privacy-first-measurement',
  'transit-partnership',
  'adtech-company-of-year',
];

async function main() {
  console.log('=== Whitepapers (ALL will be deleted) ===');
  const whitepapers = await client.fetch('*[_type == "whitepaper"]{ _id, title, "slug": slug.current }');
  console.log(`Count: ${whitepapers.length}`);
  whitepapers.forEach((w) => console.log(`  - ${w._id}  |  ${w.title}  |  /${w.slug || ''}`));

  console.log('\n=== apiReferencePage (backs /documentation) ===');
  const apiRefDocs = await client.fetch('*[_type == "apiReferencePage"]{ _id, title }');
  console.log(`Count: ${apiRefDocs.length}`);
  apiRefDocs.forEach((d) => console.log(`  - ${d._id}  |  ${d.title}`));

  console.log('\n=== pageSeo("api-reference") ===');
  const apiRefSeo = await client.fetch('*[_type == "pageSeo" && pageId == "api-reference"]{ _id, pageId }');
  console.log(`Count: ${apiRefSeo.length}`);
  apiRefSeo.forEach((d) => console.log(`  - ${d._id}  |  pageId: ${d.pageId}`));

  console.log('\n=== Press releases (6 dedicated-article pages) ===');
  for (const slug of PRESS_SLUGS) {
    const docs = await client.fetch(
      '*[_type == "pressRelease" && articleSlug.current == $slug]{ _id, title, "articleSlug": articleSlug.current, hasFullArticle, isPublished }',
      { slug }
    );
    console.log(`\n  articleSlug: ${slug}  (found ${docs.length})`);
    docs.forEach((d) => console.log(`    - ${d._id}  |  ${d.title}  |  hasFullArticle: ${d.hasFullArticle}  |  isPublished: ${d.isPublished}`));
    if (docs.length === 0) console.log('    (none found — nothing to delete for this slug)');
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
