import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'analyticsConfig',
  title: 'Analytics & Tracking',
  type: 'document',
  icon: () => '📊',
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Name',
      type: 'string',
      initialValue: 'Site Analytics Configuration',
      readOnly: true,
    }),
    // Google Analytics Section
    defineField({
      name: 'googleAnalytics',
      title: 'Google Analytics (GA4)',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Google Analytics',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'measurementId',
          title: 'Measurement ID',
          type: 'string',
          description: 'Your GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    // Google Tag Manager Section
    defineField({
      name: 'googleTagManager',
      title: 'Google Tag Manager',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Google Tag Manager',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'containerId',
          title: 'Container ID',
          type: 'string',
          description: 'Your GTM Container ID (e.g., GTM-XXXXXXX)',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    // Meta Pixel Section
    defineField({
      name: 'metaPixel',
      title: 'Meta Pixel (Facebook/Instagram)',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Meta Pixel',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'pixelId',
          title: 'Pixel ID',
          type: 'string',
          description: 'Your Meta Pixel ID (e.g., 123456789012345)',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    // LinkedIn Insight Tag Section
    defineField({
      name: 'linkedinInsight',
      title: 'LinkedIn Insight Tag',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable LinkedIn Insight Tag',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'partnerId',
          title: 'Partner ID',
          type: 'string',
          description: 'Your LinkedIn Partner ID (e.g., 1234567)',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    // Twitter/X Pixel Section
    defineField({
      name: 'twitterPixel',
      title: 'Twitter/X Pixel',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Twitter/X Pixel',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'pixelId',
          title: 'Pixel ID',
          type: 'string',
          description: 'Your Twitter/X Pixel ID',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    // TikTok Pixel Section
    defineField({
      name: 'tiktokPixel',
      title: 'TikTok Pixel',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable TikTok Pixel',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'pixelId',
          title: 'Pixel ID',
          type: 'string',
          description: 'Your TikTok Pixel ID',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
  ],
  preview: {
    select: {
      ga: 'googleAnalytics.enabled',
      meta: 'metaPixel.enabled',
      linkedin: 'linkedinInsight.enabled',
    },
    prepare({ ga, meta, linkedin }) {
      const active = [ga && 'GA4', meta && 'Meta', linkedin && 'LinkedIn'].filter(Boolean)
      return {
        title: 'Analytics & Tracking',
        subtitle: active.length ? `Active: ${active.join(', ')}` : 'No tracking enabled',
      }
    },
  },
})
