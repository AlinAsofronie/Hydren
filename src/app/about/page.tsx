import type { Metadata } from 'next'
import { SmoothReveal, StaggeredReveal, TextReveal, ScaleReveal } from '@/components/animations/SmoothReveal'
import { ParallaxSection, MagneticElement } from '@/components/animations/ParallaxSection'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { ScrollStats } from '@/components/animations/ScrollTimeline'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Water Hygiene Experts Since 2009',
  description: 'Leading water hygiene specialists with over 15 years of experience in healthcare compliance, legionella control, and water safety management.',
  keywords: 'water hygiene experts, legionella specialists, water safety professionals, HTM 04-01 consultants, healthcare water compliance',
  openGraph: {
    title: 'About Us | Water Hygiene Experts Since 2009',
    description: 'Leading water hygiene specialists with over 15 years of experience in healthcare compliance, legionella control, and water safety management.',
    type: 'website',
    url: '/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Water Hygiene Experts Since 2009',
    description: 'Leading water hygiene specialists with over 15 years of experience in healthcare compliance, legionella control, and water safety management.',
  }
}

export default function AboutPage() {
  const stats = [
    { number: '500', label: 'Facilities Protected', suffix: '+' },
    { number: '15', label: 'Years Experience', suffix: '+' },
    { number: '99.9', label: 'Compliance Rate', suffix: '%' },
    { number: '24', label: 'Hour Response', suffix: '/7' }
  ]

  const values = [
    {
      title: 'Excellence',
      description: 'We maintain the highest standards in all our services, using cutting-edge technology and proven methodologies.',
      icon: '⭐'
    },
    {
      title: 'Integrity',
      description: 'Transparent, honest communication and ethical practices form the foundation of all our client relationships.',
      icon: '🤝'
    },
    {
      title: 'Innovation',
      description: 'Continuously advancing our methods and technologies to provide the most effective water safety solutions.',
      icon: '💡'
    },
    {
      title: 'Compliance',
      description: 'Unwavering commitment to regulatory compliance and industry best practices in every project.',
      icon: '✅'
    }
  ]

  const team = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Technical Director',
      qualifications: 'PhD Microbiology, UKAS Assessor',
      experience: '20+ years in water microbiology',
      image: '/team/sarah-mitchell.jpg'
    },
    {
      name: 'James Crawford',
      role: 'Operations Manager',
      qualifications: 'MSc Environmental Health, IOSH',
      experience: '15+ years in healthcare compliance',
      image: '/team/james-crawford.jpg'
    },
    {
      name: 'Emma Thompson',
      role: 'Senior Consultant',
      qualifications: 'BEng Civil Engineering, CIBSE',
      experience: '12+ years in building services',
      image: '/team/emma-thompson.jpg'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxSection className="py-32 bg-gradient-to-br from-trust-50 via-white to-medical-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SmoothReveal>
              <span className="inline-block px-4 py-2 bg-trust-100 text-trust-700 rounded-full text-sm font-medium mb-6">
                Trusted Water Hygiene Experts
              </span>
            </SmoothReveal>
            
            <TextReveal 
              text="Protecting Lives Through Water Safety"
              className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
            />
            
            <SmoothReveal delay={0.3}>
              <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                For over 15 years, we&apos;ve been the trusted partner for healthcare facilities, 
                ensuring water safety and regulatory compliance through expert knowledge 
                and innovative solutions.
              </p>
            </SmoothReveal>

            <SmoothReveal delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <AnimatedButton size="lg" className="px-8">
                    Our Services
                  </AnimatedButton>
                </Link>
                <Link href="/contact">
                  <AnimatedButton variant="secondary" size="lg">
                    Get In Touch
                  </AnimatedButton>
                </Link>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Stats Section */}
      <ParallaxSection className="py-24 bg-gradient-to-r from-medical-600 to-trust-600">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center text-white mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Proven Track Record
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Our experience speaks for itself through the trust of our clients 
              and the results we deliver.
            </p>
          </SmoothReveal>
          
          <ScrollStats stats={stats} className="text-white" />
        </div>
      </ParallaxSection>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SmoothReveal>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
                <p>
                  Founded in 2009 by a team of water safety professionals, we recognized 
                  the critical need for specialized water hygiene expertise in healthcare 
                  environments. What started as a small consultancy has grown into a 
                  leading provider of comprehensive water safety solutions.
                </p>
                <p>
                  Our journey began with a simple mission: to protect lives by ensuring 
                  the highest standards of water safety. Today, we serve over 500 
                  facilities across the UK, from small clinics to major hospital trusts.
                </p>
                <p>
                  We&apos;ve built our reputation on technical excellence, regulatory compliance, 
                  and most importantly, the trust of our clients. Every day, we work to 
                  maintain the highest standards that keep people safe.
                </p>
              </div>
            </SmoothReveal>

            <SmoothReveal delay={0.3} direction="right">
              <div className="bg-gradient-to-br from-medical-50 to-trust-50 rounded-3xl p-8">
                <div className="bg-white rounded-2xl p-8 shadow-apple">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    Our Mission
                  </h3>
                  <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                    To be the leading provider of water hygiene services, protecting 
                    public health through innovative solutions, expert knowledge, and 
                    unwavering commitment to safety.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-medical-500 rounded-full"></div>
                    <span className="text-medical-600 font-medium">Safety First</span>
                  </div>
                </div>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <ParallaxSection className="py-24 bg-gradient-to-br from-neutral-50 to-trust-50">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These core principles guide everything we do and define who we are 
              as a company.
            </p>
          </SmoothReveal>

          <StaggeredReveal 
            stagger={0.15}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <MagneticElement key={value.title}>
                <div className="bg-white rounded-3xl p-8 shadow-apple hover:shadow-apple-lg transition-all duration-500 text-center h-full">
                  <ScaleReveal delay={index * 0.1}>
                    <div className="w-16 h-16 bg-medical-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl">{value.icon}</span>
                    </div>
                  </ScaleReveal>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </MagneticElement>
            ))}
          </StaggeredReveal>
        </div>
      </ParallaxSection>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Expert Team
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our team combines deep technical expertise with practical experience 
              to deliver exceptional results for every client.
            </p>
          </SmoothReveal>

          <StaggeredReveal 
            stagger={0.2}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {team.map((member) => (
              <MagneticElement key={member.name}>
                <div className="text-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-medical-100 to-trust-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-6xl">👤</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-medical-600 font-medium mb-2">
                    {member.role}
                  </p>
                  
                  <p className="text-sm text-neutral-600 mb-2">
                    {member.qualifications}
                  </p>
                  
                  <p className="text-sm text-neutral-500">
                    {member.experience}
                  </p>
                </div>
              </MagneticElement>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Accreditations Section */}
      <ParallaxSection className="py-24 bg-gradient-to-br from-medical-50 to-neutral-50">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Accreditations & Certifications
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our qualifications and certifications demonstrate our commitment 
              to the highest professional standards.
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'UKAS Accredited', description: 'ISO 17025 Laboratory' },
              { name: 'NHS Framework', description: 'Approved Supplier' },
              { name: 'IOSH Certified', description: 'Health & Safety' },
              { name: 'CIBSE Member', description: 'Building Services' }
            ].map((cert, index) => (
              <SmoothReveal key={cert.name} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-apple text-center">
                  <div className="w-16 h-16 bg-trust-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏆</span>
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

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal>
            <MagneticElement>
              <div className="bg-gradient-to-br from-trust-600 to-medical-600 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">
                  Ready to Work With Us?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Discover how our expertise can help protect your facility 
                  and ensure complete water safety compliance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <AnimatedButton size="lg" className="bg-white text-trust-600 hover:bg-neutral-50">
                      Start a Conversation
                    </AnimatedButton>
                  </Link>
                  <Link href="/services">
                    <AnimatedButton variant="secondary" size="lg" className="border-white text-white hover:bg-white/10">
                      View Our Services
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </MagneticElement>
          </SmoothReveal>
        </div>
      </section>
    </div>
  )
}