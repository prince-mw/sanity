const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  apiVersion: '2024-01-01',
});

const careersPageData = {
  _id: 'careersPage',
  _type: 'careersPage',
  title: 'Careers Page',

  // Hero Section
  heroBadge: 'Join Our Team',
  heroTitle: 'Build Your Career',
  heroTitleHighlight: 'Shape the Future',
  heroDescription: "Join Moving Walls and help revolutionize the advertising industry. We're looking for passionate innovators who want to make a real impact while growing their careers in a dynamic, supportive environment.",
  heroCtaText: 'View Open Roles',
  stats: [
    { _key: 'stat1', number: '200+', label: 'Team Members' },
    { _key: 'stat2', number: '25+', label: 'Open Positions' },
    { _key: 'stat3', number: '9', label: 'Global Offices' },
    { _key: 'stat4', number: '4.9/5', label: 'Glassdoor Rating' },
  ],

  // Benefits Section
  benefitsTitle: 'Why Choose Moving Walls?',
  benefitsDescription: 'We believe in empowering our people to do their best work while building the future of advertising technology.',
  benefits: [
    { _key: 'benefit1', title: 'Health & Wellness', description: 'Comprehensive medical, dental, and vision coverage plus wellness programs', iconName: 'heart' },
    { _key: 'benefit2', title: 'Competitive Compensation', description: 'Market-leading salaries with equity participation and performance bonuses', iconName: 'dollar' },
    { _key: 'benefit3', title: 'Learning & Development', description: 'Professional development budget, conference attendance, and skill-building programs', iconName: 'book' },
    { _key: 'benefit4', title: 'Flexible Work', description: 'Remote-first culture with flexible hours and unlimited PTO policy', iconName: 'globe' },
    { _key: 'benefit5', title: 'Team Culture', description: 'Collaborative environment with team events, mentorship, and inclusive culture', iconName: 'people' },
    { _key: 'benefit6', title: 'Innovation Time', description: '20% time for passion projects and innovation initiatives', iconName: 'lightning' },
  ],

  // Departments Section
  departmentsTitle: 'Teams & Departments',
  departmentsDescription: 'Explore opportunities across our diverse teams and find where your skills can make the biggest impact.',
  departments: [
    { _key: 'dept1', name: 'Engineering', departmentKey: 'engineering', color: 'bg-blue-100 text-blue-600' },
    { _key: 'dept2', name: 'Sales', departmentKey: 'sales', color: 'bg-green-100 text-green-600' },
    { _key: 'dept3', name: 'Marketing', departmentKey: 'marketing', color: 'bg-purple-100 text-purple-600' },
    { _key: 'dept4', name: 'Data & Analytics', departmentKey: 'data-analytics', color: 'bg-orange-100 text-orange-600' },
    { _key: 'dept5', name: 'Design', departmentKey: 'design', color: 'bg-pink-100 text-pink-600' },
    { _key: 'dept6', name: 'Operations', departmentKey: 'operations', color: 'bg-indigo-100 text-indigo-600' },
  ],

  // Open Positions Section
  openPositionsTitle: 'Open Positions',
  openPositionsDescription: 'Ready to make an impact? Explore our current openings and find your next opportunity.',

  // CTA Section
  ctaTitle: "Don't See Your Perfect Role?",
  ctaDescription: "We're always looking for exceptional talent. Send us your resume and let us know how you'd like to contribute to our mission of transforming advertising.",
  ctaPrimaryButtonText: 'Send Your Resume',
  ctaPrimaryButtonLink: '#contact',
  ctaSecondaryButtonText: 'Meet Our Leaders',
  ctaSecondaryButtonLink: '/leadership',
};

async function seedCareersPage() {
  console.log('Seeding Careers Page content to Sanity...');

  try {
    await client.createOrReplace(careersPageData);
    console.log('✅ Careers Page content seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding Careers Page:', error.message);
    process.exit(1);
  }
}

seedCareersPage();
