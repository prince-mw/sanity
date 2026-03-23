const {createClient} = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO'
});

async function seedContactForm() {
  // Check if already exists
  const existing = await client.fetch(
    `*[_type == "zohoForm" && zohoFormPermalink == "U0Rmmz1KaZyfpwtqHbfK6sbw19RecVMg6aMmZ3G0vuw"][0]._id`
  );

  if (existing) {
    console.log('Contact form already exists:', existing);
    return;
  }

  const doc = {
    _type: 'zohoForm',
    name: 'MW Contact Us Form',
    formType: 'contact',
    renderMode: 'native',
    isActive: true,
    assignedPages: ['/', '/contact', '/careers'],
    zohoFormPermalink: 'U0Rmmz1KaZyfpwtqHbfK6sbw19RecVMg6aMmZ3G0vuw',
    zohoPortalName: 'movingwallsholdingpteltd',
    submitButtonText: 'Submit',
    successMessage: 'Thank you! Your message has been sent successfully. Our team will get back to you shortly.',
    fields: [
      {
        _type: 'formField',
        _key: 'firstName',
        label: 'First Name',
        zohoFieldName: 'Name_First',
        fieldType: 'text',
        placeholder: 'First Name',
        required: true,
        halfWidth: true
      },
      {
        _type: 'formField',
        _key: 'lastName',
        label: 'Last Name',
        zohoFieldName: 'Name_Last',
        fieldType: 'text',
        placeholder: 'Last Name',
        required: true,
        halfWidth: true
      },
      {
        _type: 'formField',
        _key: 'company',
        label: 'Company Name',
        zohoFieldName: 'SingleLine',
        fieldType: 'text',
        placeholder: 'Company Name',
        required: true
      },
      {
        _type: 'formField',
        _key: 'email',
        label: 'Company Email',
        zohoFieldName: 'Email',
        fieldType: 'email',
        placeholder: 'Company Email',
        required: true,
        halfWidth: true
      },
      {
        _type: 'formField',
        _key: 'phone',
        label: 'Phone Number',
        zohoFieldName: 'PhoneNumber_countrycode',
        fieldType: 'phone',
        placeholder: 'Phone Number',
        required: true,
        halfWidth: true
      },
      {
        _type: 'formField',
        _key: 'role',
        label: 'I am a..',
        zohoFieldName: 'Radio',
        fieldType: 'radio',
        required: true,
        options: ['Brand', 'Agency', 'Media Owner', 'Others']
      },
      {
        _type: 'formField',
        _key: 'country',
        label: 'Country',
        zohoFieldName: 'Address_Country',
        fieldType: 'select',
        required: true,
        options: [
          'India', 'Singapore', 'Malaysia', 'Indonesia', 'Japan',
          'South Korea', 'Thailand', 'Philippines', 'Vietnam',
          'Australia', 'United States', 'United Kingdom', 'Other'
        ]
      },
      {
        _type: 'formField',
        _key: 'message',
        label: 'Message',
        zohoFieldName: 'MultiLine',
        fieldType: 'textarea',
        placeholder: 'Tell us more about your request',
        required: false
      }
    ]
  };

  const result = await client.create(doc);
  console.log('Created MW Contact Us Form:', result._id);
}

seedContactForm().catch(console.error);
