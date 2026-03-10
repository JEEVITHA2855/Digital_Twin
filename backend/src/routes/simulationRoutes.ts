/**
 * Simulation Routes
 * API routes for emission simulation
 */

import { Router } from 'express';
import { SimulationController } from '../controllers/SimulationController';

export function createSimulationRoutes(
  simulationController: SimulationController
): Router {
  const router = Router();

  router.post('/calculate', simulationController.calculateSimulation);
  router.get('/baseline', simulationController.getBaseline);

  return router;
}
