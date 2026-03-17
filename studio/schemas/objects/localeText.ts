import {defineField, defineType} from 'sanity'

// Locale text for longer translatable content (descriptions, body text, etc.)
export default defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fieldsets: [
    {
      name: 'translations',
      title: 'Translations',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    defineField({
      name: 'en',
      title: '🇺🇸 English',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'zh',
      title: '🇨🇳 Chinese',
      type: 'text',
      rows: 4,
      fieldset: 'translations',
    }),
    defineField({
      name: 'ja',
      title: '🇯🇵 Japanese',
      type: 'text',
      rows: 4,
      fieldset: 'translations',
    }),
    defineField({
      name: 'ko',
      title: '🇰🇷 Korean',
      type: 'text',
      rows: 4,
      fieldset: 'translations',
    }),
    defineField({
      name: 'id',
      title: '🇮🇩 Indonesian',
      type: 'text',
      rows: 4,
      fieldset: 'translations',
    }),
  ],
})
