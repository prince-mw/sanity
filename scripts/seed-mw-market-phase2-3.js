#!/usr/bin/env node
/**
 * MW Market — Phase 2 & 3 CMS Seed
 * Patches the mw-market product document with all missing fields:
 *   Phase 2: heroStats, painPoints, stats, benefits, testimonials
 *   Phase 3: detailPageSections (packages, inventory), sampleLocations
 */

const https = require('https');

const TOKEN = 'skzWqNrd9gVclCzZ5lCqkB7001eELcKxoGqcrdEcnptysBG2llbIRIYsaSZFpkdXHhjIltR4tsxEJlGrlvviDRkVQuT7JozlQ8Cm3SLbbWgqzZtiiNqMftcrRXzKABCWrJdymtgakhSwDBqk23lCxEu3cATa2AayhCsHZyDbRFPseSIBq9UM';
const PROJECT_ID = 'u10im6di';
const DATASET = 'production';
const DOC_ID = '4WosXPXvlMgq3tPqrTdU4P'; // mw-market product

function mutate(mutations) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ mutations });
    const options = {
      hostname: `${PROJECT_ID}.api.sanity.io`,
      path: `/v2024-01-01/data/mutate/${DATASET}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Parse error: ' + data.substring(0, 300))); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('===========================================');
  console.log('  MW Market — Phase 2 & 3 CMS Seed');
  console.log('===========================================\n');

  const patch = {
    id: DOC_ID,
    set: {

      // ── PHASE 2: Hero Stats ─────────────────────────────────────────────
      heroStats: [
        { _key: 'hs1', value: '100K+', label: 'Verified Media Sites' },
        { _key: 'hs2', value: '10B+',  label: 'Audience Data Points' },
        { _key: 'hs3', value: '147+',  label: 'Countries Covered' },
        { _key: 'hs4', value: '30+',   label: 'Currencies Supported' },
      ],

      // ── PHASE 2: Comparison Table (painPoints) ──────────────────────────
      painPointsTitle: 'Stop Manual Buying. Start Campaigns in Minutes.',
      painPointsSubtitle: 'Traditional OOH buying is slow, fragmented, and hard to scale. MW Market simplifies the process so you can launch campaigns with speed and confidence.',
      painPoints: [
        {
          _key: 'pp1',
          title: 'Contract Flexibility',
          beforeState: 'Long contracts cause unnecessary advertising costs.',
          afterState: 'Remove the cost barrier with short-term contracts of a minimum of 7 days. Only advertise when you need to.',
        },
        {
          _key: 'pp2',
          title: 'Hyperlocal Targeting',
          beforeState: 'Advertise big with deep impression, but no store visits.',
          afterState: 'Hyperlocal targeting allows you to buy billboards close to your outlet.',
        },
        {
          _key: 'pp3',
          title: 'Campaign Speed',
          beforeState: 'Slow back-and-forth communication with publishers.',
          afterState: 'Launch campaigns in days, not weeks, with a self-serve dashboard.',
        },
        {
          _key: 'pp4',
          title: 'Performance Transparency',
          beforeState: 'Unclear results.',
          afterState: 'Track performance with real-time insights.',
        },
      ],

      // ── PHASE 2: Access the Market — stats ─────────────────────────────
      stats: [
        { _key: 'st1', value: '100K+', label: 'Verified Media Sites' },
        { _key: 'st2', value: '10B+',  label: 'Audience Data Points' },
        { _key: 'st3', value: '147+',  label: 'Countries Covered' },
        { _key: 'st4', value: '30+',   label: 'Currencies Supported' },
      ],

      // ── PHASE 2: Access the Market — bullets ───────────────────────────
      benefits: [
        'Works across multiple markets and formats',
        'Supports digital, static, and transit inventory',
        'Enables fast campaign activation with minimal effort',
        'Brings planning, buying, and measurement into one flow',
      ],

      // ── PHASE 2: Testimonials ───────────────────────────────────────────
      testimonials: [
        {
          _key: 'tm1',
          quote: 'MW Market transformed how we buy OOH. What used to take weeks of negotiation now takes minutes. The transparency and real-time tracking are game-changers.',
          author: 'Sarah Chen',
          role: 'Head of Media, Retail Brand',
          company: 'Asia Pacific',
        },
        {
          _key: 'tm2',
          quote: 'We launched a hyperlocal campaign across 12 cities in one afternoon. The self-serve platform is intuitive and the results were immediately measurable.',
          author: 'James Okafor',
          role: 'Digital Marketing Director',
          company: 'FMCG Company',
        },
        {
          _key: 'tm3',
          quote: 'The packaged deals saved us hours of planning. We got premium inventory at transparent pricing and saw a 40% uplift in store footfall within the first week.',
          author: 'Priya Sharma',
          role: 'Campaign Manager',
          company: 'QSR Chain',
        },
      ],

      // ── PHASE 3: detailPageSections (keep finalCTA + add packages + inventory) ──
      detailPageSections: [
        {
          _key: '6d5d8f94cf49',
          _type: 'contentSection',
          sectionKey: 'finalCTA',
          sectionTitle: 'Launch Your Campaign in Minutes',
          sectionSubtitle: 'From discovery to live campaign — everything you need in one platform.',
          items: [
            { _key: 'e33c3a29ae79', title: 'Global Coverage',   description: 'Access 100,000+ verified media sites across global markets, powered by 10B+ audience data points.' },
            { _key: 'b9cc5b346fc7', title: 'Multi-Currency',    description: 'Pay in multiple currencies with secure transactions.' },
            { _key: '99f0798e6d6f', title: 'Instant Booking',   description: 'Book billboards in seconds with real-time availability across global inventory.' },
            { _key: '39557c6dcee7', title: 'Live Analytics',    description: 'Track impressions, movement, and ROI with real-time audience measurement.' },
          ],
        },
        {
          _key: 'packages001',
          _type: 'contentSection',
          sectionKey: 'packages',
          sectionTitle: 'Ready-to-Launch Campaign Packages',
          sectionSubtitle: 'Pre-built packages for faster activation with proven inventory combinations.',
          items: [
            { _key: 'pkg1', title: 'Hyperlocal Starter',      description: 'Perfect for store launches',          detail: '10–20 screens',   metric: '7–14 days',  metricLabel: 'Near your outlet' },
            { _key: 'pkg2', title: 'City Domination',         description: 'Own the conversation citywide',       detail: '50–100 screens',  metric: '14–30 days', metricLabel: 'High-traffic zones' },
            { _key: 'pkg3', title: 'Regional Blitz',          description: 'Multi-market reach at scale',         detail: '100–250 screens', metric: '30 days',    metricLabel: 'Across 3–5 cities' },
            { _key: 'pkg4', title: 'Brand Awareness Bundle',  description: 'Maximum visibility, minimum effort',  detail: '250+ screens',    metric: 'Flexible',   metricLabel: 'Prime locations' },
          ],
        },
        {
          _key: 'inventory001',
          _type: 'contentSection',
          sectionKey: 'inventory',
          sectionTitle: 'High-Impact Locations, Ready to Book',
          sectionSubtitle: 'Curated premium billboard locations across key markets.',
          items: [],
        },
      ],

      // ── PHASE 3: Sample Locations (Featured Inventory section) ──────────
      sampleLocations: [
        { _key: 'sl1', name: 'Times Square',              type: 'Digital LED',          impressions: '1.2M/week', reach: '48x14 ft', frequency: 24, cost: '', cpm: '', traffic: 'New York',   demographics: 'USA',       peakHours: '24/7' },
        { _key: 'sl2', name: 'Piccadilly Circus',         type: 'Digital Screen',       impressions: '900K/week', reach: '60x20 ft', frequency: 24, cost: '', cpm: '', traffic: 'London',     demographics: 'UK',        peakHours: '24/7' },
        { _key: 'sl3', name: 'Orchard Road',              type: 'Digital Billboard',    impressions: '650K/week', reach: '40x12 ft', frequency: 24, cost: '', cpm: '', traffic: 'Singapore',  demographics: 'Singapore', peakHours: '8am–10pm' },
        { _key: 'sl4', name: 'Sheikh Zayed Road',         type: 'LED Billboard',        impressions: '800K/week', reach: '50x16 ft', frequency: 24, cost: '', cpm: '', traffic: 'Dubai',      demographics: 'UAE',       peakHours: '24/7' },
        { _key: 'sl5', name: 'Bandra-Kurla Complex',      type: 'Digital Screen',       impressions: '700K/week', reach: '36x12 ft', frequency: 24, cost: '', cpm: '', traffic: 'Mumbai',     demographics: 'India',     peakHours: '7am–10pm' },
        { _key: 'sl6', name: 'Harbour Bridge Precinct',   type: 'Static Billboard',     impressions: '500K/week', reach: '48x16 ft', frequency: 24, cost: '', cpm: '', traffic: 'Sydney',     demographics: 'Australia', peakHours: '7am–9pm' },
        { _key: 'sl7', name: 'Sunset Boulevard',          type: 'Digital LED',          impressions: '750K/week', reach: '42x14 ft', frequency: 24, cost: '', cpm: '', traffic: 'Los Angeles', demographics: 'USA',      peakHours: '24/7' },
        { _key: 'sl8', name: 'Shibuya Crossing',          type: 'Large Format Digital', impressions: '2.1M/week', reach: '80x30 ft', frequency: 24, cost: '', cpm: '', traffic: 'Tokyo',      demographics: 'Japan',     peakHours: '24/7' },
      ],
    },
  };

  console.log('Patching mw-market document...\n');
  try {
    const result = await mutate([{ patch }]);

    if (result.results) {
      console.log('✅ Patch applied successfully!');
      console.log(`   Document: ${result.results[0]?.id}`);
      console.log(`   Operation: ${result.results[0]?.operation}`);
    } else if (result.error) {
      console.error('❌ Error:', result.error.description || result.error);
      process.exit(1);
    } else {
      console.log('Response:', JSON.stringify(result, null, 2));
    }
  } catch (err) {
    console.error('❌ Request failed:', err.message);
    process.exit(1);
  }

  console.log('\n===========================================');
  console.log('  Fields seeded:');
  console.log('===========================================');
  console.log('  Phase 2:');
  console.log('    ✅ heroStats (4 KPI cards)');
  console.log('    ✅ painPoints (4 comparison rows)');
  console.log('    ✅ painPointsTitle + painPointsSubtitle');
  console.log('    ✅ stats (4 access-section stats)');
  console.log('    ✅ benefits (4 access-section bullets)');
  console.log('    ✅ testimonials (3 testimonials)');
  console.log('  Phase 3:');
  console.log('    ✅ detailPageSections.finalCTA (kept + updated)');
  console.log('    ✅ detailPageSections.packages (4 packages)');
  console.log('    ✅ detailPageSections.inventory (section added)');
  console.log('    ✅ sampleLocations (8 cities)');
}

main();
