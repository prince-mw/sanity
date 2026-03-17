import {defineField, defineType} from 'sanity'

// Reusable publishing workflow object type for all content schemas
export default defineType({
  name: 'publishingWorkflow',
  title: 'Publishing',
  type: 'object',
  fields: [
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to show/hide this content on the website',
      initialValue: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'published',
    }),
  ],
})

// Helper fields to include directly in schemas that don't use the object type
export const publishingFields = [
  defineField({
    name: 'isPublished',
    title: 'Published',
    type: 'boolean',
    description: 'Toggle to show/hide this content on the website',
    initialValue: true,
    group: 'publishing',
  }),
  defineField({
    name: 'status',
    title: 'Status',
    type: 'string',
    options: {
      list: [
        {title: 'Draft', value: 'draft'},
        {title: 'Published', value: 'published'},
        {title: 'Archived', value: 'archived'},
      ],
      layout: 'radio',
    },
    initialValue: 'published',
    group: 'publishing',
  }),
]

// Helper to get status badge for previews
export function getStatusBadge(isPublished?: boolean, status?: string): string {
  if (status === 'archived') return '[Archived]'
  if (status === 'draft' || isPublished === false) return '[Draft]'
  return ''
}
