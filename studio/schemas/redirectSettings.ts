import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'redirectSettings',
  title: 'URL Redirects',
  type: 'document',
  fields: [
    defineField({
      name: 'redirects',
      title: 'URL Redirects',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'redirect',
          title: 'Redirect Rule',
          fields: [
            defineField({
              name: 'source',
              title: 'Old URL (Source)',
              type: 'string',
              description: 'The old URL path to redirect from, e.g. /old-page',
              validation: (Rule) =>
                Rule.required()
                  .custom((value) => {
                    if (!value) return 'Source URL is required'
                    if (!value.startsWith('/')) return 'Must start with /'
                    if (value.includes(' ')) return 'Must not contain spaces'
                    return true
                  }),
            }),
            defineField({
              name: 'destination',
              title: 'New URL (Destination)',
              type: 'string',
              description: 'The new URL path to redirect to, e.g. /new-page or https://example.com/page',
              validation: (Rule) =>
                Rule.required()
                  .custom((value) => {
                    if (!value) return 'Destination URL is required'
                    if (!value.startsWith('/') && !value.startsWith('http')) return 'Must start with / or http'
                    if (value.includes(' ')) return 'Must not contain spaces'
                    return true
                  }),
            }),
            defineField({
              name: 'permanent',
              title: 'Permanent Redirect (301)',
              type: 'boolean',
              description: 'Enable for 301 (permanent). Disable for 302 (temporary).',
              initialValue: true,
            }),
            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              description: 'Enable or disable this redirect rule',
              initialValue: true,
            }),
            defineField({
              name: 'note',
              title: 'Internal Note',
              type: 'string',
              description: 'Optional note for your reference (not visible on the site)',
            }),
          ],
          preview: {
            select: {
              source: 'source',
              destination: 'destination',
              permanent: 'permanent',
              isActive: 'isActive',
            },
            prepare({source, destination, permanent, isActive}) {
              const status = isActive === false ? '🔴' : '🟢'
              const type = permanent ? '301' : '302'
              return {
                title: `${status} ${source || '(no source)'}`,
                subtitle: `→ ${destination || '(no destination)'} [${type}]`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'URL Redirects',
        subtitle: 'Manage URL redirect mappings',
      }
    },
  },
})
