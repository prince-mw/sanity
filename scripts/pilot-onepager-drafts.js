// One-off script: creates DRAFT-only versions of 3 pilot case studies with the new
// one-pager fields, for local preview via /api/preview. Does NOT touch the published
// documents — the live site is unaffected until someone clicks Publish in Studio.
const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Minimal .env.local loader (no dotenv dependency in this project)
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

const PILOTS = [
  {
    id: 'e9fc6d81-3275-4456-b576-cec53f1eee9b', // skincare Thailand
    title: 'A Leading Skincare Brand Drove Measurable Funnel Uplift With OOH in Thailand',
    titleHighlight: 'Measurable Funnel Uplift',
    categoryBadge: 'measurement-brand-lift',
    metaLine: 'Bangkok, Thailand · Apr 1–15, 2026 · Brand Lift Study · with a global social platform, for a leading skincare brand',
    challenge:
      'In the crowded beauty category, the brand needed proof that OOH produced real, incremental movement down the funnel, measured rather than assumed. Impressions alone could not justify the investment.',
    whatWeDid: [
      'Extended the live digital campaign into high-impact OOH across Bangkok',
      'Targeted 18 to 44s with beauty, wellness, fashion and lifestyle affinities',
      'Built an exposed vs control Brand Lift Study from day one',
      'Held creative and a single product message consistent across both channels',
    ],
    whyItWorked:
      'One product message, held consistent across OOH and digital, and measured against a true control from day one.',
    metrics: [
      { label: 'Brand awareness vs control', value: '+10pt' },
      { label: 'Brand favorability vs control', value: '+16pt' },
      { label: 'Purchase intent vs control', value: '+13pt' },
      { label: 'Campaign memorability & brand attribution', value: '82%' },
    ],
  },
  {
    id: '8bb80ddc-c16c-4534-a62f-79e51d0b2eeb', // Addig
    title: 'Addig built the foundation for a programmatic-ready OOH network',
    titleHighlight: 'programmatic-ready OOH network',
    categoryBadge: 'platform-adoption',
    metaLine: 'Hungary · Platform deployment & infrastructure readiness',
    challenge:
      'Addig wanted to build a scalable programmatic ecosystem, but partner networks operated across different hardware and CMS environments, creating compatibility and deployment challenges that could slow inventory onboarding.',
    whatWeDid: [
      "Deployed a white-labelled Moving Walls platform with SSP and DSP capabilities under Addig's own brand",
      'Tested partner network hardware and developed a new software build for Raspberry Pi-based environments',
      'Prepared CMS integration and device onboarding workflows across partner networks',
      'Worked with technical, product and customer success teams to resolve compatibility issues and prepare devices for deployment',
    ],
    whyItWorked:
      'By addressing platform, hardware and CMS requirements together, Addig could build its programmatic infrastructure while reducing technical barriers to future inventory onboarding.',
  },
  {
    id: '0793fc3d-0c46-4bfe-99f7-13b5f24d8d2e', // Oreo
    title: 'Oreo Used High-Frequency DOOH to Strengthen Brand Recall in Jakarta',
    titleHighlight: 'Brand Recall',
    categoryBadge: 'campaign',
    metaLine: 'Jakarta, Indonesia · 31-day DOOH campaign · Moving Walls Planner',
    challenge:
      'Oreo wanted to strengthen top-of-mind recall among young, urban consumers in Jakarta by building sustained visibility in a high-traffic environment rather than relying on broad, fragmented reach.',
    whatWeDid: [
      'Selected high-traffic DOOH screens around Lotte Shopping Avenue, Jalan Satrio',
      'Used Moving Walls Planner to plan the campaign placements',
      'Ran the campaign for 31 days to build repeated exposure',
      'Targeted young urban audiences, with 25–34 as the largest age segment',
    ],
    whyItWorked:
      "A concentrated location strategy and sustained frequency kept Oreo visible within the same everyday consumer journey, reinforcing familiarity and recall over time.",
    metrics: [
      { label: 'Location', value: 'Jakarta' },
      { label: 'Largest audience age group', value: '25–34' },
      { label: 'Campaign Duration', value: '31 Days' },
    ],
  },
];

async function run() {
  for (const pilot of PILOTS) {
    const published = await client.getDocument(pilot.id);
    if (!published) {
      console.error(`Published doc not found: ${pilot.id}`);
      continue;
    }
    const draftId = `drafts.${pilot.id}`;
    const draftDoc = {
      ...published,
      _id: draftId,
      title: pilot.title,
      titleHighlight: pilot.titleHighlight,
      categoryBadge: pilot.categoryBadge,
      metaLine: pilot.metaLine,
      challenge: pilot.challenge,
      whatWeDid: pilot.whatWeDid,
      whyItWorked: pilot.whyItWorked,
      ...(pilot.metrics ? { metrics: pilot.metrics } : {}),
    };
    delete draftDoc._rev;
    await client.createOrReplace(draftDoc);
    console.log(`Draft created: ${draftId} (${published.title})`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
