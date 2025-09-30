import { SESClient, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses'

// Initialize AWS SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'eu-west-1', // UK region for lower latency
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export interface EmailData {
  name: string
  email: string
  phone?: string
  organization: string
  organizationType: string
  service: string
  urgency: string
  message: string
}

export interface EmailOptions {
  to: string[]
  cc?: string[]
  bcc?: string[]
  replyTo?: string
  subject: string
  htmlBody: string
  textBody: string
}

export class EmailService {
  private static readonly FROM_EMAIL = process.env.SES_FROM_EMAIL || 'noreply@purewateruk.com'
  private static readonly ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@purewateruk.com'
  
  static async sendContactFormEmail(data: EmailData): Promise<boolean> {
    try {
      // Send notification to admin
      const adminEmailSent = await this.sendAdminNotification(data)
      
      // Send confirmation to customer
      const customerEmailSent = await this.sendCustomerConfirmation(data)
      
      return adminEmailSent && customerEmailSent
    } catch (error) {
      console.error('Error sending contact form emails:', error)
      throw error
    }
  }

  private static async sendAdminNotification(data: EmailData): Promise<boolean> {
    const urgencyLabels = {
      routine: 'Routine (5-7 days)',
      urgent: 'Urgent (24-48 hours)', 
      emergency: 'EMERGENCY (Same day)'
    }

    const organizationLabels = {
      'nhs-trust': 'NHS Trust',
      'private-hospital': 'Private Hospital',
      'care-home': 'Care Home',
      'clinic': 'Medical Clinic',
      'other': 'Other'
    }

    const serviceLabels = {
      'water-testing': 'Water Quality Testing',
      'legionella-assessment': 'Legionella Risk Assessment',
      'htm-compliance': 'HTM 04-01 Compliance',
      'emergency-response': 'Emergency Response',
      'training': 'Staff Training',
      'consultation': 'Expert Consultation'
    }

    const urgencyColor = data.urgency === 'emergency' ? '#dc2626' : 
                        data.urgency === 'urgent' ? '#ea580c' : '#16a34a'

    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0ea5e9, #06b6d4); padding: 30px 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                    New Contact Form Submission
                </h1>
                <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">
                    Pure Water Solutions - Water Hygiene Services
                </p>
            </div>

            <!-- Urgency Banner -->
            <div style="background-color: ${urgencyColor}; color: #ffffff; padding: 15px 40px; text-align: center;">
                <h2 style="margin: 0; font-size: 18px; font-weight: 600;">
                    ${data.urgency === 'emergency' ? '🚨 ' : ''}PRIORITY: ${urgencyLabels[data.urgency as keyof typeof urgencyLabels]}
                </h2>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
                <!-- Contact Information -->
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                        Contact Information
                    </h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 120px;">Name:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${data.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                            <td style="padding: 8px 0; color: #1f2937;">
                                <a href="mailto:${data.email}" style="color: #0ea5e9; text-decoration: none;">${data.email}</a>
                            </td>
                        </tr>
                        ${data.phone ? `
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Phone:</td>
                            <td style="padding: 8px 0; color: #1f2937;">
                                <a href="tel:${data.phone}" style="color: #0ea5e9; text-decoration: none;">${data.phone}</a>
                            </td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Organization:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${data.organization}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Type:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${organizationLabels[data.organizationType as keyof typeof organizationLabels]}</td>
                        </tr>
                    </table>
                </div>

                <!-- Service Details -->
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                        Service Request
                    </h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 120px;">Service:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${serviceLabels[data.service as keyof typeof serviceLabels]}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Urgency:</td>
                            <td style="padding: 8px 0; color: ${urgencyColor}; font-weight: 600;">${urgencyLabels[data.urgency as keyof typeof urgencyLabels]}</td>
                        </tr>
                    </table>
                </div>

                <!-- Message -->
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                        Project Details
                    </h3>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                        <p style="color: #1f2937; margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                    </div>
                </div>

                <!-- Action Required -->
                <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; text-align: center;">
                    <h4 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">
                        📋 Action Required
                    </h4>
                    <p style="color: #92400e; margin: 0; font-size: 14px;">
                        Response time target: <strong>${urgencyLabels[data.urgency as keyof typeof urgencyLabels]}</strong>
                    </p>
                    ${data.urgency === 'emergency' ? `
                    <p style="color: #dc2626; margin: 10px 0 0 0; font-size: 14px; font-weight: 600;">
                        ⚠️ Emergency request - Immediate response required
                    </p>
                    ` : ''}
                </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; margin: 0; font-size: 12px;">
                    Pure Water Solutions Ltd | Professional Water Hygiene Services<br>
                    This is an automated notification from your contact form.
                </p>
            </div>
        </div>
    </body>
    </html>
    `

    const textBody = `
NEW CONTACT FORM SUBMISSION - ${urgencyLabels[data.urgency as keyof typeof urgencyLabels]}

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}
- Organization: ${data.organization}
- Type: ${organizationLabels[data.organizationType as keyof typeof organizationLabels]}

Service Request:
- Service: ${serviceLabels[data.service as keyof typeof serviceLabels]}
- Urgency: ${urgencyLabels[data.urgency as keyof typeof urgencyLabels]}

Project Details:
${data.message}

Response time target: ${urgencyLabels[data.urgency as keyof typeof urgencyLabels]}
${data.urgency === 'emergency' ? 'EMERGENCY REQUEST - Immediate response required' : ''}
    `

    const emailOptions: EmailOptions = {
      to: [this.ADMIN_EMAIL],
      replyTo: data.email,
      subject: `${data.urgency === 'emergency' ? '🚨 EMERGENCY - ' : ''}New Contact: ${data.organization} - ${serviceLabels[data.service as keyof typeof serviceLabels]}`,
      htmlBody,
      textBody
    }

    return await this.sendEmail(emailOptions)
  }

  private static async sendCustomerConfirmation(data: EmailData): Promise<boolean> {
    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Enquiry</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0ea5e9, #06b6d4); padding: 40px 40px 30px 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                    Thank You for Your Enquiry
                </h1>
                <p style="color: #ffffff; margin: 15px 0 0 0; opacity: 0.9; font-size: 16px;">
                    Pure Water Solutions - Professional Water Hygiene Services
                </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
                <p style="color: #1f2937; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                    Dear ${data.name},
                </p>
                
                <p style="color: #1f2937; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                    Thank you for contacting Pure Water Solutions regarding your water hygiene requirements for <strong>${data.organization}</strong>. We have received your enquiry and our specialist team will review your request shortly.
                </p>

                <!-- Enquiry Summary -->
                <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3 style="color: #0c4a6e; margin: 0 0 15px 0; font-size: 18px;">
                        📋 Your Enquiry Summary
                    </h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 5px 0; color: #374151; font-weight: 600; width: 30%;">Service:</td>
                            <td style="padding: 5px 0; color: #1f2937;">${data.service === 'water-testing' ? 'Water Quality Testing' : 
                              data.service === 'legionella-assessment' ? 'Legionella Risk Assessment' :
                              data.service === 'htm-compliance' ? 'HTM 04-01 Compliance' :
                              data.service === 'emergency-response' ? 'Emergency Response' :
                              data.service === 'training' ? 'Staff Training' : 'Expert Consultation'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 0; color: #374151; font-weight: 600;">Priority:</td>
                            <td style="padding: 5px 0; color: #1f2937;">${data.urgency === 'routine' ? 'Routine (5-7 days)' : 
                              data.urgency === 'urgent' ? 'Urgent (24-48 hours)' : 'Emergency (Same day)'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 0; color: #374151; font-weight: 600;">Reference:</td>
                            <td style="padding: 5px 0; color: #1f2937;">${Date.now().toString().slice(-8)}</td>
                        </tr>
                    </table>
                </div>

                <!-- What Happens Next -->
                <div style="margin: 30px 0;">
                    <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px;">
                        🚀 What Happens Next?
                    </h3>
                    <div style="space-y: 15px;">
                        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                            <div style="width: 24px; height: 24px; background-color: #0ea5e9; color: white; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; margin-right: 15px; margin-top: 2px;">1</div>
                            <div>
                                <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">Initial Review</h4>
                                <p style="color: #6b7280; margin: 0; font-size: 14px;">Our specialist team will review your requirements within the priority timeframe.</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                            <div style="width: 24px; height: 24px; background-color: #0ea5e9; color: white; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; margin-right: 15px; margin-top: 2px;">2</div>
                            <div>
                                <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">Expert Consultation</h4>
                                <p style="color: #6b7280; margin: 0; font-size: 14px;">We'll contact you to discuss your specific needs and provide expert guidance.</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-start;">
                            <div style="width: 24px; height: 24px; background-color: #0ea5e9; color: white; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; margin-right: 15px; margin-top: 2px;">3</div>
                            <div>
                                <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">Tailored Solution</h4>
                                <p style="color: #6b7280; margin: 0; font-size: 14px;">Receive a comprehensive proposal tailored to your organization's requirements.</p>
                            </div>
                        </div>
                    </div>
                </div>

                ${data.urgency === 'emergency' ? `
                <!-- Emergency Notice -->
                <div style="background-color: #fef2f2; border: 2px solid #dc2626; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
                    <h4 style="color: #dc2626; margin: 0 0 10px 0; font-size: 16px;">
                        🚨 Emergency Request Acknowledged
                    </h4>
                    <p style="color: #dc2626; margin: 0; font-size: 14px; font-weight: 600;">
                        Your emergency request is being prioritized. You will receive a response within hours, not days.
                    </p>
                </div>
                ` : ''}

                <!-- Contact Information -->
                <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 16px;">
                        Need Immediate Assistance?
                    </h3>
                    <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                        For urgent matters that cannot wait, please contact us directly:
                    </p>
                    <p style="color: #1f2937; margin: 0; font-size: 14px;">
                        📞 Emergency Hotline: <a href="tel:+442071234567" style="color: #dc2626; text-decoration: none; font-weight: 600;">+44 20 7123 4567</a><br>
                        📧 Email: <a href="mailto:urgent@purewateruk.com" style="color: #0ea5e9; text-decoration: none;">urgent@purewateruk.com</a>
                    </p>
                </div>

                <p style="color: #1f2937; margin: 25px 0 0 0; font-size: 16px; line-height: 1.6;">
                    Thank you for choosing Pure Water Solutions for your water hygiene needs. We look forward to ensuring the safety and compliance of your water systems.
                </p>

                <p style="color: #1f2937; margin: 20px 0 0 0; font-size: 16px;">
                    Best regards,<br>
                    <strong>The Pure Water Solutions Team</strong>
                </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #0ea5e9; padding: 30px 40px; text-align: center;">
                <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                    Pure Water Solutions Ltd
                </h3>
                <p style="color: #ffffff; margin: 0; font-size: 14px; opacity: 0.9; line-height: 1.5;">
                    Professional Water Hygiene Services<br>
                    HTM 04-01 Compliant • NHS Approved • UKAS Accredited<br>
                    📧 info@purewateruk.com | 📞 +44 20 7123 4567
                </p>
            </div>
        </div>
    </body>
    </html>
    `

    const textBody = `
Dear ${data.name},

Thank you for contacting Pure Water Solutions regarding your water hygiene requirements for ${data.organization}. We have received your enquiry and our specialist team will review your request shortly.

Your Enquiry Summary:
- Service: ${data.service}
- Priority: ${data.urgency}
- Reference: ${Date.now().toString().slice(-8)}

What Happens Next?
1. Initial Review - Our specialist team will review your requirements within the priority timeframe
2. Expert Consultation - We'll contact you to discuss your specific needs and provide expert guidance  
3. Tailored Solution - Receive a comprehensive proposal tailored to your organization's requirements

${data.urgency === 'emergency' ? `
🚨 EMERGENCY REQUEST ACKNOWLEDGED
Your emergency request is being prioritized. You will receive a response within hours, not days.
` : ''}

Need Immediate Assistance?
For urgent matters that cannot wait, please contact us directly:
📞 Emergency Hotline: +44 20 7123 4567
📧 Email: urgent@purewateruk.com

Thank you for choosing Pure Water Solutions for your water hygiene needs. We look forward to ensuring the safety and compliance of your water systems.

Best regards,
The Pure Water Solutions Team

Pure Water Solutions Ltd
Professional Water Hygiene Services
HTM 04-01 Compliant • NHS Approved • UKAS Accredited
📧 info@purewateruk.com | 📞 +44 20 7123 4567
    `

    const emailOptions: EmailOptions = {
      to: [data.email],
      subject: 'Thank you for your water hygiene enquiry - Pure Water Solutions',
      htmlBody,
      textBody
    }

    return await this.sendEmail(emailOptions)
  }

  private static async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const params: SendEmailCommandInput = {
        Source: this.FROM_EMAIL,
        Destination: {
          ToAddresses: options.to,
          CcAddresses: options.cc,
          BccAddresses: options.bcc,
        },
        ReplyToAddresses: options.replyTo ? [options.replyTo] : undefined,
        Message: {
          Subject: {
            Data: options.subject,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: options.htmlBody,
              Charset: 'UTF-8',
            },
            Text: {
              Data: options.textBody,
              Charset: 'UTF-8',
            },
          },
        },
      }

      const command = new SendEmailCommand(params)
      const result = await sesClient.send(command)
      
      console.log('Email sent successfully:', result.MessageId)
      return true
    } catch (error) {
      console.error('Failed to send email:', error)
      return false
    }
  }
}