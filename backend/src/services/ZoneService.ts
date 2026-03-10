/**
 * Zone Service
 * Business logic for zone management
 */

import { Zone } from '../models/Zone';
import { IZoneRepository } from '../repositories/ZoneRepository';

export class ZoneService {
  constructor(private zoneRepository: IZoneRepository) {}

  /**
   * Get all zones
   */
  async getAllZones(): Promise<Zone[]> {
    return await this.zoneRepository.findAll();
  }

  /**
   * Get zone by ID
   */
  async getZoneById(id: string): Promise<Zone | null> {
    return await this.zoneRepository.findById(id);
  }

  /**
   * Get zones by type
   */
  async getZonesByType(type: string): Promise<Zone[]> {
    return await this.zoneRepository.findByType(type);
  }

  /**
   * Calculate baseline emissions (without interventions)
   */
  calculateBaselineEmissions(zones: Zone[]): number {
    return zones.reduce((total, zone) => {
      const avgDistancePerDay = 30; // km
      const vehicular = (zone.vehicleCount * avgDistancePerDay * 120) / 1000; // 120g CO2/km
      const industrial = zone.industrialUnits * 80; // 80 kg CO2 per unit per day
      const residential = (zone.population * 5) / 1000; // 5g CO2 per person per day

      return total + vehicular + industrial + residential;
    }, 0);
  }
}
