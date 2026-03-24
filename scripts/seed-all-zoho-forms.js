/**
 * Seed ALL remaining Zoho forms to Sanity CMS
 * Includes: Contact form (homepage), Location contact forms, Demo request, Newsletter
 * Also updates location documents with contactFormUrl
 * 
 * Run with: node scripts/seed-all-zoho-forms.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

// ── 1. Main Contact Form (used on homepage and contact page) ──
const contactForm = {
  _id: 'zoho-form-contact-main',
  _type: 'zohoForm',
  name: 'Main Contact Us Form',
  formType: 'contact',
  renderMode: 'iframe',
  formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWContactUs/formperma/U0Rmmz1KaZyfpwtqHbfK6sbw19RecVMg6aMmZ3G0vuw',
  description: 'Primary contact form displayed on the homepage and contact page',
  isActive: true,
  assignedPages: ['/', '/contact'],
  embedSettings: {
    displayMode: 'iframe',
    height: 800,
    width: '100%',
  },
};

// ── 2. Demo Request Form (for product pages) ──
const demoForm = {
  _id: 'zoho-form-demo-request',
  _type: 'zohoForm',
  name: 'Demo Request Form',
  formType: 'demo',
  renderMode: 'iframe',
  formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWContactUs/formperma/U0Rmmz1KaZyfpwtqHbfK6sbw19RecVMg6aMmZ3G0vuw',
  description: 'Demo request form shown on product pages via popup',
  isActive: true,
  assignedPages: [
    '/mw-planner',
    '/mw-activate',
    '/mw-influence',
    '/mw-market',
    '/mw-measure',
    '/mw-science',
    '/mw-studio',
    '/products',
    '/products/mw-activate',
    '/platform',
    '/media-owners',
    '/agencies',
    '/brands',
  ],
  embedSettings: {
    displayMode: 'modal',
    height: 700,
    width: '100%',
  },
};

// ── 3. Newsletter Signup Form ──
const newsletterForm = {
  _id: 'zoho-form-newsletter',
  _type: 'zohoForm',
  name: 'Newsletter Signup Form',
  formType: 'newsletter',
  renderMode: 'iframe',
  formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWContactUs/formperma/U0Rmmz1KaZyfpwtqHbfK6sbw19RecVMg6aMmZ3G0vuw',
  description: 'Newsletter signup form',
  isActive: true,
  assignedPages: [],
  embedSettings: {
    displayMode: 'modal',
    height: 500,
    width: '100%',
  },
};

// ── 4. Location-Specific Contact Forms ──
const locationForms = [
  {
    _id: 'zoho-form-location-malaysia',
    name: 'Malaysia Contact Form',
    slug: 'malaysia',
    formUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/MalaysiaContact',
  },
  {
    _id: 'zoho-form-location-singapore',
    name: 'Singapore Contact Form',
    slug: 'singapore',
    formUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/SingaporeContact',
  },
  {
    _id: 'zoho-form-location-indonesia',
    name: 'Indonesia Contact Form',
    slug: 'indonesia',
    formUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/IndonesiaContact',
  },
  {
    _id: 'zoho-form-location-thailand',
    name: 'Thailand Contact Form',
    slug: 'thailand',
    formUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/ThailandContact',
  },
  {
    _id: 'zoho-form-location-philippines',
    name: 'Philippines Contact Form',
    slug: 'philippines',
    formUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/PhilippinesContact',
  },
  {
    _id: 'zoho-form-location-india',
    name: 'India Contact Form',
    slug: 'india',
    formUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/IndiaContact',
  },
  {
    _id: 'zoho-form-location-japan',
    name: 'Japan Contact Form',
    slug: 'japan',
    formUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/JapanContact',
  },
  {
    _id: 'zoho-form-location-australia',
    name: 'Australia Contact Form',
    slug: 'australia',
    formUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/AustraliaContact',
  },
  {
    _id: 'zoho-form-location-sri-lanka',
    name: 'Sri Lanka Contact Form',
    slug: 'sri-lanka',
    formUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/SriLankaContact',
  },
  {
    _id: 'zoho-form-location-usa',
    name: 'USA Contact Form',
    slug: 'usa',
    formUrl: 'https://forms.zoho.com/movingwallsholdingpteltd/form/USAContact',
  },
];

// ── 5. Industry/Vertical Page Forms ──
const industryForm = {
  _id: 'zoho-form-industry-contact',
  _type: 'zohoForm',
  name: 'Industry Page Contact Form',
  formType: 'lead',
  renderMode: 'iframe',
  formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWContactUs/formperma/U0Rmmz1KaZyfpwtqHbfK6sbw19RecVMg6aMmZ3G0vuw',
  description: 'Contact form for industry vertical pages (finance, healthcare, retail)',
  isActive: true,
  assignedPages: [
    '/finance',
    '/healthcare',
    '/retail',
    '/ai-powered-audience-targeting',
  ],
  embedSettings: {
    displayMode: 'modal',
    height: 700,
    width: '100%',
  },
};

async function seedForms() {
  console.log('🚀 Seeding all Zoho forms to Sanity CMS...\n');
  
  // Seed main forms
  const mainForms = [contactForm, demoForm, newsletterForm, industryForm];
  
  for (const form of mainForms) {
    try {
      await client.createOrReplace(form);
      console.log(`✅ ${form.name} (${form._id})`);
    } catch (error) {
      console.error(`❌ Error seeding ${form.name}:`, error.message);
    }
  }

  // Seed location forms + update location documents
  console.log('\n📍 Seeding location contact forms...');
  
  for (const locForm of locationForms) {
    try {
      // Create the zohoForm document
      const formDoc = {
        _id: locForm._id,
        _type: 'zohoForm',
        name: locForm.name,
        formType: 'contact',
        renderMode: 'iframe',
        formUrl: locForm.formUrl,
        description: `Contact form for ${locForm.name.replace(' Contact Form', '')} office`,
        isActive: true,
        assignedPages: [`/locations/${locForm.slug}`],
        embedSettings: {
          displayMode: 'modal',
          height: 700,
          width: '100%',
        },
      };
      
      await client.createOrReplace(formDoc);
      console.log(`✅ ${locForm.name}`);
      
      // Update the location document's contactFormUrl if it exists
      const location = await client.fetch(
        `*[_type == "location" && slug.current == $slug][0]{ _id }`,
        { slug: locForm.slug }
      );
      
      if (location) {
        await client.patch(location._id).set({ contactFormUrl: locForm.formUrl }).commit();
        console.log(`   📝 Updated location "${locForm.slug}" contactFormUrl`);
      }
    } catch (error) {
      console.error(`❌ Error seeding ${locForm.name}:`, error.message);
    }
  }

  console.log('\n✨ Done! All Zoho forms seeded to Sanity CMS.');
  
  // Summary
  const totalForms = await client.fetch(`count(*[_type == "zohoForm"])`);
  console.log(`\n📊 Total Zoho forms in CMS: ${totalForms}`);
}

seedForms();
