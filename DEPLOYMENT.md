# AWS S3/CloudFront Deployment Guide

This guide walks you through deploying the Water Hygiene Website to AWS S3 with CloudFront CDN.

## Prerequisites

1. **AWS CLI** installed and configured
2. **Node.js 18+** and npm
3. **AWS Account** with appropriate permissions

## Quick Setup

### 1. Install AWS CLI
```bash
# macOS
brew install awscli

# Windows
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 2. Configure AWS Credentials
```bash
aws configure
# Enter your AWS Access Key ID, Secret Key, Region, and Output format
```

### 3. Set Environment Variables
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the values to match your setup
export S3_BUCKET_NAME="your-unique-bucket-name"
export AWS_REGION="us-east-1"
export CLOUDFRONT_DISTRIBUTION_ID="E1234567890ABC"  # Will be created later
```

## Manual Deployment

### Step 1: Setup AWS Infrastructure

Run the infrastructure setup script:
```bash
node scripts/setup-aws-infrastructure.js
```

This script will:
- Create an S3 bucket
- Configure static website hosting
- Set public read permissions
- Configure security settings

### Step 2: Create CloudFront Distribution

1. Use the AWS Console or CLI to create a CloudFront distribution
2. Use the configuration template in `cloudfront-distribution.json`
3. Replace `REPLACE_WITH_S3_BUCKET_NAME` and `REPLACE_WITH_REGION` with your values

**Via AWS CLI:**
```bash
# First, update the cloudfront-distribution.json with your bucket details
# Then create the distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-distribution.json
```

**Via AWS Console:**
- Go to CloudFront in AWS Console
- Create Distribution
- Origin Domain: `your-bucket-name.s3-website-region.amazonaws.com`
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Allowed HTTP Methods: GET, HEAD
- Cache Behaviors: Configure as per the JSON file

### Step 3: Build and Deploy

```bash
# Build the static site
npm run build:static

# Deploy to AWS
npm run deploy:aws
```

## Automated Deployment with GitHub Actions

### Setup Repository Secrets

In your GitHub repository, add these secrets:

1. `AWS_ACCESS_KEY_ID` - Your AWS access key
2. `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
3. `S3_BUCKET_NAME` - Your S3 bucket name
4. `CLOUDFRONT_DISTRIBUTION_ID` - Your CloudFront distribution ID
5. `CLOUDFRONT_DOMAIN` - Your CloudFront domain (optional)

### Workflow Features

The GitHub Actions workflow (`.github/workflows/deploy.yml`) includes:

- **Build and Test**: Lints code and builds static site
- **Deploy**: Uploads to S3 and invalidates CloudFront cache
- **Security Scan**: Runs Trivy vulnerability scanner

### Trigger Deployment

Push to the `main` branch to trigger automatic deployment:
```bash
git add .
git commit -m "Deploy website"
git push origin main
```

## Manual Deployment Commands

```bash
# Build static site
npm run build:static

# Deploy to S3
npm run deploy:s3

# Invalidate CloudFront cache
npm run invalidate:cloudfront

# Full deployment (build + deploy + invalidate)
npm run deploy:aws
```

## File Structure

```
├── next.config.ts              # Next.js static export configuration
├── src/lib/imageLoader.ts      # Custom image loader for static export
├── scripts/
│   ├── deploy-aws.js           # Main deployment script
│   └── setup-aws-infrastructure.js  # Infrastructure setup
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions CI/CD
├── cloudfront-distribution.json    # CloudFront configuration
├── .env.example                # Environment variables template
└── DEPLOYMENT.md               # This guide
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `S3_BUCKET_NAME` | Your S3 bucket name | Yes |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID | Yes |
| `AWS_REGION` | AWS region | No (default: us-east-1) |
| `AWS_PROFILE` | AWS CLI profile | No (default: default) |
| `CLOUDFRONT_DOMAIN` | CloudFront domain URL | No |
| `ASSET_PREFIX` | CDN prefix for assets | No |
| `BASE_PATH` | Base path for the site | No |

## Caching Strategy

The deployment uses optimized caching headers:

- **HTML files**: `max-age=0, must-revalidate` (always fresh)
- **Static assets**: `max-age=31536000, immutable` (1 year cache)
- **CloudFront**: Custom cache behaviors for different file types

## Security Features

- S3 bucket policy restricts access to read-only
- CloudFront enforces HTTPS
- GitHub Actions includes security scanning
- Public access blocks prevent accidental exposure

## Troubleshooting

### Common Issues

1. **Bucket already exists**: Use a unique bucket name
2. **Permission denied**: Check AWS credentials and IAM permissions
3. **CloudFront invalidation fails**: Verify distribution ID
4. **404 errors**: Check CloudFront custom error pages configuration

### Required IAM Permissions

Your AWS user needs these permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:CreateBucket",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:PutBucketPolicy",
        "s3:PutBucketWebsite",
        "s3:PutPublicAccessBlock",
        "cloudfront:CreateInvalidation",
        "cloudfront:GetDistribution",
        "cloudfront:CreateDistribution"
      ],
      "Resource": "*"
    }
  ]
}
```

## Cost Optimization

- Use CloudFront's PriceClass_100 for lower costs
- Enable compression for smaller file sizes
- Set appropriate cache headers to reduce origin requests
- Monitor usage with AWS Cost Explorer

## Monitoring

- Enable CloudFront real-time logs
- Set up CloudWatch alarms for 4xx/5xx errors
- Use AWS X-Ray for performance monitoring
- Configure AWS Config for compliance monitoring

## Custom Domain

To use a custom domain:

1. Purchase/configure domain in Route 53
2. Request SSL certificate in ACM (us-east-1 for CloudFront)
3. Add CNAME record pointing to CloudFront distribution
4. Update CloudFront distribution with custom domain and certificate

---

For additional help, refer to the [AWS documentation](https://docs.aws.amazon.com/) or open an issue in this repository.