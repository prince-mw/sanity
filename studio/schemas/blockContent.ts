import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'video',
      title: 'Video Embed',
      fields: [
        {
          name: 'videoType',
          type: 'string',
          title: 'Video Source',
          description: 'Choose how to add the video',
          options: {
            list: [
              {title: 'YouTube / Vimeo URL', value: 'url'},
              {title: 'Upload Video File', value: 'file'},
            ],
            layout: 'radio',
          },
          initialValue: 'url',
        },
        {
          name: 'url',
          type: 'url',
          title: 'Video URL',
          description: 'YouTube or Vimeo URL',
          hidden: ({parent}: {parent: {videoType?: string}}) => parent?.videoType === 'file',
        },
        {
          name: 'videoFile',
          type: 'file',
          title: 'Video File',
          description: 'Upload MP4, WebM, or MOV video',
          options: {
            accept: 'video/*',
          },
          hidden: ({parent}: {parent: {videoType?: string}}) => parent?.videoType !== 'file',
        },
        {
          name: 'thumbnail',
          type: 'image',
          title: 'Thumbnail / Poster Image',
          description: 'Optional poster image shown before video plays',
          options: {hotspot: true},
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
      preview: {
        select: {url: 'url', videoType: 'videoType', fileName: 'videoFile.asset.originalFilename'},
        prepare({url, videoType, fileName}: {url?: string; videoType?: string; fileName?: string}) {
          const subtitle = videoType === 'file' ? (fileName || 'Uploaded video') : (url || 'No URL')
          return {title: 'Video', subtitle}
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'codeBlock',
      title: 'Code Block',
      fields: [
        {
          name: 'language',
          type: 'string',
          title: 'Language',
          options: {
            list: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'Python', value: 'python'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'JSON', value: 'json'},
              {title: 'Bash', value: 'bash'},
            ],
          },
        },
        {
          name: 'code',
          type: 'text',
          title: 'Code',
        },
      ],
      preview: {
        select: {language: 'language'},
        prepare({language}) {
          return {title: 'Code Block', subtitle: language}
        },
      },
    }),
    // Custom block types for rich content
    defineArrayMember({
      type: 'callout',
    }),
    defineArrayMember({
      type: 'statBlock',
    }),
    defineArrayMember({
      type: 'ctaButton',
    }),
    defineArrayMember({
      type: 'tableBlock',
    }),
    defineArrayMember({
      type: 'testimonialBlock',
    }),
    defineArrayMember({
      type: 'accordionBlock',
    }),
  ],
})
