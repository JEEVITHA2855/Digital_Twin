/**
 * Weather Service
 * Business logic for weather data processing
 */

import { Weather, WeatherDispersionFactors } from '../models/Weather';
import { IWeatherRepository } from '../repositories/WeatherRepository';

export class WeatherService {
  constructor(private weatherRepository: IWeatherRepository) {}

  /**
   * Get current weather data
   */
  async getCurrentWeather(): Promise<Weather> {
    return await this.weatherRepository.getCurrentWeather();
  }

  /**
   * Calculate dispersion factors based on weather conditions
   * These factors influence how CO2 disperses in the atmosphere
   */
  calculateDispersionFactors(weather: Weather): WeatherDispersionFactors {
    // Temperature factor: Higher temperature = better dispersion (lower concentration)
    // Normalized between 0.8 and 1.2
    const temperatureFactor = 0.8 + (weather.temperature / 100) * 0.4;

    // Wind factor: Higher wind speed = better dispersion
    // Normalized between 0.7 and 1.0
    const windFactor = Math.max(0.7, 1 - weather.windSpeed / 20);

    // Humidity factor: Higher humidity can trap pollutants
    // Normalized between 0.9 and 1.1
    const humidityFactor = 0.9 + (weather.humidity / 100) * 0.2;

    return {
      temperatureFactor: Math.max(0.7, Math.min(1.3, temperatureFactor)),
      windFactor: Math.max(0.7, Math.min(1.0, windFactor)),
      humidityFactor: Math.max(0.9, Math.min(1.1, humidityFactor)),
    };
  }
}
