require('dotenv').config();
const { startServer } = require('./src/server');

// Entry point loads env vars and starts the app
startServer();