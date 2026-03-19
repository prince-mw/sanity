import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'zohoForm',
  title: 'Zoho Form',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Form Name',
      type: 'string',
      description: 'Internal name to identify this form (e.g., "ICC Coffee Table E-book Form")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formUrl',
      title: 'Zoho Form URL',
      type: 'url',
      description: 'Full Zoho form URL (e.g., https://forms.zohopublic.com/...)',
      validation: (Rule) => Rule.required().uri({scheme: ['https']}),
    }),
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          {title: 'E-book Download', value: 'ebook'},
          {title: 'Contact Form', value: 'contact'},
          {title: 'Newsletter Signup', value: 'newsletter'},
          {title: 'Demo Request', value: 'demo'},
          {title: 'Event Registration', value: 'event'},
          {title: 'Webinar Signup', value: 'webinar'},
          {title: 'General Lead Capture', value: 'lead'},
          {title: 'Other', value: 'other'},
        ],
      },
      initialValue: 'ebook',
    }),
    defineField({
      name: 'embedSettings',
      title: 'Embed Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'displayMode',
          title: 'Display Mode',
          type: 'string',
          options: {
            list: [
              {title: 'Embedded (Iframe)', value: 'iframe'},
              {title: 'Modal/Popup', value: 'modal'},
              {title: 'Open in New Tab', value: 'newtab'},
            ],
          },
          initialValue: 'iframe',
        }),
        defineField({
          name: 'height',
          title: 'Iframe Height (px)',
          type: 'number',
          description: 'Height of the embedded form (default: 600)',
          initialValue: 600,
        }),
        defineField({
          name: 'width',
          title: 'Iframe Width',
          type: 'string',
          description: 'Width of the embedded form (e.g., "100%" or "500px")',
          initialValue: '100%',
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional description for CMS users',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to enable/disable this form',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      formType: 'formType',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, formType, isActive} = selection
      const typeLabels: Record<string, string> = {
        ebook: '📚 E-book',
        contact: '📞 Contact',
        newsletter: '📧 Newsletter',
        demo: '🎯 Demo',
        event: '📅 Event',
        webinar: '🎥 Webinar',
        lead: '👤 Lead',
        other: '📝 Other',
      }
      return {
        title: title,
        subtitle: `${typeLabels[formType] || formType} ${isActive ? '' : '(Inactive)'}`,
      }
    },
  },
})
