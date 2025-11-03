const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Weather API functions
async function getOpenMeteoWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto&forecast_days=7`;
    const response = await axios.get(url);

    if (response.data && response.data.hourly) {
      return {
        success: true,
        data: response.data.hourly,
        source: "Open-Meteo",
      };
    }
    return { success: false, source: "Open-Meteo" };
  } catch (error) {
    console.error("Open-Meteo API error:", error.message);
    return { success: false, source: "Open-Meteo", error: error.message };
  }
}

async function getWeatherAPIWeather(lat, lon) {
  const apiKey = process.env.WEATHERAPI_API_KEY;

  if (!apiKey) {
    console.warn("WeatherAPI.com API key not configured");
    return {
      success: false,
      source: "WeatherAPI.com",
      error: "API key not configured",
    };
  }

  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`;
    const response = await axios.get(url);

    if (response.data && response.data.forecast) {
      return {
        success: true,
        data: response.data.forecast.forecastday,
        source: "WeatherAPI.com",
      };
    }
    return { success: false, source: "WeatherAPI.com" };
  } catch (error) {
    console.error("WeatherAPI.com error:", error.message);
    return { success: false, source: "WeatherAPI.com", error: error.message };
  }
}

// Temperature aggregation function
function aggregateTemperaturesByDay(apiResults) {
  const dailyTemps = {};

  // Process Open-Meteo data (hourly)
  if (apiResults.openMeteo.success && apiResults.openMeteo.data) {
    const { time, temperature_2m } = apiResults.openMeteo.data;
    time.forEach((timestamp, index) => {
      const date = new Date(timestamp);
      const dayKey = date.toISOString().split("T")[0];

      if (!dailyTemps[dayKey]) {
        dailyTemps[dayKey] = [];
      }
      dailyTemps[dayKey].push(temperature_2m[index]);
    });
  }

  // Process WeatherAPI.com data (hourly)
  if (apiResults.weatherAPI.success && apiResults.weatherAPI.data) {
    apiResults.weatherAPI.data.forEach((day) => {
      const dayKey = day.date;

      if (!dailyTemps[dayKey]) {
        dailyTemps[dayKey] = [];
      }

      // Add hourly data if available
      if (day.hour) {
        day.hour.forEach((hour) => {
          dailyTemps[dayKey].push(hour.temp_c);
        });
      }

      // Also add daily average as a data point
      if (day.day && day.day.avgtemp_c !== undefined) {
        dailyTemps[dayKey].push(day.day.avgtemp_c);
      }
    });
  }

  // Calculate average temperature for each day
  const result = [];
  const sortedDays = Object.keys(dailyTemps).sort();

  sortedDays.forEach((dayKey) => {
    const temps = dailyTemps[dayKey];
    if (temps.length > 0) {
      const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
      const date = new Date(dayKey);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      result.push({
        date: dayKey,
        dayName: dayName,
        temperature: Math.round(avgTemp * 10) / 10, // Round to 1 decimal
        dataPoints: temps.length,
      });
    }
  });

  return result;
}

// API endpoint
app.post("/api/weather", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        error: "Latitude and longitude are required",
      });
    }

    console.log(`Fetching weather for coordinates: ${latitude}, ${longitude}`);

    // Call all weather APIs in parallel
    const [openMeteo, weatherAPI] = await Promise.all([
      getOpenMeteoWeather(latitude, longitude),
      getWeatherAPIWeather(latitude, longitude),
    ]);

    const apiResults = {
      openMeteo,
      weatherAPI,
    };

    // Log which APIs succeeded
    console.log("API Results:", {
      "Open-Meteo": openMeteo.success ? "Success" : "Failed",
      "WeatherAPI.com": weatherAPI.success ? "Success" : "Failed",
    });

    // Check if at least one API succeeded
    const hasData = openMeteo.success || weatherAPI.success;

    if (!hasData) {
      return res.status(503).json({
        error: "Unable to fetch weather data from any source",
        details: apiResults,
      });
    }

    // Aggregate temperature data
    const forecast = aggregateTemperaturesByDay(apiResults);

    if (forecast.length === 0) {
      return res.status(500).json({
        error: "No forecast data could be generated",
      });
    }

    res.json({
      success: true,
      location: { latitude, longitude },
      forecast: forecast,
      sources: {
        "Open-Meteo": openMeteo.success,
        "WeatherAPI.com": weatherAPI.success,
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Weather server running on http://localhost:${PORT}`);
  console.log("");
  console.log("API Key Status:");
  console.log("- Open-Meteo: No key required ✓");
  console.log(
    `- WeatherAPI.com: ${
      process.env.WEATHERAPI_API_KEY
        ? "Configured ✓"
        : "Not configured (optional)"
    }`
  );
});
