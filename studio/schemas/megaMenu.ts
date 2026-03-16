import {defineType, defineField} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export default defineType({
  name: 'megaMenu',
  title: 'Mega Menu',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Configuration Title',
      type: 'string',
      description: 'Internal title for this menu configuration',
      initialValue: 'Main Navigation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainNavItems',
      title: 'Main Navigation Items',
      type: 'array',
      of: [{type: 'menuItem'}],
      description: 'Add and arrange the main navigation items. Drag to reorder.',
      validation: (Rule) => Rule.required().min(1).error('At least one navigation item is required'),
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      description: 'Optional call-to-action button in the header (e.g., "Contact Us")',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show CTA Button',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Contact Us',
        }),
        defineField({
          name: 'linkType',
          title: 'Link Type',
          type: 'string',
          options: {
            list: [
              {title: 'Custom URL', value: 'custom'},
              {title: 'Internal Page', value: 'internal'},
            ],
          },
          initialValue: 'internal',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
          hidden: ({parent}) => parent?.linkType !== 'custom',
        }),
        defineField({
          name: 'internalPage',
          title: 'Internal Page',
          type: 'string',
          options: {
            list: [
              {title: 'Contact', value: '/contact'},
              {title: 'Book Demo', value: '/book-demo'},
              {title: 'Get Started', value: '/get-started'},
              {title: 'Careers', value: '/careers'},
            ],
          },
          initialValue: '/contact',
          hidden: ({parent}) => parent?.linkType !== 'internal',
        }),
        defineField({
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              {title: 'Primary', value: 'primary'},
              {title: 'Secondary', value: 'secondary'},
              {title: 'Outline', value: 'outline'},
            ],
          },
          initialValue: 'primary',
        }),
      ],
    }),
    defineField({
      name: 'settings',
      title: 'Menu Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'stickyHeader',
          title: 'Sticky Header',
          type: 'boolean',
          description: 'Keep the header fixed at the top when scrolling',
          initialValue: true,
        }),
        defineField({
          name: 'transparentOnHero',
          title: 'Transparent on Hero',
          type: 'boolean',
          description: 'Make header transparent when over hero sections',
          initialValue: false,
        }),
        defineField({
          name: 'showLanguageSwitcher',
          title: 'Show Language Switcher',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showSearch',
          title: 'Show Search',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'mobileBreakpoint',
          title: 'Mobile Breakpoint',
          type: 'number',
          description: 'Screen width (in pixels) at which to show mobile menu',
          initialValue: 1024,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'mainNavItems',
    },
    prepare({title, items}) {
      const count = items?.length || 0
      return {
        title: title || 'Mega Menu',
        subtitle: `${count} navigation item${count !== 1 ? 's' : ''}`,
        media: MenuIcon,
      }
    },
  },
})
