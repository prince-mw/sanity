import {defineType, defineField} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'menuType',
      title: 'Menu Type',
      type: 'string',
      options: {
        list: [
          {title: 'Simple Link', value: 'link'},
          {title: 'Mega Menu Dropdown', value: 'megaMenu'},
        ],
        layout: 'radio',
      },
      initialValue: 'link',
    }),
    // Simple link fields
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Custom URL', value: 'custom'},
          {title: 'Internal Page', value: 'internal'},
        ],
        layout: 'radio',
      },
      initialValue: 'custom',
      hidden: ({parent}) => parent?.menuType !== 'link',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'External or internal URL path',
      hidden: ({parent}) => parent?.menuType !== 'link' || parent?.linkType !== 'custom',
    }),
    defineField({
      name: 'internalPage',
      title: 'Internal Page',
      type: 'string',
      options: {
        list: [
          {title: 'Home', value: '/'},
          {title: 'About', value: '/about'},
          {title: 'Our Story', value: '/our-story'},
          {title: 'Contact', value: '/contact'},
          {title: 'Blog', value: '/blog'},
          {title: 'Careers', value: '/careers'},
        ],
      },
      hidden: ({parent}) => parent?.menuType !== 'link' || parent?.linkType !== 'internal',
    }),
    // Mega menu dropdown fields
    defineField({
      name: 'columns',
      title: 'Menu Columns',
      type: 'array',
      of: [{type: 'menuColumn'}],
      description: 'Add columns to the mega menu (supports unlimited columns)',
      hidden: ({parent}) => parent?.menuType !== 'megaMenu',
      validation: (Rule) =>
        Rule.custom((columns, context) => {
          const parent = context.parent as {menuType?: string}
          if (parent?.menuType === 'megaMenu' && (!columns || columns.length === 0)) {
            return 'At least one column is required for mega menu'
          }
          return true
        }),
    }),
    defineField({
      name: 'featuredContent',
      title: 'Featured Content',
      type: 'featuredContent',
      description: 'Optional promotional section shown in the mega menu',
      hidden: ({parent}) => parent?.menuType !== 'megaMenu',
    }),
    defineField({
      name: 'showFeaturedContent',
      title: 'Show Featured Content',
      type: 'boolean',
      description: 'Toggle to show/hide the featured content section',
      initialValue: false,
      hidden: ({parent}) => parent?.menuType !== 'megaMenu',
    }),
    // Styling options
    defineField({
      name: 'highlight',
      title: 'Highlight Style',
      type: 'string',
      description: 'Optional highlight style for CTAs',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Primary Button', value: 'primary'},
          {title: 'Secondary Button', value: 'secondary'},
          {title: 'Outline Button', value: 'outline'},
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Optional icon displayed next to the menu title',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.menuType !== 'link',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      menuType: 'menuType',
      columns: 'columns',
      highlight: 'highlight',
      media: 'icon',
    },
    prepare({title, menuType, columns, highlight, media}) {
      const colCount = columns?.length || 0
      let subtitle = menuType === 'megaMenu' ? `Mega Menu (${colCount} columns)` : 'Link'
      if (highlight && highlight !== 'none') {
        subtitle += ` • ${highlight}`
      }
      return {
        title: title || 'Untitled Menu Item',
        subtitle,
        media,
      }
    },
  },
})
