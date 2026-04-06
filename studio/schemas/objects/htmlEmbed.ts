import {defineType} from 'sanity'

export default defineType({
  name: 'htmlEmbed',
  title: 'HTML Embed',
  type: 'object',
  fields: [
    {
      name: 'code',
      type: 'text',
      title: 'HTML Code',
      rows: 10,
      description: 'Paste HTML code to render on the page (iframes, embeds, widgets, custom HTML, etc.)',
    },
  ],
  preview: {
    select: {code: 'code'},
    prepare({code}: {code?: string}) {
      const preview = code ? code.substring(0, 60).replaceAll('\n', ' ') + '...' : 'Empty'
      return {title: 'HTML Embed', subtitle: preview}
    },
  },
})
