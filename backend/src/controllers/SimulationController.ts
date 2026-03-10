/**
 * Simulation Controller
 * Handles HTTP requests for simulation
 */

import { Request, Response, NextFunction } from 'express';
import { SimulationService } from '../services/SimulationService';
import { Interventions } from '../models/Intervention';

export class SimulationController {
  constructor(private simulationService: SimulationService) {}

  /**
   * POST /api/simulation/calculate
   * Calculate emissions with interventions
   */
  calculateSimulation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const interventions: Interventions = req.body.interventions || {
        trees: 0,
        evAdoption: 0,
        trafficReduction: 0,
        carbonCapture: 0,
        renewableEnergy: 0,
      };

      // Validate interventions
      if (!this.validateInterventions(interventions)) {
        res.status(400).json({
          success: false,
          message: 'Invalid intervention values',
        });
        return;
      }

      const result = await this.simulationService.runSimulation({
        interventions,
      });

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/simulation/baseline
   * Get baseline simulation (no interventions)
   */
  getBaseline = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.simulationService.getBaselineSimulation();

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Validate intervention values
   */
  private validateInterventions(interventions: Interventions): boolean {
    return (
      interventions.trees >= 0 &&
      interventions.evAdoption >= 0 &&
      interventions.evAdoption <= 100 &&
      interventions.trafficReduction >= 0 &&
      interventions.trafficReduction <= 100 &&
      interventions.carbonCapture >= 0 &&
      interventions.renewableEnergy >= 0 &&
      interventions.renewableEnergy <= 100
    );
  }
}
