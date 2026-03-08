// Format raw Open-Meteo API response into a clean weather object

function formatWeatherResponse(apiData, cityName, unit) {
  const current = apiData.current;
  const units = apiData.current_units;

  return {
    city: cityName,
    temperature: current.temperature_2m,
    unit: units.temperature_2m,
    windSpeed: current.wind_speed_10m,
    windUnit: units.wind_speed_10m,
    timestamp: current.time,
    source: "Open-Meteo API",
  };
}

function formatError(message, statusCode = 400) {
  return {
    error: message,
    statusCode,
  };
}

module.exports = { formatWeatherResponse, formatError };
