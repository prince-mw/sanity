/**
 * Seed Mega Menu to Sanity
 * 
 * This script creates the mega menu document with the existing website navigation structure.
 * Run: node scripts/seed-mega-menu.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

// Helper to generate unique keys
const generateKey = () => Math.random().toString(36).substring(2, 10);

// Mega menu configuration based on the existing website
const megaMenuDocument = {
  _id: 'megaMenu',
  _type: 'megaMenu',
  title: 'Main Navigation',
  mainNavItems: [
    // Solutions Menu
    {
      _key: generateKey(),
      _type: 'menuItem',
      title: 'Solutions',
      menuType: 'megaMenu',
      highlight: 'none',
      columns: [
        {
          _key: generateKey(),
          _type: 'menuColumn',
          heading: 'By Industry',
          links: [
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Brands',
              description: 'OOH campaign planning & execution for brand marketers',
              linkType: 'custom',
              url: '/brands',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Media Owners',
              description: 'Inventory management & monetization for media owners',
              linkType: 'custom',
              url: '/media-owners',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Agencies',
              description: 'Streamline OOH buying for advertising agencies',
              linkType: 'custom',
              url: '/agencies',
              openInNewTab: false,
            },
          ],
        },
        {
          _key: generateKey(),
          _type: 'menuColumn',
          heading: 'By Use Case',
          links: [
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Retail',
              description: 'Drive foot traffic and in-store conversions',
              linkType: 'custom',
              url: '/retail',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Finance',
              description: 'Financial services OOH advertising',
              linkType: 'custom',
              url: '/finance',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Healthcare',
              description: 'Healthcare industry OOH solutions',
              linkType: 'custom',
              url: '/healthcare',
              openInNewTab: false,
            },
          ],
        },
      ],
      showFeaturedContent: false,
    },
    // Products Menu
    {
      _key: generateKey(),
      _type: 'menuItem',
      title: 'Products',
      menuType: 'megaMenu',
      highlight: 'none',
      columns: [
        {
          _key: generateKey(),
          _type: 'menuColumn',
          heading: 'Platform Suite',
          links: [
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'MW Planner',
              description: 'Plan and optimize OOH campaigns with data-driven insights',
              linkType: 'custom',
              url: '/mw-planner',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'MW Measure',
              description: 'Measure campaign effectiveness and ROI',
              linkType: 'custom',
              url: '/mw-measure',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'MW Influence',
              description: 'Audience targeting and attribution',
              linkType: 'custom',
              url: '/mw-influence',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'MW Activate',
              description: 'Execute campaigns across multiple channels',
              linkType: 'custom',
              url: '/mw-activate',
              openInNewTab: false,
            },
          ],
        },
        {
          _key: generateKey(),
          _type: 'menuColumn',
          heading: 'Intelligence Suite',
          links: [
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'MW Science',
              description: 'Advanced analytics and audience insights',
              linkType: 'custom',
              url: '/mw-science',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'MW Studio',
              description: 'Creative management and optimization',
              linkType: 'custom',
              url: '/mw-studio',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'MW Market',
              description: 'Marketplace for OOH inventory',
              linkType: 'custom',
              url: '/mw-market',
              openInNewTab: false,
            },
          ],
        },
        {
          _key: generateKey(),
          _type: 'menuColumn',
          heading: 'Platform',
          links: [
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Platform Overview',
              description: 'See all our platform capabilities',
              linkType: 'custom',
              url: '/platform',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Integrations',
              description: 'Connect with your existing tools',
              linkType: 'custom',
              url: '/integrations',
              openInNewTab: false,
            },
          ],
        },
      ],
      showFeaturedContent: false,
    },
    // About Menu
    {
      _key: generateKey(),
      _type: 'menuItem',
      title: 'About',
      menuType: 'megaMenu',
      highlight: 'none',
      columns: [
        {
          _key: generateKey(),
          _type: 'menuColumn',
          heading: 'Company',
          links: [
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'About Us',
              description: 'Learn about MovingWalls',
              linkType: 'custom',
              url: '/about',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Our Story',
              description: 'The journey of MovingWalls',
              linkType: 'custom',
              url: '/our-story',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Our Journey',
              description: 'Milestones and achievements',
              linkType: 'custom',
              url: '/our-journey',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Leadership',
              description: 'Meet the team behind MovingWalls',
              linkType: 'custom',
              url: '/leadership',
              openInNewTab: false,
            },
          ],
        },
        {
          _key: generateKey(),
          _type: 'menuColumn',
          heading: 'Join Us',
          links: [
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Careers',
              description: 'Join our growing team',
              linkType: 'custom',
              url: '/careers',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Locations',
              description: 'Our global offices',
              linkType: 'custom',
              url: '/locations',
              openInNewTab: false,
            },
          ],
        },
      ],
      showFeaturedContent: false,
    },
    // Resources Menu
    {
      _key: generateKey(),
      _type: 'menuItem',
      title: 'Resources',
      menuType: 'megaMenu',
      highlight: 'none',
      columns: [
        {
          _key: generateKey(),
          _type: 'menuColumn',
          heading: 'Learn',
          links: [
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Blog',
              description: 'Insights, trends, and best practices',
              linkType: 'custom',
              url: '/blog',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Case Studies',
              description: 'Success stories from our clients',
              linkType: 'custom',
              url: '/case-studies',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Ebooks',
              description: 'In-depth guides and resources',
              linkType: 'custom',
              url: '/ebooks',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Whitepapers',
              description: 'Research and industry reports',
              linkType: 'custom',
              url: '/whitepapers',
              openInNewTab: false,
            },
          ],
        },
        {
          _key: generateKey(),
          _type: 'menuColumn',
          heading: 'Events & Media',
          links: [
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Webinars',
              description: 'Online learning sessions',
              linkType: 'custom',
              url: '/webinars',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Events',
              description: 'Upcoming events and conferences',
              linkType: 'custom',
              url: '/events',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Press & News',
              description: 'Latest company news and media coverage',
              linkType: 'custom',
              url: '/press-news',
              openInNewTab: false,
            },
          ],
        },
        {
          _key: generateKey(),
          _type: 'menuColumn',
          heading: 'Support',
          links: [
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'OOH Formats',
              description: 'Guide to out-of-home formats',
              linkType: 'custom',
              url: '/ooh-formats',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Help Center',
              description: 'Get support and answers',
              linkType: 'custom',
              url: '/help-center',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'Documentation',
              description: 'Technical docs and guides',
              linkType: 'custom',
              url: '/documentation',
              openInNewTab: false,
            },
            {
              _key: generateKey(),
              _type: 'menuLink',
              title: 'API Reference',
              description: 'Developer documentation',
              linkType: 'custom',
              url: '/api-reference',
              openInNewTab: false,
            },
          ],
        },
      ],
      showFeaturedContent: false,
    },
    // Contact - Simple Link
    {
      _key: generateKey(),
      _type: 'menuItem',
      title: 'Contact',
      menuType: 'link',
      linkType: 'internal',
      internalPage: '/contact',
      highlight: 'none',
      openInNewTab: false,
    },
  ],
  ctaButton: {
    enabled: true,
    text: 'Get Started',
    linkType: 'internal',
    internalPage: '/contact',
    style: 'primary',
  },
  settings: {
    stickyHeader: true,
    transparentOnHero: false,
    showLanguageSwitcher: true,
    showSearch: false,
    mobileBreakpoint: 1024,
  },
};

async function seedMegaMenu() {
  console.log('🚀 Seeding Mega Menu to Sanity...\n');

  try {
    // Check if mega menu already exists
    const existing = await client.fetch(`*[_type == "megaMenu" && _id == "megaMenu"][0]`);
    
    if (existing) {
      console.log('📋 Existing Mega Menu found. Updating...');
      await client.createOrReplace(megaMenuDocument);
      console.log('✅ Mega Menu updated successfully!');
    } else {
      console.log('📋 Creating new Mega Menu...');
      await client.create(megaMenuDocument);
      console.log('✅ Mega Menu created successfully!');
    }

    console.log('\n📊 Menu Structure:');
    megaMenuDocument.mainNavItems.forEach((item, index) => {
      const type = item.menuType === 'megaMenu' ? `(${item.columns?.length || 0} columns)` : '(link)';
      console.log(`   ${index + 1}. ${item.title} ${type}`);
      if (item.columns) {
        item.columns.forEach((col) => {
          console.log(`      └─ ${col.heading}: ${col.links?.length || 0} links`);
        });
      }
    });

    console.log('\n🎉 Done! Refresh Sanity Studio to see the Mega Menu configuration.');
    
  } catch (error) {
    console.error('❌ Error seeding mega menu:', error.message);
    process.exit(1);
  }
}

seedMegaMenu();
