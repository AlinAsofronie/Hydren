'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { FadeInSection } from '@/components/ui/FadeInSection'

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  organization: z.string().min(2, 'Organization name is required'),
  organizationType: z.enum(['nhs-trust', 'private-hospital', 'care-home', 'clinic', 'other'], {
    message: 'Please select your organization type'
  }),
  service: z.enum(['water-testing', 'legionella-assessment', 'htm-compliance', 'emergency-response', 'training', 'consultation'], {
    message: 'Please select the service you need'
  }),
  urgency: z.enum(['routine', 'urgent', 'emergency'], {
    message: 'Please select urgency level'
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must consent to data processing'
  })
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      urgency: 'routine'
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to send message')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const organizationTypes = [
    { value: 'nhs-trust', label: 'NHS Trust' },
    { value: 'private-hospital', label: 'Private Hospital' },
    { value: 'care-home', label: 'Care Home' },
    { value: 'clinic', label: 'Medical Clinic' },
    { value: 'other', label: 'Other' }
  ]

  const services = [
    { value: 'water-testing', label: 'Water Quality Testing' },
    { value: 'legionella-assessment', label: 'Legionella Risk Assessment' },
    { value: 'htm-compliance', label: 'HTM 04-01 Compliance' },
    { value: 'emergency-response', label: 'Emergency Response' },
    { value: 'training', label: 'Staff Training' },
    { value: 'consultation', label: 'Expert Consultation' }
  ]

  const urgencyLevels = [
    { value: 'routine', label: 'Routine (5-7 days)', color: 'text-green-600' },
    { value: 'urgent', label: 'Urgent (24-48 hours)', color: 'text-orange-600' },
    { value: 'emergency', label: 'Emergency (Same day)', color: 'text-red-600' }
  ]

  return (
    <FadeInSection className={className}>
      <div className="bg-white rounded-3xl shadow-apple p-8 lg:p-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Get Expert Water Hygiene Consultation
          </h2>
          <p className="text-lg text-neutral-600">
            Contact our specialists for HTM 04-01 compliant water hygiene solutions
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                Full Name *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-200"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                Email Address *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-200"
                placeholder="your.email@hospital.nhs.uk"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                Phone Number
              </label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-200"
                placeholder="+44 20 7123 4567"
              />
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-semibold text-neutral-700 mb-2">
                Organization *
              </label>
              <input
                {...register('organization')}
                type="text"
                id="organization"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-200"
                placeholder="Hospital or organization name"
              />
              {errors.organization && (
                <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
              )}
            </div>
          </div>

          {/* Organization Type */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Organization Type *
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {organizationTypes.map((type) => (
                <label key={type.value} className="flex items-center p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-medical-50 transition-colors">
                  <input
                    {...register('organizationType')}
                    type="radio"
                    value={type.value}
                    className="text-medical-600 focus:ring-medical-500 mr-3"
                  />
                  <span className="text-sm font-medium">{type.label}</span>
                </label>
              ))}
            </div>
            {errors.organizationType && (
              <p className="mt-1 text-sm text-red-600">{errors.organizationType.message}</p>
            )}
          </div>

          {/* Service Required */}
          <div>
            <label htmlFor="service" className="block text-sm font-semibold text-neutral-700 mb-2">
              Service Required *
            </label>
            <select
              {...register('service')}
              id="service"
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
            )}
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Urgency Level *
            </label>
            <div className="space-y-3">
              {urgencyLevels.map((level) => (
                <label key={level.value} className="flex items-center p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-medical-50 transition-colors">
                  <input
                    {...register('urgency')}
                    type="radio"
                    value={level.value}
                    className="text-medical-600 focus:ring-medical-500 mr-3"
                  />
                  <span className={`font-medium ${level.color}`}>{level.label}</span>
                </label>
              ))}
            </div>
            {errors.urgency && (
              <p className="mt-1 text-sm text-red-600">{errors.urgency.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
              Project Details *
            </label>
            <textarea
              {...register('message')}
              id="message"
              rows={5}
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Please describe your water hygiene requirements, current challenges, or specific concerns..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          {/* Consent */}
          <div className="flex items-start space-x-3">
            <input
              {...register('consent')}
              type="checkbox"
              id="consent"
              className="mt-1 text-medical-600 focus:ring-medical-500 rounded"
            />
            <label htmlFor="consent" className="text-sm text-neutral-600 leading-relaxed">
              I consent to Pure Water Solutions processing my personal data to respond to this enquiry. 
              Your data will be processed in accordance with our Privacy Policy and UK GDPR regulations. *
            </label>
          </div>
          {errors.consent && (
            <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <AnimatedButton
              type="submit"
              size="lg"
              className="w-full md:w-auto px-12 py-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </AnimatedButton>
          </div>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Message Sent Successfully!</h4>
                    <p className="text-sm text-green-700">We&apos;ll respond within 24 hours for urgent requests.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900">Error Sending Message</h4>
                    <p className="text-sm text-red-700">{errorMessage || 'Please try again or call us directly.'}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Emergency Contact */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <div className="text-center">
            <p className="text-sm text-neutral-600 mb-2">
              For emergency water safety issues requiring immediate response:
            </p>
            <a
              href="tel:+442071234567"
              className="text-lg font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              Emergency Hotline: +44 20 7123 4567
            </a>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}