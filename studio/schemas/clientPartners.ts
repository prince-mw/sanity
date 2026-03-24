import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'clientPartners',
  title: 'Client Partners',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Heading above the partner logos',
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'string',
      description: 'Subtext below the partner logos',
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Partner Name', type: 'string' }),
            defineField({ name: 'category', title: 'Category', type: 'string', description: 'e.g. "DOOH SSP", "OOH Marketplace"' }),
            defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'url', title: 'Website URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'category', media: 'logo' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Client Partners' }
    },
  },
})
