import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'zohoForm',
  title: 'Zoho Form',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'basic', title: 'Basic Info', default: true},
    {name: 'iframe', title: 'Iframe Settings'},
    {name: 'native', title: 'Native Form Builder'},
    {name: 'submission', title: 'Submission Settings'},
  ],
  fields: [
    // ── Basic Info ──────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Form Name',
      type: 'string',
      description: 'Internal name to identify this form (e.g., "Contact Us - Homepage")',
      validation: (Rule) => Rule.required(),
      group: 'basic',
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
      initialValue: 'contact',
      group: 'basic',
    }),
    defineField({
      name: 'assignedPages',
      title: 'Assigned Pages',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Select one or more pages where this form should appear. The form will be rendered on each selected page.',
      options: {
        list: [
          // ── Core Pages ──
          {title: 'Home', value: '/'},
          {title: 'About', value: '/about'},
          {title: 'Platform', value: '/platform'},
          {title: 'Contact', value: '/contact'},
          {title: 'Community', value: '/community'},
          // ── Solutions (Audience) ──
          {title: 'Brands', value: '/brands'},
          {title: 'Agencies', value: '/agencies'},
          {title: 'Media Owners', value: '/media-owners'},
          // ── Industry Pages ──
          {title: 'Finance', value: '/finance'},
          {title: 'Healthcare', value: '/healthcare'},
          {title: 'Retail', value: '/retail'},
          // ── Product Pages ──
          {title: 'MW Planner', value: '/mw-planner'},
          {title: 'MW Activate', value: '/mw-activate'},
          {title: 'MW Market', value: '/mw-market'},
          {title: 'MW Measure', value: '/mw-measure'},
          {title: 'MW Science', value: '/mw-science'},
          {title: 'MW Studio', value: '/mw-studio'},
          {title: 'MW Influence', value: '/mw-influence'},
          // ── Content / Resources ──
          {title: 'Blog', value: '/blog'},
          {title: 'Case Studies', value: '/case-studies'},
          {title: 'E-books', value: '/ebooks'},
          {title: 'Whitepapers', value: '/whitepapers'},
          {title: 'Events', value: '/events'},
          {title: 'Webinars', value: '/webinars'},
          {title: 'Press & News', value: '/press-news'},
          // ── Company / Info ──
          {title: 'Careers', value: '/careers'},
          {title: 'Leadership', value: '/leadership'},
          {title: 'Locations', value: '/locations'},
          {title: 'Integrations', value: '/integrations'},
          {title: 'OOH Formats', value: '/ooh-formats'},
          {title: 'Our Story', value: '/our-story'},
          {title: 'Our Journey', value: '/our-journey'},
          {title: 'Moving Hearts', value: '/movinghearts'},
          // ── Special / Feature Pages ──
          {title: 'AI Powered Audience Targeting', value: '/ai-powered-audience-targeting'},
          {title: 'Adtech Company of Year', value: '/adtech-company-of-year'},
          {title: 'London Headquarters', value: '/london-headquarters'},
          {title: 'Series C Funding', value: '/series-c-funding'},
          {title: 'Transit Partnership', value: '/transit-partnership'},
          {title: 'Privacy-First Measurement', value: '/privacy-first-measurement'},
          // ── Docs / Help ──
          {title: 'Documentation', value: '/documentation'},
          {title: 'API Reference', value: '/api-reference'},
          {title: 'Help Center', value: '/help-center'},
          // ── Legal ──
          {title: 'Privacy Policy', value: '/privacy'},
          {title: 'Terms of Service', value: '/terms'},
          {title: 'Cookie Policy', value: '/cookies'},
        ],
      },
      group: 'basic',
    }),
    defineField({
      name: 'renderMode',
      title: 'Render Mode',
      type: 'string',
      description:
        'Iframe: Embeds the Zoho form URL directly. Native: Renders a custom form that submits to the Zoho API.',
      options: {
        list: [
          {title: 'Iframe Embed (existing Zoho URL)', value: 'iframe'},
          {title: 'Native Rendered Form (dynamic fields)', value: 'native'},
        ],
        layout: 'radio',
      },
      initialValue: 'iframe',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional internal notes for CMS users',
      group: 'basic',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to enable/disable this form',
      initialValue: true,
      group: 'basic',
    }),

    // ── Iframe Mode Settings ───────────────────────────────
    defineField({
      name: 'formUrl',
      title: 'Zoho Form URL',
      type: 'url',
      description: 'Full Zoho form URL (e.g., https://forms.zohopublic.com/...)',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as any
          if (doc?.renderMode === 'iframe' && !value) {
            return 'Form URL is required for iframe mode'
          }
          return true
        }).uri({scheme: ['https']}),
      hidden: ({document}) => document?.renderMode === 'native',
      group: 'iframe',
    }),
    defineField({
      name: 'embedSettings',
      title: 'Embed Settings',
      type: 'object',
      hidden: ({document}) => document?.renderMode === 'native',
      group: 'iframe',
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

    // ── Native Form Builder ────────────────────────────────
    defineField({
      name: 'zohoFormPermalink',
      title: 'Zoho Form Permalink',
      type: 'string',
      description:
        'The Zoho form permalink string from the form URL (e.g., "U0Rmmz1KaZyfpwtqHbfK6sbw19RecVMg6aMmZ3G0vuw"). Used for API submission.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as any
          if (doc?.renderMode === 'native' && !value) {
            return 'Zoho Form Permalink is required for native mode'
          }
          return true
        }),
      hidden: ({document}) => document?.renderMode !== 'native',
      group: 'native',
    }),
    defineField({
      name: 'zohoFormLinkName',
      title: 'Zoho Form Link Name',
      type: 'string',
      description:
        'The form link name from your Zoho form URL (e.g., "ContactUs" from .../form/ContactUs/formperma/...). Required for native mode submission.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as any
          if (doc?.renderMode === 'native' && !value) {
            return 'Zoho Form Link Name is required for native mode'
          }
          return true
        }),
      hidden: ({document}) => document?.renderMode !== 'native',
      group: 'native',
    }),
    defineField({
      name: 'zohoPortalName',
      title: 'Zoho Portal/Organization Name',
      type: 'string',
      description:
        'Your Zoho form portal name (the subdomain in your Zoho Forms URL, e.g., "movingwalls")',
      hidden: ({document}) => document?.renderMode !== 'native',
      group: 'native',
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [{type: 'formField'}],
      description: 'Define the fields that will be rendered in the form. Order matters.',
      hidden: ({document}) => document?.renderMode !== 'native',
      group: 'native',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as any
          if (doc?.renderMode === 'native' && (!value || value.length === 0)) {
            return 'At least one field is required for native forms'
          }
          return true
        }),
    }),

    // ── Submission Settings ────────────────────────────────
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      description: 'Text displayed on the submit button',
      initialValue: 'Submit',
      hidden: ({document}) => document?.renderMode !== 'native',
      group: 'submission',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 3,
      description: 'Message shown after successful form submission',
      initialValue: 'Thank you! Your submission has been received.',
      hidden: ({document}) => document?.renderMode !== 'native',
      group: 'submission',
    }),
    defineField({
      name: 'successRedirectUrl',
      title: 'Success Redirect URL',
      type: 'url',
      description: 'Optional: Redirect to this URL after successful submission (overrides success message)',
      hidden: ({document}) => document?.renderMode !== 'native',
      group: 'submission',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      formType: 'formType',
      renderMode: 'renderMode',
      isActive: 'isActive',
      assignedPages: 'assignedPages',
    },
    prepare(selection) {
      const {title, formType, renderMode, isActive, assignedPages} = selection
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
      const modeLabel = renderMode === 'native' ? '⚡ Native' : '🖼️ Iframe'
      const pageCount = assignedPages?.length || 0
      const pagesLabel = pageCount > 0 ? `· ${pageCount} page${pageCount > 1 ? 's' : ''}` : ''
      return {
        title: title,
        subtitle: `${typeLabels[formType] || formType || ''} · ${modeLabel} ${pagesLabel} ${isActive === false ? '(Inactive)' : ''}`.trim(),
      }
    },
  },
})
