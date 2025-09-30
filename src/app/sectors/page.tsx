import type { Metadata } from 'next'
import { SmoothReveal, StaggeredReveal, TextReveal, ScaleReveal } from '@/components/animations/SmoothReveal'
import { ParallaxSection, MagneticElement } from '@/components/animations/ParallaxSection'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sectors We Serve | Healthcare & Commercial Water Hygiene',
  description: 'Specialized water hygiene services for NHS trusts, private hospitals, care homes, schools, hotels, and commercial facilities across the UK.',
  keywords: 'healthcare water hygiene, NHS water safety, hospital compliance, care home legionella, commercial water testing',
  openGraph: {
    title: 'Sectors We Serve | Healthcare & Commercial Water Hygiene',
    description: 'Specialized water hygiene services for NHS trusts, private hospitals, care homes, schools, hotels, and commercial facilities across the UK.',
    type: 'website',
    url: '/sectors',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sectors We Serve | Healthcare & Commercial Water Hygiene',
    description: 'Specialized water hygiene services for NHS trusts, private hospitals, care homes, schools, hotels, and commercial facilities across the UK.',
  }
}

export default function SectorsPage() {
  const sectors = [
    {
      title: 'NHS Trusts & Hospitals',
      description: 'Comprehensive water hygiene services for NHS trusts and private hospitals, ensuring HTM 04-01 compliance and patient safety.',
      features: [
        'HTM 04-01 compliance auditing',
        'Legionella risk assessments',
        'Critical care water systems',
        'Augmented care protocols',
        'Emergency response services',
        'Staff training programs'
      ],
      challenges: [
        'Complex multi-building sites',
        'Critical patient safety requirements',
        'Regulatory compliance demands',
        '24/7 operational requirements'
      ],
      icon: '🏥',
      color: 'medical',
      stats: { facilities: '150+', compliance: '99.9%' }
    },
    {
      title: 'Care Homes & Assisted Living',
      description: 'Specialized water safety solutions for care homes, protecting vulnerable residents with tailored risk management.',
      features: [
        'Vulnerable population protection',
        'Simplified compliance reporting',
        'Regular monitoring schedules',
        'Staff competency training',
        'Emergency incident response',
        'Cost-effective solutions'
      ],
      challenges: [
        'Vulnerable resident populations',
        'Limited technical resources',
        'Budget considerations',
        'Staff training requirements'
      ],
      icon: '🏠',
      color: 'trust',
      stats: { facilities: '200+', response: '2hr' }
    },
    {
      title: 'Schools & Universities',
      description: 'Educational facility water safety ensuring healthy learning environments with minimal operational disruption.',
      features: [
        'School holiday maintenance',
        'Student safety protocols',
        'Educational workshops',
        'Minimal disruption scheduling',
        'Cost-effective packages',
        'Long-term partnerships'
      ],
      challenges: [
        'Seasonal usage patterns',
        'Budget constraints',
        'Multiple user groups',
        'Health & safety obligations'
      ],
      icon: '🎓',
      color: 'safety',
      stats: { facilities: '80+', coverage: '100%' }
    },
    {
      title: 'Hotels & Hospitality',
      description: 'Guest safety and reputation protection through comprehensive water hygiene management for hospitality venues.',
      features: [
        'Guest safety assurance',
        'Reputation protection',
        'Flexible service schedules',
        'Tourism industry compliance',
        'Risk mitigation strategies',
        'Brand protection'
      ],
      challenges: [
        'Guest experience impact',
        'Seasonal variations',
        'Brand reputation risks',
        'Operational continuity'
      ],
      icon: '🏨',
      color: 'medical',
      stats: { facilities: '60+', satisfaction: '98%' }
    },
    {
      title: 'Commercial & Office',
      description: 'Workplace water safety for commercial buildings, ensuring employee health and regulatory compliance.',
      features: [
        'Employee health protection',
        'Regulatory compliance',
        'Flexible maintenance windows',
        'Cost-effective solutions',
        'Documentation management',
        'Minimal business disruption'
      ],
      challenges: [
        'Business continuity',
        'Diverse building types',
        'Compliance requirements',
        'Cost optimization'
      ],
      icon: '🏢',
      color: 'trust',
      stats: { facilities: '120+', uptime: '99.8%' }
    },
    {
      title: 'Leisure & Sports',
      description: 'Specialized water safety for leisure centers, gyms, and sports facilities with high water usage and public access.',
      features: [
        'High-usage system management',
        'Public safety protocols',
        'Pool and spa systems',
        'Changing room facilities',
        'Event-based scheduling',
        'Regulatory compliance'
      ],
      challenges: [
        'High water usage',
        'Public access areas',
        'Diverse facility types',
        'Peak usage periods'
      ],
      icon: '🏊',
      color: 'safety',
      stats: { facilities: '40+', users: '50k+' }
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxSection className="py-32 bg-gradient-to-br from-safety-50 via-white to-medical-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SmoothReveal>
              <span className="inline-block px-4 py-2 bg-safety-100 text-safety-700 rounded-full text-sm font-medium mb-6">
                Specialized Sector Expertise
              </span>
            </SmoothReveal>
            
            <TextReveal 
              text="Water Safety Across All Sectors"
              className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
            />
            
            <SmoothReveal delay={0.3}>
              <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                From NHS hospitals to commercial buildings, we provide tailored water hygiene 
                solutions that meet the unique challenges and requirements of each sector.
              </p>
            </SmoothReveal>

            <SmoothReveal delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton size="lg" className="px-8">
                  Find Your Sector
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="lg">
                  Download Case Studies
                </AnimatedButton>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Sectors Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Each sector has unique water safety challenges. Our specialized 
              approach ensures compliance and protection tailored to your industry.
            </p>
          </SmoothReveal>

          <div className="space-y-24">
            {sectors.map((sector, index) => (
              <SmoothReveal key={sector.title} delay={index * 0.1}>
                <MagneticElement>
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 bg-${sector.color}-100 rounded-2xl flex items-center justify-center mr-4`}>
                          <span className="text-2xl">{sector.icon}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-neutral-900">
                          {sector.title}
                        </h3>
                      </div>
                      
                      <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                        {sector.description}
                      </p>

                      {/* Features Grid */}
                      <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-3">Key Services</h4>
                          <ul className="space-y-2">
                            {sector.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-neutral-700">
                                <div className={`w-2 h-2 bg-${sector.color}-500 rounded-full mr-3 flex-shrink-0`} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-3">Sector Challenges</h4>
                          <ul className="space-y-2">
                            {sector.challenges.map((challenge, challengeIndex) => (
                              <li key={challengeIndex} className="flex items-center text-sm text-neutral-700">
                                <div className="w-2 h-2 bg-neutral-400 rounded-full mr-3 flex-shrink-0" />
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <AnimatedButton size="sm">
                          Learn More
                        </AnimatedButton>
                        <AnimatedButton variant="ghost" size="sm">
                          Case Studies →
                        </AnimatedButton>
                      </div>
                    </div>

                    {/* Stats Card */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className={`bg-gradient-to-br from-${sector.color}-50 to-${sector.color}-100 rounded-3xl p-8`}>
                        <div className="bg-white rounded-2xl p-8 shadow-apple">
                          <h4 className="text-xl font-bold text-neutral-900 mb-6">
                            Sector Statistics
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-6">
                            {Object.entries(sector.stats).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div className={`text-3xl font-bold text-${sector.color}-600 mb-2`}>
                                  {value}
                                </div>
                                <div className="text-sm text-neutral-600 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 pt-6 border-t border-neutral-200">
                            <p className="text-sm text-neutral-600 text-center">
                              Trusted by leading organizations in this sector
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </MagneticElement>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <ParallaxSection className="py-24 bg-gradient-to-br from-neutral-50 to-medical-50">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Why Sectors Choose Us
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our sector-specific expertise ensures you get solutions designed 
              for your unique operational requirements and challenges.
            </p>
          </SmoothReveal>

          <StaggeredReveal 
            stagger={0.15}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Sector Expertise',
                description: 'Deep understanding of sector-specific regulations, challenges, and best practices.',
                icon: '🎯'
              },
              {
                title: 'Tailored Solutions',
                description: 'Customized service packages designed to meet the unique needs of each industry.',
                icon: '⚙️'
              },
              {
                title: 'Proven Results',
                description: 'Track record of successful implementations across diverse sectors and facility types.',
                icon: '📈'
              }
            ].map((benefit, index) => (
              <MagneticElement key={benefit.title}>
                <div className="bg-white rounded-3xl p-8 shadow-apple hover:shadow-apple-lg transition-all duration-500 text-center h-full">
                  <ScaleReveal delay={index * 0.1}>
                    <div className="w-16 h-16 bg-medical-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl">{benefit.icon}</span>
                    </div>
                  </ScaleReveal>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </MagneticElement>
            ))}
          </StaggeredReveal>
        </div>
      </ParallaxSection>

      {/* Case Studies Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Real examples of how we&apos;ve helped organizations in different 
              sectors achieve water safety excellence.
            </p>
          </SmoothReveal>

          <StaggeredReveal 
            stagger={0.2}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                sector: 'NHS Trust',
                title: 'Major Hospital Complex',
                result: '100% HTM 04-01 compliance achieved',
                description: 'Complete water hygiene transformation for 800-bed hospital'
              },
              {
                sector: 'Care Group',
                title: 'Regional Care Homes',
                result: '50% cost reduction in water management',
                description: 'Streamlined compliance across 15 care facilities'
              },
              {
                sector: 'University',
                title: 'Campus Water Safety',
                result: 'Zero legionella incidents over 5 years',
                description: 'Comprehensive campus-wide water safety program'
              }
            ].map((study) => (
              <MagneticElement key={study.title}>
                <div className="bg-gradient-to-br from-neutral-50 to-medical-50 rounded-3xl p-8 h-full">
                  <div className="bg-white rounded-2xl p-6 h-full shadow-apple">
                    <span className="inline-block px-3 py-1 bg-medical-100 text-medical-700 rounded-full text-xs font-medium mb-4">
                      {study.sector}
                    </span>
                    
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {study.title}
                    </h3>
                    
                    <p className="text-medical-600 font-semibold mb-3">
                      {study.result}
                    </p>
                    
                    <p className="text-neutral-600 text-sm mb-6">
                      {study.description}
                    </p>
                    
                    <AnimatedButton variant="ghost" size="sm">
                      Read Case Study →
                    </AnimatedButton>
                  </div>
                </div>
              </MagneticElement>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal>
            <MagneticElement>
              <div className="bg-gradient-to-br from-safety-600 to-trust-600 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">
                  Find Your Sector Solution
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Get a tailored proposal that addresses the specific water safety 
                  challenges and requirements of your sector.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <AnimatedButton size="lg" className="bg-white text-safety-600 hover:bg-neutral-50">
                      Discuss Your Needs
                    </AnimatedButton>
                  </Link>
                  <AnimatedButton variant="secondary" size="lg" className="border-white text-white hover:bg-white/10">
                    Download Sector Guide
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