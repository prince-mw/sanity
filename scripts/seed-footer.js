const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

const footerData = {
  _id: 'footerConfig',
  _type: 'footerConfig',
  companyDescription: 'Moving Walls connects the global Out of Home ecosystem into one unified cloud platform. From audience discovery to booking, activation, measurement, and optimisation, we simplify complexity so brands can grow confidently across markets.',
  navCategories: [
    {
      _key: 'company',
      _type: 'navCategory',
      title: 'Company',
      showLocationIcon: false,
      links: [
        { _key: 'ourstory', _type: 'navLink', name: 'Our Story', href: '/our-story' },
        { _key: 'leadership', _type: 'navLink', name: 'Leadership', href: '/leadership' },
        { _key: 'locations', _type: 'navLink', name: 'Office Locations', href: '/locations' },
        { _key: 'careers', _type: 'navLink', name: 'Careers', href: '/careers' },
        { _key: 'contact', _type: 'navLink', name: 'Contact Us', href: '/contact' },
      ],
    },
    {
      _key: 'solutions',
      _type: 'navCategory',
      title: 'Solutions',
      showLocationIcon: false,
      links: [
        { _key: 'brands', _type: 'navLink', name: 'Brands', href: '/brands' },
        { _key: 'mediaowners', _type: 'navLink', name: 'Media Owners', href: '/media-owners' },
        { _key: 'agencies', _type: 'navLink', name: 'Agencies', href: '/agencies' },
      ],
    },
    {
      _key: 'products',
      _type: 'navCategory',
      title: 'Products',
      showLocationIcon: false,
      links: [
        { _key: 'planner', _type: 'navLink', name: 'MW Planner', href: '/mw-planner' },
        { _key: 'measure', _type: 'navLink', name: 'MW Measure', href: '/mw-measure' },
        { _key: 'influence', _type: 'navLink', name: 'MW Influence', href: '/mw-influence' },
        { _key: 'activate', _type: 'navLink', name: 'MW Activate', href: '/mw-activate' },
        { _key: 'science', _type: 'navLink', name: 'MW Science', href: '/mw-science' },
        { _key: 'studio', _type: 'navLink', name: 'MW Studio', href: '/mw-studio' },
        { _key: 'market', _type: 'navLink', name: 'MW Market', href: '/mw-market' },
      ],
    },
    {
      _key: 'resources',
      _type: 'navCategory',
      title: 'Resources',
      showLocationIcon: false,
      links: [
        { _key: 'oohformats', _type: 'navLink', name: 'OOH Formats', href: '/ooh-formats' },
        { _key: 'ebooks', _type: 'navLink', name: 'E-Books', href: '/ebooks' },
        { _key: 'blog', _type: 'navLink', name: 'Blog', href: '/blog' },
        { _key: 'casestudies', _type: 'navLink', name: 'Case Studies', href: '/case-studies' },
        { _key: 'pressnews', _type: 'navLink', name: 'Press & News', href: '/press-news' },
        { _key: 'events', _type: 'navLink', name: 'Events', href: '/events' },
      ],
    },
    {
      _key: 'billboardlocations',
      _type: 'navCategory',
      title: 'Billboard Locations',
      showLocationIcon: true,
      links: [
        { _key: 'my', _type: 'navLink', name: 'Malaysia', href: '/locations/malaysia' },
        { _key: 'sg', _type: 'navLink', name: 'Singapore', href: '/locations/singapore' },
        { _key: 'id', _type: 'navLink', name: 'Indonesia', href: '/locations/indonesia' },
        { _key: 'in', _type: 'navLink', name: 'India', href: '/locations/india' },
        { _key: 'ph', _type: 'navLink', name: 'Philippines', href: '/locations/philippines' },
        { _key: 'jp', _type: 'navLink', name: 'Japan', href: '/locations/japan' },
        { _key: 'au', _type: 'navLink', name: 'Australia', href: '/locations/australia' },
        { _key: 'lk', _type: 'navLink', name: 'Sri Lanka', href: '/locations/sri-lanka' },
        { _key: 'th', _type: 'navLink', name: 'Thailand', href: '/locations/thailand' },
      ],
    },
  ],
  socialLinks: [
    { _key: 'linkedin', _type: 'socialLink', platform: 'linkedin', url: 'https://www.linkedin.com/company/moving-walls/' },
    { _key: 'x', _type: 'socialLink', platform: 'x', url: 'https://x.com/movingwalls' },
    { _key: 'youtube', _type: 'socialLink', platform: 'youtube', url: 'https://www.youtube.com/@MovingWallsMy' },
    { _key: 'instagram', _type: 'socialLink', platform: 'instagram', url: 'https://www.instagram.com/mymovingwalls/' },
    { _key: 'facebook', _type: 'socialLink', platform: 'facebook', url: 'https://www.facebook.com/movingwalls/' },
  ],
  movingHeartsTitle: 'Moving Hearts',
  movingHeartsStatsValue: '3M+',
  movingHeartsStatsLabel: 'Hearts Touched',
  movingHeartsTagline: 'Responsible OOH Media Worldwide',
  movingHeartsUrl: 'https://movinghearts.media/',
  movingHeartsCtaText: 'Learn More',
  legalLinks: [
    { _key: 'privacy', _type: 'legalLink', label: 'Privacy Policy', href: '/privacy' },
    { _key: 'terms', _type: 'legalLink', label: 'Terms of Service', href: '/terms' },
    { _key: 'cookies', _type: 'legalLink', label: 'Cookie Policy', href: '/cookies' },
  ],
  copyrightText: '© {year} Moving Walls. All rights reserved.',
};

async function seedFooter() {
  console.log('Seeding footer configuration to Sanity...');
  try {
    const result = await client.createOrReplace(footerData);
    console.log('Footer config seeded successfully:', result._id);
  } catch (error) {
    console.error('Error seeding footer:', error.message);
    process.exit(1);
  }
}

seedFooter();
