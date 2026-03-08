// Validates query parameters for the weather endpoint

const VALID_UNITS = ["celsius", "fahrenheit"];

function validateWeatherParams(unit) {
  if (unit && !VALID_UNITS.includes(unit)) {
    return {
      valid: false,
      error: `Invalid unit "${unit}". Use "celsius" or "fahrenheit".`,
    };
  }
  return { valid: true };
}

module.exports = { validateWeatherParams, VALID_UNITS };
