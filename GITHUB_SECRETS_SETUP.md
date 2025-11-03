# GitHub Secrets Setup for API Key

This guide explains how to configure your WeatherAPI.com API key as a GitHub secret for secure deployment.

## 🔐 Why Use GitHub Secrets?

GitHub Secrets allow you to:
- ✅ Store sensitive API keys securely
- ✅ Keep keys out of your source code
- ✅ Automatically inject keys during deployment
- ✅ Use obfuscation to hide keys from casual inspection

## 📋 Prerequisites

1. A GitHub account
2. Your repository pushed to GitHub
3. A WeatherAPI.com API key (optional but recommended)
   - Get one free at: https://www.weatherapi.com/
   - Free tier: 1,000,000 calls/month

## 🚀 Step-by-Step Setup

### Step 1: Get Your API Key

1. Visit https://www.weatherapi.com/
2. Sign up for a free account
3. Go to your dashboard
4. Copy your API key (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Step 2: Add Secret to GitHub

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click the **New repository secret** button
5. Fill in the form:
   - **Name**: `WEATHERAPI_API_KEY`
   - **Value**: Paste your API key (e.g., `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)
6. Click **Add secret**

### Step 3: Verify Setup

1. Go to the **Actions** tab
2. Click **Run workflow** (or push a commit to trigger deployment)
3. Wait for the workflow to complete
4. Check the deployment logs for: `✓ API configuration injected`

### Step 4: Test Your Site

1. Visit your GitHub Pages URL: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
2. Click "Check Tire Change Forecast"
3. Open browser DevTools (F12) → Console tab
4. Look for: `API Results: { 'Open-Meteo': 'Success ✓', 'WeatherAPI.com': 'Success ✓' }`

If you see both APIs showing "Success ✓", your secret is working!

## 🔍 How It Works

### During Deployment:

1. **GitHub Actions** reads your secret: `${{ secrets.WEATHERAPI_API_KEY }}`
2. **Base64 encodes** the key for obfuscation
3. **Injects** it into `public/config.js`:
   ```javascript
   window.APP_CONFIG = {
     weatherApiKey: 'YTFiMmMzZDRlNWY2ZzdoOGk5ajBrMWwybTNuNG81cDY=',
     apiVersion: '2.0'
   };
   ```
4. **Deploys** to GitHub Pages

### In the Browser:

1. Page loads `config.js`
2. JavaScript **decodes** the base64 key: `atob(encodedKey)`
3. Uses the decoded key to call WeatherAPI.com
4. Aggregates data from both APIs

## 🛡️ Security Notes

### What This Provides:
✅ Keeps key out of source code  
✅ Basic obfuscation from casual inspection  
✅ GitHub secret encryption at rest  
✅ Harder to scrape automatically  

### Important Limitations:
⚠️ **NOT true encryption** - Base64 is encoding, not encryption  
⚠️ **Client-side keys are visible** - Anyone can decode base64  
⚠️ **Browser DevTools shows key** - Users can see network requests  

### Why It's Still Useful:
- Prevents key from appearing in git history
- Stops casual scraping/indexing of keys
- Adds friction for automated key harvesting
- Free tier limits protect against abuse
- WeatherAPI.com tracks usage per key

### Best Practices:
1. **Never commit** the API key to git
2. **Monitor usage** on WeatherAPI.com dashboard
3. **Set rate limits** if available
4. **Rotate keys** if you suspect abuse
5. **Use free tier** for public sites

## 🔄 Updating Your Secret

To change your API key:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click on `WEATHERAPI_API_KEY`
3. Click **Update secret**
4. Enter new value
5. Click **Update secret**
6. Trigger a new deployment (push to main or manual workflow run)

## ❓ Troubleshooting

### Secret Not Working

**Problem**: Both APIs not loading, only Open-Meteo works

**Solutions**:
1. Verify secret name is exactly: `WEATHERAPI_API_KEY` (case-sensitive)
2. Check Actions logs for error messages
3. Ensure API key is valid (test on WeatherAPI.com)
4. Clear browser cache and hard refresh (Ctrl+F5)

### Key Showing as "null" in Console

**Problem**: `window.APP_CONFIG.weatherApiKey` is null

**Solutions**:
1. Check if secret is set in GitHub Settings
2. Look at Actions logs: Should say `✓ API configuration injected`
3. If it says `⚠ No API key found`, secret wasn't found
4. Re-add the secret and re-run deployment

### Only Open-Meteo Loading

**Problem**: WeatherAPI.com shows "Failed ✗" in console

**Solutions**:
1. Check browser console for specific error
2. Verify API key is valid (not expired)
3. Check WeatherAPI.com dashboard for usage/limits
4. Ensure key has forecast permissions
5. Try decoding the key manually: `atob(window.APP_CONFIG.weatherApiKey)`

## 📊 Monitoring Usage

### Check API Usage:
1. Go to https://www.weatherapi.com/my/
2. View your dashboard
3. Monitor:
   - Daily API calls
   - Monthly usage
   - Rate limit status

### Free Tier Limits:
- **Calls**: 1,000,000 per month
- **Rate**: Varies by plan
- **Data**: 7-day forecast included

## 🎯 Testing Without Secret

The app works without the WeatherAPI.com secret:

- ✅ Open-Meteo will still work (no key required)
- ✅ All features remain functional
- ℹ️ Slightly less accurate (only one data source)
- ℹ️ Console will show: `WeatherAPI.com key not configured (optional)`

To test without secret:
```bash
npm run dev
# Visit: http://localhost:8080
```

## 📝 Checklist

- [ ] Got API key from WeatherAPI.com
- [ ] Added secret to GitHub: Settings → Secrets → Actions
- [ ] Secret name is exactly: `WEATHERAPI_API_KEY`
- [ ] Deployed (push to main or manual workflow)
- [ ] Checked Actions log shows: `✓ API configuration injected`
- [ ] Tested site - both APIs show "Success ✓"
- [ ] Bookmarked WeatherAPI.com dashboard for monitoring

## 🔗 Useful Links

- **WeatherAPI.com**: https://www.weatherapi.com/
- **API Dashboard**: https://www.weatherapi.com/my/
- **API Docs**: https://www.weatherapi.com/docs/
- **GitHub Secrets Docs**: https://docs.github.com/en/actions/security-guides/encrypted-secrets

---

**Need Help?** Check the main [DEPLOYMENT.md](DEPLOYMENT.md) for more information.
