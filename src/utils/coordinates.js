// City name to GPS coordinates mapping
// Used by the weather route to look up coordinates for Open-Meteo API

const CITIES = {
  dubai: { lat: 25.2048, lon: 55.2708, name: "Dubai, UAE" },
  london: { lat: 51.5074, lon: -0.1278, name: "London, UK" },
  tokyo: { lat: 35.6762, lon: 139.6503, name: "Tokyo, Japan" },
  new_york: { lat: 40.7128, lon: -74.006, name: "New York, USA" },
  sydney: { lat: -33.8688, lon: 151.2093, name: "Sydney, Australia" },
};

function getCoordinates(city) {
  const key = city.toLowerCase().replace(/[\s-]/g, "_");
  return CITIES[key] || null;
}

function listCities() {
  return Object.entries(CITIES).map(([key, value]) => ({
    id: key,
    name: value.name,
  }));
}

module.exports = { getCoordinates, listCities, CITIES };
