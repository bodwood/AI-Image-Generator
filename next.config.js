const dotenv = require('dotenv');

// Runs configuration from .env file
dotenv.config();

// Allows us to access environment variables in our code
// Exports our API key from out environment securely
module.exports = {
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
};
