import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'trustBar',
  title: 'Trust Bar',
  type: 'document',
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      description: 'Key stats displayed in the trust bar on the homepage',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "40+", "1,500+", "1,000,000+"' }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Markets Covered"' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Trust Bar' }
    },
  },
})
