'use client'

import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ContactForm } from '@/components/ContactForm'
import { FadeInSection } from '@/components/ui/FadeInSection'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { AnimatedTextReveal } from '@/components/ui/AnimatedTextReveal'

export default function ContactPage() {
  const contactMethods = [
    {
      icon: '📞',
      title: 'Emergency Hotline',
      description: 'For urgent water safety issues requiring immediate response',
      contact: '+44 20 7123 4567',
      href: 'tel:+442071234567',
      available: '24/7 Emergency Response'
    },
    {
      icon: '📧',
      title: 'General Enquiries',
      description: 'For routine consultations and service requests',
      contact: 'info@purewateruk.com',
      href: 'mailto:info@purewateruk.com',
      available: 'Response within 24 hours'
    },
    {
      icon: '🏥',
      title: 'NHS Contracts',
      description: 'Dedicated support for NHS trusts and healthcare facilities',
      contact: 'nhs@purewateruk.com',
      href: 'mailto:nhs@purewateruk.com',
      available: 'Specialist healthcare team'
    },
    {
      icon: '🚨',
      title: 'Urgent Support',
      description: 'For non-emergency urgent matters requiring priority response',
      contact: 'urgent@purewateruk.com',
      href: 'mailto:urgent@purewateruk.com',
      available: 'Response within 2-4 hours'
    }
  ]

  const offices = [
    {
      city: 'London',
      address: '123 Healthcare Drive\nLondon SE1 2AB',
      phone: '+44 20 7123 4567',
      region: 'Head Office - South England'
    },
    {
      city: 'Manchester',
      address: '456 Medical Centre\nManchester M1 3CD',
      phone: '+44 161 234 5678',
      region: 'North England & Scotland'
    },
    {
      city: 'Cardiff',
      address: '789 Hospital Row\nCardiff CF1 4EF',
      phone: '+44 29 2345 6789',
      region: 'Wales & Southwest'
    }
  ]

  const certifications = [
    { name: 'ISO 9001:2015', description: 'Quality Management' },
    { name: 'ISO 45001', description: 'Health & Safety' },
    { name: 'UKAS Accredited', description: 'Laboratory Testing' },
    { name: 'NHS Framework', description: 'Approved Supplier' },
    { name: 'HTM 04-01', description: 'Compliant Services' },
    { name: 'CHAS Approved', description: 'Health & Safety' }
  ]

  return (
    <>
      <Head>
        <title>Contact Pure Water Solutions - Expert Water Hygiene Consultation</title>
        <meta name="description" content="Contact Pure Water Solutions for professional water hygiene services. 24/7 emergency support, NHS approved specialists, and HTM 04-01 compliant solutions across the UK." />
        <meta name="keywords" content="contact water hygiene services, NHS water testing, emergency legionella response, HTM 04-01 consultation, UK water compliance contact" />
        <meta property="og:title" content="Contact Pure Water Solutions - Expert Water Hygiene Consultation" />
        <meta property="og:description" content="Contact our NHS approved water hygiene specialists. 24/7 emergency support and HTM 04-01 compliant solutions." />
        <link rel="canonical" href="https://purewateruk.com/contact" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-medical-50 to-trust-50">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-trust-600 to-medical-600" />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative container mx-auto px-6 text-center text-white">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center space-x-2 text-sm opacity-80">
                <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
                <li>/</li>
                <li className="text-blue-200">Contact</li>
              </ol>
            </nav>

            <AnimatedTextReveal
              variant="slideUp"
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Get Expert Water
              <span className="block text-trust-200">Hygiene Consultation</span>
            </AnimatedTextReveal>
            
            <AnimatedTextReveal
              delay={0.3}
              variant="slideUp" 
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90"
            >
              Contact our NHS-approved specialists for HTM 04-01 compliant water hygiene solutions. 
              Emergency support available 24/7.
            </AnimatedTextReveal>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-6 opacity-80"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-safety-400 rounded-full" />
                <span className="text-sm font-medium">24/7 Emergency Response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-safety-400 rounded-full" />
                <span className="text-sm font-medium">NHS Framework Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-safety-400 rounded-full" />
                <span className="text-sm font-medium">UKAS Accredited Testing</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 -mt-12 relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <AnimatedCard 
                  key={method.title}
                  delay={index * 0.1}
                  className="p-6 text-center hover:bg-white/90"
                >
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  <a
                    href={method.href}
                    className="font-semibold text-medical-600 hover:text-medical-700 transition-colors block mb-2"
                  >
                    {method.contact}
                  </a>
                  <p className="text-xs text-neutral-500">{method.available}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Form */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Office Locations */}
                <FadeInSection>
                  <AnimatedCard className="p-6">
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                      📍 Office Locations
                    </h3>
                    <div className="space-y-6">
                      {offices.map((office) => (
                        <div key={office.city}>
                          <h4 className="font-semibold text-neutral-900">{office.city}</h4>
                          <p className="text-sm text-neutral-600 whitespace-pre-line mb-1">
                            {office.address}
                          </p>
                          <a 
                            href={`tel:${office.phone.replace(/\s/g, '')}`}
                            className="text-sm text-medical-600 hover:text-medical-700 transition-colors"
                          >
                            {office.phone}
                          </a>
                          <p className="text-xs text-neutral-500 mt-1">{office.region}</p>
                        </div>
                      ))}
                    </div>
                  </AnimatedCard>
                </FadeInSection>

                {/* Certifications */}
                <FadeInSection delay={0.2}>
                  <AnimatedCard className="p-6">
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                      🏆 Certifications
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {certifications.map((cert) => (
                        <div key={cert.name} className="text-center p-3 bg-medical-50 rounded-lg">
                          <div className="font-semibold text-sm text-neutral-900">{cert.name}</div>
                          <div className="text-xs text-neutral-600">{cert.description}</div>
                        </div>
                      ))}
                    </div>
                  </AnimatedCard>
                </FadeInSection>

                {/* Business Hours */}
                <FadeInSection delay={0.4}>
                  <AnimatedCard className="p-6">
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                      🕒 Business Hours
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Monday - Friday</span>
                        <span className="font-medium">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Saturday</span>
                        <span className="font-medium">9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Sunday</span>
                        <span className="font-medium">Emergency Only</span>
                      </div>
                      <div className="pt-3 border-t border-neutral-200">
                        <div className="flex justify-between">
                          <span className="text-red-600 font-medium">Emergency</span>
                          <span className="text-red-600 font-medium">24/7 Available</span>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}