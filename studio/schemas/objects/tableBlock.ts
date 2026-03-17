import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tableBlock',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'caption',
      title: 'Table Caption (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'headers',
      title: 'Column Headers',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tableRow',
          fields: [
            {
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{type: 'string'}],
            },
          ],
          preview: {
            select: {cells: 'cells'},
            prepare({cells}) {
              return {
                title: cells?.join(' | ') || 'Empty row',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'striped',
      title: 'Striped Rows',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'bordered',
      title: 'Show Borders',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {caption: 'caption', headers: 'headers', rows: 'rows'},
    prepare({caption, headers, rows}) {
      const colCount = headers?.length || 0
      const rowCount = rows?.length || 0
      return {
        title: caption || '📋 Table',
        subtitle: `${colCount} columns × ${rowCount} rows`,
      }
    },
  },
})
