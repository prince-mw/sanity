import {defineField, defineType} from 'sanity'

// Translations of one page's copy into one language. Each entry pairs an English text shown on the page
// with its translation. If the English on the page is later changed, that text shows in English until a
// matching entry is added here.
export default defineType({
  name: 'pageTranslation',
  title: 'Page Translation',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'For Agencies', value: 'agencies'},
          {title: 'For Brands', value: 'brands'},
          {title: 'For Media Owners', value: 'media-owners'},
          {title: 'For Retailers', value: 'retail'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'Japanese', value: 'ja'},
          {title: 'Korean', value: 'ko'},
          {title: 'Chinese', value: 'zh'},
          {title: 'Bahasa Indonesia', value: 'id'},
          {title: 'Spanish', value: 'es'},
          {title: 'Portuguese', value: 'pt'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'entries',
      title: 'Translations',
      description: 'English text on the page → its translation. Edit the translation column only.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'source', title: 'English', type: 'text', rows: 2, readOnly: true}),
            defineField({name: 'translation', title: 'Translation', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'translation', subtitle: 'source'}},
        },
      ],
    }),
  ],
  preview: {
    select: {page: 'page', language: 'language', entries: 'entries'},
    prepare: ({page, language, entries}) => ({
      title: `${page} — ${language}`,
      subtitle: `${entries?.length || 0} texts`,
    }),
  },
})
