import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'helpCenterFaq',
  title: 'Help Center FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Getting Started', value: 'Getting Started' },
          { title: 'Account & Billing', value: 'Account & Billing' },
          { title: 'Platform Features', value: 'Platform Features' },
          { title: 'Troubleshooting', value: 'Troubleshooting' },
          { title: 'Integrations', value: 'Integrations' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
  orderings: [
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }, { field: 'order', direction: 'asc' }],
    },
  ],
})
