/**
 * Simulation Service
 * Orchestrates the simulation process
 * Follows Open/Closed Principle - open for extension, closed for modification
 */

import { SimulationRequest, SimulationResult } from '../models/Simulation';
import { Interventions } from '../models/Intervention';
import { EmissionSimulationService } from './EmissionSimulationService';
import { WeatherService } from './WeatherService';
import { ZoneService } from './ZoneService';

export class SimulationService {
  constructor(
    private emissionSimulationService: EmissionSimulationService,
    private weatherService: WeatherService,
    private zoneService: ZoneService
  ) {}

  /**
   * Run complete simulation with interventions
   */
  async runSimulation(
    request: SimulationRequest
  ): Promise<SimulationResult> {
    // Get all zones
    const zones = await this.zoneService.getAllZones();

    // Get current weather and calculate dispersion factors
    const weather = await this.weatherService.getCurrentWeather();
    const dispersionFactors =
      this.weatherService.calculateDispersionFactors(weather);

    // Calculate baseline emissions (no interventions)
    const baselineEmissions =
      this.zoneService.calculateBaselineEmissions(zones);

    // Calculate emissions for each zone with interventions
    const zoneEmissions = zones.map((zone) =>
      this.emissionSimulationService.calculateZoneEmissions(
        zone,
        request.interventions,
        dispersionFactors
      )
    );

    // Calculate total emissions
    const totalEmissions =
      this.emissionSimulationService.calculateTotalEmissions(zoneEmissions);

    // Calculate emission reduction
    const emissionReduction = baselineEmissions - totalEmissions;
    const emissionReductionPercentage =
      (emissionReduction / baselineEmissions) * 100;

    // Calculate sustainability score
    const sustainabilityScore =
      this.emissionSimulationService.calculateSustainabilityScore(
        totalEmissions,
        baselineEmissions,
        request.interventions
      );

    // Get emission breakdown
    const breakdown = this.emissionSimulationService.getEmissionBreakdown(
      zones,
      request.interventions
    );

    return {
      totalEmissions: Math.round(totalEmissions * 100) / 100,
      baselineEmissions: Math.round(baselineEmissions * 100) / 100,
      emissionReduction: Math.round(emissionReduction * 100) / 100,
      emissionReductionPercentage:
        Math.round(emissionReductionPercentage * 100) / 100,
      sustainabilityScore,
      zones: zoneEmissions,
      breakdown,
      timestamp: new Date(),
    };
  }

  /**
   * Get default/baseline simulation (no interventions)
   */
  async getBaselineSimulation(): Promise<SimulationResult> {
    const defaultInterventions: Interventions = {
      trees: 0,
      evAdoption: 0,
      trafficReduction: 0,
      carbonCapture: 0,
      renewableEnergy: 0,
    };

    return this.runSimulation({ interventions: defaultInterventions });
  }
}
