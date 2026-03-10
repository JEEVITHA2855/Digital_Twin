/**
 * Zone Model
 * Represents a city zone in the digital twin
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
  baseEmissions: number; // Base CO2 emissions in kg/day
  vehicleCount: number;
  population: number;
  industrialUnits: number;
  greenCoverage: number; // Percentage
}

export interface ZoneEmissionData extends Zone {
  currentEmissions: number;
  emissionLevel: 'low' | 'moderate' | 'high';
  dispersionFactor: number;
}
