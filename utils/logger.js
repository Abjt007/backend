// utils/logger.js
const winston = require('winston');
const path = require('path');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',  // Set default logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;

    })
  ),
  transports: [
    // Write all logs to app.log
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/app.log'),
      level: 'info',  // Logs info and higher level messages
    }),
    // Write errors to error.log
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',  // Only logs errors
    }),
    // Also log to console (useful for development)
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

module.exports = logger;