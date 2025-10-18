# GitHub Deployment Guide for SoulCards Website

This guide will walk you through deploying your SoulCards website to GitHub Pages with automated CI/CD.

## 🎯 Quick Start (Recommended)

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `soulcards-website` or `SoulCards_Website`
3. Make it public (required for free GitHub Pages hosting)
4. Don't initialize with README (we already have one)

### 2. Update Configuration

Before pushing to GitHub, update your `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/', // Add this line with your repository name
  // ... rest of your config
})
```

Replace `your-repo-name` with your actual GitHub repository name.

### 3. Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit - SoulCards website"

# Add your GitHub repository as origin
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically run and deploy your site

### 5. Wait for Deployment

- The GitHub Action will automatically run when you push to the main branch
- Check the **Actions** tab in your repository to monitor the deployment
- Your site will be available at: `https://yourusername.github.io/your-repo-name/`

## 🚀 Alternative Deployment Methods

### Method 1: Manual Deployment Script

Use the provided deployment script:

```bash
# Make sure you have push access to your repository
./deploy.sh
```

### Method 2: npm/gh-pages

```bash
# Build and deploy in one command
npm run deploy

# Or force deploy (overwrites existing gh-pages branch)
npm run deploy:force
```

### Method 3: GitHub CLI (gh)

If you have GitHub CLI installed:

```bash
# Create repository and push
git init
git add .
git commit -m "Initial commit"
gh repo create your-repo-name --public --push

# Enable GitHub Pages
gh repo edit --enable-pages
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Fails in GitHub Actions

**Problem**: Build fails with TypeScript errors
**Solution**: 
```bash
# Check for TypeScript errors locally
npm run check

# Fix any errors before pushing
```

#### 2. 404 Errors After Deployment

**Problem**: Site shows 404 errors
**Solution**: Make sure the `base` path in `vite.config.ts` matches your repository name exactly.

#### 3. Assets Not Loading

**Problem**: Images, CSS, or JS not loading
**Solution**: Check that the `base` path is correctly set in `vite.config.ts`.

#### 4. GitHub Pages Not Updating

**Problem**: Changes not reflecting on the live site
**Solution**: 
- Check the Actions tab for build errors
- Clear your browser cache
- Wait a few minutes for GitHub to update

#### 5. Permission Denied

**Problem**: Cannot push to repository
**Solution**: 
- Make sure you're logged into GitHub
- Check that you have write access to the repository
- Use a personal access token if needed

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All TypeScript errors are fixed (`npm run check`)
- [ ] The site builds locally (`npm run build`)
- [ ] `vite.config.ts` has the correct `base` path
- [ ] App Store links are updated in the code
- [ ] All images and assets are included
- [ ] SEO meta tags are properly configured
- [ ] Site is tested locally (`npm run dev`)

## 🎨 Customization After Deployment

### Update App Store Link

In your components, update the App Store URL:

```typescript
const APP_STORE_URL = 'https://apps.apple.com/app/your-app-id'
```

### Update Content

- Edit files in `src/pages/` to update content
- Replace images in `src/assets/`
- Update colors in `tailwind.config.js`

### Update SEO

- Edit meta tags in your page components
- Update `public/manifest.json`
- Update `public/favicon.svg`

## 🔒 Security Considerations

- Never commit sensitive information (API keys, secrets)
- Use environment variables for sensitive data
- Keep your dependencies updated
- Review the deployed site for any exposed information

## 📞 Getting Help

If you encounter issues:

1. Check the [GitHub Actions logs](https://github.com/yourusername/your-repo-name/actions)
2. Review this guide for common solutions
3. Check the [Issues](https://github.com/yourusername/your-repo-name/issues) tab
4. Contact support if needed

## 🌟 Next Steps

After successful deployment:

1. **Test the live site** thoroughly
2. **Share your website** with others
3. **Monitor performance** using GitHub Pages analytics
4. **Set up a custom domain** (optional)
5. **Keep the site updated** with new content

---

**Congratulations! 🎉 Your SoulCards website is now live on GitHub Pages!**