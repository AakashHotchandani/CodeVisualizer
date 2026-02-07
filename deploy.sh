#!/bin/bash

echo "🚀 CodeVisualizer - GitHub Pages Deployment Script"
echo "=================================================="
echo ""

# Check if git remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No GitHub remote found!"
    echo ""
    echo "Please follow these steps first:"
    echo "1. Create a new repository on GitHub: https://github.com/new"
    echo "2. Name it: CodeVisualizer"
    echo "3. Run this command (replace YOUR_USERNAME):"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/CodeVisualizer.git"
    echo ""
    echo "4. Update 'homepage' in package.json with your GitHub username"
    echo ""
    exit 1
fi

echo "✅ Git remote found!"
echo ""

# Get the remote URL
REMOTE_URL=$(git remote get-url origin)
echo "📍 Remote: $REMOTE_URL"
echo ""

# Ask for confirmation
echo "Ready to deploy? This will:"
echo "  1. Build the production version"
echo "  2. Deploy to GitHub Pages"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "🏗️  Building and deploying..."
echo ""

# Deploy
npm run deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "Your app will be live in 2-5 minutes at:"
    
    # Extract username and repo from git remote
    if [[ $REMOTE_URL =~ github\.com[:/]([^/]+)/([^/.]+) ]]; then
        USERNAME="${BASH_REMATCH[1]}"
        REPO="${BASH_REMATCH[2]}"
        echo "   https://$USERNAME.github.io/$REPO/"
    fi
    echo ""
else
    echo ""
    echo "❌ Deployment failed!"
    echo "Check the errors above and try again."
    exit 1
fi
