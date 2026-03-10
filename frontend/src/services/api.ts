/**
 * API Client Service
 * Handles all HTTP communication with backend
 */

import axios, { AxiosInstance } from 'axios';
import { Zone, SimulationResult, Weather, WeatherDispersionFactors, Interventions, ApiResponse } from '@/types';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any auth tokens here if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get all zones
   */
  async getZones(): Promise<Zone[]> {
    const response = await this.client.get<ApiResponse<Zone[]>>('/zones');
    return response.data.data;
  }

  /**
   * Get zone by ID
   */
  async getZoneById(id: string): Promise<Zone> {
    const response = await this.client.get<ApiResponse<Zone>>(`/zones/${id}`);
    return response.data.data;
  }

  /**
   * Calculate simulation with interventions
   */
  async calculateSimulation(interventions: Interventions): Promise<SimulationResult> {
    const response = await this.client.post<ApiResponse<SimulationResult>>(
      '/simulation/calculate',
      { interventions }
    );
    return response.data.data;
  }

  /**
   * Get baseline simulation (no interventions)
   */
  async getBaselineSimulation(): Promise<SimulationResult> {
    const response = await this.client.get<ApiResponse<SimulationResult>>(
      '/simulation/baseline'
    );
    return response.data.data;
  }

  /**
   * Get current weather
   */
  async getCurrentWeather(): Promise<{
    weather: Weather;
    dispersionFactors: WeatherDispersionFactors;
  }> {
    const response = await this.client.get<
      ApiResponse<{
        weather: Weather;
        dispersionFactors: WeatherDispersionFactors;
      }>
    >('/weather/current');
    return response.data.data;
  }

  /**
   * API health check
   */
  async health(): Promise<{ success: boolean; message: string }> {
    const response = await this.client.get<{ success: boolean; message: string }>(
      '/health'
    );
    return response.data;
  }
}

export const apiService = new ApiService();
