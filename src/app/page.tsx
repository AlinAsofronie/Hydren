'use client'

import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { HeroSection } from '@/components/HeroSection'
import { ParallaxSection, SmoothReveal, MagneticElement } from '@/components/animations/ParallaxSection'
import { ScrollTimeline, FeatureShowcase, ScrollStats } from '@/components/animations/ScrollTimeline'
import { StaggeredReveal, TextReveal, ScaleReveal } from '@/components/animations/SmoothReveal'
import { ScrollProgress, CircularScrollProgress, HeroScrollIndicator } from '@/components/animations/ScrollProgress'

export default function Home() {
  // Timeline data for process showcase
  const processTimeline = [
    {
      id: 'assessment',
      title: 'Initial Assessment',
      description: 'Comprehensive evaluation of your water systems and compliance requirements',
      icon: <div className="w-8 h-8 bg-medical-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
    },
    {
      id: 'planning',
      title: 'Strategic Planning',
      description: 'Develop customized water hygiene management plan based on HTM 04-01 guidelines',
      icon: <div className="w-8 h-8 bg-trust-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
    },
    {
      id: 'implementation',
      title: 'Implementation',
      description: 'Deploy testing protocols, monitoring systems, and staff training programmes',
      icon: <div className="w-8 h-8 bg-safety-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
    },
    {
      id: 'monitoring',
      title: 'Ongoing Monitoring',
      description: 'Continuous monitoring, reporting, and compliance maintenance with 24/7 support',
      icon: <div className="w-8 h-8 bg-medical-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
    }
  ]

  // Feature showcase data
  const features = [
    {
      title: 'Advanced Testing Technology',
      description: 'State-of-the-art laboratory equipment and UKAS-accredited testing protocols ensure the highest accuracy in water quality analysis.',
      details: [
        'ISO 17025 accredited laboratory',
        'Real-time PCR legionella detection',
        'Comprehensive chemical analysis',
        '24-hour result turnaround'
      ],
      visual: (
        <div className="bg-gradient-to-br from-medical-100 to-trust-100 rounded-3xl p-8 h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-medical-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🔬</span>
            </div>
            <div className="text-2xl font-bold text-medical-600">UKAS Accredited</div>
          </div>
        </div>
      )
    },
    {
      title: 'Expert Consultation',
      description: 'Our team of water hygiene specialists brings decades of experience in healthcare compliance and regulatory requirements.',
      details: [
        'HTM 04-01 certified specialists',
        'NHS framework approved',
        'Regulatory compliance expertise',
        'Emergency response capability'
      ],
      visual: (
        <div className="bg-gradient-to-br from-trust-100 to-safety-100 rounded-3xl p-8 h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-trust-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">👥</span>
            </div>
            <div className="text-2xl font-bold text-trust-600">Expert Team</div>
          </div>
        </div>
      )
    }
  ]

  // Statistics data
  const stats = [
    { number: '500', label: 'Facilities Protected', suffix: '+' },
    { number: '99.9', label: 'Compliance Rate', suffix: '%' },
    { number: '24', label: 'Hour Response', suffix: '/7' },
    { number: '15', label: 'Years Experience', suffix: '+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Indicators */}
      <ScrollProgress />
      <CircularScrollProgress />
      
      {/* Hero Section with Parallax */}
      <HeroSection />
      <HeroScrollIndicator label="Discover our services" />

      {/* Services Section with Apple-style animations */}
      <ParallaxSection 
        speed="slow" 
        className="py-24 relative bg-gradient-to-br from-neutral-50 via-medical-50 to-trust-50"
      >
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <TextReveal 
              text="Comprehensive Water Solutions"
              className="text-4xl font-display font-bold text-neutral-900 mb-4"
            />
            <SmoothReveal delay={0.3} direction="up">
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Our expert team delivers cutting-edge water hygiene services 
                with precision and care.
              </p>
            </SmoothReveal>
          </SmoothReveal>

          <StaggeredReveal 
            stagger={0.2}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: '💧',
                title: 'Water Testing & Analysis',
                description: 'Advanced laboratory testing to ensure your water meets the highest safety and quality standards using state-of-the-art equipment.',
                color: 'medical'
              },
              {
                icon: '🔧',
                title: 'System Cleaning & Maintenance', 
                description: 'Professional cleaning and maintenance of water storage tanks, pipes, and distribution systems to prevent contamination.',
                color: 'trust'
              },
              {
                icon: '📋',
                title: 'Compliance & Consultation',
                description: 'Expert guidance on regulatory compliance, risk assessment, and implementation of best practices for water management.',
                color: 'safety'
              }
            ].map((service, index) => (
              <MagneticElement key={service.title}>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-apple hover:shadow-apple-lg transition-all duration-500 h-full">
                  <ScaleReveal delay={index * 0.1}>
                    <div className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                  </ScaleReveal>
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <AnimatedButton variant="ghost" size="sm">
                    Learn More →
                  </AnimatedButton>
                </div>
              </MagneticElement>
            ))}
          </StaggeredReveal>
        </div>
      </ParallaxSection>

      {/* Animated Statistics Section */}
      <ParallaxSection 
        speed="medium"
        className="py-24 bg-gradient-to-r from-medical-600 to-trust-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-6">
          <SmoothReveal className="text-center text-white mb-16">
            <TextReveal 
              text="Trusted by Industry Leaders"
              className="text-4xl font-display font-bold"
            />
          </SmoothReveal>
          
          <ScrollStats stats={stats} className="text-white" />
        </div>
      </ParallaxSection>

      {/* Process Timeline Section */}
      <section className="py-32 bg-gradient-to-br from-neutral-50 to-medical-50">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-20">
            <TextReveal 
              text="Our Proven Process"
              className="text-5xl font-display font-bold text-neutral-900 mb-6"
            />
            <SmoothReveal delay={0.3}>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                From initial assessment to ongoing monitoring, our systematic approach 
                ensures complete water safety compliance for your healthcare facility.
              </p>
            </SmoothReveal>
          </SmoothReveal>
          
          <ScrollTimeline items={processTimeline} />
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-20">
            <TextReveal 
              text="Why Choose Pure Water Solutions"
              className="text-5xl font-display font-bold text-neutral-900 mb-6"
            />
          </SmoothReveal>
          
          <FeatureShowcase features={features} />
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <ParallaxSection speed="slow" className="py-32 bg-gradient-to-br from-medical-50 to-trust-50">
        <div className="container mx-auto px-6">
          <SmoothReveal>
            <MagneticElement>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center shadow-apple-xl max-w-4xl mx-auto">
                <ScaleReveal>
                  <h2 className="text-4xl font-display font-bold text-neutral-900 mb-6">
                    Ready to Ensure Water Safety?
                  </h2>
                </ScaleReveal>
                <SmoothReveal delay={0.3}>
                  <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                    Contact our experts today for a comprehensive water hygiene assessment 
                    and customized solution for your needs.
                  </p>
                </SmoothReveal>
                <StaggeredReveal stagger={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton size="lg" className="px-8">
                    Schedule Consultation
                  </AnimatedButton>
                  <AnimatedButton variant="secondary" size="lg">
                    Call (555) 123-4567
                  </AnimatedButton>
                </StaggeredReveal>
              </div>
            </MagneticElement>
          </SmoothReveal>
        </div>
      </ParallaxSection>
    </div>
  );
}