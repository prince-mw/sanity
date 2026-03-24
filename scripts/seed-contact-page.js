const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const contactPageData = {
  _id: 'contactPage',
  _type: 'contactPage',

  // Hero Section
  heroTitle: "Let's Build Something",
  heroTitleHighlight: 'Extraordinary Together',
  heroDescription:
    "Every great campaign starts with a conversation. Whether you're launching your first digital campaign or scaling a global advertising strategy, our team of experts is ready to turn your vision into measurable results.",
  heroCtaText: 'Book a Free Demo',
  heroCtaLink: '/contact',

  // Offices Section Headings
  officesSectionTitle: 'Our Global Presence',
  officesSectionDescription:
    "With offices strategically located across Asia, we're always close to our clients.",

  // Contact Methods
  contactMethods: [
    {
      _key: 'phone',
      _type: 'contactMethod',
      iconType: 'phone',
      title: 'Phone',
      details: '+65 6714 6699',
      description: 'Available Mon-Fri, 9AM-6PM SGT',
    },
    {
      _key: 'email',
      _type: 'contactMethod',
      iconType: 'email',
      title: 'Email',
      details: 'info@movingwalls.com',
      description: "We'll respond within 2 hours",
    },
    {
      _key: 'offices',
      _type: 'contactMethod',
      iconType: 'location',
      title: 'Global Offices',
      details: '7 Cities Worldwide',
      description: 'Singapore • KL • Manila • Jakarta',
    },
    {
      _key: 'demo',
      _type: 'contactMethod',
      iconType: 'demo',
      title: 'Instant Demo',
      details: 'Live Product Tour',
      description: 'See MW Platform in action now',
    },
  ],

  // Departments
  departments: [
    {
      _key: 'growth',
      _type: 'department',
      title: 'New Business & Strategy',
      email: 'info@movingwalls.com',
      description:
        'Ready to scale your advertising? Connect with our growth strategists for custom campaign planning and ROI forecasting.',
      iconType: 'growth',
      responseTime: '2 hours',
    },
    {
      _key: 'support',
      _type: 'department',
      title: 'Platform & Technical Support',
      email: 'info@movingwalls.com',
      description:
        'Need help with MW products? Our technical specialists provide 24/7 support for all platform features and integrations.',
      iconType: 'settings',
      responseTime: '30 minutes',
    },
    {
      _key: 'enterprise',
      _type: 'department',
      title: 'Enterprise Solutions',
      email: 'info@movingwalls.com',
      description:
        'Large-scale deployments and custom integrations? Our enterprise team specializes in complex, multi-market campaigns.',
      iconType: 'enterprise',
      responseTime: '4 hours',
    },
    {
      _key: 'partnerships',
      _type: 'department',
      title: 'Strategic Partnerships',
      email: 'info@movingwalls.com',
      description:
        "Technology integrations, agency partnerships, or joint ventures? Let's explore how we can grow together.",
      iconType: 'partnerships',
      responseTime: '1 business day',
    },
    {
      _key: 'press',
      _type: 'department',
      title: 'Media & Press Relations',
      email: 'info@movingwalls.com',
      description:
        'Journalists, analysts, and media professionals—access press releases, executive interviews, and company insights.',
      iconType: 'press',
      responseTime: 'Same day',
    },
    {
      _key: 'careers',
      _type: 'department',
      title: 'Careers & Talent',
      email: 'info@movingwalls.com',
      description:
        'Join the future of advertising technology. Explore opportunities to shape the industry with cutting-edge AI and data science.',
      iconType: 'careers',
      responseTime: '3 business days',
    },
  ],

  // Form Section
  formSectionTitle: 'Your Success Story Starts Here',
  formSectionDescription:
    "Tell us about your campaign goals, and we'll craft a customized advertising strategy that delivers real, measurable impact.",
  companyName: 'Moving Walls Pte Ltd',
  companyAddress: '14, Robinson Road #8-02\nFar East Financial Building\nSingapore 048545',
  companyPhone: '+65 6714 6699',
  companyEmail: 'info@movingwalls.com',
  zohoFormUrl:
    'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWContactUs/formperma/U0Rmmz1KaZyfpwtqHbfK6sbw19RecVMg6aMmZ3G0vuw',
  zohoFormHeight: 800,
}

async function seedContactPage() {
  console.log('Seeding contact page content...')

  try {
    const existing = await client.getDocument('contactPage')
    if (existing) {
      console.log('Contact page document already exists. Updating...')
      await client.createOrReplace(contactPageData)
    } else {
      await client.create(contactPageData)
    }
    console.log('✅ Contact page content seeded successfully!')
  } catch (error) {
    console.error('Error seeding contact page:', error)
    process.exit(1)
  }
}

seedContactPage()
