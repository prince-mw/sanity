import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'jobPosition',
  title: 'Job Position',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Engineering', value: 'engineering'},
          {title: 'Sales', value: 'sales'},
          {title: 'Marketing', value: 'marketing'},
          {title: 'Data & Analytics', value: 'data-analytics'},
          {title: 'Design', value: 'design'},
          {title: 'Operations', value: 'operations'},
          {title: 'Finance', value: 'finance'},
          {title: 'Human Resources', value: 'hr'},
          {title: 'Product', value: 'product'},
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "San Francisco, CA / Remote"',
    }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'full-time'},
          {title: 'Part-time', value: 'part-time'},
          {title: 'Contract', value: 'contract'},
          {title: 'Internship', value: 'internship'},
        ],
      },
      initialValue: 'full-time',
    }),
    defineField({
      name: 'level',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          {title: 'Entry Level', value: 'entry'},
          {title: 'Mid-Level', value: 'mid'},
          {title: 'Senior', value: 'senior'},
          {title: 'Lead', value: 'lead'},
          {title: 'Manager', value: 'manager'},
          {title: 'Director', value: 'director'},
          {title: 'VP', value: 'vp'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Job Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'salaryRange',
      title: 'Salary Range',
      type: 'string',
      description: 'e.g., "$120,000 - $160,000"',
    }),
    defineField({
      name: 'applyLink',
      title: 'Application Link',
      type: 'url',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Is this position currently open?',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Department',
      name: 'departmentAsc',
      by: [{field: 'department', direction: 'asc'}],
    },
    {
      title: 'Newest First',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      location: 'location',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, department, location, isActive} = selection
      return {
        title: `${title}${!isActive ? ' (Closed)' : ''}`,
        subtitle: `${department || 'No dept'} • ${location || 'Location TBD'}`,
      }
    },
  },
})
