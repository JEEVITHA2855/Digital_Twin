/**
 * Frontend Type Definitions
 */

export type ZoneType = 'industrial' | 'residential' | 'commercial' | 'green';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Zone {
  id: string;
  name: string;
  type: ZoneType;
  coordinates: Coordinates[];
  baseEmissions: number;
  vehicleCount: number;
  population: number;
  industrialUnits: number;
  greenCoverage: number;
  currentEmissions: number;
  emissionLevel: 'low' | 'moderate' | 'high';
  dispersionFactor: number;
}

export interface Interventions {
  trees: number;
  evAdoption: number;
  trafficReduction: number;
  carbonCapture: number;
  renewableEnergy: number;
}

export interface Weather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  description: string;
  icon: string;
}

export interface WeatherDispersionFactors {
  temperatureFactor: number;
  windFactor: number;
  humidityFactor: number;
}

export interface EmissionBreakdown {
  vehicular: number;
  industrial: number;
  residential: number;
  treeAbsorption: number;
  carbonCapture: number;
  renewableEnergy: number;
}

export interface SimulationResult {
  totalEmissions: number;
  baselineEmissions: number;
  emissionReduction: number;
  emissionReductionPercentage: number;
  sustainabilityScore: number;
  zones: Zone[];
  breakdown: EmissionBreakdown;
  timestamp: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
