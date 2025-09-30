import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'service'
  structuredData?: object
  noIndex?: boolean
  locale?: string
}

export function SEOHead({
  title = 'Pure Water Solutions - Professional Water Hygiene Services UK',
  description = 'Expert water hygiene services for UK hospitals and healthcare facilities. HTM 04-01 compliant water testing, legionella prevention, and regulatory compliance solutions.',
  keywords = 'water hygiene, legionella testing, HTM 04-01, hospital water safety, healthcare water compliance, UK water regulations, water quality testing, legionella prevention, medical water systems',
  canonical,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  structuredData,
  noIndex = false,
  locale = 'en_GB'
}: SEOHeadProps) {
  const siteUrl = 'https://purewateruk.com' // Replace with actual domain
  const fullTitle = title.includes('Pure Water Solutions') ? title : `${title} | Pure Water Solutions`
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Pure Water Solutions Ltd" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={`${siteUrl}${canonical || ''}`} />
      <meta property="og:site_name" content="Pure Water Solutions" />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Additional Meta */}
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="msapplication-TileColor" content="#0ea5e9" />
      
      {/* Geo Tags for UK targeting */}
      <meta name="geo.region" content="GB" />
      <meta name="geo.country" content="UK" />
      <meta name="geo.placename" content="United Kingdom" />
      
      {/* Industry Specific */}
      <meta name="industry" content="Healthcare Water Management" />
      <meta name="coverage" content="UK" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  )
}