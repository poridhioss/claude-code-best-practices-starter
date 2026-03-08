const { getCoordinates } = require("../utils/coordinates");
const { formatWeatherResponse, formatError } = require("../utils/formatter");

async function handleWeather(req, res, city, unit) {
  const coords = getCoordinates(city);

  if (!coords) {
    res.statusCode = 404;
    res.end(JSON.stringify(formatError(`City "${city}" not found. Use /cities to see supported cities.`, 404)));
    return;
  }

  const tempUnit = unit === "fahrenheit" ? "fahrenheit" : "celsius";
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,wind_speed_10m&temperature_unit=${tempUnit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      res.statusCode = 502;
      res.end(JSON.stringify(formatError("Weather API returned an error", 502)));
      return;
    }

    const formatted = formatWeatherResponse(data, coords.name, tempUnit);
    res.end(JSON.stringify(formatted));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify(formatError("Failed to fetch weather data", 500)));
  }
}

module.exports = { handleWeather };
