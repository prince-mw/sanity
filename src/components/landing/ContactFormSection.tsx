"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, type BackgroundColor } from "./utils";

interface FormField {
  _key: string;
  name?: string;
  label?: string;
  type?: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox';
  required?: boolean;
  options?: string[];
}

interface ContactFormSectionProps {
  heading?: string;
  subheading?: string;
  formType?: 'contact' | 'demo' | 'newsletter' | 'custom';
  fields?: FormField[];
  submitText?: string;
  successMessage?: string;
  backgroundColor?: BackgroundColor;
}

// Default form fields by type
const defaultFields: Record<string, FormField[]> = {
  contact: [
    { _key: 'name', name: 'name', label: 'Full Name', type: 'text', required: true },
    { _key: 'email', name: 'email', label: 'Email', type: 'email', required: true },
    { _key: 'phone', name: 'phone', label: 'Phone', type: 'phone', required: false },
    { _key: 'message', name: 'message', label: 'Message', type: 'textarea', required: true },
  ],
  demo: [
    { _key: 'name', name: 'name', label: 'Full Name', type: 'text', required: true },
    { _key: 'email', name: 'email', label: 'Work Email', type: 'email', required: true },
    { _key: 'company', name: 'company', label: 'Company', type: 'text', required: true },
    { _key: 'role', name: 'role', label: 'Job Title', type: 'text', required: false },
  ],
  newsletter: [
    { _key: 'email', name: 'email', label: 'Email Address', type: 'email', required: true },
  ],
};

export function ContactFormSection({
  heading,
  subheading,
  formType = 'contact',
  fields,
  submitText = 'Submit',
  successMessage = 'Thank you! We\'ll be in touch soon.',
  backgroundColor = 'gray',
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const bgClasses = getBackgroundClasses(backgroundColor);
  const textColor = getTextColorClasses(backgroundColor);
  const subtextColor = getSubtextColorClasses(backgroundColor);
  const isDark = backgroundColor === 'dark' || backgroundColor === 'blue' || backgroundColor === 'gradient';

  // Use custom fields if provided, otherwise use defaults
  const formFields = fields && fields.length > 0 ? fields : defaultFields[formType] || defaultFields.contact;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className={`py-16 md:py-24 ${bgClasses}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          {(heading || subheading) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              {heading && (
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className={`text-lg ${subtextColor}`}>
                  {subheading}
                </p>
              )}
            </motion.div>
          )}

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className={`p-8 rounded-2xl text-center ${isDark ? 'bg-white/10' : 'bg-white'} shadow-lg`}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`p-8 rounded-2xl ${isDark ? 'bg-white/10' : 'bg-white'} shadow-lg`}>
                <div className="space-y-6">
                  {formFields.map((field) => (
                    <div key={field._key}>
                      <label 
                        htmlFor={field.name} 
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
                      >
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          rows={4}
                          value={formData[field.name || ''] || ''}
                          onChange={(e) => handleChange(field.name || '', e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent transition ${
                            isDark 
                              ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name || ''] || ''}
                          onChange={(e) => handleChange(field.name || '', e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent transition ${
                            isDark 
                              ? 'bg-white/10 border-white/20 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="">Select an option</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            checked={formData[field.name || ''] === 'true'}
                            onChange={(e) => handleChange(field.name || '', e.target.checked ? 'true' : 'false')}
                            className="w-4 h-4 rounded text-mw-blue-600 focus:ring-mw-blue-500"
                          />
                          <span className={`text-sm ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                            {field.label}
                          </span>
                        </div>
                      ) : (
                        <input
                          type={field.type || 'text'}
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name || ''] || ''}
                          onChange={(e) => handleChange(field.name || '', e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent transition ${
                            isDark 
                              ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 bg-mw-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-mw-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : submitText}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
