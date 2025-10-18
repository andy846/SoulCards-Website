# SoulCards Website

A mystical and elegant promotional website for the SoulCards iOS tarot reading app.

## 🌟 Project Overview

This website showcases the SoulCards iOS app with a beautiful, mystical design that matches the app's aesthetic. The site is built with modern web technologies and optimized for performance and SEO.

### Features
- 🎨 Mystical dark theme with purple and gold accents
- ⭐ Interactive starry background animations
- 📱 Responsive design for all devices
- 🚀 Fast loading with Vite and modern optimization
- 🔍 SEO optimized with React Helmet
- 📲 App Store download integration
- 💫 Smooth animations with Framer Motion

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **SEO**: React Helmet Async
- **State Management**: Zustand
- **Icons**: Lucide React & Heroicons

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/SoulCards_Website.git
cd SoulCards_Website
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start development server:
```bash
pnpm dev
# or
npm run dev
```

4. Build for production:
```bash
pnpm build
# or
npm run build
```

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended)

#### Automatic Deployment with GitHub Actions

1. **Fork or create a new repository** on GitHub

2. **Update the base URL** in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/', // Change this to your repository name
  // ... rest of config
})
```

3. **Commit and push your code**:
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

4. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source
   - The workflow will automatically deploy your site

#### Manual Deployment

1. **Build the project**:
```bash
pnpm build
```

2. **Install gh-pages** (if not already installed):
```bash
pnpm add -D gh-pages
```

3. **Add deploy script** to `package.json`:
```json
{
  "scripts": {
    "deploy": "pnpm build && gh-pages -d dist"
  }
}
```

4. **Deploy to GitHub Pages**:
```bash
pnpm deploy
```

### Option 2: Vercel Deployment

1. **Install Vercel CLI**:
```bash
pnpm add -g vercel
```

2. **Deploy**:
```bash
vercel --prod
```

3. **Follow the prompts** to configure your deployment

### Option 3: Netlify Deployment

1. **Build the project**:
```bash
pnpm build
```

2. **Install Netlify CLI**:
```bash
pnpm add -g netlify-cli
```

3. **Deploy**:
```bash
netlify deploy --prod --dir=dist
```

## 📁 Project Structure

```
SoulCards_Website/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── styles/             # Global styles
│   └── assets/             # Images and media
├── .github/workflows/      # GitHub Actions
├── supabase/               # Database migrations
└── dist/                   # Build output
```

## 🎨 Customization

### Colors
Edit the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#faf5ff',
    500: '#8b5cf6',
    600: '#7c3aed',
    900: '#581c87',
  },
  // ... more colors
}
```

### Content
Update the content in:
- `src/pages/Home.tsx` - Homepage content
- `src/pages/Features.tsx` - Feature descriptions
- `src/pages/Pricing.tsx` - Subscription plans
- `src/components/AppStoreButton.tsx` - App Store link

### Images
Replace images in `src/assets/` with your own:
- App screenshots
- Feature illustrations
- Background images

## 🔧 Development Tips

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation components

### Styling Guidelines
- Use Tailwind utility classes
- Follow the existing color scheme
- Maintain responsive design principles
- Use Framer Motion for animations

### Performance Optimization
- Images are automatically optimized
- Code splitting is handled by Vite
- Lazy loading for heavy components

## 📱 App Store Integration

Update the App Store link in your components:
```typescript
const APP_STORE_URL = 'https://apps.apple.com/app/your-app-id'
```

## 🔒 Security

- No sensitive data is exposed
- Environment variables are properly configured
- Build process is secure

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: Check TypeScript errors with `pnpm check`
2. **CSS not loading**: Ensure Tailwind is properly configured
3. **Images not showing**: Check paths in production build
4. **Routing issues**: Verify base URL in `vite.config.ts`

### Getting Help

- Check the [Issues](https://github.com/yourusername/your-repo/issues) tab
- Review the [Discussions](https://github.com/yourusername/your-repo/discussions)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, please contact:
- Email: support@soulcards.app
- Website: https://soulcards.app

---

**Built with ❤️ for SoulCards**