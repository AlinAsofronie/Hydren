# Hydren - Water Hygiene Solutions Website

A modern, responsive website for water hygiene services built with Next.js 14, TypeScript, and Tailwind CSS. Features Apple-inspired animations, SEO optimization, and AWS deployment configuration.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Apple-Inspired Design**: Smooth animations with Framer Motion
- **SEO Optimized**: Structured data, meta tags, and sitemap
- **AWS Integration**: SES contact form and S3/CloudFront deployment
- **Responsive Design**: Mobile-first approach with medical color palette
- **Performance Optimized**: Static export ready for CDN deployment

## 🏗️ Architecture

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion with scroll-triggered effects
- **Forms**: React Hook Form with Zod validation
- **Email**: AWS SES integration
- **Deployment**: Static export for S3/CloudFront

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- AWS CLI (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/AlinAsofronie/Hydren.git
cd Hydren

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## 🛠️ Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Build static export
npm run build:static

# Linting
npm run lint
```

## 🚀 Deployment

### AWS S3/CloudFront

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

```bash
# Setup AWS infrastructure
node scripts/setup-aws-infrastructure.js

# Deploy to AWS
npm run deploy:aws
```

### GitHub Actions

The project includes automated CI/CD with GitHub Actions. Push to `main` branch triggers:
- Build and test
- Security scanning
- Deployment to AWS
- CloudFront cache invalidation

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API routes
│   │   ├── services/        # Service pages
│   │   └── contact/         # Contact page
│   ├── components/          # React components
│   │   ├── ui/              # UI components
│   │   ├── animations/      # Animation components
│   │   └── seo/             # SEO components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and integrations
│   └── utils/               # Helper functions
├── scripts/                 # Deployment scripts
├── .github/workflows/       # GitHub Actions
└── docs/                    # Documentation
```

## 🎨 Design System

- **Colors**: Medical blue, trust cyan, safety green, neutral grays
- **Typography**: Inter font family with display variants
- **Animations**: Apple-style easing with spring physics
- **Components**: Reusable UI components with consistent styling

## 📧 Contact Form

The contact form integrates with AWS SES for email delivery:
- Form validation with Zod
- AWS SES integration
- Professional email templates
- Error handling and success states

## 🔒 Security

- Input validation and sanitization
- HTTPS enforcement
- Secure headers configuration
- Automated security scanning

## 📊 Performance

- Static site generation
- Optimized images and assets
- CDN delivery via CloudFront
- Efficient caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For deployment help, see [DEPLOYMENT.md](./DEPLOYMENT.md)
For contact form setup, see [README_CONTACT_SETUP.md](./README_CONTACT_SETUP.md)
