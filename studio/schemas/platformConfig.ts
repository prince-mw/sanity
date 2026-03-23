import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'platformConfig',
  title: 'Platform Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'MW Platform Ecosystem',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'dataSources',
      title: 'Data Sources',
      description: 'Input data sources shown on the left side of the architecture diagram',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'iconType', title: 'Icon Type', type: 'string', description: 'Icon identifier (e.g. users, map-pin, chart, cloud)' }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'aiSteps',
      title: 'AI Processing Steps',
      description: 'AI processing steps shown in the center of the architecture diagram',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'iconType', title: 'Icon Type', type: 'string' }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'outputs',
      title: 'Platform Outputs',
      description: 'Output capabilities shown on the right side of the architecture diagram',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'iconType', title: 'Icon Type', type: 'string' }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'products',
      title: 'Platform Products',
      description: 'Product cards shown at the bottom of the architecture diagram',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link URL', type: 'string' }),
            defineField({ name: 'iconType', title: 'Icon Type', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
