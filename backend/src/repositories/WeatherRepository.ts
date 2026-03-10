/**
 * Weather Repository Interface
 * Abstraction for weather data access
 */

import axios from 'axios';
import { Weather } from '../models/Weather';
import { AppConfig } from '../config/config';

export interface IWeatherRepository {
  getCurrentWeather(): Promise<Weather>;
}

/**
 * OpenWeather Repository Implementation
 * Fetches real-time weather data from OpenWeather API
 */
export class OpenWeatherRepository implements IWeatherRepository {
  private apiKey: string;
  private city: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(config: AppConfig) {
    this.apiKey = config.openWeatherApiKey;
    this.city = config.openWeatherCity;
  }

  async getCurrentWeather(): Promise<Weather> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          q: this.city,
          appid: this.apiKey,
          units: 'metric',
        },
      });

      const data = response.data;

      return {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Return default weather if API fails
      return this.getDefaultWeather();
    }
  }

  private getDefaultWeather(): Weather {
    return {
      temperature: 15,
      humidity: 60,
      windSpeed: 3,
      pressure: 1013,
      description: 'Clear sky',
      icon: '01d',
    };
  }
}

/**
 * Mock Weather Repository
 * Returns mock weather data for testing
 */
export class MockWeatherRepository implements IWeatherRepository {
  async getCurrentWeather(): Promise<Weather> {
    return Promise.resolve({
      temperature: 18,
      humidity: 65,
      windSpeed: 3.5,
      pressure: 1015,
      description: 'Partly cloudy',
      icon: '02d',
    });
  }
}
