// One-off: backfills the new `translations` reference field for the two blog post pairs
// that were previously wired up via the hardcoded BLOG_LANGUAGE_GROUPS map (now removed).
// Sets the reference on the English post only — getBlogLanguageGroups() resolves it
// bidirectionally, so the Chinese post doesn't need its own reference back.
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

const PAIRS = [
  ['international-dooh-advertising-chinese-brands', 'international-dooh-advertising-chinese-brands-zh'],
  ['how-advertisers-can-make-dooh-more-measurable-china', 'how-advertisers-can-make-dooh-more-measurable-china-zh'],
];

async function run() {
  for (const [enSlug, zhSlug] of PAIRS) {
    const enPost = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{_id}`, { slug: enSlug });
    const zhPost = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{_id}`, { slug: zhSlug });

    if (!enPost || !zhPost) {
      console.error(`Missing doc for pair ${enSlug} / ${zhSlug} — en:${!!enPost} zh:${!!zhPost}`);
      continue;
    }

    await client
      .patch(enPost._id)
      .setIfMissing({ translations: [] })
      .append('translations', [{ _type: 'reference', _ref: zhPost._id, _key: zhPost._id }])
      .commit();

    console.log(`Linked ${enSlug} -> ${zhSlug}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
