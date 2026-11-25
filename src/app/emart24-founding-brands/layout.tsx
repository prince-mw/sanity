import { Metadata } from 'next';

// Short sales campaign shared by direct link only: kept out of search results and the sitemap.
export const metadata: Metadata = {
  title: 'Founding Brand Slots on eMart24 ePaper Screens',
  description:
    'Be the first brand in your category on eMart24 storefront ePaper screens across 15 Klang Valley stores. Pick your hours and claim a founding rate.',
  alternates: {
    canonical: 'https://www.movingwalls.com/emart24-founding-brands',
  },
  robots: { index: false, follow: false },
};

export default function EmartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
