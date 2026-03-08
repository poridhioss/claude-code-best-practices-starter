# Weather API

A simple weather API built with Node.js. Returns weather data for cities using the Open-Meteo API (free, no API key needed).

## Setup

```bash
npm install
npm run dev
```

## Endpoints

- `GET /` — Health check
- `GET /weather/:city` — Get current weather for a city
- `GET /weather/:city?unit=fahrenheit` — Get weather in Fahrenheit
- `GET /cities` — List supported cities

## Project Structure

```
src/
├── index.js              — Server entry point and routing
├── middleware/
│   ├── logger.js         — Request logging (method, path, response time)
│   └── validator.js      — Query parameter validation
├── routes/
│   ├── weather.js        — Weather endpoint logic
│   └── cities.js         — City listing endpoint
└── utils/
    ├── coordinates.js    — City-to-coordinate mapping
    └── formatter.js      — Response formatting helpers
tests/
└── weather.test.js       — Unit tests
```

## Supported Cities

Dubai, London, Tokyo, New York, Sydney
