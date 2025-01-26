const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const { PORT } = require('./config/keys');
const routes = require('./routes'); // Import routes

const app = express();

// Middleware
app.use(morgan('combined')); // HTTP request logger
app.use(express.json()); // Parse incoming JSON requests

// Routes setup
app.use('/api', routes);

// Catch-all for unknown routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling
app.use((error, req, res, next) => {
  logger.logError(error.message);
  res.status(error.status || 500).send({ message: error.message });
});

// Start server
app.listen(PORT, () => { 
  logger.logInfo(`App is running on port ${PORT}`);
});


module.exports = app;