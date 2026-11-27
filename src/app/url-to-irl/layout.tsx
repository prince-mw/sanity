import { Metadata } from 'next';

const meta = {
  // Measured: title 504px (limit 600), description 957px (limit 960).
  title: 'URL2IRL: The Incrementality Operating System for OOH',
  description:
    'Nine controlled brand lift experiments in Thailand, Vietnam and the Philippines, misses published with the wins. How URL2IRL proves what OOH changes.',
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: 'https://www.movingwalls.com/url-to-irl',
  },
};

export default function URLToIRLLayout({ children }: { children: React.ReactNode }) {
  return children;
}
