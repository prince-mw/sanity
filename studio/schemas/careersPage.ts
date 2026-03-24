import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Careers Page',
      readOnly: true,
    }),

    // Hero Section
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      description: 'Small badge text above the hero headline (e.g. "Join Our Team")',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title Line 1',
      type: 'string',
      description: 'First line of the hero headline',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero Title Line 2 (Highlighted)',
      type: 'string',
      description: 'Second line of the hero headline (shown in blue)',
      group: 'hero',
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
      description: 'Text for the main hero button (e.g. "View Open Roles")',
      group: 'hero',
    }),
    defineField({
      name: 'stats',
      title: 'Company Stats',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number/Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // Benefits Section
    defineField({
      name: 'benefitsTitle',
      title: 'Benefits Section Title',
      type: 'string',
      group: 'benefits',
    }),
    defineField({
      name: 'benefitsDescription',
      title: 'Benefits Section Description',
      type: 'text',
      rows: 2,
      group: 'benefits',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      group: 'benefits',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({
              name: 'iconName',
              title: 'Icon Name',
              type: 'string',
              description: 'Icon identifier: heart, dollar, book, globe, people, lightning',
              options: {
                list: [
                  { title: 'Heart (Health)', value: 'heart' },
                  { title: 'Dollar (Compensation)', value: 'dollar' },
                  { title: 'Book (Learning)', value: 'book' },
                  { title: 'Globe (Flexible Work)', value: 'globe' },
                  { title: 'People (Team)', value: 'people' },
                  { title: 'Lightning (Innovation)', value: 'lightning' },
                ],
              },
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
      validation: (Rule) => Rule.max(9),
    }),

    // Departments Section
    defineField({
      name: 'departmentsTitle',
      title: 'Departments Section Title',
      type: 'string',
      group: 'departments',
    }),
    defineField({
      name: 'departmentsDescription',
      title: 'Departments Section Description',
      type: 'text',
      rows: 2,
      group: 'departments',
    }),
    defineField({
      name: 'departments',
      title: 'Departments',
      type: 'array',
      group: 'departments',
      description: 'Role counts are automatically calculated from active Job Positions.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Department Name', type: 'string' }),
            defineField({
              name: 'departmentKey',
              title: 'Department Key',
              type: 'string',
              description: 'Must match the department value in Job Position schema',
              options: {
                list: [
                  { title: 'Engineering', value: 'engineering' },
                  { title: 'Sales', value: 'sales' },
                  { title: 'Marketing', value: 'marketing' },
                  { title: 'Data & Analytics', value: 'data-analytics' },
                  { title: 'Design', value: 'design' },
                  { title: 'Operations', value: 'operations' },
                  { title: 'Finance', value: 'finance' },
                  { title: 'Human Resources', value: 'hr' },
                  { title: 'Product', value: 'product' },
                ],
              },
            }),
            defineField({
              name: 'color',
              title: 'Color Theme',
              type: 'string',
              description: 'Tailwind CSS classes for badge styling',
              options: {
                list: [
                  { title: 'Blue', value: 'bg-blue-100 text-blue-600' },
                  { title: 'Green', value: 'bg-green-100 text-green-600' },
                  { title: 'Purple', value: 'bg-purple-100 text-purple-600' },
                  { title: 'Orange', value: 'bg-orange-100 text-orange-600' },
                  { title: 'Pink', value: 'bg-pink-100 text-pink-600' },
                  { title: 'Indigo', value: 'bg-indigo-100 text-indigo-600' },
                  { title: 'Red', value: 'bg-red-100 text-red-600' },
                  { title: 'Teal', value: 'bg-teal-100 text-teal-600' },
                  { title: 'Yellow', value: 'bg-yellow-100 text-yellow-600' },
                ],
              },
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'departmentKey' },
          },
        },
      ],
    }),

    // Open Positions Section
    defineField({
      name: 'openPositionsTitle',
      title: 'Open Positions Section Title',
      type: 'string',
      group: 'positions',
    }),
    defineField({
      name: 'openPositionsDescription',
      title: 'Open Positions Section Description',
      type: 'text',
      rows: 2,
      group: 'positions',
    }),

    // CTA Section
    defineField({
      name: 'ctaTitle',
      title: 'CTA Heading',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 3,
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimaryButtonLink',
      title: 'Primary Button Link',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSecondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSecondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
      group: 'cta',
    }),
  ],
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'benefits', title: 'Benefits' },
    { name: 'departments', title: 'Departments' },
    { name: 'positions', title: 'Open Positions' },
    { name: 'cta', title: 'Call to Action' },
  ],
  preview: {
    prepare() {
      return { title: 'Careers Page' }
    },
  },
})
