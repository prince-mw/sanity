import {defineField, defineType} from 'sanity'

// Locale block content for rich text translations
export default defineType({
  name: 'localeBlockContent',
  title: 'Localized Block Content',
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
      type: 'blockContent',
    }),
    defineField({
      name: 'zh',
      title: '🇨🇳 Chinese',
      type: 'blockContent',
      fieldset: 'translations',
    }),
    defineField({
      name: 'ja',
      title: '🇯🇵 Japanese',
      type: 'blockContent',
      fieldset: 'translations',
    }),
    defineField({
      name: 'ko',
      title: '🇰🇷 Korean',
      type: 'blockContent',
      fieldset: 'translations',
    }),
    defineField({
      name: 'id',
      title: '🇮🇩 Indonesian',
      type: 'blockContent',
      fieldset: 'translations',
    }),
  ],
})
