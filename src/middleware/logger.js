// Logs every incoming request with method, path, and response time

function requestLogger(req, res, next) {
  const start = Date.now();
  const { method, url } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    console.log(`${method} ${url} → ${status} (${duration}ms)`);
  });

  next();
}

module.exports = { requestLogger };
