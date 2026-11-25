// Everything a non-developer may need to change on this page lives in this one file.

/** Founding window (confirmed by Deewakshi: Wed 9 Dec, 11:59pm MYT). The countdown,
 *  the hero and the thank-you message all read from here. */
export const CLOSE_AT = new Date('2026-12-09T23:59:00+08:00');
export const CLOSE_LABEL = 'Wednesday 9 December';

/** Response promise shown in every thank-you message. */
export const RESPONSE_TIME = 'within 1 working day';

/** Sales contact in the footer. Fill in before launch. */
export const CONTACT = {
  name: 'Daniel Rashid',
  role: 'Sales Manager',
  email: 'daniel.rashid@movingwalls.com',
  whatsapp: '60198060321', // digits only, for the wa.me link
  whatsappLabel: '+60 19-806 0321',
};

/** Zoho forms. Leave a permalink empty until that form exists: its submissions then
 *  show the thank-you message but are NOT sent anywhere (local preview only).
 *  `fields` maps our field names to the Zoho field link names; update once the forms
 *  are shared. Alerts go to Daniel and Deewakshi (set up in Zoho). */
export const ZOHO_FORMS = {
  // Use the permalink from Zoho's "Embed > HTML & CSS > Download Plain HTML" code (its <form action>).
  // The public share link has a DIFFERENT permalink (f98HiIoAg...) that refuses direct
  // submissions with "This form is temporarily inaccessible".
  // Field link names checked against that HTML code on 2026-11-25.
  claim: {
    permalink: 'XOSldjqnhuIiYAdUSbRDR-iDVb05NzGnFXMyv_JTkR8',
    linkName: 'Claimyourslot',
    fields: {
      name: 'SingleLine', // Name (required)
      company: 'SingleLine1', // Company (required)
      clientBrand: 'SingleLine2', // Client brand
      category: 'SingleLine3', // Category (required)
      slots: 'MultiLine', // Chosen slots (required)
      email: 'Email', // Email (required)
      whatsapp: 'SingleLine4', // WhatsApp
      audience: 'SingleLine5', // Brand or Agency
      pageUrl: 'SingleLine6', // Page URL
    } as Record<string, string>,
  },
  // Public share link: .../Booka15minutecalleMart24/formperma/XPAswbh6_c4HV4biZkyGlG-PWbYgjiTRuWHhvTgr3PU
  // Permalink below is from the "Download Plain HTML" code (the one that accepts submissions).
  // Field link names checked against that HTML code on 2026-11-25.
  bookCall: {
    permalink: '8lgTIafSTrBBvn-5kbCARxIqc8f-UIY-7d4tzMNvkyY',
    linkName: 'Booka15minutecalleMart24',
    fields: {
      name: 'SingleLine', // Name (required)
      company: 'SingleLine1', // Company (required)
      email: 'Email', // Email (required)
      whatsapp: 'SingleLine2', // WhatsApp
      audience: 'SingleLine3', // Brand or Agency
      pageUrl: 'SingleLine4', // Page URL
    } as Record<string, string>,
  },
};

export type SlotId = '0006' | '0608' | '0810' | '1012' | '1214' | '1416' | '1618' | '1820' | '2022' | '2224';

export const SLOTS: { id: SlotId; label: string; name: string }[] = [
  { id: '0006', label: '00–06', name: 'Overnight' },
  { id: '0608', label: '06–08', name: 'Early morning' },
  { id: '0810', label: '08–10', name: 'Morning' },
  { id: '1012', label: '10–12', name: 'Late morning' },
  { id: '1214', label: '12–14', name: 'Lunchtime' },
  { id: '1416', label: '14–16', name: 'Afternoon' },
  { id: '1618', label: '16–18', name: 'Late afternoon' },
  { id: '1820', label: '18–20', name: 'Evening' },
  { id: '2022', label: '20–22', name: 'Night' },
  { id: '2224', label: '22–24', name: 'Late night' },
];

// Suggested hours per category are planning suggestions, still to be checked
// against eMart24 sales data by hour.
export const CATEGORIES: { id: string; name: string; best: SlotId[]; tag: string }[] = [
  { id: 'coffee', name: 'Coffee & tea', best: ['0608', '0810', '1416'], tag: 'Your morning, on every storefront.' },
  { id: 'dairy', name: 'Dairy & milk', best: ['0608', '0810', '1820'], tag: 'First thing, on the way in.' },
  { id: 'softdrinks', name: 'Soft drinks & water', best: ['1214', '1416', '1618'], tag: 'The afternoon pick-me-up.' },
  { id: 'energy', name: 'Energy & isotonic', best: ['0608', '1618', '1820'], tag: 'After work, before the gym.' },
  { id: 'snacks', name: 'Snacks & confectionery', best: ['1416', '1618', '2022'], tag: 'The 3pm snack run.' },
  { id: 'food', name: 'Packaged & instant food', best: ['1214', '1820', '2022', '2224'], tag: 'Dinner, sorted on the way home.' },
  { id: 'personal', name: 'Personal care', best: ['0810', '1820'], tag: 'Picked up with the morning shop.' },
  { id: 'home', name: 'Home care', best: ['1012', '1820'], tag: 'On the everyday list.' },
  { id: 'health', name: 'Health & supplements', best: ['0608', '0810'], tag: 'Start the day right.' },
  { id: 'ewallets', name: 'E-wallets & payments', best: ['1214', '1820'], tag: 'The last thing they see before they pay.' },
  { id: 'telco', name: 'Telco & top-ups', best: ['1214', '1820'], tag: 'Top up over lunch.' },
  { id: 'other', name: 'Other', best: [], tag: 'Your hour, on every storefront.' },
];

/** Slot statuses are managed by Daniel and Deewakshi in the Google Sheet "eMart24 Slot Board"
 *  (https://docs.google.com/spreadsheets/d/1FKGLw-w6GQSr32CWOsUfUuakOBWsOdSWXo7zfZHzf84/edit).
 *  Its "Website feed" tab is published to the web as CSV; paste that CSV link here.
 *  (File > Share > Publish to web > Website feed > Comma-separated values.) */
export const SLOT_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYPiSy7-neOA3NQhNs9xO1E8Hf1mu_2r6eYbO2sUGoyHsDG_1ztmTkCgpwX6mJkDN-Wc17AnBNGgry/pub?gid=1&single=true&output=csv';

/** Fallback statuses kept in code (normally empty; the sheet wins). "category:slot" keys,
 *  e.g. 'snacks:1416': 'taken'. Anything not listed is open. */
export const SLOT_STATUS: Record<string, 'talks' | 'taken'> = {};

export type GroupId = 'office' | 'campus' | 'suburb' | 'mall';
export const GROUPS: { id: GroupId; name: string; who: string; color: string }[] = [
  { id: 'office', name: 'Office & transit', who: 'Office workers & commuters', color: '#1f4e8c' },
  { id: 'campus', name: 'Campus & young', who: 'Students & young adults', color: '#127a4a' },
  { id: 'suburb', name: 'Suburban families', who: 'Families & residents', color: '#a8580c' },
  { id: 'mall', name: 'In-mall', who: 'Mall shoppers', color: '#7b3fa0' },
];

// Approximate neighbourhood positions; exact addresses still to be confirmed.
export const STORES: { n: string; a: string; g: GroupId; lat: number; lon: number }[] = [
  { n: 'Bangsar South', a: 'KL', g: 'office', lat: 3.1119, lon: 101.6686 },
  { n: 'Plaza Sentral', a: 'KL Sentral', g: 'office', lat: 3.1326, lon: 101.6848 },
  { n: 'UOA Sentul Point', a: 'Sentul', g: 'office', lat: 3.18, lon: 101.69 },
  { n: 'Tamarind Square', a: 'Cyberjaya', g: 'office', lat: 2.92, lon: 101.655 },
  { n: 'IOI Conezion', a: 'Putrajaya', g: 'office', lat: 2.9659, lon: 101.7223 },
  { n: 'Bandar Sunway', a: 'Subang Jaya', g: 'campus', lat: 3.0686, lon: 101.6042 },
  { n: 'Kota Damansara', a: 'Petaling Jaya', g: 'campus', lat: 3.155, lon: 101.585 },
  { n: 'Kota Warisan', a: 'Sepang', g: 'suburb', lat: 2.795, lon: 101.7 },
  { n: 'Bangi Seksyen 7', a: 'Bangi', g: 'suburb', lat: 2.93, lon: 101.775 },
  { n: 'Tasik Puteri', a: 'Rawang', g: 'suburb', lat: 3.3, lon: 101.53 },
  { n: 'TEMU Elmina East', a: 'Shah Alam', g: 'suburb', lat: 3.18, lon: 101.5 },
  { n: 'Bukit Antarabangsa', a: 'Ampang', g: 'suburb', lat: 3.18, lon: 101.77 },
  { n: 'Eco Majestic', a: 'Semenyih', g: 'suburb', lat: 2.95, lon: 101.86 },
  { n: 'Sama Square', a: 'Setapak', g: 'mall', lat: 3.205, lon: 101.72 },
  { n: 'KL East Mall', a: 'Melawati', g: 'mall', lat: 3.215, lon: 101.748 },
];

export const CITIES = [
  { n: 'KUALA LUMPUR', lat: 3.148, lon: 101.697, dx: 14, dy: -12 },
  { n: 'PETALING JAYA', lat: 3.107, lon: 101.607, dx: -48, dy: 22 },
  { n: 'SHAH ALAM', lat: 3.073, lon: 101.518, dx: -30, dy: 20 },
  { n: 'PUTRAJAYA', lat: 2.926, lon: 101.696, dx: 14, dy: 22 },
  { n: 'KLIA', lat: 2.745, lon: 101.708, dx: 12, dy: 4 },
];

// Indicative main corridors only (simplified)
export const ROADS: [number, number][][] = [
  [[3.04, 101.45], [3.07, 101.52], [3.1, 101.61], [3.13, 101.67], [3.148, 101.697]],
  [[3.148, 101.697], [3.1, 101.71], [3.0, 101.72], [2.93, 101.7], [2.8, 101.7], [2.745, 101.708]],
  [[3.148, 101.697], [3.2, 101.66], [3.3, 101.55]],
  [[3.148, 101.697], [3.17, 101.75], [3.22, 101.76]],
  [[3.1, 101.71], [3.03, 101.78], [2.95, 101.86]],
];

/** Store photos. Internal-review images from the prototype: replace with licensed/own
 *  photos before launch. `store` is the 1-based index in STORES that the photo shows. */
export const PHOTOS = [
  { src: '/emart24/bangsar-south-front.jpg', alt: 'eMart24 store with full glass frontage', store: 1 },
  { src: '/emart24/tamarind-square.jpg', alt: 'eMart24 shopfront among trees', store: 4 },
  { src: '/emart24/bangsar-south-evening.jpg', alt: 'eMart24 storefront along a walkway', store: 1 },
  { src: '/emart24/bangsar-south-trees.jpg', alt: 'eMart24 store seen from a garden', store: 1 },
];
