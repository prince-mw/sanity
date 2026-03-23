'use client'

import type { ZohoFormFieldData } from '@/sanity/lib/fetch'

interface FormFieldRendererProps {
  field: ZohoFormFieldData
  value: string
  onChange: (fieldName: string, value: string) => void
  error?: string
}

const baseInputClass =
  'w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
const errorInputClass =
  'w-full px-4 py-3 bg-white border border-red-400 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors'

export function FormFieldRenderer({ field, value, onChange, error }: FormFieldRendererProps) {
  const inputClass = error ? errorInputClass : baseInputClass
  const fieldId = `field-${field.zohoFieldName}`

  if (field.fieldType === 'hidden') {
    return (
      <input
        type="hidden"
        name={field.zohoFieldName}
        value={value || field.defaultValue || ''}
      />
    )
  }

  const renderInput = () => {
    switch (field.fieldType) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            name={field.zohoFieldName}
            value={value}
            onChange={(e) => onChange(field.zohoFieldName, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className={inputClass}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />
        )

      case 'select':
        return (
          <select
            id={fieldId}
            name={field.zohoFieldName}
            value={value}
            onChange={(e) => onChange(field.zohoFieldName, e.target.value)}
            required={field.required}
            className={inputClass}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          >
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="flex flex-wrap gap-4" role="radiogroup" aria-labelledby={`${fieldId}-label`}>
            {field.options?.map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer text-gray-700">
                <input
                  type="radio"
                  name={field.zohoFieldName}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(field.zohoFieldName, e.target.value)}
                  required={field.required}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <div className="flex flex-wrap gap-4" role="group" aria-labelledby={`${fieldId}-label`}>
            {field.options?.map((option) => {
              const currentValues = value ? value.split(',').map((v) => v.trim()) : []
              const isChecked = currentValues.includes(option)
              return (
                <label key={option} className="flex items-center gap-2 cursor-pointer text-gray-700">
                  <input
                    type="checkbox"
                    name={field.zohoFieldName}
                    value={option}
                    checked={isChecked}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((v) => v !== option)
                      onChange(field.zohoFieldName, updated.join(', '))
                    }}
                    className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              )
            })}
          </div>
        )

      default:
        return (
          <input
            id={fieldId}
            type={field.fieldType === 'email' ? 'email' : field.fieldType === 'phone' ? 'tel' : field.fieldType === 'number' ? 'number' : 'text'}
            name={field.zohoFieldName}
            value={value}
            onChange={(e) => onChange(field.zohoFieldName, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={inputClass}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />
        )
    }
  }

  return (
    <div className={field.halfWidth ? 'w-full sm:w-[calc(50%-0.5rem)]' : 'w-full'}>
      <label id={`${fieldId}-label`} htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-1.5">
        {field.label}
        {field.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p id={`${fieldId}-error`} className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormFieldRenderer
