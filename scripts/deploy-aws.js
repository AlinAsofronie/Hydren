#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  s3Bucket: process.env.S3_BUCKET_NAME,
  cloudFrontDistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
  awsRegion: process.env.AWS_REGION || 'us-east-1',
  buildDir: 'out',
  profile: process.env.AWS_PROFILE || 'default'
};

console.log('🚀 Starting AWS deployment...');

// Validate environment variables
if (!config.s3Bucket) {
  console.error('❌ S3_BUCKET_NAME environment variable is required');
  process.exit(1);
}

if (!config.cloudFrontDistributionId) {
  console.error('❌ CLOUDFRONT_DISTRIBUTION_ID environment variable is required');
  process.exit(1);
}

// Check if build directory exists
if (!fs.existsSync(config.buildDir)) {
  console.error(`❌ Build directory '${config.buildDir}' does not exist. Run 'npm run build:static' first.`);
  process.exit(1);
}

try {
  // Deploy to S3
  console.log('📦 Uploading files to S3...');
  execSync(`aws s3 sync ${config.buildDir}/ s3://${config.s3Bucket} --delete --profile ${config.profile}`, {
    stdio: 'inherit'
  });

  // Set proper content types for different file types
  console.log('🔧 Setting content types...');
  
  // HTML files
  execSync(`aws s3 cp s3://${config.s3Bucket}/ s3://${config.s3Bucket}/ --recursive --exclude "*" --include "*.html" --metadata-directive REPLACE --content-type "text/html; charset=utf-8" --cache-control "public, max-age=0, must-revalidate" --profile ${config.profile}`, {
    stdio: 'inherit'
  });

  // CSS files
  execSync(`aws s3 cp s3://${config.s3Bucket}/ s3://${config.s3Bucket}/ --recursive --exclude "*" --include "*.css" --metadata-directive REPLACE --content-type "text/css" --cache-control "public, max-age=31536000, immutable" --profile ${config.profile}`, {
    stdio: 'inherit'
  });

  // JS files
  execSync(`aws s3 cp s3://${config.s3Bucket}/ s3://${config.s3Bucket}/ --recursive --exclude "*" --include "*.js" --metadata-directive REPLACE --content-type "application/javascript" --cache-control "public, max-age=31536000, immutable" --profile ${config.profile}`, {
    stdio: 'inherit'
  });

  // JSON files
  execSync(`aws s3 cp s3://${config.s3Bucket}/ s3://${config.s3Bucket}/ --recursive --exclude "*" --include "*.json" --metadata-directive REPLACE --content-type "application/json" --cache-control "public, max-age=31536000, immutable" --profile ${config.profile}`, {
    stdio: 'inherit'
  });

  // Images
  execSync(`aws s3 cp s3://${config.s3Bucket}/ s3://${config.s3Bucket}/ --recursive --exclude "*" --include "*.png" --include "*.jpg" --include "*.jpeg" --include "*.gif" --include "*.webp" --include "*.svg" --metadata-directive REPLACE --cache-control "public, max-age=31536000, immutable" --profile ${config.profile}`, {
    stdio: 'inherit'
  });

  // Invalidate CloudFront cache
  console.log('🔄 Invalidating CloudFront cache...');
  const invalidationResult = execSync(`aws cloudfront create-invalidation --distribution-id ${config.cloudFrontDistributionId} --paths "/*" --profile ${config.profile}`, {
    encoding: 'utf8'
  });

  const invalidation = JSON.parse(invalidationResult);
  console.log(`✅ CloudFront invalidation created: ${invalidation.Invalidation.Id}`);

  console.log('🎉 Deployment completed successfully!');
  console.log(`🌐 Your site should be available at your CloudFront domain in a few minutes.`);

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}