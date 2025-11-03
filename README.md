# Tire Change Forecast Application

A smart tire change advisory application that analyzes weather data from your location to recommend when to switch between summer and winter tires. Features seasonal awareness with adaptive color schemes and intelligent temperature-based warnings.

## Features

- 🛞 Smart tire change recommendations based on temperature trends
- 🌍 Location-based forecasting using browser geolocation
- ❄️☀️ Seasonal mode detection (adapts to hemisphere and time of year)
- 🌡️ Temperature aggregation from multiple weather sources
- ⚠️ Automatic warnings for 3+ consecutive extreme temperature days
- 📊 5-7 day forecast with color-coded temperature indicators
- 🎨 Beautiful, adaptive UI that changes with the season
- 📈 Smart temperature averaging algorithm

## Weather Data Sources

The application fetches data from two weather APIs:

1. **Open-Meteo** (No API key required) - 7-day hourly forecasts
2. **WeatherAPI.com** (Optional API key) - 7-day forecasts

The application works with just Open-Meteo, but provides more accurate results when both APIs are configured.

## Installation

### Option 1: Local Development with Backend (Full Version)

1. Install dependencies:
```bash
npm install
```

2. Configure API keys (optional but recommended):
   - Copy `env.example` to `.env`:
     ```bash
     cp env.example .env
     ```
   
   - Get a free API key:
     - **WeatherAPI.com**: https://www.weatherapi.com/ (up to 1,000,000 calls/month free)
   
   - Add your key to `.env`:
     ```
     WEATHERAPI_API_KEY=your_key_here
     ```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Option 2: Deploy to GitHub Pages (Static Version)

This project is configured for automatic deployment to GitHub Pages!

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings (Source: GitHub Actions)
3. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

👉 **See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions**

The GitHub Pages version:
- ✅ Fully functional, no backend needed
- ✅ Uses Open-Meteo API (free, no key required)
- ✅ Automatic deployment on push to main branch

### Option 3: Test Static Version Locally

```bash
npx http-server public -p 8080
```

Then visit: `http://localhost:8080`

## Usage

1. Click "🛞 Check Tire Change Forecast" button

2. Allow browser location permission when prompted

3. The app will automatically detect your season and display the appropriate UI theme

4. View your 5-7 day forecast with color-coded temperature indicators

5. Get tire change warnings if 3+ consecutive extreme temperature days are detected!

## How It Works

### Frontend
- Single-page HTML application with vanilla JavaScript
- Detects user's hemisphere and current season for adaptive UI
- Requests user's geolocation using browser Geolocation API
- Sends coordinates to backend via POST request
- Displays forecast with color-coded temperature indicators
- Analyzes consecutive extreme temperature days for tire warnings

### Backend
- Node.js Express server
- Fetches weather data from multiple APIs in parallel
- Aggregates temperature readings using simple averaging:
  - Collects all temperature readings for each day from all sources
  - Calculates average: `sum(temperatures) / count(temperatures)`
  - Returns one temperature per day

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

## Project Structure

```
time-to-change/
├── server.js              # Express backend
├── package.json           # Dependencies and scripts
├── env.example           # API key template
├── .env                  # Your API keys (not committed)
├── .gitignore            # Git ignore rules
├── README.md             # This file
└── public/
    └── index.html        # Frontend application
```

## Technologies Used

- **Backend**: Node.js, Express, Axios
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: Open-Meteo, WeatherAPI.com

## Error Handling

The application gracefully handles:
- Location permission denied
- API failures (continues with available sources)
- Network errors
- Missing API keys (falls back to Open-Meteo)

## License

ISC
