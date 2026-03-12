import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quarter',
      title: 'Quarter',
      type: 'string',
      options: {
        list: [
          { title: 'Q1', value: 'Q1' },
          { title: 'Q2', value: 'Q2' },
          { title: 'Q3', value: 'Q3' },
          { title: 'Q4', value: 'Q4' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'achievement',
      title: 'Key Achievement',
      type: 'string',
      description: 'e.g., $2M funding, 50 employees',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name for visual display',
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Orange', value: 'orange' },
          { title: 'Red', value: 'red' },
        ],
      },
    }),
    defineField({
      name: 'phase',
      title: 'Growth Phase',
      type: 'string',
      options: {
        list: [
          { title: 'Startup Era', value: 'startup' },
          { title: 'Expansion Era', value: 'expansion' },
          { title: 'Innovation Era', value: 'innovation' },
          { title: 'Global Era', value: 'global' },
        ],
      },
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics at This Time',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isHighlight',
      title: 'Is Highlight Event',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as a major milestone',
    }),
  ],
  orderings: [
    {
      title: 'Chronological',
      name: 'chronological',
      by: [
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      quarter: 'quarter',
    },
    prepare({ title, year, quarter }) {
      return {
        title: title,
        subtitle: `${year} ${quarter || ''}`.trim(),
      }
    },
  },
})
