import {defineField} from 'sanity'

// Optional per-language versions of an existing English field, kept as a separate sibling field
// so the original field (and every page that reads it) is untouched. The website shows the
// visitor's language when filled in here, otherwise the English field.
export function translationsField(name: string, title: string, kind: 'string' | 'text' = 'string', extra: Record<string, unknown> = {}) {
  const languages = [
    {name: 'es', title: 'Spanish'},
    {name: 'ja', title: 'Japanese'},
    {name: 'ko', title: 'Korean'},
    {name: 'id', title: 'Indonesian'},
    {name: 'zh', title: 'Chinese'},
  ]
  return defineField({
    name,
    title,
    type: 'object',
    description: 'Optional. Leave a language empty to show the English text for it.',
    options: {collapsible: true, collapsed: true},
    fields: languages.map((lang) =>
      defineField({name: lang.name, title: lang.title, type: kind, ...(kind === 'text' ? {rows: 3} : {})}),
    ),
    ...extra,
  })
}
