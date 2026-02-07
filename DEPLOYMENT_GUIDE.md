# �� GitHub Pages Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `CodeVisualizer`
3. Description: `GeeksforGeeks Code Viewer - View and syntax highlight code from CodeJudge`
4. Keep it **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 2: Update package.json with Your GitHub Username

Open `package.json` and replace `yourusername` with your actual GitHub username:

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/CodeVisualizer",
```

For example, if your username is `johndoe`:
```json
"homepage": "https://johndoe.github.io/CodeVisualizer",
```

## Step 3: Push to GitHub

Run these commands in the terminal:

```bash
cd /Users/aakashhotchandani/Downloads/Archive_NEW/CodeVisualizer

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/CodeVisualizer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build your app
- Create a `gh-pages` branch
- Deploy to GitHub Pages

## Step 5: Enable GitHub Pages (if needed)

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll to "Pages" in the left sidebar
4. Under "Source", select branch: `gh-pages`
5. Click "Save"

## Step 6: Access Your App

Your app will be live at:
```
https://YOUR_USERNAME.github.io/CodeVisualizer/
```

It may take 2-5 minutes for the first deployment.

---

## 🔄 To Update Your Deployed App

After making changes:

```bash
git add .
git commit -m "Your update message"
git push
npm run deploy
```

---

## ⚠️ Important Notes

**CORS Issue on GitHub Pages:**
The proxy we set up for local development won't work on GitHub Pages. You have two options:

### Option 1: Use Direct API (may have CORS issues)
Update `src/App.jsx` to use the direct URL for production:

```javascript
const fetchCode = async () => {
  // ... existing code ...
  
  // Use direct URL for production
  const apiUrl = import.meta.env.DEV 
    ? `/api/get-status/${codeId}`
    : `https://codejudge.geeksforgeeks.org/get-status/${codeId}`;
  
  const response = await fetch(apiUrl);
  // ... rest of code ...
};
```

### Option 2: Deploy a Backend Proxy
Deploy a simple proxy server on platforms like:
- Vercel
- Netlify Functions
- Cloudflare Workers

The GeeksforGeeks API might work directly from GitHub Pages if they allow cross-origin requests from static sites.

---

## 📝 Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Push code to GitHub
git push
```

---

## ✅ Checklist

- [ ] Created GitHub repository
- [ ] Updated `homepage` in package.json with your username
- [ ] Added remote origin
- [ ] Pushed code to GitHub
- [ ] Ran `npm run deploy`
- [ ] Verified GitHub Pages settings
- [ ] Accessed your live app
- [ ] Tested with a code ID (e.g., HtCPiL7X1P)

Enjoy your deployed app! 🎉
