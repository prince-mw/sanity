import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'workflow',
  title: 'Workflow',
  type: 'object',
  fields: [
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: '📝 Draft', value: 'draft'},
          {title: '👀 In Review', value: 'review'},
          {title: '✅ Approved', value: 'approved'},
          {title: '🚀 Published', value: 'published'},
          {title: '📦 Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'scheduledPublishAt',
      title: 'Scheduled Publish Date',
      type: 'datetime',
      description: 'Set a future date to automatically publish this content',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
    }),
    defineField({
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'reference',
      to: [{type: 'teamMember'}],
      description: 'Team member responsible for this content',
    }),
    defineField({
      name: 'reviewNotes',
      title: 'Review Notes',
      type: 'text',
      rows: 3,
      description: 'Notes for reviewers or collaborators',
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Last Reviewed',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Reviewed By',
      type: 'reference',
      to: [{type: 'teamMember'}],
      readOnly: true,
    }),
  ],
})
