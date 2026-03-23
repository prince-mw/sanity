import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'apiReferencePage',
  title: 'API Reference Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'API Reference & Developer Resources',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'endpoints',
      title: 'API Endpoints',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'method', title: 'HTTP Method', type: 'string', options: { list: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] } }),
            defineField({ name: 'endpoint', title: 'Endpoint Path', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({ name: 'params', title: 'Parameters', type: 'array', of: [{ type: 'string' }] }),
          ],
          preview: {
            select: { title: 'endpoint', subtitle: 'method' },
          },
        },
      ],
    }),
    defineField({
      name: 'sdks',
      title: 'Official SDKs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'SDK Name', type: 'string' }),
            defineField({ name: 'language', title: 'Programming Language', type: 'string' }),
            defineField({ name: 'installCommand', title: 'Install Command', type: 'string' }),
            defineField({ name: 'docsUrl', title: 'Documentation URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'installCommand' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
