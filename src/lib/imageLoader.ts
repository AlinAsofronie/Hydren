// Custom image loader for static export
export default function imageLoader({ src, width, quality }: {
  src: string
  width: number
  quality?: number
}) {
  // For static export, return the source URL as-is
  // In production with CloudFront, you might want to add optimization parameters
  if (process.env.NODE_ENV === 'production' && process.env.CLOUDFRONT_DOMAIN) {
    // Example with CloudFront image optimization
    return `${process.env.CLOUDFRONT_DOMAIN}${src}?w=${width}&q=${quality || 75}`
  }
  
  return src
}