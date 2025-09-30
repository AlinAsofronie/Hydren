import type { Metadata } from 'next'
import { SmoothReveal, StaggeredReveal, TextReveal, ScaleReveal } from '@/components/animations/SmoothReveal'
import { ParallaxSection, MagneticElement } from '@/components/animations/ParallaxSection'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Water Hygiene Experts - Get Expert Advice',
  description: 'Contact our water hygiene experts for consultations, emergency response, and compliance support. 24/7 emergency hotline available.',
  keywords: 'contact water hygiene experts, emergency water safety, legionella consultation, HTM 04-01 support, water testing enquiries',
  openGraph: {
    title: 'Contact Us | Water Hygiene Experts - Get Expert Advice',
    description: 'Contact our water hygiene experts for consultations, emergency response, and compliance support. 24/7 emergency hotline available.',
    type: 'website',
    url: '/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Water Hygiene Experts - Get Expert Advice',
    description: 'Contact our water hygiene experts for consultations, emergency response, and compliance support. 24/7 emergency hotline available.',
  }
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: '🚨',
      title: 'Emergency Hotline',
      description: 'For urgent water safety issues requiring immediate response',
      contact: '+44 20 7123 4567',
      href: 'tel:+442071234567',
      available: '24/7 Emergency Response',
      color: 'medical'
    },
    {
      icon: '📧',
      title: 'General Enquiries',
      description: 'For routine consultations and service requests',
      contact: 'info@purewateruk.com',
      href: 'mailto:info@purewateruk.com',
      available: 'Response within 24 hours',
      color: 'trust'
    },
    {
      icon: '🏥',
      title: 'NHS Contracts',
      description: 'Dedicated support for NHS trusts and healthcare facilities',
      contact: 'nhs@purewateruk.com',
      href: 'mailto:nhs@purewateruk.com',
      available: 'Specialist healthcare team',
      color: 'safety'
    },
    {
      icon: '📞',
      title: 'Technical Support',
      description: 'For technical queries and compliance guidance',
      contact: '+44 20 7123 4568',
      href: 'tel:+442071234568',
      available: 'Mon-Fri 8:00-18:00',
      color: 'medical'
    }
  ]

  const offices = [
    {
      city: 'London',
      address: '123 Healthcare Drive\nLondon SE1 2AB',
      phone: '+44 20 7123 4567',
      region: 'South East England'
    },
    {
      city: 'Manchester',
      address: '456 Industrial Park\nManchester M2 3CD',
      phone: '+44 161 234 5678',
      region: 'North West England'
    },
    {
      city: 'Birmingham',
      address: '789 Business Quarter\nBirmingham B1 4EF',
      phone: '+44 121 345 6789',
      region: 'Midlands'
    }
  ]

  const certifications = [
    { name: 'UKAS Accredited', description: 'ISO 17025 Laboratory', icon: '🏆' },
    { name: 'NHS Framework', description: 'Approved Supplier', icon: '🏥' },
    { name: 'ISO 9001:2015', description: 'Quality Management', icon: '📜' },
    { name: 'HTM 04-01', description: 'Compliant Services', icon: '✅' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxSection className="py-32 bg-gradient-to-br from-trust-50 via-white to-medical-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SmoothReveal>
              <span className="inline-block px-4 py-2 bg-trust-100 text-trust-700 rounded-full text-sm font-medium mb-6">
                Expert Water Hygiene Support
              </span>
            </SmoothReveal>
            
            <TextReveal 
              text="Get In Touch With Our Experts"
              className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
            />
            
            <SmoothReveal delay={0.3}>
              <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Whether you need emergency support, routine consultation, or compliance guidance, 
                our team of water hygiene specialists is here to help.
              </p>
            </SmoothReveal>

            <SmoothReveal delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton size="lg" className="px-8">
                  Emergency Hotline
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="lg">
                  Schedule Consultation
                </AnimatedButton>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Choose the contact method that best suits your needs and urgency level.
            </p>
          </SmoothReveal>

          <StaggeredReveal 
            stagger={0.15}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {contactMethods.map((method, index) => (
              <MagneticElement key={method.title}>
                <div className="bg-white rounded-3xl p-8 shadow-apple hover:shadow-apple-lg transition-all duration-500 h-full border border-neutral-100">
                  <ScaleReveal delay={index * 0.1}>
                    <div className={`w-16 h-16 bg-${method.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                      <span className="text-2xl">{method.icon}</span>
                    </div>
                  </ScaleReveal>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {method.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-4 leading-relaxed text-sm">
                    {method.description}
                  </p>
                  
                  <div className="mb-4">
                    <a 
                      href={method.href}
                      className={`text-${method.color}-600 font-semibold hover:text-${method.color}-700 transition-colors`}
                    >
                      {method.contact}
                    </a>
                  </div>
                  
                  <div className={`text-xs text-${method.color}-500 bg-${method.color}-50 px-3 py-1 rounded-full inline-block`}>
                    {method.available}
                  </div>
                </div>
              </MagneticElement>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Contact Form Section */}
      <ParallaxSection className="py-24 bg-gradient-to-br from-neutral-50 to-medical-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <SmoothReveal>
              <div className="lg:sticky lg:top-8">
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                  Send Us a Message
                </h2>
                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  Complete the form below and our team will respond promptly with 
                  the information and assistance you need.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-medical-600">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Fast Response</h3>
                      <p className="text-neutral-600 text-sm">Most enquiries answered within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-trust-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-trust-600">🔒</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Secure & Confidential</h3>
                      <p className="text-neutral-600 text-sm">Your information is protected and confidential</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-safety-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-safety-600">👥</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Expert Team</h3>
                      <p className="text-neutral-600 text-sm">Answered by qualified water hygiene specialists</p>
                    </div>
                  </div>
                </div>
              </div>
            </SmoothReveal>

            <SmoothReveal delay={0.3} direction="right">
              <div className="bg-white rounded-3xl p-8 shadow-apple">
                <ContactForm />
              </div>
            </SmoothReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Office Locations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Our Locations
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              With offices across the UK, we provide local expertise and 
              rapid response capabilities nationwide.
            </p>
          </SmoothReveal>

          <StaggeredReveal 
            stagger={0.2}
            className="grid md:grid-cols-3 gap-8"
          >
            {offices.map((office) => (
              <MagneticElement key={office.city}>
                <div className="text-center bg-gradient-to-br from-neutral-50 to-medical-50 rounded-3xl p-8">
                  <div className="bg-white rounded-2xl p-6 shadow-apple">
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">
                      {office.city}
                    </h3>
                    
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🏢</span>
                      </div>
                      <p className="text-neutral-600 text-sm whitespace-pre-line mb-3">
                        {office.address}
                      </p>
                      <p className="text-medical-600 font-semibold mb-2">
                        {office.phone}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Serving {office.region}
                      </p>
                    </div>
                    
                    <AnimatedButton variant="ghost" size="sm">
                      Get Directions
                    </AnimatedButton>
                  </div>
                </div>
              </MagneticElement>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Certifications */}
      <ParallaxSection className="py-24 bg-gradient-to-br from-trust-50 to-neutral-50">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Trusted & Accredited
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our certifications and accreditations demonstrate our commitment 
              to the highest professional standards.
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <SmoothReveal key={cert.name} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-apple text-center">
                  <div className="w-16 h-16 bg-trust-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{cert.icon}</span>
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {cert.description}
                  </p>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Emergency CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal>
            <MagneticElement>
              <div className="bg-gradient-to-br from-medical-600 to-trust-600 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🚨</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Water Safety Emergency?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  If you&apos;re experiencing a water safety emergency or urgent compliance issue, 
                  contact our emergency response team immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+442071234567">
                    <AnimatedButton size="lg" className="bg-white text-medical-600 hover:bg-neutral-50">
                      Call Emergency Hotline
                    </AnimatedButton>
                  </a>
                  <AnimatedButton variant="secondary" size="lg" className="border-white text-white hover:bg-white/10">
                    Emergency Email
                  </AnimatedButton>
                </div>
              </div>
            </MagneticElement>
          </SmoothReveal>
        </div>
      </section>
    </div>
  )
}