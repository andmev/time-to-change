# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages.

## Prerequisites

1. Your code must be in a GitHub repository
2. You need to enable GitHub Pages in your repository settings

## Setup Instructions

### 1. Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** (top menu)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - (The workflow is already configured in `.github/workflows/deploy.yml`)

### 3. Automatic Deployment

That's it! Every time you push to the `main` branch, GitHub Actions will automatically:
- Build your site
- Deploy the `public` folder to GitHub Pages

### 4. Access Your Site

After the first deployment completes (usually takes 1-2 minutes), your site will be available at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

You can also find this URL in:
- Repository Settings → Pages
- The Actions tab after a successful deployment

## Manual Deployment

You can also trigger a deployment manually:

1. Go to the **Actions** tab in your repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the `main` branch and click "Run workflow"

## Project Structure for GitHub Pages

The deployment configuration:
- **Source folder**: `public/` (contains the static HTML, CSS, JS)
- **Deployment method**: GitHub Actions
- **Workflow file**: `.github/workflows/deploy.yml`
- **Jekyll bypass**: `.nojekyll` file prevents Jekyll processing

## Notes on the Static Version

The GitHub Pages version of this app:
- ✅ Calls Open-Meteo API directly from the browser (no backend needed)
- ✅ No API key required (Open-Meteo is free and doesn't require keys)
- ✅ Fully functional with location-based weather forecasts
- ✅ Same UI and features as the server version
- ❌ Does not use WeatherAPI.com (would expose API key on client-side)

The app processes temperature data client-side using the same aggregation algorithm as the backend version.

## Troubleshooting

### Deployment Failed
- Check the Actions tab for error messages
- Ensure the `public` folder exists and contains `index.html`
- Verify the workflow file syntax

### 404 Page Not Found
- Wait 1-2 minutes after first deployment
- Check that GitHub Pages is enabled in Settings
- Verify the URL matches: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Weather Data Not Loading
- Check browser console for errors
- Ensure location permissions are granted
- Verify internet connection (API calls need network access)

## Local Testing

To test locally before deploying:

```bash
# Option 1: Run the Node.js server (full version with backend)
npm start
# Visit: http://localhost:3000

# Option 2: Use a simple HTTP server (GitHub Pages version)
npx http-server public -p 8080
# Visit: http://localhost:8080
```

## Updates and Redeployment

To update your site:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

The site will automatically redeploy within 1-2 minutes.
