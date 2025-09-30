'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Head from 'next/head'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { FadeInSection } from '@/components/ui/FadeInSection'
import { AnimatedTextReveal } from '@/components/ui/AnimatedTextReveal'
import { 
  createHospitalWaterServiceSchema, 
  createMedicalWaterTestingSchema, 
  createHospitalWaterFAQSchema,
  createBreadcrumbSchema 
} from '@/utils/structuredData'

// SEO will be handled at layout level for client components

export default function HospitalWaterHygienePage() {
  const structuredData = [
    createHospitalWaterServiceSchema(),
    createMedicalWaterTestingSchema(),
    createHospitalWaterFAQSchema(),
    createBreadcrumbSchema([
      { name: 'Home', url: 'https://purewateruk.com' },
      { name: 'Services', url: 'https://purewateruk.com/services' },
      { name: 'Hospital Water Hygiene', url: 'https://purewateruk.com/services/hospital-water-hygiene' }
    ])
  ]

  const services = [
    {
      title: 'HTM 04-01 Compliance Auditing',
      description: 'Comprehensive auditing against Department of Health technical memorandum HTM 04-01 for healthcare water systems.',
      features: ['Risk assessment protocols', 'Documentation review', 'Compliance gap analysis', 'Action plan development'],
      icon: '🏥'
    },
    {
      title: 'Legionella Risk Management',
      description: 'Complete legionella prevention programme including sampling, analysis, and remedial action planning.',
      features: ['Monthly legionella testing', 'Risk assessment', 'Control measure implementation', '24/7 emergency response'],
      icon: '🦠'
    },
    {
      title: 'Water Temperature Monitoring',
      description: 'Continuous monitoring systems ensuring optimal water temperatures throughout hospital facilities.',
      features: ['Digital monitoring systems', 'Real-time alerts', 'Compliance reporting', 'Automated logging'],
      icon: '🌡️'
    },
    {
      title: 'Pseudomonas Testing',
      description: 'Specialized testing for Pseudomonas aeruginosa in augmented care and high-dependency units.',
      features: ['Weekly sampling protocols', 'UKAS accredited analysis', 'Clinical liaison', 'Outbreak investigation'],
      icon: '🔬'
    },
    {
      title: 'Water System Maintenance',
      description: 'Preventive maintenance programmes for hospital water infrastructure and safety equipment.',
      features: ['TMV servicing', 'Tank cleaning', 'Pipework disinfection', 'Emergency repairs'],
      icon: '🔧'
    },
    {
      title: 'Staff Training & Certification',
      description: 'Comprehensive training programmes for hospital water safety and compliance management.',
      features: ['L8 training courses', 'HTM 04-01 workshops', 'Competency assessment', 'CPD certification'],
      icon: '📚'
    }
  ]

  const complianceStandards = [
    'HTM 04-01: Safe Water in Healthcare Premises',
    'L8 (HSG274): Legionnaires\' Disease Control',
    'CQC Fundamental Standards',
    'NICE Quality Standards',
    'COSHH Regulations 2002',
    'Health and Safety at Work Act 1974'
  ]

  return (
    <>
      <Head>
        <title>Hospital Water Hygiene Services UK | HTM 04-01 Compliance | Pure Water Solutions</title>
        <meta name="description" content="Expert hospital water hygiene services across the UK. HTM 04-01 compliant legionella testing, water quality management, and infection control for NHS trusts and private healthcare facilities." />
        <meta name="keywords" content="hospital water hygiene, HTM 04-01, legionella testing, NHS water compliance, healthcare water safety, medical water testing, hospital water systems, UK healthcare water regulations" />
        <meta property="og:title" content="Hospital Water Hygiene Services UK | HTM 04-01 Compliance" />
        <meta property="og:description" content="Expert hospital water hygiene services across the UK. HTM 04-01 compliant legionella testing and water quality management." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://purewateruk.com/services/hospital-water-hygiene" />
        
        {/* Structured Data */}
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-medical-50 to-trust-50">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-medical-600 to-trust-600" />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative container mx-auto px-6 text-center text-white">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center space-x-2 text-sm opacity-80">
                <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
                <li>/</li>
                <li><Link href="/services" className="hover:text-blue-200">Services</Link></li>
                <li>/</li>
                <li className="text-blue-200">Hospital Water Hygiene</li>
              </ol>
            </nav>

            <AnimatedTextReveal
              variant="slideUp"
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Hospital Water Hygiene Services
            </AnimatedTextReveal>
            
            <AnimatedTextReveal
              delay={0.3}
              variant="slideUp" 
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90"
            >
              Protecting patient safety through expert water hygiene management and HTM 04-01 compliance across UK healthcare facilities
            </AnimatedTextReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <AnimatedButton size="lg" className="bg-white text-medical-600 hover:bg-neutral-100">
                Request HTM 04-01 Audit
              </AnimatedButton>
              <AnimatedButton 
                variant="ghost" 
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10"
              >
                Download Compliance Guide
              </AnimatedButton>
            </motion.div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-safety-400 rounded-full" />
                <span className="text-sm font-medium">NHS Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-safety-400 rounded-full" />
                <span className="text-sm font-medium">UKAS Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-safety-400 rounded-full" />
                <span className="text-sm font-medium">ISO 45001</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <FadeInSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Comprehensive Hospital Water Solutions
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Our specialist team delivers complete water hygiene management tailored 
                to the unique requirements of UK healthcare facilities
              </p>
            </FadeInSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <AnimatedCard 
                  key={service.title} 
                  delay={index * 0.1}
                  className="p-8 hover:bg-white/90"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-neutral-700">
                        <div className="w-2 h-2 bg-medical-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <AnimatedButton variant="ghost" size="sm">
                    Learn More →
                  </AnimatedButton>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Standards */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeInSection>
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                  UK Healthcare Compliance Standards
                </h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Our services ensure full compliance with all relevant UK healthcare 
                  water safety regulations and industry best practices.
                </p>
                
                <div className="space-y-4">
                  {complianceStandards.map((standard, index) => (
                    <motion.div
                      key={standard}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center p-4 bg-medical-50 rounded-lg"
                    >
                      <div className="w-3 h-3 bg-safety-500 rounded-full mr-4" />
                      <span className="font-medium text-neutral-800">{standard}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeInSection>

              <FadeInSection delay={0.3}>
                <div className="bg-gradient-to-br from-medical-500 to-trust-600 p-8 rounded-3xl text-white">
                  <h3 className="text-2xl font-bold mb-6">HTM 04-01 Compliance Checklist</h3>
                  <div className="space-y-4">
                    {[
                      'Water safety risk assessment completed',
                      'Written scheme of examination in place',
                      'Monthly legionella monitoring programme',
                      'Temperature monitoring systems installed',
                      'Staff training and competency records',
                      'Incident reporting procedures established'
                    ].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <div className="w-6 h-6 bg-safety-400 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-neutral-50 to-medical-50">
          <div className="container mx-auto px-6">
            <FadeInSection>
              <AnimatedCard className="p-12 text-center bg-gradient-to-br from-white to-medical-50/30 max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                  Ensure HTM 04-01 Compliance Today
                </h2>
                <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Protect your patients and staff with our comprehensive hospital water hygiene services. 
                  Contact our NHS-approved specialists for a consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <AnimatedButton size="lg" className="px-8">
                    Book Compliance Audit
                  </AnimatedButton>
                  <AnimatedButton variant="secondary" size="lg">
                    Call 0800 123 4567
                  </AnimatedButton>
                </div>
                <p className="text-sm text-neutral-500">
                  Emergency call-out available 24/7 | UKAS accredited testing | NHS framework approved
                </p>
              </AnimatedCard>
            </FadeInSection>
          </div>
        </section>
      </div>
    </>
  )
}