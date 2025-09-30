# Local Development Guide

This guide helps you set up and work on the Water Hygiene Website locally.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/AlinAsofronie/Hydren.git
   cd Hydren
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your preferences (optional)
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Check TypeScript types |
| `npm run clean` | Clean build artifacts |

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/contact/        # Contact form API
│   ├── services/           # Service pages
│   ├── contact/            # Contact page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # React components
│   ├── ui/                 # UI components
│   ├── animations/         # Animation components
│   ├── seo/                # SEO components
│   ├── ContactForm.tsx     # Contact form
│   └── HeroSection.tsx     # Hero component
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and services
└── utils/                  # Helper functions
```

## 🎨 Key Features

### Design System
- **Colors**: Medical blue, trust cyan, safety green
- **Typography**: Inter font family
- **Animations**: Apple-style with Framer Motion
- **Components**: Reusable UI library

### Animation System
- **Scroll Animations**: Parallax, reveal, timeline
- **Apple-Style**: Smooth easing and spring physics
- **Performance**: Intersection Observer based triggers

### SEO Optimization
- Meta tags and structured data
- Sitemap and robots.txt
- Open Graph and Twitter cards

## 🔧 Development Tips

### Hot Reload
The development server supports hot reload. Changes to:
- React components update instantly
- CSS changes apply immediately
- TypeScript errors show in browser

### Debugging
- Check browser console for errors
- Use React Developer Tools
- TypeScript errors show in terminal

### Contact Form Testing
In development mode, the contact form:
- Logs submissions to console instead of sending emails
- Shows success message without AWS configuration
- Validates all form fields normally

## 🎯 Common Development Tasks

### Adding New Pages
1. Create file in `src/app/` directory
2. Export default React component
3. Add to navigation if needed

### Creating Components
1. Add to `src/components/` 
2. Use TypeScript interfaces
3. Follow existing naming conventions

### Styling
- Use Tailwind CSS classes
- Custom colors available in config
- Apple-style shadows and animations

### Animations
- Use existing animation components
- Follow Apple easing patterns
- Consider performance impact

## 🚨 Troubleshooting

### Common Issues

**Port 3000 in use:**
```bash
npx kill-port 3000
npm run dev
```

**TypeScript errors:**
```bash
npm run type-check
```

**Build fails:**
```bash
npm run clean
npm install
npm run build
```

**Styling issues:**
- Check Tailwind class names
- Verify custom colors in config
- Clear browser cache

### Environment Issues
- Ensure Node.js 18+
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Check .env.local syntax

## 📈 Performance Tips

- Use Next.js Image component for images
- Implement lazy loading for heavy components
- Monitor bundle size with build output
- Test animations on slower devices

## 🔄 Making Changes

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes**
   - Follow existing code patterns
   - Add TypeScript types
   - Test locally

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   ```

4. **Push to GitHub**
   ```bash
   git push origin feature/your-feature
   ```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to modify the color palette:
- `medical`: Primary blue tones
- `trust`: Cyan accent colors  
- `safety`: Green success colors
- `neutral`: Gray scale

### Animations
Modify animation components in `src/components/animations/`:
- `ParallaxSection.tsx`: Scroll parallax effects
- `SmoothReveal.tsx`: Reveal animations
- `ScrollProgress.tsx`: Progress indicators

### Content
Update content in:
- `src/app/page.tsx`: Homepage
- `src/app/services/`: Service pages
- `src/components/HeroSection.tsx`: Hero content

## 📞 Getting Help

- Check this documentation first
- Look at existing component examples
- Review TypeScript types for guidance
- Test changes thoroughly in browser

---

Happy coding! 🚀