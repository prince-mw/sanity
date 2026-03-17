import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'accordionBlock',
  title: 'Accordion/FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Accordion Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'accordionItem',
          fields: [
            {
              name: 'question',
              title: 'Question/Header',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer/Content',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {question: 'question', answer: 'answer'},
            prepare({question, answer}) {
              return {
                title: question,
                subtitle: answer?.substring(0, 60) + '...',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'allowMultiple',
      title: 'Allow Multiple Open',
      type: 'boolean',
      description: 'Allow multiple accordion items to be open at once',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', items: 'items'},
    prepare({title, items}) {
      return {
        title: title || '❓ FAQ/Accordion',
        subtitle: `${items?.length || 0} items`,
      }
    },
  },
})
