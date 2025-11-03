# Quick GitHub Pages Setup

## 🚀 Quick Start (3 steps!)

### 1. Push to GitHub

```bash
# Initialize git if you haven't already
git init

# Add all files
git add .

# Commit
git commit -m "Add GitHub Pages configuration"

# Create main branch
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/time-to-change.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu bar)
3. Click **Pages** (left sidebar under "Code and automation")
4. Under "Build and deployment":
   - **Source**: Select **"GitHub Actions"** (not "Deploy from a branch")
5. Click Save

### 3. Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You'll see "Deploy to GitHub Pages" workflow running
3. Wait 1-2 minutes for it to complete (green checkmark)
4. Your site is now live! 🎉

## 🌐 Access Your Site

Your site will be available at:

```
https://YOUR_USERNAME.github.io/time-to-change/
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 🔄 Making Updates

After the initial setup, just push changes to deploy:

```bash
git add .
git commit -m "Update site"
git push origin main
```

Your site will automatically update in 1-2 minutes!

## ✅ What's Already Configured

This repository is already set up with:

- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Static site in `public/` folder
- ✅ Jekyll bypass (`.nojekyll` file)
- ✅ Open-Meteo API integration (no keys needed)

## 🧪 Test Locally First

Before deploying, test the static version locally:

```bash
npx http-server public -p 8080
```

Visit `http://localhost:8080` to test.

## 📝 Repository Settings Required

Make sure your repository settings have:

1. **Source**: GitHub Actions (not "Deploy from a branch")
2. **Actions permissions**: Allow all actions and reusable workflows
   - Go to Settings → Actions → General
   - Select "Allow all actions and reusable workflows"

## ❓ Troubleshooting

**Deployment not starting?**
- Check that the workflow file exists at `.github/workflows/deploy.yml`
- Verify Actions are enabled in repository Settings → Actions

**404 Error?**
- Wait 2-3 minutes after first deployment
- Check the URL matches your username and repo name
- Verify GitHub Pages is enabled and set to "GitHub Actions"

**Weather not loading?**
- Check browser console for errors
- Allow location permissions when prompted
- Verify internet connection

## 📚 More Info

For detailed information, see [DEPLOYMENT.md](DEPLOYMENT.md)
