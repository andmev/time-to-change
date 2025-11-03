# Tire Change Forecast Application

A smart tire change advisory application that analyzes weather data from your location to recommend when to switch between summer and winter tires. Fully static site deployed on GitHub Pages with secure API key management.

## ✨ Features

- 🛞 Smart tire change recommendations based on temperature trends
- 🌍 Location-based forecasting using browser geolocation
- ❄️☀️ Seasonal mode detection (adapts to hemisphere and time of year)
- 🌡️ Temperature aggregation from multiple weather sources
- ⚠️ Automatic warnings for 3+ consecutive extreme temperature days
- 📊 5-7 day forecast with color-coded temperature indicators
- 🎨 Beautiful, adaptive UI that changes with the season
- 📈 Smart temperature averaging algorithm
- 🔐 Secure API key management via GitHub Secrets
- 🚀 100% static - No backend required!

## 🌐 Live Demo

This app is designed to be deployed on GitHub Pages. Once deployed, it will be accessible at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## 📡 Weather Data Sources

The application fetches data from two weather APIs:

1. **Open-Meteo** (No API key required) - 7-day hourly forecasts
2. **WeatherAPI.com** (Optional, via GitHub Secrets) - 7-day forecasts

The application works with just Open-Meteo, but provides more accurate results when both APIs are configured via GitHub Secrets.

## 🚀 Quick Start

### Option 1: Deploy to GitHub Pages (Recommended)

This project is designed for GitHub Pages deployment!

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"

3. **Add API Key** (Optional but recommended):
   - Get free key: https://www.weatherapi.com/
   - Go to Settings → Secrets → Actions
   - Add secret: `WEATHERAPI_API_KEY`
   - See [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md)

4. **Done!** Your site is live at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```

### Option 2: Local Testing

Test the static version locally:

```bash
npm run dev
# Or: npx http-server public -p 8080
```

Then visit: `http://localhost:8080`

## Usage

1. Click "🛞 Check Tire Change Forecast" button

2. Allow browser location permission when prompted

3. The app will automatically detect your season and display the appropriate UI theme

4. View your 5-7 day forecast with color-coded temperature indicators

5. Get tire change warnings if 3+ consecutive extreme temperature days are detected!

## 🏗️ Architecture

### Fully Static Site
- 📄 Single-page HTML application with vanilla JavaScript
- 🌐 Runs entirely in the browser - no backend required
- 🔐 API keys injected securely during GitHub Actions deployment
- 🔄 Calls weather APIs directly from the browser
- 📊 Processes and aggregates data client-side

### Data Flow
```
User Location → Weather APIs → Browser Processing → Display
                     ↓
        [Open-Meteo + WeatherAPI.com]
                     ↓
          Temperature Aggregation
                     ↓
           Seasonal Analysis
                     ↓
        Tire Change Recommendation
```

### Security
- 🔐 API keys stored as GitHub Secrets
- 🔀 Base64 obfuscation (not visible in source code)
- 🛡️ Keys injected only during deployment
- 🚫 Never committed to repository

### Seasonal Intelligence

**Season Detection:**
- Automatically detects hemisphere based on latitude
- Determines if winter or summer is approaching
- Adapts UI colors and temperature thresholds accordingly

**Winter Mode** (Fall/Winter months):
- 🟢 Green (>10°C): Safe for summer tires
- 🟡 Yellow (8.1-10°C): Transition zone
- 🔴 Red (≤8°C): Time for winter tires
- ⚠️ Warning triggered: 3+ consecutive days ≤8°C

**Summer Mode** (Spring/Summer months):
- 🟢 Green (≤8°C): Cool, safe temperatures
- 🟡 Yellow (8.1-10°C): Transition zone  
- 🔴 Red (>10°C): Hot weather, consider summer tires
- ⚠️ Warning triggered: 3+ consecutive days >10°C

### Temperature Aggregation Algorithm

For each day:
1. Collect all hourly/3-hour temperature readings from all APIs
2. Calculate simple average across all data points
3. Round to 1 decimal place for display

Example: For Monday from 3 sources with multiple readings:
- Source 1: [0, 1, 5, 10, 14, 5]
- Source 2: [0, 2, 5, 9, 13, 5]
- Source 3: [1, 3, 6, 11, 14, 6]

Average = (0+1+5+10+14+5+0+2+5+9+13+5+1+3+6+11+14+6) / 18 = 6.1°C

## 📁 Project Structure

```
time-to-change/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml           # GitHub Actions deployment workflow
│   └── CONFIGURATION_SUMMARY.md # Technical configuration details
├── public/
│   ├── index.html               # Main application (static)
│   ├── config.js                # API configuration (auto-generated)
│   └── .nojekyll                # Disable Jekyll processing
├── package.json                 # Project metadata (no dependencies needed)
├── .gitignore                   # Git ignore rules
├── README.md                    # This file
├── DEPLOYMENT.md                # Deployment guide
├── DEPLOYMENT_CHECKLIST.md      # Step-by-step deployment checklist
├── GITHUB_PAGES_SETUP.md        # Quick setup guide
├── GITHUB_SECRETS_SETUP.md      # API key configuration guide
└── env.example                  # API key template (legacy)
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: Open-Meteo (free), WeatherAPI.com (optional)
- **Deployment**: GitHub Pages, GitHub Actions
- **Security**: GitHub Secrets, Base64 obfuscation

## 🛡️ Error Handling

The application gracefully handles:
- ✅ Location permission denied
- ✅ API failures (continues with available sources)
- ✅ Network errors
- ✅ Missing API keys (falls back to Open-Meteo)
- ✅ CORS issues (uses CORS-friendly APIs)
- ✅ Browser compatibility issues

## 📚 Documentation

- **[Quick Setup](GITHUB_PAGES_SETUP.md)** - 3-step deployment guide
- **[Deployment Guide](DEPLOYMENT.md)** - Comprehensive deployment instructions
- **[Secrets Setup](GITHUB_SECRETS_SETUP.md)** - API key configuration
- **[Deployment Checklist](DEPLOYMENT_CHECKLIST.md)** - Step-by-step verification
- **[Configuration Summary](.github/CONFIGURATION_SUMMARY.md)** - Technical details

## 🤝 Contributing

This is a static site project. To contribute:

1. Fork the repository
2. Make your changes
3. Test locally: `npm run dev`
4. Submit a pull request

## 📝 Version History

- **v2.0** - Fully static GitHub Pages version with secure API keys
- **v1.0** - Original Node.js backend version

## License

ISC
