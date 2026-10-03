// Simple request logger middleware
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
};

module.exports = {
  requestLogger,
  errorHandler
};
