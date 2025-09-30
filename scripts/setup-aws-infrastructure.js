#!/usr/bin/env node

const { execSync } = require('child_process');

// Configuration
const config = {
  bucketName: process.env.S3_BUCKET_NAME || 'water-hygiene-website',
  region: process.env.AWS_REGION || 'us-east-1',
  profile: process.env.AWS_PROFILE || 'default'
};

console.log('🏗️  Setting up AWS infrastructure...');

try {
  // Create S3 bucket
  console.log('📦 Creating S3 bucket...');
  try {
    if (config.region === 'us-east-1') {
      execSync(`aws s3 mb s3://${config.bucketName} --profile ${config.profile}`, {
        stdio: 'inherit'
      });
    } else {
      execSync(`aws s3 mb s3://${config.bucketName} --region ${config.region} --profile ${config.profile}`, {
        stdio: 'inherit'
      });
    }
  } catch (error) {
    if (error.message.includes('BucketAlreadyExists') || error.message.includes('BucketAlreadyOwnedByYou')) {
      console.log('ℹ️  Bucket already exists, continuing...');
    } else {
      throw error;
    }
  }

  // Configure bucket for static website hosting
  console.log('🌐 Configuring static website hosting...');
  const websiteConfig = {
    IndexDocument: { Suffix: 'index.html' },
    ErrorDocument: { Key: '404.html' }
  };

  execSync(`aws s3 website s3://${config.bucketName} --index-document index.html --error-document 404.html --profile ${config.profile}`, {
    stdio: 'inherit'
  });

  // Set bucket policy for public read access
  console.log('🔓 Setting bucket policy for public access...');
  const bucketPolicy = {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'PublicReadGetObject',
        Effect: 'Allow',
        Principal: '*',
        Action: 's3:GetObject',
        Resource: `arn:aws:s3:::${config.bucketName}/*`
      }
    ]
  };

  // Write policy to temporary file
  require('fs').writeFileSync('/tmp/bucket-policy.json', JSON.stringify(bucketPolicy, null, 2));
  
  execSync(`aws s3api put-bucket-policy --bucket ${config.bucketName} --policy file:///tmp/bucket-policy.json --profile ${config.profile}`, {
    stdio: 'inherit'
  });

  // Block public ACLs but allow bucket policy
  console.log('🔒 Configuring public access block settings...');
  execSync(`aws s3api put-public-access-block --bucket ${config.bucketName} --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false" --profile ${config.profile}`, {
    stdio: 'inherit'
  });

  console.log('✅ S3 infrastructure setup completed!');
  console.log(`📝 Next steps:`);
  console.log(`   1. Create a CloudFront distribution pointing to: ${config.bucketName}.s3-website-${config.region}.amazonaws.com`);
  console.log(`   2. Set CLOUDFRONT_DISTRIBUTION_ID environment variable`);
  console.log(`   3. Run 'npm run deploy:aws' to deploy your site`);

} catch (error) {
  console.error('❌ Infrastructure setup failed:', error.message);
  process.exit(1);
}