import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'reusableStatBlock',
  title: 'Statistics Block',
  type: 'document',
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      description: 'Used for identifying this stat block in the CMS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Block Title',
      type: 'localeString',
      description: 'Optional title displayed above the stats',
    }),
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
              type: 'localeString',
              description: 'e.g., "Customer Satisfaction"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description (Optional)',
              type: 'localeString',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Chart Up', value: 'chart-up'},
                  {title: 'Users', value: 'users'},
                  {title: 'Globe', value: 'globe'},
                  {title: 'Trophy', value: 'trophy'},
                  {title: 'Star', value: 'star'},
                  {title: 'Money', value: 'money'},
                  {title: 'Screen', value: 'screen'},
                  {title: 'Target', value: 'target'},
                ],
              },
            },
          ],
          preview: {
            select: {value: 'value', label: 'label.en'},
            prepare({value, label}) {
              return {title: value, subtitle: label}
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
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
          {title: 'Minimal', value: 'minimal'},
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
          {title: 'Gradient', value: 'gradient'},
        ],
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'categories',
      title: 'Usage Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Homepage', value: 'homepage'},
          {title: 'About', value: 'about'},
          {title: 'Products', value: 'products'},
          {title: 'Industries', value: 'industries'},
          {title: 'Case Studies', value: 'case-studies'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      internalName: 'internalName',
      stats: 'stats',
      theme: 'theme',
    },
    prepare({internalName, stats, theme}) {
      return {
        title: internalName,
        subtitle: `${stats?.length || 0} stats • ${theme} theme`,
      }
    },
  },
})
