# Contact Form AWS SES Setup Guide

## Prerequisites

1. AWS Account with SES (Simple Email Service) access
2. Domain verification in AWS SES
3. SES out of sandbox mode (for production)

## AWS SES Configuration

### 1. Set up SES in AWS Console

1. Go to AWS SES console
2. Navigate to "Configuration" > "Verified identities"
3. Add and verify your domain (e.g., `purewateruk.com`)
4. Create DKIM records in your DNS
5. Set up SPF and DMARC records for better deliverability

### 2. Create IAM User for SES

Create an IAM user with the following policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}
```

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `AWS_ACCESS_KEY_ID`: Your IAM user access key
- `AWS_SECRET_ACCESS_KEY`: Your IAM user secret key
- `AWS_REGION`: AWS region (recommend `eu-west-1` for UK)
- `SES_FROM_EMAIL`: Verified sender email (e.g., `noreply@purewateruk.com`)
- `ADMIN_EMAIL`: Where form submissions are sent

## Domain Setup for Production

### DNS Records Required

Add these DNS records for optimal email deliverability:

1. **SPF Record** (TXT):
   ```
   v=spf1 include:amazonses.com ~all
   ```

2. **DMARC Record** (TXT):
   ```
   v=DMARC1; p=quarantine; rua=mailto:dmarc@purewateruk.com
   ```

3. **DKIM Records**: Generated automatically by AWS SES

## Moving SES Out of Sandbox

For production use, request to move out of SES sandbox:

1. Go to AWS SES console
2. Navigate to "Account dashboard"
3. Click "Request production access"
4. Fill out the form explaining your use case
5. Wait for AWS approval (usually 24-48 hours)

## Testing the Contact Form

### Development Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/contact`
3. Fill out the form
4. Check your admin email for notifications

### Production Testing

1. Verify all DNS records are propagated
2. Test with different email providers (Gmail, Outlook, etc.)
3. Check spam folders initially
4. Monitor bounce and complaint rates in SES console

## Features Included

### Security Features
- Rate limiting (3 submissions per 15 minutes per IP)
- Input sanitization
- Spam detection
- CSRF protection via Next.js

### Form Validation
- Client-side validation with Zod schema
- Server-side validation
- Real-time error messages
- Required field validation

### Email Templates
- Professional HTML emails for admins
- Customer confirmation emails
- Mobile-responsive design
- Emergency priority handling

### Admin Notifications
- Detailed submission information
- Priority-based routing
- Contact information extraction
- Spam filtering

## Monitoring and Maintenance

### AWS CloudWatch Metrics
Monitor these SES metrics:
- Send rate
- Bounce rate
- Complaint rate
- Delivery rate

### Error Handling
The system handles:
- AWS SES service errors
- Rate limiting
- Network timeouts
- Malformed requests
- Spam attempts

## Customization Options

### Adding Fields
1. Update the Zod schema in both frontend and API
2. Modify the email templates
3. Update the form UI

### Integrating with CRM
The API route can be extended to:
- Send data to CRM systems
- Create support tickets
- Trigger webhooks
- Log to databases

### Emergency Escalation
For emergency requests, the system can:
- Send SMS notifications
- Call webhook URLs
- Create urgent tickets
- Notify multiple recipients

## Troubleshooting

### Common Issues

1. **"Email service not configured"**
   - Check environment variables
   - Verify AWS credentials
   - Ensure SES region is correct

2. **"Message rejected"**
   - Verify sender email is confirmed in SES
   - Check if SES is still in sandbox mode
   - Verify recipient email format

3. **High bounce rate**
   - Check DNS records
   - Verify DKIM configuration
   - Review email content for spam triggers

4. **Rate limiting errors**
   - Default limit is 3 per 15 minutes
   - Adjust in `/api/contact/route.ts`
   - Consider Redis for distributed rate limiting

### Support

For technical issues:
- Check AWS SES console for delivery status
- Review Next.js logs for API errors
- Monitor CloudWatch for SES metrics
- Test with SES simulator addresses in development

## Security Considerations

- Environment variables are never exposed to client
- Input sanitization prevents XSS attacks
- Rate limiting prevents abuse
- Spam detection filters malicious content
- HTTPS required for production
- Consider adding reCAPTCHA for additional protection