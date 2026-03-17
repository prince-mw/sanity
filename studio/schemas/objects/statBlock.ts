import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'statBlock',
  title: 'Statistics Block',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "98%", "2.8B+", "$50M"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Customer Satisfaction", "Screens Available"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description (Optional)',
              type: 'string',
            },
          ],
          preview: {
            select: {value: 'value', label: 'label'},
            prepare({value, label}) {
              return {title: value, subtitle: label}
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid (2x2)', value: 'grid'},
          {title: 'Row', value: 'row'},
          {title: 'Cards', value: 'cards'},
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Brand Blue', value: 'blue'},
        ],
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: {stats: 'stats'},
    prepare({stats}) {
      const count = stats?.length || 0
      return {
        title: `Statistics Block`,
        subtitle: `${count} stat${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
