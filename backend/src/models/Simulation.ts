/**
 * Simulation Model
 * Represents simulation results and statistics
 */

import { Interventions } from './Intervention';
import { ZoneEmissionData } from './Zone';

export interface SimulationRequest {
  interventions: Interventions;
}

export interface SimulationResult {
  totalEmissions: number;
  baselineEmissions: number;
  emissionReduction: number;
  emissionReductionPercentage: number;
  sustainabilityScore: number; // 0-100
  zones: ZoneEmissionData[];
  breakdown: EmissionBreakdown;
  timestamp: Date;
}

export interface EmissionBreakdown {
  vehicular: number;
  industrial: number;
  residential: number;
  treeAbsorption: number;
  carbonCapture: number;
  renewableEnergy: number;
}

export interface HistoricalData {
  date: Date;
  emissions: number;
  sustainabilityScore: number;
}
