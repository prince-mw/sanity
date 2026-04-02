/**
 * Seed missing company page data (our-journey, our-story gaps, retail services)
 * Run with: node scripts/seed-company-gaps.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

async function seedGaps() {
  console.log('Seeding missing company page data...\n');

  // 1. Create our-journey company page if missing
  const journeyExists = await client.fetch(
    `*[_type == "companyPage" && pageType == "our-journey"][0]{ _id }`
  );

  if (!journeyExists) {
    const result = await client.create({
      _type: 'companyPage',
      pageType: 'our-journey',
      title: 'Our Journey',
      subtitle: 'Innovation & Growth',
      heroDescription: 'Explore the milestones and achievements that shaped Moving Walls into a global leader in out-of-home advertising technology.',
      stats: [
        { _key: 's1', value: '9+', label: 'Years of Innovation' },
        { _key: 's2', value: '1000+', label: 'Brand Partners' },
        { _key: 's3', value: '9', label: 'Global Offices' },
        { _key: 's4', value: '$300M+', label: 'Annual Revenue' },
      ],
      awards: [
        { _key: 'a1', name: 'APAC CIO Outlook Top 25', year: '2019', description: 'Ad Tech Solutions Provider' },
        { _key: 'a2', name: 'TiE50 Winner', year: '2020', description: 'Top 50 Startup' },
        { _key: 'a3', name: 'Unilever Foundry Innovation', year: '2021', description: 'Innovation Award' },
        { _key: 'a4', name: 'Constellar Award', year: '2022', description: 'Technology Leadership' },
        { _key: 'a5', name: 'MarTech Breakthrough', year: '2023', description: 'Best OOH Platform' },
        { _key: 'a6', name: 'AdExchanger Rising Star', year: '2024', description: 'Programmatic Innovation' },
      ],
    });
    console.log(`✅ Created our-journey company page: ${result._id}`);
  } else {
    console.log('⏭️  our-journey company page already exists');
  }

  // 2. Patch our-story with missing stats
  const ourStory = await client.fetch(
    `*[_type == "companyPage" && pageType == "our-story"][0]{ _id, stats }`
  );

  if (ourStory && (!ourStory.stats || ourStory.stats.length === 0)) {
    await client.patch(ourStory._id).set({
      stats: [
        { _key: 'ss1', value: '10B+', label: 'Data Points Processed' },
        { _key: 'ss2', value: '100K+', label: 'OOH Locations Measured' },
        { _key: 'ss3', value: '7', label: 'Global Markets' },
        { _key: 'ss4', value: '4', label: 'Continents' },
      ],
    }).commit();
    console.log('✅ Updated our-story with stats');
  } else {
    console.log('⏭️  our-story already has stats');
  }

  // 3. Seed retail industry services if empty
  const retail = await client.fetch(
    `*[_type == "industryPage" && industry == "retail"][0]{ _id, services }`
  );

  if (retail && (!retail.services || retail.services.length === 0)) {
    await client.patch(retail._id).set({
      services: [
        {
          _key: 'rs1',
          title: 'In-Store Media',
          description: 'Digital signage and in-store displays for retail environments',
          offerings: ['Digital Signage', 'End-cap Displays', 'Checkout Screens', 'Aisle Displays'],
        },
        {
          _key: 'rs2',
          title: 'Mall & Shopping Center',
          description: 'Large-format displays and interactive ads in high-traffic retail zones',
          offerings: ['Mall Directories', 'Escalator Wraps', 'Atrium Displays', 'Parking Garage Ads'],
        },
        {
          _key: 'rs3',
          title: 'Proximity Marketing',
          description: 'Location-based targeting to drive foot traffic to stores',
          offerings: ['Geofencing', 'Beacon Targeting', 'Mobile Attribution', 'Store Visit Lift'],
        },
      ],
    }).commit();
    console.log('✅ Updated retail industry with services');
  } else {
    console.log('⏭️  retail already has services');
  }

  console.log('\n✅ Done seeding company page gaps!');
}

seedGaps();
