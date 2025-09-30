'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { FadeInSection } from '@/components/ui/FadeInSection'
import { AnimatedTextReveal } from '@/components/ui/AnimatedTextReveal'
import { 
  createMedicalWaterTestingSchema,
  createBreadcrumbSchema 
} from '@/utils/structuredData'

// SEO will be handled at layout level for client components

export default function LegionellaTestingHospitalsPage() {
  const structuredData = [
    createMedicalWaterTestingSchema(),
    createBreadcrumbSchema([
      { name: 'Home', url: 'https://purewateruk.com' },
      { name: 'Services', url: 'https://purewateruk.com/services' },
      { name: 'Legionella Testing Hospitals', url: 'https://purewateruk.com/services/legionella-testing-hospitals' }
    ])
  ]

  const testingSchedule = [
    {
      area: 'General Ward Areas',
      frequency: 'Monthly',
      samplePoints: '10-15 per floor',
      priority: 'Standard'
    },
    {
      area: 'ICU & HDU',
      frequency: 'Bi-weekly',
      samplePoints: '20-25 per unit',
      priority: 'High Risk'
    },
    {
      area: 'Immunocompromised Units',
      frequency: 'Weekly',
      samplePoints: '25-30 per unit',
      priority: 'Critical'
    },
    {
      area: 'Maternity Units',
      frequency: 'Bi-weekly',
      samplePoints: '15-20 per unit',
      priority: 'High Risk'
    },
    {
      area: 'Outpatient Clinics',
      frequency: 'Monthly',
      samplePoints: '5-8 per clinic',
      priority: 'Standard'
    },
    {
      area: 'Operating Theatres',
      frequency: 'Weekly',
      samplePoints: '8-12 per theatre',
      priority: 'Critical'
    }
  ]

  const riskFactors = [
    {
      title: 'Vulnerable Patient Populations',
      description: 'Immunocompromised patients, elderly, and those with chronic respiratory conditions',
      icon: '👥'
    },
    {
      title: 'Complex Water Systems',
      description: 'Multiple interconnected systems with dead legs and low-flow areas',
      icon: '🔄'
    },
    {
      title: 'Temperature Variations',
      description: 'Inconsistent water temperatures creating ideal breeding conditions',
      icon: '🌡️'
    },
    {
      title: 'Biofilm Formation',
      description: 'Accumulation of biofilms providing nutrients and protection for bacteria',
      icon: '🦠'
    }
  ]

  return (
    <>
      {/* Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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
                <li><Link href="/services" className="hover:text-blue-200">Services</Link></li>
                <li>/</li>
                <li className="text-blue-200">Legionella Testing Hospitals</li>
              </ol>
            </nav>

            <AnimatedTextReveal
              variant="slideUp"
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Legionella Testing
              <span className="block text-trust-200">for UK Hospitals</span>
            </AnimatedTextReveal>
            
            <AnimatedTextReveal
              delay={0.3}
              variant="slideUp" 
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90"
            >
              UKAS accredited legionella testing services ensuring patient safety and HTM 04-01 compliance across NHS trusts and private healthcare facilities
            </AnimatedTextReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <AnimatedButton size="lg" className="bg-white text-medical-600 hover:bg-neutral-100">
                Schedule Testing Programme
              </AnimatedButton>
              <AnimatedButton 
                variant="ghost" 
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10"
              >
                Emergency Testing →
              </AnimatedButton>
            </motion.div>

            {/* Key Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { number: '24hr', label: 'Results Turnaround' },
                { number: '99.9%', label: 'Accuracy Rate' },
                { number: '200+', label: 'Hospitals Served' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Risk Factors */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <FadeInSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Legionella Risk Factors in Hospitals
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Healthcare environments present unique challenges for legionella control, 
                requiring specialized testing protocols and expertise
              </p>
            </FadeInSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {riskFactors.map((factor, index) => (
                <AnimatedCard 
                  key={factor.title} 
                  delay={index * 0.1}
                  className="p-8 text-center hover:bg-white/90"
                >
                  <div className="text-5xl mb-4">{factor.icon}</div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    {factor.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {factor.description}
                  </p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Testing Schedule */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <FadeInSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                HTM 04-01 Testing Schedule
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Tailored sampling frequencies based on risk assessment and patient vulnerability
              </p>
            </FadeInSection>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-apple overflow-hidden">
                <thead className="bg-medical-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Hospital Area</th>
                    <th className="px-6 py-4 text-left font-semibold">Testing Frequency</th>
                    <th className="px-6 py-4 text-left font-semibold">Sample Points</th>
                    <th className="px-6 py-4 text-left font-semibold">Risk Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {testingSchedule.map((schedule, index) => (
                    <motion.tr
                      key={schedule.area}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-b border-neutral-100 hover:bg-medical-50/50"
                    >
                      <td className="px-6 py-4 font-medium text-neutral-900">{schedule.area}</td>
                      <td className="px-6 py-4 text-neutral-700">{schedule.frequency}</td>
                      <td className="px-6 py-4 text-neutral-700">{schedule.samplePoints}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          schedule.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                          schedule.priority === 'High Risk' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {schedule.priority}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-gradient-to-br from-medical-50 to-trust-50">
          <div className="container mx-auto px-6">
            <FadeInSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Our Testing Process
              </h2>
              <p className="text-lg text-neutral-600">
                Comprehensive 5-step process ensuring accurate results and regulatory compliance
              </p>
            </FadeInSection>

            <div className="grid md:grid-cols-5 gap-8">
              {[
                { step: '01', title: 'Site Survey', description: 'Comprehensive water system mapping and risk assessment' },
                { step: '02', title: 'Sample Collection', description: 'Trained technicians collect samples using sterile protocols' },
                { step: '03', title: 'UKAS Testing', description: 'Analysis in our ISO 17025 accredited laboratory' },
                { step: '04', title: 'Results Report', description: '24-hour turnaround with detailed compliance documentation' },
                { step: '05', title: 'Action Plan', description: 'Remedial recommendations and ongoing monitoring schedule' }
              ].map((process, index) => (
                <FadeInSection key={process.step} delay={index * 0.2}>
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 bg-medical-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto"
                    >
                      {process.step}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {process.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Response */}
        <section className="py-24 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeInSection>
                <h2 className="text-4xl font-bold mb-6">
                  24/7 Emergency Response
                </h2>
                <p className="text-xl mb-8 opacity-90 leading-relaxed">
                  When legionella is detected, immediate action is critical. Our emergency response team provides rapid sampling, analysis, and remediation guidance to protect patients and staff.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    '2-hour emergency call-out',
                    'Same-day laboratory analysis', 
                    'Immediate results notification',
                    'Expert remediation guidance',
                    'Incident documentation support'
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-4" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <AnimatedButton 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-neutral-100"
                >
                  Emergency Hotline: 0800 999 7777
                </AnimatedButton>
              </FadeInSection>

              <FadeInSection delay={0.3}>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-6">Emergency Protocol</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">1</div>
                      <div>
                        <h4 className="font-semibold mb-2">Immediate Isolation</h4>
                        <p className="text-sm opacity-80">Isolate affected water systems to prevent further exposure</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">2</div>
                      <div>
                        <h4 className="font-semibold mb-2">Emergency Sampling</h4>
                        <p className="text-sm opacity-80">Comprehensive sampling to determine extent of contamination</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">3</div>
                      <div>
                        <h4 className="font-semibold mb-2">Risk Assessment</h4>
                        <p className="text-sm opacity-80">Immediate risk evaluation and patient exposure assessment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <FadeInSection>
              <AnimatedCard className="p-12 text-center bg-gradient-to-br from-white to-medical-50/30 max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                  Protect Your Patients Today
                </h2>
                <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Ensure patient safety with our comprehensive legionella testing programme. 
                  Contact our NHS-approved specialists for immediate consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <AnimatedButton size="lg" className="px-8">
                    Start Testing Programme
                  </AnimatedButton>
                  <AnimatedButton variant="secondary" size="lg">
                    Emergency Testing: 0800 999 7777
                  </AnimatedButton>
                </div>
                <p className="text-sm text-neutral-500">
                  UKAS accredited • NHS framework approved • 24/7 emergency response
                </p>
              </AnimatedCard>
            </FadeInSection>
          </div>
        </section>
      </div>
    </>
  )
}