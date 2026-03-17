// Migration script to add initial analytics configuration to Sanity
// Run with: node scripts/migrate-analytics-config.js

const { createClient } = require('@sanity/client');

// Hardcoded token for migrations (has write permissions)
const SANITY_TOKEN = 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO';

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  token: SANITY_TOKEN,
  apiVersion: '2024-01-01',
});

const analyticsConfig = {
  _type: 'analyticsConfig',
  _id: 'analyticsConfig', // Singleton pattern - single document
  title: 'Site Analytics Configuration',
  googleAnalytics: {
    enabled: true,
    measurementId: 'G-LPHVR00DLC', // Previous GA4 ID from layout.tsx
  },
  googleTagManager: {
    enabled: true,
    containerId: 'GTM-W8SDQPG', // Previous GTM ID from layout.tsx
  },
  metaPixel: {
    enabled: true,
    pixelId: '2116798625788074', // Previous Meta Pixel ID from layout.tsx
  },
  linkedinInsight: {
    enabled: false,
    partnerId: '', // Add your LinkedIn Partner ID here
  },
  twitterPixel: {
    enabled: false,
    pixelId: '', // Add your Twitter/X Pixel ID here
  },
  tiktokPixel: {
    enabled: false,
    pixelId: '', // Add your TikTok Pixel ID here
  },
};

async function migrateAnalyticsConfig() {
  console.log('Creating analytics configuration...');
  
  try {
    const result = await client.createOrReplace(analyticsConfig);
    console.log('Analytics configuration created successfully!');
    console.log('Document ID:', result._id);
    console.log('\nEnabled tracking:');
    console.log('- Google Analytics (GA4):', analyticsConfig.googleAnalytics.enabled ? analyticsConfig.googleAnalytics.measurementId : 'Disabled');
    console.log('- Google Tag Manager:', analyticsConfig.googleTagManager.enabled ? analyticsConfig.googleTagManager.containerId : 'Disabled');
    console.log('- Meta Pixel:', analyticsConfig.metaPixel.enabled ? analyticsConfig.metaPixel.pixelId : 'Disabled');
    console.log('- LinkedIn Insight:', analyticsConfig.linkedinInsight.enabled ? analyticsConfig.linkedinInsight.partnerId : 'Disabled');
    console.log('- Twitter/X Pixel:', analyticsConfig.twitterPixel.enabled ? analyticsConfig.twitterPixel.pixelId : 'Disabled');
    console.log('- TikTok Pixel:', analyticsConfig.tiktokPixel.enabled ? analyticsConfig.tiktokPixel.pixelId : 'Disabled');
  } catch (error) {
    console.error('Error creating analytics configuration:', error);
  }
}

migrateAnalyticsConfig();
