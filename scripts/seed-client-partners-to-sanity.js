/**
 * Migration script to seed Client Partners content into Sanity CMS
 * 
 * Run with: node scripts/seed-client-partners-to-sanity.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

const clientPartnersData = {
  _id: 'clientPartners',
  _type: 'clientPartners',
  sectionTitle: 'Our Clients & Partners',
  sectionDescription: 'Trusted by leading brands and media owners worldwide',
  partners: [
    {
      _key: 'partner-groupm',
      name: 'GroupM',
      category: 'Agency',
      url: 'https://www.groupm.com',
    },
    {
      _key: 'partner-dentsu',
      name: 'dentsu',
      category: 'Agency',
      url: 'https://www.dentsu.com',
    },
    {
      _key: 'partner-clear-channel',
      name: 'Clear Channel',
      category: 'Media Owner',
      url: 'https://www.clearchannel.com',
    },
  ],
};

async function seedClientPartners() {
  console.log('Seeding Client Partners content...');
  
  try {
    const result = await client.createOrReplace(clientPartnersData);
    console.log(`✅ Client Partners seeded: ${result._id}`);
  } catch (error) {
    console.error('❌ Error seeding Client Partners:', error.message);
  }
}

seedClientPartners();
