/**
 * Zone Repository Interface
 * Abstraction for zone data access
 * Follows Dependency Inversion Principle
 */

import { Zone } from '../models/Zone';

export interface IZoneRepository {
  findAll(): Promise<Zone[]>;
  findById(id: string): Promise<Zone | null>;
  findByType(type: string): Promise<Zone[]>;
}

/**
 * Mock Zone Repository Implementation
 * Uses in-memory data
 * Can be easily replaced with database implementation
 */
export class MockZoneRepository implements IZoneRepository {
  private zones: Zone[] = [
    {
      id: 'zone-1',
      name: 'Industrial District',
      type: 'industrial',
      coordinates: [
        { lat: 28.640, lng: 77.200 },
        { lat: 28.640, lng: 77.220 },
        { lat: 28.620, lng: 77.220 },
        { lat: 28.620, lng: 77.200 },
      ],
      baseEmissions: 2500,
      vehicleCount: 800,
      population: 5000,
      industrialUnits: 25,
      greenCoverage: 10,
    },
    {
      id: 'zone-2',
      name: 'Residential North',
      type: 'residential',
      coordinates: [
        { lat: 28.660, lng: 77.200 },
        { lat: 28.660, lng: 77.220 },
        { lat: 28.640, lng: 77.220 },
        { lat: 28.640, lng: 77.200 },
      ],
      baseEmissions: 800,
      vehicleCount: 1500,
      population: 15000,
      industrialUnits: 0,
      greenCoverage: 30,
    },
    {
      id: 'zone-3',
      name: 'Commercial Center',
      type: 'commercial',
      coordinates: [
        { lat: 28.640, lng: 77.220 },
        { lat: 28.640, lng: 77.240 },
        { lat: 28.620, lng: 77.240 },
        { lat: 28.620, lng: 77.220 },
      ],
      baseEmissions: 1500,
      vehicleCount: 2000,
      population: 8000,
      industrialUnits: 5,
      greenCoverage: 15,
    },
    {
      id: 'zone-4',
      name: 'Green Park',
      type: 'green',
      coordinates: [
        { lat: 28.620, lng: 77.200 },
        { lat: 28.620, lng: 77.220 },
        { lat: 28.600, lng: 77.220 },
        { lat: 28.600, lng: 77.200 },
      ],
      baseEmissions: 50,
      vehicleCount: 100,
      population: 500,
      industrialUnits: 0,
      greenCoverage: 80,
    },
    {
      id: 'zone-5',
      name: 'Residential South',
      type: 'residential',
      coordinates: [
        { lat: 28.620, lng: 77.240 },
        { lat: 28.620, lng: 77.260 },
        { lat: 28.600, lng: 77.260 },
        { lat: 28.600, lng: 77.240 },
      ],
      baseEmissions: 900,
      vehicleCount: 1800,
      population: 18000,
      industrialUnits: 0,
      greenCoverage: 25,
    },
    {
      id: 'zone-6',
      name: 'Tech Hub',
      type: 'commercial',
      coordinates: [
        { lat: 28.660, lng: 77.220 },
        { lat: 28.660, lng: 77.240 },
        { lat: 28.640, lng: 77.240 },
        { lat: 28.640, lng: 77.220 },
      ],
      baseEmissions: 1200,
      vehicleCount: 1500,
      population: 6000,
      industrialUnits: 3,
      greenCoverage: 20,
    },
  ];

  async findAll(): Promise<Zone[]> {
    return Promise.resolve([...this.zones]);
  }

  async findById(id: string): Promise<Zone | null> {
    const zone = this.zones.find((z) => z.id === id);
    return Promise.resolve(zone || null);
  }

  async findByType(type: string): Promise<Zone[]> {
    const filtered = this.zones.filter((z) => z.type === type);
    return Promise.resolve(filtered);
  }
}
