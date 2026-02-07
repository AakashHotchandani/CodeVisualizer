#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 PUSHING TO GITHUB AND DEPLOYING TO GITHUB PAGES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Push to GitHub
echo "📤 Step 1: Pushing code to GitHub..."
git push -u origin main

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Failed to push to GitHub!"
    echo ""
    echo "Make sure you've created the repository at:"
    echo "   https://github.com/aakashhotchandani/CodeVisualizer"
    echo ""
    exit 1
fi

echo "✅ Code pushed successfully!"
echo ""

# Deploy to GitHub Pages
echo "🌐 Step 2: Deploying to GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  ✅ DEPLOYMENT SUCCESSFUL!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🌐 Your app will be live in 2-5 minutes at:"
    echo "   https://aakashhotchandani.github.io/CodeVisualizer/"
    echo ""
    echo "📋 Try it with code ID: HtCPiL7X1P"
    echo ""
else
    echo ""
    echo "❌ Deployment failed! Check the errors above."
    exit 1
fi
