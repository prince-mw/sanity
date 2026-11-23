import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ctaButton',
  title: 'Call to Action Button',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Internal path (e.g., /contact) or external URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Blue)', value: 'primary'},
          {title: 'Secondary (Outline)', value: 'secondary'},
          {title: 'Dark', value: 'dark'},
          {title: 'Link with Arrow', value: 'link'},
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'secondaryText',
      title: 'Second Button Text (optional)',
      type: 'string',
      description: 'Fill this and the second URL to show a second button beside the first, in the same row',
    }),
    defineField({
      name: 'secondaryUrl',
      title: 'Second Button URL',
      type: 'string',
      description: 'Internal path (e.g., /locations/india) or external URL',
    }),
    defineField({
      name: 'secondaryStyle',
      title: 'Second Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Blue)', value: 'primary'},
          {title: 'Secondary (Outline)', value: 'secondary'},
          {title: 'Dark', value: 'dark'},
          {title: 'Link with Arrow', value: 'link'},
        ],
      },
      initialValue: 'secondary',
    }),
  ],
  preview: {
    select: {text: 'text', url: 'url', style: 'style'},
    prepare({text, url, style}) {
      return {
        title: text,
        subtitle: `${style} → ${url}`,
      }
    },
  },
})
