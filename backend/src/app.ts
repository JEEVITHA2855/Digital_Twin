/**
 * Express Application Setup
 * Configures Express middleware and routes
 */

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { AppConfig } from './config/config';
import { Container } from './config/container';
import { createApiRoutes } from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

export function createApp(config: AppConfig, container: Container): Application {
  const app = express();

  // Security middleware
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: config.allowedOrigins,
      credentials: true,
    })
  );

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Compression middleware
  app.use(compression());

  // Logging middleware
  if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // API routes
  app.use('/api', createApiRoutes(container));

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Digital Twin CO₂ Emission Platform API',
      version: '1.0.0',
      documentation: '/api/health',
    });
  });

  // Error handling middleware (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
