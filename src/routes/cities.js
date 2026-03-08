const { listCities } = require("../utils/coordinates");

function handleCities(req, res) {
  const cities = listCities();
  res.end(JSON.stringify({ cities, count: cities.length }));
}

module.exports = { handleCities };
