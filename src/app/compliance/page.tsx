import type { Metadata } from 'next'
import { SmoothReveal, StaggeredReveal, TextReveal, ScaleReveal } from '@/components/animations/SmoothReveal'
import { ParallaxSection, MagneticElement } from '@/components/animations/ParallaxSection'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Water Hygiene Compliance | HTM 04-01, HSG274 & Regulations',
  description: 'Expert guidance on water hygiene compliance including HTM 04-01, HSG274, ACOP L8, and healthcare water safety regulations.',
  keywords: 'HTM 04-01 compliance, HSG274, ACOP L8, water hygiene regulations, healthcare water safety, legionella compliance',
  openGraph: {
    title: 'Water Hygiene Compliance | HTM 04-01, HSG274 & Regulations',
    description: 'Expert guidance on water hygiene compliance including HTM 04-01, HSG274, ACOP L8, and healthcare water safety regulations.',
    type: 'website',
    url: '/compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water Hygiene Compliance | HTM 04-01, HSG274 & Regulations',
    description: 'Expert guidance on water hygiene compliance including HTM 04-01, HSG274, ACOP L8, and healthcare water safety regulations.',
  }
}

export default function CompliancePage() {
  const regulations = [
    {
      title: 'HTM 04-01',
      fullName: 'Health Technical Memorandum 04-01',
      description: 'The essential guidance for water safety in healthcare premises, covering design, installation, commissioning, and ongoing management.',
      scope: 'Healthcare facilities including hospitals, clinics, and care homes',
      keyRequirements: [
        'Water safety group establishment',
        'Risk assessment and management',
        'Temperature monitoring regimes',
        'Microbiological surveillance',
        'Documentation and record keeping',
        'Competency and training requirements'
      ],
      icon: '🏥',
      color: 'medical',
      authority: 'Department of Health & Social Care'
    },
    {
      title: 'HSG274',
      fullName: 'Health and Safety Guidance 274',
      description: 'HSE guidance on legionella control covering the technical aspects of assessment, prevention, and control.',
      scope: 'All premises with water systems posing legionella risk',
      keyRequirements: [
        'Legionella risk assessment',
        'Written control scheme',
        'Monitoring and inspection',
        'Water treatment protocols',
        'Record keeping systems',
        'Competent person appointment'
      ],
      icon: '⚖️',
      color: 'trust',
      authority: 'Health and Safety Executive'
    },
    {
      title: 'ACOP L8',
      fullName: 'Approved Code of Practice L8',
      description: 'The legal framework for controlling legionella bacteria in water systems, with practical guidance.',
      scope: 'All duty holders responsible for water systems',
      keyRequirements: [
        'Duty of care obligations',
        'Risk assessment duties',
        'Control measure implementation',
        'Monitoring requirements',
        'Record maintenance',
        'Incident reporting'
      ],
      icon: '📜',
      color: 'safety',
      authority: 'Health and Safety Executive'
    }
  ]

  const complianceSteps = [
    {
      step: '01',
      title: 'Assessment',
      description: 'Comprehensive evaluation of current compliance status and identification of gaps.',
      activities: [
        'Regulatory gap analysis',
        'Documentation review',
        'System assessment',
        'Risk evaluation'
      ]
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Development of tailored compliance strategy and implementation roadmap.',
      activities: [
        'Compliance strategy',
        'Implementation plan',
        'Resource allocation',
        'Timeline development'
      ]
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Execution of compliance measures including policies, procedures, and controls.',
      activities: [
        'Policy development',
        'Procedure implementation',
        'Control installation',
        'Staff training'
      ]
    },
    {
      step: '04',
      title: 'Monitoring',
      description: 'Ongoing compliance monitoring, reporting, and continuous improvement.',
      activities: [
        'Regular auditing',
        'Performance monitoring',
        'Report generation',
        'Continuous improvement'
      ]
    }
  ]

  const benefits = [
    {
      title: 'Legal Protection',
      description: 'Reduce legal liability and demonstrate due diligence in water safety management.',
      icon: '🛡️'
    },
    {
      title: 'Risk Mitigation',
      description: 'Minimize the risk of waterborne disease outbreaks and associated consequences.',
      icon: '⚠️'
    },
    {
      title: 'Operational Excellence',
      description: 'Improve operational efficiency through systematic water management processes.',
      icon: '⚙️'
    },
    {
      title: 'Reputation Protection',
      description: 'Protect organizational reputation through proactive compliance management.',
      icon: '🏆'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxSection className="py-32 bg-gradient-to-br from-trust-50 via-white to-safety-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SmoothReveal>
              <span className="inline-block px-4 py-2 bg-trust-100 text-trust-700 rounded-full text-sm font-medium mb-6">
                Regulatory Compliance Experts
              </span>
            </SmoothReveal>
            
            <TextReveal 
              text="Water Hygiene Compliance Made Simple"
              className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
            />
            
            <SmoothReveal delay={0.3}>
              <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Navigate complex water hygiene regulations with confidence. Our expert guidance 
                ensures full compliance with HTM 04-01, HSG274, and all relevant legislation.
              </p>
            </SmoothReveal>

            <SmoothReveal delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton size="lg" className="px-8">
                  Compliance Assessment
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="lg">
                  Download Compliance Guide
                </AnimatedButton>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Key Regulations Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Key Regulations & Standards
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Understanding the regulatory landscape is essential for effective 
              water hygiene management and legal compliance.
            </p>
          </SmoothReveal>

          <div className="space-y-16">
            {regulations.map((regulation, index) => (
              <SmoothReveal key={regulation.title} delay={index * 0.1}>
                <MagneticElement>
                  <div className="bg-gradient-to-br from-neutral-50 to-medical-50 rounded-3xl p-8">
                    <div className="bg-white rounded-2xl p-8 shadow-apple">
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Header */}
                        <div className="lg:col-span-3 border-b border-neutral-200 pb-6 mb-6">
                          <div className="flex items-center mb-4">
                            <div className={`w-16 h-16 bg-${regulation.color}-100 rounded-2xl flex items-center justify-center mr-6`}>
                              <span className="text-2xl">{regulation.icon}</span>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-neutral-900">
                                {regulation.title}
                              </h3>
                              <p className="text-lg text-neutral-600">
                                {regulation.fullName}
                              </p>
                              <p className="text-sm text-neutral-500">
                                Authority: {regulation.authority}
                              </p>
                            </div>
                          </div>
                          <p className="text-neutral-600 leading-relaxed">
                            {regulation.description}
                          </p>
                        </div>

                        {/* Scope */}
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-3">
                            Applies To
                          </h4>
                          <p className="text-neutral-600 text-sm leading-relaxed">
                            {regulation.scope}
                          </p>
                        </div>

                        {/* Key Requirements */}
                        <div className="lg:col-span-2">
                          <h4 className="font-semibold text-neutral-900 mb-3">
                            Key Requirements
                          </h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {regulation.keyRequirements.map((requirement, reqIndex) => (
                              <div key={reqIndex} className="flex items-center text-sm text-neutral-700">
                                <div className={`w-2 h-2 bg-${regulation.color}-500 rounded-full mr-3 flex-shrink-0`} />
                                {requirement}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
                        <AnimatedButton size="sm">
                          Compliance Assessment
                        </AnimatedButton>
                        <AnimatedButton variant="ghost" size="sm">
                          Download Guide →
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </MagneticElement>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Process */}
      <ParallaxSection className="py-24 bg-gradient-to-br from-neutral-50 to-trust-50">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Our Compliance Process
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A systematic approach to achieving and maintaining compliance 
              across all relevant regulations and standards.
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complianceSteps.map((step, index) => (
              <SmoothReveal key={step.step} delay={index * 0.1}>
                <div className="bg-white rounded-3xl p-8 shadow-apple h-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-medical-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3 text-sm">
                      Key Activities
                    </h4>
                    <ul className="space-y-2">
                      {step.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-center text-xs text-neutral-600">
                          <div className="w-1.5 h-1.5 bg-medical-400 rounded-full mr-2 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Benefits of Compliance
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Proper compliance delivers tangible benefits beyond regulatory 
              requirements, protecting both people and organizations.
            </p>
          </SmoothReveal>

          <StaggeredReveal 
            stagger={0.15}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <MagneticElement key={benefit.title}>
                <div className="bg-white rounded-3xl p-8 shadow-apple hover:shadow-apple-lg transition-all duration-500 text-center h-full border border-neutral-100">
                  <ScaleReveal delay={index * 0.1}>
                    <div className="w-16 h-16 bg-safety-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl">{benefit.icon}</span>
                    </div>
                  </ScaleReveal>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </MagneticElement>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Compliance Checklist */}
      <ParallaxSection className="py-24 bg-gradient-to-br from-medical-50 to-neutral-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SmoothReveal>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Compliance Checklist
              </h2>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Use this checklist to assess your current compliance status 
                and identify areas requiring attention.
              </p>
              
              <div className="space-y-4">
                {[
                  'Written water safety policy in place',
                  'Competent person appointed and trained',
                  'Risk assessments completed and current',
                  'Control schemes documented and implemented',
                  'Monitoring and inspection schedules active',
                  'Records maintained and up to date',
                  'Staff training programs delivered',
                  'Emergency procedures established',
                  'Regular compliance audits conducted',
                  'Continuous improvement processes active'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 border-2 border-medical-300 rounded mr-4 flex items-center justify-center">
                      <span className="text-medical-500 text-sm">✓</span>
                    </div>
                    <span className="text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <AnimatedButton size="lg">
                  Download Full Checklist
                </AnimatedButton>
              </div>
            </SmoothReveal>

            <SmoothReveal delay={0.3} direction="right">
              <div className="bg-gradient-to-br from-trust-100 to-medical-100 rounded-3xl p-8">
                <div className="bg-white rounded-2xl p-8 shadow-apple">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                    Compliance Assessment
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Get a comprehensive evaluation of your current compliance 
                    status with our expert assessment service.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-trust-500 rounded-full mr-3"></div>
                      <span className="text-neutral-700">Regulatory gap analysis</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-trust-500 rounded-full mr-3"></div>
                      <span className="text-neutral-700">Priority action plan</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-trust-500 rounded-full mr-3"></div>
                      <span className="text-neutral-700">Implementation roadmap</span>
                    </div>
                  </div>

                  <Link href="/contact">
                    <AnimatedButton size="lg" className="w-full">
                      Request Assessment
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal>
            <MagneticElement>
              <div className="bg-gradient-to-br from-medical-600 to-safety-600 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">
                  Achieve Compliance Confidence
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Don&apos;t navigate complex regulations alone. Let our experts guide 
                  you to full compliance and peace of mind.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <AnimatedButton size="lg" className="bg-white text-medical-600 hover:bg-neutral-50">
                      Start Your Assessment
                    </AnimatedButton>
                  </Link>
                  <AnimatedButton variant="secondary" size="lg" className="border-white text-white hover:bg-white/10">
                    Call Our Experts
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