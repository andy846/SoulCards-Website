#!/bin/bash

# SoulCards Website GitHub Setup Script
# This script helps set up your repository for GitHub Pages deployment

echo "🚀 SoulCards Website GitHub Setup"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Ask for repository name
echo ""
echo "What's your GitHub repository name?"
echo "(This should match your GitHub repository name exactly)"
read -r repo_name

if [ -z "$repo_name" ]; then
    echo "❌ Error: Repository name cannot be empty"
    exit 1
fi

# Update vite.config.ts with base path
echo "📝 Updating vite.config.ts with base path..."
if [ -f "vite.config.ts" ]; then
    # Backup original file
    cp vite.config.ts vite.config.ts.backup
    
    # Add base path to config
    sed -i '' "s/export default defineConfig({/export default defineConfig({\n  base: '\/$repo_name\/',/" vite.config.ts
    
    echo "✅ Updated vite.config.ts with base path: /$repo_name/"
else
    echo "❌ Warning: vite.config.ts not found"
fi

# Ask for GitHub username
echo ""
echo "What's your GitHub username?"
read -r username

if [ -z "$username" ]; then
    echo "❌ Error: Username cannot be empty"
    exit 1
fi

# Show next steps
echo ""
echo "🎯 Setup Complete! Next Steps:"
echo "==============================="
echo "1. Create a new repository on GitHub: https://github.com/new"
echo "2. Name it: $repo_name"
echo "3. Make it public (required for free GitHub Pages)"
echo "4. Run these commands:"
echo ""
echo "   git add ."
echo "   git commit -m 'Initial commit - SoulCards website'"
echo "   git remote add origin https://github.com/$username/$repo_name.git"
echo "   git push -u origin main"
echo ""
echo "5. Go to repository Settings > Pages > Source > GitHub Actions"
echo "6. Your site will be available at: https://$username.github.io/$repo_name/"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo "🍀 Good luck!"