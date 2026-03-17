import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: '💡 Info', value: 'info'},
          {title: '⚠️ Warning', value: 'warning'},
          {title: '✅ Success', value: 'success'},
          {title: '❌ Error', value: 'error'},
          {title: '💬 Tip', value: 'tip'},
          {title: '📝 Note', value: 'note'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'title',
      title: 'Title (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      type: 'type',
      title: 'title',
      content: 'content',
    },
    prepare({type, title, content}) {
      const icons: Record<string, string> = {
        info: '💡',
        warning: '⚠️',
        success: '✅',
        error: '❌',
        tip: '💬',
        note: '📝',
      }
      return {
        title: title || `${icons[type] || '💡'} ${type?.charAt(0).toUpperCase()}${type?.slice(1)} Callout`,
        subtitle: content?.substring(0, 50) + (content?.length > 50 ? '...' : ''),
      }
    },
  },
})
