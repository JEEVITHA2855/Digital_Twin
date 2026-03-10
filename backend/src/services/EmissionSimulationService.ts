/**
 * Emission Simulation Service
 * Core business logic for CO2 emission calculations
 * Follows Single Responsibility Principle
 */

import { Zone, ZoneEmissionData } from '../models/Zone';
import {
  Interventions,
  EmissionFactors,
  DEFAULT_EMISSION_FACTORS,
} from '../models/Intervention';
import { WeatherDispersionFactors } from '../models/Weather';

export class EmissionSimulationService {
  private emissionFactors: EmissionFactors;

  constructor(emissionFactors: EmissionFactors = DEFAULT_EMISSION_FACTORS) {
    this.emissionFactors = emissionFactors;
  }

  /**
   * Calculate emissions for a single zone with interventions applied
   * Formula: CO2 = (vehicles × emission_factor) + industrial_emission - absorption
   */
  calculateZoneEmissions(
    zone: Zone,
    interventions: Interventions,
    dispersionFactors: WeatherDispersionFactors
  ): ZoneEmissionData {
    // Base vehicular emissions
    const avgDistancePerDay = 30; // km
    const vehicularEmissions =
      (zone.vehicleCount *
        avgDistancePerDay *
        this.emissionFactors.carEmissionPerKm) /
      1000; // Convert to kg

    // Apply EV adoption reduction
    const evReduction =
      (interventions.evAdoption / 100) *
      vehicularEmissions *
      this.emissionFactors.evEmissionReduction;

    // Apply traffic reduction
    const trafficReduction =
      (interventions.trafficReduction / 100) * vehicularEmissions;

    const adjustedVehicularEmissions =
      vehicularEmissions - evReduction - trafficReduction;

    // Industrial emissions
    const industrialEmissions = zone.industrialUnits * 80; // 80 kg CO2 per unit per day

    // Apply renewable energy reduction
    const renewableReduction =
      (interventions.renewableEnergy / 100) *
      industrialEmissions *
      this.emissionFactors.renewableEnergyFactor;

    const adjustedIndustrialEmissions =
      industrialEmissions - renewableReduction;

    // Residential emissions (heating, electricity)
    const residentialEmissions = (zone.population * 5) / 1000; // 5g CO2 per person per day

    // Tree absorption
    const existingTreeAbsorption =
      (zone.greenCoverage / 100) *
      (zone.coordinates.length * 1000) * // Approximate area
      (this.emissionFactors.treeAbsorptionPerYear / 365);

    const newTreeAbsorption =
      (interventions.trees * this.emissionFactors.treeAbsorptionPerYear) / 365;

    const totalTreeAbsorption = existingTreeAbsorption + newTreeAbsorption;

    // Carbon capture
    const carbonCaptureAbsorption =
      interventions.carbonCapture *
      this.emissionFactors.carbonCapturePerUnit;

    // Total emissions calculation
    const totalEmissions =
      adjustedVehicularEmissions +
      adjustedIndustrialEmissions +
      residentialEmissions -
      totalTreeAbsorption -
      carbonCaptureAbsorption;

    // Apply weather dispersion factors
    const dispersedEmissions =
      totalEmissions *
      dispersionFactors.windFactor *
      dispersionFactors.temperatureFactor *
      dispersionFactors.humidityFactor;

    // Determine emission level
    const emissionLevel = this.getEmissionLevel(dispersedEmissions);

    return {
      ...zone,
      currentEmissions: Math.max(0, dispersedEmissions),
      emissionLevel,
      dispersionFactor:
        dispersionFactors.windFactor *
        dispersionFactors.temperatureFactor *
        dispersionFactors.humidityFactor,
    };
  }

  /**
   * Calculate total city emissions
   */
  calculateTotalEmissions(zones: ZoneEmissionData[]): number {
    return zones.reduce((total, zone) => total + zone.currentEmissions, 0);
  }

  /**
   * Calculate sustainability score (0-100)
   * Higher score = better sustainability
   */
  calculateSustainabilityScore(
    currentEmissions: number,
    baselineEmissions: number,
    interventions: Interventions
  ): number {
    const emissionReduction = Math.max(
      0,
      ((baselineEmissions - currentEmissions) / baselineEmissions) * 100
    );

    // Bonus points for interventions
    const interventionScore =
      (interventions.trees / 10000) * 5 +
      (interventions.evAdoption / 100) * 20 +
      (interventions.trafficReduction / 100) * 15 +
      (interventions.carbonCapture / 100) * 10 +
      (interventions.renewableEnergy / 100) * 20;

    const totalScore = Math.min(100, emissionReduction * 0.6 + interventionScore * 0.4);

    return Math.round(totalScore);
  }

  /**
   * Determine emission level category
   */
  private getEmissionLevel(
    emissions: number
  ): 'low' | 'moderate' | 'high' {
    if (emissions < 500) return 'low';
    if (emissions < 1500) return 'moderate';
    return 'high';
  }

  /**
   * Get emission breakdown by category
   */
  getEmissionBreakdown(
    zones: Zone[],
    interventions: Interventions
  ): {
    vehicular: number;
    industrial: number;
    residential: number;
    treeAbsorption: number;
    carbonCapture: number;
    renewableEnergy: number;
  } {
    let vehicular = 0;
    let industrial = 0;
    let residential = 0;

    zones.forEach((zone) => {
      const avgDistancePerDay = 30;
      vehicular +=
        (zone.vehicleCount *
          avgDistancePerDay *
          this.emissionFactors.carEmissionPerKm) /
        1000;

      industrial += zone.industrialUnits * 80;
      residential += (zone.population * 5) / 1000;
    });

    // Apply reductions
    const evReduction =
      (interventions.evAdoption / 100) *
      vehicular *
      this.emissionFactors.evEmissionReduction;
    const trafficReduction =
      (interventions.trafficReduction / 100) * vehicular;

    vehicular = vehicular - evReduction - trafficReduction;

    const renewableReduction =
      (interventions.renewableEnergy / 100) *
      industrial *
      this.emissionFactors.renewableEnergyFactor;

    industrial = industrial - renewableReduction;

    const treeAbsorption =
      (interventions.trees * this.emissionFactors.treeAbsorptionPerYear) / 365;

    const carbonCapture =
      interventions.carbonCapture *
      this.emissionFactors.carbonCapturePerUnit;

    return {
      vehicular: Math.max(0, vehicular),
      industrial: Math.max(0, industrial),
      residential: Math.max(0, residential),
      treeAbsorption,
      carbonCapture,
      renewableEnergy: renewableReduction,
    };
  }
}
