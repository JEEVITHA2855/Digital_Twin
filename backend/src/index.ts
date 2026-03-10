/**
 * Application Entry Point
 * Initializes and starts the server
 */

import config from './config/config';
import { createContainer } from './config/container';
import { createApp } from './app';

// Create dependency container
const container = createContainer(config);

// Create Express application
const app = createApp(config, container);

// Start server
const server = app.listen(config.port, () => {
  console.log('🚀 Digital Twin CO₂ Emission Platform');
  console.log('=====================================');
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Server running on port: ${config.port}`);
  console.log(`API URL: http://localhost:${config.port}/api`);
  console.log(`Weather API: ${config.openWeatherApiKey ? 'OpenWeather' : 'Mock Data'}`);
  console.log('=====================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
