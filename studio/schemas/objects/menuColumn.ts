import {defineType, defineField} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'menuColumn',
  title: 'Menu Column',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Column Heading',
      type: 'string',
      description: 'Optional heading for this column',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'menuLink'}],
      validation: (Rule) => Rule.min(1).error('At least one link is required'),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      links: 'links',
    },
    prepare({heading, links}) {
      const count = links?.length || 0
      return {
        title: heading || 'Untitled Column',
        subtitle: `${count} link${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
