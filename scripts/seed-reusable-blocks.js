#!/usr/bin/env node
/**
 * Seed reusable content blocks: reusableTestimonial, reusableStatBlock, reusableCTA
 */
const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf-8');
envFile.split('\n').forEach(line => {
  const [key, ...val] = line.split('=');
  if (key && val.length) process.env[key.trim()] = val.join('=').trim();
});

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// ============================================
// REUSABLE TESTIMONIALS
// ============================================
const testimonials = [
  {
    _id: 'reusable-testimonial-jeki-ryoji',
    _type: 'reusableTestimonial',
    internalName: 'Ryoji Akaishi - jeki (Agencies)',
    quote: {
      _type: 'localeText',
      en: "By customising Moving Walls' platform, Jeki adds new services using its transport advertising expertise. We aim to build one of Japan's largest marketplaces with nationwide, diverse OOH inventory.",
    },
    author: 'Ryoji Akaishi',
    role: 'President and Representative Director',
    company: 'jeki',
    rating: 5,
    featured: true,
    categories: ['agencies', 'general'],
  },
  {
    _id: 'reusable-testimonial-fc-media-saad',
    _type: 'reusableTestimonial',
    internalName: 'Saad Bencharef - FC Media (Media Owners)',
    quote: {
      _type: 'localeText',
      en: 'This partnership provides us with cutting-edge audience measurement solutions that bring unprecedented insights to our advertising campaigns.',
    },
    author: 'Saad Bencharef',
    role: 'Director of Data and Digital Transformation',
    company: 'FC Media',
    rating: 5,
    featured: true,
    categories: ['media-owners', 'general'],
  },
  {
    _id: 'reusable-testimonial-groupm-yasmin',
    _type: 'reusableTestimonial',
    internalName: 'Yasmin Mallari - GroupM Philippines (Brands/Agencies)',
    quote: {
      _type: 'localeText',
      en: 'Brand investments grow when advertisers have clarity on ad placements and performance. This partnership strengthens our DOOH planning and expands measurement capabilities for our clients.',
    },
    author: 'Yasmin Mallari',
    role: 'Chief Investment Officer',
    company: 'GroupM, Philippines',
    rating: 5,
    featured: true,
    categories: ['brands', 'agencies', 'general'],
  },
  {
    _id: 'reusable-testimonial-mau-media',
    _type: 'reusableTestimonial',
    internalName: 'Mau Media - Media Owner Testimonial',
    quote: {
      _type: 'localeText',
      en: 'Moving Walls helped us transition from estimated visibility to measurable audience delivery, transforming how we prove OOH value to advertisers in Mauritius.',
    },
    author: 'Mau Media Team',
    role: 'Media Operations',
    company: 'Mau Media',
    rating: 5,
    featured: false,
    categories: ['media-owners', 'mw-measure'],
  },
  {
    _id: 'reusable-testimonial-retail-brand',
    _type: 'reusableTestimonial',
    internalName: 'Retail Brand - MW Activate Testimonial',
    quote: {
      _type: 'localeText',
      en: 'Moving Walls\' hyperlocal OOH targeting allowed us to drive foot traffic to our stores during peak seasonal periods with measurable ROI that exceeded our expectations.',
    },
    author: 'Marketing Director',
    role: 'Head of Marketing',
    company: 'Leading Retail Brand',
    rating: 5,
    featured: false,
    categories: ['brands', 'retail', 'mw-activate'],
  },
  {
    _id: 'reusable-testimonial-finance-client',
    _type: 'reusableTestimonial',
    internalName: 'Finance Client - MW Planner Testimonial',
    quote: {
      _type: 'localeText',
      en: 'The data-driven planning capabilities of MW Planner gave us complete transparency in audience reach, enabling us to optimize our outdoor media spend across multiple markets.',
    },
    author: 'Campaign Strategist',
    role: 'VP of Media Strategy',
    company: 'Global Financial Services',
    rating: 5,
    featured: false,
    categories: ['brands', 'finance', 'mw-planner'],
  },
];

// ============================================
// REUSABLE STAT BLOCKS
// ============================================
const statBlocks = [
  {
    _id: 'reusable-stat-platform-overview',
    _type: 'reusableStatBlock',
    internalName: 'Platform Overview Stats',
    title: { _type: 'localeString', en: 'Moving Walls by the Numbers' },
    stats: [
      {
        _key: 'stat-screens',
        value: '2.8M+',
        label: { _type: 'localeString', en: 'Screens Connected' },
        description: { _type: 'localeString', en: 'Across 30+ countries worldwide' },
        icon: 'screen',
      },
      {
        _key: 'stat-impressions',
        value: '100B+',
        label: { _type: 'localeString', en: 'Monthly Impressions' },
        description: { _type: 'localeString', en: 'Delivered through our platform' },
        icon: 'chart-up',
      },
      {
        _key: 'stat-countries',
        value: '30+',
        label: { _type: 'localeString', en: 'Countries' },
        description: { _type: 'localeString', en: 'Global coverage and growing' },
        icon: 'globe',
      },
      {
        _key: 'stat-clients',
        value: '500+',
        label: { _type: 'localeString', en: 'Active Clients' },
        description: { _type: 'localeString', en: 'Brands, agencies & media owners' },
        icon: 'users',
      },
    ],
    layout: 'grid',
    theme: 'light',
  },
  {
    _id: 'reusable-stat-campaign-performance',
    _type: 'reusableStatBlock',
    internalName: 'Campaign Performance Stats',
    title: { _type: 'localeString', en: 'Proven Campaign Results' },
    stats: [
      {
        _key: 'stat-roi',
        value: '3.5x',
        label: { _type: 'localeString', en: 'Average ROI' },
        description: { _type: 'localeString', en: 'Return on OOH media investment' },
        icon: 'money',
      },
      {
        _key: 'stat-accuracy',
        value: '98%',
        label: { _type: 'localeString', en: 'Audience Accuracy' },
        description: { _type: 'localeString', en: 'Measurement precision rate' },
        icon: 'target',
      },
      {
        _key: 'stat-uplift',
        value: '47%',
        label: { _type: 'localeString', en: 'Average Foot Traffic Uplift' },
        description: { _type: 'localeString', en: 'For retail OOH campaigns' },
        icon: 'chart-up',
      },
    ],
    layout: 'row',
    theme: 'blue',
  },
];

// ============================================
// REUSABLE CTAs
// ============================================
const ctas = [
  {
    _id: 'reusable-cta-book-demo',
    _type: 'reusableCTA',
    internalName: 'Book a Demo - Primary CTA',
    heading: { _type: 'localeString', en: 'Ready to Transform Your OOH Advertising?' },
    subheading: {
      _type: 'localeText',
      en: 'See how Moving Walls can help you plan, buy, and measure outdoor advertising with data-driven precision.',
    },
    primaryButton: {
      text: { _type: 'localeString', en: 'Book a Demo' },
      url: '/contact',
      openInNewTab: false,
    },
    secondaryButton: {
      text: { _type: 'localeString', en: 'Explore Platform' },
      url: '/platform',
      openInNewTab: false,
    },
    layout: 'centered',
    theme: 'gradient',
  },
  {
    _id: 'reusable-cta-media-owners',
    _type: 'reusableCTA',
    internalName: 'Media Owners CTA',
    heading: { _type: 'localeString', en: 'Turn Your Screens into a Revenue-Generating Media Channel' },
    subheading: {
      _type: 'localeText',
      en: 'Join hundreds of media owners who use Moving Walls to manage inventory, automate sales, and maximize revenue.',
    },
    primaryButton: {
      text: { _type: 'localeString', en: 'Get Started' },
      url: '/media-owners',
      openInNewTab: false,
    },
    secondaryButton: {
      text: { _type: 'localeString', en: 'View Case Studies' },
      url: '/case-studies',
      openInNewTab: false,
    },
    layout: 'centered',
    theme: 'blue',
  },
  {
    _id: 'reusable-cta-resources',
    _type: 'reusableCTA',
    internalName: 'Download Resources CTA',
    heading: { _type: 'localeString', en: 'Explore Our Industry Reports & Guides' },
    subheading: {
      _type: 'localeText',
      en: 'Get actionable insights on OOH advertising trends, audience measurement, and programmatic DOOH strategies.',
    },
    primaryButton: {
      text: { _type: 'localeString', en: 'Browse Ebooks' },
      url: '/ebooks',
      openInNewTab: false,
    },
    secondaryButton: {
      text: { _type: 'localeString', en: 'Read Our Blog' },
      url: '/blog',
      openInNewTab: false,
    },
    layout: 'split',
    theme: 'light',
  },
];

async function seed() {
  console.log('Seeding reusable content blocks to Sanity...\n');

  // Seed testimonials
  console.log('--- Reusable Testimonials ---');
  for (const doc of testimonials) {
    try {
      await client.createOrReplace(doc);
      console.log(`  ✅ ${doc.internalName}`);
    } catch (err) {
      console.log(`  ❌ ${doc.internalName}: ${err.message}`);
    }
  }

  // Seed stat blocks
  console.log('\n--- Reusable Stat Blocks ---');
  for (const doc of statBlocks) {
    try {
      await client.createOrReplace(doc);
      console.log(`  ✅ ${doc.internalName}`);
    } catch (err) {
      console.log(`  ❌ ${doc.internalName}: ${err.message}`);
    }
  }

  // Seed CTAs
  console.log('\n--- Reusable CTAs ---');
  for (const doc of ctas) {
    try {
      await client.createOrReplace(doc);
      console.log(`  ✅ ${doc.internalName}`);
    } catch (err) {
      console.log(`  ❌ ${doc.internalName}: ${err.message}`);
    }
  }

  // Verify
  console.log('\n--- Verification ---');
  const tCount = await client.fetch('count(*[_type == "reusableTestimonial"])');
  const sCount = await client.fetch('count(*[_type == "reusableStatBlock"])');
  const cCount = await client.fetch('count(*[_type == "reusableCTA"])');
  console.log(`  reusableTestimonial: ${tCount}`);
  console.log(`  reusableStatBlock:   ${sCount}`);
  console.log(`  reusableCTA:         ${cCount}`);
  console.log('\nDone!');
}

seed().catch(console.error);
