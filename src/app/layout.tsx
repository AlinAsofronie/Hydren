import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createCompanySchema } from '@/utils/structuredData'

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Pure Water Solutions - Professional Water Hygiene Services UK',
    template: '%s | Pure Water Solutions'
  },
  description: 'Leading provider of water hygiene services for UK hospitals and healthcare facilities. HTM 04-01 compliant legionella testing, water quality management, and regulatory compliance solutions.',
  keywords: 'water hygiene, legionella testing, HTM 04-01, hospital water safety, healthcare water compliance, UK water regulations, NHS water services, medical water systems, legionella prevention',
  authors: [{ name: 'Pure Water Solutions Ltd' }],
  creator: 'Pure Water Solutions Ltd',
  publisher: 'Pure Water Solutions Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://purewateruk.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pure Water Solutions - Professional Water Hygiene Services UK',
    description: 'Leading provider of water hygiene services for UK hospitals and healthcare facilities. HTM 04-01 compliant solutions.',
    url: 'https://purewateruk.com',
    siteName: 'Pure Water Solutions',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pure Water Solutions - Hospital Water Hygiene Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pure Water Solutions - Professional Water Hygiene Services UK',
    description: 'Leading provider of water hygiene services for UK hospitals and healthcare facilities.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companySchema = createCompanySchema()
  
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(companySchema)
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
