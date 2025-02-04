function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    code: statusCode,
    error: true,
    data: message,
  });
}

module.exports = errorHandler;
