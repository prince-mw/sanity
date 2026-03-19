import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import { draftMode } from "next/headers";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import PreviewBanner from "@/components/PreviewBanner";
import { LocaleProvider } from "@/i18n/LocaleContext";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const siteUrl = "https://www.movingwalls.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Moving Walls - Connected Media Platform for OOH Advertising",
    template: "%s",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
  description: "Moving Walls delivers innovative out-of-home advertising solutions with AI-powered media planning, programmatic buying, and real-time measurement to amplify your brand reach across 2.8B+ screens worldwide.",
  keywords: [
    "OOH advertising",
    "out-of-home advertising",
    "DOOH",
    "digital out-of-home",
    "programmatic OOH",
    "media planning",
    "billboard advertising",
    "outdoor advertising",
    "advertising platform",
    "Moving Walls",
  ],
  authors: [{ name: "Moving Walls" }],
  creator: "Moving Walls",
  publisher: "Moving Walls",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Moving Walls",
    title: "Moving Walls - Connected Media Platform for OOH Advertising",
    description: "Transform your advertising with AI-powered OOH media planning, programmatic buying, and real-time measurement across 2.8B+ screens worldwide.",
    images: [
      {
        url: "/assets/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Moving Walls - Connected Media Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Walls - Connected Media Platform for OOH Advertising",
    description: "Transform your advertising with AI-powered OOH media planning, programmatic buying, and real-time measurement.",
    images: ["/assets/images/og-image.svg"],
    creator: "@movingwalls",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// Organization structured data for SEO
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MovingWalls",
  url: "https://www.movingwalls.com",
  logo: "https://www.movingwalls.com/assets/images/og-image.svg",
  description: "MovingWalls delivers innovative out-of-home advertising solutions with AI-powered media planning, programmatic buying, and real-time measurement.",
  foundingDate: "2014",
  sameAs: [
    "https://www.linkedin.com/company/moving-walls/",
    "https://x.com/movingwalls",
    "https://www.facebook.com/movingwalls/",
    "https://www.youtube.com/@MovingWallsMy",
    "https://www.instagram.com/mymovingwalls/"
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+65-8755-6364",
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: ["English"]
    }
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Far East Finance Building, #8-02, 14 Robinson Road",
    addressLocality: "Singapore",
    postalCode: "048545",
    addressCountry: "SG"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isPreview } = await draftMode();

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans antialiased bg-white text-mw-gray-900`}>
        {/* Analytics & Tracking - Managed via Sanity CMS */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LocaleProvider>
          <HeaderWrapper />
          <main className={isPreview ? 'pb-16' : ''}>
            {children}
          </main>
          <GlobalCTA />
          <Footer />
          <CookieConsent />
          <PreviewBanner isPreview={isPreview} />
        </LocaleProvider>
      </body>
    </html>
  );
}
