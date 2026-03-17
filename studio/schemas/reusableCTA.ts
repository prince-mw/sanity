import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'reusableCTA',
  title: 'Call-to-Action Block',
  type: 'document',
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      description: 'Used for identifying this CTA in the CMS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'localeText',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'localeString',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button (Optional)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'localeString',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string',
        },
        {
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Centered', value: 'centered'},
          {title: 'Left Aligned', value: 'left'},
          {title: 'Split (Text + Image)', value: 'split'},
          {title: 'Banner', value: 'banner'},
          {title: 'Compact', value: 'compact'},
        ],
      },
      initialValue: 'centered',
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
      initialValue: 'blue',
    }),
    defineField({
      name: 'showPattern',
      title: 'Show Background Pattern',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'categories',
      title: 'Usage Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Blog Footer', value: 'blog-footer'},
          {title: 'Page Footer', value: 'page-footer'},
          {title: 'Hero Section', value: 'hero'},
          {title: 'Sidebar', value: 'sidebar'},
          {title: 'Newsletter', value: 'newsletter'},
          {title: 'Contact', value: 'contact'},
          {title: 'Demo Request', value: 'demo'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      internalName: 'internalName',
      heading: 'heading.en',
      layout: 'layout',
      theme: 'theme',
    },
    prepare({internalName, heading, layout, theme}) {
      return {
        title: internalName,
        subtitle: `${heading} • ${layout} • ${theme}`,
      }
    },
  },
})
