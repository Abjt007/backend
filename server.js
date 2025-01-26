const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const { PORT } = require('./config/keys');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Add more routes here for cd..different features like admin, donor, refugee, etc.

// Start server
app.listen(PORT, () => {
  logger.logInfo(`Server running on port ${PORT}`);  // Corrected the string interpolation
});