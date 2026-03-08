const http = require("http");
const { requestLogger } = require("./middleware/logger");
const { validateWeatherParams } = require("./middleware/validator");
const { handleWeather } = require("./routes/weather");
const { handleCities } = require("./routes/cities");
const { formatError } = require("./utils/formatter");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  res.setHeader("Content-Type", "application/json");

  // Log every request
  requestLogger(req, res, () => {});

  if (url.pathname === "/") {
    res.end(JSON.stringify({ status: "ok", message: "Weather API is running" }));
    return;
  }

  if (url.pathname.startsWith("/weather/")) {
    const city = url.pathname.split("/weather/")[1];
    const unit = url.searchParams.get("unit") || "celsius";

    // Validate query params before handling
    const validation = validateWeatherParams(unit);
    if (!validation.valid) {
      res.statusCode = 400;
      res.end(JSON.stringify(formatError(validation.error, 400)));
      return;
    }

    handleWeather(req, res, city, unit);
    return;
  }

  if (url.pathname === "/cities") {
    handleCities(req, res);
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`Weather API running on http://localhost:${PORT}`);
});
