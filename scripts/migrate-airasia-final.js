// Final case study: AirAsia "7 million free seats" — held back earlier because its deck
// slide had an unresolved "[[Market]]" placeholder. Dg confirmed: use "Global".
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

const ENTRY = {
  id: 'NUzgRk9h7jKjntS8q00Ym0',
  title: 'AirAsia reached 4.1 million people and its 7 million free seats went in days',
  titleHighlight: '4.1 million people',
  categoryBadge: 'campaign',
  metaLine: 'Global · Programmatic DOOH · dynamic countdown creative',
  challenge:
    'AirAsia had 7 million free seats to move and needed the promotion to register with the right travellers quickly. The promo needed to register with the right travellers, in the right places, fast.',
  whatWeDid: [
    "Ran programmatic DOOH across high-traffic locations frequented by AirAsia's key segments",
    'Built dynamic countdown creative showing how many free seats were left',
    "Tailored creative per location against that area's demographics and behaviour",
    'Used real-time data to time delivery, and optimised in flight to bring CPM down',
  ],
  whyItWorked:
    'The countdown turned a standing offer into a live deadline, so every screen carried its own reason to book now rather than later.',
  metrics: [
    { label: 'Total audience reached', value: '4.1M' },
    { label: 'Unique reach, ahead of expectations', value: '500K' },
    { label: 'Free seats promoted, claimed within days', value: '7M' },
  ],
};

async function run() {
  const published = await client.getDocument(ENTRY.id);
  if (!published) {
    console.error('NOT FOUND:', ENTRY.id);
    return;
  }
  const draftDoc = {
    ...published,
    _id: `drafts.${ENTRY.id}`,
    title: ENTRY.title,
    titleHighlight: ENTRY.titleHighlight,
    categoryBadge: ENTRY.categoryBadge,
    metaLine: ENTRY.metaLine,
    challenge: ENTRY.challenge,
    whatWeDid: ENTRY.whatWeDid,
    whyItWorked: ENTRY.whyItWorked,
    metrics: ENTRY.metrics,
  };
  delete draftDoc._rev;
  await client.createOrReplace(draftDoc);
  console.log(`OK: drafts.${ENTRY.id} — ${ENTRY.title}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
