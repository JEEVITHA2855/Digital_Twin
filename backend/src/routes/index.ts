/**
 * API Routes Index
 * Aggregates all API routes
 */

import { Router } from 'express';
import { Container } from '../config/container';
import { createZoneRoutes } from './zoneRoutes';
import { createWeatherRoutes } from './weatherRoutes';
import { createSimulationRoutes } from './simulationRoutes';

export function createApiRoutes(container: Container): Router {
  const router = Router();

  // Mount route modules
  router.use('/zones', createZoneRoutes(container.zoneController));
  router.use('/weather', createWeatherRoutes(container.weatherController));
  router.use('/simulation', createSimulationRoutes(container.simulationController));

  // Health check endpoint
  router.get('/health', (req, res) => {
    res.json({
      success: true,
      message: 'API is running',
      timestamp: new Date().toISOString(),
    });
  });

  return router;
}
