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
- `GET /cities` — List supported cities

## Project Structure

```
src/
├── index.js            — Server entry point
├── routes/
│   ├── weather.js      — Weather endpoint logic
│   └── cities.js       — City listing endpoint
└── utils/
    ├── coordinates.js  — City-to-coordinate mapping
    └── formatter.js    — Response formatting helpers
tests/
└── weather.test.js     — Basic endpoint tests
```
