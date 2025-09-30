// Structured Data (Schema.org) utilities for SEO

export interface LocalBusiness {
  "@context": "https://schema.org"
  "@type": "LocalBusiness" | "MedicalBusiness" | "Service"
  name: string
  description: string
  url: string
  telephone: string
  email: string
  address: {
    "@type": "PostalAddress"
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    "@type": "GeoCoordinates"
    latitude: number
    longitude: number
  }
  openingHours?: string[]
  sameAs?: string[]
  aggregateRating?: {
    "@type": "AggregateRating"
    ratingValue: number
    reviewCount: number
  }
}

export interface Service {
  "@context": "https://schema.org"
  "@type": "Service"
  name: string
  description: string
  provider: {
    "@type": "LocalBusiness"
    name: string
    url: string
  }
  areaServed: {
    "@type": "Country" | "Place"
    name: string
  }
  serviceType: string
  audience?: {
    "@type": "Audience"
    audienceType: string
  }
}

export interface MedicalService {
  "@context": "https://schema.org"
  "@type": "MedicalService"
  name: string
  description: string
  provider: {
    "@type": "MedicalBusiness"
    name: string
    url: string
  }
  medicalSpecialty: string[]
  availableService: {
    "@type": "MedicalService"
    name: string
  }[]
}

// Company Schema
export const createCompanySchema = (): LocalBusiness => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pure Water Solutions Ltd",
  description: "Leading provider of water hygiene services for UK hospitals and healthcare facilities. Specializing in HTM 04-01 compliance, legionella prevention, and water quality testing.",
  url: "https://purewateruk.com",
  telephone: "+44-20-7123-4567",
  email: "info@purewateruk.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Healthcare Drive",
    addressLocality: "London",
    addressRegion: "Greater London",
    postalCode: "SE1 2AB",
    addressCountry: "GB"
  },
  openingHours: [
    "Mo-Fr 08:00-18:00",
    "Sa 09:00-17:00"
  ],
  sameAs: [
    "https://linkedin.com/company/purewateruk",
    "https://twitter.com/purewateruk"
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.9,
    reviewCount: 127
  }
})

// Hospital Water Hygiene Service Schema
export const createHospitalWaterServiceSchema = (): Service => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hospital Water Hygiene Services",
  description: "Comprehensive water hygiene management for UK hospitals including HTM 04-01 compliance, legionella risk assessments, water testing, and remedial works.",
  provider: {
    "@type": "LocalBusiness",
    name: "Pure Water Solutions Ltd",
    url: "https://purewateruk.com"
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom"
  },
  serviceType: "Water Hygiene Management",
  audience: {
    "@type": "Audience",
    audienceType: "Healthcare Facilities"
  }
})

// Medical Water Testing Service Schema
export const createMedicalWaterTestingSchema = (): MedicalService => ({
  "@context": "https://schema.org",
  "@type": "MedicalService",
  name: "Medical Water Quality Testing",
  description: "Specialized water quality testing and analysis for hospital water systems, ensuring compliance with HTM 04-01 and patient safety standards.",
  provider: {
    "@type": "MedicalBusiness",
    name: "Pure Water Solutions Ltd",
    url: "https://purewateruk.com"
  },
  medicalSpecialty: [
    "Water Quality Management",
    "Infection Prevention",
    "Healthcare Environmental Safety"
  ],
  availableService: [
    {
      "@type": "MedicalService",
      name: "Legionella Testing"
    },
    {
      "@type": "MedicalService", 
      name: "Pseudomonas Testing"
    },
    {
      "@type": "MedicalService",
      name: "Water Temperature Monitoring"
    },
    {
      "@type": "MedicalService",
      name: "HTM 04-01 Compliance Auditing"
    }
  ]
})

// FAQ Schema for common hospital water hygiene questions
export const createHospitalWaterFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is HTM 04-01 compliance for hospitals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HTM 04-01 is the UK Department of Health technical memorandum that provides guidance on water management and water system safety in healthcare premises. It covers legionella control, water quality monitoring, and risk assessment procedures to protect patients and staff from waterborne infections."
      }
    },
    {
      "@type": "Question",
      name: "How often should hospital water systems be tested for legionella?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "According to HTM 04-01, hospital water systems should be tested monthly for legionella bacteria. High-risk areas such as ICUs and immunocompromised patient wards may require more frequent testing. Temperature monitoring should be conducted weekly."
      }
    },
    {
      "@type": "Question",
      name: "What are the consequences of non-compliance with water hygiene regulations in UK hospitals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non-compliance can result in CQC enforcement actions, prosecution under Health and Safety legislation, increased infection rates, patient harm, reputational damage, and potential closure of affected wards or facilities."
      }
    },
    {
      "@type": "Question",
      name: "What water testing is required for hospital augmented care units?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Augmented care units require enhanced water testing including weekly legionella sampling, daily temperature checks, monthly pseudomonas testing, and quarterly comprehensive water quality analysis to protect vulnerable patients."
      }
    }
  ]
})

// Breadcrumb Schema
export const createBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})