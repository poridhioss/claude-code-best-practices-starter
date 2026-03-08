const { describe, it } = require("node:test");
const assert = require("node:assert");

const { getCoordinates, listCities } = require("../src/utils/coordinates");
const { formatWeatherResponse, formatError } = require("../src/utils/formatter");

describe("coordinates", () => {
  it("returns coordinates for a known city", () => {
    const result = getCoordinates("dubai");
    assert.strictEqual(result.lat, 25.2048);
    assert.strictEqual(result.lon, 55.2708);
    assert.strictEqual(result.name, "Dubai, UAE");
  });

  it("returns null for an unknown city", () => {
    const result = getCoordinates("atlantis");
    assert.strictEqual(result, null);
  });

  it("handles case-insensitive lookup", () => {
    const result = getCoordinates("DUBAI");
    assert.ok(result);
    assert.strictEqual(result.name, "Dubai, UAE");
  });

  it("handles spaces and hyphens in city names", () => {
    const result = getCoordinates("new york");
    assert.ok(result);
    assert.strictEqual(result.name, "New York, USA");
  });

  it("lists all supported cities", () => {
    const cities = listCities();
    assert.ok(cities.length > 0);
    assert.ok(cities.every((c) => c.id && c.name));
  });
});

describe("formatter", () => {
  it("formats weather response correctly", () => {
    const mockApiData = {
      current: {
        temperature_2m: 32.5,
        wind_speed_10m: 15.2,
        time: "2024-03-08T14:00",
      },
      current_units: {
        temperature_2m: "°C",
        wind_speed_10m: "km/h",
      },
    };

    const result = formatWeatherResponse(mockApiData, "Dubai, UAE", "celsius");
    assert.strictEqual(result.city, "Dubai, UAE");
    assert.strictEqual(result.temperature, 32.5);
    assert.strictEqual(result.unit, "°C");
    assert.strictEqual(result.source, "Open-Meteo API");
  });

  it("formats error correctly", () => {
    const result = formatError("Something went wrong", 500);
    assert.strictEqual(result.error, "Something went wrong");
    assert.strictEqual(result.statusCode, 500);
  });
});
