/**
 * Zone Routes
 * API routes for zone management
 */

import { Router } from 'express';
import { ZoneController } from '../controllers/ZoneController';

export function createZoneRoutes(zoneController: ZoneController): Router {
  const router = Router();

  router.get('/', zoneController.getAllZones);
  router.get('/:id', zoneController.getZoneById);
  router.get('/type/:type', zoneController.getZonesByType);

  return router;
}
