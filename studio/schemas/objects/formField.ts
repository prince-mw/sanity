import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Field Label',
      type: 'string',
      description: 'Display label shown to the user (e.g., "Full Name", "Email Address")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zohoFieldName',
      title: 'Zoho Field Name',
      type: 'string',
      description: 'The exact Zoho form field name for submission mapping (e.g., "Name_First", "Email")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fieldType',
      title: 'Field Type',
      type: 'string',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'phone'},
          {title: 'Number', value: 'number'},
          {title: 'Textarea', value: 'textarea'},
          {title: 'Select (Dropdown)', value: 'select'},
          {title: 'Radio Buttons', value: 'radio'},
          {title: 'Checkbox', value: 'checkbox'},
          {title: 'Hidden', value: 'hidden'},
        ],
      },
      initialValue: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder Text',
      type: 'string',
      description: 'Placeholder text inside the input field',
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'halfWidth',
      title: 'Half Width',
      type: 'boolean',
      description: 'Display this field at 50% width (side-by-side with the next half-width field)',
      initialValue: false,
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Options for select, radio, or checkbox field types',
      hidden: ({parent}) =>
        !['select', 'radio', 'checkbox'].includes(parent?.fieldType),
    }),
    defineField({
      name: 'defaultValue',
      title: 'Default Value',
      type: 'string',
      description: 'Pre-filled value (useful for hidden fields like UTM parameters)',
    }),
    defineField({
      name: 'validationPattern',
      title: 'Validation Pattern (Regex)',
      type: 'string',
      description: 'Optional regex pattern for custom validation (e.g., "^[0-9]{10}$" for 10-digit numbers)',
    }),
    defineField({
      name: 'validationMessage',
      title: 'Validation Error Message',
      type: 'string',
      description: 'Custom error message when validation fails',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      fieldType: 'fieldType',
      required: 'required',
    },
    prepare({label, fieldType, required}) {
      const typeIcons: Record<string, string> = {
        text: '📝',
        email: '📧',
        phone: '📞',
        number: '🔢',
        textarea: '📄',
        select: '📋',
        radio: '🔘',
        checkbox: '☑️',
        hidden: '👁️‍🗨️',
      }
      return {
        title: `${label || 'Untitled Field'}${required ? ' *' : ''}`,
        subtitle: `${typeIcons[fieldType] || ''} ${fieldType || 'text'}`,
      }
    },
  },
})
