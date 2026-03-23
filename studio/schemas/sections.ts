// Shared page section definitions used by landing pages and location pages

export const pageSections: any[] = [
  // Hero Section
  {
    type: 'object',
    name: 'hero',
    title: 'Hero Section',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading', validation: (Rule: any) => Rule.required()},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 3},
      {name: 'backgroundImage', type: 'image', title: 'Background Image', options: {hotspot: true}},
      {name: 'backgroundVideo', type: 'url', title: 'Background Video URL', description: 'YouTube or Vimeo URL (optional, overrides image)'},
      {name: 'overlay', type: 'boolean', title: 'Dark Overlay', initialValue: true},
      {name: 'alignment', type: 'string', title: 'Text Alignment', options: {list: ['left', 'center', 'right']}, initialValue: 'center'},
      {name: 'ctaText', type: 'string', title: 'Primary CTA Button Text'},
      {name: 'ctaLink', type: 'string', title: 'Primary CTA Button Link'},
      {name: 'secondaryCtaText', type: 'string', title: 'Secondary CTA Button Text'},
      {name: 'secondaryCtaLink', type: 'string', title: 'Secondary CTA Button Link'},
      {name: 'height', type: 'string', title: 'Height', options: {list: ['full', 'large', 'medium', 'small']}, initialValue: 'large'},
    ],
    preview: {
      select: {title: 'heading', media: 'backgroundImage'},
      prepare: ({title, media}: any) => ({title: title || 'Hero Section', subtitle: 'Hero', media}),
    },
  },
  // Text Block
  {
    type: 'object',
    name: 'textBlock',
    title: 'Text Block',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'content', type: 'blockContent', title: 'Content'},
      {name: 'alignment', type: 'string', title: 'Alignment', options: {list: ['left', 'center', 'right']}, initialValue: 'left'},
      {name: 'maxWidth', type: 'string', title: 'Max Width', options: {list: ['narrow', 'medium', 'wide', 'full']}, initialValue: 'medium'},
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'white'},
    ],
    preview: {
      select: {title: 'heading'},
      prepare: ({title}: any) => ({title: title || 'Text Block', subtitle: 'Text'}),
    },
  },
  // Two Column Section
  {
    type: 'object',
    name: 'twoColumn',
    title: 'Two Column (Image + Text)',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'content', type: 'blockContent', title: 'Content'},
      {name: 'image', type: 'image', title: 'Image', options: {hotspot: true}},
      {name: 'imagePosition', type: 'string', title: 'Image Position', options: {list: ['left', 'right']}, initialValue: 'right'},
      {name: 'ctaText', type: 'string', title: 'CTA Button Text'},
      {name: 'ctaLink', type: 'string', title: 'CTA Button Link'},
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'white'},
    ],
    preview: {
      select: {title: 'heading', media: 'image'},
      prepare: ({title, media}: any) => ({title: title || 'Two Column', subtitle: 'Image + Text', media}),
    },
  },
  // Feature Grid
  {
    type: 'object',
    name: 'featureGrid',
    title: 'Feature Grid',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      {name: 'columns', type: 'number', title: 'Columns', options: {list: [2, 3, 4]}, initialValue: 3},
      {
        name: 'features',
        type: 'array',
        title: 'Features',
        of: [
          {
            type: 'object',
            fields: [
              {name: 'icon', type: 'image', title: 'Icon', options: {hotspot: true}},
              {name: 'title', type: 'string', title: 'Title'},
              {name: 'description', type: 'text', title: 'Description', rows: 3},
              {name: 'link', type: 'string', title: 'Link (optional)'},
            ],
            preview: {
              select: {title: 'title', media: 'icon'},
            },
          },
        ],
      },
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'white'},
    ],
    preview: {
      select: {title: 'heading', features: 'features'},
      prepare: ({title, features}: any) => ({
        title: title || 'Feature Grid',
        subtitle: `${features?.length || 0} features`,
      }),
    },
  },
  // Stats Section
  {
    type: 'object',
    name: 'stats',
    title: 'Stats / Metrics',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      {
        name: 'stats',
        type: 'array',
        title: 'Statistics',
        of: [
          {
            type: 'object',
            fields: [
              {name: 'value', type: 'string', title: 'Value (e.g., "500+", "99%", "$2M")'},
              {name: 'label', type: 'string', title: 'Label'},
              {name: 'prefix', type: 'string', title: 'Prefix (e.g., "$", "+")', description: 'Optional'},
              {name: 'suffix', type: 'string', title: 'Suffix (e.g., "%", "M", "+")', description: 'Optional'},
            ],
            preview: {
              select: {title: 'value', subtitle: 'label'},
            },
          },
        ],
        validation: (Rule: any) => Rule.max(6),
      },
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'blue'},
    ],
    preview: {
      select: {title: 'heading', stats: 'stats'},
      prepare: ({title, stats}: any) => ({
        title: title || 'Stats Section',
        subtitle: `${stats?.length || 0} metrics`,
      }),
    },
  },
  // Logo Carousel
  {
    type: 'object',
    name: 'logoCarousel',
    title: 'Logo Carousel / Clients',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      {
        name: 'logos',
        type: 'array',
        title: 'Logos',
        of: [
          {
            type: 'object',
            fields: [
              {name: 'logo', type: 'image', title: 'Logo', options: {hotspot: true}},
              {name: 'name', type: 'string', title: 'Company Name'},
              {name: 'link', type: 'url', title: 'Link (optional)'},
            ],
            preview: {
              select: {title: 'name', media: 'logo'},
            },
          },
        ],
      },
      {name: 'grayscale', type: 'boolean', title: 'Grayscale Logos', initialValue: true},
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'white'},
    ],
    preview: {
      select: {title: 'heading', logos: 'logos'},
      prepare: ({title, logos}: any) => ({
        title: title || 'Logo Carousel',
        subtitle: `${logos?.length || 0} logos`,
      }),
    },
  },
  // Video Embed
  {
    type: 'object',
    name: 'videoEmbed',
    title: 'Video Embed',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      {name: 'videoUrl', type: 'url', title: 'Video URL', description: 'YouTube, Vimeo, or Wistia URL', validation: (Rule: any) => Rule.required()},
      {name: 'thumbnail', type: 'image', title: 'Custom Thumbnail', options: {hotspot: true}, description: 'Optional custom thumbnail'},
      {name: 'aspectRatio', type: 'string', title: 'Aspect Ratio', options: {list: ['16:9', '4:3', '1:1', '9:16']}, initialValue: '16:9'},
      {name: 'autoplay', type: 'boolean', title: 'Autoplay (muted)', initialValue: false},
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'white'},
    ],
    preview: {
      select: {title: 'heading', media: 'thumbnail'},
      prepare: ({title, media}: any) => ({title: title || 'Video Embed', subtitle: 'Video', media}),
    },
  },
  // Image Gallery
  {
    type: 'object',
    name: 'imageGallery',
    title: 'Image Gallery',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      {
        name: 'images',
        type: 'array',
        title: 'Images',
        of: [
          {
            type: 'object',
            fields: [
              {name: 'image', type: 'image', title: 'Image', options: {hotspot: true}},
              {name: 'caption', type: 'string', title: 'Caption'},
              {name: 'alt', type: 'string', title: 'Alt Text'},
            ],
            preview: {
              select: {title: 'caption', media: 'image'},
            },
          },
        ],
      },
      {name: 'layout', type: 'string', title: 'Layout', options: {list: ['grid', 'carousel', 'masonry']}, initialValue: 'grid'},
      {name: 'columns', type: 'number', title: 'Columns (for grid)', options: {list: [2, 3, 4]}, initialValue: 3},
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'white'},
    ],
    preview: {
      select: {title: 'heading', images: 'images'},
      prepare: ({title, images}: any) => ({
        title: title || 'Image Gallery',
        subtitle: `${images?.length || 0} images`,
      }),
    },
  },
  // Testimonials
  {
    type: 'object',
    name: 'testimonials',
    title: 'Testimonials',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      {name: 'layout', type: 'string', title: 'Layout', options: {list: ['carousel', 'grid', 'single']}, initialValue: 'carousel'},
      {
        name: 'items',
        type: 'array',
        title: 'Testimonials',
        of: [
          {
            type: 'object',
            fields: [
              {name: 'quote', type: 'text', title: 'Quote', rows: 4},
              {name: 'name', type: 'string', title: 'Name'},
              {name: 'role', type: 'string', title: 'Role'},
              {name: 'company', type: 'string', title: 'Company'},
              {name: 'image', type: 'image', title: 'Photo', options: {hotspot: true}},
              {name: 'rating', type: 'number', title: 'Rating (1-5)', validation: (Rule: any) => Rule.min(1).max(5)},
            ],
            preview: {
              select: {title: 'name', subtitle: 'company', media: 'image'},
            },
          },
        ],
      },
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'gray'},
    ],
    preview: {
      select: {title: 'heading', items: 'items'},
      prepare: ({title, items}: any) => ({
        title: title || 'Testimonials',
        subtitle: `${items?.length || 0} testimonials`,
      }),
    },
  },
  // FAQ Accordion
  {
    type: 'object',
    name: 'faq',
    title: 'FAQ Accordion',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      {
        name: 'items',
        type: 'array',
        title: 'Questions',
        of: [
          {
            type: 'object',
            fields: [
              {name: 'question', type: 'string', title: 'Question'},
              {name: 'answer', type: 'text', title: 'Answer', rows: 4},
            ],
            preview: {
              select: {title: 'question'},
            },
          },
        ],
      },
      {name: 'layout', type: 'string', title: 'Layout', options: {list: ['single', 'twoColumn']}, initialValue: 'single'},
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'white'},
    ],
    preview: {
      select: {title: 'heading', items: 'items'},
      prepare: ({title, items}: any) => ({
        title: title || 'FAQ',
        subtitle: `${items?.length || 0} questions`,
      }),
    },
  },
  // CTA Banner
  {
    type: 'object',
    name: 'ctaBanner',
    title: 'CTA Banner',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      {name: 'ctaText', type: 'string', title: 'Primary Button Text'},
      {name: 'ctaLink', type: 'string', title: 'Primary Button Link'},
      {name: 'secondaryCtaText', type: 'string', title: 'Secondary Button Text'},
      {name: 'secondaryCtaLink', type: 'string', title: 'Secondary Button Link'},
      {name: 'backgroundImage', type: 'image', title: 'Background Image', options: {hotspot: true}},
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark', 'gradient']}, initialValue: 'blue'},
    ],
    preview: {
      select: {title: 'heading', media: 'backgroundImage'},
      prepare: ({title, media}: any) => ({title: title || 'CTA Banner', subtitle: 'Call to Action', media}),
    },
  },
  // Pricing Table
  {
    type: 'object',
    name: 'pricing',
    title: 'Pricing Table',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      {
        name: 'plans',
        type: 'array',
        title: 'Pricing Plans',
        of: [
          {
            type: 'object',
            fields: [
              {name: 'name', type: 'string', title: 'Plan Name'},
              {name: 'description', type: 'string', title: 'Short Description'},
              {name: 'price', type: 'string', title: 'Price (e.g., "$99", "Free", "Custom")'},
              {name: 'period', type: 'string', title: 'Period (e.g., "/month", "/year")'},
              {name: 'features', type: 'array', title: 'Features', of: [{type: 'string'}]},
              {name: 'ctaText', type: 'string', title: 'Button Text', initialValue: 'Get Started'},
              {name: 'ctaLink', type: 'string', title: 'Button Link'},
              {name: 'highlighted', type: 'boolean', title: 'Highlight this plan', initialValue: false},
              {name: 'badge', type: 'string', title: 'Badge Text (e.g., "Popular", "Best Value")'},
            ],
            preview: {
              select: {title: 'name', subtitle: 'price'},
            },
          },
        ],
        validation: (Rule: any) => Rule.max(4),
      },
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'white'},
    ],
    preview: {
      select: {title: 'heading', plans: 'plans'},
      prepare: ({title, plans}: any) => ({
        title: title || 'Pricing Table',
        subtitle: `${plans?.length || 0} plans`,
      }),
    },
  },
  // Contact Form
  {
    type: 'object',
    name: 'contactForm',
    title: 'Contact / Lead Form',
    fields: [
      {name: 'heading', type: 'string', title: 'Heading'},
      {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      {name: 'formType', type: 'string', title: 'Form Type', options: {list: ['contact', 'demo', 'newsletter', 'custom']}, initialValue: 'contact'},
      {
        name: 'fields',
        type: 'array',
        title: 'Form Fields',
        description: 'Custom fields (leave empty for default contact form)',
        of: [
          {
            type: 'object',
            fields: [
              {name: 'name', type: 'string', title: 'Field Name'},
              {name: 'label', type: 'string', title: 'Label'},
              {name: 'type', type: 'string', title: 'Type', options: {list: ['text', 'email', 'phone', 'textarea', 'select', 'checkbox']}, initialValue: 'text'},
              {name: 'required', type: 'boolean', title: 'Required', initialValue: false},
              {name: 'options', type: 'array', title: 'Options (for select)', of: [{type: 'string'}]},
            ],
            preview: {
              select: {title: 'label', subtitle: 'type'},
            },
          },
        ],
      },
      {name: 'submitText', type: 'string', title: 'Submit Button Text', initialValue: 'Submit'},
      {name: 'successMessage', type: 'text', title: 'Success Message', rows: 2},
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark']}, initialValue: 'gray'},
    ],
    preview: {
      select: {title: 'heading', formType: 'formType'},
      prepare: ({title, formType}: any) => ({title: title || 'Contact Form', subtitle: formType || 'Form'}),
    },
  },
  // Spacer / Divider
  {
    type: 'object',
    name: 'spacer',
    title: 'Spacer / Divider',
    fields: [
      {name: 'height', type: 'string', title: 'Height', options: {list: ['small', 'medium', 'large', 'xlarge']}, initialValue: 'medium'},
      {name: 'showDivider', type: 'boolean', title: 'Show Divider Line', initialValue: false},
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark', 'transparent']}, initialValue: 'transparent'},
    ],
    preview: {
      select: {height: 'height', showDivider: 'showDivider'},
      prepare: ({height, showDivider}: any) => ({
        title: showDivider ? 'Divider' : 'Spacer',
        subtitle: height,
      }),
    },
  },
  // Custom HTML/Embed
  {
    type: 'object',
    name: 'customEmbed',
    title: 'Custom HTML / Embed',
    fields: [
      {name: 'title', type: 'string', title: 'Title (internal use only)'},
      {name: 'code', type: 'text', title: 'HTML/Embed Code', rows: 10, description: 'Paste your embed code here (iframe, script, etc.)'},
      {name: 'maxWidth', type: 'string', title: 'Max Width', options: {list: ['narrow', 'medium', 'wide', 'full']}, initialValue: 'medium'},
      {name: 'backgroundColor', type: 'string', title: 'Background Color', options: {list: ['white', 'gray', 'blue', 'dark', 'transparent']}, initialValue: 'transparent'},
    ],
    preview: {
      select: {title: 'title'},
      prepare: ({title}: any) => ({title: title || 'Custom Embed', subtitle: 'HTML/Embed'}),
    },
  },
]
