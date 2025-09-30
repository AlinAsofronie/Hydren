import type { Metadata } from 'next'
import { SmoothReveal, StaggeredReveal, TextReveal, ScaleReveal } from '@/components/animations/SmoothReveal'
import { ParallaxSection, MagneticElement } from '@/components/animations/ParallaxSection'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Water Hygiene Resources | Guides, Tools & Best Practices',
  description: 'Free water hygiene resources including compliance guides, risk assessment tools, training materials, and industry best practices.',
  keywords: 'water hygiene resources, compliance guides, risk assessment tools, training materials, HTM 04-01 guides, legionella resources',
  openGraph: {
    title: 'Water Hygiene Resources | Guides, Tools & Best Practices',
    description: 'Free water hygiene resources including compliance guides, risk assessment tools, training materials, and industry best practices.',
    type: 'website',
    url: '/resources',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water Hygiene Resources | Guides, Tools & Best Practices',
    description: 'Free water hygiene resources including compliance guides, risk assessment tools, training materials, and industry best practices.',
  }
}

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: 'Compliance Guides',
      description: 'Comprehensive guides to help you understand and implement water hygiene compliance requirements.',
      icon: '📋',
      color: 'medical',
      resources: [
        {
          title: 'HTM 04-01 Compliance Guide',
          description: 'Complete guide to healthcare water safety compliance',
          type: 'PDF Guide',
          size: '2.4 MB',
          pages: '32 pages'
        },
        {
          title: 'HSG274 Implementation Checklist',
          description: 'Step-by-step checklist for legionella control compliance',
          type: 'Checklist',
          size: '1.1 MB',
          pages: '8 pages'
        },
        {
          title: 'Water Safety Policy Template',
          description: 'Customizable template for water safety policies',
          type: 'Template',
          size: '0.8 MB',
          pages: '12 pages'
        }
      ]
    },
    {
      title: 'Risk Assessment Tools',
      description: 'Professional tools and templates to conduct comprehensive water hygiene risk assessments.',
      icon: '⚠️',
      color: 'trust',
      resources: [
        {
          title: 'Legionella Risk Assessment Tool',
          description: 'Interactive tool for conducting legionella risk assessments',
          type: 'Excel Tool',
          size: '2.8 MB',
          pages: 'Multi-sheet'
        },
        {
          title: 'Water System Survey Template',
          description: 'Comprehensive template for water system surveys',
          type: 'Template',
          size: '1.5 MB',
          pages: '16 pages'
        },
        {
          title: 'Risk Register Template',
          description: 'Template for maintaining water hygiene risk registers',
          type: 'Template',
          size: '0.9 MB',
          pages: '6 pages'
        }
      ]
    },
    {
      title: 'Training Materials',
      description: 'Educational resources and training materials for water hygiene competency development.',
      icon: '🎓',
      color: 'safety',
      resources: [
        {
          title: 'Water Hygiene Awareness Training',
          description: 'Introductory training presentation for staff awareness',
          type: 'Presentation',
          size: '15 MB',
          pages: '45 slides'
        },
        {
          title: 'Competency Assessment Framework',
          description: 'Framework for assessing water hygiene competencies',
          type: 'Framework',
          size: '1.2 MB',
          pages: '20 pages'
        },
        {
          title: 'Training Record Templates',
          description: 'Templates for recording and tracking training completion',
          type: 'Templates',
          size: '0.7 MB',
          pages: '8 pages'
        }
      ]
    },
    {
      title: 'Technical References',
      description: 'Technical references, standards, and best practice guidance for water hygiene professionals.',
      icon: '📚',
      color: 'medical',
      resources: [
        {
          title: 'Water Sampling Procedures Guide',
          description: 'Detailed procedures for water sampling and testing',
          type: 'Guide',
          size: '3.2 MB',
          pages: '28 pages'
        },
        {
          title: 'Temperature Monitoring Best Practices',
          description: 'Best practices for water temperature monitoring',
          type: 'Guide',
          size: '1.8 MB',
          pages: '14 pages'
        },
        {
          title: 'Disinfection Protocols',
          description: 'Standard protocols for water system disinfection',
          type: 'Protocols',
          size: '2.1 MB',
          pages: '18 pages'
        }
      ]
    }
  ]

  const webinars = [
    {
      title: 'HTM 04-01 Updates & Implementation',
      date: 'December 15, 2024',
      duration: '60 minutes',
      level: 'Intermediate',
      description: 'Latest updates to HTM 04-01 and practical implementation strategies',
      status: 'upcoming'
    },
    {
      title: 'Legionella Risk Assessment Workshop',
      date: 'January 22, 2025',
      duration: '90 minutes',
      level: 'Advanced',
      description: 'Hands-on workshop for conducting effective legionella risk assessments',
      status: 'upcoming'
    },
    {
      title: 'Water Safety in Care Homes',
      date: 'November 28, 2024',
      duration: '45 minutes',
      level: 'Beginner',
      description: 'Specific challenges and solutions for care home water safety',
      status: 'recorded'
    }
  ]

  const tools = [
    {
      title: 'Water Temperature Calculator',
      description: 'Calculate optimal water temperatures for different applications',
      type: 'Online Tool',
      link: '#'
    },
    {
      title: 'Monitoring Frequency Guide',
      description: 'Determine appropriate monitoring frequencies for your systems',
      type: 'Interactive Guide',
      link: '#'
    },
    {
      title: 'Compliance Deadline Tracker',
      description: 'Track important compliance deadlines and requirements',
      type: 'Planning Tool',
      link: '#'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxSection className="py-32 bg-gradient-to-br from-medical-50 via-white to-safety-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SmoothReveal>
              <span className="inline-block px-4 py-2 bg-medical-100 text-medical-700 rounded-full text-sm font-medium mb-6">
                Knowledge & Tools Hub
              </span>
            </SmoothReveal>
            
            <TextReveal 
              text="Water Hygiene Resources"
              className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
            />
            
            <SmoothReveal delay={0.3}>
              <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Access comprehensive resources, tools, and guidance to enhance your 
                water hygiene knowledge and ensure effective compliance management.
              </p>
            </SmoothReveal>

            <SmoothReveal delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton size="lg" className="px-8">
                  Browse Resources
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="lg">
                  Subscribe to Updates
                </AnimatedButton>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Resource Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Resource Categories
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Organized collections of professional-grade resources to support 
              every aspect of water hygiene management.
            </p>
          </SmoothReveal>

          <div className="space-y-24">
            {resourceCategories.map((category, categoryIndex) => (
              <SmoothReveal key={category.title} delay={categoryIndex * 0.1}>
                <div className="bg-gradient-to-br from-neutral-50 to-medical-50 rounded-3xl p-8">
                  <div className="bg-white rounded-2xl p-8 shadow-apple">
                    {/* Category Header */}
                    <div className="flex items-center mb-8">
                      <div className={`w-16 h-16 bg-${category.color}-100 rounded-2xl flex items-center justify-center mr-6`}>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                          {category.title}
                        </h3>
                        <p className="text-neutral-600">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {category.resources.map((resource) => (
                        <MagneticElement key={resource.title}>
                          <div className="border border-neutral-200 rounded-2xl p-6 hover:shadow-apple transition-all duration-300">
                            <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                              {resource.title}
                            </h4>
                            <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                              {resource.description}
                            </p>
                            
                            <div className="flex justify-between items-center text-xs text-neutral-500 mb-4">
                              <span className={`px-2 py-1 bg-${category.color}-50 text-${category.color}-600 rounded`}>
                                {resource.type}
                              </span>
                              <div className="space-x-2">
                                <span>{resource.size}</span>
                                <span>•</span>
                                <span>{resource.pages}</span>
                              </div>
                            </div>

                            <AnimatedButton variant="ghost" size="sm" className="w-full">
                              Download →
                            </AnimatedButton>
                          </div>
                        </MagneticElement>
                      ))}
                    </div>
                  </div>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Online Tools Section */}
      <ParallaxSection className="py-24 bg-gradient-to-br from-trust-50 to-neutral-50">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Interactive Tools
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Use our online tools to streamline your water hygiene management 
              and compliance activities.
            </p>
          </SmoothReveal>

          <StaggeredReveal 
            stagger={0.15}
            className="grid md:grid-cols-3 gap-8"
          >
            {tools.map((tool, index) => (
              <MagneticElement key={tool.title}>
                <div className="bg-white rounded-3xl p-8 shadow-apple hover:shadow-apple-lg transition-all duration-500 h-full">
                  <ScaleReveal delay={index * 0.1}>
                    <div className="w-16 h-16 bg-trust-100 rounded-2xl flex items-center justify-center mb-6">
                      <span className="text-2xl">🛠️</span>
                    </div>
                  </ScaleReveal>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">
                    {tool.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-trust-600 bg-trust-50 px-2 py-1 rounded">
                      {tool.type}
                    </span>
                    <AnimatedButton variant="ghost" size="sm">
                      Launch Tool →
                    </AnimatedButton>
                  </div>
                </div>
              </MagneticElement>
            ))}
          </StaggeredReveal>
        </div>
      </ParallaxSection>

      {/* Webinars Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SmoothReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Webinars & Training
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Join our expert-led webinars and training sessions to stay current 
              with water hygiene best practices and regulations.
            </p>
          </SmoothReveal>

          <div className="max-w-4xl mx-auto space-y-6">
            {webinars.map((webinar, index) => (
              <SmoothReveal key={webinar.title} delay={index * 0.1}>
                <div className="bg-gradient-to-r from-neutral-50 to-medical-50 rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-neutral-900">
                          {webinar.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          webinar.status === 'upcoming' 
                            ? 'bg-safety-100 text-safety-700' 
                            : 'bg-neutral-200 text-neutral-700'
                        }`}>
                          {webinar.status === 'upcoming' ? 'Upcoming' : 'Recorded'}
                        </span>
                      </div>
                      
                      <p className="text-neutral-600 mb-3">
                        {webinar.description}
                      </p>
                      
                      <div className="flex gap-4 text-sm text-neutral-500">
                        <span>📅 {webinar.date}</span>
                        <span>⏱️ {webinar.duration}</span>
                        <span>📊 {webinar.level}</span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <AnimatedButton 
                        size="sm" 
                        variant={webinar.status === 'upcoming' ? 'primary' : 'secondary'}
                      >
                        {webinar.status === 'upcoming' ? 'Register' : 'Watch Recording'}
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <ParallaxSection className="py-24 bg-gradient-to-br from-medical-50 to-trust-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SmoothReveal>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Stay Informed
              </h2>
              <p className="text-xl text-neutral-600 mb-8">
                Subscribe to our newsletter for the latest water hygiene insights, 
                regulatory updates, and new resource releases.
              </p>
              
              <div className="bg-white rounded-2xl p-8 shadow-apple max-w-md mx-auto">
                <form className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center text-sm text-neutral-600">
                    <input type="checkbox" className="mr-2" />
                    <span>I agree to receive updates and resources</span>
                  </div>
                  
                  <AnimatedButton size="lg" className="w-full">
                    Subscribe Now
                  </AnimatedButton>
                </form>
                
                <p className="text-xs text-neutral-500 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
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
              <div className="bg-gradient-to-br from-trust-600 to-safety-600 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">
                  Need Personalized Guidance?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  While our resources provide valuable information, sometimes you need 
                  expert consultation tailored to your specific situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <AnimatedButton size="lg" className="bg-white text-trust-600 hover:bg-neutral-50">
                      Speak to an Expert
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