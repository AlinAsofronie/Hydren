import type { Metadata } from 'next'
import { SmoothReveal, StaggeredReveal, TextReveal, ScaleReveal } from '@/components/animations/SmoothReveal'
import { ParallaxSection, MagneticElement } from '@/components/animations/ParallaxSection'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Water Hygiene Services | Professional Water Testing & Compliance',
  description: 'Comprehensive water hygiene services including testing, legionella assessment, system maintenance, and HTM 04-01 compliance for healthcare facilities.',
  keywords: 'water hygiene services, legionella testing, water quality, HTM 04-01, healthcare compliance, water safety',
  openGraph: {
    title: 'Water Hygiene Services | Professional Water Testing & Compliance',
    description: 'Comprehensive water hygiene services including testing, legionella assessment, system maintenance, and HTM 04-01 compliance for healthcare facilities.',
    type: 'website',
    url: '/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water Hygiene Services | Professional Water Testing & Compliance',
    description: 'Comprehensive water hygiene services including testing, legionella assessment, system maintenance, and HTM 04-01 compliance for healthcare facilities.',
  }
}

export default function ServicesPage() {
  const services = [
    {
      title: 'Water Testing & Analysis',
      description: 'Comprehensive laboratory testing including microbiological analysis, chemical testing, and legionella detection using UKAS-accredited methods.',
      features: [
        'Microbiological analysis',
        'Chemical composition testing',
        'Legionella detection & enumeration',
        'Temperature monitoring',
        'Chlorine residual testing',
        '24-hour result turnaround'
      ],
      icon: '🔬',
      color: 'medical',
      link: '/services/water-testing'
    },
    {
      title: 'Legionella Risk Assessment',
      description: 'Professional legionella risk assessments and management plans compliant with HSG274 and HTM 04-01 guidelines.',
      features: [
        'Site surveys & risk identification',
        'Written risk assessments',
        'Control scheme development',
        'Monitoring programs',
        'Staff training programs',
        'Annual review & updates'
      ],
      icon: '📋',
      color: 'trust',
      link: '/services/legionella-assessment'
    },
    {
      title: 'System Cleaning & Maintenance',
      description: 'Professional cleaning and disinfection of water systems, storage tanks, and distribution networks.',
      features: [
        'Tank cleaning & disinfection',
        'Pipe work cleaning',
        'Shower head maintenance',
        'Outlet sanitization',
        'System commissioning',
        'Emergency response'
      ],
      icon: '🔧',
      color: 'safety',
      link: '/services/system-maintenance'
    },
    {
      title: 'HTM 04-01 Compliance',
      description: 'Complete compliance solutions for healthcare water systems following Department of Health guidelines.',
      features: [
        'Compliance auditing',
        'Documentation reviews',
        'Policy development',
        'Training delivery',
        'Remedial action plans',
        'Ongoing support'
      ],
      icon: '✅',
      color: 'medical',
      link: '/services/htm-compliance'
    },
    {
      title: 'Emergency Response',
      description: '24/7 emergency response service for water hygiene incidents and urgent remedial actions.',
      features: [
        '24/7 emergency callout',
        'Rapid response team',
        'Incident investigation',
        'Immediate risk mitigation',
        'Regulatory reporting',
        'Crisis management support'
      ],
      icon: '🚨',
      color: 'trust',
      link: '/services/emergency-response'
    },
    {
      title: 'Training & Consultancy',
      description: 'Expert training programs and consultancy services to build internal water hygiene capabilities.',
      features: [
        'Water hygiene training',
        'Competency assessments',
        'Policy development',
        'Technical consultancy',
        'Best practice guidance',
        'Certification programs'
      ],
      icon: '🎓',
      color: 'safety',
      link: '/services/training'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxSection className="py-32 bg-gradient-to-br from-medical-50 via-white to-trust-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SmoothReveal>
              <span className="inline-block px-4 py-2 bg-medical-100 text-medical-700 rounded-full text-sm font-medium mb-6">
                Professional Water Hygiene Services
              </span>
            </SmoothReveal>
            
            <TextReveal 
              text="Comprehensive Water Safety Solutions"
              className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
            />
            
            <SmoothReveal delay={0.3}>
              <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                From routine testing to emergency response, we provide complete water hygiene 
                services to protect your facility and ensure regulatory compliance.
              </p>
            </SmoothReveal>

            <SmoothReveal delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton size="lg" className="px-8">
                  Request Quote
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="lg">
                  Download Brochure
                </AnimatedButton>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Our Service Portfolio
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Each service is delivered by qualified professionals using the latest 
              technology and following industry best practices.
            </p>
          </SmoothReveal>

          <StaggeredReveal 
            stagger={0.15}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <MagneticElement key={service.title}>
                <div className="bg-white rounded-3xl p-8 shadow-apple hover:shadow-apple-lg transition-all duration-500 h-full border border-neutral-100">
                  <ScaleReveal delay={index * 0.1}>
                    <div className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                  </ScaleReveal>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-neutral-700">
                        <div className={`w-2 h-2 bg-${service.color}-500 rounded-full mr-3 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={service.link}>
                    <AnimatedButton variant="ghost" size="sm" className="w-full">
                      Learn More →
                    </AnimatedButton>
                  </Link>
                </div>
              </MagneticElement>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Process Section */}
      <ParallaxSection className="py-24 bg-gradient-to-br from-neutral-50 to-medical-50">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Our Service Process
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A systematic approach to water hygiene management ensuring 
              comprehensive coverage and compliance.
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Assessment',
                description: 'Comprehensive site survey and risk evaluation'
              },
              {
                step: '02', 
                title: 'Planning',
                description: 'Customized service plan and documentation'
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'Professional service delivery and testing'
              },
              {
                step: '04',
                title: 'Monitoring',
                description: 'Ongoing support and compliance tracking'
              }
            ].map((process, index) => (
              <SmoothReveal key={process.step} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-medical-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {process.title}
                  </h3>
                  <p className="text-neutral-600">
                    {process.description}
                  </p>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal>
            <MagneticElement>
              <div className="bg-gradient-to-br from-medical-600 to-trust-600 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">
                  Ready to Enhance Your Water Safety?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Contact our experts today for a comprehensive assessment 
                  and customized service proposal.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <AnimatedButton size="lg" className="bg-white text-medical-600 hover:bg-neutral-50">
                      Get Started Today
                    </AnimatedButton>
                  </Link>
                  <AnimatedButton variant="secondary" size="lg" className="border-white text-white hover:bg-white/10">
                    Call (555) 123-4567
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