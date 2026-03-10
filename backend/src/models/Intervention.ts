/**
 * Intervention Model
 * Represents environmental interventions that can be applied
 */

export interface Interventions {
  trees: number; // Number of trees planted
  evAdoption: number; // EV adoption percentage (0-100)
  trafficReduction: number; // Traffic reduction percentage (0-100)
  carbonCapture: number; // Number of carbon capture units
  renewableEnergy: number; // Renewable energy percentage (0-100)
}

export interface EmissionFactors {
  carEmissionPerKm: number; // grams CO2 per km
  treeAbsorptionPerYear: number; // kg CO2 per year
  carbonCapturePerUnit: number; // kg CO2 per day
  evEmissionReduction: number; // Percentage reduction per EV
  renewableEnergyFactor: number; // Reduction factor
}

export const DEFAULT_EMISSION_FACTORS: EmissionFactors = {
  carEmissionPerKm: 120, // 120g CO2/km
  treeAbsorptionPerYear: 21, // 21 kg CO2/year per tree
  carbonCapturePerUnit: 100, // 100 kg CO2/day per unit
  evEmissionReduction: 0.7, // 70% reduction
  renewableEnergyFactor: 0.6, // 60% reduction in industrial emissions
};
