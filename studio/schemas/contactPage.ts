import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'contactMethods', title: 'Contact Methods' },
    { name: 'departments', title: 'Departments' },
    { name: 'formSection', title: 'Form Section' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title (Line 1)',
      type: 'string',
      group: 'hero',
      description: 'First line of the hero heading, e.g. "Let\'s Build Something"',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero Title (Highlighted Line)',
      type: 'string',
      group: 'hero',
      description: 'Gradient-highlighted second line, e.g. "Extraordinary Together"',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero CTA Button Link',
      type: 'string',
      group: 'hero',
    }),

    // Contact Methods
    defineField({
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'array',
      group: 'contactMethods',
      of: [
        {
          type: 'object',
          name: 'contactMethod',
          title: 'Contact Method',
          fields: [
            defineField({ name: 'iconType', title: 'Icon', type: 'string', options: { list: [
              { title: 'Phone', value: 'phone' },
              { title: 'Email', value: 'email' },
              { title: 'Location', value: 'location' },
              { title: 'Demo / Lightning', value: 'demo' },
            ]}}),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'details', title: 'Details', type: 'string', description: 'Main info (phone number, email address, etc.)' }),
            defineField({ name: 'description', title: 'Description', type: 'string', description: 'Supporting text below details' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'details' },
          },
        },
      ],
    }),

    // Departments
    defineField({
      name: 'departments',
      title: 'Departments',
      type: 'array',
      group: 'departments',
      of: [
        {
          type: 'object',
          name: 'department',
          title: 'Department',
          fields: [
            defineField({ name: 'title', title: 'Department Name', type: 'string' }),
            defineField({ name: 'email', title: 'Email', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({ name: 'iconType', title: 'Icon', type: 'string', options: { list: [
              { title: 'Growth / Chart', value: 'growth' },
              { title: 'Settings / Gear', value: 'settings' },
              { title: 'Enterprise / Building', value: 'enterprise' },
              { title: 'Partnerships / People', value: 'partnerships' },
              { title: 'Press / Pen', value: 'press' },
              { title: 'Careers / Briefcase', value: 'careers' },
            ]}}),
            defineField({ name: 'responseTime', title: 'Response Time', type: 'string', description: 'e.g. "2 hours", "30 minutes"' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'email' },
          },
        },
      ],
    }),

    // Form Section
    defineField({
      name: 'formSectionTitle',
      title: 'Form Section Title',
      type: 'string',
      group: 'formSection',
    }),
    defineField({
      name: 'formSectionDescription',
      title: 'Form Section Description',
      type: 'text',
      rows: 2,
      group: 'formSection',
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'formSection',
      description: 'Displayed above address, e.g. "Moving Walls Pte Ltd"',
    }),
    defineField({
      name: 'companyAddress',
      title: 'Company Address',
      type: 'text',
      rows: 3,
      group: 'formSection',
    }),
    defineField({
      name: 'companyPhone',
      title: 'Phone Number',
      type: 'string',
      group: 'formSection',
    }),
    defineField({
      name: 'companyEmail',
      title: 'Email',
      type: 'string',
      group: 'formSection',
    }),
    defineField({
      name: 'zohoFormUrl',
      title: 'Zoho Form URL',
      type: 'url',
      group: 'formSection',
      description: 'The Zoho form iframe src URL',
    }),
    defineField({
      name: 'zohoFormHeight',
      title: 'Zoho Form Height (px)',
      type: 'number',
      group: 'formSection',
      initialValue: 800,
    }),

    // Offices section headings
    defineField({
      name: 'officesSectionTitle',
      title: 'Offices Section Title',
      type: 'string',
      group: 'hero',
      description: 'e.g. "Our Global Presence"',
    }),
    defineField({
      name: 'officesSectionDescription',
      title: 'Offices Section Description',
      type: 'string',
      group: 'hero',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
})
