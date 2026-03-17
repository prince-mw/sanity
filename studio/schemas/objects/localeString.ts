import {defineField, defineType} from 'sanity'

// Locale string for short translatable text (titles, labels, etc.)
export default defineType({
  name: 'localeString',
  title: 'Localized String',
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
      type: 'string',
    }),
    defineField({
      name: 'zh',
      title: '🇨🇳 Chinese',
      type: 'string',
      fieldset: 'translations',
    }),
    defineField({
      name: 'ja',
      title: '🇯🇵 Japanese',
      type: 'string',
      fieldset: 'translations',
    }),
    defineField({
      name: 'ko',
      title: '🇰🇷 Korean',
      type: 'string',
      fieldset: 'translations',
    }),
    defineField({
      name: 'id',
      title: '🇮🇩 Indonesian',
      type: 'string',
      fieldset: 'translations',
    }),
  ],
})
