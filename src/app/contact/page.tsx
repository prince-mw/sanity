import { Metadata } from 'next'
import { getAllOffices, transformOffice } from '@/sanity/lib/fetch'
import ContactPageClient, { Office } from '@/components/ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us | Moving Walls',
  description: 'Get in touch with Moving Walls. Contact our global offices in Singapore, Malaysia, Philippines, Indonesia, India and more.',
  openGraph: {
    title: 'Contact Us | Moving Walls',
    description: 'Reach out to our global team for advertising solutions.',
    type: 'website',
  },
}

export const revalidate = 300

const fallbackOffices: Office[] = [
  {
    city: 'Singapore',
    country: 'Singapore',
    type: 'Global Headquarters',
    address: 'Far East Finance Building, #8-02, 14 Robinson Road, Singapore 048545',
    phone: '+65 8755 6364',
    email: 'info@movingwalls.com',
    isHeadquarters: true,
  },
  {
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    type: 'Regional Office',
    address: 'Level 8 (Zone B), Wisma Standard Chartered, No. 2, Jalan Teknologi Taman Teknologi Malaysia, 57000 Bukit Jalil',
    phone: '+60 3 7610 2044',
    email: 'info@movingwalls.com',
    isHeadquarters: false,
  },
  {
    city: 'Manila',
    country: 'Philippines',
    type: 'Regional Office',
    address: 'Unit 1207, Capital House, 9th Avenue, cor Lane S, Taguig',
    phone: '+63 7527 5672',
    email: 'info@movingwalls.com',
    isHeadquarters: false,
  },
  {
    city: 'Jakarta',
    country: 'Indonesia',
    type: 'Registered Office',
    address: 'Tower 45th floor, Jalan Prof Dr Satrio, Kav. 18 Jakarta 12940',
    phone: '+62 21 3005 3540',
    email: 'info@movingwalls.com',
    isHeadquarters: false,
  },
  {
    city: 'Colombo',
    country: 'Sri Lanka',
    type: 'Regional Office',
    address: '07 Turnour Rd, Colombo 8',
    phone: '',
    email: 'info@movingwalls.com',
    isHeadquarters: false,
  },
  {
    city: 'Bangalore',
    country: 'India',
    type: 'Regional Office',
    address: 'BHIVE Workspace, 3rd Floor, No.467/468, Shri Krishna Temple Rd, Stage 1 Indiranagar, Bengaluru, Karnataka 560038',
    phone: '',
    email: 'info@movingwalls.com',
    isHeadquarters: false,
  },
  {
    city: 'Mumbai',
    country: 'India',
    type: 'Regional Office',
    address: 'Dynasty Business Park, A wing 7th Floor, Near Metro Station, Andheri - Kurla Rd, Vijay Nagar Colony, Chakala, Andheri East, Mumbai, Maharashtra 400065',
    phone: '',
    email: 'info@movingwalls.com',
    isHeadquarters: false,
  },
]

export default async function ContactPage() {
  let offices: Office[] = fallbackOffices

  try {
    const sanityOffices = await getAllOffices()
    if (sanityOffices && sanityOffices.length > 0) {
      offices = sanityOffices.map(transformOffice)
    }
  } catch (error) {
    console.error('Error fetching offices from Sanity:', error)
  }

  return <ContactPageClient offices={offices} />
}
