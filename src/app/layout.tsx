import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import AIAssistant from "@/components/AIAssistant";
import CookieConsent from "@/components/CookieConsent";
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
    template: "%s | Moving Walls",
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
  name: "Moving Walls",
  url: "https://www.movingwalls.com",
  logo: "https://www.movingwalls.com/assets/images/og-image.svg",
  description: "Moving Walls delivers innovative out-of-home advertising solutions with AI-powered media planning, programmatic buying, and real-time measurement.",
  foundingDate: "2014",
  sameAs: [
    "https://www.linkedin.com/company/movingwalls",
    "https://twitter.com/movingwalls",
    "https://www.facebook.com/movingwalls"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W8SDQPG');
          `}
        </Script>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LPHVR00DLC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LPHVR00DLC');
          `}
        </Script>
        
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2116798625788074');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${poppins.variable} font-sans antialiased bg-white text-mw-gray-900`}>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W8SDQPG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2116798625788074&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <LocaleProvider>
          <Header />
          <main>
            {children}
          </main>
          {/* <GlobalCTA /> */}
          <Footer />
          <AIAssistant />
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
