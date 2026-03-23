import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'communityPage',
  title: 'Community Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Join Our Community',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'stats',
      title: 'Community Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'number' },
          },
        },
      ],
    }),
    defineField({
      name: 'discussions',
      title: 'Featured Discussions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'author', title: 'Author', type: 'string' }),
            defineField({ name: 'replies', title: 'Replies', type: 'number' }),
            defineField({ name: 'views', title: 'Views', type: 'number' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'author' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
