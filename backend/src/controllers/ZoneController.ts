/**
 * Zone Controller
 * Handles HTTP requests for zone data
 */

import { Request, Response, NextFunction } from 'express';
import { ZoneService } from '../services/ZoneService';

export class ZoneController {
  constructor(private zoneService: ZoneService) {}

  /**
   * GET /api/zones
   * Get all zones
   */
  getAllZones = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const zones = await this.zoneService.getAllZones();
      res.json({
        success: true,
        data: zones,
        count: zones.length,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/zones/:id
   * Get zone by ID
   */
  getZoneById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const zone = await this.zoneService.getZoneById(id);

      if (!zone) {
        res.status(404).json({
          success: false,
          message: 'Zone not found',
        });
        return;
      }

      res.json({
        success: true,
        data: zone,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/zones/type/:type
   * Get zones by type
   */
  getZonesByType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { type } = req.params;
      const zones = await this.zoneService.getZonesByType(type);

      res.json({
        success: true,
        data: zones,
        count: zones.length,
      });
    } catch (error) {
      next(error);
    }
  };
}
