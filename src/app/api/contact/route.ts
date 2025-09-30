import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { EmailService, EmailData } from '@/lib/aws-ses'

// Check if running in development mode
const isDevelopment = process.env.NODE_ENV === 'development'

// Validation schema matching the frontend
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  organization: z.string().min(2, 'Organization name is required'),
  organizationType: z.enum(['nhs-trust', 'private-hospital', 'care-home', 'clinic', 'other']),
  service: z.enum(['water-testing', 'legionella-assessment', 'htm-compliance', 'emergency-response', 'training', 'consultation']),
  urgency: z.enum(['routine', 'urgent', 'emergency']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must consent to data processing'
  })
})

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(ip)
  
  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitStore.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }) // 15 minutes
    return false
  }
  
  if (limit.count >= 3) { // Max 3 submissions per 15 minutes
    return true
  }
  
  limit.count++
  return false
}

function sanitizeInput(input: string): string {
  // Basic sanitization to prevent XSS and injection attacks
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .trim()
}

function detectSpam(data: EmailData): boolean {
  const spamKeywords = [
    'viagra', 'cialis', 'lottery', 'winner', 'congratulations',
    'urgent business', 'nigerian prince', 'bitcoin', 'cryptocurrency',
    'free money', 'click here', 'act now', 'limited time'
  ]
  
  const textToCheck = `${data.name} ${data.message} ${data.organization}`.toLowerCase()
  
  // Check for spam keywords
  if (spamKeywords.some(keyword => textToCheck.includes(keyword))) {
    return true
  }
  
  // Check for suspicious patterns
  if (data.message.includes('http://') || data.message.includes('https://')) {
    return true
  }
  
  // Check for excessive capital letters
  const capsRatio = (data.message.match(/[A-Z]/g) || []).length / data.message.length
  if (capsRatio > 0.5 && data.message.length > 20) {
    return true
  }
  
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    
    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    
    // Validate input data
    const validatedData = contactFormSchema.parse(body)
    
    // Sanitize input data
    const sanitizedData: EmailData = {
      name: sanitizeInput(validatedData.name),
      email: sanitizeInput(validatedData.email),
      phone: validatedData.phone ? sanitizeInput(validatedData.phone) : undefined,
      organization: sanitizeInput(validatedData.organization),
      organizationType: validatedData.organizationType,
      service: validatedData.service,
      urgency: validatedData.urgency,
      message: sanitizeInput(validatedData.message)
    }
    
    // Check for spam
    if (detectSpam(sanitizedData)) {
      console.log('Spam detected from IP:', clientIP, sanitizedData)
      return NextResponse.json(
        { message: 'Your message appears to be spam and could not be sent.' },
        { status: 400 }
      )
    }
    
    // In development mode, just log the form data instead of sending emails
    if (isDevelopment) {
      console.log('📧 Contact form submission (Development Mode):')
      console.log('From:', sanitizedData.email)
      console.log('Name:', sanitizedData.name)
      console.log('Organization:', sanitizedData.organization)
      console.log('Service:', sanitizedData.service)
      console.log('Urgency:', sanitizedData.urgency)
      console.log('Message:', sanitizedData.message)
      console.log('Phone:', sanitizedData.phone)
      console.log('Org Type:', sanitizedData.organizationType)
      
      return NextResponse.json(
        { message: 'Message received successfully! (Development mode - email logged to console)' },
        { status: 200 }
      )
    }
    
    // Verify required environment variables for production
    if (!process.env.AWS_ACCESS_KEY_ID || 
        !process.env.AWS_SECRET_ACCESS_KEY || 
        !process.env.SES_FROM_EMAIL ||
        !process.env.ADMIN_EMAIL) {
      console.error('Missing required AWS SES configuration')
      return NextResponse.json(
        { message: 'Email service is not configured properly. Please try again later or contact us directly.' },
        { status: 500 }
      )
    }
    
    // Send emails via AWS SES
    const emailSent = await EmailService.sendContactFormEmail(sanitizedData)
    
    if (!emailSent) {
      throw new Error('Failed to send email via SES')
    }
    
    // Log successful submission (without sensitive data)
    console.log('Contact form submitted successfully:', {
      organization: sanitizedData.organization,
      organizationType: sanitizedData.organizationType,
      service: sanitizedData.service,
      urgency: sanitizedData.urgency,
      ip: clientIP,
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json({
      message: 'Message sent successfully! We\'ll respond within your specified timeframe.',
      success: true
    })
    
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Please check your form data and try again.',
          errors: error.issues
        },
        { status: 400 }
      )
    }
    
    // Handle AWS SES errors
    if (error && typeof error === 'object' && 'name' in error) {
      const awsError = error as { name: string; message: string }
      
      if (awsError.name === 'MessageRejected') {
        return NextResponse.json(
          { message: 'Message was rejected. Please check your email address and try again.' },
          { status: 400 }
        )
      }
      
      if (awsError.name === 'SendingPausedException') {
        return NextResponse.json(
          { message: 'Email sending is temporarily paused. Please try again later.' },
          { status: 503 }
        )
      }
    }
    
    // Generic error response
    return NextResponse.json(
      { 
        message: 'Unable to send message at this time. Please try again later or contact us directly at +44 20 7123 4567.',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}