/**
 * Migration script to seed TrustBar content into Sanity CMS
 * 
 * Run with: node scripts/seed-trustbar-to-sanity.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

const trustBarData = {
  _id: 'trustBar',
  _type: 'trustBar',
  stats: [
    { _key: 'stat-1', value: '1M+', label: 'OOH Sites' },
    { _key: 'stat-2', value: '50+', label: 'Markets' },
    { _key: 'stat-3', value: '500+', label: 'Clients' },
  ],
};

async function seedTrustBar() {
  console.log('Seeding TrustBar content...');
  
  try {
    const result = await client.createOrReplace(trustBarData);
    console.log(`✅ TrustBar seeded: ${result._id}`);
  } catch (error) {
    console.error('❌ Error seeding TrustBar:', error.message);
  }
}

seedTrustBar();
